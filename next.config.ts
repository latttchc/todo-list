import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  base: process.env.GITHUB_PAGES ? "https://github.com/latttchc/todo-list" : "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
};

export default nextConfig;
