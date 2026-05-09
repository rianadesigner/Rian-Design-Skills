/** @type {import('next').NextConfig} */
const nextConfig = {
  // 阿里云 OSS 静态网站托管仅支持纯静态文件，需导出为 `out/`
  output: "export",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
