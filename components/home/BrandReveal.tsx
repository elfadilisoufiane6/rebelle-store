"use client";

import { motion } from "framer-motion";

// Premium editorial reveal — the brand-name wordplay (Re·belle · B·elle · elle)
// rendered as a soft, feminine typographic cascade. Flowing italic Cormorant
// in mixed case (not hard uppercase), right-aligned so the recurring "elle"
// — *her* — stacks and peels out of every form of the name. Blush field,
// delicate gold detailing, so the section reads like an haute-couture card.

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BrandReveal() {
  return (
    <section
      aria-label="Le nom Rebelle"
      className="bg-blush/40 py-16 lg:py-24 overflow-hidden relative"
    >
      {/* Subtle editorial frame */}
      <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-[#C4956A]/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-[#C4956A]/50 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center gap-6 lg:gap-8">
        {/* Eyebrow — ornamental with flanking diamonds */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="w-2 h-2 rotate-45 border border-[#C4956A]" />
          <span className="text-[11px] tracking-[0.42em] uppercase text-[#810B38] font-medium">
            Le nom
          </span>
          <span className="w-2 h-2 rotate-45 border border-[#C4956A]" />
        </motion.div>

        {/* Cascade — feminine italic, right-aligned so the shared "elle"
            peels out of each word. Each line fades up gently in sequence. */}
        <div className="font-cormorant italic font-light leading-[0.96] tracking-[0.01em] inline-block text-right overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            className="text-charcoal"
            style={{ fontSize: "clamp(2.75rem, 10vw, 7rem)" }}
          >
            Reb<span className="text-[#810B38]">elle</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            className="text-charcoal/70 -mt-1"
            style={{ fontSize: "clamp(2rem, 7.5vw, 5rem)" }}
          >
            B<span className="text-[#C4956A]">elle</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="text-[#C4956A]"
            style={{ fontSize: "clamp(1.5rem, 5.5vw, 3.75rem)" }}
          >
            elle.
          </motion.p>
        </div>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="flex items-center gap-3 mt-1"
        >
          <span className="w-10 sm:w-14 h-px bg-[#C4956A]/60" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C4956A]" />
          <span className="w-10 sm:w-14 h-px bg-[#C4956A]/60" />
        </motion.div>

        {/* Closing line — italic editorial */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="font-cormorant italic text-charcoal/80 leading-relaxed max-w-xl mx-auto"
          style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}
        >
          Une rebelle.{" "}
          <span className="not-italic text-[#810B38] font-medium">
            Une belle.
          </span>{" "}
          <span className="not-italic text-[#C4956A] font-medium">Elle.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
          className="font-cormorant font-light uppercase tracking-[0.32em] text-charcoal/50 text-[10px] sm:text-[11px]"
        >
          Une beauté indomptée
        </motion.p>
      </div>
    </section>
  );
}
