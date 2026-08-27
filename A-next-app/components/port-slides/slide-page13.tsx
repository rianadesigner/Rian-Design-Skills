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

      {/* ── Project header ────────────────────────────────────────── */}
      <header
        className="absolute z-20 flex items-end justify-between"
        style={{ left: "4.17%", right: "4.17%", top: "6.7%" }}
      >
        <div style={{ maxWidth: "58%" }}>
          <div className="mb-[12px] flex items-center" style={{ gap: "10px" }}>
            <span
              aria-hidden="true"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#ef3b46",
                boxShadow: "0 0 14px rgba(239,59,70,0.72)",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.52)",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              WANXIANG XINGLIAN · 01 / PLATFORM OVERVIEW
            </span>
          </div>
          <h1
            className="if-studio-project-title"
            style={{ margin: 0, color: "#fff", whiteSpace: "nowrap" }}
          >
            <span
              style={{
                color: "#ef3b46",
              }}
            >
              万相星链
            </span>
            <span style={{ marginLeft: "14px", color: "#fff" }}>
              让您的业务构想快速成真
            </span>
          </h1>
        </div>

        <p
          style={{
            width: "38%",
            margin: "0 0 2px",
            color: "rgba(255,255,255,0.64)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: 1.72,
            textAlign: "right",
          }}
        >
          星链支持搭建工作流智能体、接入海量 AI 节点、批量数据运行、API 接入业务，
          <br />
          作为开源开发平台提供稳定服务，助力业务发展。
        </p>
      </header>

      {/* ── Circular Gallery Carousel ────────────────────────────── */}
      <div
        className="absolute z-10"
        style={{ left: 0, top: "20.8%", width: "100%", bottom: "23%" }}
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
