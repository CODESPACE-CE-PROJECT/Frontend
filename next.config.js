/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["drive.google.com"],
    },
    output: "standalone",
}
module.exports = nextConfig
