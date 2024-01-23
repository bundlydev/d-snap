/** @type {import('next').NextConfig} */
import { bootstrap } from "./dfx.webpack.config.js";

bootstrap("../../..");

const nextConfig = {
  // output: "export",
  distDir: "build",
};

export default nextConfig;
