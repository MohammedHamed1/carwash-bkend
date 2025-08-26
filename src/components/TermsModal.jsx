import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TermsModal = ({ onAccept }) => {
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

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    setTimeout(() => {
      onAccept();
    }, 300);
  };



  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 animate-fade-in-up">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">الشروط والأحكام</h2>
          
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            يجب الموافقة على الشروط والأحكام وسياسة الخصوصية لاستخدام الموقع. 
            يمكنك الاطلاع عليها من الروابط أدناه.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <a 
              href="/terms" 
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
            >
              الشروط والأحكام
            </a>
            <a 
              href="/privacy-policy" 
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
            >
              سياسة الخصوصية
            </a>
            <a 
              href="/terms" 
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
            >
              شروط الاستخدام
            </a>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleAccept}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              أوافق على الشروط والأحكام
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal; 