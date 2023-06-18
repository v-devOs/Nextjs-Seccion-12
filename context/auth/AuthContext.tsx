import { IUser } from '@/interfaces'
import { createContext } from 'react'

interface ContextProps {
  isLoggedIn: boolean
  user?: IUser
  loginUser: (email: string, password: string) => Promise<boolean>
  registerUser: (email: string, password: string, name: string) => Promise<{ hasError: boolean; message?: string }>
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps)