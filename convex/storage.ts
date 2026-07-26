import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Generate a one-time upload URL for file uploads.
 * Client POSTs the file to this URL, gets back a storageId.
 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Get a download URL for a file stored in Convex by its storage ID.
 */
export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId as any);
  },
});

/**
 * Batch resolve multiple storage IDs to their URLs.
 * Returns a record of storageId -> URL.
 */
export const getStorageUrlMap = query({
  args: { storageIds: v.array(v.string()) },
  handler: async (ctx, { storageIds }) => {
    const result: Record<string, string | null> = {};
    for (const id of storageIds) {
      result[id] = await ctx.storage.getUrl(id as any);
    }
    return result;
  },
});
