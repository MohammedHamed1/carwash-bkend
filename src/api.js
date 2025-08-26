// API Service for Frontend (Connected to Backend)
import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const JWT_STORAGE_KEY = 'frontend_token';
const USER_STORAGE_KEY = 'frontend_user';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(JWT_STORAGE_KEY);
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
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem(JWT_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to create API response
const createApiResponse = (data, success = true, message = 'Success') => ({
  success,
  message,
  data
});

// Auth token management
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(JWT_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(JWT_STORAGE_KEY);
  }
};

// Dashboard API functions
export const dashboardAPI = {
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الإحصائيات');
    }
  },

  getRecentOrders: async (limit = 10) => {
    try {
      const response = await api.get(`/dashboard/recent-orders?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الطلبات الحديثة');
    }
  },

  getLiveTracking: async () => {
    try {
      const response = await api.get('/dashboard/live-tracking');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب التتبع المباشر');
    }
  },

  getBranchPerformance: async () => {
    try {
      const response = await api.get('/dashboard/branch-performance');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب أداء الفروع');
    }
  },

  getRevenueAnalytics: async (period = 'month') => {
    try {
      const response = await api.get(`/dashboard/revenue?period=${period}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب تحليلات الإيرادات');
    }
  }
};

export const setUserData = (user) => {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(JWT_STORAGE_KEY);
};

export const getUserData = () => {
  const user = localStorage.getItem(USER_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

// Authentication Service
export const authAPI = {
  signup: async (userData) => {
    try {
      // Format the data according to the required API structure
      const formattedData = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        username: userData.username
      };

      const response = await api.post('/user/register', formattedData);
      console.log('Signup response:', response);

      // Return success response for registration
      return { success: true, message: 'تم إنشاء الحساب بنجاح' };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'فشل في التسجيل');
    }
  },

  login: async (credentials) => {
    try {
      console.log('Attempting login with credentials:', credentials);
      const response = await api.post('/user/login', credentials);
      console.log('Login response:', response);
      console.log('Login response.data:', response.data);

      const { token, user } = response.data;

      setAuthToken(token);
      setUserData(user);

      return response.data;
    } catch (error) {
      console.error('API Login error:', error);
      console.error('Error response:', error.response);
      console.error('Error response.data:', error.response?.data);
      throw new Error(error.response?.data?.message || 'فشل في تسجيل الدخول');
    }
  },

  logout: async () => {
    try {
      await api.post('/users/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthToken(null);
      setUserData(null);
    }
    return { success: true, message: 'تم تسجيل الخروج بنجاح' };
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.log('getCurrentUser error:', error)
      throw new Error(error.response?.data?.message || 'فشل في جلب بيانات المستخدم');
    }
  },

  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب المستخدمين');
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      const { user } = response.data.data;
      setUserData(user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في تحديث الملف الشخصي');
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في تغيير كلمة المرور');
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/users/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إرسال رابط إعادة تعيين كلمة المرور');
    }
  },

  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/users/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إعادة تعيين كلمة المرور');
    }
  }
};

// Package Service
export const packageAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/packages');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الباقات');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/packages/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الباقة');
    }
  },

  getByType: async (type) => {
    try {
      const response = await api.get(`/packages/type/${type}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الباقات حسب النوع');
    }
  }
};

// Branch Service (Washing Places)
export const branchAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/washing-places');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الفروع');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/washing-places/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الفرع');
    }
  },

  getByCity: async (city) => {
    try {
      const response = await api.get(`/washing-places/city/${city}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الفروع حسب المدينة');
    }
  }
};

// Order Service (Washes)
export const orderAPI = {
  create: async (orderData) => {
    try {
      const response = await api.post('/washes', orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إنشاء الطلب');
    }
  },

  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/washes', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الطلبات');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/washes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الطلب');
    }
  },

  getUserOrders: async (userId) => {
    try {
      const response = await api.get(`/washes/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب طلبات المستخدم');
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/washes/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في تحديث حالة الطلب');
    }
  },

  cancel: async (id) => {
    try {
      const response = await api.put(`/washes/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إلغاء الطلب');
    }
  }
};

// Payment Service
export const paymentAPI = {
  create: async (paymentData) => {
    try {
      const response = await api.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إنشاء الدفع');
    }
  },

  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/payments', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب المدفوعات');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الدفع');
    }
  },

  getUserPayments: async (userId) => {
    try {
      const response = await api.get(`/payments/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب مدفوعات المستخدم');
    }
  },

  verify: async (id) => {
    try {
      const response = await api.post(`/payments/${id}/verify`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في التحقق من الدفع');
    }
  },

  refund: async (id, reason) => {
    try {
      const response = await api.post(`/payments/${id}/refund`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في استرداد الدفع');
    }
  }
};

// HyperPay Payment Service
export const hyperpayAPI = {
  // Step 1: Prepare checkout (Server-to-Server)
  prepareCheckout: async (checkoutData) => {
    try {
      console.log('📤 Preparing checkout with backend:', checkoutData);
      const response = await api.post('/hyperpay/copyandpay/prepare', checkoutData);
      console.log('📥 Checkout response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Checkout preparation error:', error);
      throw new Error(error.response?.data?.error || 'فشل في إعداد الدفع');
    }
  },

  // Step 2: Create payment form (Frontend)
  createPaymentForm: async (formData) => {
    try {
      console.log('📤 Creating payment form with backend:', formData);
      const response = await api.post('/hyperpay/copyandpay/form', formData);
      console.log('📥 Payment form response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Payment form creation error:', error);
      throw new Error(error.response?.data?.error || 'فشل في إنشاء نموذج الدفع');
    }
  },

  // Step 3: Get payment status (Backend handles HyperPay API call)
  getPaymentStatus: async (checkoutId, resourcePath = null) => {
    try {
      console.log('🔍 Checking payment status through backend:', { checkoutId, resourcePath });

      let url = `/hyperpay/copyandpay/status/${checkoutId}`;
      if (resourcePath) {
        url = `/hyperpay/copyandpay/status?resourcePath=${encodeURIComponent(resourcePath)}`;
      }

      const response = await api.get(url);
      console.log('📊 Payment status from backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Payment status error:', error);
      throw new Error(error.response?.data?.error || 'فشل في التحقق من حالة الدفع');
    }
  },

  // Test checkout (for development)
  testCheckout: async () => {
    try {
      console.log('🧪 Testing checkout with backend...');
      const response = await api.get('/hyperpay/copyandpay/test');
      console.log('📥 Test checkout response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Test checkout error:', error);
      throw new Error(error.response?.data?.error || 'فشل في اختبار الدفع');
    }
  },

  // Legacy methods for backward compatibility
  createCheckout: async (checkoutData) => {
    return hyperpayAPI.prepareCheckout(checkoutData);
  },

  checkPaymentStatus: async (resourcePath, transactionId) => {
    return hyperpayAPI.getPaymentStatus(transactionId, resourcePath);
  },

  testPaymentResult: async (params) => {
    try {
      console.log('🧪 Testing payment result with backend:', params);
      const response = await api.post('/hyperpay/copyandpay/test-result', params);
      console.log('📥 Test payment result response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Test payment result error:', error);
      throw new Error(error.response?.data?.error || 'فشل في اختبار نتيجة الدفع');
    }
  },

  getHealth: async () => {
    try {
      console.log('🏥 Checking HyperPay health through backend...');
      const response = await api.get('/hyperpay/copyandpay/health');
      console.log('📥 Health check response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Health check error:', error);
      throw new Error(error.response?.data?.error || 'فشل في فحص صحة النظام');
    }
  }
};

// Feedback Service
export const feedbackAPI = {
  create: async (feedbackData) => {
    try {
      const response = await api.post('/feedbacks', feedbackData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إنشاء التقييم');
    }
  },

  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/feedbacks', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب التقييمات');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/feedbacks/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب التقييم');
    }
  },

  getUserFeedbacks: async (userId) => {
    try {
      const response = await api.get(`/feedbacks/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب تقييمات المستخدم');
    }
  },

  update: async (id, feedbackData) => {
    try {
      const response = await api.put(`/feedbacks/${id}`, feedbackData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في تحديث التقييم');
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/feedbacks/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في حذف التقييم');
    }
  }
};

// User Package Service
export const userPackageAPI = {
  create: async (userPackageData) => {
    try {
      const response = await api.post('/user-packages', userPackageData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إنشاء باقة المستخدم');
    }
  },

  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/user-packages', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب باقات المستخدم');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/user-packages/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب باقة المستخدم');
    }
  },

  getUserPackages: async (userId) => {
    try {
      const response = await api.get(`/user-packages/user/${userId}`);
      console.log('getUserPackages response:', response);
      return response.data;
    } catch (error) {
      console.log('getUserPackages error:', error);
      throw new Error(error.response?.data?.message || 'فشل في جلب باقات المستخدم');
    }
  },

  update: async (id, userPackageData) => {
    try {
      const response = await api.put(`/user-packages/${id}`, userPackageData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في تحديث باقة المستخدم');
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/user-packages/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في حذف باقة المستخدم');
    }
  }
};

// Car Service
export const carAPI = {
  create: async (carData) => {
    try {
      const response = await api.post('/cars', carData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إضافة السيارة');
    }
  },

  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/cars', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب السيارات');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب السيارة');
    }
  },

  getUserCars: async (userId) => {
    try {
      const response = await api.get(`/cars/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب سيارات المستخدم');
    }
  },

  update: async (id, carData) => {
    try {
      const response = await api.put(`/cars/${id}`, carData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في تحديث السيارة');
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في حذف السيارة');
    }
  }
};

// Notification Service
export const notificationAPI = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/notifications', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الإشعارات');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/notifications/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب الإشعار');
    }
  },

  markAsRead: async (id) => {
    try {
      const response = await api.put(`/notifications/${id}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في تحديث حالة الإشعار');
    }
  },

  markAllAsRead: async () => {
    try {
      const response = await api.put('/notifications/read-all');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في تحديث جميع الإشعارات');
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/notifications/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في حذف الإشعار');
    }
  },

  deleteAll: async () => {
    try {
      const response = await api.delete('/notifications');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في حذف جميع الإشعارات');
    }
  }
};

// QR Code Service
export const qrAPI = {
  generate: async (data) => {
    try {
      const response = await api.post('/qr/generate', { data });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في إنشاء رمز QR');
    }
  },

  scan: async (qrData) => {
    try {
      const response = await api.post('/qr/scan', { qrData });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في قراءة رمز QR');
    }
  },

  validate: async (qrCode) => {
    try {
      const response = await api.post('/qr/validate', { qrCode });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في التحقق من رمز QR');
    }
  },

  getStatus: async (orderId) => {
    try {
      const response = await api.get(`/qr/status/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في جلب حالة QR');
    }
  },

  use: async (operationId, branchId) => {
    try {
      const response = await api.post('/qr/use', { operationId, branchId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'فشل في استخدام QR');
    }
  }
};

// Legacy functions for backward compatibility
export const getPackages = () => packageAPI.getAll();
export const getWashingPlaces = () => branchAPI.getAll();
export const createPayment = (paymentData) => paymentAPI.create(paymentData);
export const signup = (userData) => authAPI.signup(userData);
export const getFeedbacks = () => feedbackAPI.getAll();

// Export the main API object
export { api };
