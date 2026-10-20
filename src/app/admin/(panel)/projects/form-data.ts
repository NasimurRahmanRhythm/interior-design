import "server-only";
import type { requireAdmin } from "@/lib/admin/auth";

type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];

// Choices for the project form.
export async function projectOptions(supabase: Supabase) {
  const [divisions, clients, categories] = await Promise.all([
    supabase.from("divisions").select("id, name").order("sort_order"),
    supabase.from("clients").select("id, name").order("name"),
    supabase.from("projects").select("category"),
  ]);
  return {
    divisions: divisions.data ?? [],
    clients: clients.data ?? [],
    categories: [...new Set((categories.data ?? []).map((c) => c.category as string))].sort(),
  };
}
