import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Lookbook from "@/components/home/Lookbook";
import BestSellers from "@/components/home/BestSellers";
import BrandStory from "@/components/home/BrandStory";
import LuxuryBanner from "@/components/home/LuxuryBanner";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Lookbook />
      <BestSellers />
      <BrandStory />
      <LuxuryBanner />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
