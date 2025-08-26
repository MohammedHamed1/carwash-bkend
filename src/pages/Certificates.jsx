import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaAward, FaCertificate, FaShieldAlt, FaGlobe, FaStar, FaCheckCircle, FaDownload, FaEye, FaCalendar, FaSearch, FaFilter, FaArrowRight } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const categories = [
    { id: 'all', name: 'جميع الشهادات' },
    { id: 'security', name: 'الأمان السيبراني' },
    { id: 'quality', name: 'إدارة الجودة' },
    { id: 'technology', name: 'التكنولوجيا' },
    { id: 'business', name: 'الأعمال' },
    { id: 'awards', name: 'الجوائز' }
  ];

  const certificates = [
    {
      id: 1,
      name: 'شهادة ISO 27001 للأمان السيبراني',
      category: 'security',
      issuer: 'المنظمة الدولية للمعايير',
      date: '2024-01-15',
      expiry: '2027-01-15',
      description: 'شهادة معترف بها دولياً لإدارة أمن المعلومات وحماية البيانات.',
      details: 'هذه الشهادة تؤكد التزامنا بأعلى معايير الأمان السيبراني وحماية بيانات عملائنا. تم الحصول عليها بعد مراجعة شاملة لجميع إجراءات الأمان والبنية التحتية.',
      requirements: [
        'تطبيق إطار عمل شامل لإدارة أمن المعلومات',
        'إجراء تدقيق أمني شامل كل 6 أشهر',
        'تدريب مستمر للموظفين على الأمان',
        'تحديث مستمر لسياسات الأمان'
      ],
      benefits: [
        'تعزيز ثقة العملاء',
        'الامتثال للمعايير الدولية',
        'تحسين إجراءات الأمان',
        'التميز في السوق'
      ],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      status: 'active',
      level: 'gold',
      downloadUrl: '#'
    },
    {
      id: 2,
      name: 'جائزة أفضل شركة تقنية 2024',
      category: 'awards',
      issuer: 'مجلة التكنولوجيا العربية',
      date: '2024-01-10',
      expiry: null,
      description: 'جائزة سنوية تمنح لأفضل شركة تقنية في المنطقة العربية.',
      details: 'حصلنا على هذه الجائزة المرموقة تقديراً لابتكاراتنا في مجال التكنولوجيا المالية وتطوير حلول الدفع الإلكتروني المتقدمة.',
      requirements: [
        'ابتكارات تقنية متميزة',
        'تأثير إيجابي على السوق',
        'نمو مستمر في الأعمال',
        'رضا العملاء العالي'
      ],
      benefits: [
        'تعزيز السمعة التجارية',
        'زيادة الثقة في السوق',
        'جذب المواهب المتميزة',
        'توسيع نطاق الأعمال'
      ],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      status: 'active',
      level: 'platinum',
      downloadUrl: '#'
    },
    {
      id: 3,
      name: 'شهادة PCI DSS للدفع الإلكتروني',
      category: 'security',
      issuer: 'مجلس معايير أمان صناعة البطاقات',
      date: '2023-12-20',
      expiry: '2026-12-20',
      description: 'شهادة معيار أمان بيانات صناعة البطاقات للدفع الإلكتروني.',
      details: 'هذه الشهادة ضرورية لجميع الشركات التي تتعامل مع بيانات البطاقات البنكية. تؤكد التزامنا بحماية بيانات العملاء المالية.',
      requirements: [
        'حماية بيانات البطاقات البنكية',
        'تطبيق تشفير قوي للبيانات',
        'مراقبة مستمرة للأنظمة',
        'اختبارات أمنية منتظمة'
      ],
      benefits: [
        'الامتثال للمعايير الدولية',
        'حماية بيانات العملاء',
        'تعزيز الثقة في الخدمات',
        'توسيع نطاق الأعمال'
      ],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      status: 'active',
      level: 'gold',
      downloadUrl: '#'
    },
    {
      id: 4,
      name: 'شهادة ISO 9001 لإدارة الجودة',
      category: 'quality',
      issuer: 'المنظمة الدولية للمعايير',
      date: '2023-11-15',
      expiry: '2026-11-15',
      description: 'شهادة إدارة الجودة المعترف بها دولياً.',
      details: 'هذه الشهادة تؤكد التزامنا بتطبيق نظام إدارة جودة شامل يضمن تقديم خدمات متميزة لعملائنا.',
      requirements: [
        'تطبيق نظام إدارة جودة شامل',
        'قياس وتحسين الأداء المستمر',
        'رضا العملاء العالي',
        'تدريب مستمر للموظفين'
      ],
      benefits: [
        'تحسين جودة الخدمات',
        'زيادة رضا العملاء',
        'تحسين الكفاءة التشغيلية',
        'التميز في السوق'
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      status: 'active',
      level: 'silver',
      downloadUrl: '#'
    },
    {
      id: 5,
      name: 'جائزة الابتكار في التكنولوجيا المالية',
      category: 'awards',
      issuer: 'مؤسسة التمويل الدولية',
      date: '2023-10-20',
      expiry: null,
      description: 'جائزة تمنح للشركات المبتكرة في مجال التكنولوجيا المالية.',
      details: 'حصلنا على هذه الجائزة تقديراً لابتكاراتنا في تطوير حلول الدفع الإلكتروني المتقدمة.',
      requirements: [
        'ابتكارات تقنية متميزة',
        'تأثير إيجابي على القطاع المالي',
        'قابلية التطبيق العملي',
        'قابلية التوسع'
      ],
      benefits: [
        'تعزيز السمعة التقنية',
        'جذب الاستثمارات',
        'توسيع الشراكات',
        'زيادة المبيعات'
      ],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      status: 'active',
      level: 'gold',
      downloadUrl: '#'
    },
    {
      id: 6,
      name: 'شهادة AWS Solutions Architect',
      category: 'technology',
      issuer: 'Amazon Web Services',
      date: '2023-09-10',
      expiry: '2026-09-10',
      description: 'شهادة معمارية الحلول من أمازون ويب سيرفيس.',
      details: 'هذه الشهادة تؤكد خبرتنا في تصميم وتطبيق الحلول السحابية المتقدمة.',
      requirements: [
        'فهم عميق لخدمات AWS',
        'تصميم حلول سحابية متقدمة',
        'تحسين الأداء والتكلفة',
        'ضمان الأمان والموثوقية'
      ],
      benefits: [
        'تحسين البنية التحتية',
        'تقليل التكاليف التشغيلية',
        'زيادة المرونة والتوسع',
        'تحسين الأداء'
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      status: 'active',
      level: 'silver',
      downloadUrl: '#'
    },
    {
      id: 7,
      name: 'شهادة CISSP للأمان السيبراني',
      category: 'security',
      issuer: 'معهد أمن المعلومات',
      date: '2023-08-15',
      expiry: '2026-08-15',
      description: 'شهادة أخصائي أمن المعلومات المعتمد.',
      details: 'هذه الشهادة تؤكد خبرة فريقنا في مجال الأمان السيبراني وحماية المعلومات.',
      requirements: [
        'خبرة 5 سنوات في الأمان السيبراني',
        'اجتياز اختبار شامل',
        'التزام بأخلاقيات المهنة',
        'تطوير مستمر للمهارات'
      ],
      benefits: [
        'تعزيز الخبرة الأمنية',
        'تحسين حماية البيانات',
        'زيادة ثقة العملاء',
        'التميز في السوق'
      ],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      status: 'active',
      level: 'gold',
      downloadUrl: '#'
    },
    {
      id: 8,
      name: 'جائزة أفضل خدمة عملاء 2023',
      category: 'awards',
      issuer: 'مجلس الجودة السعودي',
      date: '2023-07-20',
      expiry: null,
      description: 'جائزة تمنح لأفضل خدمة عملاء في القطاع التقني.',
      details: 'حصلنا على هذه الجائزة تقديراً لتميزنا في خدمة العملاء ورضاهم العالي.',
      requirements: [
        'رضا العملاء العالي',
        'سرعة الاستجابة',
        'جودة الخدمة',
        'الابتكار في الخدمة'
      ],
      benefits: [
        'تعزيز سمعة الشركة',
        'زيادة ولاء العملاء',
        'تحسين المبيعات',
        'جذب عملاء جدد'
      ],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
      status: 'active',
      level: 'silver',
      downloadUrl: '#'
    }
  ];

  const filteredCertificates = certificates.filter(certificate => {
    const matchesCategory = activeCategory === 'all' || certificate.category === activeCategory;
    const matchesSearch = certificate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { number: '25+', label: 'شهادة معتمدة', icon: FaCertificate },
    { number: '15+', label: 'جائزة حصل عليها', icon: FaTrophy },
    { number: '10+', label: 'معيار أمان', icon: FaShieldAlt },
    { number: 'مكتمل', label: 'امتثال للمعايير', icon: FaCheckCircle }
  ];

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'platinum': return 'from-purple-500 to-pink-500';
      case 'gold': return 'from-yellow-500 to-orange-500';
      case 'silver': return 'from-gray-400 to-gray-600';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'platinum': return 'بلاتيني';
      case 'gold': return 'ذهبي';
      case 'silver': return 'فضي';
      default: return 'عادي';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
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
          title="الشهادات والجوائز"
          subtitle="إنجازاتنا المعترف بها دولياً وشهادات الجودة والتميز"
          breadcrumbs={['الرئيسية', 'الشهادات والجوائز']}
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
                  hoveredItem === 'certificates-title' ? 'text-emerald-600' : ''
                }`}
                onClick={() => handleItemClick('عنوان الشهادات')}
                onMouseEnter={() => setHoveredItem('certificates-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                شهاداتنا
                <span className="text-emerald-600"> وجوائزنا</span>
              </h1>
              <p 
                className={`text-xl text-gray-600 max-w-3xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'certificates-description' ? 'text-gray-800' : ''
                }`}
                onClick={() => handleItemClick('وصف الشهادات')}
                onMouseEnter={() => setHoveredItem('certificates-description')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                نفتخر بشهاداتنا المعترف بها دولياً وجوائز التميز التي حصلنا عليها
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
                  <div className={`w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredItem === `stat-${index}` ? 'scale-110' : ''
                  }`}>
                    <stat.icon className={`text-white text-2xl transition-all duration-300 ${
                      hoveredItem === `stat-${index}` ? 'scale-110' : ''
                    }`} />
                  </div>
                  <div className={`text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 ${
                    hoveredItem === `stat-${index}` ? 'text-emerald-600 scale-110' : ''
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-lg mb-12"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث في الشهادات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${
                        hoveredItem === 'search-input' ? 'border-emerald-400' : ''
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
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
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

            {/* Certificates Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  variants={itemVariants}
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === `certificate-${certificate.id}` ? 'shadow-xl' : ''
                  }`}
                  onClick={() => {
                    setSelectedCertificate(certificate);
                    handleItemClick(`شهادة ${certificate.name}`);
                  }}
                  onMouseEnter={() => setHoveredItem(`certificate-${certificate.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative">
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-4 right-4 bg-gradient-to-r ${getLevelColor(certificate.level)} text-white px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                      hoveredItem === `certificate-${certificate.id}` ? 'scale-110' : ''
                    }`}>
                      {getLevelText(certificate.level)}
                    </div>
                    <div className={`absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                      hoveredItem === `certificate-${certificate.id}` ? 'scale-110' : ''
                    }`}>
                      {certificate.status === 'active' ? 'نشط' : 'منتهي'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FaCalendar className="text-emerald-500" />
                        <span>{certificate.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{certificate.issuer}</span>
                      </div>
                    </div>
                    <h3 
                      className={`text-xl font-bold text-gray-900 mb-3 transition-all duration-300 ${
                        hoveredItem === `certificate-${certificate.id}` ? 'text-emerald-600' : ''
                      }`}
                    >
                      {certificate.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{certificate.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaEye className="text-emerald-500" />
                          <span>عرض التفاصيل</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCertificate(certificate);
                          handleItemClick(`تفاصيل ${certificate.name}`);
                        }}
                        onMouseEnter={() => setHoveredItem(`details-${certificate.id}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`text-emerald-600 font-semibold hover:text-emerald-700 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
                          hoveredItem === `details-${certificate.id}` ? 'text-emerald-700 scale-105' : ''
                        }`}
                      >
                        التفاصيل
                        <FaArrowRight className={`text-sm transition-all duration-300 ${
                          hoveredItem === `details-${certificate.id}` ? 'translate-x-1' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Certificates Matter */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                لماذا الشهادات مهمة؟
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                الشهادات والجوائز تؤكد التزامنا بالتميز والجودة
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: FaShieldAlt,
                  title: 'الأمان والموثوقية',
                  description: 'تؤكد التزامنا بأعلى معايير الأمان وحماية البيانات'
                },
                {
                  icon: FaStar,
                  title: 'التميز في الجودة',
                  description: 'تؤكد التزامنا بتقديم خدمات عالية الجودة'
                },
                {
                  icon: FaGlobe,
                  title: 'الاعتراف الدولي',
                  description: 'تؤكد امتثالنا للمعايير الدولية المعترف بها'
                },
                {
                  icon: FaTrophy,
                  title: 'الابتكار والريادة',
                  description: 'تؤكد ريادتنا في مجال التكنولوجيا المالية'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
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

        {/* Certificate Details Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img 
                  src={selectedCertificate.image} 
                  alt={selectedCertificate.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`bg-gradient-to-r ${getLevelColor(selectedCertificate.level)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {getLevelText(selectedCertificate.level)}
                  </span>
                  {selectedCertificate.status === 'active' && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      نشط
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedCertificate.name}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">تفاصيل الشهادة</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">المصدر:</span>
                        <span className="font-semibold">{selectedCertificate.issuer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ الحصول:</span>
                        <span className="font-semibold">
                          {new Date(selectedCertificate.date).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      {selectedCertificate.expiry && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">تاريخ الانتهاء:</span>
                          <span className="font-semibold">
                            {new Date(selectedCertificate.expiry).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">المستوى:</span>
                        <span className={`font-semibold text-${getLevelColor(selectedCertificate.level).split('-')[1]}-600`}>
                          {getLevelText(selectedCertificate.level)}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">الوصف</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {selectedCertificate.details}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">المتطلبات</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedCertificate.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">الفوائد</h3>
                    <ul className="space-y-2">
                      {selectedCertificate.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <FaStar className="text-yellow-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <FaDownload />
                    تحميل الشهادة
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300"
                  >
                    مشاركة
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

export default Certificates; 