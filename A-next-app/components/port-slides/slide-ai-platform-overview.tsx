"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react"
import {
  Bot,
  Component,
  Database,
  ListChecks,
  Maximize2,
  PlugZap,
  Workflow,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import SlidePage14 from "./slide-page14"
import SlidePage15 from "./slide-page15"
import SlidePage17 from "./slide-page17"
import SlidePage18 from "./slide-page18"
import SlidePage19 from "./slide-page19"
import SlidePage20 from "./slide-page20"

type ModuleId =
  | "workflow"
  | "agent"
  | "batch"
  | "dataset"
  | "mcp"
  | "design"

type Module = {
  id: ModuleId
  index: string
  title: string
  summary: string
  value: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  details: Array<{ label: string; value: string }>
}

const modules: Module[] = [
  {
    id: "workflow",
    index: "01",
    title: "工作流编排",
    summary: "以节点、连线与执行状态，将复杂业务流程收敛为可理解、可复用的生产链路。",
    value: "从长耗时编排到实时状态追踪，流程复杂度被沉淀为可复用资产。",
    icon: Workflow,
    details: [
      { label: "输入", value: "业务目标 / 数据源" },
      { label: "机制", value: "节点编排 / 条件分支" },
      { label: "交付", value: "可运行工作流" },
    ],
  },
  {
    id: "agent",
    index: "02",
    title: "Agent 智能体",
    summary: "组合提示词、记忆、知识库与工具，搭建可独立执行也可协同调度的智能体。",
    value: "统一单 Agent 与多 Agent 的创建、调度和结果回传方式。",
    icon: Bot,
    details: [
      { label: "输入", value: "角色 / 任务目标" },
      { label: "机制", value: "记忆 / 工具 / 知识" },
      { label: "交付", value: "自主执行结果" },
    ],
  },
  {
    id: "batch",
    index: "03",
    title: "批量任务",
    summary: "把结构化数据批量送入工作流，统一管理队列、运行状态与异常重试。",
    value: "同一条能力链从单次执行扩展到稳定的大规模生产。",
    icon: ListChecks,
    details: [
      { label: "输入", value: "文件 / ODPS / JSON" },
      { label: "机制", value: "队列 / 并发 / 重试" },
      { label: "交付", value: "批量生产结果" },
    ],
  },
  {
    id: "dataset",
    index: "04",
    title: "数据集管理",
    summary: "统一单数据集、多数据集与运行结果，打通数据准备到消费的最后一公里。",
    value: "输入结构、来源关系与运算结果在同一数据语义下持续流转。",
    icon: Database,
    details: [
      { label: "输入", value: "多源数据 / Schema" },
      { label: "机制", value: "校验 / 合并 / 运算" },
      { label: "交付", value: "标准数据资产" },
    ],
  },
  {
    id: "mcp",
    index: "05",
    title: "MCP 接入",
    summary: "把外部服务包装成可发现、可测试、可调用的标准工具，供工作流与 Agent 复用。",
    value: "能力接入从定制开发变成标准注册，降低跨团队复用成本。",
    icon: PlugZap,
    details: [
      { label: "输入", value: "Server / API" },
      { label: "机制", value: "注册 / 测试 / 授权" },
      { label: "交付", value: "标准工具能力" },
    ],
  },
  {
    id: "design",
    index: "06",
    title: "设计规范",
    summary: "以设计 Token、基础组件与业务组件统一平台体验，保证能力扩展不牺牲一致性。",
    value: "从局部页面到完整平台，交互规则和视觉语言保持同一套标准。",
    icon: Component,
    details: [
      { label: "输入", value: "品牌 / 场景 / 规则" },
      { label: "机制", value: "Token / 组件 / 模板" },
      { label: "交付", value: "统一产品体验" },
    ],
  },
]

const sourceSlides: Record<ModuleId, ComponentType> = {
  workflow: SlidePage14,
  agent: SlidePage15,
  batch: SlidePage17,
  dataset: SlidePage18,
  mcp: SlidePage19,
  design: SlidePage20,
}

const SOURCE_CANVAS_WIDTH = 1440
const SOURCE_CANVAS_HEIGHT = 900
const FALLBACK_CANVAS_SCALE = 0.56
const DEFAULT_CANVAS_Y_OFFSET = -30
const DEFAULT_CANVAS_VIEW = {
  scale: FALLBACK_CANVAS_SCALE,
  x: 0,
  y: DEFAULT_CANVAS_Y_OFFSET,
}
const MIN_CANVAS_SCALE = 0.4
const MAX_CANVAS_SCALE = 1.4

const clampCanvasScale = (scale: number) =>
  Math.min(MAX_CANVAS_SCALE, Math.max(MIN_CANVAS_SCALE, scale))

export default function SlideAiPlatformOverview() {
  const [activeId, setActiveId] = useState<ModuleId>("workflow")
  const [canvasView, setCanvasView] = useState(DEFAULT_CANVAS_VIEW)
  const [fittedCanvasScale, setFittedCanvasScale] = useState(FALLBACK_CANVAS_SCALE)
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false)
  const canvasViewportRef = useRef<HTMLDivElement>(null)
  const canvasDragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)
  const active = modules.find((module) => module.id === activeId) ?? modules[0]
  const ActiveSourceSlide = sourceSlides[active.id]

  const fitCanvasToViewport = useCallback(() => {
    const viewport = canvasViewportRef.current
    if (!viewport) return

    const width = viewport.clientWidth
    const height = viewport.clientHeight
    if (width <= 0 || height <= 0) return

    const scale = clampCanvasScale(
      Math.min(width / SOURCE_CANVAS_WIDTH, height / SOURCE_CANVAS_HEIGHT),
    )
    setFittedCanvasScale(scale)
    setCanvasView({ scale, x: 0, y: DEFAULT_CANVAS_Y_OFFSET })
    setIsDraggingCanvas(false)
    canvasDragRef.current = null
  }, [])

  useEffect(() => {
    const viewport = canvasViewportRef.current
    if (!viewport) return

    fitCanvasToViewport()
    const resizeObserver = new ResizeObserver(fitCanvasToViewport)
    resizeObserver.observe(viewport)
    return () => resizeObserver.disconnect()
  }, [fitCanvasToViewport])

  useEffect(() => {
    const frame = requestAnimationFrame(fitCanvasToViewport)
    return () => cancelAnimationFrame(frame)
  }, [activeId, fitCanvasToViewport])

  const resetCanvas = fitCanvasToViewport

  const zoomCanvasFromCenter = (factor: number) => {
    setCanvasView((current) => ({
      ...current,
      scale: clampCanvasScale(current.scale * factor),
    }))
  }

  const handleCanvasWheel = (event: ReactWheelEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    const rect = event.currentTarget.getBoundingClientRect()
    const cursorX = event.clientX - (rect.left + rect.width / 2)
    const cursorY = event.clientY - (rect.top + rect.height / 2)
    const zoomFactor = Math.exp(-event.deltaY * 0.0015)

    setCanvasView((current) => {
      const nextScale = clampCanvasScale(current.scale * zoomFactor)
      const ratio = nextScale / current.scale
      return {
        scale: nextScale,
        x: cursorX - (cursorX - current.x) * ratio,
        y: cursorY - (cursorY - current.y) * ratio,
      }
    })
  }

  const handleCanvasPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button")) return
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    canvasDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: canvasView.x,
      originY: canvasView.y,
    }
    setIsDraggingCanvas(true)
  }

  const handleCanvasPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = canvasDragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    event.preventDefault()
    event.stopPropagation()
    setCanvasView((current) => ({
      ...current,
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    }))
  }

  const finishCanvasDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (canvasDragRef.current?.pointerId !== event.pointerId) return
    event.preventDefault()
    event.stopPropagation()
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    canvasDragRef.current = null
    setIsDraggingCanvas(false)
  }

  const handleCanvasKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "+" || event.key === "=") {
      event.preventDefault()
      zoomCanvasFromCenter(1.18)
    } else if (event.key === "-") {
      event.preventDefault()
      zoomCanvasFromCenter(1 / 1.18)
    } else if (event.key === "0") {
      event.preventDefault()
      resetCanvas()
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070707] text-white">
      <style jsx global>{`
        .embedded-source-slide > div {
          background: transparent !important;
        }
        .embedded-source-slide > div > div.absolute.inset-0.pointer-events-none {
          display: none !important;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[17%] bg-[radial-gradient(ellipse_at_left,rgba(185,12,16,0.23),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[17%] bg-[radial-gradient(ellipse_at_right,rgba(185,12,16,0.23),transparent_72%)]" />

      <header className="absolute left-[5%] right-[5%] top-[6.7%] flex items-end justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] text-white/36">
            <span className="text-[#ef3b46]">PLATFORM SYSTEM</span>
            <span className="h-px w-8 bg-white/20" />
            <span>万相星链 · 能力架构</span>
          </div>
          <h1
            className="m-0 text-[40px] leading-none"
            style={{
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              letterSpacing: "1.5px",
            }}
          >
            如何构建可扩展的 <span className="text-[#ef3b46]">AI 应用平台</span>
          </h1>
        </div>
        <p className="m-0 whitespace-nowrap text-right text-[12px] leading-none text-white/48">
          六类核心能力共享同一生产上下文，支持从数据准备、能力接入到规模化交付的连续演进。
        </p>
      </header>

      <nav
        className="absolute bottom-[3.2%] left-[5%] top-[16.2%] flex w-[12%] flex-col border border-white/10"
        aria-label="平台能力模块"
      >
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = module.id === active.id
          return (
            <button
              key={module.id}
              type="button"
              onClick={() => setActiveId(module.id)}
              className="group relative flex min-h-0 flex-1 items-center border-b border-white/10 px-5 text-left last:border-b-0"
              style={{ background: isActive ? "rgba(239,59,70,0.10)" : "transparent" }}
              aria-pressed={isActive}
            >
              <span>
                <span className="block" style={{ color: isActive ? "#ef3b46" : "rgba(255,255,255,0.38)" }}>
                  <Icon size={14} strokeWidth={1.8} />
                </span>
                <span className="mt-2 block text-[13px] font-semibold" style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.52)" }}>
                  {module.title}
                </span>
              </span>
              <span
                className="absolute inset-y-0 right-0 w-0.5 transition-opacity"
                style={{ background: "#ef3b46", opacity: isActive ? 1 : 0 }}
              />
            </button>
          )
        })}
      </nav>

      <main className="absolute bottom-[3.2%] left-[18.5%] right-[5%] top-[16.2%]">
        <div key={active.id} className="h-full animate-[fadeIn_.22s_ease-out]">
          <section
            className="relative h-full w-full overflow-hidden border border-white/12 bg-[#070707] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:22px_22px] outline-none"
            style={{
              cursor: isDraggingCanvas ? "grabbing" : "grab",
              touchAction: "none",
            }}
            role="region"
            aria-label={`${active.title}画布，可拖动并缩放`}
            tabIndex={0}
            onWheelCapture={handleCanvasWheel}
            onPointerDown={handleCanvasPointerDown}
            onPointerMove={handleCanvasPointerMove}
            onPointerUp={finishCanvasDrag}
            onPointerCancel={finishCanvasDrag}
            onDoubleClick={resetCanvas}
            onKeyDown={handleCanvasKeyDown}
          >
            <div ref={canvasViewportRef} className="absolute inset-[4px] overflow-hidden">
              <div
                className="embedded-source-slide pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[1440px] select-none will-change-transform"
                style={{
                  transform: `translate(-50%, -50%) translate(${canvasView.x}px, ${canvasView.y}px) scale(${canvasView.scale})`,
                  transformOrigin: "center",
                }}
              >
                <ActiveSourceSlide />
              </div>
            </div>
            <div
              className="absolute bottom-4 right-4 z-30 flex h-9 items-center overflow-hidden border border-white/14 bg-black/75 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="grid h-9 w-9 place-items-center border-r border-white/10 text-white/65 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-25"
                onClick={() => zoomCanvasFromCenter(1 / 1.18)}
                disabled={canvasView.scale <= MIN_CANVAS_SCALE + 0.001}
                aria-label="缩小画布"
                title="缩小"
              >
                <ZoomOut size={15} strokeWidth={1.8} />
              </button>
              <span className="w-12 text-center text-[10px] font-medium tabular-nums text-white/58" aria-live="polite">
                {Math.round((canvasView.scale / fittedCanvasScale) * 100)}%
              </span>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center border-l border-white/10 text-white/65 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-25"
                onClick={() => zoomCanvasFromCenter(1.18)}
                disabled={canvasView.scale >= MAX_CANVAS_SCALE - 0.001}
                aria-label="放大画布"
                title="放大"
              >
                <ZoomIn size={15} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center border-l border-white/10 text-white/65 transition-colors hover:bg-white/10 hover:text-white"
                onClick={resetCanvas}
                aria-label="适应画布"
                title="适应画布"
              >
                <Maximize2 size={14} strokeWidth={1.8} />
              </button>
            </div>
          </section>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
