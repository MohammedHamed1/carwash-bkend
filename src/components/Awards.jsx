import React, { useEffect, useState } from 'react';
import { FaAward, FaTrophy, FaStar, FaMedal, FaCrown, FaGem, FaRocket, FaMagic, FaFire, FaChartLine, FaLightbulb, FaHandshake, FaUsers, FaMapMarkerAlt, FaClock, FaCheckCircle, FaCalendarAlt, FaBuilding, FaGlobe, FaShieldAlt, FaHeart, FaEye, FaShare, FaDownload, FaPrint, FaEnvelope, FaPhone, FaWhatsapp, FaArrowRight, FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';
import PageHeader from './common/PageHeader';

const Awards = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedAward, setExpandedAward] = useState(null);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // تأخير قصير لبدء التأثيرات الحركية
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // بدء تأثيرات العناصر عند التمرير
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    handleItemClick(`فئة: ${category}`);
  };

  const handleAwardExpand = (awardId) => {
    setExpandedAward(expandedAward === awardId ? null : awardId);
    handleItemClick(`جائزة: ${awardId}`);
  };

  const categories = [
    { id: 'all', name: 'جميع الجوائز', icon: FaAward },
    { id: 'service', name: 'جودة الخدمة', icon: FaStar },
    { id: 'customer', name: 'خدمة العملاء', icon: FaUsers },
    { id: 'innovation', name: 'الابتكار', icon: FaLightbulb },
    { id: 'business', name: 'التميز التجاري', icon: FaTrophy },
    { id: 'social', name: 'المسؤولية الاجتماعية', icon: FaHeart }
  ];

  const awardsData = [
    {
      id: 1,
      title: 'جائزة أفضل خدمة عملاء 2024',
      organization: 'مجلس الجودة السعودي',
      category: 'customer',
      year: '2024',
      description: 'فازت شركتنا بجائزة أفضل خدمة عملاء لعام 2024 من مجلس الجودة السعودي تقديراً للجهود المستمرة في تقديم خدمة عملاء متميزة.',
      details: 'هذه الجائزة تأتي تقديراً للجهود المستمرة في تقديم خدمة عملاء متميزة ورضا العملاء العالي الذي وصل إلى 99%. تم تقييم الشركة بناءً على معايير صارمة تشمل سرعة الاستجابة، جودة الحلول، رضا العملاء، والابتكار في الخدمة.',
      criteria: [
        'رضا العملاء بنسبة 99%',
        'سرعة الاستجابة خلال 5 دقائق',
        'جودة الحلول المقدمة',
        'الابتكار في خدمة العملاء'
      ],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      featured: true,
              stats: { customers: '10K+', satisfaction: '99%', response: '5min' }
    },
    {
      id: 2,
      title: 'جائزة التميز في جودة الخدمات',
      organization: 'وزارة التجارة والاستثمار',
      category: 'service',
      year: '2023',
      description: 'حصلت الشركة على جائزة التميز في جودة الخدمات من وزارة التجارة والاستثمار.',
      details: 'تم منح هذه الجائزة تقديراً للتميز في جودة الخدمات المقدمة والالتزام بأعلى معايير الجودة. تم تقييم الشركة على مدى عام كامل بناءً على معايير الجودة والسلامة والكفاءة.',
      criteria: [
        'جودة الخدمات المقدمة',
        'الالتزام بمعايير الجودة',
        'سلامة العمليات',
        'كفاءة الأداء'
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      featured: true,
      stats: { quality: '98%', safety: 'ممتاز', efficiency: '95%' }
    },
    {
      id: 3,
      title: 'جائزة الابتكار التقني',
      organization: 'هيئة تقنية المعلومات',
      category: 'innovation',
      year: '2023',
      description: 'فازت الشركة بجائزة الابتكار التقني لتطوير تطبيق الهاتف المحمول المتقدم.',
      details: 'تم منح هذه الجائزة تقديراً لتطوير تطبيق الهاتف المحمول المتقدم الذي أحدث ثورة في تجربة غسيل السيارات. التطبيق يتضمن تقنيات الذكاء الاصطناعي والواقع المعزز.',
      criteria: [
        'تطوير تقنيات مبتكرة',
        'تحسين تجربة المستخدم',
        'استخدام الذكاء الاصطناعي',
        'التأثير على الصناعة'
      ],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      featured: false,
      stats: { users: '100K+', rating: '4.8', downloads: '500K+' }
    },
    {
      id: 4,
      title: 'جائزة أفضل شركة ناشئة',
      organization: 'مجلس التنمية الاقتصادية',
      category: 'business',
      year: '2022',
      description: 'تم اختيار الشركة كأفضل شركة ناشئة في مجال الخدمات لعام 2022.',
      details: 'تم اختيار الشركة كأفضل شركة ناشئة في مجال الخدمات تقديراً للنمو السريع والنجاح في السوق. تم تقييم الشركة بناءً على النمو المالي، التوسع الجغرافي، والابتكار في الأعمال.',
      criteria: [
        'النمو المالي السريع',
        'التوسع الجغرافي',
        'الابتكار في الأعمال',
        'التأثير على السوق'
      ],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      featured: false,
      stats: { growth: '300%', branches: '50+', revenue: '10M+' }
    },
    {
      id: 5,
      title: 'جائزة المسؤولية الاجتماعية',
      organization: 'مؤسسة الملك خالد الخيرية',
      category: 'social',
      year: '2022',
      description: 'حصلت الشركة على جائزة المسؤولية الاجتماعية لدعمها للمجتمع المحلي.',
      details: 'تم منح هذه الجائزة تقديراً للجهود المبذولة في مجال المسؤولية الاجتماعية ودعم المجتمع المحلي. تشمل هذه الجهود برامج تعليمية للشباب ودعم الجمعيات الخيرية وحماية البيئة.',
      criteria: [
        'دعم المجتمع المحلي',
        'البرامج التعليمية',
        'حماية البيئة',
        'دعم الجمعيات الخيرية'
      ],
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&h=400&fit=crop',
      featured: false,
              stats: { projects: '25+', beneficiaries: '+10K', investment: '2M+' }
    },
    {
      id: 6,
      title: 'جائزة التميز في الإدارة',
      organization: 'المعهد السعودي للإدارة',
      category: 'business',
      year: '2021',
      description: 'فازت الشركة بجائزة التميز في الإدارة لتطبيقها أفضل ممارسات الإدارة الحديثة.',
      details: 'تم منح هذه الجائزة تقديراً لتطبيق أفضل ممارسات الإدارة الحديثة والابتكار في إدارة الموارد البشرية. تم تقييم الشركة بناءً على كفاءة الإدارة، تطوير الموظفين، والابتكار التنظيمي.',
      criteria: [
        'كفاءة الإدارة',
        'تطوير الموظفين',
        'الابتكار التنظيمي',
        'الاستدامة'
      ],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      featured: false,
      stats: { employees: '500+', training: '200hrs', retention: '95%' }
    }
  ];

  const filteredAwards = awardsData.filter(award => {
    return selectedCategory === 'all' || award.category === selectedCategory;
  });

  const stats = [
    { icon: FaTrophy, value: '15+', label: 'جائزة محققة', color: 'from-yellow-500 to-orange-500' },
    { icon: FaStar, value: '99%', label: 'رضا العملاء', color: 'from-green-500 to-blue-500' },
    { icon: FaUsers, value: '10K+', label: 'عميل راضي', color: 'from-purple-500 to-pink-500' },
    { icon: FaGlobe, value: 'فرع واحد', label: 'حالياً وقريباً في جميع أنحاء المملكة', color: 'from-indigo-500 to-cyan-500' }
  ];

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="الجوائز والإنجازات"
          subtitle="نفخر بإنجازاتنا والجوائز التي حصلنا عليها تقديراً لتميزنا"
          breadcrumbs={['الرئيسية', 'الجوائز']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* مقدمة الجوائز */}
          <section className={`w-full py-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-xl shadow-lg relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {/* خلفية متحركة */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
              <div 
                className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('مقدمة الجوائز')}
                onMouseEnter={() => setHoveredItem('awards-intro')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaTrophy className={`text-yellow-300 text-4xl mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'awards-intro' ? 'animate-bounce scale-110' : 'animate-pulse'
                }`} style={{animationDuration: '2s'}} />
                <h1 className={`text-4xl font-bold mb-4 text-white transition-all duration-300 ${
                  hoveredItem === 'awards-intro' ? 'scale-105 text-yellow-100' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  الجوائز والإنجازات
                </h1>
                <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                  hoveredItem === 'awards-intro' ? 'opacity-100 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  نفخر بإنجازاتنا والجوائز التي حصلنا عليها تقديراً لتميزنا في مجال غسيل السيارات
                </p>
              </div>

              <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl border-2 border-white shadow-2xl">
                <p className="text-lg mb-6 leading-relaxed font-bold text-gray-800 text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                  على مدار سنوات من العمل الجاد والالتزام بالتميز، حصلت شركتنا على العديد من الجوائز والإنجازات 
                  التي تعكس جهودنا المستمرة في تقديم أفضل خدمة لعملائنا الكرام.
                </p>
                
                <div className="grid md:grid-cols-4 gap-4 text-center text-base font-bold text-gray-700">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mr-3`}>
                        <stat.icon className="text-white text-sm" />
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#00916E]">{stat.value}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* فئات الجوائز */}
          <section className={`w-full py-8 bg-white rounded-xl shadow-lg mt-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6">
              <h2 
                className="text-2xl font-bold text-center mb-8 text-[#00916E] hover:text-green-600 transition-colors duration-300 cursor-pointer transform hover:scale-105 active:scale-95" 
                style={{fontFamily: 'Cairo, sans-serif'}}
                onClick={() => handleItemClick('فئات الجوائز')}
                onMouseEnter={() => setHoveredItem('awards-categories')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                فئات الجوائز
              </h2>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 ${
                      selectedCategory === category.id
                        ? 'bg-[#00916E] text-white border-[#00916E] shadow-lg'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:shadow-md'
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                    onMouseEnter={() => setHoveredItem(`category-${category.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="text-center">
                      <category.icon className={`text-2xl mx-auto mb-2 transition-all duration-300 ${
                        hoveredItem === `category-${category.id}` ? 'scale-110' : ''
                      }`} />
                      <h3 className="font-bold text-sm" style={{fontFamily: 'Cairo, sans-serif'}}>
                        {category.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* الجوائز المميزة */}
          {filteredAwards.filter(award => award.featured).length > 0 && (
            <section className={`w-full py-12 bg-gradient-to-br from-[#00916E] via-[#16c47a] to-[#00916E] rounded-xl shadow-xl relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {/* خلفية مزخرفة متحركة */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
                <div className="absolute top-1/4 right-0 w-24 h-24 bg-white rounded-full translate-x-12 animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full -translate-y-10 animate-ping" style={{animationDelay: '2s'}}></div>
              </div>
              
              <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
                <div 
                  className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => handleItemClick('الجوائز المميزة')}
                  onMouseEnter={() => setHoveredItem('featured-awards')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaCrown className={`text-yellow-300 text-4xl mx-auto mb-4 transition-all duration-300 ${
                    hoveredItem === 'featured-awards' ? 'animate-bounce scale-110' : 'animate-pulse'
                  }`} style={{animationDuration: '2s'}} />
                  <h2 className={`text-3xl font-bold mb-4 text-white transition-all duration-300 ${
                    hoveredItem === 'featured-awards' ? 'scale-105 text-yellow-100' : ''
                  }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                    الجوائز المميزة
                  </h2>
                  <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                    hoveredItem === 'featured-awards' ? 'opacity-100 scale-105' : ''
                  }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                    أهم الجوائز والإنجازات التي نفخر بها
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredAwards.filter(award => award.featured).map((award, index) => (
                    <div
                      key={award.id}
                      className={`bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95 group`}
                      onClick={() => handleAwardExpand(award.id)}
                      onMouseEnter={() => setHoveredItem(`featured-${award.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="relative mb-4">
                        <img 
                          src={award.image} 
                          alt={award.title}
                          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          مميز
                        </div>
                        <div className="absolute top-2 left-2 bg-[#00916E] text-white px-2 py-1 rounded-full text-xs font-bold">
                          {award.year}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <FaBuilding className="text-[#00916E]" />
                        <span>{award.organization}</span>
                        <FaCalendarAlt className="text-[#00916E] mr-2" />
                        <span>{award.year}</span>
                      </div>
                      
                      <h3 className={`font-bold text-lg mb-3 text-gray-800 transition-all duration-300 ${
                        hoveredItem === `featured-${award.id}` ? 'text-[#00916E] scale-105' : ''
                      }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                        {award.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed" style={{fontFamily: 'Cairo, sans-serif'}}>
                        {award.description}
                      </p>

                      {/* الإحصائيات */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {Object.entries(award.stats).map(([key, value], statIndex) => (
                          <div key={statIndex} className="bg-green-50 p-2 rounded-lg text-center">
                            <div className="text-sm font-bold text-[#00916E]">{value}</div>
                            <div className="text-xs text-gray-600">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* تفاصيل إضافية */}
                      {expandedAward === award.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-bold text-sm mb-2 text-gray-800" style={{fontFamily: 'Cairo, sans-serif'}}>
                            معايير التقييم:
                          </h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {award.criteria.map((criterion, criterionIndex) => (
                              <li key={criterionIndex} className="flex items-center">
                                <FaCheckCircle className="text-[#00916E] mr-2 text-xs" />
                                {criterion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <button className="text-[#00916E] hover:text-green-600 transition-colors text-sm font-bold">
                        {expandedAward === award.id ? (
                          <span className="flex items-center">
                            <FaMinus className="mr-1" />
                            إخفاء التفاصيل
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <FaPlus className="mr-1" />
                            عرض التفاصيل
                          </span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* جميع الجوائز */}
          <section className={`w-full py-12 bg-white rounded-xl shadow-lg mt-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6">
              <div 
                className="text-center mb-12 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('جميع الجوائز')}
                onMouseEnter={() => setHoveredItem('all-awards')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaAward className={`text-[#00916E] text-4xl mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'all-awards' ? 'animate-bounce scale-110' : 'animate-pulse'
                }`} style={{animationDuration: '2s'}} />
                <h2 className={`text-3xl font-bold mb-4 text-[#00916E] transition-all duration-300 ${
                  hoveredItem === 'all-awards' ? 'scale-105 text-green-600' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  جميع الجوائز
                </h2>
                <p className={`text-lg text-gray-600 font-medium transition-all duration-300 ${
                  hoveredItem === 'all-awards' ? 'text-gray-700 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  اطلع على جميع الجوائز والإنجازات التي حصلنا عليها
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAwards.map((award, index) => (
                  <div
                    key={award.id}
                    className={`bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:bg-white hover:border-green-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95 group`}
                    onClick={() => handleAwardExpand(award.id)}
                    onMouseEnter={() => setHoveredItem(`award-${award.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="relative mb-4">
                      <img 
                        src={award.image} 
                        alt={award.title}
                        className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {award.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          مميز
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-[#00916E] text-white px-2 py-1 rounded-full text-xs font-bold">
                        {award.year}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <FaBuilding className="text-[#00916E]" />
                      <span>{award.organization}</span>
                      <FaCalendarAlt className="text-[#00916E] mr-2" />
                      <span>{award.year}</span>
                    </div>
                    
                    <h3 className={`font-bold text-lg mb-3 text-gray-800 transition-all duration-300 ${
                      hoveredItem === `award-${award.id}` ? 'text-[#00916E] scale-105' : ''
                    }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                      {award.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed" style={{fontFamily: 'Cairo, sans-serif'}}>
                      {award.description}
                    </p>

                    {/* الإحصائيات */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(award.stats).map(([key, value], statIndex) => (
                        <div key={statIndex} className="bg-green-50 p-2 rounded-lg text-center">
                          <div className="text-sm font-bold text-[#00916E]">{value}</div>
                          <div className="text-xs text-gray-600">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* تفاصيل إضافية */}
                    {expandedAward === award.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-bold text-sm mb-2 text-gray-800" style={{fontFamily: 'Cairo, sans-serif'}}>
                          معايير التقييم:
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {award.criteria.map((criterion, criterionIndex) => (
                            <li key={criterionIndex} className="flex items-center">
                              <FaCheckCircle className="text-[#00916E] mr-2 text-xs" />
                              {criterion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button className="text-[#00916E] hover:text-green-600 transition-colors text-sm font-bold">
                      {expandedAward === award.id ? (
                        <span className="flex items-center">
                          <FaMinus className="mr-1" />
                          إخفاء التفاصيل
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FaPlus className="mr-1" />
                          عرض التفاصيل
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {filteredAwards.length === 0 && (
                <div className="text-center py-12">
                  <FaAward className="text-gray-400 text-6xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2" style={{fontFamily: 'Cairo, sans-serif'}}>
                    لا توجد جوائز
                  </h3>
                  <p className="text-gray-500" style={{fontFamily: 'Cairo, sans-serif'}}>
                    جرب تغيير الفئة المحددة
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* إحصائيات الجوائز */}
          <section className={`w-full py-10 bg-gradient-to-br from-[#00916E] via-[#16c47a] to-[#00916E] rounded-xl shadow-xl relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {/* خلفية مزخرفة متحركة */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
              <div className="absolute top-1/4 right-0 w-24 h-24 bg-white rounded-full translate-x-12 animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full -translate-y-10 animate-ping" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
              <div 
                className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('إحصائيات الجوائز')}
                onMouseEnter={() => setHoveredItem('awards-stats')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h2 className={`text-3xl font-bold mb-4 text-white transition-all duration-300 ${
                  hoveredItem === 'awards-stats' ? 'scale-105 text-yellow-100' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  إحصائيات الجوائز
                </h2>
                <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                  hoveredItem === 'awards-stats' ? 'opacity-100 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  أرقام وإحصائيات من عالم الإنجازات
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`group bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95`}
                    onClick={() => handleItemClick(`إحصائية: ${stat.label}`)}
                    onMouseEnter={() => setHoveredItem(`stat-${index}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                      <stat.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 transition-colors">{stat.value}</h3>
                    <p className="text-gray-700 font-bold text-base group-hover:text-gray-800 transition-colors" style={{fontFamily: 'Cairo, sans-serif'}}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

// إضافة CSS مخصص للتأثيرات الحركية
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.8s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.8s ease-out forwards;
  }

  .animate-scale-in {
    animation: scale-in 0.6s ease-out forwards;
  }

  .animate-bounce-in {
    animation: bounce-in 0.8s ease-out forwards;
  }

  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 145, 110, 0.15);
  }

  .glow-effect {
    position: relative;
    overflow: hidden;
  }

  .glow-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .glow-effect:hover::before {
    left: 100%;
  }

  .pulse-glow {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(0, 145, 110, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(0, 145, 110, 0);
    }
  }
`;

// إضافة الـ CSS إلى الـ head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Awards; 