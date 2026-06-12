"use client";

import { useEffect, useRef, useState } from "react";
import { mountEffect1 } from "./effect1";

interface ObservatoryCoverProps {
  onEnter?: () => void;
  onNavigate?: (slideIndex: number) => void;
}

/* ── Logo mark — Figma node 42:2087 (`资源 1@3x@3x 1`, PR file) ── */
function LogoMark() {
  return (
    <img
      src="/images/rian-brand-mark.svg"
      alt=""
      width={32}
      height={32}
      draggable={false}
      decoding="async"
      style={{ display: "block", width: 32, height: 32 }}
      aria-hidden
    />
  );
}

function DynamicsIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="15" cy="15" r="8"  stroke="white" strokeWidth="1" />
      <circle cx="15" cy="15" r="2"  fill="white" />
    </svg>
  );
}

function LuminosityIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="5" y="5" width="20" height="20" stroke="white" strokeWidth="1" />
      <line x1="15" y1="5"  x2="15" y2="25" stroke="white" strokeWidth="1" />
      <line x1="5"  y1="15" x2="25" y2="15" stroke="white" strokeWidth="1" />
    </svg>
  );
}

function GeoAccent() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <polygon points="50,0 100,50 50,100 0,50" stroke="white" strokeWidth="2" />
      <polygon points="50,0 100,50 50,100" fill="white" />
    </svg>
  );
}

const HERO_MICRO =
  "2021.06 — Now · Senior AI-Driven UX Designer";
const HERO_BODY =
  "负责 AI 产品体验与架构升级，主导生成式 AI 产品在多模态搜索、知识库wiki、Agent FRAMEWORK、App Builder、VIBE Design等场景下的产品化探索与落地。";

/* ── Main Component ─────────────────────────────────────────── */
export function ObservatoryCover({ onEnter, onNavigate }: ObservatoryCoverProps = {}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const cleanup = mountEffect1(container);
    const timer = setTimeout(() => setShowUI(true), 2800);
    return () => { cleanup(); clearTimeout(timer); };
  }, []);

  /* ── Figma-exact layout constants ──────────────────────────
     Root: 1440×900 (16:10)   Header: h=80  padH=40
     Left: w=672  Right: w=768  → ratio 46.67% / 53.33%
     Frame6 (hero): padL=40 padT=40 itemSpacing=24
     Bottom modules: padL=40
     ────────────────────────────────────────────────────────── */

  const LINE = "1px solid rgba(255,255,255,0.12)";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "radial-gradient(circle at center, #0a1128 0%, #02040a 60%, #000 100%)",
        color: "#fff",
        fontFamily: "var(--font-inter, Inter, sans-serif)",
        WebkitFontSmoothing: "antialiased",
        userSelect: "none",
      }}
    >
      {/* Three.js canvas */}
      <div ref={canvasRef} className="three-canvas-container" style={{ position: "absolute", inset: 0, zIndex: 1 }} />

      {/* ── UI overlay ────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          display: "grid",
          gridTemplateColumns: "calc(672 / 1440 * 100%) 1fr",
          gridTemplateRows: "80px 1fr",
          opacity: showUI ? 1 : 0,
          transition: "opacity 1s ease-out",
        }}
      >
        {/* ═══ Header ═══════════════════════════════════════════ */}
        <header
          style={{
            gridColumn: "1 / -1",
            gridRow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            background: "linear-gradient(180deg, rgba(2,4,10,0.8) 0%, rgba(2,4,10,0) 100%)",
            backdropFilter: "blur(4px)",
            borderBottom: LINE,
          }}
        >
          {/* Brand — Syne 19.2px/700, ls≈0.96 */}
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <LogoMark />
            <span
              style={{
                fontFamily: "var(--font-syne, Syne, sans-serif)",
                fontWeight: 700,
                fontSize: 19.2,
                lineHeight: "28.8px",
                letterSpacing: 0.96,
              }}
            >
              RIANADESIGNer
            </span>
          </div>

          {/* Nav — Inter 12px/400, gap=40 */}
          <nav style={{ display: "flex", gap: 40, pointerEvents: "auto", alignItems: "center" }}>
            {[
              { label: "心流 AI 助手", slide: 1 },
              { label: "星链开发平台", slide: 13 },
              { label: "万相营造", slide: 23 },
              { label: "广告大外投", slide: 26 },
            ].map(({ label, slide }) => (
              <a
                key={label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.(slide);
                }}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "14.52px",
                  letterSpacing: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        {/* ═══ Left Panel (Main Content) ════════════════════════ */}
        <main
          style={{
            gridColumn: 1,
            gridRow: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(90deg, rgba(2,4,10,0.92) 0%, rgba(2,4,10,0.55) 60%, rgba(2,4,10,0) 100%)",
            borderRight: LINE,
          }}
        >
          {/* ── Hero area (Frame 6: padL=40 padT=40 gap=24) ── */}
          <div style={{ padding: "40px 40px 0 40px", display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Micro subtitle — Inter 12px/600, ls=1.56, 60% white */}
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1.56,
                lineHeight: "14.4px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {HERO_MICRO}
            </div>

            {/* Title — GeoAccent 嵌在 “Portfolio” 的字母 o 字怀内 */}
            <div style={{ position: "relative", width: "fit-content" }}>
              <h1
                style={{
                  fontFamily: "var(--font-syne, Syne, sans-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(48px, 5.56vw, 80px)",
                  lineHeight: "1.05",
                  letterSpacing: "-1.6px",
                  color: "#fff",
                  margin: 0,
                }}
                aria-label="AI × Design Portfolio Web & APP"
              >
                AI × Design
                <br />
                Portf
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    lineHeight: 1,
                  }}
                >
                  o
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      width: 24,
                      height: 24,
                      transform: "translate(-50%, -52%)",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GeoAccent />
                  </span>
                </span>
                lio
                <br />
                {"Web & APP"}
              </h1>
            </div>

            {/* Body — Inter 15px/400, lh=23px, 60% white, maxW=466 */}
            <p
              style={{
                fontSize: 15,
                fontWeight: 400,
                lineHeight: "23px",
                letterSpacing: 0,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 466,
                margin: 0,
              }}
            >
              {HERO_BODY}
            </p>
          </div>

          {/* ── Bottom modules (padL=40, two-col) ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: "0 0 0 40px",
              borderTop: LINE,
            }}
          >
            {/* AI 产品 */}
            <div style={{ padding: "30px 20px 30px 0", borderRight: LINE }}>
              <div style={{ marginBottom: 15, opacity: 0.8 }}>
                <DynamicsIcon />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-syne, Syne, sans-serif)",
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: "24px",
                  letterSpacing: 0.8,
                  color: "#fff",
                  marginBottom: 9,
                }}
              >
                AI 产品
              </div>
              <div style={{ fontSize: 12, fontWeight: 400, lineHeight: "18px", color: "rgba(255,255,255,0.6)" }}>
                心流/星链 等 AI 原生产品的 0→1 设计与功能构建。
              </div>
            </div>

            {/* 广告创意 */}
            <div style={{ padding: "30px 0 30px 20px" }}>
              <div style={{ marginBottom: 15, opacity: 0.8 }}>
                <LuminosityIcon />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-syne, Syne, sans-serif)",
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: "24px",
                  letterSpacing: 0.8,
                  color: "#fff",
                  marginBottom: 9,
                }}
              >
                广告创意
              </div>
              <div style={{ fontSize: 12, fontWeight: 400, lineHeight: "18px", color: "rgba(255,255,255,0.6)" }}>
                商家创意多模态生产与智能投放大外投系统搭建。
              </div>
            </div>
          </div>
        </main>

        {/* ═══ Right Panel (768px wide area) ════════════════════ */}
        <div style={{ gridColumn: 2, gridRow: 2, position: "relative" }}>

          {/* Top row: two crosshairs at y=40 */}
          <CrossHair style={{ position: "absolute", top: 40, left: 40 }} />
          <CrossHair style={{ position: "absolute", top: 40, right: 40 }} />

          {/* Bottom area: hints + CTA, aligned to bottom-left */}
          <div
            className="cover-cta-area"
            style={{
              position: "absolute",
              left: 40,
              right: 40,
              bottom: 40,
              display: "flex",
              alignItems: "center",
              gap: 40,
              pointerEvents: "auto",
            }}
          >
            {/* Hint text row — Inter 12px/500, 60% white */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 12,
                fontWeight: 500,
                lineHeight: "14.52px",
                letterSpacing: 0,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span aria-hidden>↺</span>
                DRAG TO ROTATE
              </span>
              <span aria-hidden style={{ opacity: 0.5 }}>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span aria-hidden>⇡</span>
                SCROLL TO ENTER GALAXY
              </span>
            </div>

            <div style={{ flex: 1 }} />

            {/* CTA — 112×41, bg=#D1FB39, border 1px white 24%, r=40 */}
            <button
              onClick={onEnter}
              style={{
                appearance: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                minWidth: 112,
                height: 41,
                padding: "0 24px",
                border: "1px solid rgba(255,255,255,0.24)",
                borderRadius: 40,
                background: "#D1FB39",
                color: "#010103",
                fontSize: 12,
                fontWeight: 500,
                lineHeight: "14.52px",
                letterSpacing: 0,
                cursor: "pointer",
                fontFamily: "var(--font-inter, Inter, sans-serif)",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#010103",
                  opacity: 0.25,
                  flexShrink: 0,
                }}
              />
              开始体验
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Crosshair helper ──────────────────────────────────────── */
function CrossHair({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{ width: 20, height: 20, position: "relative", ...style }}
      aria-hidden
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 1,
          background: "rgba(255,255,255,0.3)",
          transform: "translateY(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 1,
          background: "rgba(255,255,255,0.3)",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}