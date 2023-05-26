import NextLink from 'next/link'
import { CartList, OrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts'
import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link, Chip } from '@mui/material';
import CreditCard from '@mui/icons-material/CreditCardOffOutlined'
import CreditScore from '@mui/icons-material/CreditScoreOutlined'

const OrderPage = () => {
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

export default OrderPage