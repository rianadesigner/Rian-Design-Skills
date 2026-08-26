"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

const P_CAPABILITIES = "/images/if-studio/capabilities"

const capabilities = [
  {
    id: "brand",
    index: "01",
    title: "品牌设计",
    summary: "从 Icon 构思到 VI 延展，探索完整的品牌视觉语言。",
    image: `${P_CAPABILITIES}/brand.webp`,
    accent: "#ff6951",
  },
  {
    id: "illustration",
    index: "02",
    title: "图画创作",
    summary: "把文字与灵感转化为插画、配图和系列视觉内容。",
    image: `${P_CAPABILITIES}/illustration.webp`,
    accent: "#ca79ff",
  },
  {
    id: "video",
    index: "03",
    title: "视频创作",
    summary: "让静态素材动起来，完成营销短片与动态海报。",
    image: `${P_CAPABILITIES}/video.webp`,
    accent: "#72a8ff",
  },
  {
    id: "creative",
    index: "04",
    title: "创意玩法",
    summary: "用风格滤镜、艺术字效与创意合成强化记忆点。",
    image: `${P_CAPABILITIES}/creative.webp`,
    accent: "#ffb34e",
  },
  {
    id: "social",
    index: "05",
    title: "社媒物料",
    summary: "快速产出小红书封面、公众号配图与营销海报。",
    image: `${P_CAPABILITIES}/social.webp`,
    accent: "#f4d840",
  },
  {
    id: "commerce",
    index: "06",
    title: "电商创意",
    summary: "生成商品主图、细节图、场景图等营销物料。",
    image: `${P_CAPABILITIES}/commerce.webp`,
    accent: "#70dca4",
  },
  {
    id: "fashion",
    index: "07",
    title: "服饰设计",
    summary: "从图案、款式到面料效果，加速服饰创意探索。",
    image: `${P_CAPABILITIES}/fashion.webp`,
    accent: "#ff8cab",
  },
  {
    id: "space",
    index: "08",
    title: "空间设计",
    summary: "将空间构想转化为概念图、方案图与氛围渲染。",
    image: `${P_CAPABILITIES}/space.webp`,
    accent: "#70d8db",
  },
] as const

type Capability = (typeof capabilities)[number]

function CornerMarks() {
  const marks = [
    { left: "1.25%", top: "2.22%", borderLeft: true, borderTop: true },
    { right: "1.25%", top: "2.22%", borderRight: true, borderTop: true },
    { left: "1.25%", bottom: "2.22%", borderLeft: true, borderBottom: true },
    { right: "1.25%", bottom: "2.22%", borderRight: true, borderBottom: true },
  ]

  return (
    <>
      {marks.map((mark, index) => (
        <span
          key={index}
          className="pointer-events-none absolute z-30"
          style={{
            ...mark,
            width: "40px",
            height: "40px",
            borderLeft: mark.borderLeft
              ? "1px solid rgba(255,255,255,0.28)"
              : undefined,
            borderRight: mark.borderRight
              ? "1px solid rgba(255,255,255,0.28)"
              : undefined,
            borderTop: mark.borderTop
              ? "1px solid rgba(255,255,255,0.28)"
              : undefined,
            borderBottom: mark.borderBottom
              ? "1px solid rgba(255,255,255,0.28)"
              : undefined,
          }}
        />
      ))}
    </>
  )
}

function CapabilityCard({
  capability,
  active,
  onSelect,
}: {
  capability: Capability
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`查看${capability.title}案例`}
      onClick={onSelect}
      className="if-capability-card relative overflow-hidden text-left"
      style={{
        height: "108px",
        padding: "15px 15px 13px",
        border: `1px solid ${
          active ? `${capability.accent}90` : "rgba(255,255,255,0.12)"
        }`,
        borderRadius: "12px",
        background: active
          ? `linear-gradient(145deg, ${capability.accent}1e, rgba(255,255,255,0.055))`
          : "rgba(255,255,255,0.035)",
        boxShadow: active
          ? `0 12px 30px ${capability.accent}12, inset 0 1px rgba(255,255,255,0.08)`
          : "inset 0 1px rgba(255,255,255,0.04)",
        cursor: "pointer",
      }}
    >
      <div className="mb-[8px] flex items-center justify-between">
        <span
          style={{
            color: active ? capability.accent : "rgba(255,255,255,0.36)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          {capability.index}
        </span>
        <span
          aria-hidden="true"
          style={{
            width: active ? "22px" : "5px",
            height: "5px",
            borderRadius: "999px",
            background: active ? capability.accent : "rgba(255,255,255,0.18)",
            boxShadow: active ? `0 0 14px ${capability.accent}88` : "none",
            transition: "width 220ms ease, background-color 220ms ease",
          }}
        />
      </div>
      <h3
        style={{
          margin: 0,
          color: active ? "#fff" : "rgba(255,255,255,0.78)",
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: "15px",
          fontWeight: 650,
          lineHeight: 1.2,
        }}
      >
        {capability.title}
      </h3>
      <p
        style={{
          margin: "7px 0 0",
          color: "rgba(255,255,255,0.42)",
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: "10px",
          lineHeight: 1.45,
        }}
      >
        {capability.summary}
      </p>
    </button>
  )
}

export default function SlideIfStudioCapabilities() {
  const [activeId, setActiveId] = useState<Capability["id"]>(capabilities[0].id)
  const reduceMotion = useReducedMotion()
  const active =
    capabilities.find((capability) => capability.id === activeId) ?? capabilities[0]

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      <style>{`
        .if-capability-card {
          transition: border-color 180ms ease, background 180ms ease,
            box-shadow 180ms ease, transform 180ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .if-capability-card:hover {
            border-color: rgba(255,255,255,0.28) !important;
            transform: translateY(-2px);
          }
        }

        .if-capability-card:focus-visible {
          outline: 2px solid rgba(255,105,81,0.9);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .if-capability-card,
          .if-capability-card:hover {
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "26%",
            background:
              "radial-gradient(ellipse at 0% 50%, rgba(190,12,12,0.28) 0%, rgba(118,0,0,0.09) 48%, transparent 76%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "26%",
            background:
              "radial-gradient(ellipse at 100% 50%, rgba(190,12,12,0.28) 0%, rgba(118,0,0,0.09) 48%, transparent 76%)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "20%",
            top: "-18%",
            width: "60%",
            height: "45%",
            background: "radial-gradient(ellipse, rgba(255,91,62,0.1), transparent 68%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, transparent, black 30%, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 30%, black 80%, transparent)",
          }}
        />
      </div>

      <CornerMarks />

      <header
        className="absolute z-20 flex items-end justify-between"
        style={{ left: "4.17%", right: "4.17%", top: "6.7%" }}
      >
        <div>
          <div className="mb-[12px] flex items-center" style={{ gap: "10px" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#ff6951",
                boxShadow: "0 0 14px rgba(255,105,81,0.75)",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.52)",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              IF STUDIO · CAPABILITY MAP
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              color: "#fff",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "38px",
              fontWeight: 400,
              lineHeight: 1.18,
              letterSpacing: "1px",
              fontSynthesis: "none",
            }}
          >
            <span style={{ color: "#ef3b46" }}>if Studio </span>
            可以做什么？
          </h1>
        </div>
        <p
          style={{
            width: "52%",
            margin: "0 0 2px",
            color: "rgba(255,255,255,0.64)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: 1.72,
            textAlign: "right",
          }}
        >
          全场景覆盖，从灵感到落地。这里不是一串彼此无关的功能，
          <br />
          而是一套面向多领域创作者、可持续复用的完整创作流程。
        </p>
      </header>

      <section
        className="absolute z-10 overflow-hidden"
        style={{
          left: "4.17%",
          top: "20.8%",
          width: "63.2%",
          height: "70.6%",
          border: "1px solid rgba(255,255,255,0.17)",
          borderRadius: "14px",
          background: "#101010",
          boxShadow: "0 24px 70px rgba(0,0,0,0.46)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 z-20 flex items-center justify-between"
          style={{
            height: "54px",
            padding: "0 18px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(9,9,9,0.9)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <div className="flex items-center" style={{ gap: "12px" }}>
            <span
              style={{
                color: active.accent,
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {active.index}
            </span>
            <span
              style={{
                width: "1px",
                height: "13px",
                background: "rgba(255,255,255,0.18)",
              }}
            />
            <strong
              style={{
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "15px",
                fontWeight: 650,
              }}
            >
              {active.title}
            </strong>
          </div>
          <div className="flex items-center" style={{ gap: "7px" }} aria-hidden="true">
            {capabilities.map((capability) => (
              <span
                key={capability.id}
                style={{
                  width: capability.id === active.id ? "20px" : "4px",
                  height: "4px",
                  borderRadius: "999px",
                  background:
                    capability.id === active.id
                      ? active.accent
                      : "rgba(255,255,255,0.18)",
                  transition: "width 220ms ease, background-color 220ms ease",
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{
            top: "54px",
            background:
              "radial-gradient(ellipse at 50% 46%, rgba(255,255,255,0.055), transparent 68%), #0b0b0b",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={active.id}
              src={active.image}
              alt={`${active.title}创作案例界面`}
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain"
              style={{ objectPosition: "center center" }}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
            />
          </AnimatePresence>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
            style={{
              height: "42%",
              background:
                "linear-gradient(to bottom, transparent, rgba(7,7,7,0.35) 35%, rgba(7,7,7,0.96))",
            }}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${active.id}-caption`}
              className="absolute bottom-0 left-0 z-20"
              style={{ padding: "0 28px 24px", maxWidth: "72%" }}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.24 }}
            >
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.86)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                {active.summary}
              </p>
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute bottom-[27px] right-[24px] z-20 flex items-center"
            style={{ gap: "9px" }}
          >
            <span style={{ width: "28px", height: "1px", background: active.accent }} />
            <span
              style={{
                color: "rgba(255,255,255,0.46)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.08em",
              }}
            >
              实际创作案例
            </span>
          </div>
        </div>
      </section>

      <aside
        className="absolute z-20"
        style={{ right: "4.17%", top: "20.8%", width: "26.3%", height: "70.6%" }}
      >
        <div className="mb-[14px] flex items-center justify-between">
          <div>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.9)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "15px",
                fontWeight: 650,
              }}
            >
              覆盖 8 类高频创作场景
            </p>
            <p
              style={{
                margin: "5px 0 0",
                color: "rgba(255,255,255,0.36)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "10px",
              }}
            >
              选择场景，查看真实创作成果
            </p>
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.22)",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "25px",
              fontWeight: 700,
            }}
          >
            08
          </span>
        </div>

        <div className="grid grid-cols-2" style={{ gap: "9px" }}>
          {capabilities.map((capability) => (
            <CapabilityCard
              key={capability.id}
              capability={capability}
              active={capability.id === active.id}
              onSelect={() => setActiveId(capability.id)}
            />
          ))}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-between"
          style={{
            height: "38px",
            padding: "0 14px",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.025)",
          }}
        >
          {["灵感输入", "Agent 规划", "多模态生成", "成果复用"].map((step, index) => (
            <div key={step} className="flex items-center" style={{ gap: "8px" }}>
              <span
                style={{
                  color: index === 3 ? "#ff6951" : "rgba(255,255,255,0.5)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "9px",
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
              {index < 3 ? (
                <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "9px" }}>→</span>
              ) : null}
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
