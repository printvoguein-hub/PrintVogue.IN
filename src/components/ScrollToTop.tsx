import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-12 hover:shadow-amber-500/50 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)',
      }}
    >
      <ChevronUp className="w-6 h-6 animate-bounce" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
    </button>
  );
};

export default ScrollToTop;