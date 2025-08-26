import React, { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';

const ApplePayButton = ({ amount, onSuccess, onError, disabled = false }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [applePayConfig, setApplePayConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load Apple Pay configuration
    loadApplePayConfig();
  }, []);

  const loadApplePayConfig = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/apple-pay-config');
      const data = await response.json();
      
      if (data.success) {
        setApplePayConfig(data);
        // Inject Apple Pay styles
        injectApplePayStyles(data.styles);
        // Inject Apple Pay script
        injectApplePayScript(data.script);
      }
    } catch (error) {
      console.error('Failed to load Apple Pay config:', error);
      setError('فشل في تحميل إعدادات Apple Pay');
    }
  };

  const injectApplePayStyles = (styles) => {
    if (!document.getElementById('apple-pay-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'apple-pay-styles';
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }
  };

  const injectApplePayScript = (script) => {
    if (!document.getElementById('apple-pay-script')) {
      const scriptElement = document.createElement('script');
      scriptElement.id = 'apple-pay-script';
      scriptElement.textContent = script;
      document.head.appendChild(scriptElement);
    }
  };

  const createApplePayCheckout = async () => {
    if (!user) {
      setError('يجب تسجيل الدخول أولاً');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/payments/apple-pay-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: amount.toFixed(2),
          currency: 'SAR',
          merchantTransactionId: `APPLE-PAY-${Date.now()}`,
          customerEmail: user.email,
          billingStreet1: 'Test Street',
          billingCity: 'Riyadh',
          billingState: 'Riyadh',
          billingCountry: 'SA',
          billingPostcode: '12345',
          customerGivenName: user.fullName?.split(' ')[0] || 'User',
          customerSurname: user.fullName?.split(' ').slice(1).join(' ') || 'Test'
        })
      });

      const data = await response.json();

      if (data.success && data.checkoutId) {
        // Redirect to Apple Pay widget
        const applePayUrl = `https://eu-test.oppwa.com/v1/paymentWidgets.html?checkoutId=${data.checkoutId}`;
        window.location.href = applePayUrl;
      } else {
        throw new Error(data.error || 'فشل في إنشاء جلسة Apple Pay');
      }
    } catch (error) {
      console.error('Apple Pay checkout error:', error);
      setError(error.message || 'حدث خطأ أثناء إنشاء جلسة Apple Pay');
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isApplePaySupported = () => {
    return window.ApplePaySession && ApplePaySession.canMakePayments();
  };

  if (!isApplePaySupported()) {
    return (
      <div className="apple-pay-error">
        Apple Pay غير مدعوم في هذا المتصفح أو الجهاز
      </div>
    );
  }

  if (error) {
    return (
      <div className="apple-pay-error">
        {error}
        <button 
          onClick={() => setError(null)}
          className="text-blue-600 hover:text-blue-800 ml-2"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="apple-pay-container">
      <div className="apple-pay-form">
        <div className="apple-pay-header">
          <h3>الدفع عبر Apple Pay</h3>
          <p>دفع آمن وسريع</p>
        </div>

        <div className="apple-pay-amount">
          <span className="currency">ريال</span>
          <span className="amount">{amount.toFixed(2)}</span>
        </div>

        <div className="apple-pay-button-container">
          {isLoading ? (
            <div className="apple-pay-loading">
              <div className="spinner"></div>
              <span>جاري إنشاء جلسة الدفع...</span>
            </div>
          ) : (
            <button
              onClick={createApplePayCheckout}
              disabled={disabled || isLoading}
              className="wpwl-apple-pay-button"
              data-apple-pay-button-type="buy"
              data-apple-pay-button-style="black"
            >
              الدفع عبر Apple Pay
            </button>
          )}
        </div>

        <div className="apple-pay-security">
          <span className="lock-icon">🔒</span>
          الدفع آمن ومشفر
        </div>
      </div>
    </div>
  );
};

export default ApplePayButton; 