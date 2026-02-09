/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  devServer: {
    port: 3002,
  },
};

module.exports = nextConfig;
