
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, 
    MenuItem, Container, Button,Link }  from '@mui/material'

// ------- Hooks ----
import {useAuth} from 'hooks/useAuth'
import { useCurrentUserProp } from 'hooks/useCurrentUserProp'

// ------- Actions -----
import { signOut } from 'reducers/auth'


const defaultPages = [{
        name:'Inicio',
        url:'/'
    },{
        name:'Ingresar',
        url:'/login'
}]

const defaultAuthPages = [{
        name:'Inicio',
        url:'/'
    },{
        name:'Perfil',
        url:'/profile'
    },{
        name:'Salir',
        url:'/'
}]

const MainAppBar = () =>{
    var pages = defaultPages
    const auth = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null)

  if(auth.user!=null){
    pages = defaultAuthPages
  }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = (event) => {
        console.log(event.currentTarget.id)
        if(event.currentTarget.id === 'Salir'){
            dispatch(signOut())
        }

        navigate(pages.find(x=>x.name===event.currentTarget.id).url)
        setAnchorElNav(null);
    }

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Box sx={{width:100, mr: 2, display: { xs: 'none', md: 'flex'}}}>
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        href="/"
                        sx={{ fontSize: 18 }}
                    >
                    {'Jei & Juan'}
                    </Link>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit" >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar" anchorEl={anchorElNav} keepMounted
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                        <MenuItem key={page.name} onClick={handleCloseNavMenu} id={page.name}>
                            <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box sx={{width:100, flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        href="/"
                        sx={{ fontSize: 18 }}
                    >
                    {'Jei & Juan'}
                    </Link>
                </Box>
                <Box sx={{ flexGrow: 2,display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page.name} id={page.name} onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page.name}
                    </Button>
                    ))}
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    )
}

export default MainAppBar