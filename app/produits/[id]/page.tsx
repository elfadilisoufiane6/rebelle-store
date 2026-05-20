import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct(params.id);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: `${product.name} — Rebelle`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.id);
  if (!product) notFound();
  return <ProductPageClient product={product} />;
}
