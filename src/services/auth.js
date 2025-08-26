// Authentication Service for Frontend
import { authAPI, setAuthToken, setUserData, getAuthToken, getUserData } from '../api.js';

class AuthService {
  constructor() {
    this.token = getAuthToken();
    this.user = getUserData();
    this.isAuthenticated = !!this.token;
  }

  // Login user
  async login(email, password) {
    try {
      const response = await authAPI.login({ email, password });
      this.token = response.data.token;
      this.user = response.data.user;
      this.isAuthenticated = true;
      
      setAuthToken(this.token);
      setUserData(this.user);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await authAPI.signup(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      
      setAuthToken(null);
      setUserData(null);
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await authAPI.getCurrentUser();
      this.user = response.data;
      setUserData(this.user);
      return response;
    } catch (error) {
      // If token is invalid, clear auth state
      if (error.message.includes('غير مصرح') || error.message.includes('فشل في جلب بيانات المستخدم')) {
        this.logout();
      }
      throw error;
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await authAPI.updateProfile(userData);
      this.user = response.data.user;
      setUserData(this.user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await authAPI.changePassword(passwordData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await authAPI.forgotPassword(email);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await authAPI.resetPassword(resetData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Check if user is authenticated
  isLoggedIn() {
    return this.isAuthenticated && !!this.token;
  }

  // Get current user data
  getCurrentUserData() {
    return this.user;
  }

  // Get auth token
  getToken() {
    return this.token;
  }

  // Check if user has specific role
  hasRole(role) {
    return this.user && this.user.role === role;
  }

  // Check if user is admin
  isAdmin() {
    return this.hasRole('admin');
  }

  // Check if user is regular user
  isUser() {
    return this.hasRole('user');
  }

  // Refresh authentication state from localStorage
  refreshAuthState() {
    this.token = getAuthToken();
    this.user = getUserData();
    this.isAuthenticated = !!this.token;
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService; 