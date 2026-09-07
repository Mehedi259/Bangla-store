'use client';

import React from 'react';
import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';
import Link from 'next/link';

export default function CategoryCarousel() {
  return (
    <div className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8 text-center mb-12">
        <p className="text-sm text-gray-500 font-medium mb-2">Categories</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Featured Categories</h2>
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex overflow-x-auto pb-6 gap-6 md:gap-10 md:justify-center custom-scrollbar scroll-smooth snap-x">
          {categories.map((cat) => {
            const IconComponent = (Icons as any)[cat.icon] || Icons.HelpCircle;
            // Mock product count for design purposes
            const mockCount = Math.floor(Math.random() * 20) + 12;
            return (
              <Link 
                href={`/category/${cat.name.toLowerCase()}`}
                key={cat.id} 
                className="flex flex-col items-center min-w-[120px] md:min-w-[140px] cursor-pointer group snap-center"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#E5E7EB] transition-colors duration-300 relative overflow-hidden">
                  <IconComponent className="text-[#032B18] group-hover:scale-110 transition-transform duration-300 relative z-10" size={48} strokeWidth={1.5} />
                  {/* Subtle highlight ring on hover */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#84CC16]/20 rounded-full transition-colors duration-300"></div>
                </div>
                <span className="font-bold text-gray-800 text-center mb-1 group-hover:text-[#032B18] transition-colors">{cat.name}</span>
                <span className="text-xs text-gray-500 font-medium">{mockCount}+ Products</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
