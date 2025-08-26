import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaCog, FaBox, FaPhone, FaInfoCircle, FaUsers, FaBriefcase, 
  FaNewspaper, FaHandshake, FaQuestionCircle, FaHeadset, FaExclamationTriangle,
  FaShieldAlt, FaFileAlt, FaLifeRing, FaBook, FaUserGraduate, FaTrophy,
  FaSearch, FaMapMarkerAlt, FaEnvelope, FaWhatsapp, FaGlobe, FaClock
} from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import { useLoading } from '../components/LoadingManager';

const Sitemap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setAnimateElements(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
  };

  const sitemapData = {
    main: [
      { name: 'الرئيسية', path: '/', icon: FaHome, description: 'الصفحة الرئيسية للموقع' },
      { name: 'الخدمات', path: '/services', icon: FaCog, description: 'جميع خدماتنا المميزة' },
      { name: 'الباقات', path: '/packages', icon: FaBox, description: 'باقات غسيل السيارات' },
      { name: 'اتصل بنا', path: '/contact', icon: FaPhone, description: 'معلومات التواصل معنا' },
      { name: 'من نحن', path: '/about', icon: FaInfoCircle, description: 'تعرف على شركتنا' },
      { name: 'الفريق', path: '/team', icon: FaUsers, description: 'فريق العمل المحترف' }
    ],
    support: [
      { name: 'الأسئلة الشائعة', path: '/faq', icon: FaQuestionCircle, description: 'إجابات على الأسئلة الشائعة' },
      { name: 'مركز المساعدة', path: '/help-center', icon: FaHeadset, description: 'مركز المساعدة الشامل' },
      { name: 'الدعم التقني', path: '/technical-support', icon: FaCog, description: 'الدعم التقني المتخصص' },
      { name: 'الشكاوى والاقتراحات', path: '/complaints', icon: FaExclamationTriangle, description: 'تقديم شكوى أو اقتراح' },
      { name: 'دليل المستخدم', path: '/user-guide', icon: FaBook, description: 'دليل شامل لاستخدام الخدمات' }
    ],
    legal: [
      { name: 'سياسة الخصوصية', path: '/privacy', icon: FaShieldAlt, description: 'سياسة حماية البيانات' },
      { name: 'الشروط والأحكام', path: '/terms', icon: FaFileAlt, description: 'الشروط والأحكام العامة' }
    ],
    business: [
      { name: 'الوظائف', path: '/careers', icon: FaBriefcase, description: 'فرص العمل المتاحة' },
      { name: 'الأخبار', path: '/news', icon: FaNewspaper, description: 'أحدث الأخبار والتحديثات' },
      { name: 'الشركاء', path: '/partners', icon: FaHandshake, description: 'شركاؤنا في النجاح' },
      { name: 'الجوائز', path: '/awards', icon: FaTrophy, description: 'الجوائز والإنجازات' },
      { name: 'الشهادات', path: '/certificates', icon: FaUserGraduate, description: 'الشهادات والاعتمادات' }
    ]
  };

  const quickLinks = [
    { name: 'حجز خدمة', path: '/packages', icon: FaBox, color: 'from-emerald-500 to-emerald-600' },
    { name: 'تتبع الطلب', path: '/orders', icon: FaSearch, color: 'from-emerald-500 to-emerald-600' },
    { name: 'فروعنا', path: '/contact', icon: FaMapMarkerAlt, color: 'from-emerald-500 to-emerald-600' },
    { name: 'تواصل معنا', path: '/contact', icon: FaPhone, color: 'from-emerald-500 to-emerald-600' }
  ];

  const contactInfo = [
    { icon: FaPhone, text: '+966 56 890 9183', link: 'tel:+966568909183' },
    { icon: FaEnvelope, text: 'info@paypasss.com', link: 'mailto:info@paypasss.com' },
    { icon: FaWhatsapp, text: 'واتساب فوري', link: 'https://wa.me/966568909183' },
    { icon: FaGlobe, text: 'www.paypasss.com', link: 'https://www.paypasss.com' }
  ];

  const filteredSitemap = {
    main: sitemapData.main.filter(item => 
      item.name.includes(searchTerm) || item.description.includes(searchTerm)
    ),
    support: sitemapData.support.filter(item => 
      item.name.includes(searchTerm) || item.description.includes(searchTerm)
    ),
    legal: sitemapData.legal.filter(item => 
      item.name.includes(searchTerm) || item.description.includes(searchTerm)
    ),
    business: sitemapData.business.filter(item => 
      item.name.includes(searchTerm) || item.description.includes(searchTerm)
    )
  };

  return (
    <>
      <div className="header-spacer"></div>
      
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="خريطة الموقع"
          subtitle="تصفح جميع صفحات موقعنا بسهولة وسرعة"
          breadcrumbs={['الرئيسية', 'خريطة الموقع']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* قسم البحث */}
          <section className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h2 
                  className={`text-3xl font-bold mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'search-title' ? 'text-emerald-600' : 'text-gray-800'
                  }`}
                  onClick={() => handleItemClick('البحث في خريطة الموقع')}
                  onMouseEnter={() => setHoveredItem('search-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  ابحث في خريطة الموقع
                </h2>
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  ابحث عن الصفحة التي تريدها بسرعة وسهولة
                </p>
              </div>
              
              <div className="relative max-w-2xl mx-auto">
                <div className={`relative transition-all duration-300 ${
                  hoveredItem === 'search-input' ? 'scale-105' : ''
                }`}>
                  <input
                    type="text"
                    placeholder="اكتب اسم الصفحة أو الوصف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-300 text-lg"
                    onMouseEnter={() => setHoveredItem('search-input')}
                    onMouseLeave={() => setHoveredItem(null)}
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 text-xl" />
                </div>
              </div>
            </div>
          </section>

          {/* الروابط السريعة */}
          <section className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 
                className="text-3xl font-bold mb-4 text-emerald-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('الروابط السريعة')}
                onMouseEnter={() => setHoveredItem('quick-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                الروابط السريعة
              </h2>
              <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                الوصول السريع للخدمات الأكثر استخداماً
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${link.color} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                    hoveredItem === `quick-${index}` ? 'shadow-emerald-200' : ''
                  }`}
                  onClick={() => handleItemClick(`رابط سريع ${link.name}`)}
                  onMouseEnter={() => setHoveredItem(`quick-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <link.icon className="text-3xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {link.name}
                  </h3>
                </motion.a>
              ))}
            </div>
          </section>

          {/* خريطة الموقع التفصيلية */}
          <section className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 
                className="text-3xl font-bold mb-4 text-emerald-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('خريطة الموقع التفصيلية')}
                onMouseEnter={() => setHoveredItem('sitemap-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                خريطة الموقع التفصيلية
              </h2>
              <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                تصفح جميع صفحات موقعنا منظمة حسب الفئات
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* الصفحات الرئيسية */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-emerald-600 text-center" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  الصفحات الرئيسية
                </h3>
                <div className="space-y-4">
                  {filteredSitemap.main.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl hover:bg-emerald-50 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                        hoveredItem === `main-${index}` ? 'bg-emerald-100 shadow-md' : ''
                      }`}
                      onClick={() => handleItemClick(`صفحة ${item.name}`)}
                      onMouseEnter={() => setHoveredItem(`main-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <item.icon className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {item.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* الدعم والمساعدة */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-green-600 text-center" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  الدعم والمساعدة
                </h3>
                <div className="space-y-4">
                  {filteredSitemap.support.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                        hoveredItem === `support-${index}` ? 'bg-green-100 shadow-md' : ''
                      }`}
                      onClick={() => handleItemClick(`صفحة ${item.name}`)}
                      onMouseEnter={() => setHoveredItem(`support-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <item.icon className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {item.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* الشؤون القانونية */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-green-600 text-center" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  الشؤون القانونية
                </h3>
                <div className="space-y-4">
                  {filteredSitemap.legal.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                        hoveredItem === `legal-${index}` ? 'bg-green-100 shadow-md' : ''
                      }`}
                      onClick={() => handleItemClick(`صفحة ${item.name}`)}
                      onMouseEnter={() => setHoveredItem(`legal-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <item.icon className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {item.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* الشؤون التجارية */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-green-600 text-center" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  الشؤون التجارية
                </h3>
                <div className="space-y-4">
                  {filteredSitemap.business.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                        hoveredItem === `business-${index}` ? 'bg-green-100 shadow-md' : ''
                      }`}
                      onClick={() => handleItemClick(`صفحة ${item.name}`)}
                      onMouseEnter={() => setHoveredItem(`business-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <item.icon className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {item.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* إحصائيات الموقع */}
          <section className={`transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <FaGlobe className="text-4xl mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>25+</h3>
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>صفحة</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <FaUsers className="text-4xl mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>10K+</h3>
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>زائر شهرياً</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <FaSearch className="text-4xl mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>مضمون</h3>
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>متوافق مع محركات البحث</p>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <FaShieldAlt className="text-4xl mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>آمن</h3>
                <p className="text-gray-700" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>حماية كاملة للبيانات</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Sitemap; 