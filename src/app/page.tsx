import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryCarousel from '@/components/CategoryCarousel';
import PromoBanners from '@/components/PromoBanners';
import FeaturedProducts from '@/components/FeaturedProducts';
import Features from '@/components/Features';
import ExploreMore from '@/components/ExploreMore';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <CategoryCarousel />
        <PromoBanners />
        <FeaturedProducts />
        <Features />
        <ExploreMore />
      </main>

      <Footer />
    </div>
  );
}
