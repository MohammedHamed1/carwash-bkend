import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaCar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carType: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'الهاتف',
      value: '+966 50 123 4567',
              subtitle: 'خدمة عملاء',
      color: 'from-blue-500 to-blue-600',
      action: 'tel:+966501234567'
    },
    {
      icon: FaEnvelope,
      title: 'البريد الإلكتروني',
      value: 'info@carwash.com',
      subtitle: 'رد خلال ساعتين',
      color: 'from-green-500 to-green-600',
      action: 'mailto:info@carwash.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
      subtitle: '4 فروع في الرياض',
      color: 'from-purple-500 to-purple-600',
      action: '#'
    },
    {
      icon: FaClock,
      title: 'ساعات العمل',
      value: 'السبت - الخميس',
      subtitle: '7:00 ص - 11:00 م',
      color: 'from-orange-500 to-orange-600',
      action: '#'
    }
  ];

  const branches = [
    {
      name: 'فرع الشمال',
      address: 'شارع الملك فهد، حي الشمال',
      phone: '+966 50 123 4567',
      hours: '7:00 ص - 11:00 م'
    },
    {
      name: 'فرع الجنوب',
      address: 'شارع الملك عبدالله، حي الجنوب',
      phone: '+966 50 123 4568',
      hours: '7:00 ص - 11:00 م'
    },
    {
      name: 'فرع الشرق',
      address: 'شارع الملك خالد، حي الشرق',
      phone: '+966 50 123 4569',
      hours: '7:00 ص - 11:00 م'
    },
    {
      name: 'فرع الغرب',
      address: 'شارع الملك سلمان، حي الغرب',
      phone: '+966 50 123 4570',
      hours: '7:00 ص - 11:00 م'
    }
  ];

  const services = [
    { value: 'basic', label: 'غسيل أساسي' },
    { value: 'advanced', label: 'غسيل متقدم' },
    { value: 'premium', label: 'غسيل مميز' },
    { value: 'vip', label: 'خدمة VIP' },
    { value: 'other', label: 'خدمات أخرى' }
  ];

  const carTypes = [
    { value: 'small', label: '🚗 سيارة صغيرة' },
    { value: 'suv', label: '🚙 SUV' },
    { value: 'truck', label: '🚛 شاحنة' },
    { value: 'luxury', label: '🏎️ فاخرة' },
    { value: 'other', label: '🚐 أخرى' }
  ];

  const socialMedia = [
    { icon: FaWhatsapp, name: 'WhatsApp', url: 'https://wa.me/966501234567', color: 'from-green-500 to-green-600' },
    { icon: FaTwitter, name: 'Twitter', url: '#', color: 'from-blue-400 to-blue-500' },
    { icon: FaFacebook, name: 'Facebook', url: '#', color: 'from-blue-600 to-blue-700' },
    { icon: FaInstagram, name: 'Instagram', url: '#', color: 'from-pink-500 to-purple-600' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    }
    
    if (!formData.service) {
      newErrors.service = 'نوع الخدمة مطلوب';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'الرسالة مطلوبة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
        phone: '',
        carType: '',
        service: '',
      message: ''
    });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <>
      <Helmet>
                        <title>اتصل بنا - شركة غسيل السيارات في الرياض | خدمة عملاء</title>
                        <meta name="description" content="تواصل معنا للحصول على أفضل خدمات غسيل السيارات في الرياض. خدمة عملاء، 1 فرع في الرياض، احجز الآن!" />
                        <meta name="keywords" content="اتصل بنا, غسيل سيارات الرياض, خدمة عملاء, فروع غسيل سيارات, احجز غسيل سيارات" />
        <meta property="og:title" content="اتصل بنا - شركة غسيل السيارات في الرياض" />
        <meta property="og:description" content="تواصل معنا للحصول على أفضل خدمات غسيل السيارات في الرياض" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <div className="header-spacer"></div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <PageHeader 
          title="اتصل بنا"
          subtitle="نحن هنا لمساعدتك في كل ما تحتاجه"
          breadcrumbs={['الرئيسية', 'اتصل بنا']}
        />

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                نحن هنا
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"> لمساعدتك</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                فريقنا متاح دائماً للإجابة على استفساراتك وتقديم الدعم الذي تحتاجه. 
                لا تتردد في التواصل معنا بأي طريقة تفضلها.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            >
            {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <info.icon className="w-8 h-8" />
                </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
                  <p className="text-gray-600 mb-2 font-semibold">{info.value}</p>
                  <p className="text-gray-500 text-sm">{info.subtitle}</p>
                  {info.action && (
                    <a 
                      href={info.action}
                      className="inline-block mt-4 text-green-600 hover:text-green-700 font-semibold transition-colors duration-300"
                    >
                      تواصل الآن
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Branches */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">أرسل لنا رسالة</h2>
                  <p className="text-gray-600">سنرد عليك في أقرب وقت ممكن</p>
                </div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6"
                  >
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="font-bold text-green-800">تم إرسال الرسالة بنجاح!</h3>
                        <p className="text-green-700">سنرد عليك في أقرب وقت ممكن</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="أدخل اسمك الكامل"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <FaTimesCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+966 50 123 4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <FaTimesCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaTimesCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">نوع السيارة</label>
                      <select
                        name="carType"
                        value={formData.carType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                      >
                        <option value="">اختر نوع السيارة</option>
                        {carTypes.map((car) => (
                          <option key={car.value} value={car.value}>
                            {car.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">نوع الخدمة *</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                          errors.service ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">اختر نوع الخدمة</option>
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <FaTimesCircle className="w-4 h-4" />
                          {errors.service}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">الرسالة *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="اكتب رسالتك هنا..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaTimesCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  </button>
                </form>
              </motion.div>

              {/* Branches */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">فروعنا في الرياض</h2>
                  <p className="text-gray-600">4 فروع منتشرة في جميع أنحاء الرياض</p>
                </div>

                <div className="space-y-6">
                  {branches.map((branch, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                          <FaMapMarkerAlt className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{branch.name}</h3>
                          <p className="text-gray-600 mb-2">{branch.address}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaPhone className="w-4 h-4" />
                              {branch.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock className="w-4 h-4" />
                              {branch.hours}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">تواصل معنا على وسائل التواصل الاجتماعي</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                تابعنا للحصول على آخر العروض والتحديثات
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${social.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <social.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    {social.name}
                    </h3>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact; 