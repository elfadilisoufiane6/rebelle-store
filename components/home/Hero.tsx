"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// New maison signature treatment — clean uppercase Cormorant in white,
// with wide letter-spacing. Replaces the previous italic Cormorant in
// gold (user feedback: gold + italic felt wrong).
const SIG_CLASS =
  "font-cormorant font-light uppercase text-white/85 tracking-[0.32em] select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#0d0508]">
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
        {/* Bottom-weighted gradient anchors the headline + CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Main content stack — bottom-left anchored */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pb-8 sm:pb-10 lg:pb-14">
        <div className="flex flex-col items-start gap-5 sm:gap-6 max-w-3xl">
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

          {/* Title — 'Elegance' sets the block width, 'with attitude.'
              stretches via text-align justify so its left AND right
              edges meet Elegance's, producing a clean rectangular
              block on every viewport. */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-medium uppercase text-white leading-[0.95] tracking-[0.04em] inline-flex flex-col items-stretch w-fit"
          >
            <span
              className="block whitespace-nowrap"
              style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
            >
              Elegance
            </span>
            <span
              className="block whitespace-nowrap"
              style={{
                fontSize: "clamp(1rem, 2.8vw, 1.9rem)",
                textAlign: "justify",
                textAlignLast: "justify",
                width: "100%",
              }}
            >
              with attitude.
            </span>
          </motion.h1>

          {/* CTA + livraison line */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-3"
          >
            <Link
              href="/collection"
              className="inline-flex items-center gap-4 bg-white text-charcoal text-[11px] tracking-[0.22em] uppercase font-medium px-9 py-4 rounded-full hover:bg-[#810B38] hover:text-white transition-all duration-300"
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

      {/* Maison signature — three fragments spread at the very bottom of
          the image, on a single editorial strip. Reads as one stacked
          tagline on phones, three columns on tablet+. */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pb-6 sm:pb-8 lg:pb-10"
        aria-label="Be bold. Be elegant. Be Rebelle."
      >
        <div className="flex items-center justify-between gap-3 sm:gap-6 border-t border-white/15 pt-5">
          <span
            className={SIG_CLASS}
            style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.9rem)" }}
          >
            Be bold
          </span>
          <span
            aria-hidden
            className="hidden sm:block flex-1 h-px bg-white/10"
          />
          <span
            className={SIG_CLASS}
            style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.9rem)" }}
          >
            Be elegant
          </span>
          <span
            aria-hidden
            className="hidden sm:block flex-1 h-px bg-white/10"
          />
          <span
            className={SIG_CLASS}
            style={{ fontSize: "clamp(0.65rem, 1.1vw, 0.9rem)" }}
          >
            Be Rebelle
          </span>
        </div>
      </motion.div>
    </section>
  );
}
