import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { products } from "@/lib/products";
import { BRAND_SIGNATURE } from "@/lib/constants";

const lookbookMoments = [
  {
    src: "/assets/images/gallery/2.png",
    moment: "Le quotidien",
    slug: "coach-tabby-brown",
  },
  {
    src: "/assets/images/gallery/4.png",
    moment: "L'après-midi",
    slug: "lv-carryall",
  },
  {
    src: "/assets/images/gallery/3.png",
    moment: "La soirée",
    slug: "lv-catchy-pm",
  },
];

export const metadata: Metadata = {
  title: "Collection — Rebelle",
  description:
    "Découvre la collection complète Rebelle — sacs de luxe sélectionnés pour la femme moderne au Maroc. Paiement à la livraison.",
};

export default function CollectionPage() {
  return (
    <main className="bg-white">
      <Navbar />

      <div className="pt-24 lg:pt-32 pb-24">
        {/* Editorial header banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 lg:mb-16">
          <AnimatedSection>
            <div className="relative h-[34vh] min-h-[260px] lg:h-[44vh] rounded-3xl overflow-hidden">
              <Image
                src="/assets/images/gallery/1.png"
                alt="Collection Rebelle"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-8 lg:px-14 max-w-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-px bg-[#C4956A]" />
                    <span className="text-[10px] tracking-[0.22em] uppercase text-[#C4956A]">
                      Lookbook 2026
                    </span>
                  </div>
                  <p
                    className="font-cormorant italic text-[#C4956A] tracking-wide select-none"
                    style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}
                    aria-label="Be bold. Be elegant. Be Rebelle."
                  >
                    {BRAND_SIGNATURE}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Editorial header — brand mark + season title */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 text-center mb-12 lg:mb-16">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#810B38]" />
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
                Maison Rebelle
              </span>
              <span className="w-6 h-px bg-[#810B38]" />
            </div>
            <h1
              className="font-cormorant font-light text-charcoal leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Édition <em className="not-italic text-[#810B38]">2026</em>.
            </h1>
          </AnimatedSection>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Shop the look — lifestyle imagery paired with featured products */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 lg:mt-32">
          <AnimatedSection className="text-center mb-10 lg:mb-12">
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#C4956A]">
              Lookbook
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8">
              {lookbookMoments.map((item) => {
                const product = products.find((p) => p.slug === item.slug);
                if (!product) return null;
                return (
                  <Link
                    key={item.src}
                    href={`/produits/${product.slug}`}
                    className="group block"
                    aria-label={`${item.moment} — ${product.shortName}`}
                  >
                    {/* Image — full bleed, no crops, contained in a clean cream frame */}
                    <div className="relative aspect-[4/5] bg-[#FAF6F2] rounded-2xl overflow-hidden">
                      <Image
                        src={item.src}
                        alt={`Lookbook Rebelle — ${product.shortName}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Caption row — under the image, editorial */}
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
          </AnimatedSection>
        </section>

        {/* Bottom trust band — editorial stats */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mt-24 lg:mt-32">
          <AnimatedSection>
            <div className="rounded-3xl bg-[#FAF6F2] border border-[#F0E9E1] py-12 lg:py-16 px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { num: "500", accent: "+", label: "Clientes" },
                  { num: "4.9", accent: "", label: "Note moyenne" },
                  { num: "93", accent: "%", label: "À temps" },
                  { num: "7", accent: "j", label: "Retour" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-cormorant font-light text-[#810B38] text-[2.5rem] lg:text-[3rem] leading-none tabular-nums tracking-tight">
                      {stat.num}
                      {stat.accent && (
                        <span className="text-[#C4956A]">{stat.accent}</span>
                      )}
                    </p>
                    <span className="block w-6 h-px bg-[#C4956A]/50 mx-auto mt-3" />
                    <p className="text-[9px] tracking-[0.22em] uppercase text-charcoal/45 mt-2.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>

      <Footer />
    </main>
  );
}
