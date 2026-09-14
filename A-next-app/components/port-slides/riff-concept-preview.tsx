"use client"

import { Check, MousePointer2, Sparkles } from "lucide-react"
import { type CSSProperties, useState } from "react"
import RiffAIConceptScreen, { type RiffAIConcept } from "./riff-ai-concepts"
import RiffHomePrototype from "./riff-home-prototype"
import styles from "./riff-concept-preview.module.css"

type Direction = "inspiration" | RiffAIConcept

const DIRECTIONS: Array<{
  id: Direction
  index: string
  title: string
  label: string
  description: string
  accent: string
}> = [
  {
    id: "inspiration",
    index: "00",
    title: "灵感视频流",
    label: "现有基线",
    description: "一条主视频搭配多素材发现，先看效果，再做同款。",
    accent: "#ff4b52",
  },
  {
    id: "director",
    index: "01",
    title: "AI 导演台",
    label: "Prompt + 分镜",
    description: "一句话生成分镜，边刷作品边把镜头加入导演指令。",
    accent: "#74ddff",
  },
  {
    id: "timeline",
    index: "02",
    title: "智能镜头台",
    label: "时间线 + 建议",
    description: "首页直接展示镜头拆分、时间线与可应用的 AI 剪辑建议。",
    accent: "#d9ff68",
  },
  {
    id: "studio",
    index: "03",
    title: "生成工作室",
    label: "Prompt-first",
    description: "把素材、人物、镜头和音乐理解集中到一个生成输入器。",
    accent: "#b67cff",
  },
]

export default function RiffConceptPreview() {
  const [direction, setDirection] = useState<Direction>("director")
  const current = DIRECTIONS.find((item) => item.id === direction) ?? DIRECTIONS[1]

  return (
    <main className={styles.preview} style={{ "--preview-accent": current.accent } as CSSProperties}>
      <div className={styles.ambient} aria-hidden />
      <div className={styles.showcase}>
        <section className={styles.chooser} aria-labelledby="riff-concepts-title">
          <div className={styles.eyebrow}>
            <Sparkles aria-hidden size="1em" /> RIFF HOME DIRECTIONS
          </div>
          <h1 id="riff-concepts-title">更像 AI 视频编辑器的首页</h1>
          <p>
            四个方向共享“看视频 / 做视频”两条主路径，但分别强化灵感、导演、剪辑和生成心智。
          </p>

          <div className={styles.optionList} aria-label="选择首页方案">
            {DIRECTIONS.map((item) => (
              <button
                aria-pressed={direction === item.id}
                className={direction === item.id ? styles.optionActive : undefined}
                key={item.id}
                onClick={() => setDirection(item.id)}
                style={{ "--option-accent": item.accent } as CSSProperties}
              >
                <span className={styles.optionIndex}>{item.index}</span>
                <span className={styles.optionCopy}>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.label}</small>
                  </span>
                  <em>{item.description}</em>
                </span>
                <span className={styles.optionCheck}>
                  {direction === item.id ? <Check aria-hidden size="1em" /> : null}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.hint}>
            <MousePointer2 aria-hidden size="1em" />
            <span>
              <strong>原型可直接点击</strong>
              切换视频、编辑镜头、输入 Prompt，并体验 AI 生成反馈。
            </span>
          </div>
        </section>

        <section className={styles.deviceStage} aria-label={`${current.title}可交互原型`}>
          <div className={styles.directionLabel}>
            <span>{current.index}</span>
            <div>
              <strong>{current.title}</strong>
              <small>{current.label}</small>
            </div>
          </div>
          <div className={styles.deviceFrame}>
            {direction === "inspiration" ? (
              <RiffHomePrototype key={direction} />
            ) : (
              <RiffAIConceptScreen concept={direction} key={direction} />
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
