import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import LoadingSpinner from './common/LoadingSpinner';
import PageHeader from './common/PageHeader';
import AnimatedCard from './common/AnimatedCard';
import SearchBar from './common/SearchBar';
import '../components/common/styles.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', department: 'general' });
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "اتصل بنا",
              subtitle: "خدمة العملاء المتخصصة",
      primary: <span dir="ltr">+966 56 810 9183</span>,
      secondary: <span dir="ltr">+966 11 234 5678</span>,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      action: "اتصل الآن",
      href: "tel:+966568109183"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "راسلنا",
      subtitle: "رد سريع خلال ساعات",
      primary: "info@paypass.sa",
      secondary: "support@paypass.sa",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      action: "أرسل بريد",
      href: "mailto:info@paypass.sa"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "الدردشة المباشرة",
      subtitle: "رد فوري",
      primary: "متاحة الآن",
              secondary: "7-11",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      action: "ابدأ الدردشة",
      href: "#chat"
    }
  ];

  const departments = [
    { value: 'general', label: 'عام', icon: <MessageCircle className="h-4 w-4" /> },
    { value: 'technical', label: 'الدعم الفني', icon: <Headphones className="h-4 w-4" /> },
    { value: 'sales', label: 'المبيعات', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'billing', label: 'الفواتير', icon: <FileText className="h-4 w-4" /> }
  ];

  const supportStats = [
    { icon: <Users className="h-6 w-6" />, value: "10K+", label: "عميل راضي" },
    { icon: <Star className="h-6 w-6" />, value: "4.9", label: "تقييم متوسط" },
    { icon: <Clock className="h-6 w-6" />, value: "< 2 د", label: "وقت الاستجابة" },
    { icon: <CheckCircle className="h-6 w-6" />, value: "99%", label: "معدل الحل" }
  ];

  const quickActions = [
    {
      icon: <Download className="h-6 w-6" />,
      title: "تحميل التطبيق",
      description: "احصل على تطبيق PayPass",
      action: "تحميل",
      href: "#"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "فيديو تعليمي",
      description: "شاهد كيفية الاستخدام",
      action: "مشاهدة",
      href: "#"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "الدليل الشامل",
      description: "دليل الاستخدام الكامل",
      action: "تحميل",
      href: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50" dir="rtl">
      {/* Enhanced Header */}
      <PageHeader
        title="تواصل معنا"
        subtitle="نحن هنا لمساعدتك في كل خطوة"
        icon={MessageCircle}
        stats={supportStats}
      />

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        {/* Enhanced Contact Methods Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <AnimatedCard
              key={index}
              delay={`${index * 0.1}s`}
              className={`${method.bgColor} p-6 border border-white/50`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.subtitle}</p>
              <div className="space-y-2 mb-6">
                <p className="font-semibold text-gray-800" dir="ltr">{method.primary}</p>
                <p className="text-gray-600" dir="ltr">{method.secondary}</p>
              </div>
              <a 
                href={method.href}
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${method.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
              >
                {method.action}
                <ArrowRight className="h-4 w-4" />
              </a>
            </AnimatedCard>
          ))}
        </div>

        {/* Enhanced Main Content Tabs */}
        <AnimatedCard className="overflow-hidden mb-16" delay="0.3s">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100">
            {[
              { id: 'contact', label: 'نموذج التواصل', icon: <MessageCircle className="h-5 w-5" /> },
              { id: 'location', label: 'موقعنا', icon: <MapPin className="h-5 w-5" /> },
              { id: 'hours', label: 'ساعات العمل', icon: <Clock className="h-5 w-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-green-500 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <Send className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">أرسل لنا رسالة</h2>
                      <p className="text-white font-bold">سنرد عليك في أقرب وقت ممكن</p>
                    </div>
                  </div>

                  {showSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">تم إرسال رسالتك بنجاح!</p>
                          <p className="text-green-700 text-sm">سنتواصل معك قريباً</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                          className="w-full h-12 border border-white/30 rounded-xl px-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                        <label className="block text-sm font-semibold text-white mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                          className="w-full h-12 border border-white/30 rounded-xl px-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
              </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                        <label className="block text-sm font-semibold text-white mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                          className="w-full h-12 border border-white/30 rounded-xl px-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
                <div>
                        <label className="block text-sm font-semibold text-white mb-2">القسم</label>
                  <select
                          name="department"
                          value={formData.department}
                    onChange={handleChange}
                          className="w-full h-12 border border-white/30 rounded-xl px-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  >
                          {departments.map((dept) => (
                            <option key={dept.value} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                  </select>
                </div>
              </div>

              <div>
                      <label className="block text-sm font-semibold text-white mb-2">الموضوع</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full h-12 border border-white/30 rounded-xl px-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                        placeholder="أدخل موضوع الرسالة"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">الرسالة</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                        rows={5}
                        className="w-full border border-white/30 rounded-xl px-4 py-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              <button
                type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                <Send className="h-5 w-5" />
                          إرسال الرسالة
                        </>
                      )}
              </button>
            </form>
          </div>

                {/* Quick Actions & Info */}
                <div className="space-y-8">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
                    <div className="space-y-3">
                      {quickActions.map((action, index) => (
                        <a
                key={index}
                          href={action.href}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
              >
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                            {action.icon}
                  </div>
                  <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{action.title}</h4>
                            <p className="text-gray-600 text-sm">{action.description}</p>
                          </div>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors duration-300">
                            {action.action}
                          </button>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Support Promise */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-8 w-8 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-800">وعد الدعم</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">رد سريع</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">خدمة عملاء متخصصة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">حلول مضمونة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">موقعنا</h2>
                    <p className="text-gray-600">زورنا في مقرنا الرئيسي</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-2xl p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">العنوان</h3>
                      <div className="space-y-3">
                        <p className="text-gray-700">الرياض، المملكة العربية السعودية</p>
                        <p className="text-gray-700">شارع الملك فهد</p>
                        <p className="text-gray-700">برج المملكة، الطابق 15</p>
                        <p className="text-gray-700">الرمز البريدي: 12345</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="font-bold text-gray-800 mb-3">كيفية الوصول</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• مترو الرياض - محطة الملك فهد</p>
                        <p>• حافلة النقل العام - خط 123</p>
                        <p>• موقف سيارات مجاني</p>
                        <p>• مدخل للمعاقين متوفر</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Interactive Map Placeholder */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
                  <GlobeIcon className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">خريطة تفاعلية</h3>
                  <p className="text-white/90 mb-4">شاهد موقعنا على الخريطة وابحث عن أقرب فرع لك</p>
                  <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                    فتح الخريطة
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">ساعات العمل</h2>
                    <p className="text-gray-600">نحن متاحون لخدمتك</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-6">ساعات العمل العادية</h3>
                    <div className="space-y-4 text-right">
                      <div className="flex justify-between items-center">
                        <span>الأحد - الخميس</span>
                        <span className="font-bold">8:00 ص - 6:00 م</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>الجمعة</span>
                        <span className="font-bold">9:00 ص - 5:00 م</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>السبت</span>
                        <span className="font-bold">9:00 ص - 5:00 م</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-6">خدمة العملاء المتخصصة</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5" />
                        <span>الدعم الهاتفي</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5" />
                        <span>الدردشة المباشرة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5" />
                        <span>البريد الإلكتروني</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5" />
                        <span>تطبيق الموبايل</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">ملاحظة مهمة</h3>
                  <p className="text-yellow-700">
                    في أيام العطل الرسمية، قد تتغير ساعات العمل. يرجى الاتصال بنا للتحقق من الساعات المحدثة.
                  </p>
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>

        {/* Live Chat Widget */}
        <div className="fixed bottom-6 left-6 z-50">
          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group">
            <MessageCircle className="h-6 w-6" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact; 