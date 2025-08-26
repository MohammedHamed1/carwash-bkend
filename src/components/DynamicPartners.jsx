import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Star, 
  Award, 
  Shield, 
  Users, 
  Heart,
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
  Crown,
  Globe,
  Rocket,
  Lightbulb
} from 'lucide-react';
import miskLogo from '../assets/misk.jpeg';
import alahliLogo from '../assets/alahli.jpeg';
import codLogo from '../assets/cod.jpeg';

const DynamicPartners = () => {
  const strategicPartners = [
    { 
      name: 'مؤسسة محمد بن سلمان (مسك)', 
      logo: miskLogo,
      category: 'مؤسسة خيرية',
      description: 'شريكنا الاستراتيجي في تطوير ريادة الأعمال والابتكار',
      icon: Crown,
      rating: 5,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'البنك الأهلي السعودي', 
      logo: alahliLogo,
      category: 'بنك',
      description: 'أكبر بنك في المملكة لتطوير حلول دفع إلكتروني متقدمة',
      icon: Shield,
      rating: 5,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'CODE - وزارة الاتصالات', 
      logo: codLogo,
      category: 'مركز حكومي',
      description: 'مركز التميز للابتكار الرقمي والحلول المبتكرة',
      icon: Rocket,
      rating: 5,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // تمرير ثلاثي الأبعاد مبهر
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotateY: [0, 5, -5, 0],
      rotateX: [0, 3, -3, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // تمرير دائري للخلفية
  const backgroundVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // تمرير نبضي للأيقونات
  const iconVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={backgroundVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          variants={backgroundVariants}
          animate="animate"
          transition={{ duration: 25, delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          variants={backgroundVariants}
          animate="animate"
          transition={{ duration: 30, delay: 10 }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-10 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
          >
            <Crown className="w-4 h-4" style={{ fill: 'white' }} />
            شركاؤنا الاستراتيجيون
            <Crown className="w-4 h-4" style={{ fill: 'white' }} />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            نتعاون مع مؤسسات رائدة في المملكة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            لتطوير حلول مبتكرة ومتقدمة
          </p>
        </motion.div>

        {/* الشركاء الاستراتيجيون */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
                     <div className="text-center mb-12">
             <h3 className="text-2xl font-bold text-gray-800 mb-4">
               شركاؤنا الأوائل في تطوير حلول مبتكرة
             </h3>
             <p className="text-gray-600">
               مؤسسة محمد بن سلمان (مسك) • البنك الأهلي السعودي • CODE - وزارة الاتصالات • بنك الإنماء • أكاديمية طويق
             </p>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategicPartners.map((partner, index) => (
              <motion.div
                key={partner.id || index}
                variants={itemVariants}
                className="group relative"
              >
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: index * 0.5 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 relative overflow-hidden"
                >
                  {/* خلفية متدرجة متحركة */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* شارة الشريك الاستراتيجي */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3" style={{ fill: 'white' }} />
                      شريك استراتيجي
                    </div>
                  </div>

                  {/* الشعار */}
                  <div className="relative z-10 text-center mb-6">
                    <motion.div
                      variants={iconVariants}
                      animate="animate"
                      transition={{ delay: index * 0.3 }}
                      className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-16 h-16 object-contain"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/96x96/10B981/FFFFFF?text=${partner.name.charAt(0)}`;
                        }}
                      />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {partner.name}
                    </h3>
                    
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                      <partner.icon className="w-3 h-3" style={{ fill: 'white' }} />
                      {partner.category}
                    </div>
                    
                                         <p className="text-gray-600 text-sm leading-relaxed">
                       {partner.description}
                     </p>
                   </div>

                   {/* التقييم */}
                   <div className="flex justify-center space-x-1 space-x-reverse mb-4">
                     {[...Array(partner.rating)].map((_, i) => (
                       <motion.div
                         key={i}
                         initial={{ scale: 0, rotate: -180 }}
                         animate={{ scale: 1, rotate: 0 }}
                         transition={{ delay: index * 0.1 + i * 0.1 }}
                       >
                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                       </motion.div>
                     ))}
                   </div>

                   {/* رابط الشريك */}
                   {partner.website && (
                     <div className="text-center">
                       <a
                         href={partner.website}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                       >
                         <Globe className="w-4 h-4" style={{ fill: 'white' }} />
                         زيارة الموقع
                       </a>
                     </div>
                   )}

                   {/* تأثيرات إضافية */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* إحصائيات الشراكة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">3</div>
            <div className="text-gray-600">شريك استراتيجي</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">مشروع مشترك</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">100K+</div>
            <div className="text-gray-600">عميل مستفيد</div>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">5.0</div>
            <div className="text-gray-600">تقييم الشراكة</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicPartners; 