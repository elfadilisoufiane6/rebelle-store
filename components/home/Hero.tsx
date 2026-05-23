"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0d0508]"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src="/assets/images/hero/hero-bg1.png"
          alt="Rebelle - Sacs premium"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        {/* Luxury overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C4956A]/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full"
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-[#C4956A]" />
            <span className="text-luxury-xs text-[#C4956A]">{BRAND_TAGLINE}</span>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2"
          >
            <span className="font-cormorant font-bold text-white text-2xl tracking-wider">
              {BRAND_NAME_STYLIZED}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            L&apos;élégance qui
            <br />
            <em className="not-italic font-semibold" style={{ color: "#C4956A" }}>
              vous accompagne.
            </em>
          </motion.h1>

          {/* Maison signature — accent line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic text-[#C4956A] mb-6 tracking-wide select-none"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.35rem)" }}
            aria-label="Be bold. Be elegant. Be Rebelle."
          >
            {BRAND_SIGNATURE}
          </motion.p>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat font-light text-white/70 text-sm lg:text-base leading-relaxed mb-10 max-w-lg tracking-wide"
          >
            Sacs premium pour femmes modernes au Maroc.
            <br />
            Qualité d&apos;exception · Paiement à la livraison.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/collection"
                className="inline-flex items-center gap-3 bg-[#810B38] text-white text-[11px] tracking-[0.18em] uppercase font-semibold px-8 py-4 rounded-full shadow-[0_8px_30px_rgba(129,11,56,0.35)] hover:bg-[#5c0828] transition-all duration-300 group"
              >
                Découvrir la collection
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={14} />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-3 bg-transparent text-white border border-white/40 text-[11px] tracking-[0.18em] uppercase font-medium px-8 py-4 rounded-full hover:bg-white hover:text-[#810B38] hover:border-white transition-all duration-300"
              >
                <Shield size={13} />
                Pourquoi Rebelle ?
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust mini */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-6">
              {["Livraison au Maroc", "Paiement à la livraison", "Qualité premium"].map(
                (item) => (
                  <span
                    key={item}
                    className="hidden sm:block text-luxury-xs text-white/40"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating bag highlight */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute right-16 xl:right-24 top-1/2 -translate-y-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl p-4 max-w-[210px] bg-white/10 backdrop-blur-xl border border-white/15"
        >
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-luxury-xs text-white/30">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
