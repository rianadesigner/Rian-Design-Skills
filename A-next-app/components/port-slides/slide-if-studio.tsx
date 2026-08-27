"use client"

/* eslint-disable @next/next/no-img-element */

const HOME_IMAGE = "/images/if-studio/home-full-light-2026.webp"
const DARK_HOME_IMAGE = "/images/if-studio/home-full-dark-2026.webp"

function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ background: "#050506" }} />
      <div
        aria-hidden="true"
        className="if-studio-backdrop-shell absolute"
        style={{ inset: 0 }}
      >
        <img
          src={DARK_HOME_IMAGE}
          alt=""
          draggable={false}
          className="if-studio-backdrop-image absolute top-0 left-0 w-full"
          style={{ height: "auto", opacity: 1, filter: "blur(6px)" }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,3,4,0.1) 0%, rgba(3,3,4,0.04) 42%, rgba(3,3,4,0.16) 100%)",
        }}
      />
    </div>
  )
}

function HomePagePreview() {
  return (
    <section
      className="if-studio-home-panel absolute z-20 overflow-hidden"
      aria-label="if Studio 首页完整预览"
      style={{
        left: "9.25%",
        right: "9.25%",
        top: "20.8%",
        bottom: "5.6%",
        border: "6px solid rgba(5,5,6,0.98)",
        borderRadius: "18px",
        background: "#f4f5f7",
        boxShadow:
          "0 34px 92px rgba(0,0,0,0.76), 0 0 0 1px rgba(255,255,255,0.18), 0 0 0 2px rgba(255,105,81,0.1), inset 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <div className="if-studio-tour-shell absolute inset-0">
        <img
          src={HOME_IMAGE}
          alt="if Studio 首页界面"
          loading="eager"
          decoding="async"
          draggable={false}
          className="if-studio-home-image absolute top-0 left-0 w-full"
          style={{ height: "auto" }}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.03), inset 0 22px 42px rgba(255,255,255,0.018)",
        }}
      />
    </section>
  )
}

export default function SlideIfStudio() {
  return (
    <div
      className="if-studio-page relative h-full w-full overflow-hidden"
      style={{ background: "#050506" }}
    >
      <style>{`
        @keyframes if-studio-header-in {
          from { opacity: 0; transform: translate3d(0, -14px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes if-studio-home-in {
          from { opacity: 0; transform: translate3d(0, 24px, 0) scale(0.992); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes if-studio-tour-shell {
          0% { transform: translateY(0%); }
          18%, 28% { transform: translateY(22%); }
          44%, 54% { transform: translateY(48%); }
          70%, 80% { transform: translateY(70%); }
          100% { transform: translateY(100%); }
        }

        @keyframes if-studio-page-tour {
          0% { transform: translateY(0%); }
          18%, 28% { transform: translateY(-22%); }
          44%, 54% { transform: translateY(-48%); }
          70%, 80% { transform: translateY(-70%); }
          100% { transform: translateY(-100%); }
        }

        .if-studio-backdrop-shell,
        .if-studio-backdrop-image {
          animation-duration: 42s;
          animation-timing-function: cubic-bezier(0.45, 0, 0.2, 1);
          animation-delay: 0s;
          animation-iteration-count: 1;
          animation-fill-mode: both;
          animation-play-state: paused;
          will-change: transform;
        }

        .if-studio-backdrop-shell {
          animation-name: if-studio-tour-shell;
        }

        .if-studio-backdrop-image {
          animation-name: if-studio-page-tour;
        }

        .if-studio-standard-header {
          animation: if-studio-header-in 680ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .if-studio-home-panel {
          animation: if-studio-home-in 820ms cubic-bezier(0.16, 1, 0.3, 1) 90ms both;
        }

        .if-studio-tour-shell,
        .if-studio-home-image {
          animation-duration: 42s;
          animation-timing-function: cubic-bezier(0.45, 0, 0.2, 1);
          animation-delay: 0s;
          animation-iteration-count: 1;
          animation-fill-mode: both;
          animation-play-state: paused;
          will-change: transform;
        }

        .if-studio-tour-shell {
          animation-name: if-studio-tour-shell;
        }

        .if-studio-home-image {
          animation-name: if-studio-page-tour;
        }

        @media (hover: hover) and (pointer: fine) {
          .if-studio-home-panel:hover .if-studio-tour-shell,
          .if-studio-home-panel:hover .if-studio-home-image,
          .if-studio-page:has(.if-studio-home-panel:hover) .if-studio-backdrop-shell,
          .if-studio-page:has(.if-studio-home-panel:hover) .if-studio-backdrop-image {
            animation-play-state: running;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .if-studio-backdrop-shell,
          .if-studio-backdrop-image,
          .if-studio-standard-header,
          .if-studio-home-panel,
          .if-studio-tour-shell,
          .if-studio-home-image {
            animation: none;
          }

          .if-studio-tour-shell,
          .if-studio-home-image,
          .if-studio-backdrop-shell,
          .if-studio-backdrop-image {
            transform: translateY(0);
          }
        }
      `}</style>

      <AmbientBackground />

      <header
        className="if-studio-standard-header absolute z-40 flex items-end justify-between"
        style={{ left: "4.17%", right: "4.17%", top: "6.7%" }}
      >
        <div>
          <div className="mb-[12px] flex items-center" style={{ gap: "10px" }}>
            <span
              aria-hidden="true"
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
              IF STUDIO · 01 / CREATIVE APPLICATION
            </span>
          </div>
          <h1
            className="if-studio-project-title"
            style={{
              margin: 0,
              color: "#fff",
            }}
          >
            创意应用 <span style={{ color: "#ef3b46" }}>if Studio</span>
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
          iconfont 旗下面向多样创作场景的专家级「AI 智能体工作台」，
          <br />
          深度融合多模态大模型与前沿 AI 能力，让专业创作开箱即用。
        </p>
      </header>

      <HomePagePreview />
    </div>
  )
}
