"use client"

import {
  ArrowDownLeft,
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  Phone,
  Search,
} from "lucide-react"
import { useState } from "react"

import styles from "./xinliu-fullscreen-controls.module.css"

export type FullscreenCapability =
  | "code"
  | "translate"
  | "call"
  | "write"
  | "document"
  | "knowledge"

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

export function FullscreenControls({
  kind,
  onDraftChange,
}: {
  kind: FullscreenCapability
  onDraftChange: (value: string) => void
}) {
  const [choices, setChoices] = useState({
    write: "文章",
    code: "网页",
    call: "预约",
  })
  const [languages, setLanguages] = useState<[string, string]>([
    "自动检测",
    "中文",
  ])

  return (
    <div className={styles.root} data-fullscreen-controls={kind}>
      {kind === "write" && (
        <>
          <ChoiceGroup
            label="写作类型"
            options={WRITING_TYPES}
            value={choices.write}
            onChange={(write) =>
              setChoices((current) => ({ ...current, write }))
            }
          />
          <div className={styles.fieldGroup}>
            <span className={styles.label}>写作要求</span>
            <div className={styles.selectRow}>
              <FieldSelect
                label="写作风格"
                options={["简洁", "专业", "生动", "轻松"]}
              />
              <FieldSelect label="长度" options={["短篇", "中篇", "长篇"]} />
              <FieldSelect label="语言" options={["中文", "英文", "日语"]} />
            </div>
          </div>
        </>
      )}

      {kind === "document" && (
        <>
          <div className={styles.fieldGroup}>
            <span className={styles.label}>已添加文档</span>
            <div className={styles.documentRow} aria-label="示例文档">
              <DocumentCard />
              <DocumentCard uploading />
            </div>
          </div>
          <div className={styles.quickActions} aria-label="文档快捷任务">
            {["详细总结文档", "生成简短摘要"].map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => onDraftChange(action)}
                className={styles.quickAction}
              >
                <span>{action}</span>
                <ArrowDownLeft aria-hidden="true" strokeWidth={1.7} />
              </button>
            ))}
          </div>
        </>
      )}

      {kind === "translate" && (
        <div className={styles.fieldGroup}>
          <span className={styles.label}>翻译语言</span>
          <div className={styles.languageRow}>
            <FieldSelect
              label="原文语言"
              options={["自动检测", "中文", "英文", "日语", "韩语", "法语"]}
              value={languages[0]}
              onChange={(source) =>
                setLanguages(([, target]) => [source, target])
              }
            />
            <button
              type="button"
              className={styles.swap}
              aria-label="交换翻译语言"
              onClick={() =>
                setLanguages(([source, target]) => [target, source])
              }
            >
              <ArrowLeftRight aria-hidden="true" strokeWidth={1.8} />
            </button>
            <FieldSelect
              label="译文语言"
              options={["中文", "英文", "日语", "韩语", "法语", "自动检测"]}
              value={languages[1]}
              onChange={(target) =>
                setLanguages(([source]) => [source, target])
              }
            />
          </div>
        </div>
      )}

      {kind === "code" && (
        <>
          <ChoiceGroup
            label="生成类型"
            options={["网页", "小程序", "脚本", "数据处理"]}
            value={choices.code}
            onChange={(code) => setChoices((current) => ({ ...current, code }))}
          />
          <div className={styles.fieldGroup}>
            <span className={styles.label}>代码要求</span>
            <div className={styles.selectRow}>
              <FieldSelect
                label="技术栈"
                options={["智能选择", "React", "Vue", "Python", "JavaScript"]}
              />
              <FieldSelect
                label="运行环境"
                options={["浏览器", "Node.js", "本地运行"]}
              />
              <FieldSelect
                label="输出方式"
                options={["完整代码", "代码与解释", "步骤指导"]}
              />
            </div>
          </div>
        </>
      )}

      {kind === "call" && (
        <>
          <label className={styles.fieldGroup}>
            <span className={styles.label}>通话对象</span>
            <span className={styles.contactField}>
              <Phone aria-hidden="true" strokeWidth={1.7} />
              <input
                type="tel"
                aria-label="联系人或电话号码"
                placeholder="输入联系人或电话号码"
              />
            </span>
          </label>
          <ChoiceGroup
            label="通话任务"
            options={["预约", "咨询", "改签", "其他"]}
            value={choices.call}
            onChange={(call) => setChoices((current) => ({ ...current, call }))}
          />
          <div className={styles.selectRow}>
            <FieldSelect label="通话语言" options={["中文", "英文", "日语"]} />
            <FieldSelect
              label="沟通语气"
              options={["礼貌自然", "简洁直接", "正式专业"]}
            />
            <FieldSelect
              label="结果记录"
              options={["生成摘要", "完整记录", "仅记录结论"]}
            />
          </div>
        </>
      )}

      {kind === "knowledge" && (
        <>
          <div className={styles.selectRow}>
            <FieldSelect
              label="知识范围"
              options={["全部资料", "项目知识库", "个人收藏"]}
            />
            <FieldSelect
              label="时间范围"
              options={["不限时间", "最近一周", "最近一月", "最近一年"]}
            />
            <FieldSelect
              label="引用来源"
              options={["显示引用", "仅内部资料", "全部来源"]}
            />
          </div>
          <div className={styles.fieldGroup}>
            <span className={styles.label}>试试这样问</span>
            <div className={styles.recommendations}>
              {["找到项目最新结论", "对比两版方案差异"].map(
                (recommendation) => (
                  <button
                    key={recommendation}
                    type="button"
                    className={styles.recommendation}
                    onClick={() => onDraftChange(recommendation)}
                  >
                    <Search aria-hidden="true" strokeWidth={1.7} />
                    <span>{recommendation}</span>
                    <ChevronRight aria-hidden="true" strokeWidth={1.6} />
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className={styles.fieldGroup}>
      <span className={styles.label}>{label}</span>
      <div className={styles.choices} role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            data-active={value === option}
            className={styles.choice}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function FieldSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly string[]
  value?: string
  onChange?: (value: string) => void
}) {
  return (
    <label className={styles.selectField}>
      <select
        key={label}
        aria-label={label}
        value={value}
        defaultValue={value === undefined ? "" : undefined}
        onChange={
          onChange ? (event) => onChange(event.target.value) : undefined
        }
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" strokeWidth={1.8} />
    </label>
  )
}

function DocumentCard({ uploading = false }: { uploading?: boolean }) {
  return (
    <div
      className={styles.documentCard}
      aria-label={
        uploading
          ? "生物科学研究报告，上传中状态示意"
          : "生物科学研究报告，28.6 KB"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/page7/reference-panels/pdf.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <div className={styles.documentInfo}>
        <span className={styles.documentName}>生物科学研究报告</span>
        <span className={styles.documentStatus} data-uploading={uploading}>
          {uploading && (
            <span className={styles.uploadIndicator} aria-hidden="true" />
          )}
          {uploading ? "上传中" : "28.6 KB"}
        </span>
      </div>
    </div>
  )
}
