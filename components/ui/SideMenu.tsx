import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"

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


export const SideMenu = () => {
  return (
    <Drawer
        open={ true }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Perfil'} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItem>


                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>


                <ListItem button>
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ingresar'} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Salir'} />
                </ListItem>


                {/* Admin */}
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem button>
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Productos'} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ordenes'} />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    <ListItemText primary={'Usuarios'} />
                </ListItem>
            </List>
        </Box>
    </Drawer>
  )
}