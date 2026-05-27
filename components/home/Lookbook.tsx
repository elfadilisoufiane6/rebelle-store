"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { products } from "@/lib/products";

// Lookbook moments — shared across the storefront. Each tile pairs a
// lifestyle image with the product it's selling so the slider doubles
// as a story-driven entry point into the collection.
// Tiles with src: "" render a cream placeholder ("Bientôt") so new
// moments can be wired in before the photography ships.
type Moment = { src: string; moment: string; slug: string };

const moments: Moment[] = [
  {
    src: "/assets/images/gallery/le-quotidien.jpg",
    moment: "Le quotidien",
    slug: "lv-carryall",
  },
  {
    src: "/assets/images/gallery/l-apres-midi.jpg",
    moment: "L'après-midi",
    slug: "lv-catchy-pm",
  },
  {
    src: "/assets/images/gallery/la-soiree.jpg",
    moment: "La soirée",
    slug: "coach-tabby-brown",
  },
  {
    src: "/assets/images/gallery/le-rendez-vous.jpg",
    moment: "Le rendez-vous",
    slug: "gucci-marmont-noir",
  },
  {
    src: "/assets/images/gallery/le-voyage.jpg",
    moment: "Le voyage",
    slug: "lv-alma-bb-epi",
  },
  {
    src: "/assets/images/gallery/le-brunch.jpg",
    moment: "Le brunch",
    slug: "gucci-ophidia-mini",
  },
];

export default function Lookbook() {
  return (
    <section
      id="lookbook"
      className="bg-white py-20 lg:py-28 overflow-hidden"
      aria-label="Lookbook Rebelle"
    >
      {/* Editorial header — centered */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-10 lg:mb-12">
        <AnimatedSection>
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold mb-3">
            Lookbook
          </p>
          <h2
            className="font-cormorant font-light text-charcoal leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Édition{" "}
            <em className="not-italic font-semibold text-[#810B38]">2026</em>.
          </h2>
        </AnimatedSection>
      </div>

      {/* Horizontal scroll-snap slider — full-bleed, no library */}
      <AnimatedSection delay={0.05}>
        <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory">
          <div className="flex gap-3 sm:gap-5 lg:gap-6 px-6 lg:px-8 w-max">
            {moments.map((item) => {
              const product = products.find((p) => p.slug === item.slug);
              if (!product) return null;
              return (
                <Link
                  key={`${item.slug}-${item.moment}`}
                  href={`/produits/${product.slug}`}
                  className="group block flex-shrink-0 snap-start w-[78vw] sm:w-[44vw] lg:w-[32vw] xl:w-[400px]"
                  aria-label={`${item.moment} — ${product.shortName}`}
                >
                  <div className="relative aspect-[4/5] bg-[#FAF6F2] rounded-2xl overflow-hidden">
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={`Lookbook Rebelle — ${product.shortName}`}
                        fill
                        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 400px"
                        className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    ) : (
                      // Placeholder — cream frame with a subtle "Bientôt"
                      // mark. Replace src in the moments array when the
                      // editorial shoot is delivered.
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#C4956A]/70">
                        <span className="w-8 h-px bg-[#C4956A]/60" />
                        <span className="font-cormorant italic text-2xl">
                          Bientôt
                        </span>
                        <span className="text-[9px] tracking-[0.28em] uppercase text-charcoal/30">
                          Édition 2026
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 sm:mt-4 flex items-center justify-between gap-3 px-0.5">
                    <div className="min-w-0">
                      <p className="text-[9px] tracking-[0.22em] uppercase text-[#C4956A] mb-0.5">
                        {item.moment}
                      </p>
                      <p className="font-cormorant text-charcoal text-[15px] sm:text-base truncate">
                        {product.shortName}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-[#810B38] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* "Voir tout" — under the slider, centered (header is centered too) */}
      <div className="max-w-7xl mx-auto px-6 mt-10 lg:mt-12 text-center">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 text-charcoal/70 hover:text-[#810B38] text-[10px] tracking-[0.22em] uppercase font-medium transition-colors duration-300"
        >
          Voir tout
          <ArrowRight size={12} />
        </Link>
      </div>
    </section>
  );
}
