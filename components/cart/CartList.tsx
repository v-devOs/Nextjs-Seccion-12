import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { FC, useContext } from 'react';
import { ItemCounter } from '../ui';
import { CartContext } from '@/context';
import { ICartProduct } from '@/interfaces';


interface Props{
  isEditable?: boolean
}

export const CartList: FC<Props> = ({ isEditable = false }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

  const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number ) => {
    product.quantity = newQuantityValue
    updateCartQuantity( product )
  }

  return (
    <>
      {
        cart.map( product => (
          <Grid container spacing={2} key={ product.slug + product.size } sx={{mb: 1}}>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link component='span'>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component='img'
                      sx={{ borderRadius: '5px'}}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{ product.title }</Typography>
                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>

                  {
                    isEditable
                    ? <ItemCounter 
                      currentValue={product.quantity} 
                      maxValue={ 10 }
                      updateQuantity={ (value) => onNewCartQuantityValue(product, value )}
                    />
                    : <Typography variant='h5'>{ product.quantity} {product.quantity > 1 ? 'productos': 'producto'}</Typography>
                  }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>${ product.price }</Typography>
                
                {
                  isEditable && (
                    <Button 
                      variant='text' 
                      color='secondary'
                      onClick={ () => removeCartProduct( product )}
                    >
                      Remover
                    </Button>
                  )
                }
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
