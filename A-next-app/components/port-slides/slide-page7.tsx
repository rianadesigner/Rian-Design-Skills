"use client"

import { useState } from "react"
import {
  XinliuHomeExperience,
  RESEARCH_CAPABILITIES,
  type XinliuHomeMode,
} from "./xinliu-home-experience"

const PETAL_ASSET = "/images/page7/figma-home"

const overviewTags = ["六大工具 · 一触即达", "选好能力 · 即刻开工"]

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
              src={`/images/page7/ip-home-${decoration.cell}.webp`}
              alt=""
              className="absolute inset-0 h-full w-full"
              width={195}
              height={200}
              decoding="async"
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
