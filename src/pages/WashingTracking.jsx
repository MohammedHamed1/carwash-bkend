import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Car, Sparkles, Star, ArrowRight } from 'lucide-react';
import { FaMapMarkerAlt, FaDirections, FaArrowRight, FaGift } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';

const WashingTracking = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [branchRating, setBranchRating] = useState(0);
  const [showRating, setShowRating] = useState(false);

  // Get order details from localStorage
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');
  const packageDetails = JSON.parse(localStorage.getItem('packageDetails') || '{}');
  const qrCodeData = JSON.parse(localStorage.getItem('qrCodeData') || '{}');
  const selectedBranch = JSON.parse(localStorage.getItem('selectedBranch') || '{}');

  // Use QR code data if available, otherwise fall back to order details
  const customerInfo = {
    name: qrCodeData.customerName || orderDetails.customerName || 'العميل',
    phone: qrCodeData.customerPhone || orderDetails.customerPhone || '',
    carType: qrCodeData.carType || orderDetails.carType || 'متوسط',
    packageName: qrCodeData.packageName || packageDetails.name || 'الباقة الأساسية',
    packageType: qrCodeData.packageType || packageDetails.type || 'basic',
    branchName: qrCodeData.branchName || selectedBranch.name || orderDetails.branchName || 'الفرع الرئيسي',
    branchAddress: qrCodeData.branchAddress || selectedBranch.address || '',
    branchPhone: qrCodeData.branchPhone || selectedBranch.phone || '',
    operationId: qrCodeData.operationId || orderDetails.orderId || '#' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    remainingWashes: qrCodeData.remainingWashes || packageDetails.washes || 1,
    totalWashes: qrCodeData.totalWashes || packageDetails.washes || 1,
    price: qrCodeData.price || packageDetails.price || 0,
    startDate: qrCodeData.startDate || new Date().toISOString(),
    expiryDate: qrCodeData.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  const stages = [
    {
      name: 'استقبال السيارة',
      description: 'جاري استقبال السيارة في الفرع',
      icon: Car,
      duration: 30, // 30 seconds
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'الغسيل الأساسي',
      description: 'جاري تنظيف السيارة بالصابون والماء',
      icon: Sparkles,
      duration: 120, // 2 minutes
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'التجفيف',
      description: 'جاري تجفيف السيارة بالمناشف الجافة',
      icon: Sparkles,
      duration: 60, // 1 minute
      color: 'from-emerald-500 to-green-600'
    },
    {
      name: 'التلميع النهائي',
      description: 'جاري إضافة التلميع واللمعان النهائي',
      icon: Sparkles,
      duration: 90, // 1.5 minutes
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'الفحص النهائي',
      description: 'جاري فحص السيارة والتأكد من الجودة',
      icon: CheckCircle,
      duration: 45, // 45 seconds
      color: 'from-emerald-500 to-green-600'
    }
  ];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        
        // Calculate current stage based on elapsed time
        let totalDuration = 0;
        for (let i = 0; i < stages.length; i++) {
          totalDuration += stages[i].duration;
          if (newTime <= totalDuration) {
            if (currentStage !== i) {
              setCurrentStage(i);
            }
            break;
          }
        }
        
        // Check if all stages are completed
        if (newTime >= totalDuration) {
          setIsCompleted(true);
          setShowRating(true);
          clearInterval(timer);
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStage, stages.length]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    return stages.reduce((total, stage) => total + stage.duration, 0);
  };

  const getProgressPercentage = () => {
    const totalDuration = getTotalDuration();
    return Math.min((elapsedTime / totalDuration) * 100, 100);
  };

  const handleRatingSubmit = () => {
    // Save rating to localStorage
    const ratings = JSON.parse(localStorage.getItem('branchRatings') || '[]');
    ratings.push({
      branch: customerInfo.branchName,
      branchAddress: customerInfo.branchAddress,
      branchPhone: customerInfo.branchPhone,
      rating: branchRating,
      date: new Date().toISOString(),
      operationId: customerInfo.operationId,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      packageName: customerInfo.packageName,
      carType: customerInfo.carType
    });
    localStorage.setItem('branchRatings', JSON.stringify(ratings));
    
    // Navigate to completion page
    navigate('/washing-completed');
  };

  const handleSkipRating = () => {
    navigate('/washing-completed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Action Buttons - Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/branch-selection')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaMapMarkerAlt className="w-4 h-4" style={{ fill: 'white' }} />
              <span>اختيار فرع آخر</span>
              <FaDirections className="w-4 h-4" style={{ fill: 'white' }} />
            </button>

            <button
              onClick={() => navigate('/packages')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaArrowRight className="w-4 h-4" style={{ fill: 'white' }} />
              <span>طلب جديد</span>
              <FaGift className="w-4 h-4" style={{ fill: 'white' }} />
            </button>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">متابعة الغسيل</h1>
          <p className="text-gray-600">مرحباً {customerInfo.name}</p>
          <p className="text-sm text-gray-500">رقم العملية: {customerInfo.operationId}</p>
        </motion.div>

        {/* Timer Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-lg font-semibold text-gray-700">الوقت المنقضي</span>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-sm text-gray-500">
              من أصل {formatTime(getTotalDuration())}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {Math.round(getProgressPercentage())}% مكتمل
            </div>
          </div>
        </motion.div>

        {/* Service Stages */}
        <div className="space-y-4 mb-6">
          {stages.map((stage, index) => {
            const IconComponent = stage.icon;
            const isActive = index === currentStage;
            const isCompleted = index < currentStage;
            const isPending = index > currentStage;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-4 shadow-md border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-green-500 bg-green-50' 
                    : isCompleted 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isActive 
                      ? 'bg-gradient-to-r ' + stage.color + ' animate-pulse' 
                      : isCompleted 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isActive || isCompleted ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      isActive ? 'text-green-700' : isCompleted ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {stage.name}
                    </h3>
                    <p className={`text-sm ${
                      isActive ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {stage.description}
                    </p>
                    
                    {isActive && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: stage.duration, ease: 'linear' }}
                        className="mt-2 h-1 bg-green-200 rounded-full overflow-hidden"
                      >
                        <div className="h-full bg-green-500 rounded-full" />
                      </motion.div>
                    )}
                  </div>
                  
                  {isCompleted && (
                    <CheckCircle className="w-6 h-6 text-green-500 ml-2" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Order Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">تفاصيل الطلب</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">الاسم:</span>
              <span className="font-medium">{customerInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">رقم الهاتف:</span>
              <span className="font-medium">{customerInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">نوع السيارة:</span>
              <span className="font-medium">{customerInfo.carType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الباقة:</span>
              <span className="font-medium">{customerInfo.packageName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الفرع:</span>
              <span className="font-medium">{customerInfo.branchName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">رقم العملية:</span>
              <span className="font-medium">{customerInfo.operationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">التاريخ الأولي:</span>
              <span className="font-medium">{new Date(customerInfo.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">التاريخ النهائي:</span>
              <span className="font-medium">{new Date(customerInfo.expiryDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">السعر:</span>
              <span className="font-medium">{customerInfo.price} ريال</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المبلغ المتبقي:</span>
              <span className="font-medium">{customerInfo.remainingWashes} مرة</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المبلغ الكلي:</span>
              <span className="font-medium">{customerInfo.totalWashes} مرة</span>
            </div>
          </div>
        </motion.div>

        {/* Rating Modal */}
        <AnimatePresence>
          {showRating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full"
              >
                <h3 className="text-xl font-bold text-center mb-4">قيّم تجربتك</h3>
                <p className="text-gray-600 text-center mb-6">كيف كانت تجربتك في {customerInfo.branchName}؟</p>
                
                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setBranchRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= branchRating
                            ? 'text-green-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <UnifiedButton
                    variant="secondary"
                    size="medium"
                    onClick={handleSkipRating}
                    className="flex-1"
                  >
                    تخطي
                  </UnifiedButton>
                  <UnifiedButton
                    variant="gradient"
                    size="medium"
                    onClick={handleRatingSubmit}
                    disabled={branchRating === 0}
                    className="flex-1"
                  >
                    إرسال
                  </UnifiedButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {!showRating && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-3 space-x-reverse"
          >
            <UnifiedButton
              variant="secondary"
              size="medium"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              العودة للرئيسية
            </UnifiedButton>
            {isCompleted && (
              <UnifiedButton
                variant="gradient"
                size="medium"
                onClick={() => setShowRating(true)}
                className="flex-1"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                قيّم الخدمة
              </UnifiedButton>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WashingTracking; 