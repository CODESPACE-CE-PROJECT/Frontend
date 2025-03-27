/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Forwarded-Host", value: "ce67-07.cloud.ce.kmitl.ac.th" },
          { key: "X-Forwarded-Proto", value: "https" },
        ],
      },
    ];
  },
  output: "standalone",
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
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};
module.exports = nextConfig;
