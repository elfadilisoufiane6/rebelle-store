"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

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
    addItem(product, product.colors[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="product-card group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/produits/${product.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-[#F9F5F1] aspect-[3/4]">
          {/* Badge */}
          {(product.badge || product.isNew) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 + 0.3 }}
              className={`absolute top-4 left-4 z-20 text-white text-luxury-xs px-3 py-1.5 rounded-full ${
                product.badge ? "bg-[#810B38] shadow-burgundy" : "bg-[#C4956A]"
              }`}
            >
              {product.badge ?? "Nouveau"}
            </motion.div>
          )}

          {/* Main Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && <div className="absolute inset-0 shimmer" />}
          </motion.div>

          {/* Second Image on Hover */}
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
                  alt={`${product.name} — vue 2`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover overlay with CTAs */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-2.5 z-10"
            animate={{
              backgroundColor: isHovered ? "rgba(0,0,0,0.14)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.35 }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-2"
                  onClick={(e) => e.preventDefault()}
                >
                  <Link
                    href={`/produits/${product.id}`}
                    className="glass flex items-center gap-2 text-charcoal text-luxury-xs px-4 py-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-soft"
                  >
                    <Eye size={12} />
                    Voir
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className={`flex items-center gap-2 text-white text-luxury-xs px-5 py-2.5 rounded-full transition-all duration-300 shadow-burgundy ${
                      added
                        ? "bg-green-500"
                        : "bg-[#810B38] hover:bg-[#5c0828] hover:shadow-burgundy-glow"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={12} />
                        Ajouté
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={12} />
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
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 flex flex-col gap-1.5 px-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/produits/${product.id}`}>
            <motion.h3
              className="font-cormorant font-medium text-charcoal text-xl leading-tight hover:text-[#810B38] transition-colors duration-300"
              animate={{ color: isHovered ? "#810B38" : "#1A1A1A" }}
              transition={{ duration: 0.3 }}
            >
              {product.name}
            </motion.h3>
          </Link>
          <div className="text-right flex-shrink-0">
            <p className="font-montserrat font-medium text-[#810B38] text-sm">
              {product.price} MAD
            </p>
            {product.originalPrice && (
              <p className="font-montserrat text-xs text-charcoal/40 line-through">
                {product.originalPrice} MAD
              </p>
            )}
          </div>
        </div>

        <p className="font-montserrat text-xs text-charcoal/50 leading-relaxed">
          {product.tagline}
        </p>

        <div className="flex items-center gap-1.5 mt-1">
          {product.colors.map((color, i) => (
            <span
              key={color}
              className="text-luxury-xs text-charcoal/40"
            >
              {color}{i < product.colors.length - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
