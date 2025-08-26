import React from 'react';
import { Users, Clock, Shield, Award } from 'lucide-react';
import GreenIcon from './common/GreenIcon';

const features = [
  {
    icon: Users,
    title: 'فريق محترف',
    desc: 'فريق مدرب ومحترف يضمن لك أفضل النتائج.',
    variant: 'default'
  },
  {
    icon: Clock,
    title: 'سرعة في الأداء',
    desc: 'نحن الأسرع دائماً دون المساس بالجودة.',
    variant: 'light'
  },
  {
    icon: Shield,
    title: 'حماية شاملة',
    desc: 'نحمي سيارتك من الأضرار الخارجية.',
    variant: 'dark'
  },
  {
    icon: Award,
    title: 'جودة إيطالية',
    desc: 'نستخدم أفضل المواد الإيطالية لضمان أعلى جودة.',
    variant: 'outline'
  },
];

const WhyUs = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900">لماذا تختارنا؟</h2>
      <p className="text-gray-500 text-center mb-10">نتميز بجودة عالية وخدمة مستمرة تجعلنا الخيار الأفضل لك</p>
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="flex-1 bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center border border-gray-100">
            <div className="mb-4">
              <GreenIcon icon={f.icon} variant={f.variant} size="md" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs; 