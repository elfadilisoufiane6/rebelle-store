"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32 pb-24">
        <section className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 text-center"
          >
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A] mb-3">
              {eyebrow}
            </p>
            <h1
              className="font-cormorant font-medium text-charcoal leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              {title}
            </h1>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="prose-luxury font-montserrat text-[14px] text-charcoal/70 leading-[1.85] flex flex-col gap-5"
          >
            {children}
          </motion.article>
        </section>
      </div>
      <Footer />
    </main>
  );
}
