import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Star, Crown, Car, Sparkles, Gift } from 'lucide-react';
import logo from '../assets/logo.png';

// أسماء الباقات بالعربية
const packageNames = {
  basic: 'الباقة الأساسية',
  advanced: 'الباقة المتقدمة',
  premium: 'الباقة الشاملة',
  vip: 'باقة VIP'
};

// ألوان وأيقونات الباقات
const packageInfo = {
  basic: {
    name: 'الباقة الأساسية',
    color: 'teal',
    icon: Car,
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    buttonColor: 'bg-teal-600 hover:bg-teal-700'
  },
  advanced: {
    name: 'الباقة المتقدمة',
    color: 'green',
    icon: Sparkles,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    buttonColor: 'bg-green-600 hover:bg-green-700'
  },
  premium: {
    name: 'الباقة الشاملة',
    color: 'orange',
    icon: Gift,
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    buttonColor: 'bg-orange-600 hover:bg-orange-700'
  },
  vip: {
    name: 'باقة VIP',
    color: 'purple',
    icon: Crown,
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    buttonColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
  }
};

export default function PackageDetails() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // التمرير إلى أعلى الصفحة عند تحميل المكون
    window.scrollTo(0, 0);
    
    // قراءة بيانات الباقة المختارة من localStorage
    const packageData = localStorage.getItem('selectedPackage');
    if (packageData) {
      setSelectedPackage(JSON.parse(packageData));
    } else {
      // إذا لم تكن هناك باقة مختارة، العودة إلى الصفحة الرئيسية
      navigate('/');
    }
  }, [navigate]);

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const handleBackToPackages = () => {
    navigate('/');
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const packageData = packageInfo[selectedPackage.type];
  const PackageIcon = packageData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
      {/* Header مع الشعار */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-800">تأكيد الحجز</h1>
                <p className="text-sm text-gray-600">مراجعة الباقة المختارة</p>
              </div>
            </div>
            <button
              onClick={handleBackToPackages}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            تأكيد الحجز
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            مراجعة الباقة المختارة
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            تأكد من تفاصيل الباقة قبل المتابعة إلى الدفع
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* تفاصيل الباقة */}
          <div className="space-y-8">
            {/* بطاقة الباقة */}
            <div className={`${packageData.bgColor} rounded-3xl p-8 border-2 ${packageData.borderColor} shadow-lg`}>
              <div className="text-center mb-6">
                <div className={`w-20 h-20 ${packageData.bgColor.replace('50', '100')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <PackageIcon className={`w-10 h-10 ${packageData.textColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{packageData.name}</h3>
                
                {/* شارة VIP */}
                {selectedPackage.type === 'vip' && (
                  <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <Crown className="w-4 h-4 inline mr-2" />
                    VIP
                  </div>
                )}
                
                {/* شارة الأكثر طلباً */}
                {selectedPackage.type === 'advanced' && (
                  <div className="inline-block bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold mb-4">
                    <Star className="w-3 h-3 inline mr-1" />
                    الأكثر طلباً
                  </div>
                )}

                <div className="text-4xl font-bold text-gray-800 mb-1">{selectedPackage.price} ريال</div>
                <div className="text-xl text-gray-400 line-through mb-4">{selectedPackage.originalPrice} ريال</div>
                
                <div className={`${packageData.bgColor.replace('50', '100')} rounded-xl p-3 mb-4`}>
                  <div className={`text-sm ${packageData.textColor} font-semibold`}>
                    توفير {selectedPackage.savings} ريال
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 text-lg font-semibold">{selectedPackage.washes} غسلة</p>
                  <p className="text-gray-500 text-sm mt-1">{selectedPackage.carTypeLabel}</p>
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-800 mb-4">معلومات إضافية</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>ضمان الجودة الشامل</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>خدمة عملاء</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>إمكانية الإلغاء قبل الموعد</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>دفع آمن ومشفر</span>
                </div>
              </div>
            </div>
          </div>

          {/* ملخص الحجز */}
          <div className="space-y-6">
            {/* ملخص الباقة */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-800 mb-4">ملخص الباقة</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">نوع الباقة:</span>
                  <span className="font-semibold">{packageData.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">نوع السيارة:</span>
                  <span className="font-semibold">{selectedPackage.carTypeLabel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">عدد الغسلات:</span>
                  <span className="font-semibold">{selectedPackage.washes} غسلة</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">السعر الأصلي:</span>
                  <span className="text-gray-400 line-through">{selectedPackage.originalPrice} ريال</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">التوفير:</span>
                  <span className="text-green-600 font-semibold">-{selectedPackage.savings} ريال</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>السعر النهائي:</span>
                  <span className={`${packageData.textColor}`}>{selectedPackage.price} ريال</span>
                </div>
              </div>
            </div>

            {/* مميزات الباقة */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-800 mb-4">المميزات</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {selectedPackage.type === 'basic' && (
                  <>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{selectedPackage.paidWashes} غسلات باستخدام صابون إيطالي فاخر عالي الجودة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>غسلة إضافية مجانية ليصبح إجمالي الغسلات {selectedPackage.washes}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>صالحة لمدة شهر واحد من تاريخ الشراء</span>
                    </li>
                  </>
                )}
                {selectedPackage.type === 'advanced' && (
                  <>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{selectedPackage.paidWashes} غسلات باستخدام صابون إيطالي فاخر يمنح سيارتك العناية التي تستحقها</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>غسلتان مجانيتان ليصبح إجمالي الغسلات {selectedPackage.washes}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>صالحة لمدة شهر واحد من تاريخ الشراء</span>
                    </li>
                  </>
                )}
                {selectedPackage.type === 'premium' && (
                  <>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{selectedPackage.paidWashes} غسلة باستخدام صابون إيطالي فاخر يوفر عناية فائقة بسيارتك</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>غسيل بطبقتين من الصابون لضمان إزالة الأوساخ بفعالية وحماية طويلة الأمد</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{selectedPackage.freeWashes} غسلات مجانية ليصبح إجمالي الغسلات {selectedPackage.washes}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>صالحة لمدة شهر واحد من تاريخ الشراء</span>
                    </li>
                  </>
                )}
                {selectedPackage.type === 'vip' && (
                  <>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>غسلة واحدة باستخدام صابون إيطالي فاخر عالي الجودة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>غسيل بطبقتين من الصابون لضمان نظافة عميقة ولمعان يدوم</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>خدمة الفالية والموقف مجانًا</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>تنظيف داخلي شامل</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>تلميع احترافي</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>خدمة VIP معاملة خاصة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>أولوية في الطابور</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>صالحة لمدة يوم واحد من تاريخ الشراء</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* أزرار الإجراءات */}
            <div className="space-y-4">
              <button
                onClick={handleProceedToCheckout}
                className={`w-full ${packageData.buttonColor} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg`}
              >
                متابعة إلى الدفع
              </button>
              <button
                onClick={handleBackToPackages}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                العودة إلى الباقات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 