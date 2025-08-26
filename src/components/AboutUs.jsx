import React, { useEffect } from 'react';
import { Award, Users, Target, Heart, Shield, Zap, Globe, Clock, Star, TrendingUp } from 'lucide-react';
import PageHeader from './common/PageHeader';
import AnimatedCard from './common/AnimatedCard';
import '../components/common/styles.css';

const AboutUs = () => {
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "فرع واحد", label: "حالياً وقريباً في جميع أنحاء المملكة", color: "blue" },
    { icon: <Heart className="h-8 w-8" />, value: "+10K", label: "عميل راضي", color: "red" },
    { icon: <Award className="h-8 w-8" />, value: "4.9", label: "تقييم", color: "yellow" },
          { icon: <Clock className="h-8 w-8" />, value: "7-11", label: "ساعات العمل", color: "green" }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "الجودة",
      description: "نلتزم بأعلى معايير الجودة في جميع خدماتنا",
      color: "blue"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "السرعة",
      description: "خدمة سريعة وفعالة لتوفير وقتك الثمين",
      color: "yellow"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "الرعاية",
      description: "نعتني بسيارتك كما لو كانت سيارتنا",
      color: "red"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "الابتكار",
      description: "نستخدم أحدث التقنيات لتطوير خدماتنا",
      color: "green"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "بداية المشروع",
      description: "انطلاق PayPass كفكرة مبتكرة لتطوير خدمات غسيل السيارات"
    },
    {
      year: "2021",
      title: "الفرع الأول",
      description: "افتتاح أول فرع في الرياض مع نظام الباركود الذكي"
    },
    {
      year: "2022",
      title: "التوسع",
      description: "وصول عدد الفروع إلى 25 فرع في مختلف مدن المملكة"
    },
    {
      year: "2023",
      title: "التحول الرقمي",
      description: "إطلاق التطبيق الذكي مع خدمات متقدمة"
    },
    {
      year: "2024",
      title: "الريادة",
              description: "الفروع 1 و +10K عميل راضي في جميع أنحاء المملكة"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      red: "bg-red-100 text-red-600",
      yellow: "bg-yellow-100 text-yellow-600",
      green: "bg-green-100 text-green-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50" dir="rtl">
      {/* Enhanced Header */}
      <PageHeader
        title="من نحن"
        subtitle="تعرف على قصة PayPass ورحلتنا نحو الابتكار والتميز"
        icon={Award}
        stats={stats}
      />

      {/* Vision & Mission Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 my-12">
        {/* Mission Card */}
        <div className="relative bg-white rounded-2xl shadow p-8 flex-1 max-w-md flex flex-col items-center min-w-[280px]">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1" /></svg>
                </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">مهمتنا</h2>
          <p className="text-gray-600 text-center mb-4">تقديم خدمة غسيل سيارات عالية الجودة وسهلة الاستخدام، مع ضمان رضا العملاء من خلال التكنولوجيا المتطورة والخدمة المتميزة على مدار الساعة.</p>
          <button className="px-4 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold mt-auto">مهمة الشركة</button>
              </div>
        {/* Vision Card */}
        <div className="relative bg-white rounded-2xl shadow p-8 flex-1 max-w-md flex flex-col items-center min-w-[280px]">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">رؤيتنا</h2>
          <p className="text-gray-600 text-center mb-4">نسعى أن نكون الشركة الرائدة في مجال غسيل السيارات الذكي، وأن نقدم تجربة استثنائية لعملائنا من خلال الابتكار والتقنية المتطورة.</p>
          <button className="px-4 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold mt-auto">رؤية الشركة</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* Enhanced Story - green background */}
        <AnimatedCard delay="0.5s" className="bg-gradient-to-r from-green-600 to-green-400 p-8 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-6">قصتنا</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-bold text-white leading-relaxed mb-4">
                بدأت قصة PayPass في عام 2020 كفكرة بسيطة: كيف يمكننا جعل غسيل السيارات أسهل وأسرع وأكثر كفاءة؟ من خلال دمج التكنولوجيا مع الخدمة التقليدية، طورنا نظام الباركود الذكي الذي أحدث ثورة في هذا المجال.
              </p>
              <p className="font-bold text-white leading-relaxed mb-4">
                اليوم، بعد أربع سنوات من العمل الجاد والابتكار المستمر، أصبحنا الشركة الرائدة في مجال غسيل السيارات الذكي في المملكة العربية السعودية، مع فرع واحد حالياً وقريباً سوف نكون في جميع أنحاء المملكة و 10K عميل راضي.
              </p>
              <p className="font-bold text-white leading-relaxed">
                نحن نؤمن بأن المستقبل ينتمي للذكاء الاصطناعي والتكنولوجيا المتطورة، ونسعى دائماً لتطوير خدماتنا لتلبية احتياجات عملائنا المتزايدة.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-gray-800">
              <h3 className="text-xl font-bold mb-4">إنجازاتنا</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>أول شركة تستخدم نظام الباركود الذكي</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span>أفضل شركة خدمات سيارات 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>+10K عميل راضي</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-purple-500" />
                  <span>ساعات عمل مرنة في جميع الفروع</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Success Journey Timeline Section */}
        <section className="py-20 px-2" style={{background: 'linear-gradient(135deg, #181f2a 60%, #232b33 100%)'}}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-white">رحلة النجاح</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">مسيرة من التطور والنجاح على مدار السنوات</p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-500 to-green-600 h-full"></div>
                
                {/* 2020 */}
                <div className="flex items-center mb-12 flex-row">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl shadow-xl">
                      <div className="flex items-center mb-3">
                        <div className="bg-white text-green-600 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles h-6 w-6">
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                            <path d="M5 3v4"></path>
                            <path d="M19 17v4"></path>
                            <path d="M3 5h4"></path>
                            <path d="M17 19h4"></path>
                          </svg>
                        </div>
                        <span className="text-2xl font-bold text-white">2020</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">تأسيس الشركة</h3>
                      <p className="text-green-100">بداية رحلة PayPass مع أول فرع في الرياض</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white w-4 h-4 rounded-full border-4 border-green-500 shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>

                {/* 2021 */}
                <div className="flex items-center mb-12 flex-row-reverse">
                  <div className="w-1/2 pl-8 text-left">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl shadow-xl">
                      <div className="flex items-center mb-3">
                        <div className="bg-white text-green-600 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-6 w-6">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                        </div>
                        <span className="text-2xl font-bold text-white">2021</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">توسع سريع</h3>
                      <p className="text-green-100">افتتاح 10 فروع جديدة في مختلف المدن</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white w-4 h-4 rounded-full border-4 border-green-500 shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>

                {/* 2022 */}
                <div className="flex items-center mb-12 flex-row">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl shadow-xl">
                      <div className="flex items-center mb-3">
                        <div className="bg-white text-green-600 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-6 w-6">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                            <path d="M2 12h20"></path>
                          </svg>
                        </div>
                        <span className="text-2xl font-bold text-white">2022</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">إطلاق التطبيق</h3>
                      <p className="text-green-100">تطبيق ذكي لسهولة الحجز والدفع</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white w-4 h-4 rounded-full border-4 border-green-500 shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>

                {/* 2023 */}
                <div className="flex items-center mb-12 flex-row-reverse">
                  <div className="w-1/2 pl-8 text-left">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl shadow-xl">
                      <div className="flex items-center mb-3">
                        <div className="bg-white text-green-600 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-6 w-6">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        </div>
                        <span className="text-2xl font-bold text-white">2023</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">فرع واحد</h3>
                      <p className="text-green-100">حالياً وقريباً سوف نكون في جميع أنحاء المملكة</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white w-4 h-4 rounded-full border-4 border-green-500 shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>

                {/* 2024 */}
                <div className="flex items-center mb-12 flex-row">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl shadow-xl">
                      <div className="flex items-center mb-3">
                        <div className="bg-white text-green-600 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award h-6 w-6">
                            <circle cx="12" cy="8" r="6"></circle>
                            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                          </svg>
                        </div>
                        <span className="text-2xl font-bold text-white">2024</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">الجودة والتميز</h3>
                      <p className="text-green-100">حصولنا على جائزة أفضل خدمة غسيل سيارات</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="bg-white w-4 h-4 rounded-full border-4 border-green-500 shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* قيمنا الأساسية */}
        <section className="py-20 px-2 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-2" style={{fontFamily: 'Cairo, sans-serif'}}>قيمنا الأساسية</h2>
            <p className="text-gray-500 text-center mb-12 font-medium">نؤمن بقيمٍ أساسية توجه جميع قراراتنا وأعمالنا نحو التميز والابتكار</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* الاستدامة البيئية */}
              <div className="relative bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">الاستدامة البيئية</h3>
                <p className="text-gray-600 text-sm mb-4">نستخدم مواد صديقة للبيئة ونقلل من استهلاك المياه</p>
                <ul className="text-green-600 text-xs space-y-1 text-right w-full">
                  <li>مواد صديقة للبيئة <span className="ml-1">✔️</span></li>
                  <li>تقليل استهلاك المياه <span className="ml-1">✔️</span></li>
                  <li>حلول ذكية <span className="ml-1">✔️</span></li>
                </ul>
              </div>
              {/* الابتكار والتطوير */}
              <div className="relative bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
                <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">الابتكار والتطوير</h3>
                <p className="text-gray-600 text-sm mb-4">نستمر في تطوير خدماتنا باستخدام أحدث التقنيات</p>
                <ul className="text-green-600 text-xs space-y-1 text-right w-full">
                  <li>تحديث مستمر <span className="ml-1">✔️</span></li>
                  <li>تطوير الخدمات <span className="ml-1">✔️</span></li>
                  <li>حلول ذكية <span className="ml-1">✔️</span></li>
                </ul>
              </div>
              {/* الجودة والموثوقية */}
              <div className="relative bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">الجودة والموثوقية</h3>
                <p className="text-gray-600 text-sm mb-4">نلتزم بأعلى معايير الجودة في جميع خدماتنا</p>
                <ul className="text-green-600 text-xs space-y-1 text-right w-full">
                  <li>جودة عالية <span className="ml-1">✔️</span></li>
                  <li>ضمان الخدمة <span className="ml-1">✔️</span></li>
                  <li>ثقة العملاء <span className="ml-1">✔️</span></li>
                </ul>
              </div>
              {/* الاهتمام بالعملاء */}
              <div className="relative bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
                <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21C7.5 17.5 4 14.36 4 10.5 4 7.42 6.42 5 9.5 5c1.74 0 3.41 1.01 4.5 2.09C15.09 6.01 16.76 5 18.5 5 21.58 5 24 7.42 24 10.5c0 3.86-3.5 7-8 10.5z" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">الاهتمام بالعملاء</h3>
                <p className="text-gray-600 text-sm mb-4">نضع رضا العملاء في المقام الأول ونقدم أفضل تجربة ممكنة</p>
                <ul className="text-green-600 text-xs space-y-1 text-right w-full">
                  <li>ساعات عمل مرنة <span className="ml-1">✔️</span></li>
                  <li>دعم فوري <span className="ml-1">✔️</span></li>
                  <li>رضا مضمون <span className="ml-1">✔️</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Team */}
        {/* <AnimatedCard delay="0.7s" className="p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">فريق العمل</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            فريق متخصص من الخبراء والمحترفين يعملون بجد لتقديم أفضل الخدمات لعملائنا
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                أ
              </div>
              <h3 className="text-xl font-bold mb-2">أحمد محمد</h3>
              <p className="text-green-600 font-semibold">المدير التنفيذي</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                س
              </div>
              <h3 className="text-xl font-bold mb-2">سارة أحمد</h3>
              <p className="text-blue-600 font-semibold">مدير العمليات</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                م
              </div>
              <h3 className="text-xl font-bold mb-2">محمد علي</h3>
              <p className="text-purple-600 font-semibold">مدير التطوير التقني</p>
            </div>
          </div>
        </AnimatedCard> */}

        {/* Enhanced CTA */}
        <AnimatedCard delay="0.8s" className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">انضم إلينا</h2>
          <p className="text-white font-bold mb-6">
            اكتشف المزيد عن خدماتنا وجرب تجربة غسيل السيارات الذكية
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              تصفح الخدمات
            </a>
            <a
              href="/contact"
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800 transition-all duration-300 hover:scale-105"
            >
              تواصل معنا
            </a>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default AboutUs; 