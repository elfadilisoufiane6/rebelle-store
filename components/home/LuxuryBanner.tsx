"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function LuxuryBanner() {
  return (
    <section
      className="relative overflow-hidden bg-[#0d0508]"
      aria-label="Manifeste Rebelle"
    >
      {/* Static background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero/hero-bg 2.png"
          alt=""
          fill
          priority={false}
          className="object-cover opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
      </div>

      {/* Top hairline */}
      <div className="relative z-10 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C4956A]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-28 lg:py-40 text-center">
        <AnimatedSection>
          <h2
            className="font-cormorant font-light text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            Le luxe n&apos;est pas un prix.
            <br />
            <em className="not-italic font-semibold text-[#C4956A]">
              C&apos;est une attitude.
            </em>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-14 lg:mt-20 grid grid-cols-3 gap-6 lg:gap-12 max-w-3xl mx-auto">
            {[
              { num: "100", accent: "%", label: "Cuir vérifiable" },
              { num: "COD", accent: "", label: "Paiement livraison" },
              { num: "2-4", accent: "j", label: "Maroc entier" },
            ].map((pillar) => (
              <div key={pillar.label} className="flex flex-col items-center">
                <span className="font-cormorant font-light text-white text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-none tabular-nums tracking-tight">
                  {pillar.num}
                  {pillar.accent && (
                    <span className="text-[#C4956A]">{pillar.accent}</span>
                  )}
                </span>
                <span className="block w-6 h-px bg-[#C4956A]/60 mt-3" />
                <span className="text-[9px] tracking-[0.22em] uppercase text-white/55 mt-2.5">
                  {pillar.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom hairline */}
      <div className="relative z-10 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C4956A]/40 to-transparent" />
      </div>
    </section>
  );
}
