import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaStar, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaShieldAlt, FaUsers, FaThumbsUp, FaLightbulb, FaHeadset } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';

const Complaints = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'complaint',
    subject: '',
    message: '',
    priority: 'medium'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال الشكوى
    alert('تم إرسال الشكوى بنجاح!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      complaintType: '',
      description: ''
    });
  };

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Page Header مع تأثيرات حركية */}
      <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <PageHeader 
          title="الشكاوى والاقتراحات"
          subtitle="نحن نستمع إليك ونعمل على تحسين خدماتنا باستمرار"
          breadcrumbs={['الرئيسية', 'الشكاوى والاقتراحات']}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* قسم الترحيب */}
          <div className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
              <div 
                className="mb-6 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => handleItemClick('نحن نستمع إليك')}
                onMouseEnter={() => setHoveredItem('welcome-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaHeadset className={`text-5xl mx-auto mb-4 text-green-600 transition-all duration-300 ${
                  hoveredItem === 'welcome-title' ? 'scale-110 animate-bounce' : ''
                }`} />
                <h2 className={`text-3xl font-bold mb-4 text-gray-800 transition-all duration-300 ${
                  hoveredItem === 'welcome-title' ? 'text-green-600 scale-105' : ''
                }`}>
                  نحن نستمع إليك
                </h2>
              </div>
              <p className="text-xl text-gray-800 mb-6">
                نعتبر ملاحظاتكم واقتراحاتكم جزءاً أساسياً من تطوير خدماتنا. 
                نضمن الرد على جميع الرسائل في أقرب وقت ممكن.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div 
                  className={`bg-gray-50 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'response-time' ? 'bg-green-100 scale-105' : ''
                  } ${clickedItem === 'وقت الاستجابة' ? 'bg-green-200 shadow-green-300' : ''}`}
                  onClick={() => handleItemClick('وقت الاستجابة')}
                  onMouseEnter={() => setHoveredItem('response-time')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaClock className="text-2xl mx-auto mb-2 text-green-600" />
                  <p className="font-bold text-gray-800" style={{fontWeight: 'bold'}}>رد سريع ومضمون</p>
                </div>
                <div 
                  className={`bg-gray-50 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'confidential' ? 'bg-green-100 scale-105' : ''
                  } ${clickedItem === 'سرية المعلومات' ? 'bg-green-200 shadow-green-300' : ''}`}
                  onClick={() => handleItemClick('سرية المعلومات')}
                  onMouseEnter={() => setHoveredItem('confidential')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaShieldAlt className="text-2xl mx-auto mb-2 text-green-600" />
                  <p className="font-bold text-gray-800" style={{fontWeight: 'bold'}}>سرية تامة</p>
                </div>
                <div 
                  className={`bg-gray-50 p-4 rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'follow-up' ? 'bg-green-100 scale-105' : ''
                  } ${clickedItem === 'متابعة الحل' ? 'bg-green-200 shadow-green-300' : ''}`}
                  onClick={() => handleItemClick('متابعة الحل')}
                  onMouseEnter={() => setHoveredItem('follow-up')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <FaCheckCircle className="text-2xl mx-auto mb-2 text-green-600" />
                  <p className="font-bold text-gray-800" style={{fontWeight: 'bold'}}>متابعة الحل</p>
                </div>
              </div>
            </div>
          </div>

          {/* نموذج الشكاوى والاقتراحات */}
          <div className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h2 
                  className={`text-3xl font-bold mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                    hoveredItem === 'form-title' ? 'text-green-600' : 'text-gray-800'
                  }`}
                  onClick={() => handleItemClick('أرسل شكواك أو اقتراحك')}
                  onMouseEnter={() => setHoveredItem('form-title')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  أرسل شكواك أو اقتراحك
                </h2>
                <p className="text-gray-600">نحن هنا لمساعدتك وحل أي مشكلة تواجهها</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">الاسم الكامل *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300"
                      placeholder="أدخل رقم هاتفك"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">نوع الرسالة *</label>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300"
                    >
                      <option value="complaint">شكوى</option>
                      <option value="suggestion">اقتراح</option>
                      <option value="inquiry">استفسار</option>
                      <option value="feedback">تقييم</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الموضوع *</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition-all duration-300"
                    placeholder="أدخل موضوع الرسالة"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">أولوية الرسالة</label>
                  <div className="flex gap-4">
                    {['low', 'medium', 'high'].map((priority) => (
                      <label 
                        key={priority}
                        className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border-2 transition-all duration-300 ${
                          formData.priority === priority 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={handleInputChange}
                          className="text-green-500"
                        />
                        <span className="capitalize">
                          {priority === 'low' ? 'منخفضة' : priority === 'medium' ? 'متوسطة' : 'عالية'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الرسالة *</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none hover:border-green-300 transition-all duration-300"
                    placeholder="اكتب تفاصيل شكواك أو اقتراحك هنا..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
                    clickedItem === 'إرسال الشكوى/الاقتراح' ? 'scale-95 bg-green-700' : ''
                  }`}
                  onClick={() => handleItemClick('إرسال الشكوى/الاقتراح')}
                  onMouseEnter={() => setHoveredItem('submit-button')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaExclamationTriangle className="text-xl" />
                    إرسال الرسالة
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* طرق التواصل الإضافية */}
          <div className={`mb-12 transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 
                className={`text-3xl font-bold mb-4 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'contact-methods-title' ? 'text-green-600' : 'text-gray-800'
                }`}
                onClick={() => handleItemClick('طرق التواصل الإضافية')}
                onMouseEnter={() => setHoveredItem('contact-methods-title')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                طرق التواصل الإضافية
              </h2>
              <p className="text-gray-600">يمكنك التواصل معنا من خلال الطرق التالية</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div 
                className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'phone-contact' ? 'shadow-xl border-green-300' : ''
                }`}
                onClick={() => handleItemClick('اتصل بنا')}
                onMouseEnter={() => setHoveredItem('phone-contact')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'phone-contact' ? 'scale-110 bg-green-600' : ''
                }`}>
                  <FaPhone className="text-white text-2xl" />
                </div>
                <h3 className={`text-xl font-bold mb-2 transition-all duration-300 ${
                  hoveredItem === 'phone-contact' ? 'text-green-600 scale-105' : 'text-gray-800'
                }`}>اتصل بنا</h3>
                <p className="text-gray-600 mb-2">خدمة العملاء متاحة</p>
                <p className="text-green-600 font-bold" dir="ltr">+966 56 890 9183</p>
              </div>

              <div 
                className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'email-contact' ? 'shadow-xl border-green-300' : ''
                }`}
                onClick={() => handleItemClick('راسلنا')}
                onMouseEnter={() => setHoveredItem('email-contact')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'email-contact' ? 'scale-110 bg-green-600' : ''
                }`}>
                  <FaEnvelope className="text-white text-2xl" />
                </div>
                <h3 className={`text-xl font-bold mb-2 transition-all duration-300 ${
                  hoveredItem === 'email-contact' ? 'text-green-600 scale-105' : 'text-gray-800'
                }`}>راسلنا</h3>
                <p className="text-gray-600 mb-2">رد سريع ومضمون</p>
                <p className="text-green-600 font-bold">support@paypasss.com</p>
              </div>

              <div 
                className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'whatsapp-contact' ? 'shadow-xl border-green-300' : ''
                }`}
                onClick={() => handleItemClick('واتساب')}
                onMouseEnter={() => setHoveredItem('whatsapp-contact')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  hoveredItem === 'whatsapp-contact' ? 'scale-110 bg-green-600' : ''
                }`}>
                  <FaWhatsapp className="text-white text-2xl" />
                </div>
                <h3 className={`text-xl font-bold mb-2 transition-all duration-300 ${
                  hoveredItem === 'whatsapp-contact' ? 'text-green-600 scale-105' : 'text-gray-800'
                }`}>واتساب</h3>
                <p className="text-gray-600 mb-2">رد فوري على الرسائل</p>
                <p className="text-green-600 font-bold">احصل على رد فوري</p>
              </div>
            </div>
          </div>

          {/* إحصائيات الشكاوى والاقتراحات */}
          <div className={`transition-all duration-1000 transform ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="grid md:grid-cols-4 gap-6">
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-1' ? 'shadow-xl shadow-green-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الاستجابة')}
                onMouseEnter={() => setHoveredItem('stats-1')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaClock className={`text-4xl mx-auto mb-4 text-green-500 transition-all duration-300 ${
                  hoveredItem === 'stats-1' ? 'scale-110 text-green-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">24</h3>
                <p className="text-gray-600">ساعة وقت الاستجابة</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-2' ? 'shadow-xl shadow-green-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الحل')}
                onMouseEnter={() => setHoveredItem('stats-2')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaCheckCircle className={`text-4xl mx-auto mb-4 text-green-500 transition-all duration-300 ${
                  hoveredItem === 'stats-2' ? 'scale-110 text-green-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">98%</h3>
                <p className="text-gray-600">معدل حل المشاكل</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-3' ? 'shadow-xl shadow-green-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الرضا')}
                onMouseEnter={() => setHoveredItem('stats-3')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaThumbsUp className={`text-4xl mx-auto mb-4 text-green-500 transition-all duration-300 ${
                  hoveredItem === 'stats-3' ? 'scale-110 text-green-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">95%</h3>
                <p className="text-gray-600">رضا العملاء</p>
              </div>
              
              <div 
                className={`text-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                  hoveredItem === 'stats-4' ? 'shadow-xl shadow-green-200' : ''
                }`}
                onClick={() => handleItemClick('إحصائيات الاقتراحات')}
                onMouseEnter={() => setHoveredItem('stats-4')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <FaLightbulb className={`text-4xl mx-auto mb-4 text-green-500 transition-all duration-300 ${
                  hoveredItem === 'stats-4' ? 'scale-110 text-green-600' : ''
                }`} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">+500</h3>
                <p className="text-gray-600">اقتراح مطبق</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complaints; 