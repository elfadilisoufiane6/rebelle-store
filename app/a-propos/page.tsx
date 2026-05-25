"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Star,
  Award,
  Sparkles,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  BRAND_NAME_STYLIZED,
  BRAND_TAGLINE,
  BRAND_SIGNATURE,
} from "@/lib/constants";

const values = [
  {
    icon: Star,
    title: "Qualité sans compromis",
    description:
      "Chaque sac est confectionné avec des matériaux premium soigneusement sélectionnés pour leur excellence et leur durabilité.",
  },
  {
    icon: Heart,
    title: "La femme au cœur",
    description:
      "Nous créons pour la femme marocaine moderne : ambitieuse, élégante, libre. Chaque pièce est pensée pour révéler sa force intérieure.",
  },
  {
    icon: Award,
    title: "L'artisanat élevé",
    description:
      "Nos pièces alliant tradition marocaine et esthétique internationale, chaque couture, chaque finition est un hommage au savoir-faire.",
  },
  {
    icon: Sparkles,
    title: "L'élégance accessible",
    description:
      "Le luxe ne devrait pas être réservé à quelques-unes. Notre mission : rendre l'élégance véritable accessible à toutes les femmes marocaines.",
  },
];

// Maison portraits — used by the editorial "La Maison" spread
const secondaryPortraits = [
  {
    name: "Imane K.",
    role: "Direction du Style",
    image: "/assets/images/about/team/2.jpeg",
  },
  {
    name: "Sara M.",
    role: "Direction Qualité",
    image: "/assets/images/about/team/3.jfif",
  },
];

export default function AProposPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#0d0508]"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="/assets/images/about/hero.png"
            alt="À propos de Rebelle"
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full"
        >
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-[#C4956A]" />
              <span className="text-luxury-xs text-[#C4956A]">Notre Histoire</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant font-light text-white leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
            >
              L&apos;élégance
              <br />
              <em className="not-italic font-semibold text-[#C4956A]">
                avec attitude.
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="font-montserrat text-white/60 text-sm leading-relaxed"
            >
              {BRAND_NAME_STYLIZED} est née d&apos;une conviction profonde :
              chaque femme mérite de porter quelque chose d&apos;exceptionnel.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src="/assets/images/about/mission.png"
                    alt="Mission Rebelle"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 to-transparent" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} className="text-[#810B38]" />
                    <span className="text-luxury-xs text-[#810B38]">Maroc</span>
                  </div>
                  <p className="font-cormorant italic text-charcoal text-lg">
                    &ldquo;{BRAND_NAME_STYLIZED} — {BRAND_TAGLINE}&rdquo;
                  </p>
                </motion.div>
              </div>
            </AnimatedSection>

            <div className="flex flex-col gap-8">
              <AnimatedSection delay={0.1}>
                <span className="text-luxury-xs text-[#C4956A]">Notre Mission</span>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h2
                  className="font-cormorant font-light text-charcoal leading-tight"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
                >
                  Née pour les femmes
                  <br />
                  <em className="not-italic font-semibold text-[#810B38]">
                    qui osent briller.
                  </em>
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="font-montserrat text-sm text-charcoal/60 leading-relaxed">
                  {BRAND_NAME_STYLIZED} est bien plus qu&apos;une marque de sacs. C&apos;est un
                  manifeste de la féminité moderne marocaine. Nous croyons que l&apos;élégance
                  véritable vient de l&apos;intérieur — et notre rôle est de la sublimer avec
                  des pièces d&apos;exception.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <p className="font-montserrat text-sm text-charcoal/60 leading-relaxed">
                  Chaque sac que nous créons est une lettre d&apos;amour adressée à la femme
                  marocaine : à son intelligence, à son courage, à sa grâce naturelle et à
                  son ambition sans limite. Quand elle porte un sac Rebelle, le monde la
                  remarque.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.5}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "2022", accent: "", label: "Année de fondation" },
                    { num: "500", accent: "+", label: "Femmes élégantes" },
                    { num: "100", accent: "%", label: "Satisfaction client" },
                    { num: "Maroc", accent: "", label: "Livraison nationale" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#FAF6F2] rounded-2xl py-5 px-4 text-center"
                    >
                      <p className="font-cormorant font-light text-[#810B38] text-[2.25rem] leading-none tabular-nums tracking-tight">
                        {stat.num}
                        {stat.accent && (
                          <span className="text-[#C4956A]">{stat.accent}</span>
                        )}
                      </p>
                      <span className="block w-6 h-px bg-[#C4956A]/50 mx-auto mt-3" />
                      <p className="text-[9px] tracking-[0.22em] uppercase text-charcoal/45 mt-2.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-[#FAF6F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-luxury-xs text-[#C4956A] block mb-4">Nos Valeurs</span>
            <h2
              className="font-cormorant font-light text-charcoal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Ce qui nous définit
            </h2>
            <div className="luxury-divider-center mt-4" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-8 flex flex-col gap-5 shadow-soft hover:shadow-luxury transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#810B38]/8 flex items-center justify-center group-hover:bg-[#810B38] transition-colors duration-300">
                    <value.icon
                      size={20}
                      className="text-[#810B38] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-cormorant font-medium text-charcoal text-xl mb-2">
                      {value.title}
                    </h3>
                    <p className="font-montserrat text-xs text-charcoal/50 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* La Maison — editorial spread */}
      <section className="py-24 lg:py-36 bg-white relative overflow-hidden">
        {/* Subtle gold hairlines — editorial framing */}
        <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-[#C4956A]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-[#C4956A]/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* LEFT — Magazine portrait */}
            <AnimatedSection direction="left" className="lg:col-span-6">
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAF6F2] shadow-[0_30px_80px_rgba(26,26,26,0.18)]">
                  <Image
                    src="/assets/images/about/team/1.jpeg"
                    alt="Yasmine R. — Fondatrice de la Maison Rebelle"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Editorial top eyebrow */}
                  <div className="absolute top-5 left-5 lg:top-7 lg:left-7 flex items-center gap-2">
                    <div className="w-8 h-px bg-[#C4956A]" />
                    <span className="text-[10px] tracking-[0.22em] uppercase text-white/85">
                      Portrait
                    </span>
                  </div>

                  {/* Founder caption */}
                  <div className="absolute bottom-5 left-5 right-5 lg:bottom-7 lg:left-7 lg:right-7 flex items-end justify-between text-white">
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-[#C4956A] mb-1.5">
                        Fondatrice & Directrice Créative
                      </p>
                      <p
                        className="font-cormorant font-light leading-none"
                        style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                      >
                        Yasmine R.
                      </p>
                    </div>
                    <div className="hidden sm:block text-right text-[9px] tracking-[0.28em] uppercase text-white/45">
                      Maison Rebelle
                      <br />
                      Estd. 2022
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* RIGHT — Manifesto */}
            <div className="lg:col-span-6 flex flex-col gap-7">
              <AnimatedSection delay={0.1}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-px bg-[#C4956A]" />
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#C4956A]">
                    La Maison
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <h2
                  className="font-cormorant font-light text-charcoal leading-[1.04]"
                  style={{ fontSize: "clamp(2rem, 4.4vw, 3.5rem)" }}
                >
                  Une maison
                  <br />
                  <em className="not-italic font-semibold text-[#810B38]">
                    pensée par des femmes,
                  </em>
                  <br />
                  pour des femmes.
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.22}>
                <p
                  className="font-cormorant italic text-[#C4956A] tracking-wide select-none"
                  style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)" }}
                  aria-label="Be bold. Be elegant. Be Rebelle."
                >
                  {BRAND_SIGNATURE}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.28}>
                <div className="h-px w-16 bg-[#C4956A]/60" />
              </AnimatedSection>

              <AnimatedSection delay={0.32}>
                <p className="font-montserrat text-charcoal/70 text-[15px] leading-[1.85] max-w-xl">
                  Tout est parti d&apos;une frustration. Une femme marocaine
                  moderne, talentueuse, ambitieuse — confrontée au même
                  dilemme silencieux&nbsp;: assumer le luxe à plein tarif, ou se
                  contenter de l&apos;ordinaire. Nous avons choisi une troisième
                  voie.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.38}>
                <p className="font-montserrat text-charcoal/70 text-[15px] leading-[1.85] max-w-xl">
                  {BRAND_NAME_STYLIZED} n&apos;est pas une marque de sacs. C&apos;est
                  l&apos;instant où tu poses ton sac sur la table et où la pièce
                  change d&apos;air. C&apos;est la femme qui se tient un demi-pas
                  plus droite parce qu&apos;elle sait ce qu&apos;elle porte.
                </p>
              </AnimatedSection>

              {/* Secondary portraits — editorial polaroid pair */}
              <AnimatedSection delay={0.5}>
                <div className="mt-4">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-charcoal/45 mb-4">
                    Les mains derrière la maison
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    {secondaryPortraits.map((member) => (
                      <div
                        key={member.name}
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF6F2]"
                      >
                        <Image
                          src={member.image}
                          alt={`${member.name} — ${member.role}`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 240px"
                          className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/30 to-transparent">
                          <p className="font-cormorant text-white text-base leading-tight">
                            {member.name}
                          </p>
                          <p className="text-[9px] tracking-[0.18em] uppercase text-[#C4956A]/90 mt-0.5">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Morocco Inspiration */}
      <section className="py-24 lg:py-32 bg-[#1A1A1A] overflow-hidden relative">
        {/* Editorial radial wash — burgundy + gold */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 25% 50%, rgba(129,11,56,0.55) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(196,149,106,0.18) 0%, transparent 50%)",
          }}
        />
        {/* Subtle architectural grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,149,106,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(196,149,106,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Gold hairline accents */}
        <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#C4956A]/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-[#C4956A]/30 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="text-luxury-xs text-[#C4956A] block mb-4">
              Inspiration
            </span>
            <h2
              className="font-cormorant font-light text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Le Maroc dans chaque{" "}
              <em className="not-italic font-semibold text-[#C4956A]">couture</em>
            </h2>
            <p className="font-montserrat text-sm text-white/50 leading-relaxed max-w-xl mx-auto mb-10">
              Notre pays est une source d&apos;inspiration infinie. La richesse de ses couleurs,
              la finesse de son artisanat ancestral, la force de ses femmes — tout cela vit
              dans chaque pièce {BRAND_NAME_STYLIZED}.
            </p>
            <Link
              href="/#collection"
              className="btn-luxury inline-flex items-center gap-3 bg-[#810B38] text-white text-luxury-xs px-10 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] transition-all duration-300 group"
            >
              Découvrir la collection
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
