import { FC, useContext, useState } from "react";

import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from "next/router";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ShopLayout } from "@/components/layouts"
import { ItemCounter } from "@/components/ui";

import { CartContext } from "@/context";

import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { dbProducts } from "@/database";

interface Props{
  product: IProduct
}


const ProductPage: FC<Props> = ({ product }) => {

  const { cart ,addProductToCart } = useContext(CartContext)
  const router = useRouter();

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id    ,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })


  const onChangeSize = ( size: ISize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = ( quantity: number ) => {
      setTempCartProduct( currentProduct => ({
        ...currentProduct,
        quantity
      }))
  }

  const onAddProductCart = () => {

    if( !tempCartProduct.size ) return

    addProductToCart(tempCartProduct)

    router.push('/cart')
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={ 7 }>
          <ProductSlideshow images={product.images}/>
        </Grid>

        <Grid item xs={12} sm={ 5 }>
          <Box display='flex' flexDirection='column'>


            <Typography variant="h1" component='h1'>{ product.title }</Typography>
            <Typography variant="subtitle1" component='h2'>${ product.price }</Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter 
                currentValue={tempCartProduct.quantity} 
                maxValue={product.inStock > 10 ? 10 : product.inStock} 
                updateQuantity={onUpdateQuantity}                
              />
              <SizeSelector 
                sizes={product.sizes} 
                seletedSize={tempCartProduct.size}
                onChangeSize={onChangeSize}
              />
            </Box>

            {/* Agregar al carrito */}
            
            {
              (product.inStock > 0)
              ? (
                <Button 
                  color="secondary" 
                  className="circular-btn"
                  onClick={onAddProductCart}
                >
                  {
                    tempCartProduct.size
                    ? "Agregar al carrito"
                    : "Seleccione una talla"
                  }
                </Button>
              ): (
                <Chip label='No hay disponibles' color="error" variant="outlined"/>
              )
            }

            {/* Descripcion */}

            <Box sx={{ mt: 3}}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography> 
            </Box>
          </Box>
        </Grid>

      </Grid>

    </ShopLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await  dbProducts.getAllProductsSlugs();


  return {
    paths: slugs.map( ( slug ) => (
      {
        params: { ...slug }
      }
    )),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug : string } 

  const product = await  dbProducts.getProductBySlug( slug )

  if( !product ){
    return{
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}




export default ProductPage