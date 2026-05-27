import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe plus ou a changé de silhouette.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="max-w-xl text-center flex flex-col items-center gap-7">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#810B38]" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
              Erreur 404
            </span>
            <span className="w-6 h-px bg-[#810B38]" />
          </div>

          <h1
            className="font-cormorant font-light text-charcoal leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Cette page a
            <br />
            <em className="not-italic font-semibold text-[#810B38]">
              changé de silhouette.
            </em>
          </h1>

          <p className="font-montserrat text-charcoal/60 text-[14px] leading-relaxed max-w-md">
            L&apos;adresse que tu as suivie n&apos;existe plus dans la maison.
            Reviens à la collection courante.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <Link
              href="/collection"
              className="inline-flex items-center justify-center gap-3 bg-[#810B38] text-white text-[11px] tracking-[0.22em] uppercase font-medium px-9 py-4 rounded-full hover:bg-[#5c0828] transition-all duration-300"
            >
              Voir la collection
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 text-charcoal/70 hover:text-[#810B38] text-[11px] tracking-[0.22em] uppercase font-medium px-9 py-4 rounded-full transition-colors duration-300"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
