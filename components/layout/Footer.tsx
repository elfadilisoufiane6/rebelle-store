"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, Mail } from "lucide-react";
import {
  BRAND_NAME_STYLIZED,
  BRAND_TAGLINE,
  BRAND_SIGNATURE,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  WHATSAPP_URL,
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
} from "@/lib/constants";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-1.18 4.27 8.5 8.5 0 0 1-7.32 4.23 8.38 8.38 0 0 1-4-1L3 21l1.94-5.42a8.38 8.38 0 0 1-1-4A8.5 8.5 0 0 1 8.18 4.27 8.38 8.38 0 0 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5z" />
      <path d="M8.5 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1c-1 0-2.5-1.5-2.5-2.5l1-1-1-2-1.5 1.5z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const navigationLinks = [
    { label: "Accueil", href: "/" },
    { label: "Collection", href: "/collection" },
    { label: "Notre Histoire", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { label: "Livraison", href: "/livraison" },
    { label: "Politique de retour", href: "/politique-retours" },
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/politique-confidentialite" },
  ];

  const contactChannels = [
    {
      label: "WhatsApp",
      value: WHATSAPP_NUMBER,
      href: WHATSAPP_URL,
      Icon: WhatsAppIcon,
      external: true,
    },
    {
      label: "Email",
      value: CONTACT_EMAIL,
      href: CONTACT_EMAIL_URL,
      Icon: Mail,
      external: false,
    },
    {
      label: "Instagram",
      value: INSTAGRAM_HANDLE,
      href: INSTAGRAM_URL,
      Icon: InstagramIcon,
      external: true,
    },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Top Banner */}
      <div className="bg-[#810B38] py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2">
          <MapPin size={12} className="text-[#C4956A]" />
          <span className="text-[10px] tracking-[0.18em] uppercase text-white/90">
            Livraison partout au Maroc · Paiement à la livraison
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center group"
              aria-label="Rebelle — Accueil"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/assets/images/Logo/logo.png"
                  alt="Rebelle"
                  width={220}
                  height={80}
                  sizes="(max-width: 1024px) 180px, 220px"
                  className="h-14 lg:h-16 w-auto object-contain [filter:brightness(0)_invert(1)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                />
              </motion.div>
            </Link>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A]">
              {BRAND_TAGLINE}
            </p>

            <p className="font-montserrat text-sm text-white/55 leading-relaxed max-w-xs">
              La référence des sacs de luxe pour la femme moderne au Maroc.
              Paiement à la livraison · Qualité vérifiable.
            </p>

            <div className="flex items-center gap-3">
              {contactChannels.map(({ label, href, Icon, external }) => {
                const commonClasses =
                  "w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/55 hover:text-[#C4956A] hover:border-[#C4956A]/70 hover:bg-white/[0.03] transition-all duration-300";
                const content = <Icon size={15} />;
                return external ? (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={commonClasses}
                    aria-label={label}
                  >
                    {content}
                  </motion.a>
                ) : (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={commonClasses}
                    aria-label={label}
                  >
                    {content}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-white/50 hover:text-white transition-colors duration-300 font-montserrat"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A]">
              Service
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[12px] text-white/50 hover:text-white transition-colors duration-300 font-montserrat"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nous joindre — contact channels with inline icons */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A]">
              Nous joindre
            </h4>
            <ul className="flex flex-col gap-3">
              {contactChannels.map(({ label, value, href, Icon, external }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="group inline-flex items-center gap-2.5 text-[12px] text-white/50 hover:text-white transition-colors duration-300 font-montserrat"
                    aria-label={`${label} — ${value}`}
                  >
                    <span className="w-7 h-7 rounded-full border border-white/12 flex items-center justify-center text-white/55 group-hover:text-[#C4956A] group-hover:border-[#C4956A]/60 transition-all duration-300">
                      <Icon size={12} />
                    </span>
                    <span className="tracking-wide">{value}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Maison signature — micro-branding */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center gap-2">
          <p
            className="font-cormorant italic text-[#C4956A] text-lg lg:text-xl tracking-wide text-center select-none"
            aria-label="Be bold. Be elegant. Be Rebelle."
          >
            {BRAND_SIGNATURE}
          </p>
          <div className="w-12 h-px bg-[#C4956A]/30" />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/35 font-montserrat">
            © {year} Rebelle. Tous droits réservés. · {BRAND_NAME_STYLIZED}
          </p>
          <p className="text-[11px] text-white/35 font-montserrat flex items-center gap-1.5">
            Fait avec{" "}
            <Heart size={10} className="text-[#810B38] fill-[#810B38]" /> au
            Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
