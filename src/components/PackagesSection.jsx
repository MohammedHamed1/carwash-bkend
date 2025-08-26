import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaCheck, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import CheckoutFlow from './CheckoutFlow';

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const packages = [
    {
      id: 'basic',
      name: 'الباقة الأساسية',
      description: 'مناسبة للاستخدام العادي',
      features: ['غسيل شامل', 'تجفيف', 'معطر', 'خدمة سريعة'],
      popular: false
    },
    {
      id: 'advanced',
      name: 'الباقة المتقدمة',
      description: 'مناسبة للاستخدام المتكرر',
      features: ['غسيل شامل', 'تجفيف', 'معطر', 'خدمة سريعة', 'تلميع', 'معالجة البقع'],
      popular: true
    },
    {
      id: 'premium',
      name: 'الباقة المميزة',
      description: 'مناسبة للاستخدام المكثف',
      features: ['غسيل شامل', 'تجفيف', 'معطر', 'خدمة سريعة', 'تلميع', 'معالجة البقع', 'شمع', 'خدمة VIP'],
      popular: false
    }
  ];

  const carTypes = [
    {
      id: 'small',
      name: 'سيارة صغيرة',
      description: 'سيدان، هاتشباك',
      icon: '🚗'
    },
    {
      id: 'medium',
      name: 'سيارة متوسطة',
      description: 'SUV، كروس أوفر',
      icon: '🚙'
    },
    {
      id: 'large',
      name: 'سيارة كبيرة',
      description: 'فان، بيك أب',
      icon: '🚐'
    }
  ];

  const packagePrices = {
    'small': {
      basic: { price: 150, originalPrice: 235, savings: 85, washes: 5 },
      advanced: { price: 280, originalPrice: 420, savings: 140, washes: 10 },
      premium: { price: 490, originalPrice: 770, savings: 280, washes: 18 }
    },
    'medium': {
      basic: { price: 180, originalPrice: 270, savings: 90, washes: 5 },
      advanced: { price: 320, originalPrice: 480, savings: 160, washes: 10 },
      premium: { price: 530, originalPrice: 830, savings: 300, washes: 18 }
    },
    'large': {
      basic: { price: 220, originalPrice: 330, savings: 110, washes: 5 },
      advanced: { price: 360, originalPrice: 540, savings: 180, washes: 10 },
      premium: { price: 570, originalPrice: 890, savings: 320, washes: 18 }
    }
  };

  const getCurrentPrice = () => {
    if (!selectedPackage || !selectedCarType) return null;
    return packagePrices[selectedCarType]?.[selectedPackage];
  };

  const handleContinue = () => {
    if (selectedPackage && selectedCarType) {
      setShowCheckout(true);
    }
  };

  const handleBack = () => {
    setShowCheckout(false);
  };

  const handleComplete = (qrCode) => {
    // يمكن إضافة منطق إضافي هنا
    console.log('QR Code created:', qrCode);
    setShowCheckout(false);
    setSelectedPackage(null);
    setSelectedCarType(null);
  };

  if (showCheckout) {
    return (
      <CheckoutFlow
        selectedPackage={selectedPackage}
        selectedCarType={selectedCarType}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        
        {/* العنوان */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            اختر باقة الغسيل المناسبة لك
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            اختر الباقة التي تناسب احتياجاتك ونوع سيارتك، واحصل على أفضل خدمة غسيل
          </p>
        </div>

        {/* نوع السيارة */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            اختر نوع سيارتك
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {carTypes.map((carType) => (
              <motion.div
                key={carType.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCarType(carType.id)}
                className={`cursor-pointer rounded-lg p-4 sm:p-6 border-2 transition-all ${
                  selectedCarType === carType.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{carType.icon}</div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {carType.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {carType.description}
                  </p>
                  {selectedCarType === carType.id && (
                    <div className="mt-3 sm:mt-4">
                      <FaCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* الباقات */}
        {selectedCarType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              اختر الباقة المناسبة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {packages.map((pkg) => {
                const price = packagePrices[selectedCarType]?.[pkg.id];
                return (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative rounded-lg p-6 sm:p-8 border-2 transition-all ${
                      selectedPackage === pkg.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                          الأكثر طلباً
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                        {pkg.description}
                      </p>
                      
                      {price && (
                        <div className="mb-4 sm:mb-6">
                          <div className="text-2xl sm:text-3xl font-bold text-green-600">
                            {price.price} ريال
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 line-through">
                            {price.originalPrice} ريال
                          </div>
                          <div className="text-xs sm:text-sm text-green-600 font-medium">
                            توفير {price.savings} ريال
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 mt-2">
                            {price.washes} غسلة
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">المميزات:</h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-xs sm:text-sm text-gray-600">
                            <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 ml-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        selectedPackage === pkg.id
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedPackage === pkg.id ? 'تم الاختيار' : 'اختيار الباقة'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ملخص الاختيار */}
        {selectedPackage && selectedCarType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white rounded-lg shadow-lg p-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ملخص اختيارك
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">تفاصيل الطلب:</h4>
                  <div className="space-y-3 text-right">
                    <div className="flex justify-between">
                      <span className="text-gray-600">نوع السيارة:</span>
                      <span className="font-medium">
                        {carTypes.find(c => c.id === selectedCarType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الباقة:</span>
                      <span className="font-medium">
                        {packages.find(p => p.id === selectedPackage)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">عدد الغسلات:</span>
                      <span className="font-medium">
                        {getCurrentPrice()?.washes} غسلة
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-4">التكلفة:</h4>
                  <div className="space-y-3 text-right">
                    <div className="flex justify-between">
                      <span className="text-gray-600">السعر الأصلي:</span>
                      <span className="line-through text-gray-500">
                        {getCurrentPrice()?.originalPrice} ريال
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">التوفير:</span>
                      <span className="text-green-600 font-medium">
                        {getCurrentPrice()?.savings} ريال
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>السعر النهائي:</span>
                      <span>{getCurrentPrice()?.price} ريال</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleContinue}
                className="flex items-center justify-center mx-auto px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-medium"
              >
                متابعة الدفع
                <FaArrowRight className="mr-2" />
              </button>
              
              <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                <FaInfoCircle className="w-4 h-4 ml-2" />
                هذا نظام تجريبي - في النظام الفعلي سيتم ربط نظام دفع حقيقي
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PackagesSection; 