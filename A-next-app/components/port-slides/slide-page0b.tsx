"use client";

import { useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "motion/react";
import SlidePage0 from "./slide-page0";
import { SLIDE_DESIGN_WIDTH } from "./slide-design";

// ── Assets ──────────────────────────────────────────────────
const P = "/images/page0b";
const imgAi1 = `${P}/ai1-bg.webp`;

// Design canvas dimensions
const DESIGN_W = SLIDE_DESIGN_WIDTH; // 1440
const SLIDE_H = 900;

// V2 inner component (SlidePage0) native size. The editorial landing uses a
// 760px board so its full height maps exactly into the 633px carousel panel.
const INNER_W = 1440;
const INNER_H = 760;

// Carousel panel geometry
const PANEL_L = 120;
const PANEL_T = 267;       // carousel top (below header)
const PANEL_W = 1200;
const PANEL_H = SLIDE_H - PANEL_T; // 633 — remaining height

// Scale SlidePage0 (1440×760) → fit panel width (1200px) and panel height (633px)
const SCALE = PANEL_W / INNER_W; // ≈ 0.8333

const VERSION_META = [
  {
    badge: "BEFORE",
    version: "V 1.0",
    description: "旧版界面 · 心流 AI 搜索",
  },
  {
    badge: "NEW",
    version: "V 2.0",
    description: "全新界面 · AI 工作台",
  },
] as const;

// Snap threshold for manual drag (px)
const SNAP_THRESHOLD = 60;

export default function SlidePage0b() {
  const [active, setActive] = useState(1); // 0 = V1.0, 1 = V2.0
  const activeVersion = VERSION_META[active];
  const reduceMotion = useReducedMotion();

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

      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.12,
        mixBlendMode: "overlay", zIndex: 1, backgroundImage: "url('/images/film-grain.png')",
        backgroundRepeat: "repeat", backgroundSize: "128px 128px",
      }} />

      {/* ══════════════════════════════════════════
          TOP HEADER
      ══════════════════════════════════════════ */}
      <motion.div
        initial={!reduceMotion ? { opacity: 0, y: -12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={!reduceMotion ? { duration: 0.52, delay: 0.08, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
        style={{
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
          fontFamily: "'标小智无界黑', sans-serif", fontWeight: 400,
          fontSize: 44, lineHeight: "47.25px", color: "#fff",
          letterSpacing: "1.5px", whiteSpace: "nowrap",
        }}>心流2.0升级： LLM Wiki</p>

        <div style={{
          fontFamily: "'PingFang SC', sans-serif", fontWeight: 400,
          fontSize: 12.36, color: "rgba(255,255,255,0.5)",
          textAlign: "center", lineHeight: "21.64px", width: 346,
        }}>
          <p style={{ margin: 0 }}>1. 用户需求升级：从&quot;问答&quot;变成&quot;完成复杂任务&quot;</p>
          <p style={{ margin: 0 }}>2. 产品定位升级：从&quot;AI 搜索助手&quot;变成&quot;AI IDE / AI 工作台&quot;</p>
          <p style={{ margin: 0 }}>3. 技术能力升级：从&quot;全网搜索&quot;到&quot;Agent 原生创作平台&quot;</p>
        </div>
      </motion.div>

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
          </div>

          {/* ── Panel 1: V2.0 新版 LandingView ── */}
          <div style={{ width: PANEL_W, height: PANEL_H, flexShrink: 0, position: "relative", overflow: "hidden", background: "#f8f8f8" }}>
            {/*
              SlidePage0 内部设计尺寸 1440×760，缩放至面板宽度 1200px (scale=0.8333)。
              缩放后高度约 633px，与容器一致，因此完整页面不会被裁切。
            */}
            <div style={{
              position: "absolute",
              left: 0, top: 0,
              width: INNER_W,
              height: INNER_H,
              transformOrigin: "top left",
              transform: `scale(${SCALE})`,
              pointerEvents: "auto",
            }}>
              <SlidePage0 initialView="landing" landingStyle="editorial" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 版本标签 + 轮播切换 ── */}
      <div style={{
        position: "absolute",
        left: PANEL_L,
        bottom: 16,
        width: PANEL_W,
        display: "flex",
        justifyContent: "center",
        zIndex: 22,
        pointerEvents: "auto",
      }}>
        <div
          role="group"
          aria-label="版本界面切换"
          style={{
            width: "fit-content",
            height: 34,
            padding: "0 7px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 9,
            background: "rgba(24,25,28,0.88)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.34)",
            backdropFilter: "blur(14px)",
          }}
        >
          <span style={{
            padding: "2px 4px",
            borderRadius: 3,
            color: "#fff",
            background: "#3a3c41",
            fontFamily: "Impact, sans-serif",
            fontSize: 7,
            lineHeight: "9px",
            letterSpacing: "0.2px",
          }}>
            {activeVersion.badge}
          </span>
          <span
            aria-live="polite"
            style={{
              color: "#e7eaff",
              fontFamily: "Impact, sans-serif",
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            {activeVersion.version}
          </span>
          <span style={{
            color: "rgba(255,255,255,0.78)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: 8.5,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}>
            {activeVersion.description}
          </span>
          <span aria-hidden style={{ width: 1, height: 14, marginLeft: 1, background: "rgba(255,255,255,0.14)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[
              { direction: -1, label: "显示上一版本" },
              { direction: 1, label: "显示下一版本" },
            ].map(({ direction, label }) => {
              const disabled = direction < 0 ? active === 0 : active === 1;
              return (
                <button
                  key={direction}
                  type="button"
                  onClick={() => setActive(active + direction)}
                  aria-label={label}
                  disabled={disabled}
                  style={{
                    width: 16,
                    height: 20,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: disabled ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.9)",
                    background: "transparent",
                    border: "none",
                    cursor: disabled ? "default" : "pointer",
                    transition: "color 160ms ease",
                    flexShrink: 0,
                  }}
                >
                  <svg aria-hidden="true" width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path
                      d={direction < 0 ? "M6.5 1.5L2 6L6.5 10.5" : "M1.5 1.5L6 6L1.5 10.5"}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
