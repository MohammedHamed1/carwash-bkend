import React, { useEffect, useState } from 'react';
import { FaNewspaper, FaCalendarAlt, FaUser, FaEye, FaShare, FaHeart, FaComment, FaTag, FaSearch, FaFilter, FaBookmark, FaArrowRight, FaArrowLeft, FaStar, FaAward, FaRocket, FaGem, FaMagic, FaFire, FaChartLine, FaLightbulb, FaHandshake, FaUsers, FaMapMarkerAlt, FaClock, FaCheckCircle, FaBuilding, FaTools } from 'react-icons/fa';
import PageHeader from './common/PageHeader';

const News = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const categories = [
    { id: 'all', name: 'جميع الأخبار', icon: FaNewspaper },
    { id: 'company', name: 'أخبار الشركة', icon: FaBuilding },
    { id: 'services', name: 'خدمات جديدة', icon: FaTools },
    { id: 'awards', name: 'الجوائز والإنجازات', icon: FaAward },
    { id: 'technology', name: 'التقنيات الجديدة', icon: FaRocket },
    { id: 'partners', name: 'الشركاء والتعاون', icon: FaHandshake }
  ];

  const newsData = [
    {
      id: 1,
      title: 'افتتاح 10 فروع جديدة في المملكة',
      excerpt: 'نفخر بإعلان افتتاح 10 فروع جديدة في مختلف مدن المملكة لتقديم خدمة أفضل لعملائنا الكرام',
      content: 'نفخر بإعلان افتتاح 10 فروع جديدة في مختلف مدن المملكة العربية السعودية. هذه الخطوة تأتي ضمن خطة التوسع الشاملة التي تهدف إلى تقديم خدمة غسيل السيارات المتميزة لجميع عملائنا في جميع أنحاء المملكة. الفروع الجديدة مجهزة بأحدث التقنيات والمواد الإيطالية عالية الجودة.',
      category: 'company',
      date: '2024-01-15',
      author: 'فريق الإدارة',
      views: 1250,
      likes: 89,
      comments: 23,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      tags: ['توسع', 'فروع جديدة', 'خدمة متميزة'],
      featured: true
    },
    {
      id: 2,
      title: 'إطلاق خدمة الغسيل الذكي الجديدة',
      excerpt: 'نقدم لكم خدمة الغسيل الذكي الجديدة التي تستخدم الذكاء الاصطناعي لتحسين جودة الغسيل',
      content: 'نفخر بإطلاق خدمة الغسيل الذكي الجديدة التي تستخدم تقنيات الذكاء الاصطناعي المتقدمة لتحسين جودة الغسيل وتوفير تجربة فريدة لعملائنا. هذه الخدمة تتضمن تحليل ذكي لحالة السيارة وتحديد أفضل طريقة للغسيل.',
      category: 'services',
      date: '2024-01-12',
      author: 'فريق التقنية',
      views: 980,
      likes: 67,
      comments: 15,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      tags: ['ذكاء اصطناعي', 'تقنيات جديدة', 'جودة عالية'],
      featured: false
    },
    {
      id: 3,
      title: 'حصول الشركة على جائزة أفضل خدمة عملاء 2024',
      excerpt: 'فازت شركتنا بجائزة أفضل خدمة عملاء لعام 2024 من مجلس الجودة السعودي',
      content: 'نفخر بإعلان حصول شركتنا على جائزة أفضل خدمة عملاء لعام 2024 من مجلس الجودة السعودي. هذه الجائزة تأتي تقديراً للجهود المستمرة في تقديم خدمة عملاء متميزة ورضا العملاء العالي الذي وصل إلى 99%.',
      category: 'awards',
      date: '2024-01-10',
      author: 'فريق العلاقات العامة',
      views: 2100,
      likes: 156,
      comments: 45,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      tags: ['جائزة', 'خدمة عملاء', 'إنجاز'],
      featured: true
    },
    {
      id: 4,
      title: 'شراكة استراتيجية مع شركة مواد التنظيف الإيطالية',
      excerpt: 'أعلنت الشركة عن شراكة استراتيجية مع أكبر شركة إيطالية لمواد التنظيف',
      content: 'أعلنت شركتنا عن شراكة استراتيجية مع أكبر شركة إيطالية لمواد التنظيف عالية الجودة. هذه الشراكة ستضمن لنا الحصول على أفضل المواد وأحدث التقنيات في مجال غسيل السيارات.',
      category: 'partners',
      date: '2024-01-08',
      author: 'فريق الشراكات',
      views: 750,
      likes: 45,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      tags: ['شراكة', 'مواد إيطالية', 'جودة عالية'],
      featured: false
    },
    {
      id: 5,
      title: 'إطلاق تطبيق الهاتف المحمول الجديد',
      excerpt: 'تم إطلاق تطبيق الهاتف المحمول الجديد مع ميزات متقدمة لحجز الخدمات',
      content: 'تم إطلاق تطبيق الهاتف المحمول الجديد مع ميزات متقدمة تتيح للعملاء حجز خدمات غسيل السيارات بسهولة وسرعة. التطبيق يتضمن نظام دفع إلكتروني ومتابعة حالة الطلب في الوقت الفعلي.',
      category: 'technology',
      date: '2024-01-05',
      author: 'فريق التطوير',
      views: 1650,
      likes: 123,
      comments: 34,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      tags: ['تطبيق', 'تقنية', 'حجز إلكتروني'],
      featured: true
    },
    {
      id: 6,
      title: 'توسيع نطاق الخدمات ليشمل السيارات الفاخرة',
      excerpt: 'أعلنت الشركة عن توسيع نطاق خدماتها ليشمل السيارات الفاخرة والكلاسيكية',
      content: 'أعلنت الشركة عن توسيع نطاق خدماتها ليشمل السيارات الفاخرة والكلاسيكية مع خدمات متخصصة ومعدات خاصة. هذه الخطوة تأتي استجابة لطلب العملاء المتزايد على خدمات غسيل السيارات الفاخرة.',
      category: 'services',
      date: '2024-01-03',
      author: 'فريق الخدمات',
      views: 890,
      likes: 78,
      comments: 19,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      tags: ['سيارات فاخرة', 'خدمات متخصصة', 'توسع'],
      featured: false
    }
  ];

  const filteredNews = newsData.filter(news => {
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="الأخبار والتحديثات"
          subtitle="تابع آخر الأخبار والتحديثات من شركتنا"
          breadcrumbs={['الرئيسية', 'الأخبار']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* شريط البحث والتصفية */}
          <section className={`w-full py-8 bg-white rounded-xl shadow-lg mb-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                {/* شريط البحث */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث في الأخبار..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00916E] focus:border-transparent hover:border-green-300 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* فئات الأخبار */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
                        selectedCategory === category.id
                          ? 'bg-[#00916E] text-white border-[#00916E] shadow-lg'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:shadow-md'
                      }`}
                      onMouseEnter={() => setHoveredItem(`category-${category.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <category.icon className={`text-sm transition-all duration-300 ${
                        hoveredItem === `category-${category.id}` ? 'scale-110' : ''
                      }`} />
                      <span className="font-bold text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* الأخبار المميزة */}
          {filteredNews.filter(news => news.featured).length > 0 && (
            <section className={`w-full py-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-xl shadow-lg mb-8 relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {/* خلفية متحركة */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
              </div>
              
              <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
                <div 
                  className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => handleItemClick('الأخبار المميزة')}
                  onMouseEnter={() => setHoveredItem('featured-news')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaStar className={`text-yellow-300 text-4xl mx-auto mb-4 transition-all duration-300 ${
                    hoveredItem === 'featured-news' ? 'animate-spin scale-110' : 'animate-pulse'
                  }`} style={{animationDuration: '2s'}} />
                  <h2 className={`text-3xl font-bold mb-4 text-white transition-all duration-300 ${
                    hoveredItem === 'featured-news' ? 'scale-105 text-yellow-100' : ''
                  }`}>
                    الأخبار المميزة
                  </h2>
                  <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                    hoveredItem === 'featured-news' ? 'opacity-100 scale-105' : ''
                  }`}>
                    أهم الأخبار والتحديثات من شركتنا
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.filter(news => news.featured).map((news, index) => (
                    <div
                      key={news.id}
                      className={`bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95 group`}
                      onClick={() => handleItemClick(`خبر مميز: ${news.title}`)}
                      onMouseEnter={() => setHoveredItem(`featured-${news.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="relative mb-4">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          مميز
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <FaCalendarAlt className="text-[#00916E]" />
                        <span>{new Date(news.date).toLocaleDateString('ar-SA')}</span>
                        <FaUser className="text-[#00916E] mr-2" />
                        <span>{news.author}</span>
                      </div>
                      
                      <h3 className={`font-bold text-lg mb-3 text-gray-800 transition-all duration-300 ${
                        hoveredItem === `featured-${news.id}` ? 'text-[#00916E] scale-105' : ''
                      }`}>
                        {news.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {news.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <FaEye className="text-[#00916E]" />
                            {news.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaHeart className="text-red-500" />
                            {news.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaComment className="text-blue-500" />
                            {news.comments}
                          </span>
                        </div>
                        <button className="text-[#00916E] hover:text-green-600 transition-colors">
                          <FaArrowLeft className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* جميع الأخبار */}
          <section className={`w-full py-12 bg-white rounded-xl shadow-lg transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6">
              <div 
                className="text-center mb-12 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('جميع الأخبار')}
                onMouseEnter={() => setHoveredItem('all-news')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaNewspaper className={`text-[#00916E] text-4xl mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'all-news' ? 'animate-bounce scale-110' : 'animate-pulse'
                }`} style={{animationDuration: '2s'}} />
                <h2 className={`text-3xl font-bold mb-4 text-[#00916E] transition-all duration-300 ${
                  hoveredItem === 'all-news' ? 'scale-105 text-green-600' : ''
                }`}>
                  جميع الأخبار
                </h2>
                <p className={`text-lg text-gray-600 font-medium transition-all duration-300 ${
                  hoveredItem === 'all-news' ? 'text-gray-700 scale-105' : ''
                }`}>
                  اطلع على جميع الأخبار والتحديثات من شركتنا
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news, index) => (
                  <div
                    key={news.id}
                    className={`bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:bg-white hover:border-green-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95 group`}
                    onClick={() => handleItemClick(`خبر: ${news.title}`)}
                    onMouseEnter={() => setHoveredItem(`news-${news.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="relative mb-4">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {news.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          مميز
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <FaCalendarAlt className="text-[#00916E]" />
                      <span>{new Date(news.date).toLocaleDateString('ar-SA')}</span>
                      <FaUser className="text-[#00916E] mr-2" />
                      <span>{news.author}</span>
                    </div>
                    
                    <h3 className={`font-bold text-lg mb-3 text-gray-800 transition-all duration-300 ${
                      hoveredItem === `news-${news.id}` ? 'text-[#00916E] scale-105' : ''
                    }`}>
                      {news.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {news.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {news.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold hover:bg-green-200 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchTerm(tag);
                            handleItemClick(`وسم: ${tag}`);
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <FaEye className="text-[#00916E]" />
                          {news.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaHeart className="text-red-500" />
                          {news.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="text-blue-500" />
                          {news.comments}
                        </span>
                      </div>
                      <button className="text-[#00916E] hover:text-green-600 transition-colors">
                        <FaArrowLeft className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <FaSearch className="text-gray-400 text-6xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    لا توجد أخبار
                  </h3>
                  <p className="text-gray-500">
                    جرب تغيير معايير البحث أو الفئة المحددة
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* إحصائيات الأخبار */}
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
                onClick={() => handleItemClick('إحصائيات الأخبار')}
                onMouseEnter={() => setHoveredItem('news-stats')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h2 className={`text-3xl font-bold mb-4 text-white transition-all duration-300 ${
                  hoveredItem === 'news-stats' ? 'scale-105 text-yellow-100' : ''
                }`}>
                  إحصائيات الأخبار
                </h2>
                <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                  hoveredItem === 'news-stats' ? 'opacity-100 scale-105' : ''
                }`}>
                  أرقام وإحصائيات من عالم الأخبار
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="group bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <FaNewspaper className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 transition-colors">+150</h3>
                  <p className="text-gray-700 font-bold text-base group-hover:text-gray-800 transition-colors">مقال إخباري</p>
                </div>
                
                <div className="group bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <FaEye className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 transition-colors">+10K</h3>
                  <p className="text-gray-700 font-bold text-base group-hover:text-gray-800 transition-colors">مشاهدات</p>
                </div>
                
                <div className="group bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <FaHeart className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 transition-colors">+2K</h3>
                  <p className="text-gray-700 font-bold text-base group-hover:text-gray-800 transition-colors">إعجابات</p>
                </div>
                
                <div className="group bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                    <FaComment className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[#00916E] group-hover:text-green-600 transition-colors">+500</h3>
                  <p className="text-gray-700 font-bold text-base group-hover:text-gray-800 transition-colors">تعليقات</p>
                </div>
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

export default News; 