import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from './common/LoadingSpinner.jsx';

const PageTransitionLoader = ({ children }) => {
  const location = useLocation();
  const [showContent, setShowContent] = useState(true);
  const timerRef = useRef(null);
  const [previousPath, setPreviousPath] = useState(location.pathname);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // تجاهل التحميل الأول
    if (isInitialLoad) {
      setIsInitialLoad(false);
      setPreviousPath(location.pathname);
      setShowContent(true);
      return;
    }

    // إذا لم تتغير الصفحة، لا تفعل شيء
    if (previousPath === location.pathname) {
      return;
    }

    // عند تغيير الصفحة: أخفِ المحتوى وأظهر التحميل
    setShowContent(false);

    // ابدأ مؤقت التحميل
    timerRef.current = setTimeout(() => {
      setShowContent(true);
      setPreviousPath(location.pathname);
    }, 6000);

    // تنظيف المؤقت عند تغيير الصفحة مرة أخرى
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [location.pathname, previousPath, isInitialLoad]);

  // إذا showContent=false، اعرض شاشة التحميل البيضاء فقط
  if (!showContent) {
    return (
      <div style={{position:'fixed',inset:0,zIndex:9999,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <LoadingSpinner size="lg" color="green" text="جاري تحميل الصفحة..." />
      </div>
    );
  }

  // إذا showContent=true، اعرض الأطفال (المحتوى)
  return children;
};

export default PageTransitionLoader; 