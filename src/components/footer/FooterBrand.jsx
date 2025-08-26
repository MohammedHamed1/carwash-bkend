import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function FooterBrand() {
  return (
    <div>
      {/* العلامة التجارية */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-xl flex items-center justify-center">
          <img src={logo} alt="PayPass Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
        </div>
        <div>
          <h2 className="text-white font-bold text-xl sm:text-2xl">PayPass</h2>
          <p className="text-gray-300 text-sm sm:text-base">غسيل السيارات الذكي</p>
        </div>
      </div>
      
      {/* وصف الشركة */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
        تجربة غسيل السيارات الذكية مع PayPass. سهولة الاستخدام، خدمات متقدمة، وضمان الجودة.
      </p>

      {/* معلومات التواصل */}
      <div className="space-y-4 mb-8 sm:mb-10">
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-700 rounded-lg shadow-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="text-gray-200 text-sm sm:text-base" dir="ltr">+966 56 890 9183</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-700 rounded-lg shadow-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="text-gray-200 text-sm sm:text-base" dir="ltr">info@paypasss.com</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-700 rounded-lg shadow-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="text-gray-200 text-sm sm:text-base">الرياض، المملكة العربية السعودية</span>
        </div>
      </div>
      
      {/* الروابط الاجتماعية */}
      <div className="flex gap-3">
        <a 
          href="https://instagram.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
          title="Instagram"
        >
          <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </a>
      </div>
    </div>
  );
} 