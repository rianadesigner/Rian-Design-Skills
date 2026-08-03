"use client";

import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";

const P13 = "/images/page13";

const carouselImages = [
  `${P13}/panel-1.jpg`,
  `${P13}/panel-2.jpg`,
  `${P13}/panel-3.jpg`,
  `${P13}/panel-4.webp`,
  `${P13}/panel-5.webp`,
  `${P13}/panel-6.jpg`,
  `${P13}/panel-7.webp`,
];

const qaCards = [
  { q: "不会写代码?没关系!", a: `“自助搭建”多应用` },
  { q: "想用最新最热的应用?", a: `“快速接入”多API` },
  { q: "想要批量生产提效?", a: `“批量”全链路支持` },
  { q: "怎么结合自己的业务?", a: `“输出API”接入业务` },
  { q: "星链服务放心么?", a: `“安全透明”是核心` },
];

export default function SlidePage13() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* ── 深色底 + 红光晕 ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: 0, left: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        <div className="absolute" style={{ top: 0, right: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
      </div>

      {/* ── Main Title (centered, single line) ───────────────────── */}
      <div
        className="absolute z-10 flex items-center justify-center"
        style={{
          left: "50%",
          top: "12.87%",
          transform: "translateX(-50%)",
          width: "max-content",
          maxWidth: "92%",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          gap: "calc(0.83 * var(--u))",
        }}
      >
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #2A8BF9 0%, #D64FBB 35%, #FD3F46 58%, #FF8E0E 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(28px, calc(3.33 * var(--u)), 48px)",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            lineHeight: 1.46,
            letterSpacing: "2.88px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          万相星链
        </span>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(28px, calc(3.33 * var(--u)), 48px)",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            lineHeight: 1.46,
            letterSpacing: "2.88px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          让您的业务构想快速成真
        </span>
      </div>

      {/* ── Description ──────────────────────────────────────────── */}
      <p
        className="absolute z-10"
        style={{
          left: "28.47%",
          top: "21.57%",
          color: "rgba(255,255,255,0.38)",
          fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)",
          fontFamily: "'PingFang SC', sans-serif",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        星链支持搭建工作流智能体、接入海量AI节点、批量数据运行、API接入业务，
        <br />
        作为开源开发平台提供稳定服务助力业务发展。
      </p>

      {/* ── Circular Gallery Carousel ────────────────────────────── */}
      <div
        className="absolute z-10"
        style={{ left: 0, top: "29%", width: "100%", bottom: "23%" }}
      >
        <PerspectiveCarousel images={carouselImages} interval={3000} />
      </div>

      {/* ── Bottom headline ──────────────────────────────────────── */}
      <div
        className="absolute z-10 flex flex-col items-center gap-[0.74vh]"
        style={{ left: "36.63%", top: "76.85%", width: "26.74%" }}
      >
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(16px, calc(1.94 * var(--u)), 28px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, textAlign: "center", lineHeight: 1.4, margin: 0 }}>
          用Quick重定义技术创新的边界
        </p>
        <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, textAlign: "center", lineHeight: 1.7, letterSpacing: "0.28px", margin: 0 }}>
          一个平台，五大能力，无限可能
        </p>
      </div>

      {/* ── Bottom Q&A cards ──────────────────────────────────────── */}
      <div
        className="absolute z-10 flex items-start"
        style={{
          left: "8.47%",
          top: "86.67%",
          width: "83.06%",
          gap: "clamp(10px, calc(1.25 * var(--u)), 18px)",
        }}
      >
        {qaCards.map((card, i) => (
          <div
            key={i}
            className="flex items-center gap-[calc(0.83 * var(--u))]"
            style={{
              flex: "1 1 0",
              minWidth: 0,
              padding: "clamp(10px, calc(1.11 * var(--u)), 16px) clamp(14px, calc(1.67 * var(--u)), 24px)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              boxShadow: "0px 0px 6px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex flex-col gap-[calc(0.83 * var(--u))]">
              <div className="flex items-center gap-[4px]">
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.25, margin: 0, whiteSpace: "nowrap" }}>
                  Q:
                </p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.25, margin: 0, whiteSpace: "nowrap" }}>
                  {card.q}
                </p>
              </div>
              <div className="flex items-center gap-[4px]">
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.25, margin: 0, whiteSpace: "nowrap" }}>
                  A:
                </p>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.25, margin: 0, whiteSpace: "nowrap" }}>
                  {card.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
