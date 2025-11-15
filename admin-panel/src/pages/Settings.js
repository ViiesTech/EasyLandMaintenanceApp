import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Layout from '../components/Layout/Layout';

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [settings, setSettings] = useState({
    // Platform Settings
    platformName: 'EasyLand Maintenance',
    platformEmail: 'support@easyland.com',
    platformPhone: '+1 (555) 123-4567',
    
    // Booking Settings
    bookingCancellationWindow: 24,
    autoConfirmBookings: false,
    requireProviderApproval: true,
    
    // Payment Settings
    platformFeePercentage: 15,
    minimumBookingAmount: 50,
    refundPolicy: '48',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In production, this would call an API endpoint
      // await ApiService.updateSettings(settings);
      
      setSuccess('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage platform configuration and preferences
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSave}>
        <Grid container spacing={3}>
          {/* Platform Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Platform Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Platform Name"
                    value={settings.platformName}
                    onChange={(e) => handleChange('platformName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Support Email"
                    type="email"
                    value={settings.platformEmail}
                    onChange={(e) => handleChange('platformEmail', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Support Phone"
                    value={settings.platformPhone}
                    onChange={(e) => handleChange('platformPhone', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Booking Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Booking Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Cancellation Window (hours)"
                    type="number"
                    value={settings.bookingCancellationWindow}
                    onChange={(e) => handleChange('bookingCancellationWindow', e.target.value)}
                    helperText="Minimum hours before scheduled time to allow cancellation"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoConfirmBookings}
                        onChange={(e) => handleChange('autoConfirmBookings', e.target.checked)}
                      />
                    }
                    label="Auto-confirm bookings"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.requireProviderApproval}
                        onChange={(e) => handleChange('requireProviderApproval', e.target.checked)}
                      />
                    }
                    label="Require provider approval"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Payment Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Payment Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Platform Fee (%)"
                    type="number"
                    value={settings.platformFeePercentage}
                    onChange={(e) => handleChange('platformFeePercentage', e.target.value)}
                    inputProps={{ min: 0, max: 100 }}
                    helperText="Percentage of booking amount charged as platform fee"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Minimum Booking Amount ($)"
                    type="number"
                    value={settings.minimumBookingAmount}
                    onChange={(e) => handleChange('minimumBookingAmount', e.target.value)}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Refund Window (hours)"
                    type="number"
                    value={settings.refundPolicy}
                    onChange={(e) => handleChange('refundPolicy', e.target.value)}
                    helperText="Hours before booking to allow full refund"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Notification Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Notification Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.smsNotifications}
                        onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                      />
                    }
                    label="SMS Notifications"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.pushNotifications}
                        onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                      />
                    }
                    label="Push Notifications"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={saving}
                sx={{
                  background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
                  px: 4,
                }}
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default Settings;
