"use client"

import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import {
  Archive,
  ArrowUp,
  Brain,
  Bookmark,
  Check,
  FolderOpen,
  ImageIcon,
  ListTree,
  MessageCircle,
  MousePointer2,
  Plus,
  Route,
  Search,
  Shapes,
  ShoppingBag,
  Sparkles,
  Video,
  Workflow,
} from "lucide-react"

import { BentoCard } from "@/components/ui/bento"

const CARD_BORDER = "1px solid rgba(255,255,255,0.1)"
const CARD_SHADOW =
  "0 26px 64px rgba(0,0,0,0.48), inset 0 -30px 88px -52px rgba(134,134,240,0.2), inset 0 1px rgba(255,255,255,0.05)"
const VIDEO_ILLUSTRATIONS = "/images/if-studio/video-illustrations"
const GENERATED_COVERS = "/images/if-studio/generated-covers"

type CoverGraphicProps = {
  useGeneratedCover?: boolean
}

function CornerMarks() {
  const marks = [
    { left: "1.1%", top: "1.75%", borderLeft: true, borderTop: true },
    { right: "1.1%", top: "1.75%", borderRight: true, borderTop: true },
    { left: "1.1%", bottom: "1.75%", borderLeft: true, borderBottom: true },
    { right: "1.1%", bottom: "1.75%", borderRight: true, borderBottom: true },
  ]

  return (
    <>
      {marks.map((mark, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute z-50"
          style={{
            ...mark,
            width: "28px",
            height: "28px",
            borderLeft: mark.borderLeft
              ? "1px solid rgba(255,255,255,0.24)"
              : undefined,
            borderRight: mark.borderRight
              ? "1px solid rgba(255,255,255,0.24)"
              : undefined,
            borderTop: mark.borderTop
              ? "1px solid rgba(255,255,255,0.24)"
              : undefined,
            borderBottom: mark.borderBottom
              ? "1px solid rgba(255,255,255,0.24)"
              : undefined,
          }}
        />
      ))}
    </>
  )
}

function SelectionHandles() {
  const handles = [
    { left: "-5px", top: "-5px" },
    { right: "-5px", top: "-5px" },
    { left: "-5px", bottom: "-5px" },
    { right: "-5px", bottom: "-5px" },
  ]

  return (
    <>
      {handles.map((handle, index) => (
        <span
          key={index}
          className="absolute"
          style={{
            ...handle,
            width: "10px",
            height: "10px",
            border: "2px solid #aeea38",
            background: "#111410",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.7)",
          }}
        />
      ))}
    </>
  )
}

function InsightCard({
  ariaLabel,
  eyebrow,
  title,
  description,
  graphic,
  accent,
  style,
}: {
  ariaLabel: string
  eyebrow: string
  title: string
  description: string
  graphic: ReactNode
  accent: string
  style: CSSProperties
}) {
  return (
    <BentoCard
      ariaLabel={ariaLabel}
      accent={accent}
      className="insight-ui-card relative overflow-hidden"
      style={{
        ...style,
        border: `1px solid ${accent}32`,
        borderRadius: "28px",
        background:
          "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.035), transparent 52%), #090a0a",
        boxShadow: `${CARD_SHADOW}, inset 0 1px ${accent}28`,
      }}
    >
      <div className="absolute inset-0 z-10">{graphic}</div>
      <div
        className="absolute inset-x-0 bottom-0 z-30"
        style={{
          minHeight: "35%",
          padding: "56px 6.5% 22px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background:
            "linear-gradient(180deg, rgba(8,9,9,0) 0%, rgba(8,9,9,0.76) 36%, rgba(8,9,9,0.95) 62%, #080909 100%)",
        }}
      >
        <span
          style={{
            color: accent,
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "9px",
            fontWeight: 800,
            letterSpacing: "0.14em",
          }}
        >
          {eyebrow}
        </span>
        <h2
          style={{
            margin: "8px 0 0",
            color: "rgba(255,255,255,0.96)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "21px",
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            maxWidth: "620px",
            margin: "7px 0 0",
            color: "rgba(255,255,255,0.48)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "10.5px",
            lineHeight: 1.55,
          }}
        >
          {description}
        </p>
      </div>
    </BentoCard>
  )
}

function GeneratedCover({
  src,
  focalPoint = "center 40%",
  accent,
}: {
  src: string
  focalPoint?: string
  accent: string
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#020303" }}
    >
      <Image
        fill
        priority
        src={src}
        alt=""
        sizes="(max-width: 1280px) 46vw, 590px"
        draggable={false}
        style={{
          objectFit: "cover",
          objectPosition: focalPoint,
          opacity: 0.98,
          filter: "brightness(0.94) saturate(0.98) contrast(1.04)",
          transform: "scale(1.01)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${accent}1f, transparent 48%)`,
          mixBlendMode: "screen",
          opacity: 0.1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,3,3,0.02) 0%, rgba(2,3,3,0.06) 46%, rgba(2,3,3,0.3) 70%, rgba(8,9,9,0.96) 100%), linear-gradient(90deg, rgba(2,3,3,0.48) 0%, rgba(2,3,3,0.16) 58%, transparent 100%)",
          boxShadow:
            "inset 0 0 56px rgba(0,0,0,0.28), inset 0 1px rgba(255,255,255,0.025)",
        }}
      />
    </div>
  )
}

function EditorialCoverOverlay({
  accent,
  headline,
  meta,
  images,
  align = "left",
}: {
  accent: string
  headline: string
  meta: string
  images: string[]
  align?: "left" | "right"
}) {
  const textOnLeft = align === "left"

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-20"
      style={{ height: "64%" }}
    >
      <div
        className="absolute"
        style={{
          top: "7.5%",
          left: textOnLeft ? "5.8%" : undefined,
          right: textOnLeft ? undefined : "5.8%",
          textAlign: textOnLeft ? "left" : "right",
        }}
      >
        <span
          className="block"
          style={{
            color: accent,
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "7px",
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {meta}
        </span>
        <strong
          className="block"
          style={{
            marginTop: "6px",
            color: "rgba(255,255,255,0.92)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "25px",
            fontWeight: 800,
            lineHeight: 0.94,
            letterSpacing: "-0.055em",
            textShadow: "0 10px 30px rgba(0,0,0,0.56)",
          }}
        >
          {headline}
        </strong>
        <span
          className="mt-[9px] block"
          style={{
            width: "58px",
            height: "2px",
            marginLeft: textOnLeft ? 0 : "auto",
            background: accent,
            boxShadow: `0 0 12px ${accent}88`,
          }}
        />
      </div>

      <div
        className="absolute flex items-center"
        style={{
          top: "8%",
          left: textOnLeft ? undefined : "6%",
          right: textOnLeft ? "6%" : undefined,
          gap: "8px",
        }}
      >
        {images.map((src, index) => (
          <div
            key={src}
            className="relative overflow-visible"
            style={{
              width: index === 0 ? "76px" : "66px",
              height: index === 0 ? "52px" : "45px",
              marginTop: index === 0 ? 0 : "12px",
              border: `1px solid ${index === 0 ? accent : "rgba(255,255,255,0.34)"}`,
              borderRadius: "9px",
              background: "#101111",
              boxShadow:
                index === 0
                  ? `0 14px 30px rgba(0,0,0,0.48), 0 0 0 1px ${accent}24`
                  : "0 12px 28px rgba(0,0,0,0.42)",
              transform: `rotate(${index === 0 ? -3 : 4}deg)`,
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[8px]">
              <Image
                fill
                src={src}
                alt=""
                sizes="80px"
                draggable={false}
                style={{
                  objectFit: "cover",
                  filter: "saturate(0.92) contrast(1.06)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.18))",
                }}
              />
            </div>
            {index === 0 &&
              [
                { left: "-3px", top: "-3px" },
                { right: "-3px", top: "-3px" },
                { left: "-3px", bottom: "-3px" },
                { right: "-3px", bottom: "-3px" },
              ].map((handle, handleIndex) => (
                <span
                  key={handleIndex}
                  className="absolute z-20"
                  style={{
                    ...handle,
                    width: "6px",
                    height: "6px",
                    border: `1px solid ${accent}`,
                    background: "#0b0c0c",
                  }}
                />
              ))}
          </div>
        ))}
        <MousePointer2
          size={18}
          strokeWidth={1.4}
          style={{
            marginTop: "30px",
            marginLeft: "-13px",
            color: "rgba(255,255,255,0.82)",
            filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.7))",
            transform: "rotate(-8deg)",
          }}
        />
      </div>

      <div
        className="absolute flex items-center"
        style={{
          left: textOnLeft ? "5.8%" : undefined,
          right: textOnLeft ? undefined : "5.8%",
          bottom: "9%",
          gap: "5px",
        }}
      >
        {meta.split(" / ").map((item) => (
          <span
            key={item}
            style={{
              padding: "5px 8px 4px",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: "999px",
              color: "rgba(255,255,255,0.64)",
              background: "rgba(5,6,6,0.7)",
              backdropFilter: "blur(6px)",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "6px",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function WorkflowGraphic({ useGeneratedCover = true }: CoverGraphicProps) {
  if (useGeneratedCover) {
    return (
      <GeneratedCover
        src={`${GENERATED_COVERS}/workflow-cover-v5.webp`}
        focalPoint="center 38%"
        accent="#caff27"
      />
    )
  }

  const stages = [
    {
      label: "自动拆解",
      meta: "3 个任务",
      accent: "#ff715e",
      Icon: ListTree,
    },
    {
      label: "规划步骤",
      meta: "4 步计划",
      accent: "#9a84ff",
      Icon: Route,
    },
    {
      label: "生成结果",
      meta: "品牌 KV",
      accent: "#caff27",
      Icon: Sparkles,
    },
  ]

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 74% 18%, rgba(202,255,39,0.11), transparent 28%), radial-gradient(circle at 14% 42%, rgba(239,59,112,0.11), transparent 34%)",
        }}
      />
      <div
        className="absolute top-[5%] left-[5%] grid place-items-center"
        style={{
          width: "78px",
          height: "76px",
          filter: "drop-shadow(0 14px 18px rgba(61,86,255,0.28))",
          transform: "rotate(-8deg)",
        }}
      >
        <Image
          src={`${VIDEO_ILLUSTRATIONS}/rocket.webp`}
          alt=""
          width={360}
          height={354}
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <div
        className="absolute top-[6%] right-[6%] flex items-center"
        style={{
          width: "76%",
          height: "42px",
          padding: "0 10px 0 13px",
          gap: "10px",
          border: "1.5px solid rgba(185,255,64,0.72)",
          borderRadius: "13px",
          background: "rgba(20,22,21,0.94)",
          boxShadow:
            "0 16px 30px rgba(0,0,0,0.42), inset 0 1px rgba(255,255,255,0.07)",
        }}
      >
        <Search size={16} color="rgba(255,255,255,0.68)" strokeWidth={1.8} />
        <span
          style={{
            minWidth: 0,
            flex: 1,
            overflow: "hidden",
            color: "rgba(255,255,255,0.82)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "10.5px",
            whiteSpace: "nowrap",
          }}
        >
          为新品生成一套品牌视觉系统
        </span>
        <span
          style={{
            padding: "4px 7px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "999px",
            color: "rgba(255,255,255,0.46)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "6.5px",
            whiteSpace: "nowrap",
          }}
        >
          输入
        </span>
        <span
          className="grid place-items-center rounded-full"
          style={{
            width: "28px",
            height: "28px",
            flex: "0 0 auto",
            background: "#caff27",
            color: "#10130c",
          }}
        >
          <ArrowUp size={14} strokeWidth={2.2} />
        </span>
        <SelectionHandles />
      </div>

      <div
        className="absolute top-[27%] right-[6%] grid grid-cols-3"
        style={{ width: "74%", height: "58px", gap: "8px" }}
      >
        <span
          className="absolute top-1/2 right-[7%] left-[7%]"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(255,113,94,0.38), rgba(154,132,255,0.44), rgba(202,255,39,0.42))",
          }}
        />
        {stages.map((stage, index) => (
          <span
            key={stage.label}
            className="relative z-10 flex items-center"
            style={{
              padding: "7px 8px",
              gap: "7px",
              border: `1px solid ${stage.accent}32`,
              borderRadius: "12px",
              background: "rgba(13,15,15,0.94)",
              boxShadow: "0 9px 18px rgba(0,0,0,0.3)",
            }}
          >
            <span
              className="grid place-items-center"
              style={{
                width: "27px",
                height: "27px",
                flex: "0 0 auto",
                borderRadius: "9px",
                background: `${stage.accent}14`,
                color: stage.accent,
              }}
            >
              <stage.Icon size={14} strokeWidth={1.8} />
            </span>
            <span style={{ minWidth: 0 }}>
              <strong
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.76)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "8px",
                  fontWeight: 650,
                  whiteSpace: "nowrap",
                }}
              >
                {stage.label}
              </strong>
              <small
                style={{
                  display: "block",
                  marginTop: "3px",
                  color: index === 2 ? stage.accent : "rgba(255,255,255,0.32)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                {stage.meta}
              </small>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

function CanvasGraphic({ useGeneratedCover = true }: CoverGraphicProps) {
  if (useGeneratedCover) {
    return (
      <GeneratedCover
        src={`${GENERATED_COVERS}/canvas-cover-v5.webp`}
        focalPoint="center 39%"
        accent="#9a84ff"
      />
    )
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-[7%] right-[6%] left-[6%] overflow-hidden"
        style={{
          height: "59%",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "18px",
          background: "rgba(15,17,17,0.94)",
          boxShadow: "0 24px 42px rgba(0,0,0,0.38)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 flex items-center"
          style={{
            height: "38px",
            padding: "0 14px",
            gap: "7px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.025)",
          }}
        >
          {["#ff624f", "#caff27", "#7f6bff"].map((color) => (
            <span
              key={color}
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: color,
                opacity: 0.78,
              }}
            />
          ))}
          <span
            style={{
              marginLeft: "8px",
              color: "rgba(255,255,255,0.34)",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "7px",
              letterSpacing: "0.12em",
            }}
          >
            CONTINUOUS CANVAS
          </span>
          <span
            className="ml-auto flex items-center"
            style={{
              gap: "5px",
              color: "rgba(202,255,39,0.72)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "8px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#caff27",
                boxShadow: "0 0 8px rgba(202,255,39,0.7)",
              }}
            />
            Live
          </span>
        </div>

        <div
          className="absolute top-[38px] bottom-0 left-0"
          style={{
            width: "96px",
            padding: "10px 9px",
            borderRight: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {["参考素材", "生成记录", "资产引用"].map((label, index) => (
            <div
              key={label}
              className="flex items-center"
              style={{
                height: "25px",
                marginBottom: "5px",
                padding: "0 7px",
                gap: "6px",
                border:
                  index === 1 ? "1px solid rgba(202,255,39,0.16)" : CARD_BORDER,
                borderRadius: "9px",
                background:
                  index === 1
                    ? "rgba(202,255,39,0.055)"
                    : "rgba(255,255,255,0.025)",
                color:
                  index === 1
                    ? "rgba(229,255,171,0.76)"
                    : "rgba(255,255,255,0.38)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "7px",
              }}
            >
              {index === 0 ? (
                <Plus size={11} />
              ) : index === 1 ? (
                <Workflow size={11} />
              ) : (
                <Bookmark size={11} />
              )}
              {label}
            </div>
          ))}
        </div>

        <div className="absolute top-[38px] right-0 bottom-0 left-[96px]">
          <span
            className="absolute top-[47%] left-[24%]"
            style={{
              width: "13%",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(255,113,94,0.52), rgba(127,107,255,0.56))",
            }}
          />
          <span
            className="absolute top-[47%] left-[65%]"
            style={{
              width: "10%",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(127,107,255,0.5), rgba(202,255,39,0.42))",
            }}
          />

          <div
            className="absolute top-[13%] left-[4%] overflow-hidden"
            style={{
              width: "78px",
              height: "76px",
              border: "1px solid rgba(255,98,79,0.28)",
              borderRadius: "13px",
              background: "rgba(255,98,79,0.045)",
            }}
          >
            <div
              className="relative grid place-items-center"
              style={{
                height: "49px",
                background:
                  "radial-gradient(circle at 72% 30%, rgba(202,255,39,0.55) 0 8%, transparent 9%), linear-gradient(145deg, rgba(255,113,94,0.44), rgba(127,107,255,0.42) 58%, rgba(28,30,30,0.8))",
              }}
            >
              <ImageIcon
                size={20}
                color="rgba(255,255,255,0.78)"
                strokeWidth={1.5}
              />
              <span
                className="absolute top-[5px] left-[5px]"
                style={{
                  padding: "2px 4px",
                  borderRadius: "999px",
                  background: "rgba(6,7,7,0.58)",
                  color: "rgba(255,255,255,0.62)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "5.5px",
                }}
              >
                引用 1
              </span>
            </div>
            <span
              style={{
                display: "block",
                padding: "7px 8px 0",
                color: "rgba(255,255,255,0.52)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "6.5px",
              }}
            >
              参考图.png
            </span>
          </div>

          <div
            className="absolute top-[8%] left-[35%] grid place-items-center"
            style={{
              width: "118px",
              height: "86px",
              border: "1.5px solid rgba(127,107,255,0.48)",
              borderRadius: "15px",
              background:
                "linear-gradient(145deg, rgba(127,107,255,0.18), rgba(88,217,255,0.04))",
              boxShadow: "0 17px 28px rgba(64,61,190,0.16)",
            }}
          >
            <span
              className="absolute top-[7px] left-[8px]"
              style={{
                color: "rgba(255,255,255,0.42)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "6px",
              }}
            >
              生成画布
            </span>
            <span
              className="absolute top-[7px] right-[7px]"
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#caff27",
                boxShadow: "0 0 8px rgba(202,255,39,0.65)",
              }}
            />
            <Image
              src={`${VIDEO_ILLUSTRATIONS}/creative-board.webp`}
              alt=""
              width={205}
              height={211}
              draggable={false}
              style={{
                width: "58px",
                height: "60px",
                objectFit: "contain",
                filter: "drop-shadow(0 10px 12px rgba(85,83,255,0.22))",
                transform: "translateY(7px) rotate(4deg)",
              }}
            />
            <SelectionHandles />
          </div>

          <div
            className="absolute top-[12%] right-[4%] flex flex-col"
            style={{
              width: "112px",
              gap: "6px",
            }}
          >
            <div
              className="flex items-start"
              style={{
                minHeight: "34px",
                padding: "7px 8px",
                gap: "6px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px 10px 10px 3px",
                background: "rgba(255,255,255,0.035)",
              }}
            >
              <MessageCircle size={11} color="#9a84ff" strokeWidth={1.8} />
              <span
                style={{
                  color: "rgba(255,255,255,0.52)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "6.5px",
                  lineHeight: 1.35,
                }}
              >
                参考这张图生成
              </span>
            </div>
            <div
              className="flex items-start"
              style={{
                minHeight: "34px",
                padding: "7px 8px",
                gap: "6px",
                border: "1px solid rgba(202,255,39,0.15)",
                borderRadius: "10px 10px 3px 10px",
                background: "rgba(202,255,39,0.045)",
              }}
            >
              <Sparkles size={11} color="#caff27" strokeWidth={1.8} />
              <span
                style={{
                  color: "rgba(229,255,171,0.62)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "6.5px",
                  lineHeight: 1.35,
                }}
              >
                已生成 3 个方向
              </span>
            </div>
          </div>

          <MousePointer2
            className="absolute top-[67%] left-[61%]"
            size={18}
            color="rgba(255,255,255,0.72)"
            fill="#111212"
          />
        </div>
      </div>
    </div>
  )
}

function SkillsGraphic({ useGeneratedCover = true }: CoverGraphicProps) {
  if (useGeneratedCover) {
    return (
      <GeneratedCover
        src={`${GENERATED_COVERS}/skills-cover-v5.webp`}
        focalPoint="center 39%"
        accent="#ff6f5d"
      />
    )
  }

  const skills = [
    {
      title: "图片",
      tag: "IMAGE",
      color: "#ff715e",
      Icon: ImageIcon,
    },
    {
      title: "视频",
      tag: "VIDEO",
      color: "#9a84ff",
      Icon: Video,
    },
    {
      title: "品牌",
      tag: "BRAND",
      color: "#59d9ff",
      Icon: Shapes,
    },
    {
      title: "电商",
      tag: "COMMERCE",
      color: "#caff27",
      Icon: ShoppingBag,
    },
  ]

  return (
    <div
      aria-hidden="true"
      className="absolute top-[5%] right-[6%] left-[6%] flex"
      style={{ height: "44%", gap: "10px" }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: "29%",
          border: "1px solid rgba(127,107,255,0.22)",
          borderRadius: "17px",
          background:
            "radial-gradient(circle at 50% 46%, rgba(101,92,255,0.18), transparent 57%), rgba(255,255,255,0.018)",
        }}
      >
        <span
          className="absolute top-[8px] left-[11px]"
          style={{
            color: "rgba(255,255,255,0.32)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "6.5px",
            letterSpacing: "0.12em",
          }}
        >
          SKILL TOOLBOX
        </span>
        <span
          className="absolute left-1/2"
          style={{
            top: "25px",
            width: "44px",
            height: "17px",
            border: "2px solid rgba(154,132,255,0.42)",
            borderBottom: 0,
            borderRadius: "10px 10px 0 0",
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute right-[13px] bottom-[8px] left-[13px]"
          style={{
            height: "46px",
            border: "1px solid rgba(154,132,255,0.34)",
            borderRadius: "12px",
            background:
              "linear-gradient(145deg, rgba(127,107,255,0.26), rgba(255,113,94,0.11))",
            boxShadow: "0 12px 22px rgba(52,41,132,0.2)",
          }}
        >
          <span
            className="absolute right-[8px] bottom-[7px]"
            style={{
              padding: "2px 5px",
              borderRadius: "999px",
              background: "rgba(7,8,8,0.55)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "5.5px",
              letterSpacing: "0.08em",
            }}
          >
            12 SKILLS
          </span>
          <div
            className="absolute bottom-[8px] left-[9px] flex"
            style={{ gap: "4px" }}
          >
            {["#ff715e", "#9a84ff", "#caff27"].map((color) => (
              <span
                key={color}
                style={{
                  width: "7px",
                  height: "16px",
                  borderRadius: "3px",
                  background: color,
                  opacity: 0.74,
                }}
              />
            ))}
          </div>
        </div>
        <Image
          src={`${VIDEO_ILLUSTRATIONS}/pen.webp`}
          alt=""
          width={300}
          height={360}
          draggable={false}
          className="absolute left-1/2"
          style={{
            top: "20px",
            width: "43px",
            height: "63px",
            objectFit: "contain",
            filter: "drop-shadow(0 17px 18px rgba(78,96,255,0.24))",
            transform: "translateX(-50%) rotate(8deg)",
          }}
        />
      </div>

      <div
        className="grid min-w-0 flex-1 grid-cols-2 grid-rows-2"
        style={{ gap: "6px" }}
      >
        {skills.map((skill) => (
          <div
            key={skill.title}
            className="flex min-w-0 items-center"
            style={{
              padding: "6px 8px",
              gap: "7px",
              border: CARD_BORDER,
              borderRadius: "11px",
              background: "rgba(255,255,255,0.022)",
            }}
          >
            <span
              className="relative grid place-items-center overflow-hidden"
              style={{
                width: "32px",
                height: "32px",
                flex: "0 0 auto",
                border: `1px solid ${skill.color}32`,
                borderRadius: "9px",
                background: `linear-gradient(145deg, ${skill.color}25, rgba(255,255,255,0.018))`,
                color: skill.color,
              }}
            >
              <skill.Icon size={16} strokeWidth={1.6} />
              <span
                className="absolute right-[4px] bottom-[4px]"
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: skill.color,
                  boxShadow: `0 0 7px ${skill.color}99`,
                }}
              />
            </span>
            <span className="min-w-0 flex-1">
              <strong
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.74)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "9px",
                  fontWeight: 650,
                }}
              >
                {skill.title}
              </strong>
              <small
                style={{
                  display: "block",
                  marginTop: "3px",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                  fontSize: "5px",
                  letterSpacing: "0.08em",
                }}
              >
                {skill.tag}
              </small>
            </span>
            <Check size={10} color="rgba(202,255,39,0.62)" strokeWidth={2.2} />
          </div>
        ))}
      </div>
    </div>
  )
}

function AssetsGraphic({ useGeneratedCover = true }: CoverGraphicProps) {
  if (useGeneratedCover) {
    return (
      <GeneratedCover
        src={`${GENERATED_COVERS}/assets-cover-v6.webp`}
        focalPoint="center 40%"
        accent="#59d9ff"
      />
    )
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-[8%] left-[6%] overflow-hidden"
        style={{
          width: "53%",
          height: "53%",
          padding: "15px",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "18px",
          background:
            "linear-gradient(150deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-[8px]">
            <span
              className="grid place-items-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: "rgba(89,217,255,0.1)",
                color: "#59d9ff",
              }}
            >
              <Archive size={17} strokeWidth={1.7} />
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.78)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "11px",
                fontWeight: 650,
              }}
            >
              设计资产库
            </span>
          </span>
          <span
            style={{
              padding: "3px 6px",
              border: "1px solid rgba(89,217,255,0.16)",
              borderRadius: "999px",
              color: "rgba(130,229,255,0.58)",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "6px",
            }}
          >
            24 ITEMS
          </span>
        </div>
        <Image
          src={`${VIDEO_ILLUSTRATIONS}/video-cards.webp`}
          alt=""
          width={360}
          height={323}
          draggable={false}
          className="absolute top-[38px] right-[5px]"
          style={{
            width: "116px",
            height: "82px",
            objectFit: "contain",
            filter: "drop-shadow(0 14px 16px rgba(130,68,255,0.24))",
            transform: "rotate(-3deg)",
          }}
        />
        <div
          className="mt-[12px] grid grid-cols-2 gap-[5px]"
          style={{ width: "92px" }}
        >
          {["KV", "角色", "版式", "色板"].map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 5px",
                border: CARD_BORDER,
                borderRadius: "999px",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "7px",
                textAlign: "center",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className="absolute bottom-[8px] left-[15px]"
          style={{
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "6.5px",
          }}
        >
          24 项资产 · 12 个可复用
        </span>
      </div>

      <div
        className="absolute top-[8%] right-[6%]"
        style={{
          width: "33%",
          height: "24%",
          padding: "10px",
          border: "1px solid rgba(127,107,255,0.2)",
          borderRadius: "16px",
          background: "rgba(127,107,255,0.055)",
        }}
      >
        <div className="flex h-full items-center gap-[8px]">
          <span
            className="grid place-items-center"
            style={{
              width: "32px",
              height: "32px",
              flex: "0 0 auto",
              borderRadius: "11px",
              background: "rgba(127,107,255,0.13)",
              color: "#a894ff",
            }}
          >
            <Brain size={17} strokeWidth={1.7} />
          </span>
          <span>
            <strong
              style={{
                display: "block",
                color: "rgba(255,255,255,0.78)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "9.5px",
              }}
            >
              长期记忆
            </strong>
            <small
              style={{
                display: "block",
                marginTop: "3px",
                color: "rgba(255,255,255,0.34)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "6.5px",
              }}
            >
              语气 · 主色 · 画幅
            </small>
          </span>
          <span
            className="ml-auto"
            style={{
              color: "#a894ff",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "17px",
              fontWeight: 800,
            }}
          >
            12
          </span>
        </div>
      </div>

      <div
        className="absolute top-[32%] right-[6%]"
        style={{
          width: "33%",
          height: "19%",
          padding: "8px 9px",
          border: "1px solid rgba(202,255,39,0.18)",
          borderRadius: "16px",
          background: "rgba(202,255,39,0.04)",
        }}
      >
        <div className="relative flex h-full items-center justify-between">
          <span className="flex items-center gap-[8px]">
            <span
              className="grid place-items-center"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "11px",
                background: "rgba(202,255,39,0.1)",
                color: "#caff27",
              }}
            >
              <FolderOpen size={15} strokeWidth={1.7} />
            </span>
            <span>
              <strong
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "9.5px",
                  fontWeight: 650,
                }}
              >
                新品发布
              </strong>
              <small
                style={{
                  display: "block",
                  marginTop: "3px",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "6.5px",
                }}
              >
                项目 · 8 个资产
              </small>
            </span>
          </span>
          <span
            style={{
              color: "#caff27",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "8px",
              fontWeight: 800,
            }}
          >
            68%
          </span>
          <span
            className="absolute right-0 bottom-0 left-[40px] overflow-hidden"
            style={{
              height: "2px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="block h-full"
              style={{
                width: "68%",
                borderRadius: "inherit",
                background: "linear-gradient(90deg, #9a84ff, #caff27)",
              }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SlideIfStudioInsights() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#020303" }}
    >
      <style>{`
        .insight-ui-card {
          transition: border-color 220ms ease, box-shadow 220ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .insight-ui-card:hover {
            border-color: rgba(202,255,39,0.22) !important;
            box-shadow: 0 30px 72px rgba(0,0,0,0.56), inset 0 -30px 88px -52px rgba(134,134,240,0.24), inset 0 1px rgba(255,255,255,0.07) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .insight-ui-card,
          .insight-ui-card:hover {
            transition: none;
          }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            left: "8%",
            top: "-28%",
            width: "50%",
            height: "56%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(239,59,112,0.11), transparent 68%)",
            filter: "blur(42px)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "-8%",
            bottom: "-30%",
            width: "58%",
            height: "58%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(154,132,255,0.13), rgba(239,59,112,0.055) 46%, transparent 72%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "-8%",
            bottom: "-30%",
            width: "58%",
            height: "58%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(89,217,255,0.12), rgba(202,255,39,0.05) 48%, transparent 72%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "5%",
            top: "-24%",
            width: "48%",
            height: "56%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(202,255,39,0.07), rgba(127,107,255,0.04) 48%, transparent 70%)",
            filter: "blur(42px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.26) 0.55px, transparent 0.8px)",
            backgroundSize: "7px 7px",
          }}
        />
      </div>

      <CornerMarks />

      <header
        className="absolute z-20 flex items-end justify-between"
        style={{ left: "4.1%", right: "4.1%", top: "5.1%" }}
      >
        <div>
          <div className="flex items-center gap-[10px]">
            <span
              aria-hidden="true"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                background: "#ff5b4f",
                boxShadow: "0 0 12px rgba(255,91,79,0.72)",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.46)",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "9px",
                fontWeight: 800,
                letterSpacing: "0.16em",
              }}
            >
              IF STUDIO · 04 / CAPABILITY MAP
            </span>
          </div>
          <h1
            className="if-studio-project-title"
            style={{
              margin: "14px 0 0",
              color: "#fff",
            }}
          >
            <span style={{ color: "#ff4057" }}>if Studio</span>
            <span
              style={{
                marginLeft: "14px",
                color: "#fff",
              }}
            >
              能力介绍
            </span>
          </h1>
        </div>

        <p
          style={{
            maxWidth: "520px",
            margin: "0 0 3px",
            color: "rgba(255,255,255,0.54)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "13.5px",
            fontWeight: 550,
            lineHeight: 1.85,
            textAlign: "right",
          }}
        >
          从意图拆解到资产复用，设计不再是一次性的生成。
          <br />
          而是一套可回看、可编辑、可持续生长的完整创作流程。
        </p>
      </header>

      <main
        className="absolute z-20 grid"
        style={{
          left: "4.1%",
          right: "4.1%",
          top: "21.5%",
          bottom: "5.1%",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gridTemplateRows: "1.03fr 0.97fr",
          gap: "14px",
        }}
      >
        <InsightCard
          ariaLabel="从意图到设计流水线"
          eyebrow="01 / INTENT → WORKFLOW"
          title="不是抽卡，而是设计流水线"
          description="先理解意图与约束，再拆解任务、规划步骤，让每一步都可回看、介入和修正。"
          graphic={
            <>
              <WorkflowGraphic />
              <EditorialCoverOverlay
                accent="#caff27"
                headline="BRIEF → PLAN"
                meta="INTENT / CONSTRAINT / TASK"
                images={[
                  "/images/if-studio/capabilities/brand.webp",
                  "/images/if-studio/capabilities/social.webp",
                ]}
              />
            </>
          }
          accent="#caff27"
          style={{ gridColumn: "1 / 4", gridRow: "1" }}
        />
        <InsightCard
          ariaLabel="自由画布与连续对话"
          eyebrow="02 / CONTINUOUS CANVAS"
          title="自由画布 × 连续对话"
          description="素材、中间稿和反馈保持连接，围绕同一上下文持续生成、编辑、引用与再创作。"
          graphic={
            <>
              <CanvasGraphic />
              <EditorialCoverOverlay
                accent="#9b84ff"
                headline="KEEP CONTEXT"
                meta="GENERATE / EDIT / REUSE"
                images={[
                  "/images/if-studio/capabilities/illustration.webp",
                  "/images/if-studio/capabilities/creative.webp",
                ]}
                align="right"
              />
            </>
          }
          accent="#9b84ff"
          style={{ gridColumn: "4 / 7", gridRow: "1" }}
        />
        <InsightCard
          ariaLabel="前沿模型与专家 Skills"
          eyebrow="03 / EXPERT SKILLS"
          title="前沿模型 × 专家 Skills"
          description="把复杂能力封装成清晰、可组合的专业模块，业务人员也能直接调用。"
          graphic={
            <>
              <SkillsGraphic />
              <EditorialCoverOverlay
                accent="#ff6f5d"
                headline="MODEL + SKILL"
                meta="IMAGE / VIDEO / COMMERCE"
                images={[
                  "/images/if-studio/capabilities/commerce.webp",
                  "/images/if-studio/capabilities/fashion.webp",
                ]}
              />
            </>
          }
          accent="#ff6f5d"
          style={{ gridColumn: "1 / 4", gridRow: "2" }}
        />
        <InsightCard
          ariaLabel="可管理和复用的设计资产"
          eyebrow="04 / ASSET SYSTEM"
          title="生成的不只是素材，更是设计资产"
          description="结果可标记、保存、再编辑，并在后续物料和跨项目中持续复用。"
          graphic={
            <>
              <AssetsGraphic />
              <EditorialCoverOverlay
                accent="#59d9ff"
                headline="SAVE TO GROW"
                meta="TAG / STORE / REMIX"
                images={[
                  "/images/if-studio/capabilities/space.webp",
                  "/images/if-studio/capabilities/video.webp",
                ]}
                align="right"
              />
            </>
          }
          accent="#59d9ff"
          style={{ gridColumn: "4 / 7", gridRow: "2" }}
        />
      </main>
    </div>
  )
}
