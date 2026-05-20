import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/layout/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rebelle — Sacs Luxury Premium au Maroc",
    template: "%s | Rebelle",
  },
  description:
    "Rebelle est la référence des sacs de luxe pour femmes au Maroc. Qualité premium, paiement à la livraison, livraison rapide partout au Maroc.",
  keywords: [
    "sacs femme maroc",
    "sacs luxury maroc",
    "sacs premium casablanca",
    "sacs de luxe maroc",
    "maroquinerie maroc",
    "rebelle sacs",
    "sacs à main maroc",
    "paiement livraison maroc",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://rebelle.ma",
    siteName: "Rebelle",
    title: "Rebelle — Sacs Luxury Premium au Maroc",
    description:
      "La référence des sacs luxury pour femmes modernes au Maroc. Qualité d'exception, paiement à la livraison.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebelle — Sacs Luxury Premium au Maroc",
    description: "La référence des sacs luxury pour femmes modernes au Maroc.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#810B38" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-montserrat antialiased bg-white">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
