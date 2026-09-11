"use client"

import { BatteryFull, Mic, Plus, Send, Signal, Wifi, X } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import {
  FullscreenControls,
  type FullscreenCapability,
} from "./xinliu-fullscreen-controls"
import { FullscreenKeyboard } from "./xinliu-fullscreen-keyboard"
import {
  FigmaFullscreenContent,
  isFigmaCapability,
} from "./xinliu-figma-fullscreen-content"
import styles from "./xinliu-fullscreen-panel.module.css"

const CONTENT: Record<
  FullscreenCapability,
  {
    title: string
    heading: string
    description: string
    placeholder: string
    draft: string
    source: string
  }
> = {
  code: {
    title: "代码生成",
    heading: "把想法，变成可运行的代码",
    description: "选好类型，描述你想实现的功能。",
    placeholder: "描述你想实现的功能",
    draft: "创建一个带筛选与数据卡片的移动端看板",
    source: "参考文件",
  },
  translate: {
    title: "一键翻译",
    heading: "让表达，跨越语言",
    description: "保留原文语意，让译文自然流畅。",
    placeholder: "输入需要翻译的内容",
    draft:
      "请帮我规划一个“赛博朋克风”的旅游路线，以拍照打卡为主要活动，需要包含一些都市景观、霓虹灯光夜景、以及其他小众打卡点。不用考虑食宿和交通，但行程不能太赶",
    source: "添加原文",
  },
  call: {
    title: "打电话",
    heading: "把沟通，交给心流",
    description: "说清代办事项，记录每一次沟通结果。",
    placeholder: "说明需要代办的事项",
    draft: "帮我预约今晚 7 点的双人位，并记录确认结果",
    source: "联系人",
  },
  write: {
    title: "场景写作",
    heading: "让灵感，成为好表达",
    description: "从一段想法开始，找到合适的文字。",
    placeholder: "写下你的主题和创作要求",
    draft: "",
    source: "参考素材",
  },
  document: {
    title: "文档阅读",
    heading: "读懂重点，发现更多",
    description: "从文档出发，提炼信息、梳理结论。",
    placeholder: "有任何问题尽管向我提问",
    draft: "",
    source: "添加文档",
  },
  academic: {
    title: "学术搜索",
    heading: "从学术文献中，找到答案",
    description: "通过海量学术文献，解决你的专业知识问题。",
    placeholder: "输入你的学术问题",
    draft: "对比首页两版方案的主要差异，并标注信息来源",
    source: "添加参考文献",
  },
  web: {
    title: "网页专家",
    heading: "把想法，做成可浏览的网页",
    description: "说清内容与布局，搭建适合你的页面。",
    placeholder: "描述网页主题、内容和设计要求",
    draft: "制作一个移动端产品介绍页，包含功能亮点、使用场景和开始体验入口",
    source: "参考素材",
  },
  pdf: {
    title: "PDF专家",
    heading: "读懂文档，提炼关键结论",
    description: "围绕 PDF 内容，整理重点并继续追问。",
    placeholder: "添加 PDF，说明你想了解的问题",
    draft: "总结这份 PDF 的核心观点，并标出每个结论对应的页码",
    source: "添加 PDF",
  },
  ppt: {
    title: "PPT专家",
    heading: "让观点，成为清晰的演示",
    description: "从主题和素材出发，组织结构与页面内容。",
    placeholder: "描述演示主题、受众和主要内容",
    draft: "制作一份面向团队的项目汇报，说明背景、关键进展、成果和下一步计划",
    source: "参考资料",
  },
  word: {
    title: "Word专家",
    heading: "把资料，整理成完整文档",
    description: "梳理内容层次，完成写作与文档整理。",
    placeholder: "描述文档主题、用途和格式要求",
    draft: "整理一份项目方案，包含目标、实施步骤、时间安排和预期成果",
    source: "参考资料",
  },
  excel: {
    title: "Excel专家",
    heading: "从表格中，发现数据价值",
    description: "整理数据、分析趋势，呈现清晰结论。",
    placeholder: "添加表格，描述需要完成的分析",
    draft: "分析这份销售表格，汇总各月变化，并用图表展示主要趋势",
    source: "添加表格",
  },
  video: {
    title: "视频专家",
    heading: "把创意，变成生动的视频",
    description: "描述主题与画面，组织脚本和镜头表达。",
    placeholder: "描述视频主题、内容和画面要求",
    draft: "制作一段 30 秒的产品介绍视频，突出核心功能与使用场景，整体简洁明快",
    source: "参考素材",
  },
}

export function XinliuFullscreenPanel({
  petal,
  reduceMotion,
  origin,
  onClose,
}: {
  petal: { id: FullscreenCapability; label: string; icon: string }
  reduceMotion: boolean
  origin: { x: number; y: number; width: number; height: number }
  onClose: () => void
}) {
  const content = CONTENT[petal.id]
  const isAcademic = petal.id === "academic"
  const [draft, setDraft] = useState(content.draft)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const hasContent = Boolean(draft.trim())

  useEffect(() => {
    const frame = window.requestAnimationFrame(() =>
      closeButtonRef.current?.focus({ preventScroll: true })
    )
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-label={petal.id === "call" ? "语音聊天浮层" : `${petal.label}浮层`}
      data-petal-sheet={petal.id}
      data-fullscreen-panel={petal.id}
      className={styles.screen}
      style={{ transformOrigin: "50% 50%" }}
      initial="closed"
      animate="open"
      exit="closed"
      variants={{
        open: {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          borderRadius: 0,
          transition: {
            duration: reduceMotion ? 0 : 0.38,
            ease: [0.22, 1, 0.36, 1],
          },
        },
        closed: {
          x: reduceMotion ? 0 : origin.x - origin.width / 2,
          y: reduceMotion ? 0 : origin.y - origin.height / 2,
          scaleX: reduceMotion ? 1 : 0.28,
          scaleY: reduceMotion ? 1 : (origin.width * 0.32) / origin.height,
          opacity: 0,
          borderRadius: reduceMotion ? 0 : "30cqw",
          transition: {
            duration: reduceMotion ? 0 : 0.24,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return
        const controls = event.currentTarget.querySelectorAll<HTMLElement>(
          "button:not([disabled]), textarea:not([disabled]), select:not([disabled]), input:not([disabled])"
        )
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
    >
      {isFigmaCapability(petal.id) ? (
        <FigmaFullscreenContent
          kind={petal.id}
          onClose={onClose}
          closeButtonRef={closeButtonRef}
        />
      ) : (
        <>
          <div className={styles.statusBar} aria-hidden="true">
            <span>9:41</span>
            <div>
              {isAcademic ? (
                <>
                  <AcademicAsset name="cellular" />
                  <AcademicAsset name="wifi" />
                  <AcademicAsset name="battery" />
                </>
              ) : (
                <>
                  <Signal />
                  <Wifi />
                  <BatteryFull />
                </>
              )}
            </div>
          </div>

          <header className={styles.header}>
            {!isAcademic && (
              <span className={styles.brand}>
                心流<span>AI</span>
              </span>
            )}
            <h2>
              {content.title}
              {isAcademic && <AcademicAsset name="underline" />}
            </h2>
            <button
              ref={closeButtonRef}
              className={styles.close}
              type="button"
              onClick={onClose}
              aria-label="关闭能力浮层"
            >
              {isAcademic ? (
                <AcademicAsset name="close" />
              ) : (
                <X strokeWidth={1.7} />
              )}
            </button>
          </header>

          <div className={styles.content} data-compact={true}>
            <div className={styles.intro}>
              <div className={styles.capabilityIcon} aria-hidden="true">
                {/* The original capability glyph keeps the petal-to-tool connection. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    isAcademic
                      ? "/images/page7/academic-overlay/academic.svg"
                      : petal.icon
                  }
                  alt=""
                />
              </div>
              <div>
                <h3>{content.heading}</h3>
                <p>{content.description}</p>
              </div>
            </div>
            <FullscreenControls kind={petal.id} onDraftChange={setDraft} />
          </div>

          <div className={styles.composerDock}>
            <div className={styles.composer}>
              <textarea
                aria-label="工具需求输入"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={content.placeholder}
                spellCheck={false}
              />
              <div className={styles.toolbar}>
                <div className={styles.sources}>
                  <button
                    type="button"
                    className={styles.attach}
                    aria-label={content.source}
                  >
                    {isAcademic ? (
                      <AcademicAsset name="plus" />
                    ) : (
                      <Plus strokeWidth={1.7} />
                    )}
                  </button>
                  {!isAcademic ? (
                    <span className={styles.sourceLabel}>{content.source}</span>
                  ) : null}
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.voice}
                    aria-label="语音输入"
                  >
                    {isAcademic ? (
                      <AcademicAsset name="microphone" />
                    ) : (
                      <Mic strokeWidth={1.8} />
                    )}
                  </button>
                  <button
                    type="button"
                    className={styles.send}
                    aria-label="发送"
                    disabled={!hasContent}
                  >
                    {isAcademic ? (
                      <AcademicAsset name="send" />
                    ) : (
                      <Send strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <FullscreenKeyboard academic={isAcademic} />
        </>
      )}
    </motion.section>
  )
}

function AcademicAsset({ name }: { name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/page7/academic-overlay/${name}.svg`}
      alt=""
      aria-hidden="true"
    />
  )
}
