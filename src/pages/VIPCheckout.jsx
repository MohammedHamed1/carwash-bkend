import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt, FaCar, FaStar, FaPhone, FaClock, FaUser, FaHotel, FaCrown } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import PaymentMethods from '../components/PaymentMethods';
import HyperPayPayment from '../components/HyperPayPayment';

const VIPCheckout = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit');
  const [paymentData, setPaymentData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // قراءة بيانات الدفع VIP من localStorage
    const data = localStorage.getItem('vipCheckoutData');
    if (data) {
      setCheckoutData(JSON.parse(data));
    } else {
      navigate('/vip-package-details');
    }
  }, [navigate]);



  const handlePayment = async () => {
    setIsProcessing(true);

    // محاكاة عملية الدفع
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/vip-payment-success');
    }, 2000);
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>إتمام الطلب VIP - {checkoutData.name} | PayPass</title>
        <meta name="description" content={`إتمام طلب ${checkoutData.name} مع خدمة غسيل السيارات الفاخرة. دفع آمن ومضمون`} />
        <meta name="keywords" content="دفع آمن, بطاقة ائتمان, Apple Pay, غسيل سيارات VIP, فنادق" />
        <meta property="og:title" content={`إتمام الطلب VIP - ${checkoutData.name}`} />
        <meta property="og:description" content={`إتمام طلب ${checkoutData.name} مع خدمة غسيل السيارات الفاخرة`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/vip-checkout" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`إتمام الطلب VIP - ${checkoutData.name}`} />
        <meta name="twitter:description" content={`إتمام طلب ${checkoutData.name} مع خدمة غسيل السيارات الفاخرة`} />
        <link rel="canonical" href="/vip-checkout" />
      </Helmet>

      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <PageHeader
          title="إتمام الطلب VIP"
          subtitle="اختر طريقة الدفع وأكمل طلبك الفاخر"
          breadcrumbs={['الرئيسية', 'الباقات', 'باقة VIP', 'إتمام الطلب']}
        />

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* تفاصيل الطلب VIP */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center">
                    <FaCrown className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">ملخص الطلب VIP</h2>
                </div>

                {/* تفاصيل الباقة VIP */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{checkoutData.name}</h3>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl flex items-center justify-center">
                      <FaHotel className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{checkoutData.washes}</div>
                      <div className="text-gray-600">غسلة VIP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700">{checkoutData.price} ريال</div>
                      <div className="text-gray-400 line-through text-sm">{checkoutData.originalPrice} ريال</div>
                    </div>
                  </div>

                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-center font-bold">
                    توفير {checkoutData.savings} ريال
                  </div>
                </div>

                {/* تفاصيل العميل VIP */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUser className="text-green-500" />
                    بيانات العميل VIP
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">الاسم:</span>
                      <span className="text-gray-600">{checkoutData.customer?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">الهاتف:</span>
                      <span className="text-gray-600">{checkoutData.customer?.phone}</span>
                    </div>
                    {checkoutData.customer?.email && (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">البريد الإلكتروني:</span>
                        <span className="text-gray-600">{checkoutData.customer.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">اسم الفندق:</span>
                      <span className="text-gray-600">{checkoutData.customer?.hotelName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">رقم الغرفة:</span>
                      <span className="text-gray-600">{checkoutData.customer?.roomNumber}</span>
                    </div>
                  </div>
                </div>

                {/* تفاصيل السيارة */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaCar className="text-green-500" />
                    نوع السيارة
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {checkoutData.carType === 'small' && '🚗'}
                      {checkoutData.carType === 'medium' && '🚙'}
                      {checkoutData.carType === 'large' && '🚛'}
                      {checkoutData.carType === 'luxury' && '🏎️'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">
                        {checkoutData.carTypeLabel}
                      </div>
                      <div className="text-sm text-gray-600">
                        {checkoutData.carType === 'small' && 'سيارة صغيرة'}
                        {checkoutData.carType === 'medium' && 'SUV، كروس أوفر'}
                        {checkoutData.carType === 'large' && 'شاحنة، فان'}
                        {checkoutData.carType === 'luxury' && 'سيارات رياضية، فاخرة'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* تفاصيل الفندق */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-500" />
                    الفندق المختار
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FaStar className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold">{checkoutData.hotel.rating}</span>
                      </div>
                      <div className="text-orange-600 font-bold text-sm">فندق VIP</div>
                    </div>

                    <h4 className="font-bold text-gray-800">{checkoutData.hotel.arabicName}</h4>

                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{checkoutData.hotel.arabicAddress}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{checkoutData.hotel.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{checkoutData.hotel.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* طرق الدفع */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                {/* العنوان الرئيسي */}
                <div className="payment-header mb-8">
                  <div className="payment-header-icon">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="payment-header-text">طرق الدفع الآمنة</h2>
                </div>

                {/* HyperPay Payment Component */}
                {selectedPaymentMethod === 'hyperpay' && (
                  <HyperPayPayment
                    amount={checkoutData.price}
                    currency="SAR"
                    customer={checkoutData.customer}
                    billing={{
                      street1: checkoutData.hotel?.arabicAddress || 'Test Street',
                      city: 'Riyadh',
                      state: 'Riyadh',
                      country: 'SA',
                      postcode: '12345'
                    }}
                    package={{
                      _id: 'vip-package',
                      name: checkoutData.name,
                      washes: checkoutData.washes,
                      price: checkoutData.price
                    }}
                    car={{
                      _id: 'vip-car',
                      size: checkoutData.carType,
                      model: checkoutData.carTypeLabel
                    }}
                    isVIP={true}
                    onSuccess={(paymentData) => {
                      // Handle successful VIP payment
                      setTimeout(() => {
                        navigate('/vip-payment-success', {
                          state: {
                            paymentMethod: 'hyperpay',
                            paymentData,
                            checkoutData
                          }
                        });
                      }, 1500);
                    }}
                    onError={(error) => {
                      console.error('VIP payment error:', error);
                    }}
                    onCancel={() => {
                      setSelectedPaymentMethod('credit');
                    }}
                  />
                )}

                {/* Regular Payment Methods */}
                {selectedPaymentMethod !== 'hyperpay' && (
                  <PaymentMethods
                    selectedMethod={selectedPaymentMethod}
                    onPaymentMethodChange={setSelectedPaymentMethod}
                    onPaymentDataChange={setPaymentData}
                  />
                )}

                {/* زر الدفع VIP */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-6 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 ${isProcessing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-xl hover:shadow-2xl'
                    }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>جاري معالجة الدفع VIP...</span>
                    </>
                  ) : (
                    <>
                      <FaCrown className="w-5 h-5" />
                      <span>إتمام الدفع VIP - {checkoutData.price} ريال</span>
                    </>
                  )}
                </motion.button>

                {/* زر العودة */}
                <button
                  onClick={() => navigate('/vip-package-details')}
                  className="w-full mt-4 py-4 px-6 rounded-2xl font-bold text-gray-600 border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  العودة لتعديل الطلب VIP
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VIPCheckout; 