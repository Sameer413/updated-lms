/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.becodemy.com",
      },
      {
        hostname: "nzblsjrpwntfpaqvsgfh.supabase.co",
      },
    ],
  },
};

export default nextConfig;
