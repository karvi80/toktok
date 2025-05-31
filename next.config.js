/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
      ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
  images: {
    domains: ["thumbs.dreamstime.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
