import { ArrowRight } from "lucide-react"
import {
  VIDEO_RED,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const SCREEN_WIDTH = 212

const stages = [
  {
    index: "01",
    label: "QUEUE",
    title: "新任务自动排队",
    description: "连续发起的创作自动进入队列，无需停留等待。",
    src: "/images/page35/queued.webp",
    alt: "新创作任务已进入排队，界面展示预计等待十分钟",
  },
  {
    index: "02",
    label: "GENERATE",
    title: "任务在后台生成",
    description: "离开当前页面仍持续推进，进度独立更新。",
    src: "/images/page35/generating.webp",
    alt: "创作任务正在生成，界面展示百分之三十进度和预计耗时",
  },
  {
    index: "03",
    label: "COMPLETE",
    title: "完成后主动通知",
    description: "结果就绪即可返回，继续编辑或再次生成。",
    src: "/images/page35/completed.webp",
    alt: "已完成的海边旅拍创作结果和后续编辑操作界面",
  },
  {
    index: "04",
    label: "TASK CENTER",
    title: "任务上下文留存",
    description: "全部状态与结果集中查看，随时返回继续。",
    src: "/images/page35/task-history.jpg",
    alt: "任务中心中同时展示已完成任务和生成中任务",
  },
] as const

function InterfaceScreen({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: SCREEN_WIDTH,
        aspectRatio: "675 / 1461",
        borderRadius: 23,
        border: "1px solid rgba(255,255,255,.2)",
        background: "#0c0c0c",
        boxShadow: "0 24px 54px rgba(0,0,0,.62)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="eager"
        decoding="async"
        className="block h-full w-full object-cover object-top"
      />
    </div>
  )
}

function FlowStage({
  stage,
  showArrow,
}: {
  stage: (typeof stages)[number]
  showArrow: boolean
}) {
  return (
    <article
      className="relative grid h-full min-w-0"
      style={{ gridTemplateRows: "32px minmax(0, 1fr) 70px" }}
    >
      <div className="flex items-start justify-between border-b border-white/8">
        <span
          style={{
            color: VIDEO_RED,
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: 10,
            fontWeight: 650,
            letterSpacing: "1.2px",
          }}
        >
          {stage.label}
        </span>
        <span className="font-mono text-[10px] tracking-[.8px] text-white/22">
          {stage.index}
        </span>
      </div>

      <div className="relative grid min-h-0 place-items-center">
        <div
          className="pointer-events-none absolute"
          style={{
            width: 226,
            height: 226,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(146,11,18,.18), transparent 68%)",
            filter: "blur(8px)",
          }}
        />
        <InterfaceScreen src={stage.src} alt={stage.alt} />
      </div>

      {showArrow ? (
        <span
          className="absolute z-10 grid place-items-center text-white/24"
          style={{ top: "43%", right: -32 }}
          aria-hidden="true"
        >
          <ArrowRight size={18} strokeWidth={1.4} />
        </span>
      ) : null}

      <div className="border-t border-white/12 pt-[11px]">
        <h2 className="m-0 text-[18px] font-semibold tracking-[-.1px] text-white/84">
          {stage.title}
        </h2>
        <p className="m-0 mt-[6px] max-w-[270px] text-[11px] leading-[1.5] text-white/38">
          {stage.description}
        </p>
      </div>
    </article>
  )
}

export default function SlideVideoConcurrentTasks() {
  return (
    <VideoThinkingFrame>
      <VideoThinkingHeader
        index="04"
        eyebrow="CONCURRENT CREATION SYSTEM"
        title="生成可以等待"
        accent="用户不必停留"
        description="一个任务在生成时，用户仍可继续发起下一项创作；系统并行推进、独立反馈，在完成时主动通知并保留全部上下文。"
      />

      <main
        className="absolute z-10"
        style={{
          left: "4.2%",
          top: "21.3%",
          width: "91.6%",
          height: "67.8%",
          borderTop: "1px solid rgba(255,255,255,.13)",
          borderBottom: "1px solid rgba(255,255,255,.13)",
        }}
      >
        <section
          className="grid h-full min-w-0"
          style={{
            padding: "12px 0 10px",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            columnGap: 46,
            background:
              "radial-gradient(circle at 18% 50%, rgba(153,9,17,.12), transparent 31%), radial-gradient(circle at 82% 50%, rgba(153,9,17,.09), transparent 31%)",
          }}
        >
          {stages.map((stage, index) => (
            <FlowStage
              key={stage.index}
              stage={stage}
              showArrow={index < stages.length - 1}
            />
          ))}
        </section>
      </main>
    </VideoThinkingFrame>
  )
}
