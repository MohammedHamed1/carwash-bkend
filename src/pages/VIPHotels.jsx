import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHotel, FaMapMarkerAlt, FaPhone, FaStar, FaClock, FaCar, FaShieldAlt, FaCrown, FaDirections } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import carltonImage from '../assets/كارلتون.jpeg';
import regisImage from '../assets/ريتز.jpeg';
import hiltonImage from '../assets/هيلتون.jpeg';
import karltonLogo from '../assets/karlton.png';
import regisLogo from '../assets/regis.png';
import heltonLogo from '../assets/helton.png';

const VIPHotels = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const vipHotels = [
    {
      id: 1,
      name: 'كارلتون الرياض',
      arabicName: 'كارلتون الرياض',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك فهد، العليا، الرياض',
      phone: '+966 11 463 5000',
      rating: 4.8,
      coordinates: { lat: 24.7136, lng: 46.6753 },
      mapUrl: 'https://maps.app.goo.gl/TH9R8GjccK8xHRh29?g_st=ipc',
              features: ['خدمة VIP', 'غسيل شامل', 'تلميع احترافي', 'شمع حماية', 'خدمة عملاء'],
      description: 'فندق فاخر يقدم خدمة غسيل السيارات VIP مع أحدث التقنيات والخدمة المميزة',
      workingHours: '7-11',
      image: carltonImage
    },
    {
      id: 2,
      name: 'فندق سانت ريجيس الرياض',
      arabicName: 'فندق سانت ريجيس الرياض',
      address: 'King Saud Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك سعود، العليا، الرياض',
      phone: '+966 11 211 7777',
      rating: 4.9,
      coordinates: { lat: 24.7136, lng: 46.6753 },
      mapUrl: 'https://maps.app.goo.gl/CzA8VYVkgQ16mFg4A?g_st=ipc',
      features: ['خدمة VIP', 'غسيل شامل', 'تلميع احترافي', 'شمع حماية', 'خدمة شخصية'],
      description: 'فندق خمس نجوم يقدم خدمة غسيل السيارات الفاخرة مع الاهتمام بكل التفاصيل',
      workingHours: '7-11',
      image: regisImage
    },
    {
      id: 3,
      name: 'فندق الهلتون الرياض',
      arabicName: 'فندق الهلتون الرياض',
      address: 'King Fahd Road, Al Olaya, Riyadh',
      arabicAddress: 'طريق الملك فهد، العليا، الرياض',
      phone: '+966 11 488 1234',
      rating: 4.7,
      coordinates: { lat: 24.7136, lng: 46.6753 },
      mapUrl: 'https://maps.app.goo.gl/jed6Jdz4gaL6o5Ar5?g_st=ipc',
      features: ['خدمة VIP', 'غسيل شامل', 'تلميع احترافي', 'شمع حماية', 'خدمة سريعة'],
      description: 'فندق عالمي يقدم خدمة غسيل السيارات المميزة مع ضمان الجودة العالية',
      workingHours: '7-11',
      image: hiltonImage
    }
  ];

  return (
    <>
      <Helmet>
        <title>الفنادق VIP - خدمة غسيل السيارات المميزة | PayPass</title>
        <meta name="description" content="اكتشف فنادقنا المميزة التي تقدم خدمة غسيل السيارات VIP مع أحدث التقنيات والخدمة الفاخرة" />
        <meta name="keywords" content="فنادق VIP, غسيل سيارات فاخر, كارلتون الرياض, سانت ريجيس, هلتون الرياض" />
        <meta property="og:title" content="الفنادق VIP - خدمة غسيل السيارات المميزة" />
        <meta property="og:description" content="اكتشف فنادقنا المميزة التي تقدم خدمة غسيل السيارات VIP" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/vip-hotels" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="الفنادق VIP - خدمة غسيل السيارات المميزة" />
        <meta name="twitter:description" content="اكتشف فنادقنا المميزة التي تقدم خدمة غسيل السيارات VIP" />
        <link rel="canonical" href="/vip-hotels" />
      </Helmet>

      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <PageHeader 
          title="الفنادق VIP"
          subtitle="خدمة غسيل السيارات المميزة في أفخم فنادق الرياض"
          breadcrumbs={['الرئيسية', 'الباقات', 'الفنادق VIP']}
        />

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Branch Selection Button - Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-3xl p-6">
              <div className="flex items-center justify-center mb-3">
                <FaCrown className="w-6 h-6 text-yellow-600 mr-2" style={{ fill: 'white' }} />
                <h3 className="text-xl font-bold text-gray-800">جاهز لاختيار الفرع؟</h3>
              </div>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                بعد اختيار الفندق، يمكنك الآن اختيار الفرع المناسب لك والحصول على QR كود VIP
              </p>
              <button
                onClick={() => navigate('/vip-branch-selection')}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                <FaCar className="w-4 h-4" style={{ fill: 'white' }} />
                <span>اختيار الفرع الآن</span>
                <FaDirections className="w-4 h-4" style={{ fill: 'white' }} />
              </button>
            </div>
          </motion.div>

          {/* مقدمة VIP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full inline-flex items-center gap-3 mb-6">
              <FaCrown className="w-6 h-6" style={{ fill: 'white' }} />
              <span className="font-bold text-lg">خدمة VIP حصرية</span>
              <FaCrown className="w-6 h-6" style={{ fill: 'white' }} />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              فنادقنا المميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نقدم خدمة غسيل السيارات VIP في أفخم فنادق الرياض مع أحدث التقنيات والخدمة المميزة
            </p>
          </motion.div>

          {/* قائمة الفنادق */}
          <div className="grid lg:grid-cols-3 gap-8">
            {vipHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* صورة الفندق */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.arabicName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    VIP
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 flex items-center gap-1">
                    <FaStar className="w-4 h-4 text-yellow-500" style={{ fill: 'white' }} />
                    {hotel.rating}
                  </div>
                </div>

                {/* محتوى الفندق */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{hotel.arabicName}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{hotel.description}</p>

                  {/* المميزات */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <FaShieldAlt className="text-green-500" style={{ fill: 'white' }} />
                      المميزات
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.features.map((feature, idx) => (
                        <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* معلومات الاتصال */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaMapMarkerAlt className="w-4 h-4 text-green-500" style={{ fill: 'white' }} />
                      <span className="text-sm">{hotel.arabicAddress}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaPhone className="w-4 h-4 text-green-500" style={{ fill: 'white' }} />
                      <span className="text-sm">{hotel.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaClock className="w-4 h-4 text-green-500" style={{ fill: 'white' }} />
                      <span className="text-sm">{hotel.workingHours}</span>
                    </div>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex gap-3">
                    <a
                      href={hotel.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-2xl font-bold text-center hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaDirections className="w-4 h-4" style={{ fill: 'white' }} />
                      فتح الخريطة
                    </a>
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-2xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2">
                      <FaCar className="w-4 h-4" style={{ fill: 'white' }} />
                      حجز خدمة
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* لوجوهات الفنادق */}
          <div className="flex flex-wrap justify-center items-center gap-8 my-12">
            <img src={karltonLogo} alt="شعار كارلتون الرياض" className="h-20 w-auto object-contain" />
            <img src={regisLogo} alt="شعار سانت ريجيس الرياض" className="h-20 w-auto object-contain" />
            <img src={heltonLogo} alt="شعار هيلتون الرياض" className="h-20 w-auto object-contain" />
          </div>

          {/* معلومات إضافية */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">لماذا تختار خدمة VIP؟</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <FaCrown className="w-5 h-5 text-yellow-300" style={{ fill: 'white' }} />
                      <span>خدمة حصرية في أفخم الفنادق</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaShieldAlt className="w-5 h-5 text-yellow-300" style={{ fill: 'white' }} />
                      <span>جودة عالية وضمان شامل</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaClock className="w-5 h-5 text-yellow-300" style={{ fill: 'white' }} />
                      <span>خدمة عملاء متاحة</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCar className="w-5 h-5 text-yellow-300" style={{ fill: 'white' }} />
                      <span>تقنيات حديثة ومتطورة</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                    <FaHotel className="w-16 h-16 text-white mx-auto mb-4" style={{ fill: 'white' }} />
                    <h4 className="text-xl font-bold mb-2">3 فنادق فاخرة</h4>
                    <p className="text-white/90">في أفضل مواقع الرياض</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </>
  );
};

export default VIPHotels; 