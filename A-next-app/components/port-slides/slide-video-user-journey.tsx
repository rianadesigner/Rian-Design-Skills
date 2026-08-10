import {
  ArrowDownToLine,
  BellRing,
  Clapperboard,
  MessageSquareText,
  Sparkles,
  WandSparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  SectionLabel,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const stages: Array<{
  Icon: LucideIcon
  stage: string
  goal: string
  friction: string
  design: string
}> = [
  { Icon: Sparkles, stage: "发现", goal: "先判断能做什么", friction: "产品能力抽象", design: "用推荐和模板先建立预期" },
  { Icon: Clapperboard, stage: "开始", goal: "快速描述想法", friction: "空白输入压力", design: "素材、模板、描述三种起点" },
  { Icon: WandSparkles, stage: "编辑", goal: "说清想改哪里", friction: "专业工具难学", design: "语言指令绑定画面对象" },
  { Icon: MessageSquareText, stage: "生成", goal: "知道系统在做什么", friction: "等待不可控", design: "任务阶段、进度和预计时间" },
  { Icon: BellRing, stage: "回流", goal: "离开后继续任务", friction: "中断即丢失", design: "后台运行、通知、原位恢复" },
  { Icon: ArrowDownToLine, stage: "交付", goal: "确认并下载成片", friction: "版本难比较", design: "对比、导出与资产沉淀" },
]

export default function SlideVideoUserJourney() {
  return (
    <VideoThinkingFrame>
      <VideoThinkingHeader
        index="02"
        eyebrow="USER JOURNEY DIAGNOSIS"
        title="用户要的不是编辑器"
        accent="而是一条不中断的成片路径"
      />

      <main
        className="absolute z-10"
        style={{ left: "4.2%", top: "22%", width: "91.6%", height: "66%" }}
      >
        <div
          className="absolute flex items-center"
          style={{ left: 0, top: 0, width: "100%", height: 54 }}
        >
          <div
            style={{
              width: "100%",
              padding: "11px 14px",
              borderLeft: "2px solid #ef3f46",
              background: "linear-gradient(90deg, rgba(145,12,18,.28), rgba(145,12,18,.03))",
              color: "rgba(255,255,255,.76)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 14,
            }}
          >
            用户心智始终是“我想得到一条可以分享的视频”，界面需要持续回答：从哪里开始、现在发生什么、下一步还能做什么。
          </div>
        </div>

        <div
          className="absolute grid"
          style={{
            left: 0,
            top: 82,
            width: "100%",
            height: 400,
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
            borderTop: "1px solid rgba(255,255,255,.16)",
            borderBottom: "1px solid rgba(255,255,255,.16)",
          }}
        >
          {stages.map(({ Icon, stage, goal, friction, design }, index) => (
            <article
              key={stage}
              className="relative"
              style={{
                padding: "24px 20px 20px",
                borderRight:
                  index < stages.length - 1
                    ? "1px solid rgba(255,255,255,.12)"
                    : undefined,
                background:
                  index === 2 || index === 4
                    ? "linear-gradient(180deg, rgba(131,9,15,.16), transparent 72%)"
                    : "rgba(255,255,255,.012)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  style={{
                    color: "#ef3f46",
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: 26,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon size={22} strokeWidth={1.35} color="rgba(255,255,255,.58)" />
              </div>
              <h2
                style={{
                  margin: "24px 0 5px",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontSize: 20,
                  fontWeight: 650,
                }}
              >
                {stage}
              </h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,.72)", fontSize: 13, lineHeight: 1.55 }}>
                {goal}
              </p>
              <div style={{ marginTop: 26, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.09)" }}>
                <div style={{ color: "rgba(255,255,255,.34)", fontSize: 10 }}>USER FRICTION</div>
                <p style={{ margin: "7px 0 0", color: "rgba(255,255,255,.5)", fontSize: 12, lineHeight: 1.55 }}>
                  {friction}
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  right: 20,
                  bottom: 22,
                  padding: "12px 12px",
                  borderLeft: "2px solid #ef3f46",
                  background: "rgba(122,9,14,.15)",
                  color: "rgba(255,255,255,.74)",
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                {design}
              </div>
            </article>
          ))}
        </div>

        <div
          className="absolute flex items-center"
          style={{ left: 0, bottom: 0, width: "100%", height: 56 }}
        >
          <SectionLabel>EXPERIENCE UPGRADE</SectionLabel>
          <div style={{ marginLeft: 24, height: 1, flex: 1, background: "rgba(255,255,255,.12)" }} />
          <div style={{ marginLeft: 24, color: "rgba(255,255,255,.5)", fontSize: 12 }}>
            一次性功能使用 → 连续任务状态 → 可恢复的个人创作资产
          </div>
        </div>
      </main>
    </VideoThinkingFrame>
  )
}
