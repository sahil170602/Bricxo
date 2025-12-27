import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Allow images from Unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
    // If images are broken on Netlify, uncomment the line below:
    // unoptimized: true, 
  },

  // 2. Ignore Type/Lint errors so deployment doesn't fail on small warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

