'use client';

import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Link from 'next/link';

interface ProductRowProps {
  title: string;
  categorySlug: string;
  products: Product[];
  icon?: React.ReactNode;
}

export default function ProductRow({ title, categorySlug, products, icon }: ProductRowProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!products || products.length === 0) return null;

  return (
    <div className="container mx-auto px-4 md:px-8 py-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            {title}
          </h2>
        </div>
        <Link 
          href={`/category/${categorySlug}`}
          className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.slice(0, 5).map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col relative group overflow-hidden">
            {product.isBestSeller && (
              <span className="absolute top-2 left-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-r-md z-20">
                Best Seller
              </span>
            )}
            <button 
              onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
              className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md hover:text-primary transition z-20"
            >
              <Heart size={16} className={isInWishlist(product.id) ? "fill-primary text-primary" : "text-gray-400"} />
            </button>
            <Link href={`/product/${product.id}`} className="h-40 md:h-48 w-full relative block bg-white">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
            </Link>
            <div className="flex-1 flex flex-col justify-between p-4 pt-2">
              <div>
                <Link href={`/product/${product.id}`} className="hover:text-primary transition">
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 line-clamp-2 min-h-[40px]">{product.name}</h3>
                </Link>
                <span className="text-xs text-gray-500 block mb-2">{product.weight}</span>
              </div>
              <div className="mt-auto space-y-3">
                <div className="font-bold text-lg">€{product.price.toFixed(2)}</div>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded-md flex items-center justify-center gap-2 transition text-sm"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
