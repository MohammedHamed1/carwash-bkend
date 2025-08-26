import React, { useEffect, useState } from 'react';

const PageHeader = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  gradient = 'from-emerald-600 via-blue-600 to-purple-600',
  stats = [],
  children 
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleItemClick = (itemName) => {
    setClickedItem(itemName);
    // إعادة تعيين العنصر المحدد بعد ثانية
    setTimeout(() => setClickedItem(null), 1000);
  };

  // Check if this is the contact page
  const isContactPage = title === "اتصل بنا";
  // Check if this is the blog/news page
  const isBlogPage = title === "الأخبار" || title === "مدونة PayPass";
  // Check if this is the careers/jobs page
  const isCareersPage = title === "الوظائف الشاغرة" || title === "انضم إلى فريقنا" || title.includes("فريقنا");

  if (isContactPage) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 pt-16 pb-20">
        {/* Background Effects */}
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          {/* Chat Bubble Icon */}
          <div 
            className="flex flex-col items-center mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={() => handleItemClick('أيقونة الاتصال')}
            onMouseEnter={() => setHoveredItem('contact-icon')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30 transition-all duration-300 ${
              hoveredItem === 'contact-icon' ? 'bg-white/30 scale-110 border-white/50' : ''
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-white transition-all duration-300 ${
                hoveredItem === 'contact-icon' ? 'scale-110' : ''
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h1 
            className={`text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'contact-title' ? 'text-yellow-100' : ''
            }`}
            onClick={() => handleItemClick('عنوان الاتصال')}
            onMouseEnter={() => setHoveredItem('contact-title')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-white text-lg md:text-xl mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'contact-subtitle' ? 'text-yellow-100' : ''
            }`}
            onClick={() => handleItemClick('نص الاتصال الفرعي')}
            onMouseEnter={() => setHoveredItem('contact-subtitle')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            نحن هنا لمساعدتك في أي استفسار أو مشكلة
          </p>

          {/* Detailed Description */}
          <p 
            className={`text-white/80 text-base md:text-lg mb-12 max-w-4xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'contact-description' ? 'text-white' : ''
            }`}
            onClick={() => handleItemClick('وصف الاتصال')}
            onMouseEnter={() => setHoveredItem('contact-description')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            فريق الدعم متاح لمساعدتك في حل أي مشكلة تواجهها
          </p>

          {/* Support Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'support-24-7' ? 'bg-white/25 border-white/40' : ''
              }`}
                              onClick={() => handleItemClick('دعم')}
              onMouseEnter={() => setHoveredItem('support-24-7')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'support-24-7' ? 'scale-110' : ''
              }`}>7-11</div>
              <div className="text-white/90 text-sm">ساعات العمل</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'response-time' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('وقت الاستجابة')}
              onMouseEnter={() => setHoveredItem('response-time')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'response-time' ? 'scale-110' : ''
              }`}>2h&gt;</div>
              <div className="text-white/90 text-sm">وقت الاستجابة</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'satisfaction' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('رضا العملاء')}
              onMouseEnter={() => setHoveredItem('satisfaction')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'satisfaction' ? 'scale-110' : ''
              }`}>99%</div>
              <div className="text-white/90 text-sm">رضا العملاء</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'support-branches' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('فروع الدعم')}
              onMouseEnter={() => setHoveredItem('support-branches')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'support-branches' ? 'scale-110' : ''
              }`}>+50</div>
              <div className="text-white/90 text-sm">فرع للدعم</div>
            </div>
          </div>
          
          {/* Custom Children */}
          {children}
        </div>
      </div>
    );
  }

  if (isBlogPage) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 pt-16 pb-20">
        {/* Background Effects */}
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          {/* Book Icon */}
          <div 
            className="flex flex-col items-center mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={() => handleItemClick('أيقونة المدونة')}
            onMouseEnter={() => setHoveredItem('blog-icon')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30 transition-all duration-300 ${
              hoveredItem === 'blog-icon' ? 'bg-white/30 scale-110 border-white/50' : ''
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-white transition-all duration-300 ${
                hoveredItem === 'blog-icon' ? 'scale-110' : ''
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h1 
            className={`text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'blog-title' ? 'text-yellow-100' : ''
            }`}
            onClick={() => handleItemClick('عنوان المدونة')}
            onMouseEnter={() => setHoveredItem('blog-title')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            مدونة PayPass
          </h1>

          {/* Primary Subtitle */}
          <p 
            className={`text-white text-lg md:text-xl mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'blog-subtitle' ? 'text-yellow-100' : ''
            }`}
            onClick={() => handleItemClick('نص المدونة الفرعي')}
            onMouseEnter={() => setHoveredItem('blog-subtitle')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            أحدث الأخبار والنصائح في عالم غسيل السيارات
          </p>

          {/* Secondary Description */}
          <p 
            className={`text-white/80 text-base md:text-lg mb-12 max-w-4xl mx-auto cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'blog-description' ? 'text-white' : ''
            }`}
            onClick={() => handleItemClick('وصف المدونة')}
            onMouseEnter={() => setHoveredItem('blog-description')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            اكتشف أحدث التقنيات والنصائح المفيدة وأخبار الشركة في مدونتنا المتخصصة
          </p>

          {/* Blog Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'content-24-7' ? 'bg-white/25 border-white/40' : ''
              }`}
                              onClick={() => handleItemClick('محتوى')}
              onMouseEnter={() => setHoveredItem('content-24-7')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'content-24-7' ? 'scale-110' : ''
              }`}>7-11</div>
              <div className="text-white/90 text-sm">ساعات العمل</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'reader-satisfaction' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('رضا القراء')}
              onMouseEnter={() => setHoveredItem('reader-satisfaction')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'reader-satisfaction' ? 'scale-110' : ''
              }`}>95%</div>
              <div className="text-white/90 text-sm">رضا القراء</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'monthly-readers' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('القراء الشهريون')}
              onMouseEnter={() => setHoveredItem('monthly-readers')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'monthly-readers' ? 'scale-110' : ''
              }`}>+10K</div>
              <div className="text-white/90 text-sm">قارئ شهرياً</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'monthly-articles' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('المقالات الشهرية')}
              onMouseEnter={() => setHoveredItem('monthly-articles')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'monthly-articles' ? 'scale-110' : ''
              }`}>+12</div>
              <div className="text-white/90 text-sm">مقال شهرياً</div>
            </div>
          </div>
          
          {/* Custom Children */}
          {children}
        </div>
      </div>
    );
  }

  if (isCareersPage) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 pt-16 pb-20">
        {/* Background Effects */}
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          {/* Building/Office Icon */}
          <div 
            className="flex flex-col items-center mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={() => handleItemClick('أيقونة الوظائف')}
            onMouseEnter={() => setHoveredItem('careers-icon')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30 transition-all duration-300 ${
              hoveredItem === 'careers-icon' ? 'bg-white/30 scale-110 border-white/50' : ''
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-white transition-all duration-300 ${
                hoveredItem === 'careers-icon' ? 'scale-110' : ''
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h1 
            className={`text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'careers-title' ? 'text-yellow-100' : ''
            }`}
            onClick={() => handleItemClick('عنوان الوظائف')}
            onMouseEnter={() => setHoveredItem('careers-title')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-white text-lg md:text-xl mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'careers-subtitle' ? 'text-yellow-100' : ''
            }`}
            onClick={() => handleItemClick('نص الوظائف الفرعي')}
            onMouseEnter={() => setHoveredItem('careers-subtitle')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {subtitle}
          </p>

          {/* Careers Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'available-jobs' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('الوظائف المتاحة')}
              onMouseEnter={() => setHoveredItem('available-jobs')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'available-jobs' ? 'scale-110' : ''
              }`}>+100</div>
              <div className="text-white/90 text-sm">وظيفة متاحة</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'employees' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('الموظفين')}
              onMouseEnter={() => setHoveredItem('employees')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'employees' ? 'scale-110' : ''
              }`}>+500</div>
              <div className="text-white/90 text-sm">موظف</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'careers-branches' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('فروع الوظائف')}
              onMouseEnter={() => setHoveredItem('careers-branches')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'careers-branches' ? 'scale-110' : ''
              }`}>+50</div>
              <div className="text-white/90 text-sm">فرع</div>
            </div>
            <div 
              className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                hoveredItem === 'employee-rating' ? 'bg-white/25 border-white/40' : ''
              }`}
              onClick={() => handleItemClick('تقييم الموظفين')}
              onMouseEnter={() => setHoveredItem('employee-rating')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
                hoveredItem === 'employee-rating' ? 'scale-110' : ''
              }`}>4.8</div>
              <div className="text-white/90 text-sm">تقييم الموظفين</div>
            </div>
          </div>
          
          {/* Custom Children */}
          {children}
        </div>
      </div>
    );
  }

  // Default design for other pages
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 pt-16 pb-20">
      {/* Background Effects */}
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* PayPass Logo */}
        <div 
          className="flex flex-col items-center mb-8 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
          onClick={() => handleItemClick('لوجو PayPass')}
          onMouseEnter={() => setHoveredItem('paypass-logo')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className={`w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30 transition-all duration-300 ${
            hoveredItem === 'paypass-logo' ? 'bg-white/30 scale-110 border-white/50' : ''
          }`}>
            <div className={`w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center transition-all duration-300 ${
              hoveredItem === 'paypass-logo' ? 'scale-110' : ''
            }`}>
              <div className={`w-8 h-8 border-2 border-white rounded-md relative transition-all duration-300 ${
                hoveredItem === 'paypass-logo' ? 'scale-110' : ''
              }`}>
                <div className={`w-4 h-4 bg-white/50 rounded-sm absolute top-1 left-1 transition-all duration-300 ${
                  hoveredItem === 'paypass-logo' ? 'scale-110' : ''
                }`}></div>
              </div>
            </div>
          </div>
          <div className={`text-white/90 font-semibold text-lg tracking-wider transition-all duration-300 ${
            hoveredItem === 'paypass-logo' ? 'text-white scale-105' : ''
          }`}>PAYPASS</div>
        </div>

        {/* Main Title */}
        <h1 
          className={`text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
            hoveredItem === 'main-title' ? 'text-yellow-100' : ''
          }`}
          onClick={() => handleItemClick('العنوان الرئيسي')}
          onMouseEnter={() => setHoveredItem('main-title')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {title || "من نحن"}
        </h1>

        {/* Company Description */}
        <div 
          className="max-w-4xl mx-auto mb-12 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
          onClick={() => handleItemClick('وصف الشركة')}
          onMouseEnter={() => setHoveredItem('company-description')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <p className={`text-white text-lg md:text-xl leading-relaxed transition-all duration-300 ${
            hoveredItem === 'company-description' ? 'text-yellow-100' : ''
          }`}>
            PayPass هي الشركة الرائدة في مجال غسيل السيارات الذكي. تأسست شركتنا في عام 2020 بهدف تقديم خدمة غسيل سيارات عصرية ومتطورة تجمع بين التكنولوجيا الحديثة والجودة العالية، مع التركيز على راحة العملاء وحماية البيئة.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div 
            className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'service-24-7' ? 'bg-white/25 border-white/40' : ''
            }`}
                            onClick={() => handleItemClick('خدمة')}
            onMouseEnter={() => setHoveredItem('service-24-7')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
              hoveredItem === 'service-24-7' ? 'scale-110' : ''
            }`}>7-11</div>
            <div className="text-white/90 text-sm">ساعات العمل</div>
          </div>
          <div 
            className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'rating' ? 'bg-white/25 border-white/40' : ''
            }`}
            onClick={() => handleItemClick('التقييم')}
            onMouseEnter={() => setHoveredItem('rating')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
              hoveredItem === 'rating' ? 'scale-110' : ''
            }`}>4.9</div>
            <div className="text-white/90 text-sm">تقييم</div>
          </div>
          <div 
            className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'customers' ? 'bg-white/25 border-white/40' : ''
            }`}
            onClick={() => handleItemClick('العملاء')}
            onMouseEnter={() => setHoveredItem('customers')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`text-3xl font-bold text-white mb-2 transition-all duration-300 ${
              hoveredItem === 'customers' ? 'scale-110' : ''
            }`}>+10K</div>
            <div className="text-white/90 text-sm">عميل</div>
          </div>
          <div 
            className={`bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
              hoveredItem === 'branches' ? 'bg-white/25 border-white/40' : ''
            }`}
            onClick={() => handleItemClick('الفروع')}
            onMouseEnter={() => setHoveredItem('branches')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`text-lg font-bold text-white mb-2 transition-all duration-300 ${
              hoveredItem === 'branches' ? 'scale-110' : ''
            }`}>فرع واحد</div>
            <div className="text-white/90 text-xs">حالياً وقريباً في جميع أنحاء المملكة</div>
          </div>
        </div>
        
        {/* Custom Children */}
        {children}
      </div>
    </div>
  );
};

export default PageHeader; 