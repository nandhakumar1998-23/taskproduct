import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null); // mobile menu
  const [userMenuAnchor, setUserMenuAnchor] = useState(null); // user menu
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.get("http://localhost:8000/accounts/profile/", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUser(res.data))
      .catch(err => console.error("Failed to fetch profile", err));
    }
  }, []);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleUserMenu = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header-container">
      <AppBar position="sticky" sx={{ backgroundColor: "#fe9da5", color: "#744e51ff" }}>
        <Toolbar className="toolbar">
          <Typography variant="h5" component="div" className="logo">
            MyShop
          </Typography>

          {/* Desktop Menu */}
          <Box className="desktop-menu" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Shop</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>

            {/* Login / Avatar */}
            {!user ? (
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            ) : (
              <>
              <IconButton onClick={handleUserMenu} sx={{ ml: 2 }}>
                <Avatar src={user.profile_picture} alt={user.username} />
              </IconButton>
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                sx={{ '& .MuiPaper-root': { width: 300 } }}
              >
                <MenuItem disabled><strong>{user.username}</strong></MenuItem>
                <MenuItem disabled>Email: {user.email}</MenuItem>
                <MenuItem disabled>Contact: {user.contact_number}</MenuItem>
                <MenuItem disabled>Address: {user.address}</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem>
              </Menu>
            </>

            )}
          </Box>

          {/* Mobile Menu */}
          <Box className="mobile-menu" sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Home</MenuItem>
              <MenuItem onClick={handleClose}>Shop</MenuItem>
              <MenuItem onClick={handleClose}>About</MenuItem>
              <MenuItem onClick={handleClose}>Contact</MenuItem>
              {!user ? (
                <MenuItem onClick={() => { handleClose(); navigate('/login'); }}>Login</MenuItem>
              ) : (
                <MenuItem onClick={handleUserMenu}>Profile</MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <Typography variant="h3" className="hero-title">Discover the Best Products</Typography>
          <Typography variant="h6" className="hero-subtitle">
            Shop your favorite items with amazing discounts
          </Typography>
          <Button variant="contained" color="secondary" className="hero-button">
            Shop Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
