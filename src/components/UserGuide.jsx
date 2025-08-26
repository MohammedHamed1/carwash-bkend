import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Pause, Download, User, CreditCard, QrCode, Car, CheckCircle, Star } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const UserGuide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      id: 1,
      title: "تحميل التطبيق",
      description: "قم بتحميل تطبيق PayPass من متجر التطبيقات",
      details: [
        "اذهب إلى Google Play Store أو App Store",
        "ابحث عن 'PayPass'",
        "اضغط على 'تثبيت' أو 'Install'",
        "انتظر حتى يكتمل التحميل"
      ],
      icon: <Car className="h-8 w-8" />,
      color: "blue"
    },
    {
      id: 2,
      title: "إنشاء حساب",
      description: "سجل حساب جديد أو سجل دخول إذا كان لديك حساب",
      details: [
        "افتح التطبيق",
        "اضغط على 'إنشاء حساب جديد'",
        "أدخل بياناتك الشخصية (الاسم، رقم الهاتف، البريد الإلكتروني)",
        "أنشئ كلمة مرور قوية",
        "اضغط على 'إنشاء الحساب'"
      ],
      icon: <User className="h-8 w-8" />,
      color: "green"
    },
    {
      id: 3,
      title: "اختيار الباقة",
      description: "اختر الباقة المناسبة لسيارتك واحتياجاتك",
      details: [
        "تصفح الباقات المتاحة (الأساسية، المتقدمة، الشاملة)",
        "اقرأ تفاصيل كل باقة بعناية",
        "حدد نوع سيارتك (صغيرة، متوسطة، كبيرة)",
        "راجع السعر النهائي بعد الخصم",
        "اضغط على 'احجز الباقة الآن'"
      ],
      icon: <CreditCard className="h-8 w-8" />,
      color: "purple"
    },
    {
      id: 4,
      title: "إتمام الدفع",
      description: "اختر طريقة الدفع المناسبة وأكمل العملية",
      details: [
        "اختر طريقة الدفع (بطاقة ائتمان، Apple Pay، نقدي)",
        "أدخل بيانات الدفع إذا لزم الأمر",
        "راجع تفاصيل الطلب والسعر النهائي",
        "اضغط على 'إتمام الدفع'",
        "انتظر تأكيد العملية"
      ],
      icon: <CreditCard className="h-8 w-8" />,
      color: "orange"
    },
    {
      id: 5,
      title: "استلام الباركود",
      description: "ستتلقى باركود فوري بعد إتمام الدفع",
      details: [
        "ستظهر رسالة تأكيد نجاح الدفع",
        "ستتلقى باركود فوري في التطبيق",
        "يمكنك نسخ الباركود أو مشاركته",
        "احتفظ بالباركود في مكان آمن",
        "الباركود صالح لمدة شهر من تاريخ الشراء"
      ],
      icon: <QrCode className="h-8 w-8" />,
      color: "red"
    },
    {
      id: 6,
      title: "استخدام الباركود",
      description: "اذهب إلى أقرب فرع واستخدم الباركود",
      details: [
        "اذهب إلى أقرب فرع من فروع PayPass",
        "ابحث عن جهاز قراءة الباركود",
        "امسح الباركود من هاتفك على الجهاز",
        "اتبع التعليمات على الشاشة",
        "ابدأ غسيل سيارتك"
      ],
      icon: <QrCode className="h-8 w-8" />,
      color: "indigo"
    },
    {
      id: 7,
      title: "متابعة الغسلات",
      description: "تابع تاريخ غسلاتك وتقييماتك",
      details: [
        "اذهب إلى 'سجل الغسلات' في التطبيق",
        "راجع تفاصيل كل غسلة (التاريخ، الوقت، الفرع)",
        "قيّم الخدمة بعد كل غسلة",
        "احصل على نقاط الولاء",
        "تابع رصيدك المتبقي من الباقة"
      ],
      icon: <CheckCircle className="h-8 w-8" />,
      color: "teal"
    }
  ];

  const tips = [
    {
      title: "نصائح مهمة",
      items: [
        "احتفظ بالباركود في مكان آمن",
        "تأكد من صحة بياناتك الشخصية",
        "قيّم الخدمة بعد كل غسلة للحصول على نقاط إضافية",
        "استخدم الباركود قبل انتهاء صلاحيته",
        "تواصل مع الدعم الفني إذا واجهت أي مشكلة"
      ]
    },
    {
      title: "معلومات مفيدة",
      items: [
        "الباركود صالح لمدة شهر من تاريخ الشراء",
        "يمكنك استخدام الباركود في أي فرع من فروعنا",
        "احصل على غسلة مجانية عند دعوة صديقك",
        "نعمل من 7 صباحاً حتى 11 مساءً في جميع الفروع",
        "جميع المعاملات آمنة ومشفرة"
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      red: "bg-red-100 text-red-600",
      indigo: "bg-indigo-100 text-indigo-600",
      teal: "bg-teal-100 text-teal-600"
    };
    return colors[color] || colors.blue;
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }
  };

  return (
    <>
      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <PageHeader
          title="دليل الاستخدام"
          subtitle="تعلم كيفية استخدام تطبيق PayPass خطوة بخطوة"
          breadcrumbs={['الرئيسية', 'دليل الاستخدام']}
        />
        <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-500" />
                خطوات الاستخدام
              </h2>
              
              <div className="space-y-3 mb-6">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-right p-3 rounded-lg transition ${
                      activeStep === index
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activeStep === index ? 'bg-white text-green-500' : getColorClasses(step.color)
                      }`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.title}</div>
                        <div className="text-sm opacity-80">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={prevStep}
                  disabled={activeStep === 0}
                  className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                >
                  السابق
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={nextStep}
                  disabled={activeStep === steps.length - 1}
                  className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition"
                >
                  التالي
                </button>
              </div>

              {/* Progress */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                {activeStep + 1} من {steps.length}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Step */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getColorClasses(steps[activeStep].color)}`}>
                  {steps[activeStep].icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{steps[activeStep].title}</h2>
                  <p className="text-gray-600">{steps[activeStep].description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">الخطوات التفصيلية:</h3>
                <ol className="space-y-3">
                  {steps[activeStep].details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600">{tip.title}</h3>
                  <ul className="space-y-2">
                    {tip.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Video Tutorial */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">فيديو تعليمي</h3>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <p className="text-gray-600">فيديو تعليمي مفصل لاستخدام التطبيق</p>
                <p className="text-sm text-gray-500 mt-2">سيتم إضافة الفيديو قريباً</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4 text-white">هل تحتاج مساعدة إضافية؟</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href="/help-center"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-center"
                >
                  مركز المساعدة
                </a>
                <a
                  href="/technical-support"
                  className="bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition text-center"
                >
                  الدعم الفني
                </a>
                <a
                  href="/complaints"
                  className="bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition text-center"
                >
                  تواصل معنا
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserGuide; 