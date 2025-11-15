import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../../components/Layout/Layout';
import ApiService from '../../services/api';

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Lawn Care',
    startingCost: '',
    priceType: 'per service',
    availability: 'available',
    duration: '',
  });

  useEffect(() => {
    if (isEditMode) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getService(id);
      const service = response.data.data;
      setFormData({
        title: service.title || '',
        description: service.description || '',
        category: service.category || 'Lawn Care',
        startingCost: service.price?.startingCost || '',
        priceType: service.price?.priceType || 'per service',
        availability: service.availability || 'available',
        duration: service.duration || '',
      });
    } catch (error) {
      console.error('Failed to fetch service:', error);
      setError('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const submitData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: {
          startingCost: parseFloat(formData.startingCost),
          currency: 'USD',
          priceType: formData.priceType,
        },
        availability: formData.availability,
        duration: formData.duration,
      };

      if (isEditMode) {
        await ApiService.updateService(id, submitData);
        setSuccess('Service updated successfully');
      } else {
        await ApiService.createService(submitData);
        setSuccess('Service created successfully');
        setTimeout(() => navigate('/services'), 1500);
      }
    } catch (error) {
      console.error('Failed to save service:', error);
      setError(error.response?.data?.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
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

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/services')}
          sx={{ mb: 2 }}
        >
          Back to Services
        </Button>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {isEditMode ? 'Edit Service' : 'Create New Service'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isEditMode ? 'Update service information' : 'Add a new service to the platform'}
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Service Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
              >
                <MenuItem value="Lawn Care">Lawn Care</MenuItem>
                <MenuItem value="Garden Maintenance">Garden Maintenance</MenuItem>
                <MenuItem value="Tree Service">Tree Service</MenuItem>
                <MenuItem value="Landscaping">Landscaping</MenuItem>
                <MenuItem value="Irrigation">Irrigation</MenuItem>
                <MenuItem value="Pest Control">Pest Control</MenuItem>
                <MenuItem value="Seasonal">Seasonal</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Starting Cost"
                type="number"
                value={formData.startingCost}
                onChange={(e) => handleChange('startingCost', e.target.value)}
                required
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Price Type"
                value={formData.priceType}
                onChange={(e) => handleChange('priceType', e.target.value)}
              >
                <MenuItem value="per service">Per Service</MenuItem>
                <MenuItem value="per hour">Per Hour</MenuItem>
                <MenuItem value="per sq ft">Per Sq Ft</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Duration (e.g., 2 hours)"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Availability"
                value={formData.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="high_demand">High Demand</MenuItem>
                <MenuItem value="unavailable">Unavailable</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/services')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  sx={{
                    background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
                  }}
                >
                  {saving ? <CircularProgress size={24} /> : isEditMode ? 'Update Service' : 'Create Service'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Layout>
  );
};

export default ServiceForm;
