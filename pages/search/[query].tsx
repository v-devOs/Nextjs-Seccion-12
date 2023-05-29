import { FC } from 'react';

import { GetServerSideProps } from 'next'

import { Box, Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";

import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';


interface Props{
  products: IProduct[]
  foundProducts: boolean
  query: string
}

const SearchPage: FC<Props> = ({ products, foundProducts, query }) =>  /* const { products, isLoading } = useProducts('/search/haha')*/ (
  <ShopLayout title="Teslo-Shop - Search" pageDescription="Encuentra los mejores productos de Teslo aqui">
    <Typography variant="h1" component='h1'>Buscar Productos</Typography>

    {
      foundProducts
        ? <Typography variant="h2" textTransform='capitalize' sx={{ mb: 1 }}>: {query}</Typography>
        : <Box display='flex' >
            <Typography variant="h2" sx={{ mb: 1 }}>No encontramos ningun producto:</Typography>
            <Typography variant="h2" color='secondary' textTransform='capitalize' sx={{ ml: 1 }}>{query}</Typography>
          </Box>

    }

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
  const foundProducts = products.length > 0;
  
  !foundProducts && (products = await dbProducts.getAllProducts());



  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage;