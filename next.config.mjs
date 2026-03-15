/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable turbopack persistent cache to fix stale module errors
  experimental: {
    turbo: {
      unstable_persistentCaching: false,
    },
  },
};

export default nextConfig;
