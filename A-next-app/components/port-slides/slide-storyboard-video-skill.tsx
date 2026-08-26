"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import {
  AlignHorizontalSpaceAround,
  Boxes,
  Braces,
  Code2,
  FileInput,
  GitBranch,
  ImageIcon,
  Lock,
  Maximize2,
  Play,
  RotateCcw,
  Save,
  Sparkles,
  Upload,
  Video,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

type RunState = "idle" | "running" | "complete"

type WorkflowNodeProps = {
  index: string
  title: string
  caption: string
  x: number
  y: number
  tone: "blue" | "violet" | "cyan" | "green" | "orange" | "red"
  active?: boolean
}

const tones = {
  blue: { accent: "#5688ff", soft: "#edf3ff", glow: "rgba(86,136,255,.2)" },
  violet: { accent: "#8768ef", soft: "#f1edff", glow: "rgba(135,104,239,.2)" },
  cyan: { accent: "#35a8bd", soft: "#eaf9fb", glow: "rgba(53,168,189,.2)" },
  green: { accent: "#39a972", soft: "#eaf8f0", glow: "rgba(57,169,114,.2)" },
  orange: { accent: "#dd8b3f", soft: "#fff5e9", glow: "rgba(221,139,63,.2)" },
  red: { accent: "#e35158", soft: "#fff0f1", glow: "rgba(227,81,88,.2)" },
}

function WorkflowNode({
  index,
  title,
  caption,
  x,
  y,
  tone,
  active = false,
}: WorkflowNodeProps) {
  const color = tones[tone]

  return (
    <motion.div
      className="absolute overflow-hidden rounded-[11px] bg-white"
      style={{
        left: x,
        top: y,
        width: 132,
        height: 82,
        border: `1px solid ${active ? color.accent : "#dfe5ee"}`,
        boxShadow: active
          ? `0 0 0 3px ${color.glow}, 0 12px 28px rgba(36,48,69,.12)`
          : "0 8px 20px rgba(36,48,69,.08)",
      }}
      animate={active ? { y: [0, -2, 0] } : undefined}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="flex h-[29px] items-center gap-[6px] border-b px-[9px]"
        style={{ background: color.soft, borderColor: "rgba(43,57,80,.08)" }}
      >
        <span
          className="flex size-[15px] items-center justify-center rounded-[4px] text-[8px] font-bold text-white"
          style={{ background: color.accent }}
        >
          {index}
        </span>
        <span className="truncate text-[11px] font-semibold text-[#253147]">
          {title}
        </span>
      </div>
      <div className="px-[9px] pt-[8px]">
        <p className="m-0 text-[9px] leading-[1.45] text-[#68758a]">{caption}</p>
        <div className="mt-[7px] h-[3px] overflow-hidden rounded-full bg-[#edf0f4]">
          <div
            className="h-full rounded-full"
            style={{ width: active ? "76%" : "46%", background: color.accent }}
          />
        </div>
      </div>
      <span
        className="absolute -left-[4px] top-[48px] size-[7px] rounded-full border-2 border-white"
        style={{ background: color.accent }}
      />
      <span
        className="absolute -right-[4px] top-[48px] size-[7px] rounded-full border-2 border-white"
        style={{ background: color.accent }}
      />
    </motion.div>
  )
}

const phases = [
  {
    index: "01",
    title: "拆专家过程",
    body: "把脚本理解、镜头规划和生成判断，拆成可编排节点。",
  },
  {
    index: "02",
    title: "固化为 Skill",
    body: "将参数、分支、重试与质量门槛，封装成稳定能力。",
  },
  {
    index: "03",
    title: "持续回归验证",
    body: "用真实故事板样例反复运行，让每次迭代都有证据。",
  },
]

const nodePalette = [
  { label: "输入", icon: FileInput, tone: "#5688ff" },
  { label: "Prompt", icon: Braces, tone: "#8768ef" },
  { label: "代码", icon: Code2, tone: "#35a8bd" },
  { label: "分支", icon: GitBranch, tone: "#dd8b3f" },
  { label: "图片", icon: ImageIcon, tone: "#39a972" },
  { label: "视频", icon: Video, tone: "#e35158" },
]

const toolButtonClass =
  "flex h-[30px] items-center gap-[5px] rounded-[7px] border border-[#dfe4ec] bg-white px-[9px] text-[10px] font-medium text-[#536076] transition-colors hover:bg-[#f2f6fc]"

export default function SlideStoryboardVideoSkill() {
  const [zoom, setZoom] = useState(0.86)
  const [locked, setLocked] = useState(false)
  const [resetToken, setResetToken] = useState(0)
  const [runState, setRunState] = useState<RunState>("idle")
  const runTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (runTimerRef.current) clearTimeout(runTimerRef.current)
    }
  }, [])

  const fitCanvas = () => {
    setZoom(0.86)
    setResetToken((value) => value + 1)
  }

  const runWorkflow = () => {
    if (runTimerRef.current) clearTimeout(runTimerRef.current)
    setRunState("running")
    runTimerRef.current = setTimeout(() => setRunState("complete"), 1600)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070708] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 0% 48%, rgba(205,16,29,.22), transparent 34%), radial-gradient(ellipse at 100% 44%, rgba(205,16,29,.17), transparent 30%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
          maskImage: "linear-gradient(to bottom, black, transparent 76%)",
        }}
      />

      <header className="absolute left-[4.17%] right-[4.17%] top-[5.8%] z-10 flex items-end justify-between">
        <div>
          <div className="mb-[9px] flex items-center gap-[9px] text-[10px] font-semibold tracking-[0.18em] text-[#ef3b46]">
            <span className="h-px w-[30px] bg-[#ef3b46]" />
            SKILL R&amp;D · STORYBOARD TO VIDEO
          </div>
          <h1
            className="m-0 whitespace-nowrap text-[40px] font-semibold leading-[1.08] tracking-[-0.02em]"
            style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif" }}
          >
            把故事板生视频，研发成
            <span className="text-[#ef3b46]">可验证的 Skill</span>
          </h1>
        </div>
        <div className="mb-[2px] flex items-end gap-[26px] text-right">
          {[
            ["10", "研发节点"],
            ["3", "研发阶段"],
            ["1", "可复用 Skill"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="m-0 text-[24px] font-semibold leading-none text-white">{value}</p>
              <p className="mt-[6px] whitespace-nowrap text-[9px] tracking-[0.08em] text-white/45">{label}</p>
            </div>
          ))}
        </div>
      </header>

      <section
        aria-label="故事板生视频 Skill 研发工作流"
        className="absolute left-[4.17%] right-[4.17%] top-[18.7%] h-[61.5%] overflow-hidden rounded-[18px] border border-white/10 bg-[#e9edf3] shadow-[0_26px_80px_rgba(0,0,0,.42)]"
        onPointerDown={(event) => event.stopPropagation()}
        onWheel={(event) => {
          event.preventDefault()
          event.stopPropagation()
          const factor = event.deltaY > 0 ? -0.04 : 0.04
          setZoom((value) => Math.min(1.16, Math.max(0.72, Number((value + factor).toFixed(2)))))
        }}
      >
        <aside className="absolute bottom-0 left-0 top-0 z-20 w-[118px] border-r border-[#dce2eb] bg-white">
          <div className="flex h-[54px] items-center border-b border-[#e4e8ef] px-[16px]">
            <div className="flex size-[26px] items-center justify-center rounded-[8px] bg-[#171a22] text-white">
              <Boxes size={14} strokeWidth={1.8} />
            </div>
            <div className="ml-[8px]">
              <p className="m-0 text-[10px] font-bold text-[#283247]">节点库</p>
              <p className="m-0 mt-[1px] text-[8px] text-[#929cac]">R&amp;D TOOLKIT</p>
            </div>
          </div>
          <div className="px-[11px] pt-[13px]">
            <p className="mb-[7px] ml-[3px] mt-0 text-[8px] font-semibold tracking-[0.12em] text-[#a4abb7]">基础能力</p>
            <div className="space-y-[4px]">
              {nodePalette.map(({ label, icon: Icon, tone }) => (
                <button
                  key={label}
                  type="button"
                  className="flex h-[36px] w-full items-center rounded-[8px] border-0 bg-transparent px-[7px] text-[9px] font-medium text-[#4a566b] hover:bg-[#f1f5fa]"
                >
                  <span
                    className="mr-[8px] flex size-[20px] items-center justify-center rounded-[6px] text-white"
                    style={{ background: tone }}
                  >
                    <Icon size={11} strokeWidth={1.8} />
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute bottom-[13px] left-[11px] right-[11px] rounded-[9px] border border-[#e5e9f0] bg-[#f8fafc] p-[9px]">
            <div className="flex items-center gap-[6px] text-[8px] font-semibold text-[#59667b]">
              <Sparkles size={10} className="text-[#8768ef]" /> Skill Assets
            </div>
            <div className="mt-[7px] h-[3px] rounded-full bg-[#e6e9ef]">
              <div className="h-full w-[72%] rounded-full bg-[#8768ef]" />
            </div>
          </div>
        </aside>

        <div className="absolute left-[118px] right-0 top-0 z-30 flex h-[54px] items-center justify-between border-b border-[#dce2eb] bg-white px-[13px]">
          <div className="flex items-center gap-[6px]">
            <button type="button" className={toolButtonClass} onClick={fitCanvas}>
              <AlignHorizontalSpaceAround size={12} /> 布局
            </button>
            <button
              type="button"
              aria-label="缩小画布"
              className={toolButtonClass}
              onClick={() => setZoom((value) => Math.max(0.72, Number((value - 0.05).toFixed(2))))}
            >
              <ZoomOut size={12} />
            </button>
            <button type="button" className={toolButtonClass} onClick={fitCanvas}>
              <Maximize2 size={11} /> {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              aria-label="放大画布"
              className={toolButtonClass}
              onClick={() => setZoom((value) => Math.min(1.16, Number((value + 0.05).toFixed(2))))}
            >
              <ZoomIn size={12} />
            </button>
          </div>
          <div className="flex items-center gap-[6px]">
            <button type="button" className={toolButtonClass}>
              <Upload size={11} /> 导入
            </button>
            <button
              type="button"
              aria-pressed={locked}
              className={toolButtonClass}
              onClick={() => setLocked((value) => !value)}
              style={locked ? { color: "#fff", background: "#273149", borderColor: "#273149" } : undefined}
            >
              <Lock size={11} /> {locked ? "已锁定" : "锁定"}
            </button>
            <button type="button" className={toolButtonClass}>
              <Save size={11} /> 保存
            </button>
            <button
              type="button"
              onClick={runWorkflow}
              className="flex h-[30px] items-center gap-[5px] rounded-[7px] border-0 bg-[#4c77f1] px-[11px] text-[10px] font-semibold text-white shadow-[0_7px_16px_rgba(76,119,241,.25)] hover:bg-[#3d69e6]"
            >
              {runState === "running" ? <RotateCcw size={11} className="animate-spin" /> : <Play size={11} fill="currentColor" />}
              {runState === "running" ? "运行中" : runState === "complete" ? "再次运行" : "试运行"}
            </button>
            <button type="button" className="h-[30px] rounded-[7px] border border-[#202638] bg-[#202638] px-[11px] text-[10px] font-semibold text-white">
              上线
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-[118px] right-0 top-[54px] overflow-hidden"
          style={{
            backgroundColor: "#f5f7fa",
            backgroundImage:
              "radial-gradient(circle, rgba(111,124,145,.34) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <motion.div
            key={resetToken}
            drag={locked ? false : true}
            dragConstraints={{ left: -170, right: 150, top: -76, bottom: 76 }}
            dragElastic={0.035}
            dragMomentum={false}
            className="absolute left-[14px] top-[10px] h-[430px] w-[1390px]"
            style={{
              cursor: locked ? "default" : "grab",
              touchAction: "none",
              transformOrigin: "left top",
            }}
            animate={{ scale: zoom }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            whileDrag={locked ? undefined : { cursor: "grabbing" }}
          >
            <div className="absolute left-[32px] top-[9px] flex items-center gap-[8px] text-[10px] font-semibold text-[#536076]">
              <span className="rounded-full bg-[#e8eefb] px-[9px] py-[4px] text-[#5075c9]">01</span>
              拆解专家经验
            </div>
            <div className="absolute left-[580px] top-[9px] flex items-center gap-[8px] text-[10px] font-semibold text-[#536076]">
              <span className="rounded-full bg-[#efeafb] px-[9px] py-[4px] text-[#7f66c9]">02</span>
              固化生成策略
            </div>
            <div className="absolute left-[1057px] top-[9px] flex items-center gap-[8px] text-[10px] font-semibold text-[#536076]">
              <span className="rounded-full bg-[#e9f6ee] px-[9px] py-[4px] text-[#389369]">03</span>
              评估、封装与发布
            </div>

            <svg className="absolute inset-0 size-full" viewBox="0 0 1390 430" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="skillFlowLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#5688ff" />
                  <stop offset=".54" stopColor="#8768ef" />
                  <stop offset="1" stopColor="#39a972" />
                </linearGradient>
                <filter id="skillFlowGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <g stroke="url(#skillFlowLine)" strokeWidth="2.2" strokeLinecap="round" filter={runState === "running" ? "url(#skillFlowGlow)" : undefined}>
                <path d="M164 202C180 202 180 202 196 202" />
                <path d="M328 202C344 202 344 202 360 202" />
                <path d="M492 202C508 202 508 202 524 202" />
                <path d="M656 202C685 202 679 102 710 102" />
                <path d="M656 202C681 202 684 202 710 202" />
                <path d="M656 202C685 202 679 302 710 302" />
                <path d="M842 102C869 102 851 202 878 202" />
                <path d="M842 202C856 202 864 202 878 202" />
                <path d="M842 302C869 302 851 202 878 202" />
                <path d="M1010 202C1026 202 1026 202 1042 202" />
                <path d="M1174 202C1190 202 1190 202 1206 202" />
              </g>
              <path d="M1108 243C1108 354 596 370 590 244" stroke="#e35158" strokeWidth="1.7" strokeDasharray="6 6" />
              <rect x="763" y="355" width="116" height="23" rx="11.5" fill="#fff1f2" stroke="#efc5c8" />
              <text x="821" y="370" textAnchor="middle" fill="#cf4b52" fontSize="9" fontWeight="600">未达阈值 · 自动回退</text>
              {runState === "running" && (
                <circle r="5" fill="#ffffff" stroke="#4c77f1" strokeWidth="3">
                  <animateMotion dur="1.55s" repeatCount="indefinite" path="M164 202C360 202 524 202 656 202C681 202 684 202 710 202C842 202 878 202 1010 202C1042 202 1206 202 1338 202" />
                </circle>
              )}
            </svg>

            <WorkflowNode index="1" title="Skill Brief" caption="场景、输入与目标样例" x={32} y={161} tone="blue" active={runState === "running"} />
            <WorkflowNode index="2" title="故事板解析" caption="角色、场景、节奏拆解" x={196} y={161} tone="blue" />
            <WorkflowNode index="3" title="镜头规划" caption="景别、运动与时长" x={360} y={161} tone="cyan" />
            <WorkflowNode index="4" title="Prompt 编排" caption="模板、参数与引用关系" x={524} y={161} tone="violet" />
            <WorkflowNode index="5A" title="人物一致性" caption="参考图与身份约束" x={710} y={61} tone="orange" />
            <WorkflowNode index="5B" title="运动控制" caption="运镜与动作强度" x={710} y={161} tone="orange" />
            <WorkflowNode index="5C" title="风格一致性" caption="色调、材质与光影" x={710} y={261} tone="orange" />
            <WorkflowNode index="6" title="故事板生视频" caption="分镜批量生成与合成" x={878} y={161} tone="red" active={runState === "running"} />
            <WorkflowNode index="7" title="质量门" caption="一致性、可用性、稳定性" x={1042} y={161} tone="green" />
            <WorkflowNode index="8" title="Skill 封装" caption="参数说明、版本与示例" x={1206} y={161} tone="violet" active={runState === "complete"} />
          </motion.div>

          <div className="pointer-events-none absolute bottom-[12px] left-[12px] z-20 flex h-[30px] items-center gap-[8px] rounded-full border border-[#dfe4ec] bg-white/90 px-[11px] text-[9px] font-semibold text-[#536076] shadow-[0_8px_20px_rgba(36,48,69,.08)] backdrop-blur">
            <span
              className="size-[6px] rounded-full"
              style={{
                background: runState === "complete" ? "#39a972" : runState === "running" ? "#5688ff" : "#aab3c0",
                boxShadow: runState === "idle" ? "none" : "0 0 9px currentColor",
              }}
            />
            {locked
              ? "画布已锁定"
              : runState === "running"
                ? "正在用回归样例验证链路"
                : runState === "complete"
                  ? "验证通过 · Skill v1.0 可发布"
                  : "拖动画布查看研发节点"}
          </div>

          <div className="pointer-events-none absolute bottom-[12px] right-[12px] z-20 h-[58px] w-[116px] overflow-hidden rounded-[8px] border border-[#dfe4ec] bg-white/92 shadow-[0_8px_20px_rgba(36,48,69,.08)]">
            <svg viewBox="0 0 116 58" className="size-full" fill="none" aria-hidden="true">
              <path d="M9 32C22 32 21 21 35 21C48 21 46 38 60 38C73 38 75 23 88 23C99 23 100 30 108 30" stroke="#7b87d7" strokeWidth="1.4" />
              <rect x="6" y="27" width="17" height="11" rx="2" fill="#eaf0ff" stroke="#7da1ec" />
              <rect x="30" y="16" width="18" height="11" rx="2" fill="#eee8ff" stroke="#8b7be8" />
              <rect x="55" y="33" width="18" height="11" rx="2" fill="#fff0e6" stroke="#dd9a61" />
              <rect x="83" y="18" width="18" height="11" rx="2" fill="#e6f5ed" stroke="#69c693" />
            </svg>
            <span
              className="absolute rounded-[3px] border border-[#4c77f1] bg-[#4c77f1]/5"
              style={{
                left: `${12 + (zoom - 0.86) * 42}%`,
                top: `${14 + (zoom - 0.86) * 22}%`,
                width: `${72 / zoom}%`,
                height: `${67 / zoom}%`,
                transition: "all 220ms ease",
              }}
            />
          </div>
        </div>
      </section>

      <div className="absolute bottom-[4.6%] left-[4.17%] right-[4.17%] grid grid-cols-3 gap-[42px]">
        {phases.map((phase, index) => (
          <div key={phase.index} className="relative flex items-start border-t border-white/16 pt-[13px]">
            <span className="mr-[15px] text-[11px] font-semibold text-[#ef3b46]">{phase.index}</span>
            <div>
              <h2 className="m-0 text-[14px] font-semibold tracking-[0.01em] text-white">{phase.title}</h2>
              <p className="mb-0 mt-[5px] max-w-[330px] text-[10px] leading-[1.55] text-white/46">{phase.body}</p>
            </div>
            {index < phases.length - 1 && <span className="absolute -right-[21px] top-[16px] size-[4px] rounded-full bg-white/24" />}
          </div>
        ))}
      </div>
    </div>
  )
}
