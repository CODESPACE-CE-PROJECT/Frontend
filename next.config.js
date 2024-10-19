/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["drive.google.com", "s3.minio.srv-demo-2.home.unixvextor.com"],
    },
    // output: "standalone",
    // experimental: {
    //   appDir: true,  
    // },
}
module.exports = nextConfig
