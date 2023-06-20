import NextLink from 'next/link'
import { CartList, OrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts'
import { Card, CardContent, Grid, Typography, Divider, Box, Button, Link } from '@mui/material';
import { GetServerSideProps } from 'next';
import { validateSession } from '@/utils';

const SummaryPage = () => {
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
                <Button color='secondary' className='circular-btn' fullWidth>Confimar Orden</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {

  const { token = '' } = req.cookies;

  const isValidToken = await validateSession( token )

  if( !isValidToken ){
    return {
      redirect: {
        destination: '/auth/login?p=/checkout/address',
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
}

export default SummaryPage