import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaymentIcon from '@mui/icons-material/Payment';
import { format } from 'date-fns';
import Layout from '../../components/Layout/Layout';
import ApiService from '../../services/api';

const PaymentList = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTransactions: 0,
    pendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionsRes, statsRes] = await Promise.all([
        ApiService.getTransactions(),
        ApiService.getPaymentStats(),
      ]);

      const transactionsData = transactionsRes.data.data || [];
      setTransactions(transactionsData);

      // Calculate stats
      const totalRevenue = transactionsData
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      const pendingPayments = transactionsData
        .filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      setStats({
        totalRevenue,
        totalTransactions: transactionsData.length,
        pendingPayments,
      });
    } catch (error) {
      console.error('Failed to fetch payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      pending: 'warning',
      failed: 'error',
      refunded: 'info',
    };
    return colors[status] || 'default';
  };

  const columns = [
    {
      field: 'transactionId',
      headerName: 'Transaction ID',
      width: 150,
      valueGetter: (params) => params.row._id?.slice(-8) || 'N/A',
    },
    {
      field: 'booking',
      headerName: 'Booking ID',
      width: 130,
      valueGetter: (params) => `#${params.row.booking?._id?.slice(-6) || 'N/A'}`,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      minWidth: 180,
      valueGetter: (params) => params.row.customer?.fullName || 'N/A',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      valueGetter: (params) => `$${params.row.amount || 0}`,
    },
    {
      field: 'paymentMethod',
      headerName: 'Method',
      width: 130,
      valueGetter: (params) => params.row.paymentMethod?.type || 'N/A',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value?.toUpperCase()}
          size="small"
          color={getStatusColor(params.value)}
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 150,
      valueGetter: (params) =>
        params.row.createdAt
          ? format(new Date(params.row.createdAt), 'MMM dd, yyyy')
          : 'N/A',
    },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Payments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View all transactions and payment analytics
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <AttachMoneyIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ${stats.totalRevenue.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <PaymentIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Transactions
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats.totalTransactions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <TrendingUpIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Pending Payments
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    ${stats.pendingPayments.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper>
        <DataGrid
          rows={transactions}
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

export default PaymentList;
