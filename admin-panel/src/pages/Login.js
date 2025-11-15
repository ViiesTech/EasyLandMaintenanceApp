import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  margin: '0 auto 16px',
                }}
              >
                EL
              </Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Admin Panel
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EasyLandMaintenance
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                autoFocus
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  background: 'linear-gradient(135deg, #4EE1B9 0%, #2DD8A3 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2DD8A3 0%, #1FC794 100%)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </form>

            <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
              Admin access only. Contact system administrator for credentials.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
