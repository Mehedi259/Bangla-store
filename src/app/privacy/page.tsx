import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 prose max-w-none text-gray-600">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">At Bangla Store, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes your name, email, shipping address, and payment details.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">We use your information strictly to process orders, deliver products, communicate with you regarding your purchases, and improve our services.</p>
          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">3. Data Protection</h2>
          <p className="mb-4">We implement industry-standard security measures to protect your personal information. We do not sell or share your data with third parties except as necessary to fulfill your orders (e.g., shipping partners).</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
