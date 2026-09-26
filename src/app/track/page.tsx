'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Package, Truck, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      let fetchId = orderId.trim();
      if (!fetchId.startsWith('#')) {
        fetchId = `#${fetchId}`;
      }

      const encodedId = encodeURIComponent(fetchId);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://167.233.34.127:8000/api';
      const res = await fetch(`${apiUrl}/orders/${encodedId}/`);
      
      if (!res.ok) {
        if (res.status === 404) {
          setError('Order not found. Please check your Order ID and try again.');
        } else {
          setError('Failed to fetch order details. Please try again later.');
        }
      } else {
        const data = await res.json();
        setOrderData(data);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'pending') return 1;
    if (s === 'processing') return 2;
    if (s === 'shipped') return 3;
    if (s === 'delivered') return 4;
    return 0;
  };

  const renderTimeline = (status: string) => {
    if (status.toLowerCase() === 'cancelled') {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-red-500">
          <XCircle size={64} className="mb-4" />
          <h3 className="text-2xl font-bold">Order Cancelled</h3>
          <p className="text-gray-500 mt-2 text-center">This order has been cancelled and will not be delivered.</p>
        </div>
      );
    }

    const currentStep = getStatusStep(status);
    const steps = [
      { id: 1, label: 'Order Placed', icon: Clock },
      { id: 2, label: 'Processing', icon: Package },
      { id: 3, label: 'Shipped', icon: Truck },
      { id: 4, label: 'Delivered', icon: CheckCircle2 },
    ];

    return (
      <div className="py-8">
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full hidden md:block"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full hidden md:block transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 md:gap-0">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300 z-10 ${isActive ? 'bg-primary border-green-100 text-white shadow-md' : 'bg-white border-gray-100 text-gray-400'}`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className={`font-bold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</p>
                    {isCurrent && <p className="text-xs text-primary font-medium mt-1">Current Status</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-500">Enter your order ID below to check the current status of your delivery.</p>
        </div>

        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <form onSubmit={handleTrack} className="flex gap-3 max-w-lg mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. #BS-123456" 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium border border-red-100">
              {error}
            </div>
          )}

          {orderData && (
            <div className="mt-12 border-t pt-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <h2 className="text-2xl font-bold text-gray-900">{orderData.id}</h2>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-xl font-bold text-primary">৳{parseFloat(orderData.amount).toFixed(2)}</p>
                </div>
              </div>

              {renderTimeline(orderData.status)}

              <div className="mt-10 bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Order Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <span className="text-gray-500 text-sm block mb-1">Customer Name</span>
                    <span className="font-medium text-gray-900">{orderData.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block mb-1">Payment Method</span>
                    <span className="font-medium text-gray-900">{orderData.payment_method}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm block mb-1">Order Date</span>
                    <span className="font-medium text-gray-900">
                      {new Date(orderData.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
