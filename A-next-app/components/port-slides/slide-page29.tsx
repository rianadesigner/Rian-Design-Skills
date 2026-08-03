import {
  ArrowRight,
  Images,
  MessageSquareText,
  RefreshCcw,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react"

const P39 = "/images/page39"

const START_INSIGHTS = [
  {
    title: "模板先于工具",
    body: "用可滑动案例建立创作预期，先看到可能性，再开始表达。",
    Icon: Images,
  },
  {
    title: "自然语言直接启动",
    body: "用户描述发型与背景，系统自动匹配素材、动作和生成参数。",
    Icon: MessageSquareText,
  },
  {
    title: "单一主行动点",
    body: "“开始创作”承接模板浏览与输入意图，减少首页决策分叉。",
    Icon: Sparkles,
  },
]

const REFINE_INSIGHTS = [
  {
    title: "预览就是编辑器",
    body: "生成结果全屏呈现，高清、消除与再次生成围绕画面就近操作。",
    Icon: WandSparkles,
  },
  {
    title: "快捷指令降低成本",
    body: "场景替换和服装修改作为可直接使用的建议，不要求用户学习提示词。",
    Icon: Sparkles,
  },
  {
    title: "同一句话继续迭代",
    body: "输入框保留上一步意图，用户可以追加约束并生成新版本。",
    Icon: RefreshCcw,
  },
]

function InsightRow({
  title,
  body,
  Icon,
}: {
  title: string
  body: string
  Icon: LucideIcon
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "28px minmax(0, 1fr)",
        gap: 10,
        padding: "13px 0",
        borderTop: "1px solid rgba(255,255,255,0.11)",
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          display: "grid",
          placeItems: "center",
          color: "#e13a42",
          border: "1px solid rgba(225,58,66,0.38)",
          background: "rgba(132,8,14,0.14)",
        }}
      >
        <Icon size={14} strokeWidth={1.7} />
      </span>
      <div style={{ minWidth: 0 }}>
        <strong
          style={{
            display: "block",
            color: "rgba(255,255,255,0.88)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(10px, calc(0.9 * var(--u)), 13px)",
            lineHeight: 1.5,
          }}
        >
          {title}
        </strong>
        <span
          style={{
            display: "block",
            marginTop: 3,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(8px, calc(0.72 * var(--u)), 10px)",
            lineHeight: 1.6,
          }}
        >
          {body}
        </span>
      </div>
    </div>
  )
}

function PhoneArtwork({
  src,
  alt,
  label,
  index,
  side,
}: {
  src: string
  alt: string
  label: string
  index: string
  side: "left" | "right"
}) {
  return (
    <div
      className="absolute"
      style={{
        top: "1%",
        bottom: "1%",
        [side]: 0,
        aspectRatio: "750 / 1624",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: -22,
          display: "flex",
          alignItems: "center",
          justifyContent: side === "left" ? "flex-start" : "flex-end",
          gap: 7,
          color: "rgba(255,255,255,0.54)",
          fontFamily: "'LogoSC Unbounded Sans', sans-serif",
          fontSize: "clamp(7px, calc(0.64 * var(--u)), 9px)",
        }}
      >
        <span style={{ color: "#e13a42" }}>{index}</span>
        <span>{label}</span>
      </div>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          border: "5px solid #111",
          outline: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 28,
          background: "#111",
          boxShadow:
            "0 28px 64px rgba(0,0,0,0.7), 0 0 42px rgba(180,5,12,0.15)",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

function SectionCopy({
  index,
  english,
  title,
  description,
  insights,
}: {
  index: string
  english: string
  title: string
  description: string
  insights: Array<{ title: string; body: string; Icon: LucideIcon }>
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#df343c",
          fontFamily: "'LogoSC Unbounded Sans', sans-serif",
          fontSize: "clamp(8px, calc(0.72 * var(--u)), 10px)",
        }}
      >
        <span>{index}</span>
        <span
          style={{
            width: 34,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(223,52,60,0.9), rgba(223,52,60,0.08))",
          }}
        />
        <span style={{ color: "rgba(255,255,255,0.3)" }}>{english}</span>
      </div>
      <h2
        style={{
          margin: "13px 0 0",
          color: "#fff",
          fontFamily: "'LogoSC Unbounded Sans', 'PingFang SC', sans-serif",
          fontSize: "clamp(17px, calc(1.75 * var(--u)), 25px)",
          fontWeight: 400,
          lineHeight: 1.45,
          letterSpacing: 0,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          margin: "9px 0 18px",
          color: "rgba(255,255,255,0.54)",
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: "clamp(9px, calc(0.83 * var(--u)), 12px)",
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
      {insights.map((item) => (
        <InsightRow key={item.title} {...item} />
      ))}
    </div>
  )
}

export default function SlidePage29() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "#070707",
        color: "#fff",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        fontSynthesis: "none",
      }}
    >
      <style>{`
        @keyframes flowArrow39 {
          0%, 100% { transform: translateX(0); opacity: 0.58; }
          50% { transform: translateX(7px); opacity: 1; }
        }
        .flow-arrow-39 { animation: flowArrow39 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .flow-arrow-39 { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.58,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.034) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.034) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "20%",
            background:
              "linear-gradient(90deg, rgba(153,5,11,0.26), rgba(81,3,7,0.07) 54%, transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "20%",
            background:
              "linear-gradient(270deg, rgba(153,5,11,0.24), rgba(81,3,7,0.06) 54%, transparent)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "4.17%",
            top: "16.7%",
            width: "91.66%",
            height: 1,
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </div>


      <header
        className="absolute z-20 flex items-end justify-between"
        style={{ left: "4.17%", top: "7.8%", width: "91.66%" }}
      >
        <div>
          <div
            style={{
              color: "#c9272f",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(8px, calc(0.78 * var(--u)), 12px)",
            }}
          >
            03 / CONVERSATIONAL CREATION
          </div>
          <h1
            style={{
              margin: "7px 0 0",
              color: "#fff",
              fontFamily: "'LogoSC Unbounded Sans', 'PingFang SC', sans-serif",
              fontSize: "clamp(28px, calc(3.33 * var(--u)), 48px)",
              fontWeight: 400,
              lineHeight: 1.46,
              letterSpacing: 0,
              whiteSpace: "nowrap",
            }}
          >
            AI 视频创作
            <span style={{ color: "#d2353c", marginLeft: 12 }}>双入口闭环</span>
          </h1>
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: "43%",
            color: "rgba(255,255,255,0.62)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(9px, calc(0.95 * var(--u)), 14px)",
            lineHeight: 1.65,
            textAlign: "right",
          }}
        >
          首页用模板和自然语言降低启动门槛，结果页用快捷指令承接持续修改；
          <br />
          同一创作意图在“开始创作”与“再次生成”之间连续流转。
        </p>
      </header>

      <section
        className="absolute z-10"
        style={{ left: "4.17%", top: "20.2%", width: "91.66%", height: "69.2%" }}
      >
        <div className="absolute" style={{ left: 0, top: "4%", width: "20%" }}>
          <SectionCopy
            index="01"
            english="DISCOVER & START"
            title="从浏览模板开始"
            description="先让用户看到可实现的效果，再通过一句自然语言进入创作，避免空白输入带来的启动压力。"
            insights={START_INSIGHTS}
          />
        </div>

        <div
          className="absolute"
          style={{ left: "22.1%", top: 0, width: "54.8%", height: "100%" }}
        >
          <div
            className="pointer-events-none absolute"
            style={{
              inset: "12% 8% 8%",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(158,8,15,0.22), rgba(74,4,8,0.05) 48%, transparent 72%)",
            }}
          />
          <PhoneArtwork
            src={`${P39}/sketch-home.webp`}
            alt="Sketch 首页创作入口界面"
            label="HOME / CREATION ENTRY"
            index="A"
            side="left"
          />
          <div
            className="absolute flex flex-col items-center"
            style={{ left: "50%", top: "43%", transform: "translate(-50%, -50%)" }}
          >
            <div
              className="flow-arrow-39"
              style={{
                width: 54,
                height: 54,
                display: "grid",
                placeItems: "center",
                color: "#f0444c",
                border: "1px solid rgba(240,68,76,0.42)",
                background: "rgba(89,5,9,0.3)",
                boxShadow: "0 0 30px rgba(201,18,27,0.18)",
              }}
            >
              <ArrowRight size={24} strokeWidth={1.5} />
            </div>
            <span
              style={{
                marginTop: 10,
                color: "rgba(255,255,255,0.38)",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "clamp(7px, calc(0.64 * var(--u)), 9px)",
                textAlign: "center",
                lineHeight: 1.5,
                whiteSpace: "nowrap",
              }}
            >
              START
              <br />
              CONTINUE
            </span>
          </div>
          <PhoneArtwork
            src={`${P39}/sketch-material.webp`}
            alt="Sketch 素材编辑与再次生成界面"
            label="RESULT / CONTINUE EDITING"
            index="B"
            side="right"
          />
        </div>

        <div className="absolute" style={{ right: 0, top: "4%", width: "20%" }}>
          <SectionCopy
            index="02"
            english="PREVIEW & REFINE"
            title="在结果页继续修改"
            description="结果不是流程终点，而是下一轮编辑的起点；常用操作围绕内容就近出现。"
            insights={REFINE_INSIGHTS}
          />
        </div>
      </section>

      <div
        className="absolute z-20 flex items-center justify-between"
        style={{
          left: "4.17%",
          right: "4.17%",
          bottom: "2.9%",
          paddingTop: 10,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.35)",
          fontFamily: "'LogoSC Unbounded Sans', sans-serif",
          fontSize: "clamp(7px, calc(0.66 * var(--u)), 10px)",
        }}
      >
        <span>SKETCH SOURCE · 2 REAL ARTBOARDS · 750 × 1624</span>
        <span>DISCOVER → EXPRESS → GENERATE → REFINE</span>
      </div>
    </div>
  )
}
