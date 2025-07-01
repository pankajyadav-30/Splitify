import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const getAllContacts = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return { users: [], groups: [] };

        const currentUser = await ctx.runQuery(internal.users.getCurrentUser);
        if (!currentUser) return { users: [], groups: [] };

    
        const expensesYouPaid = await ctx.db
            .query("expenses")
            .withIndex("by_user_and_group", (q) =>
                q.eq("paidByUserId", currentUser._id).eq("groupId", undefined)
            ).collect();
    
        const expenseNotPaidByYou = ( 
            await ctx.db
                .query("expenses")
                .withIndex("by_group", (q) => q.eq("groupId", undefined))
                .collect()
        ).filter((e) => 
            e.paidByUserId !== currentUser._id &&
            e.splits.some((s) => s.userId === currentUser._id)
        );

        const personalExpenses = [...expensesYouPaid, ...expenseNotPaidByYou];
   
        const contactIds = new Set();
        personalExpenses.forEach((exp) => {
            if (exp.paidByUserId !== currentUser._id)
                contactIds.add(exp.paidByUserId);
        
            exp.splits.forEach((s) => {
                if (s.userId !== currentUser._id) contactIds.add(s.userId);
            });
        });

        const contactUsers = await Promise.all(
            [...contactIds].map(async (id) => {
                const u = await ctx.db.get(id);
                return u ? {
                    id: u._id,
                    name: u.name,
                    email: u.email,
                    imageUrl: u.imageUrl,
                    type: "user",
                } : null;
            })
        );

        const userGroups = (await ctx.db.query("groups").collect())
            .filter((g) => g.members.some((m) => m.userId === currentUser._id))
            .map((g) => ({
                id: g._id,
                name: g.name,
                description: g.description,
                memberCount: g.members.length,
                type: "group",
            }));

        return { 
            users: contactUsers.filter(Boolean).sort((a, b) => a?.name.localeCompare(b?.name)),
            groups: userGroups.sort((a, b) => a.name.localeCompare(b.name))
        };
    },
});

export const createGroup = mutation({   
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        members: v.array(v.id("users")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const currentUser = await ctx.runQuery(internal.users.getCurrentUser);
        if (!currentUser) throw new Error("User not found");
    
        if (!args.name.trim()) throw new Error("Group name cannot be empty");

        const uniqueMembers = new Set(args.members);
        uniqueMembers.add(currentUser._id);

        for (const id of uniqueMembers) {
            if (!(await ctx.db.get(id)))
                throw new Error(`User with ID ${id} not found`);
        }

        return await ctx.db.insert("groups", {
            name: args.name.trim(),
            description: args.description?.trim() ?? "",
            createdBy: currentUser._id,
            members: [...uniqueMembers].map((id) => ({
                userId: id,
                role: id === currentUser._id ? "admin" : "member",
                joinedAt: Date.now(),
            })),
        });
    },
});