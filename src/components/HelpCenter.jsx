import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Phone, Mail, BookOpen, Video, FileText, HelpCircle, ChevronDown, ChevronUp, Star, Clock, Users, Shield, Zap, Lightbulb, Play, Download, ExternalLink, Filter, Bookmark, Share2, ThumbsUp, ThumbsDown, ArrowRight, CheckCircle, AlertCircle, Info, Calendar, CreditCard, Settings, Car, Eye } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaqs, setExpandedFaqs] = useState(new Set());
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // محاكاة البحث الذكي
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        // محاكاة البحث
        setIsSearching(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const categories = [
    { id: 'all', name: 'الكل', icon: <HelpCircle className="h-5 w-5" />, count: 156 },
    { id: 'account', name: 'الحساب والاشتراكات', icon: <Users className="h-5 w-5" />, count: 42 },
    { id: 'booking', name: 'الحجز والمواعيد', icon: <Calendar className="h-5 w-5" />, count: 38 },
    { id: 'payment', name: 'الدفع والفواتير', icon: <CreditCard className="h-5 w-5" />, count: 31 },
    { id: 'technical', name: 'المشاكل التقنية', icon: <Settings className="h-5 w-5" />, count: 28 },
    { id: 'services', name: 'الخدمات والمنتجات', icon: <Car className="h-5 w-5" />, count: 17 }
  ];

  const helpArticles = [
    {
      id: 1,
      title: "كيفية إنشاء حساب جديد في PayPass",
      category: "account",
      content: "تعلم كيفية إنشاء حساب جديد في تطبيق PayPass خطوة بخطوة مع شرح مفصل لكل مرحلة.",
      tags: ["حساب", "تسجيل", "مبتدئ"],
      views: 15420,
      helpful: 98,
      video: true,
      pdf: true,
      featured: true
    },
    {
      id: 2,
      title: "حجز موعد غسيل السيارة بسهولة",
      category: "booking",
      content: "دليل شامل لحجز موعد غسيل السيارة من خلال التطبيق مع شرح جميع الخيارات المتاحة.",
      tags: ["حجز", "موعد", "غسيل"],
      views: 12850,
      helpful: 95,
      video: true,
      pdf: false,
      featured: true
    },
    {
      id: 3,
      title: "طرق الدفع المتاحة في PayPass",
      category: "payment",
      content: "تعرف على جميع طرق الدفع المتاحة في PayPass وكيفية استخدام كل طريقة.",
      tags: ["دفع", "بطاقة", "مدى"],
      views: 9870,
      helpful: 92,
      video: false,
      pdf: true,
      featured: false
    },
    {
      id: 4,
      title: "حل مشاكل التطبيق الشائعة",
      category: "technical",
      content: "دليل لحل المشاكل التقنية الشائعة في تطبيق PayPass وإصلاحها بسرعة.",
      tags: ["مشاكل", "تقنية", "إصلاح"],
      views: 7560,
      helpful: 89,
      video: true,
      pdf: true,
      featured: false
    },
    {
      id: 5,
      title: "أنواع خدمات الغسيل المتاحة",
      category: "services",
      content: "تعرف على جميع أنواع خدمات الغسيل المتاحة في PayPass والفرق بينها.",
      tags: ["خدمات", "غسيل", "أنواع"],
      views: 6540,
      helpful: 87,
      video: false,
      pdf: true,
      featured: false
    },
    {
      id: 6,
      title: "كيفية إلغاء أو تعديل الحجز",
      category: "booking",
      content: "تعلم كيفية إلغاء أو تعديل الحجز الموجود في PayPass بسهولة.",
      tags: ["إلغاء", "تعديل", "حجز"],
      views: 5430,
      helpful: 85,
      video: true,
      pdf: false,
      featured: false
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "كيف يمكنني إنشاء حساب في PayPass؟",
      answer: "يمكنك إنشاء حساب بسهولة من خلال تحميل التطبيق وإدخال رقم الهاتف والتحقق منه عبر رمز SMS المرسل إليك.",
      category: "account"
    },
    {
      id: 2,
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "نقبل جميع البطاقات الائتمانية والمدى والدفع النقدي في الفروع. كما يمكنك استخدام المحفظة الإلكترونية في التطبيق.",
      category: "payment"
    },
    {
      id: 3,
      question: "كيف يمكنني تتبع حالة طلبي؟",
      answer: "يمكنك تتبع حالة طلبك من خلال التطبيق في قسم 'طلباتي' أو الاتصال بنا مباشرة على الرقم المجاني.",
      category: "booking"
    },
    {
      id: 4,
      question: "ما هو وقت الاستجابة للدعم؟",
      answer: "نرد على جميع الاستفسارات في أقرب وقت ممكن، وفي معظم الحالات نرد خلال ساعات قليلة.",
      category: "technical"
    },
    {
      id: 5,
      question: "هل يمكنني إلغاء الحجز؟",
      answer: "نعم، يمكنك إلغاء الحجز مجاناً قبل 3 ساعات من الموعد المحدد من خلال التطبيق أو الاتصال بنا.",
      category: "booking"
    },
    {
      id: 6,
      question: "ما هي ساعات عمل الفروع؟",
      answer: "معظم فروعنا تعمل من 7 صباحاً حتى 11 مساءً، مع فروع تعمل على مدار الساعة في المواقع الرئيسية.",
      category: "services"
    }
  ];

  const toggleFaq = (id) => {
    const newExpanded = new Set(expandedFaqs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFaqs(newExpanded);
  };

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const filteredArticlesList = selectedCategory === 'all' 
    ? helpArticles 
    : helpArticles.filter(article => article.category === selectedCategory);

  return (
    <>
      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
        <PageHeader
          title="مركز المساعدة"
          subtitle="ابحث عن الإجابات التي تحتاجها بسرعة وسهولة. مركز مساعدة شامل مع أحدث التقنيات الذكية"
          breadcrumbs={['الرئيسية', 'مركز المساعدة']}
        />


      {/* Categories Filter - تصفية الفئات */}
      <div className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            تصفح حسب الفئة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:scale-105'
                }`}
              >
                <div className={`${selectedCategory === category.id ? 'text-white' : 'text-green-600'}`}>
                  {category.icon}
                </div>
                <div className="text-sm font-medium">{category.name}</div>
                <div className={`text-xs ${selectedCategory === category.id ? 'text-green-100' : 'text-gray-500'}`}>
                  {category.count} مقال
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Articles - المقالات المميزة */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            المقالات المميزة
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            أكثر المقالات فائدة وطلباً من عملائنا الكرام
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpArticles.filter(article => article.featured).map((article, index) => (
              <div 
                key={article.id} 
                className="card-3d smart-card p-6 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    مميز
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="h-4 w-4" />
                    {article.views.toLocaleString()}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-3">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{article.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {article.video && (
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                        <Play className="h-4 w-4" />
                        فيديو
                      </button>
                    )}
                    {article.pdf && (
                      <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm">
                        <Download className="h-4 w-4" />
                        PDF
                      </button>
                    )}
                  </div>
                  <button className="smart-button px-4 py-2 text-sm">
                    اقرأ المزيد
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section - الأسئلة الشائعة */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            إجابات على أكثر الأسئلة شيوعاً من عملائنا الكرام
          </p>
          
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="smart-card p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {expandedFaqs.has(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {expandedFaqs.has(faq.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm">
                        <ThumbsUp className="h-4 w-4" />
                        مفيد
                      </button>
                      <button className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm">
                        <ThumbsDown className="h-4 w-4" />
                        غير مفيد
                      </button>
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                        <Share2 className="h-4 w-4" />
                        مشاركة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support - التواصل مع الدعم */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            فريق الدعم متاح لمساعدتك في أي وقت. تواصل معنا وسنكون سعداء بمساعدتك
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="smart-card p-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">الدردشة المباشرة</h3>
              <p className="text-gray-600 text-sm mb-4">تواصل فوري مع فريق الدعم</p>
              <button className="smart-button w-full">ابدأ الدردشة</button>
            </div>
            
            <div className="smart-card p-6 text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">اتصل بنا</h3>
                              <p className="text-gray-600 text-sm mb-4">خدمة متاحة على الرقم المجاني</p>
              <button className="smart-button w-full">اتصل الآن</button>
            </div>
            
            <div className="smart-card p-6 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">أرسل رسالة</h3>
              <p className="text-gray-600 text-sm mb-4">رد سريع ومضمون</p>
              <button className="smart-button w-full">أرسل رسالة</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  );
};

export default HelpCenter; 