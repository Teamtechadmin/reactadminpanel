/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["bucketkeracars.s3.ap-south-1.amazonaws.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.filename = "static/chunks/[name].js";
      config.output.chunkFilename = "static/chunks/[name].js";
    }
    return config;
  },
};

export default nextConfig;
