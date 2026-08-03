import { ArrowRight, BellRing, Check, Layers3, ListChecks } from "lucide-react"
import {
  SectionLabel,
  VIDEO_RED,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const SCREEN_WIDTH = 180

function SketchScreen({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: SCREEN_WIDTH,
        aspectRatio: "675 / 1461",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,.2)",
        background: "#0c0c0c",
        boxShadow: "0 24px 56px rgba(0,0,0,.58)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="eager"
        decoding="async"
        className="block h-full w-full object-cover"
      />
    </div>
  )
}

function ScreenWithStatus({
  task,
  status,
  src,
  alt,
}: {
  task: string
  status: string
  src: string
  alt: string
}) {
  return (
    <div style={{ width: SCREEN_WIDTH }}>
      <div
        className="mb-[8px] flex h-[28px] items-center justify-between border-b border-white/10 px-[2px]"
      >
        <span className="font-mono text-[10px] tracking-[.8px] text-white/38">{task}</span>
        <span className="flex items-center gap-[5px] text-[10px] font-semibold text-[#f15a60]">
          <span className="h-[5px] w-[5px] rounded-full bg-[#ef3f46]" />
          {status}
        </span>
      </div>
      <SketchScreen src={src} alt={alt} />
    </div>
  )
}

function TaskStatusTag({
  task,
  status,
  state,
}: {
  task: string
  status: string
  state: "done" | "generating" | "queued"
}) {
  return (
    <div
      className="h-[48px] border-l-2 px-[10px] py-[7px]"
      style={{
        borderColor: VIDEO_RED,
        background: "linear-gradient(90deg, rgba(132,9,15,.25), rgba(132,9,15,.04))",
      }}
    >
      <div className="flex items-center gap-[6px] text-[9px] font-bold tracking-[.8px] text-[#ef5057]">
        {state === "done" ? (
          <Check size={11} strokeWidth={2} />
        ) : (
          <span
            className="h-[6px] w-[6px] rounded-full border"
            style={{
              borderColor: "#ef3f46",
              background: state === "generating" ? "#ef3f46" : "transparent",
            }}
          />
        )}
        {task}
      </div>
      <p className="m-0 mt-[4px] text-[10px] font-medium text-white/62">{status}</p>
    </div>
  )
}

function TaskScreen({
  task,
  status,
  state,
  src,
  alt,
}: {
  task: string
  status: string
  state: "done" | "generating" | "queued"
  src: string
  alt: string
}) {
  return (
    <div className="flex flex-col gap-[8px]" style={{ width: SCREEN_WIDTH }}>
      <TaskStatusTag task={task} status={status} state={state} />
      <SketchScreen src={src} alt={alt} />
    </div>
  )
}

function LogicNote({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Layers3
  title: string
  body: string
}) {
  return (
    <div className="grid grid-cols-[34px_1fr] gap-[12px] border-t border-white/10 py-[18px]">
      <span className="grid h-[34px] w-[34px] place-items-center border border-[#ef3f46]/35 bg-[#7c1116]/20 text-[#ef5057]">
        <Icon size={16} strokeWidth={1.6} />
      </span>
      <div>
        <h3 className="m-0 text-[14px] font-semibold text-white/84">{title}</h3>
        <p className="m-0 mt-[6px] text-[11px] leading-[1.6] text-white/42">{body}</p>
      </div>
    </div>
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
        className="absolute z-10 grid"
        style={{
          left: "4.2%",
          top: "21.3%",
          width: "91.6%",
          height: "67.8%",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          borderTop: "1px solid rgba(255,255,255,.13)",
          borderBottom: "1px solid rgba(255,255,255,.13)",
        }}
      >
        <section
          className="relative min-w-0"
          style={{
            padding: "18px 30px 12px 0",
            borderRight: "1px solid rgba(255,255,255,.12)",
            background: "radial-gradient(circle at 62% 54%, rgba(153,9,17,.2), transparent 62%)",
          }}
        >
          <div className="flex h-[84px] items-start justify-between">
            <div>
              <SectionLabel>CORE LOGIC 01 / PARALLEL CREATION</SectionLabel>
              <h2 className="m-0 mt-[11px] text-[24px] font-semibold">继续创作，任务互不阻塞</h2>
              <p className="m-0 mt-[6px] text-[11px] leading-[1.5] text-white/42">
                同一时刻可并存已完成、生成中与排队中；等待期间仍可继续创作。
              </p>
            </div>
            <span className="font-mono text-[28px] text-[#ef3f46]/45">01</span>
          </div>

          <div className="mt-[8px] flex items-start justify-center gap-[14px]">
            <TaskScreen
              task="TASK A"
              status="已完成"
              state="done"
              src="/images/page35/completed.jpg"
              alt="任务 A 已完成的真实移动端界面"
            />
            <TaskScreen
              task="TASK B"
              status="生成中"
              state="generating"
              src="/images/page35/generating-v2.webp"
              alt="任务 B 正在生成的真实移动端界面"
            />
            <TaskScreen
              task="TASK C"
              status="排队中"
              state="queued"
              src="/images/page35/queued-v2.webp"
              alt="任务 C 正在排队的真实移动端界面"
            />
          </div>
        </section>

        <section
          className="relative min-w-0"
          style={{
            padding: "18px 0 12px 30px",
            background: "radial-gradient(circle at 35% 58%, rgba(153,9,17,.16), transparent 62%)",
          }}
        >
          <div className="flex h-[84px] items-start justify-between">
            <div>
              <SectionLabel>CORE LOGIC 02 / TASK CENTER</SectionLabel>
              <h2 className="m-0 mt-[11px] text-[24px] font-semibold">统一找回，离开也能继续</h2>
              <p className="m-0 mt-[6px] text-[11px] leading-[1.5] text-white/42">
                排队、生成与完成状态集中呈现，回来后直接从原任务继续。
              </p>
            </div>
            <span className="font-mono text-[28px] text-[#ef3f46]/45">02</span>
          </div>

          <div className="flex items-start gap-[30px] pt-[8px]">
            <ScreenWithStatus
              task="TASK CENTER"
              status="2 项运行中"
              src="/images/page35/task-history.jpg"
              alt="任务中心中的生成记录与多任务进度界面"
            />

            <div className="min-w-0 flex-1 pt-[30px]">
              <LogicNote
                icon={ListChecks}
                title="状态集中"
                body="排队、生成中和已完成统一展示，用户不需要回到多个进度页面寻找任务。"
              />
              <LogicNote
                icon={BellRing}
                title="上下文保留"
                body="离开不会终止任务；完成后主动通知，素材、指令和结果仍可继续使用。"
              />

              <div
                className="mt-[22px] border-l-2 px-[14px] py-[13px]"
                style={{
                  borderColor: VIDEO_RED,
                  background: "linear-gradient(90deg, rgba(132,9,15,.24), rgba(132,9,15,.04))",
                }}
              >
                <div className="flex items-center gap-[7px] text-[10px] font-bold tracking-[.8px] text-[#ef5057]">
                  <Check size={13} />
                  SUCCESS CRITERIA
                </div>
                <p className="m-0 mt-[7px] text-[11px] leading-[1.55] text-white/58">
                  用户离开当前页面，多个任务仍会完成；回来后无需重新开始。
                </p>
              </div>

              <div className="mt-[18px] flex items-center gap-[8px] text-[10px] text-white/32">
                <Layers3 size={13} className="text-[#ef5057]" />
                独立执行
                <ArrowRight size={11} />
                集中找回
              </div>
            </div>
          </div>
        </section>
      </main>
    </VideoThinkingFrame>
  )
}
