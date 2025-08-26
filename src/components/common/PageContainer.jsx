import React from 'react';

/**
 * مكون PageContainer لحل مشكلة الهيدر الثابت
 * يضيف padding-top تلقائياً للمحتوى ليتجنب الهيدر
 */
const PageContainer = ({ 
  children, 
  className = '', 
  fullHeight = true,
  centerContent = false,
  ...props 
}) => {
  const baseClasses = fullHeight ? 'min-h-screen' : '';
  const centerClasses = centerContent ? 'flex items-center justify-center' : '';
  const headerClasses = 'page-with-header'; // إضافة padding-top للهيدر
  
  const combinedClasses = `${baseClasses} ${centerClasses} ${headerClasses} ${className}`.trim();
  
  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

export default PageContainer; 