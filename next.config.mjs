/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["images.unsplash.com", "localhost", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.dev.to",
        port: "",
      },
    ],
  },
};

export default nextConfig;
