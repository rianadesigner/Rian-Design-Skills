"use client";

import { useState, useEffect } from "react";
import { motion, type PanInfo } from "motion/react";
import SlidePage0 from "./slide-page0";
import { SLIDE_DESIGN_WIDTH } from "./slide-design";

// ── Assets ──────────────────────────────────────────────────
const P = "/images/page0b";
const imgAi1 = `${P}/ai1-bg.webp`;

// Design canvas dimensions
const DESIGN_W = SLIDE_DESIGN_WIDTH; // 1440
const SLIDE_H = 900;

// V2 inner component (SlidePage0) native size
const INNER_W = 1440;
const INNER_H = 900;

// Carousel panel geometry
const PANEL_L = 120;
const PANEL_T = 267;       // carousel top (below header)
const PANEL_W = 1200;
const PANEL_H = SLIDE_H - PANEL_T; // 633 — remaining height

// Scale SlidePage0 (1440×900) → fit panel width (1200px)
const SCALE = PANEL_W / INNER_W; // ≈ 0.8333

// Snap threshold for manual drag (px)
const SNAP_THRESHOLD = 60;

export default function SlidePage0b() {
  const [active, setActive] = useState(0); // 0 = V1.0, 1 = V2.0

  // Auto-advance to V2.0 after 1 second
  useEffect(() => {
    const t = setTimeout(() => setActive(1), 2500);
    return () => clearTimeout(t);
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -SNAP_THRESHOLD && active < 1) setActive(1);
    else if (info.offset.y > SNAP_THRESHOLD && active > 0) setActive(0);
  };

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
        ["--slide-h" as string]: `${SLIDE_H}px`,
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

        <p style={{
          margin: 0,
          fontFamily: "'PingFang SC', sans-serif", fontWeight: 600,
          fontSize: 44, lineHeight: "47.25px", color: "#fff",
          letterSpacing: "1px", whiteSpace: "nowrap",
        }}>心流2.0升级：LLM Wiki</p>

        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontWeight: 400,
          fontSize: 12.36, color: "rgba(255,255,255,0.5)",
          textAlign: "center", lineHeight: "21.64px", width: 346,
        }}>
          <p style={{ margin: 0 }}>1. 用户需求升级：从&quot;问答&quot;变成&quot;完成复杂任务&quot;</p>
          <p style={{ margin: 0 }}>2. 产品定位升级：从&quot;AI 搜索助手&quot;变成&quot;AI IDE / AI 工作台&quot;</p>
          <p style={{ margin: 0 }}>3. 技术能力升级：从&quot;全网搜索&quot;到&quot;Agent 原生创作平台&quot;</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          VERTICAL CAROUSEL — V1.0 ↔ V2.0
      ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        left: PANEL_L,
        top: PANEL_T,
        width: PANEL_W,
        height: PANEL_H,
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
        zIndex: 4,
      }}>
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
          animate={{ y: -active * PANEL_H }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            cursor: "grab",
            userSelect: "none",
          }}
        >
          {/* ── Panel 0: V1.0 旧版截图 ── */}
          <div style={{ width: PANEL_W, height: PANEL_H, flexShrink: 0, position: "relative", overflow: "hidden" }}>
            <img
              alt=""
              src={imgAi1}
              draggable={false}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                pointerEvents: "none",
              }}
            />
            {/* BEFORE / V1.0 label */}
            <div style={{
              position: "absolute", left: 8, top: 10, zIndex: 10,
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
            {/* 向下箭头提示 */}
            <div style={{
              position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4, zIndex: 10,
            }}>
              <span style={{ fontFamily: "'PingFang SC'", fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "1px" }}>上滑查看 V 2.0</span>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M1 1L8 8L15 1" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* ── Panel 1: V2.0 新版 LandingView ── */}
          <div style={{ width: PANEL_W, height: PANEL_H, flexShrink: 0, position: "relative", overflow: "hidden", background: "#f8f8f8" }}>
            {/*
              SlidePage0 内部设计尺寸 1440×900，缩放至面板宽度 1200px (scale=0.8333)。
              缩放后高度 750px，在 633px 容器中显示顶部内容，底部由背景填充。
            */}
            <div style={{
              position: "absolute",
              left: 0, top: 0,
              width: INNER_W,
              height: INNER_H,
              transformOrigin: "top left",
              transform: `scale(${SCALE})`,
              pointerEvents: "none",
            }}>
              <SlidePage0 initialView="landing" />
            </div>
            {/* NEW / V2.0 label */}
            <div style={{
              position: "absolute", left: 8, top: 10, zIndex: 10,
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
          </div>
        </motion.div>
      </div>

      {/* ── 轮播指示点 ── */}
      <div style={{
        position: "absolute",
        left: PANEL_L,
        top: PANEL_T + PANEL_H - 30,
        width: PANEL_W,
        display: "flex",
        justifyContent: "center",
        gap: 7,
        zIndex: 22,
        pointerEvents: "auto",
      }}>
        {[0, 1].map(i => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={i === 0 ? "显示 V1.0" : "显示 V2.0"}
            style={{
              width: i === active ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.28)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
              flexShrink: 0,
            }}
          />
        ))}
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
