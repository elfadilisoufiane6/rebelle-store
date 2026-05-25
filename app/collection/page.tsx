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
    span: "md:row-span-2 aspect-[3/4] md:aspect-auto md:h-full",
  },
  {
    src: "/assets/images/gallery/4.jpeg",
    moment: "L'après-midi",
    slug: "lv-carryall",
    span: "aspect-[4/3]",
  },
  {
    src: "/assets/images/gallery/3.png",
    moment: "La soirée",
    slug: "lv-catchy-pm",
    span: "aspect-[4/3]",
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

        {/* Section label only — let the photography do the talking */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 text-center mb-12 lg:mb-16">
          <AnimatedSection>
            <h1 className="text-[10px] tracking-[0.28em] uppercase text-[#C4956A]">
              Collection
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {lookbookMoments.map((item) => {
                const product = products.find((p) => p.slug === item.slug);
                if (!product) return null;
                return (
                  <Link
                    key={item.src}
                    href={`/produits/${product.slug}`}
                    className={`relative overflow-hidden rounded-3xl group block ${item.span}`}
                    aria-label={`${item.moment} — ${product.shortName}`}
                  >
                    {/* Lifestyle image background */}
                    <Image
                      src={item.src}
                      alt={`Lookbook Rebelle — ${product.shortName}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                    {/* Top-left moment label */}
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <div className="w-6 h-px bg-[#C4956A]" />
                      <span className="text-[10px] tracking-[0.22em] uppercase text-white/90">
                        {item.moment}
                      </span>
                    </div>

                    {/* Hover-revealed maison signature */}
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span
                        className="font-cormorant italic text-[#C4956A] text-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] select-none"
                        aria-label="Be bold. Be elegant. Be Rebelle."
                      >
                        {BRAND_SIGNATURE}
                      </span>
                    </div>

                    {/* Product card overlay — always visible */}
                    <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-2xl p-3 border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
                      <div className="relative w-12 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-[#FAF6F2]">
                        <Image
                          src={product.images[0]}
                          alt={product.shortName}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-cormorant text-charcoal text-sm leading-tight truncate">
                          {product.shortName}
                        </p>
                        <p className="text-[10px] tracking-[0.14em] uppercase text-[#C4956A] mt-0.5">
                          Dès 699 DH
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
