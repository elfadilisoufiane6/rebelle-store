"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function BestSellers() {
  return (
    <section id="collection" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <span className="text-luxury-xs text-[#C4956A] block mb-4">
            Collection Exclusive
          </span>
          <h2 className="font-cormorant font-light text-charcoal leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
            Nos pièces d&apos;exception
          </h2>
          <div className="luxury-divider-center mb-6" />
          <p className="font-montserrat text-sm text-charcoal/50 max-w-md mx-auto leading-relaxed">
            Chaque sac est conçu pour la femme qui choisit la qualité sans compromis.
          </p>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection delay={0.1} className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {["Tous", "Bestsellers", "Nouveautés", "Sacs à main", "Mini sacs"].map(
            (tab, i) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`text-luxury-xs px-5 py-2.5 rounded-full transition-all duration-300 ${
                  i === 0
                    ? "bg-[#810B38] text-white shadow-burgundy"
                    : "bg-[#FAF6F2] text-charcoal/60 hover:bg-[#810B38] hover:text-white hover:shadow-burgundy border border-[#F0E9E1]"
                }`}
              >
                {tab}
              </motion.button>
            )
          )}
        </AnimatedSection>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.2} className="mt-16 text-center">
          <p className="font-cormorant text-xl text-charcoal/50 italic mb-6">
            &ldquo;L&apos;élégance, c&apos;est ce que vous portez, c&apos;est qui vous êtes.&rdquo;
          </p>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-flex items-center gap-2 bg-[#810B38] text-white text-luxury-xs px-10 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] hover:shadow-burgundy-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            Voir toute la collection sur WhatsApp
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
