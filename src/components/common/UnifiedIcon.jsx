import React from 'react';

const UnifiedIcon = ({ 
  icon: Icon, 
  size = 'medium',
  variant = 'primary',
  className = '',
  onClick,
  ...props 
}) => {
  // Handle size prop - can be string ('small', 'medium', 'large', 'xl') or number
  const getIconSize = (sizeProp) => {
    if (typeof sizeProp === 'number' && !isNaN(sizeProp)) {
      return Math.max(1, Math.min(Math.round(sizeProp * 0.6), 100));
    }
    
    // Map string sizes to numbers
    const sizeMap = {
      small: 12,
      medium: 16,
      large: 20,
      xl: 24
    };
    
    return sizeMap[sizeProp] || 16; // default to medium
  };
  
  const finalIconSize = getIconSize(size);
  const baseClasses = 'inline-flex items-center justify-center transition-all duration-300';
  
  const variants = {
    primary: 'bg-green-600 text-white shadow-md hover:shadow-lg hover:bg-green-700',
    secondary: 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100',
    outline: 'bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white',
    ghost: 'bg-transparent text-green-600 hover:bg-green-50',
    white: 'bg-white text-green-600 shadow-md hover:shadow-lg',
    gradient: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg'
  };
  
  const sizes = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size] || sizes.medium} ${className}`;
  
  return (
    <div 
      className={classes}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      <Icon size={finalIconSize} />
    </div>
  );
};

export default UnifiedIcon; 