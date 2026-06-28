"use client";

import { useEffect } from "react";
import SlidePage0a from "@/components/port-slides/slide-page0a";
import { SlideFitShell } from "@/components/port-slides/slide-fit-shell";

export default function Preview0a() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("figmacapture")) {
      const existing = document.querySelector('script[data-figma-capture="1"]');
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://mcp.figma.com/mcp/html-to-design/capture.js";
        script.async = true;
        script.dataset.figmaCapture = "1";
        document.head.appendChild(script);
      }
    }
  }, []);

  return (
    <SlideFitShell captureRoot stageClassName="slide-fit-stage h-full w-full">
      <SlidePage0a />
    </SlideFitShell>
  );
}
