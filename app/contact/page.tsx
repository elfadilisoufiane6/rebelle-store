"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, MapPin, Send, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const valid =
    form.name.trim().length >= 2 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
    form.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSent(true);
  };

  return (
    <main className="bg-white">
      <Navbar />

      <div className="pt-24 lg:pt-32 pb-24">
        <section className="max-w-3xl mx-auto px-6 lg:px-8 text-center mb-12">
          <AnimatedSection>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C4956A] mb-4">
              On t&apos;écoute
            </p>
            <h1
              className="font-cormorant font-medium text-charcoal leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Une question, une suggestion,
              <br />
              <em className="not-italic text-[#810B38] font-semibold">
                un mot doux.
              </em>
            </h1>
            <p className="font-montserrat text-sm text-charcoal/55 leading-relaxed mt-5 max-w-xl mx-auto">
              On répond à chaque message en moins de 24 heures, du lundi au
              samedi.
            </p>
          </AnimatedSection>
        </section>

        <section className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Form */}
          <AnimatedSection delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-[#F0E9E1] bg-white p-6 lg:p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-[#810B38]/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={22} className="text-[#810B38]" />
                  </div>
                  <p className="font-cormorant text-charcoal text-2xl">
                    Message envoyé.
                  </p>
                  <p className="font-montserrat text-[12px] text-charcoal/55 mt-2 max-w-xs mx-auto">
                    On te répond dans la journée. Merci pour ton message.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.14em] uppercase text-charcoal/55 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Ton prénom"
                      className="w-full px-5 py-3.5 rounded-xl border border-[#F0E9E1] bg-[#FAF6F2] text-sm font-montserrat text-charcoal outline-none focus:border-[#810B38] focus:bg-white focus:shadow-[0_0_0_3px_rgba(129,11,56,0.12)] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.14em] uppercase text-charcoal/55 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="ton@email.com"
                      className="w-full px-5 py-3.5 rounded-xl border border-[#F0E9E1] bg-[#FAF6F2] text-sm font-montserrat text-charcoal outline-none focus:border-[#810B38] focus:bg-white focus:shadow-[0_0_0_3px_rgba(129,11,56,0.12)] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.14em] uppercase text-charcoal/55 mb-2">
                      Ton message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Dis-nous tout..."
                      rows={5}
                      className="w-full px-5 py-3.5 rounded-xl border border-[#F0E9E1] bg-[#FAF6F2] text-sm font-montserrat text-charcoal outline-none focus:border-[#810B38] focus:bg-white focus:shadow-[0_0_0_3px_rgba(129,11,56,0.12)] transition-all duration-200 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={!valid || submitting}
                    whileTap={{ scale: valid && !submitting ? 0.97 : 1 }}
                    className={`mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-montserrat font-semibold text-[11px] tracking-[0.14em] uppercase transition-all duration-300 ${
                      valid && !submitting
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
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        Envoyer
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Side info */}
          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-[#FAF6F2] border border-[#F0E9E1] p-5">
                <div className="flex items-center gap-2 text-[#810B38] mb-2">
                  <Mail size={14} />
                  <span className="text-[10px] tracking-[0.14em] uppercase">
                    Email
                  </span>
                </div>
                <p className="font-montserrat text-sm text-charcoal">
                  contact@rebelle.ma
                </p>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[#FAF6F2] border border-[#F0E9E1] p-5 hover:border-[#C4956A] transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 text-[#810B38] mb-2">
                  <Instagram size={14} />
                  <span className="text-[10px] tracking-[0.14em] uppercase">
                    Instagram
                  </span>
                </div>
                <p className="font-montserrat text-sm text-charcoal group-hover:text-[#810B38] transition-colors">
                  {INSTAGRAM_HANDLE}
                </p>
              </a>
              <div className="rounded-2xl bg-[#FAF6F2] border border-[#F0E9E1] p-5">
                <div className="flex items-center gap-2 text-[#810B38] mb-2">
                  <MapPin size={14} />
                  <span className="text-[10px] tracking-[0.14em] uppercase">
                    Livraison
                  </span>
                </div>
                <p className="font-montserrat text-sm text-charcoal">
                  Partout au Maroc · 2-4 jours
                </p>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>

      <Footer />
    </main>
  );
}
