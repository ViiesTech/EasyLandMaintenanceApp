import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users/UserList';
import UserDetails from './pages/Users/UserDetails';
import Services from './pages/Services/ServiceList';
import ServiceForm from './pages/Services/ServiceForm';
import Bookings from './pages/Bookings/BookingList';
import BookingDetails from './pages/Bookings/BookingDetails';
import Payments from './pages/Payments/PaymentList';
import Settings from './pages/Settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4EE1B9',
      dark: '#2DD8A3',
      light: '#6FF7CF',
    },
    secondary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <UserDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <Services />
              </PrivateRoute>
            }
          />
          <Route
            path="/services/create"
            element={
              <PrivateRoute>
                <ServiceForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/services/:id/edit"
            element={
              <PrivateRoute>
                <ServiceForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <Bookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings/:id"
            element={
              <PrivateRoute>
                <BookingDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <PrivateRoute>
                <Payments />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
