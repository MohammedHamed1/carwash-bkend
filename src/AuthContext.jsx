import React, { createContext, useEffect, useState } from 'react';
import { setAuthToken, authAPI, getAuthToken } from './api';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedToken = getAuthToken();
    return storedToken;
  });
  const [isAuth, setIsAuth] = useState(() => {
    const hasToken = !!getAuthToken();
    return hasToken;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('frontend_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      setIsAuth(true);
      // Fetch user profile
      fetchUserProfile();
    } else {
      setAuthToken(null);
      setIsAuth(false);
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data);
      // Update localStorage with the fetched user data
      localStorage.setItem('frontend_user', JSON.stringify(response));
    } catch (error) {
      console.error('AuthContext: Error fetching user profile:', error);
      // If token is invalid, logout
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);

      if (!response) {
        console.error('AuthContext: Invalid response structure', response);
        return {
          success: false,
          error: 'Invalid response from server'
        };
      }

      const { token: newToken, user: userData } = response;

      if (!newToken || !userData) {
        console.error('AuthContext: Missing token or user data', { newToken, userData });
        return {
          success: false,
          error: 'Missing authentication data'
        };
      }

      setAuthToken(newToken);
      localStorage.setItem('frontend_user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      setIsAuth(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      console.error('AuthContext: Error details:', {
        message: error.message,
        response: error.response,
        status: error.response?.status,
        data: error.response?.data
      });

      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData);

      // Don't automatically log in the user after registration
      // Just return success to show the toaster and redirect to login
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Signup failed'
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthToken(null);
      localStorage.removeItem('frontend_user');

      // Clean up all session-related data on logout
      localStorage.removeItem('reservationData');
      localStorage.removeItem('selectedPackage');
      localStorage.removeItem('finalOrderData');
      localStorage.removeItem('qrCodeData');
      localStorage.removeItem('selectedBranch');
      localStorage.removeItem('tipData');
      localStorage.removeItem('branchRating');
      localStorage.removeItem('branchRatings');
      localStorage.removeItem('motivationData');
      localStorage.removeItem('vipCheckoutData');
      localStorage.removeItem('vipPackageDetails');
      localStorage.removeItem('vipOrderDetails');
      localStorage.removeItem('selectedHotel');
      localStorage.removeItem('scannedQRData');

      // Clean up old authentication data
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('rememberMe');

      setToken(null);
      setUser(null);
      setIsAuth(false);

    }
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('frontend_user', JSON.stringify(updatedUserData));
    console.log('AuthContext: User data updated in context and localStorage');
  };

  return (
    <AuthContext.Provider value={{
      isAuth,
      token,
      user,
      loading,
      login,
      logout,
      signup,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
} 