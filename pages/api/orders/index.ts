import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces/IOrder';
import { getSession } from 'next-auth/react';
import { db } from '@/database';
import { Product } from '@/models';
import { getToken } from 'next-auth/jwt';

type Data = { message: string }

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch( req.method ){
    case 'POST':
      return createOrder( req, res )

    default:
      return res.status(400).json({ message: 'Bad request'})
  }
  
}


const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  const { orderItems, total } = req.body as IOrder

  // Verifficar que tengamos usuario
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })


  if( !session ){
    return res.status(401).json({message: 'Debe de estar autorizado para hacer esto'})
  }

  // crear un arreglo con los productos que la persona quiere
  const productsIds = orderItems.map( p => p._id )

  await db.connect()

  const dbProducts = await Product.find({ _id: { $in: productsIds }})

  try {
    const subTotal = orderItems.reduce( (prev, current) => {

      const currentPrice = dbProducts.find( prod => prod._id === current._id)?.price
      
      if( !currentPrice ){
        throw new Error('Verifique el carrito de nuevo, producto no existente')
      }

      return ( currentPrice * current.quantity) + prev
    } ,0)
  } catch (error) {
    
  }
  

  return res.status(200).json(session)
}

