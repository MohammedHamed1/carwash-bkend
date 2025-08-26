import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  Clock, 
  Car, 
  Package, 
  User, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Share2,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const AdvancedQRSystem = () => {
  const navigate = useNavigate();
  const [qrData, setQrData] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [isLowDays, setIsLowDays] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Get package details from localStorage
  const packageDetails = JSON.parse(localStorage.getItem('packageDetails') || '{}');
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');

  useEffect(() => {
    generateQRData();
  }, []);

  const generateQRData = () => {
    const now = new Date();
    const expiryDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
    
    const qrDataObject = {
      operationId: `O${Math.random().toString().substr(2, 8)}`,
      packageType: packageDetails.type || 'basic',
      packageName: packageDetails.name || 'الباقة الأساسية',
      carType: orderDetails.carType || 'متوسط',
      customerName: orderDetails.customerName || 'العميل',
      customerPhone: orderDetails.customerPhone || '',
      remainingWashes: packageDetails.washes || 1,
      totalWashes: packageDetails.washes || 1,
      price: packageDetails.price || 0,
      branchName: orderDetails.branchName || 'الفرع الرئيسي',
      branchId: orderDetails.branchId || 'BR001',
      startDate: now.toISOString(),
      expiryDate: expiryDate.toISOString(),
      packageStatus: 'active',
      lastUsed: null,
      usageHistory: []
    };

    setQrData(qrDataObject);
    calculateDaysRemaining(expiryDate);
    
    // Save to localStorage
    localStorage.setItem('qrCodeData', JSON.stringify(qrDataObject));
  };

  const calculateDaysRemaining = (expiryDate) => {
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setDaysRemaining(diffDays);
    setIsExpired(diffDays <= 0);
    setIsLowDays(diffDays <= 7 && diffDays > 0);
  };

  const useWash = () => {
    if (!qrData || qrData.remainingWashes <= 0 || isExpired) return;

    const updatedQRData = {
      ...qrData,
      remainingWashes: qrData.remainingWashes - 1,
      lastUsed: new Date().toISOString(),
      usageHistory: [
        ...qrData.usageHistory,
        {
          date: new Date().toISOString(),
          branchName: qrData.branchName,
          washNumber: qrData.totalWashes - qrData.remainingWashes + 1
        }
      ]
    };

    setQrData(updatedQRData);
    localStorage.setItem('qrCodeData', JSON.stringify(updatedQRData));
  };

  const getPackageTypeColor = (type) => {
    switch (type) {
      case 'basic': return 'from-blue-500 to-blue-600';
      case 'advanced': return 'from-green-500 to-green-600';
      case 'premium': return 'from-purple-500 to-purple-600';
      case 'vip': return 'from-yellow-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPackageTypeText = (type) => {
    switch (type) {
      case 'basic': return 'الباقة الأساسية';
      case 'advanced': return 'الباقة المتقدمة';
      case 'premium': return 'الباقة الشاملة';
      case 'vip': return 'باقة VIP';
      default: return 'الباقة الأساسية';
    }
  };

  const getCarTypeText = (type) => {
    switch (type) {
      case 'small': return 'صغيرة';
      case 'medium': return 'متوسطة';
      case 'large': return 'كبيرة';
      default: return 'متوسطة';
    }
  };

  const downloadQR = () => {
    const svg = document.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = `qr-code-${qrData.operationId}.png`;
        link.href = canvas.toDataURL();
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  const copyQRData = () => {
    navigator.clipboard.writeText(JSON.stringify(qrData, null, 2));
    alert('تم نسخ بيانات QR كود');
  };

  const shareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: 'QR كود غسيل السيارات',
        text: `QR كود ${qrData.packageName} - ${qrData.customerName}`,
        url: window.location.href
      });
    } else {
      copyQRData();
    }
  };

  if (!qrData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري إنشاء QR كود...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">QR كود متقدم</h1>
          <p className="text-gray-600">نظام تتبع الباقات والغسلات</p>
        </motion.div>

        {/* Operation ID */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">رقم العملية</h3>
            <div className="text-2xl font-bold text-green-600 font-mono">
              {qrData.operationId}
            </div>
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">QR كود الباقة</h3>
            
            <div className="relative inline-block">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${getPackageTypeColor(qrData.packageType)}`}>
                <QRCodeSVG 
                  value={JSON.stringify(qrData)}
                  size={200}
                  level="H"
                  includeMargin={true}
                  bgColor="transparent"
                  fgColor="white"
                />
              </div>
              
              {/* Status Overlay */}
              <div className="absolute top-2 right-2">
                {isExpired ? (
                  <XCircle className="w-8 h-8 text-red-500 bg-white rounded-full" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-500 bg-white rounded-full" />
                )}
              </div>
            </div>

            {/* QR Actions */}
            <div className="flex justify-center space-x-3 space-x-reverse mt-4">
              <button
                onClick={downloadQR}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                title="تحميل QR كود"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={copyQRData}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                title="نسخ البيانات"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={shareQR}
                className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                title="مشاركة"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Package Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">حالة الباقة</h3>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-3">
            {/* Package Type */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">نوع الباقة:</span>
              <div className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getPackageTypeColor(qrData.packageType)}`}>
                {getPackageTypeText(qrData.packageType)}
              </div>
            </div>

            {/* Car Type */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">نوع السيارة:</span>
              <div className="flex items-center">
                <Car className="w-4 h-4 text-green-600 mr-1" />
                <span className="font-medium">{getCarTypeText(qrData.carType)}</span>
              </div>
            </div>

            {/* Remaining Washes */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">الغسلات المتبقية:</span>
              <span className={`font-bold ${qrData.remainingWashes > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {qrData.remainingWashes} من {qrData.totalWashes}
              </span>
            </div>

            {/* Days Remaining */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">الأيام المتبقية:</span>
              <div className="flex items-center">
                <Clock className={`w-4 h-4 mr-1 ${isLowDays ? 'text-red-500' : 'text-green-600'}`} />
                <span className={`font-bold ${isExpired ? 'text-red-600' : isLowDays ? 'text-red-500' : 'text-green-600'}`}>
                  {isExpired ? 'منتهية' : `${daysRemaining} يوم`}
                </span>
              </div>
            </div>

            {/* Warning for Low Days */}
            {isLowDays && (
              <div className="flex items-center p-3 bg-red-50 rounded-xl border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 text-sm">تحذير: أقل من 7 أيام متبقية!</span>
              </div>
            )}

            {/* Expired Warning */}
            {isExpired && (
              <div className="flex items-center p-3 bg-red-50 rounded-xl border border-red-200">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 text-sm">الباقة منتهية الصلاحية!</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Customer Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">معلومات العميل</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">الاسم:</span>
              <div className="flex items-center">
                <User className="w-4 h-4 text-green-600 mr-1" />
                <span className="font-medium">{qrData.customerName}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">الهاتف:</span>
              <span className="font-medium">{qrData.customerPhone}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">الفرع:</span>
              <span className="font-medium">{qrData.branchName}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">السعر:</span>
              <span className="font-bold text-green-600">{qrData.price} ريال</span>
            </div>
          </div>
        </motion.div>

        {/* Usage History */}
        {showDetails && qrData.usageHistory.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">سجل الاستخدام</h3>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {qrData.usageHistory.map((usage, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">غسلة #{usage.washNumber}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(usage.date).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={useWash}
            disabled={qrData.remainingWashes <= 0 || isExpired}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center ${
              qrData.remainingWashes <= 0 || isExpired
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
            }`}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            استخدام غسلة ({qrData.remainingWashes} متبقية)
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium"
          >
            العودة للرئيسية
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedQRSystem; 