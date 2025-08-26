import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';
import miskLogo from '../assets/misk.jpeg';
import alahliLogo from '../assets/alahli.jpeg';
import codLogo from '../assets/cod.jpeg';
import alnmaLogo from '../assets/alnma.jpeg';
import teykLogo from '../assets/teyk.jpeg';

const partnerLogos = [
  { id: 1, name: 'مسك', logo: miskLogo },
  { id: 2, name: 'البنك الأهلي', logo: alahliLogo },
  { id: 3, name: 'CODE', logo: codLogo },
  { id: 4, name: 'بنك الإنماء', logo: alnmaLogo },
  { id: 5, name: 'تيك', logo: teykLogo }
];

const PartnersSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FaHandshake className="w-4 h-4" />
          شركاؤنا الاستراتيجيون
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          نثق بنا <span className="text-green-600">شركاؤنا</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          نتعاون مع مؤسسات رائدة في المملكة لتطوير حلول مبتكرة
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-white rounded-3xl p-12 border-2 border-green-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400" />
          
          <div className="relative overflow-hidden rounded-2xl" style={{ overflow: 'hidden' }}>
            <div className="flex animate-scroll-left min-w-[200%] gap-x-12" style={{ overflow: 'hidden' }}>
              {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                <div key={`partner-${index}`} className="flex-shrink-0 group">
                  <div className="w-40 h-20 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md border border-green-100 flex items-center justify-center p-4 hover:shadow-lg hover:border-green-300 transition-all duration-300 transform hover:scale-105 relative">
                    <div className="absolute inset-0 bg-green-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    <img
                      loading="lazy"
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/160x80/10B981/FFFFFF?text=${partner.name.charAt(0)}`;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">شركاؤنا المميزون</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default PartnersSection; 