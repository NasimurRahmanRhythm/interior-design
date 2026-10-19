import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

// One client per request. connection() makes every page that reads data render
// on each request (plain SSR, no caching or revalidation).
export const db = cache(async () => {
  await connection();
  return createPublicClient();
});
