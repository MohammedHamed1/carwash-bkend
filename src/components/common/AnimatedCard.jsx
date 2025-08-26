import React, { useEffect } from 'react';

const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = '0s',
  hover = true,
  onClick,
  disabled = false 
}) => {
  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className={`
        relative bg-white rounded-2xl shadow-lg border border-gray-100 
        transition-all duration-300 transform 
        ${hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:scale-105' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{ animationDelay: delay }}
      onClick={disabled ? undefined : onClick}
    >
      {/* Hover Effect Overlay */}
      {/* تم الحذف بناءً على طلب المستخدم */}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine Effect */}
      {/* تم الحذف بناءً على طلب المستخدم */}
    </div>
  );
};

export default AnimatedCard; 