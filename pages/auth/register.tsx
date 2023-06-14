import { useForm } from 'react-hook-form'
import { useState } from 'react';

import NextLink from 'next/link'

import { Box, Grid, Typography, TextField, Button, Link, Chip } from "@mui/material"
import Error from '@mui/icons-material/Error'

import { AuthLayout } from "@/components/layouts"
import { validations } from '@/utils'
import { tesloApi } from '@/api'


type FormData = {
  email   : string
  password: string
  name    : string
}


const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [existUser, setExistUser] = useState(false)

  const onRegisterUser = async( { email, password, name }: FormData ) => {
    
    try {
      const { data } = await tesloApi.post('user/register', { email, password, name })

      console.log(data)
      
    } catch (error) {
      setExistUser(true)
      console.log('Error en las credenciales')

      setTimeout(() => {
        setExistUser( false )
      }, 3000);
    }
  } 

  return (
    <AuthLayout title="Registrarse">
      <form onSubmit={ handleSubmit(onRegisterUser) }>

        <Box sx={{ width: 350, padding: '10px 20px '}}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Crear cuenta</Typography>
              <Chip
                label={'Este usuario ya esta registrado'}
                color='error'
                icon={ <Error/> }
                className='fadeIn'
                sx={{ display: existUser ? 'flex' : 'none', borderRadius: 2}}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Nombre completo'
                variant="filled"
                fullWidth
                {
                  ...register('name',{
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Minimo 2 caracteres'}
                  })
                }

                error={ !!errors.name }
                helperText={ errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant="filled"
                fullWidth
                {
                  ...register('email',{
                    required: 'Este campo es requerido',
                    validate: validations.isValidEmail
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
                type='submit' 
                color='secondary' 
                className="circular-btn" size="large" 
                fullWidth
              >
                Registrarse
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/login' passHref>
                <Link underline='always' component='span'>
                  ¿Ya tienes cuenta?
                </Link>
              </NextLink>
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage