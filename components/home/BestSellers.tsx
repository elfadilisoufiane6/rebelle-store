"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function BestSellers() {
  return (
    <section id="collection" className="pt-10 lg:pt-14 pb-20 lg:pb-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8 lg:mb-12">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
            Collection
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index}
            />
          ))}
        </div>

        <AnimatedSection delay={0.15} className="mt-16 text-center">
          <Link
            href="/collection"
            className="inline-flex items-center gap-3 text-charcoal/70 hover:text-[#810B38] text-[10px] tracking-[0.22em] uppercase font-medium transition-colors duration-300"
          >
            Toute la collection
            <ArrowRight size={12} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
