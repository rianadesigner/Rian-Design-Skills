"use client"

import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  useEffect,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"

const P21 = "/images/page21"
const AUTOPLAY_MS = 5200

const workflowScreens = [
  {
    id: "default",
    num: "01",
    label: "默认入口",
    title: "从空白画布进入搭建",
    description: "搭建助手给出常用任务建议，让用户从自然语言需求快速开始。",
    image: `${P21}/free-canvas-01.webp`,
    alt: "工作流空白画布与搭建助手默认入口，展示任务建议和自然语言输入框",
  },
  {
    id: "intent",
    num: "02",
    label: "素材识别",
    title: "根据上传素材确认方向",
    description: "识别用户上传的图片，先澄清目标，再给出可选择的工作流方向。",
    image: `${P21}/free-canvas-02.webp`,
    alt: "用户上传图片后，搭建助手识别素材并给出三种图像工作流方向",
  },
  {
    id: "outline",
    num: "03",
    label: "大纲确认",
    title: "生成可确认的工作流大纲",
    description: "将需求拆解为节点计划，在真正搭建前支持确认或重新生成。",
    image: `${P21}/free-canvas-03.webp`,
    alt: "搭建助手生成工作流节点大纲，并提供确认与重新生成操作",
  },
  {
    id: "building",
    num: "04",
    label: "自动搭建",
    title: "按大纲逐个创建节点",
    description: "自动添加节点、填写参数并建立连接，同时持续展示搭建进度。",
    image: `${P21}/free-canvas-04.webp`,
    alt: "搭建助手正在自动创建和连接工作流节点，并显示搭建进度",
  },
  {
    id: "ready",
    num: "05",
    label: "搭建完成",
    title: "完整工作流已就绪",
    description: "全部节点和连线完成后汇总检查，并将下一步收束到开始试运行。",
    image: `${P21}/free-canvas-05.webp`,
    alt: "工作流全部节点搭建完成，搭建助手展示检查结果和开始运行按钮",
  },
  {
    id: "running",
    num: "06",
    label: "试运行中",
    title: "同步反馈执行进度",
    description: "运行时展示节点状态与生成过程，让用户始终知道系统正在做什么。",
    image: `${P21}/free-canvas-06.webp`,
    alt: "工作流正在试运行，画布节点显示成功状态，助手同步输出执行进度",
  },
  {
    id: "output",
    num: "07",
    label: "结果输出",
    title: "试运行成功并交付结果",
    description: "完成后统一呈现文本、视频结果与运行状态，形成完整闭环。",
    image: `${P21}/free-canvas-07.webp`,
    alt: "工作流试运行成功，搭建助手展示生成文案和两项视频结果",
  },
] as const

export default function SlidePage21() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const activeScreen = workflowScreens[activeIndex]
  const nextScreen = workflowScreens[(activeIndex + 1) % workflowScreens.length]

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? workflowScreens.length - 1 : current - 1
    )
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % workflowScreens.length)
  }

  useEffect(() => {
    if (paused || reduceMotion) return

    const timer = window.setTimeout(showNext, AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [activeIndex, paused, reduceMotion])

  useEffect(() => {
    const image = new window.Image()
    image.src = nextScreen.image
  }, [nextScreen.image])

  const handleMainKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      event.stopPropagation()
      showNext()
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      event.stopPropagation()
      showPrevious()
    }
  }

  const handleBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#070707] text-white"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={handleBlur}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-y-0 left-0 w-[22%]"
          style={{
            background:
              "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,.28) 0%, rgba(180,0,0,.1) 45%, transparent 76%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[22%]"
          style={{
            background:
              "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,.25) 0%, rgba(180,0,0,.09) 45%, transparent 76%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[.22]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <header className="absolute top-[6.2%] right-[4.17%] left-[4.17%] z-20 flex items-end justify-between">
        <div>
          <div className="mb-[8px] flex items-center gap-[9px] text-[10px] font-semibold tracking-[0.18em] text-[#ef3b46]">
            <span className="h-px w-[30px] bg-[#ef3b46]" />
            AI WORKFLOW BUILDER · ENTRY EXPERIENCE
          </div>
          <h1
            className="m-0"
            style={{
              fontFamily:
                "'标小智无界黑', 'LogoSC Unbounded Sans', 'PingFang SC', sans-serif",
              fontSize: "2.5rem",
              fontWeight: 400,
              lineHeight: 1.18,
              letterSpacing: "0.0625rem",
              fontSynthesis: "none",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            Prompt To <span className="text-[#ef3b46]">Workflow</span>
          </h1>
        </div>

        <div className="flex flex-col items-end">
          <p
            id="workflow-step-instruction"
            className="m-0 max-w-[580px] text-right text-[11px] leading-[1.45] font-medium text-white/52"
            aria-live="polite"
          >
            <span className="text-white/76">
              {activeScreen.num} · {activeScreen.title}
            </span>{" "}
            — {activeScreen.description}
          </p>
        </div>
      </header>

      <section
        className="absolute top-[17.2%] right-[4.17%] bottom-[1.3%] left-[4.17%] z-10 flex items-center justify-center"
        aria-label="工作流搭建助手七状态轮播"
      >
        <div
          className="relative max-h-full w-full"
          style={{
            aspectRatio: "5760 / 3000",
          }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
            onPointerDown={(event) => event.stopPropagation()}
            onKeyDown={handleMainKeyDown}
            aria-describedby="workflow-step-instruction"
            aria-label={`${activeScreen.title}。点击进入下一步：${nextScreen.label}`}
            className="absolute inset-0 block h-full w-full cursor-pointer overflow-hidden rounded-[12px] border border-white/10 bg-[#edf2f8] p-0 text-left shadow-[0_28px_48px_rgba(0,0,0,.5),0_0_45px_rgba(185,0,0,.13)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef3b46]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeScreen.id}
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={activeScreen.image}
                  alt={activeScreen.alt}
                  fill
                  sizes="92vw"
                  priority={activeIndex === 0}
                  unoptimized
                  className="object-contain select-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </button>

          <div
            className="absolute bottom-[14px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[4px] rounded-full border border-white/12 bg-black/38 px-[10px] py-[6px] shadow-[0_8px_22px_rgba(0,0,0,.26)] backdrop-blur-[8px]"
            role="group"
            aria-label="工作流步骤"
          >
            {workflowScreens.map((screen, index) => {
              const selected = index === activeIndex
              return (
                <button
                  key={screen.id}
                  type="button"
                  aria-label={`展示第 ${index + 1} 步：${screen.label}`}
                  aria-pressed={selected}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation()
                    setActiveIndex(index)
                  }}
                  className="flex h-[16px] w-[30px] items-center justify-center rounded-full border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef3b46]"
                >
                  <span
                    aria-hidden="true"
                    className="h-[3px] rounded-full transition-[width,background-color,box-shadow] duration-200"
                    style={{
                      width: selected ? "26px" : "20px",
                      background: selected
                        ? "#ef3b46"
                        : "rgba(255,255,255,.4)",
                      boxShadow: selected
                        ? "0 0 10px rgba(239,59,70,.72)"
                        : "none",
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
