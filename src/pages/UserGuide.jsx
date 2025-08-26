import React, { useState, useEffect } from 'react';
import { FaBook, FaPlay, FaDownload, FaMobile, FaDesktop, FaTablet, FaCheckCircle, FaArrowRight, FaStar, FaClock, FaShieldAlt, FaUsers, FaPhone, FaEnvelope, FaWhatsapp, FaVideo, FaHeadset, FaInfoCircle, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const UserGuide = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const guideCategories = [
    {
      id: 'getting-started',
      title: 'البداية السريعة',
      icon: FaPlay,
      color: '#22c55e',
      guides: [
        {
          title: 'كيفية التسجيل في التطبيق',
          description: 'دليل شامل لإنشاء حساب جديد في تطبيقنا',
          steps: [
            'قم بتحميل التطبيق من متجر التطبيقات',
            'اضغط على "إنشاء حساب جديد"',
            'أدخل بياناتك الشخصية',
            'تحقق من بريدك الإلكتروني',
            'ابدأ باستخدام التطبيق'
          ],
          videoUrl: '#',
          duration: '3 دقائق'
        },
        {
          title: 'كيفية حجز أول خدمة',
          description: 'تعلم كيفية حجز خدمة غسيل سيارتك بسهولة',
          steps: [
            'سجل دخولك إلى التطبيق',
            'اختر نوع الخدمة المطلوبة',
            'حدد موقع الفرع',
            'اختر الموعد المناسب',
            'أكمل عملية الدفع',
            'احصل على تأكيد الحجز'
          ],
          videoUrl: '#',
          duration: '5 دقائق'
        },
        {
          title: 'كيفية تتبع طلبك',
          description: 'تعلم كيفية متابعة حالة طلبك في الوقت الفعلي',
          steps: [
            'اذهب إلى قسم "طلباتي"',
            'اختر الطلب الذي تريد متابعته',
            'شاهد حالة الطلب الحالية',
            'احصل على إشعارات التحديث',
            'تواصل معنا إذا احتجت مساعدة'
          ],
          videoUrl: '#',
          duration: '2 دقيقة'
        }
      ]
    },
    {
      id: 'app-features',
      title: 'مميزات التطبيق',
      icon: FaMobile,
      color: '#22c55e',
      guides: [
        {
          title: 'استخدام نظام النقاط',
          description: 'كيفية كسب واستخدام النقاط في التطبيق',
          steps: [
            'احصل على نقاط لكل خدمة',
            'استخدم النقاط للحصول على خصومات',
            'شارك التطبيق مع الأصدقاء لكسب نقاط إضافية',
            'احصل على مزايا خاصة للعملاء المميزين'
          ],
          videoUrl: '#',
          duration: '4 دقائق'
        },
        {
          title: 'إعدادات الحساب',
          description: 'كيفية تخصيص إعدادات حسابك',
          steps: [
            'اذهب إلى "الإعدادات"',
            'عدل معلوماتك الشخصية',
            'اختر تفضيلات الإشعارات',
            'حدد طرق الدفع المفضلة',
            'احفظ التغييرات'
          ],
          videoUrl: '#',
          duration: '3 دقائق'
        },
        {
          title: 'إدارة المفضلة',
          description: 'كيفية إدارة قائمة الخدمات المفضلة',
          steps: [
            'تصفح الخدمات المتاحة',
            'اضغط على أيقونة القلب لإضافة للمفضلة',
            'اذهب إلى قسم "المفضلة"',
            'احذف أو أعد ترتيب العناصر',
            'احجز الخدمات المفضلة بسرعة'
          ],
          videoUrl: '#',
          duration: '2 دقيقة'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'حل المشاكل',
      icon: FaQuestionCircle,
      color: '#22c55e',
      guides: [
        {
          title: 'مشاكل تسجيل الدخول',
          description: 'حلول شائعة لمشاكل تسجيل الدخول',
          steps: [
            'تأكد من صحة البريد الإلكتروني',
            'أعد تعيين كلمة المرور',
            'امسح ذاكرة التخزين المؤقت',
            'تأكد من تحديث التطبيق',
            'تواصل مع الدعم التقني'
          ],
          videoUrl: '#',
          duration: '4 دقائق'
        },
        {
          title: 'مشاكل الدفع',
          description: 'حلول لمشاكل الدفع عبر التطبيق',
          steps: [
            'تأكد من صحة بيانات البطاقة',
            'تحقق من رصيد البطاقة',
            'جرب طريقة دفع أخرى',
            'تأكد من الاتصال بالإنترنت',
            'تواصل مع خدمة العملاء'
          ],
          videoUrl: '#',
          duration: '3 دقائق'
        },
        {
          title: 'مشاكل الإشعارات',
          description: 'حلول لمشاكل عدم وصول الإشعارات',
          steps: [
            'تحقق من إعدادات الإشعارات',
            'أعد تشغيل التطبيق',
            'تحقق من إعدادات الجهاز',
            'امسح ذاكرة التخزين المؤقت',
            'أعد تثبيت التطبيق'
          ],
          videoUrl: '#',
          duration: '3 دقائق'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'استخدامات متقدمة',
      icon: FaStar,
      color: '#22c55e',
      guides: [
        {
          title: 'البرمجة المسبقة',
          description: 'كيفية برمجة مواعيد غسيل دورية',
          steps: [
            'اذهب إلى "البرمجة المسبقة"',
            'اختر نوع الخدمة',
            'حدد التكرار المطلوب',
            'اختر المواعيد المناسبة',
            'أكمل الإعدادات',
            'احصل على تأكيد البرمجة'
          ],
          videoUrl: '#',
          duration: '6 دقائق'
        },
        {
          title: 'إدارة الفروع',
          description: 'كيفية إدارة فروعك المفضلة',
          steps: [
            'ابحث عن الفروع القريبة',
            'أضف الفروع للمفضلة',
            'احصل على إشعارات العروض',
            'تابع أوقات العمل',
            'احجز في الفرع المفضل'
          ],
          videoUrl: '#',
          duration: '3 دقائق'
        },
        {
          title: 'تقارير الاستخدام',
          description: 'كيفية مراجعة تقارير استخدامك',
          steps: [
            'اذهب إلى "التقارير"',
            'اختر الفترة المطلوبة',
            'راجع إحصائيات الاستخدام',
            'حمل التقارير',
            'شارك النتائج'
          ],
          videoUrl: '#',
          duration: '4 دقائق'
        }
      ]
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? guideCategories 
    : guideCategories.filter(cat => cat.id === selectedCategory);

  const filteredGuides = filteredCategories.flatMap(cat => 
    cat.guides.filter(guide => 
      guide.title.includes(searchTerm) || 
      guide.description.includes(searchTerm)
    )
  );

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="دليل المستخدم"
          subtitle="تعلم كيفية استخدام تطبيقنا بسهولة وفعالية"
          breadcrumbs={['الرئيسية', 'دليل المستخدم']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* قسم الترحيب */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center">
              <div className="mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300">
                <FaBook className="text-5xl mx-auto mb-4 text-gray-700 transition-all duration-300" />
                <h2 className="text-3xl font-bold mb-4 transition-all duration-300 text-gray-700 font-cairo-bold">
                  دليل المستخدم الشامل
                </h2>
              </div>
              <p className="text-xl mb-6 text-gray-700 font-cairo-bold">
                تعلم كيفية استخدام جميع مميزات تطبيقنا بسهولة. 
                دليل شامل مع فيديوهات تعليمية وأمثلة عملية.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                  <FaVideo className="text-2xl mx-auto mb-2 text-gray-700" />
                  <p className="font-bold text-gray-700" style={{fontWeight: 'bold'}}>فيديوهات تعليمية</p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                  <FaArrowRight className="text-2xl mx-auto mb-2 text-gray-700" />
                  <p className="font-bold text-gray-700" style={{fontWeight: 'bold'}}>خطوة بخطوة</p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                  <FaDownload className="text-2xl mx-auto mb-2 text-gray-700" />
                  <p className="font-bold text-gray-700" style={{fontWeight: 'bold'}}>تحميل الدليل</p>
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
                  onClick={() => handleItemClick('ابحث في الدليل')}
                  onMouseEnter={() => setHoveredItem('search-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  ابحث في الدليل
                </h2>
                <p 
                  className="text-gray-600" 
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  ابحث عن الموضوع الذي تريد تعلمه أو اختر فئة
                </p>
              </div>
              
              <div className="space-y-6">
                {/* البحث */}
                <div className="relative max-w-2xl mx-auto">
                  <div className={`relative transition-all duration-300 ${
                    hoveredItem === 'search-input' ? 'scale-105' : ''
                  }`}>
                    <input
                      type="text"
                      placeholder="اكتب ما تريد تعلمه..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300 text-lg"
                      onMouseEnter={() => setHoveredItem('search-input')}
                      onMouseLeave={() => setHoveredItem(null)}
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" style={{color: '#22c55e'}} />
                  </div>
                </div>

                {/* فئات الدليل */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      handleItemClick('جميع الأقسام');
                    }}
                    className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      selectedCategory === 'all'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                  >
                    جميع الأقسام
                  </button>
                  {guideCategories.map((category) => {
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
                        style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                      >
                        <IconComponent className="text-lg" style={{color: '#22c55e'}} />
                        {category.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* قائمة الأدلة */}
          <div className={`space-y-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {filteredGuides.map((guide, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-green-300 transition-all duration-300 cursor-pointer transform hover:scale-102 active:scale-98 ${
                  animateElements ? 'animate-fade-in-up' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => handleItemClick(guide.title)}
                onMouseEnter={() => setHoveredItem(`guide-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredItem === `guide-${index}` ? 'scale-110 bg-green-600' : ''
                      }`}>
                        <FaBook className="text-white text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${
                          hoveredItem === `guide-${index}` ? 'text-green-600 scale-105 bg-green-50 rounded-xl p-2' : 'text-black'
                        }`} style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
                          {guide.title}
                        </h3>
                        <p 
                          className={`text-lg mb-4 transition-all duration-300 ${
                            hoveredItem === `guide-${index}` ? 'text-green-700 bg-green-50 rounded-xl p-2' : 'text-black'
                          }`} 
                          style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                        >
                          {guide.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaClock style={{color: '#22c55e'}} />
                            {guide.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaVideo style={{color: '#22c55e'}} />
                            فيديو تعليمي
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-4 text-lg font-cairo-bold">الخطوات:</h4>
                    <ol className="space-y-3">
                      {guide.steps.map((step, stepIndex) => (
                        <li 
                          key={stepIndex}
                          className={`flex items-start gap-3 transition-all duration-300 ${
                            hoveredItem === `guide-${index}` ? 'text-green-700' : 'text-gray-700'
                          }`}
                          style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                        >
                          <span className={`w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            hoveredItem === `guide-${index}` ? 'scale-110 bg-green-600' : ''
                          }`}>
                            {stepIndex + 1}
                          </span>
                          <span className="flex-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <button 
                      className={`flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        clickedItem === `مشاهدة الفيديو - ${guide.title}` ? 'scale-95 bg-green-700' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(`مشاهدة الفيديو - ${guide.title}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`video-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                    >
                      <FaPlay />
                      مشاهدة الفيديو
                    </button>
                    <button 
                      className={`flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-gray-200 ${
                        clickedItem === `تحميل الدليل - ${guide.title}` ? 'scale-95 bg-gray-300' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(`تحميل الدليل - ${guide.title}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`download-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                    >
                      <FaDownload />
                      تحميل الدليل
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
                  hoveredItem === 'help-title' ? 'text-green-200 scale-105' : ''
                }`}
                onClick={() => handleItemClick('هل تحتاج مساعدة إضافية؟')}
                onMouseEnter={() => setHoveredItem('help-title')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{fontFamily: 'Cairo, sans-serif', color: 'white', fontWeight: 'bold'}}
              >
                هل تحتاج مساعدة إضافية؟
              </h2>
              <p className="text-xl mb-8 opacity-90 font-cairo-bold">فريق الدعم متاح لمساعدتك في أي وقت</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'phone-help' ? 'bg-green-100 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('اتصل بنا للمساعدة')}
                  onMouseEnter={() => setHoveredItem('phone-help')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaPhone className="text-3xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-xl font-bold mb-2" style={{color: 'white', fontWeight: 'bold'}}>اتصل بنا</h3>
                  <p className="opacity-90" style={{color: 'white', fontWeight: 'bold'}} dir="ltr">+966 56 890 9183</p>
                </div>
                
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'email-help' ? 'bg-green-100 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('راسلنا للمساعدة')}
                  onMouseEnter={() => setHoveredItem('email-help')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaEnvelope className="text-3xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-xl font-bold mb-2" style={{color: 'white', fontWeight: 'bold'}}>راسلنا</h3>
                  <p className="opacity-90" style={{color: 'white', fontWeight: 'bold'}}>support@paypasss.com</p>
                </div>
                
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'whatsapp-help' ? 'bg-green-100 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('واتساب للمساعدة')}
                  onMouseEnter={() => setHoveredItem('whatsapp-help')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaWhatsapp className="text-3xl mx-auto mb-4" style={{color: '#22c55e'}} />
                  <h3 className="text-xl font-bold mb-2" style={{color: 'white', fontWeight: 'bold'}}>واتساب</h3>
                  <p className="opacity-90" style={{color: 'white', fontWeight: 'bold'}}>رد فوري على الرسائل</p>
                </div>
              </div>
            </div>
          </div>

          {/* إحصائيات الدليل */}
          <div className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="grid md:grid-cols-4 gap-6">
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-1' ? 'shadow-xl shadow-green-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الدليل')}
                onMouseEnter={() => setHoveredItem('stats-1')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaBook className={`text-4xl mx-auto mb-4 text-green-500 transition-all duration-300 ${
                  hoveredItem === 'stats-1' ? 'scale-110 text-green-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-black mb-2 font-cairo-bold">+50</h3>
                <p 
                  className={`transition-all duration-300 ${
                    hoveredItem === 'stats-1' ? 'text-green-600' : 'text-black'
                  }`} 
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  دليل تعليمي
                </p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-2' ? 'shadow-xl shadow-green-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الفيديوهات')}
                onMouseEnter={() => setHoveredItem('stats-2')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaVideo className={`text-4xl mx-auto mb-4 text-green-500 transition-all duration-300 ${
                  hoveredItem === 'stats-2' ? 'scale-110 text-green-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-black mb-2 font-cairo-bold">+30</h3>
                <p 
                  className={`transition-all duration-300 ${
                    hoveredItem === 'stats-2' ? 'text-green-600' : 'text-black'
                  }`} 
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  فيديو تعليمي
                </p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-3' ? 'shadow-xl shadow-green-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات المستخدمين')}
                onMouseEnter={() => setHoveredItem('stats-3')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaUsers className={`text-4xl mx-auto mb-4 text-green-500 transition-all duration-300 ${
                  hoveredItem === 'stats-3' ? 'scale-110 text-green-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-black mb-2 font-cairo-bold">+10K</h3>
                <p 
                  className={`transition-all duration-300 ${
                    hoveredItem === 'stats-3' ? 'text-green-600' : 'text-black'
                  }`} 
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  مستخدم نشط
                </p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-4' ? 'shadow-xl shadow-green-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الرضا')}
                onMouseEnter={() => setHoveredItem('stats-4')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaStar className={`text-4xl mx-auto mb-4 text-green-500 transition-all duration-300 ${
                  hoveredItem === 'stats-4' ? 'scale-110 text-green-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-black mb-2 font-cairo-bold">4.8</h3>
                <p 
                  className={`transition-all duration-300 ${
                    hoveredItem === 'stats-4' ? 'text-green-600' : 'text-black'
                  }`} 
                  style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}
                >
                  تقييم المستخدمين
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGuide; 