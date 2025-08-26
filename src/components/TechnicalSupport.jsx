import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, Clock, CheckCircle, XCircle, AlertTriangle, Wifi, Settings, Smartphone, Laptop, Tablet, Car, CreditCard, Shield, Zap, Star, Users, Headphones, Video, FileText, Send, ArrowRight, CheckSquare, Square, AlertCircle, Info, Calendar, MapPin, RefreshCw, Bell } from 'lucide-react';

const TechnicalSupport = () => {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [ticketPriority, setTicketPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    issue: '',
    description: '',
    attachments: []
  });

  // إحصائيات حية
  const [liveStats, setLiveStats] = useState({
    activeTickets: 47,
    avgResolutionTime: '2.3',
    satisfactionRate: '96.8',
    onlineTechnicians: 8
  });

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // محاكاة تحديث الإحصائيات في الوقت الفعلي
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeTickets: prev.activeTickets + Math.floor(Math.random() * 3) - 1,
        onlineTechnicians: prev.onlineTechnicians + Math.floor(Math.random() * 2) - 1
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const technicalIssues = [
    {
      id: 'app-login',
      title: 'مشاكل تسجيل الدخول',
      description: 'لا يمكن تسجيل الدخول للتطبيق',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'from-red-500 to-red-600',
      common: true
    },
    {
      id: 'payment-error',
      title: 'أخطاء في الدفع',
      description: 'مشاكل في عملية الدفع أو الفواتير',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600',
      common: true
    },
    {
      id: 'app-crash',
      title: 'تطبيق لا يعمل',
      description: 'التطبيق يتوقف أو لا يستجيب',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'from-yellow-500 to-yellow-600',
      common: true
    },
    {
      id: 'booking-issue',
      title: 'مشاكل في الحجز',
      description: 'لا يمكن حجز موعد أو تعديل الحجز',
      icon: <Calendar className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      common: false
    },
    {
      id: 'notification',
      title: 'مشاكل الإشعارات',
      description: 'لا تصل الإشعارات أو تحديثات الحالة',
      icon: <Bell className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      common: false
    },
    {
      id: 'location',
      title: 'مشاكل تحديد الموقع',
      description: 'لا يمكن تحديد موقع الفرع أو المسار',
      icon: <MapPin className="h-6 w-6" />,
      color: 'from-green-500 to-green-600',
      common: false
    }
  ];

  const supportChannels = [
    {
      icon: <Video className="h-8 w-8" />,
      title: 'دردشة فيديو مباشرة',
      description: 'تواصل مع فني متخصص عبر الفيديو',
      availability: 'متاح الآن',
      responseTime: 'فوري',
      color: 'from-green-500 to-green-600',
      featured: true
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'الدردشة النصية',
      description: 'دردشة فورية مع فريق الدعم الفني',
      availability: 'متاح الآن',
      responseTime: '< 2 دقيقة',
      color: 'from-green-500 to-green-600',
      featured: true
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'مكالمة صوتية',
      description: 'اتصال مباشر مع فني متخصص',
      availability: 'متاح الآن',
      responseTime: '< 5 دقائق',
      color: 'from-green-500 to-green-600',
      featured: false
    },
    {
      icon: <Mail className="h-8 w-8" />,
              title: 'تذكرة خدمة عملاء',
      description: 'إرسال تذكرة مع متابعة شاملة',
              availability: '7-11',
              responseTime: '< 2 ساعة',
      color: 'from-green-500 to-green-600',
      featured: false
    }
  ];

  const selfHelpTools = [
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'التشخيص الذاتي',
      description: 'اكتشف وحل المشاكل بنفسك',
      color: 'bg-green-100 text-green-600',
      action: 'ابدأ التشخيص'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'دليل استكشاف الأخطاء',
      description: 'دليل شامل لحل المشاكل الشائعة',
      color: 'bg-green-100 text-green-600',
      action: 'تصفح الدليل'
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: 'فيديوهات تعليمية',
      description: 'فيديوهات لحل المشاكل خطوة بخطوة',
      color: 'bg-green-100 text-green-600',
      action: 'شاهد الفيديوهات'
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: 'إعادة تشغيل التطبيق',
      description: 'حل سريع لمعظم المشاكل',
      color: 'bg-green-100 text-green-600',
      action: 'إعادة تشغيل'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال التذكرة
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        device: '',
        issue: '',
        description: '',
        attachments: []
      });
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* Header Section - تصميم تقني متقدم */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white py-20 relative overflow-hidden">
        {/* خلفية تفاعلية */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-700/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Settings className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-2">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            الدعم الفني المتقدم
          </h1>
          
          <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-8">
            فريق خدمة عملاء متخصص لحل جميع المشاكل بسرعة وكفاءة عالية
          </p>

          {/* الإحصائيات الحية */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{liveStats.activeTickets}</div>
              <div className="text-sm text-gray-300">تذكرة نشطة</div>
            </div>
            <div className="glass-effect rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{liveStats.avgResolutionTime}h</div>
              <div className="text-sm text-gray-300">متوسط الحل</div>
            </div>
            <div className="glass-effect rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{liveStats.satisfactionRate}%</div>
              <div className="text-sm text-gray-300">رضا العملاء</div>
            </div>
            <div className="glass-effect rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold mb-1">{liveStats.onlineTechnicians}</div>
              <div className="text-sm text-gray-300">فني متصل</div>
            </div>
          </div>
        </div>
      </div>

      {/* Self Help Tools - أدوات المساعدة الذاتية */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            حل المشاكل بنفسك
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            جرب هذه الحلول السريعة قبل التواصل مع الدعم الفني
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selfHelpTools.map((tool, index) => (
              <div 
                key={index} 
                className="interactive-card smart-card p-6 text-center cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${tool.color}`}>
                  {tool.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <button className="smart-button w-full text-sm">
                  {tool.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Issues - المشاكل الشائعة */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            المشاكل التقنية الشائعة
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            اختر نوع المشكلة التي تواجهها للحصول على حل سريع
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalIssues.map((issue, index) => (
              <div 
                key={issue.id} 
                className={`card-3d smart-card p-6 cursor-pointer hover:scale-105 transition-all duration-500 ${
                  selectedIssue === issue.id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedIssue(issue.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${issue.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    {issue.icon}
                  </div>
                  {issue.common && (
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      شائع
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{issue.title}</h3>
                <p className="text-gray-600 text-sm">{issue.description}</p>
                
                {selectedIssue === issue.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="smart-button w-full text-sm">
                      احصل على حل فوري
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Channels - قنوات الدعم */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            قنوات الدعم الفني
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            اختر الطريقة المناسبة لك للتواصل مع فريق الدعم الفني
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {supportChannels.map((channel, index) => (
              <div 
                key={index} 
                className={`ripple-card smart-card p-8 hover:shadow-2xl transition-all duration-500 ${
                  channel.featured ? 'ring-2 ring-purple-500' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`bg-gradient-to-r ${channel.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    {channel.icon}
                  </div>
                  {channel.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      مميز
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">الحالة:</span>
                    <span className="text-green-600 font-medium">{channel.availability}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">وقت الاستجابة:</span>
                    <span className="text-blue-600 font-medium">{channel.responseTime}</span>
                  </div>
                </div>
                
                <button className={`bg-gradient-to-r ${channel.color} text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg w-full`}>
                  ابدأ الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Support Form - نموذج الدعم الفني */}
      <div className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            إرسال تذكرة خدمة عملاء
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            املأ النموذج أدناه وسيقوم فريق الدعم الفني بالرد عليك في أقرب وقت ممكن
          </p>
          
          {submitStatus === 'success' ? (
            <div className="smart-card p-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">تم إرسال التذكرة بنجاح!</h3>
              <p className="text-gray-600 mb-6">
                رقم التذكرة: #TS-{Math.floor(Math.random() * 10000)}. سنقوم بالرد عليك في أقرب وقت ممكن.
              </p>
              <button 
                onClick={() => setSubmitStatus(null)}
                className="smart-button"
              >
                إرسال تذكرة جديدة
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="smart-card p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">نوع الجهاز</label>
                  <select
                    name="device"
                    value={formData.device}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">اختر نوع الجهاز</option>
                    <option value="android">Android</option>
                    <option value="ios">iOS</option>
                    <option value="web">Web Browser</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">نوع المشكلة</label>
                <select
                  name="issue"
                  value={formData.issue}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">اختر نوع المشكلة</option>
                  {technicalIssues.map(issue => (
                    <option key={issue.id} value={issue.id}>{issue.title}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">أولوية المشكلة</label>
                <div className="flex gap-4">
                  {['low', 'medium', 'high'].map(priority => (
                    <label key={priority} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={ticketPriority === priority}
                        onChange={(e) => setTicketPriority(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 ${
                        ticketPriority === priority 
                          ? 'border-green-500 bg-green-500' 
                          : 'border-gray-300'
                      }`}></div>
                      <span className="text-gray-700 capitalize">
                        {priority === 'low' ? 'منخفضة' : priority === 'medium' ? 'متوسطة' : 'عالية'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">وصف المشكلة</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="اشرح المشكلة بالتفصيل..."
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">إرفاق ملفات (اختياري)</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  accept="image/*,.pdf,.txt"
                />
                <p className="text-sm text-gray-500 mt-2">
                  يمكنك إرفاق صور للمشكلة أو ملفات PDF أو نصية
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="smart-button w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    إرسال التذكرة
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Support Promise - وعد الدعم الفني */}
      <div className="py-16 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">وعد الدعم الفني</h2>
          <p className="text-xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            نلتزم بتقديم أفضل خدمة عملاء مع ضمان الحل السريع والفعال
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">استجابة سريعة</h3>
              <p className="text-green-100">
                نرد على جميع التذاكر خلال ساعات قليلة
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Shield className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">حلول مضمونة</h3>
              <p className="text-green-100">
                نضمن حل جميع المشاكل التقنية بفعالية
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Users className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">فريق متخصص</h3>
              <p className="text-green-100">
                فريق خدمة عملاء محترف ومتخصص
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TechnicalSupport; 