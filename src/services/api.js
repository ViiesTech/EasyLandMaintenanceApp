import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Change to your server URL
// For Android emulator use: http://10.0.2.2:5000/api
// For iOS simulator use: http://localhost:5000/api
// For physical device use: http://YOUR_IP:5000/api

class ApiService {
  // Get auth token from storage
  async getToken() {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Save auth token to storage
  async saveToken(token) {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  // Remove auth token
  async removeToken() {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // Save user data
  async saveUser(user) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }

  // Get user data
  async getUser() {
    try {
      const user = await AsyncStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  // Remove user data
  async removeUser() {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }

  // Make API request
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = await this.getToken();

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth token if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // PUT request
  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // ==================== AUTHENTICATION APIs ====================

  // Register new user
  async register(userData) {
    const response = await this.post('/auth/register', userData);
    if (response.success && response.token) {
      await this.saveToken(response.token);
      await this.saveUser(response.data);
    }
    return response;
  }

  // Login user
  async login(email, password) {
    const response = await this.post('/auth/login', { email, password });
    if (response.success && response.token) {
      await this.saveToken(response.token);
      await this.saveUser(response.data);
    }
    return response;
  }

  // Logout user
  async logout() {
    await this.removeToken();
    await this.removeUser();
  }

  // Get current user
  async getCurrentUser() {
    return this.get('/auth/me');
  }

  // Update profile
  async updateProfile(profileData) {
    const response = await this.put('/auth/update-profile', profileData);
    if (response.success) {
      await this.saveUser(response.data);
    }
    return response;
  }

  // Update password
  async updatePassword(currentPassword, newPassword) {
    return this.put('/auth/update-password', {
      currentPassword,
      newPassword,
    });
  }

  // Forgot password
  async forgotPassword(email) {
    return this.post('/auth/forgot-password', { email });
  }

  // Reset password
  async resetPassword(token, password) {
    return this.post(`/auth/reset-password/${token}`, { password });
  }

  // ==================== SERVICES APIs ====================

  // Get all services
  async getServices(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/services?${queryParams}` : '/services';
    return this.get(endpoint);
  }

  // Get popular services
  async getPopularServices() {
    return this.get('/services/popular');
  }

  // Get single service
  async getService(id) {
    return this.get(`/services/${id}`);
  }

  // ==================== BOOKINGS APIs ====================

  // Get user's bookings
  async getMyBookings(status) {
    const endpoint = status ? `/bookings/my-bookings?status=${status}` : '/bookings/my-bookings';
    return this.get(endpoint);
  }

  // Get single booking
  async getBooking(id) {
    return this.get(`/bookings/${id}`);
  }

  // Create booking
  async createBooking(bookingData) {
    return this.post('/bookings', bookingData);
  }

  // Update booking
  async updateBooking(id, updateData) {
    return this.put(`/bookings/${id}`, updateData);
  }

  // Cancel booking
  async cancelBooking(id, reason) {
    return this.put(`/bookings/${id}/cancel`, { reason });
  }

  // Rate booking
  async rateBooking(id, stars, comment) {
    return this.put(`/bookings/${id}/rate`, { stars, comment });
  }

  // ==================== MESSAGES APIs ====================

  // Get conversations
  async getConversations() {
    return this.get('/messages/conversations');
  }

  // Create conversation
  async createConversation(participantId, bookingId) {
    return this.post('/messages/conversations', { participantId, bookingId });
  }

  // Get messages in conversation
  async getMessages(conversationId) {
    return this.get(`/messages/conversations/${conversationId}/messages`);
  }

  // Send message
  async sendMessage(conversationId, messageData) {
    return this.post(`/messages/conversations/${conversationId}/messages`, messageData);
  }

  // Mark message as read
  async markMessageAsRead(messageId) {
    return this.put(`/messages/${messageId}/read`);
  }

  // ==================== PAYMENTS APIs ====================

  // Get payment methods
  async getPaymentMethods() {
    return this.get('/payments/methods');
  }

  // Add payment method
  async addPaymentMethod(paymentData) {
    return this.post('/payments/methods', paymentData);
  }

  // Delete payment method
  async deletePaymentMethod(id) {
    return this.delete(`/payments/methods/${id}`);
  }

  // Set default payment method
  async setDefaultPaymentMethod(id) {
    return this.put(`/payments/methods/${id}/default`);
  }

  // Create payment intent
  async createPaymentIntent(paymentData) {
    return this.post('/payments/create-intent', paymentData);
  }

  // Get transactions
  async getTransactions() {
    return this.get('/payments/transactions');
  }

  // ==================== NOTIFICATIONS APIs ====================

  // Get notifications
  async getNotifications(unreadOnly = false) {
    const endpoint = unreadOnly ? '/notifications?unreadOnly=true' : '/notifications';
    return this.get(endpoint);
  }

  // Mark notification as read
  async markNotificationAsRead(id) {
    return this.put(`/notifications/${id}`);
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead() {
    return this.put('/notifications/mark-all-read');
  }

  // Delete notification
  async deleteNotification(id) {
    return this.delete(`/notifications/${id}`);
  }
}

export default new ApiService();
