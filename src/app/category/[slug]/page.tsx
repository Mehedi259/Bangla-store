'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const decodedCategoryName = decodeURIComponent(unwrappedParams.slug);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${unwrappedParams.slug}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [unwrappedParams.slug]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-primary mb-2 inline-block">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{decodedCategoryName}</h1>
          <p className="text-gray-500 mt-2">Showing all available products in {decodedCategoryName}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition flex flex-col relative group">
                <Link href={`/product/${product.id}`} className="block h-40 w-full relative mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${product.id}`} className="hover:text-primary transition">
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1">{product.name}</h3>
                    </Link>
                    <span className="text-xs text-gray-500">{product.weight}</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="font-bold text-lg">€{product.price.toFixed(2)}</div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded-md flex items-center justify-center gap-2 transition text-sm"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-gray-700">No products found in this category.</h2>
            <Link href="/" className="text-primary hover:underline mt-4 inline-block font-medium">Continue Shopping</Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
