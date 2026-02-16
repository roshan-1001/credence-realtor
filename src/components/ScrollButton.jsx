'use client'

import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ScrollButton = () => {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsAtTop(false);
            } else {
                setIsAtTop(true);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const handleScroll = () => {
        if (isAtTop) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <button
            onClick={handleScroll}
            className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 border border-white/20 backdrop-blur-sm ${isAtTop
                    ? 'bg-black/80 text-white hover:bg-black'
                    : 'bg-[#C5A365] text-white hover:bg-[#b09158]'
                }`}
            aria-label={isAtTop ? "Scroll to Bottom" : "Scroll to Top"}
        >
            {isAtTop ? <ArrowDown size={20} /> : <ArrowUp size={20} />}
        </button>
    );
};

export default ScrollButton;
