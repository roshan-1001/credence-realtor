'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const ContactDropdown = ({ label, className, icon: Icon = MessageCircle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className={className}
            >
                {Icon && <Icon size={16} />}
                {label}
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <a
                        href="mailto:INFO@CREDENCEREALTOR.COM"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-md transition-colors text-gray-700 text-sm font-medium"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#F9F7F2] flex items-center justify-center text-[#C5A365]">
                            <Mail size={16} />
                        </div>
                        Email Us
                    </a>
                    <a
                        href="tel:+971588919223"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-md transition-colors text-gray-700 text-sm font-medium"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#F9F7F2] flex items-center justify-center text-[#C5A365]">
                            <Phone size={16} />
                        </div>
                        Call Now
                    </a>
                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45"></div>
                </div>
            )}
        </div>
    );
};

export default ContactDropdown;
