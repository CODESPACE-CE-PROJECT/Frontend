/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.minio.srv-demo-2.home.unixvextor.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  experimental: {
    serverActions: true,
    serverActions: {
      bodySizeLimit: '50mb',
    }
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Forwarded-Host", value: "ce67-07.cloud.ce.kmitl.ac.th" },
      ],
    },
  ],
};
module.exports = nextConfig;
