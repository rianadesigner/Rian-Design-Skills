import type { Metadata, Viewport } from "next"; // 1. 引入 Metadata 类型
import { Geist, Geist_Mono, Inter, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

// 2. 添加 metadata 配置对象
export const metadata: Metadata = {
  title: "Rian Design", // 👈 这里修改为您想要的网站标题
  description: "Personal portfolio and design skills showcase", // 👈 这里是网站描述（可选）
};

// 幻灯片为固定 1440×900 画布自适应缩放，禁用移动端手势缩放，
// 避免 iPad 双击/捏合缩放导致画面平移错位。
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable, inter.variable, syne.variable)}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/AlimamaShuZhiTiVF-Thin.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/LogoSCUnboundedSans-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
