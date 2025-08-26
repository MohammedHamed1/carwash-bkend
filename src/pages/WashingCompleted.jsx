import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections, FaArrowRight, FaGift } from 'react-icons/fa';
import { 
  CheckCircle, 
  Car, 
  Clock, 
  Star, 
  ArrowRight, 
  Home, 
  Receipt,
  Heart,
  CreditCard,
  Apple,
  Gift,
  ThumbsUp,
  MessageCircle,
  History,
  BarChart
} from 'lucide-react';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';

const WashingCompleted = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [branchRating, setBranchRating] = useState(0);
  const [showRating, setShowRating] = useState(true);
  const [showMotivation, setShowMotivation] = useState(false);
  const [selectedMotivation, setSelectedMotivation] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [motivationAmount, setMotivationAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [motivationMessage, setMotivationMessage] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    // Get order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');
    const packageDetails = JSON.parse(localStorage.getItem('packageDetails') || '{}');
    const qrCodeData = JSON.parse(localStorage.getItem('qrCodeData') || '{}');
    const selectedBranch = JSON.parse(localStorage.getItem('selectedBranch') || '{}');

    // Use QR code data if available, otherwise fall back to order details
    const customerInfoData = {
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
    
    setCustomerInfo(customerInfoData);
    
    if (orderDetails) {
      setOrderDetails(orderDetails);
    }
    
    if (packageDetails) {
      setPackageDetails(packageDetails);
    }
  }, []);

  const handleRatingSubmit = () => {
    // Save branch rating
    const ratingData = {
      branchId: qrCodeData.branchId || selectedBranch.id,
      branchName: customerInfo.branchName,
      branchAddress: customerInfo.branchAddress,
      branchPhone: customerInfo.branchPhone,
      rating: branchRating,
      date: new Date().toISOString(),
      operationId: customerInfo.operationId,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      packageName: customerInfo.packageName,
      carType: customerInfo.carType
    };
    
    localStorage.setItem('branchRating', JSON.stringify(ratingData));
    setShowRating(false);
    setShowMotivation(true);
  };

  const handleMotivationSubmit = () => {
    if (!selectedMotivation && !customAmount) return;

    const motivationData = {
      amount: selectedMotivation || parseInt(customAmount),
      paymentMethod: selectedPaymentMethod,
      message: motivationMessage,
      date: new Date().toISOString(),
      operationId: customerInfo.operationId,
      branchId: qrCodeData.branchId || selectedBranch.id,
      branchName: customerInfo.branchName,
      branchAddress: customerInfo.branchAddress,
      branchPhone: customerInfo.branchPhone,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      packageName: customerInfo.packageName,
      carType: customerInfo.carType
    };

    localStorage.setItem('motivationData', JSON.stringify(motivationData));
    
    // Show success message
    alert('تم إرسال المكافأة بنجاح! شكراً لك');
    
    // Navigate to home
    navigate('/');
  };

  const handleSkipMotivation = () => {
    navigate('/');
  };

  const handleViewReceipt = () => {
    // يمكن إضافة منطق عرض الإيصال هنا
    alert('سيتم إرسال الإيصال إلى بريدك الإلكتروني');
  };

  const handleNewOrder = () => {
    navigate('/packages');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const motivationOptions = [
    { amount: 5, label: '5 ريال', icon: '💚' },
    { amount: 10, label: '10 ريال', icon: '💙' },
    { amount: 15, label: '15 ريال', icon: '💜' },
    { amount: 20, label: '20 ريال', icon: '🧡' },
    { amount: 25, label: '25 ريال', icon: '💛' },
    { amount: 30, label: '30 ريال', icon: '❤️' }
  ];

  const paymentMethods = [
    { id: 'apple', name: 'Apple Pay', icon: () => <img src="/src/assets/apple-pay.png" alt="Apple Pay" className="w-6 h-6" />, color: 'from-green-500 to-emerald-600' },
    { id: 'credit', name: 'بطاقة ائتمان', icon: CreditCard, color: 'from-green-500 to-green-600' }
  ];

  if (!customerInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

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
              onClick={() => navigate('/tracking')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <History className="w-4 h-4" />
              <span>تتبع الاستخدام</span>
              <BarChart className="w-4 h-4" />
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

        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">تم إكمال الغسيل!</h1>
          <p className="text-gray-600">سيارتك جاهزة للاستلام</p>
        </motion.div>

        {/* Completion Time */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 mb-6 text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-semibold">وقت الإكمال:</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            {formatTime(new Date())}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-green-700 mb-4 text-center">ملخص الطلب</h3>
          
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
              <div className="flex items-center">
                <Car className="w-4 h-4 text-green-600 mr-1" />
                <span className="font-medium">{customerInfo.carType}</span>
              </div>
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
              <span className="font-mono font-medium">{customerInfo.operationId}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">السعر:</span>
              <span className="font-bold text-green-600">{customerInfo.price} ريال</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">الغسلات المتبقية:</span>
              <span className="font-bold text-blue-600">{customerInfo.remainingWashes} من {customerInfo.totalWashes}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">تاريخ الانتهاء:</span>
              <span className="font-medium">{new Date(customerInfo.expiryDate).toLocaleDateString('ar-SA')}</span>
            </div>
          </div>
        </motion.div>

        {/* Branch Rating */}
        <AnimatePresence>
          {showRating && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">تقييم الفرع</h3>
              
              <div className="text-center mb-4">
                <p className="text-gray-600 mb-3">كيف كانت تجربتك في {customerInfo.branchName}؟</p>
                
                <div className="flex justify-center space-x-2 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setBranchRating(star)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                        star <= branchRating
                          ? 'bg-green-500 text-white scale-110'
                          : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                      }`}
                    >
                      <Star className="w-6 h-6" fill={star <= branchRating ? 'white' : 'none'} />
                    </button>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                  {branchRating === 1 && 'سيء جداً'}
                  {branchRating === 2 && 'سيء'}
                  {branchRating === 3 && 'متوسط'}
                  {branchRating === 4 && 'جيد'}
                  {branchRating === 5 && 'ممتاز'}
                </p>
              </div>
              
              <button
                onClick={handleRatingSubmit}
                disabled={branchRating === 0}
                className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center ${
                  branchRating === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                إرسال التقييم
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Employee Motivation */}
        <AnimatePresence>
          {showMotivation && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">مكافأة رمزية للموظف</h3>
              
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-red-500 mr-2" />
                  <p className="text-gray-600">أضف مكافأة رمزية للموظف</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {motivationOptions.map((option) => (
                    <button
                      key={option.amount}
                      onClick={() => {
                        setSelectedMotivation(option.amount);
                        setCustomAmount('');
                      }}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedMotivation === option.amount
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
                
                <div className="mb-4">
                  <input
                    type="number"
                    placeholder="مبلغ مخصص"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedMotivation(null);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-xl text-center"
                    min="1"
                    max="100"
                  />
                </div>
                
                <div className="mb-4">
                  <textarea
                    placeholder="رسالة للموظف (اختياري)"
                    value={motivationMessage}
                    onChange={(e) => setMotivationMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl resize-none"
                    rows="3"
                  />
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">طريقة الدفع:</h4>
                  <div className="flex space-x-2 space-x-reverse">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPaymentMethod === method.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {method.id === 'apple' ? (
                          <div className="w-8 h-8 apple-pay-container mx-auto mb-2 flex items-center justify-center">
                            <img src="/src/assets/apple-pay.png" alt="Apple Pay" className="w-5 h-5 apple-pay-icon" />
                          </div>
                        ) : (
                          <method.icon className="w-5 h-5 mx-auto mb-1" />
                        )}
                        <span className="text-sm font-medium">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 space-x-reverse">
                <UnifiedButton
                  variant="gradient"
                  size="medium"
                  onClick={handleMotivationSubmit}
                  disabled={!selectedMotivation && !customAmount}
                  className="flex-1"
                  icon={<Gift className="w-4 h-4" />}
                >
                  إرسال المكافأة
                </UnifiedButton>
                
                <UnifiedButton
                  variant="secondary"
                  size="medium"
                  onClick={handleSkipMotivation}
                  className="flex-1"
                >
                  تخطي
                </UnifiedButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <UnifiedButton
            variant="primary"
            size="medium"
            onClick={handleViewReceipt}
            className="w-full"
            icon={<Receipt className="w-4 h-4" />}
          >
            عرض الإيصال
          </UnifiedButton>
          
          <UnifiedButton
            variant="secondary"
            size="medium"
            onClick={handleNewOrder}
            className="w-full"
            icon={<Car className="w-4 h-4" />}
          >
            طلب جديد
          </UnifiedButton>
          
          <UnifiedButton
            variant="secondary"
            size="medium"
            onClick={() => navigate('/tip-system')}
            className="w-full"
            icon={<Gift className="w-4 h-4" />}
          >
            مكافأة الموظف
          </UnifiedButton>
          
          <UnifiedButton
            variant="secondary"
            size="medium"
            onClick={() => navigate('/')}
            className="w-full"
            icon={<Home className="w-4 h-4" />}
          >
            العودة للرئيسية
          </UnifiedButton>
        </motion.div>

        {/* Thank You Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-sm">
            شكراً لاختيارك خدماتنا! نتمنى أن تكون تجربتك ممتعة
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WashingCompleted; 