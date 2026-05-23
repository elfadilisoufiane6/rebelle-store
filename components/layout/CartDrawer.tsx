"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import {
  OFFERS,
  OfferKey,
  getProduct,
  getCrossells,
  Product,
} from "@/lib/products";
import { BRAND_SIGNATURE } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CartDrawer() {
  const {
    items,
    count,
    total,
    removeItem,
    updateOffer,
    addItem,
    closeCart,
    isOpen,
  } = useCart();
  const { openCheckout } = useCheckout();

  const cartSlugs = items.map((i) => i.slug);
  const crossells = getCrossells(cartSlugs, 3);

  // Upgrade nudge logic — encourage going to a higher tier
  const firstItem = items[0];
  const upgradeNudge: { from: OfferKey; to: OfferKey; saving: number } | null =
    firstItem && firstItem.offer === "1piece"
      ? { from: "1piece", to: "2pieces", saving: 239 }
      : firstItem && firstItem.offer === "2pieces"
      ? { from: "2pieces", to: "3pieces", saving: 200 }
      : null;

  const handleCheckout = () => {
    closeCart();
    setTimeout(() => openCheckout(), 200);
  };

  const handleQuickAdd = (product: Product) => {
    addItem(product, "1piece");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-[2px] z-[60]"
            onClick={closeCart}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0E9E1]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={16} className="text-[#810B38]" />
                <div className="flex items-baseline gap-2">
                  <span className="font-cormorant font-medium text-charcoal text-lg">
                    Ton panier
                  </span>
                  {count > 0 && (
                    <span className="text-[10px] tracking-wider uppercase text-[#810B38]">
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

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} crossells={crossells} />
              ) : (
                <div className="px-6 py-5 flex flex-col gap-5">
                  {/* Cart items */}
                  <div className="flex flex-col gap-4">
                    <AnimatePresence initial={false}>
                      {items.map((item) => {
                        const product = getProduct(item.slug);
                        if (!product) return null;
                        const offer = OFFERS[item.offer];
                        return (
                          <motion.div
                            key={item.slug}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, height: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="flex gap-4 pb-4 border-b border-[#F9F5F1] last:border-0"
                          >
                            <div className="relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF6F2]">
                              <Image
                                src={product.images[0]}
                                alt={product.shortName}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="font-cormorant font-medium text-charcoal text-base leading-tight truncate">
                                    {product.shortName}
                                  </p>
                                  <p className="text-[10px] tracking-wider uppercase text-charcoal/40 mt-0.5">
                                    {product.tagline}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.slug)}
                                  className="text-charcoal/30 hover:text-red-400 transition-colors flex-shrink-0"
                                  aria-label="Supprimer"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>

                              {/* Offer selector */}
                              <div className="mt-2.5 flex items-center gap-1">
                                {(["1piece", "2pieces", "3pieces"] as OfferKey[]).map(
                                  (key) => {
                                    const o = OFFERS[key];
                                    const selected = item.offer === key;
                                    return (
                                      <button
                                        key={key}
                                        onClick={() =>
                                          updateOffer(item.slug, key)
                                        }
                                        className={`flex-1 px-1.5 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-medium transition-all duration-200 ${
                                          selected
                                            ? "bg-[#810B38] text-white"
                                            : "bg-[#FAF6F2] text-charcoal/55 hover:bg-[#F0E9E1]"
                                        }`}
                                      >
                                        ×{o.qty}
                                      </button>
                                    );
                                  }
                                )}
                              </div>

                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-[10px] tracking-wider uppercase text-charcoal/45">
                                  {offer.label}
                                </span>
                                <span className="font-montserrat font-medium text-[#810B38] text-sm">
                                  {offer.price} DH
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Upgrade nudge */}
                  {upgradeNudge && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      onClick={() =>
                        firstItem && updateOffer(firstItem.slug, upgradeNudge.to)
                      }
                      className="group flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-[#FAF6F2] to-[#F5EDE8] border border-[#E8D5C4] hover:border-[#810B38] transition-all duration-300 text-left"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#810B38]/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp size={14} className="text-[#810B38]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-charcoal leading-tight">
                          Passe à {OFFERS[upgradeNudge.to].label}
                        </p>
                        <p className="text-[11px] text-charcoal/50 mt-0.5">
                          Économise {OFFERS[upgradeNudge.to].saving} DH au
                          total
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-[#810B38] group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                      />
                    </motion.button>
                  )}

                  {/* Crossells */}
                  {crossells.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={11} className="text-[#C4956A]" />
                        <p className="text-[10px] tracking-[0.18em] uppercase text-charcoal/60">
                          Les clientes ont aussi aimé
                        </p>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {crossells.map((p) => (
                          <CrossellCard
                            key={p.slug}
                            product={p}
                            onAdd={() => handleQuickAdd(p)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer (checkout) */}
            {items.length > 0 && (
              <div className="border-t border-[#F0E9E1] bg-[#FAF6F2] px-6 py-5 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-charcoal/50">
                      Total
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                      Livraison gratuite incluse
                    </p>
                  </div>
                  <span className="font-cormorant font-bold text-[#810B38] text-3xl">
                    {total} DH
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="group flex items-center justify-center gap-3 bg-[#810B38] text-white font-montserrat font-semibold text-[11px] tracking-[0.14em] uppercase px-6 py-4 rounded-full hover:bg-[#5c0828] shadow-[0_8px_30px_rgba(129,11,56,0.3)] transition-all duration-300"
                >
                  Confirmer ma commande
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </motion.button>

                <p className="text-[10px] text-center tracking-wider uppercase text-charcoal/40">
                  Paiement à la livraison · 100% sécurisé
                </p>
                <p
                  className="font-cormorant italic text-[#C4956A]/85 text-sm text-center tracking-wide select-none"
                  aria-label="Be bold. Be elegant. Be Rebelle."
                >
                  {BRAND_SIGNATURE}
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyCart({
  onClose,
  crossells,
}: {
  onClose: () => void;
  crossells: Product[];
}) {
  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center px-8 pt-12 pb-8 gap-4"
      >
        <Image
          src="/assets/images/Logo/logo.png"
          alt="Rebelle"
          width={160}
          height={56}
          className="h-14 w-auto object-contain"
        />
        <div>
          <p className="font-cormorant text-2xl text-charcoal mb-1">
            Ton panier est vide
          </p>
          <p className="font-montserrat text-[12px] text-charcoal/50 leading-relaxed max-w-xs">
            Prends le temps de découvrir notre collection — tu trouveras le sac
            qu&apos;il te faut.
          </p>
        </div>
        <Link
          href="/collection"
          onClick={onClose}
          className="mt-2 inline-flex items-center gap-2 bg-[#810B38] text-white font-montserrat font-semibold text-[11px] tracking-[0.14em] uppercase px-7 py-3.5 rounded-full hover:bg-[#5c0828] shadow-[0_6px_24px_rgba(129,11,56,0.25)] transition-all duration-300"
        >
          Découvrir la collection
          <ArrowRight size={12} />
        </Link>
      </motion.div>

      {/* Inspired for you */}
      {crossells.length > 0 && (
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={11} className="text-[#C4956A]" />
            <p className="text-[10px] tracking-[0.18em] uppercase text-charcoal/60">
              Inspiration pour toi
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {crossells.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/produits/${p.slug}`}
                onClick={onClose}
                className="group flex items-center gap-3 p-3 rounded-xl border border-[#F0E9E1] bg-white hover:border-[#810B38] transition-all duration-300"
              >
                <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-[#FAF6F2] flex-shrink-0">
                  <Image
                    src={p.images[0]}
                    alt={p.shortName}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-cormorant text-charcoal text-base leading-tight truncate">
                    {p.shortName}
                  </p>
                  <p className="text-[10px] tracking-wider uppercase text-charcoal/40 mt-0.5">
                    Dès 469 DH
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-[#810B38] group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CrossellCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
}) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl border border-[#F0E9E1] bg-white hover:border-[#810B38] transition-all duration-300">
      <Link
        href={`/produits/${product.slug}`}
        className="relative w-14 h-16 rounded-lg overflow-hidden bg-[#FAF6F2] flex-shrink-0"
      >
        <Image
          src={product.images[0]}
          alt={product.shortName}
          fill
          sizes="56px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <Link
        href={`/produits/${product.slug}`}
        className="flex-1 min-w-0"
      >
        <p className="font-cormorant text-charcoal text-base leading-tight truncate group-hover:text-[#810B38] transition-colors">
          {product.shortName}
        </p>
        <p className="text-[10px] tracking-wider uppercase text-charcoal/40 mt-0.5">
          469 DH
        </p>
      </Link>
      <button
        onClick={onAdd}
        className="flex-shrink-0 px-3 py-1.5 rounded-full border border-[#810B38] text-[#810B38] text-[10px] tracking-wider uppercase font-medium hover:bg-[#810B38] hover:text-white transition-all duration-300"
      >
        Ajouter
      </button>
    </div>
  );
}
