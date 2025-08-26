import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Car, 
  CheckCircle, 
  Star, 
  QrCode,
  Package,
  User,
  Calendar,
  AlertTriangle,
  Zap,
  ArrowRight,
  Gift,
  Crown,
  Shield,
  Navigation,
  Wifi,
  Coffee,
  Square,
  Loader2
} from 'lucide-react';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';
import { branchAPI, qrAPI } from '../api';

const Branches = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get package and order details from localStorage
  const packageDetails = JSON.parse(localStorage.getItem('packageDetails') || '{}');
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await branchAPI.getAll();
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
      setError('حدث خطأ في تحميل الفروع. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  // تحميل QR الموجود عند تحميل الصفحة
  useEffect(() => {
    const loadExistingQR = async () => {
      try {
        if (orderDetails.id) {
          const qrResponse = await qrAPI.getStatus(orderDetails.id);
          const qrData = qrResponse.data;
          
          // التحقق من صلاحية QR
          const now = new Date();
          const expiry = new Date(qrData.expiryDate);
          
          if (now > expiry) {
            alert('QR Code منتهي الصلاحية. يرجى شراء باقة جديدة');
            navigate('/packages');
            return;
          }
          
          if (qrData.remainingWashes <= 0) {
            alert('لا توجد غسلات متبقية. يرجى شراء باقة جديدة');
            navigate('/packages');
            return;
          }
          
          setQrData(qrData);
        }
      } catch (error) {
        console.error('Error loading QR data:', error);
        // استخدام بيانات تجريبية في حالة الخطأ
        const demoQRData = {
          operationId: 'DEMO-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          customerName: 'أحمد محمد',
          customerPhone: '+966501234567',
          carType: 'متوسط',
          packageName: 'الباقة المميزة',
          packageType: 'premium',
          totalWashes: 10,
          remainingWashes: 7,
          price: 150,
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          expiryDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
          branchName: 'مغسلة النقاء المطلق',
          branchAddress: 'طريق الملك فهد، العليا، الرياض'
        };
        setQrData(demoQRData);
      }
    };

    loadExistingQR();
  }, [navigate, orderDetails.id]);

  const generateQRCode = async () => {
    if (!packageDetails.id || !orderDetails.id) {
      alert('بيانات الباقة أو الطلب غير متوفرة');
      return;
    }

    setIsGeneratingQR(true);
    try {
      const response = await qrAPI.generate(orderDetails.id);
      const qrData = response.data;
      setQrData(qrData);
      setShowQRModal(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('حدث خطأ في إنشاء QR Code');
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const handleBranchSelection = () => {
    if (!qrData) {
      alert('يرجى إنشاء QR Code أولاً');
      return;
    }
    setShowQRModal(true);
  };

  const handleStartWashing = async (branch) => {
    if (!qrData) {
      alert('QR Code غير متوفر');
      return;
    }

    try {
      const response = await qrAPI.use(qrData.operationId, branch.id);
      alert('تم بدء الغسيل بنجاح!');
      navigate('/tracking');
    } catch (error) {
      console.error('Error starting wash:', error);
      alert('حدث خطأ في بدء الغسيل');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل الفروع...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <UnifiedButton onClick={fetchBranches} variant="primary">
            إعادة المحاولة
          </UnifiedButton>
        </div>
      </div>
    );
  }

  // فلترة الفروع
  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.arabicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.arabicAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || branch.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getPackageTypeColor = (type) => {
    switch (type) {
      case 'premium': return 'from-purple-500 to-purple-600';
      case 'standard': return 'from-blue-500 to-blue-600';
      case 'basic': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPackageTypeText = (type) => {
    switch (type) {
      case 'premium': return 'مميز';
      case 'standard': return 'عادي';
      case 'basic': return 'أساسي';
      default: return 'غير محدد';
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'coffee': return <Coffee className="w-4 h-4" />;
      case 'parking': return <Square className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">اختر الفرع المناسب</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            اختر الفرع الأقرب لك أو الأكثر ملاءمة لاحتياجاتك
          </p>
        </motion.div>

        {/* Package Info */}
        {packageDetails && Object.keys(packageDetails).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{packageDetails.name}</h3>
                  <p className="text-gray-600">{qrData?.remainingWashes || packageDetails.washes} غسلة متبقية</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{packageDetails.price} ريال</div>
                <div className="text-sm text-gray-500">صالح حتى {new Date(qrData?.expiryDate).toLocaleDateString('ar-SA')}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن فرع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              {['all', 'premium', 'standard', 'basic'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filterType === type
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'الكل' : 
                   type === 'premium' ? 'مميز' :
                   type === 'standard' ? 'عادي' : 'أساسي'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Branches Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBranches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Google Maps */}
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&q=${encodeURIComponent(branch.arabicAddress)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={branch.arabicName}
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    branch.isOpen ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {branch.isOpen ? 'مفتوح' : 'مغلق'}
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getPackageTypeColor(branch.type)}`}>
                    {getPackageTypeText(branch.type)}
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-800 mr-1">{branch.rating}</span>
                    <span className="text-xs text-gray-600">({branch.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Branch Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{branch.arabicName}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{branch.arabicAddress}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{branch.phone}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{branch.workingHours}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Car className="w-4 h-4 mr-2" />
                    <span className="text-sm">{branch.capacity}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-2 mb-4">
                  {branch.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1 text-gray-500">
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">الخدمات المتوفرة:</h4>
                  <div className="flex flex-wrap gap-1">
                    {branch.services.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                    {branch.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{branch.services.length - 3} المزيد
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleStartWashing(branch)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    ابدأ الغسيل هنا
                  </button>
                  
                  <button
                    onClick={() => window.open(branch.mapUrl, '_blank')}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 transition-all flex items-center justify-center"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    التوجيه
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredBranches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد فروع</h3>
            <p className="text-gray-500">جرب تغيير معايير البحث</p>
          </motion.div>
        )}
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {showQRModal && qrData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowQRModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">QR Code جاهز</h3>
                
                <div className="bg-gray-100 rounded-xl p-6 mb-6">
                  <QrCode className="w-32 h-32 mx-auto text-gray-400" />
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-gray-600">الفرع: <span className="font-semibold">{selectedBranch?.arabicName}</span></p>
                  <p className="text-gray-600">الغسلات المتبقية: <span className="font-semibold text-green-600">{qrData.remainingWashes}</span></p>
                </div>
                
                <div className="space-y-2">
                  <UnifiedButton
                    variant="gradient"
                    size="medium"
                    onClick={handleBranchSelection}
                    className="w-full"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    متابعة الغسيل
                  </UnifiedButton>
                  
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="w-full px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Branches; 