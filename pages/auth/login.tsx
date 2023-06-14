import { useState, useContext } from 'react';

import NextLink from 'next/link'
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import Error from '@mui/icons-material/Error'

import { AuthLayout } from "@/components/layouts"
import { validations } from '@/utils';
import { tesloApi } from '@/api';
import { AuthContext } from '@/context';


type FormData = {
  email   : string
  password: string
}

const LoginPage = () => {
  
  const { loginUser } = useContext( AuthContext )
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)


  const onLoginUser = async( { email, password }: FormData ) => {

    setShowError(false)
    
    const isValidLogin = await loginUser( email, password )
    
    if( !isValidLogin ){
      setShowError( true )
      setTimeout(() => {
        setShowError( false )
      }, 3000);
    }

    // Todo: Navegar a la siguiente pantalla
    router.replace('/')
  }

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
                helperText={ errors.password?.message}

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
              <NextLink href='/auth/register' passHref>
                <Link underline='always' component='span'>
                  ¿No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage