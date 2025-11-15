import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { format } from 'date-fns';
import Layout from '../../components/Layout/Layout';
import ApiService from '../../services/api';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getBooking(id);
      const bookingData = response.data.data;
      setBooking(bookingData);
      setNewStatus(bookingData.status);
    } catch (error) {
      console.error('Failed to fetch booking:', error);
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      await ApiService.updateBooking(id, { status: newStatus });
      setSuccess('Booking status updated successfully');
      fetchBooking();
    } catch (error) {
      console.error('Failed to update booking:', error);
      setError(error.response?.data?.message || 'Failed to update booking');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelBooking = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        setUpdating(true);
        await ApiService.cancelBooking(id);
        setSuccess('Booking cancelled successfully');
        fetchBooking();
      } catch (error) {
        console.error('Failed to cancel booking:', error);
        setError('Failed to cancel booking');
      } finally {
        setUpdating(false);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'info',
      in_progress: 'primary',
      completed: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <Alert severity="error">Booking not found</Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/bookings')}
          sx={{ mb: 2 }}
        >
          Back to Bookings
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Booking Details #{booking._id?.slice(-6)}
            </Typography>
            <Chip
              label={booking.status?.replace('_', ' ').toUpperCase()}
              color={getStatusColor(booking.status)}
              size="small"
            />
          </Box>
          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelBooking}
              disabled={updating}
            >
              Cancel Booking
            </Button>
          )}
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Customer Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Name</Typography>
                <Typography variant="body1">{booking.customer?.fullName || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Email</Typography>
                <Typography variant="body1">{booking.customer?.email || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Phone</Typography>
                <Typography variant="body1">{booking.customer?.phoneNumber || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              <RoomServiceIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Service Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Service</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {booking.service?.title || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Category</Typography>
                <Typography variant="body1">{booking.service?.category || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Provider</Typography>
                <Typography variant="body1">
                  {booking.provider?.fullName || 'Not assigned yet'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Schedule Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Scheduled Date</Typography>
                <Typography variant="body1">
                  {booking.scheduledDate 
                    ? format(new Date(booking.scheduledDate), 'PPP')
                    : 'Not scheduled'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Time Slot</Typography>
                <Typography variant="body1">{booking.timeSlot || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Address</Typography>
                <Typography variant="body1">
                  {booking.location?.address || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              <AttachMoneyIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Payment Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Service Cost</Typography>
                <Typography variant="body2">
                  ${booking.pricing?.basePrice || 0}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Platform Fee</Typography>
                <Typography variant="body2">
                  ${booking.pricing?.platformFee || 0}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" fontWeight="bold">Total</Typography>
                <Typography variant="body1" fontWeight="bold" color="primary">
                  ${booking.pricing?.totalPrice || 0}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={booking.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
              color={booking.paymentStatus === 'paid' ? 'success' : 'warning'}
              size="small"
              sx={{ width: '100%' }}
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Update Status
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField
              select
              fullWidth
              label="Booking Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
            <Button
              fullWidth
              variant="contained"
              onClick={handleStatusUpdate}
              disabled={updating || newStatus === booking.status}
              sx={{
                background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
              }}
            >
              {updating ? <CircularProgress size={24} /> : 'Update Status'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default BookingDetails;
