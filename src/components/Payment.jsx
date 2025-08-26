import React, { useState, useEffect } from 'react';
import { CreditCard, Apple, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPayment, setAuthToken } from '../api';
import '../App.css';

const Payment = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // التمرير إلى أعلى الصفحة عند تحميل المكون
    window.scrollTo(0, 0);
    
    const pkg = localStorage.getItem('selectedPackage');
    if (pkg) setSelectedPackage(JSON.parse(pkg));
    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []);

  const paymentMethods = [
    { id: 'apple-pay', name: 'Apple Pay', icon: <img src="/src/assets/apple-pay.png" alt="Apple Pay" className="h-6 w-6" />, color: 'bg-black', ring: 'ring-black', description: 'الدفع السريع عبر Apple Pay' },
    { id: 'mada', name: 'مدى', icon: <CreditCard className="h-6 w-6" />, color: 'bg-green-600', ring: 'ring-green-600', description: 'بطاقة مدى المحلية' },
    { id: 'credit-card', name: 'بطاقة ائتمان', icon: <CreditCard className="h-6 w-6" />, color: 'bg-blue-600', ring: 'ring-blue-600', description: 'فيزا، ماستركارد، مدى' }
  ];

  const handlePay = async () => {
    if (!paymentMethod) {
      setError('يرجى اختيار طريقة الدفع');
      return;
    }
    if (!selectedPackage) {
      setError('لا توجد باقة محددة. الرجاء العودة واختيار باقة.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createPayment({
        packageId: selectedPackage._id || selectedPackage.id,
        paymentMethod
      });
      setPaid(true);
    } catch {
      setError('فشل الدفع. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPackage) {
    return <div className="text-center py-20">لا توجد باقة محددة. الرجاء العودة واختيار باقة.</div>;
  }

  if (paid) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center bg-white rounded-2xl p-10 shadow-xl border border-green-100">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">تم الدفع بنجاح!</h2>
            <p className="text-gray-600 mb-6">شكراً لاستخدامك PayPass. تم استلام دفعتك بنجاح.</p>
            <button className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg shadow hover:shadow-xl transition-all duration-300" onClick={() => navigate('/')}>العودة للصفحة الرئيسية</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-10 shadow-xl border border-green-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">الدفع</h2>
          {error && <div className="mb-4 text-red-600 font-bold animate-pulse">{error}</div>}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-700">المبلغ المستحق</span>
              <span className="text-2xl font-bold text-green-600">{selectedPackage.basePrice} ريال</span>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-green-700 text-center font-bold mt-2">
              سيتم خصم المبلغ عند إتمام الدفع
            </div>
          </div>
          <div className="mb-8">
            {/* العنوان الرئيسي */}
            <div className="payment-header">
              <div className="payment-header-icon">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="payment-header-text">طرق الدفع الآمنة</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`payment-option-card ${paymentMethod === method.id ? 'selected' : ''}`}
                >
                  {/* علامة الاختيار */}
                  {paymentMethod === method.id && (
                    <div className="payment-option-check">
                      <svg className="payment-option-check-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="payment-option-content">
                    <div className={`payment-option-icon ${method.id === 'apple-pay' ? 'apple-pay-icon-container' : 'credit-card-icon-container'}`}>
                      {method.id === 'apple-pay' ? (
                        <img src="/src/assets/apple-pay.png" alt="Apple Pay" className="apple-pay-icon" />
                      ) : (
                        <svg className="credit-card-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                        </svg>
                      )}
                    </div>
                    <div className="payment-option-text">
                      <h3 className="payment-option-title">{method.name}</h3>
                      <p className="payment-option-description">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className={`w-full px-8 py-4 rounded-xl font-bold text-lg shadow hover:shadow-xl transition-all duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? 'جاري معالجة الدفع...' : 'إتمام الدفع'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment; 