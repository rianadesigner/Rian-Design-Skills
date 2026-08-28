import { Check, Clock3, ListChecks } from "lucide-react"
import {
  SectionLabel,
  VIDEO_RED,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const SCREEN_WIDTH = 180
type TaskState = "done" | "generating" | "queued"

function SketchScreen({
  src,
  alt,
  fluid = false,
}: {
  src: string
  alt: string
  fluid?: boolean
}) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: fluid ? "100%" : SCREEN_WIDTH,
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
      <div className="mb-[8px] flex h-[28px] items-center justify-between border-b border-white/10 px-[2px]">
        <span className="font-mono text-[10px] tracking-[.8px] text-white/38">
          {task}
        </span>
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
  state: TaskState
}) {
  return (
    <div
      className="pointer-events-none absolute top-[10px] left-[10px] z-10 flex h-[28px] items-center gap-[7px] rounded-full border px-[10px] backdrop-blur-md"
      style={{
        borderColor: "rgba(255,255,255,.2)",
        background: "rgba(5,5,5,.76)",
        boxShadow: "0 8px 24px rgba(0,0,0,.34)",
      }}
    >
      <span className="font-mono text-[9px] font-bold tracking-[.8px] text-[#ef5057]">
        {task}
      </span>
      <span className="h-[10px] w-px bg-white/18" />
      <span className="flex items-center gap-[5px] text-[9px] font-semibold text-white/78">
        {state === "done" ? (
          <Check size={10} className="text-[#ef5057]" strokeWidth={2.4} />
        ) : (
          <span
            className="h-[6px] w-[6px] rounded-full border"
            style={{
              borderColor: VIDEO_RED,
              background: state === "generating" ? VIDEO_RED : "transparent",
            }}
          />
        )}
        {status}
      </span>
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
  state: TaskState
  src: string
  alt: string
}) {
  return (
    <div className="relative min-w-0">
      <SketchScreen src={src} alt={alt} fluid />
      <TaskStatusTag task={task} status={status} state={state} />
    </div>
  )
}

function StatusSummary({ label, state }: { label: string; state: TaskState }) {
  return (
    <span className="flex h-[28px] items-center gap-[7px] rounded-full border border-white/12 bg-black/28 px-[10px] text-[10px] font-medium text-white/62">
      {state === "done" ? (
        <Check size={11} className="text-[#ef5057]" strokeWidth={2.3} />
      ) : state === "queued" ? (
        <Clock3 size={11} className="text-[#ef5057]" strokeWidth={1.8} />
      ) : (
        <span className="h-[6px] w-[6px] rounded-full bg-[#ef3f46]" />
      )}
      {label}
    </span>
  )
}

function TaskListRow({
  task,
  title,
  status,
  detail,
  state,
  progress,
}: {
  task: string
  title: string
  status: string
  detail: string
  state: TaskState
  progress?: number
}) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-[11px] border-t border-white/10 px-[2px]">
      <span className="grid h-[32px] w-[32px] place-items-center border border-[#ef3f46]/32 bg-[#7c1116]/18 text-[#ef5057]">
        {state === "done" ? (
          <Check size={14} strokeWidth={2.2} />
        ) : state === "queued" ? (
          <Clock3 size={14} strokeWidth={1.7} />
        ) : (
          <span className="h-[7px] w-[7px] rounded-full bg-[#ef3f46]" />
        )}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-[8px]">
          <span className="font-mono text-[9px] tracking-[.7px] text-[#ef5057]">
            {task}
          </span>
          <h3 className="m-0 truncate text-[12px] font-semibold text-white/82">
            {title}
          </h3>
        </div>
        <p className="m-0 mt-[5px] text-[10px] text-white/38">{detail}</p>
        {progress !== undefined ? (
          <div className="mt-[8px] h-[2px] overflow-hidden bg-white/10">
            <span
              className="block h-full bg-[#ef3f46]"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}
      </div>
      <span className="rounded-full border border-[#ef3f46]/32 bg-[#7c1116]/20 px-[9px] py-[5px] text-[9px] font-semibold whitespace-nowrap text-[#f06a70]">
        {status}
      </span>
    </div>
  )
}

function TaskList() {
  return (
    <div className="flex h-[426px] min-w-0 flex-1 flex-col border border-white/10 bg-black/24 px-[14px]">
      <div className="flex h-[46px] shrink-0 items-center justify-between">
        <span className="flex items-center gap-[8px] text-[13px] font-semibold text-white/82">
          <ListChecks size={15} className="text-[#ef5057]" strokeWidth={1.8} />
          任务列表
        </span>
        <span className="rounded-full bg-[#7c1116]/26 px-[9px] py-[5px] text-[9px] font-semibold text-[#ef656b]">
          2 项进行中
        </span>
      </div>

      <TaskListRow
        task="TASK A"
        title="海边旅拍合拍"
        status="已完成"
        detail="结果已就绪，可继续编辑"
        state="done"
      />
      <TaskListRow
        task="TASK B"
        title="白雪山背景生成"
        status="生成中 30%"
        detail="预计约 1 分钟"
        state="generating"
        progress={30}
      />
      <TaskListRow
        task="TASK C"
        title="红色连衣裙变体"
        status="排队中"
        detail="预计等待 10 分钟"
        state="queued"
      />

      <div className="flex h-[40px] shrink-0 items-center gap-[7px] border-t border-white/10 text-[9px] text-white/32">
        <Clock3 size={11} className="text-[#ef5057]" strokeWidth={1.7} />
        离开页面任务仍继续，完成后主动通知
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
          className="relative flex h-full min-w-0 flex-col"
          style={{
            padding: "18px 0 12px",
            background:
              "radial-gradient(circle at 28% 55%, rgba(153,9,17,.2), transparent 48%), radial-gradient(circle at 82% 55%, rgba(153,9,17,.14), transparent 48%)",
          }}
        >
          <div className="flex h-[74px] shrink-0 items-start justify-between">
            <div>
              <SectionLabel>CREATION WORKSPACE / LIVE TASKS</SectionLabel>
              <h2 className="m-0 mt-[9px] text-[24px] font-semibold">
                创作状态与任务，一处掌握
              </h2>
              <p className="m-0 mt-[5px] text-[11px] leading-[1.5] text-white/42">
                继续发起创作，同时查看已完成、生成中与排队任务；离开后任务仍持续运行。
              </p>
            </div>
            <div className="flex items-center gap-[8px] pt-[3px]">
              <StatusSummary label="1 已完成" state="done" />
              <StatusSummary label="1 生成中" state="generating" />
              <StatusSummary label="1 排队中" state="queued" />
            </div>
          </div>

          <div
            className="mt-[8px] grid min-h-0 flex-1 items-start gap-[24px]"
            style={{ gridTemplateColumns: "640px minmax(0, 1fr)" }}
          >
            <div className="grid min-w-0 grid-cols-3 items-start gap-[12px]">
              <TaskScreen
                task="TASK A"
                status="已完成"
                state="done"
                src="/images/page35/completed.webp"
                alt="任务 A 已完成的真实移动端界面"
              />
              <TaskScreen
                task="TASK B"
                status="生成中 30%"
                state="generating"
                src="/images/page35/generating.webp"
                alt="任务 B 正在生成的真实移动端界面"
              />
              <TaskScreen
                task="TASK C"
                status="排队中"
                state="queued"
                src="/images/page35/queued.webp"
                alt="任务 C 正在排队的真实移动端界面"
              />
            </div>

            <div className="flex min-w-0 items-start gap-[16px] border-l border-white/10 pl-[16px]">
              <ScreenWithStatus
                task="TASK CENTER"
                status="2 项运行中"
                src="/images/page35/task-history.jpg"
                alt="任务中心中的生成记录与多任务进度界面"
              />
              <TaskList />
            </div>
          </div>
        </section>
      </main>
    </VideoThinkingFrame>
  )
}
