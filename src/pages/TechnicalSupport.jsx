import React, { useState, useEffect } from 'react';
import { FaHeadset, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaCheckCircle, FaTools, FaShieldAlt, FaUsers, FaStar, FaSearch, FaArrowRight, FaDesktop, FaMobile, FaTablet, FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const TechnicalSupport = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    
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

  const supportCategories = [
    {
      id: 'technical',
      title: 'مشاكل تقنية',
      icon: FaTools,
      color: 'green',
      issues: [
        {
          title: 'مشاكل تسجيل الدخول',
          description: 'حلول شائعة لمشاكل تسجيل الدخول',
          solutions: [
            'تأكد من صحة البريد الإلكتروني',
            'أعد تعيين كلمة المرور',
            'امسح ذاكرة التخزين المؤقت',
            'تأكد من تحديث التطبيق'
          ],
          priority: 'عالية'
        },
        {
          title: 'مشاكل الاتصال',
          description: 'حلول لمشاكل الاتصال بالإنترنت',
          solutions: [
            'تحقق من اتصال الإنترنت',
            'أعد تشغيل الراوتر',
            'تحقق من إعدادات الشبكة',
            'جرب شبكة أخرى'
          ],
          priority: 'متوسطة'
        },
        {
          title: 'مشاكل التطبيق',
          description: 'حلول لمشاكل التطبيق',
          solutions: [
            'أعد تشغيل التطبيق',
            'امسح ذاكرة التخزين المؤقت',
            'أعد تثبيت التطبيق',
            'تأكد من التحديثات'
          ],
          priority: 'عالية'
        }
      ]
    },
    {
      id: 'payment',
      title: 'مشاكل الدفع',
      icon: FaShieldAlt,
      color: 'green',
      issues: [
        {
          title: 'رفض البطاقة',
          description: 'حلول لمشاكل رفض البطاقة',
          solutions: [
            'تأكد من صحة بيانات البطاقة',
            'تحقق من رصيد البطاقة',
            'تأكد من تفعيل الدفع الإلكتروني',
            'جرب بطاقة أخرى'
          ],
          priority: 'عالية'
        },
        {
          title: 'مشاكل في عملية الدفع',
          description: 'حلول لمشاكل عملية الدفع',
          solutions: [
            'تأكد من الاتصال بالإنترنت',
            'أعد المحاولة بعد دقائق',
            'تحقق من إعدادات الأمان',
            'تواصل مع البنك'
          ],
          priority: 'متوسطة'
        }
      ]
    },
    {
      id: 'service',
      title: 'مشاكل الخدمة',
      icon: FaUsers,
      color: 'green',
      issues: [
        {
          title: 'تأخير في الخدمة',
          description: 'حلول لمشاكل التأخير',
          solutions: [
            'تحقق من حالة الطلب',
            'تواصل مع خدمة العملاء',
            'تحقق من المواعيد المتاحة',
            'أعد جدولة الموعد'
          ],
          priority: 'متوسطة'
        },
        {
          title: 'جودة الخدمة',
          description: 'حلول لمشاكل جودة الخدمة',
          solutions: [
            'قدم شكوى مفصلة',
            'اطلب إعادة الخدمة',
            'تواصل مع المشرف',
            'اطلب تعويض'
          ],
          priority: 'عالية'
        }
      ]
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? supportCategories 
    : supportCategories.filter(cat => cat.id === selectedCategory);

  const filteredIssues = filteredCategories.flatMap(cat => 
    cat.issues.filter(issue => 
      issue.title.includes(searchTerm) || 
      issue.description.includes(searchTerm)
    )
  );

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="الدعم التقني"
          subtitle="فريق الدعم التقني متاح لمساعدتك في حل جميع المشاكل"
          breadcrumbs={['الرئيسية', 'الدعم التقني']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* قسم الترحيب */}
          <div className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
              <div 
                className="mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('الدعم التقني')}
                onMouseEnter={() => setHoveredItem('welcome-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaHeadset className={`text-5xl mx-auto mb-4 text-green-600 transition-all duration-300 ${
                  hoveredItem === 'welcome-title' ? 'scale-110 animate-bounce' : ''
                }`} />
                <h2 className={`text-3xl font-bold mb-4 text-gray-800 transition-all duration-300 ${
                  hoveredItem === 'welcome-title' ? 'text-green-600 scale-105' : ''
                }`}>
                  الدعم الفني
                </h2>
              </div>
              <p className="text-xl text-gray-800 mb-6">
                فريق الدعم الفني متاح على مدار الساعة لمساعدتك في حل جميع المشاكل التقنية
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div 
                  className={`bg-gray-50 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'phone-support' ? 'bg-green-100 scale-105' : ''
                  } ${clickedItem === 'دعم هاتفي' ? 'bg-green-200 shadow-green-300' : ''}`}
                  onClick={() => handleItemClick('دعم هاتفي')}
                  onMouseEnter={() => setHoveredItem('phone-support')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaPhone className="text-2xl mx-auto mb-2 text-green-600" />
                  <p className="font-bold text-gray-800">دعم هاتفي</p>
                </div>
                <div 
                  className={`bg-gray-50 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'chat-support' ? 'bg-green-100 scale-105' : ''
                  } ${clickedItem === 'دعم مباشر' ? 'bg-green-200 shadow-green-300' : ''}`}
                  onClick={() => handleItemClick('دعم مباشر')}
                  onMouseEnter={() => setHoveredItem('chat-support')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaHeadset className="text-2xl mx-auto mb-2 text-green-600" />
                  <p className="font-bold text-gray-800">دعم مباشر</p>
                </div>
                <div 
                  className={`bg-gray-50 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'email-support' ? 'bg-green-100 scale-105' : ''
                  } ${clickedItem === 'دعم بريد إلكتروني' ? 'bg-green-200 shadow-green-300' : ''}`}
                  onClick={() => handleItemClick('دعم بريد إلكتروني')}
                  onMouseEnter={() => setHoveredItem('email-support')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaEnvelope className="text-2xl mx-auto mb-2 text-green-600" />
                  <p className="font-bold text-gray-800">بريد إلكتروني</p>
                </div>
              </div>
            </div>
          </div>

          {/* البحث والتصفية */}
          <div className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h2 
                  className={`text-3xl font-bold mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'search-title' ? 'text-green-600' : 'text-gray-800'
                  }`}
                  onClick={() => handleItemClick('ابحث في المشاكل')}
                  onMouseEnter={() => setHoveredItem('search-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  ابحث في المشاكل
                </h2>
                <p className="text-gray-700">ابحث عن المشكلة التي تواجهها أو اختر فئة</p>
              </div>
              
              <div className="space-y-6">
                {/* البحث */}
                <div className="relative max-w-2xl mx-auto">
                  <div className={`relative transition-all duration-300 ${
                    hoveredItem === 'search-input' ? 'scale-105' : ''
                  }`}>
                    <input
                      type="text"
                      placeholder="اكتب المشكلة التي تواجهها..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300 text-lg"
                      onMouseEnter={() => setHoveredItem('search-input')}
                      onMouseLeave={() => setHoveredItem(null)}
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" style={{color: '#22c55e'}} />
                  </div>
                </div>

                {/* فئات المشاكل */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      handleItemClick('جميع المشاكل');
                    }}
                    className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      selectedCategory === 'all'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    جميع المشاكل
                  </button>
                  {supportCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          handleItemClick(category.title);
                        }}
                        className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
                          selectedCategory === category.id
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent className="text-lg text-green-600" />
                        {category.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* قائمة المشاكل */}
          <div className={`space-y-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {filteredIssues.map((issue, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-green-300 transition-all duration-300 cursor-pointer transform hover:scale-102 active:scale-98 ${
                  animateElements ? 'animate-fade-in-up' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => handleItemClick(issue.title)}
                onMouseEnter={() => setHoveredItem(`issue-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredItem === `issue-${index}` ? 'scale-110 bg-green-600' : ''
                      }`}>
                        <FaExclamationTriangle className="text-white text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${
                          hoveredItem === `issue-${index}` ? 'text-emerald-500 scale-105' : 'text-gray-700'
                        }`}>
                          {issue.title}
                        </h3>
                        <p className="text-gray-700 text-lg mb-4">{issue.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaClock style={{color: '#22c55e'}} />
                            حلول متاحة
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCheckCircle style={{color: '#22c55e'}} />
                            حلول متاحة
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 p-6 rounded-xl">
                    <h4 className="font-bold text-gray-700 mb-4 text-lg">الحلول المقترحة:</h4>
                    <ol className="space-y-3">
                      {issue.solutions.map((solution, solutionIndex) => (
                        <li 
                          key={solutionIndex}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <span className={`w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            hoveredItem === `issue-${index}` ? 'scale-110 bg-emerald-600' : ''
                          }`}>
                            {solutionIndex + 1}
                          </span>
                          <span className="flex-1">{solution}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <button 
                      className={`flex items-center gap-2 px-6 py-3 bg-emerald-50 text-gray-700 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:text-emerald-500 active:text-emerald-600 ${
                        clickedItem === `طلب مساعدة - ${issue.title}` ? 'text-emerald-600' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(`طلب مساعدة - ${issue.title}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`help-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <FaHeadset />
                      طلب مساعدة
                    </button>
                    <button 
                      className={`flex items-center gap-2 px-6 py-3 bg-emerald-50 text-gray-700 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:text-emerald-500 active:text-emerald-600 ${
                        clickedItem === `تقرير مشكلة - ${issue.title}` ? 'text-emerald-600' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(`تقرير مشكلة - ${issue.title}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`report-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <FaExclamationTriangle />
                      تقرير مشكلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* قسم المساعدة الإضافية */}
          <div className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center">
              <h2 
                className={`text-3xl font-bold mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'help-title' ? 'text-yellow-200' : ''
                }`}
                onClick={() => handleItemClick('هل تحتاج مساعدة إضافية؟')}
                onMouseEnter={() => setHoveredItem('help-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                نحن هنا لمساعدتك
              </h2>
              <p className="text-xl mb-8 opacity-90">فريق الدعم متاح لمساعدتك في أي وقت</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'phone-help' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('اتصل بنا للمساعدة')}
                  onMouseEnter={() => setHoveredItem('phone-help')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaPhone className="text-3xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-xl font-bold mb-2 text-gray-700">اتصل بنا</h3>
                  <p className="opacity-90 text-gray-700" dir="ltr">+966 56 890 9183</p>
                </div>
                
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'email-help' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('راسلنا للمساعدة')}
                  onMouseEnter={() => setHoveredItem('email-help')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaEnvelope className="text-3xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-xl font-bold mb-2 text-gray-700">راسلنا</h3>
                  <p className="opacity-90 text-gray-700">support@paypasss.com</p>
                </div>
                
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'whatsapp-help' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('واتساب للمساعدة')}
                  onMouseEnter={() => setHoveredItem('whatsapp-help')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaWhatsapp className="text-3xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-xl font-bold mb-2 text-gray-700">واتساب</h3>
                  <p className="opacity-90 text-gray-700">رد فوري على الرسائل</p>
                </div>
              </div>
            </div>
          </div>

          {/* إحصائيات الدعم */}
          <div className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="grid md:grid-cols-4 gap-6">
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'stats-1' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الدعم')}
                onMouseEnter={() => setHoveredItem('stats-1')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaHeadset className={`text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300 ${
                  hoveredItem === 'stats-1' ? 'scale-110 text-emerald-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">متاح</h3>
                <p className="text-gray-700">دعم متواصل</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'stats-2' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الاستجابة')}
                onMouseEnter={() => setHoveredItem('stats-2')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaClock className={`text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300 ${
                  hoveredItem === 'stats-2' ? 'scale-110 text-emerald-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">{'< 5'}</h3>
                <p className="text-gray-700">دقائق استجابة</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'stats-3' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الحلول')}
                onMouseEnter={() => setHoveredItem('stats-3')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaCheckCircle className={`text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300 ${
                  hoveredItem === 'stats-3' ? 'scale-110 text-emerald-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">98%</h3>
                <p className="text-gray-700">معدل الحل</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 border border-gray-100 hover:border-emerald-200 ${
                  hoveredItem === 'stats-4' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الرضا')}
                onMouseEnter={() => setHoveredItem('stats-4')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaStar className={`text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300 ${
                  hoveredItem === 'stats-4' ? 'scale-110 text-emerald-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">4.9</h3>
                <p className="text-gray-700">تقييم العملاء</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnicalSupport; 