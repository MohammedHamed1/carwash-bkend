import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaEye, FaHeart, FaShare, FaSearch, FaFilter, FaArrowRight, FaCar, FaStar, FaCheckCircle } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'جميع المقالات' },
    { id: 'tips', name: 'نصائح العناية' },
    { id: 'services', name: 'خدماتنا' },
    { id: 'technology', name: 'التكنولوجيا' },
    { id: 'maintenance', name: 'الصيانة' },
    { id: 'news', name: 'الأخبار' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'دليل شامل للعناية بسيارتك في الصيف',
      excerpt: 'تعرف على أفضل الطرق للعناية بسيارتك خلال فصل الصيف وحمايتها من الحرارة والغبار',
      content: 'فصل الصيف يفرض تحديات خاصة على السيارات. من الحرارة العالية إلى الغبار والأتربة، تحتاج سيارتك لعناية خاصة. في هذه المقالة، نقدم لك دليلاً شاملاً للعناية بسيارتك في الصيف.',
      author: 'أحمد محمد',
      date: '2024-01-15',
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=400&fit=crop',
      readTime: '5 دقائق',
      views: 1250,
      likes: 89,
      featured: true,
      tags: ['العناية', 'الصيف', 'نصائح']
    },
    {
      id: 2,
      title: 'أحدث تقنيات غسيل السيارات في 2024',
      excerpt: 'اكتشف أحدث التقنيات المستخدمة في غسيل السيارات وكيف تحسن من جودة الخدمة',
      content: 'تطورت تقنيات غسيل السيارات بشكل كبير في السنوات الأخيرة. من الأنظمة الآلية إلى المواد المتطورة، نستعرض أحدث التقنيات التي نستخدمها في خدماتنا.',
      author: 'سارة أحمد',
      date: '2024-01-12',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      readTime: '7 دقائق',
      views: 980,
      likes: 67,
      featured: false,
      tags: ['تقنيات', 'تطوير', 'جودة']
    },
    {
      id: 3,
      title: 'كيف تختار أفضل خدمة غسيل لسيارتك',
      excerpt: 'دليل شامل لاختيار خدمة غسيل السيارات المناسبة لاحتياجاتك وميزانيتك',
      content: 'اختيار خدمة غسيل السيارات المناسبة يمكن أن يكون قراراً صعباً. في هذه المقالة، نقدم دليلاً شاملاً لمساعدتك في اتخاذ القرار الصحيح.',
      author: 'محمد علي',
      date: '2024-01-10',
      category: 'services',
      image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&h=400&fit=crop',
      readTime: '6 دقائق',
      views: 756,
      likes: 45,
      featured: false,
      tags: ['اختيار', 'خدمات', 'نصائح']
    },
    {
      id: 4,
      title: 'فوائد التلميع الاحترافي للسيارات',
      excerpt: 'تعرف على فوائد التلميع الاحترافي وكيف يحمي طلاء سيارتك ويحسن مظهرها',
      content: 'التلميع الاحترافي ليس مجرد تحسين للمظهر، بل هو استثمار في حماية طلاء سيارتك. نستكشف فوائد التلميع وكيف يحمي سيارتك من العوامل الخارجية.',
      author: 'فاطمة حسن',
      date: '2024-01-08',
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop',
      readTime: '8 دقائق',
      views: 1120,
      likes: 78,
      featured: true,
      tags: ['تلميع', 'حماية', 'طلاء']
    },
    {
      id: 5,
      title: 'نصائح للحفاظ على نظافة السيارة الداخلية',
      excerpt: 'نصائح عملية للحفاظ على نظافة داخل السيارة وحمايتها من البقع والروائح',
      content: 'نظافة داخل السيارة لا تقل أهمية عن النظافة الخارجية. نقدم نصائح عملية للحفاظ على نظافة المقاعد والزجاج والكونسول.',
      author: 'خالد عبدالله',
      date: '2024-01-05',
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=400&fit=crop',
      readTime: '4 دقائق',
      views: 634,
      likes: 34,
      featured: false,
      tags: ['نظافة', 'داخلي', 'نصائح']
    },
    {
      id: 6,
      title: 'خدمة VIP: تجربة غسيل فريدة من نوعها',
      excerpt: 'اكتشف خدمة VIP المميزة وكيف تقدم تجربة غسيل فريدة من نوعها',
      content: 'خدمة VIP ليست مجرد غسيل عادي، بل هي تجربة شاملة تبدأ من لحظة الوصول وتنتهي بتسليم سيارة متلألئة. نستكشف ما يجعل هذه الخدمة مميزة.',
      author: 'نورا محمد',
      date: '2024-01-03',
      category: 'services',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=400&fit=crop',
      readTime: '5 دقائق',
      views: 892,
      likes: 56,
      featured: false,
      tags: ['VIP', 'خدمة', 'مميزة']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>المدونة - شركة غسيل السيارات في الرياض | نصائح وأخبار العناية بالسيارات</title>
        <meta name="description" content="مدونة شاملة عن العناية بالسيارات، نصائح غسيل السيارات، أحدث التقنيات، وأخبار خدمات غسيل السيارات في الرياض." />
        <meta name="keywords" content="مدونة غسيل سيارات, نصائح العناية بالسيارات, تقنيات غسيل السيارات, أخبار غسيل السيارات الرياض" />
        <meta property="og:title" content="المدونة - شركة غسيل السيارات في الرياض" />
        <meta property="og:description" content="مدونة شاملة عن العناية بالسيارات ونصائح غسيل السيارات" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/blog" />
      </Helmet>

      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <PageHeader 
          title="المدونة"
          subtitle="أحدث الأخبار والمقالات في عالم العناية بالسيارات"
          breadcrumbs={['الرئيسية', 'المدونة']}
        />

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                مدونة
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"> العناية بالسيارات</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                اكتشف أحدث الأخبار والمقالات في عالم العناية بالسيارات، 
                واحصل على نصائح قيمة لمساعدتك في الحفاظ على سيارتك
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="ابحث في المقالات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
        </section>

            {/* Featured Posts */}
            {filteredPosts.filter(post => post.featured).length > 0 && (
          <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">المقالات المميزة</h2>
                <p className="text-xl text-gray-600">أفضل المقالات المختارة لك</p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                {filteredPosts.filter(post => post.featured).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          مميز
                        </span>
                        </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="w-4 h-4" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaUser className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye className="w-4 h-4" />
                          {post.views}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                              likedPosts.has(post.id)
                                ? 'bg-red-100 text-red-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                            }`}
                          >
                            <FaHeart className="w-4 h-4" />
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </button>
                          <span className="text-sm text-gray-500">{post.readTime}</span>
                        </div>
                        <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2">
                          اقرأ المزيد
                          <FaArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">جميع المقالات</h2>
              <p className="text-xl text-gray-600">اكتشف جميع مقالاتنا المفيدة</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          مميز
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-4 h-4" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="w-4 h-4" />
                        {post.views}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                      {post.title}
              </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all duration-300 text-sm ${
                          likedPosts.has(post.id)
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                        }`}
                      >
                        <FaHeart className="w-4 h-4" />
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </button>
                      <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-2xl font-bold text-sm hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
                        اقرأ المزيد
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">لم نجد مقالات</h3>
                <p className="text-gray-600 mb-6">جرب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                  عرض جميع المقالات
                </button>
            </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog; 