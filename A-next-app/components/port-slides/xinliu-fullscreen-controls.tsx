"use client"

import { ArrowDownLeft, ArrowLeftRight, ChevronDown, Phone } from "lucide-react"
import { useState } from "react"

import styles from "./xinliu-fullscreen-controls.module.css"

export type ResearchCapability =
  | "web"
  | "pdf"
  | "ppt"
  | "word"
  | "excel"
  | "video"

export type FullscreenCapability =
  | "code"
  | "translate"
  | "call"
  | "write"
  | "document"
  | "academic"
  | ResearchCapability

const RESEARCH_CONTROLS: Record<
  ResearchCapability,
  {
    label: string
    options: readonly string[]
    fields: readonly { label: string; options: readonly string[] }[]
  }
> = {
  web: {
    label: "网页类型",
    options: ["产品介绍", "作品展示", "数据看板"],
    fields: [
      { label: "视觉风格", options: ["简洁", "科技", "商务"] },
      { label: "适配设备", options: ["响应式", "移动端", "桌面端"] },
    ],
  },
  pdf: {
    label: "处理任务",
    options: ["总结要点", "文档问答", "对比分析"],
    fields: [
      { label: "解读深度", options: ["简要概览", "详细解读"] },
      { label: "输出语言", options: ["中文", "英文"] },
    ],
  },
  ppt: {
    label: "演示场景",
    options: ["项目汇报", "方案提案", "知识分享"],
    fields: [
      { label: "演示页数", options: ["自动", "5–10 页", "10–20 页"] },
      { label: "表达风格", options: ["简洁清晰", "正式专业", "生动直观"] },
    ],
  },
  word: {
    label: "文档类型",
    options: ["报告", "方案", "文章"],
    fields: [
      { label: "文档长度", options: ["简短", "适中", "详细"] },
      { label: "写作语言", options: ["中文", "英文"] },
    ],
  },
  excel: {
    label: "分析任务",
    options: ["数据整理", "统计分析", "图表可视化"],
    fields: [
      { label: "输出形式", options: ["表格与图表", "表格", "图表"] },
      { label: "分析范围", options: ["全部数据", "指定工作表", "指定字段"] },
    ],
  },
  video: {
    label: "视频类型",
    options: ["产品介绍", "知识讲解", "创意短片"],
    fields: [
      { label: "视频时长", options: ["15 秒", "30 秒", "60 秒"] },
      { label: "画面比例", options: ["16:9", "9:16", "1:1"] },
    ],
  },
}

function isResearchCapability(
  kind: FullscreenCapability
): kind is ResearchCapability {
  return kind in RESEARCH_CONTROLS
}

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
  const [researchChoice, setResearchChoice] = useState("")
  const research = isResearchCapability(kind) ? RESEARCH_CONTROLS[kind] : null

  return (
    <div className={styles.root} data-fullscreen-controls={kind}>
      {research && (
        <>
          <ChoiceGroup
            label={research.label}
            options={research.options}
            value={researchChoice || research.options[0]}
            onChange={setResearchChoice}
          />
          <div className={styles.fieldGroup}>
            <span className={styles.label}>要求</span>
            <div className={styles.selectRow}>
              {research.fields.map((field) => (
                <FieldSelect
                  key={field.label}
                  label={field.label}
                  options={field.options}
                />
              ))}
            </div>
          </div>
        </>
      )}
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

      {kind === "academic" && (
        <div className={styles.fieldGroup}>
          <span className={styles.label}>要求</span>
          <div className={styles.selectRow}>
            <FieldSelect
              label="知识范围"
              options={["全部学科", "自然科学", "社会科学", "工程技术"]}
              academic
              active
            />
            <FieldSelect
              label="时间范围"
              options={["不限时间", "最近一周", "最近一月", "最近一年"]}
              academic
            />
            <FieldSelect
              label="引用来源"
              options={["全部来源", "期刊论文", "会议论文", "学位论文"]}
              academic
            />
          </div>
        </div>
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
  academic = false,
  active = false,
}: {
  label: string
  options: readonly string[]
  value?: string
  onChange?: (value: string) => void
  academic?: boolean
  active?: boolean
}) {
  return (
    <label className={styles.selectField} data-active={active || undefined}>
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
      {academic ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.academicCaret}
          src={`/images/page7/academic-overlay/caret-${active ? "up" : "down"}.svg`}
          alt=""
          aria-hidden="true"
        />
      ) : (
        <ChevronDown aria-hidden="true" strokeWidth={1.8} />
      )}
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
