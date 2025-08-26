import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Gift, Clock, Search, Car, AlertCircle, Crown, CheckCircle, Zap, Shield, Award } from 'lucide-react';
import saudiImage from '../assets/saudi.png';
import PageHeader from './common/PageHeader';
import UnifiedButton from './common/UnifiedButton';
import UnifiedIcon from './common/UnifiedIcon';

const EnhancedPackagesSection = () => {
  const [selectedCarType, setSelectedCarType] = useState('small')
  const [isVisible, setIsVisible] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  // دالة لجلب الباقات من الباك إند
  const fetchPackages = async (carSize) => {
    if (!carSize) return;

    setLoading(true);
    setError(null);

    try {
      // استخدام الباقة الأساسية كأمثلة - يمكن تعديلها حسب الحاجة
      const packageIds = [
        '68a51a102389fb217ed65ef3', // الباقة الأساسية
        '68a51a102389fb217ed65ef4', // الباقة المتقدمة
        '68a51a102389fb217ed65ef5', // الباقة الشاملة
        '68a51a102389fb217ed65ef6'  // باقة VIP
      ];

      // جلب كل باقة بشكل منفصل مع الحجم المحدد
      const packagePromises = packageIds.map(async (packageId) => {
        const response = await fetch(`http://localhost:5000/api/packages/get-single-package-id/${packageId}?size=${carSize}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      });

      const packagesData = await Promise.all(packagePromises);
      setPackages(packagesData);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError('حدث خطأ في جلب البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  // دالة لجلب باقات لحجم سيارة محدد
  const fetchPackagesForSize = async (carSize) => {
    if (!carSize) return;

    setLoading(true);
    setError(null);

    try {
      // استخدام الباقة الأساسية كأمثلة - يمكن تعديلها حسب الحاجة
      const packageIds = [
        '68a51a102389fb217ed65ef3', // الباقة الأساسية
        '68a51a102389fb217ed65ef4', // الباقة المتقدمة
        '68a51a102389fb217ed65ef5', // الباقة الشاملة
        '68a51a102389fb217ed65ef6'  // باقة VIP
      ];

      // جلب كل باقة بشكل منفصل مع الحجم المحدد
      const packagePromises = packageIds.map(async (packageId) => {
        const response = await fetch(`http://localhost:5000/api/packages/get-single-package-id/${packageId}?size=${carSize}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      });

      const packagesData = await Promise.all(packagePromises);
      setPackages(packagesData);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError('حدث خطأ في جلب البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  // جلب الباقات عند تغيير نوع السيارة
  useEffect(() => {
    if (selectedCarType) {
      fetchPackages(selectedCarType);
    }
  }, [selectedCarType]);

  const carTypes = [
    { value: 'small', label: 'سيارة صغيرة', icon: '🚗' },
    { value: 'medium', label: 'سيارة متوسطة', icon: '🚙' },
    { value: 'large', label: 'سيارة كبيرة', icon: '🚐' }
  ];

  // دالة للانتقال إلى صفحة الشراء مع بيانات الباقة
  const handleCheckout = (packageData) => {
    if (!selectedCarType) {
      alert('يرجى اختيار نوع السيارة أولاً');
      return;
    }

    // إذا كانت باقة VIP، انتقل إلى المسار الخاص بها
    if (packageData.name.includes('VIP') || packageData.name.includes('vip')) {
      navigate('/vip-package-details');
      return;
    }

    const packageInfo = {
      type: packageData.name,
      carType: selectedCarType,
      carTypeLabel: carTypes.find(car => car.value === selectedCarType)?.label,
      price: packageData.basePrice,
      originalPrice: packageData.originalPrice,
      savings: packageData.savings,
      washes: packageData.washes,
      paidWashes: packageData.paidWashes,
      freeWashes: packageData.freeWashes,
      features: packageData.features,
      duration: packageData.duration,
      _id: packageData._id
    };

    // حفظ بيانات الباقة في localStorage للوصول إليها في صفحة الحجز
    localStorage.setItem('selectedPackage', JSON.stringify(packageInfo));

    // الانتقال إلى صفحة تفاصيل الباقة
    navigate(`/package-details/${packageData._id}`);
  };

  // دالة لتحديد أيقونة الباقة
  const getPackageIcon = (packageName) => {
    if (packageName.includes('أساسية') || packageName.includes('basic')) return Car;
    if (packageName.includes('متقدمة') || packageName.includes('advanced')) return Zap;
    if (packageName.includes('شاملة') || packageName.includes('premium')) return Award;
    if (packageName.includes('VIP') || packageName.includes('vip')) return Crown;
    return Car;
  };

  return (
    <>
      <div className="header-spacer"></div>
      <PageHeader
        title="باقاتنا المميزة"
        subtitle="اختر الباقة المناسبة لك واستمتع بخصومات حصرية عند الشراء من التطبيق"
        breadcrumbs={['الرئيسية', 'الباقات']}
      />

      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden" dir="rtl">
        {/* خلفية زخرفية */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-300/30 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-400/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">

          {/* اختيار نوع السيارة */}
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">اختر نوع سيارتك</h3>

            {/* مربع البحث */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" style={{ fill: 'white' }} />
                <select
                  value={selectedCarType}
                  onChange={(e) => setSelectedCarType(e.target.value)}
                  className="w-full px-12 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg text-gray-700 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <option value="">🔍 ابحث عن نوع سيارتك...</option>
                  {carTypes.map((carType) => (
                    <option key={carType.value} value={carType.value}>
                      {carType.icon} {carType.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* أزرار الاختيار السريع */}
            <div className="flex flex-wrap justify-center gap-4">
              {carTypes.map((carType) => (
                <button
                  key={carType.value}
                  onClick={() => setSelectedCarType(carType.value)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCarType === carType.value
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                >
                  <span className="text-2xl">{carType.icon}</span>
                  <span>{carType.label}</span>
                  {selectedCarType === carType.value && (
                    <CheckCircle className="w-5 h-5" style={{ fill: 'white' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* رسالة تحميل */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              <p className="mt-4 text-gray-600">جاري تحميل الباقات...</p>
            </div>
          )}

          {/* رسالة خطأ */}
          {error && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => fetchPackages(selectedCarType)}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {/* الباقات */}
          {!loading && !error && packages.length > 0 && (
            <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {packages.map((packageData, index) => {
                const PackageIcon = getPackageIcon(packageData.name);
                const isPopular = packageData.popular;
                const isVIP = packageData.name.includes('VIP') || packageData.name.includes('vip');

                return (
                  <div key={packageData._id} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 flex flex-col h-full border border-gray-100 relative overflow-hidden">
                    {/* خلفية زخرفية */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>

                    {/* شارة الأكثر طلباً أو VIP */}
                    {(isPopular || isVIP) && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xl">
                          {isPopular ? (
                            <>
                              <Star className="w-3 h-3" style={{ fill: 'white' }} />
                              الأكثر طلباً
                            </>
                          ) : (
                            <>
                              <Crown className="w-3 h-3" style={{ fill: 'white' }} />
                              للفنادق فقط
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6 relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <PackageIcon className="w-10 h-10 text-white" style={{ fill: 'white' }} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{packageData.name}</h3>

                      {/* مربع اختيار حجم السيارة داخل البطاقة */}
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">اختر حجم سيارتك:</label>
                        <div className="relative">
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" style={{ fill: 'white' }} />
                          <select
                            value={selectedCarType}
                            onChange={(e) => {
                              setSelectedCarType(e.target.value);
                              fetchPackagesForSize(e.target.value);
                            }}
                            className="w-full px-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-600 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <option value="">🚗 اختر الحجم</option>
                            {carTypes.map((carType) => (
                              <option key={carType.value} value={carType.value}>
                                {carType.icon} {carType.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* السعر */}
                      <div className="mb-4">
                        <div className="text-4xl font-bold text-green-600 mb-2">{packageData.basePrice} ريال</div>
                        <div className="text-lg text-gray-400 line-through">{packageData.originalPrice} ريال</div>
                      </div>

                      {/* التوفير */}
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                        توفير {packageData.savings} ريال
                      </div>

                      {/* عدد الغسلات */}
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-gray-800 mb-2">{packageData.washes}</div>
                        <p className="text-gray-600 font-semibold">
                          {isVIP ? 'غسلة VIP' : 'غسلة'}
                        </p>
                      </div>
                    </div>

                    {/* مميزات الباقة */}
                    <div className="mb-8 flex-grow">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">المميزات:</h4>
                      <ul className="space-y-3 text-sm text-gray-600">
                        {packageData.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                          <span>{packageData.paidWashes} غسلات مدفوعة</span>
                        </li>
                        {packageData.freeWashes > 0 && (
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                            <span>{packageData.freeWashes} غسلة مجانية</span>
                          </li>
                        )}
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                          <span>صالح لمدة {packageData.duration} يوم</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                          <span>ضمان الجودة</span>
                        </li>
                      </ul>
                    </div>

                    <UnifiedButton
                      variant="gradient"
                      size="large"
                      onClick={() => handleCheckout(packageData)}
                      className="w-full mt-auto"
                    >
                      احجز الآن
                    </UnifiedButton>
                  </div>
                );
              })}
            </div>
          )}

          {/* رسالة عند عدم اختيار نوع السيارة */}
          {!loading && !error && !selectedCarType && (
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">يرجى اختيار نوع السيارة لعرض الباقات المتاحة</p>
            </div>
          )}

          {/* رسالة عند عدم وجود باقات */}
          {!loading && !error && selectedCarType && packages.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">لا توجد باقات متاحة لهذا النوع من السيارات</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EnhancedPackagesSection; 