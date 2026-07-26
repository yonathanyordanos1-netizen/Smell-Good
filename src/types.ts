// Unified product type used across the app - works with both Convex and static data
export interface DisplayProduct {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageStorageId?: string; // Convex storage ID for uploaded images
  category: string;
  notes: string[];
  volume?: string;
  inStock: boolean;
  featured: boolean;
}
