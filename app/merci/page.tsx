import type { Metadata } from "next";
import ThankYouPage from "@/components/thankyou/ThankYouPage";

export const metadata: Metadata = {
  title: "Merci pour ta commande — Rebelle",
  description:
    "Ta commande a bien été reçue. Notre équipe te contactera pour confirmer la livraison.",
};

export default function MerciRoute() {
  return <ThankYouPage />;
}
