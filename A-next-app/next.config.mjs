import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 仓库外若另有 package-lock.json，须锁定 Turbopack 根目录，否则 dev 路由可能异常
  turbopack: {
    root: __dirname,
  },
  // 阿里云 OSS 静态网站托管仅支持纯静态文件，需导出为 `out/`
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 优化重型依赖库的 barrel import，减少 bundle 冗余
  experimental: {
    optimizePackageImports: ["motion", "lucide-react", "@hugeicons/react"],
  },
};

export default nextConfig;
