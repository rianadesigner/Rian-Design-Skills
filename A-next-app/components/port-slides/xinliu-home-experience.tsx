"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
import styles from "./xinliu-home-experience.module.css"
import { XinliuFullscreenPanel as CapabilitySheet } from "./xinliu-fullscreen-panel"
import type { FullscreenCapability } from "./xinliu-fullscreen-controls"
import { usePetalRippleDisplacement } from "./petal-ripple-displacement"

// Native 750 × 1612 exports preserve both Figma homepage states.
const SCREENS = {
  search: "/images/page7/figma-home/ai-search-home.png",
  research: "/images/page7/figma-home/research-home.png",
}
export type XinliuHomeMode = keyof typeof SCREENS

export const RESEARCH_CAPABILITIES = [
  {
    id: "web",
    label: "网页专家",
    icon: "/images/page7/figma-home/research-icon-web.svg",
  },
  {
    id: "pdf",
    label: "PDF专家",
    icon: "/images/page7/figma-home/research-icon-pdf.svg",
  },
  {
    id: "ppt",
    label: "PPT专家",
    icon: "/images/page7/figma-home/research-icon-ppt.svg",
  },
  {
    id: "word",
    label: "Word专家",
    icon: "/images/page7/figma-home/research-icon-word.svg",
  },
  {
    id: "excel",
    label: "Excel专家",
    icon: "/images/page7/figma-home/research-icon-excel.svg",
  },
  {
    id: "video",
    label: "视频专家",
    icon: "/images/page7/figma-home/research-icon-video.svg",
  },
] as const satisfies readonly {
  id: FullscreenCapability
  label: string
  icon: string
}[]
const CLEAN_BACKGROUND = "/images/page7/figma-home/clean-background.webp"
const PETAL_SHELL = "/images/page7/figma-home/petal-shell.svg"
const PETAL_CONTOUR =
  "M219.662 363.256C195.461 354.932 122.86 286.256 107.734 243.594C91.6007 199.892 101.684 143.703 128.91 121.851C166.219 92.7162 273.105 92.7162 310.414 121.851C337.639 143.703 347.723 199.892 331.589 243.594C316.464 286.256 243.862 354.932 219.662 363.256Z"
const EASE = [0.22, 1, 0.36, 1] as const
const EXIT_EASE = [0.4, 0, 1, 1] as const

type PetalId = "code" | "translate" | "call" | "write" | "document" | "academic"

const PETALS = [
  {
    id: "code",
    label: "写代码",
    icon: "/images/page7/figma-home/icon-code.svg",
    artLeft: "33.97%",
    artTop: "2.45%",
    rotation: 0,
    labelLeft: "50%",
    labelTop: "10.13%",
    polygon:
      "polygon(33.33% 2.4%, 66.67% 2.4%, 66.67% 12%, 57.33% 40%, 45.73% 40%, 33.33% 12%)",
  },
  {
    id: "translate",
    label: "翻译",
    icon: "/images/page7/figma-home/icon-translate.svg",
    artLeft: "8.03%",
    artTop: "17.42%",
    rotation: -60,
    labelLeft: "21.6%",
    labelTop: "25.07%",
    polygon:
      "polygon(4.67% 14%, 33.33% 12%, 45.73% 40%, 42.67% 48%, 2.67% 48%, 1.07% 34%)",
  },
  {
    id: "call",
    label: "打电话",
    icon: "/images/page7/figma-home/icon-call.svg",
    artLeft: "59.48%",
    artTop: "17.18%",
    rotation: 60,
    labelLeft: "78.67%",
    labelTop: "25.07%",
    polygon:
      "polygon(66.67% 12%, 95.33% 14%, 98.93% 34%, 97.33% 48%, 60.27% 48%, 57.33% 40%)",
  },
  {
    id: "write",
    label: "写作",
    icon: "/images/page7/figma-home/icon-write.svg",
    artLeft: "8.03%",
    artTop: "47.21%",
    rotation: -120,
    labelLeft: "21.6%",
    labelTop: "58.4%",
    polygon:
      "polygon(2.67% 49.33%, 42.67% 49.33%, 45.73% 57.33%, 33.33% 88%, 4.67% 86%, 1.07% 66.67%)",
  },
  {
    id: "document",
    label: "读文档",
    icon: "/images/page7/figma-home/icon-document.svg",
    artLeft: "59.48%",
    artTop: "47.21%",
    rotation: 120,
    labelLeft: "78.67%",
    labelTop: "58.4%",
    polygon:
      "polygon(57.33% 57.33%, 60.27% 49.33%, 97.33% 49.33%, 98.93% 66.67%, 95.33% 86%, 66.67% 88%)",
  },
  {
    id: "academic",
    label: "搜学术",
    icon: "/images/page7/figma-home/icon-knowledge.svg",
    artLeft: "34.04%",
    artTop: "62.45%",
    rotation: 180,
    labelLeft: "50%",
    labelTop: "76.13%",
    polygon:
      "polygon(45.73% 57.33%, 57.33% 57.33%, 66.67% 88%, 66.67% 97.6%, 33.33% 97.6%, 33.33% 88%)",
  },
] as const

const PETAL_COLLAPSE: Record<PetalId, { x: `${number}%`; y: `${number}%` }> = {
  code: { x: "0%", y: "6%" },
  translate: { x: "4.4%", y: "3.4%" },
  call: { x: "-4.4%", y: "3.4%" },
  write: { x: "4.4%", y: "-3.4%" },
  document: { x: "-4.4%", y: "-3.4%" },
  academic: { x: "0%", y: "-6%" },
}

type PetalOrigin = { x: number; y: number; width: number; height: number }

export function XinliuHomeExperience({
  mode,
  onModeChange,
}: {
  mode: XinliuHomeMode
  onModeChange: (mode: XinliuHomeMode) => void
}) {
  const reduceMotion = Boolean(useReducedMotion())
  const screenRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [hovered, setHovered] = useState<PetalId | null>(null)
  const [pointerHovered, setPointerHovered] = useState<PetalId | null>(null)
  const [selected, setSelected] = useState<PetalId | null>(null)
  const [origin, setOrigin] = useState<PetalOrigin | null>(null)
  const screenImage = SCREENS[mode]
  const petals = PETALS.map((petal, index) => {
    const capability =
      mode === "research" ? RESEARCH_CAPABILITIES[index] : petal
    return {
      ...petal,
      capabilityId: capability.id,
      label: capability.label,
      icon: capability.icon,
    }
  })
  const activePetal = petals.find((petal) => petal.id === selected) ?? null

  const changeMode = (nextMode: XinliuHomeMode) => {
    if (selected || nextMode === mode) return
    setHovered(null)
    setPointerHovered(null)
    onModeChange(nextMode)
  }

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [])

  return (
    <div
      ref={screenRef}
      className="relative h-full w-full overflow-hidden"
      style={{ containerType: "inline-size" }}
      data-slide-interactive="true"
      data-petal-state={selected ?? "idle"}
      data-petal-hovered={hovered ?? "none"}
      data-home-mode={mode}
      data-figma-node={mode === "research" ? "37:2666" : "25:2078"}
    >
      <link rel="preload" as="image" href={SCREENS.research} />
      <img
        src={screenImage}
        alt={mode === "research" ? "心流高级研究首页" : "心流 AI 搜索首页"}
        width={750}
        height={1612}
        className="absolute inset-0 block h-full w-full object-cover select-none"
        draggable={false}
      />

      <div
        role="group"
        aria-label="首页模式"
        className={styles.modeSwitch}
        inert={selected !== null}
        aria-hidden={selected ? true : undefined}
      >
        <button
          type="button"
          aria-label="AI搜索"
          aria-pressed={mode === "search"}
          onClick={() => changeMode("search")}
        >
          <span className="sr-only">AI搜索</span>
        </button>
        <button
          type="button"
          aria-label={mode === "research" ? "高级研究" : "深度研究"}
          aria-pressed={mode === "research"}
          onClick={() => changeMode("research")}
        >
          <span className="sr-only">
            {mode === "research" ? "高级研究" : "深度研究"}
          </span>
        </button>
      </div>

      <motion.img
        src={CLEAN_BACKGROUND}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] block h-full w-full object-cover select-none"
        draggable={false}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 19.8%, black 22.1%, black 69.2%, transparent 72.2%)",
          maskImage:
            "linear-gradient(to bottom, transparent 19.8%, black 22.1%, black 69.2%, transparent 72.2%)",
          willChange: "opacity, filter",
        }}
        animate={{
          opacity: selected ? 1 : 0,
          filter: "brightness(1) saturate(1)",
        }}
        transition={
          selected
            ? {
                duration: reduceMotion ? 0 : 0.2,
                delay: reduceMotion ? 0 : 0.025,
                ease: EASE,
              }
            : {
                duration: reduceMotion ? 0 : 0.22,
                delay: reduceMotion ? 0 : 0.13,
                ease: EASE,
              }
        }
      />

      <PetalAmbientLight
        screenImage={screenImage}
        active={!selected}
        pointerHovered={pointerHovered}
        reduceMotion={reduceMotion}
      />

      <div
        className="absolute inset-x-0 z-[2] overflow-hidden"
        style={{ top: "22.46%", height: "46.5261%" }}
      >
        <AnimatePresence>
          {selected &&
            PETALS.map((petal, index) => (
              <motion.div
                key={petal.id}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  clipPath: petal.polygon,
                  transformOrigin: "50% 50%",
                  willChange: "transform, opacity",
                }}
                initial={{ opacity: 1, scale: 1, x: "0%", y: "0%" }}
                animate={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 0.97,
                  x: reduceMotion ? "0%" : PETAL_COLLAPSE[petal.id].x,
                  y: reduceMotion ? "0%" : PETAL_COLLAPSE[petal.id].y,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.24,
                  delay: reduceMotion ? 0 : 0.035 + index * 0.006,
                  ease: EXIT_EASE,
                }}
              >
                <img
                  src={screenImage}
                  alt=""
                  className="absolute left-0 block w-full max-w-none object-cover select-none"
                  style={{ top: "-48.274%", height: "214.9331%" }}
                  draggable={false}
                />
              </motion.div>
            ))}
        </AnimatePresence>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {PETALS.map((petal) => (
            <PetalArtwork
              key={petal.id}
              petal={petal}
              highlighted={
                hovered === petal.id && (reduceMotion || !pointerHovered)
              }
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{ pointerEvents: selected ? "none" : "auto" }}
          aria-hidden={selected ? "true" : undefined}
          inert={selected !== null}
        >
          {petals.map((petal) => (
            <button
              key={petal.id}
              type="button"
              aria-label={`打开${petal.label}`}
              className="absolute inset-0 cursor-pointer border-0 bg-transparent p-0 outline-none"
              style={{ clipPath: petal.polygon }}
              onMouseEnter={() => {
                setHovered(petal.id)
                setPointerHovered(petal.id)
              }}
              onMouseLeave={() => {
                setHovered((current) => (current === petal.id ? null : current))
                setPointerHovered((current) =>
                  current === petal.id ? null : current
                )
              }}
              onFocus={() => setHovered(petal.id)}
              onBlur={() =>
                setHovered((current) => (current === petal.id ? null : current))
              }
              onClick={(event) => {
                const screen = screenRef.current
                if (!screen) return
                triggerRef.current = event.currentTarget
                setOrigin({
                  x:
                    (Number.parseFloat(petal.labelLeft) / 100) *
                    screen.clientWidth,
                  y:
                    (0.2246 +
                      (0.465261 * (Number.parseFloat(petal.labelTop) + 8)) /
                        100) *
                    screen.clientHeight,
                  width: screen.clientWidth,
                  height: screen.clientHeight,
                })
                setHovered(null)
                setPointerHovered(null)
                setSelected(petal.id)
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence
        mode="wait"
        onExitComplete={() =>
          triggerRef.current?.focus({ preventScroll: true })
        }
      >
        {activePetal && origin && (
          <CapabilitySheet
            key={activePetal.id}
            petal={{ ...activePetal, id: activePetal.capabilityId }}
            reduceMotion={reduceMotion}
            origin={origin}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function PetalAmbientLight({
  screenImage,
  active,
  pointerHovered,
  reduceMotion,
}: {
  screenImage: string
  active: boolean
  pointerHovered: PetalId | null
  reduceMotion: boolean
}) {
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden)
    updateVisibility()
    document.addEventListener("visibilitychange", updateVisibility)
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility)
  }, [])

  if (reduceMotion) return null

  const running = active && pageVisible
  const carouselRunning = running && !pointerHovered
  const hoverPetal = PETALS.find((petal) => petal.id === pointerHovered)

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={styles.ambientLight}
        data-petal-light={running ? "flowing" : "paused"}
        style={
          {
            "--light-play-state": running ? "running" : "paused",
          } as CSSProperties
        }
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.2, delay: active ? 0.18 : 0, ease: EASE }}
      >
        <div className={styles.lightField}>
          <div className={styles.lightRiver} />
          <div className={styles.shadowRiver} />
          <div className={styles.warmReflection} />
        </div>
        {PETALS.map((petal) => (
          <div
            key={petal.id}
            className={styles.petalLight}
            style={
              {
                left: petal.artLeft,
                top: petal.artTop,
                transform: `rotate(${petal.rotation}deg)`,
                // Follow the physical circle, independently of the button order.
                "--light-phase": `${-((petal.rotation + 360) % 360) / 30}s`,
              } as CSSProperties
            }
          >
            <div className={styles.petalMask}>
              <div className={styles.surfaceLight} />
              <div className={styles.surfaceShade} />
            </div>
          </div>
        ))}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className={styles.capabilityLight}
        data-capability-carousel={carouselRunning ? "playing" : "paused"}
        style={
          {
            "--light-play-state": carouselRunning ? "running" : "paused",
          } as CSSProperties
        }
        initial={false}
        animate={{ opacity: active && !pointerHovered ? 1 : 0 }}
        transition={{
          duration: 0.2,
          delay: active && !pointerHovered ? 0.18 : 0,
          ease: EASE,
        }}
      >
        <div className={styles.outerOrbitMask} data-flower-orbit="outer">
          <div className={styles.outerOrbitSweep} />
        </div>
      </motion.div>
      <AnimatePresence>
        {active && hoverPetal && (
          <motion.div
            key={hoverPetal.id}
            aria-hidden="true"
            className={styles.hoverLight}
            data-petal-hover-ripple={hoverPetal.id}
            style={
              {
                "--light-play-state": running ? "running" : "paused",
              } as CSSProperties
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
          >
            <PetalWaterRipple
              petal={hoverPetal}
              screenImage={screenImage}
              running={running}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function PetalWaterRipple({
  petal,
  screenImage,
  running,
}: {
  petal: (typeof PETALS)[number]
  screenImage: string
  running: boolean
}) {
  const uid = useId().replace(/:/g, "")
  const displacementRef = useRef<SVGFEImageElement>(null)
  const centerX = (Number.parseFloat(petal.artLeft) + 15.955) * 7.5
  const centerY = (Number.parseFloat(petal.artTop) + 17.55) * 7.5
  const pose = `translate(${centerX} ${centerY}) rotate(${petal.rotation}) translate(-219.662 -231.628)`
  const labelX = Number.parseFloat(petal.labelLeft) * 7.5
  const labelY = (Number.parseFloat(petal.labelTop) + 8) * 7.5
  const rotation = (petal.rotation * Math.PI) / 180
  const rippleX = centerX + 66.628 * Math.sin(rotation)
  const rippleY = centerY - 66.628 * Math.cos(rotation)
  usePetalRippleDisplacement({
    imageRef: displacementRef,
    rippleX,
    rippleY,
    labelX,
    labelY,
    rotation: petal.rotation,
    running,
  })
  const waves = [0, 0.26, 0.52]

  return (
    <svg
      className={styles.waterRipple}
      viewBox="0 0 750 750"
      preserveAspectRatio="none"
      data-glass-effect="water-ripple-contour"
    >
      <defs>
        <clipPath id={`${uid}-petal`}>
          <path d={PETAL_CONTOUR} transform={pose} />
        </clipPath>
        <radialGradient id={`${uid}-label-shield`}>
          <stop offset="68%" stopColor="black" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-shine`}>
          <stop offset="0%" stopColor="#b4dcf5" stopOpacity="0.04" />
          <stop offset="24%" stopColor="#e0f4ff" stopOpacity="0.38" />
          <stop offset="52%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="78%" stopColor="#d6edff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#b4dcf5" stopOpacity="0.04" />
        </linearGradient>
        <mask
          id={`${uid}-petal-surface`}
          x="0"
          y="0"
          width="750"
          height="750"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          {/* Include the background outside the original edge so an inward wave
              covers that edge instead of exposing a second, static outline. */}
          <path
            d={PETAL_CONTOUR}
            transform={pose}
            fill="white"
            stroke="white"
            strokeWidth="48"
            strokeLinejoin="round"
            filter={`url(#${uid}-soften)`}
          />
        </mask>
        <mask
          id={`${uid}-keep-label-clear`}
          x="0"
          y="0"
          width="750"
          height="750"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <rect width="750" height="750" fill="white" />
          <ellipse
            cx={labelX}
            cy={labelY}
            rx="74"
            ry="68"
            fill={`url(#${uid}-label-shield)`}
          />
        </mask>
        <filter
          id={`${uid}-refraction`}
          x="0"
          y="0"
          width="750"
          height="750"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            ref={displacementRef}
            href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Cpath fill='%23808080' d='M0 0h1v1H0z'/%3E%3C/svg%3E"
            x="0"
            y="0"
            width="750"
            height="750"
            preserveAspectRatio="none"
            result="radialLens"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="radialLens"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter
          id={`${uid}-soften`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      {/* Filter the surface and its light together, then mask beyond the edge.
          Clipping before displacement would cut off the moving silhouette. */}
      <g mask={`url(#${uid}-petal-surface)`}>
        <g filter={`url(#${uid}-refraction)`}>
          <image
            href={screenImage}
            x="0"
            y="-362.055"
            width="750"
            height="1611.99825"
            preserveAspectRatio="none"
          />
          <g
            clipPath={`url(#${uid}-petal)`}
            mask={`url(#${uid}-keep-label-clear)`}
          >
            <g transform={pose}>
              <g transform="translate(219.662 165)" fill="none">
                {waves.map((delay, index) => (
                  <g key={delay} opacity={1 - index * 0.2}>
                    <g
                      className={styles.rippleExpansion}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      <ellipse
                        rx="154"
                        ry="180"
                        stroke="#315b80"
                        strokeOpacity="0.2"
                        strokeWidth="8"
                        filter={`url(#${uid}-soften)`}
                      />
                      <ellipse
                        rx="150"
                        ry="176"
                        stroke={`url(#${uid}-shine)`}
                        strokeWidth="11"
                        filter={`url(#${uid}-soften)`}
                      />
                      <ellipse
                        rx="147"
                        ry="173"
                        stroke={`url(#${uid}-shine)`}
                        strokeWidth="2.5"
                        strokeOpacity="0.3"
                      />
                    </g>
                  </g>
                ))}
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

function PetalArtwork({
  petal,
  highlighted,
  reduceMotion,
}: {
  petal: (typeof PETALS)[number]
  highlighted: boolean
  reduceMotion: boolean
}) {
  return (
    <div
      className="absolute"
      style={{
        left: petal.artLeft,
        top: petal.artTop,
        width: "31.91%",
        height: "35.1%",
        transform: `rotate(${petal.rotation}deg)`,
        transformOrigin: "50% 50%",
      }}
    >
      <div className="absolute" style={{ inset: "-37.99% -41.78%" }}>
        <motion.img
          src={PETAL_SHELL}
          alt=""
          className="absolute inset-0 block h-full w-full max-w-none"
          draggable={false}
          animate={{
            opacity: highlighted ? 0.56 : 0,
            filter: highlighted
              ? "brightness(1.08) drop-shadow(0 1px 4px rgba(255, 255, 255, 0.18))"
              : "brightness(1)",
          }}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: EASE }}
        />
      </div>
    </div>
  )
}
