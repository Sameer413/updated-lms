/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.becodemy.com",
      },
    ],
  },
};

export default nextConfig;
