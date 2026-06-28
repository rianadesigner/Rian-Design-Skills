"use client";

import { useRef, useState } from "react";

const SLIDES = Array.from({ length: 12 }, (_, i) =>
  `/images/page2/ppt/slide-${String(i + 1).padStart(2, "0")}.png`
);

export default function PPTViewer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToSlide = (idx: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLDivElement>(".ppt-slide-item");
    if (items[idx]) {
      items[idx].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    setActive(idx);
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", overflow: "hidden", background: "#0e0e0e" }}>
      {/* 左侧缩略图导航 */}
      <div
        style={{
          width: 72,
          flexShrink: 0,
          overflowY: "auto",
          overflowX: "hidden",
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: "8px 4px",
          scrollbarWidth: "none",
        }}
      >
        {SLIDES.map((src, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            style={{
              all: "unset",
              cursor: "pointer",
              borderRadius: 4,
              overflow: "hidden",
              border: active === idx
                ? "1.5px solid rgba(209,251,57,0.85)"
                : "1.5px solid transparent",
              boxShadow: active === idx ? "0 0 0 1px rgba(209,251,57,0.3)" : "none",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* 页码 */}
            <div
              style={{
                position: "absolute",
                bottom: 2,
                right: 3,
                fontSize: 9,
                color: "rgba(255,255,255,0.7)",
                background: "rgba(0,0,0,0.45)",
                borderRadius: 2,
                padding: "0 3px",
                lineHeight: "14px",
                pointerEvents: "none",
              }}
            >
              {idx + 1}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </button>
        ))}
      </div>

      {/* 右侧主滚动区 */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "12px 16px 24px",
          boxSizing: "border-box",
        }}
        onScroll={(e) => {
          const container = e.currentTarget;
          const items = container.querySelectorAll<HTMLDivElement>(".ppt-slide-item");
          let closest = 0;
          let minDist = Infinity;
          items.forEach((el, i) => {
            const dist = Math.abs(el.getBoundingClientRect().top - container.getBoundingClientRect().top);
            if (dist < minDist) { minDist = dist; closest = i; }
          });
          setActive(closest);
        }}
      >
        {SLIDES.map((src, idx) => (
          <div
            key={idx}
            className="ppt-slide-item"
            style={{
              width: "100%",
              borderRadius: 8,
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 2px 12px rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
