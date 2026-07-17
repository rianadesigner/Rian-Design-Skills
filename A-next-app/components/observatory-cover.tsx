"use client";

import { useCallback, useEffect, useRef, useState } from "react";
// 动态导入 Three.js（508KB），避免阻塞首屏渲染主 bundle
type MountEffect1 = typeof import("./effect1")["mountEffect1"];

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
  "围绕 AI 原生产品范式，负责多模态搜索、知识库 Wiki、Agent Framework、App Builder 与 Vibe Design 等核心场景的产品体验、能力编排与系统化落地";

/* ── Main Component ─────────────────────────────────────────── */
export function ObservatoryCover({ onEnter, onNavigate }: ObservatoryCoverProps = {}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showUI, setShowUI] = useState(false);
  // 退场序列：'idle' → 'exiting'（文字消失 → 星系远离 → 压成一条线 → 交棒影院开幕）
  const [phase, setPhase] = useState<"idle" | "exiting">("idle");
  const exitTimer = useRef<number | null>(null);
  const startExitRef = useRef<() => void>(() => {});

  /** 进入正片：先在封面播放星系退场，结束后再回调 onEnter（由容器接力影院开幕） */
  const startExit = useCallback(() => {
    if (phase === "exiting") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onEnter?.();
      return;
    }
    setPhase("exiting");
    exitTimer.current = window.setTimeout(() => onEnter?.(), 560);
  }, [phase, onEnter]);

  startExitRef.current = startExit;

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    let cleanup: (() => void) | undefined;
    let disposed = false;
    // 动态加载 Three.js，不阻塞首屏 JS bundle
    import("./effect1").then(({ mountEffect1 }: { mountEffect1: MountEffect1 }) => {
      if (disposed) return;
      cleanup = mountEffect1(container, {
        onTap: () => startExitRef.current(),
      });
    });
    const timer = setTimeout(() => setShowUI(true), 2800);
    return () => {
      disposed = true;
      cleanup?.();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => () => { if (exitTimer.current) clearTimeout(exitTimer.current); }, []);

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
      {/* 退场序列关键帧：远离（缩小）与压成一条线同时发生，一气呵成后甩出留黑 */}
      <style>{`
        @keyframes coverGalaxyCollapse {
          0%   { transform: scaleX(1) scaleY(1); opacity: 1; }
          70%  { transform: scaleX(0.55) scaleY(0.02); opacity: 1; }
          100% { transform: scaleX(0.80) scaleY(0.003); opacity: 0; }
        }
        @keyframes coverLineFlash {
          0%   { opacity: 0; transform: translateY(-50%) scaleX(0.2); }
          45%  { opacity: 1; transform: translateY(-50%) scaleX(0.8); }
          100% { opacity: 0; transform: translateY(-50%) scaleX(1.2); }
        }
      `}</style>

      {/* Three.js canvas */}
      <div
        ref={canvasRef}
        className="three-canvas-container"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          transformOrigin: "center center",
          animation: phase === "exiting"
            ? "coverGalaxyCollapse 0.55s cubic-bezier(0.7,0,0.84,0) forwards"
            : undefined,
        }}
      />

      {/* 星系压成的一条亮线：在塌缩末段成形并甩出 */}
      {phase === "exiting" && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 2,
            zIndex: 5,
            pointerEvents: "none",
            transform: "translateY(-50%)",
            transformOrigin: "center",
            background:
              "linear-gradient(90deg, transparent, rgba(210,228,255,0.98) 50%, transparent)",
            boxShadow: "0 0 26px rgba(170,205,255,0.85), 0 0 60px rgba(120,160,255,0.45)",
            animation: "coverLineFlash 0.55s cubic-bezier(0.7,0,0.84,0) forwards",
          }}
        />
      )}

      {/* ── Cinematic atmosphere layers (above canvas, below UI) ── */}

      {/* Static grain avoids repainting a full-screen SVG filter every frame. */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", opacity: 0.065,
        backgroundImage: "url('/images/film-grain.png')", backgroundRepeat: "repeat", backgroundSize: "128px 128px",
        mixBlendMode: "overlay",
      }} />

      {/* Scanlines */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
      }} />

      {/* Top vignette (darker for cinema letterbox feel) */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 160, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)" }} />

      {/* Bottom vignette */}
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)" }} />

      {/* Left red curtain glow — fades in with UI, above UI overlay */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, width: "22%", height: "100%", zIndex: 11, pointerEvents: "none",
        background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.30) 0%, rgba(150,0,0,0.12) 38%, transparent 68%)",
        opacity: phase === "exiting" ? 0 : showUI ? 1 : 0,
        transition: phase === "exiting" ? "opacity 0.3s ease-in" : "opacity 1.4s ease-out",
      }} />

      {/* Right red curtain glow — fades in with UI, above UI overlay */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0, width: "22%", height: "100%", zIndex: 11, pointerEvents: "none",
        background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.30) 0%, rgba(150,0,0,0.12) 38%, transparent 68%)",
        opacity: phase === "exiting" ? 0 : showUI ? 1 : 0,
        transition: phase === "exiting" ? "opacity 0.3s ease-in" : "opacity 1.4s ease-out",
      }} />


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
          opacity: phase === "exiting" ? 0 : showUI ? 1 : 0,
          transition: phase === "exiting" ? "opacity 0.3s ease-in" : "opacity 1s ease-out",
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
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LogoMark />
            <span style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-syne, system-ui), sans-serif",
              textTransform: "uppercase",
            }}>
              Rian Designer
            </span>
          </div>

          {/* Nav tabs */}
          <nav style={{ display: "flex", gap: 46, pointerEvents: "auto", alignItems: "center" }}>
            {[
              { label: "LLM Wiki",  slide: 2  },
              { label: "IFlow心流", slide: 13 },
              { label: "万相·星链", slide: 23 },
              { label: "万相·营造", slide: 26 },
            ].map(({ label, slide }) => (
              <a
                key={label}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate?.(slide); }}
                style={{
                  color: "rgba(255,255,255,0.42)",
                  textDecoration: "none",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.16em",
                  fontFamily: '"PingFang SC", system-ui, sans-serif',
                  transition: "color 0.18s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)"; }}
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

            {/* Body — Inter 15px/400, lh=23px, 60% white, fixed 440px */}
            <p
              style={{
                fontSize: 15,
                fontWeight: 400,
                lineHeight: "23px",
                letterSpacing: 0,
                color: "rgba(255,255,255,0.6)",
                width: 440,
                maxWidth: 440,
                flexShrink: 0,
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
                心流/星链等 AI 原生产品的 0-1 产品能力构建
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
                商家创意多模态生产与智能投放大外投系统搭建
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
                <span aria-hidden>◎</span>
                CLICK TO ENTER
              </span>
            </div>

            <div style={{ flex: 1 }} />

            {/* CTA — 112×41, bg=#D1FB39, border 1px white 24%, r=40 */}
            <button
              onClick={startExit}
              disabled={phase === "exiting"}
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
