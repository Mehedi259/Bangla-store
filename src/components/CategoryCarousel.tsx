'use client';

import React from 'react';
import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';
import Link from 'next/link';

export default function CategoryCarousel() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 relative">
        <span className="bg-[#F9FAFB] px-4 relative z-10">Explore More Categories</span>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-200 z-0"></div>
      </h2>
      
      <div className="flex overflow-x-auto pb-4 gap-4 md:justify-center custom-scrollbar">
        {categories.map((cat) => {
          const IconComponent = (Icons as any)[cat.icon] || Icons.HelpCircle;
          return (
            <Link 
              href={`/category/${cat.name.toLowerCase()}`}
              key={cat.id} 
              className="flex flex-col items-center min-w-[100px] cursor-pointer group"
            >
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:shadow-md group-hover:border-primary transition duration-300">
                {/* Fallback to lucide icons if no image is present, simulating the design */}
                <IconComponent className="text-primary group-hover:scale-110 transition duration-300" size={32} />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
