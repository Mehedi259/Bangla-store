'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Package, Settings, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User size={40} className="text-primary" />
                </div>
                <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left font-medium text-primary bg-primary/5 rounded-lg transition">
                  <Package size={20} /> My Orders
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition">
                  <Settings size={20} /> Account Settings
                </button>
                <button 
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left font-medium text-red-500 hover:bg-red-50 rounded-lg transition mt-2 border-t border-gray-50"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Recent Orders</h2>
              
              <div className="space-y-6">
                {/* Mock Order 1 */}
                <div className="border rounded-lg p-4">
                  <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Order ID: <span className="font-medium text-gray-800">#ORD-582910</span></p>
                      <p className="text-sm text-gray-500">Date: <span className="font-medium text-gray-800">Sept 01, 2026</span></p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Delivered</span>
                      <p className="font-bold text-gray-800 mt-1">€24.99</p>
                    </div>
                  </div>
                  <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
                    <img src="/images/product_hilsa.jpg" alt="Item" className="w-16 h-16 object-cover rounded-md border" />
                    <img src="/images/product_rice.jpg" alt="Item" className="w-16 h-16 object-cover rounded-md border" />
                  </div>
                </div>

                {/* Mock Order 2 */}
                <div className="border rounded-lg p-4">
                  <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Order ID: <span className="font-medium text-gray-800">#ORD-109283</span></p>
                      <p className="text-sm text-gray-500">Date: <span className="font-medium text-gray-800">Aug 28, 2026</span></p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Processing</span>
                      <p className="font-bold text-gray-800 mt-1">€12.50</p>
                    </div>
                  </div>
                  <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
                    <img src="/images/product_tea.jpg" alt="Item" className="w-16 h-16 object-cover rounded-md border" />
                  </div>
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
