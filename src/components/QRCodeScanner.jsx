import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  Car,
  Package,
  User,
  Calendar,
  RefreshCw,
  Download,
  Share2,
  Copy,
  Eye,
  EyeOff,
  Zap,
  Crown
} from 'lucide-react';
import { 
  validateQRCode, 
  useWash, 
  getPackageColor, 
  getPackageName, 
  getCarTypeName,
  getPackageStatus,
  downloadQRCode,
  copyQRData,
  shareQRCode
} from '../utils/qrSystem';
import QRBranchSelector from './QRBranchSelector';

const QRCodeScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [packageStatus, setPackageStatus] = useState(null);

  useEffect(() => {
    startScanner();
    return () => stopScanner();
  }, []);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setError(null);
      }
    } catch (err) {
      setError('لا يمكن الوصول للكاميرا');
      console.error('Camera error:', err);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  const processQRCode = (qrText) => {
    try {
      const data = JSON.parse(qrText);
      
      // استخدام النظام المركزي للتحقق
      const validation = validateQRCode(data);
      
      if (!validation.isValid) {
        setError(validation.error);
        return;
      }

      // الحصول على حالة الباقة
      const status = getPackageStatus(data);
      setPackageStatus(status);

      const processedData = {
        ...data,
        isExpired: validation.isExpired,
        daysRemaining: validation.daysRemaining,
        hasWashes: validation.hasWashes,
        scannedAt: new Date().toISOString()
      };

      setScannedData(processedData);
      stopScanner();

      // إشعار التنقل التلقائي
      alert('✅ تم مسح QR Code بنجاح! سيتم توجيهك لصفحة التتبع خلال ثانيتين...');

      // التنقل التلقائي لصفحة التتبع بعد 2 ثانية
      setTimeout(() => {
        navigate(`/tracking/${data.operationId}`);
      }, 2000);

    } catch (err) {
      setError('QR كود غير صالح');
      console.error('QR processing error:', err);
    }
  };

  const simulateQRScan = () => {
    // بيانات تجريبية متوافقة مع النظام المركزي
    const mockQRData = {
      operationId: 'O12345678',
      packageType: 'premium',
      packageName: 'الباقة الشاملة',
      carType: 'medium',
      customerName: 'أحمد محمد',
      customerPhone: '+966501234567',
      customerEmail: 'ahmed@example.com',
      remainingWashes: 3,
      totalWashes: 18,
      price: 490,
      originalPrice: 770,
      savings: 280,
      branchName: 'فرع الرياض - الشمال',
      branchId: 'BR001',
      branchAddress: 'شارع الملك فهد، الرياض',
      branchPhone: '+966112345678',
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      packageStatus: 'active',
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      usageHistory: [
        {
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          branchName: 'فرع الرياض - الشمال',
          washNumber: 1,
          action: 'wash_used'
        },
        {
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          branchName: 'فرع الرياض - الشمال',
          washNumber: 2,
          action: 'wash_used'
        }
      ],
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      version: '1.0'
    };

    processQRCode(JSON.stringify(mockQRData));
  };

  const handleUseWash = async () => {
    if (!scannedData || !scannedData.hasWashes || scannedData.isExpired) return;

    setIsProcessing(true);

    try {
      // استخدام النظام المركزي
      const result = useWash(scannedData, scannedData.branchName);
      
      if (result.success) {
        setScannedData(result.data);
        setPackageStatus(getPackageStatus(result.data));
        alert('تم استخدام الغسلة بنجاح!');
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert('حدث خطأ أثناء استخدام الغسلة');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadQR = () => {
    if (scannedData) {
      downloadQRCode(scannedData);
    }
  };

  const handleCopyQR = async () => {
    if (scannedData) {
      const result = await copyQRData(scannedData);
      if (result.success) {
        alert('تم نسخ بيانات QR كود');
      } else {
        alert('فشل في نسخ البيانات');
      }
    }
  };

  const handleShareQR = () => {
    if (scannedData) {
      shareQRCode(scannedData);
    }
  };

  const handleNavigateToTracking = (operationId) => {
    navigate(`/tracking/${operationId}`);
  };

  const handleQRClick = () => {
    if (scannedData) {
      navigate(`/tracking/${scannedData.operationId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ماسح QR كود</h1>
          <p className="text-gray-600">امسح QR كود الباقة للتحقق والاستخدام</p>
        </motion.div>

        {/* Scanner */}
        {!scannedData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <div className="text-center mb-4">
              <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-800">كاميرا المسح</h3>
            </div>

            {isScanning ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-gray-900 rounded-xl"
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-green-500 rounded-lg relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">جاري تحضير الكاميرا...</p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Test Button */}
            <button
              onClick={simulateQRScan}
              className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium"
            >
              <Zap className="w-4 h-4 inline mr-2" />
              اختبار المسح (بيانات تجريبية)
            </button>
          </motion.div>
        )}

        {/* Scanned Data */}
        {scannedData && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* QR Branch Selector */}
              <QRBranchSelector 
                qrData={scannedData}
                onUpdate={(updatedData) => {
                  setScannedData(updatedData);
                  setPackageStatus(getPackageStatus(updatedData));
                }}
                onNavigateToTracking={handleNavigateToTracking}
              />

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">إجراءات سريعة</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleQRClick}
                    className="py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    عرض التفاصيل
                  </button>
                  
                  <button
                    onClick={handleDownloadQR}
                    className="py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    تحميل QR
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button
                    onClick={handleCopyQR}
                    className="py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    نسخ البيانات
                  </button>
                  
                  <button
                    onClick={handleShareQR}
                    className="py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    مشاركة
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    setScannedData(null);
                    setError(null);
                    setPackageStatus(null);
                    startScanner();
                  }}
                  className="w-full mt-3 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  مسح QR كود آخر
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default QRCodeScanner; 