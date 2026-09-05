'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Heart className="text-primary fill-primary" /> My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
            <Heart size={64} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-700">Your wishlist is empty</h2>
            <p className="text-gray-500 mt-2 mb-6">Save items you love here to buy them later.</p>
            <Link href="/" className="bg-primary text-white font-medium px-6 py-2 rounded-lg hover:bg-primary-dark transition">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-medium text-gray-600 text-sm">
              <div className="col-span-6">Product Name</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y">
              {wishlist.map((item) => (
                <div key={item.id} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <Link href={`/product/${item.id}`} className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center border shrink-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mix-blend-multiply" />
                    </Link>
                    <div>
                      <Link href={`/product/${item.id}`} className="font-bold text-gray-800 hover:text-primary transition">{item.name}</Link>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>

                  <div className="col-span-2 text-left md:text-center font-bold text-gray-800">
                    <span className="md:hidden text-gray-500 font-normal mr-2">Price:</span>
                    €{item.price.toFixed(2)}
                  </div>

                  <div className="col-span-2 text-left md:text-center">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">In Stock</span>
                  </div>

                  <div className="col-span-2 flex justify-end gap-2">
                    <button 
                      onClick={() => handleMoveToCart(item)}
                      className="bg-primary hover:bg-primary-dark text-white p-2 rounded-md transition"
                      title="Move to Cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded-md transition border border-red-100"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
