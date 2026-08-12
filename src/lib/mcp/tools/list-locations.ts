import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_locations",
  title: "List locations",
  description: "List Malinky Music class locations with address, neighborhoods and hours.",
  inputSchema: {
    activeOnly: z.boolean().optional().describe("Only return active locations. Defaults to true."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ activeOnly = true }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("locations")
      .select("id,name,address,neighborhoods,hours,phone,description,is_active")
      .order("name");
    if (activeOnly) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { locations: data ?? [] },
    };
  },
});
