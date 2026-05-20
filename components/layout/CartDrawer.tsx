"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BRAND_NAME_STYLIZED } from "@/lib/constants";

export default function CartDrawer() {
  const { items, count, total, removeItem, updateQuantity, closeCart, isOpen } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0E9E1]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-[#810B38]" />
                <div>
                  <span className="font-cormorant font-medium text-charcoal text-lg">
                    Mon Panier
                  </span>
                  {count > 0 && (
                    <span className="ml-2 text-luxury-xs text-[#810B38]">
                      ({count} article{count > 1 ? "s" : ""})
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full border border-[#F0E9E1] flex items-center justify-center text-charcoal/50 hover:text-[#810B38] hover:border-[#810B38] transition-all duration-300"
                aria-label="Fermer le panier"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#FAF6F2] flex items-center justify-center">
                    <ShoppingBag size={28} className="text-[#810B38]/30" />
                  </div>
                  <div>
                    <p className="font-cormorant text-xl text-charcoal mb-1">
                      Votre panier est vide
                    </p>
                    <p className="font-montserrat text-xs text-charcoal/40">
                      Découvrez notre collection exclusive
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="btn-luxury mt-2 bg-[#810B38] text-white text-luxury-xs px-8 py-3 rounded-full shadow-burgundy hover:bg-[#5c0828] transition-all duration-300"
                  >
                    Explorer la collection
                  </button>
                </motion.div>
              ) : (
                <div className="px-6 flex flex-col gap-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.color}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex gap-4 py-4 border-b border-[#F9F5F1] last:border-0"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF6F2]">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-cormorant font-medium text-charcoal text-base leading-tight">
                                {item.product.name}
                              </p>
                              <p className="text-luxury-xs text-charcoal/40 mt-0.5">
                                {item.color}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.color)
                              }
                              className="text-charcoal/30 hover:text-red-400 transition-colors flex-shrink-0"
                              aria-label="Supprimer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity */}
                            <div className="flex items-center gap-2 border border-[#F0E9E1] rounded-full px-1 py-0.5">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.color,
                                    item.quantity - 1
                                  )
                                }
                                className="w-6 h-6 flex items-center justify-center text-charcoal/50 hover:text-[#810B38] transition-colors"
                                aria-label="Diminuer"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="font-montserrat text-xs text-charcoal w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.color,
                                    item.quantity + 1
                                  )
                                }
                                className="w-6 h-6 flex items-center justify-center text-charcoal/50 hover:text-[#810B38] transition-colors"
                                aria-label="Augmenter"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="font-montserrat font-medium text-[#810B38] text-sm">
                              {item.product.price * item.quantity} MAD
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#F0E9E1] p-6 flex flex-col gap-4 bg-[#FAF6F2]">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-montserrat text-sm text-charcoal/60">
                    Total estimé
                  </span>
                  <span className="font-cormorant font-bold text-[#810B38] text-2xl">
                    {total} MAD
                  </span>
                </div>

                <p className="text-luxury-xs text-charcoal/40 text-center">
                  Livraison gratuite · Paiement à la livraison
                </p>

                {/* Checkout Button */}
                <Link
                  href="/commander"
                  onClick={closeCart}
                  className="btn-luxury flex items-center justify-center gap-3 bg-[#810B38] text-white text-luxury-xs px-6 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] hover:shadow-burgundy-glow transition-all duration-300 group"
                >
                  Passer la commande
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>

                <p className="font-montserrat text-xs text-center text-charcoal/30">
                  {BRAND_NAME_STYLIZED} · Livraison partout au Maroc
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
