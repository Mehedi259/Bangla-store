'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

export default function FloatingCartButton() {
  const { cartCount, cartTotal } = useCart();
  const pathname = usePathname();

  // Hide on checkout page or if cart is empty
  if (cartCount === 0 || pathname === '/checkout' || pathname === '/cart') {
    return null;
  }

  return (
    <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <Link href="/checkout">
        <div className="bg-primary hover:bg-green-700 text-white shadow-2xl px-6 py-3 rounded-full flex items-center gap-4 transition-all duration-300 transform hover:scale-105 border-2 border-white">
          <div className="relative">
            <ShoppingBag size={22} />
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border border-white">
              {cartCount}
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-medium text-white/90 leading-tight">Total</span>
            <span className="text-sm font-bold leading-tight">€{cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 font-bold ml-2 pl-4 border-l border-white/30">
            <span>Tap to Pay</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </Link>
    </div>
  );
}
