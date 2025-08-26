import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Star, 
  Send, 
  Heart,
  Award,
  Users,
  CheckCircle
} from 'lucide-react';

const ShareExperience = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      setIsSubmitted(true);
      // هنا يمكن إرسال البيانات للخادم
      setTimeout(() => {
        setRating(0);
        setComment('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const features = [
    {
      icon: Heart,
      title: 'تجربة استثنائية',
      description: 'شارك تجربتك الفريدة معنا'
    },
    {
      icon: Award,
      title: 'جوائز قيمة',
      description: 'احصل على مكافآت مجانية'
    },
    {
      icon: Users,
      title: 'مجتمع متعاون',
      description: 'ساعد الآخرين في الاختيار'
    },
    {
      icon: CheckCircle,
      title: 'تحسين مستمر',
      description: 'نساعدنا في تطوير الخدمة'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-green-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
            شارك تجربتك واكسب
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            أخبرنا عن تجربتك مع خدمة غسيل السيارات واحصل على مكافآت قيمة
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* الميزات */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4 space-x-reverse"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" style={{ fill: 'white' }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* نموذج التقييم */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold mb-4 text-center text-gray-800">
                    كيف تقيم تجربتك؟
                  </label>
                  <div className="flex justify-center space-x-2 space-x-reverse">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`w-12 h-12 rounded-full transition-all duration-200 ${
                          star <= rating
                            ? 'bg-yellow-400 text-yellow-900'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        <Star className="w-6 h-6 mx-auto" style={{ fill: star <= rating ? 'white' : 'white' }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-800">
                    اكتب تجربتك
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="أخبرنا عن تجربتك مع خدمة غسيل السيارات..."
                    className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={rating === 0 || !comment.trim()}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Send className="w-5 h-5" style={{ fill: 'white' }} />
                  <span>إرسال التقييم</span>
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" style={{ fill: 'white' }} />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">شكراً لك!</h3>
                <p className="text-gray-600">
                  تم إرسال تقييمك بنجاح. سنراجع تعليقك ونوافيك بالمكافآت قريباً.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* إحصائيات التقييمات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-800">+10K</div>
            <div className="text-gray-600">تقييم إيجابي</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-800">4.8</div>
            <div className="text-gray-600">متوسط التقييم</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-800">+5K</div>
            <div className="text-gray-600">مكافأة مقدمة</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-800">98%</div>
            <div className="text-gray-600">عملاء راضون</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShareExperience; 