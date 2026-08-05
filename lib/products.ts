export type Category = "phones" | "gadgets" | "accessories";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  /** Emoji used as a lightweight placeholder image. */
  emoji: string;
  tagline: string;
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "phones", label: "Téléphones" },
  { id: "gadgets", label: "Gadgets" },
  { id: "accessories", label: "Accessoires" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    brand: "Apple",
    category: "phones",
    price: 1229,
    emoji: "📱",
    tagline: "Titane. Puce A18 Pro. Caméra Fusion 48 Mpx.",
    description:
      "L'iPhone 16 Pro repousse les limites avec un châssis en titane, la puce A18 Pro et un système photo professionnel. Idéal pour la photo, le jeu et la productivité.",
    specs: {
      Écran: "6,3\" Super Retina XDR",
      Puce: "A18 Pro",
      Stockage: "256 Go",
      Caméra: "48 Mpx Fusion",
      Batterie: "Jusqu'à 27 h de vidéo",
    },
    featured: true,
  },
  {
    slug: "iphone-16",
    name: "iPhone 16",
    brand: "Apple",
    category: "phones",
    price: 969,
    emoji: "📱",
    tagline: "Puissant. Coloré. Bouton Contrôle de l'appareil photo.",
    description:
      "L'iPhone 16 combine la puce A18, un design coloré et le nouveau bouton Contrôle de l'appareil photo pour capturer chaque instant.",
    specs: {
      Écran: "6,1\" Super Retina XDR",
      Puce: "A18",
      Stockage: "128 Go",
      Caméra: "48 Mpx",
      Batterie: "Jusqu'à 22 h de vidéo",
    },
    featured: true,
  },
  {
    slug: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    category: "phones",
    price: 1099,
    emoji: "📱",
    tagline: "Galaxy AI. S Pen intégré. Zoom 100x.",
    description:
      "Le Galaxy S24 Ultra offre un écran éblouissant, le S Pen intégré et un ensemble d'outils Galaxy AI pour travailler et créer plus vite.",
    specs: {
      Écran: "6,8\" Dynamic AMOLED 2X",
      Puce: "Snapdragon 8 Gen 3",
      Stockage: "256 Go",
      Caméra: "200 Mpx",
      Batterie: "5000 mAh",
    },
    featured: true,
  },
  {
    slug: "pixel-9-pro",
    name: "Pixel 9 Pro",
    brand: "Google",
    category: "phones",
    price: 1099,
    emoji: "📱",
    tagline: "Photographie computationnelle et Gemini intégré.",
    description:
      "Le Pixel 9 Pro mise sur l'IA de Google, un appareil photo exceptionnel et des mises à jour garanties pendant 7 ans.",
    specs: {
      Écran: "6,3\" Actua",
      Puce: "Google Tensor G4",
      Stockage: "128 Go",
      Caméra: "50 Mpx triple",
      Batterie: "4700 mAh",
    },
  },
  {
    slug: "apple-watch-series-10",
    name: "Apple Watch Series 10",
    brand: "Apple",
    category: "gadgets",
    price: 449,
    emoji: "⌚",
    tagline: "Plus fine, plus grande, plus lumineuse.",
    description:
      "L'Apple Watch Series 10 vous accompagne au quotidien avec un suivi santé avancé et un écran grand angle.",
    specs: {
      Écran: "LTPO OLED",
      Étanchéité: "50 m",
      Capteurs: "ECG, SpO2, température",
      Autonomie: "Jusqu'à 18 h",
    },
    featured: true,
  },
  {
    slug: "airpods-pro-2",
    name: "AirPods Pro 2",
    brand: "Apple",
    category: "gadgets",
    price: 279,
    emoji: "🎧",
    tagline: "Réduction de bruit active de nouvelle génération.",
    description:
      "Les AirPods Pro 2 offrent une réduction de bruit deux fois plus efficace, un audio adaptatif et un boîtier USB-C.",
    specs: {
      Puce: "Apple H2",
      Réduction: "Active + Transparence",
      Autonomie: "6 h (30 h avec boîtier)",
      Connectique: "USB-C",
    },
    featured: true,
  },
  {
    slug: "galaxy-buds-3-pro",
    name: "Galaxy Buds 3 Pro",
    brand: "Samsung",
    category: "gadgets",
    price: 249,
    emoji: "🎧",
    tagline: "Son Hi-Fi 24 bits et ANC intelligent.",
    description:
      "Les Galaxy Buds 3 Pro délivrent un son cristallin, une réduction de bruit adaptative et une intégration Galaxy AI.",
    specs: {
      Audio: "Hi-Fi 24 bits",
      Réduction: "ANC adaptatif",
      Autonomie: "Jusqu'à 26 h",
      Résistance: "IP57",
    },
  },
  {
    slug: "magsafe-charger",
    name: "Chargeur MagSafe",
    brand: "Apple",
    category: "accessories",
    price: 49,
    emoji: "🔌",
    tagline: "Recharge sans fil aimantée jusqu'à 15 W.",
    description:
      "Le chargeur MagSafe s'aligne parfaitement pour une recharge sans fil rapide et pratique.",
    specs: {
      Puissance: "Jusqu'à 15 W",
      Compatibilité: "iPhone 12 et +",
      Longueur: "1 m",
    },
  },
  {
    slug: "anker-powerbank-20k",
    name: "Anker PowerBank 20K",
    brand: "Anker",
    category: "accessories",
    price: 69,
    emoji: "🔋",
    tagline: "20 000 mAh, charge deux appareils à la fois.",
    description:
      "La batterie externe Anker 20K garde vos appareils chargés toute la journée avec la charge rapide USB-C PD.",
    specs: {
      Capacité: "20 000 mAh",
      Sorties: "2x USB-C + 1x USB-A",
      Puissance: "65 W",
    },
  },
  {
    slug: "usbc-cable-braided",
    name: "Câble USB-C tressé",
    brand: "Belkin",
    category: "accessories",
    price: 24,
    emoji: "🧵",
    tagline: "Câble résistant 2 m, charge rapide 100 W.",
    description:
      "Un câble USB-C vers USB-C durable et tressé, idéal pour la charge rapide et le transfert de données.",
    specs: {
      Longueur: "2 m",
      Puissance: "100 W",
      Data: "480 Mbps",
    },
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
