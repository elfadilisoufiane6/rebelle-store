"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BRAND_NAME_STYLIZED, BRAND_SIGNATURE } from "@/lib/constants";

export default function BrandStory() {
  return (
    <section className="py-20 lg:py-32 bg-[#FAF6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card">
              <Image
                src="/assets/images/brand-story/a_bghet_had_image_high.png"
                alt="L'histoire Rebelle"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#810B38]/40 via-transparent to-transparent" />
            </div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -right-4 lg:-right-8 glass rounded-2xl p-6 max-w-[220px] shadow-luxury"
            >
              <p
                className="font-cormorant italic text-[#810B38] text-base lg:text-lg leading-snug mb-2 tracking-wide select-none"
                aria-label="Be bold. Be elegant. Be Rebelle."
              >
                {BRAND_SIGNATURE}
              </p>
              <p className="text-luxury-xs text-charcoal/55">{BRAND_NAME_STYLIZED}</p>
            </motion.div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-8 -left-4 lg:-left-8 bg-[#810B38] rounded-2xl py-4 px-5 shadow-burgundy"
            >
              <p className="font-cormorant font-light text-white text-[2.5rem] leading-none tabular-nums tracking-tight">
                500<span className="text-[#C4956A]">+</span>
              </p>
              <span className="block w-6 h-px bg-[#C4956A]/70 mt-2.5" />
              <p className="text-[9px] tracking-[0.22em] uppercase text-white/65 mt-2">
                Clientes ravies
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Content Side */}
          <div className="flex flex-col gap-10">
            <AnimatedSection delay={0.1}>
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#C4956A]">
                La Maison
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2
                className="font-cormorant font-light text-charcoal leading-[1.05]"
                style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)" }}
              >
                L&apos;élégance,
                <br />
                <em className="not-italic font-semibold text-[#810B38]">
                  sans compromis.
                </em>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="font-montserrat text-[15px] text-charcoal/65 leading-[1.85] max-w-md">
                Maison {BRAND_NAME_STYLIZED} — sacs en cuir véritable,
                pensés à Casablanca pour la femme moderne. Tu paies à la
                livraison.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-3 text-[#810B38] text-[10px] tracking-[0.22em] uppercase font-medium hover:gap-4 transition-all duration-300 w-fit"
              >
                Notre histoire
                <span aria-hidden>→</span>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
