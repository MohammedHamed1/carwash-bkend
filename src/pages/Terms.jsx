import React, { useEffect, useState } from 'react';
import { FaGavel, FaShieldAlt, FaUserCheck, FaFileContract, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaHandshake, FaBalanceScale, FaLock, FaEye, FaDownload, FaPrint, FaEnvelope, FaPhone, FaWhatsapp, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaStar, FaAward, FaRocket, FaGem, FaMagic } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Terms = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [activeSection, setActiveSection] = useState('general');

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

  const handleSectionClick = (section) => {
    setActiveSection(section);
    handleItemClick(`القسم: ${section}`);
  };

  const termsSections = [
    {
      id: 'general',
      title: 'الشروط العامة',
      icon: FaGavel,
      content: [
        'يجب أن يكون العميل بالغاً ومؤهلاً قانونياً لاستخدام الخدمة',
        'يحق للشركة رفض تقديم الخدمة لأي سبب تراه مناسباً',
        'يجب على العميل تقديم معلومات صحيحة ودقيقة عند الحجز',
        'الشركة غير مسؤولة عن أي أضرار قد تلحق بالسيارة قبل الخدمة'
      ]
    },
    {
      id: 'booking',
      title: 'شروط الحجز',
      icon: FaCalendarAlt,
      content: [
        'يجب الحجز مسبقاً قبل ساعة على الأقل',
        'يمكن إلغاء الحجز مجاناً قبل 12 ساعة من الموعد',
        'في حالة عدم الحضور، سيتم خصم رسوم إلغاء',
        'يمكن تغيير الموعد مجاناً قبل 6 ساعات من الحجز'
      ]
    },
    {
      id: 'service',
      title: 'شروط الخدمة',
      icon: FaHandshake,
      content: [
        'يجب أن تكون السيارة في حالة جيدة قبل الخدمة',
        'الشركة غير مسؤولة عن الأضرار الموجودة مسبقاً',
        'يجب إزالة جميع الأغراض الشخصية من السيارة',
        'الخدمة تشمل الغسيل الخارجي والداخلي حسب الباقة المختارة'
      ]
    },
    {
      id: 'payment',
      title: 'شروط الدفع',
      icon: FaBalanceScale,
      content: [
        'يتم الدفع نقداً أو ببطاقة الائتمان أو المحفظة الإلكترونية',
        'الأسعار شاملة ضريبة القيمة المضافة',
        'لا يتم استرداد المبلغ في حالة عدم الرضا عن الخدمة',
        'يمكن طلب فاتورة إلكترونية أو ورقية'
      ]
    },
    {
      id: 'liability',
      title: 'المسؤولية القانونية',
      icon: FaShieldAlt,
      content: [
        'الشركة مسؤولة عن الأضرار التي تحدث أثناء الخدمة فقط',
        'يجب إبلاغ الشركة فوراً بأي ضرر يحدث',
        'الشركة غير مسؤولة عن الأضرار الطبيعية أو الحوادث',
        'يجب الاحتفاظ بإيصال الدفع كدليل على الخدمة'
      ]
    },
    {
      id: 'privacy',
      title: 'الخصوصية والبيانات',
      icon: FaLock,
      content: [
        'نحترم خصوصية عملائنا ولا نشارك بياناتهم مع أي طرف ثالث',
        'يتم استخدام البيانات فقط لتقديم الخدمة المطلوبة',
        'يمكن للعميل طلب حذف بياناته في أي وقت',
        'نستخدم تقنيات تشفير متقدمة لحماية البيانات'
      ]
    }
  ];

  const importantNotes = [
    {
      type: 'warning',
      icon: FaExclamationTriangle,
      title: 'تنبيه مهم',
      content: 'يجب قراءة جميع الشروط بعناية قبل استخدام الخدمة'
    },
    {
      type: 'info',
      icon: FaInfoCircle,
      title: 'معلومات إضافية',
      content: 'يمكن التواصل معنا لأي استفسار حول الشروط والأحكام'
    },
    {
      type: 'success',
      icon: FaCheckCircle,
      title: 'ضمان الجودة',
      content: 'نضمن جودة الخدمة ورضا العملاء'
    }
  ];

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="الشروط والأحكام"
          subtitle="يرجى قراءة الشروط والأحكام بعناية قبل استخدام خدماتنا"
          breadcrumbs={['الرئيسية', 'الشروط والأحكام']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* مقدمة الشروط */}
          <section className={`w-full py-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-xl shadow-lg relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {/* خلفية متحركة */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
              <div 
                className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('مقدمة الشروط')}
                onMouseEnter={() => setHoveredItem('terms-intro')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaGavel className={`text-yellow-300 text-4xl mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'terms-intro' ? 'animate-bounce scale-110' : 'animate-bounce'
                }`} style={{animationDuration: '2s'}} />
                <h1 className={`text-4xl font-bold mb-4 text-white transition-all duration-300 ${
                  hoveredItem === 'terms-intro' ? 'scale-105 text-yellow-100' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  الشروط والأحكام
                </h1>
                <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                  hoveredItem === 'terms-intro' ? 'opacity-100 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا
                </p>
              </div>

              <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-2xl border-2 border-white shadow-2xl">
                <p className="text-lg mb-6 leading-relaxed font-bold text-gray-800 text-center" style={{fontFamily: 'Cairo, sans-serif'}}>
                  هذه الشروط والأحكام تحكم استخدامك لخدمات غسيل السيارات المقدمة من شركتنا. 
                  باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط بالكامل.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 text-center text-base font-bold text-gray-700">
                  <div className="flex items-center justify-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                    <FaCheckCircle className="mr-3 text-[#00916E] text-xl" />
                    شروط واضحة وشفافة
                  </div>
                  <div className="flex items-center justify-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                    <FaCheckCircle className="mr-3 text-[#00916E] text-xl" />
                    حماية حقوق العملاء
                  </div>
                  <div className="flex items-center justify-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                    <FaCheckCircle className="mr-3 text-[#00916E] text-xl" />
                    التزام بالجودة والخدمة
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* التنقل بين الأقسام */}
          <section className={`w-full py-8 bg-white rounded-xl shadow-lg mt-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6">
              <h2 
                className="text-2xl font-bold text-center mb-8 text-[#00916E] hover:text-green-600 transition-colors duration-300 cursor-pointer transform hover:scale-105 active:scale-95" 
                style={{fontFamily: 'Cairo, sans-serif'}}
                onClick={() => handleItemClick('أقسام الشروط')}
                onMouseEnter={() => setHoveredItem('sections-nav')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                أقسام الشروط والأحكام
              </h2>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {termsSections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 ${
                      activeSection === section.id
                        ? 'bg-[#00916E] text-white border-[#00916E] shadow-lg'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:shadow-md'
                    }`}
                    onClick={() => handleSectionClick(section.id)}
                    onMouseEnter={() => setHoveredItem(`section-${section.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="text-center">
                      <section.icon className={`text-2xl mx-auto mb-2 transition-all duration-300 ${
                        hoveredItem === `section-${section.id}` ? 'scale-110' : ''
                      }`} />
                      <h3 className="font-bold text-sm" style={{fontFamily: 'Cairo, sans-serif'}}>
                        {section.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* محتوى القسم المحدد */}
          <section className={`w-full py-12 bg-white rounded-xl shadow-lg mt-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6">
              {termsSections.map((section) => (
                <div key={section.id} className={activeSection === section.id ? 'block' : 'hidden'}>
                  <div className="text-center mb-8">
                    <div 
                      className="inline-flex items-center mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                      onClick={() => handleItemClick(section.title)}
                      onMouseEnter={() => setHoveredItem(`content-${section.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <section.icon className={`text-3xl mr-3 text-[#00916E] transition-all duration-300 ${
                        hoveredItem === `content-${section.id}` ? 'animate-bounce scale-110' : 'animate-bounce'
                      }`} style={{animationDuration: '2s'}} />
                      <h2 className={`text-3xl font-bold text-[#00916E] transition-all duration-300 ${
                        hoveredItem === `content-${section.id}` ? 'scale-105 text-green-600' : ''
                      }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {section.content.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-95"
                        onClick={() => handleItemClick(`شرط ${index + 1}`)}
                        onMouseEnter={() => setHoveredItem(`item-${section.id}-${index}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="flex items-start">
                          <div className={`w-8 h-8 bg-[#00916E] rounded-full flex items-center justify-center mr-4 mt-1 transition-all duration-300 ${
                            hoveredItem === `item-${section.id}-${index}` ? 'scale-110 bg-green-600' : ''
                          }`}>
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <p className={`text-gray-500 text-sm leading-relaxed transition-all duration-300 ${
                            hoveredItem === `item-${section.id}-${index}` ? 'text-gray-600 scale-105' : ''
                          }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ملاحظات مهمة */}
          <section className={`w-full py-12 bg-gradient-to-br from-[#00916E] via-[#16c47a] to-[#00916E] rounded-xl shadow-xl relative overflow-hidden transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {/* خلفية مزخرفة متحركة */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
              <div className="absolute top-1/4 right-0 w-24 h-24 bg-white rounded-full translate-x-12 animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full -translate-y-10 animate-ping" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="max-w-5xl mx-auto px-6 text-center text-white relative z-10">
              <div 
                className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('ملاحظات مهمة')}
                onMouseEnter={() => setHoveredItem('important-notes')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h2 className={`text-3xl font-bold mb-4 text-white transition-all duration-300 ${
                  hoveredItem === 'important-notes' ? 'scale-105 text-yellow-100' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  ملاحظات مهمة
                </h2>
                <p className={`text-xl text-white opacity-90 font-medium transition-all duration-300 ${
                  hoveredItem === 'important-notes' ? 'opacity-100 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  يرجى الانتباه إلى هذه النقاط المهمة
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {importantNotes.map((note, index) => (
                  <div
                    key={index}
                    className={`bg-white bg-opacity-95 p-6 rounded-xl border-2 border-white shadow-lg hover:shadow-xl hover:bg-opacity-100 hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95 group`}
                    onClick={() => handleItemClick(note.title)}
                    onMouseEnter={() => setHoveredItem(`note-${index}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 ${
                      note.type === 'warning' ? 'bg-yellow-500' :
                      note.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      <note.icon className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${
                      note.type === 'warning' ? 'text-yellow-700' :
                      note.type === 'info' ? 'text-blue-700' : 'text-green-700'
                    } group-hover:scale-105`} style={{fontFamily: 'Cairo, sans-serif'}}>
                      {note.title}
                    </h3>
                    <p className={`text-gray-700 font-bold text-sm leading-relaxed transition-all duration-300 ${
                      hoveredItem === `note-${index}` ? 'text-gray-800 scale-105' : ''
                    }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* الاتصال والدعم */}
          <section className={`w-full py-12 bg-white rounded-xl shadow-lg mt-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6 text-center">
              <div 
                className="mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('الاتصال والدعم')}
                onMouseEnter={() => setHoveredItem('contact-support')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h2 className={`text-3xl font-bold mb-4 text-[#00916E] transition-all duration-300 ${
                  hoveredItem === 'contact-support' ? 'scale-105 text-green-600' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  هل لديك استفسار؟
                </h2>
                <p className={`text-lg text-gray-600 font-medium transition-all duration-300 ${
                  hoveredItem === 'contact-support' ? 'text-gray-700 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  فريق الدعم متاح لمساعدتك في أي استفسار حول الشروط والأحكام
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="group bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <p className="text-[#00916E] font-bold text-base group-hover:text-green-600 transition-colors">اتصل بنا</p>
                  <p className="text-gray-600 text-sm mt-1">خدمة العملاء</p>
                </div>
                
                <div className="group bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <p className="text-[#00916E] font-bold text-base group-hover:text-green-600 transition-colors">واتساب</p>
                  <p className="text-gray-600 text-sm mt-1">دعم فوري</p>
                </div>
                
                <div className="group bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <p className="text-[#00916E] font-bold text-base group-hover:text-green-600 transition-colors">بريد إلكتروني</p>
                  <p className="text-gray-600 text-sm mt-1">استفسارات</p>
                </div>

                <div className="group bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00916E] to-[#16c47a] rounded-full flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <FaDownload className="text-white text-xl" />
                  </div>
                  <p className="text-[#00916E] font-bold text-base group-hover:text-green-600 transition-colors">تحميل PDF</p>
                  <p className="text-gray-600 text-sm mt-1">نسخة مطبوعة</p>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  className="bg-gradient-to-r from-[#00916E] to-[#16c47a] text-white px-8 py-3 rounded-xl font-bold text-lg hover:from-green-600 hover:to-[#00916E] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95 shadow-lg" 
                  style={{fontFamily: 'Cairo, sans-serif'}}
                  onClick={() => handleItemClick('زر الاتصال')}
                  onMouseEnter={() => setHoveredItem('contact-button')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="flex items-center justify-center">
                    <FaRocket className={`mr-3 text-xl transition-all duration-300 ${
                      hoveredItem === 'contact-button' ? 'animate-bounce scale-110' : 'animate-bounce'
                    }`} style={{animationDuration: '2s'}} />
                    تواصل معنا الآن
                    <FaGem className={`ml-3 text-xl transition-all duration-300 ${
                      hoveredItem === 'contact-button' ? 'animate-pulse scale-110' : 'animate-pulse'
                    }`} style={{animationDuration: '1.5s'}} />
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* تحديث الشروط */}
          <section className={`w-full py-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl mt-8 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="max-w-5xl mx-auto px-6 text-center">
              <div 
                className="cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('تحديث الشروط')}
                onMouseEnter={() => setHoveredItem('terms-update')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaExclamationTriangle className={`text-yellow-600 text-3xl mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'terms-update' ? 'animate-pulse scale-110' : 'animate-pulse'
                }`} style={{animationDuration: '2s'}} />
                <h3 className={`text-xl font-bold mb-2 text-yellow-800 transition-all duration-300 ${
                  hoveredItem === 'terms-update' ? 'scale-105 text-yellow-900' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  تحديث الشروط والأحكام
                </h3>
                <p className={`text-yellow-700 font-bold transition-all duration-300 ${
                  hoveredItem === 'terms-update' ? 'text-yellow-800 scale-105' : ''
                }`} style={{fontFamily: 'Cairo, sans-serif'}}>
                  آخر تحديث: 15 يناير 2024 | الإصدار: 2.1
                </p>
                <p className="text-yellow-600 text-sm mt-2 font-bold" style={{fontFamily: 'Cairo, sans-serif'}}>
                  نحتفظ بالحق في تحديث هذه الشروط في أي وقت. سيتم إشعار العملاء بالتغييرات المهمة.
                </p>
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

export default Terms; 