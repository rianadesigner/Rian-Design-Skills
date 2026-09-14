"use client";

import { useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "motion/react";
import SlidePage0 from "./slide-page0";
import { SLIDE_DESIGN_WIDTH } from "./slide-design";

// ── Assets ──────────────────────────────────────────────────
const P = "/images/page0b";
const imgAi1 = `${P}/ai1-bg.webp`;
const FONT = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
const FONT_EN = "var(--font-syne, 'Impact', 'Arial Black', sans-serif)";
const PIPELINE_LABELS = ["海量原始资料", "多格式入库", "Wiki 图谱编译", "多模态输出"] as const;

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
      <div style={{
        position: "absolute",
        top: 56, left: 0, right: 0, zIndex: 17,
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        padding: "0 80px",
      }}>
        <motion.div
          initial={!reduceMotion ? { opacity: 0, y: -8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}
        >
          <span style={{
            fontSize: 11, fontFamily: FONT_EN, fontWeight: 600,
            letterSpacing: "0.18em", color: "rgba(200,8,8,0.85)",
          }}>01</span>
          <span style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{
            fontSize: 10.5, letterSpacing: "0.26em",
            color: "rgba(255,255,255,0.4)", fontFamily: FONT,
          }}>LLM WIKI 产品方法论</span>
        </motion.div>

        <motion.h1
          initial={!reduceMotion ? { opacity: 0, y: -10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: 0, fontSize: 46, lineHeight: 1.08, fontWeight: 400,
            letterSpacing: "1.5px", color: "#fff", fontFamily: "'标小智无界黑', sans-serif",
            textWrap: "balance" as never,
          }}
        >
          LLM Wiki-你的AI知识库
        </motion.h1>

        <motion.p
          initial={!reduceMotion ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          style={{
            margin: "10px 0 0", maxWidth: 640,
            fontSize: 14, fontWeight: 600, lineHeight: 1.75,
            color: "rgba(255,255,255,0.5)", fontFamily: FONT,
            textWrap: "pretty" as never,
          }}
        >
          本项目完整承接了从「海量原始资料」到「结构化 Wiki 节点」的全链路：采集、入库、编译到再生成。<br />
          让散落、孤立的资料沉淀为可检索、可互链、可溯源的团队知识资产。
        </motion.p>

        {/* ── Flow pipeline ── */}
        <motion.div
          initial={!reduceMotion ? { opacity: 0, y: 6 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.30, duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, flexWrap: "wrap", justifyContent: "center" }}
        >
          {PIPELINE_LABELS.map((label, i, arr) => {
            const isActive = i === 0;
            return (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  aria-current={isActive ? "step" : undefined}
                  data-pipeline-index={i}
                  style={{
                    padding: "5px 14px",
                    border: isActive
                      ? "1px solid rgba(200,8,8,0.70)"
                      : "1px solid rgba(255,255,255,0.15)",
                    background: isActive ? "rgba(200,8,8,0.18)" : "transparent",
                    fontSize: 13,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                    fontFamily: FONT,
                    letterSpacing: "0.02em",
                    transition: "border-color 180ms ease, background-color 180ms ease, color 180ms ease",
                  }}
                >
                  {label}
                </span>
                {i < arr.length - 1 && (
                  <span style={{
                    fontFamily: FONT_EN, fontSize: 18,
                    color: i === 0 ? "rgba(200,8,8,0.9)" : "rgba(255,255,255,0.9)",
                    letterSpacing: "0.12em",
                    transition: "color 180ms ease",
                  }}>{">>>"}</span>
                )}
              </span>
            );
          })}
        </motion.div>
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
