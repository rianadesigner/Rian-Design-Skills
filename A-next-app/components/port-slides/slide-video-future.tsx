import {
  Check,
  CircleDashed,
  Clock3,
  Layers3,
  LockKeyhole,
  Route,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Undo2,
  UserRoundCheck,
} from "lucide-react"
import type { ReactNode } from "react"
import {
  SectionLabel,
  VIDEO_FONT,
  VIDEO_RED,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const marketGaps = [
  ["01", "会生成，不等于能编辑", "结果仍像黑盒；改一个局部，常常牵动整条视频。"],
  ["02", "单镜头惊艳，长叙事失控", "人物、服装、场景与节奏难在多镜头中保持一致。"],
  ["03", "对话门槛低，结果却难预测", "用户无法判断成本、等待时间与下一次修改会发生什么。"],
  ["04", "创作更快，专业交付仍断层", "版本、版权、多人协作与可继续编辑的工程资产不足。"],
]

const futurePriorities = [
  { Icon: Route, title: "导演意图层", body: "先锁定故事、节奏与镜头目标，再调用模型生成。" },
  { Icon: UserRoundCheck, title: "一致性记忆", body: "人物、服装、场景、品牌资产跨镜头持续复用。" },
  { Icon: ScanSearch, title: "局部可编辑生成", body: "选对象、选时间段、看差异，只重生成需要改变的部分。" },
  { Icon: ShieldCheck, title: "可信专业交付", body: "保留版本、来源与权限，输出可继续编辑的项目资产。" },
]

const timelineClips = [
  { label: "开场", width: "17%", color: "#9a252d" },
  { label: "人物建立", width: "25%", color: "#6e2026" },
  { label: "情绪推进", width: "21%", color: "#8b3035" },
  { label: "转场", width: "12%", color: "#4d2023" },
  { label: "结尾", width: "25%", color: "#75242a" },
]

function StatusPill({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        minHeight: 25,
        padding: "0 10px",
        border: active
          ? "1px solid rgba(239,63,70,.46)"
          : "1px solid rgba(255,255,255,.12)",
        borderRadius: 999,
        background: active ? "rgba(142,13,20,.24)" : "rgba(255,255,255,.035)",
        color: active ? "rgba(255,255,255,.84)" : "rgba(255,255,255,.48)",
        fontSize: 10,
        whiteSpace: "nowrap",
      }}
    >
      {active ? <Check size={12} color={VIDEO_RED} /> : <CircleDashed size={12} />}
      {children}
    </span>
  )
}

function FutureEditorConcept() {
  return (
    <section
      className="relative h-full overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,.18)",
        borderRadius: 7,
        background: "#0b0b0c",
        boxShadow: "0 28px 80px rgba(0,0,0,.54)",
      }}
    >
      <header
        className="flex items-center justify-between"
        style={{ height: 46, padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,.1)" }}
      >
        <div className="flex items-center" style={{ gap: 9 }}>
          <Sparkles size={15} color={VIDEO_RED} />
          <strong style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: 11 }}>
            DELTA DIRECTOR
          </strong>
          <span style={{ color: "rgba(255,255,255,.28)", fontSize: 9 }}>FUTURE BUILD 01</span>
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          <StatusPill active>意图已锁定</StatusPill>
          <StatusPill>版本 12</StatusPill>
        </div>
      </header>

      <div
        className="grid"
        style={{ height: "calc(100% - 148px)", gridTemplateColumns: "18% 53% 29%" }}
      >
        <aside style={{ padding: "15px 12px", borderRight: "1px solid rgba(255,255,255,.09)" }}>
          <div style={{ color: "rgba(255,255,255,.28)", fontSize: 9, letterSpacing: ".8px" }}>
            SCENE PLAN
          </div>
          {[
            ["01", "建立人物", "00:00–00:04"],
            ["02", "进入城市", "00:04–00:09"],
            ["03", "情绪转折", "00:09–00:15"],
            ["04", "产品出现", "00:15–00:20"],
          ].map(([index, title, time], itemIndex) => (
            <div
              key={index}
              style={{
                marginTop: 10,
                padding: "10px 10px 9px",
                border: itemIndex === 1
                  ? "1px solid rgba(239,63,70,.52)"
                  : "1px solid rgba(255,255,255,.09)",
                borderRadius: 5,
                background: itemIndex === 1
                  ? "linear-gradient(135deg, rgba(133,14,20,.35), rgba(255,255,255,.025))"
                  : "rgba(255,255,255,.025)",
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ color: itemIndex === 1 ? VIDEO_RED : "rgba(255,255,255,.3)", fontSize: 9 }}>
                  {index}
                </span>
                <span style={{ color: "rgba(255,255,255,.23)", fontSize: 8 }}>{time}</span>
              </div>
              <div style={{ marginTop: 8, color: "rgba(255,255,255,.75)", fontSize: 11 }}>{title}</div>
            </div>
          ))}
        </aside>

        <div className="relative overflow-hidden" style={{ background: "#050506" }}>
          <div
            className="absolute inset-x-0 top-0 flex items-center justify-between"
            style={{ height: 36, padding: "0 12px", background: "rgba(0,0,0,.7)", zIndex: 4 }}
          >
            <div className="flex items-center" style={{ gap: 7, color: "rgba(255,255,255,.58)", fontSize: 9 }}>
              <LockKeyhole size={12} color={VIDEO_RED} /> 人物与服装一致性已锁定
            </div>
            <span style={{ color: "rgba(255,255,255,.34)", fontSize: 9 }}>9:16 · PREVIEW</span>
          </div>
          <img
            src="/images/page30/object-selected.webp"
            alt="人物对象被识别并进入局部编辑状态"
            draggable={false}
            loading="eager"
            decoding="async"
            className="absolute object-contain"
            style={{ left: "18%", top: 42, width: "64%", height: "calc(100% - 48px)" }}
          />
          <div
            className="absolute"
            style={{
              left: "8%",
              top: "46%",
              padding: "9px 11px",
              borderLeft: `2px solid ${VIDEO_RED}`,
              background: "rgba(5,5,5,.86)",
              color: "rgba(255,255,255,.72)",
              fontSize: 9,
              lineHeight: 1.55,
            }}
          >
            只修改外套颜色
            <br />保持人物动作与镜头运动
          </div>
          <div
            className="absolute flex items-center"
            style={{ right: "6%", bottom: "8%", gap: 6 }}
          >
            <StatusPill active>差异预览</StatusPill>
            <span
              className="flex items-center justify-center"
              style={{ width: 26, height: 26, borderRadius: 5, background: "rgba(255,255,255,.08)" }}
            >
              <Undo2 size={13} color="rgba(255,255,255,.62)" />
            </span>
          </div>
        </div>

        <aside style={{ padding: "15px 14px", borderLeft: "1px solid rgba(255,255,255,.09)" }}>
          <div className="flex items-center justify-between">
            <span style={{ color: "rgba(255,255,255,.32)", fontSize: 9, letterSpacing: ".8px" }}>
              CONTROL LAYER
            </span>
            <span style={{ color: VIDEO_RED, fontSize: 9 }}>LIVE</span>
          </div>

          <div style={{ marginTop: 14, paddingBottom: 13, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <Route size={14} color={VIDEO_RED} />
              <strong style={{ fontSize: 12 }}>导演意图</strong>
            </div>
            <div className="flex flex-wrap" style={{ gap: 6, marginTop: 10 }}>
              <StatusPill active>克制</StatusPill>
              <StatusPill active>都市夜景</StatusPill>
              <StatusPill>慢推进</StatusPill>
            </div>
          </div>

          <div style={{ padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <Layers3 size={14} color={VIDEO_RED} />
              <strong style={{ fontSize: 12 }}>一致性记忆</strong>
            </div>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10 }}>
              {["人物 01", "红色外套", "城市雨夜", "品牌色"].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "8px 7px",
                    borderRadius: 4,
                    background: "rgba(255,255,255,.045)",
                    color: "rgba(255,255,255,.58)",
                    fontSize: 9,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 13 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <Clock3 size={14} color={VIDEO_RED} />
              <strong style={{ fontSize: 12 }}>生成预算</strong>
            </div>
            <div style={{ marginTop: 10, color: "rgba(255,255,255,.42)", fontSize: 9, lineHeight: 1.7 }}>
              预计 1m 40s · 仅重算 3.2 秒
              <div style={{ marginTop: 7, height: 3, borderRadius: 99, background: "rgba(255,255,255,.08)" }}>
                <div style={{ width: "68%", height: "100%", borderRadius: 99, background: VIDEO_RED }} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer
        style={{
          height: 102,
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,.1)",
          background: "#080809",
        }}
      >
        <div className="flex items-center justify-between">
          <span style={{ color: "rgba(255,255,255,.3)", fontSize: 9 }}>EDITABLE GENERATION TIMELINE</span>
          <span style={{ color: "rgba(255,255,255,.3)", fontSize: 9 }}>20.0s · 5 SCENES · 1 LOCAL REGENERATE</span>
        </div>
        <div className="flex" style={{ gap: 4, marginTop: 10, height: 42 }}>
          {timelineClips.map((clip, index) => (
            <div
              key={clip.label}
              className="relative flex items-center"
              style={{
                width: clip.width,
                padding: "0 9px",
                borderRadius: 3,
                background: clip.color,
                color: "rgba(255,255,255,.74)",
                fontSize: 9,
              }}
            >
              {clip.label}
              {index === 2 && (
                <span
                  className="absolute"
                  style={{ left: "42%", top: -5, width: 2, height: 52, background: "#fff" }}
                />
              )}
            </div>
          ))}
        </div>
      </footer>
    </section>
  )
}

export default function SlideVideoFuture() {
  return (
    <VideoThinkingFrame>
      <VideoThinkingHeader
        index="08"
        eyebrow="FUTURE PRODUCT BLUEPRINT"
        title="AI 视频编辑的下一站"
        accent="从生成工具到导演系统"
      />

      <main
        className="absolute z-10 grid"
        style={{
          left: "4.2%",
          top: "21.5%",
          width: "91.6%",
          height: "66.5%",
          gridTemplateColumns: "29% 71%",
          borderTop: "1px solid rgba(255,255,255,.14)",
          borderBottom: "1px solid rgba(255,255,255,.14)",
        }}
      >
        <section style={{ padding: "24px 28px 18px 0" }}>
          <SectionLabel>MARKET DIAGNOSIS</SectionLabel>
          <h2
            style={{
              margin: "12px 0 3px",
              fontFamily: VIDEO_FONT,
              fontSize: 24,
              fontWeight: 400,
              letterSpacing: "1px",
            }}
          >
            最大问题不是功能少
          </h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,.46)", fontSize: 12, lineHeight: 1.65 }}>
            而是创作过程仍然不够确定、连续和可逆。
          </p>

          <div style={{ marginTop: 17 }}>
            {marketGaps.map(([index, title, body]) => (
              <div key={index} style={{ padding: "11px 0", borderTop: "1px solid rgba(255,255,255,.09)" }}>
                <div className="flex items-baseline" style={{ gap: 10 }}>
                  <span style={{ color: VIDEO_RED, fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: 10 }}>
                    {index}
                  </span>
                  <strong style={{ color: "rgba(255,255,255,.82)", fontSize: 13, fontWeight: 600 }}>
                    {title}
                  </strong>
                </div>
                <p style={{ margin: "4px 0 0 29px", color: "rgba(255,255,255,.38)", fontSize: 10, lineHeight: 1.55 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 13 }}>
            <SectionLabel>CURRENT SOLUTION / COVERAGE</SectionLabel>
            <div className="flex flex-wrap" style={{ gap: 6, marginTop: 9 }}>
              <StatusPill active>对话式编辑</StatusPill>
              <StatusPill active>对象识别</StatusPill>
              <StatusPill active>异步回流</StatusPill>
              <StatusPill active>连续上下文</StatusPill>
              <StatusPill>跨镜头一致性</StatusPill>
              <StatusPill>专业可信交付</StatusPill>
            </div>
          </div>
        </section>

        <section style={{ padding: "24px 0 18px 24px", borderLeft: "1px solid rgba(255,255,255,.12)" }}>
          <div className="flex items-center justify-between" style={{ height: 34 }}>
            <SectionLabel>NEXT EXPERIENCE / INTERFACE PROPOSAL</SectionLabel>
            <div className="flex items-center" style={{ gap: 20 }}>
              {futurePriorities.map(({ Icon, title }) => (
                <div key={title} className="flex items-center" style={{ gap: 6, color: "rgba(255,255,255,.45)", fontSize: 9 }}>
                  <Icon size={12} color={VIDEO_RED} />
                  {title}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "calc(100% - 34px)" }}>
            <FutureEditorConcept />
          </div>
        </section>
      </main>

      <footer
        className="absolute z-20 flex items-center justify-between"
        style={{ left: "4.2%", right: "4.2%", bottom: "3.2%" }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
          <span style={{ width: 28, height: 2, background: VIDEO_RED }} />
          <strong style={{ fontFamily: VIDEO_FONT, fontSize: 14, fontWeight: 400, letterSpacing: ".8px" }}>
            当前方案解决了“不会用”和“等不到”
          </strong>
          <span style={{ color: "rgba(255,255,255,.4)", fontSize: 12 }}>
            下一步要解决“改不准、接不上、交付不放心”。
          </span>
        </div>
        <span style={{ color: "rgba(255,255,255,.28)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: 9 }}>
          DELTA · FUTURE DESIGN DIRECTION
        </span>
      </footer>
    </VideoThinkingFrame>
  )
}
