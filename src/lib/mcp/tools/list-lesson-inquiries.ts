import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_lesson_inquiries",
  title: "List private lesson inquiries",
  description:
    "List private lesson inquiries submitted through the site. Requires an admin account; other users get no rows.",
  inputSchema: {
    status: z.string().trim().min(1).optional().describe("Filter by status, e.g. 'new'."),
    limit: z.number().int().min(1).max(200).optional().describe("Max rows to return (default 25)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit = 25 }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("lesson_inquiries")
      .select("id,name,email,phone,lesson_type,lesson_duration,message,status,created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { inquiries: data ?? [] },
    };
  },
});
