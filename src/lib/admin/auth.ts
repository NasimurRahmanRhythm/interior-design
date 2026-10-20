import "server-only";
import { connection } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// The admin panel has no sign-in for now: /admin is open, and its pages and
// actions write with the secret key. Add a login check here to lock it again.
// connection() keeps every admin page rendering per request.
export async function requireAdmin() {
  await connection();
  return { supabase: createAdminClient() };
}
