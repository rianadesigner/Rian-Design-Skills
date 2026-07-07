"use client";

import { useState, useCallback, useEffect, useLayoutEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from "motion/react";
import { ObservatoryCover } from "../observatory-cover";
import SlideContent0 from "./slide-content0";
import { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from "./slide-design";
import { measureFitStage } from "./slide-fit";
import { preloadPage0dImages } from "./slide-page0d-assets";

// 首屏只加载 cover + content0，其余全部懒加载以缩减初始 bundle
const SlidePage0a  = lazy(() => import("./slide-page0a"));
const SlidePage0b  = lazy(() => import("./slide-page0b"));
const SlidePage0c  = lazy(() => import("./slide-page0c"));
const SlidePage0d  = lazy(() => import("./slide-page0d"));
const SlidePage0e  = lazy(() => import("./slide-page0e"));
const SlidePage0f  = lazy(() => import("./slide-page0f"));
const SlidePage0g  = lazy(() => import("./slide-page0g"));
const SlidePage0   = lazy(() => import("./slide-page0"));
const SlidePage1   = lazy(() => import("./slide-page1"));
const SlidePage2   = lazy(() => import("./slide-page2"));
const SlidePage3   = lazy(() => import("./slide-page3"));
const SlidePage4   = lazy(() => import("./slide-page4"));
const SlidePage5   = lazy(() => import("./slide-page5"));
const SlidePage6   = lazy(() => import("./slide-page6"));
const SlidePage7   = lazy(() => import("./slide-page7"));
const SlidePage8   = lazy(() => import("./slide-page8"));
const SlidePage9   = lazy(() => import("./slide-page9"));
const SlidePage10  = lazy(() => import("./slide-page10"));
const SlidePage11  = lazy(() => import("./slide-page11"));
const SlidePage12  = lazy(() => import("./slide-page12"));
const SlidePage13  = lazy(() => import("./slide-page13"));
const SlidePage14  = lazy(() => import("./slide-page14"));
const SlidePage15  = lazy(() => import("./slide-page15"));
const SlidePage16  = lazy(() => import("./slide-page16"));
const SlidePage17  = lazy(() => import("./slide-page17"));
const SlidePage18  = lazy(() => import("./slide-page18"));
const SlidePage19  = lazy(() => import("./slide-page19"));
const SlidePage20  = lazy(() => import("./slide-page20"));
const SlidePage21  = lazy(() => import("./slide-page21"));
const SlidePage22  = lazy(() => import("./slide-page22"));
const SlidePage23  = lazy(() => import("./slide-page23"));
const SlidePage24  = lazy(() => import("./slide-page24"));
const SlidePage25  = lazy(() => import("./slide-page25"));
const SlidePage26  = lazy(() => import("./slide-page26"));

/** 暂时隐藏的幻灯片（保留源码，取消 id 即可恢复） */
const HIDDEN_SLIDE_IDS = new Set<string>(["page0"]);

const allSlideComponents = [ObservatoryCover, SlideContent0, SlidePage0a, SlidePage0b, SlidePage0c, SlidePage0d, SlidePage0e, SlidePage0f, SlidePage0g, SlidePage0, SlidePage1, SlidePage2, SlidePage3, SlidePage4, SlidePage5, SlidePage6, SlidePage7, SlidePage8, SlidePage9, SlidePage10, SlidePage11, SlidePage12, SlidePage13, SlidePage14, SlidePage15, SlidePage16, SlidePage17, SlidePage18, SlidePage19, SlidePage20, SlidePage21, SlidePage22, SlidePage23, SlidePage24, SlidePage25, SlidePage26];
const allSlideIds = ["cover", "content0", "page0a", "page0b", "page0c", "page0d", "page0e", "page0f", "page0g", "page0", "page1", "page2", "page3", "page4", "page5", "page6", "page7", "page8", "page9", "page10", "page11", "page12", "page13", "page14", "page15", "page16", "page17", "page18", "page19", "page20", "page21", "page22", "page23", "page24", "page25", "page26"];

/** 懒加载 fallback：与幻灯片背景色一致的纯黑占位，避免白闪 */
function SlideFallback() {
  return <div style={{ width: "100%", height: "100%", background: "#070707" }} />;
}

const visibleSlideEntries = allSlideIds
  .map((id, index) => ({ id, index, Component: allSlideComponents[index] }))
  .filter((entry) => !HIDDEN_SLIDE_IDS.has(entry.id));

const slideComponents = visibleSlideEntries.map((entry) => entry.Component);
const slideIds = visibleSlideEntries.map((entry) => entry.id);
const numberedSlidePaths = slideIds.map((_, index) => `/${String(index + 1).padStart(2, "0")}`);

function getNumberedSlideIndex(pathname: string) {
  const match = pathname.match(/^\/(\d{2})\/?$/);
  if (!match) return -1;
  const index = Number(match[1]) - 1;
  return index >= 0 && index < slideIds.length ? index : -1;
}

/** 封面导航等使用的逻辑页码 → 实际渲染索引 */
function toVisibleSlideIndex(logicalIndex: number) {
  return visibleSlideEntries.findIndex((entry) => entry.index === logicalIndex);
}

const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 300;
const DESIGN_WIDTH = SLIDE_DESIGN_WIDTH;
const DESIGN_HEIGHT = SLIDE_DESIGN_HEIGHT;

// All non-cinema slides use vertical (up/down) transition
// Use pixel values (not percentages) to stay consistent with Framer Motion's drag coordinate system.
const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? DESIGN_HEIGHT : -DESIGN_HEIGHT,
    x: 0,
    opacity: 0.6,
  }),
  center: { y: 0, x: 0, opacity: 1 },
  exit: (direction: number) => ({
    y: direction > 0 ? -DESIGN_HEIGHT : DESIGN_HEIGHT,
    x: 0,
    opacity: 0.6,
  }),
};

// 先慢后快：ease-in cubic-bezier，初速为 0，逐渐加速冲入
const EASE_IN_ACCEL: [number, number, number, number] = [0.4, 0, 0.7, 1];

// Cinema "punch-in": cover ↔ content0 (index 0 ↔ 1)
// 封面像被镜头急速推近后穿入，content0 从放大淡入归位——
// 去掉 blur filter（GPU 代价过高），用 opacity + scale 营造同等冲击感。
const cinemaVariants = {
  enter: (_direction: number) => ({ x: 0, opacity: 0, scale: 1.4 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (_direction: number) => ({ x: 0, opacity: 0, scale: 1.4 }),
};

const CINEMA_EASE: [number, number, number, number] = [0.85, 0, 0.15, 1];

/** 转场覆盖层：电影快门向内收拢 + 胶片边框急速飞入定格，全程 pointer-events:none，不影响任何幻灯片内部布局 */
function CinemaFrameReveal() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      style={{ position: "absolute", inset: 0, zIndex: 60, pointerEvents: "none", overflow: "hidden" }}
    >
      {/* 上快门：从完全闭合（中线即那条线）直接拉开 */}
      <motion.div
        initial={{ height: "50%" }}
        animate={{ height: "0%" }}
        transition={{ duration: 0.6, ease: CINEMA_EASE }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, background: "#000" }}
      />
      {/* 下快门 */}
      <motion.div
        initial={{ height: "50%" }}
        animate={{ height: "0%" }}
        transition={{ duration: 0.6, ease: CINEMA_EASE }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#000" }}
      />
      {/* 胶片边框：快门拉开后飞入定格，闪一下淡出，交棒给 content0 自带的四角框 */}
      <motion.div
        initial={{ scale: 1.16, opacity: 0 }}
        animate={{ scale: 1, opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.8, ease: CINEMA_EASE, delay: 0.34, times: [0, 0.5, 1] }}
        style={{
          position: "absolute",
          inset: 26,
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 0 36px rgba(255,255,255,0.18), inset 0 0 60px rgba(0,0,0,0.4)",
        }}
      />
    </motion.div>
  );
}

export default function SlideContainer() {
  const getInitialSlide = () => {
    if (typeof window === "undefined") return 0;
    const pathIndex = getNumberedSlideIndex(window.location.pathname);
    if (pathIndex >= 0) return pathIndex;
    const hash = window.location.hash.replace("#", "");
    const idx = slideIds.indexOf(hash);
    return idx >= 0 ? idx : 0;
  };
  const [[current, direction], setCurrent] = useState(() => [getInitialSlide(), 0]);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  // fitScale only needed by slide-fit-shell; slide-container uses pure-CSS CQ scaling.
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // 仅在「封面 → content0」时播放电影边框收拢转场（key 自增触发重挂载重播）
  const [cinemaRevealKey, setCinemaRevealKey] = useState(0);
  const prevCurrentRef = useRef(current);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(1);
  const prefetchedImportsRef = useRef<Set<number>>(new Set());
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
  const wheelCooldownRef = useRef(false);
  const tapRef = useRef({ x: 0, y: 0, t: 0 });

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 640px) and (orientation: portrait)");
    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      const matches = mq.matches;
      setIsMobilePortrait(matches);

      document.documentElement.style.setProperty("--slide-design-w", `${DESIGN_WIDTH}px`);
      document.documentElement.style.setProperty("--slide-design-h", `${DESIGN_HEIGHT}px`);

      if (matches) {
        const { height } = measureFitStage(root);
        zoomRef.current = height / DESIGN_WIDTH;
        document.documentElement.style.setProperty("--slide-zoom", String(zoomRef.current));
      } else {
        zoomRef.current = 1;
        document.documentElement.style.removeProperty("--slide-zoom");
      }
    };

    update();
    requestAnimationFrame(update);
    const ro = new ResizeObserver(update);
    ro.observe(root);
    if (root.parentElement) ro.observe(root.parentElement);
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      document.documentElement.style.removeProperty("--slide-zoom");
      document.documentElement.style.removeProperty("--slide-design-w");
      document.documentElement.style.removeProperty("--slide-design-h");
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleImageError = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      target.dataset.assetError = "true";
      target.style.opacity = "0";
      target.style.background = "rgba(255,255,255,0.06)";
    };

    root.addEventListener("error", handleImageError, true);
    return () => root.removeEventListener("error", handleImageError, true);
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      const next = current + newDirection;
      if (next < 0 || next >= slideComponents.length) return;
      setCurrent([next, newDirection]);
    },
    [current],
  );

  /* ── 触屏轻点翻页（iPad 等无滚轮设备）────────────────────────────────
     判定为「轻点」= 位移 < 10px 且时长 < 350ms。命中交互元素（链接、按钮、
     cursor:pointer/grab 的可点击/可拖拽区域、可滚动区域）时不翻页。 */
  const isInteractiveTarget = useCallback((start: HTMLElement | null, boundary: HTMLElement) => {
    let node: HTMLElement | null = start;
    while (node && node !== boundary && node !== document.body) {
      const tag = node.tagName;
      if (
        tag === "A" || tag === "BUTTON" || tag === "INPUT" || tag === "TEXTAREA" ||
        tag === "SELECT" || tag === "LABEL" || tag === "AUDIO" || tag === "VIDEO" ||
        node.isContentEditable ||
        node.getAttribute("role") === "button" ||
        node.getAttribute("role") === "link" ||
        node.getAttribute("role") === "slider"
      ) {
        return true;
      }
      const styles = getComputedStyle(node);
      /* 只排除 cursor:pointer（真实可点击元素）。cursor 会被继承，而
         .slide-inner 全局是 grab —— 若把 grab 也算交互，整页都无法轻点翻页。
         拖拽类区域由「位移 >10px 不算轻点」的判定保护，无需在此排除。 */
      if (styles.cursor === "pointer") return true;
      const { overflowY, overflowX } = styles;
      if (
        ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight + 1) ||
        ((overflowX === "auto" || overflowX === "scroll") && node.scrollWidth > node.clientWidth + 1)
      ) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }, []);

  const handleTapPointerDown = useCallback((e: React.PointerEvent) => {
    tapRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  }, []);

  const handleTapPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") return; // 桌面鼠标行为保持不变
      if (slideIds[current] === "cover") return; // 封面有自己的进入交互
      const tap = tapRef.current;
      const moved = Math.hypot(e.clientX - tap.x, e.clientY - tap.y);
      if (moved > 10 || Date.now() - tap.t > 350) return; // 是拖拽/长按，不是轻点
      if (isInteractiveTarget(e.target as HTMLElement, e.currentTarget as HTMLElement)) return;
      paginate(1);
    },
    [current, paginate, isInteractiveTarget],
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.y < -SWIPE_THRESHOLD || velocity.y < -SWIPE_VELOCITY) {
      paginate(1);
    } else if (offset.y > SWIPE_THRESHOLD || velocity.y > SWIPE_VELOCITY) {
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

  // Wheel event: 所有幻灯片（除 cover）均通过滚轮上下翻页
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (wheelCooldownRef.current) return;
      const curId = slideIds[current];
      // cover 页面保留原有行为，不拦截
      if (curId === "cover") return;

      // 优先让内部可滚动区域（如截图区）消费滚轮
      let node = e.target as HTMLElement | null;
      while (node && node !== document.body) {
        const { overflowY } = getComputedStyle(node);
        const scrollable =
          (overflowY === "auto" || overflowY === "scroll") &&
          node.scrollHeight > node.clientHeight + 1;
        if (scrollable) {
          const atTop = node.scrollTop <= 0;
          const atBottom =
            node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
          if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
            return;
          }
        }
        node = node.parentElement;
      }

      if (Math.abs(e.deltaY) < 30) return;

      e.preventDefault();
      if (e.deltaY > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
      wheelCooldownRef.current = true;
      setTimeout(() => { wheelCooldownRef.current = false; }, 800);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [current, paginate]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    // 数字路由进入时同步 /01、/02...；旧 /port 入口仍保留 hash 行为。
    if (getNumberedSlideIndex(window.location.pathname) >= 0) {
      window.history.replaceState(null, "", numberedSlidePaths[current]);
      return;
    }
    const id = slideIds[current];
    if (id) window.history.replaceState(null, "", `#${id}`);
  }, [current]);

  // 进入 content0 且来自封面时，触发电影边框收拢转场
  useEffect(() => {
    const prev = prevCurrentRef.current;
    prevCurrentRef.current = current;
    if (reduceMotion) return;
    if (slideIds[current] === "content0" && slideIds[prev] === "cover") {
      setCinemaRevealKey((k) => k + 1);
    }
  }, [current, reduceMotion]);

  const handleEnter = useCallback(() => {
    const next = toVisibleSlideIndex(1);
    if (next >= 0) setCurrent([next, 1]);
  }, []);

  const handleNavigate = useCallback((logicalIndex: number) => {
    const visibleIndex = toVisibleSlideIndex(logicalIndex);
    if (visibleIndex < 0) return;
    const dir = visibleIndex > current ? 1 : -1;
    setCurrent([visibleIndex, dir]);
  }, [current]);

  // ——— 轻量预取策略：只预热当前附近页面，避免外部冷启动时解析完整作品集 ———
  useEffect(() => {
    // allImports[i] 对应 allSlideIds[i+2]（跳过 cover 和 content0）
    const allImports: Array<() => Promise<unknown>> = [
      () => import("./slide-page0a"),  () => import("./slide-page0b"),
      () => import("./slide-page0c"),  () => import("./slide-page0d"),
      () => import("./slide-page0e"),  () => import("./slide-page0f"),
      () => import("./slide-page0g"),  () => import("./slide-page0"),
      () => import("./slide-page1"),   () => import("./slide-page2"),
      () => import("./slide-page3"),   () => import("./slide-page4"),
      () => import("./slide-page5"),   () => import("./slide-page6"),
      () => import("./slide-page7"),   () => import("./slide-page8"),
      () => import("./slide-page9"),   () => import("./slide-page10"),
      () => import("./slide-page11"),  () => import("./slide-page12"),
      () => import("./slide-page13"),  () => import("./slide-page14"),
      () => import("./slide-page15"),  () => import("./slide-page16"),
      () => import("./slide-page17"),  () => import("./slide-page18"),
      () => import("./slide-page19"),  () => import("./slide-page20"),
      () => import("./slide-page21"),  () => import("./slide-page22"),
      () => import("./slide-page23"),  () => import("./slide-page24"),
      () => import("./slide-page25"),  () => import("./slide-page26"),
    ];

    // content0 中点击可跳转的幻灯片 slideIndex（相对 allSlideIds），转换到 allImports 下标
    const JUMP_TARGETS = [2, 10, 22, 32].map((idx) => idx - 2).filter((i) => i >= 0 && i < allImports.length);

    const loaded = prefetchedImportsRef.current;
    const runSequential = (indices: number[], delay: number, interval: number) => {
      let i = 0;
      const run = () => {
        while (i < indices.length && loaded.has(indices[i])) i++;
        if (i >= indices.length) return;
        const idx = indices[i++];
        loaded.add(idx);
        allImports[idx]().finally(() => {
          if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(run, { timeout: interval });
          } else {
            setTimeout(run, interval);
          }
        });
      };
      if (delay > 0) {
        setTimeout(() => {
          if (typeof requestIdleCallback !== "undefined") requestIdleCallback(run, { timeout: interval });
          else run();
        }, delay);
      } else {
        if (typeof requestIdleCallback !== "undefined") requestIdleCallback(run, { timeout: interval });
        else setTimeout(run, 50);
      }
    };

    // 只预取当前前后 1 页；用户确实进入封面/content0 后，再延后预热可点击跳转目标。
    const offset = current - 2;
    const near = Array.from(
      new Set([
        offset - 1,
        offset,
        offset + 1,
      ])
    ).filter((i) => i >= 0 && i < allImports.length);
    runSequential(near, 0, 900);

    if (current <= 1) {
      runSequential(JUMP_TARGETS, 1600, 1000);
    }
  }, [current]);

  // page0d 图标较多：在用户翻到 page0c 时提前预热本地资源
  useEffect(() => {
    const id = slideIds[current];
    if (id === "page0c" || id === "page0d") {
      preloadPage0dImages();
    }
  }, [current]);

      const Slide = slideComponents[current];
  const slideProps = current <= 1 ? { onEnter: handleEnter, onNavigate: handleNavigate } : {};
  /** 有内部点击交互的幻灯片，禁用 drag 以防 framer-motion 拦截 click 事件 */
  const NO_DRAG_SLIDES = new Set(["content0", "page0e", "page0f"]);
  const noDrag = NO_DRAG_SLIDES.has(slideIds[current]);

  return (
    <>
      <style>{`
        .slide-root { --u: calc(${DESIGN_WIDTH}px / 100); }
        /* touch-action 不可继承，需覆盖到所有后代：禁用 iPad Safari 双击缩放
           （轻点翻页时连点两下会触发缩放并平移画面），保留单击与滑动手势。
           内联设置了 touch-action 的元素（轮播 none / 标签页 pan-y）优先级更高，不受影响。 */
        .slide-root, .slide-root * { touch-action: manipulation; }
        @media (min-width: 641px), (orientation: landscape) {
          .slide-root {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            overflow: hidden;
          }
          .slide-fit-stage {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            container-type: size;
            --slide-design-w: ${DESIGN_WIDTH}px;
            --slide-design-h: ${DESIGN_HEIGHT}px;
          }
          .slide-fit-box {
            position: relative;
            flex-shrink: 0;
            overflow: hidden;
            width: ${DESIGN_WIDTH}px;
            height: ${DESIGN_HEIGHT}px;
            transform-origin: center center;
            will-change: transform;
            /* Pure CSS contain scaling via container-query units.
               100cqw / --slide-design-w  = scale to fit width
               100cqh / --slide-design-h  = scale to fit height
               min() picks the smaller → "contain" mode (no clipping, letterbox if needed).
               On 16:9 screens the 16:10 design canvas would previously have its
               top/bottom clipped with max() (cover mode). Using min() ensures all
               content is always fully visible. */
            transform: scale(min(
              calc(100cqw / var(--slide-design-w, ${DESIGN_WIDTH}px)),
              calc(100cqh / var(--slide-design-h, ${DESIGN_HEIGHT}px))
            ));
          }
          .slide-canvas {
            position: relative;
            width: ${DESIGN_WIDTH}px;
            height: ${DESIGN_HEIGHT}px;
            overflow: hidden;
          }
          .slide-canvas .slide-scroll > * {
            width: 100% !important;
            height: 100% !important;
            min-height: 100% !important;
          }
          .slide-canvas .slide-inner {
            cursor: grab;
            will-change: transform, opacity;
          }
          .slide-canvas .slide-inner:active {
            cursor: grabbing;
          }
        }
        @media (max-width: 640px) and (orientation: portrait) {
          .slide-root { --u: calc(1440px / 100); }
          .slide-fit-stage {
            width: 100% !important;
            height: 100% !important;
          }
          .slide-canvas {
            position: absolute !important;
            inset: 0 !important;
            width: auto !important;
            height: auto !important;
            transform: none !important;
            overflow: visible !important;
          }
          .slide-root {
            position: fixed !important;
            inset: 0 !important;
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
      <div ref={rootRef} className="slide-root">
      <div
        ref={stageRef}
        className="slide-fit-stage"
        style={
          isMobilePortrait
            ? undefined
            : { width: "100%", height: "100%" }
        }
      >
      <div
        className={isMobilePortrait ? "slide-canvas" : "slide-fit-box"}
        style={
          isMobilePortrait
            ? { position: "relative", width: "100%", height: "100%", transform: "none" }
            : undefined
        }
      >
      <div className="slide-canvas">
      {/* cover(0) ↔ content0(1) 用电影快门；其余所有页面统一用上下滑动 + 先慢后快曲线 */}
      {(() => {
        const prevSlide = current - direction;
        const isCinema = !reduceMotion && direction !== 0 && Math.min(current, prevSlide) === 0 && Math.max(current, prevSlide) === 1;
        const activeVariants = isCinema ? cinemaVariants : variants;
        const activeTransition = isCinema
          ? { duration: 0.9, ease: CINEMA_EASE }
          : { duration: 0.48, ease: EASE_IN_ACCEL };
        return (
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={slideIds[current]}
              custom={direction}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={activeTransition}
              drag={isMobilePortrait || noDrag ? false : "y"}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.15}
              onDragEnd={isMobilePortrait || noDrag ? undefined : handleDragEnd}
              className="slide-inner absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
              onTouchStart={isMobilePortrait ? handleTouchStart : undefined}
              onTouchMove={isMobilePortrait ? handleTouchMove : undefined}
              onTouchEnd={isMobilePortrait ? handleTouchEnd : undefined}
              onPointerDown={handleTapPointerDown}
              onPointerUp={handleTapPointerUp}
            >
              <div ref={scrollRef} className="slide-scroll h-full w-full">
                <Suspense fallback={<SlideFallback />}>
                  <Slide {...slideProps} />
                </Suspense>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })()}

      {/* 电影边框收拢转场覆盖层（仅封面 → content0 触发，叠在幻灯片之上、不参与布局） */}
      {cinemaRevealKey > 0 && <CinemaFrameReveal key={cinemaRevealKey} />}
      </div>
      </div>
      </div>
    </div>
    </>
  );
}
