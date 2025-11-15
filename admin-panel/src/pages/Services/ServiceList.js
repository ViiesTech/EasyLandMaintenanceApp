import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Chip,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from '../../components/Layout/Layout';
import ApiService from '../../services/api';

const ServiceList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getServices();
      setServices(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await ApiService.deleteService(id);
        fetchServices();
      } catch (error) {
        console.error('Failed to delete service:', error);
        alert('Failed to delete service');
      }
    }
  };

  const filteredServices = services.filter((service) =>
    service.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: 'title',
      headerName: 'Service Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      valueGetter: (params) => `$${params.row.price?.startingCost || 0}`,
    },
    {
      field: 'availability',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value === 'available' ? 'Available' : 
                 params.value === 'high_demand' ? 'High Demand' : 'Unavailable'}
          size="small"
          color={
            params.value === 'available'
              ? 'success'
              : params.value === 'high_demand'
              ? 'warning'
              : 'error'
          }
        />
      ),
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 100,
      valueGetter: (params) => 
        params.row.rating?.average ? `★ ${params.row.rating.average.toFixed(1)}` : 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => navigate(`/services/${params.row._id}/edit`)}
            color="primary"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(params.row._id)}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Services
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all services offered on the platform
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/services/create')}
          sx={{
            background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
          }}
        >
          Add Service
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          fullWidth
        />
      </Paper>

      <Paper>
        <DataGrid
          rows={filteredServices}
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

export default ServiceList;
