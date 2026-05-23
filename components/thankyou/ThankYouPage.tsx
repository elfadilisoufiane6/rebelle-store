"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Package,
  Truck,
  Phone,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";
import {
  CompletedOrder,
  loadStoredOrder,
} from "@/context/CheckoutContext";
import { BRAND_SIGNATURE } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ThankYouPage() {
  const [order, setOrder] = useState<CompletedOrder | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOrder(loadStoredOrder());
    setHydrated(true);
  }, []);

  const orderedSlugs = order?.items.map((i) => i.slug) ?? [];
  const upsellSlug = order?.upsellItem?.slug;
  const inOrderSlugs = upsellSlug
    ? [...orderedSlugs, upsellSlug]
    : orderedSlugs;
  const gridProducts = products.filter((p) => !inOrderSlugs.includes(p.slug));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 lg:pt-32 pb-20">
        {/* Hero confirmation */}
        <section className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative w-24 h-24">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-[#810B38]/10"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="absolute inset-3 rounded-full bg-[#810B38]/20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle size={40} className="text-[#810B38]" />
              </div>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-[#810B38]/20"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2 + i * 0.4, opacity: 0 }}
                  transition={{
                    duration: 1.6,
                    delay: 0.5 + i * 0.2,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 2.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#C4956A] text-[10px] tracking-[0.18em] uppercase mb-3"
          >
            Commande confirmée
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-cormorant text-charcoal leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)" }}
          >
            Merci{order?.name ? `, ${order.name}` : ""}.
            <br />
            <em className="not-italic text-[#810B38] font-semibold">
              On s&apos;occupe du reste.
            </em>
          </motion.h1>

          {/* Maison signature */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="font-cormorant italic text-[#C4956A] mt-4 tracking-wide select-none"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
            aria-label="Be bold. Be elegant. Be Rebelle."
          >
            {BRAND_SIGNATURE}
          </motion.p>

          {hydrated && order ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-montserrat text-sm text-charcoal/55 mt-5 max-w-lg mx-auto"
            >
              Ta commande{" "}
              <span className="font-medium text-charcoal">{order.orderId}</span>{" "}
              est enregistrée. Notre équipe te contactera pour confirmer la
              livraison.
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-montserrat text-sm text-charcoal/55 mt-5 max-w-lg mx-auto"
            >
              Ta commande est enregistrée. Notre équipe te contactera pour
              confirmer la livraison.
            </motion.p>
          )}
        </section>

        {/* Order summary card */}
        {hydrated && order && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
            className="max-w-2xl mx-auto px-6 lg:px-8 mt-12"
          >
            <div className="rounded-3xl border border-[#F0E9E1] bg-[#FAF6F2] p-6 lg:p-8">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] tracking-[0.18em] uppercase text-charcoal/60">
                  Récapitulatif
                </p>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#810B38]">
                  #{order.orderId.split("-").pop()}
                </p>
              </div>

              <div className="flex flex-col gap-3 pb-4 border-b border-[#F0E9E1]">
                {order.items.map((item) => (
                  <div key={item.slug} className="flex items-center gap-3">
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-cormorant text-charcoal text-base leading-tight">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-charcoal/50 mt-0.5">
                        {item.offer}
                      </p>
                    </div>
                    <p className="font-montserrat font-medium text-[#810B38] text-sm whitespace-nowrap">
                      {item.price} DH
                    </p>
                  </div>
                ))}
                {order.upsellItem && (
                  <div className="flex items-center gap-3 bg-[#810B38]/5 -mx-2 px-2 py-2 rounded-lg">
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                      <Image
                        src={order.upsellItem.image}
                        alt={order.upsellItem.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-cormorant text-charcoal text-base leading-tight flex items-center gap-2">
                        {order.upsellItem.name}
                        <span className="inline-flex items-center gap-1 bg-[#810B38] text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                          <Sparkles size={8} /> Offre
                        </span>
                      </p>
                      <p className="text-[11px] text-charcoal/50 mt-0.5">
                        {order.upsellItem.offer}
                      </p>
                    </div>
                    <p className="font-montserrat font-medium text-[#810B38] text-sm whitespace-nowrap">
                      {order.upsellItem.price} DH
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5 pt-4">
                <div className="flex justify-between text-[12px] text-charcoal/60">
                  <span>Sous-total</span>
                  <span>{order.subtotal} DH</span>
                </div>
                {order.upsellItem && (
                  <div className="flex justify-between text-[12px] text-charcoal/60">
                    <span>Offre exclusive</span>
                    <span>+ {order.upsellItem.price} DH</span>
                  </div>
                )}
                <div className="flex justify-between text-[12px] text-charcoal/60">
                  <span>Livraison</span>
                  <span className="text-emerald-600 font-medium">Gratuite</span>
                </div>
                <div className="flex items-baseline justify-between pt-2 mt-1 border-t border-[#F0E9E1]">
                  <span className="font-cormorant text-charcoal text-lg">
                    À payer à la livraison
                  </span>
                  <span className="font-cormorant font-bold text-[#810B38] text-3xl">
                    {order.total} DH
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 bg-white rounded-xl p-3.5 border border-[#F0E9E1]">
                <Shield size={14} className="text-[#810B38] flex-shrink-0" />
                <p className="text-[11px] text-charcoal/60 leading-relaxed">
                  Aucun paiement aujourd&apos;hui. Tu paieras{" "}
                  <span className="font-medium text-charcoal">
                    {order.total} DH
                  </span>{" "}
                  cash au livreur, quand tu auras ton sac.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Delivery steps */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl mx-auto px-6 lg:px-8 mt-16"
        >
          <p className="text-center text-[10px] tracking-[0.18em] uppercase text-[#C4956A] mb-3">
            Étapes suivantes
          </p>
          <h2 className="text-center font-cormorant text-charcoal text-3xl lg:text-4xl mb-10">
            Ta commande est entre de bonnes mains.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Phone,
                title: "Confirmation",
                desc: "Notre équipe t'appelle sous 24h pour confirmer la livraison.",
                active: true,
              },
              {
                icon: Package,
                title: "Préparation",
                desc: "Ton sac est emballé avec soin dans notre packaging signature.",
                active: false,
              },
              {
                icon: Truck,
                title: "Livraison",
                desc: "Entre 2 et 4 jours ouvrables. Tu paies au livreur.",
                active: false,
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`rounded-2xl p-5 flex flex-col gap-3 ${
                  step.active
                    ? "bg-[#FAF6F2] border border-[#810B38]/15"
                    : "bg-[#FAF6F2] opacity-70"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.active
                      ? "bg-[#810B38] text-white"
                      : "bg-white border border-[#E8D5C4] text-charcoal/40"
                  }`}
                >
                  <step.icon size={16} />
                </div>
                <div>
                  <p className="font-cormorant text-charcoal text-lg">
                    {step.title}
                  </p>
                  <p className="text-[11px] text-charcoal/50 leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 93% delivery stat */}
          <div className="mt-10 max-w-md mx-auto text-center">
            <p className="font-cormorant text-charcoal text-3xl">
              <span className="text-[#810B38] font-bold">93%</span> de nos
              clientes
            </p>
            <p className="font-montserrat text-[12px] text-charcoal/50 mt-1.5 leading-relaxed">
              reçoivent leur commande dans les délais annoncés au Maroc. Tu es
              dans les meilleures mains.
            </p>
          </div>
        </motion.section>

        {/* Luxury packaging / unboxing experience */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-6xl mx-auto px-6 lg:px-8 mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A]">
            <div className="absolute inset-0">
              <Image
                src="/assets/images/gallery/3.png"
                alt="L'expérience de déballage Rebelle"
                fill
                className="object-cover opacity-55"
                sizes="(max-width: 1024px) 100vw, 1100px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-px bg-[#C4956A]" />
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#C4956A]">
                    L&apos;expérience Rebelle
                  </span>
                </div>
                <h3
                  className="font-cormorant font-light text-white leading-[1.05]"
                  style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)" }}
                >
                  Un déballage pensé comme
                  <br />
                  <em className="not-italic font-semibold text-[#C4956A]">
                    une cérémonie.
                  </em>
                </h3>
                <p className="font-montserrat text-white/65 text-sm leading-relaxed max-w-lg">
                  Chaque sac arrive dans un emballage signature&nbsp;: boîte
                  écrue, ruban gros-grain, dust-bag intérieur, carte
                  manuscrite. Tu ouvres une pièce — pas un colis.
                </p>
                <p
                  className="font-cormorant italic text-[#C4956A] text-lg lg:text-xl tracking-wide select-none pt-1"
                  aria-label="Be bold. Be elegant. Be Rebelle."
                >
                  {BRAND_SIGNATURE}
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-3 gap-3">
                {[
                  { value: "01", label: "Boîte écrue" },
                  { value: "02", label: "Dust-bag" },
                  { value: "03", label: "Carte signée" },
                ].map((step) => (
                  <div
                    key={step.label}
                    className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-4 text-center"
                  >
                    <p className="font-cormorant text-[#C4956A] text-2xl font-medium">
                      {step.value}
                    </p>
                    <p className="text-[10px] tracking-[0.16em] uppercase text-white/70 mt-1.5 leading-tight">
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Product grid — discover */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-7xl mx-auto px-6 lg:px-8 mt-24"
        >
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A] mb-3">
              Pour aller plus loin
            </p>
            <h2 className="font-cormorant text-charcoal text-3xl lg:text-4xl">
              À découvrir ensuite.
            </h2>
            <p className="text-[12px] text-charcoal/50 mt-2 max-w-md mx-auto">
              Les pièces préférées de la communauté Rebelle. Au prix de la
              collection — aucune urgence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-[#810B38] text-[12px] tracking-[0.18em] uppercase font-medium hover:gap-3 transition-all duration-300"
            >
              Voir toute la collection
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
