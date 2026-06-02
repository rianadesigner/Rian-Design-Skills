import type { Metadata } from "next";
import SlideContainer from "@/components/port-slides/slide-container";

export const metadata: Metadata = {
  title: "作品集 | Rian Design",
  description: "设计作品集 - 左右滑动浏览",
};

export default function PortPage() {
  return <SlideContainer />;
}
