import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQrcode, FaArrowRight } from 'react-icons/fa';
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
  Shield
} from 'lucide-react';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';

const BranchSelection = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  // Get package and order details from localStorage
  const packageDetails = JSON.parse(localStorage.getItem('packageDetails') || '{}');
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');

  // تحميل QR الموجود عند تحميل الصفحة
  useEffect(() => {
    const existingQR = localStorage.getItem('qrCodeData');
    if (existingQR) {
      const qrData = JSON.parse(existingQR);
      setQrData(qrData);
      
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
    } else {
      alert('لا يوجد QR Code. يرجى العودة لصفحة الدفع');
      navigate('/packages');
    }
  }, [navigate]);

  // بيانات جميع الفروع
  const branches = [
    {
      id: 1,
      name: 'مغسلة النقاء المطلق',
      arabicName: 'مغسلة النقاء المطلق',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك فهد، العليا، الرياض',
      phone: '+966 11 488 1234',
      rating: 4.7,
      reviews: 1500,
      distance: '1.2 كم',
      workingHours: '7:00 ص - 10:00 م',
      isOpen: true,
      services: ['غسيل خارجي شامل', 'غسيل داخلي شامل', 'تلميع احترافي', 'معطر فاخر', 'خدمة سريعة'],
      mapUrl: 'https://maps.app.goo.gl/hD3KYnFEgx9pEXBu6?g_st=iw',
      features: ['معدات حديثة', 'خدمة سريعة', 'VIP', 'أسعار منافسة', 'موقف مجاني'],
      image: '/src/assets/helton.png',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '15 سيارة/ساعة',
      specialties: ['سيارات فاخرة', 'سيارات عائلية', 'سيارات رياضية']
    },
    {
      id: 2,
      name: 'مغسلة اللمسة الناعمة',
      arabicName: 'مغسلة اللمسة الناعمة',
      address: 'King Abdullah Road, Al Malaz, Riyadh',
      arabicAddress: 'طريق الملك عبدالله، الملز، الرياض',
      phone: '+966 11 488 5678',
      rating: 4.8,
      reviews: 1600,
      distance: '2.1 كم',
      workingHours: '6:00 ص - 11:00 م',
      isOpen: true,
      services: ['غسيل خارجي شامل', 'غسيل داخلي شامل', 'تلميع احترافي', 'معطر فاخر', 'خدمة VIP'],
      mapUrl: 'https://maps.app.goo.gl/khhqHgaRFZXqELYTA?g_st=iw',
      features: ['موقع مركزي', 'خدمة سريعة', 'أسعار منافسة', 'خدمة منزلية'],
      image: '/src/assets/karlton.png',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '20 سيارة/ساعة',
      specialties: ['سيارات عائلية', 'سيارات تجارية', 'سيارات كلاسيكية']
    },
    {
      id: 3,
      name: 'مغسلة القوة الذكية',
      arabicName: 'مغسلة القوة الذكية',
      address: 'King Salman Road, Al Nakheel, Riyadh',
      arabicAddress: 'طريق الملك سلمان، النخيل، الرياض',
      phone: '+966 11 488 9012',
      rating: 4.9,
      reviews: 1200,
      distance: '3.5 كم',
      workingHours: '8:00 ص - 9:00 م',
      isOpen: true,
      services: ['غسيل خارجي شامل', 'غسيل داخلي شامل', 'تلميع احترافي', 'معطر فاخر', 'تعطير'],
      mapUrl: 'https://maps.app.goo.gl/uB82K6Tj8jsPmXFeA?g_st=iw',
      features: ['موقف مجاني', 'خدمة سريعة', 'أسعار منافسة', 'خدمة عملاء'],
      image: '/src/assets/regis.png',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '25 سيارة/ساعة',
      specialties: ['سيارات رياضية', 'سيارات فاخرة', 'سيارات عائلية']
    },
    {
      id: 4,
      name: 'مغسلة البريق الذهبي',
      arabicName: 'مغسلة البريق الذهبي',
      address: 'King Khalid Road, Al Sulaimaniyah, Riyadh',
      arabicAddress: 'طريق الملك خالد، السليمانية، الرياض',
      phone: '+966 11 488 3456',
      rating: 4.6,
      reviews: 1100,
      distance: '4.2 كم',
      workingHours: '7:30 ص - 10:30 م',
      isOpen: true,
      services: ['غسيل خارجي شامل', 'غسيل داخلي شامل', 'تلميع احترافي', 'معطر فاخر', 'خدمة متميزة'],
      mapUrl: 'https://maps.app.goo.gl/VY5rRk7oLZ2YpSmb7?g_st=iw',
      features: ['موقع هادئ', 'خدمة سريعة', 'أسعار منافسة', 'خدمة VIP'],
      image: '/src/assets/alahli.jpeg',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '18 سيارة/ساعة',
      specialties: ['سيارات عائلية', 'سيارات تجارية', 'سيارات كلاسيكية']
    },
    {
      id: 5,
      name: 'مغسلة النظافة الذكية',
      arabicName: 'مغسلة النظافة الذكية',
      address: 'King Faisal Road, Al Sahafah, Riyadh',
      arabicAddress: 'طريق الملك فيصل، الصحافة، الرياض',
      phone: '+966 11 488 7890',
      rating: 4.5,
      reviews: 900,
      distance: '5.1 كم',
      workingHours: '6:30 ص - 11:30 م',
      isOpen: true,
      services: ['غسيل خارجي شامل', 'غسيل داخلي شامل', 'تلميع احترافي', 'معطر فاخر', 'خدمة سريعة'],
      mapUrl: 'https://maps.app.goo.gl/example5',
      features: ['معدات حديثة', 'خدمة سريعة', 'أسعار منافسة', 'موقف مجاني'],
      image: '/src/assets/alnma.jpeg',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '22 سيارة/ساعة',
      specialties: ['سيارات عائلية', 'سيارات تجارية', 'سيارات رياضية']
    },
    {
      id: 6,
      name: 'مغسلة اللمعان المثالي',
      arabicName: 'مغسلة اللمعان المثالي',
      address: 'King Abdulaziz Road, Al Rawdah, Riyadh',
      arabicAddress: 'طريق الملك عبدالعزيز، الروضة، الرياض',
      phone: '+966 11 488 2345',
      rating: 4.7,
      reviews: 1300,
      distance: '6.3 كم',
      workingHours: '7:00 ص - 10:00 م',
      isOpen: true,
      services: ['غسيل خارجي شامل', 'غسيل داخلي شامل', 'تلميع احترافي', 'معطر فاخر', 'خدمة VIP'],
      mapUrl: 'https://maps.app.goo.gl/example6',
      features: ['موقع مركزي', 'خدمة سريعة', 'أسعار منافسة', 'خدمة منزلية'],
      image: '/src/assets/cod.jpeg',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '16 سيارة/ساعة',
      specialties: ['سيارات فاخرة', 'سيارات رياضية', 'سيارات كلاسيكية']
    }
  ];

  useEffect(() => {
    // لا يتم اختيار فرع تلقائياً، المستخدم يختار
  }, []);

  const getPackageTypeColor = (type) => {
    switch (type) {
      case 'basic': return 'from-blue-500 to-blue-600';
      case 'advanced': return 'from-green-500 to-green-600';
      case 'premium': return 'from-purple-500 to-purple-600';
      case 'vip': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPackageTypeText = (type) => {
    switch (type) {
      case 'basic': return 'أساسية';
      case 'advanced': return 'متقدمة';
      case 'premium': return 'مميزة';
      case 'vip': return 'VIP';
      default: return 'غير محدد';
    }
  };

  // استخدام QR الموجود بدلاً من إنشاء جديد
  const loadExistingQR = () => {
    const existingQR = localStorage.getItem('qrCodeData');
    if (existingQR) {
      const qrData = JSON.parse(existingQR);
      setQrData(qrData);
      return qrData;
    }
    return null;
  };

  const generateQRCode = async () => {
    setIsGeneratingQR(true);
    
    // استخدام QR الموجود بدلاً من إنشاء جديد
    const existingQR = loadExistingQR();
    
    if (existingQR) {
      // التحقق من صلاحية QR الموجود
      const now = new Date();
      const expiry = new Date(existingQR.expiryDate);
      
      if (now > expiry) {
        alert('QR Code منتهي الصلاحية');
        setIsGeneratingQR(false);
        return;
      }
      
      if (existingQR.remainingWashes <= 0) {
        alert('لا توجد غسلات متبقية');
        setIsGeneratingQR(false);
        return;
      }
      
      // استخدام QR الموجود
      setQrData(existingQR);
      setIsGeneratingQR(false);
      setShowQRModal(true);
    } else {
      alert('لا يوجد QR Code. يرجى العودة لصفحة الدفع');
      setIsGeneratingQR(false);
    }
  };

  const handleBranchSelection = () => {
    if (!selectedBranch) {
      alert('يرجى اختيار فرع');
      return;
    }

    // استخدام QR الموجود بدلاً من إنشاء جديد
    const existingQR = localStorage.getItem('qrCodeData');
    if (!existingQR) {
      alert('لا يوجد QR Code. يرجى العودة لصفحة الدفع');
      return;
    }

    const qrData = JSON.parse(existingQR);
    
    // التحقق من صلاحية QR
    const now = new Date();
    const expiry = new Date(qrData.expiryDate);
    
    if (now > expiry) {
      alert('QR Code منتهي الصلاحية');
      return;
    }
    
    if (qrData.remainingWashes <= 0) {
      alert('لا توجد غسلات متبقية');
      return;
    }

    // Save branch selection
    localStorage.setItem('selectedBranch', JSON.stringify(selectedBranch));
    
    // خصم غسلة تلقائياً من QR الموجود
    const updatedQRData = {
      ...qrData,
      remainingWashes: qrData.remainingWashes - 1,
      lastUsed: new Date().toISOString(),
      branchName: selectedBranch.arabicName,
      branchAddress: selectedBranch.arabicAddress,
      branchPhone: selectedBranch.phone,
      branchId: selectedBranch.id,
      usageHistory: [
        ...(qrData.usageHistory || []),
        {
          date: new Date().toISOString(),
          branchName: selectedBranch.arabicName,
          branchAddress: selectedBranch.arabicAddress,
          branchPhone: selectedBranch.phone,
          action: 'wash_used',
          washNumber: qrData.totalWashes - qrData.remainingWashes + 1
        }
      ]
    };
    
    // حفظ QR المحدث
    localStorage.setItem('qrCodeData', JSON.stringify(updatedQRData));
    
    // إشعار نجاح العملية
    alert(`تم خصم غسلة بنجاح! الغسلات المتبقية: ${updatedQRData.remainingWashes}`);
    
    // الانتقال لصفحة التتبع
    navigate(`/tracking/${qrData.operationId}`);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
        <motion.div 
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
        >
              <Gift className="w-4 h-4" />
              الفرع المتاح
              <MapPin className="w-4 h-4" />
        </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
            >
              اختر الفرع
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto"
            >
              اختر الفرع الأقرب لك لاستلام الخدمة والحصول على QR كود
            </motion.p>
          </div>
        </div>
      </div>

              <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Generate QR Button - Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6">
              <div className="flex items-center justify-center mb-3">
                <FaQrcode className="w-6 h-6 text-green-600 mr-2" style={{ fill: 'white' }} />
                <h3 className="text-xl font-bold text-gray-800">QR Code الموجود</h3>
              </div>
              
              {/* عرض معلومات QR الموجود */}
              {qrData && (
                <div className="bg-white rounded-xl p-4 mb-4 border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-green-600 font-bold">العميل</div>
                      <div className="text-gray-700">{qrData.customerName}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 font-bold">الباقة</div>
                      <div className="text-gray-700">{qrData.packageName}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 font-bold">الغسلات المتبقية</div>
                      <div className="text-gray-700">{qrData.remainingWashes} من {qrData.totalWashes}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                اختر الفرع المناسب لك ثم اضغط على الزر أدناه لخصم غسلة واستخدام QR Code
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBranchSelection}
                disabled={!selectedBranch || isGeneratingQR}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 mx-auto ${
                  !selectedBranch || isGeneratingQR
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl'
                }`}
              >
                {isGeneratingQR ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري خصم الغسلة...</span>
                  </>
                ) : (
                  <>
                    <FaQrcode className="w-5 h-5" style={{ fill: 'white' }} />
                    <span>خصم غسلة واستخدام QR Code</span>
                    <FaArrowRight className="w-5 h-5" style={{ fill: 'white' }} />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
        {/* Package Summary */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-green-600" />
              <div>
                    <h3 className="text-2xl font-bold text-gray-800">{packageDetails.name || 'الباقة الأساسية'}</h3>
                    <p className="text-gray-600">نوع السيارة: {orderDetails.carType || 'متوسط'}</p>
              </div>
            </div>
            <div className="text-right">
                  <div className={`px-4 py-2 rounded-full text-white text-sm font-bold bg-gradient-to-r ${getPackageTypeColor(packageDetails.type)}`}>
                {getPackageTypeText(packageDetails.type)}
              </div>
                  <p className="text-sm text-gray-600 mt-2">
                الغسلات المتبقية: {packageDetails.washes || 1}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{packageDetails.price || 150}</div>
                    <div className="text-gray-600">ريال</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{packageDetails.washes || 1}</div>
                    <div className="text-gray-600">غسلة</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  ملاحظة مهمة
                </h4>
                <p className="text-gray-700 text-sm">
                  سيتم خصم غسلة واحدة من رصيدك عند اختيار الفرع. يمكنك استخدام QR كود في أي فرع من فروعنا.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Branch Selection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <MapPin className="w-8 h-8 text-green-600" />
                  اختر الفرع المناسب
                </h2>

                <div className="space-y-6">
                  {branches.map((branch, index) => (
                    <motion.div
                      key={branch.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                        selectedBranch?.id === branch.id 
                          ? 'border-green-500 bg-green-100' 
                          : 'border-green-200 hover:border-green-300'
                      }`}
                      onClick={() => setSelectedBranch(branch)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{branch.arabicName}</h3>
                            <p className="text-gray-600 text-sm">{branch.arabicAddress}</p>
                          </div>
                        </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-800">{branch.rating}</span>
                      <span className="text-gray-500 text-sm">(+{branch.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-green-500" />
                      {branch.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-green-500" />
                      {branch.workingHours}
                    </div>
                  </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                      branch.isOpen 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {branch.isOpen ? 'مفتوح الآن' : 'مغلق'}
                  </div>
                    <span className="text-sm text-gray-600">{branch.distance}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-bold">{branch.capacity}</span>
                        </div>
                </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                        {branch.services.slice(0, 3).map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                        {service}
                      </span>
                    ))}
                        {branch.services.length > 3 && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                            +{branch.services.length - 3} خدمات أخرى
                          </span>
                        )}
                  </div>

                      <div className="flex items-center gap-2">
                  <UnifiedButton
                          variant="secondary"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(branch.mapUrl, '_blank');
                          }}
                          className="flex-1"
                    icon={<MapPin className="w-4 h-4" />}
                  >
                    عرض على الخريطة
                  </UnifiedButton>
                        
                        {selectedBranch?.id === branch.id && (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>


                </div>
              </div>
            </motion.div>
        </div>
        </div>

      {/* QR Modal */}
        <AnimatePresence>
          {showQRModal && qrData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQRModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto mb-4">
                  <UnifiedIcon
                    icon={CheckCircle}
                    size="large"
                    variant="gradient"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">تم إنشاء QR كود بنجاح!</h3>
                <p className="text-gray-600 mb-6">يمكنك الآن استخدام QR كود في الفرع المختار</p>

                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">رقم العملية</div>
                    <div className="font-bold text-gray-800 text-lg">{qrData.operationId}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UnifiedButton
                      variant="gradient"
                      size="large"
                      onClick={() => navigate('/payment-success')}
                      className="w-full"
                    >
                      عرض QR كود
                    </UnifiedButton>
                  </motion.div>
                  
                  <UnifiedButton
                    variant="secondary"
                    size="medium"
                    onClick={() => setShowQRModal(false)}
                    className="w-full"
                  >
                    إغلاق
                  </UnifiedButton>
                </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default BranchSelection; 