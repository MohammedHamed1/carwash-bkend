import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaClock, FaStar, FaTools, FaLeaf, FaPhone, FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react';
import WhyUs from './WhyUs';

const ServicesPage = () => {
  const [openFaq, setOpenFaq] = React.useState(null);

  const services = [
    {
      id: 1,
      icon: <FaCar className="text-4xl text-blue-600" />,
      title: "غسيل خارجي",
      description: "غسيل شامل للسيارة من الخارج مع تجفيف احترافي",
      price: "25 ريال",
      features: ["غسيل بالصابون", "تجفيف بالمناشف", "تنظيف الإطارات", "تنظيف الزجاج"]
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-4xl text-green-600" />,
      title: "غسيل داخلي وخارجي",
      description: "غسيل شامل للسيارة من الداخل والخارج مع تعطير",
      price: "45 ريال",
      features: ["غسيل خارجي كامل", "تنظيف المقاعد", "تعطير داخلي", "تنظيف لوحة التحكم"]
    },
    {
      id: 3,
      icon: <FaClock className="text-4xl text-purple-600" />,
      title: "غسيل سريع",
      description: "غسيل سريع للسيارة في أقل من 15 دقيقة",
      price: "15 ريال",
      features: ["غسيل سريع", "تجفيف سريع", "خدمة فورية", "لا حجز مسبق"]
    },
    {
      id: 4,
      icon: <FaStar className="text-4xl text-yellow-600" />,
      title: "غسيل فاخر",
      description: "غسيل فاخر شامل مع شمع وتلميع احترافي",
      price: "80 ريال",
      features: ["غسيل شامل", "شمع احترافي", "تلميع الزجاج", "حماية الطلاء"]
    },
    {
      id: 5,
      icon: <FaTools className="text-4xl text-red-600" />,
      title: "صيانة وتلميع",
      description: "خدمات صيانة وتلميع احترافية للسيارة",
      price: "60 ريال",
      features: ["تلميع الطلاء", "صيانة الإطارات", "فحص عام", "تلميع الإكسسوارات"]
    },
    {
      id: 6,
      icon: <FaLeaf className="text-4xl text-emerald-600" />,
      title: "غسيل صديق للبيئة",
      description: "غسيل باستخدام مواد صديقة للبيئة",
      price: "35 ريال",
      features: ["مواد طبيعية", "توفير المياه", "حماية البيئة", "خالي من المواد الكيميائية"]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      rating: 5,
      comment: "أفضل خدمة غسيل سيارات جربتها! الفريق محترف والنتيجة ممتازة.",
      car: "تويوتا كامري"
    },
    {
      id: 2,
      name: "فاطمة علي",
      rating: 5,
      comment: "خدمة سريعة ونظيفة. أنصح الجميع بتجربة خدماتهم.",
      car: "هيونداي أكسنت"
    },
    {
      id: 3,
      name: "خالد عبدالله",
      rating: 5,
      comment: "أسعار معقولة وجودة عالية. سأعود مرة أخرى بالتأكيد.",
      car: "نيسان صني"
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "كم تستغرق عملية الغسيل؟",
      answer: "يختلف الوقت حسب نوع الخدمة. الغسيل السريع يستغرق 15 دقيقة، والغسيل الشامل يستغرق 30-45 دقيقة."
    },
    {
      id: 2,
      question: "هل يمكن الحجز عبر الإنترنت؟",
      answer: "نعم، يمكنك الحجز عبر موقعنا الإلكتروني أو تطبيق الهاتف المحمول بسهولة."
    },
    {
      id: 3,
      question: "ما هي أوقات العمل؟",
      answer: "نعمل من الأحد إلى الخميس من 8 صباحاً إلى 10 مساءً، والجمعة والسبت من 9 صباحاً إلى 11 مساءً."
    },
    {
      id: 4,
      question: "هل تقدمون خدمات التوصيل؟",
      answer: "نعم، نقدم خدمة غسيل السيارات في المنزل أو المكتب في المناطق المجاورة."
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <>
      <WhyUs />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                خدمات غسيل السيارات
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                نقدم مجموعة شاملة من خدمات غسيل السيارات الاحترافية لتلبية جميع احتياجاتك
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                خدماتنا المميزة
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                اختر من بين مجموعة متنوعة من خدمات الغسيل المناسبة لسيارتك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
                >
                  {/* Service Icon */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <div className="text-3xl font-bold text-blue-600 mb-6">
                      {service.price}
                    </div>
                  </div>

                  {/* Service Features */}
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Book Now Button */}
                    <Link
                      to={`/package/${service.id}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold text-center block hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                    >
                      احجز الآن
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                آراء عملائنا
              </h2>
              <p className="text-xl text-gray-600">
                اكتشف ما يقوله عملاؤنا عن خدماتنا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.car}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                الأسئلة الشائعة
              </h2>
              <p className="text-xl text-gray-600">
                إجابات على أكثر الأسئلة شيوعاً
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl mb-4 border border-gray-200">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    {openFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                تواصل معنا
              </h2>
              <p className="text-xl text-gray-600">
                نحن هنا لمساعدتك في أي استفسار
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="text-blue-600 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">اتصل بنا</h3>
                <p className="text-gray-600" dir="ltr">+966 50 123 4567</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaWhatsapp className="text-green-600 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">واتساب</h3>
                <p className="text-gray-600" dir="ltr">+966 50 123 4567</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-purple-600 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@carwash.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              احصل على خصم 20% على أول حجز
            </h2>
            <p className="text-xl mb-8 text-white opacity-90">
              استخدم كود الخصم: WELCOME20
            </p>
            <Link
              to="/packages"
              className="bg-white text-blue-600 py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-block"
            >
              تصفح جميع الباقات
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage; 