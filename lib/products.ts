export type OfferKey = "1piece" | "2pieces" | "3pieces";

export type Offer = {
  key: OfferKey;
  qty: number;
  label: string;
  price: number;
  perPiece: number;
  saving: number;
  badge?: string;
  freeDelivery?: boolean;
};

export const OFFERS: Record<OfferKey, Offer> = {
  "1piece": {
    key: "1piece",
    qty: 1,
    label: "1 sac",
    price: 699,
    perPiece: 699,
    saving: 0,
  },
  "2pieces": {
    key: "2pieces",
    qty: 2,
    label: "2 sacs",
    price: 1199,
    perPiece: 599.5,
    saving: 199,
    badge: "Meilleur choix",
  },
  "3pieces": {
    key: "3pieces",
    qty: 3,
    label: "3 sacs",
    price: 1599,
    perPiece: 533,
    saving: 498,
    badge: "Livraison offerte",
    freeDelivery: true,
  },
};

export const DEFAULT_OFFER: OfferKey = "2pieces";

// Post-checkout upsell — one additional sac at house tariff
export const UPSELL_DISCOUNTED_PRICE = 599;
export const UPSELL_REFERENCE_PRICE = 699;

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  emotionalHook: string;
  painSolved: string;
  category: string;
  badge?: string;
  isBestseller?: boolean;
  isNew?: boolean;
  images: string[];
  materials: string[];
  dimensions: string;
  reviewCount: number;
  rating: number;
  storyAngle: string;
  upsellSlug: string;
};

export const products: Product[] = [
  {
    slug: "coach-tabby-brown",
    name: "Le Tabby — Édition Cognac",
    shortName: "Le Tabby Cognac",
    tagline: "Le sac qui sait s'adapter à ta vie",
    description:
      "La polyvalence à son paroxysme. Le Tabby en cuir cognac se porte le matin au bureau, le soir au restaurant. Sa boucle dorée iconique est reconnue dans le monde entier.",
    emotionalHook:
      "Ce sac, t'as plus besoin d'en changer selon l'occasion. Il s'adapte à toi.",
    painSolved:
      "Je veux un sac que je peux porter partout, pas juste le week-end.",
    category: "Bestseller",
    badge: "Bestseller",
    isBestseller: true,
    images: [
      "/assets/images/products/coach-tabby-brown/1.jpg",
      "/assets/images/products/coach-tabby-brown/2.jpg",
      "/assets/images/products/coach-tabby-brown/3.jpg",
      "/assets/images/products/coach-tabby-brown/4.jpg",
    ],
    materials: [
      "Cuir vachette grain naturel · Couleur cognac chaud",
      "Boucle signature en laiton doré",
      "Bandoulière réglable et amovible",
      "Intérieur doublé avec poches organisées",
      "Coutures doubles renforcées",
    ],
    dimensions: "26 × 20 × 10 cm",
    reviewCount: 87,
    rating: 4.9,
    storyAngle:
      "Le compagnon de toutes tes journées — du bureau au dîner, sans jamais devoir changer de sac.",
    upsellSlug: "gucci-ophidia-mini",
  },
  {
    slug: "gucci-marmont-noir",
    name: "Le Marmont — Édition Noir",
    shortName: "Le Marmont Noir",
    tagline: "L'icône noire qui ne passe jamais inaperçue",
    description:
      "Le matelassé noir aux finitions dorées — une combinaison qui a traversé les décennies sans vieillir. Le double G au dos dit tout, sans que tu dises un mot.",
    emotionalHook:
      "Il y a des sacs qu'on achète, et des sacs qui définissent qui on est. Le Marmont appartient à la deuxième catégorie.",
    painSolved:
      "Je veux un sac qui a du caractère, pas un sac banal.",
    category: "Iconique",
    badge: "Le plus demandé",
    isBestseller: true,
    images: [
      "/assets/images/products/gucci-marmont-noir/1.jpg",
      "/assets/images/products/gucci-marmont-noir/2.jpg",
      "/assets/images/products/gucci-marmont-noir/3.jpg",
    ],
    materials: [
      "Cuir matelassé noir profond · Structure semi-rigide",
      "Double G en métal doré sur le verso",
      "Quincaillerie en laiton or antique",
      "Fermeture zippée principale + poche frontale",
      "Doublure microfibre douce",
    ],
    dimensions: "26 × 15 × 7 cm",
    reviewCount: 94,
    rating: 4.9,
    storyAngle:
      "L'icône matelassée noire. Reconnaissable au premier regard, désirable au second.",
    upsellSlug: "lv-catchy-pm",
  },
  {
    slug: "lv-carryall",
    name: "Le CarryAll — Édition Monogramme",
    shortName: "Le CarryAll Monogram",
    tagline: "Le grand sac de toutes tes conquêtes",
    description:
      "Pour la femme en mouvement. Le CarryAll en toile monogramme porte tout ce dont tu as besoin, sans jamais perdre son allure. Du bureau aux voyages.",
    emotionalHook:
      "Ce sac, tu le poses sur ton bureau et les collègues savent que tu es sérieuse dans la vie.",
    painSolved:
      "J'en ai marre des petits sacs qui contiennent rien.",
    category: "Grand format",
    badge: "Nouveau",
    isNew: true,
    images: [
      "/assets/images/products/lv-carryall/1.jpg",
      "/assets/images/products/lv-carryall/2.jpg",
      "/assets/images/products/lv-carryall/3.jpg",
    ],
    materials: [
      "Toile monogramme enduite · Résistante et iconique",
      "Cuir naturel sur les anses et la base",
      "Grande ouverture zip + poche intérieure",
      "Capacité généreuse pour le quotidien et les voyages courts",
      "Pieds de protection sous la base",
    ],
    dimensions: "40 × 29 × 15 cm",
    reviewCount: 62,
    rating: 4.9,
    storyAngle:
      "Pour la femme en mouvement. Bureau, aéroport, week-end — il suit ton rythme.",
    upsellSlug: "lv-catchy-pm",
  },
  {
    slug: "lv-catchy-pm",
    name: "Le Catchy — Édition PM",
    shortName: "Le Catchy PM",
    tagline: "Le sac à chaîne qui fait tourner les têtes",
    description:
      "Compact, élégant, et cette chaîne dorée qui fait tout. Le Catchy PM se porte en bandoulière pour un effet décontracté, ou à la main pour une touche sophistiquée.",
    emotionalHook:
      "Ce sac, il accompagne tes meilleures soirées. Et le matin suivant, il est encore beau.",
    painSolved:
      "Je veux quelque chose de beau mais pas encombrant pour mes sorties.",
    category: "Sac à chaîne",
    badge: "Coup de cœur",
    images: [
      "/assets/images/products/lv-catchy-pm/1.jpg",
      "/assets/images/products/lv-catchy-pm/2.jpg",
      "/assets/images/products/lv-catchy-pm/3.jpg",
    ],
    materials: [
      "Toile monogramme et cuir naturel",
      "Chaîne dorée longue amovible",
      "Format compact parfait pour les sorties",
      "Fermeture zippée sécurisée",
      "Intérieur doublé avec poche carte",
    ],
    dimensions: "21 × 14 × 5 cm",
    reviewCount: 71,
    rating: 4.9,
    storyAngle:
      "La pièce des soirées. Chaîne dorée, format épuré — il transforme chaque sortie.",
    upsellSlug: "lv-alma-bb-epi",
  },
  {
    slug: "lv-alma-bb-epi",
    name: "L'Alma BB — Édition Epi",
    shortName: "L'Alma BB Epi",
    tagline: "La structure iconique en cuir texturé",
    description:
      "La silhouette Alma — reconnaissable entre mille — dans le cuir Epi texturé le plus résistant. Un sac qui vieillit mieux que les tendances.",
    emotionalHook:
      "Certains sacs sont des modes. L'Alma est une institution. Tu ne suivras jamais une tendance en le portant — tu la crées.",
    painSolved:
      "Je veux un sac structuré, pas un sac mou sans forme.",
    category: "Édition limitée",
    badge: "Édition Limitée",
    images: [
      "/assets/images/products/lv-alma-bb-epi/1.jpg",
      "/assets/images/products/lv-alma-bb-epi/2.jpg",
      "/assets/images/products/lv-alma-bb-epi/3.jpg",
    ],
    materials: [
      "Cuir Epi texturé · Résistant et imperméable naturellement",
      "Serrure à cadenas en métal doré · Signature LV",
      "Forme architecturale ovale iconique",
      "Doublure microfibre fine et douce",
      "Bandoulière amovible incluse",
    ],
    dimensions: "23 × 17 × 11 cm",
    reviewCount: 58,
    rating: 5.0,
    storyAngle:
      "Une institution. La structure Alma traverse les modes — elle ne les suit jamais.",
    upsellSlug: "gucci-marmont-noir",
  },
  {
    slug: "gucci-ophidia-mini",
    name: "L'Ophidia Mini — Édition Supreme",
    shortName: "L'Ophidia Mini",
    tagline: "Petit format, grand impact",
    description:
      "Le motif GG Supreme dans son plus beau format. L'Ophidia Mini concentre tout le savoir-faire dans un sac compact qui dit tout sur ton goût.",
    emotionalHook:
      "Les connaisseurs reconnaissent immédiatement ce motif. Les autres demandent juste 'd'où il vient'. Tu gagnes dans les deux cas.",
    painSolved:
      "Je veux un mini sac qui a vraiment du style, pas un sac plastique.",
    category: "Mini sac",
    badge: "Nouveau",
    isNew: true,
    images: [
      "/assets/images/products/gucci-ophidia-mini/1.jpg",
      "/assets/images/products/gucci-ophidia-mini/2.jpg",
      "/assets/images/products/gucci-ophidia-mini/3.jpg",
    ],
    materials: [
      "Toile GG Supreme enduite beige et ébène",
      "Détails en cuir vert-rouge signature",
      "Chaîne dorée longue + bandoulière en cuir",
      "Intérieur doublé avec miroir",
      "Format compact tendance",
    ],
    dimensions: "18 × 12 × 6 cm",
    reviewCount: 43,
    rating: 4.9,
    storyAngle:
      "Le pick des initiées. Reconnaissable au premier regard pour celles qui savent.",
    upsellSlug: "coach-tabby-brown",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getCrossells(excludeSlugs: string[], count = 3): Product[] {
  return products.filter((p) => !excludeSlugs.includes(p.slug)).slice(0, count);
}

export function pickUpsellProduct(cartSlugs: string[]): Product | null {
  if (cartSlugs.length === 0) return null;
  for (const slug of cartSlugs) {
    const source = getProduct(slug);
    if (!source) continue;
    const target = getProduct(source.upsellSlug);
    if (target && !cartSlugs.includes(target.slug)) return target;
  }
  const fallback = products.find((p) => !cartSlugs.includes(p.slug));
  return fallback ?? null;
}
