"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Shield, Gift, Check } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";
import { UPSELL_DISCOUNTED_PRICE, UPSELL_REFERENCE_PRICE } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;
const COUNTDOWN_SECONDS = 12;

export default function UpsellPopup() {
  const { isUpsellOpen, upsellProduct, closeUpsell, acceptUpsell } =
    useCheckout();
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [accepting, setAccepting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Reset & lock scroll when opened
  useEffect(() => {
    if (isUpsellOpen) {
      setCountdown(COUNTDOWN_SECONDS);
      setAccepting(false);
      setRedirecting(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isUpsellOpen]);

  // Countdown
  useEffect(() => {
    if (!isUpsellOpen || redirecting || accepting) return;
    if (countdown <= 0) {
      handleDecline();
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, isUpsellOpen, redirecting, accepting]);

  function goToThankYou() {
    setRedirecting(true);
    closeUpsell();
    setTimeout(() => {
      window.location.href = "/merci";
    }, 220);
  }

  function handleAccept() {
    if (accepting || redirecting) return;
    setAccepting(true);
    acceptUpsell();
    setTimeout(goToThankYou, 500);
  }

  function handleDecline() {
    if (redirecting) return;
    goToThankYou();
  }

  if (!upsellProduct) return null;

  const progress = ((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100;
  const urgent = countdown <= 5;

  return (
    <AnimatePresence>
      {isUpsellOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm"
            onClick={handleDecline}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative w-full max-w-md max-h-[94vh] overflow-y-auto no-scrollbar rounded-3xl bg-white shadow-2xl pointer-events-auto"
            >
              {/* Timer bar */}
              <div className="h-1.5 bg-[#F0E9E1] rounded-t-3xl overflow-hidden">
                <motion.div
                  className={`h-full ${
                    urgent ? "bg-red-500" : "bg-[#810B38]"
                  }`}
                  style={{ width: `${100 - progress}%` }}
                  animate={{ width: `${100 - progress}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </div>

              {/* Close button (discreet) */}
              <button
                onClick={handleDecline}
                className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white border border-[#F0E9E1] flex items-center justify-center text-charcoal/40 hover:text-[#810B38] transition-all"
                aria-label="Ignorer cette offre"
              >
                <X size={14} />
              </button>

              <div className="p-6 sm:p-8 flex flex-col gap-5">
                {/* Header */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-[#FAF6F2] px-4 py-1.5 rounded-full mb-3">
                    <Gift size={12} className="text-[#810B38]" />
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#810B38] font-medium">
                      Offre Exclusive
                    </span>
                  </div>
                  <h2 className="font-cormorant text-charcoal text-2xl sm:text-3xl leading-tight">
                    Attends ! Une dernière chose
                    <br />
                    <em className="text-[#810B38] font-medium">
                      avant de partir.
                    </em>
                  </h2>
                  <p className="text-[12px] text-charcoal/55 mt-2">
                    Nos clientes qui commandent ce style adorent aussi :
                  </p>
                </div>

                {/* Product card */}
                <div className="bg-[#FAF6F2] rounded-2xl p-4 flex gap-4 items-center">
                  <div className="relative w-24 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-sm">
                    <Image
                      src={upsellProduct.images[0]}
                      alt={upsellProduct.shortName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant font-medium text-charcoal text-lg leading-tight">
                      {upsellProduct.shortName}
                    </p>
                    <p className="text-[11px] text-charcoal/50 leading-relaxed mt-1 italic">
                      {upsellProduct.tagline}
                    </p>
                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="font-montserrat text-charcoal/40 text-sm line-through">
                        {UPSELL_REFERENCE_PRICE} DH
                      </span>
                      <span className="font-cormorant font-bold text-[#810B38] text-2xl">
                        {UPSELL_DISCOUNTED_PRICE} DH
                      </span>
                    </div>
                  </div>
                </div>

                {/* Urgency message */}
                <div className="text-center">
                  <p
                    className={`font-montserrat text-[12px] tracking-wider uppercase ${
                      urgent ? "text-red-500" : "text-charcoal/60"
                    }`}
                  >
                    Cette remise expire dans{" "}
                    <span className="font-bold text-lg align-middle">
                      {countdown}s
                    </span>
                  </p>
                  <p className="text-[11px] text-charcoal/40 mt-1">
                    Disponible uniquement ici · uniquement maintenant
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2.5">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAccept}
                    disabled={accepting || redirecting}
                    className="w-full flex items-center justify-center gap-2 bg-[#810B38] text-white font-montserrat font-semibold text-[12px] tracking-[0.12em] uppercase px-6 py-4 rounded-full hover:bg-[#5c0828] shadow-[0_8px_30px_rgba(129,11,56,0.3)] transition-all duration-300 disabled:opacity-80"
                  >
                    {accepting ? (
                      <>
                        <Check size={14} />
                        Ajouté à ta commande
                      </>
                    ) : (
                      <>Oui, je l&apos;ajoute · 469 DH</>
                    )}
                  </motion.button>
                  <button
                    onClick={handleDecline}
                    disabled={redirecting || accepting}
                    className="w-full text-[11px] tracking-wider uppercase text-charcoal/45 hover:text-[#810B38] transition-colors py-2"
                  >
                    Non merci, je passe
                  </button>
                </div>

                {/* COD reassurance */}
                <div className="flex items-center gap-2 justify-center pt-1">
                  <Shield size={12} className="text-[#810B38]" />
                  <p className="text-[10px] tracking-wider uppercase text-charcoal/45">
                    Tu paies à la livraison · Zéro avance
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
