import React from 'react';

const MobileOptimizedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-bold font-medium
    rounded-xl
    transition-all duration-300
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    touch-manipulation
    min-h-[44px]
    ${className}
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]'
  };

  const variantClasses = {
    primary: `
      bg-green-500 hover:bg-green-600 
      text-white 
      shadow-lg hover:shadow-xl
      focus:ring-green-500
      border border-green-500
    `,
    secondary: `
      bg-white hover:bg-gray-50
      text-green-600 
      border-2 border-green-500
      shadow-md hover:shadow-lg
      focus:ring-green-500
    `,
    outline: `
      bg-transparent hover:bg-green-50
      text-green-600 
      border-2 border-green-500
      focus:ring-green-500
    `,
    ghost: `
      bg-transparent hover:bg-green-50
      text-green-600 
      focus:ring-green-500
    `,
    danger: `
      bg-red-500 hover:bg-red-600 
      text-white 
      shadow-lg hover:shadow-xl
      focus:ring-red-500
      border border-red-500
    `,
    success: `
      bg-green-500 hover:bg-green-600 
      text-white 
      shadow-lg hover:shadow-xl
      focus:ring-green-500
      border border-green-500
    `
  };

  const iconClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const iconSpacing = Icon ? 'gap-2' : '';

  return (
    <button
      type={type}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${iconSpacing}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      style={{ backgroundColor: variant === 'primary' ? '#22c55e' : undefined }}
      {...props}
    >
      {loading && (
        <div className={`${iconClasses[size]} border-2 border-current border-t-transparent rounded-full animate-spin`} />
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={iconClasses[size]} style={{ fill: variant === 'primary' ? 'white' : undefined }} />
      )}
      
      <span>{children}</span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={iconClasses[size]} style={{ fill: variant === 'primary' ? 'white' : undefined }} />
      )}
    </button>
  );
};

export default MobileOptimizedButton; 