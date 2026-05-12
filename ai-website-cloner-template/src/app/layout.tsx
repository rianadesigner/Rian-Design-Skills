import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NeuroSync | Master Your Mind",
  description:
    "NeuroSync monitors your cognitive state in real-time — clone built from Neuform NeuroSync template reference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full`}>
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>{children}</body>
    </html>
  );
}
