"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  ShoppingBag,
  Shield,
  Truck,
  RotateCcw,
  Star,
  Check,
  Flame,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductCard from "@/components/product/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  Product,
  products,
  OFFERS,
  OfferKey,
  DEFAULT_OFFER,
} from "@/lib/products";
import { useCart } from "@/context/CartContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedOffer, setSelectedOffer] =
    useState<OfferKey>(DEFAULT_OFFER);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const { addItem } = useCart();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  useEffect(() => {
    const onScroll = () => setShowStickyCTA(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAddToCart = () => {
    addItem(product, selectedOffer);
  };

  const reviews = [
    {
      name: "Nadia K.",
      city: "Casablanca",
      rating: 5,
      verified: true,
      date: "Il y a 3 jours",
      text: `Ce sac est exactement ce que je cherchais depuis des mois. La qualité est irréprochable et la livraison était rapide. Je recommande à 100%.`,
      offer: "2 sacs",
    },
    {
      name: "Sara H.",
      city: "Rabat",
      rating: 5,
      verified: true,
      date: "Il y a 1 semaine",
      text: `Encore plus beau en vrai. Le cuir est magnifique. Toutes mes amies me demandent où je l'ai trouvé !`,
      offer: "1 sac",
    },
    {
      name: "Imane T.",
      city: "Marrakech",
      rating: 5,
      verified: true,
      date: "Il y a 2 semaines",
      text: `J'ai pris 2 sacs à 699 DH, un pour moi et un pour ma sœur. On est très satisfaites toutes les deux.`,
      offer: "2 sacs",
    },
    {
      name: "Yasmine A.",
      city: "Tanger",
      rating: 5,
      verified: true,
      date: "Il y a 3 semaines",
      text: `Paiement à la livraison, sac magnifique, livreuse sympa. Tout est parfait. Je recommande sans hésiter.`,
      offer: "1 sac",
    },
  ];

  return (
    <main className="bg-white">
      <Navbar />

      <div className="pt-24 lg:pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6">
          <nav className="flex items-center gap-2" aria-label="Fil d'Ariane">
            {[
              { label: "Accueil", href: "/" },
              { label: "Collection", href: "/collection" },
              { label: product.shortName, href: "#" },
            ].map((crumb, i, arr) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href={crumb.href}
                      className="text-[10px] tracking-wider uppercase text-charcoal/40 hover:text-[#810B38] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                    <ChevronRight size={10} className="text-charcoal/30" />
                  </>
                ) : (
                  <span className="text-[10px] tracking-wider uppercase text-[#810B38]">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <AnimatedSection direction="left">
              <ProductGallery
                images={product.images}
                name={product.shortName}
              />
            </AnimatedSection>

            {/* Details */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex flex-col gap-6 lg:sticky lg:top-32">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A]">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="bg-[#810B38] text-white text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h1
                    className="font-cormorant font-medium text-charcoal leading-[1.05]"
                    style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
                  >
                    {product.name}
                  </h1>
                  <p className="font-cormorant italic text-[#C4956A] text-xl mt-1">
                    {product.tagline}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-[#C4956A] text-[#C4956A]"
                      />
                    ))}
                  </div>
                  <a
                    href="#reviews"
                    className="text-[11px] tracking-wider uppercase text-charcoal/55 hover:text-[#810B38] transition-colors"
                  >
                    {product.rating} · {product.reviewCount} avis vérifiés
                  </a>
                </div>

                {/* Scarcity + social proof */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[12px]">
                    <Flame size={12} className="text-[#810B38]" />
                    <span className="text-charcoal/70">
                      Plus que 5 pièces disponibles
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <Check size={12} className="text-emerald-600" />
                    <span className="text-charcoal/70">
                      23 femmes ont commandé aujourd&apos;hui
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-montserrat text-sm text-charcoal/60 leading-relaxed">
                  {product.description}
                </p>

                <div className="h-px bg-[#F0E9E1]" />

                {/* Offer selector */}
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-charcoal/50 mb-3">
                    Choisis ton offre
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {(["1piece", "2pieces", "3pieces"] as OfferKey[]).map(
                      (key) => {
                        const offer = OFFERS[key];
                        const selected = selectedOffer === key;
                        return (
                          <motion.button
                            key={key}
                            onClick={() => setSelectedOffer(key)}
                            whileTap={{ scale: 0.99 }}
                            className={`relative flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                              selected
                                ? "border-[#810B38] bg-gradient-to-r from-[#FAF6F2] to-[#F5EDE8]"
                                : "border-[#F0E9E1] bg-white hover:border-[#E8D5C4]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                  selected
                                    ? "border-[#810B38] bg-[#810B38]"
                                    : "border-charcoal/20"
                                }`}
                              >
                                {selected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 rounded-full bg-white"
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-montserrat font-semibold text-charcoal text-sm">
                                  {offer.label}
                                </p>
                                {offer.saving > 0 && (
                                  <p className="text-[10px] tracking-wider uppercase text-emerald-700 mt-0.5">
                                    Économise {offer.saving} DH
                                  </p>
                                )}
                              </div>
                              {offer.badge && (
                                <span className="hidden sm:inline-flex bg-[#C4956A] text-white text-[9px] tracking-wider uppercase px-2 py-1 rounded-full font-medium">
                                  {offer.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-cormorant font-bold text-[#810B38] text-2xl leading-none">
                                {offer.price} DH
                              </p>
                              {offer.saving > 0 && (
                                <p className="text-[10px] tracking-wider uppercase text-charcoal/40 mt-1">
                                  {Math.round(offer.perPiece)} DH /sac
                                </p>
                              )}
                            </div>
                          </motion.button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="group w-full flex items-center justify-center gap-3 bg-[#810B38] text-white font-montserrat font-semibold text-[12px] tracking-[0.14em] uppercase px-8 py-5 rounded-full hover:bg-[#5c0828] shadow-[0_10px_30px_rgba(129,11,56,0.35)] transition-all duration-300"
                >
                  <ShoppingBag size={14} />
                  Ajouter au panier
                </motion.button>

                <p className="text-[11px] text-center tracking-wider uppercase text-charcoal/45 -mt-2">
                  Paiement à la livraison · Livraison gratuite
                </p>

                {/* Trust pills */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: Shield, label: "COD" },
                    { icon: Truck, label: "2-4 jours" },
                    { icon: RotateCcw, label: "Retour 7j" },
                    { icon: Star, label: "Qualité" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-lg bg-[#FAF6F2] border border-[#F0E9E1]"
                    >
                      <Icon size={12} className="text-[#810B38]" />
                      <span className="text-[10px] tracking-wider uppercase text-charcoal/55">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* COD reassurance */}
                <div className="bg-[#FAF6F2] border-l-[3px] border-[#810B38] rounded-r-xl px-4 py-3.5 flex gap-3 items-start">
                  <Shield
                    size={16}
                    className="text-[#810B38] flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-wider text-charcoal">
                      Paiement à la livraison
                    </p>
                    <p className="text-[11px] text-charcoal/55 leading-relaxed mt-0.5">
                      Tu paies cash au livreur, quand le sac est dans tes mains.
                      Aucune avance.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Materials */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 lg:mt-32">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A] mb-3">
              Qualité irréfutable
            </p>
            <h2
              className="font-cormorant text-charcoal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Vérifiable à la réception.
            </h2>
            <p className="text-[12px] text-charcoal/50 mt-3 max-w-md mx-auto">
              Photographié en lumière naturelle. Ce que tu vois est exactement
              ce que tu reçois.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {product.materials.map((m, i) => (
              <AnimatedSection key={m} delay={i * 0.06}>
                <div className="flex items-start gap-3 p-5 rounded-2xl bg-[#FAF6F2] border border-[#F0E9E1] h-full">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8D5C4] flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-[#810B38]" />
                  </div>
                  <p className="text-[13px] text-charcoal/70 leading-relaxed">
                    {m}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-[11px] tracking-wider uppercase text-charcoal/50">
              Dimensions :{" "}
              <span className="text-charcoal">{product.dimensions}</span>
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mt-24 lg:mt-32 text-center">
          <AnimatedSection>
            <Sparkles
              size={16}
              className="text-[#C4956A] mx-auto mb-4"
            />
            <p
              className="font-cormorant italic text-charcoal leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              «&nbsp;{product.emotionalHook}&nbsp;»
            </p>
            <p className="text-[12px] text-charcoal/45 mt-4 tracking-wider uppercase">
              — {product.storyAngle}
            </p>
          </AnimatedSection>
        </section>

        {/* Reviews */}
        <section
          id="reviews"
          className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 lg:mt-32"
        >
          <AnimatedSection className="text-center mb-12">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A] mb-3">
              Avis vérifiés
            </p>
            <h2
              className="font-cormorant text-charcoal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {product.reviewCount} femmes ont parlé.
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[#C4956A] text-[#C4956A]"
                  />
                ))}
              </div>
              <span className="text-[12px] text-charcoal/55">
                {product.rating}/5 sur {product.reviewCount} avis
              </span>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={i * 0.06}>
                <div className="p-6 rounded-2xl bg-white border border-[#F0E9E1] h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#810B38] to-[#5c0828] text-white flex items-center justify-center font-cormorant text-base">
                        {r.name[0]}
                      </div>
                      <div>
                        <p className="font-montserrat font-semibold text-charcoal text-[13px]">
                          {r.name} · {r.city}
                        </p>
                        <p className="text-[10px] tracking-wider uppercase text-charcoal/40 mt-0.5">
                          {r.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className="fill-[#C4956A] text-[#C4956A]"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[13px] text-charcoal/70 leading-relaxed mb-3">
                    {r.text}
                  </p>
                  <div className="flex items-center justify-between text-[10px] tracking-wider uppercase">
                    <span className="text-emerald-700 font-medium">
                      Achat vérifié ✓
                    </span>
                    <span className="text-charcoal/45">{r.offer}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Crossells */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 lg:mt-32">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A] mb-3">
              Les clientes ont aussi aimé
            </p>
            <h2
              className="font-cormorant text-charcoal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Complète ta collection.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>

      {/* Sticky mobile CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showStickyCTA ? 0 : 100 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#F0E9E1] px-4 py-3 flex items-center gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
      >
        <div className="flex-1 min-w-0">
          <p className="font-cormorant text-charcoal text-base leading-tight truncate">
            {product.shortName}
          </p>
          <p className="text-[11px] tracking-wider uppercase text-[#810B38] font-medium mt-0.5">
            {OFFERS[selectedOffer].label} · {OFFERS[selectedOffer].price} DH
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-[#810B38] text-white text-[10px] tracking-[0.14em] uppercase font-semibold px-5 py-3 rounded-full shadow-[0_6px_24px_rgba(129,11,56,0.25)] hover:bg-[#5c0828] transition-all duration-300 flex-shrink-0"
        >
          <ShoppingBag size={12} />
          Ajouter
        </motion.button>
      </motion.div>

      <Footer />
    </main>
  );
}
