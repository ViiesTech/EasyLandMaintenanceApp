import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';
import Layout from '../../components/Layout/Layout';
import ApiService from '../../services/api';

const BookingList = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getBookings();
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
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

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = 
      booking.customer?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      field: 'bookingId',
      headerName: 'Booking ID',
      width: 120,
      valueGetter: (params) => `#${params.row._id?.slice(-6)}`,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      minWidth: 180,
      valueGetter: (params) => params.row.customer?.fullName || 'N/A',
    },
    {
      field: 'service',
      headerName: 'Service',
      flex: 1,
      minWidth: 180,
      valueGetter: (params) => params.row.service?.title || 'N/A',
    },
    {
      field: 'provider',
      headerName: 'Provider',
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row.provider?.fullName || 'Unassigned',
    },
    {
      field: 'scheduledDate',
      headerName: 'Scheduled Date',
      width: 150,
      valueGetter: (params) => 
        params.row.scheduledDate 
          ? format(new Date(params.row.scheduledDate), 'MMM dd, yyyy')
          : 'N/A',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value?.replace('_', ' ').toUpperCase()}
          size="small"
          color={getStatusColor(params.value)}
        />
      ),
    },
    {
      field: 'totalPrice',
      headerName: 'Amount',
      width: 120,
      valueGetter: (params) => `$${params.row.pricing?.totalPrice || 0}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => navigate(`/bookings/${params.row._id}`)}
          color="primary"
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bookings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage all service bookings
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              placeholder="Search by customer or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <DataGrid
          rows={filteredBookings}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          loading={loading}
          autoHeight
        />
      </Paper>
    </Layout>
  );
};

export default BookingList;
