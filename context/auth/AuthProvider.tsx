import { FC, ReactNode, useEffect, useReducer } from 'react'
;
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';

import { IUser } from '@/interfaces';

import { tesloApi } from '@/api';
import axios from 'axios';

interface Props {
  children: ReactNode
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser
}

const Auth_INITIAL_STATE : AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)
  const router = useRouter()

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {

    if( !Cookies.get('token') ) return;
    
    try {
      const { data } = await tesloApi.get('/user/validate-token')
      const { token, user } = data

      Cookies.set('token', token)

      dispatch({type: '[Auth] - Login', payload: user })

    } catch (error) {
      Cookies.remove('token')
    }

  }
  

  const loginUser = async ( email:string, password: string ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password});
      const { token, user } = data

      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      return true;

    } catch (error) {
      return false
    }
  }

  const registerUser = async ( email:string, password: string, name: string ): Promise<{hasError: boolean, message?: string}> => {
    try {
      const { data } = await tesloApi.post('/user/register', { email, password, name});
      const { token, user } = data

      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })

      return{
        hasError: false,
        message: ''
      }
    } catch (error) {
      
      if( axios.isAxiosError( error )){
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }

      return{
        hasError: true,
        message: 'No se pudp crear el usuario, intentelo de nuevo'
      }

    }
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('cart')

    router.reload()
  }

  return (
    <AuthContext.Provider value={{
      ...state,

      // Meythods
      loginUser,
      registerUser,
      logout
    }}>
    { children }
    </AuthContext.Provider>
  )
}