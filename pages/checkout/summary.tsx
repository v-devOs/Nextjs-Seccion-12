import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router';

import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link, Chip } from '@mui/material';
import Cookies from 'js-cookie';

import { CartContext } from '@/context';

import { CartList, OrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts'
import { countries, validateSession } from '@/utils';

const SummaryPage = () => {

  const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext)
  const router = useRouter()

  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onCreateOrder = async() => {
    setIsPosting(true)

    const { hasError, message } = await createOrder() 

    if( hasError ){
      setIsPosting(false)
      setErrorMessage( message )
      return
    }

    router.replace(`/order/${message}`)


  }

  useEffect(() => {
    if( !Cookies.get('firstName') ){
      router.push('/checkout/address')
    }  
  }, [ router ])
  
  
  if( !shippingAddress ){
    return <></>
  }
  

  const { firstName , lastName, address, address2 = '', zip, city, country, phone} = shippingAddress!
  
  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de la orden'>
      <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

      <Grid container>
        <Grid item xs={ 12 } sm={7}>
          <CartList/>
        </Grid>
        <Grid item xs={ 12 } sm={5}>
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ( {numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'} )</Typography>
              
              <Divider sx={{ my: 1}}/>

              <Box display='flex' justifyContent='space-between'>
              <Typography variant='subtitle1'>Direccion de entrega</Typography>
                <NextLink href='/checkout/address'>
                  <Link underline='always' component='span'>
                    Editar
                  </Link>
                </NextLink>
              </Box>
              
              <Typography>{`${firstName} ${lastName}`}</Typography>
              <Typography>{address}{address2 === '' ? '' : ',' + address2 }</Typography>
              <Typography>{city}</Typography>
              <Typography>{zip}</Typography>
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>
              
              <Divider sx={{ my: 1}}/>

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart'>
                  <Link underline='always' component='span'>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <OrderSumary/>

              <Box sx={{ mt: 3, mb: 3 }} display='flex' flexDirection='column'>
                <Button 
                  color='secondary' 
                  className='circular-btn' 
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >Confimar Orden
                </Button>

                <Chip
                  color='error'
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex': 'none'}}
                />
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}


export default SummaryPage