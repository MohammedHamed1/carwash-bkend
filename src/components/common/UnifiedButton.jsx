import React from 'react';

const UnifiedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  icon,
  ...props 
}) => {
  const baseClasses = 'font-sans font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg focus:ring-green-500',
    secondary: 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500',
    outline: 'bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500',
    ghost: 'bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500',
    gradient: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg focus:ring-green-500'
  };
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="icon-wrapper">{icon}</span>}
        {children}
      </div>
    </button>
  );
};

export default UnifiedButton; 