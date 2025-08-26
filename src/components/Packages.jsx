import React, { useState } from 'react';
import { Check, Star, Zap, Shield, Clock, Users } from 'lucide-react';
import logo from '../assets/logo.png';

const Packages = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const packages = [
    {
      name: "الباقة الأساسية",
      price: selectedPeriod === 'monthly' ? "99" : "999",
      period: selectedPeriod === 'monthly' ? "شهرياً" : "سنوياً",
      description: "مناسبة للاستخدام اليومي",
      features: [
        "غسيل خارجي شامل",
        "تنظيف الزجاج",
        "تنظيف الإطارات",
        "معطر داخلي",
        "5 مرات شهرياً"
      ],
      popular: false,
      icon: <Shield className="h-6 w-6" />
    },
    {
      name: "الباقة المتقدمة",
      price: selectedPeriod === 'monthly' ? "199" : "1999",
      period: selectedPeriod === 'monthly' ? "شهرياً" : "سنوياً",
      description: "مناسبة للعائلات",
      features: [
        "جميع خدمات الباقة الأساسية",
        "غسيل داخلي شامل",
        "تنظيف المحرك",
        "تلميع خارجي",
        "10 مرات شهرياً",
        "أولوية في الخدمة"
      ],
      popular: true,
      icon: <Zap className="h-6 w-6" />
    },
    {
      name: "الباقة الشاملة",
      price: selectedPeriod === 'monthly' ? "299" : "2999",
      period: selectedPeriod === 'monthly' ? "شهرياً" : "سنوياً",
      description: "مناسبة للشركات",
      features: [
        "جميع خدمات الباقة المتقدمة",
        "تلميع شامل",
        "معالجة الخدوش",
        "خدمة VIP",
        "عدد غير محدود",
        "خدمة مخصصة"
      ],
      popular: false,
      icon: <Star className="h-6 w-6" />
    }
  ];

  const businessPackages = [
    {
      name: "باقة الشركات الصغيرة",
      price: "1999",
      period: "شهرياً",
      description: "مناسبة للشركات الصغيرة",
      features: [
        "غسيل 10 سيارات شهرياً",
        "خدمة مخصصة",
        "تقارير شهرية",
        "خدمة عملاء"
      ]
    },
    {
      name: "باقة الشركات المتوسطة",
      price: "3999",
      period: "شهرياً",
      description: "مناسبة للشركات المتوسطة",
      features: [
        "غسيل 25 سيارة شهرياً",
        "خدمة مخصصة",
        "تقارير شهرية",
        "خدمة عملاء",
        "إدارة الحساب"
      ]
    },
    {
      name: "باقة الشركات الكبيرة",
      price: "7999",
      period: "شهرياً",
      description: "مناسبة للشركات الكبيرة",
      features: [
        "غسيل 50 سيارة شهرياً",
        "خدمة مخصصة",
        "تقارير شهرية",
        "خدمة عملاء",
        "إدارة الحساب",
        "API مخصص"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#232b33] to-[#151a22] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="PayPass Logo" className="h-20 w-20 object-contain drop-shadow-lg brightness-0 invert" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">الباقات</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            اختر الباقة المناسبة لك واستمتع بخدمة غسيل السيارات المتميزة
          </p>
        </div>
        </div>

      {/* Period Toggle */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedPeriod('monthly')}
                className={`px-6 py-2 rounded-md transition ${
                  selectedPeriod === 'monthly'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                اشتراك شهري
              </button>
              <button
                onClick={() => setSelectedPeriod('yearly')}
                className={`px-6 py-2 rounded-md transition ${
                  selectedPeriod === 'yearly'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                اشتراك سنوي
                <span className="text-xs block">توفير 20%</span>
              </button>
            </div>
            </div>
          </div>
        </div>

      {/* Individual Packages */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">باقات الأفراد</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
            <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg transition-transform hover:scale-105 ${
                  pkg.popular ? 'ring-2 ring-green-500 relative' : ''
                }`}
            >
              {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      الأكثر شعبية
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    {pkg.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-800">{pkg.price}</span>
                    <span className="text-gray-600"> ريال {pkg.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
                  اشترك الآن
                </button>
              </div>
            ))}
          </div>
        </div>
                </div>

      {/* Business Packages */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">باقات الشركات</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {businessPackages.map((pkg, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="text-center mb-6">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-800">{pkg.price}</span>
                    <span className="text-gray-600"> ريال {pkg.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-blue-500 ml-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition">
                  تواصل معنا
              </button>
            </div>
            ))}
          </div>
        </div>
        </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">مميزات الباقات</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Clock className="h-8 w-8" />
              </div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">ساعات عمل مرنة</h3>
              <p className="text-gray-600">خدمة متاحة على مدار الساعة</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ضمان الجودة</h3>
              <p className="text-gray-600">ضمان شامل على جميع الخدمات</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">سرعة في الأداء</h3>
              <p className="text-gray-600">خدمة سريعة وفعالة</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تجربة متميزة</h3>
              <p className="text-gray-600">تجربة مستخدم لا تُنسى</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages; 