'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative w-full h-[300px] md:h-[450px] bg-sky-100 flex items-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" 
          alt="Farm background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-100 via-sky-100/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-dark leading-tight">
            Authentic Bangladeshi <br />
            <span className="text-gray-800">Products in Netherlands</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 font-medium">
            Fresh • Quality • Trusted
          </p>
          <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md transition flex items-center gap-2">
            Shop Now
            <ArrowRight size={20} />
          </button>
        </div>
        
        {/* Placeholder for the basket image */}
        <div className="hidden md:block w-1/2 relative h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" 
            alt="Groceries" 
            className="w-full h-full object-contain drop-shadow-2xl translate-y-8"
          />
        </div>
      </div>
    </div>
  );
}
