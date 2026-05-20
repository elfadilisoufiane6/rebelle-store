"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowRight, Heart, Package, Truck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BRAND_NAME_STYLIZED, WHATSAPP_URL } from "@/lib/constants";

export default function MerciPage() {
  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-white flex flex-col">
        {/* Hero Thank You */}
        <section className="flex-1 flex items-center justify-center py-24 lg:py-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* Animated Check */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute inset-3 rounded-full bg-[#810B38]/20"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle size={42} className="text-[#810B38]" />
                </div>

                {/* Rings animation */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-[#810B38]/20"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + i * 0.2,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Brand */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-luxury-xs text-[#C4956A] mb-3"
            >
              {BRAND_NAME_STYLIZED}
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant font-light text-charcoal leading-tight mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Merci pour votre
              <br />
              <em className="not-italic font-semibold text-[#810B38]">confiance.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="font-montserrat text-sm text-charcoal/50 leading-relaxed mb-3 max-w-lg mx-auto"
            >
              Votre commande a été reçue. Notre équipe va vous contacter
              sous peu pour confirmer les détails de votre livraison.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="font-cormorant italic text-[#810B38] text-lg mb-10"
            >
              Be bold.. Be elegant.. Be Rebelle.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="luxury-divider-center mb-10"
            />

            {/* Order Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            >
              {[
                {
                  icon: CheckCircle,
                  title: "Commande confirmée",
                  description: "Votre commande est enregistrée",
                  active: true,
                },
                {
                  icon: Package,
                  title: "En préparation",
                  description: "Votre sac est en cours d'emballage",
                  active: false,
                },
                {
                  icon: Truck,
                  title: "Livraison en route",
                  description: "2 à 4 jours ouvrables",
                  active: false,
                },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className={`rounded-2xl p-5 flex flex-col items-center gap-3 text-center ${
                    step.active
                      ? "bg-[#FAF6F2] border border-[#810B38]/20"
                      : "bg-[#FAF6F2] opacity-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.active
                        ? "bg-[#810B38] text-white"
                        : "bg-white border border-[#E8D5C4] text-charcoal/30"
                    }`}
                  >
                    <step.icon size={16} />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-charcoal text-xs">
                      {step.title}
                    </p>
                    <p className="text-luxury-xs text-charcoal/40 mt-1">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury flex items-center justify-center gap-3 bg-[#810B38] text-white text-luxury-xs px-8 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] hover:shadow-burgundy-glow transition-all duration-300"
              >
                <MessageCircle size={14} />
                Nous contacter via WhatsApp
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/#collection"
                  className="btn-luxury flex items-center justify-center gap-3 border border-[#E8D5C4] text-charcoal text-luxury-xs px-8 py-4 rounded-full hover:border-[#810B38] hover:text-[#810B38] transition-all duration-300"
                >
                  Continuer vos achats
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-10 flex items-center justify-center gap-1.5 text-xs text-charcoal/30 font-montserrat"
            >
              Fait avec <Heart size={10} className="text-[#810B38] fill-[#810B38]" /> au Maroc
            </motion.p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
