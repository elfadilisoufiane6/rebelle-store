import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products, OFFERS } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

interface Props {
  params: { slug: string };
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://rebelle.ma";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return { title: "Produit introuvable" };
  const canonical = `/produits/${product.slug}`;
  return {
    title: `${product.shortName} — Rebelle`,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      title: `${product.shortName} — Rebelle`,
      description: product.description,
      url: canonical,
      type: "website",
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 1200,
          alt: product.shortName,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.shortName,
    description: product.description,
    image: product.images.map((img) => `${SITE_URL}${img}`),
    brand: { "@type": "Brand", name: "Rebelle" },
    category: product.category,
    sku: product.slug,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/produits/${product.slug}`,
      priceCurrency: "MAD",
      price: OFFERS["1piece"].price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Rebelle" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductPageClient product={product} />
    </>
  );
}
