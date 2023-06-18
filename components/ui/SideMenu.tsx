import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"

import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined'
import EscalatorWarningOutlined from '@mui/icons-material/EscalatorWarningOutlined'
import FemaleOutlined from '@mui/icons-material/FemaleOutlined'
import MaleOutlined from '@mui/icons-material/MaleOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined'
import LoginOutlined from '@mui/icons-material/LoginOutlined'

import { AuthContext, UIContext } from '@/context';


export const SideMenu = () => {

    const { push } = useRouter()
    const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
    const { user, isLoggedIn } = useContext(AuthContext)

    const [searchTerm, setSearchTerm] = useState('')

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return

        navigateTo(`/search/${ searchTerm }`)
    }

    const navigateTo = ( url: string ) => {
        push(url)
        toggleSideMenu()
    }

    return (
        <Drawer
            open={ isMenuOpen }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={ toggleSideMenu }
        >   
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItemButton>
                    <Input
                        value = { searchTerm }
                        onChange={ e => setSearchTerm( e.target.value )}
                        onKeyDown={ e => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ e => onSearchTerm() }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItemButton>
                {
                    isLoggedIn && (
                        <>
                            <ListItemButton >
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItemButton>

                            <ListItemButton >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItemButton>
                        </>
                    )
                }



                <ListItemButton  sx={{ display: { xs: '', sm: 'none' }}} 
                    onClick={ () => navigateTo('/category/men')}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItemButton>

                <ListItemButton  sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/women')}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItemButton>

                <ListItemButton  sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ () => navigateTo('/category/kid')}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItemButton>

                {
                    !isLoggedIn ? (
                        <ListItemButton >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItemButton>
                    ) : (
                        <ListItemButton >
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItemButton>
                    )
                }

                {/* Admin */}
                <Divider />

                {
                    user?.role === 'admin' && (
                        <>
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItemButton >
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItemButton>
                            <ListItemButton >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItemButton>

                            <ListItemButton >
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItemButton>
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}