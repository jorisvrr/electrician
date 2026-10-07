import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // Geen automatisch gegenereerde AGENTS.md/CLAUDE.md in deze demo-repo
  agentRules: false,
};

export default nextConfig;
