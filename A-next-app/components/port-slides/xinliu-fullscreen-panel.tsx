"use client"

import { BatteryFull, Mic, Plus, Send, Signal, Wifi, X } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import {
  FullscreenControls,
  type FullscreenCapability,
} from "./xinliu-fullscreen-controls"
import { FigmaFullscreenContent } from "./xinliu-figma-fullscreen-content"
import { FullscreenKeyboard } from "./xinliu-fullscreen-keyboard"
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
  knowledge: {
    title: "知识库",
    heading: "从你的知识中，找到答案",
    description: "关联项目资料，让每个结论都有依据。",
    placeholder: "基于我的资料提问",
    draft: "对比首页两版方案的主要差异，并标注信息来源",
    source: "项目知识库",
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
  const [draft, setDraft] = useState(content.draft)
  const [deepSearch, setDeepSearch] = useState(true)
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
      aria-label={`${petal.label}浮层`}
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
      {petal.id === "code" ? (
        <FigmaFullscreenContent
          kind="code"
          onClose={onClose}
          closeButtonRef={closeButtonRef}
        />
      ) : (
        <>
          <div className={styles.statusBar} aria-hidden="true">
            <span>9:41</span>
            <div>
              <Signal />
              <Wifi />
              <BatteryFull />
            </div>
          </div>

          <header className={styles.header}>
            <span className={styles.brand}>
              心流<span>AI</span>
            </span>
            <h2>{content.title}</h2>
            <button
              ref={closeButtonRef}
              className={styles.close}
              type="button"
              onClick={onClose}
              aria-label="关闭能力浮层"
            >
              <X strokeWidth={1.7} />
            </button>
          </header>

          <div
            className={styles.content}
            data-compact={petal.id !== "translate"}
          >
            <div className={styles.intro}>
              <div className={styles.capabilityIcon} aria-hidden="true">
                {/* The original capability glyph keeps the petal-to-tool connection. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={petal.icon} alt="" />
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
                    <Plus strokeWidth={1.7} />
                  </button>
                  {petal.id === "document" ? (
                    <button
                      className={styles.deepSearch}
                      type="button"
                      aria-pressed={deepSearch}
                      onClick={() => setDeepSearch(!deepSearch)}
                    >
                      深度搜索
                    </button>
                  ) : (
                    <span className={styles.sourceLabel}>{content.source}</span>
                  )}
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.voice}
                    aria-label="语音输入"
                  >
                    <Mic strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className={styles.send}
                    aria-label="发送"
                    disabled={!hasContent}
                  >
                    <Send strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <FullscreenKeyboard />
        </>
      )}
    </motion.section>
  )
}
