import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_classes",
  title: "List classes",
  description:
    "List Malinky Music classes with schedule, price, age group and location details.",
  inputSchema: {
    activeOnly: z.boolean().optional().describe("Only return active classes. Defaults to true."),
    limit: z.number().int().min(1).max(200).optional().describe("Max rows to return (default 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ activeOnly = true, limit = 50 }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("classes")
      .select(
        "id,title,description,age_group,day_of_week,schedule,start_time,end_time,price,capacity,is_active,is_featured,registration_url,locations(name,address)",
      )
      .order("is_featured", { ascending: false })
      .order("title")
      .limit(limit);
    if (activeOnly) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { classes: data ?? [] },
    };
  },
});
