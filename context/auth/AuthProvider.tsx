import { FC, ReactNode, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';

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

  return (
    <AuthContext.Provider value={{
      ...state

      // Meythods
    }}>
    { children }
    </AuthContext.Provider>
  )
}