import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Car, Navigation, Star, Users, Sparkles, Map } from 'lucide-react';

const SingleBranch = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const branchData = {
    name: 'الفرع الإداري - الرياض',
    address: 'الرياض، المملكة العربية السعودية',
    phone: '+966 11 488 9999',
    hours: 'الأحد - الخميس: 8:00 ص - 6:00 م',
    rating: 4.9,
    customers: 1200,
    services: ['إدارة عامة', 'خدمة العملاء', 'الدعم الفني', 'التطوير', 'التسويق'],
    directions: 'https://maps.app.goo.gl/hD3KYnFEgx9pEXBu6?g_st=iw',
    description: 'الفرع الإداري الرئيسي في الرياض، حيث يتم إدارة جميع العمليات وتطوير الخدمات وتقديم الدعم الشامل للفروع والعملاء.',
    features: [
      'إدارة مركزية متطورة',
      'فريق إداري محترف',
      'خدمة عملاء',
      'تطوير مستمر للخدمات',
      'إدارة الجودة الشاملة'
    ]
  };

  return (
    <section className="relative py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-200/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" style={{ fill: 'white' }} />
            الفرع الإداري
            <Sparkles className="w-4 h-4" style={{ fill: 'white' }} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            الفرع الإداري - الرياض
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {branchData.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* تفاصيل الفرع */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden">
              {/* خلفية زخرفية */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{branchData.name}</h3>
                  <span className="flex items-center gap-1 text-green-500 font-bold bg-green-50 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 ml-1" style={{ fill: 'white' }} />
                    {branchData.rating}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 text-green-600 ml-3" style={{ fill: 'white' }} />
                    <span className="text-lg">{branchData.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 text-green-600 ml-3" style={{ fill: 'white' }} />
                    <a href={`tel:${branchData.phone}`} className="text-lg hover:text-green-700 transition-colors duration-300">
                      {branchData.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 text-green-600 ml-3" style={{ fill: 'white' }} />
                    <span className="text-lg">{branchData.hours}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 text-green-600 ml-3" style={{ fill: 'white' }} />
                    <span className="text-lg">+{branchData.customers} عميل راضي</span>
                  </div>
                </div>

                                 <div className="mb-8">
                   <h4 className="text-xl font-bold text-gray-900 mb-4">الخدمات الإدارية</h4>
                   <div className="flex flex-wrap gap-3">
                     {branchData.services.map((service, index) => (
                       <span
                         key={index}
                         className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full font-medium border border-green-200"
                       >
                         {service}
                       </span>
                     ))}
                   </div>
                 </div>

                <div className="flex gap-4">
                  <a
                    href={branchData.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Navigation className="w-5 h-5" style={{ fill: 'white' }} />
                    الاتجاهات
                  </a>
                  <a
                    href="#"
                    className="flex-1 border-2 border-green-500 text-green-700 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <Car className="w-5 h-5" style={{ fill: 'white' }} />
                    احجز الآن
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* المميزات والخريطة */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="space-y-8">
                             {/* المميزات */}
               <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                 <h4 className="text-xl font-bold text-gray-900 mb-6">مميزات الفرع الإداري</h4>
                <div className="space-y-4">
                  {branchData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* الخريطة المصغرة */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
                    <Map className="w-4 h-4" style={{ fill: 'white' }} />
                    موقع الفرع
                    <Map className="w-4 h-4" style={{ fill: 'white' }} />
                  </div>
                                     <h4 className="text-xl font-bold text-gray-900 mb-2">الفرع الإداري - الرياض</h4>
                   <p className="text-gray-600">اكتشف موقع فرعنا الإداري</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 text-center">
                  <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" style={{ fill: 'white' }} />
                                     <p className="text-gray-700 mb-4 font-medium">الفرع الإداري - الرياض</p>
                  <a
                    href={branchData.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Map className="w-4 h-4" style={{ fill: 'white' }} />
                    فتح في الخريطة
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBranch; 