'use client';

import React from 'react';
import { getCategories } from '../data/api';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function ExploreMore() {
  const [categories, setCategories] = React.useState<any[]>([]);

  React.useEffect(() => {
    getCategories().then((data) => {
      // Optional: you can filter or slice the categories if you want, 
      // but here we'll just show all or the first few. Let's show all.
      setCategories(data);
    });
  }, []);

  const getImageUrl = (url: string) => {
    if (!url) return '/images/explore_vegetables.jpg'; // fallback
    if (url.startsWith('/images/')) return `http://167.233.34.127:3000${url}`;
    if (url.startsWith('/media/')) return `http://167.233.34.127:8000${url}`;
    return url;
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 mb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Leaf className="text-primary" size={24} />
          Shop by Category
        </h2>
        <p className="text-gray-500 text-sm mt-1">Everything You Need, All in One Place</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((item, index) => (
          <Link href={`/category/${item.name.toLowerCase()}`} key={item.id || index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group border border-gray-100 block">
            <div className="h-32 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
              <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-3 text-center">
              <h4 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h4>
              <span className="text-xs text-gray-500 group-hover:text-primary transition inline-block">Shop Now →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
