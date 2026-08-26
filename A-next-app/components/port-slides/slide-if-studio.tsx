"use client";

import { useState } from "react";

const P_IF_STUDIO = "/images/if-studio";

const panels = [
  {
    index: "01",
    title: "首页",
    detail: "任务输入 · 专家 Agent · 灵感发现",
    image: `${P_IF_STUDIO}/home-full-2026.webp`,
    accent: "#ff694a",
    position: "center top",
  },
  {
    index: "02",
    title: "技能广场",
    detail: "",
    image: `${P_IF_STUDIO}/skills-plaza-2026.png`,
    accent: "#c7ff33",
    position: "center top",
  },
];

const skillScreens = [
  {
    id: "plaza",
    label: "广场",
    image: `${P_IF_STUDIO}/skills-plaza-2026.png`,
    alt: "技能广场全量技能列表",
  },
  {
    id: "detail",
    label: "详情",
    image: `${P_IF_STUDIO}/skill-detail-2026.png`,
    alt: "试穿套图技能详情",
  },
] as const;

type SkillScreen = (typeof skillScreens)[number];

function CornerMarks() {
  const marks = [
    { left: "1.25%", top: "2.22%", borderLeft: true, borderTop: true },
    { right: "1.25%", top: "2.22%", borderRight: true, borderTop: true },
    { left: "1.25%", bottom: "2.22%", borderLeft: true, borderBottom: true },
    { right: "1.25%", bottom: "2.22%", borderRight: true, borderBottom: true },
  ];

  return (
    <>
      {marks.map((mark, index) => (
        <span
          key={index}
          className="absolute z-20 pointer-events-none"
          style={{
            ...mark,
            width: "40px",
            height: "40px",
            borderLeft: mark.borderLeft ? "1px solid rgba(255,255,255,0.28)" : undefined,
            borderRight: mark.borderRight ? "1px solid rgba(255,255,255,0.28)" : undefined,
            borderTop: mark.borderTop ? "1px solid rgba(255,255,255,0.28)" : undefined,
            borderBottom: mark.borderBottom ? "1px solid rgba(255,255,255,0.28)" : undefined,
          }}
        />
      ))}
    </>
  );
}

function InterfacePanel({
  panel,
  className,
  skillScreen,
  onSkillScreenChange,
}: {
  panel: (typeof panels)[number];
  className: string;
  skillScreen?: SkillScreen;
  onSkillScreenChange?: (screen: SkillScreen) => void;
}) {
  const isSkillPanel = panel.index === "02" && skillScreen;

  return (
    <section
      className={`absolute z-10 overflow-hidden ${panel.index === "01" ? "if-studio-home-panel" : ""} ${isSkillPanel ? "if-studio-skills-panel" : ""} ${className}`}
      style={{
        background: "#101010",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "10px",
        boxShadow: "0 18px 55px rgba(0,0,0,0.42)",
        cursor: panel.index === "01" ? "ns-resize" : undefined,
      }}
    >
      <header
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
              background: panel.accent,
              boxShadow: `0 0 14px ${panel.accent}`,
            }}
          />
          <span
            style={{
              color: panel.accent,
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {panel.index}
          </span>
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "17px",
              fontWeight: 650,
              letterSpacing: 0,
            }}
          >
            {panel.title}
          </h2>
        </div>
        <div className="flex items-center" style={{ gap: "12px" }}>
          {panel.detail ? (
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.52)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "12px",
                letterSpacing: 0,
              }}
            >
              {panel.detail}
            </p>
          ) : null}
          {isSkillPanel ? (
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
                const selected = screen.id === skillScreen.id;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onSkillScreenChange?.(screen)}
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
                );
              })}
            </div>
          ) : null}
        </div>
      </header>

      <div
        className={`absolute inset-x-0 bottom-0 overflow-hidden ${isSkillPanel ? "if-studio-skills-viewport" : ""}`}
        style={{ top: "54px", cursor: isSkillPanel ? "ns-resize" : undefined }}
      >
        <img
          key={isSkillPanel ? skillScreen.id : panel.index}
          src={isSkillPanel ? skillScreen.image : panel.image}
          alt={isSkillPanel ? skillScreen.alt : `${panel.title}界面`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={
            panel.index === "01"
              ? "if-studio-home-image absolute left-0 w-full"
              : "if-studio-skills-image absolute left-0 top-0 w-full"
          }
          style={
            panel.index === "01"
              ? { height: "auto", minHeight: "100%", objectFit: "contain", objectPosition: "center top" }
              : { height: "auto", minHeight: "100%", objectFit: "contain", objectPosition: panel.position }
          }
        />
      </div>
    </section>
  );
}

export default function SlideIfStudio() {
  const [skillScreen, setSkillScreen] = useState<SkillScreen>(skillScreens[0]);

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#070707" }}>
      <style>{`
        .if-studio-home-image {
          top: 0;
          transform: translateY(0);
          transition: top 1.4s ease-out, transform 1.4s ease-out;
          will-change: top, transform;
        }

        .if-studio-skills-panel {
          transition: border-color 180ms ease-out, box-shadow 180ms ease-out;
        }

        .if-studio-skills-panel:hover {
          border-color: rgba(199,255,51,0.58) !important;
          box-shadow: 0 18px 55px rgba(0,0,0,0.42), 0 0 0 1px rgba(199,255,51,0.16) inset !important;
        }

        .if-studio-skills-image {
          top: 0;
          transform: translateY(0);
          transition: top 1.2s ease-out, transform 1.2s ease-out;
          will-change: top, transform;
          animation: if-studio-screen-enter 260ms ease-out both;
        }

        @keyframes if-studio-screen-enter {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (hover: hover) and (pointer: fine) {
          .if-studio-home-panel:hover .if-studio-home-image {
            top: 100%;
            transform: translateY(-100%);
            transition-duration: 18s;
            transition-timing-function: linear;
          }

          .if-studio-skills-viewport:hover .if-studio-skills-image {
            top: 100%;
            transform: translateY(-100%);
            transition-duration: 14s;
            transition-timing-function: linear;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .if-studio-home-image,
          .if-studio-home-panel:hover .if-studio-home-image,
          .if-studio-skills-image,
          .if-studio-skills-viewport:hover .if-studio-skills-image {
            top: 0;
            transform: translateY(0);
            transition: none;
            animation: none;
          }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "22%",
            background:
              "radial-gradient(ellipse at 0% 52%, rgba(190,12,12,0.26) 0%, rgba(118,0,0,0.09) 48%, transparent 76%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "22%",
            background:
              "radial-gradient(ellipse at 100% 52%, rgba(190,12,12,0.26) 0%, rgba(118,0,0,0.09) 48%, transparent 76%)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "22%",
            top: "-15%",
            width: "56%",
            height: "45%",
            background: "radial-gradient(ellipse, rgba(255,91,62,0.09), transparent 68%)",
          }}
        />
      </div>

      <CornerMarks />

      <div className="absolute z-10" style={{ left: "4.17%", top: "8.15%" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            fontSize: "36px",
            fontWeight: 400,
            lineHeight: "52px",
            letterSpacing: "1.5px",
            fontSynthesis: "none",
            WebkitFontSmoothing: "antialiased",
            textRendering: "geometricPrecision",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>创意应用 </span>
          <span
            style={{
              display: "inline-block",
              position: "relative",
              color: "#ef3b46",
            }}
          >
            if Studio
            <svg
              style={{
                display: "none",
                position: "absolute",
                left: 0,
                bottom: "-1px",
                width: "100%",
                height: "13px",
                opacity: 0.5,
              }}
              viewBox="0 0 152 13"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ifStudioInlineWave" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5C5CFF" />
                  <stop offset="100%" stopColor="#AE5CFF" />
                </linearGradient>
              </defs>
              <path
                d="M2 9.5C31 5 54 4.5 76 7C101 9.8 124 5.2 150 5.6"
                stroke="url(#ifStudioInlineWave)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
      </div>

      <svg
        className="absolute z-10"
        style={{ display: "none" }}
        viewBox="0 0 152 13"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ifStudioTitleWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5C5CFF" />
            <stop offset="100%" stopColor="#AE5CFF" />
          </linearGradient>
        </defs>
        <path
          d="M2 9.5C31 5 54 4.5 76 7C101 9.8 124 5.2 150 5.6"
          stroke="url(#ifStudioTitleWave)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <div
        className="absolute z-10"
        style={{ right: "4.17%", top: "6.15%", width: "54%", textAlign: "right" }}
      >
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.72)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.72,
            overflow: "hidden",
          }}
        >
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            if Studio 是 iconfont 旗下面向多样创作场景的专家级「AI 智能体工作台」
          </span>
          <span
            style={{
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            深度融合百炼多模态大模型与前沿 AI 能力体系，为用户提供开箱即用的图像、视频、网页等多类型 AI 创作体验。
          </span>
        </p>
      </div>

      <InterfacePanel panel={panels[0]} className="left-[4.17%] top-[18.9%] h-[74.4%] w-[50.7%]" />
      <InterfacePanel
        panel={panels[1]}
        className="left-[56.6%] top-[18.9%] h-[74.4%] w-[39.2%]"
        skillScreen={skillScreen}
        onSkillScreenChange={setSkillScreen}
      />

      <div
        className="absolute z-20 flex items-center"
        style={{ left: "6.05%", bottom: "4.5%", gap: "10px" }}
      >
        <span style={{ width: "28px", height: "1px", background: "#ff6748" }} />
        <span
          style={{
            color: "rgba(255,255,255,0.78)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "12px",
            letterSpacing: 0,
          }}
        >
          灵感输入 → Agent 创作 → Skill 沉淀与复用
        </span>
      </div>
    </div>
  );
}
