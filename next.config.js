/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ["s3.minio.srv-demo-2.home.unixvextor.com"],
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
};
module.exports = nextConfig;
