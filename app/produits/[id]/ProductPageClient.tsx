"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  MessageCircle,
  Shield,
  Truck,
  RotateCcw,
  Star,
  Heart,
  Check,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductCard from "@/components/product/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Product, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleOrder = () => {
    addItem(product, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <main>
      <Navbar />

      <div className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2" aria-label="Fil d'Ariane">
            {[
              { label: "Accueil", href: "/" },
              { label: "Collection", href: "/#collection" },
              { label: product.name, href: "#" },
            ].map((crumb, i, arr) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href={crumb.href}
                      className="text-luxury-xs text-charcoal/40 hover:text-[#810B38] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                    <ChevronRight size={10} className="text-charcoal/30" />
                  </>
                ) : (
                  <span className="text-luxury-xs text-[#810B38]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <AnimatedSection direction="left">
              <ProductGallery images={product.images} name={product.name} />
            </AnimatedSection>

            {/* Product Details */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="flex flex-col gap-6 lg:sticky lg:top-28">
                {/* Badge & Category */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-luxury-xs text-[#C4956A]">{product.category}</span>
                  {product.badge && (
                    <span className="bg-[#810B38] text-white text-luxury-xs px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {product.isNew && !product.badge && (
                    <span className="bg-[#C4956A] text-white text-luxury-xs px-3 py-1 rounded-full">
                      Nouveau
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h1 className="font-cormorant font-semibold text-charcoal leading-tight mb-2"
                      style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    {product.name}
                  </h1>
                  <p className="font-cormorant italic text-charcoal/50 text-lg">
                    {product.tagline}
                  </p>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#C4956A] text-[#C4956A]" />
                    ))}
                  </div>
                  <span className="text-luxury-xs text-charcoal/40">4.9 (47 avis)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-cormorant font-bold text-[#810B38] text-4xl">
                    {product.price} MAD
                  </span>
                  {product.originalPrice && (
                    <span className="font-montserrat text-base text-charcoal/30 line-through">
                      {product.originalPrice} MAD
                    </span>
                  )}
                </div>

                <div className="luxury-divider" />

                {/* Short Description */}
                <p className="font-montserrat text-sm text-charcoal/60 leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div>
                  <p className="text-luxury-xs text-charcoal/60 mb-3">
                    Couleur:{" "}
                    <span className="text-charcoal font-medium">{selectedColor}</span>
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className={`px-4 py-2 rounded-full text-luxury-xs transition-all duration-300 ${
                          selectedColor === color
                            ? "bg-[#810B38] text-white shadow-burgundy"
                            : "border border-[#E8D5C4] text-charcoal/60 hover:border-[#810B38] hover:text-[#810B38]"
                        }`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOrder}
                    className="btn-luxury flex-1 flex items-center justify-center gap-3 bg-[#810B38] text-white text-luxury-xs px-8 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] hover:shadow-burgundy-glow transition-all duration-300"
                  >
                    {addedToCart ? (
                      <>
                        <Check size={14} />
                        Commande envoyée !
                      </>
                    ) : (
                      <>
                        <MessageCircle size={14} />
                        Commander via WhatsApp
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setWishlist(!wishlist)}
                    className={`w-14 h-14 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      wishlist
                        ? "bg-[#810B38] border-[#810B38] text-white"
                        : "border-[#E8D5C4] text-charcoal/40 hover:border-[#810B38] hover:text-[#810B38]"
                    }`}
                    aria-label={wishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Heart size={16} className={wishlist ? "fill-white" : ""} />
                  </motion.button>
                </div>

                {/* COD Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-burgundy rounded-2xl p-4 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#810B38]/10 flex items-center justify-center">
                    <Shield size={14} className="text-[#810B38]" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-charcoal text-xs">
                      Paiement à la livraison
                    </p>
                    <p className="text-luxury-xs text-charcoal/40 mt-0.5">
                      Vous payez uniquement à la réception · Partout au Maroc
                    </p>
                  </div>
                </motion.div>

                {/* Trust row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Truck, label: "Livraison 2-4j" },
                    { icon: Shield, label: "Qualité garantie" },
                    { icon: RotateCcw, label: "Retour 7 jours" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-[#FAF6F2] text-center"
                    >
                      <Icon size={14} className="text-[#810B38]" />
                      <span className="text-luxury-xs text-charcoal/50">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Description */}
            <AnimatedSection>
              <div className="bg-[#FAF6F2] rounded-3xl p-8 lg:p-10">
                <h2 className="font-cormorant font-medium text-charcoal text-2xl mb-1">
                  Description
                </h2>
                <div className="luxury-divider mb-6" />
                <p className="font-montserrat text-sm text-charcoal/60 leading-relaxed">
                  {product.details}
                </p>
              </div>
            </AnimatedSection>

            {/* Features */}
            <AnimatedSection delay={0.1}>
              <div className="bg-[#FAF6F2] rounded-3xl p-8 lg:p-10">
                <h2 className="font-cormorant font-medium text-charcoal text-2xl mb-1">
                  Caractéristiques
                </h2>
                <div className="luxury-divider mb-6" />
                <ul className="flex flex-col gap-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#810B38]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={9} className="text-[#810B38]" />
                      </div>
                      <span className="font-montserrat text-sm text-charcoal/60">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-[#FAF6F2] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <span className="text-luxury-xs text-[#C4956A] block mb-3">
                Vous aimerez aussi
              </span>
              <h2
                className="font-cormorant font-light text-charcoal"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
              >
                Autres pièces d&apos;exception
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
