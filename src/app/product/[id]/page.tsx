'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/types';
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${unwrappedParams.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [unwrappedParams.id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : product ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-8 flex gap-2">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <span>/</span>
              <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-primary transition capitalize">{product.category}</Link>
              <span>/</span>
              <span className="text-gray-800 font-medium">{product.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Image Gallery */}
              <div className="md:w-1/2">
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 h-[400px] flex items-center justify-center relative">
                  {product.isBestSeller && (
                    <span className="absolute top-4 left-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-md z-10">
                      Best Seller
                    </span>
                  )}
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-4">Category: <span className="font-medium text-primary">{product.category}</span></p>
                
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  €{product.price.toFixed(2)}
                  <span className="text-sm font-normal text-gray-500 ml-2">{product.weight}</span>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Experience the authentic taste of Bangladesh with our premium {product.name}. 
                  Sourced directly for the best quality and freshness, perfect for your daily needs.
                </p>

                {/* Add to Cart Actions */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-100 rounded-l-lg transition font-medium">-</button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-100 rounded-r-lg transition font-medium">+</button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                  <button 
                    onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                    className="p-3 border border-gray-300 rounded-lg transition hover:border-primary"
                  >
                    <Heart size={20} className={isInWishlist(product.id) ? "fill-primary text-primary" : "text-gray-500"} />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg text-gray-500 hover:text-blue-500 hover:border-blue-500 transition">
                    <Share2 size={20} />
                  </button>
                </div>

                {/* Guarantees */}
                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Truck className="text-primary" size={20} />
                    <span>Free delivery on orders over €50</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <ShieldCheck className="text-primary" size={20} />
                    <span>100% Secure Checkout</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
            <Link href="/" className="text-primary hover:underline mt-4 inline-block">Return to Home</Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
