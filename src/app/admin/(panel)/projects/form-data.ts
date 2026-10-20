import "server-only";
import type { requireAdmin } from "@/lib/admin/auth";

type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];

// The services to choose from and how many landing page places are taken.
export async function projectOptions(supabase: Supabase) {
  const [divisions, landing] = await Promise.all([
    supabase.from("divisions").select("id, name").order("sort_order"),
    supabase.from("projects").select("id", { count: "exact", head: true }).not("featured_order", "is", null),
  ]);
  return { divisions: divisions.data ?? [], landingCount: landing.count ?? 0 };
}
