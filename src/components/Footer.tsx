'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 text-center text-sm">
      <div className="container mx-auto px-4">
        <p className="opacity-80">&copy; 2026 Bangla Store. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4 opacity-70">
          <a href="#" className="hover:opacity-100 transition">Privacy Policy</a>
          <a href="#" className="hover:opacity-100 transition">Terms of Service</a>
          <a href="#" className="hover:opacity-100 transition">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
