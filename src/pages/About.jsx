import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaGlobe, FaAward, FaHeart, FaLightbulb, FaShieldAlt, FaChartLine, FaCar, FaStar, FaCheckCircle, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const About = () => {
  const [activeYear, setActiveYear] = useState(2024);
  const [counter, setCounter] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: 10000, suffix: '+', label: 'عميل راضٍ', icon: FaUsers, color: 'from-blue-500 to-blue-600' },
    { number: 100000, suffix: '+', label: 'غسلة مكتملة', icon: FaCar, color: 'from-green-500 to-green-600' },
    { number: 8, suffix: '+', label: 'سنوات خبرة', icon: FaAward, color: 'from-purple-500 to-purple-600' },
    { number: 1, suffix: '', label: 'فرع', icon: FaHeart, color: 'from-red-500 to-red-600' }
  ];

  const timeline = [
    {
      year: 2016,
      title: 'بداية الرحلة',
      description: 'تأسيس شركة غسيل السيارات مع رؤية واضحة لتحويل تجربة غسيل السيارات'
    },
    {
      year: 2018,
      title: 'إطلاق أول فرع',
      description: 'افتتاح أول فرع في الرياض مع أحدث تقنيات الغسيل الآلي'
    },
    {
      year: 2020,
      title: 'التوسع في الرياض',
      description: 'افتتاح 4 فروع في الرياض مع خدمة غسيل متطورة'
    },
    {
      year: 2022,
      title: 'التحول الرقمي',
      description: 'إطلاق تطبيق ذكي لحجز خدمات الغسيل عبر الهاتف'
    },
    {
      year: 2023,
      title: 'خدمات VIP',
      description: 'إطلاق خدمات VIP مع تلميع احترافي وشمع حماية'
    },
    {
      year: 2024,
      title: 'الريادة في القطاع',
      description: 'تصبح الشركة رائدة في مجال غسيل السيارات في الرياض'
    }
  ];

  const values = [
    {
      icon: FaHeart,
      title: 'الاهتمام بالعملاء',
      description: 'نضع عملاءنا في قلب كل قرار نتخذه ونضمن رضاهم التام',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FaLightbulb,
      title: 'الابتكار المستمر',
      description: 'نبحث دائماً عن أحدث تقنيات الغسيل والتلميع',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: FaShieldAlt,
      title: 'الأمان والموثوقية',
      description: 'نضمن جودة عالية في كل غسلة مع ضمان شامل',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaUsers,
      title: 'العمل الجماعي',
      description: 'فريق متخصص من الخبراء في مجال غسيل السيارات',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaChartLine,
      title: 'التميز في الأداء',
      description: 'نسعى دائماً للتميز في جودة الخدمة والسرعة',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaGlobe,
      title: 'التأثير الإيجابي',
      description: 'نساهم في الحفاظ على البيئة باستخدام مواد صديقة للبيئة',
      color: 'from-teal-500 to-teal-600'
    }
  ];



  const achievements = [
    {
      icon: FaStar,
      title: 'أفضل شركة غسيل سيارات',
      description: 'حصلنا على جائزة أفضل شركة غسيل سيارات في الرياض 2024',
      year: '2024'
    },
    {
      icon: FaAward,
      title: 'شهادة الجودة ISO',
      description: 'حصلنا على شهادة الجودة الدولية ISO 9001:2015',
      year: '2023'
    },
    {
      icon: FaUsers,
              title: '10K+ عميل راضي',
              description: 'أكثر من 10K عميل راضي مع تقييم 4.9/5 نجوم',
      year: '2024'
    },
    {
      icon: FaCheckCircle,
      title: 'ضمان الجودة الشامل',
      description: 'نقدم ضمان شامل على جميع خدماتنا',
      year: '2024'
    }
  ];

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    setTimeout(() => setClickedItem(null), 1000);
  };

  return (
    <>
      <Helmet>
        <title>من نحن - شركة غسيل السيارات الرائدة في الرياض | خدمات غسيل وتلميع احترافية</title>
                        <meta name="description" content="تعرف على شركتنا الرائدة في غسيل السيارات في الرياض. 8 سنوات خبرة، 10K+ عميل راضي، خدمات غسيل وتلميع احترافية مع ضمان الجودة." />
        <meta name="keywords" content="غسيل سيارات الرياض, تلميع سيارات, شمع حماية, خدمات VIP, شركة غسيل سيارات, غسيل سيارات احترافي" />
        <meta property="og:title" content="من نحن - شركة غسيل السيارات الرائدة في الرياض" />
        <meta property="og:description" content="تعرف على شركتنا الرائدة في غسيل السيارات في الرياض. خدمات احترافية مع ضمان الجودة." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
      </Helmet>

      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <PageHeader 
          title="من نحن"
          subtitle="نحن شركة رائدة في مجال غسيل السيارات في الرياض"
          breadcrumbs={['الرئيسية', 'من نحن']}
        />

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  نحن نقود
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"> مستقبل غسيل السيارات</span>
                </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    منذ عام 2016، كنا في طليعة ثورة غسيل السيارات في الرياض. 
                    نقدم خدمات غسيل وتلميع احترافية بأحدث التقنيات وأعلى معايير الجودة.
                  </p>
                </div>

                {/* الإحصائيات السريعة */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(0, 4).map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                        <stat.icon className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-1">
                        {stat.number.toLocaleString()}{stat.suffix}
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                  >
                    احجز الآن
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all duration-300"
                  >
                    تعرف على خدماتنا
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto">
                      <FaCar className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold">خدماتنا المميزة</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="w-5 h-5 text-green-300" />
                        <span>غسيل خارجي وداخلي شامل</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="w-5 h-5 text-green-300" />
                        <span>تلميع احترافي</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="w-5 h-5 text-green-300" />
                        <span>شمع حماية</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="w-5 h-5 text-green-300" />
                        <span>خدمة VIP متميزة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* الإنجازات */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">إنجازاتنا</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نحن فخورون بإنجازاتنا وثقة عملائنا الكرام
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
              <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <achievement.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{achievement.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{achievement.description}</p>
                  <div className="text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      {achievement.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* القيم */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">قيمنا</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                قيمنا هي الأساس الذي نبني عليه نجاحنا وثقة عملائنا
                </p>
              </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
              <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <value.icon className="w-8 h-8" />
                </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* الجدول الزمني */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">رحلة النجاح</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مسيرة 8 سنوات من التطور والنجاح في مجال غسيل السيارات
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-green-500 to-emerald-600"></div>
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
                        <div className="text-3xl font-bold text-green-600 mb-3">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* معلومات الاتصال */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">تواصل معنا</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نحن هنا لخدمتك في أي وقت
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaMapMarkerAlt className="w-8 h-8" />
                  </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">العنوان</h3>
                <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                <p className="text-gray-600">4 فروع في الرياض</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaPhone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">الهاتف</h3>
                <p className="text-gray-600">+966 50 123 4567</p>
                <p className="text-gray-600">فرع</p>
            </motion.div>

                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaEnvelope className="w-8 h-8" />
                  </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@carwash.com</p>
                <p className="text-gray-600">support@carwash.com</p>
                </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About; 