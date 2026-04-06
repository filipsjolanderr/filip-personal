import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["bsky-react-post"],
  serverExternalPackages: ["@napi-rs/canvas"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
