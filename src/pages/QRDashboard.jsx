import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQrcode, FaCar, FaCalendar, FaMapMarkerAlt, FaHistory, FaPrint, FaTrash, FaRedo } from 'react-icons/fa';

const QRDashboard = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState(null);

  useEffect(() => {
    loadQRCodes();
  }, []);

  const loadQRCodes = () => {
    setLoading(true);
    
    // محاكاة تحميل البيانات
    setTimeout(() => {
      const savedQR = localStorage.getItem('qrCodeData');
      const qrData = savedQR ? JSON.parse(savedQR) : null;
      
      if (qrData) {
        setQrCodes([qrData]);
      }
      
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      case 'used':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'expired':
        return 'منتهي الصلاحية';
      case 'used':
        return 'مستخدم';
      default:
        return 'غير محدد';
    }
  };

  const handlePrintQR = (qrCode) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>QR Code - ${qrCode.packageName}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .qr-container { border: 2px solid #2E7D32; padding: 20px; margin: 20px; border-radius: 10px; }
            .qr-code { font-size: 48px; margin: 20px; }
            .details { margin: 20px 0; }
            .detail-row { margin: 10px 0; }
            .title { font-size: 24px; font-weight: bold; color: #2E7D32; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div class="title">QR Code - ${qrCode.packageName}</div>
            <div class="qr-code">📱</div>
            <div class="details">
              <div class="detail-row">رقم العملية: ${qrCode.operationId}</div>
              <div class="detail-row">اسم العميل: ${qrCode.customerName}</div>
              <div class="detail-row">الباقة: ${qrCode.packageName}</div>
              <div class="detail-row">الغسلات المتبقية: ${qrCode.remainingWashes}</div>
              <div class="detail-row">تاريخ الانتهاء: ${formatDate(qrCode.expiryDate)}</div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDeleteQR = (qrCode) => {
    if (window.confirm('هل أنت متأكد من حذف هذا QR Code؟')) {
      localStorage.removeItem('qrCodeData');
      setQrCodes([]);
    }
  };

  const simulateUsage = (qrCode) => {
    const updatedQR = {
      ...qrCode,
      remainingWashes: Math.max(0, qrCode.remainingWashes - 1),
      usageHistory: [
        ...qrCode.usageHistory,
        {
          date: new Date().toISOString(),
          branch: 'فرع الرياض - شارع الملك فهد',
          washNumber: qrCode.totalWashes - qrCode.remainingWashes + 1
        }
      ]
    };

    if (updatedQR.remainingWashes === 0) {
      updatedQR.packageStatus = 'used';
    }

    localStorage.setItem('qrCodeData', JSON.stringify(updatedQR));
    setQrCodes([updatedQR]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل QR Codes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* العنوان */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            لوحة تحكم QR Codes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مراقبة وإدارة QR Codes الخاصة بك
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <FaQrcode className="w-8 h-8 text-green-500 ml-3" />
              <div>
                <p className="text-sm text-gray-600">إجمالي QR Codes</p>
                <p className="text-2xl font-bold text-gray-900">{qrCodes.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <FaCar className="w-8 h-8 text-blue-500 ml-3" />
              <div>
                <p className="text-sm text-gray-600">الغسلات المستخدمة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {qrCodes.reduce((total, qr) => total + (qr.totalWashes - qr.remainingWashes), 0)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <FaHistory className="w-8 h-8 text-purple-500 ml-3" />
              <div>
                <p className="text-sm text-gray-600">الغسلات المتبقية</p>
                <p className="text-2xl font-bold text-gray-900">
                  {qrCodes.reduce((total, qr) => total + qr.remainingWashes, 0)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <FaCalendar className="w-8 h-8 text-orange-500 ml-3" />
              <div>
                <p className="text-sm text-gray-600">QR Codes نشطة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {qrCodes.filter(qr => qr.packageStatus === 'active').length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* قائمة QR Codes */}
        {qrCodes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-12 text-center"
          >
            <FaQrcode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لا توجد QR Codes
            </h3>
            <p className="text-gray-600 mb-6">
              لم يتم إنشاء أي QR Codes بعد. اذهب إلى صفحة الباقات لإنشاء QR Code جديد.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              العودة للباقات
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {qrCodes.map((qrCode, index) => (
              <motion.div
                key={qrCode.operationId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* رأس البطاقة */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaQrcode className="w-8 h-8 ml-3" />
                      <div>
                        <h3 className="text-xl font-bold">{qrCode.packageName}</h3>
                        <p className="text-green-100">رقم العملية: {qrCode.operationId}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => handlePrintQR(qrCode)}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                        title="طباعة QR Code"
                      >
                        <FaPrint className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteQR(qrCode)}
                        className="bg-red-500/20 hover:bg-red-500/30 p-2 rounded-lg transition-colors"
                        title="حذف QR Code"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* محتوى البطاقة */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* تفاصيل الباقة */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الباقة</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">اسم العميل:</span>
                          <span className="font-medium">{qrCode.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">نوع الباقة:</span>
                          <span className="font-medium">{qrCode.packageName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الغسلات المتبقية:</span>
                          <span className="font-medium text-green-600">{qrCode.remainingWashes} / {qrCode.totalWashes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحالة:</span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(qrCode.packageStatus)}`}>
                            {getStatusText(qrCode.packageStatus)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">تاريخ الانتهاء:</span>
                          <span className="font-medium">{formatDate(qrCode.expiryDate)}</span>
                        </div>
                      </div>
                    </div>

                    {/* محاكاة الاستخدام */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">محاكاة الاستخدام</h4>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-3">
                            اضغط على الزر أدناه لمحاكاة استخدام غسلة واحدة
                          </p>
                          <button
                            onClick={() => simulateUsage(qrCode)}
                            disabled={qrCode.remainingWashes === 0 || qrCode.packageStatus === 'expired'}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            استخدام غسلة واحدة
                          </button>
                        </div>

                        {qrCode.usageHistory && qrCode.usageHistory.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">سجل الاستخدام:</h5>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {qrCode.usageHistory.map((usage, idx) => (
                                <div key={idx} className="text-sm text-gray-600 bg-white p-2 rounded border">
                                  <div className="flex items-center">
                                    <FaMapMarkerAlt className="w-4 h-4 text-green-500 ml-2" />
                                    <span>{usage.branch}</span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    غسلة رقم {usage.washNumber} - {formatDate(usage.date)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* زر تحديث */}
        <div className="text-center mt-8">
          <button
            onClick={loadQRCodes}
            className="flex items-center mx-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaRedo className="w-5 h-5 ml-2" />
            تحديث البيانات
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRDashboard; 