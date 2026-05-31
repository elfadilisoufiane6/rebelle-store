import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import CartDrawer from "@/components/layout/CartDrawer";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import UpsellPopup from "@/components/checkout/UpsellPopup";
import ClickTracker from "@/components/tracking/ClickTracker";
import { Suspense } from "react";

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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://rebelle.ma";

export const metadata: Metadata = {
  // metadataBase makes relative OG / Twitter URLs resolve against the
  // canonical production origin (rebelle.ma), needed for social shares.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rebelle — Maison de Sacs Premium au Maroc",
    template: "%s | Rebelle",
  },
  description:
    "Rebelle Maison — sacs en cuir véritable pour femmes au Maroc. Fondée à Rabat. Paiement à la livraison, livraison rapide partout au Maroc.",
  applicationName: "Rebelle",
  authors: [{ name: "Rebelle Maison" }],
  creator: "Rebelle Maison",
  publisher: "Rebelle Maison",
  category: "fashion",
  keywords: [
    "rebelle",
    "rebelle.ma",
    "rebelle maison",
    "sacs femme maroc",
    "sacs cuir maroc",
    "sacs de luxe maroc",
    "sacs femme rabat",
    "sacs femme casablanca",
    "maroquinerie maroc",
    "sacs à main maroc",
    "paiement à la livraison maroc",
    "boutique sacs rabat",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: SITE_URL,
    siteName: "Rebelle",
    title: "Rebelle — Maison de Sacs Premium au Maroc",
    description:
      "Maison de sacs en cuir véritable, fondée à Rabat. Paiement à la livraison, livraison partout au Maroc.",
    images: [
      {
        url: "/assets/images/hero/hero-bg1.jpg",
        width: 1672,
        height: 941,
        alt: "Rebelle — Maison de Sacs Premium au Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebelle — Maison de Sacs Premium au Maroc",
    description:
      "Maison de sacs en cuir véritable, fondée à Rabat. Paiement à la livraison.",
    images: ["/assets/images/hero/hero-bg1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  // Drop the value from Google Search Console here once verified:
  // verification: { google: "PASTE_VERIFICATION_TOKEN_HERE" },
};

// Structured data — helps Google build a Knowledge Panel & Sitelinks
// search box. Lives in <head> as JSON-LD.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}#organization`,
  name: "Rebelle",
  alternateName: ["Maison Rebelle", "Rebelle Maison"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/assets/images/Logo/logo.png`,
  },
  image: `${SITE_URL}/assets/images/hero/hero-bg1.jpg`,
  description:
    "Maison Rebelle — sacs en cuir véritable pour femmes au Maroc. Fondée à Rabat en 2022. Paiement à la livraison, livraison partout au Maroc.",
  foundingDate: "2022",
  foundingLocation: {
    "@type": "Place",
    name: "Rabat, Maroc",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rabat",
    addressCountry: "MA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+212622049015",
    contactType: "customer service",
    areaServed: "MA",
    availableLanguage: ["French", "Arabic"],
  },
  sameAs: ["https://www.instagram.com/rebelle.v3"],
  knowsAbout: ["sacs", "maroquinerie", "cuir véritable", "mode féminine"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rebelle",
  url: SITE_URL,
  inLanguage: "fr-MA",
  publisher: { "@type": "Organization", name: "Rebelle" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-montserrat antialiased bg-white">
        <CartProvider>
          <CheckoutProvider>
            {children}
            <CartDrawer />
            <CheckoutModal />
            <UpsellPopup />
            {/* Anonymous pageview tracker — useSearchParams needs Suspense */}
            <Suspense fallback={null}>
              <ClickTracker />
            </Suspense>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}
