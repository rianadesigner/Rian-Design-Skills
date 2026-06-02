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
      style={{ background: "#FFFFFF" }}
    >
      {/* ── 白色底层 + 装饰背景 ─────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute" style={{ left: "-1%", top: "3.4%" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-[116vh] w-[calc(112 * var(--u))] opacity-50" viewBox="0 0 1620 1259">
              <rect x="0" y="0" width="1620" height="1259" fill="#DEE1E6" />
              <ellipse cx="816" cy="857.5" rx="1020.5" ry="1020.5" fill="#2A5BFE" />
              <ellipse cx="816" cy="-769.5" rx="2085.5" ry="2085.5" fill="#F600A7" filter="blur(300px)" />
              <ellipse cx="816" cy="-973.5" rx="2085.5" ry="2085.5" fill="#EF5D43" filter="blur(160px)" />
              <ellipse cx="816" cy="-973.5" rx="2085.5" ry="2085.5" fill="#FFB624" filter="blur(160px)" />
              <ellipse cx="803.5" cy="-1243.5" rx="2085.5" ry="2085.5" fill="#FEFB86" filter="blur(160px)" />
              <ellipse cx="803.5" cy="-1243.5" rx="2085.5" ry="2085.5" fill="#FFFFFF" filter="blur(160px)" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-full w-full" viewBox="0 0 1443 1081.5" preserveAspectRatio="none">
            <path d="M62,1081.5L61,1081.5L61,61.5L62,61.5L62,1081.5ZM461,61.5L462,61.5L462,1081.5L461,1081.5L461,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <path d="M522,1081.5L521,1081.5L521,61.5L522,61.5L522,1081.5ZM921,61.5L922,61.5L922,1081.5L921,1081.5L921,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <path d="M982,1081.5L981,1081.5L981,61.5L982,61.5L982,1081.5ZM1381,61.5L1382,61.5L1382,1081.5L1381,1081.5L1381,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <rect x="0.75" y="0.75" width="1441.5" height="61.5" rx="0" fillOpacity="0" strokeOpacity="0.5" stroke="#FFFFFF" fill="none" strokeWidth="1.5" />
          </svg>
        </div>
        <img src={`${P13}/bg-outer.png`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img src={`${P13}/title.svg`} alt="万相星链" className="absolute left-0 top-0 h-full object-contain" />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7 * var(--u))]">
          <img src={`${P13}/avatar.png`} alt="" className="h-full aspect-square object-cover" />
          <p style={{ color: "#8C8C8C", fontSize: "clamp(12px, calc(1.67 * var(--u)), 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            星链-AI应用开发平台 / 13
          </p>
        </div>
        <div className="absolute" style={{ left: "9.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid #8C8C8C", padding: "calc(0.3 * var(--u)) calc(0.8 * var(--u))", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, calc(1.1 * var(--u)), 16px)", lineHeight: 1.4, margin: 0 }}>
              2022 / 2024
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Title (centered) ────────────────────────────────── */}
      <div
        className="absolute z-10 flex items-center justify-center gap-[calc(0.83 * var(--u))]"
        style={{ left: "25.14%", top: "12.87%", width: "49.79%", height: "6.48%" }}
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
          }}
        >
          AI赋能
        </span>
        <span
          style={{
            color: "#1F1F1F",
            fontSize: "clamp(28px, calc(3.33 * var(--u)), 48px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: 1.46,
            letterSpacing: "2.88px",
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
          color: "#A0A0A0",
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
        <p style={{ color: "#434343", fontSize: "clamp(16px, calc(1.94 * var(--u)), 28px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, textAlign: "center", lineHeight: 1.4, margin: 0 }}>
          用Quick重定义技术创新的边界
        </p>
        <p style={{ color: "#8C8C8C", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, textAlign: "center", lineHeight: 1.7, letterSpacing: "0.28px", margin: 0 }}>
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
              background: "rgba(255,255,255,0.2)",
              border: "1px solid #FFFFFF",
              borderRadius: "12px",
              boxShadow: "0px 0px 6px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex flex-col gap-[calc(0.83 * var(--u))]">
              <div className="flex items-center gap-[4px]">
                <p style={{ color: "#1F1F1F", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.25, opacity: 0.5, margin: 0, whiteSpace: "nowrap" }}>
                  Q:
                </p>
                <p style={{ color: "#1F1F1F", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.25, opacity: 0.5, margin: 0, whiteSpace: "nowrap" }}>
                  {card.q}
                </p>
              </div>
              <div className="flex items-center gap-[4px]">
                <p style={{ color: "#1F1F1F", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.25, margin: 0, whiteSpace: "nowrap" }}>
                  A:
                </p>
                <p style={{ color: "#1F1F1F", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.25, margin: 0, whiteSpace: "nowrap" }}>
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
