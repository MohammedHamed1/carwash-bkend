import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Users, Database, Globe, Calendar, FileText, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy = () => {
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 1,
      title: "مقدمة",
      icon: <FileText className="h-6 w-6" />,
      content: `نحن في PayPass نلتزم بحماية خصوصية بياناتك الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية معلوماتك عند استخدام خدماتنا.`
    },
    {
      id: 2,
      title: "البيانات التي نجمعها",
      icon: <Users className="h-6 w-6" />,
      content: `نجمع البيانات التالية:
• المعلومات الشخصية (الاسم، رقم الهاتف، البريد الإلكتروني)
• بيانات السيارة (النوع، اللون، الرقم)
• بيانات الدفع (بطاقات الائتمان، Apple Pay)
• بيانات الاستخدام (تاريخ الغسلات، الفروع المستخدمة)
• بيانات الموقع (عند استخدام خدمات تحديد الموقع)`
    },
    {
      id: 3,
      title: "كيفية استخدام البيانات",
      icon: <Eye className="h-6 w-6" />,
      content: `نستخدم بياناتك للأغراض التالية:
• تقديم خدمات غسيل السيارات
• معالجة المدفوعات والمدفوعات
• إرسال إشعارات وتحديثات
• تحسين خدماتنا وتجربة المستخدم
• الالتزام بالمتطلبات القانونية
• التواصل معك بخصوص الخدمات والدعم`
    },
    {
      id: 4,
      title: "مشاركة البيانات",
      icon: <Users className="h-6 w-6" />,
      content: `لا نبيع أو نؤجر أو نشارك بياناتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
• مع موافقتك الصريحة
• مع مزودي الخدمات الموثوقين (مثل معالجات الدفع)
• للامتثال للقوانين والأنظمة
• لحماية حقوقنا وممتلكاتنا
• في حالات الطوارئ أو السلامة العامة`
    },
    {
      id: 5,
      title: "حماية البيانات",
      icon: <Shield className="h-6 w-6" />,
      content: `نطبق إجراءات أمنية صارمة لحماية بياناتك:
• تشفير البيانات أثناء النقل والتخزين
• مراقبة مستمرة للأنظمة
• تحديثات أمنية منتظمة
• تدريب الموظفين على أمن البيانات
• نسخ احتياطية منتظمة
• تقييمات أمنية دورية`
    },
    {
      id: 6,
      title: "حقوقك",
      icon: <Lock className="h-6 w-6" />,
      content: `لديك الحق في:
• الوصول إلى بياناتك الشخصية
• تصحيح البيانات غير الدقيقة
• حذف بياناتك الشخصية
• تقييد معالجة بياناتك
• نقل بياناتك إلى مزود خدمة آخر
• الاعتراض على معالجة بياناتك
• سحب الموافقة في أي وقت`
    },
    {
      id: 7,
      title: "ملفات تعريف الارتباط",
      icon: <FileText className="h-6 w-6" />,
      content: `نستخدم ملفات تعريف الارتباط لتحسين تجربتك:
• ملفات تعريف الارتباط الأساسية (ضرورية للعمل)
• ملفات تعريف الارتباط التحليلية (لتحليل الاستخدام)
• ملفات تعريف الارتباط التسويقية (للإعلانات المخصصة)
• ملفات تعريف الارتباط الوظيفية (للميزات المتقدمة)

يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.`
    },
    {
      id: 8,
      title: "احتفاظ البيانات",
      icon: <Calendar className="h-6 w-6" />,
      content: `نحتفظ ببياناتك طالما كانت ضرورية للأغراض المذكورة في هذه السياسة:
• بيانات الحساب: طوال مدة الحساب النشط
• بيانات المعاملات: 7 سنوات للأغراض الضريبية
• بيانات الاتصال: حتى إلغاء الاشتراك
• بيانات الأمان: حسب المتطلبات القانونية

نحذف البيانات تلقائياً عند انتهاء فترة الاحتفاظ.`
    },
    {
      id: 9,
      title: "الأطفال",
      icon: <Users className="h-6 w-6" />,
      content: `خدماتنا لا تستهدف الأطفال دون سن 18 عاماً. لا نجمع عمداً معلومات شخصية من الأطفال. إذا اكتشفنا أننا جمعنا معلومات من طفل، سنحذفها فوراً.`
    },
    {
      id: 10,
      title: "التغييرات على السياسة",
      icon: <FileText className="h-6 w-6" />,
      content: `قد نحدث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات جوهرية من خلال:
• إشعار في التطبيق
• بريد إلكتروني
• إشعار على موقعنا الإلكتروني

استمرارك في استخدام خدماتنا بعد التحديث يعني موافقتك على السياسة الجديدة.`
    },
    {
      id: 11,
      title: "التواصل معنا",
      icon: <Users className="h-6 w-6" />,
      content: `إذا كان لديك أي أسئلة حول سياسة الخصوصية، يمكنك التواصل معنا:

البريد الإلكتروني: privacy@paypass.sa
الهاتف: <span dir="ltr">920000000</span>
العنوان: الرياض، المملكة العربية السعودية

سنرد عليك في غضون 30 يوماً من استلام استفسارك.`
    }
  ];

  const lastUpdated = "15 يناير 2024";

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8" dir="rtl">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">سياسة الخصوصية</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن نلتزم بحماية خصوصية بياناتك وضمان أمان معلوماتك الشخصية
          </p>
          <div className="mt-4 text-sm text-gray-500">
            آخر تحديث: {lastUpdated}
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-500" />
            ملخص سريع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-bold mb-1">حماية قوية</h3>
              <p className="text-sm text-gray-600">تشفير متقدم لحماية بياناتك</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold mb-1">شفافية كاملة</h3>
              <p className="text-sm text-gray-600">نوضح كيفية استخدام بياناتك</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-bold mb-1">تحكم كامل</h3>
              <p className="text-sm text-gray-600">تحكم في بياناتك الشخصية</p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Data Protection Rights */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">حقوقك في حماية البيانات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">الوصول والتصحيح</h3>
              <p className="text-green-100">يمكنك الوصول إلى بياناتك وتصحيح أي معلومات غير دقيقة</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">الحذف والنسيان</h3>
              <p className="text-green-100">يمكنك طلب حذف بياناتك الشخصية من أنظمتنا</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">تقييد المعالجة</h3>
              <p className="text-green-100">يمكنك تقييد كيفية معالجة بياناتك</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">الاعتراض</h3>
              <p className="text-green-100">يمكنك الاعتراض على معالجة بياناتك لأغراض تسويقية</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">هل لديك أسئلة؟</h2>
          <p className="text-gray-600 mb-6">
            إذا كان لديك أي استفسارات حول سياسة الخصوصية، لا تتردد في التواصل معنا
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@paypass.sa"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              راسلنا عبر البريد الإلكتروني
            </a>
            <a
              href="tel:920000000"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold transition"
            >
              اتصل بنا
            </a>
          </div>
        </div>

        {/* Cookie Settings */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">إعدادات ملفات تعريف الارتباط</h2>
          <p className="text-gray-600 mb-6">
            يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك أو استخدام أدواتنا
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">ملفات تعريف الارتباط الأساسية</h3>
              <p className="text-sm text-gray-600 mb-3">ضرورية لعمل الموقع والتطبيق</p>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked disabled className="rounded" />
                <span className="text-sm text-gray-500">مفعلة دائماً</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">ملفات تعريف الارتباط التحليلية</h3>
              <p className="text-sm text-gray-600 mb-3">تساعدنا في تحسين خدماتنا</p>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-500">مفعلة</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">ملفات تعريف الارتباط التسويقية</h3>
              <p className="text-sm text-gray-600 mb-3">لإظهار إعلانات مخصصة</p>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-500">يمكن إلغاؤها</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">ملفات تعريف الارتباط الوظيفية</h3>
              <p className="text-sm text-gray-600 mb-3">للميزات المتقدمة</p>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-500">مفعلة</span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition">
              حفظ الإعدادات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 