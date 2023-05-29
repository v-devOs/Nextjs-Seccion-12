import { FC } from 'react';

import { GetServerSideProps } from 'next'

import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";

import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';


interface Props{
  products: IProduct[]
}

const SearchPage: FC<Props> = ({ products }) =>  /* const { products, isLoading } = useProducts('/search/haha')*/ (
  <ShopLayout title="Teslo-Shop - Search" pageDescription="Encuentra los mejores productos de Teslo aqui">
    <Typography variant="h1" component='h1'>Buscar Producto</Typography>
    <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>

    <ProductList products={products} />

  </ShopLayout>
)


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  if( query.length === 0 ){
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm( query )

  return {
    props: {
      products
    }
  }
}

export default SearchPage;