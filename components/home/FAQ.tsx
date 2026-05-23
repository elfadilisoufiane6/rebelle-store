"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="text-luxury-xs text-[#C4956A] block mb-4">Questions fréquentes</span>
          <h2
            className="font-cormorant font-light text-charcoal"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Tout ce que vous
            <br />
            <em className="not-italic font-semibold text-[#810B38]">devez savoir</em>
          </h2>
          <div className="luxury-divider-center mt-4" />
        </AnimatedSection>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, index) => (
            <AnimatedSection key={item.question} delay={index * 0.08}>
              <motion.div
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  openIndex === index
                    ? "border-[#810B38]/20 shadow-luxury bg-[#FAF6F2]"
                    : "border-[#F0E9E1] bg-white hover:border-[#E8D5C4]"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span
                    className={`font-montserrat font-medium text-sm transition-colors duration-300 ${
                      openIndex === index ? "text-[#810B38]" : "text-charcoal group-hover:text-[#810B38]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 0 : 0 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-[#810B38] text-white"
                        : "border border-[#E8D5C4] text-charcoal/40 group-hover:border-[#810B38] group-hover:text-[#810B38]"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus size={12} />
                    ) : (
                      <Plus size={12} />
                    )}
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-5">
                        <div className="w-full h-px bg-[#F0E9E1] mb-4" />
                        <p className="font-montserrat text-sm text-charcoal/60 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Contact prompt */}
        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <p className="font-montserrat text-sm text-charcoal/50 mb-4">
            Tu as d&apos;autres questions ?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#810B38] text-white text-[11px] tracking-[0.18em] uppercase font-semibold px-8 py-3.5 rounded-full shadow-[0_6px_24px_rgba(129,11,56,0.25)] hover:bg-[#5c0828] transition-all duration-300"
          >
            Nous contacter
            <ArrowRight size={12} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
