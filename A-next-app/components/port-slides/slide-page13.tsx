"use client";

import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";

const P13 = "/images/page13";

const carouselImages = [
  `${P13}/panel-1.png`,
  `${P13}/panel-2.png`,
  `${P13}/panel-3.png`,
  `${P13}/panel-4.png`,
  `${P13}/panel-5.png`,
  `${P13}/panel-6.png`,
  `${P13}/panel-7.png`,
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
        {/* 网格线装饰 */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="absolute inset-0 h-full w-full" viewBox="0 0 1443 1081.5" preserveAspectRatio="none">
          <path d="M62,1081.5L61,1081.5L61,61.5L62,61.5L62,1081.5ZM461,61.5L462,61.5L462,1081.5L461,1081.5L461,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
          <path d="M522,1081.5L521,1081.5L521,61.5L522,61.5L522,1081.5ZM921,61.5L922,61.5L922,1081.5L921,1081.5L921,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
          <path d="M982,1081.5L981,1081.5L981,61.5L982,61.5L982,1081.5ZM1381,61.5L1382,61.5L1382,1081.5L1381,1081.5L1381,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
          <rect x="0.75" y="0.75" width="1441.5" height="61.5" rx="0" fillOpacity="0" strokeOpacity="0.08" stroke="#FFFFFF" fill="none" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img loading="lazy" decoding="async" src={`${P13}/title.svg`} alt="万相星链" className="absolute left-0 top-0 h-full object-contain" />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7 * var(--u))]">
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(12px, calc(1.67 * var(--u)), 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            星链-AI应用开发平台 / 13
          </p>
        </div>
        <div className="absolute" style={{ left: "9.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid rgba(255,255,255,0.22)", padding: "calc(0.3 * var(--u)) calc(0.8 * var(--u))", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, calc(1.1 * var(--u)), 16px)", lineHeight: 1.4, margin: 0, color: "rgba(255,255,255,0.55)" }}>
              2022 / 2024
            </p>
          </div>
        </div>
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
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: 1.46,
            letterSpacing: "2.88px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          AI赋能
        </span>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(28px, calc(3.33 * var(--u)), 48px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
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
        className="absolute z-10 flex items-start gap-[calc(1.67 * var(--u))]"
        style={{ left: "8.47%", top: "86.67%", width: "83.06%" }}
      >
        {qaCards.map((card, i) => (
          <div
            key={i}
            className="flex items-center gap-[calc(0.83 * var(--u))]"
            style={{
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
