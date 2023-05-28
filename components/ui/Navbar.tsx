import { useContext } from 'react';

import NextLink from 'next/link'
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import SearchOutlined  from '@mui/icons-material/SearchOutlined';
import ShoopingCart  from '@mui/icons-material/ShoppingCartCheckoutOutlined';

import { UIContext } from '@/context';


export const Navbar = () => {

  const { toggleSideMenu } = useContext(UIContext)

  const { route } = useRouter()

  return (
    <AppBar>
        <Toolbar>
          <NextLink href='/' passHref>
            <Link display='flex' alignItems='center' component='span'>
              <Typography variant='h6'>Teslo |</Typography>
              <Typography variant='h6' sx={{ ml: 0.5}}>Shop</Typography>
            </Link>
          </NextLink>

          <Box flex={1}/>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

              <NextLink href='/category/men' passHref >
                <Link component='span'>
                  <Button
                    color={ route === '/category/men' ? 'primary': 'info'}
                  >Hombres</Button>
                </Link>
              </NextLink>

              <NextLink href='/category/women' passHref >
                <Link component='span'>
                  <Button
                    color={ route === '/category/women' ? 'primary': 'info'}
                  >Mujeres</Button>
                </Link>
              </NextLink>

              <NextLink href='/category/kid' passHref >
                <Link component='span'>
                  <Button
                    color={ route === '/category/kid' ? 'primary': 'info'}
                  >Niños</Button>
                </Link>
              </NextLink>
              
          </Box>

          <Box flex={1}/>

          <IconButton>
            <SearchOutlined/>
          </IconButton>

          <NextLink href='/cart' passHref>
            <Link component='span'>
              <IconButton>
                <Badge badgeContent={2} color='secondary'>
                  <ShoopingCart/>
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          <Button
            onClick={toggleSideMenu}
          >
            Menu
          </Button>

        </Toolbar>
    </AppBar>
  )
}
