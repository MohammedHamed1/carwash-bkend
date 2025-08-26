import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaQuestionCircle, FaBook, FaVideo, FaPhone, FaEnvelope, FaComments, FaArrowRight, FaStar, FaThumbsUp, FaThumbsDown, FaShare, FaDownload, FaPrint, FaUser, FaCreditCard, FaShieldAlt, FaCog, FaEye } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 'all', name: 'جميع المواضيع', icon: FaQuestionCircle },
    { id: 'getting-started', name: 'البداية', icon: FaBook },
    { id: 'account', name: 'الحساب', icon: FaUser },
    { id: 'payments', name: 'المدفوعات', icon: FaCreditCard },
    { id: 'security', name: 'الأمان', icon: FaShieldAlt },
    { id: 'technical', name: 'المشاكل التقنية', icon: FaCog }
  ];

  const articles = [
    {
      id: 1,
      title: 'كيفية إنشاء حساب جديد',
      category: 'getting-started',
      content: 'تعلم كيفية إنشاء حساب جديد في PayPasss والبدء في استخدام خدماتنا.',
      fullContent: `
        <h3>خطوات إنشاء حساب جديد:</h3>
        <ol>
          <li>انتقل إلى صفحة التسجيل</li>
          <li>أدخل بريدك الإلكتروني وكلمة المرور</li>
          <li>أدخل رقم الهاتف للتحقق</li>
          <li>أكمل عملية التحقق من الهوية</li>
          <li>ابدأ في استخدام خدماتنا</li>
        </ol>
        <h3>المستندات المطلوبة:</h3>
        <ul>
          <li>الهوية الوطنية أو الإقامة</li>
          <li>رقم الجوال المسجل</li>
          <li>بريد إلكتروني صحيح</li>
        </ul>
      `,
      tags: ['حساب جديد', 'تسجيل', 'البداية'],
      helpful: 156,
      notHelpful: 12,
      views: 2340,
      featured: true
    },
    {
      id: 2,
      title: 'كيفية إضافة بطاقة ائتمان',
      category: 'payments',
      content: 'تعلم كيفية إضافة بطاقة ائتمان أو خصم إلى حسابك.',
      fullContent: `
        <h3>إضافة بطاقة جديدة:</h3>
        <ol>
          <li>انتقل إلى إعدادات الحساب</li>
          <li>اختر "إضافة بطاقة جديدة"</li>
          <li>أدخل بيانات البطاقة</li>
          <li>أكمل عملية التحقق</li>
          <li>ابدأ في استخدام البطاقة</li>
        </ol>
        <h3>البطاقات المدعومة:</h3>
        <ul>
          <li>فيزا</li>
          <li>ماستركارد</li>
          <li>بطاقات البنوك المحلية</li>
        </ul>
      `,
      tags: ['بطاقة ائتمان', 'دفع', 'حساب'],
      helpful: 234,
      notHelpful: 8,
      views: 3450,
      featured: false
    },
    {
      id: 3,
      title: 'كيفية تغيير كلمة المرور',
      category: 'account',
      content: 'تعلم كيفية تغيير كلمة المرور الخاصة بحسابك.',
      fullContent: `
        <h3>تغيير كلمة المرور:</h3>
        <ol>
          <li>سجل دخولك إلى حسابك</li>
          <li>انتقل إلى إعدادات الحساب</li>
          <li>اختر "تغيير كلمة المرور"</li>
          <li>أدخل كلمة المرور الحالية</li>
          <li>أدخل كلمة المرور الجديدة</li>
          <li>أكمل عملية التحقق</li>
        </ol>
        <h3>نصائح لكلمة مرور قوية:</h3>
        <ul>
          <li>استخدم 8 أحرف على الأقل</li>
          <li>اجمع بين الأحرف والأرقام</li>
          <li>استخدم رموزاً خاصة</li>
          <li>لا تستخدم معلومات شخصية</li>
        </ul>
      `,
      tags: ['كلمة مرور', 'أمان', 'حساب'],
      helpful: 189,
      notHelpful: 15,
      views: 2890,
      featured: false
    },
    {
      id: 4,
      title: 'كيفية تفعيل المصادقة الثنائية',
      category: 'security',
      content: 'تعلم كيفية تفعيل المصادقة الثنائية لحماية حسابك.',
      fullContent: `
        <h3>تفعيل المصادقة الثنائية:</h3>
        <ol>
          <li>انتقل إلى إعدادات الأمان</li>
          <li>اختر "المصادقة الثنائية"</li>
          <li>اختر طريقة التحقق (SMS أو تطبيق)</li>
          <li>أدخل رمز التحقق</li>
          <li>احفظ الرموز الاحتياطية</li>
        </ol>
        <h3>طرق التحقق المدعومة:</h3>
        <ul>
          <li>رسائل SMS</li>
          <li>تطبيقات المصادقة (Google Authenticator)</li>
          <li>رموز احتياطية</li>
        </ul>
      `,
      tags: ['مصادقة ثنائية', 'أمان', 'حماية'],
      helpful: 267,
      notHelpful: 6,
      views: 4120,
      featured: true
    },
    {
      id: 5,
      title: 'حل مشاكل تسجيل الدخول',
      category: 'technical',
      content: 'تعلم كيفية حل المشاكل الشائعة في تسجيل الدخول.',
      fullContent: `
        <h3>المشاكل الشائعة وحلولها:</h3>
        <h4>نسيت كلمة المرور:</h4>
        <ol>
          <li>اضغط على "نسيت كلمة المرور"</li>
          <li>أدخل بريدك الإلكتروني</li>
          <li>اتبع التعليمات في البريد</li>
        </ol>
        <h4>الحساب محظور:</h4>
        <ol>
          <li>تواصل مع الدعم الفني</li>
          <li>قدم المستندات المطلوبة</li>
          <li>انتظر مراجعة الطلب</li>
        </ol>
      `,
              tags: ['تسجيل دخول', 'مشاكل', 'خدمة عملاء'],
      helpful: 345,
      notHelpful: 23,
      views: 5670,
      featured: false
    },
    {
      id: 6,
      title: 'كيفية إلغاء معاملة',
      category: 'payments',
      content: 'تعلم كيفية إلغاء معاملة أو طلب استرداد.',
      fullContent: `
        <h3>إلغاء معاملة:</h3>
        <ol>
          <li>انتقل إلى سجل المعاملات</li>
          <li>ابحث عن المعاملة المطلوبة</li>
          <li>اضغط على "إلغاء المعاملة"</li>
          <li>أكمل عملية الإلغاء</li>
        </ol>
        <h3>شروط الإلغاء:</h3>
        <ul>
          <li>المعاملة لم تكتمل بعد</li>
          <li>لم يمر وقت طويل على الخدمة</li>
          <li>المعاملة قابلة للإلغاء</li>
        </ul>
      `,
      tags: ['إلغاء', 'معاملة', 'استرداد'],
      helpful: 178,
      notHelpful: 19,
      views: 2340,
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const popularTopics = [
    { title: 'إنشاء حساب جديد', views: 2340 },
    { title: 'إضافة بطاقة ائتمان', views: 3450 },
    { title: 'تغيير كلمة المرور', views: 2890 },
    { title: 'المصادقة الثنائية', views: 4120 },
    { title: 'حل مشاكل تسجيل الدخول', views: 5670 },
    { title: 'إلغاء معاملة', views: 2340 }
  ];

  const contactMethods = [
    {
      icon: FaPhone,
      title: 'الدعم الهاتفي',
      description: 'تواصل معنا عبر الهاتف',
      action: <span dir="ltr">+966 11 123 4567</span>,
              color: 'from-green-500 to-green-600'
    },
    {
      icon: FaEnvelope,
      title: 'البريد الإلكتروني',
      description: 'أرسل لنا رسالة',
      action: 'support@paypasss.com',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaComments,
      title: 'الدردشة المباشرة',
      description: 'دردشة فورية مع فريق الدعم',
      action: 'ابدأ الدردشة',
      color: 'from-purple-500 to-purple-600'
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
          title="مركز المساعدة"
          subtitle="ابحث عن إجابات لأسئلتك أو تواصل مع فريق الدعم"
          breadcrumbs={['الرئيسية', 'مركز المساعدة']}
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
                className="text-4xl md:text-6xl font-bold mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 text-gray-700"
                onClick={() => handleItemClick('كيف يمكننا مساعدتك؟')}
              >
                كيف يمكننا
                <span className="text-emerald-600"> مساعدتك؟</span>
              </h1>
              <p 
                className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700"
              >
                ابحث في قاعدة المعرفة الشاملة أو تواصل مع فريق الدعم 
                للحصول على المساعدة التي تحتاجها
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" style={{color: '#22c55e'}} />
                  <input
                    type="text"
                    placeholder="ابحث في مركز المساعدة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                    activeCategory === category.id
                                              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <category.icon className="text-2xl mx-auto mb-2" />
                  <div 
                    className="text-sm font-semibold text-gray-700"
                  >
                    {category.name}
                  </div>
                </button>
              ))}
            </motion.div>

            {/* Articles Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  {article.featured && (
                    <div className="mb-4">
                                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        مميز
                      </span>
                    </div>
                  )}
                                          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors duration-300">
                    {article.title}
                  </h3>
                                        <p 
                    className="text-sm leading-relaxed mb-4"
                    style={{color: '#374151', fontWeight: 'bold'}}
                  >
                    {article.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                        style={{color: '#374151', fontWeight: 'bold'}}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaEye />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaThumbsUp />
                        {article.helpful}
                      </span>
                    </div>
                    <FaArrowRight className="text-green-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  لم نجد مقالات تطابق بحثك
                </h3>
                <p 
                  className="mb-6"
                  style={{color: '#374151', fontWeight: 'bold'}}
                >
                  جرب البحث بكلمات مختلفة أو تواصل مع فريق الدعم
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  عرض جميع المقالات
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-green-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                المواضيع الشائعة
              </h2>
              <p 
                className="text-xl max-w-2xl mx-auto"
                style={{color: '#374151', fontWeight: 'bold'}}
              >
                أكثر المواضيع التي يبحث عنها عملاؤنا
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {topic.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {topic.views.toLocaleString()} مشاهدة
                    </span>
                    <FaArrowRight className="text-green-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
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
                تواصل معنا
              </h2>
              <p className="text-xl text-white max-w-2xl mx-auto">
                لم تجد ما تبحث عنه؟ تواصل مع فريق الدعم
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <method.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {method.title}
                  </h3>
                  <p className="text-white mb-6">
                    {method.description}
                  </p>
                  <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    {method.action}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Article Details Modal */}
        {selectedArticle && (
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
                      {selectedArticle.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaEye />
                        {selectedArticle.views.toLocaleString()} مشاهدة
                      </span>
                      <span className="flex items-center gap-1">
                        <FaThumbsUp />
                        {selectedArticle.helpful} مفيد
                      </span>
                      <span className="flex items-center gap-1">
                        <FaThumbsDown />
                        {selectedArticle.notHelpful} غير مفيد
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors duration-300"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedArticle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div 
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent }}
                />

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                    >
                      <FaThumbsUp />
                      مفيد
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                    >
                      <FaThumbsDown />
                      غير مفيد
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors duration-300"
                    >
                      <FaShare />
                      مشاركة
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors duration-300"
                    >
                      <FaPrint />
                      طباعة
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default HelpCenter; 