"use client"

import { ArrowDownLeft, Plus, X } from "lucide-react"
import { useState, type CSSProperties, type Ref } from "react"

import styles from "./xinliu-reference-panel.module.css"

export type XinliuReferencePanelKind = "write" | "document" | "translate"

type XinliuReferencePanelProps = {
  kind: XinliuReferencePanelKind
  preview?: boolean
  inputHeight?: string
  onClose?: () => void
  closeButtonRef?: Ref<HTMLButtonElement>
}

const ASSETS = "/images/page7/reference-panels"
// Keep the original section order, proportions, and controls in both render contexts.
const FIGMA_NODES = {
  write: "21:1418",
  document: "21:1848",
  translate: "27:2446",
} as const
const TITLES = {
  write: "场景写作",
  document: "文档阅读",
  translate: "一键翻译",
} as const
const WRITING_TYPES = [
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
const TRANSLATION_DRAFT =
  "请帮我规划一个“赛博朋克风”的旅游路线，以拍照打卡为主要活动，需要包含一些都市景观、霓虹灯光夜景、以及其他小众打卡点。不用考虑食宿和交通，但行程不能太赶"

function Asset({ name, className }: { name: string; className?: string }) {
  return (
    // These tiny vector assets preserve the supplied Figma artwork exactly.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${ASSETS}/${name}.svg`}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
    />
  )
}

export function XinliuReferencePanel({
  kind,
  preview = false,
  inputHeight,
  onClose,
  closeButtonRef,
}: XinliuReferencePanelProps) {
  const [drafts, setDrafts] = useState({
    write: "",
    document: "",
    translate: TRANSLATION_DRAFT,
  })
  const [writingType, setWritingType] = useState("文章")
  const [deepSearch, setDeepSearch] = useState(true)
  const [languages, setLanguages] = useState(["自动检测", "中文"])
  const draft = drafts[kind]
  const setDraft = (value: string) =>
    setDrafts((current) => ({ ...current, [kind]: value }))

  return (
    <div
      className={styles.root}
      data-reference-panel={kind}
      data-figma-node={FIGMA_NODES[kind]}
      data-preview={preview || undefined}
      data-uniform-input={Boolean(inputHeight) || undefined}
      style={
        inputHeight
          ? ({ "--input-height": inputHeight } as CSSProperties)
          : undefined
      }
      inert={preview || undefined}
    >
      <div className={styles.surface}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <Asset name="underline" className={styles.titleUnderline} />
            <span>{TITLES[kind]}</span>
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            aria-label="关闭能力浮层"
            onClick={onClose}
          >
            <X strokeWidth={1.8} />
          </button>
        </header>

        {kind === "write" && (
          <div className={styles.writingConfiguration}>
            <div className={styles.typeLabel}>类型</div>
            <div className={styles.writingTypes} aria-label="写作类型">
              {WRITING_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={styles.typeChip}
                  data-active={writingType === type}
                  aria-pressed={writingType === type}
                  onClick={() => setWritingType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className={styles.requirementsLabel}>要求</div>
            <div className={styles.requirements}>
              <ReferenceSelect
                label="写作风格"
                options={["写作风格", "简洁", "专业", "生动", "轻松"]}
                className={styles.styleSelect}
                active
              />
              <ReferenceSelect
                label="长度"
                options={["长度", "短篇", "中篇", "长篇"]}
              />
              <ReferenceSelect
                label="语言"
                options={["语言", "中文", "英文"]}
              />
            </div>
          </div>
        )}

        {kind === "document" && (
          <div className={styles.documentConfiguration}>
            <div className={styles.documents} aria-label="示例文档">
              <DocumentCard />
              <DocumentCard uploading />
            </div>
            <div className={styles.documentActions}>
              {["详细总结文档", "生成简短摘要"].map((action) => (
                <button
                  key={action}
                  type="button"
                  className={styles.documentAction}
                  onClick={() => setDraft(action)}
                >
                  <span>{action}</span>
                  <ArrowDownLeft aria-hidden="true" strokeWidth={1.7} />
                </button>
              ))}
            </div>
          </div>
        )}

        {kind === "translate" && (
          <div className={styles.translationConfiguration}>
            <ReferenceSelect
              label="原文语言"
              options={["自动检测", "中文", "英文", "日语", "韩语"]}
              className={styles.sourceLanguage}
              value={languages[0]}
              onChange={(value) => setLanguages([value, languages[1]])}
            />
            <button
              type="button"
              aria-label="交换翻译语言"
              className={styles.swap}
              onClick={() =>
                setLanguages(([source, target]) => [target, source])
              }
            >
              <Asset name="swap" />
            </button>
            <ReferenceSelect
              label="译文语言"
              options={["中文", "英文", "日语", "韩语", "自动检测"]}
              className={styles.targetLanguage}
              value={languages[1]}
              onChange={(value) => setLanguages([languages[0], value])}
            />
          </div>
        )}

        <textarea
          className={`${styles.input} ${kind === "translate" ? styles.translationInput : styles.shortInput}`}
          aria-label="工具需求输入"
          placeholder={
            kind === "write"
              ? "请输入学术问题"
              : kind === "document"
                ? "有任何问题尽管向我提问"
                : "请输入需要翻译的内容"
          }
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          spellCheck={false}
        />

        {kind === "document" && (
          <div className={styles.documentFooter}>
            <button
              type="button"
              className={styles.addDocument}
              aria-label="添加文档"
            >
              <Plus strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className={styles.deepSearch}
              data-active={deepSearch}
              aria-pressed={deepSearch}
              onClick={() => setDeepSearch((current) => !current)}
            >
              深度搜索
            </button>
          </div>
        )}

        <button
          type="button"
          className={`${styles.send} ${kind === "translate" ? styles.translationSend : ""}`}
          aria-label="发送"
          disabled={!draft.trim()}
        >
          <Asset name={draft.trim() ? "send-active" : "send-disabled"} />
        </button>
      </div>
    </div>
  )
}

function DocumentCard({ uploading = false }: { uploading?: boolean }) {
  return (
    <div
      className={styles.documentCard}
      aria-label={uploading ? "示例文件，上传中状态示意" : "示例文件，28.6 KB"}
    >
      <Asset name="pdf" className={styles.pdf} />
      <span className={styles.documentName}>生物科学研究报告</span>
      <span className={styles.documentStatus} data-uploading={uploading}>
        {uploading && (
          <Asset name="upload-progress" className={styles.uploadProgress} />
        )}
        {uploading ? "上传中" : "28.6 KB"}
      </span>
    </div>
  )
}

function ReferenceSelect({
  label,
  options,
  className = "",
  active = false,
  value,
  onChange,
}: {
  label: string
  options: string[]
  className?: string
  active?: boolean
  value?: string
  onChange?: (value: string) => void
}) {
  const [selection, setSelection] = useState(options[0])

  return (
    <label className={`${styles.select} ${className}`} data-active={active}>
      <span aria-hidden="true">{value ?? selection}</span>
      <Asset name={active ? "caret-up" : "caret-down"} />
      <select
        aria-label={label}
        value={value ?? selection}
        onChange={(event) => {
          setSelection(event.target.value)
          onChange?.(event.target.value)
        }}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}
