'use client';

import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, ChevronDown, MapPin, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { categories } from '../data/mockData';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { cartCount, cartTotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <header className="w-full flex flex-col sticky top-0 z-40 bg-white shadow-sm">
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
        <form action="/search" className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input
            type="text"
            name="q"
            placeholder="Search for products, brands..."
            className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button type="submit" className="bg-primary text-white px-6 rounded-r-md hover:bg-primary-dark transition">
            <Search size={20} />
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700">
          {isAuthenticated ? (
            <Link href="/profile" className="hidden md:flex items-center gap-2 cursor-pointer hover:text-primary transition">
              <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user?.name}</span>
            </Link>
          ) : (
            <div 
              onClick={() => setIsAuthOpen(true)}
              className="hidden md:flex items-center gap-2 cursor-pointer hover:text-primary transition"
            >
              <User size={20} />
              <span className="text-sm font-medium">Login / Register</span>
            </div>
          )}
          <Link href="/wishlist" className="hidden md:flex items-center gap-2 cursor-pointer relative hover:text-primary transition">
            <div className="relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-sm font-medium">Wishlist</span>
          </Link>
          <div 
            className="flex items-center gap-2 cursor-pointer relative hover:text-primary transition"
            onClick={() => setIsCartOpen(true)}
          >
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
      <div className="bg-white py-3 px-4 md:px-8 flex items-center shadow-sm relative">
        <button 
          onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          className="bg-primary text-white px-6 py-2 rounded-md flex items-center gap-2 font-medium hover:bg-primary-dark transition relative"
        >
          <Menu size={20} />
          All Categories
        </button>

        {isCategoryDropdownOpen && (
          <div className="absolute top-full left-4 md:left-8 w-64 bg-white border border-gray-100 shadow-xl rounded-b-lg z-50 py-2">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/category/${cat.name.toLowerCase()}`}
                onClick={() => setIsCategoryDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
        
        <nav className="hidden lg:flex items-center ml-8 space-x-6 text-sm font-semibold text-gray-700">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <Link href="/shop" className="hover:text-primary transition">Shop</Link>
          {categories.slice(0, 6).map((cat) => (
            <Link href={`/category/${cat.name.toLowerCase()}`} key={cat.id} className="hover:text-primary transition flex items-center gap-1">
              {cat.name}
            </Link>
          ))}
          <Link href="/deals" className="flex items-center gap-1 hover:text-primary transition">Deals</Link>
        </nav>
      </div>

      {/* Mobile Search Bar (Only visible on mobile) */}
      <div className="md:hidden bg-white px-4 py-2 border-b">
        <form action="/search" className="flex w-full relative">
          <input
            type="text"
            name="q"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
          <button type="submit" className="bg-primary text-white px-4 rounded-r-md hover:bg-primary-dark transition flex items-center justify-center">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-around items-center py-2 px-1 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link href="/" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/' ? 'text-primary' : 'text-gray-500'}`}>
          <div className="w-6 h-6 flex justify-center"><ShoppingCart size={22} /></div>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/search' ? 'text-primary' : 'text-gray-500'}`}>
          <div className="w-6 h-6 flex justify-center"><Search size={22} /></div>
          <span className="text-[10px] font-medium">Search</span>
        </Link>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 p-2 text-gray-500 relative"
        >
          <div className="relative w-6 h-6 flex justify-center">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </button>
        <Link href="/wishlist" className={`flex flex-col items-center gap-1 p-2 relative ${pathname === '/wishlist' ? 'text-primary' : 'text-gray-500'}`}>
          <div className="relative w-6 h-6 flex justify-center">
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Wishlist</span>
        </Link>
        {isAuthenticated ? (
          <Link href="/profile" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/profile' ? 'text-primary' : 'text-gray-500'}`}>
            <div className="w-6 h-6 flex justify-center"><User size={22} /></div>
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="flex flex-col items-center gap-1 p-2 text-gray-500"
          >
            <div className="w-6 h-6 flex justify-center"><User size={22} /></div>
            <span className="text-[10px] font-medium">Login</span>
          </button>
        )}
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
