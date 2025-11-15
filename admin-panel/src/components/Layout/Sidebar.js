import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Services', icon: <RoomServiceIcon />, path: '/services' },
  { text: 'Bookings', icon: <BookOnlineIcon />, path: '/bookings' },
  { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            EL
          </Box>
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
            Admin Panel
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (mobileOpen) handleDrawerToggle();
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(78, 225, 185, 0.1)',
                  borderRight: '3px solid #4EE1B9',
                  '& .MuiListItemIcon-root': {
                    color: '#4EE1B9',
                  },
                  '& .MuiListItemText-primary': {
                    color: '#4EE1B9',
                    fontWeight: 600,
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(78, 225, 185, 0.05)',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
