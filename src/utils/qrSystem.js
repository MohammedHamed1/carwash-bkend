// نظام إدارة QR Code المركزي
// Central QR Code Management System

// أنواع الباقات المدعومة
export const PACKAGE_TYPES = {
  basic: {
    name: 'الباقة الأساسية',
    color: 'from-blue-500 to-blue-600',
    icon: 'Car',
    validity: 30, // أيام
    defaultWashes: 5,
    isVIP: false
  },
  advanced: {
    name: 'الباقة المتقدمة',
    color: 'from-green-500 to-green-600',
    icon: 'Shield',
    validity: 30,
    defaultWashes: 10,
    isVIP: false
  },
  premium: {
    name: 'الباقة الشاملة',
    color: 'from-purple-500 to-purple-600',
    icon: 'Star',
    validity: 30,
    defaultWashes: 18,
    isVIP: false
  },
  vip: {
    name: 'باقة VIP',
    color: 'from-yellow-500 to-yellow-600',
    icon: 'Crown',
    validity: 30,
    defaultWashes: 1,
    isVIP: true,
    isHotelOnly: true, // صالح في الفنادق فقط
    requiresHotelSelection: true // يتطلب اختيار فندق
  }
};

// أنواع السيارات
export const CAR_TYPES = {
  small: 'صغيرة',
  medium: 'متوسطة',
  large: 'كبيرة'
};

// الأسعار الأساسية حسب نوع السيارة
export const CAR_TYPE_MULTIPLIERS = {
  small: 1.0,    // السعر الأساسي
  medium: 1.2,   // +20%
  large: 1.47    // +47%
};

// الأسعار الأساسية للباقات
export const BASE_PACKAGE_PRICES = {
  basic: {
    price: 150,
    washes: 5
  },
  advanced: {
    price: 280,
    washes: 10
  },
  premium: {
    price: 490,
    washes: 18
  },
  vip: {
    price: 150,
    washes: 1
  }
};

// حساب السعر حسب نوع السيارة
export const calculatePriceByCarType = (packageType, carType) => {
  const basePrice = BASE_PACKAGE_PRICES[packageType]?.price || 0;
  const multiplier = CAR_TYPE_MULTIPLIERS[carType] || 1.0;
  const finalPrice = Math.round(basePrice * multiplier);
  
  return {
    price: finalPrice,
    originalPrice: Math.round(finalPrice * 1.57), // سعر السوق
    savings: Math.round(finalPrice * 0.57), // التوفير
    washes: BASE_PACKAGE_PRICES[packageType]?.washes || 1
  };
};

// إنشاء QR Code جديد
export const generateQRCode = (packageData, customerData, branchData) => {
  // التحقق من وجود QR صالح قبل الإنشاء
  const existingQR = checkExistingValidQR();
  if (existingQR.hasValidQR) {
    const confirmReplace = window.confirm(
      `لديك QR صالح للعميل ${existingQR.qrData.customerName} مع ${existingQR.qrData.remainingWashes} غسلات متبقية.\n\nهل تريد استبداله؟`
    );
    if (!confirmReplace) {
      return { success: false, error: 'تم إلغاء إنشاء QR جديد' };
    }
  }

  // تنظيف QR منتهي الصلاحية
  cleanupExpiredQR();

  const now = new Date();
  const expiryDate = new Date(now.getTime() + (packageData.validity || 30) * 24 * 60 * 60 * 1000);
  
  // حساب السعر الفعلي حسب نوع السيارة
  const actualPrice = packageData.price || 0;
  const actualOriginalPrice = packageData.originalPrice || 0;
  const actualSavings = actualOriginalPrice - actualPrice;
  
  // هيكل بيانات محسن مع السعر الفعلي
  const baseQRData = {
    operationId: `O${Math.random().toString().substr(2, 8)}`,
    packageType: packageData.type,
    packageName: packageData.name,
    carType: customerData.carType,
    customerName: customerData.name,
    customerPhone: customerData.phone,
    customerEmail: customerData.email,
    remainingWashes: packageData.washes,
    totalWashes: packageData.washes,
    price: actualPrice, // السعر الفعلي المحفوظ
    originalPrice: actualOriginalPrice, // السعر الأصلي المحفوظ
    savings: actualSavings, // التوفير المحفوظ
    startDate: now.toISOString(),
    expiryDate: expiryDate.toISOString(),
    packageStatus: 'active',
    lastUsed: null,
    usageHistory: [],
    createdAt: now.toISOString(),
    version: '1.1', // تحديث الإصدار
    isVIP: packageData.isVIP || false
  };

  // إضافة بيانات خاصة بـ VIP
  if (packageData.isVIP) {
    baseQRData.hotelName = customerData.hotelName || '';
    baseQRData.roomNumber = customerData.roomNumber || '';
    baseQRData.vipStatus = 'active';
    baseQRData.isHotelOnly = true;
    baseQRData.branchName = 'سيتم تحديده لاحقاً';
    baseQRData.branchId = 'VIP_BRANCH';
    baseQRData.branchAddress = 'سيتم تحديده لاحقاً';
    baseQRData.branchPhone = 'سيتم تحديده لاحقاً';
  } else {
    // بيانات الفروع العادية
    baseQRData.branchName = branchData.name;
    baseQRData.branchId = branchData.id;
    baseQRData.branchAddress = branchData.address;
    baseQRData.branchPhone = branchData.phone;
  }

  // حفظ في localStorage
  localStorage.setItem('qrCodeData', JSON.stringify(baseQRData));
  localStorage.setItem('packageDetails', JSON.stringify(packageData));
  localStorage.setItem('orderDetails', JSON.stringify(customerData));
  
  if (!packageData.isVIP) {
    localStorage.setItem('selectedBranch', JSON.stringify(branchData));
  }

  return baseQRData;
};

// إنشاء QR Code خاص بـ VIP - محسن
export const generateVIPQRCode = (packageData, customerData, hotelData) => {
  // التحقق من وجود QR صالح قبل الإنشاء
  const existingQR = checkExistingValidQR();
  if (existingQR.hasValidQR) {
    const confirmReplace = window.confirm(
      `لديك QR صالح للعميل ${existingQR.qrData.customerName} مع ${existingQR.qrData.remainingWashes} غسلات متبقية.\n\nهل تريد استبداله؟`
    );
    if (!confirmReplace) {
      return { success: false, error: 'تم إلغاء إنشاء QR جديد' };
    }
  }

  // تنظيف QR منتهي الصلاحية
  cleanupExpiredQR();

  const now = new Date();
  const expiryDate = new Date(now.getTime() + (packageData.validity || 30) * 24 * 60 * 60 * 1000);
  
  // حساب السعر الفعلي
  const actualPrice = packageData.price || 0;
  const actualOriginalPrice = packageData.originalPrice || 0;
  const actualSavings = actualOriginalPrice - actualPrice;
  
  const vipQRData = {
    operationId: `VIP${Math.random().toString().substr(2, 8)}`,
    packageType: 'vip',
    packageName: 'باقة VIP',
    carType: customerData.carType,
    customerName: customerData.name,
    customerPhone: customerData.phone,
    customerEmail: customerData.email,
    remainingWashes: 1,
    totalWashes: 1,
    price: actualPrice, // السعر الفعلي المحفوظ
    originalPrice: actualOriginalPrice, // السعر الأصلي المحفوظ
    savings: actualSavings, // التوفير المحفوظ
    
    // بيانات الفندق
    hotelName: hotelData.name,
    hotelId: hotelData.id,
    hotelAddress: hotelData.address,
    hotelPhone: hotelData.phone,
    roomNumber: customerData.roomNumber || '',
    
    // بيانات الفرع (سيتم تحديثها لاحقاً)
    branchName: 'سيتم تحديده لاحقاً',
    branchId: 'VIP_BRANCH',
    branchAddress: 'سيتم تحديده لاحقاً',
    branchPhone: 'سيتم تحديده لاحقاً',
    
    startDate: now.toISOString(),
    expiryDate: expiryDate.toISOString(),
    packageStatus: 'active',
    vipStatus: 'active',
    lastUsed: null,
    usageHistory: [],
    createdAt: now.toISOString(),
    version: '1.0',
    isVIP: true,
    isHotelOnly: true,
    requiresHotelSelection: true
  };

  // حفظ في localStorage
  localStorage.setItem('qrCodeData', JSON.stringify(vipQRData));
  localStorage.setItem('vipPackageDetails', JSON.stringify(packageData));
  localStorage.setItem('vipOrderDetails', JSON.stringify(customerData));
  localStorage.setItem('selectedHotel', JSON.stringify(hotelData));

  return vipQRData;
};

// التحقق من صحة QR Code - محسن
export const validateQRCode = (qrData) => {
  try {
    // التحقق من وجود البيانات الأساسية
    if (!qrData.operationId || !qrData.packageType || !qrData.customerName) {
      return { isValid: false, error: 'بيانات QR كود غير صحيحة' };
    }

    // التحقق من تاريخ الانتهاء - تحقق صارم
    const expiryDate = new Date(qrData.expiryDate);
    const now = new Date();
    const isExpired = expiryDate < now;
    const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // إذا انتهت الصلاحية، إرجاع خطأ فوري
    if (isExpired) {
      return { 
        isValid: false, 
        error: 'انتهت صلاحية الباقة',
        isExpired: true,
        daysRemaining: 0,
        hasWashes: false,
        status: 'expired'
      };
    }

    // التحقق من الغسلات المتبقية
    const hasWashes = qrData.remainingWashes > 0;

    // تحقق إضافي لباقة VIP
    if (qrData.isVIP) {
      if (!qrData.hotelName) {
        return { isValid: false, error: 'باقة VIP تتطلب اختيار فندق' };
      }
    }

    return {
      isValid: true,
      isExpired: false,
      daysRemaining,
      hasWashes,
      isVIP: qrData.isVIP || false,
      status: hasWashes ? 'active' : 'no_washes'
    };
  } catch (error) {
    return { isValid: false, error: 'QR كود غير صالح' };
  }
};

// التحقق من وجود QR صالح قبل إنشاء جديد
export const checkExistingValidQR = () => {
  try {
    const existingQR = localStorage.getItem('qrCodeData');
    if (!existingQR) return { hasValidQR: false };

    const qrData = JSON.parse(existingQR);
    const validation = validateQRCode(qrData);
    
    return {
      hasValidQR: validation.isValid && !validation.isExpired && validation.hasWashes,
      qrData: qrData,
      validation: validation
    };
  } catch (error) {
    return { hasValidQR: false };
  }
};

// تنظيف QR منتهي الصلاحية
export const cleanupExpiredQR = () => {
  try {
    const existingQR = localStorage.getItem('qrCodeData');
    if (!existingQR) return;

    const qrData = JSON.parse(existingQR);
    const validation = validateQRCode(qrData);
    
    if (validation.isExpired) {
      localStorage.removeItem('qrCodeData');
      localStorage.removeItem('scannedQRData');
      console.log('تم تنظيف QR منتهي الصلاحية');
      return true; // تم التنظيف
    }
    return false; // لم يتم التنظيف
  } catch (error) {
    console.error('خطأ في تنظيف QR:', error);
    return false;
  }
};

// دالة لتنظيف QR منتهي الصلاحية عند تحميل التطبيق
export const initializeQRSystem = () => {
  try {
    // تنظيف QR منتهي الصلاحية
    const wasCleaned = cleanupExpiredQR();
    
    if (wasCleaned) {
      console.log('تم تنظيف QR منتهي الصلاحية عند تحميل التطبيق');
    }
    
    // التحقق من وجود QR صالح
    const existingQR = checkExistingValidQR();
    if (existingQR.hasValidQR) {
      console.log(`QR صالح موجود للعميل: ${existingQR.qrData.customerName}`);
    }
    
    return {
      wasCleaned,
      hasValidQR: existingQR.hasValidQR,
      qrData: existingQR.qrData
    };
  } catch (error) {
    console.error('خطأ في تهيئة نظام QR:', error);
    return { wasCleaned: false, hasValidQR: false };
  }
};

// استخدام غسلة - محسن مع تحقق صارم
export const useWash = (qrData, branchName) => {
  // التحقق من وجود البيانات
  if (!qrData) {
    return { success: false, error: 'بيانات QR غير موجودة' };
  }

  // التحقق من الغسلات المتبقية
  if (qrData.remainingWashes <= 0) {
    return { success: false, error: 'لا توجد غسلات متبقية' };
  }

  // التحقق الصارم من الصلاحية
  const validation = validateQRCode(qrData);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  // تحقق إضافي من انتهاء الصلاحية
  if (validation.isExpired) {
    return { success: false, error: 'انتهت صلاحية الباقة' };
  }

  // تحقق إضافي لباقة VIP
  if (qrData.isVIP) {
    if (!qrData.hotelName) {
      return { success: false, error: 'باقة VIP تتطلب اختيار فندق' };
    }
  }

  // تحديث البيانات
  const updatedQRData = {
    ...qrData,
    remainingWashes: qrData.remainingWashes - 1,
    lastUsed: new Date().toISOString(),
    usageHistory: [
      ...qrData.usageHistory,
      {
        date: new Date().toISOString(),
        branchName: branchName,
        washNumber: qrData.totalWashes - qrData.remainingWashes + 1,
        action: 'wash_used',
        isVIP: qrData.isVIP || false
      }
    ]
  };

  // حفظ البيانات المحدثة
  localStorage.setItem('qrCodeData', JSON.stringify(updatedQRData));
  localStorage.setItem('scannedQRData', JSON.stringify(updatedQRData));

  return { success: true, data: updatedQRData };
};

// الحصول على معلومات الباقة
export const getPackageInfo = (type) => {
  return PACKAGE_TYPES[type] || PACKAGE_TYPES.basic;
};

// الحصول على لون الباقة
export const getPackageColor = (type) => {
  const packageInfo = getPackageInfo(type);
  return packageInfo.color;
};

// الحصول على اسم الباقة
export const getPackageName = (type) => {
  const packageInfo = getPackageInfo(type);
  return packageInfo.name;
};

// الحصول على نوع السيارة
export const getCarTypeName = (type) => {
  return CAR_TYPES[type] || CAR_TYPES.medium;
};

// التحقق من كون الباقة VIP
export const isVIPPackage = (type) => {
  const packageInfo = getPackageInfo(type);
  return packageInfo.isVIP || false;
};

// التحقق من كون الباقة تتطلب اختيار فندق
export const requiresHotelSelection = (type) => {
  const packageInfo = getPackageInfo(type);
  return packageInfo.requiresHotelSelection || false;
};

// تحميل QR Code كصورة
export const downloadQRCode = (qrData, filename = null) => {
  const svg = document.querySelector('svg');
  if (!svg) {
    console.error('QR Code SVG not found');
    return false;
  }

  try {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.download = filename || `qr-code-${qrData.operationId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    return true;
  } catch (error) {
    console.error('Error downloading QR Code:', error);
    return false;
  }
};

// نسخ بيانات QR Code
export const copyQRData = async (qrData) => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(qrData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error copying QR data:', error);
    return { success: false, error: error.message };
  }
};

// مشاركة QR Code
export const shareQRCode = (qrData) => {
  if (navigator.share) {
    return navigator.share({
      title: 'QR كود غسيل السيارات',
      text: `QR كود ${qrData.packageName} - ${qrData.customerName}`,
      url: window.location.href
    });
  } else {
    return copyQRData(qrData);
  }
};

// الحصول على حالة الباقة
export const getPackageStatus = (qrData) => {
  const validation = validateQRCode(qrData);
  
  if (!validation.isValid) {
    return { status: 'invalid', message: 'QR كود غير صالح' };
  }
  
  if (validation.isExpired) {
    return { status: 'expired', message: 'الباقة منتهية' };
  }
  
  if (!validation.hasWashes) {
    return { status: 'no_washes', message: 'لا توجد غسلات متبقية' };
  }
  
  if (validation.daysRemaining <= 7) {
    return { status: 'expiring_soon', message: `تنتهي الباقة خلال ${validation.daysRemaining} أيام` };
  }
  
  // رسالة خاصة بـ VIP
  if (validation.isVIP) {
    return { status: 'active', message: 'باقة VIP صالحة - صالح في الفنادق فقط' };
  }
  
  return { status: 'active', message: 'الباقة صالحة' };
};

// تحديث بيانات QR Code
export const updateQRData = (updates) => {
  const currentQRData = JSON.parse(localStorage.getItem('qrCodeData') || '{}');
  const updatedQRData = { ...currentQRData, ...updates };
  localStorage.setItem('qrCodeData', JSON.stringify(updatedQRData));
  return updatedQRData;
};

// الحصول على سجل الاستخدام
export const getUsageHistory = (qrData) => {
  return qrData.usageHistory || [];
};

// إضافة استخدام جديد
export const addUsageRecord = (qrData, branchName, action = 'wash_used') => {
  const usageRecord = {
    date: new Date().toISOString(),
    branchName,
    washNumber: qrData.totalWashes - qrData.remainingWashes + 1,
    action,
    isVIP: qrData.isVIP || false
  };

  const updatedQRData = {
    ...qrData,
    usageHistory: [...qrData.usageHistory, usageRecord]
  };

  localStorage.setItem('qrCodeData', JSON.stringify(updatedQRData));
  return updatedQRData;
};

// تصدير بيانات QR Code
export const exportQRData = (qrData) => {
  const exportData = {
    qrCode: qrData,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `qr-data-${qrData.operationId}.json`;
  link.click();
};

// استيراد بيانات QR Code
export const importQRData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.qrCode && data.qrCode.operationId) {
          localStorage.setItem('qrCodeData', JSON.stringify(data.qrCode));
          resolve(data.qrCode);
        } else {
          reject(new Error('بيانات QR Code غير صحيحة'));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('خطأ في قراءة الملف'));
    reader.readAsText(file);
  });
}; 