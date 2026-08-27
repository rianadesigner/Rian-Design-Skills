"use client"

import {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  lazy,
  Suspense,
} from "react"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "motion/react"
import { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from "./slide-design"
import { computeSlideFitScale, measureFitStage } from "./slide-fit"
import { preloadPage0dImages } from "./slide-page0d-assets"
import {
  getSlidePreloadPolicy,
  predecodeSlideImages,
} from "./slide-image-preload"
import { SlideCornerMarks } from "./slide-corner-marks"
import { allSlideIds, HIDDEN_SLIDE_IDS } from "./slide-registry"

// 每个数字路由只加载当前幻灯片，其他页面按需获取以缩减初始 bundle。
const ObservatoryCover = lazy(() =>
  import("../observatory-cover").then((module) => ({
    default: module.ObservatoryCover,
  }))
)
const SlideContent0 = lazy(() => import("./slide-content0"))
const SlidePage0a = lazy(() => import("./slide-page0a"))
const SlidePage0b = lazy(() => import("./slide-page0b"))
const SlidePage4b = lazy(() => import("./slide-page4b"))
const SlidePage0c = lazy(() => import("./slide-page0c"))
const SlidePage0d = lazy(() => import("./slide-page0d"))
const SlidePage0e = lazy(() => import("./slide-page0e"))
const SlidePage0f = lazy(() => import("./slide-page0f"))
const SlidePage0g = lazy(() => import("./slide-page0g"))
const SlidePage0 = lazy(() => import("./slide-page0"))
const SlidePage1 = lazy(() => import("./slide-page1"))
const SlidePage2 = lazy(() => import("./slide-page2"))
const SlidePage3 = lazy(() => import("./slide-page3"))
const SlidePage4 = lazy(() => import("./slide-page4"))
const SlidePage5 = lazy(() => import("./slide-page5"))
const SlidePage6 = lazy(() => import("./slide-page6"))
const SlidePage7 = lazy(() => import("./slide-page7"))
const SlidePage8 = lazy(() => import("./slide-page8"))
const SlidePage9 = lazy(() => import("./slide-page9"))
const SlidePage10 = lazy(() => import("./slide-page10"))
const SlidePage11 = lazy(() => import("./slide-page11"))
const SlidePage12 = lazy(() => import("./slide-page12"))
const SlidePage13 = lazy(() => import("./slide-page13"))
const SlideAiPlatformOverview = lazy(
  () => import("./slide-ai-platform-overview")
)
const SlidePage14 = lazy(() => import("./slide-page14"))
const SlidePage15 = lazy(() => import("./slide-page15"))
const SlidePage16 = lazy(() => import("./slide-page16"))
const SlidePage17 = lazy(() => import("./slide-page17"))
const SlidePage18 = lazy(() => import("./slide-page18"))
const SlidePage19 = lazy(() => import("./slide-page19"))
const SlidePage20 = lazy(() => import("./slide-page20"))
const SlidePage21 = lazy(() => import("./slide-page21"))
const SlideStoryboardVideoSkill = lazy(
  () => import("./slide-storyboard-video-skill")
)
const SlidePage22 = lazy(() => import("./slide-page22"))
const SlideIfStudio = lazy(() => import("./slide-if-studio"))
const SlideIfStudioInsights = lazy(() => import("./slide-if-studio-insights"))
const SlideIfStudioSkills = lazy(() => import("./slide-if-studio-skills"))
const SlideIfStudioCapabilities = lazy(
  () => import("./slide-if-studio-capabilities")
)
const SlideOtherCreativeProjects = lazy(
  () => import("./slide-other-creative-projects")
)
const SlideOtherAgentProjects = lazy(
  () => import("./slide-other-agent-projects")
)
const SlideOtherSearchProjects = lazy(
  () => import("./slide-other-search-projects")
)
const SlidePage27 = lazy(() => import("./slide-page27"))
const SlideVideoUserJourney = lazy(() => import("./slide-video-user-journey"))
const SlideVideoRecommendationUpload = lazy(
  () => import("./slide-video-recommendation-upload")
)
const SlideVideoConcurrentTasks = lazy(
  () => import("./slide-video-concurrent-tasks")
)
const SlideVideoContextSystem = lazy(
  () => import("./slide-video-context-system")
)
const SlideVideoTemplateRemix = lazy(
  () => import("./slide-video-template-remix")
)
const SlideVideoEntryExperience = lazy(
  () => import("./slide-video-entry-experience")
)
const SlideVideoAsyncLoop = lazy(() => import("./slide-video-async-loop"))
const SlidePage28 = lazy(() => import("./slide-page28"))
const SlidePage29 = lazy(() => import("./slide-page29"))
const SlidePage30 = lazy(() => import("./slide-page30"))
const SlidePage31 = lazy(() => import("./slide-page31"))
const SlidePage32 = lazy(() => import("./slide-page32"))
const SlideVideoFuture = lazy(() => import("./slide-video-workflow"))

const allSlideComponents = [
  ObservatoryCover,
  SlideContent0,
  SlideIfStudio,
  SlideIfStudioInsights,
  SlideIfStudioCapabilities,
  SlideIfStudioSkills,
  SlidePage13,
  SlideStoryboardVideoSkill,
  SlidePage21,
  SlideAiPlatformOverview,
  SlidePage14,
  SlidePage15,
  SlidePage16,
  SlidePage17,
  SlidePage18,
  SlidePage19,
  SlidePage20,
  SlidePage22,
  SlidePage27,
  SlideVideoUserJourney,
  SlideVideoRecommendationUpload,
  SlideVideoConcurrentTasks,
  SlideVideoContextSystem,
  SlideVideoTemplateRemix,
  SlideVideoEntryExperience,
  SlideVideoAsyncLoop,
  SlidePage31,
  SlidePage28,
  SlidePage29,
  SlidePage30,
  SlideVideoFuture,
  SlidePage32,
  SlidePage0a,
  SlidePage0b,
  SlidePage0c,
  SlidePage0d,
  SlidePage0e,
  SlidePage0f,
  SlidePage0g,
  SlidePage4b,
  SlidePage0,
  SlidePage1,
  SlidePage2,
  SlidePage3,
  SlidePage4,
  SlidePage5,
  SlidePage6,
  SlidePage7,
  SlidePage8,
  SlidePage9,
  SlidePage10,
  SlidePage11,
  SlidePage12,
  SlideOtherCreativeProjects,
  SlideOtherAgentProjects,
  SlideOtherSearchProjects,
]
/** 懒加载 fallback：与幻灯片背景色一致的纯黑占位，避免白闪 */
function SlideFallback() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#070707" }} />
  )
}

const visibleSlideEntries = allSlideIds
  .map((id, index) => ({ id, index, Component: allSlideComponents[index] }))
  .filter((entry) => !HIDDEN_SLIDE_IDS.has(entry.id))

const slideComponents = visibleSlideEntries.map((entry) => entry.Component)
const slideIds = visibleSlideEntries.map((entry) => entry.id)
const numberedSlidePaths = slideIds.map(
  (_, index) => `/${String(index + 1).padStart(2, "0")}`
)

function getNumberedSlideIndex(pathname: string) {
  const match = pathname.match(/^\/(\d{2})\/?$/)
  if (!match) return -1
  const index = Number(match[1]) - 1
  return index >= 0 && index < slideIds.length ? index : -1
}

/** 封面导航等使用的逻辑页码 → 实际渲染索引 */
function toVisibleSlideIndex(logicalIndex: number) {
  return visibleSlideEntries.findIndex((entry) => entry.index === logicalIndex)
}

const SWIPE_THRESHOLD = 48
const SWIPE_VELOCITY = 280
const WHEEL_DELTA_TRIGGER = 22
/** 连续 wheel 事件静止到此时长后，才视为下一次独立手势。 */
const WHEEL_GESTURE_END_MS = 180

/** 整页纵向长滚动的幻灯片：触屏上由原生滚动接管，滚到边界后再滑动才翻页 */
const SCROLL_SLIDES = new Set(["page3"])
/** 禁用 framer drag 的幻灯片：
    - content0/page0e/page0f：有内部点击交互，防止 drag 拦截 click；
    - SCROLL_SLIDES（page3 等长滚动页）：framer drag 会给容器设
      touch-action: pan-x，浏览器按祖先链交集判定手势，内部内容在触屏上
      将无法原生滚动；禁用后由原生滚动 + 触摸边界翻页逻辑接管。 */
const NO_DRAG_SLIDES = new Set([
  "content0",
  "page0e",
  "page0f",
  "ai-platform-overview",
  "if-studio-skills",
  "storyboard-video-skill",
  "if-studio-capabilities",
  ...SCROLL_SLIDES,
])
const DESIGN_WIDTH = SLIDE_DESIGN_WIDTH
const DESIGN_HEIGHT = SLIDE_DESIGN_HEIGHT

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
}

// 先慢后快：ease-in cubic-bezier，初速为 0，逐渐加速冲入
const EASE_OUT_FAST: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Cinema "punch-in": cover ↔ content0 (index 0 ↔ 1)
// 封面像被镜头急速推近后穿入，content0 从放大淡入归位——
// 去掉 blur filter（GPU 代价过高），用 opacity + scale 营造同等冲击感。
const cinemaVariants = {
  enter: (_direction: number) => ({ x: 0, opacity: 0, scale: 1.4 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (_direction: number) => ({ x: 0, opacity: 0, scale: 1.4 }),
}

const CINEMA_EASE: [number, number, number, number] = [0.85, 0, 0.15, 1]

/** 转场覆盖层：电影快门向内收拢 + 胶片边框急速飞入定格，全程 pointer-events:none，不影响任何幻灯片内部布局 */
function CinemaFrameReveal() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* 上快门：从完全闭合（中线即那条线）直接拉开 */}
      <motion.div
        initial={{ height: "50%" }}
        animate={{ height: "0%" }}
        transition={{ duration: 0.6, ease: CINEMA_EASE }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: "#000",
        }}
      />
      {/* 下快门 */}
      <motion.div
        initial={{ height: "50%" }}
        animate={{ height: "0%" }}
        transition={{ duration: 0.6, ease: CINEMA_EASE }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#000",
        }}
      />
      {/* 胶片边框：快门拉开后飞入定格，闪一下淡出，交棒给 content0 自带的四角框 */}
      <motion.div
        initial={{ scale: 1.16, opacity: 0 }}
        animate={{ scale: 1, opacity: [0, 0.9, 0] }}
        transition={{
          duration: 0.8,
          ease: CINEMA_EASE,
          delay: 0.34,
          times: [0, 0.5, 1],
        }}
        style={{
          position: "absolute",
          inset: 26,
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow:
            "0 0 36px rgba(255,255,255,0.18), inset 0 0 60px rgba(0,0,0,0.4)",
        }}
      />
    </motion.div>
  )
}

export default function SlideContainer({
  initialSlide = 0,
}: {
  initialSlide?: number
}) {
  const [[current, direction], setCurrent] = useState(() => [initialSlide, 0])
  const [isMobilePortrait, setIsMobilePortrait] = useState(false)
  /** iPad / 手机等以触屏为主的设备：不用 Framer drag，改由 touch 手势翻页 */
  const [isTouchPrimary, setIsTouchPrimary] = useState(false)
  // fitScale only needed by slide-fit-shell; slide-container uses pure-CSS CQ scaling.
  const stageRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // 仅在「封面 → content0」时播放电影边框收拢转场（key 自增触发重挂载重播）
  const [cinemaRevealKey, setCinemaRevealKey] = useState(0)
  const prevCurrentRef = useRef(current)
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef(1)
  const prefetchedImportsRef = useRef<Set<number>>(new Set())
  const gestureRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    direction: null as "x" | "y" | null,
    startScrollTop: 0,
    lastX: 0,
    lastTime: 0,
  })
  const momentumRef = useRef<number>(0)
  const wheelAccumRef = useRef(0)
  const wheelGestureLockedRef = useRef(false)
  const wheelScrollConsumedRef = useRef(false)
  const wheelLastEventAtRef = useRef(0)
  const wheelEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tapRef = useRef({ x: 0, y: 0, t: 0 })

  /* 锁定作品集的文档视口。iPad Safari 的 scrollIntoView、橡皮筋滚动和
     visual viewport 调整可能会移动 fixed 画布所在的布局视口，表现为整页
     向右偏移。内部需要滚动的区域仍由各自的 overflow 容器负责。 */
  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      htmlWidth: html.style.width,
      htmlHeight: html.style.height,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyInset: body.style.inset,
      bodyWidth: body.style.width,
      bodyHeight: body.style.height,
    }

    html.style.overflow = "hidden"
    html.style.overscrollBehavior = "none"
    html.style.width = "100%"
    html.style.height = "100%"
    body.style.overflow = "hidden"
    body.style.overscrollBehavior = "none"
    body.style.position = "fixed"
    body.style.inset = "0"
    body.style.width = "100%"
    body.style.height = "100%"
    window.scrollTo(0, 0)

    return () => {
      html.style.overflow = previous.htmlOverflow
      html.style.overscrollBehavior = previous.htmlOverscroll
      html.style.width = previous.htmlWidth
      html.style.height = previous.htmlHeight
      body.style.overflow = previous.bodyOverflow
      body.style.overscrollBehavior = previous.bodyOverscroll
      body.style.position = previous.bodyPosition
      body.style.inset = previous.bodyInset
      body.style.width = previous.bodyWidth
      body.style.height = previous.bodyHeight
    }
  }, [])

  useLayoutEffect(() => {
    const portraitMq = window.matchMedia(
      "(max-width: 640px) and (orientation: portrait)"
    )
    const coarseMq = window.matchMedia("(pointer: coarse)")
    const noHoverMq = window.matchMedia("(hover: none)")
    const root = rootRef.current
    if (!root) return

    const updateTouchPrimary = () => {
      setIsTouchPrimary(coarseMq.matches || noHoverMq.matches)
    }

    const update = () => {
      const matches = portraitMq.matches
      setIsMobilePortrait(matches)
      updateTouchPrimary()

      document.documentElement.style.setProperty(
        "--slide-design-w",
        `${DESIGN_WIDTH}px`
      )
      document.documentElement.style.setProperty(
        "--slide-design-h",
        `${DESIGN_HEIGHT}px`
      )

      const viewportWidth = window.visualViewport?.width ?? window.innerWidth
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      document.documentElement.style.setProperty(
        "--slide-vw",
        `${viewportWidth}px`
      )
      document.documentElement.style.setProperty(
        "--slide-vh",
        `${viewportHeight}px`
      )

      if (matches) {
        const { width, height } = measureFitStage(root)
        zoomRef.current = Math.min(height / DESIGN_WIDTH, width / DESIGN_HEIGHT)
        const offsetX = Math.max(
          (height - DESIGN_WIDTH * zoomRef.current) / 2,
          0
        )
        document.documentElement.style.setProperty(
          "--slide-zoom",
          String(zoomRef.current)
        )
        document.documentElement.style.setProperty(
          "--slide-offset-x",
          `${offsetX}px`
        )
      } else {
        const { width, height } = measureFitStage(root)
        document.documentElement.style.setProperty(
          "--slide-fit-scale",
          String(computeSlideFitScale(width, height))
        )
        zoomRef.current = 1
        document.documentElement.style.removeProperty("--slide-zoom")
        document.documentElement.style.removeProperty("--slide-offset-x")
      }
    }

    update()
    updateTouchPrimary()
    const initialRaf = requestAnimationFrame(update)
    const ro = new ResizeObserver(update)
    ro.observe(root)
    if (root.parentElement) ro.observe(root.parentElement)
    portraitMq.addEventListener("change", update)
    coarseMq.addEventListener("change", updateTouchPrimary)
    noHoverMq.addEventListener("change", updateTouchPrimary)
    window.addEventListener("resize", update)
    window.visualViewport?.addEventListener("resize", update)
    window.visualViewport?.addEventListener("scroll", update)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(initialRaf)
      portraitMq.removeEventListener("change", update)
      coarseMq.removeEventListener("change", updateTouchPrimary)
      noHoverMq.removeEventListener("change", updateTouchPrimary)
      window.removeEventListener("resize", update)
      window.visualViewport?.removeEventListener("resize", update)
      window.visualViewport?.removeEventListener("scroll", update)
      document.documentElement.style.removeProperty("--slide-zoom")
      document.documentElement.style.removeProperty("--slide-offset-x")
      document.documentElement.style.removeProperty("--slide-design-w")
      document.documentElement.style.removeProperty("--slide-design-h")
      document.documentElement.style.removeProperty("--slide-fit-scale")
      document.documentElement.style.removeProperty("--slide-vw")
      document.documentElement.style.removeProperty("--slide-vh")
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const handleImageError = (event: Event) => {
      const target = event.target
      if (!(target instanceof HTMLImageElement)) return
      target.dataset.assetError = "true"
      target.style.opacity = "0"
      target.style.background = "rgba(255,255,255,0.06)"
    }

    root.addEventListener("error", handleImageError, true)
    return () => root.removeEventListener("error", handleImageError, true)
  }, [])

  const paginate = useCallback((newDirection: number) => {
    setCurrent((previous) => {
      const next = previous[0] + newDirection
      if (next < 0 || next >= slideComponents.length) return previous
      return [next, newDirection]
    })
  }, [])

  /* ── 触屏滑动翻页：内部可滚动页面（如 page3 长页）────────────────────
     这类页面上触摸会被浏览器原生滚动接管，framer drag 收到 pointercancel
     而失效。镜像滚轮逻辑：手势起点在可滚动区域内、且该区域已到底/到顶时，
     上/下滑动翻页；未到边界则交给原生滚动。非滚动页面交给 framer drag，
     避免双重翻页。 */
  const scrollTouchRef = useRef({
    x: 0,
    y: 0,
    t: 0,
    scrollEl: null as HTMLElement | null,
    atTop: true,
    atBottom: true,
  })

  const findScrollableAncestor = useCallback(
    (start: HTMLElement | null, boundary: HTMLElement) => {
      let node: HTMLElement | null = start
      while (node && node !== boundary && node !== document.body) {
        const { overflowY } = getComputedStyle(node)
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          node.scrollHeight > node.clientHeight + 1
        ) {
          return node
        }
        node = node.parentElement
      }
      return null
    },
    []
  )

  const handleScrollAreaTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]
      const el = findScrollableAncestor(
        e.target as HTMLElement,
        e.currentTarget as HTMLElement
      )
      scrollTouchRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        t: Date.now(),
        scrollEl: el,
        atTop: el ? el.scrollTop <= 0 : true,
        atBottom: el
          ? el.scrollTop + el.clientHeight >= el.scrollHeight - 1
          : true,
      }
    },
    [findScrollableAncestor]
  )

  const handleScrollAreaTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const g = scrollTouchRef.current
      if (slideIds[current] === "cover") return
      const touch = e.changedTouches[0]
      const dy = touch.clientY - g.y
      const dx = touch.clientX - g.x
      if (Math.abs(dy) <= Math.abs(dx)) return // 横向手势
      const dt = Math.max(1, Date.now() - g.t)
      const vy = (Math.abs(dy) / dt) * 1000
      if (Math.abs(dy) < SWIPE_THRESHOLD && vy < SWIPE_VELOCITY) return
      if (!g.scrollEl) {
        if (dy < 0) paginate(1)
        else paginate(-1)
      } else if (dy < 0 && g.atBottom) {
        paginate(1)
      } else if (dy > 0 && g.atTop) {
        paginate(-1)
      }
    },
    [current, paginate]
  )

  /* ── 触屏轻点翻页（iPad 等无滚轮设备）────────────────────────────────
     判定为「轻点」= 位移 < 10px 且时长 < 350ms。命中交互元素（链接、按钮、
     cursor:pointer/grab 的可点击/可拖拽区域、可滚动区域）时不翻页。 */
  const isInteractiveTarget = useCallback(
    (start: HTMLElement | null, boundary: HTMLElement) => {
      let node: HTMLElement | null = start
      while (node && node !== boundary && node !== document.body) {
        const tag = node.tagName
        if (
          tag === "A" ||
          tag === "BUTTON" ||
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          tag === "LABEL" ||
          tag === "AUDIO" ||
          tag === "VIDEO" ||
          node.isContentEditable ||
          node.getAttribute("role") === "button" ||
          node.getAttribute("role") === "link" ||
          node.getAttribute("role") === "slider"
        ) {
          return true
        }
        const styles = getComputedStyle(node)
        /* 只排除 cursor:pointer（真实可点击元素）。cursor 会被继承，而
         .slide-inner 全局是 grab —— 若把 grab 也算交互，整页都无法轻点翻页。
         拖拽类区域由「位移 >10px 不算轻点」的判定保护，无需在此排除。 */
        if (styles.cursor === "pointer") return true
        const { overflowY, overflowX } = styles
        if (
          ((overflowY === "auto" || overflowY === "scroll") &&
            node.scrollHeight > node.clientHeight + 1) ||
          ((overflowX === "auto" || overflowX === "scroll") &&
            node.scrollWidth > node.clientWidth + 1)
        ) {
          return true
        }
        node = node.parentElement
      }
      return false
    },
    []
  )

  const handleTapPointerDown = useCallback((e: React.PointerEvent) => {
    tapRef.current = { x: e.clientX, y: e.clientY, t: Date.now() }
  }, [])

  const handleTapPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") return // 桌面鼠标行为保持不变
      if (slideIds[current] === "cover") return // 封面有自己的进入交互
      const tap = tapRef.current
      const moved = Math.hypot(e.clientX - tap.x, e.clientY - tap.y)
      if (moved > 10 || Date.now() - tap.t > 350) return // 是拖拽/长按，不是轻点
      if (
        isInteractiveTarget(
          e.target as HTMLElement,
          e.currentTarget as HTMLElement
        )
      )
        return
      paginate(1)
    },
    [current, paginate, isInteractiveTarget]
  )

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    /* 只接受纵向手势翻页：以横向为主的滑动（左右滑）一律忽略 */
    if (Math.abs(offset.x) > Math.abs(offset.y)) return
    if (offset.y < -SWIPE_THRESHOLD || velocity.y < -SWIPE_VELOCITY) {
      paginate(1)
    } else if (offset.y > SWIPE_THRESHOLD || velocity.y > SWIPE_VELOCITY) {
      paginate(-1)
    }
  }

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    cancelAnimationFrame(momentumRef.current)
    gestureRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now(),
      direction: null,
      startScrollTop: scrollRef.current?.scrollTop ?? 0,
      lastX: e.touches[0].clientX,
      lastTime: Date.now(),
    }
  }, [])

  const getMaxScroll = useCallback(() => {
    if (!scrollRef.current) return 0
    const viewH = scrollRef.current.clientHeight
    const visibleContentH = 900 * zoomRef.current
    return Math.max(visibleContentH - viewH, 0)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const g = gestureRef.current
      const cx = e.touches[0].clientX
      const cy = e.touches[0].clientY
      const dx = cx - g.startX
      const dy = cy - g.startY

      if (!g.direction) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          g.direction = Math.abs(dx) > Math.abs(dy) ? "x" : "y"
        } else {
          return
        }
      }

      if (g.direction === "x" && scrollRef.current) {
        const el = scrollRef.current
        const maxScroll = getMaxScroll()
        el.scrollTop = Math.max(0, Math.min(maxScroll, g.startScrollTop + dx))
        g.lastX = cx
        g.lastTime = Date.now()
        e.preventDefault()
      }
    },
    [getMaxScroll]
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const g = gestureRef.current

      if (g.direction === "y") {
        const dy = e.changedTouches[0].clientY - g.startY
        const dt = Date.now() - g.startTime
        const vy = (Math.abs(dy) / dt) * 1000
        if (Math.abs(dy) > SWIPE_THRESHOLD || vy > SWIPE_VELOCITY) {
          if (dy < 0) paginate(1)
          else paginate(-1)
        }
      }

      if (g.direction === "x" && scrollRef.current) {
        const dx = e.changedTouches[0].clientX - g.lastX
        const dt = Math.max(1, Date.now() - g.lastTime)
        let velocity = (dx / dt) * 12
        const el = scrollRef.current
        const maxScroll = getMaxScroll()
        const decay = () => {
          if (Math.abs(velocity) < 0.5 || !scrollRef.current) return
          el.scrollTop = Math.max(
            0,
            Math.min(maxScroll, el.scrollTop + velocity)
          )
          velocity *= 0.94
          momentumRef.current = requestAnimationFrame(decay)
        }
        momentumRef.current = requestAnimationFrame(decay)
      }
    },
    [paginate, getMaxScroll]
  )

  /* Safari（iPad/iPhone）保险：iOS 会忽略 user-scalable=no，且部分版本的
     捏合手势走独立的 gesturestart 事件、绕过 touch-action。一旦意外缩放，
     visual viewport 被放大平移（画面偏移、滑动手势被视口平移吞掉，只能刷新恢复）。
     在幻灯片场景下直接阻止该手势。 */
  useEffect(() => {
    const preventGesture = (e: Event) => e.preventDefault()
    document.addEventListener("gesturestart", preventGesture, {
      passive: false,
    })
    document.addEventListener("gesturechange", preventGesture, {
      passive: false,
    })
    return () => {
      document.removeEventListener("gesturestart", preventGesture)
      document.removeEventListener("gesturechange", preventGesture)
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") paginate(1)
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") paginate(-1)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [paginate])

  // Wheel event: 所有幻灯片（除 cover）均通过滚轮上下翻页
  useEffect(() => {
    const finishWheelGesture = () => {
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current)
      wheelAccumRef.current = 0
      wheelGestureLockedRef.current = false
      wheelScrollConsumedRef.current = false
      wheelLastEventAtRef.current = 0
      wheelEndTimerRef.current = null
    }

    const scheduleGestureEnd = () => {
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current)
      wheelEndTimerRef.current = setTimeout(
        finishWheelGesture,
        WHEEL_GESTURE_END_MS
      )
    }

    const handleWheel = (e: WheelEvent) => {
      const curId = slideIds[current]
      // cover 页面保留原有行为，不拦截
      if (curId === "cover") return

      const now = performance.now()
      if (now - wheelLastEventAtRef.current > WHEEL_GESTURE_END_MS) {
        finishWheelGesture()
      }
      wheelLastEventAtRef.current = now
      scheduleGestureEnd()

      /* 一次触控板/Magic Mouse 惯性手势只允许翻一页。转场后的残余
         wheel 事件会继续延后手势结束时间，但不会触发下一页。 */
      if (wheelGestureLockedRef.current) {
        e.preventDefault()
        return
      }

      // 优先让内部可滚动区域（如截图区）消费滚轮
      let node = e.target as HTMLElement | null
      while (node && node !== document.body) {
        const { overflowY } = getComputedStyle(node)
        const scrollable =
          (overflowY === "auto" || overflowY === "scroll") &&
          node.scrollHeight > node.clientHeight + 1
        if (scrollable) {
          const atTop = node.scrollTop <= 0
          const atBottom =
            node.scrollTop + node.clientHeight >= node.scrollHeight - 1
          if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
            wheelScrollConsumedRef.current = true
            wheelAccumRef.current = 0
            return
          }
          /* 同一次手势已经滚动过内部区域时，即使惯性将它推到边界，也不
             接力触发整页翻页；用户停下后再次滚动才会翻页。 */
          if (wheelScrollConsumedRef.current) {
            wheelAccumRef.current = 0
            e.preventDefault()
            return
          }
        }
        node = node.parentElement
      }

      /* 触控板/Magic Mouse 单次 delta 很小，累积后再判定翻页 */
      wheelAccumRef.current += e.deltaY
      if (Math.abs(wheelAccumRef.current) < WHEEL_DELTA_TRIGGER) return

      e.preventDefault()
      const dir = wheelAccumRef.current > 0 ? 1 : -1
      wheelAccumRef.current = 0
      wheelGestureLockedRef.current = true
      paginate(dir)
    }
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current)
    }
  }, [current, paginate])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    // 数字路由进入时同步 /01、/02...；旧 /port 入口仍保留 hash 行为。
    if (getNumberedSlideIndex(window.location.pathname) >= 0) {
      window.history.replaceState(null, "", numberedSlidePaths[current])
      return
    }
    const id = slideIds[current]
    if (id) window.history.replaceState(null, "", `#${id}`)
  }, [current])

  useEffect(() => {
    const adjacent = [current + 1, current - 1]
      .filter((index) => index >= 0 && index < slideIds.length)
      .map((index) => slideIds[index])

    const decode = async () => {
      for (const slideId of adjacent) {
        await predecodeSlideImages(slideId)
      }
    }

    if (typeof requestIdleCallback !== "undefined") {
      const idleId = requestIdleCallback(() => void decode(), { timeout: 1200 })
      return () => cancelIdleCallback(idleId)
    }

    const timer = window.setTimeout(() => void decode(), 160)
    return () => window.clearTimeout(timer)
  }, [current])

  // 进入 content0 且来自封面时，触发电影边框收拢转场
  useEffect(() => {
    const prev = prevCurrentRef.current
    prevCurrentRef.current = current
    if (reduceMotion) return
    if (slideIds[current] === "content0" && slideIds[prev] === "cover") {
      setCinemaRevealKey((k) => k + 1)
    }
  }, [current, reduceMotion])

  const handleEnter = useCallback(() => {
    const next = toVisibleSlideIndex(1)
    if (next >= 0) setCurrent([next, 1])
  }, [])

  const handleNavigate = useCallback(
    (logicalIndex: number) => {
      const visibleIndex = toVisibleSlideIndex(logicalIndex)
      if (visibleIndex < 0) return
      const dir = visibleIndex > current ? 1 : -1
      setCurrent([visibleIndex, dir])
    },
    [current]
  )

  // ——— 轻量预取策略：只预热当前附近页面，避免外部冷启动时解析完整作品集 ———
  useEffect(() => {
    const preloadPolicy = getSlidePreloadPolicy()

    // 与 allSlideIds 一一对应，避免隐藏页面导致可见序号与资源序号错位。
    const allImports: Array<() => Promise<unknown>> = [
      () => import("../observatory-cover"),
      () => import("./slide-content0"),
      () => import("./slide-if-studio"),
      () => import("./slide-if-studio-insights"),
      () => import("./slide-if-studio-capabilities"),
      () => import("./slide-if-studio-skills"),
      () => import("./slide-page13"),
      () => import("./slide-storyboard-video-skill"),
      () => import("./slide-page21"),
      () => import("./slide-ai-platform-overview"),
      () => import("./slide-page14"),
      () => import("./slide-page15"),
      () => import("./slide-page16"),
      () => import("./slide-page17"),
      () => import("./slide-page18"),
      () => import("./slide-page19"),
      () => import("./slide-page20"),
      () => import("./slide-page22"),
      () => import("./slide-page27"),
      () => import("./slide-video-user-journey"),
      () => import("./slide-video-recommendation-upload"),
      () => import("./slide-video-concurrent-tasks"),
      () => import("./slide-video-context-system"),
      () => import("./slide-video-template-remix"),
      () => import("./slide-video-entry-experience"),
      () => import("./slide-video-async-loop"),
      () => import("./slide-page31"),
      () => import("./slide-page28"),
      () => import("./slide-page29"),
      () => import("./slide-page30"),
      () => import("./slide-video-workflow"),
      () => import("./slide-page32"),
      () => import("./slide-page0a"),
      () => import("./slide-page0b"),
      () => import("./slide-page0c"),
      () => import("./slide-page0d"),
      () => import("./slide-page0e"),
      () => import("./slide-page0f"),
      () => import("./slide-page0g"),
      () => import("./slide-page4b"),
      () => import("./slide-page0"),
      () => import("./slide-page1"),
      () => import("./slide-page2"),
      () => import("./slide-page3"),
      () => import("./slide-page4"),
      () => import("./slide-page5"),
      () => import("./slide-page6"),
      () => import("./slide-page7"),
      () => import("./slide-page8"),
      () => import("./slide-page9"),
      () => import("./slide-page10"),
      () => import("./slide-page11"),
      () => import("./slide-page12"),
      () => import("./slide-other-creative-projects"),
      () => import("./slide-other-agent-projects"),
      () => import("./slide-other-search-projects"),
    ]

    // content0 中项目卡片可跳转的逻辑页，进入目录后延迟预热。
    const JUMP_TARGETS = [2, 6, 18, 32, 41].filter(
      (i) => i >= 0 && i < allImports.length
    )

    const loaded = prefetchedImportsRef.current
    let cancelled = false
    const timers = new Set<number>()
    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer)
        if (!cancelled) callback()
      }, delay)
      timers.add(timer)
    }
    const runSequential = (
      indices: number[],
      delay: number,
      interval: number
    ) => {
      let i = 0
      const run = () => {
        if (cancelled) return
        while (i < indices.length && loaded.has(indices[i])) i++
        if (i >= indices.length) return
        const idx = indices[i++]
        loaded.add(idx)
        allImports[idx]().finally(() => {
          if (cancelled) return
          if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(run, { timeout: interval })
          } else {
            schedule(run, interval)
          }
        })
      }
      if (delay > 0) {
        schedule(() => {
          if (typeof requestIdleCallback !== "undefined")
            requestIdleCallback(run, { timeout: interval })
          else run()
        }, delay)
      } else {
        if (typeof requestIdleCallback !== "undefined")
          requestIdleCallback(run, { timeout: interval })
        else schedule(run, 50)
      }
    }

    // 只预取当前前后 1 页；用户确实进入封面/content0 后，再延后预热可点击跳转目标。
    const nearVisibleIndices =
      preloadPolicy.assetLimit === 0
        ? [current + 1]
        : [current + 1, current - 1]
    const near = Array.from(new Set(nearVisibleIndices))
      .filter(
        (visibleIndex) => visibleIndex >= 0 && visibleIndex < slideIds.length
      )
      .map((visibleIndex) => allSlideIds.indexOf(slideIds[visibleIndex]))
      .filter((index) => index >= 0 && index < allImports.length)
    runSequential(near, 0, 900)

    if (current === 1 && preloadPolicy.allowJumpPrefetch) {
      runSequential(JUMP_TARGETS, 2400, 1200)
    }

    return () => {
      cancelled = true
      timers.forEach((timer) => window.clearTimeout(timer))
      timers.clear()
    }
  }, [current])

  // page0d 图标较多：在用户翻到 page0c 时提前预热本地资源
  useEffect(() => {
    const id = slideIds[current]
    if (id === "page0c" || id === "page0d") {
      preloadPage0dImages()
    }
  }, [current])

  const Slide = slideComponents[current]
  const slideProps =
    current <= 1 ? { onEnter: handleEnter, onNavigate: handleNavigate } : {}
  const noDrag = NO_DRAG_SLIDES.has(slideIds[current])
  const disableFramerDrag = isMobilePortrait || noDrag || isTouchPrimary

  return (
    <>
      <style>{`
        .slide-root { --u: calc(${DESIGN_WIDTH}px / 100); }
        /* touch-action 不可继承，需覆盖到所有后代。
           pan-x pan-y：保留滑动/滚动手势，同时禁用双击缩放 *和* 捏合缩放——
           iOS Safari 会忽略 user-scalable=no，而 manipulation 仍允许 pinch-zoom，
           偶然的双指触碰会把页面放大并平移到一侧（表现为"画面偏右、无法翻页"）。
           内联设置了 touch-action 的元素（轮播 none / 标签页 pan-y）优先级更高，不受影响。 */
        .slide-root, .slide-root * { touch-action: pan-x pan-y; }
        @media (min-width: 641px), (orientation: landscape) {
          .slide-root {
            position: fixed;
            inset: 0;
            width: 100vw;
            width: 100dvw;
            height: 100vh;
            height: 100dvh;
            max-width: 100%;
            max-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            overflow: hidden;
            overscroll-behavior: none;
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
            /* JS measures the actual visual viewport and writes a unitless scale.
               This avoids container-unit rounding and transform flicker in WebKit. */
            transform: translateZ(0) scale(var(--slide-fit-scale, 1));
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            contain: layout paint style;
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
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            /* 覆盖 .slide-root * { pan-x pan-y }，否则 iOS Safari 会吞掉纵向手势 */
            touch-action: none;
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
            width: var(--slide-vh, 100vh) !important;
            height: var(--slide-vw, 100vw) !important;
            background: #000 !important;
            overflow: hidden !important;
          }
          .slide-inner {
            position: absolute !important;
            inset: 0 !important;
            width: var(--slide-vh, 100vh) !important;
            height: var(--slide-vw, 100vw) !important;
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
            height: ${DESIGN_HEIGHT}px !important;
            min-height: ${DESIGN_HEIGHT}px !important;
            transform: translateX(var(--slide-offset-x, 0px)) scale(var(--slide-zoom, 1)) !important;
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
            isMobilePortrait ? undefined : { width: "100%", height: "100%" }
          }
        >
          <div
            className={isMobilePortrait ? "slide-canvas" : "slide-fit-box"}
            style={
              isMobilePortrait
                ? {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transform: "none",
                  }
                : undefined
            }
          >
            <div className="slide-canvas">
              {/* cover(0) ↔ content0(1) 用电影快门；其余所有页面统一用上下滑动 + 先慢后快曲线 */}
              {(() => {
                const prevSlide = current - direction
                const isCinema =
                  !reduceMotion &&
                  direction !== 0 &&
                  Math.min(current, prevSlide) === 0 &&
                  Math.max(current, prevSlide) === 1
                const activeVariants = isCinema ? cinemaVariants : variants
                const activeTransition = reduceMotion
                  ? { duration: 0 }
                  : isCinema
                    ? { duration: 0.9, ease: CINEMA_EASE }
                    : { duration: 0.34, ease: EASE_OUT_FAST }
                return (
                  <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="popLayout"
                  >
                    <motion.div
                      key={slideIds[current]}
                      custom={direction}
                      variants={activeVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={activeTransition}
                      drag={disableFramerDrag ? false : "y"}
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={0.15}
                      onDragEnd={disableFramerDrag ? undefined : handleDragEnd}
                      className="slide-inner absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
                      onTouchStart={
                        isMobilePortrait
                          ? handleTouchStart
                          : handleScrollAreaTouchStart
                      }
                      onTouchMove={
                        isMobilePortrait ? handleTouchMove : undefined
                      }
                      onTouchEnd={
                        isMobilePortrait
                          ? handleTouchEnd
                          : handleScrollAreaTouchEnd
                      }
                      onPointerDown={handleTapPointerDown}
                      onPointerUp={handleTapPointerUp}
                    >
                      <div
                        ref={scrollRef}
                        className="slide-scroll h-full w-full"
                      >
                        <Suspense fallback={<SlideFallback />}>
                          <Slide {...slideProps} />
                        </Suspense>
                      </div>
                      {current > 0 && <SlideCornerMarks />}
                    </motion.div>
                  </AnimatePresence>
                )
              })()}

              {/* 电影边框收拢转场覆盖层（仅封面 → content0 触发，叠在幻灯片之上、不参与布局） */}
              {cinemaRevealKey > 0 && (
                <CinemaFrameReveal key={cinemaRevealKey} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
