"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, MapPin, Heart } from "lucide-react";
import {
  BRAND_NAME_STYLIZED,
  BRAND_TAGLINE,
  WHATSAPP_URL,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
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

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Accueil", href: "/" },
        { label: "Collection", href: "/#collection" },
        { label: "Notre Histoire", href: "/a-propos" },
        { label: "Livraison & Retours", href: "/#faq" },
      ],
    },
    {
      title: "Collections",
      links: [
        { label: "Sacs à main", href: "/#collection" },
        { label: "Mini sacs", href: "/#collection" },
        { label: "Tote bags", href: "/#collection" },
        { label: "Crossbody", href: "/#collection" },
      ],
    },
    {
      title: "Service",
      links: [
        { label: "FAQ", href: "/#faq" },
        { label: "Commander via WhatsApp", href: WHATSAPP_URL, external: true },
        { label: "Suivre ma commande", href: WHATSAPP_URL, external: true },
        { label: "Politique de retour", href: "/#faq" },
      ],
    },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Top Banner */}
      <div className="bg-[#810B38] py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2">
          <MapPin size={12} className="text-[#C4956A]" />
          <span className="text-luxury-xs text-white/90">
            Livraison partout au Maroc · Paiement à la livraison
          </span>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <Link href="/">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  className="inline-block font-cormorant font-bold text-[#810B38] text-3xl"
                >
                  {BRAND_NAME_STYLIZED}
                </motion.span>
              </Link>
              <p className="text-luxury-xs text-[#C4956A] mt-1">{BRAND_TAGLINE}</p>
            </div>

            <p className="font-montserrat text-sm text-white/60 leading-relaxed max-w-xs">
              La référence des sacs premium au Maroc. Des pièces conçues pour la femme
              moderne qui refuse de choisir entre style et qualité.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4">
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#810B38] hover:border-[#810B38] transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </motion.a>
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-green-400 hover:border-green-400 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </motion.a>
            </div>

            <p className="text-xs text-white/40 font-montserrat">{INSTAGRAM_HANDLE}</p>
          </div>

          {/* Links Columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="text-luxury-xs text-[#C4956A]">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 hover:text-white transition-colors duration-300 font-montserrat luxury-underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-300 font-montserrat luxury-underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-montserrat">
            © {year} {BRAND_NAME_STYLIZED}. Tous droits réservés.
          </p>
          <p className="text-xs text-white/30 font-montserrat flex items-center gap-1.5">
            Fait avec{" "}
            <Heart size={10} className="text-[#810B38] fill-[#810B38]" /> au Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
