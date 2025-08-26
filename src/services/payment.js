// Payment Gateway Service for Frontend
import { paymentAPI } from '../api.js';

class PaymentService {
  constructor() {
    this.hyperpayConfig = {
      merchantId: import.meta.env.VITE_HYPERPAY_MERCHANT_ID,
      accessToken: import.meta.env.VITE_HYPERPAY_ACCESS_TOKEN,
      environment: import.meta.env.VITE_HYPERPAY_ENVIRONMENT || 'test'
    };
    
    this.applePayConfig = {
      merchantId: import.meta.env.VITE_APPLE_PAY_MERCHANT_ID,
      domain: import.meta.env.VITE_APPLE_PAY_DOMAIN || 'localhost'
    };
  }

  // Create payment record
  async createPayment(paymentData) {
    try {
      const response = await paymentAPI.create(paymentData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get payment by ID
  async getPayment(id) {
    try {
      const response = await paymentAPI.getById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get user payments
  async getUserPayments(userId) {
    try {
      const response = await paymentAPI.getUserPayments(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Verify payment
  async verifyPayment(id) {
    try {
      const response = await paymentAPI.verify(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Process HyperPay payment
  async processHyperPayPayment(paymentData) {
    try {
      const { amount, currency = 'SAR', orderId, customerEmail, customerName } = paymentData;
      
      // Create payment record first
      const paymentRecord = await this.createPayment({
        amount,
        currency,
        method: 'hyperpay',
        status: 'pending',
        orderId,
        customerEmail,
        customerName
      });

      // HyperPay configuration
      const hyperpayConfig = {
        merchantId: this.hyperpayConfig.merchantId,
        accessToken: this.hyperpayConfig.accessToken,
        environment: this.hyperpayConfig.environment,
        amount: amount.toFixed(2),
        currency,
        orderId: orderId || `ORDER_${Date.now()}`,
        customerEmail,
        customerName,
        paymentId: paymentRecord.data.id
      };

      // Return HyperPay configuration for frontend integration
      return {
        success: true,
        data: {
          paymentId: paymentRecord.data.id,
          hyperpayConfig,
          redirectUrl: this.getHyperPayRedirectUrl(hyperpayConfig)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Process Apple Pay payment
  async processApplePayPayment(paymentData) {
    try {
      const { amount, currency = 'SAR', orderId, customerEmail, customerName } = paymentData;
      
      // Create payment record first
      const paymentRecord = await this.createPayment({
        amount,
        currency,
        method: 'apple_pay',
        status: 'pending',
        orderId,
        customerEmail,
        customerName
      });

      // Apple Pay configuration
      const applePayConfig = {
        merchantId: this.applePayConfig.merchantId,
        domain: this.applePayConfig.domain,
        amount: amount.toFixed(2),
        currency,
        orderId: orderId || `ORDER_${Date.now()}`,
        customerEmail,
        customerName,
        paymentId: paymentRecord.data.id
      };

      return {
        success: true,
        data: {
          paymentId: paymentRecord.data.id,
          applePayConfig
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Process cash payment
  async processCashPayment(paymentData) {
    try {
      const { amount, currency = 'SAR', orderId, customerEmail, customerName } = paymentData;
      
      // Create payment record
      const paymentRecord = await this.createPayment({
        amount,
        currency,
        method: 'cash',
        status: 'pending',
        orderId,
        customerEmail,
        customerName
      });

      return {
        success: true,
        data: {
          paymentId: paymentRecord.data.id,
          message: 'تم إنشاء طلب الدفع النقدي بنجاح'
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Get HyperPay redirect URL
  getHyperPayRedirectUrl(config) {
    const baseUrl = config.environment === 'test' 
      ? 'https://test.oppwa.com' 
      : 'https://oppwa.com';
    
    return `${baseUrl}/v1/checkouts`;
  }

  // Validate payment data
  validatePaymentData(paymentData) {
    const { amount, currency, method, customerEmail, customerName } = paymentData;
    
    if (!amount || amount <= 0) {
      throw new Error('المبلغ غير صحيح');
    }
    
    if (!currency) {
      throw new Error('العملة مطلوبة');
    }
    
    if (!method) {
      throw new Error('طريقة الدفع مطلوبة');
    }
    
    if (!customerEmail) {
      throw new Error('البريد الإلكتروني مطلوب');
    }
    
    if (!customerName) {
      throw new Error('اسم العميل مطلوب');
    }
    
    return true;
  }

  // Calculate payment fees
  calculateFees(amount, method) {
    const fees = {
      hyperpay: amount * 0.025, // 2.5%
      apple_pay: amount * 0.03, // 3%
      cash: 0 // No fees for cash
    };
    
    return fees[method] || 0;
  }

  // Get payment methods
  getPaymentMethods() {
    return [
      {
        id: 'hyperpay',
        name: 'بطاقة ائتمان',
        icon: 'credit-card',
        description: 'Visa, Mastercard, مدى',
        enabled: true
      },
      {
        id: 'apple_pay',
        name: 'Apple Pay',
        icon: 'apple',
        description: 'الدفع عبر Apple Pay',
        enabled: this.isApplePaySupported()
      },
      {
        id: 'cash',
        name: 'نقداً',
        icon: 'money',
        description: 'الدفع نقداً في المحطة',
        enabled: true
      }
    ];
  }

  // Check if Apple Pay is supported
  isApplePaySupported() {
    return window.ApplePaySession && ApplePaySession.canMakePayments();
  }

  // Format amount for display
  formatAmount(amount, currency = 'SAR') {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Get payment status text
  getPaymentStatusText(status) {
    const statusMap = {
      pending: 'في الانتظار',
      processing: 'قيد المعالجة',
      completed: 'مكتمل',
      failed: 'فشل',
      cancelled: 'ملغي',
      refunded: 'مسترد'
    };
    
    return statusMap[status] || status;
  }

  // Get payment status color
  getPaymentStatusColor(status) {
    const colorMap = {
      pending: 'yellow',
      processing: 'blue',
      completed: 'green',
      failed: 'red',
      cancelled: 'gray',
      refunded: 'orange'
    };
    
    return colorMap[status] || 'gray';
  }
}

// Create singleton instance
const paymentService = new PaymentService();

export default paymentService; 