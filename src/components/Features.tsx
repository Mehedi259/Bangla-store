'use client';

import React from 'react';
import { Truck, ShieldCheck, Clock, HeadphonesIcon } from 'lucide-react';

export default function Features() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      
      {/* Delivery Banner */}
      <div className="bg-[#EAF6E3] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between mb-16 relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="bg-white p-3 rounded-full hidden md:block">
            <Truck className="text-primary" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Fast & Reliable Delivery Across Netherlands</h3>
            <p className="text-gray-600 mt-1">We make sure you get your favorite Bangladeshi products, fresh and on time.</p>
          </div>
        </div>
        <button className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition z-10">
          Learn More
        </button>
      </div>

      {/* Why Choose Bangla Store */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 relative inline-block">
          <span className="bg-white px-4 relative z-10">Why Choose Bangla Store?</span>
          <div className="absolute top-1/2 left-[-50px] right-[-50px] h-[1px] bg-gray-200 z-0"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <ShieldCheck size={24} className="text-primary" />, title: 'Quality Products', desc: 'Fresh & authentic Bangladeshi products' },
          { icon: <ShieldCheck size={24} className="text-primary" />, title: 'Trusted & Safe', desc: '100% secure shopping experience' },
          { icon: <Clock size={24} className="text-primary" />, title: 'Fast Delivery', desc: 'Quick & reliable service across Netherlands' },
          { icon: <HeadphonesIcon size={24} className="text-primary" />, title: 'Customer Support', desc: 'Friendly support for all your needs' }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left shadow-sm">
            <div className="bg-[#EAF6E3] p-3 rounded-full flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
