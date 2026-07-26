import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(), // Price in ETB
    imageUrl: v.string(),
    category: v.string(),
    notes: v.array(v.string()), // Fragrance notes
    volume: v.optional(v.string()), // e.g., "50ml", "100ml"
    inStock: v.boolean(),
    featured: v.boolean(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  orders: defineTable({
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.optional(v.string()),
    customerAddress: v.string(),
    items: v.array(
      v.object({
        productId: v.optional(v.id("products")),
        productName: v.string(),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    total: v.number(),
    status: v.string(), // "pending", "confirmed", "shipped", "delivered", "cancelled"
    notes: v.optional(v.string()),
    paymentMethod: v.string(), // "telebirr", "cash"
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
});
