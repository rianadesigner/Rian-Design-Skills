"use client"

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react"

import type { FullscreenCapability } from "./xinliu-fullscreen-controls"
import styles from "./xinliu-figma-fullscreen-content.module.css"

type FigmaCapability =
  | "write"
  | "document"
  | "translate"
  | "code"
  | "academic"
  | "call"

const ASSETS = "/images/page7/figma-overlays"
const CONTENT = {
  write: {
    title: "场景写作",
    heading: "让灵感，成为好表达",
    description: "从一段想法开始，生成创意的内容。",
    placeholder: "写下你的主题和创作要求",
    draft: "",
    composerY: 772,
    composerHeight: 292,
    keyboardY: 1084,
  },
  document: {
    title: "文档阅读",
    heading: "读懂重点，发现盲点",
    description: "从文档出发，提炼信息、梳理结论。",
    placeholder: "写下你的研究主题及内容",
    draft: "",
    composerY: 772,
    composerHeight: 292,
    keyboardY: 1084,
  },
  translate: {
    title: "一键翻译",
    heading: "让表达，跨越语言",
    description: "保留原文语意，让译文自然流畅。",
    placeholder: "输入需要翻译的内容",
    draft:
      "请帮我规划一个“赛博朋克风”的旅游路线，以拍照打卡为主要活动，需要包含一些都市景观、霓虹灯光夜景、以及其他小众打卡点。不用考虑食宿和交通，但行程不能太赶",
    composerY: 753,
    composerHeight: 311,
    keyboardY: 1084,
  },
  code: {
    title: "做应用",
    heading: "把想法，变成好用的应用",
    description: "描述应用用途、主要功能和喜欢的风格。",
    placeholder: "描述你想做的应用和需要的功能",
    draft: "",
    composerY: 748,
    composerHeight: 311,
    keyboardY: 1084,
  },
  academic: {
    title: "学术搜索",
    heading: "从学术文献中，找到答案",
    description: "通过海量学术文献，解决你的专业知识问题。",
    placeholder: "输入你的学术问题",
    draft: "对比首页两版方案的主要差异，并标注信息来源",
    composerY: 748,
    composerHeight: 308.256897,
    keyboardY: 1076.256836,
  },
} as const

export function isFigmaCapability(
  kind: FullscreenCapability
): kind is FigmaCapability {
  return kind === "call" || Object.hasOwn(CONTENT, kind)
}

function Asset({
  name,
  className,
  alt = "",
  style,
}: {
  name: string
  className?: string
  alt?: string
  style?: CSSProperties
}) {
  // The source glyphs retain the Figma stroke shapes, rather than approximating them.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${ASSETS}/${name}`}
      alt={alt}
      className={className}
      style={style}
      draggable={false}
    />
  )
}

export function FigmaFullscreenContent({
  kind,
  onClose,
  closeButtonRef,
}: {
  kind: FigmaCapability
  onClose: () => void
  closeButtonRef: RefObject<HTMLButtonElement | null>
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const title = kind === "call" ? "语音聊天" : CONTENT[kind].title

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const canvas = canvasRef.current
    if (!viewport || !canvas) return
    // Keep the source's 750 × 1624 coordinate system inside the existing phone.
    // Layout dimensions ignore the petal opening transform, preventing double scaling.
    const resize = () => {
      const size = window.getComputedStyle(viewport)
      canvas.style.transform = `scale(${parseFloat(size.width) / 750}, ${parseFloat(size.height) / 1624})`
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={viewportRef} className={styles.viewport}>
      <div ref={canvasRef} className={styles.canvas} data-figma-overlay={kind}>
        <Asset name="shared/status.svg" className={styles.status} />
        <header className={styles.header}>
          <Asset name="shared/underline.svg" className={styles.underline} />
          <h2>{title}</h2>
          <button
            ref={closeButtonRef}
            className={styles.close}
            type="button"
            onClick={onClose}
            aria-label="关闭能力浮层"
          >
            <Asset name="shared/close.svg" />
          </button>
        </header>
        {kind === "call" ? (
          <VoiceChat onClose={onClose} />
        ) : (
          <TextCapability key={kind} kind={kind} />
        )}
      </div>
    </div>
  )
}

function TextCapability({ kind }: { kind: Exclude<FigmaCapability, "call"> }) {
  const content = CONTENT[kind]
  const [draft, setDraft] = useState<string>(content.draft)
  const [files, setFiles] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const graySend = (kind === "write" || kind === "document") && !draft.trim()

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroIcon}>
          <Asset name={kind === "code" ? "code/app-hero.svg" : `${kind}/hero.svg`} />
        </div>
        <h3>{content.heading}</h3>
        <p>{content.description}</p>
      </div>
      {kind === "write" && <WritingControls />}
      {kind === "document" && (
        <DocumentControls
          files={files}
          onAdd={() => fileInputRef.current?.click()}
          onDraftChange={setDraft}
        />
      )}
      {kind === "translate" && <TranslationControls />}
      {kind === "code" && <CodeControls onDraftChange={setDraft} />}
      {kind === "academic" && <AcademicControls onDraftChange={setDraft} />}
      <input
        ref={fileInputRef}
        className={styles.fileInput}
        type="file"
        tabIndex={-1}
        aria-label="添加参考文件"
        multiple
        onChange={(event) =>
          setFiles(Array.from(event.target.files ?? [], (file) => file.name))
        }
      />
      <div
        className={styles.composer}
        style={{ top: content.composerY, height: content.composerHeight }}
      >
        <div className={styles.inputArea}>
          <textarea
            aria-label="工具需求输入"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={content.placeholder}
            spellCheck={false}
          />
        </div>
        <div
          className={styles.toolbar}
          style={{
            top: kind === "write" || kind === "document" ? 211.7431 : 228,
          }}
        >
          {kind !== "document" && (
            <button
              type="button"
              className={styles.attach}
              aria-label="添加参考文件"
              onClick={() => fileInputRef.current?.click()}
            >
              <Asset name="shared/plus.svg" />
            </button>
          )}
          <button
            type="button"
            className={styles.microphone}
            aria-label="语音输入"
          >
            <Asset name="shared/microphone.svg" />
          </button>
          <button
            type="button"
            className={styles.send}
            data-muted={graySend}
            disabled={!draft.trim()}
            aria-label="发送"
          >
            <Asset name="shared/send.svg" />
          </button>
        </div>
      </div>
      <Asset
        name="shared/keyboard.png"
        className={styles.keyboard}
        style={{ top: content.keyboardY }}
      />
    </>
  )
}

function PillSelect({
  label,
  options,
  width = 168,
  accent = false,
}: {
  label: string
  options: string[]
  width?: number
  accent?: boolean
}) {
  const [value, setValue] = useState(label)
  return (
    <label className={styles.pillSelect} data-accent={accent} style={{ width }}>
      <span>{value}</span>
      <Asset name={`write/caret-${accent ? "up" : "down"}.svg`} />
      <select
        aria-label={label}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {[label, ...options].map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function WritingControls() {
  const [type, setType] = useState("文章")
  const types = [
    "文章",
    "作文",
    "宣传文案",
    "小说",
    "脚本",
    "回复",
    "改写",
    "PPT大纲",
    "总结汇报",
  ]
  return (
    <div className={styles.writing}>
      <p className={styles.controlLabel}>类型</p>
      <div className={styles.writingTypes} role="group" aria-label="写作类型">
        {types.map((item) => (
          <button
            key={item}
            type="button"
            className={styles.pill}
            aria-pressed={type === item}
            onClick={() => setType(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className={styles.requirementsLabel}>要求</p>
      <div className={styles.writingFilters}>
        <PillSelect
          label="写作风格"
          options={["正式专业", "轻松自然", "简洁明了", "创意生动"]}
          accent
        />
        <PillSelect
          label="长度"
          options={["短篇", "中篇", "长篇"]}
          width={116}
        />
        <PillSelect
          label="语言"
          options={["中文", "英文", "日文"]}
          width={116}
        />
      </div>
    </div>
  )
}

function DocumentControls({
  files,
  onAdd,
  onDraftChange,
}: {
  files: string[]
  onAdd: () => void
  onDraftChange: (draft: string) => void
}) {
  const documents = files.length
    ? files
    : ["2026生物科学研究系统报告.pdf", "2026生物科学研究系统报告.pdf"]
  return (
    <>
      <div className={styles.documents}>
        {documents.slice(0, 2).map((name, index) => (
          <div key={`${name}-${index}`} className={styles.documentCard}>
            <Asset name="document/pdf.svg" />
            <span>{name}</span>
          </div>
        ))}
        <button
          type="button"
          className={styles.addDocument}
          aria-label="添加文档"
          onClick={onAdd}
        >
          <Asset name="document/add.svg" />
        </button>
      </div>
      <div className={styles.documentTasks}>
        {["详细总结文档", "生成简短摘要", "生成开题报告"].map((task) => (
          <button type="button" key={task} onClick={() => onDraftChange(task)}>
            {task}
            <Asset name="shared/task-arrow.svg" />
          </button>
        ))}
      </div>
    </>
  )
}

function TranslationControls() {
  const [source, setSource] = useState("自动检测")
  const [target, setTarget] = useState("英文")
  const languages = ["中文", "英文", "日文", "韩文", "法文", "德文"]
  return (
    <div className={styles.translation}>
      <p>翻译语言</p>
      <div className={styles.languageRow}>
        <label className={styles.language}>
          <span>{source}</span>
          <Asset name="translate/caret-down.svg" />
          <select
            aria-label="原文语言"
            value={source}
            onChange={(event) => setSource(event.target.value)}
          >
            {["自动检测", ...languages].map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={styles.swap}
          aria-label="交换翻译语言"
          onClick={() => {
            setSource(target)
            setTarget(source === "自动检测" ? "中文" : source)
          }}
        >
          <Asset name="translate/swap.svg" />
        </button>
        <label className={styles.language}>
          <span>{target}</span>
          <Asset name="translate/caret-down.svg" />
          <select
            aria-label="译文语言"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
          >
            {languages.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

function CodeControls({
  onDraftChange,
}: {
  onDraftChange: (draft: string) => void
}) {
  const tasks = [
    "做一个能分类和打卡的待办应用",
    "做一个记录收支并统计月度花费的记账应用",
    "做一个整理旅行行程和景点的规划应用",
  ]
  return (
    <div className={styles.codeTasks}>
      {tasks.map((task) => (
        <button type="button" key={task} onClick={() => onDraftChange(task)}>
          <Asset name="code/search.svg" />
          <span>{task}</span>
          <Asset name="shared/task-arrow.svg" />
        </button>
      ))}
    </div>
  )
}

function AcademicControls({
  onDraftChange,
}: {
  onDraftChange: (draft: string) => void
}) {
  const tools = [
    {
      title: "选题推荐",
      icon: "topic",
      draft: "根据我的研究方向，推荐有价值的学术选题",
    },
    {
      title: "学术分析",
      icon: "analysis",
      draft: "分析研究主题的核心观点、研究方法与学术进展",
    },
    {
      title: "AI检测",
      icon: "detect",
      draft: "检测这段学术内容的 AI 生成特征",
    },
  ]
  return (
    <>
      <div className={styles.academicTools}>
        {tools.map((tool) => (
          <button
            type="button"
            key={tool.icon}
            onClick={() => onDraftChange(tool.draft)}
          >
            <Asset name={`academic/${tool.icon}.svg`} />
            <span>{tool.title}</span>
          </button>
        ))}
      </div>
      <div className={styles.academicFilters}>
        <PillSelect
          label="全部领域"
          options={["计算机科学", "生物科学", "社会科学"]}
          accent
        />
        <PillSelect label="全部时间" options={["近一年", "近三年", "近五年"]} />
        <PillSelect
          label="全部来源"
          options={["期刊论文", "会议论文", "学位论文"]}
        />
      </div>
    </>
  )
}

function VoiceChat({ onClose }: { onClose: () => void }) {
  const [muted, setMuted] = useState(false)
  return (
    <>
      <Asset name="call/mascot.png" className={styles.mascot} />
      <div className={styles.voiceBadge} aria-hidden="true">
        <VoiceWave />
      </div>
      <div className={styles.conversation} aria-label="语音聊天示例">
        <Asset
          name="call/chat-top.svg"
          alt="你好，我是心流！有什么问题想要问我吗？"
        />
        <Asset
          name="call/chat-middle.svg"
          alt="你好，我想请问一下 XXX 的问题。示例提问内容。"
        />
        <Asset
          name="call/chat-bottom.svg"
          alt="你好，我是心流！有什么问题想要问我吗？"
        />
      </div>
      <div className={styles.voiceDock}>
        <button
          type="button"
          className={styles.voiceMic}
          aria-label={muted ? "继续语音" : "暂停语音"}
          aria-pressed={muted}
          onClick={() => setMuted(!muted)}
        >
          <Asset name="call/microphone.svg" />
        </button>
        <div className={styles.listening} data-muted={muted}>
          <VoiceWave />
          <span aria-live="polite">
            {muted ? "已暂停，点击继续" : "我正在听，你说"}
          </span>
        </div>
        <button
          type="button"
          className={styles.endCall}
          onClick={onClose}
          aria-label="结束语音聊天"
        >
          <Asset name="call/end.svg" />
        </button>
      </div>
      <div className={styles.homeIndicator} />
    </>
  )
}

function VoiceWave() {
  return (
    <div className={styles.voiceWave} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => (
        <i key={index} />
      ))}
    </div>
  )
}
