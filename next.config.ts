import type { NextConfig } from "next";

// Photos are served from the Supabase "media" storage bucket.
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL) : null;
const local = supabase && ["localhost", "127.0.0.1"].includes(supabase.hostname);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: supabase
      ? [
          {
            protocol: supabase.protocol.replace(":", "") as "http" | "https",
            hostname: supabase.hostname,
            port: supabase.port,
            pathname: "/storage/v1/object/public/media/**",
          },
        ]
      : [],
    // Only for a local Supabase during development.
    dangerouslyAllowLocalIP: Boolean(local),
  },
  // Pages from the original template, now replaced.
  async redirects() {
    return [
      { source: "/spaces", destination: "/services/interior", permanent: true },
      { source: "/objects", destination: "/projects", permanent: true },
      { source: "/studio", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
