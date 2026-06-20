import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/listings",
        destination: "/catalog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
