import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Users, Award, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال الرسالة
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
    setFormData({
        fullName: '',
      email: '',
        subject: '',
        phone: '',
      message: ''
    });

    console.log(formData)
      
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'اتصل بنا',
      content: '+966 56 890 9183',
      description: 'متاح للدعم',
      color: 'from-green-500 to-green-600',
      action: () => window.open('tel:+966568909183', '_self')
    },
    {
      icon: Mail,
      title: 'راسلنا',
      content: 'support@paypasss.com',
      secondaryContent: 'sales@paypasss.com',
      description: 'رد سريع ومضمون',
      color: 'from-green-500 to-green-600',
      action: () => window.open('mailto:support@paypasss.com', '_self')
    },
    {
      icon: MapPin,
      title: 'العنوان',
      content: 'الرياض، المملكة العربية السعودية',
      secondaryContent: 'شارع الملك فهد',
      description: 'المقر الرئيسي',
      color: 'from-green-500 to-green-600',
      action: () => window.open('https://maps.app.goo.gl/hD3KYnFEgx9pEXBu6?g_st=iw', '_blank')
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      content: 'الأحد - الخميس: 8:00 ص - 6:00 م',
      secondaryContent: 'الجمعة - السبت: 9:00 ص - 5:00 م',
      description: 'خدمة العملاء متاحة',
      color: 'from-green-500 to-green-600',
      action: null
    }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'عميل راضي', color: 'from-green-500 to-green-600' },
    { icon: MessageCircle, value: 'متاح', label: 'دعم متواصل', color: 'from-green-500 to-green-600' },
    { icon: Award, value: '4.9', label: 'تقييم متوسط', color: 'from-green-500 to-green-600' }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden" dir="rtl">
      {/* خلفية زخرفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            تواصل معنا
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            نحن هنا لمساعدتك
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اتصل بنا أو راسلنا وسنرد عليك في أقرب وقت ممكن. فريق الدعم متاح
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* العمود الأيسر - معلومات التواصل */}
          <div className={`space-y-6 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className={`group bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden ${info.action ? 'cursor-pointer' : ''}`}
                onClick={info.action}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* خلفية زخرفية */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="text-white w-6 h-6" />
                </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                        {info.title}
                </h3>
                      <p className="text-sm text-gray-500">{info.description}</p>
              </div>
            </div>

                  <div className="space-y-2">
                    <p className="text-gray-700 text-lg font-semibold" dir="ltr">
                      {info.content}
                    </p>
                    {info.secondaryContent && (
                      <p className="text-gray-600 text-base" dir="ltr">
                        {info.secondaryContent}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* بطاقة الاتصال السريع */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-center text-white shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Phone className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">اتصل بنا الآن</h3>
                <p className="text-lg mb-6 opacity-90">
                  خدمة العملاء متاحة على مدار الساعة
              </p>
                <button 
                  onClick={() => window.open('tel:+966568909183', '_self')}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-flex items-center gap-3 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-lg" dir="ltr">+966 56 890 9183</span>
                </button>
              </div>
            </div>
          </div>

          {/* العمود الأيمن - نموذج التواصل */}
          <div className={`bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Send className="text-white w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">أرسل لنا رسالة</h3>
                <p className="text-gray-600">سنرد عليك في أقرب وقت ممكن</p>
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-green-800 font-semibold">تم إرسال الرسالة بنجاح!</p>
                  <p className="text-green-700 text-sm">سنرد عليك في أقرب وقت ممكن</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-3 text-base">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-base group-hover:border-gray-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-gray-700 font-bold mb-3 text-base">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-base group-hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-3 text-base">
                    الموضوع *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="أدخل الموضوع"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-base group-hover:border-gray-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-gray-700 font-bold mb-3 text-base">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="أدخل رقم هاتفك"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-base group-hover:border-gray-300"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-gray-700 font-bold mb-3 text-base">
                  الرسالة *
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك هنا..."
                    rows="5"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none text-base group-hover:border-gray-300"
                  />
                  <div className="absolute bottom-4 left-4 text-gray-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                إرسال الرسالة
                  </>
                )}
              </button>
            </form>

            {/* معلومات إضافية */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <span>جميع الحقول المطلوبة محددة بـ *</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 