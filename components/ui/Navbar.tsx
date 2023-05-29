import { useContext, useState } from 'react';

import NextLink from 'next/link'
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import SearchOutlined  from '@mui/icons-material/SearchOutlined';
import ShoopingCart  from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ClearOutlined from '@mui/icons-material/ClearOutlined'

import { UIContext } from '@/context';


export const Navbar = () => {

  const { route, push } = useRouter()
  const { toggleSideMenu } = useContext(UIContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
      if( searchTerm.trim().length === 0 ) return

      push(`/search/${ searchTerm }`)
  }




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

          <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>

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

          {/* Pantallas grandes */}

          {

            isSearchVisible
            ? (
              <Input
                className='fadeIn'
                sx={{ display: { xs: 'none', sm:'flex'}}}
                value = { searchTerm }
                onChange={ e => setSearchTerm( e.target.value )}
                onKeyDown={ e => e.key === 'Enter' ? onSearchTerm() : null }
                type='text'
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                      <IconButton
                        onClick={ () => setIsSearchVisible(false) }
                      >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            :(
              <IconButton
                className='fadeIn'
                onClick={ () => setIsSearchVisible(true) }
              >
                <SearchOutlined/>
              </IconButton>
            )

          }
          
          

          {/* Pantallas pequeñas */}
          <IconButton
            sx={{ display: {xs: 'flex', sm: 'none'}}}
            onClick={ toggleSideMenu }
          >
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
