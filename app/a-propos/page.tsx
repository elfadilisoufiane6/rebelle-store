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
import { BRAND_NAME_STYLIZED, BRAND_TAGLINE } from "@/lib/constants";

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

const team = [
  {
    name: "Yasmine R.",
    role: "Fondatrice & Directrice Créative",
    image: "/assets/images/about/team/1.png",
    quote: "J'ai créé Rebelle pour chaque femme qui mérite de se sentir extraordinaire.",
  },
  {
    name: "Imane K.",
    role: "Directrice du Style",
    image: "/assets/images/about/team/2.png",
    quote: "L'élégance n'est pas une question de budget, c'est une question d'âme.",
  },
  {
    name: "Sara M.",
    role: "Responsable Qualité",
    image: "/assets/images/about/team/3.png",
    quote: "Chaque détail compte. Chaque couture raconte une histoire.",
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
                    { number: "2022", label: "Année de fondation" },
                    { number: "500+", label: "Femmes élégantes" },
                    { number: "100%", label: "Satisfaction client" },
                    { number: "Maroc", label: "Livraison nationale" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#FAF6F2] rounded-2xl p-4 text-center"
                    >
                      <p className="font-cormorant font-bold text-[#810B38] text-2xl">
                        {stat.number}
                      </p>
                      <p className="text-luxury-xs text-charcoal/40 mt-1">{stat.label}</p>
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

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-luxury-xs text-[#C4956A] block mb-4">L&apos;Équipe</span>
            <h2
              className="font-cormorant font-light text-charcoal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Les femmes derrière
              <br />
              <em className="not-italic font-semibold text-[#810B38]">
                {BRAND_NAME_STYLIZED}
              </em>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4 group"
                >
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAF6F2] image-reveal">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <p className="font-cormorant italic text-white text-sm leading-relaxed">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    </motion.div>
                  </div>
                  <div>
                    <p className="font-cormorant font-medium text-charcoal text-xl">
                      {member.name}
                    </p>
                    <p className="text-luxury-xs text-[#C4956A] mt-1">{member.role}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Morocco Inspiration */}
      <section className="py-20 lg:py-28 bg-[#1A1A1A] overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/about/maroc-bg.png"
            alt="Maroc inspiration"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
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
