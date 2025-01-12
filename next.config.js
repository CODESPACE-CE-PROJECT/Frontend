/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [{
        protocol: 'https',
        hostname: 's3.minio.srv-demo-2.home.unixvextor.com'
      }],
    },   
}
module.exports = nextConfig
