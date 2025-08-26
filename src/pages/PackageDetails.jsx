import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Clock,
  Star,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Shield,
  Crown,
  Gift,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Zap,
  Award,
  Heart,
  TrendingUp,
  DollarSign,
  Percent,
  ShoppingCart,
  ArrowRight,
  Loader2,
  Settings,
  Search
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/footer/Footer';
import Notification from '../components/common/Notification';

const PackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarSize, setSelectedCarSize] = useState('small'); // Default car size
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Car types with pricing
  const carTypes = [
    {
      value: 'small',
      label: 'سيارة صغيرة',
      description: 'سيدان، هاتشباك',
      multiplier: 0.9,
      icon: Car
    },
    {
      value: 'medium',
      label: 'سيارة متوسطة',
      description: 'SUV، كروس أوفر',
      multiplier: 1.0,
      icon: Car
    },
    {
      value: 'large',
      label: 'سيارة كبيرة',
      description: 'فان، بيك أب',
      multiplier: 1.2,
      icon: Car
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    loadCarData();
    loadPackageData();
  }, [packageId]);

  useEffect(() => {
    if (selectedCarSize) {
      fetchPackageDetails();
    }
  }, [packageId, selectedCarSize]);

  const loadCarData = () => {
    // Get car data from location state or localStorage
    const carFromState = location.state?.selectedCar;
    const carFromStorage = localStorage.getItem('selectedCar');

    if (carFromState) {
      setSelectedCar(carFromState);
      setSelectedCarSize(carFromState.size || 'small');
    } else if (carFromStorage) {
      const carData = JSON.parse(carFromStorage);
      setSelectedCar(carData);
      setSelectedCarSize(carData.size || 'small');
    }
  };

  const loadPackageData = () => {
    // Get package data from location state or localStorage
    const packageFromState = location.state?.selectedPackage;
    const packageFromStorage = localStorage.getItem('selectedPackage');

    if (packageFromState) {
      // Set car size from package data
      if (packageFromState.carType) {
        setSelectedCarSize(packageFromState.carType);
      }
      console.log('Package from state:', packageFromState);
    } else if (packageFromStorage) {
      const packageData = JSON.parse(packageFromStorage);
      // Set car size from package data
      if (packageData.carType) {
        setSelectedCarSize(packageData.carType);
      }
      console.log('Package from storage:', packageData);
    }
  };

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:5000/api/packages/get-single-package-id/${packageId}?size=${selectedCarSize}`);
      const data = await response.json();

      if (response.ok) {
        setPackageData(data);
      } else {
        setError(data.message || 'فشل في تحميل بيانات الباقة');
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
      setError('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCarSizeChange = (size) => {
    setSelectedCarSize(size);
  };

  const handleReservePackage = () => {
    // Validation
    // if (!selectedCar) {
    //   showErrorNotification('يرجى إضافة سيارة أولاً');
    //   return;
    // }

    if (!customerInfo.name.trim() || !customerInfo.phone.trim()) {
      showErrorNotification('يرجى إدخال الاسم ورقم الهاتف');
      return;
    }

    // Save data to localStorage
    const reservationData = {
      package: packageData,
      carType: selectedCarSize, // Use selected car size
      customer: customerInfo,
      totalPrice: calculateTotalPrice()
    };

    localStorage.setItem('reservationData', JSON.stringify(reservationData));

    showSuccessNotification('تم حفظ بيانات الحجز بنجاح');

    // Navigate to checkout after a short delay
    setTimeout(() => {
      navigate('/checkout');
    }, 1500);
  };

  const calculateTotalPrice = () => {
    if (!packageData || !selectedCarSize) return 0;
    const carType = carTypes.find(car => car.value === selectedCarSize);
    return Math.round(packageData.basePrice * (carType?.multiplier || 1.0));
  };

  const calculateSavings = () => {
    if (!packageData) return 0;
    const totalPrice = calculateTotalPrice();
    return Math.round(packageData.originalPrice - totalPrice);
  };

  const getPackageIcon = () => {
    if (!packageData) return Car;

    if (packageData.name.includes('VIP') || packageData.name.includes('فاخر')) return Crown;
    if (packageData.name.includes('متقدم') || packageData.name.includes('احترافي')) return Shield;
    if (packageData.name.includes('أساسي') || packageData.name.includes('بسيط')) return Car;
    return Star;
  };

  const getPackageColor = () => {
    if (!packageData) return 'from-green-500 to-green-600';

    if (packageData.name.includes('VIP') || packageData.name.includes('فاخر')) return 'from-purple-500 to-purple-600';
    if (packageData.name.includes('متقدم') || packageData.name.includes('احترافي')) return 'from-blue-500 to-blue-600';
    if (packageData.name.includes('أساسي') || packageData.name.includes('بسيط')) return 'from-green-500 to-green-600';
    return 'from-emerald-500 to-emerald-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">جاري تحميل تفاصيل الباقة...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">حدث خطأ</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/packages')}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            العودة إلى الباقات
          </button>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return null;
  }

  const PackageIcon = getPackageIcon();
  const packageColor = getPackageColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Header />

      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            onClick={() => navigate('/packages')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة إلى الباقات
          </motion.button>

          {/* Car Size Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">حجم السيارة المختار</h2>

            {/* Selected Car Size Display */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-lg">
                <span className="text-2xl">🚗</span>
                <span className="text-lg">
                  {selectedCarSize === 'small' ? 'سيارة صغيرة' :
                    selectedCarSize === 'medium' ? 'سيارة متوسطة' :
                      selectedCarSize === 'large' ? 'سيارة كبيرة' : selectedCarSize}
                </span>
                <CheckCircle className="w-5 h-5" style={{ fill: 'white' }} />
              </div>
            </div>

            {/* Optional: Change Size Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  // Show size selection options when user wants to change
                  const newSize = prompt('اختر حجم السيارة (small/medium/large):', selectedCarSize);
                  if (newSize && ['small', 'medium', 'large'].includes(newSize)) {
                    handleCarSizeChange(newSize);
                  }
                }}
                className="text-green-600 hover:text-green-700 font-medium text-sm underline"
              >
                تغيير الحجم
              </button>
            </div>
          </motion.div>

          {/* Package Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Package Icon */}
              <div className={`w-20 h-20 bg-gradient-to-r ${packageColor} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                <PackageIcon className="w-10 h-10" />
              </div>

              {/* Package Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{packageData.name}</h1>
                  {packageData.popular && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      الأكثر طلباً
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-lg mb-4">
                  باقة {packageData.washes} غسلة مع خدمة شاملة ومميزة
                </p>

                {/* Package Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{packageData.washes}</div>
                    <div className="text-sm text-gray-600">عدد الغسلات</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{packageData.duration}</div>
                    <div className="text-sm text-gray-600">دقيقة للغسلة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{packageData.savings}</div>
                    <div className="text-sm text-gray-600">ريال توفير</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedCarSize === 'small' ? 'صغيرة' :
                        selectedCarSize === 'medium' ? 'متوسطة' :
                          selectedCarSize === 'large' ? 'كبيرة' : selectedCarSize}
                    </div>
                    <div className="text-sm text-gray-600">حجم السيارة</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Package Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  مميزات الباقة
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {packageData.features && packageData.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Car Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Car className="w-6 h-6 text-green-600" />
                  معلومات السيارة
                </h2>

                {selectedCar ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Car className="w-6 h-6 text-green-600" />
                        <h3 className="font-semibold text-gray-900">السيارة المختارة</h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الماركة:</span>
                          <span className="font-semibold text-gray-900">{selectedCar.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الموديل:</span>
                          <span className="font-semibold text-gray-900">{selectedCar.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">السنة:</span>
                          <span className="font-semibold text-gray-900">{selectedCar.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">اللون:</span>
                          <span className="font-semibold text-gray-900">{selectedCar.color}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">رقم اللوحة:</span>
                          <span className="font-semibold text-gray-900">{selectedCar.plateNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">رقم الترخيص:</span>
                          <span className="font-semibold text-gray-900">{selectedCar.licensePlate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Settings className="w-6 h-6 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">المواصفات</h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحجم:</span>
                          <span className="font-semibold text-gray-900">
                            {selectedCarSize === 'small' ? 'صغيرة' :
                              selectedCarSize === 'medium' ? 'متوسطة' :
                                selectedCarSize === 'large' ? 'كبيرة' : selectedCarSize}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">النوع:</span>
                          <span className="font-semibold text-gray-900">
                            {selectedCar.type === 'sedan' ? 'سيدان' :
                              selectedCar.type === 'suv' ? 'SUV' :
                                selectedCar.type === 'hatchback' ? 'هاتشباك' :
                                  selectedCar.type === 'pickup' ? 'بيك أب' :
                                    selectedCar.type === 'van' ? 'فان' : 'أخرى'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحالة:</span>
                          <span className="font-semibold text-gray-900">
                            {selectedCar.make === 'clean' ? 'نظيفة' :
                              selectedCar.make === 'dirty' ? 'متسخة' :
                                selectedCar.make === 'very_dirty' ? 'متسخة جداً' : selectedCar.make}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">لم يتم اختيار سيارة</p>
                    <button
                      onClick={() => navigate('/create-car')}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      إضافة سيارة جديدة
                    </button>
                  </div>
                )}
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-green-600" />
                  معلومات العميل
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="+966501234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pricing & Reservation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  التفاصيل والسعر
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">السعر الأساسي:</span>
                    <span className="font-semibold">{packageData.basePrice} ريال</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">نوع السيارة:</span>
                    <span className="font-semibold">
                      {selectedCarSize === 'small' ? 'صغيرة' :
                        selectedCarSize === 'medium' ? 'متوسطة' :
                          selectedCarSize === 'large' ? 'كبيرة' : selectedCarSize}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-green-600">
                    <span className="font-semibold">التوفير:</span>
                    <span className="font-bold">{packageData.savings} ريال</span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                    <span>السعر الإجمالي:</span>
                    <span className="text-green-600">{packageData.basePrice} ريال</span>
                  </div>
                </div>

                {/* Package Benefits */}
                <div className="bg-green-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-green-600" />
                    مميزات إضافية
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      صابون إيطالي فاخر
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      معطر داخلي مجاني
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      ضمان الجودة
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      خدمة عملاء 24/7
                    </li>
                  </ul>
                </div>

                {/* Reserve Button */}
                <motion.button
                  onClick={handleReservePackage}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  احجز الباقة الآن
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Additional Info */}
                <div className="mt-6 text-center text-sm text-gray-600">
                  <p className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    صالح لمدة شهر واحد
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    ضمان استرداد الأموال
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

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

export default PackageDetails; 