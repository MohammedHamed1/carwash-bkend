import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import logo from '../assets/logo.png';

const WelcomeModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // إظهار النافذة بعد 500ms
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // إخفاء النافذة تلقائياً بعد 4 ثوانٍ
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 animate-fade-in-up overflow-hidden">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 bg-green-700 hover:bg-green-800 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* الخلفية المائية */}
        <div className="absolute top-0 right-0 opacity-10 transform -rotate-12 translate-x-8 -translate-y-4">
          <div className="text-green-800 text-6xl font-bold">PAYPASS</div>
          <div className="w-16 h-10 border-2 border-green-800 rounded-lg mt-2 relative">
            <div className="absolute top-1 left-1 w-3 h-2 bg-green-800 rounded-sm"></div>
          </div>
        </div>

        <div className="text-center relative z-10">
          {/* شعار التطبيق */}
          <div className="mb-4">
            <img 
              src={logo} 
              alt="PayPass Logo" 
              className="w-16 h-16 mx-auto mb-3 drop-shadow-lg brightness-0 invert"
            />
          </div>

          {/* النص الترحيبي */}
          <h2 className="text-2xl font-bold text-white mb-3">
            مرحبًا بك في PayPass!
          </h2>
          
          <p className="text-green-100 text-lg mb-6 flex items-center justify-center gap-2">
            <span>استمتع بتجربة غسيل سيارات ذكية وعصرية</span>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="text-2xl">🚗</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal; 