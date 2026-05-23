"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BRAND_NAME_STYLIZED, BRAND_SIGNATURE } from "@/lib/constants";

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#FAF6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card">
              <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
                <Image
                  src="/assets/images/brand-story/a_bghet_had_image_high.png"
                  alt="L'histoire Rebelle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
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
              className="absolute top-8 -left-4 lg:-left-8 bg-[#810B38] rounded-2xl p-4 shadow-burgundy"
            >
              <p className="font-cormorant font-bold text-white text-3xl">500+</p>
              <p className="text-luxury-xs text-white/70 mt-0.5">Clientes ravies</p>
            </motion.div>
          </AnimatedSection>

          {/* Content Side */}
          <div className="flex flex-col gap-8">
            <AnimatedSection delay={0.1}>
              <span className="text-luxury-xs text-[#C4956A]">Notre Histoire</span>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2
                className="font-cormorant font-light text-charcoal leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Née d&apos;une passion
                <br />
                <em className="not-italic font-semibold text-[#810B38]">
                  pour l&apos;élégance.
                </em>
              </h2>
            </AnimatedSection>

            <div className="luxury-divider" />

            <AnimatedSection delay={0.3}>
              <p className="font-montserrat text-sm text-charcoal/60 leading-relaxed">
                {BRAND_NAME_STYLIZED} est née d&apos;un rêve simple : offrir aux femmes marocaines
                des sacs d&apos;une qualité internationale, avec une âme locale. Chaque pièce
                que nous créons est une déclaration de style — conçue pour la femme moderne
                qui refuse de choisir entre beauté et substance.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <p className="font-montserrat text-sm text-charcoal/60 leading-relaxed">
                Nous croyons que l&apos;accessoire parfait ne complète pas seulement une tenue
                — il révèle une personnalité. C&apos;est pourquoi chaque sac {BRAND_NAME_STYLIZED}
                est pensé avec soin, confectionné avec des matériaux d&apos;exception et livré
                dans un emballage qui est lui-même une expérience.
              </p>
            </AnimatedSection>

            {/* Values */}
            <AnimatedSection delay={0.5}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "100%", label: "Qualité garantie" },
                  { value: "2-4j", label: "Livraison Maroc" },
                  { value: "500+", label: "Femmes élégantes" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-cormorant font-bold text-[#810B38] text-2xl">
                      {stat.value}
                    </p>
                    <p className="text-luxury-xs text-charcoal/40 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <Link
                href="/a-propos"
                className="btn-luxury inline-flex items-center gap-2 border border-[#810B38] text-[#810B38] text-luxury-xs px-8 py-3.5 rounded-full hover:bg-[#810B38] hover:text-white transition-all duration-300 group"
              >
                Découvrir notre histoire
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
