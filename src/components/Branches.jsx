import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Car, Navigation, Star, Users, Sparkles, Zap, Map, Building2, Calendar } from 'lucide-react';

const cities = [
  { name: 'الرياض', key: 'riyadh', available: true },
  { name: 'جدة', key: 'jeddah', available: false },
  { name: 'الدمام', key: 'dammam', available: false },
  { name: 'مكة', key: 'makkah', available: false },
  { name: 'المدينة', key: 'madinah', available: false },
];

const branchesData = {
  riyadh: [
    {
      id: 1,
      name: 'مغسلة النقاء المطلق',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      phone: '+966 11 488 1234',
      hours: 'مفتوح على مدار الساعة',
      rating: 4.7,
      customers: 1500,
      services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع احترافي', 'خدمة سريعة'],
      directions: 'https://maps.app.goo.gl/hD3KYnFEgx9pEXBu6?g_st=iw',
    },
    {
      id: 2,
      name: 'مغسلة اللمسة الناعمة',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      phone: '+966 11 488 5678',
      hours: 'مفتوح على مدار الساعة',
      rating: 4.7,
      customers: 1600,
      services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع احترافي', 'خدمة VIP'],
      directions: 'https://maps.app.goo.gl/khhqHgaRFZXqELYTA?g_st=iw',
    },
    {
      id: 3,
      name: 'مغسلة القوة الذكية',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      phone: '+966 11 488 1234',
      hours: 'مفتوح على مدار الساعة',
      rating: 4.8,
      customers: 1200,
      services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع احترافي', 'تعطير'],
      directions: 'https://maps.app.goo.gl/uB82K6Tj8jsPmXFeA?g_st=iw',
    },
    {
      id: 4,
      name: 'مغسلة البريق الذهبي',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      phone: '+966 11 488 5678',
      hours: 'مفتوح على مدار الساعة',
      rating: 4.6,
      customers: 1100,
      services: ['غسيل خارجي', 'غسيل داخلي', 'تلميع احترافي', 'خدمة متميزة'],
      directions: 'https://maps.app.goo.gl/VY5rRk7oLZ2YpSmb7?g_st=iw',
    }
  ],
};

const ComingSoonCard = ({ city }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100 text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
    {/* خلفية زخرفية */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-all duration-500"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-all duration-500"></div>
    
    <div className="relative z-10">
      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
        <Building2 className="w-10 h-10" style={{ fill: 'white' }} />
      </div>
      
             <h3 className="text-xl font-bold text-gray-900 mb-4">{city}</h3>
      
       <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold mb-4 inline-block">
         قريباً جداً
       </div>
      
       <p className="text-gray-600 text-base mb-6 leading-relaxed">
         نحن نعمل بجد لإفتتاح فروعنا في {city} قريباً جداً
       </p>
      
      <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ fill: 'white' }} />
          <span>قريباً</span>
        </div>
        <div className="flex items-center gap-2">
                          <Map className="w-4 h-4" style={{ fill: 'white' }} />
          <span>مواقع مميزة</span>
        </div>
      </div>
      
      <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
        <p className="text-green-700 font-semibold text-sm">
          🎉 انتظرونا قريباً! نحن قادمون إلى {city}
        </p>
      </div>
    </div>
  </div>
);

const BranchCard = ({ branch }) => (
  <div className="group bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col gap-3 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
    {/* خلفية زخرفية */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">{branch.name}</h3>
        <span className="flex items-center gap-1 text-green-500 font-bold bg-green-50 px-3 py-1 rounded-full">
        <Star className="w-4 h-4 ml-1" style={{ fill: 'white' }} />
        {branch.rating}
      </span>
    </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 text-green-600 ml-2" style={{ fill: 'white' }} />
          <span className="line-clamp-2">{branch.address}</span>
    </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Phone className="w-4 h-4 text-green-600 ml-2" style={{ fill: 'white' }} />
          <a href={`tel:${branch.phone}`} className="hover:text-green-700 transition-colors duration-300">
        {branch.phone}
      </a>
    </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock className="w-4 h-4 text-green-600 ml-2" style={{ fill: 'white' }} />
      {branch.hours}
    </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Users className="w-4 h-4 text-green-600 ml-2" style={{ fill: 'white' }} />
      +{branch.customers} عميل
    </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
      {branch.services.map((service, i) => (
        <span
          key={i}
            className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs rounded-full font-medium border border-green-200"
        >
          {service}
        </span>
      ))}
    </div>
      
      <div className="flex gap-3 mt-auto">
      <a
        href={branch.directions}
        target="_blank"
        rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Navigation className="w-4 h-4" style={{ fill: 'white' }} />
        الاتجاهات
      </a>
      <a
        href="#"
          className="flex-1 border-2 border-green-500 text-green-700 py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
      >
        <Car className="w-4 h-4" style={{ fill: 'white' }} />
        احجز الآن
      </a>
      </div>
    </div>
  </div>
);

const InteractiveMap = () => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8">
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
        <Map className="w-4 h-4" style={{ fill: 'white' }} />
        خريطة تفاعلية
        <Map className="w-4 h-4" style={{ fill: 'white' }} />
      </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-4">موقع فروعنا</h3>
       <p className="text-gray-600 text-base">انقر على أي فرع لرؤية التفاصيل والاتجاهات</p>
    </div>
    
    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-emerald-200/30 to-transparent rounded-full translate-x-32 translate-y-32"></div>
      
      <div className="relative z-10 bg-white rounded-3xl p-8 shadow-xl">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
          <MapPin className="h-16 w-16 text-green-600 mx-auto mb-6" style={{ fill: 'white' }} />
                     <h4 className="text-xl font-bold text-gray-900 mb-4">خريطة تفاعلية</h4>
           <p className="text-gray-600 mb-6 text-base">اكتشف فروعنا في الرياض وابحث عن أقرب فرع إليك</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
            <Map className="w-5 h-5" style={{ fill: 'white' }} />
              فتح Google Maps
            </a>
        </div>
      </div>
    </div>
  </div>
);

const Branches = () => {
  const [selectedCity, setSelectedCity] = useState('riyadh');
  const [showMap, setShowMap] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const branches = branchesData[selectedCity] || [];
  const selectedCityData = cities.find(city => city.key === selectedCity);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // تعديل الإحصائيات لتتوافق مع 4 فروع
  const branchStats = {
    count: 4,
    rating: 4.7,
    customers: 5400
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-200/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" style={{ fill: 'white' }} />
            فروعنا
            <Sparkles className="w-4 h-4" style={{ fill: 'white' }} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            فروعنا
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            اكتشف فروعنا المنتشرة في جميع أنحاء المملكة العربية السعودية
          </p>
        </div>
        {/* إحصائيات */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-8 h-8" style={{ fill: 'white', stroke: 'white' }} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{branchStats.count}</div>
            <div className="text-gray-600">فرع في الرياض</div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-8 h-8" style={{ fill: 'white' }} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{branchStats.rating}</div>
            <div className="text-gray-600">متوسط التقييم</div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8" style={{ fill: 'white' }} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">+{branchStats.customers}</div>
            <div className="text-gray-600">تقييم إجمالي</div>
          </div>
        </div>
        {/* أزرار المدن */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button
            key="riyadh"
            className="px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
            disabled
          >
            الرياض
          </button>
          <button
            key="jeddah"
            className="px-8 py-4 rounded-2xl font-bold bg-gray-300 text-gray-600 shadow-lg cursor-not-allowed"
            disabled
          >
            جدة قريباً
          </button>
          <button
            key="dammam"
            className="px-8 py-4 rounded-2xl font-bold bg-gray-300 text-gray-600 shadow-lg cursor-not-allowed"
            disabled
          >
            الدمام قريباً
          </button>
          <button
            key="mecca"
            className="px-8 py-4 rounded-2xl font-bold bg-gray-300 text-gray-600 shadow-lg cursor-not-allowed"
            disabled
          >
            مكة قريباً
          </button>
            <button
            key="medina"
            className="px-8 py-4 rounded-2xl font-bold bg-gray-300 text-gray-600 shadow-lg cursor-not-allowed"
            disabled
          >
            المدينة قريباً
            </button>
        </div>
        {/* زر الخريطة */}
        <div className={`text-center mb-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button
            onClick={() => setShowMap(!showMap)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Map className="w-5 h-5" style={{ fill: 'white' }} />
            عرض الخريطة التفاعلية
          </button>
        </div>
        {/* المحتوى */}
        <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {showMap ? (
          <InteractiveMap />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {branches.length > 0 ? (
              branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                لا توجد فروع متاحة في هذه المدينة حالياً.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default Branches; 