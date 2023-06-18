import { CartList, OrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts'
import { Card, CardContent, Grid, Typography, Divider, Box, Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { useRouter } from 'next/router';


const CartPage = () => {

  const { isLoaded, cart } = useContext(CartContext)
  const router = useRouter()

  useEffect(() => {

    if( isLoaded && cart.length === 0 ){
      router.replace('/cart/empty')
    }
  
    
  }, [ isLoaded, cart, router ])
  
  if( !isLoaded || cart.length === 0 ) {
    return (<></>)
  }

  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carrito de compras de la tienda'>
      <Typography variant='h1' component='h1'>Carrito</Typography>

      <Grid container>

        <Grid item xs={ 12 } sm={7}>
          <CartList isEditable={true}/>
        </Grid>
        <Grid item xs={ 12 } sm={5}>
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>
              <Divider sx={{ my: 1}}/>

              <OrderSumary/>

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>Checkout</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}

export default CartPage