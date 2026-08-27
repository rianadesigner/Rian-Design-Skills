"use client"

import { useState } from "react"
import SlidePage23 from "./slide-page23"
import SlidePage24 from "./slide-page24"
import SlidePage25 from "./slide-page25"
import SlidePage26 from "./slide-page26"

const projects = [
  {
    index: "01",
    shortLabel: "绘剪",
    label: "绘剪 · 短视频播种机",
    meta: "一键成片 / 站内规模化创意",
    signals: ["10s 智能成片", "规模化创意生产", "视频精品率提升"],
    Component: SlidePage23,
  },
  {
    index: "02",
    shortLabel: "裂变桶",
    label: "内容化创意 · 裂变桶",
    meta: "文生视频 / 内容研究与验证",
    signals: ["AI 剧本验证", "内容研究", "文生视频链路"],
    Component: SlidePage24,
  },
  {
    index: "03",
    shortLabel: "万相营造",
    label: "万相营造 · AI 工具",
    meta: "体验驱动 / 多模态创作平台",
    signals: ["多模态创作平台", "体验驱动", "AI 工具创新"],
    Component: SlidePage25,
  },
  {
    index: "04",
    shortLabel: "创意洞察",
    label: "创意洞察 · 大外投",
    meta: "经营洞察 / 创意投放系统",
    signals: ["经营链路分析", "创意投放", "大外投洞察"],
    Component: SlidePage26,
  },
]

const PREVIEW_SCALE = 0.66

export default function SlideOtherCreativeProjects() {
  const [activeProject, setActiveProject] = useState(0)
  const project = projects[activeProject]
  const ActiveProject = project.Component

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "#070707",
        color: "#fff",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @keyframes other-project-enter {
          from { opacity: 0; filter: blur(2px); }
          to { opacity: 1; filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-other-project-panel], [data-other-project-info] { animation: none !important; }
        }
        [data-other-project-tab]:focus-visible {
          outline: 2px solid #e84d2e !important;
          outline-offset: 2px;
        }
        [data-other-project-tab][aria-pressed="false"]:hover {
          background: rgba(232,77,46,.075) !important;
          color: rgba(255,255,255,.74) !important;
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0"
        style={{
          width: "28%",
          background:
            "radial-gradient(ellipse at 0% 45%, rgba(205,28,38,.25), transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0"
        style={{
          width: "28%",
          background:
            "radial-gradient(ellipse at 100% 52%, rgba(205,28,38,.2), transparent 72%)",
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
            SELECTED WORKS / CREATIVE EXPERIENCE
          </div>
          <h1
            style={{
              margin: "8px 0 0",
              color: "#fff",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "42px",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "2px",
            }}
          >
            其他创意项目
          </h1>
        </div>

        <div
          style={{
            marginTop: "12px",
            marginLeft: "auto",
            border: "1px solid rgba(232,71,39,.42)",
            color: "#ee6447",
            padding: "8px 12px",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "1.1px",
            textAlign: "right",
          }}
        >
          ALIMAMA · AI CREATIVE SYSTEMS
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
        aria-label="其他创意项目切换"
      >
        {projects.map((project, index) => {
          const active = index === activeProject
          return (
            <button
              key={project.index}
              type="button"
              data-other-project-tab={project.index}
              onClick={(event) => {
                event.stopPropagation()
                setActiveProject(index)
              }}
              className="relative flex cursor-pointer items-center border-0 bg-transparent text-left"
              style={{
                height: "66px",
                padding: "0 20px",
                borderRight:
                  index < projects.length - 1
                    ? "1px solid rgba(255,255,255,.1)"
                    : undefined,
                background: active
                  ? "linear-gradient(90deg, rgba(225,61,31,.24), rgba(225,61,31,.045))"
                  : "rgba(255,255,255,.012)",
                color: active ? "#fff" : "rgba(255,255,255,.44)",
                outline: "none",
                transition: "background 180ms ease, color 180ms ease",
                WebkitTapHighlightColor: "transparent",
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
                {project.index}
              </span>
              <span>
                <span
                  className="block"
                  style={{
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "14px",
                    fontWeight: 650,
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.shortLabel}
                </span>
                <span
                  className="mt-[3px] block"
                  style={{
                    color: active ? "#e85a3d" : "rgba(255,255,255,.22)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "8px",
                    letterSpacing: ".3px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.meta}
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
          className="relative min-w-0 overflow-hidden"
          style={{
            borderRight: "1px solid rgba(255,255,255,.12)",
            background:
              "radial-gradient(circle at 50% 48%, rgba(232,77,46,.06), transparent 58%), #080808",
          }}
        >
          <div
            key={project.index}
            data-other-project-panel={project.index}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              width: "1440px",
              height: "900px",
              transform: `translate(-50%, -50%) scale(${PREVIEW_SCALE})`,
              transformOrigin: "center center",
              border: "1px solid rgba(255,255,255,.2)",
              background: "#0b0b0b",
              boxShadow: "0 18px 46px rgba(0,0,0,.42)",
              animation:
                "other-project-enter 380ms cubic-bezier(.2,.75,.25,1) both",
            }}
          >
            <ActiveProject />
          </div>
        </div>

        <aside className="relative" style={{ padding: "25px 22px" }}>
          <div
            key={project.index}
            data-other-project-info={project.index}
            style={{
              animation:
                "other-project-enter 340ms cubic-bezier(.2,.75,.25,1) both",
            }}
          >
            <div
              style={{
                color: "#e95132",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "9px",
                letterSpacing: "1.1px",
              }}
            >
              CURRENT PROJECT {project.index} / 04
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
              {project.label}
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
              {project.meta}
            </p>

            <div style={{ marginTop: "25px" }}>
              {project.signals.map((signal, index) => (
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
              CREATIVE SYSTEMS
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
              生成工具 → 内容验证 → 创作平台 → 经营洞察
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
