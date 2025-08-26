import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHotel, FaMapMarkerAlt, FaStar, FaPhone, FaCheckCircle, FaArrowRight, FaUser, FaEnvelope, FaCrown, FaShieldAlt, FaClock } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import { generateVIPQRCode, isVIPPackage } from '../utils/qrSystem';
import carltonImage from '../assets/كارلتون.jpeg';
import regisImage from '../assets/ريتز.jpeg';
import hiltonImage from '../assets/هيلتون.jpeg';

const VIPPackageDetails = () => {
  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    hotelName: '',
    roomNumber: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const carTypes = [
    { value: 'small', label: 'سيارة صغيرة', icon: '🚗', description: 'سيارة صغيرة' },
    { value: 'medium', label: 'سيارة متوسطة', icon: '🚙', description: 'SUV، كروس أوفر' },
    { value: 'large', label: 'سيارة كبيرة', icon: '🚛', description: 'شاحنة، فان' },
    { value: 'luxury', label: 'سيارة فاخرة', icon: '🏎️', description: 'سيارات رياضية، فاخرة' }
  ];

  const vipHotels = [
    {
      id: 1,
      name: 'كارلتون الرياض',
      arabicName: 'كارلتون الرياض',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك فهد، العليا، الرياض',
      phone: '+966 11 463 5000',
      rating: 4.8,
      mapUrl: 'https://maps.app.goo.gl/TH9R8GjccK8xHRh29?g_st=ipc',
              features: ['خدمة VIP', 'غسيل شامل', 'تلميع احترافي', 'شمع حماية', 'خدمة عملاء'],
      description: 'فندق فاخر يقدم خدمة غسيل السيارات VIP مع أحدث التقنيات والخدمة المميزة',
      workingHours: '7-11',
      image: carltonImage
    },
    {
      id: 2,
      name: 'فندق سانت ريجيس الرياض',
      arabicName: 'فندق سانت ريجيس الرياض',
      address: 'King Saud Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك سعود، العليا، الرياض',
      phone: '+966 11 211 7777',
      rating: 4.9,
      mapUrl: 'https://maps.app.goo.gl/CzA8VYVkgQ16mFg4A?g_st=ipc',
      features: ['خدمة VIP', 'غسيل شامل', 'تلميع احترافي', 'شمع حماية', 'خدمة شخصية'],
      description: 'فندق خمس نجوم يقدم خدمة غسيل السيارات الفاخرة مع الاهتمام بكل التفاصيل',
      workingHours: '7-11',
      image: regisImage
    },
    {
      id: 3,
      name: 'فندق الهلتون الرياض',
      arabicName: 'فندق الهلتون الرياض',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك فهد، العليا، الرياض',
      phone: '+966 11 488 1234',
      rating: 4.7,
      mapUrl: 'https://maps.app.goo.gl/jed6Jdz4gaL6o5Ar5?g_st=ipc',
      features: ['خدمة VIP', 'غسيل شامل', 'تلميع احترافي', 'شمع حماية', 'خدمة سريعة'],
      description: 'فندق عالمي يقدم خدمة غسيل السيارات المميزة مع ضمان الجودة العالية',
      workingHours: '7-11',
      image: hiltonImage
    }
  ];

  const vipPackage = {
    type: 'vip',
    name: 'الباقة VIP',
    washes: 1,
    price: 150,
    originalPrice: 235,
    savings: 85,
    features: [
      'غسيل شامل شامل',
      'تلميع احترافي',
      'شمع حماية',
      'خدمة VIP متميزة',
      'صالح في الفنادق المحددة فقط',
      'خدمة عملاء',
      'ضمان الجودة'
    ],
    color: 'from-yellow-500 to-amber-600',
    gradient: 'from-yellow-50 to-amber-100',
    description: 'باقة VIP حصرية للفنادق - غسلة واحدة مع المواقف والفاليه',
    validity: 30,
    isVIP: true,
    isHotelOnly: true,
    requiresHotelSelection: true
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToCheckout = () => {
    if (!selectedHotel) {
      alert('يرجى اختيار الفندق');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.hotelName) {
      alert('يرجى إدخال البيانات المطلوبة (الاسم، رقم الهاتف، اسم الفندق)');
      return;
    }

    // منع التكرار - التحقق من عدم وجود بيانات سابقة
    const existingVipCheckout = localStorage.getItem('vipCheckoutData');
    if (existingVipCheckout) {
      const shouldReplace = window.confirm('يوجد طلب VIP سابق. هل تريد استبداله بالطلب الجديد؟');
      if (!shouldReplace) {
        return;
      }
    }

    // حفظ البيانات المختارة باستخدام النظام المركزي
    const checkoutData = {
      type: 'vip',
      name: vipPackage.name,
      washes: vipPackage.washes,
      price: vipPackage.price,
      originalPrice: vipPackage.originalPrice,
      savings: vipPackage.savings,
      validity: vipPackage.validity,
      isVIP: true,
      isHotelOnly: true,
      requiresHotelSelection: true,
      hotel: selectedHotel,
      customer: customerInfo,
      carType: selectedCarType
    };

    // حفظ في localStorage بالشكل المتوافق مع النظام المركزي
    localStorage.setItem('vipCheckoutData', JSON.stringify(checkoutData));
    localStorage.setItem('vipPackageDetails', JSON.stringify(vipPackage));
    localStorage.setItem('vipOrderDetails', JSON.stringify({
      carType: selectedCarType,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email,
      hotelName: customerInfo.hotelName,
      roomNumber: customerInfo.roomNumber
    }));
    localStorage.setItem('selectedHotel', JSON.stringify(selectedHotel));
    
    // مسح أي بيانات سابقة
    localStorage.removeItem('qrCodeData');
    localStorage.removeItem('scannedQRData');
    
    navigate('/vip-checkout');
  };

  return (
    <>
      <Helmet>
        <title>باقة VIP - خدمة غسيل السيارات الفاخرة | PayPass</title>
        <meta name="description" content="باقة VIP حصرية للفنادق مع خدمة غسيل السيارات الفاخرة والتلميع الاحترافي" />
        <meta name="keywords" content="باقة VIP, غسيل سيارات فاخر, فنادق, خدمة VIP" />
        <meta property="og:title" content="باقة VIP - خدمة غسيل السيارات الفاخرة" />
        <meta property="og:description" content="باقة VIP حصرية للفنادق مع خدمة غسيل السيارات الفاخرة" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/vip-package-details" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="باقة VIP - خدمة غسيل السيارات الفاخرة" />
        <meta name="twitter:description" content="باقة VIP حصرية للفنادق" />
        <link rel="canonical" href="/vip-package-details" />
      </Helmet>

      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
        <PageHeader 
          title="باقة VIP"
          subtitle="خدمة غسيل السيارات الفاخرة حصراً للفنادق"
          breadcrumbs={['الرئيسية', 'الباقات', 'باقة VIP']}
          background="bg-gradient-to-r from-yellow-500 to-amber-600"
        />

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* VIP Hotels Button - Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-3xl p-6">
              <div className="flex items-center justify-center mb-3">
                <FaHotel className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">تريد رؤية الفنادق VIP المتاحة؟</h3>
              </div>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                اكتشف جميع فنادقنا المميزة التي تقدم خدمة غسيل السيارات VIP
              </p>
              <button
                onClick={() => navigate('/vip-hotels')}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                <FaCrown className="w-4 h-4" />
                <span>عرض الفنادق VIP المتاحة</span>
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* تفاصيل الباقة VIP */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-3xl shadow-2xl border border-yellow-200 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-400/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="text-center mb-8 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-full text-xs font-bold mb-6 shadow-lg">
                    <FaCrown className="w-3 h-3" />
                    باقة VIP حصرية
                    <FaCrown className="w-3 h-3" />
                  </div>
                  
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transform hover:scale-110 transition-transform duration-300">
                    <FaHotel className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">{vipPackage.name}</h2>
                  <p className="text-gray-600 mb-6 text-lg">{vipPackage.description}</p>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <div className="text-5xl font-bold text-yellow-700 mb-2">{vipPackage.price} ريال</div>
                    <div className="text-xl text-gray-400 line-through mb-2">{vipPackage.originalPrice} ريال</div>
                    <div className="bg-yellow-600 text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg">
                      توفير {vipPackage.savings} ريال
                    </div>
                  </div>
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-gray-800 mb-2">{vipPackage.washes}</div>
                    <div className="text-gray-600 text-lg">غسلة VIP</div>
                    <div className="text-sm text-gray-500 mt-2">صالح في الفنادق المحددة فقط</div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaShieldAlt className="text-yellow-600" />
                      المميزات الحصرية
                    </h3>
                    <ul className="space-y-3">
                      {vipPackage.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-700">
                          <FaCheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* نوع السيارة المختار */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FaHotel className="text-yellow-500" />
                      نوع السيارة المختار
                    </h3>
                    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-4xl">
                        {carTypes.find(car => car.value === selectedCarType)?.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-lg">
                          {carTypes.find(car => car.value === selectedCarType)?.label || 'لم يتم الاختيار'}
                        </div>
                        <div className="text-gray-600">
                          {carTypes.find(car => car.value === selectedCarType)?.description || 'اختر نوع السيارة'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* بيانات العميل */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaUser className="text-yellow-500" />
                  بيانات العميل VIP
                </h3>
                
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="block text-gray-700 font-bold mb-3">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      placeholder="أدخل اسمك الكامل"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="block text-gray-700 font-bold mb-3">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+966 50 123 4567"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label className="block text-gray-700 font-bold mb-3">
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label className="block text-gray-700 font-bold mb-3">
                      اسم الفندق *
                    </label>
                    <input
                      type="text"
                      name="hotelName"
                      value={customerInfo.hotelName}
                      onChange={handleInputChange}
                      placeholder="أدخل اسم الفندق"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block text-gray-700 font-bold mb-3">
                      رقم الغرفة (اختياري)
                    </label>
                    <input
                      type="text"
                      name="roomNumber"
                      value={customerInfo.roomNumber}
                      onChange={handleInputChange}
                      placeholder="رقم الغرفة"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    />
                  </motion.div>
                </div>
              </div>

              {/* اختيار الفندق */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-3xl p-6 border border-yellow-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaHotel className="text-yellow-500" />
                  اختيار الفندق
                </h3>
                <div className="space-y-4">
                  {vipHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      onClick={() => setSelectedHotel(hotel)}
                      className={`bg-white rounded-2xl p-4 cursor-pointer transition-all duration-300 border-2 ${
                        selectedHotel?.id === hotel.id
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{hotel.arabicName}</h4>
                          <p className="text-gray-600 text-sm">{hotel.arabicAddress}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <FaStar className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-bold">{hotel.rating}</span>
                            <FaPhone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{hotel.phone}</span>
                          </div>
                        </div>
                        {selectedHotel?.id === hotel.id && (
                          <FaCheckCircle className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* زر المتابعة */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FaCrown className="w-5 h-5" />
                  <span>متابعة الدفع VIP - {vipPackage.price} ريال</span>
                  <FaArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VIPPackageDetails; 