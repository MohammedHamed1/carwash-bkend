import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaEye, FaHeart, FaShare, FaSearch, FaFilter, FaArrowRight, FaNewspaper, FaTrophy, FaRocket, FaGlobe } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const News = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const categories = [
    { id: 'all', name: 'جميع الأخبار' },
    { id: 'company', name: 'أخبار الشركة' },
    { id: 'technology', name: 'التكنولوجيا' },
    { id: 'partnerships', name: 'الشراكات' },
    { id: 'awards', name: 'الجوائز والإنجازات' },
    { id: 'industry', name: 'أخبار الصناعة' }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'PayPasss تفتتح مقرها الجديد في الرياض',
      category: 'company',
      excerpt: 'افتتحت شركة PayPasss مقرها الجديد في برج المملكة بالرياض، مما يعكس نمو الشركة وتوسعها في السوق السعودي.',
      content: 'افتتحت شركة PayPasss مقرها الجديد في برج المملكة بالرياض، مما يعكس النمو المطرد للشركة وتوسعها في السوق السعودي. المقر الجديد يضم أحدث التقنيات وبيئة عمل متطورة لموظفي الشركة، ويشكل خطوة مهمة في رحلة النمو المستمر للشركة.',
      author: 'أحمد محمد',
      date: '2024-01-20',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
      readTime: '3 دقائق',
      views: 2150,
      likes: 156,
      featured: true,
      tags: ['افتتاح', 'مقر جديد', 'الرياض']
    },
    {
      id: 2,
      title: 'شراكة استراتيجية مع البنك الأهلي السعودي',
      category: 'partnerships',
      excerpt: 'أعلنت PayPasss عن شراكة استراتيجية مع البنك الأهلي السعودي لتطوير حلول دفع إلكتروني متقدمة.',
      content: 'أعلنت شركة PayPasss عن توقيع شراكة استراتيجية مع البنك الأهلي السعودي لتطوير حلول دفع إلكتروني متقدمة. هذه الشراكة ستساعد في تعزيز البنية التحتية للدفع الإلكتروني في المملكة وتقديم خدمات مالية أكثر تطوراً للعملاء.',
      author: 'سارة أحمد',
      date: '2024-01-18',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
      readTime: '4 دقائق',
      views: 1890,
      likes: 134,
      featured: true,
      tags: ['شراكة', 'البنك الأهلي', 'حلول دفع']
    },
    {
      id: 3,
      title: 'حصول PayPasss على جائزة أفضل شركة تقنية 2024',
      category: 'awards',
      excerpt: 'حصلت PayPasss على جائزة أفضل شركة تقنية لعام 2024 من مجلة التكنولوجيا العربية.',
      content: 'حصلت شركة PayPasss على جائزة أفضل شركة تقنية لعام 2024 من مجلة التكنولوجيا العربية. هذه الجائزة تعترف بالابتكار والتميز في مجال التكنولوجيا المالية والخدمات الرقمية التي تقدمها الشركة.',
      author: 'محمد علي',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
      readTime: '2 دقائق',
      views: 1650,
      likes: 98,
      featured: false,
      tags: ['جائزة', 'أفضل شركة تقنية', '2024']
    },
    {
      id: 4,
      title: 'إطلاق تطبيق PayPasss الجديد',
      category: 'technology',
      excerpt: 'أطلقت PayPasss تطبيقها الجديد مع ميزات متقدمة وتجربة مستخدم محسنة.',
      content: 'أطلقت شركة PayPasss تطبيقها الجديد مع ميزات متقدمة وتجربة مستخدم محسنة. التطبيق الجديد يتضمن تقنيات الذكاء الاصطناعي وتحسينات كبيرة في الأمان والسرعة، مما يوفر تجربة دفع سلسة وآمنة للمستخدمين.',
      author: 'فاطمة حسن',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
      readTime: '5 دقائق',
      views: 2340,
      likes: 187,
      featured: false,
      tags: ['تطبيق جديد', 'ميزات متقدمة', 'تجربة مستخدم']
    },
    {
      id: 5,
      title: 'توسع PayPasss في دول مجلس التعاون',
      category: 'company',
      excerpt: 'أعلنت PayPasss عن خطط التوسع في دول مجلس التعاون الخليجي خلال العام القادم.',
      content: 'أعلنت شركة PayPasss عن خطط التوسع في دول مجلس التعاون الخليجي خلال العام القادم. هذا التوسع يشمل افتتاح مكاتب في الإمارات وقطر والبحرين، مما يعزز حضور الشركة في المنطقة.',
      author: 'خالد عبدالله',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      readTime: '4 دقائق',
      views: 1780,
      likes: 123,
      featured: false,
      tags: ['توسع', 'مجلس التعاون', 'دول خليجية']
    },
    {
      id: 6,
      title: 'تقرير: نمو سوق الدفع الإلكتروني في السعودية',
      category: 'industry',
      excerpt: 'أصدرت PayPasss تقريراً مفصلاً عن نمو سوق الدفع الإلكتروني في المملكة العربية السعودية.',
      content: 'أصدرت شركة PayPasss تقريراً مفصلاً عن نمو سوق الدفع الإلكتروني في المملكة العربية السعودية. التقرير يسلط الضوء على التطورات الأخيرة والتوقعات المستقبلية للقطاع، مع التركيز على دور التكنولوجيا في تحويل المشهد المالي.',
      author: 'نورا محمد',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      readTime: '6 دقائق',
      views: 1450,
      likes: 89,
      featured: false,
      tags: ['تقرير', 'سوق الدفع', 'السعودية']
    },
    {
      id: 7,
      title: 'تعاون مع وزارة التجارة لتطوير التجارة الإلكترونية',
      category: 'partnerships',
      excerpt: 'وقعت PayPasss مذكرة تفاهم مع وزارة التجارة لتطوير البنية التحتية للتجارة الإلكترونية.',
      content: 'وقعت شركة PayPasss مذكرة تفاهم مع وزارة التجارة لتطوير البنية التحتية للتجارة الإلكترونية في المملكة. هذا التعاون يهدف إلى تسهيل عمليات الدفع الإلكتروني وتطوير النظام المالي الرقمي.',
      author: 'أحمد العلي',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      readTime: '3 دقائق',
      views: 1320,
      likes: 76,
      featured: false,
      tags: ['وزارة التجارة', 'التجارة الإلكترونية', 'مذكرة تفاهم']
    },
    {
      id: 8,
      title: 'إطلاق برنامج تدريبي للشباب السعودي',
      category: 'company',
      excerpt: 'أطلقت PayPasss برنامج تدريبي متخصص للشباب السعودي في مجال التكنولوجيا المالية.',
      content: 'أطلقت شركة PayPasss برنامج تدريبي متخصص للشباب السعودي في مجال التكنولوجيا المالية. البرنامج يهدف إلى تطوير مهارات الشباب وإعدادهم لسوق العمل في القطاع التقني.',
      author: 'سارة الخالد',
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      readTime: '4 دقائق',
      views: 980,
      likes: 67,
      featured: false,
      tags: ['برنامج تدريبي', 'الشباب السعودي', 'التكنولوجيا المالية']
    }
  ];

  const filteredNews = newsItems.filter(news => {
    const matchesCategory = activeCategory === 'all' || news.category === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { number: '500+', label: 'خبر منشور', icon: FaNewspaper },
    { number: '50+', label: 'جائزة حصل عليها', icon: FaTrophy },
    { number: '100+', label: 'شراكة استراتيجية', icon: FaRocket },
    { number: '25+', label: 'دولة نعمل فيها', icon: FaGlobe }
  ];

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
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
          title="مدونة PayPass"
          subtitle="آخر الأخبار والتطورات في عالم PayPass"
          breadcrumbs={['الرئيسية', 'مدونة PayPass']}
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
                                      hoveredItem === 'news-title' ? 'text-green-600' : ''
                }`}
                onClick={() => handleItemClick('عنوان الأخبار')}
                onMouseEnter={() => setHoveredItem('news-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                آخر
                                  <span className="text-green-600"> الأخبار</span>
              </h1>
              <p 
                className={`text-xl text-gray-600 max-w-3xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'news-description' ? 'text-gray-800' : ''
                }`}
                onClick={() => handleItemClick('وصف الأخبار')}
                onMouseEnter={() => setHoveredItem('news-description')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                اكتشف آخر التطورات والإنجازات في عالم PayPass والتكنولوجيا المالية
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
                  <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    hoveredItem === `stat-${index}` ? 'scale-110' : ''
                  }`}>
                    <stat.icon className={`text-white text-2xl transition-all duration-300 ${
                      hoveredItem === `stat-${index}` ? 'scale-110' : ''
                    }`} />
                  </div>
                  <div className={`text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 ${
                                          hoveredItem === `stat-${index}` ? 'text-green-600 scale-110' : ''
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
                      placeholder="ابحث في الأخبار..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
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
                                                  ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600'
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

            {/* Featured News */}
            {filteredNews.filter(news => news.featured).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-12"
              >
                <h2 
                  className={`text-2xl font-bold text-gray-900 mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'featured-title' ? 'text-green-600' : ''
                  }`}
                  onClick={() => handleItemClick('الأخبار المميزة')}
                  onMouseEnter={() => setHoveredItem('featured-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  الأخبار المميزة
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredNews.filter(news => news.featured).map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                        hoveredItem === `featured-${news.id}` ? 'shadow-xl' : ''
                      }`}
                      onClick={() => {
                        setSelectedNews(news);
                        handleItemClick(`خبر مميز ${news.title}`);
                      }}
                      onMouseEnter={() => setHoveredItem(`featured-${news.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="relative">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          مميز
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <FaCalendar className="text-green-500" />
                            <span>{news.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaUser className="text-green-500" />
                            <span>{news.author}</span>
                          </div>
                        </div>
                        <h3 
                          className={`text-xl font-bold text-gray-900 mb-3 transition-all duration-300 ${
                            hoveredItem === `featured-${news.id}` ? 'text-green-600' : ''
                          }`}
                        >
                          {news.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <FaEye className="text-green-500" />
                              <span>{news.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaHeart className="text-red-500" />
                              <span>{news.likes}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedNews(news);
                              handleItemClick(`اقرأ المزيد ${news.title}`);
                            }}
                            onMouseEnter={() => setHoveredItem(`read-more-${news.id}`)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`text-green-600 font-semibold hover:text-green-700 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
                              hoveredItem === `read-more-${news.id}` ? 'text-green-700 scale-105' : ''
                            }`}
                          >
                            اقرأ المزيد
                            <FaArrowRight className={`text-sm transition-all duration-300 ${
                              hoveredItem === `read-more-${news.id}` ? 'translate-x-1' : ''
                            }`} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* All News Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredNews.filter(news => !news.featured).map((news, index) => (
                <motion.div
                  key={news.id}
                  variants={itemVariants}
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === `news-${news.id}` ? 'shadow-xl' : ''
                  }`}
                  onClick={() => {
                    setSelectedNews(news);
                    handleItemClick(`خبر ${news.title}`);
                  }}
                  onMouseEnter={() => setHoveredItem(`news-${news.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {news.readTime}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FaCalendar className="text-green-500" />
                        <span>{news.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaUser className="text-green-500" />
                        <span>{news.author}</span>
                      </div>
                    </div>
                    <h3 
                      className={`text-lg font-bold text-gray-900 mb-3 transition-all duration-300 ${
                        hoveredItem === `news-${news.id}` ? 'text-green-600' : ''
                      }`}
                    >
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaEye className="text-green-500" />
                          <span>{news.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaHeart className="text-red-500" />
                          <span>{news.likes}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNews(news);
                          handleItemClick(`اقرأ المزيد ${news.title}`);
                        }}
                        onMouseEnter={() => setHoveredItem(`read-more-${news.id}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`text-green-600 font-semibold hover:text-green-700 transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
                          hoveredItem === `read-more-${news.id}` ? 'text-green-700 scale-105' : ''
                        }`}
                      >
                        اقرأ المزيد
                        <FaArrowRight className={`text-sm transition-all duration-300 ${
                          hoveredItem === `read-more-${news.id}` ? 'translate-x-1' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                اشترك في النشرة الإخبارية
              </h2>
              <p className="text-xl mb-8 opacity-90">
                احصل على آخر الأخبار والتحديثات مباشرة في بريدك الإلكتروني
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  اشتراك
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* News Details Modal */}
        {selectedNews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-green-500" />
                    {new Date(selectedNews.date).toLocaleDateString('ar-SA')}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUser className="text-green-500" />
                    {selectedNews.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaEye className="text-green-500" />
                    {selectedNews.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-green-500" />
                    {selectedNews.likes}
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {selectedNews.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedNews.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {selectedNews.content}
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <FaShare />
                    مشاركة الخبر
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 border-2 border-green-600 text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
                  >
                    <FaHeart />
                    إعجاب
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

export default News; 