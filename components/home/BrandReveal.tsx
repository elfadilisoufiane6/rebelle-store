"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

// Editorial reveal of the wordplay inside the name. Visual cascade:
//
//   REBELLE.        ← charcoal, largest
//      BELLE.       ← burgundy, medium, offset under the matching letters
//          ELLE.    ← gold accent, smallest, offset further
//
// Three words living inside one — the eye follows the nesting itself.
// No grid, no hairlines, no breakdown table — just typography doing
// all the lifting (per user feedback on the previous design).

export default function BrandReveal() {
  return (
    <section
      aria-label="Le nom Rebelle"
      className="bg-white py-24 lg:py-36 overflow-hidden relative"
    >
      {/* Subtle gold hairlines — editorial framing */}
      <div className="absolute top-0 left-0 w-1/4 h-px bg-gradient-to-r from-[#810B38]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/4 h-px bg-gradient-to-l from-[#810B38]/40 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center gap-6 lg:gap-8">
        {/* Eyebrow */}
        <AnimatedSection>
          <span className="text-[10px] tracking-[0.32em] uppercase text-[#810B38] font-semibold">
            Le nom
          </span>
        </AnimatedSection>

        {/* Cascade — three lines, each indented to sit under the matching
            letters of the line above. Indentation is approximate (em
            offsets calibrated to the font's advance width) and read
            beautifully even when the line wraps on narrow screens. */}
        <AnimatedSection delay={0.08}>
          <div
            className="font-cormorant font-light leading-[0.95] tracking-[0.02em] uppercase inline-block text-left"
          >
            <p
              className="text-charcoal"
              style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
            >
              REBELLE.
            </p>
            <p
              className="text-[#810B38] mt-0.5"
              style={{
                fontSize: "clamp(1.9rem, 7vw, 4.5rem)",
                paddingLeft: "1.4em",
              }}
            >
              BELLE.
            </p>
            <p
              className="text-[#C4956A] mt-0.5"
              style={{
                fontSize: "clamp(1.4rem, 5vw, 3.25rem)",
                paddingLeft: "3em",
              }}
            >
              ELLE.
            </p>
          </div>
        </AnimatedSection>

        {/* Closing editorial line — kept deliberately short */}
        <AnimatedSection delay={0.22}>
          <p
            className="font-cormorant text-charcoal/75 leading-relaxed max-w-xl mx-auto"
            style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)" }}
          >
            <em className="not-italic">Une rebelle.</em>{" "}
            <em className="not-italic text-[#810B38] font-medium">Une belle.</em>{" "}
            <em className="not-italic text-[#C4956A] font-medium">Elle.</em>
            <br />
            <span className="text-charcoal/55 text-[0.85em]">
              Trois mots dans un seul nom.
            </span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
