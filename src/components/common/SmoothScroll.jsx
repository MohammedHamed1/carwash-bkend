import React, { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // إضافة التنقل السلس لجميع الروابط الداخلية
    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // إضافة مستمع الأحداث لجميع الروابط
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // تنظيف المستمعين عند إلغاء التحميل
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return null;
};

export default SmoothScroll; 