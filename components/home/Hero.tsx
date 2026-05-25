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

      {/* Bottom-anchored content — single CTA, no marketing copy */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-24">
        <div className="flex flex-col items-start gap-6 sm:gap-8">
          {/* Maison signature — quiet brand flourish */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic text-[#C4956A] tracking-wide select-none"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
            aria-label="Be bold. Be elegant. Be Rebelle."
          >
            {BRAND_SIGNATURE}
          </motion.p>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
