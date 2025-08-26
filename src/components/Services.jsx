import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaClock, FaStar, FaCheckCircle } from 'react-icons/fa';

const Services = () => {
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    navigate('/packages');
  };
  
  const services = [
    {
      icon: <FaCar className="text-green-500" />,
      title: 'غسيل خارجي',
      description: 'غسيل شامل للخارج مع تجفيف وتلميع',
      features: ['غسيل الهيكل', 'تنظيف العجلات', 'غسيل الزجاج', 'تجفيف وتلميع']
    },
    {
      icon: <FaShieldAlt className="text-green-500" />,
      title: 'غسيل داخلي',
      description: 'تنظيف شامل للداخل والأسطح',
      features: ['تنظيف المقاعد', 'غسيل الأرضية', 'تعطير داخلي']
    },
    {
      icon: <FaStar className="text-green-500" />,
      title: 'غسيل شامل',
      description: 'غسيل خارجي وداخلي مع خدمات إضافية',
      features: ['غسيل خارجي كامل', 'غسيل داخلي شامل', 'تلميع احترافي', 'تعطير فاخر']
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">خدماتنا المميزة</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0">نقدم مجموعة شاملة من خدمات غسيل السيارات بأعلى جودة</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <div className="text-lg sm:text-xl lg:text-2xl">
                {service.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">{service.description}</p>
              <ul className="space-y-2 sm:space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 text-sm sm:text-base">
                    <FaCheckCircle className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <button 
            onClick={handleBookNow}
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            احجز خدمتك الآن
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services; 