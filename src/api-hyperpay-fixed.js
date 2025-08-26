// Fixed HyperPay API for Frontend
import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token (if needed)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('frontend_token');
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
        console.error('❌ API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// HyperPay Payment Service (Fixed)
export const hyperpayAPI = {
    // Step 1: Prepare checkout (Server-to-Server)
    prepareCheckout: async (checkoutData) => {
        try {
            console.log('📤 Preparing checkout with backend:', checkoutData);
            const response = await api.post('/hyperpay/prepare', checkoutData);
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
            const response = await api.post('/hyperpay/form', formData);
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

            // Validate input
            if (!resourcePath && !checkoutId) {
                throw new Error('Missing checkoutId or resourcePath');
            }

            let url = `/hyperpay/status`;
            let params = {};

            if (resourcePath) {
                params.resourcePath = resourcePath;
            } else if (checkoutId) {
                url = `/hyperpay/status/${checkoutId}`;
            }

            console.log('🔗 Making request to:', url, 'with params:', params);
            
            // Add timeout to prevent hanging requests
            const response = await api.get(url, { 
                params,
                timeout: 10000 // 10 seconds timeout
            });
            
            console.log('📊 Payment status from backend:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Payment status error:', error);
            
            // Handle specific error codes
            if (error.response?.status === 429) {
                throw new Error('Too many requests. Please wait a moment and try again.');
            } else if (error.response?.data?.details?.result?.code === '200.300.404') {
                throw new Error('Payment session expired or not found.');
            } else if (error.response?.data?.details?.result?.code === '800.120.100') {
                throw new Error('Too many requests to payment gateway. Please try again later.');
            }
            
            throw new Error(error.response?.data?.error || 'فشل في التحقق من حالة الدفع');
        }
    },

    // Test checkout (for development)
    testCheckout: async () => {
        try {
            console.log('🧪 Testing checkout with backend...');
            const response = await api.get('/hyperpay/test');
            console.log('📥 Test checkout response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Test checkout error:', error);
            throw new Error(error.response?.data?.error || 'فشل في اختبار الدفع');
        }
    },

    // Health check
    healthCheck: async () => {
        try {
            console.log('🏥 Checking HyperPay service health...');
            const response = await api.get('/hyperpay/health');
            console.log('📥 Health check response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Health check error:', error);
            throw new Error(error.response?.data?.error || 'فشل في فحص صحة الخدمة');
        }
    },

    // Test payment result
    testPaymentResult: async (data) => {
        try {
            console.log('🧪 Testing payment result with backend:', data);
            const response = await api.post('/hyperpay/test-result', data);
            console.log('📥 Test payment result response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Test payment result error:', error);
            throw new Error(error.response?.data?.error || 'فشل في اختبار نتيجة الدفع');
        }
    }
};

export default hyperpayAPI;
