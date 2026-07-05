import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "作品集 | Rian Design",
  description: "设计作品集 - 左右滑动浏览",
};

export default function PortPage() {
  redirect("/01");
}
