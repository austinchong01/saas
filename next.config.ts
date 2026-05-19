import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.tiktokcdn-us.com",
      },
    ],
  },
};

export default nextConfig;