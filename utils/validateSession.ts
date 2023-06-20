import { jwt } from "."

export const validateSession = async( token: string ):Promise<boolean> => {
  try {
    await jwt.isValidToken( token )
     return true
  } catch (error) {
    return false
  }
}