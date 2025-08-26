import React, { useState, useEffect } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, Phone, MessageCircle, Star, Clock, Users, Shield, Zap, Lightbulb, BookOpen, Video, FileText, ThumbsUp, ThumbsDown, Share2, Bookmark, Filter, ArrowRight, CheckCircle, AlertCircle, Info, Calendar, CreditCard, Smartphone, Settings, Car, Eye, Play, Download } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import AnimatedCard from './common/AnimatedCard';
import LoadingSpinner from './common/LoadingSpinner';
import SearchBar from './common/SearchBar';
import '../components/common/styles.css';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaqs, setExpandedFaqs] = useState(new Set());
  const [isSearching, setIsSearching] = useState(false);
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  // إحصائيات حية
  const [liveStats, setLiveStats] = useState({
    totalFaqs: 156,
    helpfulCount: 1247,
    searchCount: 3456,
    satisfactionRate: '96.8'
  });

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // محاكاة البحث الذكي
    if (searchQuery.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
        // محاكاة البحث
        const filtered = faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredFaqs(filtered);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setFilteredFaqs([]);
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

  const faqs = [
    {
      id: 1,
      question: "كيف يمكنني إنشاء حساب في PayPass؟",
      answer: "يمكنك إنشاء حساب بسهولة من خلال تحميل التطبيق وإدخال رقم الهاتف والتحقق منه عبر رمز SMS المرسل إليك. بعد التحقق، يمكنك إكمال بياناتك الشخصية وإضافة معلومات السيارة.",
      category: "account",
      tags: ["حساب", "تسجيل", "مبتدئ"],
      helpful: 156,
      notHelpful: 12,
      featured: true,
      video: true,
      pdf: true
    },
    {
      id: 2,
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "نقبل جميع البطاقات الائتمانية والمدى والدفع النقدي في الفروع. كما يمكنك استخدام المحفظة الإلكترونية في التطبيق أو الدفع عبر Apple Pay و Google Pay.",
      category: "payment",
      tags: ["دفع", "بطاقة", "مدى"],
      helpful: 234,
      notHelpful: 8,
      featured: true,
      video: false,
      pdf: true
    },
    {
      id: 3,
      question: "كيف يمكنني حجز موعد غسيل؟",
      answer: "اختر الفرع القريب منك، حدد نوع الغسيل المطلوب، اختر الوقت المناسب لك، وأكمل عملية الدفع. ستتلقى تأكيد الحجز عبر التطبيق والبريد الإلكتروني.",
      category: "booking",
      tags: ["حجز", "موعد", "غسيل"],
      helpful: 189,
      notHelpful: 15,
      featured: true,
      video: true,
      pdf: false
    },
    {
      id: 4,
      question: "كيف يمكنني تتبع حالة طلبي؟",
      answer: "يمكنك تتبع حالة طلبك من خلال التطبيق في قسم 'طلباتي' أو الاتصال بنا مباشرة على الرقم المجاني. ستتلقى إشعارات فورية عند كل تحديث.",
      category: "booking",
      tags: ["تتبع", "طلب", "حالة"],
      helpful: 145,
      notHelpful: 9,
      featured: false,
      video: false,
      pdf: true
    },
    {
      id: 5,
      question: "ما هو وقت الاستجابة للدعم؟",
      answer: "نرد على جميع الاستفسارات في أقرب وقت ممكن، وفي معظم الحالات نرد خلال ساعات قليلة. للاستفسارات العاجلة، يمكنك استخدام الدردشة المباشرة.",
      category: "technical",
      tags: ["دعم", "رد", "وقت"],
      helpful: 98,
      notHelpful: 6,
      featured: false,
      video: false,
      pdf: true
    },
    {
      id: 6,
      question: "هل يمكنني إلغاء الحجز؟",
      answer: "نعم، يمكنك إلغاء الحجز مجاناً قبل 3 ساعات من الموعد المحدد من خلال التطبيق أو الاتصال بنا. بعد هذه المدة، قد يتم خصم رسوم إلغاء.",
      category: "booking",
      tags: ["إلغاء", "حجز", "رسوم"],
      helpful: 167,
      notHelpful: 11,
      featured: false,
      video: true,
      pdf: false
    },
    {
      id: 7,
      question: "ما هي ساعات عمل الفروع؟",
      answer: "معظم فروعنا تعمل من 7 صباحاً حتى 11 مساءً، مع فروع تعمل على مدار الساعة في المواقع الرئيسية. يمكنك التحقق من ساعات العمل لكل فرع في التطبيق.",
      category: "services",
      tags: ["ساعات", "عمل", "فروع"],
      helpful: 123,
      notHelpful: 7,
      featured: false,
      video: false,
      pdf: true
    },
    {
      id: 8,
      question: "كيف يمكنني تغيير كلمة المرور؟",
      answer: "اذهب إلى إعدادات الحساب في التطبيق، اختر 'تغيير كلمة المرور'، أدخل كلمة المرور الحالية ثم كلمة المرور الجديدة. تأكد من اختيار كلمة مرور قوية.",
      category: "account",
      tags: ["كلمة مرور", "حساب", "أمان"],
      helpful: 89,
      notHelpful: 5,
      featured: false,
      video: true,
      pdf: true
    },
    {
      id: 9,
      question: "ما هي أنواع خدمات الغسيل المتاحة؟",
      answer: "نقدم غسيل خارجي شامل، غسيل داخلي، تلميع السيارات، تنظيف المحرك، خدمة VIP، ومعطر داخلي. كل خدمة لها خصائصها ومميزاتها الخاصة.",
      category: "services",
      tags: ["خدمات", "غسيل", "أنواع"],
      helpful: 201,
      notHelpful: 13,
      featured: true,
      video: true,
      pdf: true
    },
    {
      id: 10,
      question: "كيف يمكنني استرداد المبلغ؟",
      answer: "في حالة عدم الرضا عن الخدمة، يمكنك طلب استرداد المبلغ. اتصل بنا أو استخدم نموذج الشكاوى في التطبيق.",
      category: "payment",
      tags: ["استرداد", "مبلغ", "شكوى"],
      helpful: 134,
      notHelpful: 8,
      featured: false,
      video: false,
      pdf: true
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

  const handleHelpful = (id, isHelpful) => {
    // هنا يمكن إضافة منطق حفظ التقييم
    setHelpfulCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleShare = (faq) => {
    // محاكاة مشاركة السؤال
    const shareText = `سؤال: ${faq.question}\nإجابة: ${faq.answer}\nمن PayPass`;
    if (navigator.share) {
      navigator.share({
        title: 'PayPass FAQ',
        text: shareText,
        url: window.location.href
      });
    } else {
      // نسخ إلى الحافظة
      navigator.clipboard.writeText(shareText);
      alert('تم نسخ السؤال إلى الحافظة');
    }
  };

  const displayFaqs = searchQuery.length > 2 ? filteredFaqs : 
    selectedCategory === 'all' ? faqs : 
    faqs.filter(faq => faq.category === selectedCategory);

  return (
    <>
      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50" dir="rtl">
        <PageHeader
          title="الأسئلة الشائعة"
          subtitle="نوفر وقتك بإجابات فورية على أكثر الأسئلة شيوعاً. ابحث أو تصفح الفئات أدناه"
          breadcrumbs={['الرئيسية', 'الأسئلة الشائعة']}
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
                  {category.count} سؤال
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured FAQs - الأسئلة المميزة */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              الأسئلة الأكثر شيوعاً
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              أكثر الأسئلة طلباً من عملائنا الكرام
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {faqs.filter(faq => faq.featured).map((faq, index) => (
                <div 
                  key={faq.id} 
                  className="card-3d smart-card p-6 hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      مميز
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ThumbsUp className="h-4 w-4" />
                      {faq.helpful}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{faq.answer}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {faq.tags.map((tag, idx) => (
                      <span key={idx} className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {faq.video && (
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                          <Play className="h-4 w-4" />
                          فيديو
                        </button>
                      )}
                      {faq.pdf && (
                        <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm">
                          <Download className="h-4 w-4" />
                          PDF
                        </button>
                      )}
                    </div>
                    <button 
                      onClick={() => toggleFaq(faq.id)}
                      className="smart-button px-4 py-2 text-sm"
                    >
                      اقرأ المزيد
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ List - قائمة الأسئلة */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            {searchQuery ? `نتائج البحث عن "${searchQuery}"` : 'جميع الأسئلة'}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {searchQuery ? `تم العثور على ${displayFaqs.length} نتيجة` : 'إجابات على أكثر الأسئلة شيوعاً من عملائنا الكرام'}
          </p>
          
          <div className="space-y-4">
            {displayFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="smart-card p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800 pr-4">{faq.question}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ThumbsUp className="h-4 w-4" />
                      {faq.helpful}
                    </div>
                    <div className="flex-shrink-0">
                      {expandedFaqs.has(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedFaqs.has(faq.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {faq.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHelpful(faq.id, true);
                          }}
                          className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          مفيد
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHelpful(faq.id, false);
                          }}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          غير مفيد
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(faq);
                          }}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Share2 className="h-4 w-4" />
                          مشاركة
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {faq.video && (
                          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                            <Play className="h-4 w-4" />
                            فيديو
                          </button>
                        )}
                        {faq.pdf && (
                          <button className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm">
                            <Download className="h-4 w-4" />
                            PDF
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {displayFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">لم نجد ما تبحث عنه</h3>
              <p className="text-gray-600 mb-6">جرب البحث بكلمات مختلفة أو تصفح الفئات أدناه</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="smart-button"
              >
                عرض جميع الأسئلة
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support - التواصل مع الدعم */}
      <div className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            لم تجد إجابة لسؤالك؟
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            فريق الدعم متاح لمساعدتك في أي وقت. تواصل معنا وسنكون سعداء بمساعدتك
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="smart-card p-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
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
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">دليل المستخدم</h3>
              <p className="text-gray-600 text-sm mb-4">دليل شامل لجميع الخدمات</p>
              <button className="smart-button w-full">تصفح الدليل</button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Promise - وعد الأسئلة الشائعة */}
      <div className="py-16 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">وعد الأسئلة الشائعة</h2>
          <p className="text-xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            نلتزم بتوفير إجابات واضحة ومفيدة لجميع استفساراتكم
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">إجابات فورية</h3>
              <p className="text-green-100">
                نقدم إجابات واضحة ومفيدة لجميع أسئلتكم
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Shield className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">معلومات موثوقة</h3>
              <p className="text-green-100">
                جميع الإجابات مبنية على خبرتنا الواسعة
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Users className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">تحديث مستمر</h3>
              <p className="text-green-100">
                نحدث الأسئلة والإجابات باستمرار بناءً على آرائكم
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  );
};

export default FAQ; 