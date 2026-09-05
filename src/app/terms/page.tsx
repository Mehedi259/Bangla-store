import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 prose max-w-none text-gray-600">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">Welcome to Bangla Store! By accessing or using our website, you agree to be bound by these Terms of Service.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">1. User Accounts</h2>
          <p className="mb-4">You must create an account to place orders. You are responsible for maintaining the confidentiality of your account credentials.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">2. Pricing and Availability</h2>
          <p className="mb-4">All prices are shown in Euros (€). We strive to ensure accurate pricing and stock information, but we reserve the right to cancel orders if an error occurs.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">3. Delivery</h2>
          <p className="mb-4">We currently serve the Netherlands. Delivery times are estimates and may vary. Risk of loss passes to you upon delivery.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
