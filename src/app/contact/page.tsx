'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h1>
        <p className="text-gray-500 text-center mb-10">We'd love to hear from you. Get in touch with our team!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Our Location</h3>
                <p className="text-gray-600 mt-1">Amsterdam, Netherlands<br/>(Online Operations)</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Email Support</h3>
                <p className="text-gray-600 mt-1">support@banglastore.nl</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Phone</h3>
                <p className="text-gray-600 mt-1">+31 20 123 4567<br/><span className="text-sm">Mon-Fri, 9am - 5pm</span></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
