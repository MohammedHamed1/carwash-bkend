import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaSearch, FaStar, FaClock, FaShieldAlt, FaUsers, FaPhone, FaEnvelope, FaWhatsapp, FaCar, FaCheckCircle } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const FAQ = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
      setIsLoaded(true);
    setIsVisible(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setAnimateElements(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = [
    { id: 'all', name: 'جميع الأسئلة', icon: FaQuestionCircle },
    { id: 'services', name: 'الخدمات', icon: FaCar },
    { id: 'pricing', name: 'الأسعار', icon: FaStar },
    { id: 'booking', name: 'الحجز', icon: FaClock },
    { id: 'support', name: 'الدعم', icon: FaShieldAlt }
  ];

  const faqData = [
    {
      question: "ما هي الخدمات التي تقدمونها؟",
      answer: "نقدم مجموعة شاملة من خدمات غسيل السيارات تشمل: غسيل خارجي، غسيل داخلي، غسيل شامل، تلميع احترافي، تنظيف المحرك، وتلميع الإطارات. جميع الخدمات تتم بأحدث التقنيات وأفضل المواد الإيطالية.",
      category: "services"
    },
    {
      question: "كم تستغرق عملية الغسيل؟",
      answer: "تختلف مدة الغسيل حسب نوع الخدمة المختارة: الغسيل السريع (15 دقيقة)، الغسيل العادي (30 دقيقة)، الغسيل الشامل (45 دقيقة)، والتلميع الاحترافي (60 دقيقة).",
      category: "services"
    },
    {
      question: "هل تقدمون خدمة التوصيل؟",
      answer: "نعم، نقدم خدمة التوصيل للمنازل والشركات في جميع أنحاء الرياض. يمكنك حجز موعد وسنأتي إليك في المكان المحدد مع جميع المعدات اللازمة.",
      category: "services"
    },
    {
      question: "ما هي أسعار الخدمات؟",
      answer: "تختلف الأسعار حسب نوع السيارة والخدمة المختارة. الغسيل الأساسي يبدأ من 25 ريال، المتقدم من 45 ريال، المميز من 75 ريال، وخدمة VIP من 120 ريال. يمكنك الاطلاع على جميع الأسعار في صفحة الباقات.",
      category: "pricing"
    },
    {
      question: "هل تقدمون ضمان على الخدمات؟",
      answer: "نعم، نقدم ضمان شامل على جميع الخدمات. إذا لم تكن راضياً عن النتيجة، سنعيد الغسيل مجاناً أو نعيد المبلغ المدفوع.",
      category: "support"
    },
    {
      question: "كيف يمكنني حجز موعد؟",
              answer: "يمكنك الحجز من خلال تطبيقنا الذكي، موقعنا الإلكتروني، أو الاتصال بنا مباشرة على الرقم +966 50 123 4567.",
      category: "booking"
    },
    {
      question: "هل تقدمون خدمات للشركات؟",
      answer: "نعم، نقدم خدمات خاصة للشركات والمركبات التجارية. نقدم عروض خاصة للأساطيل الكبيرة وخدمة مخصصة لاحتياجات الشركات.",
      category: "services"
    },
    {
      question: "ما هي المواد المستخدمة في الغسيل؟",
      answer: "نستخدم مواد إيطالية عالية الجودة وخالية من المواد الكيميائية الضارة. جميع المواد آمنة على طلاء السيارة والجلود الداخلية.",
      category: "services"
    },
    {
      question: "هل تقدمون خدمات في العطل الرسمية؟",
      answer: "نعم، جميع فروعنا تعمل في العطل الرسمية من السبت إلى الخميس من 7:00 صباحاً إلى 11:00 مساءً. يمكنك التحقق من ساعات العمل في الفرع القريب منك.",
      category: "services"
    },
    {
      question: "كيف يمكنني تقديم شكوى أو اقتراح؟",
      answer: "يمكنك التواصل معنا من خلال صفحة الشكاوى والاقتراحات، أو الاتصال بنا مباشرة، أو إرسال بريد إلكتروني إلى support@carwash.com. نرد على جميع الرسائل في أقرب وقت ممكن.",
      category: "support"
    },
    {
      question: "هل يمكنني إلغاء الحجز؟",
      answer: "نعم، يمكنك إلغاء الحجز قبل الموعد المحدد بدون أي رسوم. الإلغاء في نفس اليوم قد يخضع لرسوم إلغاء.",
      category: "booking"
    },
    {
      question: "ما هي أنواع السيارات التي تخدمونها؟",
      answer: "نخدم جميع أنواع السيارات: السيارات الصغيرة، SUV، الشاحنات، السيارات الفاخرة، والمركبات التجارية. كل نوع له خدمة مخصصة.",
      category: "services"
    }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.includes(searchTerm) || faq.answer.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>الأسئلة الشائعة - شركة غسيل السيارات في الرياض | إجابات شاملة</title>
        <meta name="description" content="إجابات على أكثر الأسئلة شيوعاً حول خدمات غسيل السيارات في الرياض. معلومات شاملة عن الخدمات والأسعار والحجز." />
                        <meta name="keywords" content="أسئلة شائعة, غسيل سيارات الرياض, أسعار غسيل سيارات, حجز غسيل سيارات, خدمة عملاء" />
        <meta property="og:title" content="الأسئلة الشائعة - شركة غسيل السيارات في الرياض" />
        <meta property="og:description" content="إجابات على أكثر الأسئلة شيوعاً حول خدمات غسيل السيارات" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/faq" />
      </Helmet>

      <div className="header-spacer"></div>
      
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="الأسئلة الشائعة"
          subtitle="إجابات على أكثر الأسئلة شيوعاً حول خدماتنا"
          breadcrumbs={['الرئيسية', 'الأسئلة الشائعة']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* قسم البحث */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  ابحث في الأسئلة الشائعة
                </h2>
                <p className="text-gray-600">ابحث عن إجابة لسؤالك بسرعة وسهولة</p>
              </div>
              
              <div className="relative max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="اكتب سؤالك هنا..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300 text-lg"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                </div>
              </div>

              {/* فئات الأسئلة */}
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* الأسئلة الشائعة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="p-8">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center">
                          <FaQuestionCircle className="w-6 h-6" />
                      </div>
                        <h3 className="text-xl font-bold text-gray-800">
                        {faq.question}
                      </h3>
                    </div>
                      <div className="transition-all duration-300">
                      {openFaq === index ? (
                        <FaChevronUp className="text-green-500 text-xl" />
                      ) : (
                        <FaChevronDown className="text-gray-400 text-xl" />
                      )}
                    </div>
                  </div>
                  
                  {openFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-200"
                      >
                        <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                      </motion.div>
                    )}
                    </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">لم نجد إجابة لسؤالك</h3>
                <p className="text-gray-600 mb-6">جرب البحث بكلمات مختلفة أو تواصل معنا مباشرة</p>
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
                  تواصل معنا
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* قسم إضافي للمساعدة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              فريقنا متاح دائماً لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="w-8 h-8" />
              </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">اتصل بنا</h3>
                <p className="text-gray-600 mb-4">+966 50 123 4567</p>
                <p className="text-sm text-gray-500">خدمة عملاء</p>
          </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaWhatsapp className="w-8 h-8" />
              </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">واتساب</h3>
                <p className="text-gray-600 mb-4">+966 50 123 4567</p>
                <p className="text-sm text-gray-500">رد فوري</p>
              </div>
              
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="w-8 h-8" />
              </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600 mb-4">support@carwash.com</p>
                <p className="text-sm text-gray-500">رد سريع ومضمون</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQ; 