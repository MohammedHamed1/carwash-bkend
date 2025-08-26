import React, { useState, useEffect } from 'react';
import TermsModal from './TermsModal';
import WelcomeModal from './WelcomeModal';

const ModalManager = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [hasSeenModals, setHasSeenModals] = useState(false);

  // التمرير إلى أعلى الصفحة عند تحميل المكون
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // التحقق من أن المستخدم لم يرى المنبثقات من قبل
    const hasSeen = localStorage.getItem('hasSeenWelcomeModals');
    if (!hasSeen) {
      // بدء تسلسل المنبثقات - نافذة الترحيب أولاً
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    // إظهار نافذة الشروط بعد إغلاق نافذة الترحيب
    setTimeout(() => {
      setShowTerms(true);
    }, 500);
  };

  const handleTermsAccept = () => {
    setShowTerms(false);
    setHasSeenModals(true);
    // حفظ أن المستخدم رأى المنبثقات
    localStorage.setItem('hasSeenWelcomeModals', 'true');
  };



  return (
    <>
      {showWelcome && (
        <WelcomeModal 
          onClose={handleWelcomeClose}
        />
      )}
      
      {showTerms && (
        <TermsModal 
          onAccept={handleTermsAccept}
        />
      )}
    </>
  );
};

export default ModalManager; 