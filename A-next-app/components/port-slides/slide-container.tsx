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

const slideComponents = [ObservatoryCover, /* SlidePage0, */ SlidePage1, SlidePage2, SlidePage3, SlidePage4, SlidePage5, SlidePage6, SlidePage7, SlidePage8, SlidePage9, SlidePage10, SlidePage11, SlidePage12, SlidePage13, SlidePage14, SlidePage15, SlidePage16, SlidePage17, SlidePage18, SlidePage19, SlidePage20, SlidePage21, SlidePage22, SlidePage23, SlidePage24, SlidePage25, SlidePage26];
const slideIds = ["cover", /* "page0", */ "page1", "page2", "page3", "page4", "page5", "page6", "page7", "page8", "page9", "page10", "page11", "page12", "page13", "page14", "page15", "page16", "page17", "page18", "page19", "page20", "page21", "page22", "page23", "page24", "page25", "page26"];

const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 300;

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
  const scrollRef = useRef<HTMLDivElement>(null);
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
    const update = () => {
      const matches = mq.matches;
      setIsMobilePortrait(matches);
      if (matches) {
        document.documentElement.style.setProperty("--slide-zoom", String(window.innerHeight / 1440));
      } else {
        document.documentElement.style.removeProperty("--slide-zoom");
      }
    };
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
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
      const maxScroll = el.scrollHeight - el.clientHeight;
      el.scrollTop = Math.max(0, Math.min(maxScroll, g.startScrollTop - dx));
      g.lastX = cx;
      g.lastTime = Date.now();
      e.preventDefault();
    }
  }, []);

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
        let velocity = -(dx / dt) * 12;
        const el = scrollRef.current;
        const decay = () => {
          if (Math.abs(velocity) < 0.5 || !scrollRef.current) return;
          const maxScroll = el.scrollHeight - el.clientHeight;
          el.scrollTop = Math.max(0, Math.min(maxScroll, el.scrollTop + velocity));
          velocity *= 0.94;
          momentumRef.current = requestAnimationFrame(decay);
        };
        momentumRef.current = requestAnimationFrame(decay);
      }
    },
    [paginate],
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
    setCurrent([1, 1]);
  }, []);

  const handleNavigate = useCallback((slideIndex: number) => {
    const dir = slideIndex > current ? 1 : -1;
    setCurrent([slideIndex, dir]);
  }, [current]);

  const Slide = slideComponents[current];
  const slideProps = current === 0 ? { onEnter: handleEnter, onNavigate: handleNavigate } : {};

  return (
    <>
      <style>{`
        .slide-root { --u: 1vw; }
        @media (max-width: 640px) and (orientation: portrait) {
          .slide-root { --u: calc(1440px / 100); }
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
            zoom: var(--slide-zoom, 1) !important;
          }
          .slide-scroll .three-canvas-container,
          .slide-scroll .three-canvas-container canvas {
            touch-action: auto !important;
            pointer-events: none !important;
          }
          .slide-scroll .cover-cta-area {
            top: 55% !important;
            bottom: auto !important;
          }
        }
      `}</style>
      <div className="slide-root relative h-screen w-screen overflow-hidden">
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
