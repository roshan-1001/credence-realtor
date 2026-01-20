'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';

const FilterModal = ({ isOpen, onClose, filters, onApplyFilters }) => {
    const [localFilters, setLocalFilters] = useState(filters || {});

    if (!isOpen) return null;

    const handleApply = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters = {};
        setLocalFilters(resetFilters);
        onApplyFilters(resetFilters);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-secondary">Filter Properties</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* Filter Content */}
                <div className="p-6 space-y-6">
                    {/* Property Type */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary mb-3">
                            Property Type
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {['Ready', 'Off-Plan'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setLocalFilters(prev => ({
                                            ...prev,
                                            type: prev.type === type ? undefined : type
                                        }));
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        localFilters.type === type
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary mb-3">
                            Category
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {['Luxury', 'Affordable', 'Waterfront', 'Commercial'].map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setLocalFilters(prev => ({
                                            ...prev,
                                            category: prev.category === category ? undefined : category
                                        }));
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        localFilters.category === category
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Developer */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary mb-3">
                            Developer
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {['EMAAR', 'DAMAC', 'SOBHA', 'NAKHEEL', 'MERAAS', 'AZIZI'].map((developer) => (
                                <button
                                    key={developer}
                                    onClick={() => {
                                        setLocalFilters(prev => ({
                                            ...prev,
                                            developer: prev.developer === developer ? undefined : developer
                                        }));
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        localFilters.developer === developer
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {developer}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bedrooms */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary mb-3">
                            Bedrooms
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {[1, 2, 3, 4, 5, 6].map((bedrooms) => (
                                <button
                                    key={bedrooms}
                                    onClick={() => {
                                        setLocalFilters(prev => ({
                                            ...prev,
                                            bedrooms: prev.bedrooms === bedrooms ? undefined : bedrooms
                                        }));
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        localFilters.bedrooms === bedrooms
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200 gap-4">
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Reset Filters
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
