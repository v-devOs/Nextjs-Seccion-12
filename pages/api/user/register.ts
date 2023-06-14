import { db } from '@/database'
import User from '@/models/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcryptjs from 'bcryptjs';
import { jwt, validations } from '@/utils';

type Data = { message: string }
| { 
  token: string,
    user: {
      email: string, 
      role: string, 
      name: string
    }
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch( req.method ){

    case 'POST':
      return registerUser( req, res )

    default:
      res.status(400).json({
        message: 'Bad Request'
      })

  }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string}

 
  if( password.length < 6 ){
    return res.status(400).json({message: 'La contraseña debe de ser 6 caracteres'})
  }

  if( name.length < 2 ){
    return res.status(400).json({message: 'El nombre debe de ser 2 caracteres'})
  }

  if( !validations.isEmail( email )){
    return res.status(400).json({
      message: 'El correo ingresado no tiene formato de correo'
    })
  }

  await db.connect()
  const user = await User.findOne({ email })


  if( user ){
    await db.disconnect()
    return res.status(400).json({ message: 'Correo ya esta registrado'})
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcryptjs.hashSync( password ),
    role: 'client',
    name    
  });

  try {

    await newUser.save({ validateBeforeSave: true })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Revisar logs del servirdor'})
  }

  const { _id } = newUser;

  const token = jwt.signToken( _id, email)

  return res.status(200).json({
    token,
    user: {
      email, 
      role: 'client', 
      name
    }
  })
}
