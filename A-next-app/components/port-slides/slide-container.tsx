"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { ObservatoryCover } from "../observatory-cover";
import SlidePage0 from "./slide-page0";
import SlidePage1 from "./slide-page1";
import SlidePage2 from "./slide-page2";
import SlidePage3 from "./slide-page3";
import SlidePage4 from "./slide-page4";
import SlidePage5 from "./slide-page5";
import SlidePage6 from "./slide-page6";
import SlidePage7 from "./slide-page7";
import SlidePage8 from "./slide-page8";
import SlidePage9 from "./slide-page9";
import SlidePage10 from "./slide-page10";
import SlidePage11 from "./slide-page11";
import SlidePage12 from "./slide-page12";
import SlidePage13 from "./slide-page13";
import SlidePage14 from "./slide-page14";
import SlidePage15 from "./slide-page15";
import SlidePage16 from "./slide-page16";
import SlidePage17 from "./slide-page17";
import SlidePage18 from "./slide-page18";
import SlidePage19 from "./slide-page19";
import SlidePage20 from "./slide-page20";
import SlidePage21 from "./slide-page21";
import SlidePage22 from "./slide-page22";
import SlidePage23 from "./slide-page23";
import SlidePage24 from "./slide-page24";
import SlidePage25 from "./slide-page25";
import SlidePage26 from "./slide-page26";

/** 暂时隐藏的幻灯片（保留源码，取消 id 即可恢复） */
const HIDDEN_SLIDE_IDS = new Set(["page0"]);

const allSlideComponents = [ObservatoryCover, SlidePage0, SlidePage1, SlidePage2, SlidePage3, SlidePage4, SlidePage5, SlidePage6, SlidePage7, SlidePage8, SlidePage9, SlidePage10, SlidePage11, SlidePage12, SlidePage13, SlidePage14, SlidePage15, SlidePage16, SlidePage17, SlidePage18, SlidePage19, SlidePage20, SlidePage21, SlidePage22, SlidePage23, SlidePage24, SlidePage25, SlidePage26];
const allSlideIds = ["cover", "page0", "page1", "page2", "page3", "page4", "page5", "page6", "page7", "page8", "page9", "page10", "page11", "page12", "page13", "page14", "page15", "page16", "page17", "page18", "page19", "page20", "page21", "page22", "page23", "page24", "page25", "page26"];

const visibleSlideEntries = allSlideIds
  .map((id, index) => ({ id, index, Component: allSlideComponents[index] }))
  .filter((entry) => !HIDDEN_SLIDE_IDS.has(entry.id));

const slideComponents = visibleSlideEntries.map((entry) => entry.Component);
const slideIds = visibleSlideEntries.map((entry) => entry.id);

/** 封面导航等使用的逻辑页码 → 实际渲染索引 */
function toVisibleSlideIndex(logicalIndex: number) {
  return visibleSlideEntries.findIndex((entry) => entry.index === logicalIndex);
}

const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 300;
/** 幻灯片设计画布：16:10（与移动端 1440×900、预览视口 1600×1000 一致） */
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 900;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.5,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.5,
  }),
};

export default function SlideContainer() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(1);
  const gestureRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    direction: null as "x" | "y" | null,
    startScrollTop: 0,
    lastX: 0,
    lastTime: 0,
  });
  const momentumRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px) and (orientation: portrait)");
    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      const matches = mq.matches;
      setIsMobilePortrait(matches);
      if (matches) {
        const zoom = window.innerHeight / DESIGN_WIDTH;
        zoomRef.current = zoom;
        document.documentElement.style.setProperty("--slide-zoom", String(zoom));
        document.documentElement.style.removeProperty("--slide-fit-scale");
      } else {
        zoomRef.current = 1;
        document.documentElement.style.removeProperty("--slide-zoom");
        // 用 slide-root 实际占位测量，避免 Cursor 分屏 / CDP 强制视口时 window 尺寸与可见区域不一致
        const width = root.clientWidth || window.innerWidth;
        const height = root.clientHeight || window.innerHeight;
        const scale = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
        document.documentElement.style.setProperty("--slide-fit-scale", String(scale));
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--slide-zoom");
      document.documentElement.style.removeProperty("--slide-fit-scale");
    };
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      const next = current + newDirection;
      if (next < 0 || next >= slideComponents.length) return;
      setCurrent([next, newDirection]);
    },
    [current],
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY) {
      paginate(1);
    } else if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY) {
      paginate(-1);
    }
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    cancelAnimationFrame(momentumRef.current);
    gestureRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now(),
      direction: null,
      startScrollTop: scrollRef.current?.scrollTop ?? 0,
      lastX: e.touches[0].clientX,
      lastTime: Date.now(),
    };
  }, []);

  const getMaxScroll = useCallback(() => {
    if (!scrollRef.current) return 0;
    const viewH = scrollRef.current.clientHeight;
    const visibleContentH = 900 * zoomRef.current;
    return Math.max(visibleContentH - viewH, 0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const g = gestureRef.current;
    const cx = e.touches[0].clientX;
    const cy = e.touches[0].clientY;
    const dx = cx - g.startX;
    const dy = cy - g.startY;

    if (!g.direction) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        g.direction = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      } else {
        return;
      }
    }

    if (g.direction === "x" && scrollRef.current) {
      const el = scrollRef.current;
      const maxScroll = getMaxScroll();
      el.scrollTop = Math.max(0, Math.min(maxScroll, g.startScrollTop + dx));
      g.lastX = cx;
      g.lastTime = Date.now();
      e.preventDefault();
    }
  }, [getMaxScroll]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const g = gestureRef.current;

      if (g.direction === "y") {
        const dy = e.changedTouches[0].clientY - g.startY;
        const dt = Date.now() - g.startTime;
        const vy = (Math.abs(dy) / dt) * 1000;
        if (Math.abs(dy) > SWIPE_THRESHOLD || vy > SWIPE_VELOCITY) {
          if (dy < 0) paginate(1);
          else paginate(-1);
        }
      }

      if (g.direction === "x" && scrollRef.current) {
        const dx = e.changedTouches[0].clientX - g.lastX;
        const dt = Math.max(1, Date.now() - g.lastTime);
        let velocity = (dx / dt) * 12;
        const el = scrollRef.current;
        const maxScroll = getMaxScroll();
        const decay = () => {
          if (Math.abs(velocity) < 0.5 || !scrollRef.current) return;
          el.scrollTop = Math.max(0, Math.min(maxScroll, el.scrollTop + velocity));
          velocity *= 0.94;
          momentumRef.current = requestAnimationFrame(decay);
        };
        momentumRef.current = requestAnimationFrame(decay);
      }
    },
    [paginate, getMaxScroll],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") paginate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") paginate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paginate]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [current]);

  const handleEnter = useCallback(() => {
    const next = toVisibleSlideIndex(2);
    if (next >= 0) setCurrent([next, 1]);
  }, []);

  const handleNavigate = useCallback((logicalIndex: number) => {
    const visibleIndex = toVisibleSlideIndex(logicalIndex);
    if (visibleIndex < 0) return;
    const dir = visibleIndex > current ? 1 : -1;
    setCurrent([visibleIndex, dir]);
  }, [current]);

  const Slide = slideComponents[current];
  const slideProps = current === 0 ? { onEnter: handleEnter, onNavigate: handleNavigate } : {};

  return (
    <>
      <style>{`
        .slide-root { --u: calc(${DESIGN_WIDTH}px / 100); }
        @media (min-width: 641px), (orientation: landscape) {
          .slide-root {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
          }
          .slide-fit-stage {
            position: relative;
            width: ${DESIGN_WIDTH}px;
            height: ${DESIGN_HEIGHT}px;
            flex-shrink: 0;
            transform: scale(var(--slide-fit-scale, 1));
            transform-origin: center center;
            overflow: hidden;
          }
          .slide-fit-stage .slide-inner {
            cursor: grab;
          }
          .slide-fit-stage .slide-inner:active {
            cursor: grabbing;
          }
        }
        @media (max-width: 640px) and (orientation: portrait) {
          .slide-root { --u: calc(1440px / 100); }
          .slide-fit-stage {
            width: 100% !important;
            height: 100% !important;
            transform: none !important;
          }
          .slide-root {
            transform: rotate(90deg) translateY(-100%);
            transform-origin: top left;
            width: 100vh !important;
            height: 100vw !important;
            overflow: hidden !important;
          }
          .slide-inner {
            position: absolute !important;
            inset: 0 !important;
            width: 100vh !important;
            height: 100vw !important;
            transform: none !important;
            touch-action: none !important;
          }
          .slide-scroll {
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
          }
          .slide-scroll > * {
            width: 1440px !important;
            height: 900px !important;
            min-height: 900px !important;
            transform: scale(var(--slide-zoom, 1)) !important;
            transform-origin: top left !important;
          }
          .slide-scroll .three-canvas-container,
          .slide-scroll .three-canvas-container canvas {
            touch-action: auto !important;
            pointer-events: none !important;
          }
        }
      `}</style>
      <div ref={rootRef} className="slide-root relative h-screen w-screen overflow-hidden">
      <div className="slide-fit-stage">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slideIds[current]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag={isMobilePortrait ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={isMobilePortrait ? undefined : handleDragEnd}
          className="slide-inner absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
          onTouchStart={isMobilePortrait ? handleTouchStart : undefined}
          onTouchMove={isMobilePortrait ? handleTouchMove : undefined}
          onTouchEnd={isMobilePortrait ? handleTouchEnd : undefined}
        >
          <div ref={scrollRef} className="slide-scroll h-full w-full">
            <Slide {...slideProps} />
          </div>
        </motion.div>
      </AnimatePresence>
      </div>

      {/* Arrow hints — hidden on mobile */}
      {current > 1 && (
        <button
          onClick={() => paginate(-1)}
          className="hidden sm:flex absolute left-4 top-1/2 z-50 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-opacity hover:bg-white/40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {current > 0 && current < slideComponents.length - 1 && (
        <button
          onClick={() => paginate(1)}
          className="hidden sm:flex absolute right-4 top-1/2 z-50 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-opacity hover:bg-white/40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
    </>
  );
}
