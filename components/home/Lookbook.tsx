"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { products } from "@/lib/products";

// Lookbook moments — shared across the storefront. Each tile pairs a
// lifestyle image with the product it's selling so the strip doubles
// as a story-driven entry point into the collection.
//
// The strip is a continuous film reel drifting left → right (see
// .lookbook-track in globals.css). It pauses on hover and on focus so a
// look can actually be read and clicked. The moments run in the order of
// a day — morning to evening — so the sequence carries meaning on its own
// and needs no numbering.
//
// Tiles with src: "" render a cream placeholder ("Bientôt") so new
// moments can be wired in before the photography ships.
type Moment = { src: string; moment: string; slug: string };

const moments: Moment[] = [
  {
    src: "/assets/images/gallery/le-quotidien.jpg",
    moment: "Le quotidien",
    slug: "lv-carryall",
  },
  {
    src: "/assets/images/gallery/le-brunch.jpg",
    moment: "Le brunch",
    slug: "gucci-ophidia-mini",
  },
  {
    src: "/assets/images/gallery/l-apres-midi.jpg",
    moment: "L'après-midi",
    slug: "lv-catchy-pm",
  },
  {
    src: "/assets/images/gallery/le-rendez-vous.jpg",
    moment: "Le rendez-vous",
    slug: "gucci-marmont-noir",
  },
  {
    src: "/assets/images/gallery/le-voyage.jpg",
    moment: "Le voyage",
    slug: "lv-alma-bb-epi",
  },
  {
    src: "/assets/images/gallery/la-soiree.jpg",
    moment: "La soirée",
    slug: "coach-tabby-brown",
  },
];

// Resolve once, outside render — a moment pointing at a retired product
// is dropped rather than leaving a hole in the strip.
const looks = moments
  .map((item) => ({ ...item, product: products.find((p) => p.slug === item.slug) }))
  .filter((item): item is Moment & { product: NonNullable<typeof item.product> } =>
    Boolean(item.product)
  );

function Look({
  item,
  ariaHidden,
}: {
  item: (typeof looks)[number];
  ariaHidden?: boolean;
}) {
  const { product } = item;
  return (
    <Link
      href={`/produits/${product.slug}`}
      // Trailing margin, not flex `gap` — the -50% loop depends on every
      // tile carrying an identical box width including its own spacing.
      className="group block flex-shrink-0 w-[74vw] sm:w-[42vw] lg:w-[30vw] xl:w-[380px] mr-3 sm:mr-5 lg:mr-6"
      aria-label={`${item.moment} — ${product.shortName}`}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : undefined}
    >
      <div className="relative aspect-[4/5] bg-[#FAF6F2] rounded-2xl overflow-hidden">
        {item.src ? (
          <Image
            src={item.src}
            alt={`Lookbook Rebelle — ${product.shortName}`}
            fill
            sizes="(max-width: 640px) 74vw, (max-width: 1024px) 42vw, 380px"
            className="object-contain transition-transform duration-[900ms] ease-cinematic group-hover:scale-[1.03]"
          />
        ) : (
          // Placeholder — cream frame with a subtle "Bientôt" mark.
          // Replace src in the moments array when the shoot is delivered.
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#C4956A]/70">
            <span className="w-8 h-px bg-[#C4956A]/60" />
            <span className="font-cormorant italic text-2xl">Bientôt</span>
            <span className="text-[9px] tracking-[0.28em] uppercase text-charcoal/30">
              Édition 2026
            </span>
          </div>
        )}
        {/* Hairline frame — reads as a mounted print, not a card shadow */}
        <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-charcoal/[0.06] group-hover:ring-[#C4956A]/40 transition-colors duration-500 pointer-events-none" />
      </div>

      <div className="mt-3 sm:mt-4 flex items-end justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <p className="text-[9px] tracking-[0.22em] uppercase text-[#C4956A] mb-1">
            {item.moment}
          </p>
          <p className="font-cormorant text-charcoal text-[15px] sm:text-base truncate">
            {product.shortName}
          </p>
          {/* Rule draws in on hover — the same signal ProductCard uses */}
          <span className="block h-px w-0 bg-[#810B38] group-hover:w-full transition-[width] duration-500 ease-cinematic mt-1" />
        </div>
        <ArrowRight
          size={14}
          className="text-[#810B38] flex-shrink-0 mb-1 group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>
    </Link>
  );
}

export default function Lookbook() {
  return (
    <section
      id="lookbook"
      className="bg-white py-20 lg:py-28 overflow-hidden"
      aria-label="Lookbook Rebelle"
    >
      {/* Editorial header — centered */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-10 lg:mb-12">
        <AnimatedSection>
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold mb-3">
            Lookbook
          </p>
          <h2
            className="font-cormorant font-light text-charcoal leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Édition{" "}
            <em className="not-italic font-semibold text-[#810B38]">2026</em>.
          </h2>
        </AnimatedSection>
      </div>

      {/* Film strip — full-bleed, drifting left → right, no library */}
      <AnimatedSection delay={0.05}>
        <div
          className="lookbook-strip relative no-scrollbar"
          style={{
            // Edges dissolve instead of clipping, so the strip reads as
            // endless rather than as a slider that ran out of room.
            maskImage:
              "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div
            className="lookbook-track flex w-max"
            style={{ ["--lookbook-duration" as string]: "48s" }}
          >
            {looks.map((item) => (
              <Look key={`a-${item.slug}-${item.moment}`} item={item} />
            ))}
            {/* Second copy — the seam of the loop, hidden from assistive tech */}
            {looks.map((item) => (
              <Look
                key={`b-${item.slug}-${item.moment}`}
                item={item}
                ariaHidden
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* "Voir tout" — under the strip, centered (header is centered too) */}
      <div className="max-w-7xl mx-auto px-6 mt-10 lg:mt-12 text-center">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 text-charcoal/70 hover:text-[#810B38] text-[10px] tracking-[0.22em] uppercase font-medium transition-colors duration-300"
        >
          Voir tout
          <ArrowRight size={12} />
        </Link>
      </div>
    </section>
  );
}
