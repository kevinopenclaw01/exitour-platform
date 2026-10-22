import type { NextConfig } from "next";
import { legacyCatalogRedirects } from "./lib/travel/legacyRoutes";

const nextConfig: NextConfig = {
  redirects: () => legacyCatalogRedirects,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
