import { FC, ReactNode, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';

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

  return (
    <AuthContext.Provider value={{
      ...state,

      // Meythods
      loginUser
    }}>
    { children }
    </AuthContext.Provider>
  )
}