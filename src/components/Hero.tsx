'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative w-full min-h-[500px] md:h-[600px] flex items-center overflow-hidden bg-[#032B18] border-b-8 border-white">
      {/* Radial gradient background to match the image center light */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#09502D] via-[#032B18] to-[#032B18]"></div>

      <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between h-full pt-10 md:pt-0">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-8 z-20 pb-12 md:pb-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
             <div className="w-5 h-5 rounded-md overflow-hidden bg-[#84CC16] flex items-center justify-center font-bold text-[#032B18] text-[10px]">
               BS
             </div>
             <span className="text-white text-sm">The best of five grocery store in Syhed</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            Your One-Stop Shop <br />
            for <span className="text-[#84CC16]">Organic Products</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 font-medium max-w-md leading-relaxed">
            Fresh, local, Delivered to your doorstep. We care about what goes into your kitchen for your family and your health.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-8 pt-4">
            <button className="bg-[#84CC16] hover:bg-[#65A30D] text-[#032B18] font-bold py-3.5 px-8 rounded-full transition shadow-lg shadow-[#84CC16]/20">
              Shop Now
            </button>
            <Link href="/shop" className="text-white hover:text-[#84CC16] transition font-medium border-b border-[#84CC16] pb-0.5">
              View All Products
            </Link>
          </div>

          {/* Customers Avatar Group */}
          <div className="flex items-center gap-3 pt-6 bg-white/5 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
             <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-[#032B18] overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=1" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#032B18] overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=2" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#032B18] overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=3" alt="Customer" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="flex flex-col justify-center">
               <span className="text-white font-bold text-sm leading-tight">209 +</span>
               <div className="flex gap-1 mt-0.5">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#84CC16]"></div>)}
               </div>
             </div>
          </div>
        </div>
        
        {/* Right Content - Image and Badges */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] z-10 flex items-end justify-center md:justify-center">
          <img 
            src="/images/old man with vagetables.png" 
            alt="Farmer with organic vegetables" 
            className="h-[100%] w-auto object-contain object-bottom md:absolute md:bottom-0 md:right-[15%]"
          />

          {/* Badges / Pointers (Hidden on mobile for cleaner look) */}
          <div className="hidden md:flex absolute top-[25%] right-[2%] lg:right-[5%] items-center gap-3">
            <div className="w-16 lg:w-20 border-b border-[#84CC16]/50 border-dashed"></div>
            <div className="text-white/80 text-sm font-medium">Bed a Cernhisly<br/><span className="text-white">Bistnered</span></div>
          </div>
          
          <div className="hidden md:flex absolute top-[45%] right-[2%] lg:right-[5%] items-center gap-3">
            <div className="w-16 lg:w-20 border-b border-[#84CC16]/50 border-dashed"></div>
            <div className="text-white/80 text-sm font-medium">Frait Customer<br/><span className="text-white">Support</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
