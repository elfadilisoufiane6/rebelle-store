"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BRAND_SIGNATURE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0d0508]">
      {/* Background Image — static, full quality */}
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
        {/* Bottom-weighted gradient — keeps the photography readable while
            anchoring the brand mark + CTA at the lower third. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      </div>

      {/* Bottom-anchored content — editorial title + single CTA */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-24">
        <div className="flex flex-col items-start gap-5 sm:gap-6 max-w-md">
          {/* Eyebrow — season label in maison red */}
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

          {/* Title — maison tagline elevated to hero mark */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-medium uppercase text-white leading-[0.95] tracking-[0.06em]"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}
          >
            <span className="block">Elegance</span>
            <span className="block">with attitude.</span>
          </motion.h1>

          {/* Maison signature — quiet flourish */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic text-[#C4956A]/85 tracking-wide select-none"
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
            aria-label="Be bold. Be elegant. Be Rebelle."
          >
            {BRAND_SIGNATURE}
          </motion.p>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2"
          >
            <Link
              href="/collection"
              className="inline-flex items-center gap-4 bg-white text-charcoal text-[11px] tracking-[0.22em] uppercase font-medium px-9 py-4 rounded-full hover:bg-[#C4956A] hover:text-white transition-all duration-300"
            >
              Découvrir
              <span aria-hidden className="text-base leading-none">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
