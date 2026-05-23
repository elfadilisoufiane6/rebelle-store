"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BRAND_SIGNATURE } from "@/lib/constants";

export default function BestSellers() {
  return (
    <section id="collection" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A] mb-4">
            La collection
          </p>
          <h2
            className="font-cormorant font-medium text-charcoal leading-[1.05]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            Nos pièces d&apos;exception.
          </h2>
          <p className="font-montserrat text-sm text-charcoal/55 max-w-lg mx-auto leading-relaxed mt-5">
            Six sacs choisis pour la femme qui ne veut pas choisir entre
            qualité, élégance et accessibilité. Paiement à la livraison.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index}
            />
          ))}
        </div>

        <AnimatedSection delay={0.15} className="mt-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 h-px bg-[#C4956A]/40" />
            <p
              className="font-cormorant italic text-[#C4956A] text-xl lg:text-2xl tracking-wide select-none"
              aria-label="Be bold. Be elegant. Be Rebelle."
            >
              {BRAND_SIGNATURE}
            </p>
            <div className="w-10 h-px bg-[#C4956A]/40" />
          </div>
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-[#810B38] text-[11px] tracking-[0.18em] uppercase font-medium hover:gap-3 transition-all duration-300"
          >
            Voir toute la collection
            <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
