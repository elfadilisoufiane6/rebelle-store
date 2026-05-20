"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const navigate = (dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + images.length) % images.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0, scale: 0.98 }),
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar">
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > active ? 1 : -1);
              setActive(i);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`flex-shrink-0 relative w-16 h-20 lg:w-20 lg:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
              i === active
                ? "ring-2 ring-[#810B38] ring-offset-2"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${name} vue ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </motion.button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 lg:order-2 flex-1 relative">
        <div
          className={`relative overflow-hidden rounded-3xl bg-[#F9F5F1] aspect-[4/5] group ${
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={() => setZoomed(!zoomed)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{ scale: zoomed ? 1.5 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[active]}
                  alt={`${name} vue ${active + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority={active === 0}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Zoom icon */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute top-4 right-4 glass rounded-full w-9 h-9 flex items-center justify-center"
          >
            <ZoomIn size={14} className="text-charcoal" />
          </motion.div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 glass rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-soft"
                aria-label="Image précédente"
              >
                <ChevronLeft size={14} className="text-charcoal" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 glass rounded-full w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-soft"
                aria-label="Image suivante"
              >
                <ChevronRight size={14} className="text-charcoal" />
              </motion.button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 glass-dark rounded-full px-3 py-1.5">
            <span className="text-luxury-xs text-white">
              {active + 1}/{images.length}
            </span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {images.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              animate={{
                width: i === active ? 20 : 6,
                backgroundColor: i === active ? "#810B38" : "#E8D5C4",
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
