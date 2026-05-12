import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "作品集 PDF 预览",
  description: "将 PDF 置于 public/documents/ 下即可在浏览器内预览",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
