"use client";

import { motion } from "framer-motion";

// Editorial cascade reveal — fires once when the section scrolls into
// view. Each nested word slides in from the right at a slight delay
// so the eye reads REBELLE first, then BELLE peeking out, then ELLE
// at the deepest level. Scroll-triggered so the reveal happens the
// moment the user lands on it, not before.

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BrandReveal() {
  return (
    <section
      aria-label="Le nom Rebelle"
      className="bg-white py-12 lg:py-16 overflow-hidden relative"
    >
      {/* Editorial hairlines */}
      <div className="absolute top-0 left-0 w-1/4 h-px bg-gradient-to-r from-[#810B38]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/4 h-px bg-gradient-to-l from-[#810B38]/40 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center gap-4 lg:gap-5">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[10px] tracking-[0.32em] uppercase text-[#810B38] font-semibold"
        >
          Le nom
        </motion.span>

        {/* Cascade — each line slides in from the right with a stagger
            so the visual nesting reads as a deliberate reveal. */}
        <div className="font-cormorant font-light leading-[0.95] tracking-[0.02em] uppercase inline-block text-left overflow-hidden">
          <motion.p
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="text-charcoal"
            style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
          >
            REBELLE.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="text-[#810B38] mt-0.5"
            style={{
              fontSize: "clamp(1.9rem, 7vw, 4.5rem)",
              paddingLeft: "1.4em",
            }}
          >
            BELLE.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="text-[#C4956A] mt-0.5"
            style={{
              fontSize: "clamp(1.4rem, 5vw, 3.25rem)",
              paddingLeft: "3em",
            }}
          >
            ELLE.
          </motion.p>
        </div>

        {/* Closing line — tied to beauty + rebellion */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          className="font-cormorant text-charcoal/75 leading-relaxed max-w-xl mx-auto"
          style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)" }}
        >
          <em className="not-italic">Une rebelle.</em>{" "}
          <em className="not-italic text-[#810B38] font-medium">Une belle.</em>{" "}
          <em className="not-italic text-[#C4956A] font-medium">Elle.</em>
          <br />
          <span className="text-charcoal/55 text-[0.85em] italic font-cormorant">
            Une beauté indomptée.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
