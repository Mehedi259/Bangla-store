'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PromoBanners() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Banner 1 */}
        <Link href="/category/fresh vegetables" className="bg-[#EAF6E3] rounded-xl p-6 relative overflow-hidden h-48 flex items-center group cursor-pointer block">
          <div className="z-10 w-2/3">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Fresh Vegetables & Fruits</h3>
            <p className="text-xs text-gray-600 mb-4">Straight from trusted sources</p>
            <div className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Shop Now <ArrowRight size={16} />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-1/2 h-[120%] z-0">
             <img src="https://images.unsplash.com/photo-1610348725531-843dcf5aad8c?q=80&w=600&auto=format&fit=crop" alt="Vegetables" className="w-full h-full object-cover rounded-full" />
          </div>
        </Link>

        {/* Banner 2 */}
        <Link href="/category/frozen fish" className="bg-[#E1F0FF] rounded-xl p-6 relative overflow-hidden h-48 flex items-center group cursor-pointer block">
          <div className="z-10 w-2/3">
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-1">Frozen Fish</h3>
            <p className="text-xs text-[#3B82F6] mb-4">Premium Quality</p>
            <div className="text-[#1E3A8A] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Shop Now <ArrowRight size={16} />
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full z-0">
            <img src="https://images.unsplash.com/photo-1534948216015-843149f72be3?q=80&w=600&auto=format&fit=crop" alt="Fish" className="w-full h-full object-cover" />
          </div>
        </Link>

        {/* Banner 3 */}
        <Link href="/shop" className="bg-[#FFF4E6] rounded-xl p-6 relative overflow-hidden h-48 flex items-center group cursor-pointer block">
          <div className="z-10 w-2/3">
            <h3 className="text-xl font-bold text-[#9A3412] mb-1">Daily Grocery</h3>
            <p className="text-xs text-[#C2410C] mb-4">All Essentials Under One Roof</p>
            <div className="text-[#9A3412] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Shop Now <ArrowRight size={16} />
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-[90%] z-0">
            <img src="https://images.unsplash.com/photo-1588964895597-cfccd6e2a0d9?q=80&w=600&auto=format&fit=crop" alt="Grocery" className="w-full h-full object-contain" />
          </div>
        </Link>
      </div>
    </div>
  );
}
