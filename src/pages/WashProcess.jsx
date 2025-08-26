import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User, 
  Star, 
  Package,
  Car,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Download,
  Share2,
  Copy,
  Heart,
  ThumbsUp,
  MessageCircle,
  Gift,
  CreditCard
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useWash, addUsageRecord } from '../utils/qrSystem';
import UnifiedButton from '../components/common/UnifiedButton';

const WashProcess = () => {
  const navigate = useNavigate();
  const [qrData, setQrData] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [washStatus, setWashStatus] = useState('ready'); // ready, washing, completed
  const [washProgress, setWashProgress] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [rating, setRating] = useState(0);
  const [branchRating, setBranchRating] = useState(0);
  const [employeeRating, setEmployeeRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [selectedTipMethod, setSelectedTipMethod] = useState('card');

  useEffect(() => {
    try {
      // تحميل البيانات من localStorage
      const storedQR = localStorage.getItem('qrCodeData');
      const storedBranch = localStorage.getItem('selectedBranch');
      
      console.log('بيانات QR:', storedQR);
      console.log('بيانات الفرع:', storedBranch);
      
      if (storedQR) {
        setQrData(JSON.parse(storedQR));
      } else {
        console.log('لا توجد بيانات QR، إنشاء بيانات تجريبية...');
        // إنشاء بيانات تجريبية
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
        localStorage.setItem('qrCodeData', JSON.stringify(demoQRData));
      }
      
      if (storedBranch) {
        setSelectedBranch(JSON.parse(storedBranch));
      } else {
        console.log('لا توجد بيانات فرع، إنشاء بيانات تجريبية...');
        // إنشاء بيانات فرع تجريبية
        const demoBranch = {
          id: 1,
          arabicName: 'مغسلة النقاء المطلق',
          address: 'طريق الملك فهد، العليا، الرياض',
          phone: '+966 11 488 1234',
          rating: 4.7,
          type: 'premium'
        };
        setSelectedBranch(demoBranch);
        localStorage.setItem('selectedBranch', JSON.stringify(demoBranch));
      }
    } catch (error) {
      console.error('خطأ في تحميل البيانات:', error);
      alert('حدث خطأ في تحميل البيانات');
    }
  }, []);

  const startWashing = async () => {
    if (!qrData || !selectedBranch) {
      alert('بيانات غير مكتملة');
      return;
    }

    setWashStatus('washing');
    setWashProgress(0);

    // محاكاة عملية الغسيل
    const interval = setInterval(() => {
      setWashProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeWashing();
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  const completeWashing = async () => {
    try {
      // خصم غسلة من QR
      const updatedQR = await useWash(qrData, selectedBranch.arabicName);
      
      // إضافة سجل الاستخدام
      await addUsageRecord(qrData, selectedBranch.arabicName, 'wash_completed');
      
      // تحديث QR في localStorage
      localStorage.setItem('qrCodeData', JSON.stringify(updatedQR));
      setQrData(updatedQR);
      
      setWashStatus('completed');
      
      // عرض التقييم بعد 2 ثانية
      setTimeout(() => {
        setShowRating(true);
      }, 2000);
      
    } catch (error) {
      alert('حدث خطأ أثناء إتمام الغسيل');
      setWashStatus('ready');
    }
  };

  const handleRatingSubmit = () => {
    // حفظ التقييم
    const ratingData = {
      branchId: selectedBranch.id,
      branchName: selectedBranch.arabicName,
      branchRating,
      employeeRating,
      comment,
      date: new Date().toISOString(),
      customerName: qrData.customerName
    };
    
    localStorage.setItem('branchRating', JSON.stringify(ratingData));
    
    // عرض خيار البقشيش
    setShowRating(false);
    setShowTip(true);
  };

  const handleTipPayment = async () => {
    if (tipAmount <= 0) {
      // تخطي البقشيش
      navigate('/washing-completed');
      return;
    }

    // محاكاة دفع البقشيش
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const tipData = {
        amount: tipAmount,
        method: selectedTipMethod,
        branchId: selectedBranch.id,
        branchName: selectedBranch.arabicName,
        date: new Date().toISOString(),
        customerName: qrData.customerName
      };
      
      localStorage.setItem('tipData', JSON.stringify(tipData));
      
      alert('شكراً لك! تم دفع البقشيش بنجاح');
      navigate('/washing-completed');
      
    } catch (error) {
      alert('حدث خطأ أثناء دفع البقشيش');
    }
  };

  const tipOptions = [
    { amount: 10, label: '10 ريال' },
    { amount: 20, label: '20 ريال' },
    { amount: 30, label: '30 ريال' },
    { amount: 50, label: '50 ريال' }
  ];

  const getWashStatusText = () => {
    switch (washStatus) {
      case 'ready': return 'جاهز للغسيل';
      case 'washing': return 'جاري الغسيل...';
      case 'completed': return 'تم الغسيل بنجاح!';
      default: return '';
    }
  };

  const getWashStatusColor = () => {
    switch (washStatus) {
      case 'ready': return 'text-blue-600';
      case 'washing': return 'text-orange-600';
      case 'completed': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (!qrData || !selectedBranch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">بيانات غير مكتملة</h3>
          <p className="text-gray-600">يرجى العودة لصفحة اختيار الفرع</p>
          <UnifiedButton
            onClick={() => navigate('/branches')}
            className="mt-4"
          >
            العودة لاختيار الفرع
          </UnifiedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">عملية الغسيل</h1>
          <p className="text-xl text-gray-600 mb-6">مرحباً بك في {selectedBranch?.arabicName || 'الفرع المختار'}</p>
          
          {/* زر اختبار */}
          <button
            onClick={() => {
              console.log('اختبار من صفحة الغسيل...');
              navigate('/washing-completed');
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
          >
            🚀 اختبار - اذهب لصفحة اكتمال الغسيل
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <QrCode className="w-6 h-6 text-green-600 mr-2" />
                QR Code الخاص بك
              </h2>

              <div className="text-center mb-6">
                <div className="bg-gray-100 rounded-xl p-6 inline-block">
                  <QRCodeSVG
                    value={JSON.stringify(qrData)}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">الغسلات المتبقية:</span>
                  <span className="font-bold text-green-600 text-xl">{qrData.remainingWashes}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">حالة QR:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ساري المفعول
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">تاريخ الانتهاء:</span>
                  <span className="font-semibold">{new Date(qrData.expiryDate).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <UnifiedButton
                  variant="outline"
                  size="medium"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(qrData));
                    alert('تم نسخ بيانات QR');
                  }}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  نسخ بيانات QR
                </UnifiedButton>
                
                <UnifiedButton
                  variant="outline"
                  size="medium"
                  onClick={() => {
                    // محاكاة تحميل QR
                    const canvas = document.createElement('canvas');
                    const svg = document.querySelector('svg');
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const img = new Image();
                    img.onload = () => {
                      canvas.width = img.width;
                      canvas.height = img.height;
                      const ctx = canvas.getContext('2d');
                      ctx.drawImage(img, 0, 0);
                      const link = document.createElement('a');
                      link.download = 'qr-code.png';
                      link.href = canvas.toDataURL();
                      link.click();
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                  }}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  تحميل QR
                </UnifiedButton>
              </div>
            </div>
          </motion.div>

          {/* Wash Process Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Car className="w-6 h-6 text-blue-600 mr-2" />
                حالة الغسيل
              </h2>

              {/* Wash Status */}
              <div className="text-center mb-8">
                <div className={`text-3xl font-bold mb-2 ${getWashStatusColor()}`}>
                  {getWashStatusText()}
                </div>
                
                {washStatus === 'washing' && (
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${washProgress}%` }}
                    ></div>
                  </div>
                )}
                
                {washStatus === 'completed' && (
                  <div className="text-green-600 text-lg">
                    تم استخدام الغسلة رقم {qrData.totalWashes - qrData.remainingWashes + 1} من {qrData.totalWashes}
                  </div>
                )}
              </div>

              {/* Branch Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">معلومات الفرع</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">{selectedBranch.arabicAddress}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">{selectedBranch.workingHours}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-gray-700">{selectedBranch.rating} ({selectedBranch.reviews} تقييم)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {washStatus === 'ready' && (
                <UnifiedButton
                  variant="gradient"
                  size="large"
                  onClick={startWashing}
                  className="w-full"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  بدء الغسيل
                </UnifiedButton>
              )}

              {washStatus === 'washing' && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">جاري غسيل سيارتك...</p>
                </div>
              )}

              {washStatus === 'completed' && (
                <div className="space-y-3">
                  <UnifiedButton
                    variant="gradient"
                    size="large"
                    onClick={() => setShowRating(true)}
                    className="w-full"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    تقييم الفرع
                  </UnifiedButton>
                  
                  <UnifiedButton
                    variant="outline"
                    size="large"
                    onClick={() => navigate('/washing-completed')}
                    className="w-full"
                  >
                    إنهاء العملية
                  </UnifiedButton>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

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
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">تقييم الفرع</h3>
              
              {/* Branch Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">تقييم الفرع:</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setBranchRating(star)}
                      className={`text-2xl ${star <= branchRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Employee Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">تقييم الموظف (اختياري):</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setEmployeeRating(star)}
                      className={`text-2xl ${star <= employeeRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">تعليق (اختياري):</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="اكتب تعليقك هنا..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows="3"
                />
              </div>

              <div className="space-y-2">
                <UnifiedButton
                  variant="gradient"
                  size="medium"
                  onClick={handleRatingSubmit}
                  className="w-full"
                >
                  إرسال التقييم
                </UnifiedButton>
                
                <button
                  onClick={() => setShowRating(false)}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  تخطي التقييم
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tip Modal */}
      <AnimatePresence>
        {showTip && (
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
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">البقشيش</h3>
              
              <div className="text-center mb-6">
                <Gift className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">هل تريد ترك بقشيش للموظف؟</p>
              </div>

              {/* Tip Options */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {tipOptions.map((option) => (
                  <button
                    key={option.amount}
                    onClick={() => setTipAmount(option.amount)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      tipAmount === option.amount
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold text-lg">{option.amount} ريال</div>
                    <div className="text-sm text-gray-500">بقشيش</div>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">مبلغ مخصص:</label>
                <input
                  type="number"
                  value={tipAmount === 0 ? '' : tipAmount}
                  onChange={(e) => setTipAmount(parseInt(e.target.value) || 0)}
                  placeholder="أدخل المبلغ"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">طريقة الدفع:</label>
                <div className="space-y-2">
                  {['card', 'apple-pay'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedTipMethod(method)}
                      className={`w-full p-3 rounded-xl border-2 transition-all flex items-center ${
                        selectedTipMethod === method
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {method === 'card' ? 'بطاقة ائتمان' : 'Apple Pay'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <UnifiedButton
                  variant="gradient"
                  size="medium"
                  onClick={handleTipPayment}
                  className="w-full"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  دفع البقشيش
                </UnifiedButton>
                
                <button
                  onClick={() => navigate('/washing-completed')}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  تخطي البقشيش
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WashProcess; 