import NextLink from 'next/link'
import { GetServerSideProps, NextPage } from 'next'

import { CartList, OrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts'
import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link, Chip } from '@mui/material';
import CreditCard from '@mui/icons-material/CreditCardOffOutlined'
import CreditScore from '@mui/icons-material/CreditScoreOutlined'
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

interface Props{
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

  console.log(order)

  return (
    <ShopLayout title='Resumen de la orden 123123' pageDescription='Resumen de la orden'>
      <Typography variant='h1' component='h1'>Orden: ABC</Typography>

      {/* <Chip sx={{ my: 2}}
        label='Pendiente de pago'
        variant='outlined'
        color='error'
        icon={ <CreditCard />}
      /> */}

      <Chip sx={{ my: 2}}
        label='Orden pagada'
        variant='outlined'
        color='success'
        icon={ <CreditScore />}
      />

      <Grid container>
        <Grid item xs={ 12 } sm={7}>
          <CartList/>
        </Grid>
        <Grid item xs={ 12 } sm={5}>
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ( 3 prodcutos )</Typography>
              
              <Divider sx={{ my: 1}}/>

              <Box display='flex' justifyContent='space-between'>
              <Typography variant='subtitle1'>Direccion de entrega</Typography>
                <NextLink href='/checkout/address'>
                  <Link underline='always' component='span'>
                    Editar
                  </Link>
                </NextLink>
              </Box>
              
              <Typography>Fernando Herrera</Typography>
              <Typography>Algun Lugar</Typography>
              <Typography>Juventino Rosas</Typography>
              <Typography>38240</Typography>
              <Typography>Canada</Typography>
              <Typography>+52 8779878798</Typography>
              
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
                <h2>Pagar</h2>
                
                <Chip sx={{ my: 2}}
                  label='Orden pagada'
                  variant='outlined'
                  color='success'
                  icon={ <CreditScore />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  
  const { id = '' } = query

  const session: any = await getSession({ req })

  if( !session ){
    return {
      redirect: {
        destination: `'/auth/login?p=/order/${id}`,
        permanent: false
      }
    }
  }

  const order = await dbOrders.getOrderById( id.toString() )

  if( !order ){
    return {
      redirect: {
        destination: '/order/history',
        permanent: false
      }
    }
  }

  if( order.user !== session.user._id ){
    return {
      redirect: {
        destination: '/order/history',
        permanent: false
      }
    }
  }


  return {
    props: {
      order
    }
  }
}

export default OrderPage