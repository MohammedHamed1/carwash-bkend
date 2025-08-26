import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaSearch, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaGraduationCap, FaUsers, FaStar, FaPhone, FaEnvelope, FaWhatsapp, FaDownload, FaUpload, FaCheckCircle, FaArrowRight, FaBuilding, FaHandshake, FaRocket, FaHeart } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Jobs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

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

  const jobCategories = [
    {
      id: 'technical',
      title: 'وظائف تقنية',
      icon: FaRocket,
      color: 'blue',
      jobs: [
        {
          title: 'مطور تطبيقات موبايل',
          company: 'شركة غسيل السيارات',
          location: 'الرياض',
          type: 'دوام كامل',
          salary: '8,000 - 12,000 ريال',
          experience: '3-5 سنوات',
          description: 'نبحث عن مطور تطبيقات موبايل موهوب للانضمام إلى فريقنا التقني',
          requirements: [
            'خبرة في تطوير تطبيقات React Native',
            'خبرة في تطوير تطبيقات iOS و Android',
            'مهارات قوية في JavaScript و TypeScript',
            'خبرة في العمل مع APIs',
            'مهارات حل المشاكل والتفكير التحليلي'
          ],
          benefits: [
            'راتب تنافسي',
            'تأمين صحي شامل',
            'إجازة سنوية مدفوعة',
            'فرص تطوير مهني',
            'بيئة عمل مرنة'
          ]
        },
        {
          title: 'مطور ويب',
          company: 'شركة غسيل السيارات',
          location: 'جدة',
          type: 'دوام كامل',
          salary: '6,000 - 10,000 ريال',
          experience: '2-4 سنوات',
          description: 'نبحث عن مطور ويب موهوب لتطوير وتحسين موقعنا الإلكتروني',
          requirements: [
            'خبرة في React.js و Node.js',
            'مهارات قوية في HTML, CSS, JavaScript',
            'خبرة في قواعد البيانات',
            'مهارات في تحسين الأداء',
            'خبرة في العمل مع فريق تطوير'
          ],
          benefits: [
            'راتب تنافسي',
            'تأمين صحي شامل',
            'إجازة سنوية مدفوعة',
            'فرص تطوير مهني',
            'بيئة عمل مرنة'
          ]
        }
      ]
    },
    {
      id: 'operations',
      title: 'وظائف تشغيلية',
      icon: FaBuilding,
      color: 'green',
      jobs: [
        {
          title: 'مدير فرع',
          company: 'شركة غسيل السيارات',
          location: 'الدمام',
          type: 'دوام كامل',
          salary: '10,000 - 15,000 ريال',
          experience: '5-8 سنوات',
          description: 'نبحث عن مدير فرع موهوب لإدارة عمليات الفرع وضمان الجودة',
          requirements: [
            'خبرة في إدارة الفرق',
            'مهارات قيادية قوية',
            'خبرة في خدمة العملاء',
            'مهارات تحليلية قوية',
            'خبرة في إدارة المبيعات'
          ],
          benefits: [
            'راتب تنافسي',
            'تأمين صحي شامل',
            'إجازة سنوية مدفوعة',
            'مكافآت أداء',
            'فرص ترقية'
          ]
        },
        {
          title: 'مشرف عمليات',
          company: 'شركة غسيل السيارات',
          location: 'الرياض',
          type: 'دوام كامل',
          salary: '7,000 - 11,000 ريال',
          experience: '3-6 سنوات',
          description: 'نبحث عن مشرف عمليات لضمان سير العمل بكفاءة عالية',
          requirements: [
            'خبرة في الإشراف على العمليات',
            'مهارات تنظيمية قوية',
            'خبرة في إدارة الجودة',
            'مهارات تواصل ممتازة',
            'قدرة على حل المشاكل'
          ],
          benefits: [
            'راتب تنافسي',
            'تأمين صحي شامل',
            'إجازة سنوية مدفوعة',
            'فرص تطوير مهني',
            'مكافآت أداء'
          ]
        }
      ]
    },
    {
      id: 'customer-service',
      title: 'خدمة العملاء',
      icon: FaUsers,
      color: 'purple',
      jobs: [
        {
          title: 'ممثل خدمة عملاء',
          company: 'شركة غسيل السيارات',
          location: 'الرياض',
          type: 'دوام كامل',
          salary: '4,000 - 6,000 ريال',
          experience: '1-3 سنوات',
          description: 'نبحث عن ممثل خدمة عملاء موهوب لتقديم خدمة متميزة',
          requirements: [
            'مهارات تواصل ممتازة',
            'خبرة في خدمة العملاء',
            'قدرة على حل المشاكل',
            'مهارات في التعامل مع العملاء',
            'خبرة في استخدام أنظمة CRM'
          ],
          benefits: [
            'راتب تنافسي',
            'تأمين صحي شامل',
            'إجازة سنوية مدفوعة',
            'مكافآت أداء',
            'فرص تطوير مهني'
          ]
        },
        {
          title: 'مدير خدمة عملاء',
          company: 'شركة غسيل السيارات',
          location: 'جدة',
          type: 'دوام كامل',
          salary: '8,000 - 12,000 ريال',
          experience: '4-7 سنوات',
          description: 'نبحث عن مدير خدمة عملاء لقيادة فريق خدمة العملاء',
          requirements: [
            'خبرة في إدارة فرق خدمة العملاء',
            'مهارات قيادية قوية',
            'خبرة في تحليل البيانات',
            'مهارات في تحسين العمليات',
            'خبرة في إدارة الشكاوى'
          ],
          benefits: [
            'راتب تنافسي',
            'تأمين صحي شامل',
            'إجازة سنوية مدفوعة',
            'مكافآت أداء',
            'فرص ترقية'
          ]
        }
      ]
    },
    {
      id: 'marketing',
      title: 'التسويق والمبيعات',
      icon: FaHandshake,
      color: 'orange',
      jobs: [
        {
          title: 'مدير تسويق رقمي',
          company: 'شركة غسيل السيارات',
          location: 'الرياض',
          type: 'دوام كامل',
          salary: '9,000 - 14,000 ريال',
          experience: '4-7 سنوات',
          description: 'نبحث عن مدير تسويق رقمي موهوب لتطوير استراتيجيات التسويق',
          requirements: [
            'خبرة في التسويق الرقمي',
            'مهارات في إدارة وسائل التواصل الاجتماعي',
            'خبرة في Google Ads و Facebook Ads',
            'مهارات تحليلية قوية',
            'خبرة في تحسين معدل التحويل'
          ],
          benefits: [
            'راتب تنافسي',
            'تأمين صحي شامل',
            'إجازة سنوية مدفوعة',
            'مكافآت أداء',
            'فرص تطوير مهني'
          ]
        },
        {
          title: 'مندوب مبيعات',
          company: 'شركة غسيل السيارات',
          location: 'الدمام',
          type: 'دوام كامل',
          salary: '5,000 - 8,000 ريال',
          experience: '2-4 سنوات',
          description: 'نبحث عن مندوب مبيعات موهوب لتطوير قاعدة عملاء جديدة',
          requirements: [
            'مهارات مبيعات قوية',
            'خبرة في المبيعات الميدانية',
            'مهارات تواصل ممتازة',
            'قدرة على إقناع العملاء',
            'خبرة في إدارة العلاقات مع العملاء'
          ],
          benefits: [
            'راتب تنافسي + عمولة',
            'تأمين صحي شامل',
            'إجازة سنوية مدفوعة',
            'مكافآت أداء',
            'فرص تطوير مهني'
          ]
        }
      ]
    }
  ];

  const locations = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة', 'الطائف'];

  const filteredCategories = selectedCategory === 'all' 
    ? jobCategories 
    : jobCategories.filter(cat => cat.id === selectedCategory);

  const filteredJobs = filteredCategories.flatMap(cat => 
    cat.jobs.filter(job => {
      const matchesSearch = job.title.includes(searchTerm) || 
                           job.description.includes(searchTerm) ||
                           job.company.includes(searchTerm);
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
      return matchesSearch && matchesLocation;
    })
  );

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="الوظائف المتاحة"
          subtitle="انضم إلى فريقنا المتميز وابدأ رحلة مهنية ناجحة"
          breadcrumbs={['الرئيسية', 'الوظائف']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* الترحيب */}
          <div className={`mb-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-12 text-white text-center">
              <div 
                className={`mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'welcome-title' ? 'scale-105' : ''
                }`}
                onClick={() => handleItemClick('انضم إلى فريقنا المتميز')}
                onMouseEnter={() => setHoveredItem('welcome-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaBriefcase className={`text-5xl mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'welcome-title' ? 'scale-110 animate-bounce' : ''
                }`} />
                <h2 className={`text-3xl font-bold mb-4 transition-all duration-300 ${
                  hoveredItem === 'welcome-title' ? 'text-yellow-200 scale-105' : ''
                }`}>
                  انضم إلى فريقنا المتميز
                </h2>
              </div>
              <p className="text-xl opacity-90 mb-6">
                نبحث عن مواهب متميزة للانضمام إلى فريقنا المتطور. 
                نقدم بيئة عمل محفزة وفرص تطوير مهني ممتازة.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div 
                  className={`bg-white bg-opacity-20 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'growth' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('نمو مهني')}
                  onMouseEnter={() => setHoveredItem('growth')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaRocket className="text-2xl mx-auto mb-2" />
                  <p className="font-bold">نمو مهني</p>
                </div>
                <div 
                  className={`bg-white bg-opacity-20 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'benefits' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('مزايا ممتازة')}
                  onMouseEnter={() => setHoveredItem('benefits')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaStar className="text-2xl mx-auto mb-2" />
                  <p className="font-bold">مزايا ممتازة</p>
                </div>
                <div 
                  className={`bg-white bg-opacity-20 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'team' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('فريق متميز')}
                  onMouseEnter={() => setHoveredItem('team')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaUsers className="text-2xl mx-auto mb-2" />
                  <p className="font-bold">فريق متميز</p>
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
                    hoveredItem === 'search-title' ? 'text-emerald-600' : 'text-gray-800'
                  }`}
                  onClick={() => handleItemClick('ابحث عن وظيفة')}
                  onMouseEnter={() => setHoveredItem('search-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  ابحث عن وظيفة مناسبة لك
                </h2>
                <p className="text-gray-600">ابحث في الوظائف المتاحة أو اختر فئة وظيفية</p>
              </div>
              
              <div className="space-y-6">
                {/* البحث */}
                <div className="relative max-w-2xl mx-auto">
                  <div className={`relative transition-all duration-300 ${
                    hoveredItem === 'search-input' ? 'scale-105' : ''
                  }`}>
                    <input
                      type="text"
                      placeholder="اكتب اسم الوظيفة أو الكلمات المفتاحية..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-300 text-lg"
                      onMouseEnter={() => setHoveredItem('search-input')}
                      onMouseLeave={() => setHoveredItem(null)}
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  </div>
                </div>

                {/* فلاتر */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-6 py-3 rounded-xl font-bold border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-300"
                  >
                    <option value="all">جميع الفئات</option>
                    {jobCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-6 py-3 rounded-xl font-bold border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-300"
                  >
                    <option value="all">جميع المواقع</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* قائمة الوظائف */}
          <div className={`space-y-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {filteredJobs.map((job, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-emerald-300 transition-all duration-300 cursor-pointer transform hover:scale-102 active:scale-98 ${
                  animateElements ? 'animate-fade-in-up' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => handleItemClick(job.title)}
                onMouseEnter={() => setHoveredItem(`job-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hoveredItem === `job-${index}` ? 'scale-110 bg-emerald-600' : ''
                      }`}>
                        <FaBriefcase className="text-white text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${
                          hoveredItem === `job-${index}` ? 'text-emerald-600 scale-105' : 'text-gray-800'
                        }`}>
                          {job.title}
                        </h3>
                        <p className="text-gray-600 text-lg mb-4">{job.company}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaMoneyBillWave />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaGraduationCap />
                            {job.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-3">المتطلبات:</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-gray-700">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-3">المزايا:</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start gap-2 text-gray-700">
                            <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      className={`flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        clickedItem === `تقدم للوظيفة - ${job.title}` ? 'scale-95 bg-emerald-700' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(`تقدم للوظيفة - ${job.title}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`apply-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <FaUpload />
                      تقدم للوظيفة
                    </button>
                    <button 
                      className={`flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-gray-200 ${
                        clickedItem === `حفظ الوظيفة - ${job.title}` ? 'scale-95 bg-gray-300' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(`حفظ الوظيفة - ${job.title}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`save-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <FaHeart />
                      حفظ الوظيفة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* قسم التواصل */}
          <div className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
              <h2 
                className={`text-3xl font-bold mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'contact-title' ? 'text-yellow-200' : ''
                }`}
                onClick={() => handleItemClick('تواصل معنا')}
                onMouseEnter={() => setHoveredItem('contact-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                لم تجد الوظيفة المناسبة؟ تواصل معنا
              </h2>
              <p className="text-xl mb-8 opacity-90">يمكنك إرسال سيرتك الذاتية وسنتواصل معك عند توفر فرص مناسبة</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'email-jobs' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('راسلنا للوظائف')}
                  onMouseEnter={() => setHoveredItem('email-jobs')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaEnvelope className="text-3xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">راسلنا</h3>
                  <p className="opacity-90">jobs@paypasss.com</p>
                </div>
                
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'phone-jobs' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('اتصل بنا للوظائف')}
                  onMouseEnter={() => setHoveredItem('phone-jobs')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaPhone className="text-3xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">اتصل بنا</h3>
                  <p className="opacity-90" dir="ltr">+966 56 890 9183</p>
                </div>
                
                <div 
                  className={`bg-white bg-opacity-20 p-6 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'whatsapp-jobs' ? 'bg-opacity-30 scale-105' : ''
                  }`}
                  onClick={() => handleItemClick('واتساب للوظائف')}
                  onMouseEnter={() => setHoveredItem('whatsapp-jobs')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaWhatsapp className="text-3xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">واتساب</h3>
                  <p className="opacity-90">رد فوري على الرسائل</p>
                </div>
              </div>
            </div>
          </div>

          {/* إحصائيات الوظائف */}
          <div className={`mt-16 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="grid md:grid-cols-4 gap-6">
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-1' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الوظائف')}
                onMouseEnter={() => setHoveredItem('stats-1')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaBriefcase className={`text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300 ${
                  hoveredItem === 'stats-1' ? 'scale-110 text-emerald-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">+50</h3>
                <p className="text-gray-600">وظيفة متاحة</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-2' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الموظفين')}
                onMouseEnter={() => setHoveredItem('stats-2')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaUsers className={`text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300 ${
                  hoveredItem === 'stats-2' ? 'scale-110 text-emerald-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">+200</h3>
                <p className="text-gray-600">موظف نشط</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-3' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الفروع')}
                onMouseEnter={() => setHoveredItem('stats-3')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaBuilding className={`text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300 ${
                  hoveredItem === 'stats-3' ? 'scale-110 text-emerald-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">+20</h3>
                <p className="text-gray-600">فرع في المملكة</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-4' ? 'shadow-xl shadow-emerald-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الرضا')}
                onMouseEnter={() => setHoveredItem('stats-4')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaStar className={`text-4xl mx-auto mb-4 text-emerald-500 transition-all duration-300 ${
                  hoveredItem === 'stats-4' ? 'scale-110 text-emerald-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">4.9</h3>
                <p className="text-gray-600">تقييم الموظفين</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs; 