"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

/* ── Strip constants (landscape, match cover 1024×711) ───────── */
const COVER_ASPECT = 1024 / 711; // width / height ≈ 1.44
const CARD_W = 432; // +20% for stronger visual impact
const CARD_H = Math.round(CARD_W / COVER_ASPECT); // 300 – full image, no crop
const STRIP_GAP = 12;
const STRIP_PAD = 64;
const STRIP_LOOPS = 3;

/* ── Project data ─────────────────────────────────────────────── */
// slideIndex = index in allSlideIds array defined in slide-container.tsx
// cover(0) content0(1) page0a(2)…page0g(8) page0(9) page1(10)… page15(24)… page24(33)
const PROJECTS = [
  {
    id: "kb",
    num: "01",
    name: "LLM Wiki",
    subtitle: "大模型知识体系与产品方法沉淀",
    cover: "/images/page0/content0-card-kb.webp",
    aspect: COVER_ASPECT,
    accent: "#818cf8",
    pages: "0a · 0",
    slideIndex: 2, // page0a
  },
  {
    id: "xinliu",
    num: "02",
    name: "IFlow心流",
    subtitle: "AI 原生搜索与多端产品体验",
    cover: "/images/page0/content0-card-xinliu.webp",
    aspect: COVER_ASPECT,
    accent: "#60a5fa",
    pages: "1 – 14",
    slideIndex: 10, // page1
  },
  {
    id: "wanxiang",
    num: "03",
    name: "万相·星链",
    subtitle: "AI 应用开发平台与能力编排",
    cover: "/images/page0/content0-card-wanxiang.webp",
    aspect: COVER_ASPECT,
    accent: "#c084fc",
    pages: "15 – 22",
    slideIndex: 24, // page15
  },
  {
    id: "xingliu",
    num: "04",
    name: "万相·营造",
    subtitle: "电商 AIGC 创意生产与投放提效",
    cover: "/images/page0/content0-card-xingliu.webp",
    aspect: COVER_ASPECT,
    accent: "#22d3ee",
    pages: "23 – 26",
    slideIndex: 32, // page23
  },
];

const NAV = ["LLM Wiki", "IFlow心流", "万相·星链", "万相·营造"];

const SEGMENT_CARD_W =
  PROJECTS.length * CARD_W + (PROJECTS.length - 1) * STRIP_GAP;
const SEGMENT_WIDTH = SEGMENT_CARD_W + STRIP_PAD * 2;
const STRIP_ARC_MAX_TY = Math.pow((PROJECTS.length - 1) / 2, 2) * 13;
// 高度需容纳：卡片本体 + 弧线下沉 + 阴影扩散（30px shadow blur offset）+ 余量
const STRIP_CONTAINER_H = CARD_H + STRIP_ARC_MAX_TY + 96;

const STRIP_ITEMS = Array.from({ length: STRIP_LOOPS }, (_, loop) =>
  PROJECTS.map((project) => ({
    ...project,
    stripKey: `${project.id}-${loop}`,
  })),
).flat();

/* ── Film card (pure image slice, no UI chrome) ──────────────── */
function FilmCard({
  project,
  delay,
  rotate,
  ty,
  onNavigate,
}: {
  project: (typeof PROJECTS)[0];
  delay: number;
  rotate: number;
  ty: number;
  onNavigate?: (logicalIndex: number) => void;
}) {
  const cardH = Math.round(CARD_W / project.aspect);

  const canNavigate = !!onNavigate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotate * 0.5 }}
      animate={{ opacity: 1, y: ty, rotate }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={canNavigate ? { scale: 1.03, y: ty - 6 } : undefined}
      onClick={canNavigate ? () => onNavigate(project.slideIndex) : undefined}
      style={{
        position: "relative",
        flexShrink: 0,
        width: CARD_W,
        height: cardH,
        overflow: "hidden",
        background: "#0a0a0a",
        boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
        transformOrigin: "center bottom",
        cursor: canNavigate ? "pointer" : "inherit",
      }}
    >
      {/* Cover – full image at native aspect ratio */}
      <img
        src={project.cover}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
          opacity: 0.96,
          filter: "saturate(0.94) contrast(1.02) brightness(0.92)",
        }}
      />

      {/* Light cinematic wash – keeps UI readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 42%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Red local light from one side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 14% 80%, rgba(186,14,14,0.28) 0%, transparent 54%)`,
          pointerEvents: "none",
        }}
      />

      {/* Accent tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(150deg, ${project.accent}08 0%, transparent 48%)`,
          pointerEvents: "none",
        }}
      />

      {/* Card grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "140px 140px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Bottom film-mask gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "42%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Number (top-left, ghost) */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 14,
          fontSize: 9,
          color: "rgba(255,255,255,0.34)",
          fontFamily: "system-ui, monospace",
          letterSpacing: "0.2em",
          zIndex: 2,
        }}
      >
        {project.num}
      </div>

      {/* Accent dot */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 13,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: project.accent,
          boxShadow: `0 0 9px ${project.accent}cc`,
          zIndex: 2,
        }}
      />

      {/* Name + slides (bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 14,
          right: 14,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            fontFamily: "'PingFang SC', -apple-system, sans-serif",
            lineHeight: 1.25,
            marginBottom: 4,
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          {project.name}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.42)",
            fontFamily: "'PingFang SC', -apple-system, sans-serif",
            letterSpacing: "0.04em",
            lineHeight: 1.45,
          }}
        >
          {project.subtitle}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Live clock ───────────────────────────────────────────────── */
function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ── Main slide ───────────────────────────────────────────────── */
export default function SlideContent0({ onNavigate }: { onNavigate?: (logicalIndex: number) => void } = {}) {
  const clock = useClock();

  /* ── Inertia drag-to-scroll (cinematic film-reel feel) ───── */
  const stripRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerT = useRef(0);
  const velocityRef = useRef(0); // px / ms
  const inertiaRaf = useRef<number | null>(null);
  const autoRaf = useRef<number | null>(null);

  /* ── Zoom drag (drag counter axis left/right) ───────────── */
  const ZOOM_MIN = 0.68;
  const ZOOM_MAX = 1.38;
  const [zoom, setZoom] = useState(1.0);
  const isDraggingZoom = useRef(false);
  const zoomAtDragStart = useRef(1.0);
  const dragZoomStartX = useRef(0);

  const onZoomPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    isDraggingZoom.current = true;
    zoomAtDragStart.current = zoom;
    dragZoomStartX.current = e.clientX;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const onZoomPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingZoom.current) return;
    e.stopPropagation();
    const dx = e.clientX - dragZoomStartX.current;
    setZoom(Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoomAtDragStart.current + dx / 180)));
  };
  const onZoomPointerUp = (e: React.PointerEvent) => {
    isDraggingZoom.current = false;
    try { (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId); } catch { /* ok */ }
  };

  const cancelInertia = () => {
    if (inertiaRaf.current !== null) {
      cancelAnimationFrame(inertiaRaf.current);
      inertiaRaf.current = null;
    }
  };

  const cancelAuto = () => {
    if (autoRaf.current !== null) {
      cancelAnimationFrame(autoRaf.current);
      autoRaf.current = null;
    }
  };

  // Seamless loop: jump scroll position when crossing segment boundaries
  const normalizeLoopScroll = () => {
    const el = stripRef.current;
    if (!el) return;
    if (el.scrollLeft >= SEGMENT_WIDTH * 2) {
      el.scrollLeft -= SEGMENT_WIDTH;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += SEGMENT_WIDTH;
    }
  };

  const applyStripDelta = (delta: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollLeft += delta;
    normalizeLoopScroll();
  };

  // After release: scroll continues with friction (like film unreeling)
  const startInertia = (initialVel: number) => {
    cancelInertia();
    let v = initialVel; // px per frame @ 60 fps
    const tick = () => {
      if (!stripRef.current || Math.abs(v) < 0.3) return;
      applyStripDelta(-v);
      v *= 0.91;
      inertiaRaf.current = requestAnimationFrame(tick);
    };
    inertiaRaf.current = requestAnimationFrame(tick);
  };

  const dragDistanceRef = useRef(0);

  const onStripPointerDown = (e: React.PointerEvent) => {
    // Prevent parent slide-inner drag from stealing horizontal gesture
    e.stopPropagation();
    cancelInertia();
    setIsDragging(true);
    dragStartX.current = e.pageX;
    dragDistanceRef.current = 0;
    dragStartScroll.current = stripRef.current?.scrollLeft ?? 0;
    lastPointerX.current = e.pageX;
    lastPointerT.current = performance.now();
    velocityRef.current = 0;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onStripPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !stripRef.current) return;
    e.stopPropagation();
    e.preventDefault();
    const now = performance.now();
    const dt = now - lastPointerT.current;
    const dx = e.pageX - dragStartX.current;
    dragDistanceRef.current = Math.abs(dx);
    if (dt > 0) {
      velocityRef.current = ((e.pageX - lastPointerX.current) / dt) * 16;
    }
    lastPointerX.current = e.pageX;
    lastPointerT.current = now;
    stripRef.current.scrollLeft = dragStartScroll.current - dx;
    normalizeLoopScroll();
  };

  const onStripPointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    startInertia(velocityRef.current);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    cancelInertia();
    const delta =
      Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    applyStripDelta(delta * 0.85);
  };

  // Start at middle segment; enable loop scroll range
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollLeft = SEGMENT_WIDTH;
  }, []);

  // Slow auto-drift when idle — film projector feel (no hover required)
  useEffect(() => {
    const tick = () => {
      if (!isDragging && !isHovered && stripRef.current) {
        applyStripDelta(0.32);
      }
      autoRaf.current = requestAnimationFrame(tick);
    };
    autoRaf.current = requestAnimationFrame(tick);
    return () => cancelAuto();
  }, [isDragging, isHovered]);

  useEffect(() => () => {
    cancelInertia();
    cancelAuto();
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      <style>{`.c0-strip::-webkit-scrollbar{display:none}`}</style>

      {/* ── Zoomable content wrapper ────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0,
        transform: `scale(${zoom})`,
        transformOrigin: "center center",
        willChange: "transform",
      }}>

      {/* ── Film grain ────────────────────────────────────── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          mixBlendMode: "overlay",
          opacity: 0.15,
          zIndex: 1,
        }}
        aria-hidden
      >
        <filter id="cgrain2">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cgrain2)" />
      </svg>

      {/* ── Film scratches ────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage: [
            "linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.11) 52%, rgba(255,255,255,0.06) 72%, transparent 95%)",
            "linear-gradient(to bottom, transparent 8%, rgba(255,255,255,0.045) 25%, rgba(255,255,255,0.08) 58%, rgba(255,255,255,0.045) 78%, transparent 95%)",
            "linear-gradient(to bottom, transparent 12%, rgba(255,255,255,0.035) 40%, rgba(255,255,255,0.06) 62%, rgba(255,255,255,0.035) 82%, transparent 95%)",
          ].join(","),
          backgroundPosition: "300px 0, 740px 0, 1120px 0",
          backgroundSize: "1px 100%, 1px 100%, 1px 100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Scanlines ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)",
        }}
      />

      {/* ── Left red curtain ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 380,
          pointerEvents: "none",
          zIndex: 4,
          background:
            "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.55) 0%, rgba(150,0,0,0.26) 32%, transparent 62%)",
        }}
      />

      {/* ── Right red curtain ─────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 380,
          pointerEvents: "none",
          zIndex: 4,
          background:
            "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.55) 0%, rgba(150,0,0,0.26) 32%, transparent 62%)",
        }}
      />

      {/* ── Top vignette ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          pointerEvents: "none",
          zIndex: 2,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, transparent 100%)",
        }}
      />

      {/* ── Bottom vignette ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          pointerEvents: "none",
          zIndex: 2,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.86) 0%, transparent 100%)",
        }}
      />


      {/* ── Four-corner L-frames ──────────────────────────── */}
      <div style={{ position:"absolute", top:18, left:18, width:46, height:46, borderTop:"1px solid rgba(255,255,255,0.28)", borderLeft:"1px solid rgba(255,255,255,0.28)", zIndex:12, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:18, right:18, width:46, height:46, borderTop:"1px solid rgba(255,255,255,0.28)", borderRight:"1px solid rgba(255,255,255,0.28)", zIndex:12, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:18, left:18, width:46, height:46, borderBottom:"1px solid rgba(255,255,255,0.28)", borderLeft:"1px solid rgba(255,255,255,0.28)", zIndex:12, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:18, right:18, width:46, height:46, borderBottom:"1px solid rgba(255,255,255,0.28)", borderRight:"1px solid rgba(255,255,255,0.28)", zIndex:12, pointerEvents:"none" }} />

      {/* ── Top nav bar (DGC ceremony) ────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        style={{
          position: "absolute",
          top: 30,
          left: 78,
          right: 78,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 11,
          pointerEvents: "auto",
        }}
      >
        {/* bracket logo */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.92)",
            fontFamily: "var(--font-syne, system-ui), sans-serif",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)" }}>[</span>
          RIAN
          <span style={{ color: "#e0322f", fontSize: 9 }}>●</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>]</span>
        </div>

        {/* nav items */}
        <div
          style={{
            display: "flex",
            gap: 46,
            fontSize: 11,
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.42)",
            fontFamily: "'PingFang SC', system-ui, sans-serif",
          }}
        >
          {NAV.map((n, i) => (
            <span
              key={n}
              onClick={() => onNavigate?.(PROJECTS[i].slideIndex)}
              style={{
                cursor: onNavigate ? "pointer" : "default",
                transition: "color 0.18s",
              }}
              onMouseEnter={(e) => { if (onNavigate) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.78)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)"; }}
            >
              {n}
            </span>
          ))}
        </div>

        {/* contact */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "'PingFang SC', system-ui, sans-serif",
          }}
        >
          <span style={{ color: "#e0322f", fontSize: 8 }}>●</span>
          作品集目录
        </div>
      </motion.div>

      {/* ── BIG HEADING – metallic, upper third ───────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 102,
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "2px",
            fontFamily: `var(--font-syne, 'Impact', 'Arial Black', sans-serif)`,
            textTransform: "uppercase",
            background:
              "linear-gradient(to bottom, #f2f2f2 0%, #d8d8d8 32%, #b0b0b0 68%, #8a8a8a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 14px rgba(0,0,0,0.5))",
          }}
        >
          AI{" "}
          <span style={{ textTransform: "none" }}>x</span>
          {" "}DESIGN PROJECTS
        </h1>
      </motion.div>

      {/* ── Scrollable film strip (overlaps title bottom) ─── */}
      <div
        ref={stripRef}
        className="c0-strip"
        onPointerDown={onStripPointerDown}
        onPointerMove={onStripPointerMove}
        onPointerUp={onStripPointerUp}
        onPointerCancel={onStripPointerUp}
        onWheel={onWheel}
        onClick={(e) => {
          // Suppress click-navigation when user was dragging (> 6px movement)
          if (dragDistanceRef.current > 6) {
            e.stopPropagation();
            dragDistanceRef.current = 0;
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isDragging) {
            setIsDragging(false);
            startInertia(velocityRef.current);
          }
        }}
        style={{
          position: "absolute",
          top: "calc(53% + 78px)",
          transform: "translateY(-50%)",
          left: 0,
          right: 0,
          height: STRIP_CONTAINER_H,
          overflowX: "auto",
          overflowY: "hidden",
          zIndex: 5,
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none",
          touchAction: "pan-x",
        } as React.CSSProperties}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: STRIP_GAP,
            padding: `0 ${STRIP_PAD}px`,
            width: "max-content",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          {STRIP_ITEMS.map((project, i) => {
            const localIndex = i % PROJECTS.length;
            const center = (PROJECTS.length - 1) / 2;
            const d = localIndex - center;
            const rotate = d * 3.4;
            const ty = Math.abs(d) * Math.abs(d) * 13;
            return (
              <FilmCard
                key={project.stripKey}
                project={project}
                delay={0.34 + (i % PROJECTS.length) * 0.08}
                rotate={rotate}
                ty={ty}
                onNavigate={onNavigate}
              />
            );
          })}
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          position: "absolute",
          top: "50%",
          right: 22,
          fontSize: 10,
          color: "rgba(255,255,255,0.18)",
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          pointerEvents: "none",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span>scroll</span>
        <span style={{ opacity: 0.7, fontSize: 12 }}>›</span>
      </motion.div>

      {/* ── Caption (3-line block, moved up) ──────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.66 }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 12.5,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'PingFang SC', system-ui, sans-serif",
            letterSpacing: "0.05em",
            lineHeight: 1.6,
            margin: "0 auto",
            whiteSpace: "nowrap",
          }}
        >
          设计 AI 产品全链路体验，覆盖 LLM Wiki / IFlow心流 / 万相·星链 / 万相·营造等场景的产品化探索与落地
        </div>
      </motion.div>

      </div>{/* end zoomable content wrapper */}

      {/* ── Counter (drag left/right to zoom whole screen) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.78 }}
        onPointerDown={onZoomPointerDown}
        onPointerMove={onZoomPointerMove}
        onPointerUp={onZoomPointerUp}
        onPointerCancel={onZoomPointerUp}
        style={{
          position: "absolute",
          bottom: 42,
          left: 0,
          right: 0,
          textAlign: "center",
          pointerEvents: "auto",
          zIndex: 10,
          fontSize: 12,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.46em",
          fontFamily: "system-ui, monospace",
          cursor: "ew-resize",
          userSelect: "none",
        }}
      >
        3 · · 2 · · 1 · · 0 · · 1 · · 2 · · 3
      </motion.div>

      {/* ── Counter tick mark (shifts with zoom level) ─────── */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{
          position: "absolute",
          bottom: 30,
          left: `calc(50% + ${((zoom - (ZOOM_MIN + ZOOM_MAX) / 2) / ((ZOOM_MAX - ZOOM_MIN) / 2)) * 80}px)`,
          width: 1,
          height: 9,
          marginLeft: -0.5,
          background: "rgba(255,255,255,0.55)",
          pointerEvents: "none",
          zIndex: 10,
          transition: "left 0.08s ease-out",
        }}
      />

      {/* ── Bottom-right live clock ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.82 }}
        style={{
          position: "absolute",
          bottom: 40,
          right: 78,
          fontSize: 12,
          color: "rgba(255,255,255,0.55)",
          fontFamily: "system-ui, monospace",
          letterSpacing: "0.1em",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {clock}
      </motion.div>
    </div>
  );
}
