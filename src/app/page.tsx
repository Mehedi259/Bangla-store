import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryCarousel from '@/components/CategoryCarousel';
import PromoBanners from '@/components/PromoBanners';
import ProductRow from '@/components/ProductRow';
import Features from '@/components/Features';
import ExploreMore from '@/components/ExploreMore';
import Footer from '@/components/Footer';
import { getProducts, getCategories } from '@/data/api';
import { Product } from '@/types';
import * as Icons from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const featuredProducts: Product[] = await getProducts();
  const categories = await getCategories();
  
  // Filter products by category
  const bestSellers = featuredProducts.slice(0, 8); // Take first 8 as featured

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <CategoryCarousel />
        
        <div className="space-y-4 py-8">
          <ProductRow title="Featured Products" categorySlug="all" products={bestSellers} icon={<Icons.Star size={24} />} />
          
          {categories.map((cat: any) => {
            const catProducts = featuredProducts.filter(p => p.category === cat.name);
            if (catProducts.length === 0) return null;
            
            const IconComponent = (Icons as any)[cat.icon] || Icons.Layers;
            
            return (
              <ProductRow 
                key={cat.id}
                title={cat.name} 
                categorySlug={cat.name.toLowerCase()} 
                products={catProducts} 
                icon={<IconComponent size={24} />} 
              />
            );
          })}
        </div>

        <Features />
        <ExploreMore />
      </main>

      <Footer />
    </div>
  );
}
