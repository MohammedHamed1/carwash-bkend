import React from 'react';

const ResponsiveContainer = ({ children, className = "" }) => {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto w-full ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer; 