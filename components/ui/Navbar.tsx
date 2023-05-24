import NextLink from 'next/link'

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import SearchOutlined  from '@mui/icons-material/SearchOutlined';
import ShoopingCart  from '@mui/icons-material/ShoppingCartCheckoutOutlined';

export const Navbar = () => {
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
                  <Button>Hombres</Button>
                </Link>
              </NextLink>
              <NextLink href='/category/women' passHref >
                <Link component='span'>
                  <Button>Mujeres</Button>
                </Link>
              </NextLink>
              <NextLink href='/category/kid' passHref >
                <Link component='span'>
                  <Button>Niños</Button>
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

          <Button>
            Menu
          </Button>

        </Toolbar>
    </AppBar>
  )
}
