import User from "@/models/User"
import { db } from "."
import bcryptjs from 'bcryptjs';


export const checkUserEmailPassowrd = async( email:string, password: string) => {
  await db.connect()
  const user = await User.findOne( { email });
  await db.disconnect()

  if( !user ){
    return null
  }

  if( !bcryptjs.compareSync( password, user.password! )){
    return null
  }

  const { role, name, _id } = user

  return{
    id: _id,
    _id,
    email: email.toLowerCase(),
    name,
    role
  }
}