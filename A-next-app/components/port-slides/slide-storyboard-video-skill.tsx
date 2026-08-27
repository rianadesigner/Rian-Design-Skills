"use client"

import Image from "next/image"
import { useState } from "react"

import { cn } from "@/lib/utils"

const FULL_WORKFLOW_SCREENSHOT =
  "/images/storyboard-video-skill/workflow-full-105500.webp"
const SKILL_CONFIG_SCREENSHOT = "/images/if-studio/skill-config-2026.webp"

const workflowNotes = [
  {
    index: "01",
    title: "节点编排",
    description: "输入、模型、代码与分支组成可视链路",
    left: "8%",
  },
  {
    index: "02",
    title: "稳定执行",
    description: "主备路径并行，结果自动合并与兜底",
    left: "41%",
  },
  {
    index: "03",
    title: "统一调用",
    description: "固定参数与输出，通过同一 URL 复用",
    left: "72%",
  },
]

const configNotes = [
  {
    index: "01",
    title: "能力说明",
    description: "用 SKILL.md 定义适用范围、输入限制与调用规则",
    left: "8%",
  },
  {
    index: "02",
    title: "资源绑定",
    description: "关联已验证工作流，并补充 MCP、文件与脚本",
    left: "41%",
  },
  {
    index: "03",
    title: "预览调试",
    description: "用真实任务跑通链路，确认后保存与上线",
    left: "72%",
  },
]

const skillViews = [
  {
    id: "workflow",
    label: "工作流编排",
    heading: "节点编排 / 稳定调用",
    image: FULL_WORKFLOW_SCREENSHOT,
    imageWidth: 3840,
    imageHeight: 1854,
    figureLabel: "故事板测试工作流真实截图",
    alt: "万相星链故事板测试工作流完整画布，包含左侧节点导航、上下两条生成链路、代码与模型节点、主备结果合并和右侧输出节点",
    notes: workflowNotes,
  },
  {
    id: "config",
    label: "前台技能配置",
    heading: "能力封装 / 预览调试",
    image: SKILL_CONFIG_SCREENSHOT,
    imageWidth: 1920,
    imageHeight: 929,
    figureLabel: "商品卖点提炼文案技能配置与调试界面",
    alt: "if Studio 商品卖点提炼文案技能配置页，包含 SKILL.md、工作流资源绑定和预览调试区域",
    notes: configNotes,
  },
] as const

type SkillView = (typeof skillViews)[number]

export default function SlideStoryboardVideoSkill() {
  const [activeView, setActiveView] = useState<SkillView>(skillViews[0])

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070708] text-white">
      <style>{`
        @keyframes workflow-skill-view-enter {
          from { opacity: 0; transform: scale(0.997); }
          to { opacity: 1; transform: scale(1); }
        }

        .workflow-skill-view {
          animation: workflow-skill-view-enter 240ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .workflow-skill-view { animation: none; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 0% 46%, rgba(205,16,29,.22), transparent 32%), radial-gradient(ellipse at 100% 42%, rgba(205,16,29,.16), transparent 29%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
          maskImage: "linear-gradient(to bottom, black, transparent 72%)",
        }}
      />

      <header className="absolute top-[3.8%] right-[1.67%] left-[1.67%] z-10 flex items-end justify-between">
        <div>
          <div className="mb-[9px] flex items-center gap-[9px] text-[11px] font-semibold tracking-[0.18em] text-[#ef3b46]">
            <span className="h-px w-[30px] bg-[#ef3b46]" />
            WORKFLOW TO SKILL · R&amp;D
          </div>
          <h1
            className="m-0 flex items-center text-[40px] leading-[1.08] font-normal tracking-[-0.01em] whitespace-nowrap"
            style={{
              fontFamily:
                "'标小智无界黑', 'LogoSC Unbounded Sans', 'PingFang SC', sans-serif",
            }}
            aria-label={`工作流 Skill：${activeView.heading}`}
          >
            <span className="text-white">工作流 Skill</span>
            <span
              aria-hidden="true"
              className="mx-[16px] h-[30px] w-px bg-white/22"
            />
            <span className="text-[#ef3b46]">{activeView.heading}</span>
          </h1>
        </div>

        <div
          className="mb-[1px] flex items-center gap-[7px]"
          aria-label="工作流 Skill 展示控制"
        >
          <div
            className="flex items-center gap-[3px] rounded-full border border-white/12 bg-white/[0.055] p-[3px]"
            role="group"
            aria-label="切换工作流 Skill 能力展示"
          >
            {skillViews.map((view, index) => {
              const selected = activeView.id === view.id
              return (
                <button
                  key={view.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveView(view)}
                  className={cn(
                    "h-[25px] rounded-full border-0 px-[12px] text-[10px] font-semibold tracking-[0.02em] whitespace-nowrap transition-colors",
                    selected
                      ? "bg-[#ef3b46] text-white shadow-[0_4px_16px_rgba(239,59,70,.26)]"
                      : "bg-transparent text-white/52 hover:text-white"
                  )}
                >
                  <span className="mr-[5px] font-mono text-[8px] opacity-65">
                    0{index + 1}
                  </span>
                  {view.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <figure
        className="absolute top-[15.6%] right-[1.67%] left-[1.67%] m-0 overflow-visible rounded-[18px] border border-white/15 bg-white shadow-[0_28px_86px_rgba(0,0,0,.48)]"
        aria-label={activeView.figureLabel}
      >
        <Image
          key={activeView.id}
          src={activeView.image}
          alt={activeView.alt}
          width={activeView.imageWidth}
          height={activeView.imageHeight}
          sizes="95vw"
          priority
          unoptimized
          className="workflow-skill-view block h-auto w-full select-none rounded-[17px]"
          draggable={false}
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          aria-hidden="true"
        >
          {activeView.notes.map((note) => (
            <div
              key={note.index}
              className="absolute bottom-[-34px]"
              style={{ left: note.left, width: "236px" }}
            >
              <span className="mx-auto block h-[24px] w-px bg-gradient-to-b from-transparent to-[#ef3b46]" />
              <div className="rounded-[12px] border border-black/12 bg-[#0a0b0e]/92 px-[13px] py-[10px] shadow-[0_12px_28px_rgba(0,0,0,.2)] backdrop-blur-[6px]">
                <div className="flex items-center gap-[8px]">
                  <span className="font-mono text-[9px] font-bold tracking-[0.14em] text-[#ff4d57]">
                    {note.index}
                  </span>
                  <strong className="text-[12px] leading-none font-semibold text-white">
                    {note.title}
                  </strong>
                </div>
                <p className="mt-[6px] mb-0 text-[9px] leading-[1.45] text-white/54">
                  {note.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </figure>
    </div>
  )
}
