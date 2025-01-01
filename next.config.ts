import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary's hostname here
  }
};

export default nextConfig;
