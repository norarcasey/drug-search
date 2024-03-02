/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/drug-search",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
  distDir: "build",
};

export default nextConfig;
