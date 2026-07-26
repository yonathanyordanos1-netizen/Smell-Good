import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { perfumeData, getImageUrlForProduct } from "../data/products";
import type { DisplayProduct } from "../types";

/**
 * Hook that fetches products from Convex, falling back to static demo data.
 * Also resolves Convex storage IDs to actual image URLs.
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

  // Collect all storage IDs from products that have them
  const storageIds = useMemo(
    () =>
      convexProducts
        .filter((p) => p.imageStorageId)
        .map((p) => p.imageStorageId!),
    [convexProducts]
  );

  // Resolve storage IDs to URLs (skip if none)
  const urlMap = useQuery(
    api.storage.getStorageUrlMap,
    storageIds.length > 0 ? { storageIds } : "skip"
  );

  // Build resolved products
  const products: DisplayProduct[] = convexProducts.map((p) => {
    let imageUrl = p.imageUrl;

    // If product has a storage ID, try to resolve it
    if (p.imageStorageId && urlMap && urlMap[p.imageStorageId]) {
      imageUrl = urlMap[p.imageStorageId]!;
    }

    return {
      _id: p._id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      price: p.price,
      imageUrl,
      imageStorageId: p.imageStorageId,
      category: p.category,
      notes: p.notes,
      volume: p.volume,
      inStock: p.inStock,
      featured: p.featured,
    };
  });

  return {
    products,
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

/**
 * Upload a file to Convex storage and return the storage ID.
 */
export async function uploadFile(
  generateUploadUrl: () => Promise<string>,
  file: File
): Promise<string> {
  // 1. Get the upload URL
  const uploadUrl = await generateUploadUrl();

  // 2. POST the file to the upload URL
  const result = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!result.ok) {
    throw new Error(`Upload failed: ${result.statusText}`);
  }

  const { storageId } = await result.json();
  return storageId;
}
