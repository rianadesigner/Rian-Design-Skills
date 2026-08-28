"use client"

/* eslint-disable @next/next/no-img-element */

import { useState } from "react"

const P_IF_STUDIO = "/images/if-studio"

const skillScreens = [
  {
    id: "plaza",
    label: "广场",
    title: "技能广场",
    caption: "发现适合创作场景的 Skill",
    image: `${P_IF_STUDIO}/skills-plaza-2026.webp`,
    alt: "if Studio 技能广场全量技能列表",
  },
  {
    id: "detail",
    label: "详情",
    title: "技能详情",
    caption: "理解能力、输入要求与使用示例",
    image: `${P_IF_STUDIO}/skill-detail-2026.png`,
    alt: "if Studio 试穿套图技能详情",
  },
] as const

type SkillScreen = (typeof skillScreens)[number]

export default function SlideIfStudioSkills() {
  const [skillScreen, setSkillScreen] = useState<SkillScreen>(skillScreens[0])

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      <style>{`
        .if-studio-skills-panel {
          transition: border-color 180ms ease-out, box-shadow 180ms ease-out;
        }

        .if-studio-skills-image {
          top: 0;
          transform: translateY(0);
          transition: top 1.2s ease-out, transform 1.2s ease-out;
          will-change: top, transform;
          animation: if-studio-skills-enter 260ms ease-out both;
        }

        @keyframes if-studio-skills-enter {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (hover: hover) and (pointer: fine) {
          .if-studio-skills-panel:hover {
            border-color: rgba(199,255,51,0.58) !important;
            box-shadow: 0 22px 70px rgba(0,0,0,0.52), 0 0 0 1px rgba(199,255,51,0.15) inset !important;
          }

          .if-studio-skills-viewport[data-scroll="true"]:hover .if-studio-skills-image {
            top: 100%;
            transform: translateY(-100%);
            transition-duration: 16s;
            transition-timing-function: linear;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .if-studio-skills-image,
          .if-studio-skills-viewport[data-scroll="true"]:hover .if-studio-skills-image {
            top: 0;
            transform: translateY(0);
            transition: none;
            animation: none;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "25%",
            background:
              "radial-gradient(ellipse at 0% 52%, rgba(111,151,22,0.18) 0%, rgba(84,112,18,0.06) 48%, transparent 76%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "25%",
            background:
              "radial-gradient(ellipse at 100% 52%, rgba(190,12,12,0.24) 0%, rgba(118,0,0,0.08) 48%, transparent 76%)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "24%",
            top: "-18%",
            width: "52%",
            height: "46%",
            background:
              "radial-gradient(ellipse, rgba(199,255,51,0.07), transparent 68%)",
          }}
        />
      </div>

      <header
        className="absolute z-20 flex items-start justify-between"
        style={{ left: "4.17%", right: "4.17%", top: "6.35%" }}
      >
        <div>
          <div className="mb-[9px] flex items-center" style={{ gap: "10px" }}>
            <span
              aria-hidden="true"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#c7ff33",
                boxShadow: "0 0 14px rgba(199,255,51,0.72)",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              IF STUDIO · 04
            </span>
          </div>
          <h1
            className="if-studio-project-title"
            style={{
              margin: 0,
              color: "#fff",
            }}
          >
            <span>if Studio</span>
            <span style={{ marginLeft: "14px", color: "#ef3b46" }}>
              技能广场
            </span>
          </h1>
        </div>

        <div style={{ width: "49%", marginTop: "13px", textAlign: "right" }}>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.72)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: 1.72,
            }}
          >
            把专业创作方法封装成可发现、可理解、可直接使用的 Skill
          </p>
          <p
            style={{
              margin: "3px 0 0",
              color: "rgba(255,255,255,0.56)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "11px",
              lineHeight: 1.5,
            }}
          >
            覆盖品牌、图画、视频、社媒、电商、服饰与空间设计等多样创作场景
          </p>
        </div>
      </header>

      <section
        className="if-studio-skills-panel absolute z-10 overflow-hidden"
        style={{
          left: "4.17%",
          top: "20.3%",
          width: "91.66%",
          height: "72.8%",
          background: "#101010",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "12px",
          boxShadow: "0 22px 70px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 z-10 flex items-center justify-between"
          style={{
            height: "54px",
            padding: "0 18px",
            background: "rgba(10,10,10,0.94)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center" style={{ gap: "12px" }}>
            <span
              aria-hidden="true"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#c7ff33",
                boxShadow: "0 0 14px rgba(199,255,51,0.75)",
              }}
            />
            <span
              style={{
                color: "#c7ff33",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              04
            </span>
            <h2
              style={{
                margin: 0,
                color: "#fff",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "17px",
                fontWeight: 650,
              }}
            >
              {skillScreen.title}
            </h2>
            <span
              style={{
                marginLeft: "8px",
                color: "rgba(255,255,255,0.58)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "11px",
              }}
            >
              {skillScreen.caption}
            </span>
          </div>

          <div
            className="flex items-center"
            role="group"
            aria-label="切换技能广场展示"
            style={{
              gap: "3px",
              padding: "3px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            {skillScreens.map((screen) => {
              const selected = screen.id === skillScreen.id
              return (
                <button
                  key={screen.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSkillScreen(screen)}
                  style={{
                    height: "24px",
                    minWidth: "44px",
                    padding: "0 10px",
                    border: 0,
                    borderRadius: "999px",
                    background: selected ? "#c7ff33" : "transparent",
                    color: selected ? "#111" : "rgba(255,255,255,0.62)",
                    cursor: "pointer",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "11px",
                    fontWeight: 650,
                  }}
                >
                  {screen.label}
                </button>
              )
            })}
          </div>
        </div>

        <div
          className="if-studio-skills-viewport absolute inset-x-0 bottom-0 overflow-hidden"
          data-scroll="true"
          style={{ top: "54px", cursor: "ns-resize" }}
        >
          <img
            key={skillScreen.id}
            src={skillScreen.image}
            alt={skillScreen.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="if-studio-skills-image absolute left-0 w-full"
            style={{
              height: "auto",
              minHeight: "100%",
              objectFit: "contain",
              objectPosition: "center top",
            }}
          />
        </div>
      </section>
    </div>
  )
}
