"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Editorial signature — three phrases scattered around the hero
// (top-right, centre, bottom-left). Each one is a fragment of the
// maison's signature line "Be bold. Be elegant. Be Rebelle."
const SIG_BASE =
  "font-cormorant italic text-[#C4956A] tracking-wide select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0d0508]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero/hero-bg1.jpg"
          alt="Rebelle"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        {/* Light gradient so the scattered signature words read against
            any part of the photograph, plus a stronger bottom band that
            anchors the main title + CTA. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      </div>

      {/* Editorial signature — scattered fragments */}
      <motion.span
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`hidden sm:block absolute z-10 top-24 sm:top-28 lg:top-32 right-6 sm:right-10 lg:right-16 ${SIG_BASE}`}
        style={{ fontSize: "clamp(1rem, 1.5vw, 1.35rem)" }}
        aria-hidden
      >
        Be bold.
      </motion.span>

      <motion.span
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`hidden sm:block absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${SIG_BASE}`}
        style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
        aria-hidden
      >
        Be elegant.
      </motion.span>

      {/* Bottom-anchored content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-24">
        <div className="flex flex-col items-start gap-5 sm:gap-6 max-w-md">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="w-6 h-px bg-[#810B38]" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
              Maison · Édition 2026
            </span>
          </motion.div>

          {/* Title — both lines now share the same uppercase size */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-medium uppercase text-white leading-[0.95] tracking-[0.06em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            <span className="block">Elegance</span>
            <span className="block">with attitude.</span>
          </motion.h1>

          {/* Bottom-left signature fragment */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className={`${SIG_BASE}`}
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}
            aria-label="Be bold. Be elegant. Be Rebelle."
          >
            Be Rebelle.
          </motion.p>

          {/* CTA + livraison line */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 flex flex-col items-start gap-3"
          >
            <Link
              href="/collection"
              className="inline-flex items-center gap-4 bg-white text-charcoal text-[11px] tracking-[0.22em] uppercase font-medium px-9 py-4 rounded-full hover:bg-[#C4956A] hover:text-white transition-all duration-300"
            >
              Découvrir
              <span aria-hidden className="text-base leading-none">→</span>
            </Link>
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/70 font-medium">
              Livraison 2 j · Partout au Maroc
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
