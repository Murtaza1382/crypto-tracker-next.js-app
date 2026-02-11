/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add all external image domains you plan to use
    domains: ["coin-images.coingecko.com"],
  },
};

module.exports = nextConfig;
