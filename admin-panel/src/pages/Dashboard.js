import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Layout from '../components/Layout/Layout';
import ApiService from '../services/api';

const StatCard = ({ title, value, icon, color, loading }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '12px',
            backgroundColor: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Since we don't have admin stats endpoint yet, we'll fetch from existing endpoints
      const [usersRes, servicesRes, bookingsRes] = await Promise.all([
        ApiService.getUsers(),
        ApiService.getServices(),
        ApiService.getBookings(),
      ]);

      setStats({
        totalUsers: usersRes.data.data?.length || 0,
        totalServices: servicesRes.data.data?.length || 0,
        totalBookings: bookingsRes.data.data?.length || 0,
        totalRevenue: bookingsRes.data.data?.reduce((sum, booking) => 
          sum + (booking.pricing?.totalPrice || 0), 0
        ) || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome to your admin dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleIcon sx={{ fontSize: 30 }} />}
            color="#4EE1B9"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Services"
            value={stats.totalServices}
            icon={<RoomServiceIcon sx={{ fontSize: 30 }} />}
            color="#1976d2"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<BookOnlineIcon sx={{ fontSize: 30 }} />}
            color="#ff9800"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon={<AttachMoneyIcon sx={{ fontSize: 30 }} />}
            color="#4caf50"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analytics and charts coming soon...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
