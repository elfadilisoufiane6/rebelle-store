import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: `${product.shortName} — Rebelle`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductPageClient product={product} />;
}
