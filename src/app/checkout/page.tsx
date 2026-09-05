'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md w-full">
            <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 mb-6">Thank you for shopping at Bangla Store. Your order is being processed.</p>
            <Link href="/" className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition inline-block">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input required type="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-primary focus:outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                <input required type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-primary focus:outline-none" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4 mt-8 border-b pb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 bg-green-50 border-primary">
                  <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary h-4 w-4" />
                  <span className="font-medium">Credit / Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" />
                  <span className="font-medium">iDEAL</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>

              <button 
                type="submit"
                disabled={cart.length === 0}
                className="w-full mt-8 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-medium">{item.quantity}x</span>
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>€5.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t text-gray-800">
                  <span>Total</span>
                  <span>€{(cartTotal + (cartTotal > 0 ? 5 : 0)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
