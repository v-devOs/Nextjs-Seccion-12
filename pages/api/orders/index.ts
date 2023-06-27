import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces/IOrder';
import { db } from '@/database';
import { Product, Order } from '@/models';
import { getToken } from 'next-auth/jwt';

type Data = { message: string } | IOrder

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

      const currentPrice = dbProducts.find( prod => prod.id === current._id)?.price
      
      if( !currentPrice ){
        throw new Error('Verifique el carrito de nuevo, producto no existente')
      }
      return ( currentPrice * current.quantity) + prev
    },0)

    const taxRate = Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 )
    const backendTotal = ( subTotal * taxRate ) +  subTotal

    if( total !== backendTotal ){
      throw new Error('El total no cuadra con el monto')
    }

    // Todo bien hasta aqui
    const userId = session.user._id
    const newOrder = new Order({...req.body, isPaid: false, user: userId})

    await newOrder.save()

    await db.disconnect()

    return res.status(200).json(newOrder)

  } catch (error: any) {
    await db.disconnect()
    console.log(error)

    res.status(400).json({
      message: error.message || 'Revise los logs del servidor'
    })
  }
  

  return res.status(200).json(session)
}

