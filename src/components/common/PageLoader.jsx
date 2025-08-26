import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = ({ 
  isLoading, 
  children, 
  loadingText = 'جاري التحميل...',
  minLoadTime = 500 
}) => {
  const [showLoader, setShowLoader] = useState(isLoading);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        setShowLoader(false);
      }, remaining);
    }
  }, [isLoading, startTime, minLoadTime]);

  if (showLoader) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-green-500 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">{loadingText}</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default PageLoader; 