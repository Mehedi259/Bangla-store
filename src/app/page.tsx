import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryCarousel from '@/components/CategoryCarousel';
import PromoBanners from '@/components/PromoBanners';
import ProductRow from '@/components/ProductRow';
import Features from '@/components/Features';
import ExploreMore from '@/components/ExploreMore';
import Footer from '@/components/Footer';
import { featuredProducts } from '@/data/mockData';
import { Star, Fish, Flame, Cookie, Cake, Leaf } from 'lucide-react';

export default function Home() {
  // Filter products by category
  const bestSellers = featuredProducts.slice(0, 5); // Just take first 5 as featured
  const fishProducts = featuredProducts.filter(p => p.category === 'Frozen Fish');
  const spiceProducts = featuredProducts.filter(p => p.category === 'Spices & Masala');
  const snackProducts = featuredProducts.filter(p => p.category === 'Snacks & Biscuits');
  const sweetProducts = featuredProducts.filter(p => p.category === 'Sweets & Desserts');
  const vegProducts = featuredProducts.filter(p => p.category === 'Fresh Vegetables');

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <ExploreMore />
        <PromoBanners />
        
        <div className="space-y-4 py-8">
          <ProductRow title="Featured Products" categorySlug="all" products={bestSellers} icon={<Star size={24} />} />
          <ProductRow title="Fresh Vegetables" categorySlug="fresh vegetables" products={vegProducts} icon={<Leaf size={24} />} />
          <ProductRow title="Snacks & Biscuits" categorySlug="snacks & biscuits" products={snackProducts} icon={<Cookie size={24} />} />
          <ProductRow title="Sweets & Desserts" categorySlug="sweets & desserts" products={sweetProducts} icon={<Cake size={24} />} />
          <ProductRow title="Spices & Masala" categorySlug="spices & masala" products={spiceProducts} icon={<Flame size={24} />} />
          <ProductRow title="Frozen Fish" categorySlug="frozen fish" products={fishProducts} icon={<Fish size={24} />} />
        </div>

        <Features />
        <CategoryCarousel />
      </main>

      <Footer />
    </div>
  );
}
