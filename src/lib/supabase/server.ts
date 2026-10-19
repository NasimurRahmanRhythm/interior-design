import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

// Client for server components, server actions and route handlers. It reads the
// signed-in user's session from cookies, so use it where the user matters (admin).
export async function createClient() {
  const { url, key } = supabaseEnv();
  const store = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Server components cannot set cookies; the session is refreshed elsewhere.
        }
      },
    },
  });
}
