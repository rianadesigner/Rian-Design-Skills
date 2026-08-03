"use client"

/* eslint-disable @next/next/no-img-element */

import { useState } from "react"

type SearchProject = {
  index: string
  label: string
  english: string
  title: string
  description: string
  images: Array<{
    src: string
    alt: string
    label: string
    caption: string
    fit?: "contain" | "cover"
  }>
  signals: string[]
  upgrade: string
}

const projects: SearchProject[] = [
  {
    index: "01",
    label: "入口激活",
    english: "ENTRY ACTIVATION",
    title: "先让 AI 搜被看见，再让输入变得明确",
    description:
      "在默认搜索页保留热榜、猜你想搜和历史记录，通过搜索框视觉态与 AI 搜提示，把用户从普通检索自然引导到智能检索。",
    images: [
      {
        src: "/images/other-search-projects/ui-v3/01-entry-default.png",
        alt: "默认进入搜索页界面",
        label: "KEY UI 01 / DEFAULT SEARCH",
        caption: "默认态 · 搜索框、热词与猜你想搜",
      },
      {
        src: "/images/other-search-projects/ui-v3/02-entry-active.png",
        alt: "AI 搜索激活后的页面展示",
        label: "KEY UI 02 / AI ENTRY ACTIVE",
        caption: "激活态 · AI 搜入口获得视觉焦点",
      },
      {
        src: "/images/other-search-projects/ui-v3/03-query-suggestions.png",
        alt: "用户输入滑雪教程后的输入框与联想词界面",
        label: "KEY UI 03 / QUERY SUGGEST",
        caption: "输入态 · 关联搜索与深度思考",
      },
    ],
    signals: ["AI 搜入口前置", "输入框状态变化", "联想词与深度思考并行"],
    upgrade: "普通搜索页 → AI 搜可见 → 明确查询意图",
  },
  {
    index: "02",
    label: "答案组织",
    english: "ANSWER STRUCTURE",
    title: "首屏先交付答案，再展开教程结构",
    description:
      "以“滑雪教程”为例，AI 搜首屏先给出可读答案和雪场可视化入口，再支持完整信息、图画版说明与深度思考。",
    images: [
      {
        src: "/images/other-search-projects/ui-v3/04-result-entry.webp",
        alt: "搜索滑雪教程后进入 AI 搜界面首屏",
        label: "KEY UI 01 / RESULT ENTRY",
        caption: "结果首屏 · 答案、地图与内容入口",
      },
      {
        src: "/images/other-search-projects/ui-v3/06-result-visual.webp",
        alt: "滑雪教程图画版说明界面",
        label: "KEY UI 02 / VISUAL ANSWER",
        caption: "图画版 · 把教程转成可视化说明",
      },
      {
        src: "/images/other-search-projects/ui-v3/05-result-full.png",
        alt: "点击查看完整信息后的 AI 搜模块全部信息",
        label: "KEY UI 03 / FULL ANSWER",
        caption: "完整信息 · 长答案与推荐问题",
      },
    ],
    signals: ["首屏答案卡片", "图文版表达", "完整信息逐层展开"],
    upgrade: "搜索结果列表 → 结构化答案 → 可继续深挖",
  },
  {
    index: "03",
    label: "继续探索",
    english: "FOLLOW-UP LOOP",
    title: "用推荐和社区反馈承接下一次提问",
    description:
      "当用户继续下滑，页面把精选热评、内容合集、商品卡和推荐问题串在一起，让搜索结果从单次答案变成持续探索入口。",
    images: [
      {
        src: "/images/other-search-projects/ui-v3/07-social-proof.png",
        alt: "继续下滑第二屏确认信息排序逻辑",
        label: "KEY UI 01 / SOCIAL PROOF",
        caption: "下滑承接 · 精选热评与内容合集",
      },
      {
        src: "/images/other-search-projects/ui-v3/10-recommend-entry.png",
        alt: "点击为你推荐为 AI 搜索引流的界面",
        label: "KEY UI 02 / RECOMMEND ENTRY",
        caption: "推荐入口 · 从问答回到 AI 抖音",
      },
    ],
    signals: ["精选热评补充判断", "推荐问题制造下一问", "AI 抖音入口回流"],
    upgrade: "一次搜索 → 连续浏览 → 二次提问",
  },
  {
    index: "04",
    label: "行动转化",
    english: "ACTION CONVERSION",
    title: "把教程需求延展到商品和工具场景",
    description:
      "围绕滑雪教程产生的真实需求，提供装备加购、商品频道跳转和 3D 雪场地图，让信息获取连接到更具体的行动。",
    images: [
      {
        src: "/images/other-search-projects/ui-v3/08-commerce-action.webp",
        alt: "点击加购滑雪装备跳转商品页面",
        label: "KEY UI 01 / SHOPPING PATH",
        caption: "商品承接 · 滑雪装备加购跳转",
      },
      {
        src: "/images/other-search-projects/ui-v3/09-map-zoom.webp",
        alt: "支持放大展示并活动的 3D 雪场地图",
        label: "KEY UI 02 / 3D MAP TOOL",
        caption: "工具承接 · 可放大的雪场地图",
        fit: "cover",
      },
    ],
    signals: ["装备购买转化", "雪场空间理解", "搜索结果工具化"],
    upgrade: "理解教程 → 选择装备 / 场地 → 完成行动",
  },
]

export default function SlideOtherSearchProjects() {
  const [activeProject, setActiveProject] = useState(0)
  const project = projects[activeProject]

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
        @keyframes search-project-enter {
          from { opacity: 0; transform: translateY(8px) scale(.992); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-search-project-panel] { animation: none !important; }
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
          width: "34%",
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
            SELECTED WORKS / SEARCH EXPERIENCE
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
            其他搜索项目
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
            DOUYIN SEARCH · AI SEARCH EXPERIENCE
          </div>
        </div>
      </header>

      <nav
        className="absolute z-30 grid"
        style={{
          left: "4.17%",
          top: "14.4%",
          width: "91.66%",
          gridTemplateColumns: `repeat(${projects.length}, minmax(0, 1fr))`,
          borderTop: "1px solid rgba(255,255,255,.13)",
          borderBottom: "1px solid rgba(255,255,255,.13)",
        }}
        aria-label="搜索项目方案切换"
      >
        {projects.map((item, index) => {
          const active = index === activeProject
          return (
            <button
              key={item.index}
              type="button"
              data-search-project-tab={item.index}
              onClick={(event) => {
                event.stopPropagation()
                setActiveProject(index)
              }}
              className="relative flex cursor-pointer items-center border-0 bg-transparent text-left"
              style={{
                height: "66px",
                padding: "0 18px",
                borderRight:
                  index < projects.length - 1
                    ? "1px solid rgba(255,255,255,.1)"
                    : undefined,
                background: active
                  ? "linear-gradient(90deg, rgba(225,61,31,.24), rgba(225,61,31,.045))"
                  : "rgba(255,255,255,.012)",
                color: active ? "#fff" : "rgba(255,255,255,.44)",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
              }}
              aria-pressed={active}
            >
              <span
                style={{
                  marginRight: "15px",
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
          gridTemplateColumns: "minmax(0, 1fr) 250px",
          border: "1px solid rgba(255,255,255,.14)",
          background: "rgba(7,7,7,.88)",
          boxShadow: "0 24px 70px rgba(0,0,0,.48)",
        }}
      >
        <div
          key={project.index}
          data-search-project-panel={project.index}
          className="relative min-w-0 overflow-hidden"
          style={{
            borderRight: "1px solid rgba(255,255,255,.12)",
            animation:
              "search-project-enter 360ms cubic-bezier(.2,.75,.25,1) both",
          }}
        >
          <div
            className="absolute grid"
            style={{
              inset: "15px 20px 14px",
              gridTemplateColumns: `repeat(${project.images.length}, minmax(0, 1fr))`,
              gap: "16px",
            }}
          >
            {project.images.map((asset, index) => (
              <figure
                key={asset.src}
                className="relative m-0 grid min-w-0 overflow-hidden"
                style={{
                  gridTemplateRows: "32px minmax(0, 1fr) 38px",
                  border: index === 0
                    ? "1px solid rgba(232,77,46,.5)"
                    : "1px solid rgba(255,255,255,.14)",
                  background: "linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.012))",
                  boxShadow: index === 0
                    ? "0 0 0 1px rgba(232,77,46,.08), 0 18px 44px rgba(0,0,0,.28)"
                    : "0 18px 44px rgba(0,0,0,.22)",
                }}
              >
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: "0 12px",
                    borderBottom: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <span
                    style={{
                      color: index === 0 ? "#ee5a3a" : "rgba(255,255,255,.58)",
                      fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                      fontSize: "8px",
                      letterSpacing: ".75px",
                    }}
                  >
                    {asset.label}
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,.34)",
                      fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                      fontSize: "7px",
                      letterSpacing: ".7px",
                    }}
                  >
                    MOBILE UI · FULL VIEW
                  </span>
                </div>
                <div
                  className="relative flex min-h-0 items-center justify-center overflow-hidden"
                  style={{
                    padding: "10px 16px",
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,.05), transparent 66%)",
                  }}
                >
                  <div
                    className="relative h-full overflow-hidden"
                    style={{
                      aspectRatio: "750 / 1624",
                      maxWidth: "100%",
                      borderRadius: "14px",
                      background: "#fff",
                      boxShadow: "0 12px 34px rgba(0,0,0,.42)",
                    }}
                  >
                    <img
                      src={asset.src}
                      alt={asset.alt}
                      className="block h-full w-full"
                      style={{
                        objectFit: asset.fit ?? "contain",
                        objectPosition: "center center",
                      }}
                    />
                  </div>
                </div>
                <figcaption
                  className="flex items-center"
                  style={{
                    padding: "0 12px",
                    borderTop: "1px solid rgba(255,255,255,.1)",
                    color: "rgba(255,255,255,.74)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  {asset.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <aside className="relative" style={{ padding: "22px 20px" }}>
          <div
            style={{
              color: "#e95132",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "9px",
              letterSpacing: "1.1px",
            }}
          >
            CORE LOGIC {project.index} / {project.english}
          </div>
          <h2
            style={{
              margin: "13px 0 0",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "21px",
              fontWeight: 650,
              lineHeight: 1.38,
              letterSpacing: ".2px",
            }}
          >
            {project.title}
          </h2>
          <p
            style={{
              margin: "12px 0 0",
              color: "rgba(255,255,255,.45)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "12px",
              lineHeight: 1.72,
            }}
          >
            {project.description}
          </p>

          <div style={{ marginTop: "20px" }}>
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

          <div
            className="absolute inset-x-[20px] bottom-[20px]"
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
              {project.upgrade}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
