"use client"

import { useState } from "react"

type AgentStage = {
  index: string
  label: string
  english: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  splitImages?: Array<{ src: string; alt: string; label: string }>
  signals: string[]
}

const stages: AgentStage[] = [
  {
    index: "01",
    label: "任务启动",
    english: "START",
    title: "从代码助手，转向游戏创作搭档",
    description:
      "首页不再强调聊天工具，而是以任务入口、推荐能力与自动执行建立 AI Coworker 心智。",
    image: "/images/other-agent-projects/01-agent-home.png",
    imageAlt: "Tuanjie AI 游戏创作 Agent 首页",
    signals: ["AI Coworker 定位", "任务启动界面", "游戏能力链路"],
  },
  {
    index: "02",
    label: "意图对齐",
    english: "ALIGN",
    title: "先澄清目标，再开始执行",
    description:
      "Agent 主动补全游戏类型、运行环境与关键约束，把一句模糊需求变成可执行任务。",
    image: "/images/other-agent-projects/02-intent-config.png",
    imageAlt: "Tuanjie AI 意图配置界面",
    signals: ["关键问题确认", "推荐选项降低负担", "需求边界可见"],
  },
  {
    index: "03",
    label: "方案确认",
    english: "PLAN",
    title: "执行前，让方案与交付范围可预期",
    description:
      "通过主题、技术栈、核心玩法、预计时长和交付物说明，让用户确认后再授权 Agent 执行。",
    image: "/images/other-agent-projects/03-plan-confirm.png",
    imageAlt: "Tuanjie AI 方案确认界面",
    signals: ["Plan Agent 分工", "方案可修改", "交付物前置确认"],
  },
  {
    index: "04",
    label: "执行交付",
    english: "DELIVER",
    title: "过程可读，结果直接可预览",
    description:
      "将工具调用翻译成开发阶段、进度与验证结果，并在完成后直接交付可运行的游戏 Demo。",
    splitImages: [
      {
        src: "/images/other-agent-projects/04-execution-progress.png",
        alt: "Tuanjie AI 游戏任务执行进度",
        label: "EXECUTION / 任务执行",
      },
      {
        src: "/images/other-agent-projects/05-result-preview.png",
        alt: "Tuanjie AI 贪吃蛇游戏结果预览",
        label: "OUTPUT / 结果预览",
      },
    ],
    signals: ["阶段化任务进度", "自动测试与验证", "可运行 Demo 交付"],
  },
]

export default function SlideOtherAgentProjects() {
  const [activeStage, setActiveStage] = useState(0)
  const stage = stages[activeStage]

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "#070706",
        color: "#fff",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @keyframes agent-project-enter {
          from { opacity: 0; transform: translateY(8px) scale(.992); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-agent-stage-panel] { animation: none !important; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.034) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.034) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0"
        style={{
          width: "35%",
          background:
            "radial-gradient(ellipse at 0% 42%, rgba(230,61,30,.19), transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0"
        style={{
          width: "32%",
          background:
            "radial-gradient(ellipse at 100% 52%, rgba(187,39,24,.15), transparent 72%)",
        }}
      />

      <header
        className="absolute z-20 flex items-start justify-between"
        style={{ left: "4.17%", top: "4.5%", width: "91.66%" }}
      >
        <div>
          <div
            style={{
              color: "#e74c2f",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "1.25px",
            }}
          >
            SELECTED WORKS / AGENT EXPERIENCE
          </div>
          <h1
            style={{
              margin: "8px 0 0",
              color: "#fff",
              fontFamily:
                "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "42px",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "2px",
            }}
          >
            其他agent项目
          </h1>
        </div>

        <div
          className="flex items-center justify-end"
          style={{ marginTop: "12px", marginLeft: "auto" }}
        >
          <div
            style={{
              border: "1px solid rgba(232,71,39,.42)",
              color: "#ee6447",
              padding: "8px 12px",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "9px",
              letterSpacing: "1.1px",
              textAlign: "right",
            }}
          >
            UNITY CHINA · AI GAMING AGENT
          </div>
        </div>
      </header>

      <nav
        className="absolute z-30 grid"
        style={{
          left: "4.17%",
          top: "14.4%",
          width: "91.66%",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          borderTop: "1px solid rgba(255,255,255,.13)",
          borderBottom: "1px solid rgba(255,255,255,.13)",
        }}
        aria-label="游戏创作 Agent 流程切换"
      >
        {stages.map((item, index) => {
          const active = index === activeStage
          return (
            <button
              key={item.index}
              type="button"
              data-agent-stage-tab={item.index}
              onClick={(event) => {
                event.stopPropagation()
                setActiveStage(index)
              }}
              className="relative flex cursor-pointer items-center border-0 bg-transparent text-left"
              style={{
                height: "66px",
                padding: "0 20px",
                borderRight:
                  index < stages.length - 1
                    ? "1px solid rgba(255,255,255,.1)"
                    : undefined,
                background: active
                  ? "linear-gradient(90deg, rgba(225,61,31,.24), rgba(225,61,31,.045))"
                  : "rgba(255,255,255,.012)",
                color: active ? "#fff" : "rgba(255,255,255,.44)",
              }}
              aria-pressed={active}
            >
              <span
                style={{
                  marginRight: "14px",
                  color: active ? "#ef5233" : "rgba(255,255,255,.24)",
                  fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                  fontSize: "12px",
                }}
              >
                {item.index}
              </span>
              <span>
                <span
                  className="block"
                  style={{
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "14px",
                    fontWeight: 650,
                  }}
                >
                  {item.label}
                </span>
                <span
                  className="mt-[3px] block"
                  style={{
                    color: active ? "#e85a3d" : "rgba(255,255,255,.22)",
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: "8px",
                    letterSpacing: ".8px",
                  }}
                >
                  {item.english}
                </span>
              </span>
              {active ? (
                <span
                  className="absolute inset-x-0 bottom-0"
                  style={{ height: "2px", background: "#e84d2e" }}
                />
              ) : null}
            </button>
          )
        })}
      </nav>

      <section
        className="absolute z-20 grid"
        style={{
          left: "4.17%",
          top: "23.25%",
          width: "91.66%",
          height: "69.3%",
          gridTemplateColumns: "minmax(0, 1fr) 262px",
          border: "1px solid rgba(255,255,255,.14)",
          background: "rgba(7,7,7,.88)",
          boxShadow: "0 24px 70px rgba(0,0,0,.48)",
        }}
      >
        <div
          key={stage.index}
          data-agent-stage-panel={stage.index}
          className="relative min-w-0 overflow-hidden"
          style={{
            borderRight: "1px solid rgba(255,255,255,.12)",
            animation:
              "agent-project-enter 360ms cubic-bezier(.2,.75,.25,1) both",
          }}
        >
          {stage.splitImages ? (
            <div
              className="absolute grid"
              style={{
                inset: "20px",
                gridTemplateColumns: "43% 57%",
                gap: "12px",
              }}
            >
              {stage.splitImages.map((asset, index) => (
                <figure
                  key={asset.src}
                  className="relative m-0 overflow-hidden"
                  style={{
                    border:
                      index === 0
                        ? "1px solid rgba(204,61,42,.72)"
                        : "1px solid rgba(235,95,48,.72)",
                    background:
                      index === 0
                        ? "linear-gradient(180deg, rgba(93,29,21,.78), rgba(12,10,10,.98) 24%)"
                        : "linear-gradient(180deg, rgba(126,42,22,.78), rgba(12,10,10,.98) 24%)",
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,.025), 0 10px 28px rgba(0,0,0,.24)",
                  }}
                >
                  <figcaption
                    className="absolute left-0 right-0 top-0 z-10"
                    style={{
                      height: "34px",
                      padding: "10px 12px 0",
                      color: "rgba(255,255,255,.92)",
                      background:
                        index === 0
                          ? "linear-gradient(90deg, rgba(170,44,32,.96), rgba(98,28,23,.9))"
                          : "linear-gradient(90deg, rgba(213,69,37,.96), rgba(119,36,22,.9))",
                      fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                      fontSize: "8px",
                      letterSpacing: ".8px",
                      boxShadow: "0 5px 16px rgba(0,0,0,.28)",
                    }}
                  >
                    {asset.label}
                  </figcaption>
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    className="block h-full w-full"
                    style={{
                      objectFit: "contain",
                      objectPosition: index === 0 ? "center top" : "center center",
                      boxSizing: "border-box",
                      padding: "44px 10px 10px",
                    }}
                  />
                </figure>
              ))}
            </div>
          ) : (
            <div className="absolute" style={{ inset: "20px" }}>
              <img
                src={stage.image}
                alt={stage.imageAlt}
                className="block h-full w-full"
                style={{ objectFit: "contain", objectPosition: "center center" }}
              />
            </div>
          )}
        </div>

        <aside className="relative" style={{ padding: "25px 22px" }}>
          <div
            style={{
              color: "#e95132",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "9px",
              letterSpacing: "1.1px",
            }}
          >
            CORE LOGIC {stage.index} / {stage.english}
          </div>
          <h2
            style={{
              margin: "15px 0 0",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "23px",
              fontWeight: 650,
              lineHeight: 1.38,
              letterSpacing: ".2px",
            }}
          >
            {stage.title}
          </h2>
          <p
            style={{
              margin: "14px 0 0",
              color: "rgba(255,255,255,.45)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "12px",
              lineHeight: 1.72,
            }}
          >
            {stage.description}
          </p>

          <div style={{ marginTop: "25px" }}>
            {stage.signals.map((signal, index) => (
              <div
                key={signal}
                className="flex items-center"
                style={{
                  minHeight: "43px",
                  borderTop: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <span
                  style={{
                    width: "30px",
                    color: "#e84d2f",
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: "9px",
                  }}
                >
                  0{index + 1}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,.66)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "11px",
                  }}
                >
                  {signal}
                </span>
              </div>
            ))}
          </div>

          <div
            className="absolute inset-x-[22px] bottom-[22px]"
            style={{
              borderLeft: "2px solid #e84d2f",
              padding: "10px 12px",
              background:
                "linear-gradient(90deg, rgba(221,54,30,.16), rgba(221,54,30,.025))",
            }}
          >
            <div
              style={{
                color: "#e85a3d",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "8px",
                letterSpacing: ".8px",
              }}
            >
              EXPERIENCE UPGRADE
            </div>
            <div
              style={{
                marginTop: "5px",
                color: "rgba(255,255,255,.58)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "10px",
                lineHeight: 1.55,
              }}
            >
              对话工具 → 任务启动 → 可读流程 → 成果交付
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
