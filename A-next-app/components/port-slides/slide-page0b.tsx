"use client";

import SlidePage0 from "./slide-page0";
import { SLIDE_DESIGN_WIDTH } from "./slide-design";

// ── Outer slide assets ──────────────────────────────────────
const P = "/images/page0b";
const imgAi1 = `${P}/ai1-bg.png`;

// Design dimensions (from slide-design)
const DESIGN_W = SLIDE_DESIGN_WIDTH; // 1440
// SlidePage0's internal design: 1440 × 900
const INNER_W = 1440;
const INNER_H = 900;

// V2.0 panel frame inside the outer slide
const PANEL_L = 120;
const PANEL_T = 321.83;
const PANEL_W = 1200;
const PANEL_H = 833.33;

// Scale SlidePage0 (1440×900) → fit in panel (1200×PANEL_H)
const SCALE = PANEL_W / INNER_W; // 0.8333...

export default function SlidePage0b() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#070707",
        overflow: "hidden",
        fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
        ["--slide-w" as string]: `${DESIGN_W}px`,
        ["--slide-h" as string]: "900px",
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
        pointerEvents: "none", opacity: 0.12, mixBlendMode: "overlay", zIndex: 1,
      }}>
        <filter id="pg0b-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pg0b-grain)" />
      </svg>

      {/* ── Four corner marks ── */}
      <div aria-hidden style={{ position: "absolute", left: 24, top: 24, width: 38, height: 38, borderTop: "0.951px solid rgba(255,255,255,0.22)", borderLeft: "0.951px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", right: 24, top: 24, width: 38, height: 38, borderTop: "0.951px solid rgba(255,255,255,0.22)", borderRight: "0.951px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", left: 24, bottom: 24, width: 38, height: 38, borderBottom: "0.951px solid rgba(255,255,255,0.22)", borderLeft: "0.951px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", right: 24, bottom: 24, width: 38, height: 38, borderBottom: "0.951px solid rgba(255,255,255,0.22)", borderRight: "0.951px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />

      {/* ══════════════════════════════════════════
          TOP HEADER
      ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute", left: 35, right: 35, top: 84,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        padding: "0 76px", zIndex: 17,
      }}>
        {/* "02 — LLM WIKI 不得不做的理由" */}
        <div style={{ display: "flex", alignItems: "center", gap: 11.4 }}>
          <span style={{
            fontFamily: "Impact, 'Arial Black', sans-serif",
            fontSize: 10.46, lineHeight: "15.69px", color: "rgba(200,8,8,0.85)",
            letterSpacing: "1.88px",
          }}>02</span>
          <div style={{ width: 26.63, height: 0.95, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
          <span style={{
            fontFamily: "'PingFang SC', sans-serif", fontWeight: 400,
            fontSize: 9.99, lineHeight: "14.98px", color: "rgba(255,255,255,0.4)",
            letterSpacing: "2.60px", whiteSpace: "nowrap",
          }}>LLM WIKI 不得不做的理由</span>
        </div>

        {/* Main title */}
        <p style={{
          margin: 0,
          fontFamily: "'PingFang SC', sans-serif", fontWeight: 600,
          fontSize: 44, lineHeight: "47.25px", color: "#fff",
          letterSpacing: "1px", whiteSpace: "nowrap",
        }}>心流2.0升级：LLM Wiki</p>

        {/* Bullet points */}
        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontWeight: 400,
          fontSize: 12.36, color: "rgba(255,255,255,0.5)",
          textAlign: "center", lineHeight: "21.64px", width: 346,
        }}>
          <p style={{ margin: 0 }}>1. 用户需求升级：从"问答"变成"完成复杂任务"</p>
          <p style={{ margin: 0 }}>2. 产品定位升级：从"AI 搜索助手"变成"AI IDE / AI 工作台"</p>
          <p style={{ margin: 0 }}>3. 技术能力升级：从"全网搜索"到"Agent 原生创作平台"</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          V1.0 BACKGROUND SCREENSHOT
      ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        left: PANEL_L, top: 267,
        width: PANEL_W, height: 833,
        overflow: "hidden",
        zIndex: 3,
      }}>
        <img alt="" src={imgAi1} style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.5, pointerEvents: "none",
        }} />
      </div>

      {/* BEFORE label */}
      <div style={{
        position: "absolute", left: PANEL_L + 4, top: 276, zIndex: 10,
        background: "rgba(20,20,20,0.72)",
        borderRadius: 6, padding: "4px 12px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 4, padding: "2px 4px" }}>
          <span style={{ fontFamily: "Impact", fontSize: 8, color: "#fff", lineHeight: "10px", display: "block" }}>BEFORE</span>
        </div>
        <span style={{ fontFamily: "Impact", fontSize: 20, color: "rgba(255,255,255,0.35)" }}>V 1.0</span>
        <span style={{ fontFamily: "'PingFang SC'", fontWeight: 600, fontSize: 10, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
          旧版界面 · 心流 AI 搜索
        </span>
      </div>

      {/* ══════════════════════════════════════════
          V2.0 PANEL — SlidePage0 嵌入（带完整交互）
      ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        left: PANEL_L, top: PANEL_T,
        width: PANEL_W, height: PANEL_H,
        background: "#f8f8f8",
        boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
        overflow: "hidden",
        zIndex: 4,
        borderRadius: 2,
      }}>
        {/*
          SlidePage0 设计尺寸 1440×900，缩放至面板宽度 1200px。
          Scale = 1200/1440 = 0.8333
          缩放后高度 = 900×0.8333 = 750px，面板高 833px，底部剩余由 #f8f8f8 填充。
        */}
        <div style={{
          position: "absolute",
          left: 0, top: 0,
          width: INNER_W,
          height: INNER_H,
          transformOrigin: "top left",
          transform: `scale(${SCALE})`,
        }}>
          <SlidePage0 initialView="landing" />
        </div>
      </div>

      {/* ── V2.0 label (NEW V 2.0) ── */}
      <div style={{
        position: "absolute", left: PANEL_L + 4, top: PANEL_T + 12, zIndex: 10,
        backgroundImage: "linear-gradient(170.7deg, rgb(37,99,235) 0%, rgb(124,58,237) 100%)",
        borderRadius: 6, padding: "4px 12px",
        display: "flex", alignItems: "center", gap: 7.17,
        filter: "drop-shadow(0 0 6px rgba(124,58,237,0.55))",
      }}>
        <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 4, padding: "2px 4px", flexShrink: 0 }}>
          <span style={{ fontFamily: "Impact", fontSize: 8, color: "#fff", lineHeight: "10px", display: "block" }}>NEW</span>
        </div>
        <span style={{
          fontFamily: "Impact", fontSize: 20,
          backgroundImage: "linear-gradient(148.39deg, rgb(224,231,255) 0%, rgb(196,181,253) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>V 2.0</span>
        <span style={{ fontFamily: "'PingFang SC'", fontWeight: 600, fontSize: 10, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
          全新界面 · AI 工作台
        </span>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "8%",
        background: "linear-gradient(transparent, #070707)",
        zIndex: 18, pointerEvents: "none",
      }} />
    </div>
  );
}
