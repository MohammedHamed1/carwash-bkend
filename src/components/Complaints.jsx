import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, AlertTriangle, Star, ThumbsUp, Lightbulb, Heart, Users, Award, TrendingUp, FileText, Image, Video, Calendar, MapPin, Phone, Mail, CheckCircle, Clock, Zap, Shield, Crown, Sparkles, ArrowRight, Plus, X, Filter, Search, Bookmark, Share2, Smartphone, CreditCard, Building, MoreHorizontal } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const Complaints = () => {
  const [formType, setFormType] = useState('complaint');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    title: '',
    description: '',
    attachments: [],
    priority: 'medium',
    anonymous: false
  });

  // إحصائيات حية
  const [liveStats, setLiveStats] = useState({
    totalComplaints: 1247,
    resolvedComplaints: 1189,
    totalSuggestions: 856,
    implementedSuggestions: 234,
    avgResponseTime: '4.2',
    satisfactionRate: '94.7'
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
        totalComplaints: prev.totalComplaints + Math.floor(Math.random() * 2),
        totalSuggestions: prev.totalSuggestions + Math.floor(Math.random() * 2)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      id: 'service-quality',
      name: 'جودة الخدمة',
      icon: <Star className="h-5 w-5" />,
      color: 'from-yellow-500 to-yellow-600',
      count: 156
    },
    {
      id: 'app-issues',
      name: 'مشاكل التطبيق',
      icon: <Smartphone className="h-5 w-5" />,
      color: 'from-blue-500 to-blue-600',
      count: 89
    },
    {
      id: 'payment-problems',
      name: 'مشاكل الدفع',
      icon: <CreditCard className="h-5 w-5" />,
      color: 'from-green-500 to-green-600',
      count: 67
    },
    {
      id: 'staff-behavior',
      name: 'سلوك الموظفين',
      icon: <Users className="h-5 w-5" />,
      color: 'from-purple-500 to-purple-600',
      count: 43
    },
    {
      id: 'facility-issues',
      name: 'مشاكل المنشأة',
      icon: <Building className="h-5 w-5" />,
      color: 'from-red-500 to-red-600',
      count: 34
    },
    {
      id: 'other',
      name: 'أخرى',
      icon: <MoreHorizontal className="h-5 w-5" />,
      color: 'from-gray-500 to-gray-600',
      count: 28
    }
  ];

  const suggestionCategories = [
    {
      id: 'app-improvements',
      name: 'تحسينات التطبيق',
      icon: <Smartphone className="h-5 w-5" />,
      color: 'from-blue-500 to-blue-600',
      reward: '500 ريال'
    },
    {
      id: 'service-enhancements',
      name: 'تحسينات الخدمة',
      icon: <Star className="h-5 w-5" />,
      color: 'from-yellow-500 to-yellow-600',
      reward: '300 ريال'
    },
    {
      id: 'new-features',
      name: 'ميزات جديدة',
      icon: <Plus className="h-5 w-5" />,
      color: 'from-green-500 to-green-600',
      reward: '1000 ريال'
    },
    {
      id: 'customer-experience',
      name: 'تجربة العميل',
      icon: <Heart className="h-5 w-5" />,
      color: 'from-purple-500 to-purple-600',
      reward: '400 ريال'
    }
  ];

  const recentComplaints = [
    {
      id: 1,
      title: 'مشكلة في جودة الغسيل',
      category: 'service-quality',
      status: 'resolved',
      date: '2024-01-15',
      response: 'تم حل المشكلة وتحسين جودة الخدمة'
    },
    {
      id: 2,
      title: 'تطبيق بطيء في الاستجابة',
      category: 'app-issues',
      status: 'in-progress',
      date: '2024-01-14',
      response: 'نعمل على تحسين أداء التطبيق'
    },
    {
      id: 3,
      title: 'مشكلة في عملية الدفع',
      category: 'payment-problems',
      status: 'resolved',
      date: '2024-01-13',
      response: 'تم إصلاح المشكلة وإرجاع المبلغ'
    }
  ];

  const implementedSuggestions = [
    {
      id: 1,
      title: 'إضافة نظام النقاط والمكافآت',
      category: 'new-features',
      implementedDate: '2024-01-10',
      impact: 'زيادة رضا العملاء بنسبة 25%',
      reward: '1000 ريال'
    },
    {
      id: 2,
      title: 'تحسين واجهة التطبيق',
      category: 'app-improvements',
      implementedDate: '2024-01-08',
      impact: 'تحسين سهولة الاستخدام',
      reward: '500 ريال'
    },
    {
      id: 3,
      title: 'إضافة خدمة التوصيل',
      category: 'service-enhancements',
      implementedDate: '2024-01-05',
      impact: 'زيادة المبيعات بنسبة 40%',
      reward: '300 ريال'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال الشكوى/الاقتراح
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        title: '',
        description: '',
        attachments: [],
        priority: 'medium',
        anonymous: false
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'resolved': return 'تم الحل';
      case 'in-progress': return 'قيد المعالجة';
      case 'pending': return 'في الانتظار';
      default: return 'غير محدد';
    }
  };

  return (
    <>
      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
        <PageHeader
          title="الشكاوى والاقتراحات"
          subtitle="صوتك مسموع! نطور خدماتنا بناءً على آرائكم واقتراحاتكم القيمة"
          breadcrumbs={['الرئيسية', 'الشكاوى والاقتراحات']}
        />


      {/* Form Type Selection - اختيار نوع النموذج */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            اختر نوع الرسالة
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            اختر ما تريد إرساله لنا - شكوى أو اقتراح
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className={`card-3d smart-card p-8 cursor-pointer transition-all duration-500 ${
                formType === 'complaint' ? 'ring-2 ring-red-500 scale-105' : ''
              }`}
              onClick={() => setFormType('complaint')}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">شكوى</h3>
                <p className="text-gray-600 mb-6">
                  أخبرنا عن أي مشكلة واجهتها مع خدماتنا وسنقوم بحلها فوراً
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    رد فوري ومضمون
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    متابعة شاملة حتى الحل
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    تعويضات عند الحاجة
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className={`card-3d smart-card p-8 cursor-pointer transition-all duration-500 ${
                formType === 'suggestion' ? 'ring-2 ring-green-500 scale-105' : ''
              }`}
              onClick={() => setFormType('suggestion')}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">اقتراح</h3>
                <p className="text-gray-600 mb-6">
                  شاركنا أفكارك لتحسين خدماتنا واحصل على مكافآت قيمة
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    مكافآت تصل إلى 1000 ريال
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    تطبيق الاقتراحات المميزة
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Crown className="h-4 w-4 text-purple-500" />
                    عضوية VIP للمقترحات المميزة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories - الفئات */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            {formType === 'complaint' ? 'فئات الشكاوى' : 'فئات الاقتراحات'}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            اختر الفئة المناسبة لرسالتك
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(formType === 'complaint' ? categories : suggestionCategories).map((category, index) => (
              <div 
                key={category.id} 
                className={`interactive-card smart-card p-6 cursor-pointer hover:scale-105 transition-all duration-500 ${
                  selectedCategory === category.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    {category.icon}
                  </div>
                  {formType === 'suggestion' && category.reward && (
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {category.reward}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                {formType === 'complaint' ? (
                  <p className="text-gray-600 text-sm">{category.count} شكوى</p>
                ) : (
                  <p className="text-gray-600 text-sm">مكافأة: {category.reward}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Form - نموذج الإرسال */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {submitStatus === 'success' ? (
            <div className="smart-card p-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                تم إرسال {formType === 'complaint' ? 'الشكوى' : 'الاقتراح'} بنجاح!
              </h3>
              <p className="text-gray-600 mb-6">
                رقم المرجع: #{formType === 'complaint' ? 'C' : 'S'}-{Math.floor(Math.random() * 10000)}. 
                سنقوم بالرد عليك في أقرب وقت ممكن.
              </p>
              <button 
                onClick={() => setSubmitStatus(null)}
                className="smart-button"
              >
                إرسال رسالة جديدة
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="smart-card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {formType === 'complaint' ? 'إرسال شكوى' : 'إرسال اقتراح'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الفئة</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">اختر الفئة</option>
                    {(formType === 'complaint' ? categories : suggestionCategories).map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">العنوان</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={`عنوان ${formType === 'complaint' ? 'الشكوى' : 'الاقتراح'}`}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">الوصف التفصيلي</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={`اشرح ${formType === 'complaint' ? 'المشكلة' : 'الاقتراح'} بالتفصيل...`}
                />
              </div>
              
              {formType === 'complaint' && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">أولوية المشكلة</label>
                  <div className="flex gap-4">
                    {['low', 'medium', 'high'].map(priority => (
                      <label key={priority} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 mr-2 ${
                          formData.priority === priority 
                            ? 'border-orange-500 bg-orange-500' 
                            : 'border-gray-300'
                        }`}></div>
                        <span className="text-gray-700 capitalize">
                          {priority === 'low' ? 'منخفضة' : priority === 'medium' ? 'متوسطة' : 'عالية'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="mr-2 text-gray-700">إرسال بشكل مجهول</span>
                </label>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">إرفاق ملفات (اختياري)</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  accept="image/*,.pdf,.txt,.mp4"
                />
                <p className="text-sm text-gray-500 mt-2">
                  يمكنك إرفاق صور أو فيديوهات أو ملفات PDF
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
                    إرسال {formType === 'complaint' ? 'الشكوى' : 'الاقتراح'}
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Recent Activity - النشاطات الأخيرة */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            النشاطات الأخيرة
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            تابع آخر الشكاوى والاقتراحات وحالة معالجتها
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Complaints */}
            <div className="smart-card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                آخر الشكاوى
              </h3>
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{complaint.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {getStatusText(complaint.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{complaint.response}</p>
                    <p className="text-gray-500 text-xs">{complaint.date}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Implemented Suggestions */}
            <div className="smart-card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                الاقتراحات المطبقة
              </h3>
              <div className="space-y-4">
                {implementedSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{suggestion.title}</h4>
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {suggestion.reward}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{suggestion.impact}</p>
                    <p className="text-gray-500 text-xs">تم التطبيق: {suggestion.implementedDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Promise - وعد المجتمع */}
      <div className="py-16 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">وعدنا للمجتمع</h2>
          <p className="text-xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            نلتزم ببناء مجتمع قوي من خلال الاستماع لآرائكم وتطوير خدماتنا بناءً على احتياجاتكم
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Heart className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">صوتك مسموع</h3>
              <p className="text-green-100">
                نستمع لكل رأي ونأخذ به في تطوير خدماتنا
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">استجابة سريعة</h3>
              <p className="text-green-100">
                نرد على جميع الرسائل في أقرب وقت ممكن
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Award className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-4 text-white">مكافآت قيمة</h3>
              <p className="text-green-100">
                نكافئ الاقتراحات المميزة بمكافآت تصل إلى 1000 ريال
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* احذف السطر: <Footer /> */}
    </div>
    </>
  );
};

export default Complaints; 