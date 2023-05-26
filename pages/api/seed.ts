import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models';

type Data = { message: string } | { products: IProduct[] }

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  if( process.env.NODE_ENV === 'production' )
    res.status(401).json({ message: 'No tiene acceso a este servicio'})


  await db.connect();

  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products)
  // console.log(await Product.find({}));

  await db.disconnect();

  res.status(200).json({ message: 'Informacion cargada correctamente'})


}