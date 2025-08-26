import React, { useEffect, useState } from 'react';
import { FaHandshake, FaBuilding, FaGlobe, FaStar, FaAward, FaRocket, FaGem, FaMagic, FaFire, FaChartLine, FaLightbulb, FaUsers, FaMapMarkerAlt, FaClock, FaCheckCircle, FaCalendarAlt, FaPhone, FaEnvelope, FaWhatsapp, FaArrowRight, FaArrowLeft, FaPlus, FaMinus, FaExternalLinkAlt, FaDownload, FaPrint, FaHeart, FaEye, FaShare, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaTrophy, FaMedal, FaCrown, FaTruck } from 'react-icons/fa';
import PageHeader from './common/PageHeader';

const Partners = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedPartner, setExpandedPartner] = useState(null);

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

  const handlePartnerExpand = (partnerId) => {
    setExpandedPartner(expandedPartner === partnerId ? null : partnerId);
    handleItemClick(`شريك: ${partnerId}`);
  };

  const categories = [
    { id: 'all', name: 'جميع الشركاء', icon: FaHandshake },
    { id: 'technology', name: 'التقنية', icon: FaRocket },
    { id: 'automotive', name: 'السيارات', icon: FaBuilding },
    { id: 'cleaning', name: 'مواد التنظيف', icon: FaGem },
    { id: 'finance', name: 'الخدمات المالية', icon: FaStar },
    { id: 'logistics', name: 'الخدمات اللوجستية', icon: FaTruck }
  ];

  const partnersData = [
    {
      id: 1,
      name: 'شركة تويوتا السعودية',
      category: 'automotive',
      description: 'شراكة استراتيجية مع أكبر شركة سيارات في العالم لتقديم خدمات غسيل مخصصة لمالكي تويوتا',
      details: 'تم توقيع شراكة استراتيجية مع شركة تويوتا السعودية لتقديم خدمات غسيل السيارات المتميزة لمالكي سيارات تويوتا في جميع أنحاء المملكة. هذه الشراكة تضمن لمالكي تويوتا الحصول على خدمات مخصصة وخصومات خاصة.',
      benefits: [
        'خصومات خاصة لمالكي تويوتا',
        'خدمات مخصصة للسيارات',
        'ضمان إضافي على الخدمات',
        'خدمة عملاء متخصصة'
      ],
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
      logo: 'https://via.placeholder.com/150x80/FF6B35/FFFFFF?text=Toyota',
      website: 'https://www.toyota.com.sa',
      phone: '+966-11-456-7890',
      email: 'partnership@toyota.com.sa',
      location: 'الرياض، المملكة العربية السعودية',
      partnershipDate: '2024-01-15',
      featured: true,
              stats: { customers: '+10K', satisfaction: '98%', services: '50+' }
    },
    {
      id: 2,
      name: 'شركة مواد التنظيف الإيطالية',
      category: 'cleaning',
      description: 'شراكة مع أكبر شركة إيطالية لمواد التنظيف عالية الجودة',
      details: 'تم توقيع شراكة حصرية مع أكبر شركة إيطالية لمواد التنظيف عالية الجودة. هذه الشراكة تضمن لنا الحصول على أفضل المواد وأحدث التقنيات في مجال غسيل السيارات.',
      benefits: [
        'مواد تنظيف إيطالية عالية الجودة',
        'تقنيات تنظيف متطورة',
        'دعم فني مستمر',
        'تدريب فريق العمل'
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      logo: 'https://via.placeholder.com/150x80/00A651/FFFFFF?text=Italian+Clean',
      website: 'https://www.italianclean.com',
      phone: '+39-02-123-4567',
      email: 'info@italianclean.com',
      location: 'ميلانو، إيطاليا',
      partnershipDate: '2023-12-01',
      featured: true,
              stats: { quality: '99%', products: '100+', support: '7-11' }
    },
    {
      id: 3,
      name: 'بنك الراجحي',
      category: 'finance',
      description: 'شراكة مع أكبر بنك إسلامي في العالم لتقديم خدمات الدفع الإلكتروني',
      details: 'تم توقيع شراكة مع بنك الراجحي لتقديم خدمات الدفع الإلكتروني الآمنة والسريعة لعملائنا. هذه الشراكة تضمن تجربة دفع سلسة وآمنة.',
      benefits: [
        'خدمات دفع إلكتروني آمنة',
        'خصومات على العمولات',
        'خدمة عملاء متخصصة',
        'تقارير مالية مفصلة'
      ],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      logo: 'https://via.placeholder.com/150x80/00A651/FFFFFF?text=AlRajhi',
      website: 'https://www.alrajhibank.com.sa',
      phone: '+966-920-003-344',
      email: 'partnership@alrajhibank.com.sa',
      location: 'الرياض، المملكة العربية السعودية',
      partnershipDate: '2023-11-15',
      featured: false,
      stats: { transactions: '1M+', security: 'مضمون', uptime: '99.9%' }
    },
    {
      id: 4,
      name: 'شركة مايكروسوفت',
      category: 'technology',
      description: 'شراكة تقنية مع مايكروسوفت لتطوير حلول ذكية',
      details: 'تم توقيع شراكة تقنية مع شركة مايكروسوفت لتطوير حلول ذكية ومتطورة في مجال غسيل السيارات. هذه الشراكة تشمل تطوير تطبيقات ذكية واستخدام الذكاء الاصطناعي.',
      benefits: [
        'تطوير تطبيقات ذكية',
        'استخدام الذكاء الاصطناعي',
        'حلول سحابية متطورة',
        'دعم تقني مستمر'
      ],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      logo: 'https://via.placeholder.com/150x80/00A4EF/FFFFFF?text=Microsoft',
      website: 'https://www.microsoft.com',
      phone: '+1-425-882-8080',
      email: 'partnership@microsoft.com',
      location: 'ريدموند، واشنطن، الولايات المتحدة',
      partnershipDate: '2023-10-01',
      featured: false,
      stats: { apps: '10+', users: '100K+', rating: '4.8' }
    },
    {
      id: 5,
      name: 'شركة أرامكو',
      category: 'automotive',
      description: 'شراكة مع أكبر شركة نفط في العالم لخدمة موظفيها',
      details: 'تم توقيع شراكة مع شركة أرامكو لتقديم خدمات غسيل السيارات لموظفي الشركة في جميع أنحاء المملكة. هذه الشراكة تضمن خدمات متميزة لموظفي أرامكو.',
      benefits: [
        'خدمات مخصصة لموظفي أرامكو',
        'خصومات خاصة',
        'خدمة في مواقع العمل',
        'تقارير دورية'
      ],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      logo: 'https://via.placeholder.com/150x80/00A651/FFFFFF?text=Aramco',
      website: 'https://www.aramco.com',
      phone: '+966-11-874-8000',
      email: 'partnership@aramco.com.sa',
      location: 'الظهران، المملكة العربية السعودية',
      partnershipDate: '2023-09-15',
      featured: false,
      stats: { employees: '70K+', locations: '20+', satisfaction: '97%' }
    },
    {
      id: 6,
      name: 'شركة فيديكس',
      category: 'logistics',
      description: 'شراكة لوجستية مع فيديكس لتوصيل الخدمات',
      details: 'تم توقيع شراكة لوجستية مع شركة فيديكس لتقديم خدمات توصيل متطورة لعملائنا. هذه الشراكة تضمن توصيل سريع وآمن للخدمات.',
      benefits: [
        'خدمات توصيل سريعة',
        'تتبع الشحنات',
        'تغطية شاملة',
        'أسعار تنافسية'
      ],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      logo: 'https://via.placeholder.com/150x80/FF6600/FFFFFF?text=FedEx',
      website: 'https://www.fedex.com',
      phone: '+1-800-463-3339',
      email: 'partnership@fedex.com',
      location: 'ممفيس، تينيسي، الولايات المتحدة',
      partnershipDate: '2023-08-01',
      featured: false,
      stats: { deliveries: '500K+', coverage: '220+', speed: '24h' }
    }
  ];

  const filteredPartners = partnersData.filter(partner => {
    return selectedCategory === 'all' || partner.category === selectedCategory;
  });

  const stats = [
    { icon: FaHandshake, value: '20+', label: 'شريك استراتيجي', color: 'from-blue-500 to-purple-500' },
    { icon: FaGlobe, value: '15+', label: 'دولة', color: 'from-green-500 to-blue-500' },
    { icon: FaUsers, value: '100K+', label: 'عميل مشترك', color: 'from-purple-500 to-pink-500' },
    { icon: FaStar, value: '4.9', label: 'تقييم الشراكة', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="شركاؤنا الاستراتيجيون"
          subtitle="نفخر بشراكاتنا مع كبرى الشركات المحلية والعالمية"
          breadcrumbs={['الرئيسية', 'الشركاء']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* مقدمة الشركاء */}
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
                onClick={() => handleItemClick('مقدمة الشركاء')}
                onMouseEnter={() => setHoveredItem('partners-intro')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaHandshake className={`text-yellow-300 text-4xl mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'partners-intro' ? 'animate-bounce scale-110' : 'animate-pulse'
                }`} style={{animationDuration: '2s'}} />
                <h1 className={`text-4xl font-bold mb-4 text-white transition-all duration-300 ${
                  hoveredItem === 'partners-intro' ? 'scale-105 text-yellow-100' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  شركاؤنا الاستراتيجيون
                </h1>
                <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                  hoveredItem === 'partners-intro' ? 'opacity-100 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  نفخر بشراكاتنا مع كبرى الشركات المحلية والعالمية لتقديم أفضل الخدمات
                </p>
              </div>

              <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl border-2 border-white shadow-2xl">
                <p className="text-lg mb-6 leading-relaxed font-bold text-gray-800 text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                  على مدار سنوات من العمل الجاد، تمكنا من بناء شبكة قوية من الشركاء الاستراتيجيين 
                  الذين يشاركوننا رؤيتنا في تقديم أفضل خدمات غسيل السيارات لعملائنا الكرام.
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

          {/* فئات الشركاء */}
          <section className={`w-full py-8 bg-white rounded-xl shadow-lg mt-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6">
              <h2 
                className="text-2xl font-bold text-center mb-8 text-[#00916E] hover:text-green-600 transition-colors duration-300 cursor-pointer transform hover:scale-105 active:scale-95" 
                style={{fontFamily: 'Cairo, sans-serif'}}
                onClick={() => handleItemClick('فئات الشركاء')}
                onMouseEnter={() => setHoveredItem('partners-categories')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                فئات الشركاء
              </h2>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-800 border-green-300 shadow-lg'
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

          {/* الشركاء المميزون */}
          {filteredPartners.filter(partner => partner.featured).length > 0 && (
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
                  onClick={() => handleItemClick('الشركاء المميزون')}
                  onMouseEnter={() => setHoveredItem('featured-partners')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaCrown className={`text-yellow-300 text-4xl mx-auto mb-4 transition-all duration-300 ${
                    hoveredItem === 'featured-partners' ? 'animate-bounce scale-110' : 'animate-pulse'
                  }`} style={{animationDuration: '2s'}} />
                  <h2 className={`text-3xl font-bold mb-4 text-white transition-all duration-300 ${
                    hoveredItem === 'featured-partners' ? 'scale-105 text-yellow-100' : ''
                  }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                    الشركاء المميزون
                  </h2>
                  <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                    hoveredItem === 'featured-partners' ? 'opacity-100 scale-105' : ''
                  }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                    أهم شركائنا الاستراتيجيين
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPartners.filter(partner => partner.featured).map((partner, index) => (
                    <div
                      key={partner.id}
                      className={`bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95 group`}
                      onClick={() => handlePartnerExpand(partner.id)}
                      onMouseEnter={() => setHoveredItem(`featured-${partner.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="relative mb-4">
                        <img 
                          src={partner.image} 
                          alt={partner.name}
                          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          مميز
                        </div>
                        <div className="absolute top-2 left-2 bg-[#00916E] text-white px-2 py-1 rounded-full text-xs font-bold">
                          {new Date(partner.partnershipDate).getFullYear()}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} logo`}
                          className="h-12 object-contain"
                        />
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FaCalendarAlt className="text-[#00916E]" />
                          <span>{new Date(partner.partnershipDate).toLocaleDateString('ar-SA')}</span>
                        </div>
                      </div>
                      
                      <h3 className={`font-bold text-lg mb-3 text-gray-800 transition-all duration-300 ${
                        hoveredItem === `featured-${partner.id}` ? 'text-[#00916E] scale-105' : ''
                      }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                        {partner.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed" style={{fontFamily: 'Cairo, sans-serif'}}>
                        {partner.description}
                      </p>

                      {/* الإحصائيات */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {Object.entries(partner.stats).map(([key, value], statIndex) => (
                          <div key={statIndex} className="bg-green-50 p-2 rounded-lg text-center">
                            <div className="text-sm font-bold text-[#00916E]">{value}</div>
                            <div className="text-xs text-gray-600">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* تفاصيل إضافية */}
                      {expandedPartner === partner.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-bold text-sm mb-2 text-gray-800" style={{fontFamily: 'Cairo, sans-serif'}}>
                            فوائد الشراكة:
                          </h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {partner.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-center">
                                <FaCheckCircle className="text-[#00916E] mr-2 text-xs" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <FaPhone className="text-[#00916E] inline mr-1" />
                                {partner.phone}
                              </div>
                              <div>
                                <FaEnvelope className="text-[#00916E] inline mr-1" />
                                {partner.email}
                              </div>
                              <div className="col-span-2">
                                <FaMapMarkerAlt className="text-[#00916E] inline mr-1" />
                                {partner.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <button className="text-[#00916E] hover:text-green-600 transition-colors text-sm font-bold">
                          {expandedPartner === partner.id ? (
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
                        <a 
                          href={partner.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#00916E] hover:text-green-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(`زيارة موقع: ${partner.name}`);
                          }}
                        >
                          <FaExternalLinkAlt className="text-sm" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* جميع الشركاء */}
          <section className={`w-full py-12 bg-white rounded-xl shadow-lg mt-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6">
              <div 
                className="text-center mb-12 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('جميع الشركاء')}
                onMouseEnter={() => setHoveredItem('all-partners')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaHandshake className={`text-[#00916E] text-4xl mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'all-partners' ? 'animate-bounce scale-110' : 'animate-pulse'
                }`} style={{animationDuration: '2s'}} />
                <h2 className={`text-3xl font-bold mb-4 text-[#00916E] transition-all duration-300 ${
                  hoveredItem === 'all-partners' ? 'scale-105 text-green-600' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  جميع الشركاء
                </h2>
                <p className={`text-lg text-gray-600 font-medium transition-all duration-300 ${
                  hoveredItem === 'all-partners' ? 'text-gray-700 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  اطلع على جميع شركائنا الاستراتيجيين
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map((partner, index) => (
                  <div
                    key={partner.id}
                    className={`bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:bg-white hover:border-green-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95 group`}
                    onClick={() => handlePartnerExpand(partner.id)}
                    onMouseEnter={() => setHoveredItem(`partner-${partner.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="relative mb-4">
                      <img 
                        src={partner.image} 
                        alt={partner.name}
                        className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {partner.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          مميز
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-[#00916E] text-white px-2 py-1 rounded-full text-xs font-bold">
                        {new Date(partner.partnershipDate).getFullYear()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`}
                        className="h-10 object-contain"
                      />
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaCalendarAlt className="text-[#00916E]" />
                        <span>{new Date(partner.partnershipDate).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                    
                    <h3 className={`font-bold text-lg mb-3 text-gray-800 transition-all duration-300 ${
                      hoveredItem === `partner-${partner.id}` ? 'text-[#00916E] scale-105' : ''
                    }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                      {partner.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed" style={{fontFamily: 'Cairo, sans-serif'}}>
                      {partner.description}
                    </p>

                    {/* الإحصائيات */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(partner.stats).map(([key, value], statIndex) => (
                        <div key={statIndex} className="bg-green-50 p-2 rounded-lg text-center">
                          <div className="text-sm font-bold text-[#00916E]">{value}</div>
                          <div className="text-xs text-gray-600">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* تفاصيل إضافية */}
                    {expandedPartner === partner.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-bold text-sm mb-2 text-gray-800" style={{fontFamily: 'Cairo, sans-serif'}}>
                          فوائد الشراكة:
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {partner.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center">
                              <FaCheckCircle className="text-[#00916E] mr-2 text-xs" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <FaPhone className="text-[#00916E] inline mr-1" />
                              {partner.phone}
                            </div>
                            <div>
                              <FaEnvelope className="text-[#00916E] inline mr-1" />
                              {partner.email}
                            </div>
                            <div className="col-span-2">
                              <FaMapMarkerAlt className="text-[#00916E] inline mr-1" />
                              {partner.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <button className="text-[#00916E] hover:text-green-600 transition-colors text-sm font-bold">
                        {expandedPartner === partner.id ? (
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
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#00916E] hover:text-green-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(`زيارة موقع: ${partner.name}`);
                        }}
                      >
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPartners.length === 0 && (
                <div className="text-center py-12">
                  <FaHandshake className="text-gray-400 text-6xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2" style={{fontFamily: 'Cairo, sans-serif'}}>
                    لا توجد شراكات
                  </h3>
                  <p className="text-gray-500" style={{fontFamily: 'Cairo, sans-serif'}}>
                    جرب تغيير الفئة المحددة
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* إحصائيات الشراكة */}
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
                onClick={() => handleItemClick('إحصائيات الشراكة')}
                onMouseEnter={() => setHoveredItem('partnership-stats')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h2 className={`text-3xl font-bold mb-4 text-white transition-all duration-300 ${
                  hoveredItem === 'partnership-stats' ? 'scale-105 text-yellow-100' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  إحصائيات الشراكة
                </h2>
                <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                  hoveredItem === 'partnership-stats' ? 'opacity-100 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  أرقام وإحصائيات من عالم الشراكة
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

export default Partners; 