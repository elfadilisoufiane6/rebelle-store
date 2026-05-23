"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag, Check, Star } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, "2pieces");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: EASE,
      }}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produits/${product.slug}`}>
        <div className="relative overflow-hidden rounded-2xl bg-[#F9F5F1] aspect-[3/4]">
          {/* Badge */}
          {product.badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 + 0.3 }}
              className={`absolute top-4 left-4 z-20 text-white text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full font-medium ${
                product.isBestseller
                  ? "bg-[#810B38] shadow-[0_4px_16px_rgba(129,11,56,0.35)]"
                  : "bg-[#1A1A1A]"
              }`}
            >
              {product.badge}
            </motion.div>
          )}

          {/* Main image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={product.images[0]}
              alt={product.shortName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#FAF6F2] via-[#F5EDE8] to-[#FAF6F2]" />
            )}
          </motion.div>

          {/* Second image on hover */}
          <AnimatePresence>
            {isHovered && product.images[1] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[1]}
                  alt={`${product.shortName} vue 2`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover CTA overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-2.5 z-10"
            animate={{
              backgroundColor: isHovered
                ? "rgba(0,0,0,0.18)"
                : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.35 }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex gap-2"
                  onClick={(e) => e.preventDefault()}
                >
                  <Link
                    href={`/produits/${product.slug}`}
                    className="bg-white/95 backdrop-blur-sm flex items-center gap-1.5 text-charcoal text-[10px] tracking-wider uppercase font-medium px-4 py-2.5 rounded-full hover:bg-white transition-all duration-300"
                  >
                    <Eye size={11} />
                    Voir
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className={`flex items-center gap-1.5 text-white text-[10px] tracking-wider uppercase font-medium px-4 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(129,11,56,0.35)] ${
                      added
                        ? "bg-emerald-600"
                        : "bg-[#810B38] hover:bg-[#5c0828]"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={11} />
                        Ajouté
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={11} />
                        Ajouter
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-[#810B38] z-20"
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 flex flex-col gap-1.5 px-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/produits/${product.slug}`} className="min-w-0">
            <motion.h3
              className="font-cormorant font-medium text-charcoal text-xl leading-tight"
              animate={{ color: isHovered ? "#810B38" : "#1A1A1A" }}
              transition={{ duration: 0.3 }}
            >
              {product.shortName}
            </motion.h3>
          </Link>
          <div className="text-right flex-shrink-0">
            <p className="font-montserrat font-bold text-[#810B38] text-sm">
              Dès 469 DH
            </p>
            <p className="text-[10px] tracking-wider uppercase text-charcoal/40 mt-0.5">
              2 sacs · 699 DH
            </p>
          </div>
        </div>

        <p className="font-montserrat text-[12px] text-charcoal/55 italic leading-relaxed">
          {product.tagline}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className="fill-[#C4956A] text-[#C4956A]"
              />
            ))}
          </div>
          <span className="text-[10px] tracking-wider uppercase text-charcoal/40">
            {product.rating} · {product.reviewCount} avis
          </span>
        </div>
      </div>
    </motion.article>
  );
}
