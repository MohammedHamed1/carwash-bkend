import React, { useEffect } from 'react';
import { Map, Home, Users, FileText, HelpCircle, ExternalLink } from 'lucide-react';

const Sitemap = () => {
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "الصفحة الرئيسية",
      icon: <Home className="h-5 w-5" />,
      links: [
        { name: "الرئيسية", url: "/", description: "الصفحة الرئيسية للموقع" },
        { name: "الخدمات", url: "/#services", description: "باقات غسيل السيارات" },
        { name: "الفروع", url: "/#branches", description: "فروع PayPass" },
        { name: "التطبيق", url: "/#app", description: "تحميل التطبيق" }
      ]
    },
    {
      title: "عن الشركة",
      icon: <Users className="h-5 w-5" />,
      links: [
        { name: "من نحن", url: "/about-us", description: "معلومات عن شركة PayPass" },
        { name: "فريق العمل", url: "/team", description: "فريق العمل والقيادة" },
        { name: "الوظائف الشاغرة", url: "/careers", description: "فرص العمل المتاحة" },
        { name: "الأخبار والتحديثات", url: "/news", description: "آخر الأخبار والتطورات" },
        { name: "الشركاء", url: "/partners", description: "شركاؤنا الاستراتيجيون" },
        { name: "الشهادات والجوائز", url: "/awards", description: "إنجازاتنا والاعترافات" }
      ]
    },
    {
      title: "الخدمات والدعم",
      icon: <HelpCircle className="h-5 w-5" />,
      links: [
        { name: "مركز المساعدة", url: "/help-center", description: "مركز المساعدة والدعم" },
        { name: "الدعم الفني", url: "/technical-support", description: "حلول المشاكل التقنية" },
        { name: "الشكاوى والاقتراحات", url: "/complaints", description: "إرسال شكاوى واقتراحات" },
        { name: "الأسئلة الشائعة", url: "/faq", description: "الأسئلة المتكررة" },
        { name: "دليل الاستخدام", url: "/user-guide", description: "دليل استخدام التطبيق" }
      ]
    },
    {
      title: "المعلومات القانونية",
      icon: <FileText className="h-5 w-5" />,
      links: [
        { name: "سياسة الخصوصية", url: "/privacy-policy", description: "سياسة حماية البيانات" },
        { name: "الشروط والأحكام", url: "/terms", description: "شروط استخدام الخدمة" },
        { name: "استخدام الموقع", url: "/terms", description: "شروط استخدام الموقع" }
      ]
    },
    {
      title: "التواصل",
      icon: <ExternalLink className="h-5 w-5" />,
      links: [
        { name: "تواصل معنا", url: "/contact", description: "معلومات التواصل" },
        { name: "الفروع", url: "/#branches", description: "مواقع فروعنا" },
        { name: "الدعم الفني", url: "/technical-support", description: "الدعم التقني" }
      ]
    }
  ];

  const quickLinks = [
    { name: "حجز باقة غسيل", url: "/", description: "احجز باقة غسيل سيارتك" },
    { name: "تحميل التطبيق", url: "/#app", description: "حمل تطبيق PayPass" },
    { name: "البحث عن فرع", url: "/#branches", description: "ابحث عن أقرب فرع" },
    { name: "تسجيل الدخول", url: "/login", description: "تسجيل الدخول للحساب" },
    { name: "إنشاء حساب", url: "/register", description: "إنشاء حساب جديد" },
    { name: "تتبع الطلب", url: "/track", description: "تتبع حالة طلبك" }
  ];

  const externalLinks = [
    { name: "Google Play Store", url: "https://play.google.com", description: "تحميل التطبيق من Google Play" },
    { name: "App Store", url: "https://apps.apple.com", description: "تحميل التطبيق من App Store" },
    { name: "Facebook", url: "https://facebook.com", description: "تابعنا على Facebook" },
    { name: "Twitter", url: "https://twitter.com", description: "تابعنا على Twitter" },
    { name: "Instagram", url: "https://instagram.com", description: "تابعنا على Instagram" },
    { name: "LinkedIn", url: "https://linkedin.com", description: "تابعنا على LinkedIn" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">خريطة الموقع</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            دليل شامل لجميع صفحات وروابط موقع PayPass
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Map className="h-6 w-6 text-green-500" />
            روابط سريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <h3 className="font-bold text-gray-800 mb-1">{link.name}</h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                    <a
                      href={link.url}
                      className="block group"
                    >
                      <h3 className="font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-sm text-gray-600">{link.description}</p>
                      <div className="mt-2 text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        انقر للانتقال →
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* External Links */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ExternalLink className="h-6 w-6 text-blue-500" />
            روابط خارجية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-800">{link.name}</h3>
                  <ExternalLink className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Site Statistics */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">إحصائيات الموقع</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-green-100">صفحة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-green-100">أقسام رئيسية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-green-100">رابط</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">مضمون</div>
              <div className="text-green-100">متوافق مع الأجهزة</div>
            </div>
          </div>
        </div>

        {/* Search Functionality */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">البحث في الموقع</h2>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث في الموقع..."
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              ابحث عن أي صفحة أو خدمة في موقعنا
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">هل تحتاج مساعدة؟</h2>
          <p className="text-gray-600 mb-6">
            إذا لم تجد ما تبحث عنه، يمكنك التواصل معنا للحصول على المساعدة
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/help-center"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              مركز المساعدة
            </a>
            <a
              href="/contact"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold transition"
            >
              تواصل معنا
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            آخر تحديث: 15 يناير 2024 | جميع الروابط تعمل بشكل صحيح
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap; 