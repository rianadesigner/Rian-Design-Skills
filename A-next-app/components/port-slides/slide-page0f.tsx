"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from "./slide-design";
import {
  FIGMA_PANEL_DISPLAY_HEIGHT,
  FigmaAgentPanel,
  FigmaEditorPanel,
} from "./slide-page0f-figma-panels";

const FONT = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
const FONT_EN = "Impact, 'Arial Black', sans-serif";
const FIGMA_SLIDE_HEIGHT = 1000;
const scaleY = SLIDE_DESIGN_HEIGHT / FIGMA_SLIDE_HEIGHT;
const y = (value: number) => Math.round(value * scaleY);

const EDITOR_PANEL = { left: 64, top: 348, width: 800 };
const AGENT_PANEL = { left: 876, width: 800 };
const TRACK_WIDTH = AGENT_PANEL.left + AGENT_PANEL.width;
const PAN_MIN = SLIDE_DESIGN_WIDTH - TRACK_WIDTH;
const PAN_MAX = 0;
const SNAP_POINTS = [PAN_MIN, PAN_MAX] as const;

const RATIONALE = [
  "Agent｜快速提问与自动执行",
  "编辑器｜长内容编排与精细控制",
  "共享上下文｜避免切换与信息断层",
];

const CORNER_MARKS = [
  { top: 24, left: 24 },
  { top: 24, right: 24, transform: "scaleX(-1)" },
  { bottom: 24, left: 24, transform: "scaleY(-1)" },
  { bottom: 24, right: 24, transform: "scale(-1,-1)" },
] as const;

function clampPan(value: number) {
  return Math.max(PAN_MIN, Math.min(PAN_MAX, value));
}

function nearestSnap(value: number) {
  return SNAP_POINTS.reduce((best, point) =>
    Math.abs(point - value) < Math.abs(best - value) ? point : best,
  );
}

function PanelPanStrip() {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInertia, setIsInertia] = useState(false);
  const offsetRef = useRef(0);
  const inertiaRaf = useRef<number | null>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startOffset: 0,
    panning: false,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });

  const applyOffset = useCallback((value: number) => {
    const next = clampPan(value);
    offsetRef.current = next;
    setOffset(next);
  }, []);

  const cancelInertia = useCallback(() => {
    if (inertiaRaf.current !== null) {
      cancelAnimationFrame(inertiaRaf.current);
      inertiaRaf.current = null;
    }
    setIsInertia(false);
  }, []);

  const startInertia = useCallback((initialVelocity: number) => {
    cancelInertia();
    setIsInertia(true);
    let velocity = initialVelocity;

    const tick = () => {
      if (Math.abs(velocity) < 0.35) {
        applyOffset(nearestSnap(offsetRef.current));
        inertiaRaf.current = null;
        setIsInertia(false);
        return;
      }

      applyOffset(offsetRef.current + velocity);
      velocity *= 0.92;
      inertiaRaf.current = requestAnimationFrame(tick);
    };

    inertiaRaf.current = requestAnimationFrame(tick);
  }, [applyOffset, cancelInertia]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("button,a,input,textarea,select,[role='button']")) return;

    cancelInertia();
    setIsDragging(true);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffset: offsetRef.current,
      panning: false,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
    event.stopPropagation();
  }, [cancelInertia]);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId === -1 || event.pointerId !== drag.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.panning) {
      if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
      drag.panning = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    event.stopPropagation();
    const now = performance.now();
    const elapsed = now - drag.lastT;
    if (elapsed > 0) drag.velocity = ((event.clientX - drag.lastX) / elapsed) * 16;
    drag.lastX = event.clientX;
    drag.lastT = now;
    applyOffset(drag.startOffset + deltaX);
  }, [applyOffset]);

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId === -1 || event.pointerId !== drag.pointerId) return;

    setIsDragging(false);
    if (drag.panning) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // The browser may release capture before pointercancel.
      }
      event.stopPropagation();
      if (Math.abs(drag.velocity) > 0.8) startInertia(drag.velocity);
      else applyOffset(nearestSnap(offsetRef.current));
    }

    drag.pointerId = -1;
    drag.panning = false;
  }, [applyOffset, startInertia]);

  const onWheel = useCallback((event: ReactWheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    cancelInertia();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    applyOffset(offsetRef.current - delta * 0.85);
  }, [applyOffset, cancelInertia]);

  useEffect(() => () => cancelInertia(), [cancelInertia]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: y(EDITOR_PANEL.top),
        width: SLIDE_DESIGN_WIDTH,
        height: FIGMA_PANEL_DISPLAY_HEIGHT,
        overflow: "hidden",
        zIndex: 10,
        touchAction: "pan-y",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <div
        style={{
          position: "relative",
          width: TRACK_WIDTH,
          height: FIGMA_PANEL_DISPLAY_HEIGHT,
          transform: `translateX(${offset}px)`,
          transition: isDragging || isInertia
            ? "none"
            : "transform 340ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        <FigmaEditorPanel left={EDITOR_PANEL.left} />
        <FigmaAgentPanel left={AGENT_PANEL.left} />
      </div>
    </div>
  );
}

export default function SlidePage0f() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#070707", overflow: "hidden", fontFamily: FONT }}>
      <div aria-hidden style={{ position: "absolute", inset: "0 auto 0 0", width: "18%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: "0 0 0 auto", width: "18%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)", pointerEvents: "none" }} />

      {CORNER_MARKS.map((mark, index) => (
        <div key={index} aria-hidden style={{ position: "absolute", ...mark, width: 18, height: 18, zIndex: 6 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 18, height: 1, background: "rgba(255,255,255,0.22)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 18, background: "rgba(255,255,255,0.22)" }} />
        </div>
      ))}

      <header style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingTop: y(128), boxSizing: "border-box", pointerEvents: "none" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: y(12), width: 900, maxWidth: "92%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: FONT_EN, fontSize: 13, color: "rgba(200,8,8,0.85)", letterSpacing: 2, lineHeight: 1 }}>03</span>
            <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: 3, fontWeight: 600, whiteSpace: "nowrap" }}>LLM WIKI 产品形态决策</span>
          </div>
          <h1 style={{ margin: 0, fontWeight: 600, fontSize: 44, color: "#fff", lineHeight: `${y(52)}px`, letterSpacing: 0, whiteSpace: "nowrap" }}>3.多用户交互形态</h1>
          <p style={{ margin: 0, maxWidth: 850, fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: `${y(24)}px`, textAlign: "center" }}>
            知识工作同时需要低门槛执行与高精度创作；双形态共享上下文，让任务从提问、编辑到交付连续流转。
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            {RATIONALE.map((item) => (
              <span key={item} style={{ padding: "4px 10px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, color: "rgba(255,255,255,0.62)", fontSize: 10, lineHeight: "16px", whiteSpace: "nowrap" }}>{item}</span>
            ))}
          </div>
        </div>
      </header>

      <PanelPanStrip />
    </div>
  );
}
