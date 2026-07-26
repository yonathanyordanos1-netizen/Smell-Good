import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { perfumeData, getImageUrlForProduct } from "../data/products";
import type { DisplayProduct } from "../types";

/**
 * Hook that fetches products from Convex, falling back to static demo data
 * while loading or when Convex is not configured.
 */
export function useProducts(): {
  products: DisplayProduct[];
  isLoading: boolean;
  isFromConvex: boolean;
} {
  const convexProducts = useQuery(api.products.getAll);

  // While loading (Convex connected but still fetching), show static data
  if (convexProducts === undefined) {
    return {
      products: perfumeData.map((p, i) => ({
        ...p,
        imageUrl: getImageUrlForProduct(i),
      })),
      isLoading: true,
      isFromConvex: false,
    };
  }

  // Convex returned data
  return {
    products: convexProducts.map((p) => ({
      _id: p._id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      price: p.price,
      imageUrl: p.imageUrl,
      category: p.category,
      notes: p.notes,
      volume: p.volume,
      inStock: p.inStock,
      featured: p.featured,
    })),
    isLoading: false,
    isFromConvex: true,
  };
}

/**
 * Hook that finds a single product by slug.
 */
export function useProduct(slug: string | undefined): {
  product: DisplayProduct | undefined;
  isLoading: boolean;
} {
  const { products, isLoading } = useProducts();

  if (!slug) {
    return { product: undefined, isLoading: false };
  }

  // Try exact slug match first
  let product = products.find((p) => p.slug === slug);

  // If not found and using static data, try index-based lookup
  if (!product) {
    const staticIndex = perfumeData.findIndex((p) => p.slug === slug);
    if (staticIndex !== -1) {
      const p = perfumeData[staticIndex];
      product = {
        ...p,
        imageUrl: getImageUrlForProduct(staticIndex),
      };
    }
  }

  return { product, isLoading };
}
