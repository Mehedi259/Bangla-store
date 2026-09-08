'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, CreditCard, ShieldCheck, Truck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white mt-12">
      {/* Top Banner - Features */}
      <div className="bg-gray-900 py-8 border-b border-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
              <div className="bg-gray-800 p-3 rounded-full shadow-sm text-primary">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Fast & Reliable Delivery</h4>
                <p className="text-sm text-gray-400">Across Netherlands</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
              <div className="bg-gray-800 p-3 rounded-full shadow-sm text-primary">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Secure Payments</h4>
                <p className="text-sm text-gray-400">100% secure transactions</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
              <div className="bg-gray-800 p-3 rounded-full shadow-sm text-primary">
                <CreditCard size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Easy Returns</h4>
                <p className="text-sm text-gray-400">Hassle-free return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <span className="font-bold text-xl text-white tracking-tight">BanglaStore</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Your one-stop destination for authentic Bangladeshi and South Asian groceries in the Netherlands. We bring the taste of home right to your doorstep.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> Home</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> All Products</Link></li>
              <li><Link href="/category/fresh-vegetables" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> Fresh Vegetables</Link></li>
              <li><Link href="/category/frozen-fish" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> Frozen Fish</Link></li>
              <li><Link href="/deals" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> Special Deals</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5 relative inline-block">
              Customer Service
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h4>
            <ul className="space-y-3">
              <li><Link href="/profile" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> My Account</Link></li>
              <li><Link href="/orders" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> Track Order</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> FAQ</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> Return Policy</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition text-sm flex items-center gap-2"><span className="text-primary text-xs">▸</span> Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5 relative inline-block">
              Contact Info
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">123 Market Street, <br />1012 AB Amsterdam, <br />Netherlands</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">+31 20 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">support@banglastore.nl</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Bangla Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
