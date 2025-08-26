import React from 'react';

const GradientCard = ({ 
  children, 
  variant = 'primary',
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = `
    rounded-xl p-6 shadow-xl transition-all duration-300
    hover:shadow-2xl hover:scale-105
    cursor-pointer
  `;

  const variantClasses = {
    primary: 'bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white',
    secondary: 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border border-gray-200',
    accent: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white',
    success: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white',
    warning: 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white'
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default GradientCard; 