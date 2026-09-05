'use client';

import React from 'react';
import { featuredProducts } from '../data/mockData';
import { ShoppingCart, Leaf, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function FeaturedProducts() {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Leaf className="text-primary" size={24} />
            Featured Products
          </h2>
          <p className="text-gray-500 text-sm mt-1">Top Products Loved by Our Customers</p>
        </div>
        <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {featuredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition flex flex-col relative group">
            {product.isBestSeller && (
              <span className="absolute top-2 left-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-r-md z-10">
                Best Seller
              </span>
            )}
            <Link href={`/product/${product.id}`} className="h-40 w-full relative mb-4 block">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
            </Link>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Link href={`/product/${product.id}`} className="hover:text-primary transition">
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">{product.name}</h3>
                </Link>
                <span className="text-xs text-gray-500">{product.weight}</span>
              </div>
              <div className="mt-4 space-y-3">
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
