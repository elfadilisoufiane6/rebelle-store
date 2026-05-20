"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Shield,
  Truck,
  ChevronRight,
  Check,
  MapPin,
  User,
  Phone,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { BRAND_NAME_STYLIZED, WHATSAPP_URL } from "@/lib/constants";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
};

const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kenitra", "Tétouan", "Safi", "El Jadida",
  "Béni Mellal", "Nador", "Settat", "Autre",
];

export default function CommanderPage() {
  const router = useRouter();
  const { items, total, count, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!form.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!form.phone.trim() || !/^[0-9+\s\-]{8,15}$/.test(form.phone.trim()))
      newErrors.phone = "Numéro de téléphone invalide";
    if (!form.city) newErrors.city = "Ville requise";
    if (!form.address.trim()) newErrors.address = "Adresse requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = (): string => {
    const orderLines = items
      .map(
        (item) =>
          `• ${item.product.name} (${item.color}) x${item.quantity} — ${
            item.product.price * item.quantity
          } MAD`
      )
      .join("\n");

    return encodeURIComponent(
      `🛍️ *Nouvelle commande ${BRAND_NAME_STYLIZED}*\n\n` +
        `*Client :* ${form.firstName} ${form.lastName}\n` +
        `*Téléphone :* ${form.phone}\n` +
        `*Ville :* ${form.city}\n` +
        `*Adresse :* ${form.address}\n` +
        (form.notes ? `*Notes :* ${form.notes}\n` : "") +
        `\n*Commande :*\n${orderLines}\n\n` +
        `*Total :* ${total} MAD\n` +
        `*Paiement :* À la livraison\n\n` +
        `Merci de confirmer la disponibilité.`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 800));

    const msg = buildWhatsAppMessage();
    const whatsappLink = `${WHATSAPP_URL}?text=${msg}`;

    clearCart();
    window.open(whatsappLink, "_blank");
    router.push("/merci");
  };

  if (count === 0 && !submitting) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center pt-20 px-6">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 rounded-full bg-[#FAF6F2] flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={28} className="text-[#810B38]/30" />
            </div>
            <h1 className="font-cormorant text-2xl text-charcoal mb-2">
              Votre panier est vide
            </h1>
            <p className="font-montserrat text-sm text-charcoal/50 mb-6">
              Découvrez nos pièces d&apos;exception avant de passer commande.
            </p>
            <Link
              href="/#collection"
              className="btn-luxury inline-flex items-center gap-2 bg-[#810B38] text-white text-luxury-xs px-8 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] transition-all duration-300"
            >
              Explorer la collection
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-[#FAF6F2] pt-20 lg:pt-24">
        {/* Header */}
        <div className="bg-white border-b border-[#F0E9E1]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2">
              {[
                { label: "Panier", href: "/" },
                { label: "Commander", href: "#" },
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
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { num: 1, label: "Récapitulatif" },
              { num: 2, label: "Livraison" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 cursor-pointer ${
                    step >= s.num ? "text-[#810B38]" : "text-charcoal/30"
                  }`}
                  onClick={() => step > s.num && setStep(s.num as 1 | 2)}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-montserrat font-medium transition-all duration-300 ${
                      step > s.num
                        ? "bg-[#810B38] text-white"
                        : step === s.num
                        ? "bg-[#810B38] text-white"
                        : "border border-[#E8D5C4] text-charcoal/30"
                    }`}
                  >
                    {step > s.num ? <Check size={12} /> : s.num}
                  </div>
                  <span className="text-luxury-xs hidden sm:block">{s.label}</span>
                </div>
                {i < 1 && (
                  <div
                    className={`w-12 h-px transition-colors duration-300 ${
                      step > 1 ? "bg-[#810B38]" : "bg-[#E8D5C4]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  /* Step 1: Order Summary */
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-3xl p-6 lg:p-8 shadow-soft"
                  >
                    <h2 className="font-cormorant font-medium text-charcoal text-2xl mb-6">
                      Récapitulatif de la commande
                    </h2>

                    <div className="flex flex-col gap-4 mb-6">
                      {items.map((item) => (
                        <div
                          key={`${item.product.id}-${item.color}`}
                          className="flex gap-4 py-4 border-b border-[#F9F5F1] last:border-0"
                        >
                          <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF6F2]">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between gap-2">
                              <div>
                                <p className="font-cormorant font-medium text-charcoal text-base">
                                  {item.product.name}
                                </p>
                                <p className="text-luxury-xs text-charcoal/40 mt-0.5">
                                  {item.color} · Qté: {item.quantity}
                                </p>
                              </div>
                              <p className="font-montserrat font-medium text-[#810B38] text-sm flex-shrink-0">
                                {item.product.price * item.quantity} MAD
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#FAF6F2] rounded-2xl p-5 mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-montserrat text-sm text-charcoal/60">
                          Sous-total ({count} article{count > 1 ? "s" : ""})
                        </span>
                        <span className="font-montserrat text-sm text-charcoal">
                          {total} MAD
                        </span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="font-montserrat text-sm text-charcoal/60">
                          Livraison
                        </span>
                        <span className="font-montserrat text-sm text-green-600 font-medium">
                          Gratuite
                        </span>
                      </div>
                      <div className="border-t border-[#F0E9E1] pt-3 flex justify-between">
                        <span className="font-cormorant font-medium text-charcoal text-lg">
                          Total
                        </span>
                        <span className="font-cormorant font-bold text-[#810B38] text-2xl">
                          {total} MAD
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      className="btn-luxury w-full flex items-center justify-center gap-3 bg-[#810B38] text-white text-luxury-xs px-6 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] transition-all duration-300"
                    >
                      Continuer vers la livraison
                      <ChevronRight size={14} />
                    </motion.button>
                  </motion.div>
                ) : (
                  /* Step 2: Delivery Form */
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-3xl p-6 lg:p-8 shadow-soft"
                  >
                    <h2 className="font-cormorant font-medium text-charcoal text-2xl mb-6">
                      Informations de livraison
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      {/* Name Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-luxury-xs text-charcoal/60 mb-2 block">
                            Prénom *
                          </label>
                          <div className="relative">
                            <User
                              size={14}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30"
                            />
                            <input
                              type="text"
                              name="firstName"
                              value={form.firstName}
                              onChange={handleChange}
                              placeholder="Votre prénom"
                              className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm font-montserrat outline-none transition-all duration-300 ${
                                errors.firstName
                                  ? "border-red-300 bg-red-50"
                                  : "border-[#F0E9E1] bg-[#FAF6F2] focus:border-[#810B38] focus:bg-white"
                              }`}
                            />
                          </div>
                          {errors.firstName && (
                            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-luxury-xs text-charcoal/60 mb-2 block">
                            Nom *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            className={`w-full px-4 py-3.5 rounded-xl border text-sm font-montserrat outline-none transition-all duration-300 ${
                              errors.lastName
                                ? "border-red-300 bg-red-50"
                                : "border-[#F0E9E1] bg-[#FAF6F2] focus:border-[#810B38] focus:bg-white"
                            }`}
                          />
                          {errors.lastName && (
                            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="text-luxury-xs text-charcoal/60 mb-2 block">
                          Numéro de téléphone *
                        </label>
                        <div className="relative">
                          <Phone
                            size={14}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30"
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+212 6XX XXX XXX"
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm font-montserrat outline-none transition-all duration-300 ${
                              errors.phone
                                ? "border-red-300 bg-red-50"
                                : "border-[#F0E9E1] bg-[#FAF6F2] focus:border-[#810B38] focus:bg-white"
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="text-luxury-xs text-charcoal/60 mb-2 block">
                          Ville *
                        </label>
                        <div className="relative">
                          <MapPin
                            size={14}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 z-10"
                          />
                          <select
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl border text-sm font-montserrat outline-none transition-all duration-300 appearance-none bg-no-repeat cursor-pointer ${
                              errors.city
                                ? "border-red-300 bg-red-50"
                                : "border-[#F0E9E1] bg-[#FAF6F2] focus:border-[#810B38] focus:bg-white"
                            } ${!form.city ? "text-charcoal/30" : "text-charcoal"}`}
                          >
                            <option value="">Sélectionner votre ville</option>
                            {MOROCCAN_CITIES.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.city && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.city}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <label className="text-luxury-xs text-charcoal/60 mb-2 block">
                          Adresse de livraison *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Rue, quartier, numéro d'appartement..."
                          className={`w-full px-4 py-3.5 rounded-xl border text-sm font-montserrat outline-none transition-all duration-300 ${
                            errors.address
                              ? "border-red-300 bg-red-50"
                              : "border-[#F0E9E1] bg-[#FAF6F2] focus:border-[#810B38] focus:bg-white"
                          }`}
                        />
                        {errors.address && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.address}
                          </p>
                        )}
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="text-luxury-xs text-charcoal/60 mb-2 block">
                          Notes (optionnel)
                        </label>
                        <textarea
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                          placeholder="Instructions spéciales pour la livraison..."
                          rows={2}
                          className="w-full px-4 py-3.5 rounded-xl border border-[#F0E9E1] bg-[#FAF6F2] focus:border-[#810B38] focus:bg-white text-sm font-montserrat outline-none transition-all duration-300 resize-none"
                        />
                      </div>

                      {/* Payment badge */}
                      <div className="glass-burgundy rounded-2xl p-4 flex items-center gap-3">
                        <Shield size={16} className="text-[#810B38] flex-shrink-0" />
                        <p className="font-montserrat text-xs text-charcoal/60 leading-relaxed">
                          <span className="font-medium text-charcoal">
                            Paiement à la livraison.{" "}
                          </span>
                          Vous payez uniquement à la réception de votre colis. Zéro risque.
                        </p>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.02, y: submitting ? 0 : -1 }}
                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                        className="btn-luxury w-full flex items-center justify-center gap-3 bg-[#810B38] text-white text-luxury-xs px-6 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Envoi de la commande...
                          </>
                        ) : (
                          <>
                            <MessageCircle size={14} />
                            Confirmer la commande via WhatsApp
                          </>
                        )}
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-luxury-xs text-charcoal/40 hover:text-[#810B38] transition-colors text-center"
                      >
                        ← Retour au récapitulatif
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-2 order-first lg:order-last">
              <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-28">
                <h3 className="font-cormorant font-medium text-charcoal text-lg mb-5">
                  Votre sélection
                </h3>

                <div className="flex flex-col gap-3 mb-5">
                  {items.slice(0, 3).map((item) => (
                    <div
                      key={`${item.product.id}-${item.color}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#FAF6F2]">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-montserrat text-xs font-medium text-charcoal truncate">
                          {item.product.name}
                        </p>
                        <p className="text-luxury-xs text-charcoal/40">
                          {item.color} · x{item.quantity}
                        </p>
                      </div>
                      <p className="font-montserrat text-xs font-medium text-[#810B38] flex-shrink-0">
                        {item.product.price * item.quantity} MAD
                      </p>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-luxury-xs text-charcoal/40 text-center">
                      +{items.length - 3} autre{items.length - 3 > 1 ? "s" : ""} article{items.length - 3 > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <div className="border-t border-[#F0E9E1] pt-4 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="font-cormorant text-charcoal text-lg">Total</span>
                    <span className="font-cormorant font-bold text-[#810B38] text-2xl">
                      {total} MAD
                    </span>
                  </div>
                  <p className="text-luxury-xs text-green-600 mt-1">
                    + Livraison gratuite
                  </p>
                </div>

                {/* Trust Icons */}
                <div className="flex flex-col gap-2">
                  {[
                    { icon: Shield, text: "Paiement à la livraison" },
                    { icon: Truck, text: "Livraison 2-4 jours" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon size={13} className="text-[#810B38]" />
                      <span className="text-luxury-xs text-charcoal/50">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
