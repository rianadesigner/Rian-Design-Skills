import { Bell, Check, Clock3, LogOut, Play, RotateCcw } from "lucide-react"
import {
  ScreenCrop,
  SectionLabel,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const states = [
  ["01", "任务已提交", "锁定素材与指令"],
  ["02", "排队中", "展示队列与预计等待"],
  ["03", "生成中", "分阶段反馈处理进度"],
  ["04", "结果可用", "通知并恢复原任务"],
]

export default function SlideVideoAsyncLoop() {
  return (
    <VideoThinkingFrame>
      <style>{`
        @keyframes asyncPulse { 0%,100%{opacity:.45;transform:scale(.92)} 50%{opacity:1;transform:scale(1)} }
        .async-pulse { animation: asyncPulse 1.9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .async-pulse { animation: none; } }
      `}</style>
      <VideoThinkingHeader
        index="07"
        eyebrow="ASYNCHRONOUS CREATION LOOP"
        title="生成可以等待"
        accent="用户不必停留"
        description="长耗时生成不应把用户困在进度页；任务需要在后台持续、在关键节点通知，并让用户从离开的位置继续。"
      />

      <main
        className="absolute z-10 grid"
        style={{
          left: "4.2%",
          top: "21.3%",
          width: "91.6%",
          height: "67.8%",
          gridTemplateColumns: "23% 50% 27%",
          borderTop: "1px solid rgba(255,255,255,.13)",
          borderBottom: "1px solid rgba(255,255,255,.13)",
        }}
      >
        <section style={{ padding: "29px 25px 22px 0" }}>
          <SectionLabel>USER FRICTION</SectionLabel>
          <h2 style={{ margin: "14px 0 8px", fontSize: 24, fontWeight: 650 }}>等待让创作关系断裂</h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,.48)", fontSize: 13, lineHeight: 1.7 }}>
            不确定还要多久、不敢离开、离开后找不到任务，是生成体验中最强的失控感。
          </p>
          <div style={{ marginTop: 28 }}>
            {[
              [Clock3, "告诉我还要多久"],
              [LogOut, "允许我先离开"],
              [Bell, "完成时主动通知"],
              [RotateCcw, "回来后原位继续"],
            ].map(([Icon, text]) => {
              const IconComponent = Icon as typeof Clock3
              return (
                <div key={String(text)} className="flex items-center" style={{ height: 51, borderBottom: "1px solid rgba(255,255,255,.09)" }}>
                  <IconComponent size={17} color="#ef3f46" strokeWidth={1.45} />
                  <span style={{ marginLeft: 12, color: "rgba(255,255,255,.68)", fontSize: 13 }}>{String(text)}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section
          className="relative"
          style={{ borderLeft: "1px solid rgba(255,255,255,.12)", borderRight: "1px solid rgba(255,255,255,.12)" }}
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle, rgba(149,8,15,.22), transparent 64%)" }} />
          <ScreenCrop
            src="/images/page30/progress.webp"
            alt="生成进度界面"
            style={{ left: "9%", top: "8%", width: "29%", height: "72%" }}
          />
          <ScreenCrop
            src="/images/page27/result.webp"
            alt="生成结果界面"
            style={{ right: "9%", top: "8%", width: "29%", height: "72%" }}
          />

          <div className="absolute" style={{ left: "43%", top: "30%", width: "14%", textAlign: "center" }}>
            <div
              className="async-pulse"
              style={{
                margin: "0 auto",
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                border: "1px solid rgba(239,63,70,.5)",
                background: "rgba(127,8,14,.34)",
                boxShadow: "0 0 34px rgba(239,63,70,.18)",
              }}
            >
              <Play size={17} color="#ef3f46" fill="#ef3f46" />
            </div>
            <div style={{ marginTop: 10, color: "rgba(255,255,255,.42)", fontSize: 10, lineHeight: 1.45 }}>BACKGROUND<br />TASK</div>
          </div>

          <div className="absolute flex" style={{ left: "7%", right: "7%", bottom: "4%" }}>
            {states.map(([index, title, body], stateIndex) => (
              <div key={index} className="relative flex-1" style={{ paddingRight: stateIndex < 3 ? 12 : 0 }}>
                <div className="flex items-center">
                  <span
                    style={{
                      width: 25,
                      height: 25,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "50%",
                      border: "1px solid rgba(239,63,70,.45)",
                      color: "#ef3f46",
                      fontSize: 9,
                    }}
                  >
                    {index}
                  </span>
                  {stateIndex < 3 && <div style={{ height: 1, flex: 1, margin: "0 7px", background: "rgba(239,63,70,.28)" }} />}
                </div>
                <div style={{ marginTop: 8, color: "rgba(255,255,255,.72)", fontSize: 11 }}>{title}</div>
                <div style={{ marginTop: 3, color: "rgba(255,255,255,.31)", fontSize: 9, lineHeight: 1.4 }}>{body}</div>
              </div>
            ))}
          </div>
        </section>

        <aside style={{ padding: "29px 0 22px 26px" }}>
          <SectionLabel>SOLUTION / TASK CONTINUITY</SectionLabel>
          <h2 style={{ margin: "14px 0 4px", fontSize: 23, fontWeight: 650 }}>把进度页升级为任务系统</h2>
          <div style={{ marginTop: 19 }}>
            {[
              ["可离开", "退出页面不终止生成，任务进入后台队列。"],
              ["可判断", "显示排队、处理中和预计完成时间。"],
              ["可找回", "通知、消息和个人中心共享同一任务入口。"],
              ["可继续", "结果页保留原素材、指令和下一步快捷动作。"],
            ].map(([title, body]) => (
              <div key={title} className="grid" style={{ gridTemplateColumns: "28px 1fr", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.09)" }}>
                <Check size={17} color="#ef3f46" strokeWidth={1.7} />
                <div>
                  <strong style={{ fontSize: 14 }}>{title}</strong>
                  <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.43)", fontSize: 11, lineHeight: 1.55 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{ marginTop: 22, padding: "13px 14px", borderLeft: "2px solid #ef3f46", background: "rgba(132,9,15,.19)" }}
          >
            <div style={{ color: "rgba(255,255,255,.36)", fontSize: 9 }}>SUCCESS CRITERIA</div>
            <div style={{ marginTop: 6, color: "rgba(255,255,255,.7)", fontSize: 12 }}>
              用户离开后仍确信任务会完成，回来后无需重新开始。
            </div>
          </div>
        </aside>
      </main>
    </VideoThinkingFrame>
  )
}
