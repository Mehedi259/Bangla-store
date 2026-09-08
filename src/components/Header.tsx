'use client';

import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, ChevronDown, MapPin, Truck, Lock, Home, ShoppingBag, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryDropdownOpen, setIsMobileCategoryDropdownOpen] = useState(false);

  return (
    <header className="w-full flex flex-col relative md:sticky top-0 z-40 bg-[#032B18] text-white">
      {/* Desktop Main Header */}
      <div className="py-5 px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-white hover:text-gray-200 transition" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-2xl">
            <ShoppingCart className="text-[#84CC16]" size={28} />
            <span className="leading-none tracking-tight">BanglaStore</span>
          </Link>
        </div>

        {/* Desktop Search */}
        <form action="/search" className="hidden lg:flex flex-1 max-w-2xl mx-12 bg-[#064027] rounded-full px-2 py-1 items-center border border-white/10 focus-within:border-[#84CC16]/50 transition-colors">
          <div 
            className="flex items-center px-4 border-r border-white/20 cursor-pointer group"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            <span className="text-sm text-gray-300 mr-2 group-hover:text-white transition">All categories</span>
            <ChevronDown size={14} className="text-gray-300 group-hover:text-white transition" />
          </div>
          {isCategoryDropdownOpen && (
            <div className="absolute top-16 left-[30%] w-64 bg-white border border-gray-100 shadow-xl rounded-lg z-50 py-2 text-gray-800">
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/category/${cat.name.toLowerCase()}`}
                  onClick={() => setIsCategoryDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
          <input
            type="text"
            name="q"
            placeholder="Search for products..."
            className="bg-transparent flex-1 px-4 text-white placeholder-gray-400 focus:outline-none text-sm"
          />
          <button type="submit" className="p-2 text-white/80 hover:text-white transition">
            <Search size={20} />
          </button>
        </form>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6 text-white/90">
          <Link href="/wishlist" className="relative hover:text-[#84CC16] transition cursor-pointer">
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#84CC16] text-[#032B18] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>
          <div 
            className="relative hover:text-[#84CC16] transition cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#84CC16] text-[#032B18] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>
          {isAuthenticated ? (
            <Link href="/profile" className="hover:text-[#84CC16] transition cursor-pointer flex items-center gap-2">
              <User size={22} />
            </Link>
          ) : (
            <div onClick={() => setIsAuthOpen(true)} className="hover:text-[#84CC16] transition cursor-pointer">
              <User size={22} />
            </div>
          )}
        </div>

        {/* Mobile top-right icons (cart & search toggle) */}
        <div className="flex md:hidden items-center gap-4">
          <div onClick={() => setIsCartOpen(true)} className="relative text-white">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#84CC16] text-[#032B18] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex justify-center items-center pb-4 w-full">
        <nav className="flex items-center space-x-8 text-sm font-medium text-gray-300">
          <Link href="/" className={`pb-1 border-b-2 ${pathname === '/' ? 'text-white border-[#84CC16]' : 'border-transparent hover:text-white hover:border-white/30 transition'}`}>Home</Link>
          <Link href="/shop" className={`pb-1 border-b-2 ${pathname === '/shop' ? 'text-white border-[#84CC16]' : 'border-transparent hover:text-white hover:border-white/30 transition'}`}>Shop</Link>
          {categories.slice(0, 5).map((cat) => (
            <Link key={cat.id} href={`/category/${cat.name.toLowerCase()}`} className={`pb-1 border-b-2 ${pathname === `/category/${cat.name.toLowerCase()}` ? 'text-white border-[#84CC16]' : 'border-transparent hover:text-white hover:border-white/30 transition'}`}>
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Search Bar (Only visible on mobile) */}
      <div className="md:hidden bg-[#064027] px-4 py-3">
        <form action="/search" className="flex w-full relative bg-white/10 rounded-lg p-1 border border-white/20 focus-within:border-[#84CC16]/50">
          <div 
            className="flex items-center px-3 border-r border-white/20 cursor-pointer group"
            onClick={() => setIsMobileCategoryDropdownOpen(!isMobileCategoryDropdownOpen)}
          >
            <span className="text-xs text-gray-300 mr-1 group-hover:text-white transition">All</span>
            <ChevronDown size={14} className="text-gray-300 group-hover:text-white transition flex-shrink-0" />
          </div>
          {isMobileCategoryDropdownOpen && (
            <div className="absolute top-12 left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-lg z-50 py-2 text-gray-800">
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/category/${cat.name.toLowerCase()}`}
                  onClick={() => setIsMobileCategoryDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
          <input
            type="text"
            name="q"
            placeholder="Search products..."
            className="w-full bg-transparent py-1.5 px-4 focus:outline-none text-white placeholder-gray-400 text-sm"
          />
          <button type="submit" className="text-white/80 px-3 hover:text-white transition flex items-center justify-center">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Mobile Bottom Navigation Bar (Floating Pill) */}
      <div className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-max min-w-[300px] bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-full z-50 flex justify-center items-center gap-5 py-2.5 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <Link href="/" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/' ? 'text-[#006838]' : 'text-gray-400 hover:text-gray-600 transition-colors'}`}>
          <div className="w-6 h-6 flex justify-center"><Home size={22} strokeWidth={pathname === '/' ? 2.5 : 2} /></div>
          <span className="text-[10px] font-medium text-gray-800">Home</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/search' ? 'text-[#006838]' : 'text-gray-400 hover:text-gray-600 transition-colors'}`}>
          <div className="w-6 h-6 flex justify-center"><Search size={22} strokeWidth={pathname === '/search' ? 2.5 : 2} /></div>
          <span className="text-[10px] font-medium text-gray-800">Search</span>
        </Link>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
        >
          <div className="relative w-6 h-6 flex justify-center">
            <ShoppingBag size={22} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium text-gray-800">Cart</span>
        </button>
        <Link href="/wishlist" className={`flex flex-col items-center gap-1 p-2 relative ${pathname === '/wishlist' ? 'text-[#006838]' : 'text-gray-400 hover:text-gray-600 transition-colors'}`}>
          <div className="relative w-6 h-6 flex justify-center">
            <Heart size={22} strokeWidth={pathname === '/wishlist' ? 2.5 : 2} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#006838] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium text-gray-800">Wishlist</span>
        </Link>
        {isAuthenticated ? (
          <Link href="/profile" className={`flex flex-col items-center gap-1 p-2 ${pathname === '/profile' ? 'text-[#006838]' : 'text-gray-400 hover:text-gray-600 transition-colors'}`}>
            <div className="w-6 h-6 flex justify-center"><User size={22} strokeWidth={pathname === '/profile' ? 2.5 : 2} /></div>
            <span className="text-[10px] font-medium text-gray-800">Profile</span>
          </Link>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <div className="w-6 h-6 flex justify-center"><User size={22} strokeWidth={2} /></div>
            <span className="text-[10px] font-medium text-gray-800">Login</span>
          </button>
        )}
      </div>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-64 max-w-sm bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#032B18] text-white">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-gray-300">
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4 pb-20">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Main</h3>
                  <div className="space-y-1">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition font-medium">Home</Link>
                    <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition font-medium">Shop</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.id} 
                        href={`/category/${cat.name.toLowerCase()}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md transition font-medium"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
