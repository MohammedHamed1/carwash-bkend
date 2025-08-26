import React from 'react';

const GreenIcon = ({
  icon: Icon,
  size = 'md',
  className = '',
  variant = 'default',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const variantClasses = {
    default: 'bg-green-500 text-white',
    light: 'bg-green-100 text-green-700',
    dark: 'bg-green-700 text-white',
    outline: 'border-2 border-green-500 text-green-500 bg-white',
    ghost: 'text-green-500 bg-green-50'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-full flex items-center justify-center
        shadow-lg hover:shadow-xl transition-all duration-300
        ${className}
      `}
      style={{ backgroundColor: variant === 'default' ? '#22c55e' : undefined }}
      {...props}
    >
      <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : 'w-10 h-10'}`} style={{ fill: 'white' }} />
    </div>
  );
};

export default GreenIcon; 