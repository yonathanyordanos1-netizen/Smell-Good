import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all contact submissions (admin)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

// Submit a contact form
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
