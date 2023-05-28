import { db } from '.';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';

export const getProductBySlug = async ( slug: string): Promise<IProduct> => {

  await db.connect();

  const product = await Product.findOne({slug}).lean()

  await db.disconnect()

  return !product ? null : JSON.parse( JSON.stringify( product ))
}