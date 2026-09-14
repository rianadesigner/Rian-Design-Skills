"use client"

import { useState } from "react"
import {
  XinliuHomeExperience,
  RESEARCH_CAPABILITIES,
  type XinliuHomeMode,
} from "./xinliu-home-experience"
import { XinliuReferencePanel } from "./xinliu-reference-panel"

const PETAL_ASSET = "/images/page7/figma-home"

const overviewTags = ["六大工具 · 一触即达", "选好能力 · 即刻开工"]

const miniToolCards = [
  {
    id: "writing",
    num: "01",
    title: "场景写作",
    caption: "类型、风格与长度快速设定",
  },
  {
    id: "document",
    num: "02",
    title: "文档阅读",
    caption: "文件、任务与追问自然衔接",
  },
  {
    id: "translate",
    num: "03",
    title: "一键翻译",
    caption: "语言切换后直接输入内容",
  },
] as const

const miniToolPlacements = {
  writing: { side: "left", top: "62%" },
  document: { side: "right", top: "44.5%" },
  translate: { side: "left", top: "33.5%" },
} as const

function MiniToolCard({ tool }: { tool: (typeof miniToolCards)[number] }) {
  return (
    <article className="min-w-0">
      <div
        style={{
          aspectRatio: tool.id === "translate" ? "702 / 542" : "702 / 545",
        }}
      >
        <XinliuReferencePanel
          kind={tool.id === "writing" ? "write" : tool.id}
          preview
        />
      </div>

      <div className="mt-[clamp(7px,calc(0.65*var(--u)),10px)] flex items-start gap-[7px]">
        <span
          className="shrink-0"
          style={{
            color: "#ef3b46",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "clamp(8px, calc(0.72 * var(--u)), 10px)",
            fontWeight: 800,
            letterSpacing: "0.08em",
          }}
        >
          {tool.num}
        </span>
        <div className="min-w-0">
          <h3
            className="m-0"
            style={{
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "clamp(9px, calc(0.86 * var(--u)), 12px)",
              fontWeight: 650,
              lineHeight: 1.2,
            }}
          >
            {tool.title}
          </h3>
          <p
            className="m-0 mt-[3px] truncate"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "clamp(7px, calc(0.68 * var(--u)), 10px)",
            }}
          >
            {tool.caption}
          </p>
        </div>
      </div>
    </article>
  )
}

const capabilities = [
  {
    num: "01",
    title: "做应用",
    summary: "把想法变成应用",
    icon: `${PETAL_ASSET}/icon-app.svg`,
  },
  {
    num: "02",
    title: "翻译",
    summary: "保留语气与上下文",
    icon: `${PETAL_ASSET}/icon-translate.svg`,
  },
  {
    num: "03",
    title: "打电话",
    summary: "代沟通并整理结果",
    icon: `${PETAL_ASSET}/icon-call.svg`,
  },
  {
    num: "04",
    title: "写作",
    summary: "选场景快速成稿",
    icon: `${PETAL_ASSET}/icon-write.svg`,
  },
  {
    num: "05",
    title: "读文档",
    summary: "提炼重点继续追问",
    icon: `${PETAL_ASSET}/icon-document.svg`,
  },
  {
    num: "06",
    title: "搜学术",
    summary: "检索文献，解答专业问题",
    icon: `${PETAL_ASSET}/icon-knowledge.svg`,
  },
] as const

const capabilityDecorationLayout = [
  {
    shell: `${PETAL_ASSET}/petal-code.svg`,
    left: "57.8%",
    top: "21.5%",
    size: "calc(6.6 * var(--u))",
    rotate: "-9deg",
    glow: "rgba(139,183,229,0.34)",
  },
  {
    shell: `${PETAL_ASSET}/petal-translate.svg`,
    left: "54.2%",
    top: "41.5%",
    size: "calc(5.4 * var(--u))",
    rotate: "8deg",
    glow: "rgba(167,199,231,0.3)",
  },
  {
    shell: `${PETAL_ASSET}/petal-call.svg`,
    left: "92.1%",
    top: "27.5%",
    size: "calc(5.35 * var(--u))",
    rotate: "11deg",
    glow: "rgba(237,176,154,0.3)",
  },
  {
    shell: `${PETAL_ASSET}/petal-write.svg`,
    left: "57.2%",
    top: "65.5%",
    size: "calc(5.8 * var(--u))",
    rotate: "-6deg",
    glow: "rgba(134,177,221,0.3)",
  },
  {
    shell: `${PETAL_ASSET}/petal-document.svg`,
    left: "92.4%",
    top: "50.5%",
    size: "calc(5.8 * var(--u))",
    rotate: "7deg",
    glow: "rgba(227,172,151,0.28)",
  },
  {
    shell: `${PETAL_ASSET}/petal-bottom.svg`,
    left: "95.5%",
    top: "74.5%",
    size: "calc(5.5 * var(--u))",
    rotate: "-8deg",
    glow: "rgba(127,170,215,0.3)",
  },
] as const

const ipDecorationLayout = [
  {
    cell: 0,
    left: "94%",
    top: "14.5%",
    size: "calc(7.2 * var(--u))",
    rotate: "8deg",
  },
  {
    cell: 3,
    left: "61.5%",
    top: "82%",
    size: "calc(7.5 * var(--u))",
    rotate: "-7deg",
  },
] as const

const flowSteps = [
  {
    num: "01",
    eyebrow: "HOME",
    title: "发现工具",
    description: "六瓣聚合高频能力，首页一步触达。",
  },
  {
    num: "02",
    eyebrow: "SELECT",
    title: "选择能力",
    description: "工具即任务，不再从空白输入开始。",
  },
  {
    num: "03",
    eyebrow: "CONFIG",
    title: "轻量配置",
    description: "只补充语言、文件、格式或对象。",
  },
  {
    num: "04",
    eyebrow: "CONTINUE",
    title: "结果衔接",
    description: "继续追问、编辑、导出或发起下一步。",
  },
] as const

const homeHighlights = [
  { title: "六瓣快捷入口", detail: "做应用、翻译、通话、写作、读文档与搜学术" },
  { title: "兴趣主动推荐", detail: "结合上下文，持续提供可直接开始的话题" },
  { title: "多模态输入", detail: "文字、语音与附件统一从底部输入框进入" },
  { title: "任务自然承接", detail: "从首页入口进入轻量配置，再继续完成任务" },
] as const

const interactionSteps = [
  {
    key: "HOVER",
    badge: "HO",
    title: "局部提亮",
    detail: "指针经过花瓣时，只增强当前曲面与边缘反馈。",
  },
  {
    key: "CLICK",
    badge: "CK",
    title: "聚焦任务",
    detail: "点击后六瓣收拢淡出，任务浮层自底部进入。",
  },
  {
    key: "CLOSE",
    badge: "←",
    title: "返回首页",
    detail: "关闭浮层后恢复六瓣位置与首页浏览状态。",
  },
] as const

const uiCallouts = [
  {
    title: "心流品牌识别",
    note: "品牌与当前身份",
    side: "left",
    left: "40.6%",
    top: "11.2%",
    lineWidth: "calc(3.7 * var(--u))",
  },
  {
    title: "六瓣快捷工具",
    note: "Hover 提亮 · 点击进入",
    side: "left",
    left: "38.9%",
    top: "36.2%",
    lineWidth: "calc(6.6 * var(--u))",
  },
  {
    title: "模式切换",
    note: "AI 搜索 / 高级研究",
    side: "right",
    left: "69.2%",
    top: "11.2%",
    lineWidth: "calc(4.8 * var(--u))",
  },
  {
    title: "兴趣问题推荐",
    note: "点击即可发起任务",
    side: "left",
    left: "39.5%",
    top: "74.2%",
    lineWidth: "calc(6.8 * var(--u))",
  },
  {
    title: "多模态输入",
    note: "附件 · 文本 · 语音",
    side: "right",
    left: "71.2%",
    top: "79.8%",
    lineWidth: "calc(4.8 * var(--u))",
  },
  {
    title: "全局导航",
    note: "首页 · 文件 · 探索 · 我的",
    side: "right",
    left: "71.2%",
    top: "88.3%",
    lineWidth: "calc(4.8 * var(--u))",
  },
] as const

function FlowPreview({ step }: { step: (typeof flowSteps)[number] }) {
  if (step.num === "01") {
    return (
      <div className="grid h-full grid-cols-3 place-content-center gap-[clamp(5px,calc(0.48*var(--u)),7px)] px-[9%]">
        {capabilities.map((capability) => (
          <span
            key={capability.num}
            className="grid aspect-square place-items-center rounded-[35%]"
            style={{
              background:
                capability.num === "02"
                  ? "radial-gradient(circle at 72% 18%, rgba(255,225,211,0.42), transparent 48%), linear-gradient(145deg, rgba(196,220,245,0.38), rgba(98,137,181,0.18))"
                  : "linear-gradient(145deg, rgba(235,245,255,0.22), rgba(112,151,194,0.1))",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <img
              src={capability.icon}
              alt=""
              className="h-[42%] w-[42%] object-contain opacity-90"
            />
          </span>
        ))}
      </div>
    )
  }

  if (step.num === "02") {
    return (
      <div className="flex h-full flex-col justify-center gap-[clamp(5px,calc(0.5*var(--u)),7px)] px-[8%]">
        {["翻译", "写作", "读文档"].map((label, index) => (
          <div
            key={label}
            className="flex items-center gap-[8px] rounded-[9px]"
            style={{
              padding:
                "clamp(5px, calc(0.5 * var(--u)), 7px) clamp(7px, calc(0.7 * var(--u)), 10px)",
              color:
                index === 0
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.48)",
              background:
                index === 0
                  ? "linear-gradient(100deg, rgba(144,181,219,0.28), rgba(241,185,160,0.14))"
                  : "rgba(255,255,255,0.035)",
              border:
                index === 0
                  ? "1px solid rgba(255,255,255,0.18)"
                  : "1px solid transparent",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "clamp(8px, calc(0.76 * var(--u)), 11px)",
              fontWeight: 600,
            }}
          >
            <span
              className="block rounded-full"
              style={{
                width: "clamp(5px, calc(0.48 * var(--u)), 7px)",
                height: "clamp(5px, calc(0.48 * var(--u)), 7px)",
                background: index === 0 ? "#f2c7b5" : "rgba(255,255,255,0.18)",
                boxShadow:
                  index === 0 ? "0 0 10px rgba(242,199,181,0.38)" : "none",
              }}
            />
            {label}
            {index === 0 && (
              <span className="ml-auto text-[0.9em] opacity-55">已选择</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (step.num === "03") {
    return (
      <div className="flex h-full flex-col justify-center px-[8%]">
        <div className="flex items-center gap-[6px]">
          {["自动检测", "中文"].map((label) => (
            <span
              key={label}
              className="flex-1 rounded-full text-center whitespace-nowrap"
              style={{
                padding: "clamp(5px, calc(0.48 * var(--u)), 7px) 4px",
                color: "rgba(255,255,255,0.72)",
                background: "rgba(255,255,255,0.075)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "clamp(7px, calc(0.7 * var(--u)), 10px)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <div
          className="mt-[clamp(6px,calc(0.58*var(--u)),8px)] rounded-[10px]"
          style={{
            height: "45%",
            padding: "clamp(7px, calc(0.68 * var(--u)), 10px)",
            color: "rgba(255,255,255,0.42)",
            background: "rgba(255,255,255,0.045)",
            border: "1px solid rgba(255,255,255,0.09)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(7px, calc(0.68 * var(--u)), 10px)",
            lineHeight: 1.45,
          }}
        >
          粘贴文字、上传图片，或直接说出需求…
          <span
            className="mt-[8%] block h-[3px] w-[68%] rounded-full"
            style={{ background: "rgba(255,255,255,0.09)" }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center px-[8%]">
      <div
        className="rounded-[10px]"
        style={{
          padding: "clamp(8px, calc(0.72 * var(--u)), 11px)",
          color: "rgba(255,255,255,0.76)",
          background:
            "linear-gradient(145deg, rgba(228,240,252,0.1), rgba(97,135,174,0.055))",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span className="block h-[4px] w-[80%] rounded-full bg-white/20" />
        <span className="mt-[7px] block h-[4px] w-full rounded-full bg-white/10" />
        <span className="mt-[7px] block h-[4px] w-[64%] rounded-full bg-white/10" />
      </div>
      <div className="mt-[clamp(7px,calc(0.64*var(--u)),9px)] flex gap-[5px]">
        {["继续追问", "编辑", "导出"].map((label, index) => (
          <span
            key={label}
            className="flex-1 rounded-full text-center whitespace-nowrap"
            style={{
              padding: "clamp(4px, calc(0.42 * var(--u)), 6px) 2px",
              color:
                index === 0
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.48)",
              background:
                index === 0
                  ? "rgba(118,157,198,0.23)"
                  : "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "clamp(6px, calc(0.62 * var(--u)), 9px)",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SlidePage7() {
  const [homeMode, setHomeMode] = useState<XinliuHomeMode>("search")
  const visibleCapabilities = capabilities.map((capability, index) =>
    homeMode === "research"
      ? {
          ...capability,
          title: RESEARCH_CAPABILITIES[index].label,
          icon: RESEARCH_CAPABILITIES[index].icon,
        }
      : capability
  )
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-0 h-full w-[24%]"
          style={{
            background:
              "radial-gradient(ellipse at 0% 48%, rgba(200,8,8,0.25) 0%, rgba(180,0,0,0.09) 46%, transparent 76%)",
          }}
        />
        <div
          className="absolute top-0 right-0 h-full w-[20%]"
          style={{
            background:
              "radial-gradient(ellipse at 100% 52%, rgba(200,8,8,0.2) 0%, rgba(180,0,0,0.07) 48%, transparent 78%)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "67.4%",
            top: "4%",
            width: "40%",
            height: "92%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse, rgba(111,153,197,0.09) 0%, rgba(47,72,101,0.025) 50%, transparent 77%)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 h-[52%] w-[70%]"
          style={{
            background:
              "radial-gradient(ellipse at 68% 100%, rgba(188,8,24,0.22) 0%, rgba(134,0,13,0.09) 42%, transparent 72%)",
          }}
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <header
          className="absolute z-10"
          style={{ left: "4.17%", top: "5.4%", width: "58.3%" }}
        >
          <h1 className="m-0 whitespace-nowrap" style={{ lineHeight: 1.34 }}>
            <span
              style={{
                color: "#ef3b46",
                fontSize: "clamp(22px, calc(2.5 * var(--u)), 36px)",
                fontFamily:
                  "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
                letterSpacing: "1.08px",
              }}
            >
              移动端
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: "clamp(22px, calc(2.5 * var(--u)), 36px)",
                fontFamily:
                  "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
                letterSpacing: "1.08px",
              }}
            >
              ｜快捷工具魔法箱
            </span>
          </h1>
          <p
            style={{
              margin: "clamp(5px, calc(0.55 * var(--u)), 8px) 0 0",
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(11px, calc(1.18 * var(--u)), 17px)",
              fontFamily: "'PingFang SC', sans-serif",
              lineHeight: 1.65,
            }}
          >
            一个入口承接日常高频任务，从能力选择、轻量配置到结果继续使用。
          </p>
          <div className="mt-[clamp(7px,calc(0.7*var(--u)),10px)] flex flex-wrap gap-[6px]">
            {overviewTags.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap"
                style={{
                  padding: "5px 11px",
                  color: "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.085)",
                  border: "1px solid rgba(255,255,255,0.17)",
                  borderRadius: "999px",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "clamp(9px, calc(0.9 * var(--u)), 13px)",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section
          className="absolute z-10 overflow-hidden"
          style={{
            left: "4.17%",
            top: "21.8%",
            width: "58.3%",
            height: "18.4%",
            padding: "clamp(11px, calc(1.06 * var(--u)), 15px)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "clamp(12px, calc(1.25 * var(--u)), 18px)",
            boxShadow:
              "0 18px 44px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div className="mb-[clamp(7px,calc(0.65*var(--u)),9px)] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span
                style={{
                  color: "#ffffff",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "clamp(11px, calc(1.08 * var(--u)), 16px)",
                  fontWeight: 650,
                }}
              >
                六个高频能力入口
              </span>
              <span
                className="h-[5px] w-[5px] rounded-full"
                style={{
                  background: "#ef3b46",
                  boxShadow: "0 0 12px rgba(239,59,70,0.6)",
                }}
              />
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.34)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "clamp(8px, calc(0.76 * var(--u)), 11px)",
              }}
            >
              与首页六瓣逐一对应
            </span>
          </div>
          <div
            className="grid grid-cols-6 gap-[clamp(5px,calc(0.48*var(--u)),7px)]"
            style={{ height: "calc(100% - 28px)" }}
          >
            {capabilities.map((capability) => (
              <article
                key={capability.num}
                className="relative flex min-w-0 items-center gap-[clamp(5px,calc(0.5*var(--u)),8px)] overflow-hidden rounded-[10px] px-[clamp(6px,calc(0.56*var(--u)),8px)]"
                style={{
                  background:
                    capability.num === "02"
                      ? "radial-gradient(circle at 82% 0%, rgba(244,194,173,0.17), transparent 48%), linear-gradient(145deg, rgba(173,207,240,0.12), rgba(255,255,255,0.035))"
                      : "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(119,155,194,0.025))",
                  border: "1px solid rgba(255,255,255,0.085)",
                }}
              >
                <span
                  className="grid shrink-0 place-items-center rounded-[8px]"
                  style={{
                    width: "clamp(25px, calc(2.3 * var(--u)), 33px)",
                    height: "clamp(25px, calc(2.3 * var(--u)), 33px)",
                    background: "rgba(186,213,240,0.09)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <img
                    src={capability.icon}
                    alt=""
                    className="h-[58%] w-[58%] object-contain"
                  />
                </span>
                <div className="min-w-0">
                  <h2
                    className="m-0 truncate"
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontFamily: "'PingFang SC', sans-serif",
                      fontSize: "clamp(9px, calc(0.86 * var(--u)), 13px)",
                      fontWeight: 650,
                      lineHeight: 1.35,
                    }}
                  >
                    {capability.title}
                  </h2>
                  <p
                    className="m-0 mt-[2px] truncate"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "'PingFang SC', sans-serif",
                      fontSize: "clamp(7px, calc(0.66 * var(--u)), 10px)",
                      lineHeight: 1.35,
                    }}
                  >
                    {capability.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="absolute z-10 overflow-hidden"
          style={{
            left: "4.17%",
            top: "42.3%",
            width: "58.3%",
            height: "52.2%",
            padding: "clamp(13px, calc(1.25 * var(--u)), 18px)",
            background:
              "radial-gradient(circle at 77% 6%, rgba(236,183,160,0.07), transparent 28%), radial-gradient(circle at 13% 100%, rgba(129,173,216,0.075), transparent 34%), rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "clamp(12px, calc(1.25 * var(--u)), 18px)",
            boxShadow:
              "0 18px 44px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center justify-between gap-[16px]">
            <div className="min-w-0">
              <h2
                className="m-0"
                style={{
                  color: "#ffffff",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "clamp(13px, calc(1.28 * var(--u)), 18px)",
                  fontWeight: 650,
                }}
              >
                快捷工具任务链路
              </h2>
              <p
                className="m-0 mt-[3px]"
                style={{
                  color: "rgba(255,255,255,0.38)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "clamp(8px, calc(0.82 * var(--u)), 12px)",
                }}
              >
                不同能力复用同一套任务认知模型，让用户知道下一步会发生什么
              </p>
            </div>
            <span
              className="shrink-0 rounded-full whitespace-nowrap"
              style={{
                padding: "5px 10px",
                color: "rgba(255,255,255,0.56)",
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.09)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "clamp(7px, calc(0.72 * var(--u)), 10px)",
                letterSpacing: "0.05em",
              }}
            >
              发现 → 选择 → 配置 → 使用
            </span>
          </div>
          <div
            className="mt-[clamp(11px,calc(1.08*var(--u)),16px)] grid grid-cols-4 gap-[clamp(8px,calc(0.78*var(--u)),11px)]"
            style={{ height: "calc(100% - 60px)" }}
          >
            {flowSteps.map((step, index) => (
              <article
                key={step.num}
                className="group relative flex min-h-0 flex-col overflow-visible rounded-[clamp(11px,calc(1.08*var(--u)),16px)]"
                style={{
                  padding: "clamp(9px, calc(0.86 * var(--u)), 13px)",
                  background:
                    index === 1
                      ? "radial-gradient(circle at 82% 2%, rgba(246,198,177,0.17), transparent 38%), linear-gradient(145deg, rgba(216,233,249,0.1), rgba(97,135,175,0.045))"
                      : "radial-gradient(circle at 12% 100%, rgba(145,187,226,0.08), transparent 42%), linear-gradient(145deg, rgba(255,255,255,0.075), rgba(92,128,166,0.03))",
                  border: "1px solid rgba(255,255,255,0.095)",
                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {index < flowSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-[48%] left-full z-20 flex -translate-x-[2px] -translate-y-1/2 items-center"
                    style={{ width: "clamp(8px, calc(0.78 * var(--u)), 11px)" }}
                  >
                    <span className="h-px flex-1 bg-white/15" />
                    <span
                      className="h-[5px] w-[5px] rotate-45 border-t border-r border-white/25"
                      style={{ marginLeft: "-3px" }}
                    />
                  </span>
                )}
                <div className="flex items-center justify-between gap-[8px]">
                  <span
                    className="grid place-items-center rounded-full"
                    style={{
                      width: "clamp(22px, calc(2.08 * var(--u)), 30px)",
                      height: "clamp(22px, calc(2.08 * var(--u)), 30px)",
                      color: index === 1 ? "#2f4054" : "#ffffff",
                      background:
                        index === 1
                          ? "linear-gradient(145deg, #f6d0bf, #c9def2)"
                          : "rgba(239,59,70,0.82)",
                      fontFamily: "'PingFang SC', sans-serif",
                      fontSize: "clamp(7px, calc(0.68 * var(--u)), 10px)",
                      fontWeight: 800,
                      boxShadow:
                        index === 1
                          ? "0 4px 14px rgba(212,186,178,0.18)"
                          : "none",
                    }}
                  >
                    {step.num}
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.27)",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: "clamp(6px, calc(0.6 * var(--u)), 9px)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {step.eyebrow}
                  </span>
                </div>
                <div
                  className="mt-[clamp(8px,calc(0.76*var(--u)),11px)] min-h-0 flex-1 overflow-hidden rounded-[clamp(9px,calc(0.9*var(--u)),13px)]"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 8%, rgba(243,196,177,0.08), transparent 42%), rgba(3,8,14,0.26)",
                    border: "1px solid rgba(255,255,255,0.055)",
                  }}
                >
                  <FlowPreview step={step} />
                </div>
                <h3
                  className="m-0 mt-[clamp(8px,calc(0.74*var(--u)),11px)]"
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "clamp(10px, calc(1.02 * var(--u)), 15px)",
                    fontWeight: 650,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="m-0 mt-[3px]"
                  style={{
                    color: "rgba(255,255,255,0.38)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "clamp(8px, calc(0.8 * var(--u)), 11.5px)",
                    lineHeight: 1.48,
                  }}
                >
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <header
        className="absolute z-10"
        style={{ left: "5.3%", top: "14%", width: "47%" }}
      >
        <p
          className="m-0"
          style={{
            color: "#ef3b46",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "clamp(9px, calc(0.82 * var(--u)), 12px)",
            fontWeight: 700,
            letterSpacing: "0.14em",
          }}
        >
          HEARTFLOW · MOBILE HOMEPAGE
        </p>
        <h1
          className="m-0 mt-[clamp(11px,calc(1.05*var(--u)),15px)] whitespace-nowrap"
          style={{
            color: "#ffffff",
            lineHeight: 1.15,
            fontSize: "36px",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            letterSpacing: "0.045em",
          }}
        >
          <span style={{ color: "#ef3b46" }}>首页</span>
          <span>快捷工具入口</span>
        </h1>
      </header>

      <section
        className="absolute z-10"
        aria-label="首页快捷工具入口介绍"
        style={{ left: "5.3%", top: "37%", width: "34.5%" }}
      >
        <span
          aria-hidden="true"
          className="block h-[3px] w-[clamp(54px,calc(5.6*var(--u)),82px)] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #ef3b46 0%, #ef3b46 42%, rgba(255,255,255,0.72) 100%)",
          }}
        />
        <div
          className="mt-[clamp(16px,calc(1.55*var(--u)),22px)]"
          style={{
            color: "rgba(255,255,255,0.72)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(14px, calc(1.32 * var(--u)), 19px)",
            lineHeight: 1.8,
            letterSpacing: "0.01em",
            textWrap: "pretty",
          }}
        >
          <p className="m-0">
            心流围绕用户意图，提供 AI
            搜索、深度搜索与高级研究等多种模式，将搜索、文档问答和学术精读串联起来，以清晰的过程展示和结构化结果承接不同复杂度的任务。
          </p>
          <p className="m-0 mt-[clamp(13px,calc(1.25*var(--u)),18px)]">
            移动端首页以六瓣聚合写作、翻译、做应用、打电话、读文档和搜学术六类高频能力。用户先选择能力，再通过全屏浮层补充必要信息，直接进入任务，在统一交互中完成从需求表达、任务执行到结果获取的衔接。
          </p>
        </div>
        <div className="mt-[clamp(20px,calc(2.08*var(--u)),30px)] flex flex-wrap gap-[clamp(8px,calc(0.8*var(--u)),12px)]">
          {overviewTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full whitespace-nowrap"
              style={{
                padding:
                  "clamp(7px, calc(0.7 * var(--u)), 10px) clamp(14px, calc(1.3 * var(--u)), 19px)",
                color: "rgba(255,255,255,0.88)",
                background: "rgba(255,255,255,0.13)",
                border: "1px solid rgba(255,255,255,0.22)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "clamp(10px, calc(1.02 * var(--u)), 15px)",
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section
        className="pointer-events-none absolute inset-0 z-20"
        aria-label="六瓣快捷工具元素"
        style={{ transform: "translateX(-10.6%)" }}
      >
        <div
          aria-hidden="true"
          className="absolute rounded-full border"
          style={{
            left: "57.8%",
            top: "12%",
            width: "37.5%",
            height: "77%",
            borderColor: "rgba(255,255,255,0.055)",
            transform: "rotate(-6deg)",
            boxShadow:
              "0 0 90px rgba(91,130,173,0.04), inset 0 0 80px rgba(255,255,255,0.012)",
          }}
        />

        {visibleCapabilities.map((capability, index) => {
          const decoration = capabilityDecorationLayout[index]

          return (
            <div
              key={capability.num}
              className="absolute"
              style={{
                left: decoration.left,
                top: decoration.top,
                width: decoration.size,
                aspectRatio: "1 / 1",
                transform: `translate(-50%, -50%) rotate(${decoration.rotate})`,
                filter: `drop-shadow(0 12px 22px ${decoration.glow})`,
              }}
            >
              <img
                src={decoration.shell}
                alt=""
                className="absolute inset-0 h-full w-full object-contain opacity-80"
                draggable={false}
              />
              <div
                className="absolute inset-[20%] grid place-items-center rounded-[34%] border"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(204,225,246,0.32), rgba(74,104,142,0.2))",
                  borderColor: "rgba(255,255,255,0.26)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.36), 0 8px 20px rgba(0,0,0,0.16)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <img
                  src={capability.icon}
                  alt=""
                  className="h-[54%] w-[54%] object-contain"
                  draggable={false}
                />
              </div>
              <span
                className="absolute top-[82%] left-1/2 -translate-x-1/2 rounded-full whitespace-nowrap"
                style={{
                  padding: "3px 8px",
                  color: "rgba(255,255,255,0.76)",
                  background: "rgba(7,9,13,0.76)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 5px 12px rgba(0,0,0,0.2)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "clamp(7px, calc(0.66 * var(--u)), 9.5px)",
                  fontWeight: 600,
                }}
              >
                {capability.title}
              </span>
            </div>
          )
        })}

        {ipDecorationLayout.map((decoration) => (
          <div
            key={decoration.cell}
            aria-hidden="true"
            className="absolute overflow-hidden"
            style={{
              left: decoration.left,
              top: decoration.top,
              width: decoration.size,
              aspectRatio: "195 / 200",
              transform: `translate(-50%, -50%) rotate(${decoration.rotate})`,
              filter: "drop-shadow(0 15px 24px rgba(25,52,112,0.36))",
            }}
          >
            <img
              src="/images/page7/ip-themes.png"
              alt=""
              className="absolute top-0 h-full max-w-none"
              style={{
                left: `-${decoration.cell * 100}%`,
                width: "800%",
              }}
              draggable={false}
            />
          </div>
        ))}

        <span
          aria-hidden="true"
          className="absolute h-[7px] w-[7px] rounded-full bg-[#ef535e]"
          style={{
            left: "59.8%",
            top: "51.5%",
            boxShadow: "0 0 18px rgba(239,83,94,0.72)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute h-[4px] w-[4px] rounded-full bg-white/80"
          style={{ left: "95.2%", top: "67%", boxShadow: "0 0 14px white" }}
        />
      </section>

      <div
        className="pointer-events-none absolute inset-0 z-20 hidden"
        aria-hidden="true"
      >
        {uiCallouts.map((callout) => (
          <div
            key={callout.title}
            className="absolute flex items-center"
            style={{ left: callout.left, top: callout.top }}
          >
            {callout.side === "right" && (
              <span
                className="relative block h-px shrink-0"
                style={{
                  width: callout.lineWidth,
                  background:
                    "linear-gradient(90deg, rgba(239,83,94,0.72), rgba(255,255,255,0.16))",
                }}
              >
                <span
                  className="absolute top-1/2 left-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: "#ef535e",
                    boxShadow: "0 0 10px rgba(239,83,94,0.5)",
                  }}
                />
              </span>
            )}

            <span
              className="block rounded-[9px] whitespace-nowrap"
              style={{
                minWidth: "clamp(96px, calc(8.6 * var(--u)), 124px)",
                padding:
                  "clamp(5px, calc(0.48 * var(--u)), 7px) clamp(8px, calc(0.72 * var(--u)), 11px)",
                background: "rgba(14,15,18,0.8)",
                border: "1px solid rgba(255,255,255,0.13)",
                boxShadow: "0 7px 18px rgba(0,0,0,0.24)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <strong
                className="block"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "clamp(8px, calc(0.72 * var(--u)), 10.5px)",
                  fontWeight: 650,
                  lineHeight: 1.25,
                }}
              >
                {callout.title}
              </strong>
              <small
                className="mt-[2px] block"
                style={{
                  color: "rgba(255,255,255,0.34)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "clamp(6px, calc(0.58 * var(--u)), 8.5px)",
                  lineHeight: 1.25,
                }}
              >
                {callout.note}
              </small>
            </span>

            {callout.side === "left" && (
              <span
                className="relative block h-px shrink-0"
                style={{
                  width: callout.lineWidth,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.16), rgba(239,83,94,0.72))",
                }}
              >
                <span
                  className="absolute top-1/2 right-0 h-[5px] w-[5px] translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: "#ef535e",
                    boxShadow: "0 0 10px rgba(239,83,94,0.5)",
                  }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      <section
        className="pointer-events-none absolute inset-0 z-10 hidden"
        aria-hidden="true"
        aria-label="快捷工具浮层组件"
      >
        <div
          className="absolute"
          style={{
            left: "calc(50% + 16.1 * var(--u))",
            top: "8.5%",
            width: "calc(21.2 * var(--u))",
          }}
        >
          <p
            className="m-0"
            style={{
              color: "#ef3b46",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "clamp(7px, calc(0.68 * var(--u)), 10px)",
              fontWeight: 750,
              letterSpacing: "0.13em",
            }}
          >
            TASK UI COMPONENTS
          </p>
          <h2
            className="m-0 mt-[5px]"
            style={{
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "clamp(12px, calc(1.18 * var(--u)), 17px)",
              fontWeight: 650,
              lineHeight: 1.45,
            }}
          >
            点击六瓣后进入对应轻配置浮层
          </h2>
          <span
            className="mt-[6px] block whitespace-nowrap"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "clamp(7px, calc(0.72 * var(--u)), 10.5px)",
            }}
          >
            选择能力 → 补齐信息 → 直接提交
          </span>
        </div>

        {miniToolCards.map((tool) => {
          const placement = miniToolPlacements[tool.id]
          const isLeft = placement.side === "left"

          return (
            <div
              key={tool.id}
              className="absolute"
              style={{
                top: placement.top,
                width: "calc(21.2 * var(--u))",
                ...(isLeft
                  ? { right: "calc(50% + 16.1 * var(--u))" }
                  : { left: "calc(50% + 16.1 * var(--u))" }),
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-[42%] h-px"
                style={{
                  width: "calc(2.55 * var(--u))",
                  ...(isLeft ? { left: "100%" } : { right: "100%" }),
                  background: isLeft
                    ? "linear-gradient(90deg, rgba(255,255,255,0.14), rgba(239,83,94,0.72))"
                    : "linear-gradient(90deg, rgba(239,83,94,0.72), rgba(255,255,255,0.14))",
                }}
              >
                <span
                  className="absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full"
                  style={{
                    ...(isLeft
                      ? { right: 0, transform: "translate(50%, -50%)" }
                      : { left: 0, transform: "translate(-50%, -50%)" }),
                    background: "#ef535e",
                    boxShadow: "0 0 10px rgba(239,83,94,0.5)",
                  }}
                />
              </span>
              <div className="relative z-10">
                <MiniToolCard tool={tool} />
              </div>
            </div>
          )
        })}
      </section>

      <section
        className="absolute z-10 hidden"
        style={{ left: "6.25%", top: "35.5%", width: "38.5%" }}
      >
        <div className="mb-[clamp(8px,calc(0.8*var(--u)),12px)] flex items-center gap-[8px]">
          <h2
            className="m-0"
            style={{
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "clamp(12px, calc(1.18 * var(--u)), 17px)",
              fontWeight: 650,
            }}
          >
            首页内容
          </h2>
          <span className="h-[5px] w-[5px] rounded-full bg-[#ef3b46] shadow-[0_0_12px_rgba(239,59,70,0.55)]" />
        </div>
        <div className="grid grid-cols-2 gap-[clamp(7px,calc(0.7*var(--u)),10px)]">
          {homeHighlights.map((item, index) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-[clamp(10px,calc(1*var(--u)),14px)]"
              style={{
                minHeight: "clamp(66px, calc(5.7 * var(--u)), 82px)",
                padding: "clamp(9px, calc(0.85 * var(--u)), 12px)",
                background:
                  index === 0
                    ? "radial-gradient(circle at 88% 0%, rgba(242,190,168,0.14), transparent 50%), linear-gradient(145deg, rgba(176,210,241,0.1), rgba(255,255,255,0.035))"
                    : "linear-gradient(145deg, rgba(255,255,255,0.065), rgba(109,146,185,0.025))",
                border: "1px solid rgba(255,255,255,0.085)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.035)",
              }}
            >
              <div className="flex items-center gap-[7px]">
                <span
                  className="grid shrink-0 place-items-center rounded-full"
                  style={{
                    width: "clamp(18px, calc(1.72 * var(--u)), 25px)",
                    height: "clamp(18px, calc(1.72 * var(--u)), 25px)",
                    color: index === 0 ? "#26394d" : "rgba(255,255,255,0.76)",
                    background:
                      index === 0
                        ? "linear-gradient(145deg, #f2c8b5, #c8ddf1)"
                        : "rgba(255,255,255,0.08)",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: "clamp(6px, calc(0.58 * var(--u)), 8px)",
                    fontWeight: 800,
                  }}
                >
                  0{index + 1}
                </span>
                <h3
                  className="m-0"
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "clamp(9px, calc(0.9 * var(--u)), 13px)",
                    fontWeight: 650,
                  }}
                >
                  {item.title}
                </h3>
              </div>
              <p
                className="m-0 mt-[5px]"
                style={{
                  color: "rgba(255,255,255,0.38)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "clamp(7px, calc(0.72 * var(--u)), 10.5px)",
                  lineHeight: 1.48,
                }}
              >
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="absolute z-10 hidden"
        style={{ left: "6.25%", top: "64%", width: "38.5%" }}
      >
        <div className="mb-[clamp(8px,calc(0.8*var(--u)),12px)] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <h2
              className="m-0"
              style={{
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "clamp(12px, calc(1.18 * var(--u)), 17px)",
                fontWeight: 650,
              }}
            >
              交互逻辑
            </h2>
            <span className="h-[5px] w-[5px] rounded-full bg-[#ef3b46] shadow-[0_0_12px_rgba(239,59,70,0.55)]" />
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.26)",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "clamp(7px, calc(0.66 * var(--u)), 9px)",
              letterSpacing: "0.1em",
            }}
          >
            HOVER · CLICK · CLOSE
          </span>
        </div>
        <div className="relative flex flex-col gap-[clamp(7px,calc(0.68*var(--u)),10px)]">
          <span
            aria-hidden="true"
            className="absolute top-[18%] bottom-[18%] left-[clamp(11px,calc(1.05*var(--u)),15px)] w-px bg-white/10"
          />
          {interactionSteps.map((step, index) => (
            <article
              key={step.key}
              className="relative flex items-center gap-[clamp(9px,calc(0.9*var(--u)),13px)] rounded-[clamp(9px,calc(0.9*var(--u)),13px)]"
              style={{
                padding: "clamp(8px, calc(0.74 * var(--u)), 11px)",
                background:
                  index === 1
                    ? "rgba(255,255,255,0.065)"
                    : "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="relative z-10 grid shrink-0 place-items-center rounded-full"
                style={{
                  width: "clamp(23px, calc(2.08 * var(--u)), 30px)",
                  height: "clamp(23px, calc(2.08 * var(--u)), 30px)",
                  color: index === 1 ? "#293d52" : "rgba(255,255,255,0.78)",
                  background:
                    index === 1
                      ? "linear-gradient(145deg, #f2c7b5, #c6dcef)"
                      : "rgba(21,29,39,0.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: "clamp(6px, calc(0.56 * var(--u)), 8px)",
                  fontWeight: 800,
                }}
              >
                {step.badge}
              </span>
              <div className="min-w-0">
                <h3
                  className="m-0"
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "clamp(9px, calc(0.9 * var(--u)), 13px)",
                    fontWeight: 650,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="m-0 mt-[2px] truncate"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "clamp(7px, calc(0.72 * var(--u)), 10.5px)",
                  }}
                >
                  {step.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: "67.4%",
          top: "50%",
          width: "calc(27.1 * var(--u))",
          maxWidth: "390px",
        }}
      >
        <div
          className="absolute top-[-3.8%] left-1/2 hidden -translate-x-1/2 rounded-full whitespace-nowrap"
          style={{
            padding: "5px 11px",
            color: "rgba(255,255,255,0.58)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(8px, calc(0.78 * var(--u)), 11px)",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          可交互原型 · HOVER / CLICK
        </div>
        <div
          className="relative overflow-hidden"
          style={{
            padding: "clamp(5px, calc(0.56 * var(--u)), 8px)",
            background:
              "linear-gradient(145deg, #25272d 0%, #07080b 52%, #24262c 100%)",
            border: "1px solid rgba(255,255,255,0.24)",
            borderRadius: "clamp(25px, calc(2.85 * var(--u)), 41px)",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.58), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          <div
            className="w-full overflow-hidden"
            style={{
              aspectRatio: "750 / 1612",
              borderRadius: "clamp(21px, calc(2.48 * var(--u)), 36px)",
            }}
          >
            <XinliuHomeExperience mode={homeMode} onModeChange={setHomeMode} />
          </div>
        </div>
      </aside>
    </div>
  )
}
