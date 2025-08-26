import React, { useState, useEffect } from 'react';
import { MapPin, Star, Users } from 'lucide-react';

const BranchesHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-200/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <MapPin className="w-4 h-4" />
            فروع الرياض
            <MapPin className="w-4 h-4" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            موقع فروعنا
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشف أقرب فرع لك واحصل على الاتجاهات المباشرة
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">1</div>
            <div className="text-gray-600">فرع في الرياض</div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.7</div>
            <div className="text-gray-600">متوسط التقييم</div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">5400</div>
            <div className="text-gray-600">تقييم إجمالي</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesHeader; 