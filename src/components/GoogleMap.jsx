import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Star, Users, Award } from 'lucide-react';

const GoogleMap = () => {
  const [isVisible, setIsVisible] = useState(false);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const riyadhBranches = [
    {
      id: 1,
      name: 'مغسلة النقاء المطلق',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      phone: '+966 11 488 1234',
      hours: 'مفتوح على مدار الساعة',
      rating: 4.7,
      reviews: 1500,
      services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع احترافي', 'خدمة سريعة'],
      mapUrl: 'https://maps.app.goo.gl/hD3KYnFEgx9pEXBu6?g_st=iw',
      coordinates: '24.8236,46.6753'
    },
    {
      id: 2,
      name: 'مغسلة اللمسة الناعمة',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      phone: '+966 11 488 5678',
      hours: 'مفتوح على مدار الساعة',
      rating: 4.7,
      reviews: 1600,
      services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع احترافي', 'خدمة VIP'],
      mapUrl: 'https://maps.app.goo.gl/khhqHgaRFZXqELYTA?g_st=iw',
      coordinates: '24.7136,46.6753'
    },
    {
      id: 3,
      name: 'مغسلة القوة الذكية',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      phone: '+966 11 488 1234',
      hours: 'مفتوح على مدار الساعة',
      rating: 4.8,
      reviews: 1200,
      services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع احترافي', 'تعطير'],
      mapUrl: 'https://maps.app.goo.gl/uB82K6Tj8jsPmXFeA?g_st=iw',
      coordinates: '24.6236,46.6753'
    },
    {
      id: 4,
      name: 'مغسلة البريق الذهبي',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      phone: '+966 11 488 5678',
      hours: 'مفتوح على مدار الساعة',
      rating: 4.6,
      reviews: 1100,
      services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع احترافي', 'خدمة متميزة'],
      mapUrl: 'https://maps.app.goo.gl/VY5rRk7oLZ2YpSmb7?g_st=iw',
      coordinates: '24.8236,46.7753'
    }
  ];

  const getDirections = (branch) => {
    window.open(branch.mapUrl, '_blank', 'noopener,noreferrer');
  };

  const averageRating = riyadhBranches.reduce((acc, branch) => acc + branch.rating, 0) / riyadhBranches.length;
  const totalReviews = riyadhBranches.reduce((acc, branch) => acc + branch.reviews, 0);

  return (
    <section id="map" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
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
            <div className="text-3xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
            <div className="text-gray-600">متوسط التقييم</div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{totalReviews}</div>
            <div className="text-gray-600">تقييم إجمالي</div>
          </div>
        </div>



        {/* خريطة جوجل */}
        <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">خريطة فروع الرياض</h3>
            <p className="text-gray-600">استكشف مواقع فروعنا على الخريطة</p>
          </div>
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="PayPass Branches Map"
            />
          </div>
        </div>

        {/* دعوة للعمل */}
        <div className={`text-center mt-12 sm:mt-16 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              لا تجد فرعاً قريباً؟
            </h3>
            <p className="text-gray-600 mb-6">
              نحن نعمل على فتح فروع جديدة في جميع أنحاء المملكة. ابق على اطلاع بآخر التحديثات!
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Award className="w-5 h-5 ml-2" />
              اشترك في النشرة الإخبارية
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap; 