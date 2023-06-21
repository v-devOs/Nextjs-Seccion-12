import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

import { ShopLayout } from "@/components/layouts"
import { countries, validateSession } from "@/utils"
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { useContext } from 'react'
import { CartContext } from '@/context'

type FormData = {
  firstName: string,
  lastName:  string,
  address:   string,
  address2?: string,
  zip:       string,
  city:      string,
  country:   string,
  phone:     string,
}

const getAddressFromCookies = (): FormData => {
  return{
    firstName: Cookies.get('firstName') || '',
    lastName:  Cookies.get('lastName') || '',
    address:   Cookies.get('address') || '',
    address2:  Cookies.get('address2') || '',
    zip:       Cookies.get('zip') || '',
    city:      Cookies.get('city') || '',
    country:   Cookies.get('country') || '',
    phone:     Cookies.get('phone') || '', 
  }
}

const AddressPage = () => {

  const { updateAddress } = useContext(CartContext)

  const router = useRouter()

  const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
    defaultValues: getAddressFromCookies()  
  })
  
  const onSubmitAddress = ( data: FormData ) => {
    

    updateAddress( data )

    router.push('/checkout/summary')
  }

  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion del destino">
      <Typography variant="h1" component='h1'>Dirección</Typography>

      <form onSubmit={ handleSubmit( onSubmitAddress ) } noValidate>

        <Grid container spacing={2} mt={2}>

          <Grid item xs={12} sm={6}>
            <TextField 
              label='Nombre' 
              variant="filled" 
              fullWidth
              {
                ...register('firstName',{
                  required: 'Este campo es requerido',
                })
              }
              error={ !!errors.firstName }
              helperText={ errors.firstName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
              label='Apellido' 
              variant="filled" 
              fullWidth 
              {
                ...register('lastName',{
                  required: 'Este campo es requerido'
                })
              }
              error={ !!errors.lastName }
              helperText={ errors.lastName?.message}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
              label='Direccion' 
              variant="filled" 
              fullWidth 
              {
                ...register('address',{
                  required: 'Este campo es requerido'
                })
              }
              error={ !!errors.address }
              helperText={ errors.address?.message}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Direccion 2 (opcional)'
              variant="filled" 
              fullWidth 
              {
                ...register('address2')
              }

              error={ !!errors.address2 }
              helperText={ errors.address2?.message}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Codigo Postal' 
              variant="filled" 
              fullWidth
              {
                ...register('zip',{
                  required: 'Este campo es requerido'
                })
              }
              error={ !!errors.zip }
              helperText={ errors.zip?.message} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Ciudad' 
              variant="filled" 
              fullWidth 
              {
                ...register('city',{
                  required: 'Este campo es requerido'
                })
              }
              error={ !!errors.city }
              helperText={ errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl 
              fullWidth
              >
              <TextField
                select
                variant="filled"
                label='Pais'
                defaultValue={countries[0].code}
                {
                  ...register('country', {
                    required: 'Este campo es requerido'
                  })
                }
                error={ !!errors.country }
                // helperText={ errors.country?.message}
              >
                {
                  countries.map( country => (
                    <MenuItem 
                      key={ country.code }
                      value={country.code}
                    >{country.name}</MenuItem>

                  ))
                }
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Teléfono' 
              variant="filled" 
              fullWidth 
              {
                ...register('phone',{
                  required: 'Este campo es requerido'
                })
              }
              error={ !!errors.phone }
              helperText={ errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5}} display='flex'  justifyContent='center'>
          <Button 
            color="secondary" 
            className="circular-btn" 
            size="large"
            type='submit'
          >
            Revisar pedido
          </Button>
        </Box>
      </form>

    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

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


export default AddressPage