import { useState, useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next'


import NextLink from 'next/link'
import { useRouter } from 'next/router';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Error from '@mui/icons-material/Error'

import { AuthLayout } from "@/components/layouts"
import { validations } from '@/utils';


type FormData = {
  email   : string
  password: string
}

const LoginPage = () => {
  
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)
  const [providers, setProviders] = useState<any>({})

  const onLoginUser = async( { email, password }: FormData ) => {

    setShowError(false)
    
    await signIn('credentials', { email, password })
  }

  useEffect(() => {
    getProviders().then( prev => {
      setProviders(prev)
    })
  }, [])

  
  return (
    <AuthLayout title="Ingresar">
      
      <form onSubmit={ handleSubmit( onLoginUser )} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px '}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography 
                variant='h1' 
                component='h1'
                >Iniciar Sesion</Typography>
              <Chip
                label={'No reconocemos este usuario / contraseña'}
                color='error'
                icon={ <Error/> }
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none', borderRadius: 2}}
              />
            </Grid>
            

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant="filled"
                fullWidth
                { 
                  ...register('email', {
                    required: 'Este campo es requerido',
                    validate: validations.isEmail

                  })
                }
                error={ !!errors.email }
                helperText={ errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                type="password"
                variant="filled"
                fullWidth
                {
                  ...register('password',{
                    required: 'Este campo es requerido',
                    minLength: { value: 6, message: 'Minimo 6 caracteres'}
                  })
                }

                error={ !!errors.password }
                helperText={ errors.password?.message }

              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                color='secondary' 
                className="circular-btn" 
                size="large" 
                fullWidth
                type='submit'
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href={`/auth/register?p=${router.query.p?.toString() || '/auth/register'}`} passHref>
                <Link underline='always' component='span'>
                  ¿No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
              <Divider sx={{ width: '100%', mb: 2}}/>

              {
                Object.values( providers ).map( ( provider: any ) => {

                  if( provider.id === 'credentials') return <div key={provider.id}></div>
                  return (
                    <Button
                      key={provider.id}
                      variant='outlined'
                      fullWidth
                      color='primary'
                      sx={{ mt: 1}}
                      onClick={() => signIn(provider.id)}
                    >
                      { provider.name}
                    </Button>
                  )
                })
              }


            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  
  const session = await getSession({ req })

  const { p = '/' } = query

  if( session ){
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
}

export default LoginPage