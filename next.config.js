/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fullstackdotso.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
};
