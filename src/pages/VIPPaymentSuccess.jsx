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
  Star
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { generateVIPQRCode, downloadQRCode, copyQRData, shareQRCode } from '../utils/qrSystem';

const VIPPaymentSuccess = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [showQRDetails, setShowQRDetails] = useState(false);

  useEffect(() => {
    // قراءة بيانات VIP من localStorage بالشكل الصحيح
    const storedVipOrder = localStorage.getItem('vipOrderDetails');
    const storedVipPackage = localStorage.getItem('vipPackageDetails');
    const storedHotel = localStorage.getItem('selectedHotel');
    
    if (storedVipOrder) {
      setOrderDetails(JSON.parse(storedVipOrder));
    }
    
    if (storedVipPackage) {
      setPackageDetails(JSON.parse(storedVipPackage));
    }

    if (storedHotel) {
      setHotelDetails(JSON.parse(storedHotel));
    }

    // إنشاء QR Code باستخدام النظام المركزي
    generateVIPQRCodeData();
  }, []);

  const generateVIPQRCodeData = () => {
    if (!orderDetails || !packageDetails || !hotelDetails) {
      console.error('Missing required data for VIP QR code generation');
      return;
    }

    // استخدام النظام المركزي لإنشاء QR Code VIP
    const vipQRData = generateVIPQRCode(packageDetails, orderDetails, hotelDetails);
    setQrData(vipQRData);
  };

  const handleDownloadQR = () => {
    if (qrData) {
      downloadQRCode(qrData, `vip-qr-${qrData.operationId}.png`);
    }
  };

  const handleCopyQR = async () => {
    if (qrData) {
      const result = await copyQRData(qrData);
      if (result.success) {
        alert('تم نسخ بيانات QR Code بنجاح');
      } else {
        alert('فشل في نسخ البيانات');
      }
    }
  };

  const handleShareQR = async () => {
    if (qrData) {
      try {
        await shareQRCode(qrData);
      } catch (error) {
        console.error('Error sharing QR code:', error);
        // Fallback to copy
        handleCopyQR();
      }
    }
  };

  const handleViewReceipt = () => {
    // يمكن إضافة منطق عرض الإيصال هنا
    console.log('View receipt for VIP order:', qrData?.operationId);
  };

  const handleNewOrder = () => {
    // مسح بيانات VIP من localStorage
    localStorage.removeItem('vipOrderDetails');
    localStorage.removeItem('vipPackageDetails');
    localStorage.removeItem('selectedHotel');
    localStorage.removeItem('vipCheckoutData');
    navigate('/packages');
  };

  if (!qrData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري إنشاء QR Code VIP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* رسالة النجاح */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">تم الدفع بنجاح!</h1>
          <p className="text-xl text-gray-600 mb-8">تم إنشاء QR Code VIP الخاص بك</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-yellow-200 p-8"
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-800">QR Code VIP</h2>
                <Crown className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-gray-600">استخدم هذا الكود في الفندق المحدد</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 mb-6">
              <QRCodeSVG
                value={JSON.stringify(qrData)}
                size={200}
                level="H"
                className="mx-auto"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadQR}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                تحميل QR Code
              </button>
              
              <button
                onClick={handleCopyQR}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                نسخ البيانات
              </button>
              
              <button
                onClick={handleShareQR}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                مشاركة QR Code
              </button>
            </div>
          </motion.div>

          {/* تفاصيل الطلب VIP */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* تفاصيل الباقة VIP */}
            <div className="bg-white rounded-3xl shadow-xl border border-yellow-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">تفاصيل الباقة VIP</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">نوع الباقة:</span>
                  <span className="font-bold text-gray-800">{qrData.packageName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">عدد الغسلات:</span>
                  <span className="font-bold text-gray-800">{qrData.totalWashes} غسلة VIP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر:</span>
                  <span className="font-bold text-gray-800">{qrData.price} ريال</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رقم العملية:</span>
                  <span className="font-bold text-gray-800 text-sm">{qrData.operationId}</span>
                </div>
              </div>
            </div>

            {/* تفاصيل العميل */}
            <div className="bg-white rounded-3xl shadow-xl border border-yellow-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">بيانات العميل</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الاسم:</span>
                  <span className="font-bold text-gray-800">{qrData.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رقم الهاتف:</span>
                  <span className="font-bold text-gray-800">{qrData.customerPhone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">نوع السيارة:</span>
                  <span className="font-bold text-gray-800">{qrData.carType}</span>
                </div>
              </div>
            </div>

            {/* تفاصيل الفندق */}
            <div className="bg-white rounded-3xl shadow-xl border border-yellow-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">تفاصيل الفندق</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">اسم الفندق:</span>
                  <span className="font-bold text-gray-800">{qrData.hotelName}</span>
                </div>
                {qrData.roomNumber && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">رقم الغرفة:</span>
                    <span className="font-bold text-gray-800">{qrData.roomNumber}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الحالة:</span>
                  <span className="font-bold text-green-600">VIP نشط</span>
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-3xl border border-yellow-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-800">معلومات مهمة</h3>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  صالح في الفنادق المحددة فقط
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  خدمة VIP متميزة مع التلميع الاحترافي
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  صالح لمدة 30 يوم من تاريخ الشراء
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  يمكن استخدامه مرة واحدة فقط
                </li>
              </ul>
            </div>

            {/* أزرار إضافية */}
            <div className="space-y-3">
              <button
                onClick={handleViewReceipt}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                عرض الإيصال
              </button>
              
              <button
                onClick={handleNewOrder}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                طلب جديد
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VIPPaymentSuccess; 