export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  colors: string[];
  images: string[];
  badge?: string;
  features: string[];
  details: string;
  isNew?: boolean;
  isBestseller?: boolean;
};

export const products: Product[] = [
  {
    id: "le-classique-noir",
    name: "Le Classique Noir",
    tagline: "L'élégance intemporelle",
    description: "Un sac structuré au raffinement absolu. Cuir véritable, finitions dorées, silhouette iconique.",
    price: 850,
    originalPrice: 1100,
    category: "Sacs à main",
    colors: ["Noir", "Bordeaux"],
    badge: "Bestseller",
    isBestseller: true,
    images: [
      "/assets/images/products/classique-noir/1.png",
      "/assets/images/products/classique-noir/2.png",
      "/assets/images/products/classique-noir/3.png",
    ],
    features: [
      "Cuir véritable pleine fleur",
      "Doublure en soie",
      "Fermeture magnétique premium",
      "Bandoulière ajustable",
      "Poche intérieure zippée",
    ],
    details:
      "Confectionné avec le plus grand soin, Le Classique Noir incarne l'essence même de l'élégance féminine. Sa structure architecturale, ses finitions dorées et son cuir d'exception font de lui un compagnon de vie pour la femme moderne.",
  },
  {
    id: "le-bordeaux-elite",
    name: "Le Bordeaux Élite",
    tagline: "La féminité affirmée",
    description: "Bordeaux profond, touches dorées, cuir satiné. Ce sac est une déclaration de style.",
    price: 950,
    category: "Sacs à main",
    colors: ["Bordeaux", "Champagne"],
    badge: "Nouveau",
    isNew: true,
    images: [
      "/assets/images/products/bordeaux-elite/1.png",
      "/assets/images/products/bordeaux-elite/2.png",
      "/assets/images/products/bordeaux-elite/3.png",
    ],
    features: [
      "Cuir satiné grain fin",
      "Quincaillerie dorée 18 carats",
      "Structure rigide semi-souple",
      "Deux poignées robustes",
      "Compartiment principal spacieux",
    ],
    details:
      "Le Bordeaux Élite s'impose comme la pièce maîtresse de toute garde-robe sophistiquée. Sa teinte profonde et ses ornements dorés créent un contraste saisissant qui ne laisse personne indifférent.",
  },
  {
    id: "le-mini-champagne",
    name: "Le Mini Champagne",
    tagline: "Petit sac, grand impact",
    description: "Un mini sac de soirée qui capte toute la lumière. Pour les femmes qui brillent.",
    price: 650,
    category: "Mini sacs",
    colors: ["Champagne", "Or rose"],
    images: [
      "/assets/images/products/mini-champagne/1.png",
      "/assets/images/products/mini-champagne/2.png",
      "/assets/images/products/mini-champagne/3.png",
    ],
    features: [
      "Cuir veau grainé",
      "Chaîne dorée amovible",
      "Fermoir twist signature",
      "Miroir de courtoisie inclus",
      "Pochette intérieure en daim",
    ],
    details:
      "Le Mini Champagne est conçu pour les grandes occasions. Sa finesse, ses reflets nacrés et sa chaîne dorée en font l'accessoire parfait pour toutes vos soirées élégantes.",
  },
  {
    id: "le-tote-caramel",
    name: "Le Tote Caramel",
    tagline: "Le luxe au quotidien",
    description: "Grand tote en cuir caramel. Spacieux, élégant, parfait pour chaque jour.",
    price: 790,
    category: "Tote bags",
    colors: ["Caramel", "Beige"],
    isBestseller: true,
    images: [
      "/assets/images/products/tote-caramel/1.png",
      "/assets/images/products/tote-caramel/2.png",
      "/assets/images/products/tote-caramel/3.png",
    ],
    features: [
      "Cuir naturel tanné végétal",
      "Grande capacité 30L",
      "Poches multiples organisées",
      "Coutures renforcées",
      "Base rigide anti-déformation",
    ],
    details:
      "Alliant praticité et raffinement, Le Tote Caramel accompagne votre quotidien avec grâce. Sa capacité généreuse et ses compartiments bien pensés en font le sac idéal pour la femme active et élégante.",
  },
  {
    id: "le-satchel-rose",
    name: "Le Satchel Rose",
    tagline: "Douceur et caractère",
    description: "Un satchel au rose poudré délicat, finitions en argent brossé. Élégance naturelle.",
    price: 720,
    category: "Sacs à main",
    colors: ["Rose poudré", "Blanc"],
    isNew: true,
    images: [
      "/assets/images/products/satchel-rose/1.png",
      "/assets/images/products/satchel-rose/2.png",
      "/assets/images/products/satchel-rose/3.png",
    ],
    features: [
      "Cuir grainé premium",
      "Fermeture à cadenas",
      "Bandoulière convertible",
      "Finitions argentées brossées",
      "Protection imperméable",
    ],
    details:
      "Le Satchel Rose allie douceur romantique et caractère affirmé. Sa teinte rose poudré intemporelle et ses finitions précieuses en font une pièce collector pour toutes les élégantes.",
  },
  {
    id: "le-crossbody-noir",
    name: "Le Crossbody Noir",
    tagline: "La liberté en mouvement",
    description: "Sac en bandoulière compact, cuir noir mat, boucles dorées. Chic en toutes circonstances.",
    price: 580,
    category: "Crossbody",
    colors: ["Noir mat", "Bordeaux"],
    badge: "Bestseller",
    isBestseller: true,
    images: [
      "/assets/images/products/crossbody-noir/1.png",
      "/assets/images/products/crossbody-noir/2.png",
      "/assets/images/products/crossbody-noir/3.png",
    ],
    features: [
      "Cuir lisse mat premium",
      "Bandoulière ajustable 80-130cm",
      "Compartiment principal + avant",
      "Boucles dorées inoxydables",
      "Format compact 22x16cm",
    ],
    details:
      "Le Crossbody Noir redéfinit le sac bandoulière de luxe. Sa silhouette épurée, ses boucles dorées et son cuir d'exception en font un accessoire indispensable pour la femme moderne en mouvement.",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}
