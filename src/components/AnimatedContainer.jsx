'use client'

import { useEffect, useRef } from 'react';

/**
 * AnimatedContainer - Container with stagger animation for children
 */
export default function AnimatedContainer({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset all items first to ensure clean state
    const allItems = container.querySelectorAll('.stagger-item');
    allItems.forEach((item) => {
      item.classList.remove('is-visible');
    });

    // Small delay to ensure DOM is fully updated
    const initTimer = setTimeout(() => {
      const items = container.querySelectorAll('.stagger-item');
      if (items.length === 0) return;

      const checkInitialVisibility = () => {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const isInView = rect.top < windowHeight + 200 && rect.bottom > -100;
          
          if (isInView) {
            items.forEach((item) => {
              if (!item.classList.contains('is-visible')) {
                item.classList.add('is-visible');
              }
            });
          }
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const currentItems = container.querySelectorAll('.stagger-item');
              currentItems.forEach((item) => {
                item.classList.add('is-visible');
              });
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '-50px'
        }
      );

      observer.observe(container);
      
      // Check initial visibility
      checkInitialVisibility();
      const timer1 = setTimeout(checkInitialVisibility, 50);
      const timer2 = setTimeout(checkInitialVisibility, 150);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        observer.disconnect();
      };
    }, 10);

    return () => {
      clearTimeout(initTimer);
    };
  }, [children]);
  
  return (
    <div ref={containerRef} className={`stagger-container ${className}`}>
      {children}
    </div>
  );
}
