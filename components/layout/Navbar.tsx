"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingBag, ArrowRight } from "lucide-react";
import { INSTAGRAM_URL, ANNOUNCEMENT_MESSAGES } from "@/lib/constants";
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

function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#810B38] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 sm:h-9 flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] uppercase font-medium text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-2"
          >
            {ANNOUNCEMENT_MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
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
    { label: "Collection", href: "/collection" },
    { label: "Notre Histoire", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
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
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-soft border-b border-[#F0E9E1]"
            : "bg-transparent"
        }`}
      >
        <AnnouncementBar />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] tracking-[0.18em] uppercase luxury-underline transition-colors duration-300 ${textColor}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center group"
              aria-label="Rebelle — Accueil"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-9 lg:h-11 w-auto flex items-center"
              >
                <Image
                  src="/assets/images/Logo/logo.png"
                  alt="Rebelle"
                  width={180}
                  height={64}
                  priority
                  sizes="(max-width: 1024px) 144px, 180px"
                  className={`h-9 lg:h-11 w-auto object-contain transition-[filter] duration-500 ${
                    scrolled
                      ? "[filter:none]"
                      : "[filter:brightness(0)_invert(1)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                  }`}
                />
              </motion.div>
            </Link>

            {/* Right nav (desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href={navLinks[2].href}
                className={`text-[11px] tracking-[0.18em] uppercase luxury-underline transition-colors duration-300 ${textColor}`}
              >
                {navLinks[2].label}
              </Link>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`transition-colors duration-300 ${iconColor} hover:text-[#C4956A]`}
              >
                <InstagramIcon size={16} />
              </a>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={openCart}
                aria-label={`Panier (${count} article${count !== 1 ? "s" : ""})`}
                className={`relative transition-colors duration-300 ${iconColor} hover:text-[#C4956A]`}
              >
                <ShoppingBag size={18} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30,
                      }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#810B38] text-white flex items-center justify-center font-montserrat font-bold"
                      style={{ fontSize: "9px" }}
                    >
                      {count > 9 ? "9+" : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile right */}
            <div className="lg:hidden flex items-center gap-4 ml-auto">
              <motion.button
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
                      transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30,
                      }}
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

      {/* Mobile menu */}
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
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 flex flex-col lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#F0E9E1]">
                <Image
                  src="/assets/images/Logo/logo.png"
                  alt="Rebelle"
                  width={160}
                  height={56}
                  className="h-9 w-auto object-contain"
                />
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

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openCart();
                    }}
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
                <Link
                  href="/collection"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#810B38] text-white text-[11px] tracking-[0.18em] uppercase px-6 py-4 rounded-full shadow-[0_6px_24px_rgba(129,11,56,0.25)] hover:bg-[#5c0828] transition-all duration-300"
                >
                  Voir la collection
                  <ArrowRight size={12} />
                </Link>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[#810B38] text-[#810B38] text-[11px] tracking-[0.18em] uppercase px-6 py-4 rounded-full hover:bg-[#FAF6F2] transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  <InstagramIcon size={12} />
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
