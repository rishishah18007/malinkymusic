import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listClassesTool from "./tools/list-classes";
import listLocationsTool from "./tools/list-locations";
import listLessonInquiriesTool from "./tools/list-lesson-inquiries";
import listBookingsTool from "./tools/list-bookings";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "malinky-harmony-hub",
  title: "Malinky Harmony Hub",
  version: "0.1.0",
  instructions:
    "Tools for Malinky Music (children's music classes in San Francisco). Use `list_classes` and `list_locations` for the class catalog and venues, `list_bookings` for bookings visible to the signed-in account, and `list_lesson_inquiries` for private lesson inquiries (admins only).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listClassesTool, listLocationsTool, listBookingsTool, listLessonInquiriesTool],
});
