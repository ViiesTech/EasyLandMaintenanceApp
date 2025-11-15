import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const savedUser = localStorage.getItem('adminUser');

      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
        // Verify token is still valid
        const response = await ApiService.getCurrentUser();
        setUser(response.data.data);
        localStorage.setItem('adminUser', JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await ApiService.login({ email, password });
      const { token, data } = response.data;

      // Check if user is admin
      if (data.role !== 'admin') {
        throw new Error('Access denied. Admin role required.');
      }

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(data));
      setUser(data);

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
