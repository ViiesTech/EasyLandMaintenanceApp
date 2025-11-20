import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    // Just navigate, no validation
    const dummyUser = {
      id: '1',
      email: email,
      fullName: 'User',
      userType: 'customer',
    };
    setUser(dummyUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const register = async (userData) => {
    // Just navigate, no validation
    const dummyUser = {
      id: '1',
      email: userData.email,
      fullName: userData.fullName || 'User',
      userType: userData.userType || 'customer',
    };
    setUser(dummyUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = async (profileData) => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    return { success: true };
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
