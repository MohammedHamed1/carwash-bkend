import React, { useState, useEffect, useRef } from 'react';

const LazyLoad = ({ children, threshold = 0.1, placeholder = null }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const handleLoad = () => {
    setHasLoaded(true);
  };

  return (
    <div ref={ref} className="lazy-load-container">
      {!isVisible && placeholder && (
        <div className="lazy-placeholder">
          {placeholder}
        </div>
      )}
      {isVisible && (
        <div 
          className={`lazy-content ${hasLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default LazyLoad; 