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
  Hotel
} from 'lucide-react';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';

const VIPBranchSelection = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  // Get VIP package and order details from localStorage
  const vipCheckoutData = JSON.parse(localStorage.getItem('vipCheckoutData') || '{}');
  const qrCodeData = JSON.parse(localStorage.getItem('qrCodeData') || '{}');

  // بيانات فروع VIP (فروع الفنادق)
  const vipBranches = [
    {
      id: 'vip-1',
      name: 'فرع كارلتون الرياض VIP',
      arabicName: 'فرع كارلتون الرياض VIP',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك فهد، العليا، الرياض',
      phone: '+966 11 463 5000',
      rating: 4.9,
      reviews: 850,
      distance: '0.1 كم',
      workingHours: '7-11',
      isOpen: true,
      services: ['غسيل VIP شامل', 'تلميع احترافي', 'شمع حماية', 'معطر فاخر', 'خدمة شخصية'],
      mapUrl: 'https://maps.app.goo.gl/TH9R8GjccK8xHRh29?g_st=ipc',
      features: ['خدمة VIP', 'معدات حديثة', 'خدمة سريعة', 'أسعار VIP', 'موقف مجاني'],
      image: '/src/assets/كارلتون.jpeg',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '10 سيارة/ساعة',
      specialties: ['سيارات فاخرة', 'سيارات رياضية', 'سيارات VIP'],
      hotelName: 'كارلتون الرياض',
      isVIP: true
    },
    {
      id: 'vip-2',
      name: 'فرع سانت ريجيس الرياض VIP',
      arabicName: 'فرع سانت ريجيس الرياض VIP',
      address: 'King Saud Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك سعود، العليا، الرياض',
      phone: '+966 11 211 7777',
      rating: 4.9,
      reviews: 920,
      distance: '0.2 كم',
      workingHours: '7-11',
      isOpen: true,
      services: ['غسيل VIP شامل', 'تلميع احترافي', 'شمع حماية', 'معطر فاخر', 'خدمة شخصية'],
      mapUrl: 'https://maps.app.goo.gl/CzA8VYVkgQ16mFg4A?g_st=ipc',
      features: ['خدمة VIP', 'معدات حديثة', 'خدمة سريعة', 'أسعار VIP', 'موقف مجاني'],
      image: '/src/assets/ريتز.jpeg',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '12 سيارة/ساعة',
      specialties: ['سيارات فاخرة', 'سيارات رياضية', 'سيارات VIP'],
      hotelName: 'فندق سانت ريجيس الرياض',
      isVIP: true
    },
    {
      id: 'vip-3',
      name: 'فرع الهلتون الرياض VIP',
      arabicName: 'فرع الهلتون الرياض VIP',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك فهد، العليا، الرياض',
      phone: '+966 11 488 1234',
      rating: 4.8,
      reviews: 780,
      distance: '0.3 كم',
      workingHours: '7-11',
      isOpen: true,
      services: ['غسيل VIP شامل', 'تلميع احترافي', 'شمع حماية', 'معطر فاخر', 'خدمة سريعة'],
      mapUrl: 'https://maps.app.goo.gl/jed6Jdz4gaL6o5Ar5?g_st=ipc',
      features: ['خدمة VIP', 'معدات حديثة', 'خدمة سريعة', 'أسعار VIP', 'موقف مجاني'],
      image: '/src/assets/هيلتون.jpeg',
      coordinates: { lat: 24.7136, lng: 46.6753 },
      capacity: '15 سيارة/ساعة',
      specialties: ['سيارات فاخرة', 'سيارات رياضية', 'سيارات VIP'],
      hotelName: 'فندق الهلتون الرياض',
      isVIP: true
    }
  ];

  const getPackageTypeColor = (type) => {
    switch (type) {
      case 'vip': return 'from-yellow-500 to-amber-600';
      default: return 'from-green-500 to-green-600';
    }
  };

  const getPackageTypeText = (type) => {
    switch (type) {
      case 'vip': return 'باقة VIP';
      default: return 'باقة عادية';
    }
  };

  const generateQRCode = async () => {
    if (!selectedBranch) {
      alert('يرجى اختيار الفرع أولاً');
      return;
    }

    setIsGeneratingQR(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const now = new Date();
    const expiryDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
    
    // Generate unique operation ID
    const operationId = `VIP${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    // Generate verification code
    const verificationCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    
    // Generate digital signature
    const digitalSignature = btoa(`${operationId}${verificationCode}${Date.now()}`).substr(0, 16);
    
    // Generate transaction ID
    const transactionId = `VIP${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const qrDataObject = {
      // Customer Information
      customerName: vipCheckoutData.customer?.name || 'العميل VIP',
      customerPhone: vipCheckoutData.customer?.phone || '',
      carType: vipCheckoutData.carType || 'medium',
      
      // VIP Package Information
      packageType: 'vip',
      packageName: vipCheckoutData.name || 'باقة VIP',
      packagePrice: vipCheckoutData.price || 0,
      totalWashes: vipCheckoutData.washes || 1,
      remainingWashes: vipCheckoutData.washes || 1,
      
      // VIP Hotel Information
      hotelName: vipCheckoutData.customer?.hotelName || 'فندق VIP',
      roomNumber: vipCheckoutData.customer?.roomNumber || '',
      
      // Branch Information
      branchName: selectedBranch.arabicName,
      branchAddress: selectedBranch.arabicAddress,
      branchPhone: selectedBranch.phone,
      branchId: selectedBranch.id,
      
      // Transaction Information
      operationId: operationId,
      transactionId: transactionId,
      paymentMethod: 'بطاقة ائتمان',
      paymentStatus: 'completed',
      
      // Dates and Times
      startDate: now.toISOString(),
      expiryDate: expiryDate.toISOString(),
      gregorianDate: now.toLocaleDateString('en-CA'),
      hijriDate: getHijriDate(now),
      dayOfWeek: getDayName(now.getDay()),
      time: now.toLocaleTimeString('ar-SA'),
      
      // Security Information
      verificationCode: verificationCode,
      digitalSignature: digitalSignature,
      
      // Technical Information
      appVersion: '1.0.0',
      deviceType: getDeviceType(navigator.userAgent),
      platform: navigator.platform,
      
      // VIP Status Information
      packageStatus: 'active',
      vipStatus: 'active',
      lastUsed: null,
      usageHistory: [],
      
      // Additional Information
      createdAt: now.toISOString(),
      qrVersion: '2.0',
      isVIP: true
    };

    setQrData(qrDataObject);
    setIsGeneratingQR(false);
    setShowQRModal(true);
    
    // Save QR data
    localStorage.setItem('qrCodeData', JSON.stringify(qrDataObject));
    localStorage.setItem('selectedBranch', JSON.stringify(selectedBranch));
  };

  const handleBranchSelection = () => {
    if (!selectedBranch) {
      alert('يرجى اختيار الفرع أولاً');
      return;
    }

    generateQRCode();
  };

  const getHijriDate = (date) => {
    const gregorianYear = date.getFullYear();
    const hijriYear = gregorianYear - 622;
    const hijriMonth = date.getMonth() + 1;
    const hijriDay = date.getDate();
    return `${hijriYear}/${hijriMonth}/${hijriDay}`;
  };

  const getDayName = (dayIndex) => {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[dayIndex];
  };

  const getDeviceType = (userAgent) => {
    if (/Android/i.test(userAgent)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
    if (/Windows/i.test(userAgent)) return 'Windows';
    if (/Mac/i.test(userAgent)) return 'Mac';
    return 'Unknown';
  };

  if (!vipCheckoutData || Object.keys(vipCheckoutData).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
          <button 
            onClick={() => navigate('/vip-package-details')}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            العودة لصفحة VIP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 py-16 relative overflow-hidden">
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
              <Crown className="w-4 h-4" />
              فرع VIP متاح
              <Hotel className="w-4 h-4" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              اختر فرع VIP
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-green-100 mb-8 max-w-2xl mx-auto"
            >
              اختر الفرع الأقرب لك لاستلام الخدمة VIP والحصول على QR كود
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* VIP Hotels Button - Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-3xl p-6">
            <div className="flex items-center justify-center mb-3">
              <Hotel className="w-6 h-6 text-yellow-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">تريد رؤية جميع الفنادق VIP؟</h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
              اكتشف جميع فنادقنا المميزة التي تقدم خدمة غسيل السيارات VIP
            </p>
            <button
              onClick={() => navigate('/vip-hotels')}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <Crown className="w-4 h-4" />
              <span>عرض جميع الفنادق VIP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
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
                  <Crown className="w-8 h-8 text-yellow-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{vipCheckoutData.name || 'باقة VIP'}</h3>
                    <p className="text-gray-600">نوع السيارة: {vipCheckoutData.carType || 'متوسط'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-4 py-2 rounded-full text-white text-sm font-bold bg-gradient-to-r ${getPackageTypeColor('vip')}`}>
                    {getPackageTypeText('vip')}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    الغسلات المتبقية: {vipCheckoutData.washes || 1}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{vipCheckoutData.price || 0}</div>
                    <div className="text-gray-600">ريال</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">{vipCheckoutData.washes || 1}</div>
                    <div className="text-gray-600">غسلة VIP</div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">معلومات العميل VIP</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الاسم:</span>
                    <span className="font-medium">{vipCheckoutData.customer?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الهاتف:</span>
                    <span className="font-medium">{vipCheckoutData.customer?.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الفندق:</span>
                    <span className="font-medium">{vipCheckoutData.customer?.hotelName}</span>
                  </div>
                  {vipCheckoutData.customer?.roomNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">رقم الغرفة:</span>
                      <span className="font-medium">{vipCheckoutData.customer.roomNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Branch Selection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                  <Hotel className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">اختر فرع VIP</h2>
              </div>

              <div className="space-y-4">
                {vipBranches.map((branch) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setSelectedBranch(branch)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedBranch?.id === branch.id
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold">{branch.rating}</span>
                      </div>
                      <div className="text-yellow-600 font-bold text-sm">فرع VIP</div>
                    </div>
                    
                    <h4 className="font-bold text-gray-800 text-lg mb-2">{branch.arabicName}</h4>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-500" />
                        <span>{branch.arabicAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-yellow-500" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span>{branch.workingHours}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {branch.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {selectedBranch?.id === branch.id && (
                      <div className="flex items-center gap-2 text-yellow-600 font-bold">
                        <CheckCircle className="w-5 h-5" />
                        تم الاختيار
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              
             </div>
           </motion.div>
         </div>
       </div>

       {/* Generate QR Button - Top */}
       <div className="max-w-6xl mx-auto px-6 py-8">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="text-center"
         >
           <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6">
             <div className="flex items-center justify-center mb-3">
               <QrCode className="w-6 h-6 text-green-600 mr-2" />
               <h3 className="text-xl font-bold text-gray-800">جاهز لإنشاء QR كود VIP؟</h3>
             </div>
             <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
               اختر الفرع المناسب لك ثم اضغط على الزر أدناه لإنشاء QR كود VIP
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
                   <span>جاري إنشاء QR كود VIP...</span>
                 </>
               ) : (
                 <>
                   <Crown className="w-5 h-5" />
                   <span>إنشاء QR كود VIP</span>
                   <QrCode className="w-5 h-5" />
                 </>
               )}
             </motion.button>
           </div>
         </motion.div>
       </div>



      {/* QR Modal */}
      <AnimatePresence>
        {showQRModal && qrData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">تم إنشاء QR كود VIP!</h3>
              <p className="text-gray-600 mb-6">يمكنك الآن استخدام QR كود في الفرع المختار</p>
              
              <div className="bg-yellow-50 rounded-2xl p-4 mb-6">
                <div className="text-sm text-gray-600 mb-2">رقم العملية</div>
                <div className="font-mono font-bold text-gray-800 text-lg">
                  {qrData.operationId}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/washing-tracking')}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  متابعة الغسيل
                </button>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VIPBranchSelection; 