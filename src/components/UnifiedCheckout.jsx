import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Shield,
  CheckCircle,
  Lock,
  User,
  Phone,
  Mail,
  Car,
  Package,
  Apple,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Hash,
  Tag
} from 'lucide-react';
import { orderAPI, paymentAPI, qrAPI } from '../api';
import Notification from './common/Notification';
import HyperPayPayment from './HyperPayPayment';

const UnifiedCheckout = () => {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('hyperpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    try {
      setLoading(true);
      setError(null);

      // قراءة البيانات من localStorage
      const storedReservation = localStorage.getItem('reservationData');
      const storedUser = localStorage.getItem('frontend_user');
      const storedCar = localStorage.getItem('selectedCar');

      if (!storedReservation) {
        setError('بيانات الحجز غير متوفرة. يرجى العودة إلى صفحة الباقات.');
        return;
      }

      if (!storedUser) {
        setError('بيانات المستخدم غير متوفرة. يرجى تسجيل الدخول مرة أخرى.');
        return;
      }

      const reservation = JSON.parse(storedReservation);
      const user = JSON.parse(storedUser);

      // Set car data only if it exists
      if (storedCar) {
        const car = JSON.parse(storedCar);
        setCarData(car);
      }

      setReservationData(reservation);
      setUserData(user);

    } catch (error) {
      console.error('Error loading checkout data:', error);
      setError('حدث خطأ في تحميل بيانات الطلب');
    } finally {
      setLoading(false);
    }
  };

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

  const paymentMethods = [
    {
      id: 'hyperpay',
      name: 'HyperPay الآمن',
      icon: CreditCard,
      description: 'فيزا، ماستركارد، مدى - دفع آمن ومشفر',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: Apple,
      description: 'الدفع السريع عبر Apple Pay',
      color: 'from-black to-gray-800'
    }
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      setIsProcessing(true);

      // إنشاء الطلب
      const orderData = {
        packageId: reservationData.package._id,
        customerId: userData._id,
        customerName: reservationData.customer.name,
        customerPhone: reservationData.customer.phone,
        customerEmail: reservationData.customer.email,
        carType: reservationData.carType,
        totalAmount: reservationData.totalPrice,
        packageName: reservationData.package.name,
        packageWashes: reservationData.package.washes,
        carId: carData ? carData._id : null,
        carType: carData ? carData.size : null,
        carSize: carData ? carData.size : null,
        carBrand: carData ? carData.brand : null,
        carModel: carData ? carData.model : null,
        carYear: carData ? carData.year : null,
        carColor: carData ? carData.color : null,
        carPlateNumber: carData ? carData.plateNumber : null,
        carLicensePlate: carData ? carData.licensePlate : null,
        paymentMethod: selectedPaymentMethod,
        paymentData: paymentData
      };

      const orderResponse = await orderAPI.create(orderData);

      // إنشاء QR Code
      const qrResponse = await qrAPI.generate(orderResponse.data.id);

      // حفظ بيانات الطلب النهائية
      const finalOrderData = {
        orderId: orderResponse.data.id,
        paymentId: paymentData.id,
        package: reservationData.package,
        customer: reservationData.customer,
        user: userData,
        paymentMethod: selectedPaymentMethod,
        totalAmount: reservationData.totalPrice,
        orderDate: new Date().toISOString(),
        status: 'completed',
        qrCode: qrResponse.data
      };

      localStorage.setItem('finalOrderData', JSON.stringify(finalOrderData));
      localStorage.setItem('qrCodeData', JSON.stringify(qrResponse.data));

      // مسح بيانات الحجز المؤقتة
      localStorage.removeItem('reservationData');

      showSuccessNotification('تم إتمام الدفع بنجاح');

      // الانتقال إلى صفحة نجاح الدفع
      setTimeout(() => {
        navigate('/payment-success', {
          state: {
            orderId: orderResponse.data.id,
            paymentId: paymentData.id,
            qrCode: qrResponse.data
          }
        });
      }, 1500);

    } catch (error) {
      console.error('Payment error:', error);
      showErrorNotification('حدث خطأ أثناء معالجة الدفع: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error) => {
    showErrorNotification('فشل في عملية الدفع: ' + error.message);
  };

  const handleBackToPackages = () => {
    navigate('/packages');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">جاري تحميل بيانات الطلب...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">حدث خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBackToPackages}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            العودة إلى الباقات
          </button>
        </div>
      </div>
    );
  }

  if (!reservationData || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">بيانات الطلب غير متوفرة</h2>
          <p className="text-gray-600 mb-6">يرجى العودة إلى صفحة الباقات واختيار باقة جديدة</p>
          <button
            onClick={handleBackToPackages}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            العودة إلى الباقات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
          onClick={handleBackToPackages}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة إلى الباقات
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إتمام الطلب</h1>
          <p className="text-gray-600">أدخل بيانات الدفع لإتمام عملية الشراء</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* تفاصيل الطلب */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Package className="w-6 h-6 text-green-600" />
                تفاصيل الطلب
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">{reservationData.package.name}</span>
                  </div>
                  <span className="text-green-600 font-bold text-lg">{reservationData.package.washes} غسلة</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800">السيارة</span>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {reservationData.car ? `${reservationData.car.model}` :
                      reservationData.carType === 'small' ? 'سيارة صغيرة' :
                        reservationData.carType === 'medium' ? 'سيارة متوسطة' :
                          reservationData.carType === 'large' ? 'سيارة كبيرة' :
                            (reservationData.carType || 'غير محدد')}
                  </span>
                </div>

                {!reservationData.car && (
                  <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm">لم يتم اختيار سيارة - يمكنك إضافة سيارة لاحقاً</span>
                    </div>
                  </div>
                )}

                {reservationData.car && (
                  <>
                    <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Hash className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-gray-800">رقم اللوحة</span>
                      </div>
                      <span className="text-indigo-600 font-semibold">{reservationData.car.plateNumber}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-teal-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-teal-600" />
                        <span className="font-semibold text-gray-800">رقم الترخيص</span>
                      </div>
                      <span className="text-teal-600 font-semibold">{reservationData.car.licensePlate}</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-800">العميل</span>
                  </div>
                  <span className="text-purple-600 font-semibold">{reservationData.customer.name}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-gray-800">الهاتف</span>
                  </div>
                  <span className="text-orange-600 font-semibold">{reservationData.customer.phone}</span>
                </div>

                {reservationData.customer.email && (
                  <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-gray-800">البريد الإلكتروني</span>
                    </div>
                    <span className="text-indigo-600 font-semibold">{reservationData.customer.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* ملخص السعر */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-green-600" />
                ملخص السعر
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">سعر الباقة:</span>
                  <span className="font-semibold text-gray-800">{reservationData.package.basePrice} ريال</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <span className="text-gray-600">التوفير:</span>
                  <span className="text-green-600 font-bold">{reservationData.package.savings} ريال</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center p-4 bg-green-100 rounded-2xl">
                  <span className="text-lg font-bold text-gray-800">المجموع:</span>
                  <span className="text-2xl font-bold text-green-600">{reservationData.package.basePrice} ريال</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* طرق الدفع */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                طرق الدفع الآمنة
              </h2>

              {/* اختيار طريقة الدفع */}
              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedPaymentMethod === method.id
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${method.color} text-white rounded-xl flex items-center justify-center`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* HyperPay Payment Component */}
              {selectedPaymentMethod === 'hyperpay' && (
                <HyperPayPayment
                  amount={reservationData.totalPrice}
                  currency="SAR"
                  customer={reservationData.customer}
                  billing={{
                    street1: 'Test Street',
                    city: 'Riyadh',
                    state: 'Riyadh',
                    country: 'SA',
                    postcode: '12345'
                  }}
                  package={reservationData.package}
                  car={carData}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  onCancel={() => {
                    setSelectedPaymentMethod('apple-pay');
                  }}
                />
              )}

              {/* رسالة الأمان */}
              <div className="text-center mt-6">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  جميع المعاملات مشفرة ومؤمنة
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toaster Notification */}
      {showNotification && (
        <Notification
          type={notificationData.type}
          title={notificationData.title}
          message={notificationData.message}
          onClose={() => setShowNotification(false)}
          position="top-right"
          duration={4000}
        />
      )}
    </div>
  );
};

export default UnifiedCheckout;
