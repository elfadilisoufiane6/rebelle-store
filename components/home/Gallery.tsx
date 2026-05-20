"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const galleryImages = [
  { src: "/assets/images/gallery/1.png", span: "col-span-1 row-span-2" },
  { src: "/assets/images/gallery/2.png", span: "col-span-1 row-span-1" },
  { src: "/assets/images/gallery/3.png", span: "col-span-1 row-span-1" },
  { src: "/assets/images/gallery/4.png", span: "col-span-2 row-span-1" },
  { src: "/assets/images/gallery/5.png", span: "col-span-1 row-span-1" },
];

const mobileImages = [
  "/assets/images/gallery/1.png",
  "/assets/images/gallery/2.png",
  "/assets/images/gallery/3.png",
  "/assets/images/gallery/5.png",
];

export default function Gallery() {
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#C4956A]" />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-luxury-xs text-[#810B38] hover:text-[#5c0828] transition-colors"
            >
              <InstagramIcon size={14} />
              {INSTAGRAM_HANDLE}
            </a>
            <div className="w-8 h-px bg-[#C4956A]" />
          </div>
          <h2
            className="font-cormorant font-light text-charcoal leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            L&apos;élégance en images
          </h2>
        </AnimatedSection>

        {/* Desktop Asymmetric Grid */}
        <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-4 h-[600px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`${img.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
            >
              <Image
                src={img.src}
                alt={`Rebelle lifestyle ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <div className="glass rounded-xl px-3 py-2 inline-flex items-center gap-2">
                  <InstagramIcon size={12} />
                  <span className="text-luxury-xs text-charcoal">{INSTAGRAM_HANDLE}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {mobileImages.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? "row-span-2" : "aspect-square"}`}
              style={i === 0 ? { aspectRatio: "1/2" } : {}}
            >
              <Image
                src={src}
                alt={`Rebelle lifestyle ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="50vw"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="mt-10 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-flex items-center gap-2 border border-charcoal/20 text-charcoal text-luxury-xs px-8 py-3.5 rounded-full hover:border-[#810B38] hover:text-[#810B38] hover:bg-[#FAF6F2] transition-all duration-300"
          >
            <InstagramIcon size={14} />
            Suivre {INSTAGRAM_HANDLE}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
