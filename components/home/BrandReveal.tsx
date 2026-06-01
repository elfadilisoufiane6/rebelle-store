"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

// Editorial reveal of what the brand name actually carries:
//   REBELLE = RE · BELLE · ELLE
//   the rebel · the beautiful · the woman
// Quiet, magazine-style typography — no animations beyond the section
// entrance, so the typography does the work.
export default function BrandReveal() {
  return (
    <section
      aria-label="Le nom Rebelle"
      className="bg-[#FAF6F2] py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-6 lg:mb-8">
            <span className="w-8 h-px bg-[#810B38]" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-[#810B38] font-semibold">
              Le nom · La signification
            </span>
            <span className="w-8 h-px bg-[#810B38]" />
          </div>
        </AnimatedSection>

        {/* The compound name — letters decompose into their hidden words.
            Done as three inline-block spans so the cursor can highlight
            the overlap visually without breaking the line. */}
        <AnimatedSection delay={0.1}>
          <p
            className="font-cormorant font-light text-charcoal leading-[0.95] tracking-tight uppercase"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            <span className="text-charcoal">RE</span>
            <span className="text-[#810B38]">BELLE</span>
            <span className="sr-only">+</span>
          </p>
        </AnimatedSection>

        {/* The decomposition row — three columns reading like a perfume
            note breakdown. */}
        <AnimatedSection delay={0.18}>
          <div className="mt-12 lg:mt-16 grid grid-cols-3 max-w-3xl mx-auto">
            {[
              { word: "RE", meaning: "L'affirmation", body: "Une volonté assumée." },
              { word: "BELLE", meaning: "La beauté", body: "Sans demander la permission." },
              { word: "ELLE", meaning: "Elle", body: "La femme qui sait." },
            ].map((part, i) => (
              <div
                key={part.word}
                className={`flex flex-col items-center px-3 lg:px-5 ${
                  i > 0 ? "border-l border-[#C4956A]/30" : ""
                }`}
              >
                <span
                  className="font-cormorant font-light text-[#810B38] leading-none tabular-nums"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
                >
                  {part.word}
                </span>
                <span className="block w-6 h-px bg-[#C4956A]/60 mt-3" />
                <span className="text-[9px] tracking-[0.28em] uppercase text-charcoal/55 font-semibold mt-3">
                  {part.meaning}
                </span>
                <p className="font-montserrat text-[12px] sm:text-[13px] text-charcoal/65 mt-2 leading-snug max-w-[16ch]">
                  {part.body}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Editorial closing line */}
        <AnimatedSection delay={0.28}>
          <p
            className="font-cormorant italic text-charcoal/75 mt-12 lg:mt-14 max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
          >
            Une affirmation. Une beauté. Une femme.
            <br />
            <em className="not-italic font-semibold text-[#810B38]">
              Trois mots dans un seul nom.
            </em>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
