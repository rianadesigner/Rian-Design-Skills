import type { Metadata } from "next"
import RiffConceptPreview from "@/components/port-slides/riff-concept-preview"

export const metadata: Metadata = {
  title: "Riff · AI 视频编辑首页方向",
  description: "四个可切换、可交互的 Riff AI 视频编辑首页方案。",
}

export default function RiffPrototypePage() {
  return <RiffConceptPreview />
}
