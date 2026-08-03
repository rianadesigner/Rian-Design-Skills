import { ArrowRight, CircleUserRound, RotateCcw, Sparkles, Upload } from "lucide-react"
import {
  ScreenCrop,
  SectionLabel,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const steps = [
  { index: "01", title: "先看结果", body: "欢迎体验页用成片效果建立能力预期。", Icon: Sparkles },
  { index: "02", title: "立即试用", body: "用示例素材把第一次成功提前到登录之前。", Icon: Upload },
  { index: "03", title: "自然转化", body: "在保存、上传等价值动作发生时承接登录。", Icon: CircleUserRound },
  { index: "04", title: "回来继续", body: "老用户直接回到最近任务和个人素材。", Icon: RotateCcw },
]

export default function SlideVideoEntryExperience() {
  return (
    <VideoThinkingFrame>
      <VideoThinkingHeader
        index="06"
        eyebrow="ZERO-FRICTION ENTRY"
        title="先看到可能"
        accent="再决定如何开始"
        description="新用户需要快速理解与第一次成功，老用户需要回到未完成任务；同一个首页不应该让两类用户走同一条路。"
      />

      <main
        className="absolute z-10"
        style={{ left: "4.2%", top: "21.5%", width: "91.6%", height: "67.5%" }}
      >
        <div className="absolute" style={{ left: 0, top: 0, width: "66%", height: "100%" }}>
          <div
            className="absolute"
            style={{ left: 0, top: 0, width: "100%", height: "100%", border: "1px solid rgba(255,255,255,.13)", borderRadius: 8 }}
          />
          <ScreenCrop
            src="/images/page27/delta-home.webp"
            alt="视频产品欢迎与首页"
            style={{ left: "5%", top: "9%", width: "28%", height: "78%" }}
          />
          <ScreenCrop
            src="/images/page27/home.webp"
            alt="视频创作首页"
            style={{ left: "36%", top: "3%", width: "28%", height: "84%", zIndex: 3 }}
          />
          <ScreenCrop
            src="/images/page27/remix.webp"
            alt="灵感二创页面"
            style={{ right: "5%", top: "9%", width: "28%", height: "78%" }}
          />

          <div
            className="absolute flex items-center"
            style={{ left: "5%", right: "5%", bottom: "3%", height: 42 }}
          >
            {[
              ["VISUAL IMPACT", "建立预期"],
              ["INSTANT TRIAL", "降低门槛"],
              ["OWN CREATION", "形成投入"],
            ].map(([en, cn], index) => (
              <div key={en} className="flex flex-1 items-center">
                <div>
                  <div style={{ color: "#ef3f46", fontSize: 9, fontFamily: "'LogoSC Unbounded Sans', sans-serif" }}>{en}</div>
                  <div style={{ marginTop: 3, color: "rgba(255,255,255,.68)", fontSize: 12 }}>{cn}</div>
                </div>
                {index < 2 && <ArrowRight size={18} color="rgba(255,255,255,.24)" style={{ marginLeft: "auto", marginRight: 16 }} />}
              </div>
            ))}
          </div>
        </div>

        <aside className="absolute" style={{ right: 0, top: 0, width: "31.5%", height: "100%" }}>
          <SectionLabel>PROGRESSIVE ONBOARDING</SectionLabel>
          <h2 style={{ margin: "14px 0 0", fontSize: 23, fontWeight: 650 }}>把学习成本拆进成功路径</h2>
          <div style={{ marginTop: 17 }}>
            {steps.map(({ index, title, body, Icon }) => (
              <div
                key={index}
                className="grid items-center"
                style={{
                  minHeight: 88,
                  gridTemplateColumns: "42px 1fr",
                  padding: "11px 0",
                  borderBottom: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "50%",
                    border: "1px solid rgba(239,63,70,.35)",
                    color: "#ef3f46",
                  }}
                >
                  <Icon size={17} strokeWidth={1.45} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span style={{ color: "#ef3f46", fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: 10 }}>{index}</span>
                    <strong style={{ fontSize: 15 }}>{title}</strong>
                  </div>
                  <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,.46)", fontSize: 12, lineHeight: 1.55 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 21,
              padding: "14px 16px",
              borderLeft: "2px solid #ef3f46",
              background: "linear-gradient(90deg, rgba(137,10,16,.27), transparent)",
            }}
          >
            <div style={{ color: "rgba(255,255,255,.36)", fontSize: 9 }}>DESIGN PRINCIPLE</div>
            <div style={{ marginTop: 6, color: "rgba(255,255,255,.7)", fontSize: 12 }}>
              先让用户完成一次，再让用户理解所有能力。
            </div>
          </div>
        </aside>
      </main>
    </VideoThinkingFrame>
  )
}
