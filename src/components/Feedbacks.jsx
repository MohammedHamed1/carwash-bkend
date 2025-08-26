import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../api';
import { Star, Quote, Heart, Sparkles, Users, Award } from 'lucide-react';

const demoFeedbacks = [
  {
    userName: 'محمد العتيبي',
    comment: 'خدمة ممتازة وسريعة، أنصح الجميع بالتجربة!',
    rating: 5,
    date: 'منذ يومين',
    location: 'الرياض',
    avatar: '👨‍💼'
  },
  {
    userName: 'سارة الزهراني',
    comment: 'الموظفون محترفون والمكان نظيف جداً. تجربة رائعة!',
    rating: 4,
    date: 'منذ 3 أيام',
    location: 'الرياض',
    avatar: '👩‍💼'
  },
  {
    userName: 'خالد الدوسري',
    comment: 'تجربة رائعة وسأعود مرة أخرى بالتأكيد. الجودة ممتازة!',
    rating: 5,
    date: 'منذ أسبوع',
    location: 'الرياض',
    avatar: '👨‍💻'
  },
  {
    userName: 'نورة المطيري',
    comment: 'الخدمة جيدة لكن الانتظار كان طويلاً قليلاً. عموماً راضية.',
    rating: 3,
    date: 'منذ 5 أيام',
    location: 'الرياض',
    avatar: '👩‍🎓'
  },
  {
    userName: 'عبدالله الشهري',
    comment: 'أفضل مغسلة سيارات جربتها في الرياض! أنصح الجميع.',
    rating: 5,
    date: 'منذ يوم',
    location: 'الرياض',
    avatar: '👨‍🚀'
  },
  {
    userName: 'ريم الحربي',
    comment: 'الأسعار مناسبة والجودة عالية. سأعود مرة أخرى!',
    rating: 4,
    date: 'منذ 4 أيام',
    location: 'الرياض',
    avatar: '👩‍⚕️'
  },
];

const FeedbackCard = ({ feedback, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`group bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      {/* خلفية زخرفية */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-all duration-500"></div>
      
      {/* أيقونة الاقتباس */}
      <div className="absolute top-4 left-4 text-green-200 group-hover:text-green-300 transition-colors duration-300">
                        <Quote className="w-8 h-8" style={{ fill: 'white' }} />
      </div>
      
      <div className="relative z-10">
        {/* رأس البطاقة */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            {feedback.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
              {feedback.userName}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{feedback.location}</span>
              <span>•</span>
              <span>{feedback.date}</span>
            </div>
          </div>
        </div>
        
        {/* التقييم */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
                                      style={{ fill: i < feedback.rating ? 'white' : 'white' }}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({feedback.rating}/5)</span>
        </div>
        
        {/* التعليق */}
        <div className="text-gray-700 text-base leading-relaxed mb-4 group-hover:text-gray-800 transition-colors duration-300">
          "{feedback.comment}"
        </div>
        
        {/* شارة التوصية */}
        {feedback.rating >= 4 && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm font-semibold border border-green-200">
            <Heart className="w-4 h-4" />
            يوصي بهذا المكان
          </div>
        )}
      </div>
    </div>
  );
};

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    getFeedbacks()
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setFeedbacks(res.data);
        } else {
          setFeedbacks(demoFeedbacks);
        }
      })
      .catch(() => setFeedbacks(demoFeedbacks));
  }, []);

  const averageRating = feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length;
  const totalReviews = feedbacks.length;
  const recommendedCount = feedbacks.filter(fb => fb.rating >= 4).length;

  return (
    <section id="feedbacks" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-green-50 to-emerald-50 overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-200/20 to-transparent rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" style={{ fill: 'white' }} />
            آراء العملاء
            <Sparkles className="w-4 h-4" style={{ fill: 'white' }} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            ماذا يقول عملاؤنا؟
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            استمع إلى تجارب وآراء عملائنا حول خدماتنا المميزة
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-8 h-8" style={{ fill: 'white' }} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
            <div className="text-gray-600">متوسط التقييم</div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8" style={{ fill: 'white' }} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">+{totalReviews}</div>
            <div className="text-gray-600">تقييم إجمالي</div>
              </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-8 h-8" style={{ fill: 'white' }} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">+{recommendedCount}</div>
            <div className="text-gray-600">يوصون بنا</div>
          </div>
        </div>

        {/* بطاقات التقييمات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {feedbacks.map((feedback, index) => (
            <FeedbackCard key={feedback._id || index} feedback={feedback} index={index} />
          ))}
        </div>

        {/* دعوة للعمل */}
        <div className={`text-center mt-12 sm:mt-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              شاركنا تجربتك!
            </h3>
            <p className="text-gray-600 mb-6">
              ساعد الآخرين في اتخاذ القرار الصحيح من خلال مشاركة تجربتك معنا
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Star className="w-5 h-5" style={{ fill: 'white' }} />
              اكتب تقييمك
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedbacks; 