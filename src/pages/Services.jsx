import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaBolt, FaCar, FaShieldAlt, FaClock, FaStar, FaUsers, FaMapMarkerAlt, FaCheckCircle, FaTools, FaLeaf, FaAward, FaPhone, FaEnvelope, FaWhatsapp, FaRocket, FaGem, FaMagic, FaHeart, FaCrown, FaGift } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Services = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    setIsVisible(true);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setAnimateElements(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const services = [
    {
      id: 'basic',
      title: 'غسيل أساسي',
      description: 'غسيل خارجي شامل للسيارة',
      duration: '15 دقيقة',
      features: [
        'غسيل خارجي شامل',
        'تجفيف بالهواء الساخن',
        'تنظيف الزجاج',
        'معطر داخلي مجاني'
      ],
      icon: FaCar,
      color: 'from-green-500 to-emerald-600',
      popular: false
    },
    {
      id: 'advanced',
      title: 'غسيل متقدم',
      description: 'غسيل خارجي وداخلي شامل',
      duration: '30 دقيقة',
      features: [
        'غسيل خارجي شامل',
        'غسيل داخلي شامل',
        'تنظيف المقاعد',
        'معطر داخلي فاخر',
        'تجفيف شامل'
      ],
      icon: FaStar,
      color: 'from-green-500 to-green-600',
      popular: false
    },
    {
      id: 'premium',
      title: 'غسيل مميز',
      description: 'غسيل شامل مع تلميع',
      duration: '45 دقيقة',
      features: [
        'غسيل خارجي وداخلي',
        'تلميع خارجي',
        'معطر داخلي فاخر',
        'تنظيف المحرك',
        'خدمة VIP'
      ],
      icon: FaCrown,
      color: 'from-green-500 to-emerald-600',
      popular: true
    },
    {
      id: 'vip',
      title: 'خدمة VIP',
      description: 'خدمة شاملة مع شمع حماية',
      duration: '60 دقيقة',
      features: [
        'غسيل شامل شامل',
        'تلميع احترافي',
        'شمع حماية',
        'معطر داخلي فاخر',
        'خدمة VIP متميزة',
        'ضمان الجودة'
      ],
      icon: FaGift,
      color: 'from-green-500 to-emerald-600',
      popular: false
    }
  ];

  const whyChooseUs = [
    {
      icon: FaShieldAlt,
      title: 'جودة عالية',
      description: 'نستخدم أفضل المواد الإيطالية وأحدث التقنيات',
      color: 'from-green-500 to-green-600',
      features: [
        'مواد إيطالية عالية الجودة',
        'تقنيات حديثة ومتطورة',
        'فريق مدرب ومحترف'
      ]
    },
    {
      icon: FaClock,
      title: 'سرعة في الأداء',
      description: 'خدمة سريعة وفعالة في أقل وقت ممكن',
      color: 'from-green-500 to-emerald-600',
      features: [
        'غسيل سريع خلال 15 دقيقة',
        'خدمة متميزة متاحة',
        'حجز فوري وسهل'
      ]
    },
    {
      icon: FaStar,
      title: 'رضا العملاء',
              description: 'أكثر من 10K عميل راضي يثقون بنا',
      color: 'from-green-500 to-emerald-600',
      features: [
        '99% رضا العملاء',
        'ضمان الجودة',
        'خدمة عملاء متميزة'
      ]
    }
  ];

  const stats = [
    { number: 10000, suffix: '+', label: 'عميل راضي', icon: FaUsers },
    { number: 100000, suffix: '+', label: 'غسلة مكتملة', icon: FaCar },
    { number: 8, suffix: '+', label: 'سنوات خبرة', icon: FaAward },
    { number: 1, suffix: '', label: 'فرع', icon: FaHeart }
  ];

  return (
    <>
      <Helmet>
        <title>خدماتنا - شركة غسيل السيارات في الرياض | غسيل وتلميع احترافي</title>
        <meta name="description" content="خدمات غسيل السيارات الاحترافية في الرياض. غسيل أساسي، متقدم، مميز، وخدمة VIP مع تلميع وشمع حماية. احجز الآن!" />
        <meta name="keywords" content="غسيل سيارات الرياض, تلميع سيارات, شمع حماية, خدمات VIP, غسيل سيارات احترافي, غسيل سيارات شامل" />
        <meta property="og:title" content="خدماتنا - شركة غسيل السيارات في الرياض" />
        <meta property="og:description" content="خدمات غسيل السيارات الاحترافية في الرياض مع تلميع وشمع حماية" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/services" />
      </Helmet>

      <div className="header-spacer"></div>
      
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="خدماتنا المميزة"
          subtitle="مجموعة شاملة من خدمات غسيل السيارات عالية الجودة بأحدث التقنيات"
          breadcrumbs={['الرئيسية', 'الخدمات']}
        />
      </div>
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Hero Section */}
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                خدماتنا
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"> المميزة</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                نقدم مجموعة شاملة من خدمات غسيل السيارات بأحدث التقنيات وأعلى معايير الجودة
              </p>
            </motion.div>

            {/* الإحصائيات */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.number.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* الخدمات */}
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">خدماتنا</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                اختر الخدمة المناسبة لسيارتك من مجموعة خدماتنا المتنوعة
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    service.popular ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        الأكثر طلباً
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="text-sm text-gray-500 mb-6">مدة الخدمة: {service.duration}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-sm text-gray-600">
                        <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    احجز الآن
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* لماذا تختارنا؟ */}
          <section className="py-20 bg-gradient-to-r from-gray-50 to-white rounded-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">لماذا تختارنا؟</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                نقدم أفضل خدمات غسيل السيارات بأحدث التقنيات
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">{item.description}</p>
                  <ul className="space-y-3">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-sm text-gray-600">
                        <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* دعوة للعمل */}
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">احجز خدمتك الآن!</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  خدمة غسيل سيارات احترافية بأسعار تنافسية
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-green-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    احجز الآن
                  </button>
                  <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105">
                    تواصل معنا
                  </button>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Services; 