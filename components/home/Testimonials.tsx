"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 lg:py-32 bg-[#FAF6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-luxury-xs text-[#C4956A] block mb-4">Témoignages</span>
          <h2
            className="font-cormorant font-light text-charcoal"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Ce qu&apos;elles disent de nous
          </h2>
          <div className="luxury-divider-center mt-4" />
        </AnimatedSection>

        {/* Main Testimonial Slider */}
        <div className="relative max-w-3xl mx-auto">
          {/* Quote Icon — static, no infinite pulse */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#810B38]/20 z-0">
            <Quote size={80} />
          </div>

          {/* Testimonial Card */}
          <div className="relative z-10 min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-burgundy rounded-3xl p-8 lg:p-12 text-center w-full shadow-luxury"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(TESTIMONIALS[active].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                    >
                      <Star
                        size={14}
                        className="fill-[#C4956A] text-[#C4956A]"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-cormorant text-charcoal text-xl lg:text-2xl font-light italic leading-relaxed mb-8">
                  &ldquo;{TESTIMONIALS[active].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-[#810B38] flex items-center justify-center text-white font-cormorant font-bold text-sm mb-2">
                    {TESTIMONIALS[active].avatar}
                  </div>
                  <p className="font-montserrat font-medium text-charcoal text-sm">
                    {TESTIMONIALS[active].name}
                  </p>
                  <p className="text-luxury-xs text-charcoal/40">
                    {TESTIMONIALS[active].city} · {TESTIMONIALS[active].product}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-[#E8D5C4] flex items-center justify-center text-charcoal/50 hover:border-[#810B38] hover:text-[#810B38] transition-all duration-300"
              aria-label="Précédent"
            >
              <ChevronLeft size={16} />
            </motion.button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > active ? 1 : -1);
                    setActive(i);
                  }}
                  animate={{
                    width: i === active ? 24 : 6,
                    backgroundColor: i === active ? "#810B38" : "#E8D5C4",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-1.5 rounded-full"
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full border border-[#E8D5C4] flex items-center justify-center text-charcoal/50 hover:border-[#810B38] hover:text-[#810B38] transition-all duration-300"
              aria-label="Suivant"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>

        {/* All Cards (Desktop) */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mt-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                i === active ? "shadow-luxury border-[#810B38]/20 border" : "hover:shadow-card"
              }`}
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={10} className="fill-[#C4956A] text-[#C4956A]" />
                ))}
              </div>
              <p className="font-cormorant italic text-charcoal/70 text-sm leading-relaxed mb-4 line-clamp-3">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#810B38] flex items-center justify-center text-white text-xs font-cormorant font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-montserrat text-xs font-medium text-charcoal">{t.name}</p>
                  <p className="text-luxury-xs text-charcoal/40">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
