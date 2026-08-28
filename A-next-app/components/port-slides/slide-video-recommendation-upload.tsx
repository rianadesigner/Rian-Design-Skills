import { Play, ScanSearch, Upload } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  SectionLabel,
  VIDEO_RED,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const stages: Array<{
  index: string
  title: string
  body: string
  image: string
  alt: string
  Icon: LucideIcon
}> = [
  {
    index: "01",
    title: "推荐视频 & 开始创作",
    body: "用可播放的成片建立风格、质量与能力预期。",
    image: "/images/page34/riff-home-logged-in.webp",
    alt: "Riff 已登录首页，展示推荐灵感、视频素材与开始创作入口",
    Icon: Play,
  },
  {
    index: "02",
    title: "主动开始创作",
    body: "确认想做的方向后，从相册或近期项目选择素材。",
    image: "/images/page34/upload-picker-check-centered.webp",
    alt: "视频与照片素材上传选择页",
    Icon: Upload,
  },
  {
    index: "03",
    title: "支持多素材创作",
    body: "识别人像、场景与可用片段，把原始素材变成创作上下文。",
    image: "/images/page34/multi-material-editor.webp",
    alt: "支持同时使用六张素材进行引导编辑的多素材创作页",
    Icon: ScanSearch,
  },
]

const decisions = [
  ["01", "结果先行", "先判断是否值得开始"],
  ["02", "方向确认", "从喜欢变成明确意图"],
  ["03", "素材投入", "在有预期后再上传"],
  ["04", "分析承接", "直接带着理解进入编辑"],
]

function PhoneStage({ stage }: { stage: (typeof stages)[number] }) {
  const { index, title, image, alt, Icon } = stage

  return (
    <article className="relative h-full min-w-0">
      <div className="flex items-start" style={{ height: 55, paddingLeft: 10 }}>
        <span
          className="flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            marginRight: 10,
            border: "1px solid rgba(239,63,70,.5)",
            borderRadius: "50%",
            color: VIDEO_RED,
          }}
        >
          <Icon size={14} strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <div
            style={{
              color: VIDEO_RED,
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: 9,
              letterSpacing: ".7px",
            }}
          >
            STEP {index}
          </div>
          <h2
            style={{
              margin: "4px 0 0",
              color: "rgba(255,255,255,.92)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 16,
              fontWeight: 650,
              letterSpacing: 0,
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </h2>
        </div>
      </div>

      <div
        className="absolute overflow-hidden"
        style={{
          left: 48,
          top: 58,
          width: 246,
          height: 533,
          border: "1px solid rgba(255,255,255,.24)",
          borderRadius: 25,
          background: "#111",
          boxShadow: "0 24px 52px rgba(0,0,0,.62)",
        }}
      >
        <img
          src={image}
          alt={alt}
          draggable={false}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center top" }}
        />
      </div>
    </article>
  )
}

export default function SlideVideoRecommendationUpload() {
  return (
    <VideoThinkingFrame>
      <VideoThinkingHeader
        index="03"
        eyebrow="RECOMMENDATION-FIRST CREATION"
        title="先看到想做的"
        accent="再从素材开始"
      />

      <main
        className="absolute z-10 grid"
        style={{
          left: "4.2%",
          top: "21.5%",
          width: "91.6%",
          height: "70%",
          gridTemplateColumns: "24% 76%",
          borderTop: "1px solid rgba(255,255,255,.13)",
          borderBottom: "1px solid rgba(255,255,255,.13)",
        }}
      >
        <section
          className="relative"
          style={{
            padding: "29px 28px 24px 0",
            borderRight: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <SectionLabel>DESIGN STRATEGY</SectionLabel>
          <h2
            style={{
              margin: "14px 0 10px",
              color: "rgba(255,255,255,.94)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 24,
              fontWeight: 650,
              lineHeight: 1.35,
            }}
          >
            把推荐内容
            <br />
            变成创作起点
          </h2>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,.48)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 13,
              lineHeight: 1.75,
            }}
          >
            用户不需要先理解工具。先用推荐视频建立目标，再承接上传与分析，能够减少空白输入压力和无效素材投入。
          </p>

          <div style={{ marginTop: 23 }}>
            {decisions.map(([index, title, body]) => (
              <div
                key={index}
                className="grid items-center"
                style={{
                  minHeight: 55,
                  gridTemplateColumns: "34px 68px 1fr",
                  borderTop: "1px solid rgba(255,255,255,.09)",
                }}
              >
                <span
                  style={{
                    color: VIDEO_RED,
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: 10,
                  }}
                >
                  {index}
                </span>
                <strong
                  style={{
                    color: "rgba(255,255,255,.75)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {title}
                </strong>
                <span
                  style={{
                    color: "rgba(255,255,255,.38)",
                    fontSize: 10,
                    lineHeight: 1.45,
                  }}
                >
                  {body}
                </span>
              </div>
            ))}
          </div>

          <div
            className="absolute"
            style={{
              left: 0,
              right: 28,
              bottom: 22,
              padding: "12px 14px",
              borderLeft: `2px solid ${VIDEO_RED}`,
              background:
                "linear-gradient(90deg, rgba(132,10,16,.24), rgba(132,10,16,.03))",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,.34)",
                fontSize: 9,
                letterSpacing: ".6px",
              }}
            >
              CORE PRINCIPLE
            </div>
            <div
              style={{
                marginTop: 5,
                color: "rgba(255,255,255,.73)",
                fontSize: 12,
              }}
            >
              先降低决策成本，再要求用户投入素材。
            </div>
          </div>
        </section>

        <section
          className="relative grid"
          style={{
            padding: "22px 0 0 24px",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          {stages.map((stage) => (
            <PhoneStage key={stage.index} stage={stage} />
          ))}
        </section>
      </main>
    </VideoThinkingFrame>
  )
}
