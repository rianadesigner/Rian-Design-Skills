"use client"

import Script from "next/script"
import { XinliuInputSheet } from "@/components/port-slides/xinliu-input-sheet"

export default function FigmaInputExport() {
  return <>
    <div id="figma-overlay-source" style={{ position: "relative", width: 750, height: 1613, containerType: "inline-size", overflow: "hidden", background: "#b3c7df" }}>
      <XinliuInputSheet reduceMotion onClose={() => {}} />
    </div>
    <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />
  </>
}
