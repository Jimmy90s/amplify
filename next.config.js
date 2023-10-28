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
        hostname:
          "amplify2b54308390584a728baec5453777d48f31349-staging.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname:
          "amplify2b54308390584a728baec5453777d48f31349-staging.s3.us-east-1.amazonaws.com",
      },

      {
        protocol: "https",
        hostname: "fullstackdotso.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
};
