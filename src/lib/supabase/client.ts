"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

// Client for code that runs in the browser (forms, admin uploads).
export function createClient() {
  const { url, key } = supabaseEnv();
  return createBrowserClient(url, key);
}
