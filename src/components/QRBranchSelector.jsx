import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Car, 
  User, 
  Package, 
  Calendar,
  RefreshCw,
  Crown
} from "lucide-react";
import { useWash, getPackageStatus } from "../utils/qrSystem";

const QRBranchSelector = ({ qrData, onUpdate, onNavigateToTracking }) => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [packageData, setPackageData] = useState(qrData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [packageStatus, setPackageStatus] = useState(null);

  useEffect(() => {
    if (qrData) {
      setPackageData(qrData);
      const status = getPackageStatus(qrData);
      setPackageStatus(status);
    }
  }, [qrData]);

  // تحقق من تاريخ الصلاحية
  const isValid = () => {
    return new Date(packageData.expiryDate) >= new Date();
  };

  // عند اختيار فرع
  const handleBranchChange = async (e) => {
    const branch = e.target.value;
    if (!branch) return;

    setIsProcessing(true);

    try {
      // استخدام النظام المركزي للخصم
      const result = useWash(packageData, branch);
      
      if (result.success) {
        const updatedData = result.data;
        
        // حفظ التحديث في localStorage
        localStorage.setItem('qrCodeData', JSON.stringify(updatedData));
        localStorage.setItem('scannedQRData', JSON.stringify(updatedData));

        setPackageData(updatedData);
        setSelectedBranch("");
        
        // تحديث حالة الباقة
        const newStatus = getPackageStatus(updatedData);
        setPackageStatus(newStatus);

        // إشعار النجاح
        alert(`✅ تم خصم غسلة في ${branch} بنجاح!`);

        // استدعاء callback للتحديث
        if (onUpdate) onUpdate(updatedData);
      } else {
        alert(`❌ ${result.error}`);
      }
    } catch (error) {
      console.error('Error processing wash:', error);
      alert("❌ حدث خطأ أثناء معالجة الغسلة");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewTracking = () => {
    if (onNavigateToTracking) {
      onNavigateToTracking(packageData.operationId);
    }
  };

  if (!packageData) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-2xl shadow-xl max-w-md mx-auto border border-gray-100"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {packageData.isVIP ? 'بيانات الباقة VIP' : 'بيانات الباقة'}
        </h2>
        <div className="flex items-center justify-center gap-2">
          {packageStatus?.status === 'active' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-500" />
          )}
          <span className={`text-sm font-medium ${
            packageStatus?.status === 'active' ? 'text-green-600' : 'text-red-600'
          }`}>
            {packageStatus?.message || 'حالة الباقة'}
          </span>
        </div>
      </div>

      {/* Package Data */}
      <div className="space-y-3 text-sm mb-6">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">العميل:</span>
          </div>
          <span className="font-bold text-gray-800">{packageData.customerName}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">نوع السيارة:</span>
          </div>
          <span className="font-bold text-gray-800">{packageData.carType}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">نوع الباقة:</span>
          </div>
          <span className="font-bold text-gray-800">{packageData.packageName}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">الغسلات:</span>
          </div>
          <span className="font-bold text-gray-800">
            {packageData.remainingWashes} / {packageData.totalWashes}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">تاريخ الانتهاء:</span>
          </div>
          <span className="font-bold text-gray-800">
            {new Date(packageData.expiryDate).toLocaleDateString('ar-SA')}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">رقم العملية:</span>
          </div>
          <span className="font-bold text-gray-800 text-xs">{packageData.operationId}</span>
        </div>
      </div>

      {/* VIP Notice */}
      {packageData.isVIP && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-700">باقة VIP</span>
            <Crown className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600">
            صالح في الفنادق المحددة فقط - خدمة VIP متميزة
          </p>
        </div>
      )}

      {/* Branch Selection */}
      <div className="mb-6">
        <label className="block mb-3 font-bold text-gray-800 text-center">
          اختر الفرع:
        </label>
        <select
          value={selectedBranch}
          onChange={handleBranchChange}
          disabled={isProcessing || packageData.remainingWashes <= 0 || !isValid()}
          className={`w-full p-4 border-2 rounded-xl text-center font-medium transition-all duration-300 ${
            isProcessing || packageData.remainingWashes <= 0 || !isValid()
              ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-white border-green-300 text-gray-800 hover:border-green-500 focus:border-green-500 focus:outline-none'
          }`}
        >
          <option value="">-- اختر الفرع --</option>
          {packageData.isVIP ? (
            <>
              <option value="كارلتون الرياض">كارلتون الرياض</option>
              <option value="فندق سانت ريجيس الرياض">فندق سانت ريجيس الرياض</option>
              <option value="فندق الهلتون الرياض">فندق الهلتون الرياض</option>
            </>
          ) : (
            <>
              <option value="فرع الرياض">فرع الرياض</option>
              <option value="فرع جدة">فرع جدة</option>
              <option value="فرع الدمام">فرع الدمام</option>
              <option value="فرع مكة">فرع مكة</option>
              <option value="فرع المدينة">فرع المدينة</option>
            </>
          )}
        </select>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">جاري معالجة الغسلة...</p>
        </div>
      )}

      {/* Usage History */}
      {packageData.usageHistory && packageData.usageHistory.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">سجل الاستخدام:</h3>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {packageData.usageHistory.map((usage, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {usage.branchName}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(usage.date).toLocaleString('ar-SA')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleViewTracking}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          عرض تفاصيل الطلب
        </button>
      </div>
    </motion.div>
  );
};

export default QRBranchSelector; 