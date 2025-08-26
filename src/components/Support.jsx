import React, { useState, useEffect } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, FileText, Users, Settings, Shield, Clock, Star, Crown, Zap, Award, Heart, Sparkles, ArrowRight, CheckCircle, MapPin, Video, Headphones, BookOpen, Lightbulb, Search, Calendar, CreditCard, Smartphone, RefreshCw, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Support = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  // إحصائيات حية
  const [liveStats, setLiveStats] = useState({
    onlineAgents: 12,
    avgResponseTime: '2.5',
    satisfactionRate: '98.5',
    totalTickets: 1547
  });

  useEffect(() => {
    // محاكاة تحديث الإحصائيات في الوقت الفعلي
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        onlineAgents: prev.onlineAgents + Math.floor(Math.random() * 3) - 1,
        totalTickets: prev.totalTickets + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const supportServices = [
    {
      id: 1,
      title: "مركز المساعدة الذكي",
      description: "دليل شامل مع بحث ذكي وإجابات فورية",
      icon: <HelpCircle className="h-8 w-8" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      href: "/help-center",
      features: ["بحث صوتي", "فيديوهات تعليمية", "أسئلة شائعة"]
    },
    {
      id: 2,
      title: "الدعم الفني المتقدم",
      description: "حلول تقنية سريعة مع فريق متخصص",
      icon: <Settings className="h-8 w-8" />,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      href: "/technical-support",
      features: ["تشخيص ذاتي", "دردشة فيديو", "تتبع الطلبات"]
    },
    {
      id: 3,
      title: "الشكاوى والاقتراحات",
      description: "صوتك مسموع - نطور خدماتنا معك",
      icon: <MessageCircle className="h-8 w-8" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      href: "/complaints",
      features: ["متابعة فورية", "مكافآت للاقتراحات", "تصويت مجتمعي"]
    },
    {
      id: 4,
      title: "الأسئلة الشائعة",
      description: "إجابات فورية لأكثر الأسئلة شيوعاً",
      icon: <FileText className="h-8 w-8" />,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      href: "/faq",
      features: ["بحث ذكي", "تصنيفات", "إجابات صوتية"]
    },
    {
      id: 5,
      title: "تواصل مباشر",
      description: "تواصل معنا بأسهل الطرق المناسبة لك",
      icon: <Mail className="h-8 w-8" />,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      href: "/contact",
      features: ["واتساب فوري", "مكالمات فيديو", "رسائل نصية"]
    },
    {
      id: 6,
      title: "دليل الاستخدام التفاعلي",
      description: "تعلم استخدام خدماتنا خطوة بخطوة",
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      href: "/user-guide",
      features: ["فيديوهات تفاعلية", "خطوات مرقمة", "ملفات PDF"]
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "الهاتف المباشر",
      value: <span dir="ltr">+966 920 000 000</span>,
              description: "خدمة عملاء متخصصة",
      action: "اتصل الآن",
      color: "from-green-500 to-green-600",
      delay: "0.1s"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "البريد الإلكتروني",
      value: "support@paypass.sa",
              description: "رد سريع مضمون",
      action: "أرسل رسالة",
      color: "from-blue-500 to-blue-600",
      delay: "0.2s"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "الواتساب الذكي",
      value: <span dir="ltr">+966 50 123 4567</span>,
      description: "رد فوري مع روبوت ذكي",
      action: "تواصل الآن",
      color: "from-green-400 to-green-500",
      delay: "0.3s"
    }
  ];

  const supportStats = [
          { icon: <Clock className="h-6 w-6" />, value: "7-11", label: "ساعات العمل", color: "text-green-500" },
    { icon: <Star className="h-6 w-6" />, value: "4.9", label: "تقييم الدعم", color: "text-yellow-500" },
    { icon: <Users className="h-6 w-6" />, value: `${liveStats.onlineAgents}+`, label: "مستشار دعم", color: "text-blue-500" },
    { icon: <Shield className="h-6 w-6" />, value: "مضمونة", label: "خصوصية كاملة", color: "text-purple-500" }
  ];

  const quickActions = [
    { title: "كيف أحجز خدمة؟", icon: <Calendar className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
    { title: "مشكلة في الدفع", icon: <CreditCard className="h-5 w-5" />, color: "bg-green-100 text-green-600" },
    { title: "تطبيق لا يعمل", icon: <Smartphone className="h-5 w-5" />, color: "bg-purple-100 text-purple-600" },
    { title: "استرداد المبلغ", icon: <RefreshCw className="h-5 w-5" />, color: "bg-orange-100 text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* Header Section - تصميم ملكي جديد */}
      <div className="royal-bg text-white py-20 relative overflow-hidden">
        {/* خلفية تفاعلية */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img src={logo} alt="PayPass Logo" className="h-24 w-24 object-contain drop-shadow-lg brightness-0 invert" />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-2">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
            مركز العناية الملكية
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
            نحن هنا لخدمتك في أي وقت! فريق دعم متخصص على مدار الساعة مع أحدث التقنيات الذكية
          </p>

          {/* شريط البحث الذكي */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن المساعدة التي تحتاجها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-all duration-300"
              />
              <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-xl hover:scale-110 transition-transform">
                <Search className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          {/* الإحصائيات الحية */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {supportStats.map((stat, index) => (
              <div key={index} className="glass-effect rounded-2xl p-4 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-white/10 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions - إجراءات سريعة */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            <span className="animated-text">إجراءات سريعة</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                className="interactive-card smart-card p-6 text-center cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${action.color}`}>
                  {action.icon}
                </div>
                <h3 className="font-bold text-gray-800">{action.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Services - خدمات الدعم المحسنة */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            خدمات الدعم المتقدمة
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            نقدم لك مجموعة شاملة من خدمات الدعم بأحدث التقنيات الذكية
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportServices.map((service, index) => (
              <div 
                key={service.id} 
                className="card-3d smart-card p-8 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">{service.description}</p>
                
                {/* الميزات */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className="smart-button w-full flex items-center justify-center gap-2">
                  ابدأ الآن
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Methods - طرق التواصل المحسنة */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            طرق التواصل المباشرة
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            اختر الطريقة التي تناسبك للتواصل مع فريق الدعم المتخصص
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div 
                key={index} 
                className="ripple-card smart-card p-8 text-center hover:shadow-2xl transition-all duration-500"
                style={{ animationDelay: method.delay }}
              >
                <div className={`bg-gradient-to-r ${method.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}>
                  {method.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{method.title}</h3>
                <p className="text-lg font-medium text-gray-700 mb-2" dir="ltr">{method.value}</p>
                <p className="text-gray-600 text-sm mb-6">{method.description}</p>
                
                <button className={`bg-gradient-to-r ${method.color} text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg`}>
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Chat Widget - دردشة مباشرة */}
      {isLiveChatOpen && (
        <div className="fixed bottom-4 left-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold">الدردشة المباشرة</span>
            </div>
            <button onClick={() => setIsLiveChatOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            <div className="text-center text-gray-500">
              <Headphones className="h-12 w-12 mx-auto mb-2 text-green-500" />
              <p>مرحباً! كيف يمكننا مساعدتك اليوم؟</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsLiveChatOpen(!isLiveChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Support Promise - وعد الدعم */}
      <div className="py-16 royal-bg text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 glow-text">وعدنا لك</h2>
          <p className="text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            نلتزم بتقديم أفضل خدمة دعم لعملائنا مع ضمان الرضا التام والاستجابة السريعة
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect p-8 rounded-2xl">
              <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                              <h3 className="text-xl font-bold mb-4">دعم متواصل</h3>
              <p className="text-gray-300">
                فريق دعم متاح على مدار الساعة لمساعدتك في أي وقت تحتاج فيه
              </p>
            </div>
            <div className="glass-effect p-8 rounded-2xl">
              <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4">رد فوري</h3>
              <p className="text-gray-300">
                نرد على استفساراتك في أسرع وقت ممكن مع ضمان الجودة
              </p>
            </div>
            <div className="glass-effect p-8 rounded-2xl">
              <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4">رعاية ملكية</h3>
              <p className="text-gray-300">
                نقدم لك رعاية ملكية مع حلول عملية وفعالة لجميع احتياجاتك
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Support; 