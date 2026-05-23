"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Shield, Truck, Clock, Check, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  useCheckout,
  CompletedOrder,
  OrderItem,
} from "@/context/CheckoutContext";
import {
  OFFERS,
  getProduct,
  pickUpsellProduct,
} from "@/lib/products";
import { validatePhone, normalizePhone, generateOrderId } from "@/lib/order";
import { BRAND_SIGNATURE } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;
const COUNTDOWN_SECONDS = 15 * 60;

function formatCountdown(s: number): string {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
}

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    setActiveOrder,
    openUpsell,
  } = useCheckout();
  const { items, total, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean }>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  const nameValid = name.trim().length >= 2;
  const phoneValid = validatePhone(phone);
  const formValid = nameValid && phoneValid && items.length > 0;

  const orderLines = useMemo(() => {
    return items
      .map((item) => {
        const product = getProduct(item.slug);
        if (!product) return null;
        const offer = OFFERS[item.offer];
        return { product, offer };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [items]);

  // Reset state when reopened
  useEffect(() => {
    if (isCheckoutOpen) {
      setSubmitError(null);
      setCountdown(COUNTDOWN_SECONDS);
    }
  }, [isCheckoutOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isCheckoutOpen) return;
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [isCheckoutOpen, countdown]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCheckoutOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!formValid) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const orderId = generateOrderId();
      const phoneNormalized = normalizePhone(phone);

      const orderItems: OrderItem[] = orderLines.map(({ product, offer }) => ({
        slug: product.slug,
        name: product.shortName,
        offer: offer.label,
        qty: offer.qty,
        price: offer.price,
        image: product.images[0],
      }));

      const subtotal = orderItems.reduce((s, it) => s + it.price, 0);

      const order: CompletedOrder = {
        orderId,
        name: name.trim(),
        phone: phoneNormalized,
        items: orderItems,
        subtotal,
        upsellAccepted: false,
        upsellItem: null,
        total: subtotal,
        createdAt: new Date().toISOString(),
      };

      // Simulate async submission delay
      await new Promise((r) => setTimeout(r, 700));

      setActiveOrder(order);

      const upsellProduct = pickUpsellProduct(items.map((i) => i.slug));

      clearCart();
      closeCheckout();
      setName("");
      setPhone("");
      setTouched({});

      if (upsellProduct) {
        // Slight delay for smoother modal swap
        setTimeout(() => openUpsell(upsellProduct), 120);
      } else {
        window.location.href = "/merci";
      }
    } catch (err) {
      setSubmitError("Une erreur est survenue, réessaie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={() => !submitting && closeCheckout()}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col lg:flex-row pointer-events-auto"
            >
              {/* Close button */}
              <button
                onClick={() => !submitting && closeCheckout()}
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 lg:bg-white border border-[#F0E9E1] flex items-center justify-center text-charcoal/60 hover:text-[#810B38] hover:border-[#810B38] transition-all duration-300"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>

              {/* LEFT — Order summary (dark) */}
              <div className="bg-[#1A1A1A] text-white p-6 lg:p-8 lg:w-[44%] flex flex-col gap-5 max-h-[40vh] lg:max-h-none overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-2 text-[#C4956A]">
                  <span className="text-[10px] tracking-[0.18em] uppercase">
                    Récapitulatif
                  </span>
                </div>

                <p className="font-cormorant text-2xl lg:text-3xl leading-tight">
                  Ta commande est prête.
                </p>

                {/* Maison signature */}
                <p
                  className="font-cormorant italic text-[#C4956A]/80 text-base lg:text-lg -mt-2 tracking-wide select-none"
                  aria-label="Be bold. Be elegant. Be Rebelle."
                >
                  {BRAND_SIGNATURE}
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  {orderLines.map(({ product, offer }) => (
                    <div
                      key={product.slug}
                      className="flex gap-3 pb-3 border-b border-white/10 last:border-0"
                    >
                      <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                        <Image
                          src={product.images[0]}
                          alt={product.shortName}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-cormorant text-base leading-tight truncate">
                          {product.shortName}
                        </p>
                        <p className="text-[11px] tracking-wide text-white/50 mt-0.5">
                          {offer.label}
                        </p>
                      </div>
                      <p className="font-montserrat font-medium text-[#C4956A] text-sm whitespace-nowrap">
                        {offer.price} DH
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Livraison</span>
                    <span className="text-emerald-300 font-medium">
                      Gratuite
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-white/70 text-sm">Total</span>
                    <span className="font-cormorant text-3xl text-[#C4956A] font-bold">
                      {total} DH
                    </span>
                  </div>
                </div>

                {/* Scarcity + timer pill */}
                <div className="bg-[#810B38] rounded-2xl p-3.5 flex items-center gap-3">
                  <Clock size={16} className="flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-white/80">
                      Offre réservée
                    </p>
                    <p className="font-montserrat font-bold text-base">
                      {formatCountdown(countdown)}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-white/40 leading-relaxed">
                  Plus que 3 places confirmées aujourd&apos;hui · 23 femmes ont
                  commandé.
                </p>
              </div>

              {/* RIGHT — Form */}
              <div className="bg-white p-6 lg:p-8 flex-1 flex flex-col gap-5 overflow-y-auto no-scrollbar">
                <div>
                  <p className="text-[#C4956A] text-[10px] tracking-[0.18em] uppercase">
                    Étape finale
                  </p>
                  <h2 className="font-cormorant font-medium text-charcoal text-2xl lg:text-3xl leading-tight mt-1">
                    Tes coordonnées
                  </h2>
                  <p className="text-[12px] text-charcoal/50 mt-1.5">
                    Notre équipe te contactera pour confirmer la livraison.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-charcoal/60 mb-2">
                      Prénom *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        placeholder="Ex: Fatima"
                        autoComplete="given-name"
                        className={`w-full px-5 py-3.5 rounded-xl border bg-[#FAF6F2] text-sm font-montserrat text-charcoal outline-none transition-all duration-200 ${
                          touched.name && !nameValid
                            ? "border-red-300 bg-red-50 focus:bg-white"
                            : "border-[#F0E9E1] focus:border-[#810B38] focus:bg-white focus:shadow-[0_0_0_3px_rgba(129,11,56,0.12)]"
                        }`}
                      />
                      {nameValid && (
                        <Check
                          size={14}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500"
                        />
                      )}
                    </div>
                    {touched.name && !nameValid && (
                      <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle size={10} /> Prénom requis
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] tracking-wider uppercase text-charcoal/60 mb-2">
                      Téléphone (Maroc) *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, phone: true }))
                        }
                        placeholder="Ex: 0612345678"
                        autoComplete="tel"
                        inputMode="tel"
                        className={`w-full px-5 py-3.5 rounded-xl border bg-[#FAF6F2] text-sm font-montserrat text-charcoal outline-none transition-all duration-200 ${
                          touched.phone && !phoneValid
                            ? "border-red-300 bg-red-50 focus:bg-white"
                            : "border-[#F0E9E1] focus:border-[#810B38] focus:bg-white focus:shadow-[0_0_0_3px_rgba(129,11,56,0.12)]"
                        }`}
                      />
                      {phoneValid && (
                        <Check
                          size={14}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500"
                        />
                      )}
                    </div>
                    <p className="text-[11px] text-charcoal/40 mt-1.5">
                      Formats acceptés : 0612345678, 212612345678 ou
                      +212612345678
                    </p>
                    {touched.phone && !phoneValid && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> Numéro marocain invalide
                      </p>
                    )}
                  </div>

                  {/* COD reassurance block */}
                  <div className="bg-[#FAF6F2] border-l-[3px] border-[#810B38] rounded-r-xl pl-4 pr-4 py-3.5 flex gap-3 items-start">
                    <Shield
                      size={16}
                      className="text-[#810B38] flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-wider text-charcoal">
                        Paiement à la livraison
                      </p>
                      <p className="text-[11px] text-charcoal/55 leading-relaxed mt-0.5">
                        Tu ne paies que quand le sac est dans tes mains. Aucune
                        avance, zéro risque.
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={!formValid || submitting}
                    whileTap={{ scale: formValid && !submitting ? 0.97 : 1 }}
                    className={`w-full mt-1 flex items-center justify-center gap-3 px-6 py-4 rounded-full font-montserrat font-semibold text-[12px] tracking-[0.12em] uppercase transition-all duration-300 ${
                      formValid && !submitting
                        ? "bg-[#810B38] text-white hover:bg-[#5c0828] shadow-[0_8px_30px_rgba(129,11,56,0.3)]"
                        : "bg-[#E8D5C4] text-charcoal/40 cursor-not-allowed"
                    }`}
                  >
                    {submitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Traitement en cours...
                      </>
                    ) : (
                      <>Confirmer ma commande</>
                    )}
                  </motion.button>

                  {submitError && (
                    <p className="text-[11px] text-red-500 text-center">
                      {submitError}
                    </p>
                  )}

                  {/* Trust pills */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { icon: Shield, label: "COD" },
                      { icon: Truck, label: "2-4 jours" },
                      { icon: Check, label: "Retour 7j" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#FAF6F2] border border-[#F0E9E1]"
                      >
                        <Icon size={11} className="text-[#810B38]" />
                        <span className="text-[10px] tracking-wider uppercase text-charcoal/60">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
