"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { BRAND_NAME_STYLIZED, WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/constants";
import { useCart } from "@/context/CartContext";

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Collection", href: "/#collection" },
    { label: "Notre Histoire", href: "/a-propos" },
    { label: "Livraison", href: "/#livraison" },
  ];

  const textColor = scrolled
    ? "text-charcoal hover:text-[#810B38]"
    : "text-white hover:text-[#C4956A]";

  const iconColor = scrolled ? "text-charcoal" : "text-white";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-soft border-b border-[#F0E9E1]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-luxury-xs luxury-underline transition-colors duration-300 ${textColor}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo Center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-center"
            >
              <motion.span
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`font-cormorant font-bold tracking-wider transition-colors duration-300 ${
                  scrolled ? "text-[#810B38]" : "text-white"
                }`}
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
              >
                {BRAND_NAME_STYLIZED}
              </motion.span>
            </Link>

            {/* Right Nav — Desktop */}
            <div className="hidden lg:flex items-center gap-5">
              <Link
                href={navLinks[2].href}
                className={`text-luxury-xs luxury-underline transition-colors duration-300 ${textColor}`}
              >
                {navLinks[2].label}
              </Link>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`transition-colors duration-300 ${iconColor} hover:text-[#810B38]`}
              >
                <InstagramIcon size={16} />
              </a>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={openCart}
                aria-label={`Panier (${count} article${count !== 1 ? "s" : ""})`}
                className={`relative transition-colors duration-300 ${iconColor} hover:text-[#810B38]`}
              >
                <ShoppingBag size={18} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#810B38] text-white flex items-center justify-center font-montserrat font-bold"
                      style={{ fontSize: "9px" }}
                    >
                      {count > 9 ? "9+" : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#810B38] text-white text-luxury-xs px-5 py-2.5 rounded-full hover:bg-[#5c0828] transition-all duration-300 shadow-burgundy hover:shadow-burgundy-glow"
              >
                Commander
              </motion.a>
            </div>

            {/* Mobile Right — cart + burger */}
            <div className="lg:hidden flex items-center gap-3 ml-auto">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={openCart}
                aria-label="Panier"
                className={`relative transition-colors duration-300 ${iconColor}`}
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="mobile-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#810B38] text-white flex items-center justify-center font-montserrat font-bold"
                      style={{ fontSize: "9px" }}
                    >
                      {count > 9 ? "9+" : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                className={`transition-colors duration-300 ${iconColor}`}
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 flex flex-col lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#F0E9E1]">
                <span className="font-cormorant font-bold text-[#810B38] text-2xl">
                  {BRAND_NAME_STYLIZED}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-charcoal hover:text-[#810B38] transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col p-8 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 font-cormorant text-2xl text-charcoal hover:text-[#810B38] transition-colors border-b border-[#F0E9E1]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile cart link */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.08, duration: 0.5 }}
                >
                  <button
                    onClick={() => { setMobileOpen(false); openCart(); }}
                    className="w-full flex items-center gap-3 py-4 font-cormorant text-2xl text-charcoal hover:text-[#810B38] transition-colors border-b border-[#F0E9E1] text-left"
                  >
                    Mon Panier
                    {count > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#810B38] text-white flex items-center justify-center font-montserrat font-bold text-xs">
                        {count}
                      </span>
                    )}
                  </button>
                </motion.div>
              </nav>

              <div className="p-8 flex flex-col gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury flex items-center justify-center gap-2 bg-[#810B38] text-white text-luxury-xs px-6 py-4 rounded-full shadow-burgundy hover:bg-[#5c0828] transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShoppingBag size={14} />
                  Commander via WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[#810B38] text-[#810B38] text-luxury-xs px-6 py-4 rounded-full hover:bg-[#FAF6F2] transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  <InstagramIcon size={14} />
                  Suivre sur Instagram
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
