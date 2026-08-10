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
    Component: SlidePage23,
  },
  {
    index: "02",
    shortLabel: "裂变桶",
    label: "内容化创意 · 裂变桶",
    meta: "文生视频 / 内容研究与验证",
    Component: SlidePage24,
  },
  {
    index: "03",
    shortLabel: "万相营造",
    label: "万相营造 · AI 工具",
    meta: "体验驱动 / 多模态创作平台",
    Component: SlidePage25,
  },
  {
    index: "04",
    shortLabel: "创意洞察",
    label: "创意洞察 · 大外投",
    meta: "经营洞察 / 创意投放系统",
    Component: SlidePage26,
  },
]

const PREVIEW_SCALE = 0.875

export default function SlideOtherCreativeProjects() {
  const [activeProject, setActiveProject] = useState(0)
  const ActiveProject = projects[activeProject].Component

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
          from { opacity: 0; transform: translateY(10px) scale(.988); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-other-project-panel] { animation: none !important; }
        }
        [data-other-project-tab]:focus-visible {
          outline: 2px solid #ff5a62 !important;
          outline-offset: 2px;
        }
        [data-other-project-tab][aria-pressed="false"]:hover {
          background: #171010 !important;
          color: #fff !important;
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
        className="absolute z-50"
        style={{ left: "4.17%", top: "4.3%" }}
      >
        <h1
          style={{
            margin: 0,
            color: "#fff",
            fontFamily:
              "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            fontSize: "46px",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "2px",
            textShadow: "0 4px 20px rgba(0,0,0,.82)",
          }}
        >
          其他创意项目
        </h1>
      </header>

      <nav
        className="absolute z-50 flex items-center"
        style={{
          left: "7.6%",
          top: "13.5%",
          gap: 0,
          padding: "3px",
          border: "1px solid rgba(222,47,58,.74)",
          borderRadius: "4px",
          background: "#050505",
          boxShadow:
            "0 12px 30px rgba(0,0,0,.5), 0 0 0 1px rgba(222,47,58,.08)",
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
              className="relative flex cursor-pointer items-center text-left"
              style={{
                height: "34px",
                minWidth: "102px",
                padding: "0 12px",
                border: 0,
                borderRight:
                  index < projects.length - 1
                    ? "1px solid rgba(222,47,58,.34)"
                    : undefined,
                borderRadius: "2px",
                background: active
                  ? "linear-gradient(110deg, #e33b45 0%, #bd1f2c 100%)"
                  : "#080808",
                color: active ? "#fff" : "rgba(255,255,255,.76)",
                boxShadow: active
                  ? "inset 0 0 0 1px rgba(255,255,255,.12), 0 7px 18px rgba(192,25,38,.34)"
                  : "none",
                outline: "none",
                transition:
                  "background 180ms ease, color 180ms ease, box-shadow 180ms ease",
                WebkitTapHighlightColor: "transparent",
              }}
              aria-pressed={active}
            >
              <span
                style={{
                  marginRight: "7px",
                  color: active ? "#fff" : "#e2444e",
                  fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                }}
              >
                {project.index}
              </span>
              <span
                style={{
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: "11px",
                  fontWeight: 650,
                  whiteSpace: "nowrap",
                }}
              >
                {project.shortLabel}
              </span>
            </button>
          )
        })}
      </nav>

      <div
        className="absolute z-20 overflow-hidden"
        style={{
          left: "6.25%",
          top: "11.65%",
          width: `${1440 * PREVIEW_SCALE}px`,
          height: `${900 * PREVIEW_SCALE}px`,
          border: "1px solid rgba(255,255,255,.2)",
          borderRadius: "16px",
          background: "#0b0b0b",
          boxShadow:
            "0 24px 70px rgba(0,0,0,.58), 0 0 0 1px rgba(205,46,55,.08)",
        }}
      >
        <div
          key={projects[activeProject].index}
          data-other-project-panel={projects[activeProject].index}
          className="absolute left-0 top-0"
          style={{
            width: "1440px",
            height: "900px",
            transform: `scale(${PREVIEW_SCALE})`,
            transformOrigin: "top left",
            animation:
              "other-project-enter 380ms cubic-bezier(.2,.75,.25,1) both",
          }}
        >
          <ActiveProject />
        </div>
      </div>

      <div
        className="pointer-events-none absolute z-50"
        style={{
          left: "7.6%",
          bottom: "3.2%",
          minWidth: "310px",
          padding: "12px 16px",
          border: "1px solid rgba(255,255,255,.17)",
          borderLeft: "3px solid #df3540",
          borderRadius: "3px 12px 12px 3px",
          background: "rgba(6,6,6,.78)",
          boxShadow: "0 14px 34px rgba(0,0,0,.42)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center" style={{ gap: "10px" }}>
          <span
            style={{
              color: "#e3424b",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "9px",
            }}
          >
            {projects[activeProject].index}
          </span>
          <span
            style={{
              color: "rgba(255,255,255,.92)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "13px",
              fontWeight: 650,
            }}
          >
            {projects[activeProject].label}
          </span>
        </div>
        <div
          style={{
            marginTop: "4px",
            marginLeft: "24px",
            color: "rgba(255,255,255,.46)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "10px",
          }}
        >
          {projects[activeProject].meta}
        </div>
      </div>

      <div
        className="pointer-events-none absolute z-50"
        style={{
          right: "7.6%",
          top: "13.5%",
          padding: "10px 13px",
          border: "1px solid rgba(255,255,255,.14)",
          borderRadius: "999px",
          color: "rgba(255,255,255,.58)",
          background: "rgba(5,5,5,.66)",
          fontFamily: "'LogoSC Unbounded Sans', sans-serif",
          fontSize: "8px",
          letterSpacing: ".8px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        SELECTED WORKS · 04 PROJECTS
      </div>
    </div>
  )
}
