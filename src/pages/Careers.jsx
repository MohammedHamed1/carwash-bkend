import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaGraduationCap, FaUsers, FaRocket, FaHeart, FaLightbulb, FaShieldAlt, FaGlobe, FaArrowRight, FaSearch, FaFilter } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Careers = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'جميع الوظائف' },
    { id: 'technology', name: 'التكنولوجيا' },
    { id: 'marketing', name: 'التسويق' },
    { id: 'sales', name: 'المبيعات' },
    { id: 'support', name: 'الدعم الفني' },
    { id: 'management', name: 'الإدارة' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'مطور واجهات أمامية',
      department: 'technology',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      experience: '3-5 سنوات',
      education: 'بكالوريوس في علوم الحاسوب',
      description: 'نبحث عن مطور واجهات أمامية موهوب للانضمام إلى فريق التطوير لدينا.',
      requirements: [
        'خبرة 3-5 سنوات في تطوير الواجهات الأمامية',
        'إتقان React.js و JavaScript',
        'خبرة في HTML5 و CSS3',
        'فهم جيد لمبادئ UX/UI',
        'خبرة في العمل مع APIs',
        'مهارات حل المشاكل والتفكير التحليلي'
      ],
      responsibilities: [
        'تطوير واجهات مستخدم تفاعلية ومتجاوبة',
        'العمل مع فريق التصميم لتحسين تجربة المستخدم',
        'تحسين أداء التطبيقات',
        'المشاركة في مراجعات الكود',
        'البحث عن تقنيات جديدة وتطبيقها'
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي شامل',
        'إجازة سنوية 30 يوم',
        'فرص تدريب وتطوير',
        'بيئة عمل مرنة',
        'مكافآت الأداء'
      ],
      postedDate: '2024-01-15',
      applications: 25
    },
    {
      id: 2,
      title: 'مدير تسويق رقمي',
      department: 'marketing',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      experience: '5-7 سنوات',
      education: 'بكالوريوس في التسويق أو إدارة الأعمال',
      description: 'نبحث عن مدير تسويق رقمي متمرس لقيادة استراتيجيات التسويق الرقمي.',
      requirements: [
        'خبرة 5-7 سنوات في التسويق الرقمي',
        'خبرة في إدارة الحملات الإعلانية',
        'إتقان أدوات تحليل البيانات',
        'خبرة في SEO و SEM',
        'مهارات قيادية ممتازة',
        'خبرة في إدارة الميزانيات'
      ],
      responsibilities: [
        'تطوير وتنفيذ استراتيجيات التسويق الرقمي',
        'إدارة الحملات الإعلانية عبر المنصات المختلفة',
        'تحليل البيانات وقياس الأداء',
        'إدارة فريق التسويق الرقمي',
        'التعاون مع الأقسام الأخرى'
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي شامل',
        'إجازة سنوية 30 يوم',
        'مكافآت الأداء',
        'فرص التطوير المهني',
        'بيئة عمل ديناميكية'
      ],
      postedDate: '2024-01-12',
      applications: 18
    },
    {
      id: 3,
      title: 'مدير مبيعات',
      department: 'sales',
      location: 'جدة، المملكة العربية السعودية',
      type: 'دوام كامل',
      experience: '4-6 سنوات',
      education: 'بكالوريوس في إدارة الأعمال',
      description: 'نبحث عن مدير مبيعات موهوب لقيادة فريق المبيعات في منطقة جدة.',
      requirements: [
        'خبرة 4-6 سنوات في المبيعات',
        'خبرة في إدارة فرق المبيعات',
        'مهارات تواصل ممتازة',
        'خبرة في تطوير استراتيجيات المبيعات',
        'إتقان أدوات CRM',
        'خبرة في السوق السعودي'
      ],
      responsibilities: [
        'قيادة فريق المبيعات في المنطقة',
        'تطوير استراتيجيات المبيعات',
        'إدارة علاقات العملاء',
        'تحليل أداء المبيعات',
        'التدريب والتطوير للفريق'
      ],
      benefits: [
        'راتب تنافسي + عمولات',
        'تأمين صحي شامل',
        'إجازة سنوية 30 يوم',
        'مكافآت الأداء',
        'سيارة شركة',
        'فرص التطوير'
      ],
      postedDate: '2024-01-10',
      applications: 32
    },
    {
      id: 4,
      title: 'مطور خلفي',
      department: 'technology',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      experience: '3-5 سنوات',
      education: 'بكالوريوس في علوم الحاسوب',
      description: 'نبحث عن مطور خلفي موهوب للانضمام إلى فريق التطوير.',
      requirements: [
        'خبرة 3-5 سنوات في تطوير الخلفية',
        'إتقان Node.js و Python',
        'خبرة في قواعد البيانات',
        'فهم جيد لمعمارية الأنظمة',
        'خبرة في APIs و Microservices',
        'مهارات حل المشاكل'
      ],
      responsibilities: [
        'تطوير وتطبيق الخدمات الخلفية',
        'تصميم قواعد البيانات',
        'تحسين أداء الأنظمة',
        'العمل مع فريق DevOps',
        'كتابة وثائق تقنية'
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي شامل',
        'إجازة سنوية 30 يوم',
        'فرص التدريب',
        'بيئة عمل تقنية متقدمة',
        'مكافآت الأداء'
      ],
      postedDate: '2024-01-08',
      applications: 22
    },
    {
      id: 5,
              title: 'مختص خدمة عملاء',
      department: 'support',
      location: 'الدمام، المملكة العربية السعودية',
      type: 'دوام كامل',
      experience: '2-4 سنوات',
      education: 'بكالوريوس في تقنية المعلومات',
              description: 'نبحث عن مختص خدمة عملاء لمساعدة عملائنا وحل مشاكلهم.',
      requirements: [
        'خبرة 2-4 سنوات في الدعم الفني',
        'إتقان أنظمة التشغيل المختلفة',
        'مهارات تواصل ممتازة',
        'خبرة في أدوات الدعم الفني',
        'مهارات حل المشاكل',
        'خبرة في العمل مع العملاء'
      ],
      responsibilities: [
        'تقديم الدعم الفني للعملاء',
        'حل المشاكل التقنية',
        'تسجيل وتتبع المشاكل',
        'العمل مع فريق التطوير',
        'كتابة وثائق المساعدة'
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي شامل',
        'إجازة سنوية 25 يوم',
        'فرص التطوير',
        'بيئة عمل داعمة',
        'مكافآت الأداء'
      ],
      postedDate: '2024-01-05',
      applications: 15
    },
    {
      id: 6,
      title: 'مدير مشاريع',
      department: 'management',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'دوام كامل',
      experience: '6-8 سنوات',
      education: 'بكالوريوس في إدارة المشاريع أو تقنية المعلومات',
      description: 'نبحث عن مدير مشاريع متمرس لقيادة المشاريع التقنية المعقدة.',
      requirements: [
        'خبرة 6-8 سنوات في إدارة المشاريع',
        'شهادة PMP أو Prince2',
        'خبرة في إدارة المشاريع التقنية',
        'مهارات قيادية ممتازة',
        'إتقان أدوات إدارة المشاريع',
        'خبرة في إدارة الميزانيات والجداول الزمنية'
      ],
      responsibilities: [
        'قيادة المشاريع التقنية من البداية حتى النهاية',
        'إدارة الفرق والميزانيات',
        'التواصل مع أصحاب المصلحة',
        'إدارة المخاطر والمشاكل',
        'ضمان تسليم المشاريع في الوقت المحدد'
      ],
      benefits: [
        'راتب تنافسي',
        'تأمين صحي شامل',
        'إجازة سنوية 30 يوم',
        'مكافآت الأداء',
        'فرص التطوير المهني',
        'بيئة عمل ديناميكية'
      ],
      postedDate: '2024-01-03',
      applications: 28
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = activeCategory === 'all' || job.department === activeCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
  };

  const values = [
    {
      icon: FaHeart,
      title: 'الاهتمام بالموظفين',
      description: 'نضع رفاهية موظفينا في المقام الأول'
    },
    {
      icon: FaLightbulb,
      title: 'الابتكار',
      description: 'نشجع الأفكار الجديدة والإبداع'
    },
    {
      icon: FaShieldAlt,
      title: 'الأمان',
      description: 'نوفر بيئة عمل آمنة ومستقرة'
    },
    {
      icon: FaGlobe,
      title: 'التنوع',
      description: 'نحترم التنوع ونشجع الشمول'
    }
  ];

  const departmentsList = [
    {
      title: 'التكنولوجيا',
      count: '15',
      description: 'مطورين ومهندسين برمجيات',
      icon: '💻',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'التسويق',
      count: '8',
      description: 'متخصصين في التسويق الرقمي',
      icon: '📈',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'المبيعات',
      count: '12',
      description: 'مديري مبيعات ومندوبين',
      icon: '💰',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'الدعم الفني',
      count: '10',
              description: 'مختصين خدمة عملاء',
      icon: '🛠️',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'الإدارة',
      count: '5',
      description: 'مديري مشاريع وقادة فرق',
      icon: '👔',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'الموارد البشرية',
      count: '6',
      description: 'متخصصين في شؤون الموظفين',
      icon: '👥',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const benefits = [
    {
      title: 'راتب تنافسي',
      description: 'نقدم رواتب تنافسية في السوق مع مكافآت الأداء'
    },
    {
      title: 'تأمين صحي شامل',
      description: 'تأمين صحي شامل للعائلة مع تغطية شاملة'
    },
    {
      title: 'إجازة سنوية',
      description: '30 يوم إجازة سنوية مدفوعة الأجر'
    },
    {
      title: 'فرص التطوير',
      description: 'برامج تدريب وتطوير مستمرة'
    },
    {
      title: 'بيئة عمل مرنة',
      description: 'خيارات العمل عن بعد وساعات عمل مرنة'
    },
    {
      title: 'مكافآت الأداء',
      description: 'مكافآت مالية بناءً على الأداء والإنجازات'
    }
  ];

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
          title="الوظائف الشاغرة"
          subtitle="انضم إلى فريقنا المتميز وابدأ رحلتك المهنية معنا"
          breadcrumbs={['الرئيسية', 'الوظائف']}
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
                  hoveredItem === 'careers-title' ? 'text-blue-600' : ''
                }`}
                onClick={() => handleItemClick('عنوان الوظائف')}
                onMouseEnter={() => setHoveredItem('careers-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                انضم إلى فريقنا
                <span className="text-blue-600"> المتميز</span>
              </h1>
              <p 
                className={`text-xl text-gray-600 max-w-3xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'careers-description' ? 'text-gray-800' : ''
                }`}
                onClick={() => handleItemClick('وصف الوظائف')}
                onMouseEnter={() => setHoveredItem('careers-description')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                اكتشف الفرص المثيرة في بيئة عمل ديناميكية ومبتكرة، حيث يمكنك تطوير مهاراتك ونمو مهنتك
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg mb-12"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث عن وظيفة..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                        hoveredItem === 'search-input' ? 'border-blue-400' : ''
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
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
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

            {/* Jobs Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-3xl p-8 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === `job-${job.id}` ? 'shadow-xl' : ''
                  }`}
                  onClick={() => {
                    setSelectedJob(job);
                    handleItemClick(`وظيفة ${job.title}`);
                  }}
                  onMouseEnter={() => setHoveredItem(`job-${job.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 
                        className={`text-xl font-bold text-gray-900 mb-2 transition-all duration-300 ${
                          hoveredItem === `job-${job.id}` ? 'text-blue-600' : ''
                        }`}
                      >
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-blue-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="text-green-500" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      hoveredItem === `job-${job.id}` ? 'bg-blue-200 scale-110' : ''
                    }`}>
                      <FaBriefcase className="text-blue-600" />
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaGraduationCap className="text-purple-500" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-orange-500" />
                        <span>{job.applications} متقدم</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{job.postedDate}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJob(job);
                      handleItemClick(`تقدم لوظيفة ${job.title}`);
                    }}
                    onMouseEnter={() => setHoveredItem(`apply-${job.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                      hoveredItem === `apply-${job.id}` ? 'bg-blue-700 scale-105' : ''
                    }`}
                  >
                    تقدم الآن
                    <FaArrowRight className={`text-sm transition-all duration-300 ${
                      hoveredItem === `apply-${job.id}` ? 'translate-x-1' : ''
                    }`} />
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {filteredJobs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  لم نجد وظائف تطابق بحثك
                </h3>
                <p className="text-gray-600 mb-6">
                  جرب البحث بكلمات مختلفة أو تصفح جميع الوظائف
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  عرض جميع الوظائف
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Available Jobs Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50" id="available-jobs">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                الوظائف الشاغرة
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                اكتشف الفرص الوظيفية المثيرة في مختلف الأقسام والتخصصات
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departmentsList.map((department, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${department.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {department.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{department.count}</div>
                      <div className="text-sm text-gray-500">وظيفة</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {department.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {department.description}
                  </p>
                  <button className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                    تصفح الوظائف
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                لماذا تعمل معنا؟
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                نقدم بيئة عمل مثالية للنمو والتطوير المهني
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
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
                المزايا والفوائد
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                نقدم مجموعة شاملة من المزايا لضمان رفاهية موظفينا
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
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

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-12 text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                جاهز لبدء رحلتك معنا؟
              </h2>
              <p className="text-xl mb-8 opacity-90">
                إذا لم تجد الوظيفة المناسبة، أرسل لنا سيرتك الذاتية وسنتواصل معك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  أرسل سيرتك الذاتية
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300"
                >
                  تواصل معنا
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedJob.title}
                    </h2>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="text-blue-500" />
                        <span>{selectedJob.type}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">الوصف</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {selectedJob.description}
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">المتطلبات</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">المسؤوليات</h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">المزايا</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <FaHeart className="text-red-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">معلومات إضافية</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الخبرة المطلوبة:</span>
                          <span className="font-semibold">{selectedJob.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">المؤهل العلمي:</span>
                          <span className="font-semibold">{selectedJob.education}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">تاريخ النشر:</span>
                          <span className="font-semibold">
                            {new Date(selectedJob.postedDate).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">عدد المتقدمين:</span>
                          <span className="font-semibold">{selectedJob.applications}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <FaArrowRight />
                    تقدم للوظيفة
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    حفظ الوظيفة
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

export default Careers; 