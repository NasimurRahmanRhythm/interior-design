import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
