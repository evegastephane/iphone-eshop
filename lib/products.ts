export type Category =
  | "iphone"
  | "mac"
  | "ipad"
  | "audio"
  | "tv-maison"
  | "accessoires"
  | "enceintes"
  | "believe";

/** A choice that can change the price (screen size, storage…). */
export type PriceOption = {
  id: string;
  label: string;
  priceDelta: number;
};

export type ColorOption = {
  id: string;
  label: string;
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  /** Base ("à partir de") price before options. */
  price: number;
  /** Emoji used as a lightweight placeholder image. */
  emoji: string;
  tagline: string;
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
  screenOptions?: PriceOption[];
  storageOptions?: PriceOption[];
  colorOptions?: ColorOption[];
};

export type Selection = {
  screen?: string;
  storage?: string;
  color?: string;
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "iphone", label: "iPhone" },
  { id: "mac", label: "Mac" },
  { id: "ipad", label: "iPad" },
  { id: "audio", label: "Audio" },
  { id: "enceintes", label: "Enceintes" },
  { id: "tv-maison", label: "TV & Maison" },
  { id: "accessoires", label: "Accessoires" },
  { id: "believe", label: "Believe" },
];

// --- iPhone catalog: un produit "standard" et un produit "Pro" par génération.
// La taille d'écran (ex. Pro / Pro Max), le stockage et la couleur sont des
// options choisies sur la fiche produit.

type ScreenSpec = { id: string; label: string; priceDelta: number };

type GenerationSpec = {
  gen: number;
  chip: string;
  standardBase: number;
  proBase: number;
  standardScreens: ScreenSpec[];
  proScreens: ScreenSpec[];
};

const STORAGE_STANDARD: PriceOption[] = [
  { id: "128", label: "128 Go", priceDelta: 0 },
  { id: "256", label: "256 Go", priceDelta: 120 },
  { id: "512", label: "512 Go", priceDelta: 350 },
];

const STORAGE_PRO: PriceOption[] = [
  { id: "256", label: "256 Go", priceDelta: 0 },
  { id: "512", label: "512 Go", priceDelta: 230 },
  { id: "1024", label: "1 To", priceDelta: 570 },
];

const COLORS_STANDARD: ColorOption[] = [
  { id: "noir", label: "Noir", hex: "#1d1d1f" },
  { id: "blanc", label: "Blanc", hex: "#f5f5f7" },
  { id: "bleu", label: "Bleu", hex: "#5a8bb0" },
  { id: "vert", label: "Vert", hex: "#a4c3a2" },
  { id: "rouge", label: "(PRODUCT)RED", hex: "#b60d16" },
];

const COLORS_PRO: ColorOption[] = [
  { id: "titane-naturel", label: "Titane naturel", hex: "#b9b3a9" },
  { id: "titane-noir", label: "Titane noir", hex: "#3b3b3d" },
  { id: "titane-blanc", label: "Titane blanc", hex: "#eceae5" },
  { id: "titane-desert", label: "Titane désert", hex: "#bda583" },
];

const IPHONE_GENERATIONS: GenerationSpec[] = [
  {
    gen: 11,
    chip: "A13 Bionic",
    standardBase: 509,
    proBase: 829,
    standardScreens: [{ id: "6.1", label: "6,1\"", priceDelta: 0 }],
    proScreens: [
      { id: "pro", label: "Pro · 5,8\"", priceDelta: 0 },
      { id: "pro-max", label: "Pro Max · 6,5\"", priceDelta: 120 },
    ],
  },
  {
    gen: 12,
    chip: "A14 Bionic",
    standardBase: 609,
    proBase: 929,
    standardScreens: [{ id: "6.1", label: "6,1\"", priceDelta: 0 }],
    proScreens: [
      { id: "pro", label: "Pro · 6,1\"", priceDelta: 0 },
      { id: "pro-max", label: "Pro Max · 6,7\"", priceDelta: 120 },
    ],
  },
  {
    gen: 13,
    chip: "A15 Bionic",
    standardBase: 709,
    proBase: 1029,
    standardScreens: [{ id: "6.1", label: "6,1\"", priceDelta: 0 }],
    proScreens: [
      { id: "pro", label: "Pro · 6,1\"", priceDelta: 0 },
      { id: "pro-max", label: "Pro Max · 6,7\"", priceDelta: 120 },
    ],
  },
  {
    gen: 14,
    chip: "A15 / A16 Bionic",
    standardBase: 799,
    proBase: 1129,
    standardScreens: [
      { id: "6.1", label: "6,1\"", priceDelta: 0 },
      { id: "6.7", label: "Plus · 6,7\"", priceDelta: 120 },
    ],
    proScreens: [
      { id: "pro", label: "Pro · 6,1\"", priceDelta: 0 },
      { id: "pro-max", label: "Pro Max · 6,7\"", priceDelta: 130 },
    ],
  },
  {
    gen: 15,
    chip: "A16 / A17 Pro",
    standardBase: 869,
    proBase: 1229,
    standardScreens: [
      { id: "6.1", label: "6,1\"", priceDelta: 0 },
      { id: "6.7", label: "Plus · 6,7\"", priceDelta: 120 },
    ],
    proScreens: [
      { id: "pro", label: "Pro · 6,1\"", priceDelta: 0 },
      { id: "pro-max", label: "Pro Max · 6,7\"", priceDelta: 130 },
    ],
  },
  {
    gen: 16,
    chip: "A18 / A18 Pro",
    standardBase: 969,
    proBase: 1329,
    standardScreens: [
      { id: "6.1", label: "6,1\"", priceDelta: 0 },
      { id: "6.7", label: "Plus · 6,7\"", priceDelta: 120 },
    ],
    proScreens: [
      { id: "pro", label: "Pro · 6,3\"", priceDelta: 0 },
      { id: "pro-max", label: "Pro Max · 6,9\"", priceDelta: 150 },
    ],
  },
  {
    gen: 17,
    chip: "A19 / A19 Pro",
    standardBase: 1069,
    proBase: 1479,
    standardScreens: [
      { id: "6.1", label: "6,1\"", priceDelta: 0 },
      { id: "6.7", label: "Plus · 6,7\"", priceDelta: 120 },
    ],
    proScreens: [
      { id: "pro", label: "Pro · 6,3\"", priceDelta: 0 },
      { id: "pro-max", label: "Pro Max · 6,9\"", priceDelta: 150 },
    ],
  },
];

function buildIphones(): Product[] {
  const products: Product[] = [];
  for (const g of IPHONE_GENERATIONS) {
    // Ligne standard
    products.push({
      slug: `iphone-${g.gen}`,
      name: `iPhone ${g.gen}`,
      brand: "Apple",
      category: "iphone",
      price: g.standardBase,
      emoji: "📱",
      tagline: `${g.chip}. Le smartphone du quotidien.`,
      description: `L'iPhone ${g.gen} embarque la puce ${g.chip}. Choisissez la taille d'écran, le stockage et la couleur.`,
      specs: { Puce: g.chip, "5G": "Oui", "Face ID": "Oui" },
      featured: g.gen >= 16,
      screenOptions: g.standardScreens,
      storageOptions: STORAGE_STANDARD,
      colorOptions: COLORS_STANDARD,
    });
    // Ligne Pro (regroupe Pro et Pro Max via la taille d'écran)
    products.push({
      slug: `iphone-${g.gen}-pro`,
      name: `iPhone ${g.gen} Pro`,
      brand: "Apple",
      category: "iphone",
      price: g.proBase,
      emoji: "📱",
      tagline: `${g.chip}. Système photo Pro, châssis premium.`,
      description: `L'iPhone ${g.gen} Pro avec puce ${g.chip}. Choisissez entre Pro et Pro Max, le stockage et la finition.`,
      specs: { Puce: g.chip, "5G": "Oui", "Face ID": "Oui", "Photo": "Système Pro" },
      featured: g.gen >= 16,
      screenOptions: g.proScreens,
      storageOptions: STORAGE_PRO,
      colorOptions: COLORS_PRO,
    });
  }
  return products;
}

// --- Reste du catalogue ---

const OTHER_PRODUCTS: Product[] = [
  // Mac
  {
    slug: "macbook-air-m3",
    name: "MacBook Air 13\" M3",
    brand: "Apple",
    category: "mac",
    price: 1299,
    emoji: "💻",
    tagline: "Puce M3. Ultra fin, jusqu'à 18 h d'autonomie.",
    description:
      "Le MacBook Air M3 combine légèreté, silence et puissance pour le quotidien comme pour la création.",
    specs: {
      Puce: "Apple M3",
      Écran: "13,6\" Liquid Retina",
      Autonomie: "Jusqu'à 18 h",
    },
    featured: true,
    storageOptions: [
      { id: "256", label: "256 Go", priceDelta: 0 },
      { id: "512", label: "512 Go", priceDelta: 230 },
      { id: "1024", label: "1 To", priceDelta: 460 },
    ],
    colorOptions: [
      { id: "minuit", label: "Minuit", hex: "#2e3641" },
      { id: "lumiere-stellaire", label: "Lumière stellaire", hex: "#f0e6d2" },
      { id: "gris-sideral", label: "Gris sidéral", hex: "#7d7e80" },
      { id: "argent", label: "Argent", hex: "#e3e4e6" },
    ],
  },
  {
    slug: "macbook-pro-14-m3-pro",
    name: "MacBook Pro 14\" M3 Pro",
    brand: "Apple",
    category: "mac",
    price: 2299,
    emoji: "💻",
    tagline: "Écran Liquid Retina XDR et puce M3 Pro.",
    description:
      "Le MacBook Pro 14\" M3 Pro offre des performances pro pour le montage, le code et la 3D.",
    specs: {
      Puce: "Apple M3 Pro",
      Écran: "14,2\" Liquid Retina XDR",
      Ports: "3x Thunderbolt 4, HDMI, SDXC",
    },
    featured: true,
    storageOptions: [
      { id: "512", label: "512 Go", priceDelta: 0 },
      { id: "1024", label: "1 To", priceDelta: 230 },
      { id: "2048", label: "2 To", priceDelta: 690 },
    ],
    colorOptions: [
      { id: "noir-sideral", label: "Noir sidéral", hex: "#2b2b2d" },
      { id: "argent", label: "Argent", hex: "#e3e4e6" },
    ],
  },
  {
    slug: "imac-24-m3",
    name: "iMac 24\" M3",
    brand: "Apple",
    category: "mac",
    price: 1599,
    emoji: "🖥️",
    tagline: "Tout-en-un coloré avec puce M3.",
    description:
      "L'iMac 24\" M3 réunit un écran 4,5K éclatant et la puissance de la puce M3 dans un design fin et coloré.",
    specs: { Puce: "Apple M3", Écran: "24\" 4,5K Retina" },
    colorOptions: [
      { id: "bleu", label: "Bleu", hex: "#6b8fb5" },
      { id: "vert", label: "Vert", hex: "#a4c3a2" },
      { id: "rose", label: "Rose", hex: "#e6b0b8" },
      { id: "argent", label: "Argent", hex: "#e3e4e6" },
    ],
  },
  // iPad
  {
    slug: "ipad-air-m2",
    name: "iPad Air M2 11\"",
    brand: "Apple",
    category: "ipad",
    price: 719,
    emoji: "📲",
    tagline: "Puce M2, compatible Apple Pencil Pro.",
    description:
      "L'iPad Air M2 est polyvalent, léger et puissant, idéal pour dessiner, travailler et regarder.",
    specs: { Puce: "Apple M2", Écran: "11\" Liquid Retina" },
    featured: true,
    storageOptions: [
      { id: "128", label: "128 Go", priceDelta: 0 },
      { id: "256", label: "256 Go", priceDelta: 70 },
      { id: "512", label: "512 Go", priceDelta: 230 },
    ],
    colorOptions: [
      { id: "gris-sideral", label: "Gris sidéral", hex: "#7d7e80" },
      { id: "bleu", label: "Bleu", hex: "#6b8fb5" },
      { id: "mauve", label: "Mauve", hex: "#b7a7cf" },
      { id: "lumiere-stellaire", label: "Lumière stellaire", hex: "#f0e6d2" },
    ],
  },
  {
    slug: "ipad-pro-m4-11",
    name: "iPad Pro M4 11\"",
    brand: "Apple",
    category: "ipad",
    price: 1219,
    emoji: "📲",
    tagline: "Écran Ultra Retina XDR OLED, puce M4.",
    description:
      "L'iPad Pro M4 est l'iPad le plus fin et le plus puissant, avec un écran OLED tandem exceptionnel.",
    specs: { Puce: "Apple M4", Écran: "11\" Ultra Retina XDR OLED" },
    storageOptions: [
      { id: "256", label: "256 Go", priceDelta: 0 },
      { id: "512", label: "512 Go", priceDelta: 230 },
      { id: "1024", label: "1 To", priceDelta: 690 },
    ],
    colorOptions: [
      { id: "noir-sideral", label: "Noir sidéral", hex: "#2b2b2d" },
      { id: "argent", label: "Argent", hex: "#e3e4e6" },
    ],
  },
  {
    slug: "ipad-10",
    name: "iPad (10e génération)",
    brand: "Apple",
    category: "ipad",
    price: 409,
    emoji: "📲",
    tagline: "L'iPad essentiel, coloré et abordable.",
    description:
      "L'iPad 10e génération est parfait pour naviguer, étudier et se divertir au quotidien.",
    specs: { Puce: "A14 Bionic", Écran: "10,9\" Liquid Retina" },
    storageOptions: [
      { id: "64", label: "64 Go", priceDelta: 0 },
      { id: "256", label: "256 Go", priceDelta: 150 },
    ],
    colorOptions: [
      { id: "argent", label: "Argent", hex: "#e3e4e6" },
      { id: "bleu", label: "Bleu", hex: "#6b8fb5" },
      { id: "rose", label: "Rose", hex: "#e6b0b8" },
      { id: "jaune", label: "Jaune", hex: "#e8cf7a" },
    ],
  },
  // Audio — Apple
  {
    slug: "airpods-pro-2",
    name: "AirPods Pro 2 (USB-C)",
    brand: "Apple",
    category: "audio",
    price: 279,
    emoji: "🎧",
    tagline: "Réduction de bruit active nouvelle génération.",
    description:
      "Les AirPods Pro 2 offrent une réduction de bruit deux fois plus efficace, l'audio adaptatif et un boîtier USB-C.",
    specs: {
      Puce: "Apple H2",
      Réduction: "Active + Transparence",
      Autonomie: "6 h (30 h avec boîtier)",
    },
    featured: true,
  },
  {
    slug: "airpods-4",
    name: "AirPods 4",
    brand: "Apple",
    category: "audio",
    price: 149,
    emoji: "🎧",
    tagline: "Confort ouvert, son spatial personnalisé.",
    description:
      "Les AirPods 4 proposent un nouveau design ergonomique et un son immersif au quotidien.",
    specs: { Puce: "Apple H2", Autonomie: "5 h (30 h avec boîtier)" },
  },
  {
    slug: "airpods-max",
    name: "AirPods Max (USB-C)",
    brand: "Apple",
    category: "audio",
    price: 579,
    emoji: "🎧",
    tagline: "Casque circum-auriculaire haute-fidélité.",
    description:
      "Le casque AirPods Max délivre un son d'exception avec réduction de bruit active et audio spatial.",
    specs: { Type: "Casque circum-auriculaire", Autonomie: "20 h" },
    colorOptions: [
      { id: "gris-sideral", label: "Gris sidéral", hex: "#7d7e80" },
      { id: "argent", label: "Argent", hex: "#e3e4e6" },
      { id: "bleu", label: "Bleu", hex: "#6b8fb5" },
      { id: "violet", label: "Violet", hex: "#b7a7cf" },
    ],
  },
  // Audio — hors Apple
  {
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "audio",
    price: 349,
    emoji: "🎧",
    tagline: "La référence du casque à réduction de bruit.",
    description:
      "Le casque Sony WH-1000XM5 offre une réduction de bruit leader et un son riche pour les longs trajets.",
    specs: { Type: "Casque sans fil", Autonomie: "30 h", Bluetooth: "5.2" },
    colorOptions: [
      { id: "noir", label: "Noir", hex: "#1d1d1f" },
      { id: "argent", label: "Argent", hex: "#d9d6cf" },
    ],
  },
  {
    slug: "jbl-tune-flex",
    name: "JBL Tune Flex",
    brand: "JBL",
    category: "audio",
    price: 99,
    emoji: "🎧",
    tagline: "Écouteurs Bluetooth avec ANC.",
    description:
      "Les JBL Tune Flex offrent un son JBL Pure Bass et une réduction de bruit active, sans la marque Apple.",
    specs: { Type: "Écouteurs Bluetooth", Autonomie: "Jusqu'à 32 h", Résistance: "IPX4" },
  },
  {
    slug: "ecouteurs-filaires-usbc",
    name: "Écouteurs filaires USB-C",
    brand: "Apple",
    category: "audio",
    price: 19,
    emoji: "🎧",
    tagline: "Écouteurs intra-auriculaires filaires.",
    description:
      "Des écouteurs filaires USB-C fiables avec télécommande et micro intégrés.",
    specs: { Type: "Filaire intra-auriculaire", Connectique: "USB-C" },
  },
  {
    slug: "ecouteurs-filaires-jack",
    name: "Écouteurs filaires Jack 3,5 mm",
    brand: "JBL",
    category: "audio",
    price: 15,
    emoji: "🎧",
    tagline: "Son Pure Bass, prise jack universelle.",
    description:
      "Écouteurs filaires JBL avec prise jack 3,5 mm, compatibles avec la plupart des appareils.",
    specs: { Type: "Filaire intra-auriculaire", Connectique: "Jack 3,5 mm" },
  },
  // Enceintes JBL
  {
    slug: "jbl-flip-6",
    name: "JBL Flip 6",
    brand: "JBL",
    category: "enceintes",
    price: 129,
    emoji: "🔊",
    tagline: "Enceinte portable robuste, son puissant.",
    description:
      "L'enceinte JBL Flip 6 délivre un son clair et des basses profondes, résistante à l'eau et à la poussière.",
    specs: { Puissance: "30 W", Autonomie: "12 h", Résistance: "IP67" },
    featured: true,
    colorOptions: [
      { id: "noir", label: "Noir", hex: "#1d1d1f" },
      { id: "bleu", label: "Bleu", hex: "#3a6ea5" },
      { id: "rouge", label: "Rouge", hex: "#b60d16" },
      { id: "gris", label: "Gris", hex: "#8a8a8d" },
    ],
  },
  {
    slug: "jbl-charge-5",
    name: "JBL Charge 5",
    brand: "JBL",
    category: "enceintes",
    price: 179,
    emoji: "🔊",
    tagline: "Grosses basses + batterie qui recharge vos appareils.",
    description:
      "La JBL Charge 5 combine un son puissant et une batterie intégrée pour recharger votre téléphone.",
    specs: { Puissance: "40 W", Autonomie: "20 h", Résistance: "IP67" },
  },
  {
    slug: "jbl-go-4",
    name: "JBL Go 4",
    brand: "JBL",
    category: "enceintes",
    price: 39,
    emoji: "🔊",
    tagline: "Mini enceinte nomade ultra-compacte.",
    description:
      "La JBL Go 4 tient dans la poche et offre un son étonnant partout où vous allez.",
    specs: { Puissance: "4,2 W", Autonomie: "9 h", Résistance: "IP67" },
  },
  // TV & Maison
  {
    slug: "apple-tv-4k",
    name: "Apple TV 4K",
    brand: "Apple",
    category: "tv-maison",
    price: 169,
    emoji: "📺",
    tagline: "Streaming 4K Dolby Vision, puce A15.",
    description:
      "L'Apple TV 4K transforme votre téléviseur avec un streaming fluide, Dolby Atmos et l'écosystème Apple.",
    specs: { Vidéo: "4K Dolby Vision", Puce: "A15 Bionic", Audio: "Dolby Atmos" },
  },
  {
    slug: "airtag",
    name: "AirTag",
    brand: "Apple",
    category: "tv-maison",
    price: 39,
    emoji: "🔎",
    tagline: "Localisez vos objets dans l'app Localiser.",
    description:
      "L'AirTag vous aide à retrouver clés, sac ou valise grâce au réseau Localiser d'Apple.",
    specs: { Localisation: "Précise (U1)", Batterie: "1 an (remplaçable)" },
  },
  {
    slug: "airtag-pack-4",
    name: "AirTag Pack de 4",
    brand: "Apple",
    category: "tv-maison",
    price: 129,
    emoji: "🔎",
    tagline: "Quatre AirTags pour tout suivre.",
    description:
      "Le pack de 4 AirTags pour équiper tous vos objets importants à prix réduit.",
    specs: { Quantité: "4", Localisation: "Précise (U1)" },
  },
  // Accessoires
  {
    slug: "chargeur-officiel-apple-20w",
    name: "Chargeur officiel Apple 20 W USB-C",
    brand: "Apple",
    category: "accessoires",
    price: 25,
    emoji: "🔌",
    tagline: "Adaptateur secteur officiel Apple.",
    description:
      "Le chargeur officiel Apple 20 W USB-C recharge rapidement iPhone et iPad en toute sécurité.",
    specs: { Puissance: "20 W", Connectique: "USB-C", Origine: "Officiel Apple" },
  },
  {
    slug: "magsafe-charger",
    name: "Chargeur MagSafe",
    brand: "Apple",
    category: "accessoires",
    price: 49,
    emoji: "🧲",
    tagline: "Recharge sans fil aimantée jusqu'à 15 W.",
    description:
      "Le chargeur MagSafe s'aligne parfaitement pour une recharge sans fil rapide et pratique.",
    specs: { Puissance: "Jusqu'à 15 W", Compatibilité: "iPhone 12 et +" },
  },
  {
    slug: "coque-silicone-iphone",
    name: "Coque silicone iPhone",
    brand: "Apple",
    category: "accessoires",
    price: 29,
    emoji: "🛡️",
    tagline: "Protection souple, compatible MagSafe.",
    description:
      "Une coque en silicone toucher doux qui protège votre iPhone tout en restant fine.",
    specs: { Matière: "Silicone", MagSafe: "Compatible" },
    colorOptions: [
      { id: "noir", label: "Noir", hex: "#1d1d1f" },
      { id: "bleu", label: "Bleu", hex: "#3a6ea5" },
      { id: "rose", label: "Rose", hex: "#e6b0b8" },
      { id: "vert", label: "Vert", hex: "#a4c3a2" },
    ],
  },
  {
    slug: "verre-trempe-iphone",
    name: "Verre trempé iPhone (x2)",
    brand: "Belkin",
    category: "accessoires",
    price: 19,
    emoji: "🧊",
    tagline: "Protection d'écran 9H, pose facile.",
    description:
      "Lot de deux verres trempés ultra-résistants avec kit de pose sans bulles.",
    specs: { Dureté: "9H", Quantité: "2" },
  },
  // Believe
  {
    slug: "believe-powerbank-20k",
    name: "Believe PowerBank 20 000 mAh",
    brand: "Believe",
    category: "believe",
    price: 59,
    emoji: "🔋",
    tagline: "Charge rapide 30 W, deux appareils à la fois.",
    description:
      "La batterie externe Believe 20K garde vos appareils chargés toute la journée avec la charge rapide USB-C PD.",
    specs: { Capacité: "20 000 mAh", Puissance: "30 W" },
    featured: true,
  },
  {
    slug: "believe-chargeur-gan-65w",
    name: "Believe Chargeur GaN 65 W",
    brand: "Believe",
    category: "believe",
    price: 39,
    emoji: "⚡",
    tagline: "Compact, 3 ports, charge un MacBook.",
    description:
      "Le chargeur Believe GaN 65 W recharge simultanément téléphone, tablette et ordinateur portable.",
    specs: { Puissance: "65 W", Technologie: "GaN" },
    featured: true,
  },
  {
    slug: "believe-ecouteurs-anc",
    name: "Believe Écouteurs ANC",
    brand: "Believe",
    category: "believe",
    price: 49,
    emoji: "🎧",
    tagline: "Écouteurs sans fil à réduction de bruit.",
    description:
      "Les écouteurs Believe ANC offrent un son équilibré et une réduction de bruit efficace à petit prix.",
    specs: { Type: "Écouteurs Bluetooth", Autonomie: "Jusqu'à 28 h" },
  },
  {
    slug: "believe-cable-usbc-2m",
    name: "Believe Câble USB-C 2 m",
    brand: "Believe",
    category: "believe",
    price: 15,
    emoji: "🧵",
    tagline: "Câble tressé 100 W, ultra résistant.",
    description:
      "Le câble Believe USB-C vers USB-C tressé supporte la charge rapide 100 W et un transfert de données rapide.",
    specs: { Longueur: "2 m", Puissance: "100 W" },
  },
  {
    slug: "believe-chargeur-sans-fil",
    name: "Believe Chargeur sans fil 15 W",
    brand: "Believe",
    category: "believe",
    price: 29,
    emoji: "🔌",
    tagline: "Socle de charge à induction 15 W.",
    description:
      "Le chargeur sans fil Believe 15 W recharge votre téléphone d'un simple geste, câble USB-C inclus.",
    specs: { Puissance: "15 W", Type: "Induction Qi" },
  },
];

export const PRODUCTS: Product[] = [...buildIphones(), ...OTHER_PRODUCTS];

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

/** iPhone + Mac : le cœur de gamme Apple mis en avant sur l'accueil. */
export function getAppleHighlights(): Product[] {
  return PRODUCTS.filter(
    (p) => p.featured && (p.category === "iphone" || p.category === "mac"),
  );
}

export function getBelieveProducts(): Product[] {
  return PRODUCTS.filter((p) => p.category === "believe");
}

export function hasOptions(product: Product): boolean {
  return Boolean(
    product.screenOptions?.length ||
      product.storageOptions?.length ||
      product.colorOptions?.length,
  );
}

function optionDelta(
  options: PriceOption[] | undefined,
  id: string | undefined,
): number {
  if (!options || !id) return 0;
  return options.find((o) => o.id === id)?.priceDelta ?? 0;
}

/** Prix final d'un produit compte tenu des options sélectionnées. */
export function getUnitPrice(product: Product, selection: Selection): number {
  return (
    product.price +
    optionDelta(product.screenOptions, selection.screen) +
    optionDelta(product.storageOptions, selection.storage)
  );
}

/** Sélection par défaut (première option de chaque groupe). */
export function defaultSelection(product: Product): Selection {
  return {
    screen: product.screenOptions?.[0]?.id,
    storage: product.storageOptions?.[0]?.id,
    color: product.colorOptions?.[0]?.id,
  };
}

/** Libellés lisibles des options sélectionnées, pour l'affichage du panier. */
export function selectionLabels(
  product: Product,
  selection: Selection,
): string[] {
  const parts: string[] = [];
  const screen = product.screenOptions?.find((o) => o.id === selection.screen);
  const storage = product.storageOptions?.find(
    (o) => o.id === selection.storage,
  );
  const color = product.colorOptions?.find((o) => o.id === selection.color);
  if (screen) parts.push(screen.label);
  if (storage) parts.push(storage.label);
  if (color) parts.push(color.label);
  return parts;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
