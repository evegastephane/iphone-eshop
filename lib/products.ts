export type Category =
  | "iphone"
  | "mac"
  | "ipad"
  | "audio"
  | "tv-maison"
  | "accessoires"
  | "enceintes"
  | "believe";

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
  { id: "iphone", label: "iPhone" },
  { id: "mac", label: "Mac" },
  { id: "ipad", label: "iPad" },
  { id: "audio", label: "Audio" },
  { id: "enceintes", label: "Enceintes" },
  { id: "tv-maison", label: "TV & Maison" },
  { id: "accessoires", label: "Accessoires" },
  { id: "believe", label: "Believe" },
];

// --- iPhone catalog (modèles 11 → 17, déclinaisons simple / Plus / Pro / Pro Max) ---

type IphoneVariant = {
  suffix: string;
  label: string;
  priceDelta: number;
  screen: string;
  camera: string;
};

const IPHONE_VARIANTS: IphoneVariant[] = [
  {
    suffix: "",
    label: "",
    priceDelta: 0,
    screen: "6,1\" Liquid Retina",
    camera: "Double 12 Mpx",
  },
  {
    suffix: "-plus",
    label: "Plus",
    priceDelta: 130,
    screen: "6,7\" Liquid Retina",
    camera: "Double 48 Mpx",
  },
  {
    suffix: "-pro",
    label: "Pro",
    priceDelta: 320,
    screen: "6,1\" Super Retina XDR ProMotion",
    camera: "Triple 48 Mpx + LiDAR",
  },
  {
    suffix: "-pro-max",
    label: "Pro Max",
    priceDelta: 470,
    screen: "6,7\" Super Retina XDR ProMotion",
    camera: "Triple 48 Mpx + téléobjectif",
  },
];

const IPHONE_GENERATIONS: { gen: number; base: number; chip: string }[] = [
  { gen: 11, base: 509, chip: "A13 Bionic" },
  { gen: 12, base: 609, chip: "A14 Bionic" },
  { gen: 13, base: 709, chip: "A15 Bionic" },
  { gen: 14, base: 799, chip: "A15 / A16 Bionic" },
  { gen: 15, base: 869, chip: "A16 / A17 Pro" },
  { gen: 16, base: 969, chip: "A18 / A18 Pro" },
  { gen: 17, base: 1069, chip: "A19 / A19 Pro" },
];

function buildIphones(): Product[] {
  const products: Product[] = [];
  for (const { gen, base, chip } of IPHONE_GENERATIONS) {
    for (const v of IPHONE_VARIANTS) {
      const name = `iPhone ${gen}${v.label ? ` ${v.label}` : ""}`;
      const isTop = v.suffix === "-pro-max";
      products.push({
        slug: `iphone-${gen}${v.suffix}`,
        name,
        brand: "Apple",
        category: "iphone",
        price: base + v.priceDelta,
        emoji: "📱",
        tagline: `${chip}. ${v.camera}.`,
        description: `Le ${name} embarque la puce ${chip}, un écran ${v.screen} et un système photo ${v.camera.toLowerCase()}. Le smartphone incontournable de la boutique.`,
        specs: {
          Écran: v.screen,
          Puce: chip,
          Caméra: v.camera,
          "5G": "Oui",
          Charge: "USB-C / Lightning selon modèle",
        },
        // Met en avant les modèles récents haut de gamme.
        featured: gen >= 16 && isTop,
      });
    }
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
      Mémoire: "16 Go",
      Stockage: "256 Go SSD",
      Autonomie: "Jusqu'à 18 h",
    },
    featured: true,
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
      Mémoire: "18 Go",
      Stockage: "512 Go SSD",
      Ports: "3x Thunderbolt 4, HDMI, SDXC",
    },
    featured: true,
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
    specs: {
      Puce: "Apple M3",
      Écran: "24\" 4,5K Retina",
      Mémoire: "8 Go",
      Stockage: "256 Go SSD",
    },
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
    specs: {
      Puce: "Apple M2",
      Écran: "11\" Liquid Retina",
      Stockage: "128 Go",
      Accessoire: "Apple Pencil Pro",
    },
    featured: true,
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
    specs: {
      Puce: "Apple M4",
      Écran: "11\" Ultra Retina XDR OLED",
      Stockage: "256 Go",
      Accessoire: "Magic Keyboard",
    },
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
    specs: {
      Puce: "A14 Bionic",
      Écran: "10,9\" Liquid Retina",
      Stockage: "64 Go",
    },
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
      Connectique: "USB-C",
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
    specs: {
      Puce: "Apple H2",
      Autonomie: "5 h (30 h avec boîtier)",
      Audio: "Spatial personnalisé",
    },
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
    specs: {
      Type: "Casque circum-auriculaire",
      Réduction: "Active",
      Autonomie: "20 h",
      Connectique: "USB-C",
    },
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
    specs: {
      Type: "Casque sans fil",
      Réduction: "Active adaptative",
      Autonomie: "30 h",
      Bluetooth: "5.2",
    },
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
    specs: {
      Type: "Écouteurs Bluetooth",
      Réduction: "Active",
      Autonomie: "Jusqu'à 32 h",
      Résistance: "IPX4",
    },
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
    specs: {
      Type: "Filaire intra-auriculaire",
      Connectique: "USB-C",
      Micro: "Oui",
    },
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
    specs: {
      Type: "Filaire intra-auriculaire",
      Connectique: "Jack 3,5 mm",
      Micro: "Oui",
    },
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
    specs: {
      Puissance: "30 W",
      Autonomie: "12 h",
      Résistance: "IP67",
      Bluetooth: "5.1",
    },
    featured: true,
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
    specs: {
      Puissance: "40 W",
      Autonomie: "20 h",
      Résistance: "IP67",
      Powerbank: "Oui",
    },
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
    specs: {
      Puissance: "4,2 W",
      Autonomie: "9 h",
      Résistance: "IP67",
    },
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
    specs: {
      Vidéo: "4K Dolby Vision",
      Puce: "A15 Bionic",
      Stockage: "128 Go",
      Audio: "Dolby Atmos",
    },
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
    specs: {
      Localisation: "Précise (U1)",
      Batterie: "1 an (remplaçable)",
      Résistance: "IP67",
    },
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
    specs: {
      Quantité: "4",
      Localisation: "Précise (U1)",
      Batterie: "1 an (remplaçable)",
    },
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
    specs: {
      Puissance: "20 W",
      Connectique: "USB-C",
      Origine: "Officiel Apple",
    },
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
    specs: {
      Puissance: "Jusqu'à 15 W",
      Compatibilité: "iPhone 12 et +",
      Longueur: "1 m",
    },
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
    specs: {
      Matière: "Silicone",
      MagSafe: "Compatible",
      Protection: "Chocs & rayures",
    },
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
    specs: {
      Dureté: "9H",
      Quantité: "2",
      Pose: "Kit d'alignement inclus",
    },
  },
  // Believe (marque dont la boutique est ambassadrice)
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
    specs: {
      Capacité: "20 000 mAh",
      Sorties: "2x USB-C + 1x USB-A",
      Puissance: "30 W",
    },
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
    specs: {
      Puissance: "65 W",
      Ports: "2x USB-C + 1x USB-A",
      Technologie: "GaN",
    },
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
    specs: {
      Type: "Écouteurs Bluetooth",
      Réduction: "Active",
      Autonomie: "Jusqu'à 28 h",
      Résistance: "IPX5",
    },
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
    specs: {
      Longueur: "2 m",
      Puissance: "100 W",
      Gaine: "Nylon tressé",
    },
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
    specs: {
      Puissance: "15 W",
      Type: "Induction Qi",
      Câble: "USB-C inclus",
    },
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

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
