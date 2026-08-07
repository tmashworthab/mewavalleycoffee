import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Nepali pages moved from /ne to /np. Anything already linking to the
  // old path keeps working.
  async redirects() {
    return [
      { source: "/ne", destination: "/np", permanent: true },
      { source: "/ne/:path*", destination: "/np/:path*", permanent: true },
    ];
  },
  images: {
    // Next 16 defaults this to [75] and coerces anything else, so the two
    // qualities we actually use have to be declared explicitly.
    // 85 is reserved for the hero; everything else ships at 75.
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
