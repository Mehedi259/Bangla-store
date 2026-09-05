'use client';

import React from 'react';
import { Search, User, Heart, ShoppingCart, Menu, ChevronDown, MapPin, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/mockData';

export default function Header() {
  const { cartCount, cartTotal } = useCart();

  return (
    <header className="w-full flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary-dark text-white text-xs py-2 px-4 flex justify-between items-center hidden md:flex">
        <div className="flex space-x-6">
          <span className="flex items-center gap-2"><MapPin size={14} /> Serving All Over Netherlands</span>
          <span className="flex items-center gap-2"><Truck size={14} /> Fast & Reliable Delivery</span>
          <span className="flex items-center gap-2"><Lock size={14} /> Secure Payment</span>
        </div>
        <div className="flex space-x-4">
          <span className="cursor-pointer">English | Nederlands</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-4 px-4 md:px-8 flex justify-between items-center border-b">
        {/* Logo */}
        <div className="flex items-center gap-2 text-primary font-bold text-2xl">
          <div className="bg-primary text-white p-2 rounded-lg">
             {/* Simple cart icon for logo */}
             <ShoppingCart size={28} />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight">Bangla Store</span>
            <span className="text-xs text-gray-500 font-normal">Your Bangladeshi Grocery & More</span>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input
            type="text"
            placeholder="Search for products, brands..."
            className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button className="bg-primary text-white px-6 rounded-r-md hover:bg-primary-dark transition">
            <Search size={20} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700">
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-primary transition">
            <User size={20} />
            <span className="text-sm font-medium">Login / Register</span>
          </div>
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-primary transition">
            <Heart size={20} />
            <span className="text-sm font-medium">Wishlist</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer relative hover:text-primary transition">
            <div className="relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-bold text-lg ml-2">€{cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white py-3 px-4 md:px-8 flex items-center shadow-sm">
        <button className="bg-primary text-white px-6 py-2 rounded-md flex items-center gap-2 font-medium hover:bg-primary-dark transition">
          <Menu size={20} />
          All Categories
        </button>
        
        <nav className="hidden lg:flex items-center ml-8 space-x-6 text-sm font-semibold text-gray-700">
          <a href="#" className="text-primary border-b-2 border-primary pb-1">Home</a>
          <a href="#" className="hover:text-primary transition">Shop</a>
          {categories.slice(0, 6).map((cat) => (
            <a href="#" key={cat.id} className="hover:text-primary transition flex items-center gap-1">
              {cat.name}
            </a>
          ))}
          <a href="#" className="flex items-center gap-1 hover:text-primary transition">
            Deals
          </a>
        </nav>
      </div>
    </header>
  );
}
