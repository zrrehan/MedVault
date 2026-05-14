"use client";

import React from 'react';

interface MiniNavbarProps {
  onSort: (sort: string) => void;
  onPriceRangeChange: (min: number | null, max: number | null) => void;
  currentSort: string;
  minPrice: number | null;
  maxPrice: number | null;
}

const MiniNavbar: React.FC<MiniNavbarProps> = ({ 
  onSort, 
  onPriceRangeChange, 
  currentSort, 
  minPrice,
  maxPrice
}) => {
  return (
    <div className="flex mb-15 flex-wrap items-center justify-between bg-white p-4 rounded-2xl shadow-md border border-gray-100 mb-8 max-w-2xl mx-auto transition-all duration-300">
      {/* Sorting Section */}
      <div className="flex items-center gap-3">
        <div className="bg-gray-50 p-2 rounded-lg">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Sort By</span>
          <select
            value={currentSort}
            onChange={(e) => onSort(e.target.value)}
            className="text-sm border-none focus:ring-0 cursor-pointer font-semibold text-gray-700 bg-transparent p-0"
          >
            <option value="none">Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>

      {/* Price Range Filter Section */}
      <div className="flex items-center gap-3 mt-4 sm:mt-0">
        <div className="bg-gray-50 p-2 rounded-lg">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Price Range</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice ?? ''}
              onChange={(e) => onPriceRangeChange(e.target.value ? Number(e.target.value) : null, maxPrice)}
              className="w-20 text-sm font-semibold border-b border-gray-200 focus:border-black outline-none bg-transparent"
            />
            <span className="text-gray-300">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice ?? ''}
              onChange={(e) => onPriceRangeChange(minPrice, e.target.value ? Number(e.target.value) : null)}
              className="w-20 text-sm font-semibold border-b border-gray-200 focus:border-black outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(minPrice !== null || maxPrice !== null || currentSort !== 'none') && (
        <button
          onClick={() => {
            onSort('none');
            onPriceRangeChange(null, null);
          }}
          className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-tight mt-4 sm:mt-0"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default MiniNavbar;
