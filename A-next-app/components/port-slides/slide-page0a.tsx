"use client";

import { motion } from "motion/react";
import { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from "./slide-design";
import { EdgeCurlCanvasCarousel } from "./edge-curl-canvas-carousel";

const FONT    = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
const FONT_EN = "var(--font-syne, 'Impact', 'Arial Black', sans-serif)";

const DESIGN_W = SLIDE_DESIGN_WIDTH;   // 1440
const DESIGN_H = SLIDE_DESIGN_HEIGHT;  // 900

/* Canvas-relative layout tokens (follow 1440×900 design space) */
const pctW = (px: number) => `${(px / DESIGN_W) * 100}%`;
const pctH = (px: number) => `${(px / DESIGN_H) * 100}%`;

/* ── Wall geometry ── */
const WALL_Y = 178;

/* ── SYSTEM silhouette contour cap ──────────────────────────────────
   The cap is intentionally inset from the horizontal edges. It protects
   the title/intro area in the middle while leaving the left/right curl
   windows open, so WebGL media can climb into the top arc like the
   reference site.
───────────────────────────────────────────────────────────────────── */
const CONTOUR_H = Math.round(WALL_Y * 260 / 216); // ≈ 214
const EDGE_W = DESIGN_W * 0.10;

/* ─────────────────────────────────────────────
   Main slide
───────────────────────────────────────────── */
export default function SlidePage0a() {
  return (
    <div
      className="h-full w-full"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#070707",
        /* overflow:visible so edge curl windows (-OUTER_OVERSCAN offset)
           can paint slightly beyond the 0..1440 horizontal range.
           The parent slide-canvas / slide-fit-box clips at the design boundary. */
        overflow: "visible",
        fontFamily: FONT,
        ["--slide-w" as string]: `${DESIGN_W}px`,
        ["--slide-h" as string]: `${DESIGN_H}px`,
      }}
    >
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.12,
        mixBlendMode: "overlay", zIndex: 1, backgroundImage: "url('/images/film-grain.png')",
        backgroundRepeat: "repeat", backgroundSize: "128px 128px",
      }} />

      {/* ── Left red glow ── */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, width: "18%", height: "100%",
        background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* ── Right red glow ── */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0, width: "18%", height: "100%",
        background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* ══════════════════════════════════════════
          TOP — centred header text
          ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        top: 104, left: 0, right: 0, zIndex: 17,
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        padding: "0 80px",
      }}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
        >
          <span style={{
            fontSize: 11, fontFamily: FONT_EN, fontWeight: 600,
            letterSpacing: "0.18em", color: "rgba(200,8,8,0.85)",
          }}>00</span>
          <span style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{
            fontSize: 10.5, letterSpacing: "0.26em",
            color: "rgba(255,255,255,0.4)", fontFamily: FONT,
          }}>LLM WIKI 产品方法论</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          style={{
            margin: "14px 0 0", maxWidth: 640,
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
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.30, duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}
        >
          {(["海量原始资料", "多格式入库", "Wiki 图谱编译", "多模态输出"] as const).map((label, i, arr) => (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                padding: "5px 14px",
                border: i === 2
                  ? "1px solid rgba(200,8,8,0.70)"
                  : "1px solid rgba(255,255,255,0.15)",
                background: i === 2 ? "rgba(200,8,8,0.18)" : "transparent",
                fontSize: 13,
                color: i === 2 ? "#fff" : "rgba(255,255,255,0.75)",
                fontFamily: FONT,
                letterSpacing: "0.02em",
              }}>{label}</span>
              {i < arr.length - 1 && (
                <span style={{
                  fontFamily: FONT_EN, fontSize: 18,
                  color: i === 1 ? "rgba(200,8,8,0.9)" : "rgba(255,255,255,0.9)",
                  letterSpacing: "0.12em",
                }}>{">>>"}</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── SYSTEM silhouette contour cap ─────────────────────────────
          Middle-only mask: it carves title whitespace without covering
          the left/right edge windows where the WebGL curl should rise.
      ─────────────────────────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "absolute",
        top: 0, left: pctW(EDGE_W), right: pctW(EDGE_W), height: pctH(CONTOUR_H),
        zIndex: 15, pointerEvents: "none",
      }}>
        <svg
          viewBox="0 0 1000 260"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path
            fill="#070707"
            d="M0,0 H1000 V150 C1000,190 962,216 902,216 H98 C38,216 0,190 0,150 Z"
          />
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM — single-source WebGL carousel
          ══════════════════════════════════════════ */}
      <EdgeCurlCanvasCarousel />

      {/* ── Scroll-down hint ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontSize: 9,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.28)",
          fontFamily: FONT_EN,
          textTransform: "uppercase",
        }}>
          知识库 02
        </span>
        {/* Animated chevron */}
        <div style={{ overflow: "hidden", height: 18, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg
            viewBox="0 0 20 10"
            width={20}
            height={10}
            style={{
              display: "block",
              animation: "slideHintBounce 1.6s ease-in-out infinite",
              opacity: 0.45,
            }}
            aria-hidden
          >
            <polyline
              points="2,2 10,8 18,2"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <style>{`
          @keyframes slideHintBounce {
            0%, 100% { transform: translateY(0px); opacity: 0.45; }
            50% { transform: translateY(4px); opacity: 0.7; }
          }
        `}</style>
      </div>
    </div>
  );
}
