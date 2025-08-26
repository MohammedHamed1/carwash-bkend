import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaQrcode, FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import HyperPayPayment from './HyperPayPayment';
import { orderAPI, paymentAPI, qrAPI } from '../api';

const CheckoutFlow = ({ selectedPackage, selectedCarType, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  // حساب السعر - استخدام API بدلاً من البيانات الثابتة
  const [packagePrices, setPackagePrices] = useState({});
  const [currentPrice, setCurrentPrice] = useState({ price: 0, washes: 0 });

  // Notification helpers
  const displayNotification = (type, title, message) => {
    setNotificationData({ type, title, message });
    setShowNotification(true);
  };

  const showSuccessNotification = (message) => {
    displayNotification('success', 'تم بنجاح', message);
  };

  const showErrorNotification = (message) => {
    displayNotification('error', 'خطأ', message);
  };

  // تحميل بيانات الباقات من API
  useEffect(() => {
    const loadPackagePrices = async () => {
      try {
        // هنا يمكن استدعاء API لجلب أسعار الباقات
        // const response = await packageAPI.getPrices();
        // setPackagePrices(response.data);
        
        // مؤقتاً: استخدام البيانات المحسنة
        const prices = {
          'small': {
            basic: { price: 150, originalPrice: 235, savings: 85, washes: 5 },
            advanced: { price: 280, originalPrice: 420, savings: 140, washes: 10 },
            premium: { price: 490, originalPrice: 770, savings: 280, washes: 18 }
          },
          'medium': {
            basic: { price: 180, originalPrice: 270, savings: 90, washes: 5 },
            advanced: { price: 320, originalPrice: 480, savings: 160, washes: 10 },
            premium: { price: 530, originalPrice: 830, savings: 300, washes: 18 }
          },
          'large': {
            basic: { price: 220, originalPrice: 330, savings: 110, washes: 5 },
            advanced: { price: 360, originalPrice: 540, savings: 180, washes: 10 },
            premium: { price: 570, originalPrice: 890, savings: 320, washes: 18 }
          }
        };
        
        setPackagePrices(prices);
        const price = prices[selectedCarType]?.[selectedPackage] || { price: 0, washes: 0 };
        setCurrentPrice(price);
      } catch (error) {
        console.error('Error loading package prices:', error);
        showErrorNotification('فشل في تحميل أسعار الباقات');
      }
    };

    loadPackagePrices();
  }, [selectedPackage, selectedCarType]);

  // معالجة نجاح الدفع
  const handlePaymentSuccess = async (paymentData) => {
    try {
      setLoading(true);
      
      // إنشاء الطلب في قاعدة البيانات
      const orderData = {
        packageType: selectedPackage,
        carType: selectedCarType,
        price: currentPrice.price,
        washes: currentPrice.washes,
        paymentMethod: 'hyperpay',
        paymentData: paymentData,
        status: 'paid'
      };

      // إنشاء الطلب
      const orderResponse = await orderAPI.create(orderData);
      
      // إنشاء QR Code
      const qrResponse = await qrAPI.generate(orderResponse.data.id);
      
      // حفظ بيانات الطلب
      const finalOrder = {
        id: orderResponse.data.id,
        package: selectedPackage,
        carType: selectedCarType,
        price: currentPrice.price,
        washes: currentPrice.washes,
        date: new Date().toISOString(),
        status: 'paid',
        paymentData: paymentData,
        qrCode: qrResponse.data
      };
      
      setOrderData(finalOrder);
      setQrCode(qrResponse.data);
      setCurrentStep(3);
      
      showSuccessNotification('تم إتمام الدفع بنجاح');
      
    } catch (error) {
      console.error('Payment processing error:', error);
      showErrorNotification('حدث خطأ أثناء معالجة الدفع');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // معالجة فشل الدفع
  const handlePaymentError = (error) => {
    showErrorNotification('فشل في عملية الدفع: ' + error.message);
    setError(error.message);
  };

  // إنشاء QR Code
  const generateQRCode = async () => {
    if (!orderData) {
      showErrorNotification('لا توجد بيانات طلب صالحة');
      return;
    }

    setLoading(true);
    
    try {
      // إنشاء QR Code من البيانات الموجودة
      const qrData = {
        operationId: orderData.id,
        customerName: 'عميل تجريبي',
        packageName: selectedPackage === 'basic' ? 'الباقة الأساسية' : 
                     selectedPackage === 'advanced' ? 'الباقة المتقدمة' : 'الباقة المميزة',
        packageType: selectedPackage,
        remainingWashes: currentPrice.washes,
        totalWashes: currentPrice.washes,
        startDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(),
        packageStatus: 'active',
        usageHistory: []
      };
      
      // حفظ QR في localStorage
      localStorage.setItem('qrCodeData', JSON.stringify(qrData));
      
      setQrCode(qrData);
      setCurrentStep(4);
      
      showSuccessNotification('تم إنشاء QR Code بنجاح');
      
    } catch (error) {
      console.error('QR Code generation error:', error);
      showErrorNotification('فشل في إنشاء QR Code');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'تأكيد الطلب', icon: FaCheckCircle },
    { id: 2, title: 'الدفع', icon: FaCreditCard },
    { id: 3, title: 'معالجة الطلب', icon: FaCheckCircle },
    { id: 4, title: 'QR Code', icon: FaQrcode }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* شريط التقدم */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  currentStep >= step.id ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* محتوى الخطوات */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                تأكيد طلبك
              </h2>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  تفاصيل الطلب
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">نوع الباقة:</span>
                    <span className="font-medium">
                      {selectedPackage === 'basic' ? 'الباقة الأساسية' : 
                       selectedPackage === 'advanced' ? 'الباقة المتقدمة' : 'الباقة المميزة'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">نوع السيارة:</span>
                    <span className="font-medium">
                      {selectedCarType === 'small' ? 'سيارة صغيرة' : 
                       selectedCarType === 'medium' ? 'سيارة متوسطة' : 'سيارة كبيرة'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">عدد الغسلات:</span>
                    <span className="font-medium">{currentPrice.washes} غسلة</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-green-600">
                    <span>السعر الإجمالي:</span>
                    <span>{currentPrice.price} ريال</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={onBack}
                  className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaArrowLeft className="ml-2" />
                  رجوع
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  متابعة الدفع
                  <FaArrowRight className="mr-2" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                إتمام الدفع
              </h2>
              
              {/* HyperPay Payment Component */}
              <HyperPayPayment
                amount={currentPrice.price}
                currency="SAR"
                customer={{
                  email: 'test@example.com',
                  name: 'عميل تجريبي',
                  phone: '+966501234567'
                }}
                billing={{
                  street1: 'Test Street',
                  city: 'Riyadh',
                  state: 'Riyadh',
                  country: 'SA',
                  postcode: '12345'
                }}
                package={{
                  _id: 'test-package',
                  name: selectedPackage === 'basic' ? 'الباقة الأساسية' : 
                         selectedPackage === 'advanced' ? 'الباقة المتقدمة' : 'الباقة المميزة',
                  washes: currentPrice.washes
                }}
                car={{
                  _id: 'test-car',
                  size: selectedCarType
                }}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onCancel={() => setCurrentStep(1)}
              />

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaArrowLeft className="ml-2" />
                  رجوع
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                معالجة الطلب
              </h2>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    تم الدفع بنجاح!
                  </h3>
                  <p className="text-green-700 mb-4">
                    رقم الطلب: {orderData?.id}
                  </p>
                  <div className="bg-white rounded p-4 border border-green-200">
                    <div className="text-sm text-gray-600 mb-2">تفاصيل الطلب:</div>
                    <div className="space-y-1 text-sm">
                      <div>الباقة: {orderData?.package}</div>
                      <div>نوع السيارة: {orderData?.carType}</div>
                      <div>عدد الغسلات: {orderData?.washes}</div>
                      <div className="font-bold">السعر: {orderData?.price} ريال</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={generateQRCode}
                  disabled={loading}
                  className="flex items-center justify-center mx-auto px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري إنشاء QR Code...
                    </>
                  ) : (
                    <>
                      إنشاء QR Code
                      <FaQrcode className="mr-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                QR Code الخاص بك
              </h2>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-8 border-2 border-green-300 mb-6">
                    <div className="text-6xl mb-4">📱</div>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      QR Code جاهز!
                    </div>
                    <div className="text-sm text-gray-600">
                      رقم العملية: {qrCode?.operationId}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded p-4 border border-green-200 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">تفاصيل QR Code:</h4>
                    <div className="space-y-1 text-sm">
                      <div>اسم العميل: {qrCode?.customerName}</div>
                      <div>الباقة: {qrCode?.packageName}</div>
                      <div>الغسلات المتبقية: {qrCode?.remainingWashes}</div>
                      <div>تاريخ الانتهاء: {new Date(qrCode?.expiryDate).toLocaleDateString('ar-SA')}</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">تعليمات الاستخدام:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1 text-right">
                      <li>• احفظ QR Code في هاتفك</li>
                      <li>• اذهب لأقرب فرع من فروعنا</li>
                      <li>• اعرض QR Code للموظف</li>
                      <li>• سيتم خصم غسلة واحدة تلقائياً</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 space-x-reverse">
                <button
                  onClick={() => onComplete && onComplete(qrCode)}
                  className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  تم، شكراً لك
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  طباعة QR Code
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notificationData.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="font-bold">{notificationData.title}</div>
          <div className="text-sm">{notificationData.message}</div>
        </div>
      )}
    </div>
  );
};

export default CheckoutFlow; 