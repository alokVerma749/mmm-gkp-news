const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config:any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      config.externals = [...config.externals, "@langchain/google-genai", "@langchain/community/vectorstores/chroma"];
    }
    return config;
  },
};

export default nextConfig;
