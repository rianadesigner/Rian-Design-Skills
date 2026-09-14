"use client"

import { motion } from "motion/react"
import { ArrowUp, ChevronRight, Plus, Search, X } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { FullscreenKeyboard } from "./xinliu-fullscreen-keyboard"
import styles from "./xinliu-input-sheet.module.css"

export function XinliuInputSheet({
  onClose,
  reduceMotion,
}: {
  onClose: () => void
  reduceMotion: boolean
}) {
  const input = useRef<HTMLTextAreaElement>(null)
  const file = useRef<HTMLInputElement>(null)
  const [draft, setDraft] = useState("")
  const [attachment, setAttachment] = useState("")
  const [sent, setSent] = useState(false)
  const overlay = useRef<HTMLDivElement>(null)
  const sheet = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [sheetHeight, setSheetHeight] = useState<number | undefined>()
  useLayoutEffect(() => {
    const root = overlay.current
    const panel = sheet.current
    if (!root || !panel) return
    const body = content.current
    if (!body) return
    const measure = () => {
      const height = sent ? root.clientHeight * 0.43 : body.offsetHeight + 2
      setSheetHeight(Math.ceil(height))
    }
    const resize = () => {
      if (!sent) {
        const field = input.current
        if (!field) return
        const style = getComputedStyle(field)
        const line = parseFloat(style.lineHeight)
        const padding =
          parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
        field.style.height = "0px"
        const contentHeight = field.scrollHeight
        const height = Math.min(contentHeight, line * 6 + padding)
        field.style.height = `${height}px`
        field.style.overflowY = contentHeight > height + 1 ? "auto" : "hidden"
      }
      measure()
    }
    resize()
    let width = root.clientWidth
    let height = root.clientHeight
    const observer = new ResizeObserver(() => {
      if (root.clientWidth === width && root.clientHeight === height) return
      width = root.clientWidth
      height = root.clientHeight
      resize()
    })
    observer.observe(root)
    const contentObserver = new ResizeObserver(measure)
    contentObserver.observe(body)
    return () => {
      observer.disconnect()
      contentObserver.disconnect()
    }
  }, [draft, sent, attachment])
  const stop = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (sent) stop.current?.focus({ preventScroll: true })
  }, [sent])
  useEffect(() => {
    input.current?.focus({ preventScroll: true })
  }, [])
  const suggestions = [
    "帮我整理今天值得关注的 AI 新闻",
    "为周末旅行安排一份轻松的行程",
    "把我的想法整理成清晰的行动计划",
  ]
  return (
    <motion.div
      ref={overlay}
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
    >
      <motion.img
        src="/images/page7/figma-home/clean-background.webp"
        alt=""
        aria-hidden="true"
        className={styles.wallpaper}
        initial={{ opacity: 0, scale: 1, y: "0%" }}
        animate={{
          opacity: 1,
          scale: reduceMotion ? 1 : 1.045,
          y: reduceMotion ? "0%" : "-1%",
        }}
        exit={{ opacity: 0, scale: 1, y: "0%" }}
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.button
        initial={{
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(29,48,76,0)",
        }}
        animate={{
          backdropFilter: "blur(7px)",
          backgroundColor: "rgba(29,48,76,0.2)",
        }}
        exit={{
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(29,48,76,0)",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={styles.backdrop}
        aria-label="关闭提问浮层"
        onClick={onClose}
        tabIndex={-1}
      />
      <img
        src="/images/page7/figma-overlays/shared/status.svg"
        alt=""
        aria-hidden="true"
        className={styles.statusBar}
      />
      <motion.section
        ref={sheet}
        data-state={sent ? "sent" : "editing"}
        role="dialog"
        aria-modal="true"
        aria-label="向心流提问"
        className={styles.sheet}
        initial={{ y: "100%" }}
        animate={{
          y: 0,
          height: sheetHeight,
        }}
        exit={{ y: "100%" }}
        transition={{
          duration: reduceMotion ? 0 : 0.42,
          height: {
            duration: reduceMotion ? 0 : 0.24,
            ease: [0.22, 1, 0.36, 1],
          },
          ease: [0.22, 1, 0.36, 1],
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.stopPropagation()
            onClose()
          }
          if (e.key === "Tab") {
            const items = Array.from(
              e.currentTarget.querySelectorAll<HTMLElement>(
                'button:not(:disabled):not([tabindex="-1"]), textarea, input:not([type="file"])'
              )
            )
            const first = items[0],
              last = items[items.length - 1]
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault()
              last?.focus()
            }
            if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault()
              first?.focus()
            }
          }
        }}
      >
        <div ref={content} className={styles.content}>
          <button
            className={styles.handle}
            aria-label="收起提问浮层"
            onClick={onClose}
          >
            <span />
          </button>
          <button className={styles.close} aria-label="关闭" onClick={onClose}>
            <X />
          </button>
          {sent ? (
            <div className={styles.result}>
              <div className={styles.bubble}>
                {draft}
                {attachment && <small>{attachment}</small>}
              </div>
              <p className={styles.processing} role="status">
                <span />
                正在整理你的问题<span className={styles.demo}>交互演示</span>
              </p>
              <div className={styles.resultDock}>
                <button
                  className={styles.add}
                  aria-label="继续编辑提问"
                  onClick={() => {
                    setSent(false)
                    requestAnimationFrame(() => input.current?.focus())
                  }}
                >
                  <Plus />
                </button>
                <div className={styles.orb} aria-hidden="true" />
                <button
                  ref={stop}
                  className={styles.send}
                  aria-label="停止并返回编辑"
                  onClick={() => {
                    setSent(false)
                    requestAnimationFrame(() => input.current?.focus())
                  }}
                >
                  <span className={styles.stopIcon} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2>
                有什么想法，
                <br />
                和心流聊聊吧
              </h2>
              <div className={styles.suggestions}>
                {suggestions.map((text) => (
                  <button
                    key={text}
                    onClick={() => {
                      setDraft(text)
                      setSent(false)
                      input.current?.focus()
                    }}
                  >
                    <span>
                      <Search />
                    </span>
                    {text}
                    <ChevronRight />
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (draft.trim()) {
                    input.current?.blur()
                    setSent(true)
                  }
                }}
              >
                {attachment && (
                  <div className={styles.note}>
                    {attachment}
                    <button
                      type="button"
                      aria-label="移除附件"
                      onClick={() => setAttachment("")}
                    >
                      ×
                    </button>
                  </div>
                )}
                <div className={styles.composer}>
                  <button
                    type="button"
                    className={styles.add}
                    aria-label="添加附件"
                    onClick={() => file.current?.click()}
                  >
                    <Plus />
                  </button>
                  <input
                    ref={file}
                    type="file"
                    hidden
                    onChange={(e) =>
                      setAttachment(e.target.files?.[0]?.name ?? "")
                    }
                  />
                  <textarea
                    ref={input}
                    aria-label="提问内容"
                    placeholder="向心流提问"
                    value={draft}
                    rows={1}
                    onChange={(e) => {
                      setDraft(e.target.value)
                      setSent(false)
                    }}
                  />
                  <button
                    className={styles.send}
                    aria-label="发送提问"
                    disabled={!draft.trim()}
                  >
                    <ArrowUp />
                  </button>
                </div>
              </form>
              <div className={styles.keyboardFrame}>
                <FullscreenKeyboard
                  academic
                  onKeyPress={(key) => {
                    const field = input.current
                    if (!field) return
                    const start = field.selectionStart
                    const end = field.selectionEnd
                    const from =
                      key === "Backspace" && start === end
                        ? Math.max(0, start - 1)
                        : start
                    const text =
                      key === "Backspace" ? "" : key === "Enter" ? "\n" : key
                    setDraft(draft.slice(0, from) + text + draft.slice(end))
                    setSent(false)
                    requestAnimationFrame(() => {
                      field.focus({ preventScroll: true })
                      field.setSelectionRange(
                        from + text.length,
                        from + text.length
                      )
                    })
                  }}
                />
              </div>
            </>
          )}
          {sent && <div className={styles.homeIndicator} />}
        </div>
      </motion.section>
    </motion.div>
  )
}
