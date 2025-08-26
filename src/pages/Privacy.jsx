import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaLock, FaEye, FaUserSecret, FaDatabase, FaServer,
  FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaGlobe, FaFileAlt, FaCalendarAlt,
  FaArrowRight, FaHandshake, FaUsers, FaCog
} from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Privacy = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

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

  const privacySections = [
    {
      id: 'collection',
      title: 'جمع المعلومات',
      icon: FaDatabase,
      content: [
        'نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند التسجيل أو استخدام خدماتنا',
        'نحصل على معلومات تقنية مثل عنوان IP ونوع المتصفح ونظام التشغيل',
        'نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك على موقعنا',
        'نحصل على معلومات من مصادر خارجية مثل شركاء التسويق والشبكات الاجتماعية'
      ]
    },
    {
      id: 'usage',
      title: 'استخدام المعلومات',
      icon: FaCog,
      content: [
        'تقديم وتحسين خدماتنا وضمان جودتها',
        'التواصل معك بخصوص حسابك أو خدماتنا',
        'إرسال تحديثات وإشعارات مهمة',
        'تحليل استخدام الموقع لتحسين تجربة المستخدم',
        'منع الاحتيال وحماية أمن النظام'
      ]
    },
    {
      id: 'sharing',
      title: 'مشاركة المعلومات',
      icon: FaUsers,
      content: [
        'لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية',
        'نشارك المعلومات مع مزودي الخدمات الذين يساعدوننا في تشغيل موقعنا',
        'نكشف عن المعلومات عند الحاجة للامتثال للقوانين أو حماية حقوقنا',
        'نشارك معلومات مجمعة وغير شخصية لأغراض إحصائية'
      ]
    },
    {
      id: 'security',
      title: 'حماية المعلومات',
      icon: FaShieldAlt,
      content: [
        'نستخدم تقنيات تشفير متقدمة لحماية بياناتك',
        'نطبق إجراءات أمنية صارمة لمنع الوصول غير المصرح به',
        'نراجع بانتظام ممارسات الأمان لدينا',
        'نوفر تدريباً منتظماً لموظفينا حول حماية البيانات',
        'نستخدم أنظمة مراقبة متقدمة لكشف التهديدات الأمنية'
      ]
    },
    {
      id: 'rights',
      title: 'حقوقك',
      icon: FaUserSecret,
      content: [
        'الحق في الوصول إلى معلوماتك الشخصية وتحديثها',
        'الحق في طلب حذف معلوماتك الشخصية',
        'الحق في الاعتراض على معالجة بياناتك',
        'الحق في نقل بياناتك إلى مزود خدمة آخر',
        'الحق في سحب الموافقة على معالجة بياناتك'
      ]
    },
    {
      id: 'cookies',
      title: 'ملفات تعريف الارتباط',
      icon: FaEye,
      content: [
        'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح',
        'ملفات تعريف الارتباط الأساسية ضرورية لعمل الموقع',
        'ملفات تعريف الارتباط التحليلية تساعدنا في فهم استخدام الموقع',
        'ملفات تعريف الارتباط التسويقية تستخدم لعرض إعلانات مخصصة',
        'يمكنك إدارة تفضيلات ملفات تعريف الارتباط من إعدادات المتصفح'
      ]
    }
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'البريد الإلكتروني',
      value: 'privacy@paypasss.com',
      description: 'للاستفسارات حول سياسة الخصوصية'
    },
    {
      icon: FaPhone,
      title: 'الهاتف',
      value: '+966 50 123 4567',
      description: 'خط ساخن لحماية البيانات'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
      description: 'المقر الرئيسي للشركة'
    }
  ];

  const complianceItems = [
    {
      icon: FaCheckCircle,
      title: 'متوافق مع GDPR',
      description: 'نلتزم باللائحة العامة لحماية البيانات الأوروبية'
    },
    {
      icon: FaCheckCircle,
      title: 'متوافق مع CCPA',
      description: 'نحترم قانون حماية خصوصية المستهلك في كاليفورنيا'
    },
    {
      icon: FaCheckCircle,
      title: 'متوافق مع القوانين المحلية',
      description: 'نلتزم بقوانين حماية البيانات السعودية'
    },
    {
      icon: FaCheckCircle,
      title: 'شهادات الأمان',
      description: 'نحمل شهادات أمان معترف بها دولياً'
    }
  ];

  return (
    <>
      <div className="header-spacer"></div>
      
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="سياسة الخصوصية"
          subtitle="نلتزم بحماية خصوصيتك وبياناتك الشخصية"
          breadcrumbs={['الرئيسية', 'سياسة الخصوصية']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* قسم الترحيب */}
          <section className={`w-full py-16 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
              <div 
                className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('سياسة الخصوصية')}
                onMouseEnter={() => setHoveredItem('privacy-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h1 className={`text-5xl font-bold mb-6 text-white transition-all duration-300 ${
                  hoveredItem === 'privacy-title' ? 'scale-105 text-yellow-100' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif', color: 'white', fontWeight: 'bold'}}>
                  سياسة الخصوصية
                </h1>
                <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                  hoveredItem === 'privacy-title' ? 'opacity-100 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif', color: 'white', fontWeight: 'bold'}}>
                  نلتزم بحماية خصوصيتك وبياناتك الشخصية وفقاً لأعلى المعايير الدولية
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white bg-opacity-20 p-6 rounded-2xl backdrop-blur-sm">
                  <FaShieldAlt className="text-4xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937', fontWeight: 'bold'}}>حماية كاملة</h3>
                  <p className="opacity-90" style={{color: '#374151', fontWeight: 'bold'}}>بياناتك آمنة معنا</p>
                </div>
                <div className="bg-white bg-opacity-20 p-6 rounded-2xl backdrop-blur-sm">
                  <FaLock className="text-4xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937', fontWeight: 'bold'}}>تشفير متقدم</h3>
                  <p className="opacity-90" style={{color: '#374151', fontWeight: 'bold'}}>أحدث تقنيات الحماية</p>
                </div>
                <div className="bg-white bg-opacity-20 p-6 rounded-2xl backdrop-blur-sm">
                  <FaUserSecret className="text-4xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937', fontWeight: 'bold'}}>خصوصية مضمونة</h3>
                  <p className="opacity-90" style={{color: '#374151', fontWeight: 'bold'}}>حقوقك محفوظة</p>
                </div>
              </div>
            </div>
          </section>

          {/* آخر تحديث */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <FaCalendarAlt className="text-3xl text-green-600 mr-4" />
                <h2 className="text-2xl font-bold text-green-600" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  آخر تحديث: 15 يناير 2024
                </h2>
              </div>
              <p className="text-center text-gray-600 text-lg" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                تم تحديث سياسة الخصوصية هذه في التاريخ المذكور أعلاه. نوصي بمراجعتها بانتظام للاطلاع على أي تغييرات.
              </p>
            </div>
          </section>

          {/* أقسام سياسة الخصوصية */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 
                className="text-4xl font-bold mb-6 text-green-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('أقسام سياسة الخصوصية')}
                onMouseEnter={() => setHoveredItem('sections-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                أقسام سياسة الخصوصية
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                تعرف على كيفية جمعنا واستخدامنا وحمايتنا لبياناتك الشخصية
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {privacySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                    hoveredItem === `section-${section.id}` ? 'shadow-green-200' : ''
                  }`}
                  onClick={() => handleItemClick(`قسم ${section.title}`)}
                  onMouseEnter={() => setHoveredItem(`section-${section.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 ${
                      hoveredItem === `section-${section.id}` ? 'scale-110' : ''
                    }`}>
                      <section.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                      {section.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="flex items-start gap-3 text-gray-700"
                        style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                      >
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* الامتثال للمعايير */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 
                className="text-4xl font-bold mb-6 text-green-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('الامتثال للمعايير')}
                onMouseEnter={() => setHoveredItem('compliance-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                الامتثال للمعايير الدولية
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                نلتزم بأعلى معايير حماية البيانات والخصوصية الدولية
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {complianceItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                    hoveredItem === `compliance-${index}` ? 'shadow-green-200' : ''
                  }`}
                  onClick={() => handleItemClick(`معيار ${item.title}`)}
                  onMouseEnter={() => setHoveredItem(`compliance-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredItem === `compliance-${index}` ? 'scale-110' : ''
                  }`}>
                    <item.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-center text-green-600" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* معلومات التواصل */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 
                className="text-4xl font-bold mb-6 text-green-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('معلومات التواصل')}
                onMouseEnter={() => setHoveredItem('contact-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
              >
                تواصل معنا
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                لديك أسئلة حول سياسة الخصوصية؟ نحن هنا لمساعدتك
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                    hoveredItem === `contact-${index}` ? 'shadow-green-200' : ''
                  }`}
                  onClick={() => handleItemClick(`تواصل ${contact.title}`)}
                  onMouseEnter={() => setHoveredItem(`contact-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                    hoveredItem === `contact-${index}` ? 'scale-110' : ''
                  }`}>
                    <contact.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-green-600" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {contact.title}
                  </h3>
                  <p className="text-lg font-bold mb-2 text-center text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {contact.value}
                  </p>
                  <p className="text-gray-600 text-center text-sm" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    {contact.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* تنبيه مهم */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <FaExclamationTriangle className="text-4xl text-white mr-4" />
                <h2 className="text-3xl font-bold text-white" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  تنبيه مهم
                </h2>
              </div>
              <p className="text-xl text-white mb-6" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                لا تشارك أبداً كلمات المرور أو المعلومات الحساسة مع أي شخص، حتى لو ادعى أنه من فريق الدعم لدينا.
              </p>
              <p className="text-lg text-white opacity-90" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                فريق الدعم لدينا لن يطلب منك أبداً كلمة المرور أو المعلومات المصرفية عبر الهاتف أو البريد الإلكتروني.
              </p>
            </div>
          </section>

          {/* تحديثات السياسة */}
          <section className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 
                  className="text-3xl font-bold mb-4 text-green-600 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => handleItemClick('تحديثات السياسة')}
                  onMouseEnter={() => setHoveredItem('updates-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  تحديثات سياسة الخصوصية
                </h2>
                <p className="text-lg text-gray-600" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                  نحدث سياسة الخصوصية بانتظام لضمان الامتثال لأحدث المعايير والقوانين
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center">
                    <FaFileAlt className="text-green-600 text-xl mr-4" />
                    <div>
                      <h3 className="font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                        تحديث يناير 2024
                      </h3>
                      <p className="text-gray-600 text-sm" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                        إضافة أحكام جديدة لحماية البيانات وفقاً للقوانين المحلية المحدثة
                      </p>
                    </div>
                  </div>
                  <span className="text-green-600 font-bold" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    15 يناير 2024
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <FaFileAlt className="text-gray-600 text-xl mr-4" />
                    <div>
                      <h3 className="font-bold text-gray-800" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                        تحديث أكتوبر 2023
                      </h3>
                      <p className="text-gray-600 text-sm" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                        تحسين إجراءات حماية البيانات وإضافة خيارات تحكم إضافية للمستخدمين
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-600 font-bold" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                    20 أكتوبر 2023
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Privacy; 