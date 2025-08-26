import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageCircle, Phone, Mail, MapPin, Clock, ChevronRight, HelpCircle, FileText, Users, Settings } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import SmoothScroll from '../components/common/SmoothScroll';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const sections = [
    { id: 'hero', title: 'مركز الدعم' },
    { id: 'help-categories', title: 'فئات المساعدة' },
    { id: 'contact-methods', title: 'طرق التواصل' },
    { id: 'faq', title: 'الأسئلة الشائعة' }
  ];

  const helpCategories = [
    {
      id: 'booking',
      title: 'الحجز والدفع',
      description: 'مساعدة في عملية الحجز والدفع',
      icon: <FileText className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      articles: 15
    },
    {
      id: 'services',
      title: 'الخدمات',
      description: 'معلومات عن خدماتنا وكيفية استخدامها',
      icon: <Settings className="h-8 w-8" />,
      color: 'from-[#2E7D32] to-[#000000]',
      articles: 12
    },
    {
      id: 'account',
      title: 'الحساب الشخصي',
      description: 'إدارة الحساب والمعلومات الشخصية',
      icon: <Users className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      articles: 8
    },
    {
      id: 'technical',
      title: 'المشاكل التقنية',
      description: 'حل المشاكل التقنية في التطبيق',
      icon: <HelpCircle className="h-8 w-8" />,
      color: 'from-orange-500 to-orange-600',
      articles: 20
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'اتصل بنا',
      description: <span dir="ltr">+966 56 809 1983</span>,
      action: 'اتصل الآن',
      color: 'from-[#2E7D32] to-[#000000]'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'الدردشة المباشرة',
      description: 'احصل على مساعدة فورية',
      action: 'ابدأ المحادثة',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'راسلنا عبر البريد',
      description: 'support@paypassx.com',
      action: 'أرسل رسالة',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'زيارة الفرع',
      description: 'الرياض، شارع الملك فهد',
      action: 'اعرض الخريطة',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const faqs = [
    {
      question: 'كيف يمكنني حجز موعد غسيل السيارة؟',
      answer: 'يمكنك الحجز عبر تطبيقنا أو الموقع الإلكتروني بسهولة. اختر الفرع والموعد المناسب وادفع إلكترونياً.'
    },
    {
      question: 'ما هي مدة غسيل السيارة؟',
      answer: 'تختلف المدة حسب نوع الخدمة: الغسيل الخارجي (15-20 دقيقة)، الغسيل الشامل (30-40 دقيقة)، الخدمة الفاخرة (60-75 دقيقة).'
    },
    {
      question: 'هل يمكنني إلغاء الحجز؟',
      answer: 'نعم، يمكنك إلغاء الحجز قبل الموعد المحدد دون أي رسوم إضافية.'
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل جميع البطاقات الائتمانية، المحافظ الإلكترونية، والدفع النقدي في الفروع.'
    },
    {
      question: 'هل تقدمون ضمان على الخدمات؟',
      answer: 'نعم، نقدم ضمان استرداد الأموال إذا لم تكن راضياً عن الخدمة.'
    },
    {
      question: 'كيف يمكنني تتبع حالة غسيل سيارتي؟',
      answer: 'يمكنك تتبع الحالة عبر التطبيق أو الموقع الإلكتروني باستخدام رقم الحجز الخاص بك.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <PageHeader 
        title="مركز الدعم"
        subtitle="نحن هنا لمساعدتك في كل شيء"
        breadcrumbs={['الرئيسية', 'مركز الدعم']}
      />
      <SmoothScroll sections={sections} />
      
      {/* Hero Section */}
      <section id="hero" data-section className="pt-8 pb-16 bg-gradient-to-br from-[#FEFEFE] via-[#F8F9FA] to-[#FEFEFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in-element">
            <h1 
              className={`text-4xl md:text-5xl font-bold text-[#000000] mb-6 text-gradient cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'support-title' ? 'text-[#2E7D32]' : ''
              }`}
              onClick={() => handleItemClick('عنوان الدعم')}
              onMouseEnter={() => setHoveredItem('support-title')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              مركز الدعم
            </h1>
            <p 
              className={`text-xl text-[#000000] mb-8 max-w-3xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'support-description' ? 'text-gray-800' : ''
              }`}
              onClick={() => handleItemClick('وصف الدعم')}
              onMouseEnter={() => setHoveredItem('support-description')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              نحن هنا لمساعدتك في كل شيء. ابحث عن إجابة سريعة أو تواصل مع فريق الدعم
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#000000] opacity-50" />
                <input
                  type="text"
                  placeholder="ابحث عن مساعدة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-4 pr-12 py-4 border-2 border-[#F8F9FA] rounded-xl focus:outline-none focus:border-[#2E7D32] transition-all duration-300 ${
                    hoveredItem === 'search-input' ? 'border-[#2E7D32]' : ''
                  }`}
                  onMouseEnter={() => setHoveredItem('search-input')}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick('حقل البحث')}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div 
                className={`flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'availability-badge' ? 'shadow-lg' : ''
                }`}
                onClick={() => handleItemClick('متاح')}
                onMouseEnter={() => setHoveredItem('availability-badge')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Clock className="h-4 w-4 text-[#2E7D32]" />
                                  <span className="text-[#000000] text-sm">متاح</span>
              </div>
              <div 
                className={`flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'chat-badge' ? 'shadow-lg' : ''
                }`}
                onClick={() => handleItemClick('دردشة مباشرة')}
                onMouseEnter={() => setHoveredItem('chat-badge')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <MessageCircle className="h-4 w-4 text-[#2E7D32]" />
                <span className="text-[#000000] text-sm">دردشة مباشرة</span>
              </div>
              <div 
                className={`flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'phone-badge' ? 'shadow-lg' : ''
                }`}
                onClick={() => handleItemClick('دعم هاتفي')}
                onMouseEnter={() => setHoveredItem('phone-badge')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Phone className="h-4 w-4 text-[#2E7D32]" />
                <span className="text-[#000000] text-sm">دعم هاتفي</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories Section */}
      <section id="help-categories" data-section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in-element">
            <h2 
              className={`text-3xl md:text-4xl font-bold text-[#000000] mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'categories-title' ? 'text-[#2E7D32]' : ''
              }`}
              onClick={() => handleItemClick('فئات المساعدة')}
              onMouseEnter={() => setHoveredItem('categories-title')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              فئات المساعدة
            </h2>
            <p 
              className={`text-lg text-[#000000] opacity-80 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'categories-description' ? 'opacity-100' : ''
              }`}
              onClick={() => handleItemClick('وصف الفئات')}
              onMouseEnter={() => setHoveredItem('categories-description')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              اختر الفئة المناسبة لاحتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {helpCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/help-center/${category.id}`}
                className="group"
                onClick={() => handleItemClick(`فئة ${category.title}`)}
                onMouseEnter={() => setHoveredItem(`category-${category.id}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`bg-white rounded-xl p-6 border-2 border-[#F8F9FA] hover-lift card-hover transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                  hoveredItem === `category-${category.id}` ? 'shadow-xl border-[#2E7D32]' : ''
                }`}>
                  <div className={`bg-gradient-to-r ${category.color} text-white rounded-lg p-3 mb-4 inline-block transition-all duration-300 ${
                    hoveredItem === `category-${category.id}` ? 'scale-110' : ''
                  }`}>
                    {category.icon}
                  </div>
                  <h3 className={`text-xl font-bold text-[#000000] mb-2 group-hover:text-[#2E7D32] transition-all duration-300 ${
                    hoveredItem === `category-${category.id}` ? 'text-[#2E7D32]' : ''
                  }`}>
                    {category.title}
                  </h3>
                  <p className="text-[#000000] opacity-70 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#2E7D32] text-sm font-medium">
                      {category.articles} مقال
                    </span>
                    <ChevronRight className={`h-4 w-4 text-[#2E7D32] transition-all duration-300 ${
                      hoveredItem === `category-${category.id}` ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section id="contact-methods" data-section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in-element">
            <h2 
              className={`text-3xl md:text-4xl font-bold text-[#000000] mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'contact-title' ? 'text-[#2E7D32]' : ''
              }`}
              onClick={() => handleItemClick('طرق التواصل')}
              onMouseEnter={() => setHoveredItem('contact-title')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              طرق التواصل
            </h2>
            <p 
              className={`text-lg text-[#000000] opacity-80 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'contact-description' ? 'opacity-100' : ''
              }`}
              onClick={() => handleItemClick('وصف التواصل')}
              onMouseEnter={() => setHoveredItem('contact-description')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              اختر الطريقة المناسبة للتواصل معنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 text-center shadow-md cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === `contact-${index}` ? 'shadow-xl' : ''
                }`}
                onClick={() => handleItemClick(`تواصل ${method.title}`)}
                onMouseEnter={() => setHoveredItem(`contact-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`bg-gradient-to-r ${method.color} text-white rounded-lg p-3 mb-4 inline-block transition-all duration-300 ${
                  hoveredItem === `contact-${index}` ? 'scale-110' : ''
                }`}>
                  {method.icon}
                </div>
                <h3 className={`text-xl font-bold text-[#000000] mb-2 transition-all duration-300 ${
                  hoveredItem === `contact-${index}` ? 'text-[#2E7D32]' : ''
                }`}>
                  {method.title}
                </h3>
                <p className="text-[#000000] opacity-70 text-sm mb-4">
                  {method.description}
                </p>
                <button className={`bg-gradient-to-r ${method.color} text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  hoveredItem === `contact-${index}` ? 'scale-105' : ''
                }`}>
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" data-section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in-element">
            <h2 
              className={`text-3xl md:text-4xl font-bold text-[#000000] mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'faq-title' ? 'text-[#2E7D32]' : ''
              }`}
              onClick={() => handleItemClick('الأسئلة الشائعة')}
              onMouseEnter={() => setHoveredItem('faq-title')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              الأسئلة الشائعة
            </h2>
            <p 
              className={`text-lg text-[#000000] opacity-80 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'faq-description' ? 'opacity-100' : ''
              }`}
              onClick={() => handleItemClick('وصف الأسئلة')}
              onMouseEnter={() => setHoveredItem('faq-description')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              إجابات على أكثر الأسئلة شيوعاً
            </p>
          </div>

          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-[#F8F9FA] rounded-xl p-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === `faq-${index}` ? 'shadow-lg bg-white' : ''
                }`}
                onClick={() => handleItemClick(`سؤال ${index + 1}`)}
                onMouseEnter={() => setHoveredItem(`faq-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h3 className={`text-lg font-bold text-[#000000] mb-3 transition-all duration-300 ${
                  hoveredItem === `faq-${index}` ? 'text-[#2E7D32]' : ''
                }`}>
                  {faq.question}
                </h3>
                <p className="text-[#000000] opacity-70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-gradient-to-r from-[#2E7D32] to-[#000000] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in-element">
            هل تحتاج مساعدة إضافية؟
          </h2>
          <p className="text-xl mb-8 opacity-90 fade-in-element">
            فريق الدعم متاح على مدار الساعة لمساعدتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#2E7D32] px-8 py-4 rounded-xl font-bold hover-scale transition-all duration-300"
            >
              تواصل معنا
            </Link>
            <Link
              to="/help-center"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#2E7D32] transition-all duration-300"
            >
              مركز المساعدة
            </Link>
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <Clock className="h-12 w-12 text-[#2E7D32] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#000000] mb-2">
                ساعات العمل
              </h3>
              <p className="text-[#000000] opacity-70">
                فريق الدعم متاح لمساعدتك
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-[#000000] mb-4">خدمة العملاء</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#000000] opacity-70">الأحد - الخميس</span>
                    <span className="text-[#000000] font-medium">8:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] opacity-70">الجمعة - السبت</span>
                    <span className="text-[#000000] font-medium">9:00 ص - 5:00 م</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-[#000000] mb-4">الدعم التقني</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#000000] opacity-70">طوال الأسبوع</span>
                    <span className="text-[#000000] font-medium">متاح</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000000] opacity-70">الرد السريع</span>
                    <span className="text-[#000000] font-medium">خلال 2 ساعة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support; 