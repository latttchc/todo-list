import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  basePath: process.env.GITHUB_PAGES ? "/todo-list" : "",

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./app"),
    };
    return config;
  },
};

export default nextConfig;
