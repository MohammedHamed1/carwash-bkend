import React, { useEffect, useState } from 'react';
import { Users, Car, Star, MapPin, TrendingUp, Award, Clock, Sparkles, Zap, Shield } from 'lucide-react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    branches: 0,
    rating: 0,
    cars: 0,
    customers: 0
  });

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  // تأثير العد للأرقام
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setCounters({
          branches: 1,
          rating: 4.8,
          cars: 679,
          customers: 679
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const stats = [
    {
      icon: <MapPin className="h-8 w-8" style={{ fill: 'white' }} />,
      number: counters.branches,
      suffix: "+",
      label: "فرع",
      description: "الرياض الشمال - حي الملقا",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: <Star className="h-8 w-8" style={{ fill: 'white' }} />,
      number: counters.rating,
      suffix: "",
      label: "تقييم متوسط",
      description: "من 5 نجوم",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: <Car className="h-8 w-8" style={{ fill: 'white' }} />,
      number: counters.cars,
      suffix: "+",
      label: "سيارة مغسولة",
      description: "سيارات تم غسلها",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: <Users className="h-8 w-8" style={{ fill: 'white' }} />,
      number: counters.customers,
      suffix: "+",
      label: "عميل راضي",
      description: "عملاء يثقون بنا",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    }
  ];

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" style={{ fill: 'white' }} />,
      title: "سهولة الاستخدام",
      description: "تطبيق سهل الاستخدام مع واجهة بسيطة وواضحة",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: <Award className="h-8 w-8" style={{ fill: 'white' }} />,
      title: "جودة عالية",
      description: "استخدام أحدث التقنيات والمنتجات عالية الجودة",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: <Clock className="h-8 w-8" style={{ fill: 'white' }} />,
      title: "سرعة في الأداء",
      description: "غسيل سريع في 15 دقيقة مع ضمان الجودة",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: <Shield className="h-8 w-8" style={{ fill: 'white' }} />,
      title: "ضمان الجودة",
              description: "ضمان شامل على جميع خدماتنا",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    }
  ];

  return (
    <section className="relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] flex flex-col justify-center items-center py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* خلفية متدرجة مع تأثيرات */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700"></div>
      
      {/* عناصر زخرفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/3 rounded-full -translate-x-32 -translate-y-32 blur-2xl"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* العنوان الرئيسي */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            إحصائيات مذهلة
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 text-center leading-tight">
            أرقام تتحدث عن نفسها
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium text-center max-w-4xl mx-auto px-4 leading-relaxed">
            نجاحنا يتحدث عن نفسه من خلال الأرقام والإنجازات التي حققناها
          </p>
        </div>

        {/* الإحصائيات */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 justify-center items-start mb-16 sm:mb-20 w-full max-w-6xl transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 flex flex-col items-center min-w-[160px] sm:min-w-[200px] lg:min-w-[240px] min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 relative overflow-hidden"
            >
              {/* خلفية زخرفية */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`bg-gradient-to-r ${stat.color} text-white p-4 sm:p-5 lg:p-6 rounded-2xl w-fit mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {stat.suffix}{stat.number.toLocaleString()}
              </div>
                <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 mb-2 group-hover:text-gray-600 transition-colors duration-300">
                {stat.label}
              </div>
                <div className="text-gray-500 text-sm sm:text-base group-hover:text-gray-400 transition-colors duration-300">
                {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* قسم المميزات */}
        <div className={`flex justify-center w-full transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="rounded-3xl p-8 sm:p-10 lg:p-12 max-w-5xl w-full bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
                <Zap className="w-4 h-4" />
                مميزاتنا
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
              لماذا يختار عملاؤنا PayPass؟
            </h3>
              <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
                نقدم تجربة فريدة ومميزة تجعل من غسيل السيارة متعة حقيقية
                </p>
              </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group text-center p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                >
                  {/* خلفية زخرفية */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`bg-gradient-to-r ${feature.color} text-white p-4 sm:p-5 rounded-2xl w-fit mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                      {feature.icon}
                </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.title}
                </h4>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-500 transition-colors duration-300">
                      {feature.description}
                </p>
              </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 