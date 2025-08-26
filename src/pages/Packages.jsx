import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Search, Car, AlertCircle, Crown, CheckCircle, Loader2, BarChart } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import UnifiedButton from '../components/common/UnifiedButton';
import UnifiedIcon from '../components/common/UnifiedIcon';
import Notification from '../components/common/Notification';
import { packageAPI } from '../api';

const Packages = () => {
  const [selectedCarType, setSelectedCarType] = useState('small');
  const [isVisible, setIsVisible] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAuthNotification, setShowAuthNotification] = useState(false);
  const navigate = useNavigate();

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  // جلب الباقات عند تغيير نوع السيارة
  useEffect(() => {
    if (selectedCarType) {
      fetchPackagesBySize(selectedCarType);
    }
  }, [selectedCarType]);

  // دالة لجلب الباقات حسب حجم السيارة من الباك إند
  const fetchPackagesBySize = async (carSize) => {
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

  const carTypes = [
    { value: 'small', label: 'سيارة صغيرة', icon: '🚗' },
    { value: 'medium', label: 'سيارة متوسطة', icon: '🚙' },
    { value: 'large', label: 'سيارة كبيرة', icon: '🚐' }
  ];

  // دالة للانتقال إلى صفحة تفاصيل الباقة
  const handlePackageClick = (packageData) => {
    // التحقق من تسجيل الدخول أولاً
    const token = localStorage.getItem('frontend_token');
    if (!token) {
      setShowAuthNotification(true);
      return;
    }

    // حفظ بيانات الباقة في localStorage للوصول إليها في صفحة التفاصيل
    const packageInfo = {
      id: packageData._id,
      price: packageData.basePrice,
      originalPrice: packageData.originalPrice,
      savings: packageData.savings,
      washes: packageData.washes,
      name: packageData.name,
      features: packageData.features,
      carType: selectedCarType,
      carTypeLabel: carTypes.find(car => car.value === selectedCarType)?.label
    };

    localStorage.setItem('selectedPackage', JSON.stringify(packageInfo));

    // الانتقال إلى صفحة تفاصيل الباقة مع معرف الباقة
    navigate(`/package-details/${packageData._id}`, {
      state: {
        selectedPackage: packageInfo,
        carSize: selectedCarType
      }
    });
  };

  // دالة لتحديد أيقونة الباقة
  const getPackageIcon = (packageName) => {
    if (packageName.includes('أساسية') || packageName.includes('basic')) return Car;
    if (packageName.includes('متقدمة') || packageName.includes('advanced')) return BarChart;
    if (packageName.includes('شاملة') || packageName.includes('premium')) return Star;
    if (packageName.includes('VIP') || packageName.includes('vip')) return Crown;
    return Car;
  };

  return (
    <>
      <div className="header-spacer"></div>

      {/* إشعار تسجيل الدخول */}
      {showAuthNotification && (
        <Notification
          type="warning"
          title="تسجيل الدخول مطلوب"
          message="يرجى تسجيل الدخول أولاً للتمكن من حجز الباقة"
          duration={5000}
          onClose={() => setShowAuthNotification(false)}
          position="center"
        />
      )}

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
                onClick={() => fetchPackagesBySize(selectedCarType)}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {/* الباقات */}
          {!loading && !error && packages.length > 0 && (
            <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {packages.map((pkg) => {
                const PackageIcon = getPackageIcon(pkg.name);
                const isPopular = pkg.popular;
                const isVIP = pkg.name.includes('VIP') || pkg.name.includes('vip') || pkg._id === '68a51a102389fb217ed65ef6';

                return (
                  <div key={pkg._id} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 flex flex-col h-full border border-gray-100 relative overflow-hidden">
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
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{pkg.name}</h3>

                      {/* السعر */}
                      <div className="mb-4">
                        <div className="text-4xl font-bold text-green-600 mb-2">{pkg.basePrice} ريال</div>
                        <div className="text-lg text-gray-400 line-through">{pkg.originalPrice} ريال</div>
                      </div>

                      {/* التوفير */}
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
                        توفير {pkg.savings} ريال
                      </div>

                      {/* عدد الغسلات */}
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-gray-800 mb-2">{pkg.washes}</div>
                        <p className="text-gray-600 font-semibold">
                          {isVIP ? 'غسلة VIP' : 'غسلة'}
                        </p>
                      </div>
                    </div>

                    {/* مميزات الباقة */}
                    <div className="mb-8 flex-grow">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">المميزات:</h4>
                      <ul className="space-y-3 text-sm text-gray-600">
                        {pkg.features && pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                          <span>{pkg.paidWashes} غسلات مدفوعة</span>
                        </li>
                        {pkg.freeWashes > 0 && (
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                            <span>{pkg.freeWashes} غسلة مجانية</span>
                          </li>
                        )}
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" style={{ fill: 'white' }} />
                          <span>صالح لمدة {pkg.duration} يوم</span>
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
                      onClick={() => handlePackageClick(pkg)}
                      className="w-full mt-auto"
                    >
                      عرض التفاصيل
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

export default Packages; 