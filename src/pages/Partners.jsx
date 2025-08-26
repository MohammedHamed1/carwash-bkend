import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaGlobe, FaAward, FaRocket, FaUsers, FaChartLine, FaLightbulb, FaShieldAlt, FaArrowRight, FaSearch, FaFilter, FaExternalLinkAlt, FaCrown } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import miskLogo from '../assets/misk.jpeg';
import alahliLogo from '../assets/alahli.jpeg';
import codLogo from '../assets/cod.jpeg';

const Partners = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const categories = [
    { id: 'all', name: 'جميع الشركاء' },
    { id: 'banks', name: 'البنوك' },
    { id: 'technology', name: 'التكنولوجيا' },
    { id: 'telecom', name: 'الاتصالات' },
    { id: 'retail', name: 'التجزئة' },
    { id: 'government', name: 'القطاع الحكومي' }
  ];

  const partners = [
    {
      id: 1,
      name: 'مؤسسة محمد بن سلمان (مسك)',
      category: 'government',
      logo: miskLogo,
      description: 'مؤسسة محمد بن سلمان الخيرية، شريكنا الاستراتيجي في تطوير ريادة الأعمال والابتكار.',
      partnership: 'شراكة استراتيجية في تطوير ريادة الأعمال والابتكار',
      achievements: [
        'تطوير برامج ريادة الأعمال',
        'دعم المشاريع الابتكارية',
        'تعزيز ثقافة الابتكار'
      ],
      website: 'https://hub.misk.org.sa/ar/misk-entrepreneurship/',
      location: 'الرياض، المملكة العربية السعودية',
      established: '2011',
      employees: '500+',
      revenue: 'مؤسسة خيرية',
      priority: true
    },
    {
      id: 2,
      name: 'البنك الأهلي السعودي',
      category: 'banks',
      logo: alahliLogo,
      description: 'أكبر بنك في المملكة العربية السعودية، نتعاون معه لتطوير حلول دفع إلكتروني متقدمة.',
      partnership: 'شراكة استراتيجية لتطوير البنية التحتية للدفع الإلكتروني',
      achievements: [
        'تطوير نظام دفع موحد',
        'تحسين تجربة العملاء',
        'زيادة الأمان في المعاملات'
      ],
      website: 'https://www.alahli.com/en/pages/personal-banking',
      location: 'الرياض، المملكة العربية السعودية',
      established: '1953',
      employees: '5000+',
      revenue: '50+ مليار ريال',
      priority: true
    },
    {
      id: 3,
      name: 'CODE - وزارة الاتصالات وتقنية المعلومات',
      category: 'government',
      logo: codLogo,
      description: 'مركز التميز للابتكار الرقمي، شريكنا في تطوير التقنيات الرقمية والحلول المبتكرة.',
      partnership: 'شراكة في تطوير التقنيات الرقمية والحلول المبتكرة',
      achievements: [
        'تطوير حلول رقمية متقدمة',
        'تعزيز الابتكار التقني',
        'دعم التحول الرقمي'
      ],
      website: 'https://code.mcit.gov.sa/ar',
      location: 'الرياض، المملكة العربية السعودية',
      established: '2020',
      employees: '200+',
      revenue: 'ميزانية حكومية',
      priority: true
    },
    {
      id: 4,
      name: 'STC',
      category: 'telecom',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=100&fit=crop',
      description: 'شركة الاتصالات السعودية، شريكنا في تطوير خدمات الدفع عبر الهاتف المحمول.',
      partnership: 'شراكة في تطوير خدمات الدفع عبر الهاتف المحمول',
      achievements: [
        'إطلاق خدمة الدفع عبر STC Pay',
        'تحسين تغطية الشبكة',
        'تطوير تطبيقات مالية'
      ],
      website: 'https://www.stc.com.sa',
      location: 'الرياض، المملكة العربية السعودية',
      established: '1998',
      employees: '15000+',
      revenue: '60+ مليار ريال'
    },
    {
      id: 5,
      name: 'Microsoft',
      category: 'technology',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
      description: 'شركة مايكروسوفت العالمية، شريكنا في تطوير الحلول التقنية المتقدمة.',
      partnership: 'شراكة في تطوير الحلول التقنية والذكاء الاصطناعي',
      achievements: [
        'تطوير حلول سحابية متقدمة',
        'استخدام الذكاء الاصطناعي',
        'تحسين الأمان السيبراني'
      ],
      website: 'https://www.microsoft.com',
      location: 'ريدموند، الولايات المتحدة الأمريكية',
      established: '1975',
      employees: '180000+',
      revenue: '200+ مليار دولار'
    },
    {
      id: 6,
      name: 'Jarir Bookstore',
      category: 'retail',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop',
      description: 'سلسلة متاجر جرير، شريكنا في تطوير حلول الدفع للتجارة الإلكترونية.',
      partnership: 'شراكة في تطوير حلول الدفع للتجارة الإلكترونية',
      achievements: [
        'تحسين تجربة التسوق الإلكتروني',
        'زيادة مبيعات التجارة الإلكترونية',
        'تطوير نظام دفع متكامل'
      ],
      website: 'https://www.jarir.com',
      location: 'الرياض، المملكة العربية السعودية',
      established: '1979',
      employees: '3000+',
      revenue: '5+ مليار ريال'
    },
    {
      id: 7,
      name: 'وزارة التجارة',
      category: 'government',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=100&fit=crop',
      description: 'وزارة التجارة السعودية، شريكنا في تطوير البنية التحتية للتجارة الإلكترونية.',
      partnership: 'شراكة في تطوير البنية التحتية للتجارة الإلكترونية',
      achievements: [
        'تطوير نظام التجارة الإلكترونية الوطني',
        'تحسين إجراءات الأعمال',
        'تعزيز الشفافية'
      ],
      website: 'https://www.mc.gov.sa',
      location: 'الرياض، المملكة العربية السعودية',
      established: '1953',
      employees: '5000+',
      revenue: 'ميزانية حكومية'
    },
    {
      id: 8,
      name: 'Amazon Web Services',
      category: 'technology',
      logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=100&fit=crop',
      description: 'خدمات أمازون السحابية، شريكنا في تطوير البنية التحتية السحابية.',
      partnership: 'شراكة في تطوير البنية التحتية السحابية',
      achievements: [
        'تطوير بنية تحتية سحابية آمنة',
        'تحسين الأداء والسرعة',
        'تقليل التكاليف التشغيلية'
      ],
      website: 'https://aws.amazon.com',
      location: 'سياتل، الولايات المتحدة الأمريكية',
      established: '2006',
      employees: '100000+',
      revenue: '80+ مليار دولار'
    },
    {
      id: 9,
      name: 'البنك السعودي الفرنسي',
      category: 'banks',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop',
      description: 'البنك السعودي الفرنسي، شريكنا في تطوير حلول مالية متقدمة.',
      partnership: 'شراكة في تطوير حلول مالية متقدمة',
      achievements: [
        'تطوير خدمات مصرفية رقمية',
        'تحسين تجربة العملاء',
        'زيادة الأمان في المعاملات'
      ],
      website: 'https://www.bsfr.com.sa',
      location: 'الرياض، المملكة العربية السعودية',
      established: '1977',
      employees: '3000+',
      revenue: '15+ مليار ريال'
    },
    {
      id: 10,
      name: 'Mobily',
      category: 'telecom',
      logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=100&fit=crop',
      description: 'شركة اتحاد اتصالات، شريكنا في تطوير خدمات الاتصالات والدفع.',
      partnership: 'شراكة في تطوير خدمات الاتصالات والدفع',
      achievements: [
        'تطوير خدمات دفع عبر الهاتف',
        'تحسين تغطية الشبكة',
        'تطوير تطبيقات مالية'
      ],
      website: 'https://www.mobily.com.sa',
      location: 'الرياض، المملكة العربية السعودية',
      established: '2004',
      employees: '5000+',
      revenue: '20+ مليار ريال'
    }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesCategory = activeCategory === 'all' || partner.category === activeCategory;
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    // الشركاء ذوي الأولوية أولاً
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    return 0;
  });

  const stats = [
    { number: '50+', label: 'شريك استراتيجي', icon: FaHandshake },
    { number: '100+', label: 'مشروع مشترك', icon: FaRocket },
    { number: '25+', label: 'دولة نعمل فيها', icon: FaGlobe },
    { number: '1M+', label: 'عميل نخدمهم', icon: FaUsers }
  ];

  const benefits = [
    {
      icon: FaLightbulb,
      title: 'الابتكار المشترك',
      description: 'نعمل مع شركائنا لتطوير حلول مبتكرة تلبي احتياجات السوق'
    },
    {
      icon: FaShieldAlt,
      title: 'الأمان والموثوقية',
      description: 'نضمن أعلى مستويات الأمان والموثوقية في جميع شراكاتنا'
    },
    {
      icon: FaChartLine,
      title: 'النمو المستمر',
      description: 'نساعد شركائنا على تحقيق النمو المستمر والتوسع في الأسواق'
    },
    {
      icon: FaAward,
      title: 'الجودة العالية',
      description: 'نقدم خدمات متميزة تساعد شركائنا على التفوق في السوق'
    }
  ];

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <PageHeader 
          title="شركاؤنا"
          subtitle="تعرف على شركائنا الاستراتيجيين الذين يساعدوننا في تحقيق رؤيتنا"
          breadcrumbs={['الرئيسية', 'شركاؤنا']}
        />

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 
                className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'partners-title' ? 'text-[#00916E]' : ''
                }`}
                onClick={() => handleItemClick('عنوان الشركاء')}
                onMouseEnter={() => setHoveredItem('partners-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                شركاؤنا
                <span className="text-[#00916E]"> الاستراتيجيون</span>
              </h1>
              <p 
                className={`text-xl text-gray-600 max-w-3xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'partners-description' ? 'text-gray-800' : ''
                }`}
                onClick={() => handleItemClick('وصف الشركاء')}
                onMouseEnter={() => setHoveredItem('partners-description')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                نعمل مع أفضل الشركاء في مختلف القطاعات لتقديم حلول متكاملة ومبتكرة
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === `stat-${index}` ? 'scale-110' : ''
                  }`}
                  onClick={() => handleItemClick(`إحصائيات ${stat.label}`)}
                  onMouseEnter={() => setHoveredItem(`stat-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-200 ${
                    hoveredItem === `stat-${index}` ? 'scale-110 shadow-2xl' : ''
                  }`}>
                    <stat.icon className={`text-white text-2xl transition-all duration-300 ${
                      hoveredItem === `stat-${index}` ? 'scale-110 animate-pulse' : ''
                    }`} />
                  </div>
                  <div className={`text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 ${
                    hoveredItem === `stat-${index}` ? 'text-[#00916E] scale-110' : ''
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Priority Partners Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <FaCrown className="text-yellow-500" />
                  شركاؤنا الاستراتيجيون
                </h2>
                <p className="text-gray-600">شركاؤنا الأوائل في تطوير حلول مبتكرة</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {filteredPartners.filter(partner => partner.priority).map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl border-2 border-green-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
                  >
                    {/* خلفية زخرفية */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
                    
                    {/* شارة الأولوية */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FaCrown className="w-3 h-3" />
                        شريك استراتيجي
                      </div>
                    </div>

                    <div className="relative z-10">
                      {/* الشعار */}
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80/10B981/FFFFFF?text=' + partner.name.charAt(0);
                          }}
                        />
                      </div>

                      {/* المعلومات */}
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{partner.name}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{partner.description}</p>
                        
                        {/* زر الموقع */}
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <FaExternalLinkAlt className="w-3 h-3" />
                          زيارة الموقع
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-lg mb-12"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث في الشركاء..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00916E] focus:border-transparent transition-all duration-300 ${
                        hoveredItem === 'search-input' ? 'border-[#00916E]' : ''
                      }`}
                      onMouseEnter={() => setHoveredItem('search-input')}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleItemClick('حقل البحث')}
                    />
                  </div>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        handleItemClick(`تصفية ${category.name}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`category-${category.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                        activeCategory === category.id
                          ? 'bg-[#00916E] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-[#00916E]'
                      } ${
                        hoveredItem === `category-${category.id}` ? 'scale-105' : ''
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Other Partners Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">جميع شركائنا</h2>
                <p className="text-gray-600">تعرف على جميع شركائنا المتميزين</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white rounded-3xl p-6 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-xl hover:shadow-green-200 ${
                      hoveredItem === `partner-${partner.id}` ? 'shadow-2xl shadow-green-300' : ''
                    }`}
                    onClick={() => {
                      setSelectedPartner(partner);
                      handleItemClick(`شريك ${partner.name}`);
                    }}
                    onMouseEnter={() => setHoveredItem(`partner-${partner.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="text-center mb-6">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden transition-all duration-300 ${
                        hoveredItem === `partner-${partner.id}` ? 'scale-110' : ''
                      }`}>
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 
                        className={`text-xl font-bold text-gray-900 mb-2 transition-all duration-300 ${
                          hoveredItem === `partner-${partner.id}` ? 'text-[#00916E]' : ''
                        }`}
                      >
                        {partner.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaGlobe className="text-[#00916E]" />
                        <span>{partner.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaUsers className="text-[#16c47a]" />
                        <span>{partner.employees} موظف</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaChartLine className="text-[#00916E]" />
                        <span>{partner.revenue}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPartner(partner);
                        handleItemClick(`تفاصيل ${partner.name}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`details-${partner.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`w-full bg-[#00916E] text-white py-3 rounded-xl font-semibold hover:bg-[#16c47a] transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                        hoveredItem === `details-${partner.id}` ? 'bg-[#16c47a] scale-105' : ''
                      }`}
                    >
                      تفاصيل الشراكة
                      <FaArrowRight className={`text-sm transition-all duration-300 ${
                        hoveredItem === `details-${partner.id}` ? 'translate-x-1' : ''
                      }`} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-green-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 
                className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'benefits-title' ? 'text-[#00916E]' : ''
                }`}
                onClick={() => handleItemClick('مزايا الشراكة')}
                onMouseEnter={() => setHoveredItem('benefits-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                مزايا الشراكة معنا
              </h2>
              <p 
                className={`text-xl text-gray-600 max-w-2xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'benefits-description' ? 'text-gray-800' : ''
                }`}
                onClick={() => handleItemClick('وصف المزايا')}
                onMouseEnter={() => setHoveredItem('benefits-description')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                نقدم لشركائنا مجموعة شاملة من المزايا والفوائد
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-3xl p-6 text-center shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-xl hover:shadow-green-200 ${
                    hoveredItem === `benefit-${index}` ? 'shadow-2xl shadow-green-300' : ''
                  }`}
                  onClick={() => handleItemClick(`ميزة ${benefit.title}`)}
                  onMouseEnter={() => setHoveredItem(`benefit-${index}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-200 ${
                    hoveredItem === `benefit-${index}` ? 'scale-110 shadow-2xl' : ''
                  }`}>
                    <benefit.icon className={`text-white text-2xl transition-all duration-300 ${
                      hoveredItem === `benefit-${index}` ? 'scale-110 animate-bounce' : ''
                    }`} />
                  </div>
                  <h3 
                    className={`text-xl font-bold text-gray-900 mb-3 transition-all duration-300 ${
                      hoveredItem === `benefit-${index}` ? 'text-[#00916E]' : ''
                    }`}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Partner */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-3xl p-12 text-white"
            >
              <h2 
                className={`text-3xl md:text-4xl font-bold mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'become-partner-title' ? 'text-yellow-100' : ''
                }`}
                onClick={() => handleItemClick('كن شريكاً معنا')}
                onMouseEnter={() => setHoveredItem('become-partner-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                كن شريكاً معنا
              </h2>
              <p 
                className={`text-xl mb-8 opacity-90 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'become-partner-description' ? 'opacity-100 text-yellow-50' : ''
                }`}
                onClick={() => handleItemClick('وصف الشراكة')}
                onMouseEnter={() => setHoveredItem('become-partner-description')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                انضم إلى شبكة شركائنا المتميزة واستفد من خبرتنا وحلولنا المتطورة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#00916E] px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                  onClick={() => handleItemClick('زر التواصل')}
                  onMouseEnter={() => setHoveredItem('contact-button')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className={`flex items-center justify-center transition-all duration-300 ${
                    hoveredItem === 'contact-button' ? 'scale-105' : ''
                  }`}>
                    تواصل معنا
                    <FaArrowRight className={`mr-2 transition-all duration-300 ${
                      hoveredItem === 'contact-button' ? 'translate-x-1 animate-pulse' : ''
                    }`} />
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#00916E] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                  onClick={() => handleItemClick('زر المزيد')}
                  onMouseEnter={() => setHoveredItem('more-button')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className={`flex items-center justify-center transition-all duration-300 ${
                    hoveredItem === 'more-button' ? 'scale-105' : ''
                  }`}>
                    تعرف على المزيد
                    <FaArrowRight className={`mr-2 transition-all duration-300 ${
                      hoveredItem === 'more-button' ? 'translate-x-1 animate-bounce' : ''
                    }`} />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partner Details Modal */}
        {selectedPartner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedPartner.logo} 
                      alt={selectedPartner.name}
                      className="h-16 object-contain"
                    />
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedPartner.name}
                      </h2>
                      <span className="bg-green-100 text-[#00916E] px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find(cat => cat.id === selectedPartner.category)?.name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPartner(null)}
                    className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">نبذة عن الشركة</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {selectedPartner.description}
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">نوع الشراكة</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {selectedPartner.partnership}
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">الإنجازات المشتركة</h3>
                    <ul className="space-y-2">
                      {selectedPartner.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#00916E] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات الشركة</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الموقع:</span>
                        <span className="font-semibold">{selectedPartner.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ التأسيس:</span>
                        <span className="font-semibold">{selectedPartner.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">عدد الموظفين:</span>
                        <span className="font-semibold">{selectedPartner.employees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الإيرادات:</span>
                        <span className="font-semibold">{selectedPartner.revenue}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">روابط مفيدة</h3>
                      <a
                        href={selectedPartner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#00916E] hover:text-[#16c47a] transition-colors duration-300"
                      >
                        <FaArrowRight />
                        زيارة الموقع الرسمي
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#00916E] to-[#16c47a] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                    onClick={() => handleItemClick('طلب شراكة')}
                    onMouseEnter={() => setHoveredItem('partnership-request')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <FaHandshake className={`transition-all duration-300 ${
                      hoveredItem === 'partnership-request' ? 'animate-bounce' : ''
                    }`} />
                    <span className={`transition-all duration-300 ${
                      hoveredItem === 'partnership-request' ? 'scale-105' : ''
                    }`}>
                      طلب شراكة
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-[#00916E] text-[#00916E] px-6 py-3 rounded-xl font-semibold hover:bg-[#00916E] hover:text-white transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                    onClick={() => handleItemClick('تواصل من النافذة المنبثقة')}
                    onMouseEnter={() => setHoveredItem('modal-contact')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className={`flex items-center gap-2 transition-all duration-300 ${
                      hoveredItem === 'modal-contact' ? 'scale-105' : ''
                    }`}>
                      <FaArrowRight className={`transition-all duration-300 ${
                        hoveredItem === 'modal-contact' ? 'translate-x-1 animate-pulse' : ''
                      }`} />
                      تواصل معنا
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default Partners; 