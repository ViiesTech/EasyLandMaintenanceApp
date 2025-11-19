import React, { createContext, useState, useContext, useEffect } from 'react';
import ApiService from '../services/api';
import { auth, GoogleSignin, LoginManager, AccessToken } from '../config/firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await ApiService.getToken();
      const savedUser = await ApiService.getUser();
      
      if (token && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await ApiService.login(email, password);
      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await ApiService.register(userData);
      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      const response = await ApiService.updateProfile(profileData);
      if (response.success) {
        setUser(response.data);
        return { success: true };
      }
      return { success: false, error: 'Update failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get user's ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      // Send Firebase user data to backend for verification/registration
      const firebaseUser = userCredential.user;
      const response = await ApiService.socialLogin({
        provider: 'google',
        providerId: firebaseUser.uid,
        email: firebaseUser.email,
        fullName: firebaseUser.displayName,
        profilePicture: firebaseUser.photoURL,
      });
      
      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: 'Social login failed' };
    } catch (error) {
      console.error('Google Sign-In error:', error);
      return { success: false, error: error.message };
    }
  };

  // Facebook Sign-In
  const signInWithFacebook = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
      if (result.isCancelled) {
        return { success: false, error: 'User cancelled the login process' };
      }
      
      // Get the access token
      const data = await AccessToken.getCurrentAccessToken();
      
      if (!data) {
        return { success: false, error: 'Something went wrong obtaining access token' };
      }
      
      // Create a Facebook credential with the access token
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(facebookCredential);
      
      // Send Firebase user data to backend for verification/registration
      const firebaseUser = userCredential.user;
      const response = await ApiService.socialLogin({
        provider: 'facebook',
        providerId: firebaseUser.uid,
        email: firebaseUser.email,
        fullName: firebaseUser.displayName,
        profilePicture: firebaseUser.photoURL,
      });
      
      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: 'Social login failed' };
    } catch (error) {
      console.error('Facebook Sign-In error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserProfile,
    signInWithGoogle,
    signInWithFacebook,
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
