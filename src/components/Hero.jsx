import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Star, CheckCircle, Car, Clock, MapPin, Smartphone, Download, QrCode, Timer, Check
} from 'lucide-react';
import logo from '../assets/logo.png';
import googlePlayBadge from '../assets/google-play-badge.png';
import appStoreBadge from '../assets/app-store-badge.png';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 overflow-hidden">
      {/* المحتوى الرئيسي */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16 min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-12rem)]">
          
          {/* النص الرئيسي - على اليسار */}
          <div className="flex-1 text-center lg:text-right order-2 lg:order-1 w-full max-w-2xl lg:max-w-none">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              
              {/* العنوان الرئيسي */}
              <div className="relative mb-4 sm:mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-blue-100/50 rounded-3xl blur-xl transform scale-105 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative p-3 sm:p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200/50 group-hover:shadow-3xl group-hover:border-green-300/50 transition-all duration-500">
                  <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-2">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                      <Car className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                      <span className="block text-green-600 mb-1 sm:mb-2 md:mb-3 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300 animate-pulse">غسيل السيارات</span>
                      <span className="block text-gray-800 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300">الذكي مع PayPass</span>
                    </h1>
                  </div>
                  {/* شريط مميز تحت العنوان */}
                  <div className="flex justify-center lg:justify-start mt-2 sm:mt-4">
                    <div className="h-1 w-24 sm:w-32 md:w-48 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg group-hover:w-32 sm:group-hover:w-40 md:group-hover:w-56 transition-all duration-500 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* الوصف */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                استمتع بتجربة غسيل سيارات ذكية ومتطورة. حجز سريع، تتبع مباشر، وخدمة عالية الجودة
              </p>
              
              {/* المميزات السريعة */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                <div className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 shadow-lg border border-green-200">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" style={{ fill: 'white' }} />
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">حجز فوري</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 shadow-lg border border-green-200">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" style={{ fill: 'white' }} />
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">تتبع مباشر</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 shadow-lg border border-green-200">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" style={{ fill: 'white' }} />
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">جودة عالية</span>
                </div>
              </div>
                  
              {/* الأزرار */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                <Link 
                  to="/packages" 
                  className="group bg-green-500 hover:bg-green-600 text-white font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 md:gap-3"
                  style={{ backgroundColor: '#22c55e' }}
                >
                  <span>احجز الآن</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" style={{ fill: 'white' }} />
                </Link>
                
                <Link 
                  to="/about" 
                  className="group bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-green-200 hover:border-green-300 flex items-center justify-center gap-1 sm:gap-2 md:gap-3"
                >
                  <span>اعرف المزيد</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" style={{ fill: 'white' }} />
                </Link>
              </div>
                  
              {/* إحصائيات سريعة */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-1">10K+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">عميل راضي</div>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-600 mb-1">فرع واحد</div>
                  <div className="text-xs sm:text-sm text-gray-600">حالياً وقريباً في جميع أنحاء المملكة</div>
                </div>
              </div>
            </div>
                  </div>

          {/* بطاقة التطبيق الجديدة - على اليمين */}
          <div className="flex-1 flex justify-center items-center w-full max-w-sm sm:max-w-lg xl:max-w-xl order-1 lg:order-2 px-2 sm:px-4">
            <div className={`relative group w-full max-w-sm sm:max-w-md xl:max-w-lg transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="app-card relative bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-0 transform transition-all duration-500 hover:shadow-2xl sm:hover:shadow-3xl hover:scale-105 overflow-hidden">
                
                {/* القسم العلوي الأخضر */}
                <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 p-4 sm:p-6 md:p-8 text-center">
                  {/* المحتوى */}
                  <div className="relative z-10">
                    {/* أيقونة الهاتف */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/50 shadow-lg">
                        <img src={logo} alt="PayPass Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" />
                      </div>
                    </div>
                    
                    {/* اسم التطبيق */}
                    <h3 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">PAYPASS</h3>
                    
                    {/* العنوان الرئيسي */}
                    <h4 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2">تطبيق PayPass</h4>
                    
                    {/* النص الفرعي */}
                    <p className="text-green-100 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">متوفر على Android و iOS</p>
                    
                    {/* أزرار التحميل */}
                    <div className="flex flex-col items-center sm:flex-row gap-1 sm:gap-2 justify-center mt-3 sm:mt-4">
                      <a 
                        href="https://apps.apple.com/app/paypass/id1234567890" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img src={appStoreBadge} alt="Download on the App Store" className="h-5 sm:h-6 md:h-7" />
                      </a>
                      <a 
                        href="https://play.google.com/store/apps/details?id=com.paypass.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img src={googlePlayBadge} alt="Get it on Google Play" className="h-5 sm:h-6 md:h-7" />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* القسم الأوسط - المميزات */}
                <div className="p-4 sm:p-6 md:p-8 bg-white">
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    {/* الميزة الأولى */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="flex-1 text-right">
                        <h5 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">شراء الباقات بسهولة</h5>
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base">اشتر باقتك المفضلة بضغطة واحدة</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" style={{ fill: 'white' }} />
                      </div>
                    </div>
                    
                    {/* الميزة الثانية */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="flex-1 text-right">
                        <h5 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">مسح QR Code سريع</h5>
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base">امسح الكود واستمتع بالخدمة فورا</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <QrCode className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" style={{ fill: 'white' }} />
                      </div>
                    </div>
                    
                    {/* الميزة الثالثة */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="flex-1 text-right">
                        <h5 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">تتبع الغسلات المتبقية</h5>
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base">اعرف عدد الغسلات والأيام المتبقية</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Timer className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" style={{ fill: 'white' }} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* القسم السفلي */}
                <div className="p-3 sm:p-4 md:p-6 bg-green-50">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" style={{ fill: 'white' }} />
                    </div>
                    <span className="text-green-700 font-semibold text-sm sm:text-base md:text-lg">متوافق مع جميع الأجهزة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 