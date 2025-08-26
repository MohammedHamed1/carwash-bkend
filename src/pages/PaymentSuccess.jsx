import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  QrCode, 
  Download, 
  Copy, 
  Share2, 
  ArrowRight,
  Receipt,
  Package,
  User,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Smartphone,
  Shield,
  Hash,
  Crown,
  Star,
  Gift
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  getPackageColor, 
  getPackageName, 
  getCarTypeName,
  downloadQRCode,
  copyQRData,
  shareQRCode
} from '../utils/qrSystem';
import UnifiedButton from '../components/common/UnifiedButton';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [showQRDetails, setShowQRDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get order details from localStorage
    const storedOrder = localStorage.getItem('orderDetails');
    const storedPackage = localStorage.getItem('packageDetails');
    const storedQR = localStorage.getItem('qrCodeData');
    
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    }
    
    if (storedPackage) {
      setPackageDetails(JSON.parse(storedPackage));
    }

    if (storedQR) {
      setQrData(JSON.parse(storedQR));
    } else {
      // منع التكرار - إذا لم توجد بيانات QR، انتقل للصفحة الرئيسية
      console.warn('No QR data found, redirecting to home');
      navigate('/');
    }
  }, [navigate]);

  const handleCopyQR = async () => {
    if (qrData) {
      const result = await copyQRData(qrData);
      if (result.success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleDownloadQR = () => {
    if (qrData) {
      downloadQRCode(qrData);
    }
  };

  const handleShareQR = () => {
    if (qrData) {
      shareQRCode(qrData);
    }
  };

  if (!orderDetails || !packageDetails || !qrData) {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">تم الدفع بنجاح!</h1>
          <p className="text-gray-600">تم إنشاء QR Code الخاص بك بنجاح</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">QR Code الخاص بك</h2>
              
              <div className="text-center mb-6">
                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${getPackageColor(qrData.packageType)}`}>
                  <QRCodeSVG 
                    value={JSON.stringify(qrData)}
                    size={200}
                    level="H"
                    includeMargin={true}
                    bgColor="transparent"
                    fgColor="white"
                  />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">رقم العملية:</span>
                  <span className="font-mono font-bold text-green-600">{qrData.operationId}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">نوع الباقة:</span>
                  <div className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getPackageColor(qrData.packageType)}`}>
                    {getPackageName(qrData.packageType)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">الغسلات المتبقية:</span>
                  <span className="font-bold text-green-600">{qrData.remainingWashes} من {qrData.totalWashes}</span>
                </div>
              </div>

              {/* QR Code Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleDownloadQR}
                  className="py-3 px-4 bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  تحميل
                </button>
                
                <button
                  onClick={handleCopyQR}
                  className={`py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-colors ${
                    copied ? 'bg-green-500 text-white' : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'تم النسخ' : 'نسخ'}
                </button>
                
                <button
                  onClick={handleShareQR}
                  className="py-3 px-4 bg-green-500 text-white rounded-xl font-medium flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  مشاركة
                </button>
              </div>
            </div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Customer Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 text-green-600 mr-2" />
                معلومات العميل
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الاسم:</span>
                  <span className="font-semibold">{qrData.customerName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رقم الهاتف:</span>
                  <span className="font-semibold">{qrData.customerPhone}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">نوع السيارة:</span>
                  <span className="font-semibold">{getCarTypeName(qrData.carType)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الفرع:</span>
                  <span className="font-semibold">{qrData.branchName}</span>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Package className="w-5 h-5 text-blue-600 mr-2" />
                تفاصيل الباقة
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">اسم الباقة:</span>
                  <span className="font-semibold">{qrData.packageName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر:</span>
                  <span className="font-bold text-green-600">{qrData.price} ريال</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تاريخ البداية:</span>
                  <span className="font-semibold">{new Date(qrData.startDate).toLocaleDateString('ar-SA')}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تاريخ الانتهاء:</span>
                  <span className="font-semibold">{new Date(qrData.expiryDate).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
                معلومات الدفع
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رقم الطلب:</span>
                  <span className="font-mono font-bold text-purple-600">{orderDetails.orderId || qrData.operationId}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تاريخ الدفع:</span>
                  <span className="font-semibold">{new Date().toLocaleDateString('ar-SA')}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المبلغ المدفوع:</span>
                  <span className="font-bold text-green-600">{qrData.price} ريال</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">حالة الدفع:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">مكتمل</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <UnifiedButton
                onClick={() => navigate('/qr-dashboard')}
                className="w-full py-4 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <QrCode className="w-5 h-5 mr-2" />
                عرض لوحة التحكم
                <ArrowRight className="w-5 h-5 ml-2" />
              </UnifiedButton>
              
              <UnifiedButton
                onClick={() => navigate('/branches')}
                className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MapPin className="w-5 h-5 mr-2" />
                اختيار فرع للغسيل
                <ArrowRight className="w-5 h-5 ml-2" />
              </UnifiedButton>
              
              <UnifiedButton
                onClick={() => navigate('/')}
                className="w-full py-4 text-lg font-bold bg-gray-500 hover:bg-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                العودة للصفحة الرئيسية
              </UnifiedButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 