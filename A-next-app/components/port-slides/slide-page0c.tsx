"use client";

// ── Step data ──────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "海量原始资料",
    desc: "汇聚公开论文、自有知识库与团队沉淀的多源资料，作为整条链路的起点。",
  },
  {
    num: "02",
    title: "多格式入库",
    desc: "统一接入文档、图片、视频、表格与代码仓库，解析、清洗并切分为语义片段。",
  },
  {
    num: "03",
    title: "Wiki 图谱编译",
    desc: "基于 LLM 抽取实体与关系，归并去重，沉淀为可互链、可溯源的 Wiki 节点。",
  },
  {
    num: "04",
    title: "智能体/编辑器交互",
    desc: "支持用户自由选择界面进行图谱提问及二次生产加工。",
  },
  {
    num: "05",
    title: "多模态输出",
    desc: "从 Wiki节点出发，按需再生成报告/视频/图像/音频/脑图等。",
  },
];

export default function SlidePage0c() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#070707",
        overflow: "hidden",
        fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      {/* ── Left red glow ── */}
      <div aria-hidden style={{
        position: "absolute", inset: "0 83.33% 0 0",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -111.8 -26.833 0 0 500)'><stop stop-color='rgba(200,8,8,0.26)' offset='0'/><stop stop-color='rgba(180,0,0,0.1)' offset='0.45'/><stop stop-color='rgba(0,0,0,0)' offset='0.75'/></radialGradient></defs></svg>\")",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* ── Right red glow ── */}
      <div aria-hidden style={{
        position: "absolute", inset: "0 0 0 83.33%",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -111.8 -26.833 0 240 500)'><stop stop-color='rgba(200,8,8,0.26)' offset='0'/><stop stop-color='rgba(180,0,0,0.1)' offset='0.45'/><stop stop-color='rgba(0,0,0,0)' offset='0.75'/></radialGradient></defs></svg>\")",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* ── Film grain ── */}
      <svg aria-hidden style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.12, mixBlendMode: "overlay" as const, zIndex: 1,
      }}>
        <filter id="pg0c-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pg0c-grain)" />
      </svg>

      {/* ── Four corner marks ── */}
      <div aria-hidden style={{ position: "absolute", left: 24, top: 24, width: 38, height: 38, borderTop: "0.951px solid rgba(255,255,255,0.22)", borderLeft: "0.951px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", right: 24, top: 24, width: 38, height: 38, borderTop: "0.951px solid rgba(255,255,255,0.22)", borderRight: "0.951px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", left: 24, bottom: 24, width: 38, height: 38, borderBottom: "0.951px solid rgba(255,255,255,0.22)", borderLeft: "0.951px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", right: 24, bottom: 24, width: 38, height: 38, borderBottom: "0.951px solid rgba(255,255,255,0.22)", borderRight: "0.951px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />

      {/* ══════════════════════════════════════════
          HEADER  (centered, top: 204px)
      ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: 204,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        whiteSpace: "nowrap",
        zIndex: 10,
      }}>
        {/* Eyebrow: 03 — LLM WIKI 核心操作动线 */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontFamily: "Impact, 'Arial Black', sans-serif",
            fontSize: 13, lineHeight: "13px",
            color: "rgba(200,8,8,0.85)",
            letterSpacing: "2px",
          }}>03</span>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
          <span style={{
            fontFamily: "'PingFang SC', sans-serif", fontWeight: 400,
            fontSize: 11, lineHeight: "16.5px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "3px",
          }}>LLM WIKI 核心操作动线</span>
        </div>

        {/* Main title */}
        <p style={{
          margin: 0,
          fontFamily: "'PingFang SC', sans-serif", fontWeight: 600,
          fontSize: 44, lineHeight: "47.251px",
          color: "#fff",
          letterSpacing: "1px",
        }}>LLM WIKI 关键产品链路</p>

        {/* Subtitle */}
        <p style={{
          margin: 0,
          fontFamily: "'PingFang SC', sans-serif", fontWeight: 400,
          fontSize: 14, lineHeight: "25.2px",
          color: "rgba(255,255,255,0.5)",
        }}>资料不止于「存下来」，而是被逐级加工，最终成为结构化、可溯源的知识节点。</p>
      </div>

      {/* ══════════════════════════════════════════
          STEP CARDS  (top: 420px, left: 48px)
          5 × 268px cards + 1px gap dividers
      ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        left: 48,
        top: 420,
        display: "flex",
        flexDirection: "row",
        gap: 1,
        background: "rgba(255,255,255,0.1)",
        zIndex: 10,
      }}>
        {STEPS.map((step) => (
          <div key={step.num} style={{
            background: "#070707",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 28,
            width: 268,
            height: 218.781,
            flexShrink: 0,
            boxSizing: "border-box",
          }}>
            {/* Step number */}
            <div style={{ height: 45, width: "100%", flexShrink: 0, position: "relative" }}>
              <p style={{
                position: "absolute",
                left: 0, top: 3,
                margin: 0,
                fontFamily: "Impact, 'Arial Black', sans-serif",
                fontSize: 30, lineHeight: "45px",
                color: "rgba(200,8,8,0.85)",
                letterSpacing: "2px",
                whiteSpace: "nowrap",
              }}>{step.num}</p>
            </div>

            {/* Title */}
            <div style={{ height: 42, width: 212, flexShrink: 0, display: "flex", flexDirection: "column", paddingTop: 16 }}>
              <p style={{
                margin: 0,
                fontFamily: "'PingFang SC', sans-serif", fontWeight: 600,
                fontSize: 17, lineHeight: "25.5px",
                color: "#fff", whiteSpace: "nowrap",
              }}>{step.title}</p>
            </div>

            {/* Description */}
            <div style={{ paddingTop: 10, flexShrink: 0 }}>
              <p style={{
                margin: 0,
                fontFamily: "'PingFang SC', sans-serif", fontWeight: 400,
                fontSize: 13, lineHeight: "22.1px",
                color: "rgba(255,255,255,0.5)",
                width: 212,
              }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
