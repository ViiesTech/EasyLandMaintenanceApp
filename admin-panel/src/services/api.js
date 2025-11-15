import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const ApiService = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),

  // Dashboard Stats
  getDashboardStats: () => api.get('/admin/stats'),

  // Users
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),

  // Services
  getServices: (params) => api.get('/services', { params }),
  getService: (id) => api.get(`/services/${id}`),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),

  // Bookings
  getBookings: (params) => api.get('/bookings', { params }),
  getBooking: (id) => api.get(`/bookings/${id}`),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  cancelBooking: (id, reason) => api.put(`/bookings/${id}/cancel`, { reason }),

  // Payments
  getTransactions: (params) => api.get('/payments/transactions', { params }),
  getPaymentStats: () => api.get('/payments/stats'),

  // Notifications
  getNotifications: (params) => api.get('/notifications', { params }),
  sendNotification: (data) => api.post('/notifications', data),
};

export default ApiService;
