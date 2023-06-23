import { useContext } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link'

import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link } from '@mui/material';

import { CartContext } from '@/context';

import { CartList, OrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts'
import { countries, validateSession } from '@/utils';

const SummaryPage = () => {

  const { shippingAddress, numberOfItems } = useContext(CartContext)

  if( !shippingAddress ){
    return <></>
  }

  const { firstName, lastName, address, address2 = '', zip, city, country, phone} = shippingAddress

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
              <Typography>{countries.find( c => c.code === country)?.name}</Typography>
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

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>Confimar Orden</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}


export default SummaryPage