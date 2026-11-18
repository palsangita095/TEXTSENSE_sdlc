import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },

  /* config options here */

  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${baseUrl}/api/:path*/`,
      },
      {
        // Django TEXTSENSE API, e.g. /textsense/login -> http://127.0.0.1:8000/textsense/login/
        source: "/textsense/:path*",
        destination: `${baseUrl}/textsense/:path*/`,
      },
    ];
  },
};

export default nextConfig;
