import { query } from "./_generated/server";

export const getExample = query({
  handler: async () => {
    return "Hello from Convex!";
  }
});