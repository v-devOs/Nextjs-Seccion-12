import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message : string }
| IProduct
// | null

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch( req.method ){
    case 'GET':
      return getProductBySlug( req, res )
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { slug } = req.query;

  await db.connect();

  const product = await Product.findOne({slug}).lean()
  
  await db.disconnect();

  !!product ? res.status(200).json(product)
            : res.status(404).json({
                message: `No se encontro ningun articulo con el slug ${slug}`
              })
}
