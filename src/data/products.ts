import type { Doc } from "convex/_generated/dataModel";

// Product data for the demo - these will be seeded into Convex
export interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  notes: string[];
  volume: string;
  inStock: boolean;
  featured: boolean;
}

export const perfumeData: SeedProduct[] = [
  {
    name: "Black Diamond Intense",
    slug: "black-diamond-intense",
    description: "An intense and captivating fragrance that embodies luxury and sophistication. With deep woody notes and a touch of musk, Black Diamond Intense is designed for those who command attention. The rich, dark aroma lingers throughout the day, leaving an unforgettable impression.",
    price: 21000,
    category: "Oriental",
    notes: ["Bergamot", "Black Pepper", "Leather", "Oud", "Amber", "Musk"],
    volume: "100ml",
    inStock: true,
    featured: true,
  },
  {
    name: "Emerald",
    slug: "emerald",
    description: "A fresh and vibrant fragrance inspired by the lush greenery of emerald forests. Green notes blend seamlessly with citrus and aquatic undertones, creating a scent that is both invigorating and elegant. Perfect for the modern individual who appreciates nature's finest aromas.",
    price: 13000,
    category: "Fresh",
    notes: ["Green Apple", "Lemon", "Jasmine", "Moss", "Cedarwood", "Ambergris"],
    volume: "100ml",
    inStock: true,
    featured: true,
  },
  {
    name: "Brazilian Tobacco",
    slug: "brazilian-tobacco",
    description: "A bold and distinctive fragrance that captures the rich, warm essence of Brazilian tobacco leaves. Blended with honey and vanilla, this scent offers a sweet yet smoky character that is both comforting and alluring. A statement fragrance for the confident soul.",
    price: 9000,
    category: "Oriental",
    notes: ["Tobacco Leaf", "Honey", "Vanilla", "Cinnamon", "Leather", "Sandalwood"],
    volume: "100ml",
    inStock: true,
    featured: true,
  },
  {
    name: "Club de Nuits",
    slug: "club-de-nuits",
    description: "An enigmatic night-time fragrance designed for evening elegance and sophistication. With a blend of aromatic herbs, spices, and warm woods, Club de Nuits evokes the mystery and allure of nighttime adventures in the city.",
    price: 10500,
    category: "Woody",
    notes: ["Grapefruit", "Lavender", "Sage", "Patchouli", "Vetiver", "Tonka Bean"],
    volume: "100ml",
    inStock: true,
    featured: true,
  },
  {
    name: "Royal Oud",
    slug: "royal-oud",
    description: "A regal fragrance centered around precious oud wood, one of the most sought-after ingredients in perfumery. Royal Oud combines the richness of agarwood with rose and saffron for a truly majestic scent experience that speaks of power and prestige.",
    price: 18000,
    category: "Oriental",
    notes: ["Oud", "Rose", "Saffron", "Bergamot", "Cedar", "Amber"],
    volume: "75ml",
    inStock: true,
    featured: true,
  },
  {
    name: "Ocean Breeze",
    slug: "ocean-breeze",
    description: "A refreshing aquatic fragrance that transports you to a serene tropical coastline. With marine accords balanced by citrus and light florals, Ocean Breeze is your daily escape to paradise in a bottle. Light, airy, and endlessly refreshing.",
    price: 9500,
    category: "Fresh",
    notes: ["Sea Salt", "Lemon", "Mint", "Lavender", "Cedar", "Musk"],
    volume: "100ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Velvet Rose",
    slug: "velvet-rose",
    description: "A luxurious floral fragrance that celebrates the timeless beauty of the rose. Velvet Rose wraps you in a soft, velvety embrace of petals and musk, with subtle hints of peach and vanilla adding warmth and depth. An elegant choice for any occasion.",
    price: 11000,
    category: "Floral",
    notes: ["Rose", "Peach", "Violet", "Musk", "Vanilla", "Sandalwood"],
    volume: "75ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Midnight Oud",
    slug: "midnight-oud",
    description: "A deeper, more mysterious take on the classic oud fragrance. Midnight Oud blends dark woods with incense and spice, creating an atmospheric scent that is perfect for evening wear. Dark, complex, and utterly captivating.",
    price: 19500,
    category: "Oriental",
    notes: ["Oud", "Incense", "Black Pepper", "Leather", "Amber", "Patchouli"],
    volume: "75ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Citrus Burst",
    slug: "citrus-burst",
    description: "An energetic explosion of citrus fruits that awakens the senses and brightens your day. With zesty lemon, orange, and grapefruit at its heart, this fragrance is pure sunshine bottled. Perfect for those who love fresh, invigorating scents.",
    price: 8500,
    category: "Fresh",
    notes: ["Lemon", "Orange", "Grapefruit", "Bergamot", "Ginger", "Mint"],
    volume: "100ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Amber Nights",
    slug: "amber-nights",
    description: "A warm and sensual fragrance that unfolds beautifully through the evening hours. Amber Nights combines golden amber with vanilla, tonka bean, and a whisper of cinnamon for a cozy yet sophisticated scent experience.",
    price: 12000,
    category: "Oriental",
    notes: ["Amber", "Vanilla", "Tonka Bean", "Cinnamon", "Benzoin", "Musk"],
    volume: "100ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Lavender Dreams",
    slug: "lavender-dreams",
    description: "A calming and elegant aromatic fragrance centered around the finest lavender. Blended with sage, rosemary, and soft woods, Lavender Dreams offers a soothing escape from the chaos of everyday life. Serenity in a bottle.",
    price: 9000,
    category: "Aromatic",
    notes: ["Lavender", "Sage", "Rosemary", "Cedarwood", "Musk", "Coumarin"],
    volume: "100ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Sandalwood Serenity",
    slug: "sandalwood-serenity",
    description: "A creamy, smooth sandalwood fragrance that embodies tranquility and balance. Sandalwood Serenity is a masterful blend of precious sandalwood with iris and cashmere woods, creating a scent that is both grounding and uplifting.",
    price: 14000,
    category: "Woody",
    notes: ["Sandalwood", "Iris", "Cashmere Wood", "Vanilla", "Amber", "Musk"],
    volume: "75ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Spiced Bergamot",
    slug: "spiced-bergamot",
    description: "A unique fusion of bright bergamot and warm spices that creates an intriguing contrast. Spiced Bergamot opens with citrus brilliance before revealing a heart of cinnamon, clove, and nutmeg. An unforgettable olfactory journey.",
    price: 10000,
    category: "Fresh",
    notes: ["Bergamot", "Cinnamon", "Clove", "Nutmeg", "Ginger", "Cedar"],
    volume: "100ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Musk Gold",
    slug: "musk-gold",
    description: "A luxurious interpretation of classic musk, elevated with golden amber and precious woods. Musk Gold is soft yet powerful, clean yet deeply sensual. A signature scent that leaves a memorable trail wherever you go.",
    price: 15000,
    category: "Oriental",
    notes: ["White Musk", "Amber", "Sandalwood", "Jasmine", "Rose", "Vanilla"],
    volume: "75ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Green Tea & Mint",
    slug: "green-tea-mint",
    description: "A refreshing and invigorating fragrance inspired by the ritual of drinking green tea. Crisp mint leaves complement the earthy, slightly bitter notes of matcha green tea, creating a scent that is clean, modern, and revitalizing.",
    price: 8000,
    category: "Fresh",
    notes: ["Green Tea", "Mint", "Lemon", "Bergamot", "Jasmine", "Musk"],
    volume: "100ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Dark Vanilla",
    slug: "dark-vanilla",
    description: "A sophisticated take on vanilla that goes beyond the ordinary. Dark Vanilla features Madagascar vanilla bean deepened with dark chocolate, coffee, and smoky woods. Rich, indulgent, and absolutely irresistible.",
    price: 11500,
    category: "Gourmand",
    notes: ["Madagascar Vanilla", "Dark Chocolate", "Coffee", "Cinnamon", "Sandalwood", "Musk"],
    volume: "75ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Jasmine White",
    slug: "jasmine-white",
    description: "A pure and radiant floral fragrance that showcases the queen of flowers in all her glory. Jasmine White captures the intoxicating scent of night-blooming jasmine, softened with white musk and a hint of pear. Elegance personified.",
    price: 10500,
    category: "Floral",
    notes: ["Jasmine", "White Musk", "Pear", "Lily of the Valley", "Sandalwood", "Amber"],
    volume: "75ml",
    inStock: true,
    featured: false,
  },
  {
    name: "Leather & Smoke",
    slug: "leather-smoke",
    description: "A bold, daring fragrance for those who walk their own path. Leather & Smoke combines rugged leather with birch tar smoke and dark spices. Masculine, intense, and uncompromising — this is a fragrance that demands attention.",
    price: 16000,
    category: "Woody",
    notes: ["Leather", "Birch Tar", "Smoke", "Black Pepper", "Vetiver", "Amber"],
    volume: "100ml",
    inStock: true,
    featured: false,
  },
];

// Map image index to product slug (ordered by the image files)
const imageFileNames = [
  "WhatsApp Image 2026-07-26 at 09.46.27.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.28.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.29.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.291.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.31.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.32.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.36.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.39.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.40.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.401.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.4012.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.41.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.411.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.412.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.422.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.43.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.432.jpeg",
  "WhatsApp Image 2026-07-26 at 09.46.442.jpeg",
];

export function getImageUrlForProduct(index: number): string {
  return `/images/perfumes/${imageFileNames[index]}`;
}

export function getCategoryCounts(products: SeedProduct[]): Record<string, number> {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return counts;
}

export function getAllCategories(products: SeedProduct[]): string[] {
  return [...new Set(products.map((p) => p.category))];
}
