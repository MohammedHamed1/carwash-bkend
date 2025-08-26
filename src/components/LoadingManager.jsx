import React, { createContext, useContext, useState } from 'react';
import LoadingSpinner from './common/LoadingSpinner.jsx';

// إنشاء سياق التحميل
const LoadingContext = createContext();

// Hook مخصص لاستخدام سياق التحميل
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// مكون مزود سياق التحميل
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('جاري التحميل...');

  const showLoading = (message = 'جاري التحميل...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage('جاري التحميل...');
  };

  const withLoading = async (asyncFunction, message = 'جاري التحميل...') => {
    try {
      showLoading(message);
      const result = await asyncFunction();
      return result;
    } finally {
      hideLoading();
    }
  };

  const value = {
    isLoading,
    loadingMessage,
    showLoading,
    hideLoading,
    withLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <LoadingSpinner size="lg" color="green" text={loadingMessage} />}
    </LoadingContext.Provider>
  );
};

// مكون HOC لتحميل الصفحات
export const withPageLoading = (WrappedComponent) => {
  return function WithPageLoadingComponent(props) {
    const { showLoading, hideLoading } = useLoading();

    React.useEffect(() => {
      showLoading('جاري تحميل الصفحة...');
      
      // محاكاة وقت التحميل للصفحة
      const timer = setTimeout(() => {
        hideLoading();
      }, 1500);

      return () => clearTimeout(timer);
    }, []);

    return <WrappedComponent {...props} />;
  };
};

// مكون لتحميل البيانات
export const DataLoader = ({ loadFunction, children, loadingMessage = 'جاري تحميل البيانات...' }) => {
  const { withLoading } = useLoading();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const result = await withLoading(loadFunction, loadingMessage);
        setData(result);
      } catch (err) {
        setError(err);
      }
    };

    loadData();
  }, [loadFunction, loadingMessage, withLoading]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600" style={{fontFamily: 'Cairo, sans-serif', fontWeight: 'bold'}}>
          حدث خطأ أثناء تحميل البيانات
        </p>
      </div>
    );
  }

  if (!data) {
    return null; // سيظهر LoadingSpinner تلقائياً
  }

  return children(data);
}; 