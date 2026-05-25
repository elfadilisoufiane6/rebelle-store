"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import {
  BRAND_NAME_STYLIZED,
  BRAND_TAGLINE,
  BRAND_SIGNATURE,
} from "@/lib/constants";
import { getProduct } from "@/lib/products";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0d0508]"
    >
      {/* Background Image — static (no scroll-driven parallax) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero/hero-bg1.jpg"
          alt="Rebelle - Sacs premium"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        {/* Luxury overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pt-20 lg:pt-0 pb-16 lg:pb-0">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-4 sm:mb-6"
          >
            <div className="w-6 sm:w-8 h-px bg-[#C4956A]" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#C4956A]">{BRAND_TAGLINE}</span>
          </motion.div>

          {/* Brand Name — hidden on mobile (already in navbar logo) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block mb-2"
          >
            <span className="font-cormorant font-bold text-white text-2xl tracking-wider">
              {BRAND_NAME_STYLIZED}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light text-white leading-[0.95] sm:leading-none mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2.25rem, 9vw, 5.5rem)" }}
          >
            L&apos;élégance qui
            <br />
            <em className="not-italic font-semibold" style={{ color: "#C4956A" }}>
              vous accompagne.
            </em>
          </motion.h1>

          {/* Maison signature — accent line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic text-[#C4956A] mb-5 sm:mb-6 tracking-wide select-none"
            style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.35rem)" }}
            aria-label="Be bold. Be elegant. Be Rebelle."
          >
            {BRAND_SIGNATURE}
          </motion.p>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat font-light text-white/75 text-[13px] sm:text-sm lg:text-base leading-relaxed mb-8 sm:mb-10 max-w-md sm:max-w-lg tracking-wide"
          >
            Sacs premium pour femmes modernes au Maroc.
            <br />
            Qualité d&apos;exception · Paiement à la livraison.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/collection"
              className="inline-flex items-center justify-center gap-3 bg-[#810B38] text-white text-[11px] tracking-[0.18em] uppercase font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-[0_8px_30px_rgba(129,11,56,0.35)] hover:bg-[#5c0828] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
            >
              Découvrir la collection
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/a-propos"
              className="inline-flex items-center justify-center gap-3 bg-transparent text-white border border-white/40 text-[11px] tracking-[0.18em] uppercase font-medium px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-white hover:text-[#810B38] hover:border-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Shield size={13} />
              Pourquoi Rebelle ?
            </Link>
          </motion.div>

          {/* Trust mini — mobile: 3 stacked compact pills · desktop: editorial pipe row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            className="mt-8 sm:mt-12"
          >
            {/* Mobile: 3 compact pills in a row */}
            <div className="flex sm:hidden flex-wrap gap-x-3 gap-y-2 text-[9px] tracking-[0.14em] uppercase text-white/55">
              <span>Livraison</span>
              <span aria-hidden className="text-[#C4956A]/60">·</span>
              <span>Cash livraison</span>
              <span aria-hidden className="text-[#C4956A]/60">·</span>
              <span>Cuir véritable</span>
            </div>
            {/* Desktop: original editorial row */}
            <div className="hidden sm:flex items-center gap-6">
              <div className="w-px h-8 bg-white/20" />
              <div className="flex items-center gap-6">
                {["Livraison au Maroc", "Paiement à la livraison", "Qualité premium"].map(
                  (item) => (
                    <span key={item} className="text-luxury-xs text-white/40">
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating bag highlight — static, no infinite bounce */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute right-16 xl:right-24 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="rounded-2xl p-4 max-w-[210px] bg-white/10 backdrop-blur-xl border border-white/15">
          <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-[#810B38]/20 to-[#C4956A]/20 mb-3">
            <Image
              src={getProduct("gucci-marmont-noir")?.images[0] || "/assets/images/products/gucci-marmont-noir/1.png"}
              alt="Le Marmont Noir"
              width={200}
              height={267}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-cormorant text-white/95 text-sm font-medium">Le Marmont Noir</p>
          <p className="text-[10px] tracking-[0.14em] uppercase text-[#C4956A] mt-1">Dès 469 DH</p>
        </div>
      </motion.div>

      {/* Scroll indicator — static line, no bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-luxury-xs text-white/30">Découvrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
