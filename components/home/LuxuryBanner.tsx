"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BRAND_SIGNATURE } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LuxuryBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.4, 0.6]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0d0508]"
      aria-label="Manifeste Rebelle"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="/assets/images/hero/hero-bg 2.png"
          alt=""
          fill
          priority={false}
          className="object-cover"
          sizes="100vw"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0508] via-transparent to-transparent" />
      </motion.div>

      {/* Top + bottom hairlines */}
      <div className="relative z-10 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C4956A]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: editorial copy */}
          <div className="lg:col-span-7 flex flex-col gap-7">
            <AnimatedSection direction="left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-[#C4956A]" />
                <span className="text-luxury-xs text-[#C4956A]">
                  Manifeste Rebelle
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1}>
              <h2
                className="font-cormorant font-light text-white leading-[1.02]"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
              >
                Le luxe n&apos;est pas un prix.
                <br />
                <em className="not-italic font-semibold text-[#C4956A]">
                  C&apos;est une attitude.
                </em>
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <p className="font-montserrat text-white/65 text-sm lg:text-base leading-relaxed max-w-xl">
                Chaque sac Rebelle est choisi pour sa matière, sa silhouette,
                et la façon dont il fait marcher la femme qui le porte. Un
                code simple : aucune avance, aucun compromis sur la qualité,
                aucun discours commercial.
              </p>
            </AnimatedSection>

            {/* Pillars */}
            <AnimatedSection direction="left" delay={0.3}>
              <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-3 max-w-xl">
                {[
                  { value: "100%", label: "Cuir vérifiable" },
                  { value: "COD", label: "Paiement livraison" },
                  { value: "2-4j", label: "Maroc entier" },
                ].map((pillar) => (
                  <div key={pillar.label} className="flex flex-col gap-1">
                    <span className="font-cormorant font-semibold text-white text-2xl lg:text-3xl">
                      {pillar.value}
                    </span>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/45">
                      {pillar.label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/collection"
                    className="inline-flex items-center gap-3 bg-[#810B38] text-white text-[11px] tracking-[0.18em] uppercase font-semibold px-8 py-4 rounded-full shadow-[0_8px_30px_rgba(129,11,56,0.35)] hover:bg-[#5c0828] transition-all duration-300 group"
                  >
                    Explorer la collection
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/a-propos"
                    className="inline-flex items-center gap-3 bg-transparent text-white border border-white/30 text-[11px] tracking-[0.18em] uppercase font-medium px-8 py-4 rounded-full hover:bg-white hover:text-[#810B38] hover:border-white transition-all duration-300"
                  >
                    Notre histoire
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: floating quote card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative max-w-sm w-full">
              <div className="glass rounded-3xl p-7 lg:p-8 bg-white/8 backdrop-blur-xl border border-white/15">
                <Sparkles size={18} className="text-[#C4956A] mb-4" />
                <p
                  className="font-cormorant italic text-[#C4956A] text-base lg:text-lg mb-3 tracking-wide select-none"
                  aria-label="Be bold. Be elegant. Be Rebelle."
                >
                  {BRAND_SIGNATURE}
                </p>
                <p className="font-cormorant italic text-white text-2xl lg:text-3xl leading-tight mb-5">
                  «&nbsp;Tu paies quand le sac est dans tes mains. Pas
                  avant.&nbsp;»
                </p>
                <div className="h-px bg-white/15 mb-4" />
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#C4956A]">
                  Engagement Rebelle
                </p>
                <p className="font-montserrat text-[12px] text-white/55 leading-relaxed mt-2">
                  500+ clientes ont déjà vérifié la qualité avant de payer.
                </p>
              </div>

              {/* Gold accent dot */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#C4956A] shadow-[0_0_24px_rgba(196,149,106,0.55)]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C4956A]/40 to-transparent" />
      </div>
    </section>
  );
}
