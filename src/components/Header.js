import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import imgLogo from "../logoHeader-disney.png"
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import useAuth from '../hooks/useAuth';
import imgUser from "../UserHeader.png"
import { useNavigate } from 'react-router-dom';
import Search from "./Search"

const pages = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Watchlist', icon: <AddIcon /> },
    { name: 'Originals', icon: <StarIcon /> },
    { name: 'Movies', icon: <LocalMoviesIcon /> },
    { name: 'Series', icon:<LiveTvIcon />}
  ];
const settings = ['Sign Out'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let navigate = useNavigate();
  const { user } = useAuth()
  const auth = useAuth()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {{
    
  }
    setAnchorElUser(null);
  };

  const buttonStyle = {
    position: 'relative',
    my: 2,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'none',
    padding: '6px 16px',  
    '& .icon-text-container': {
      display: 'flex',
      alignItems: 'center',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '0',
      height: '2px',
      bottom: '0',
      right: '20px',
      transform: 'translateX(-50%)',
      background: 'white',
      transition: 'width 0.3s ease-in-out',
    },
    '&:hover::after': {
      width: '50px',
      right: '0'
    },
  };



  return (
    <AppBar position="fixed" sx={{backgroundColor:'rgb(9, 11, 19)'}} >
      <Container maxWidth="">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={imgLogo} alt='img-logo' style={{width:'100px'}}></img>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} >
                    {page.icon}
                  <Typography textAlign="center" marginLeft='5px'>
                     {page.name}
                  </Typography>
                </MenuItem>
              ))}
              <Search />
            </Menu>
          </Box>


          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily:'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={imgLogo} style={{width:'100px'}}></img>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={buttonStyle}
              >
                {page.icon}
                <span style={{marginLeft: '10px',}}>{page.name}</span>
              </Button>
            ))}
            <Search />
          </Box>
          

          <Typography variant='h6' marginRight="10px"> 
            {user?.username}
          </Typography>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={imgUser} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() =>{ auth.logout(() => navigate("/"))}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;