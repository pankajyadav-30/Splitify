import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const userName = identity.name || 
                    identity.email?.split('@')[0] || 
                    "Anonymous";

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      if (user.name !== userName) {
        await ctx.db.patch(user._id, { name: userName });
      }
      return user._id;
    }
    
    return await ctx.db.insert("users", {
      name: userName,
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email,
      imageUrl: identity.pictureUrl || null,
    });
  },
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
});

export const searchUsers = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.query.length < 2) {
      return [];
    }

    const currentUserIdentity = await ctx.auth.getUserIdentity();
    if (!currentUserIdentity) {
      return [];
    }

    // Option 1: Using search index (requires proper index setup)
    const users = await ctx.db
      .query("users")
      .withSearchIndex("search_name", (q) => 
        q.search("name", args.query)
      )
      .collect();

    // Option 2: Alternative filter approach (if search isn't working)
    // const users = await ctx.db
    //   .query("users")
    //   .filter(q => 
    //     q.or(
    //       q.eq("name", args.query),
    //       q.eq("email", args.query)
    //     )
    //   )
    //   .collect();

    return users
      .filter(user => user.tokenIdentifier !== currentUserIdentity.tokenIdentifier)
      .map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      }));
  },
});

export const schema = {
  users: v.object({
    name: v.string(),
    tokenIdentifier: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  }),
};