"use client"

import Image from "next/image"
import {
  ArrowUp,
  AudioLines,
  Bot,
  Check,
  ChevronRight,
  CircleUserRound,
  Clapperboard,
  Clock3,
  Film,
  ImagePlus,
  Layers3,
  Mic,
  Pause,
  Play,
  Plus,
  ScanLine,
  Scissors,
  Sparkles,
  Upload,
  WandSparkles,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import styles from "./riff-ai-concepts.module.css"

export type RiffAIConcept = "director" | "timeline" | "studio"

type Clip = {
  title: string
  image: string
  duration: string
  tag: string
  prompt: string
}

const CLIPS: Clip[] = [
  {
    title: "霓虹之后",
    image: "/images/page27/riff-interactive/city.png",
    duration: "00:12",
    tag: "AI 重剪",
    prompt: "保留人物，把城市夜景剪成 12 秒电影预告",
  },
  {
    title: "红色节拍",
    image: "/images/page27/riff-interactive/red-suit.png",
    duration: "00:18",
    tag: "动作匹配",
    prompt: "跟随音乐切换造型，保留手部动作",
  },
  {
    title: "雪线独行",
    image: "/images/page27/riff-interactive/snow.png",
    duration: "00:15",
    tag: "智能运镜",
    prompt: "把雪山旅行素材剪成有呼吸感的短片",
  },
  {
    title: "日落最后一浪",
    image: "/images/page27/riff-interactive/beach.png",
    duration: "00:14",
    tag: "自动成片",
    prompt: "突出朋友相聚的情绪，加入暖色电影质感",
  },
]

const QUICK_PROMPTS = ["自动成片", "续拍 4 秒", "换成雨夜", "自动配乐"]
const STUDIO_PROMPTS = ["保留动作换主角", "旅行素材成片", "电影感", "照片开口"]

function StatusBar() {
  return (
    <div className={styles.statusBar} aria-hidden="true">
      <strong>9:41</strong>
      <span>▮▮▮　⌁　▭</span>
    </div>
  )
}

function AIStatus({ label = "AI 在线" }: { label?: string }) {
  return (
    <span className={styles.aiStatus}>
      <span aria-hidden /> {label}
    </span>
  )
}

export default function RiffAIConceptScreen({ concept }: { concept: RiffAIConcept }) {
  const [activeClip, setActiveClip] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [prompt, setPrompt] = useState(CLIPS[0].prompt)
  const [processing, setProcessing] = useState(false)
  const [applied, setApplied] = useState(false)
  const [toast, setToast] = useState("")
  const timerRef = useRef<number | null>(null)
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const active = CLIPS[activeClip]

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    []
  )

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(""), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const chooseClip = (index: number) => {
    const isCurrentClip = activeClip === index
    setActiveClip(index)
    setIsPlaying((value) => (isCurrentClip ? !value : true))
    setPrompt(CLIPS[index].prompt)
    setToast(
      isCurrentClip
        ? `${isPlaying ? "已暂停" : "继续播放"}「${CLIPS[index].title}」`
        : `已载入「${CLIPS[index].title}」`
    )
  }

  const runAI = (message = "AI 初剪已完成 · 12 秒") => {
    if (processing) return
    setProcessing(true)
    setToast("")
    timerRef.current = window.setTimeout(() => {
      setProcessing(false)
      setToast(message)
    }, 1350)
  }

  const applyQuickPrompt = (value: string) => {
    setPrompt(`${value}：${active.prompt}`)
    setToast(`已加入指令「${value}」`)
  }

  const renderDirector = () => (
    <>
      <header className={styles.topBar}>
        <strong className={styles.brand}>Riff 导演</strong>
        <AIStatus />
        <button aria-label="个人中心" onClick={() => setToast("个人中心 · 原型演示")}>
          <CircleUserRound aria-hidden size="1em" />
        </button>
      </header>

      <div className={styles.directorContent}>
        <div className={styles.introRow}>
          <div>
            <small>AI DIRECTOR</small>
            <h2>一句话，交给导演</h2>
          </div>
          <Clapperboard aria-hidden size="1em" />
        </div>

        <section className={styles.directorComposer} aria-label="AI 导演指令">
          <textarea
            aria-label="描述想制作的视频"
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="把海边散步剪成 12 秒电影预告…"
            ref={promptRef}
            value={prompt}
          />
          <div>
            <span className={styles.attachActions}>
              <button aria-label="添加素材" onClick={() => setToast("选择照片或视频 · 原型演示")}>
                <Plus aria-hidden size="1em" /> 素材
              </button>
              <button aria-label="语音输入" onClick={() => setToast("语音输入 · 原型演示")}>
                <Mic aria-hidden size="1em" />
              </button>
              <button onClick={() => setToast("画幅已设为 9:16")}>9:16</button>
            </span>
            <button className={styles.sendButton} disabled={!prompt.trim() || processing} onClick={() => runAI()}>
              <WandSparkles aria-hidden size="1em" /> 生成分镜
            </button>
          </div>
        </section>

        <div className={styles.quickRail} aria-label="快捷 AI 指令">
          {QUICK_PROMPTS.map((item) => (
            <button key={item} onClick={() => applyQuickPrompt(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className={styles.sectionTitle}>
          <strong>正在放映</strong>
          <span>为你　热门　新作</span>
        </div>

        <div className={styles.directorReel} aria-label="视频灵感">
          {CLIPS.map((clip, index) => (
            <button
              aria-pressed={activeClip === index}
              className={`${styles.reelCard} ${activeClip === index ? styles.reelCardActive : ""}`}
              key={clip.title}
              onClick={() => chooseClip(index)}
            >
              <Image alt="" fill sizes="160px" src={clip.image} style={{ objectFit: "cover" }} />
              <span className={styles.cardShade} />
              <span className={styles.cardTopline}>
                <span>{clip.tag}</span>
                <span>{clip.duration}</span>
              </span>
              <span className={styles.cardBottom}>
                <strong>{clip.title}</strong>
                <small>用这个镜头 <ChevronRight aria-hidden size="1em" /></small>
              </span>
              {activeClip === index && (
                <span className={styles.cardPlayState}>
                  {isPlaying ? <Pause aria-hidden size="1em" /> : <Play aria-hidden size="1em" fill="currentColor" />}
                </span>
              )}
            </button>
          ))}
        </div>

        <button className={styles.aiInsight} onClick={() => runAI("已生成 4 个可编辑镜头") }>
          <span className={styles.insightIcon}><ScanLine aria-hidden size="1em" /></span>
          <span>
            <small>AI 正在看</small>
            <strong>人物 · 夜景 · 情绪上扬</strong>
          </span>
          <span>生成 4 个镜头 <ChevronRight aria-hidden size="1em" /></span>
        </button>
      </div>

      <nav className={styles.bottomNav} aria-label="主要功能">
        <button className={styles.navActive} onClick={() => setToast("继续浏览视频") }>
          <Play aria-hidden size="1em" /> 看视频
        </button>
        <button className={styles.createOrb} onClick={() => promptRef.current?.focus()}>
          <Plus aria-hidden size="1em" /> 做视频
        </button>
        <button onClick={() => setToast("项目列表 · 原型演示") }>
          <Film aria-hidden size="1em" /> 项目
        </button>
      </nav>
    </>
  )

  const renderTimeline = () => (
    <>
      <header className={styles.topBar}>
        <strong className={styles.brand}>Riff</strong>
        <AIStatus label="智能剪辑中" />
        <button aria-label="项目历史" onClick={() => setToast("最近项目 · 原型演示")}>
          <Clock3 aria-hidden size="1em" />
        </button>
      </header>

      <div className={styles.timelineContent}>
        <section className={styles.timelineHero} aria-label={`预览 ${active.title}`}>
          <Image alt="" fill priority sizes="360px" src={active.image} style={{ objectFit: "cover" }} />
          <span className={styles.cardShade} />
          <button
            aria-label={isPlaying ? "暂停预览" : "播放预览"}
            className={styles.heroPlay}
            onClick={() => setIsPlaying((value) => !value)}
          >
            {isPlaying ? <Pause aria-hidden size="1em" /> : <Play aria-hidden fill="currentColor" size="1em" />}
          </button>
          <div className={styles.heroMeta}>
            <span>AI 成片 · {active.duration}</span>
            <strong>{active.title}</strong>
          </div>
          <button className={styles.editThis} onClick={() => runAI("已进入这条片的智能编辑") }>
            编辑这条片
          </button>
        </section>

        <section className={styles.timelinePanel} aria-label="智能镜头时间线">
          <div className={styles.timelineHeading}>
            <span><Layers3 aria-hidden size="1em" /> 已拆分为 6 个镜头</span>
            <strong>00:08.4</strong>
          </div>
          <div className={styles.clipTrack}>
            <span className={styles.playhead} style={{ left: `${8 + activeClip * 24}%` }} />
            {CLIPS.map((clip, index) => (
              <button
                aria-label={`跳至${clip.title}镜头`}
                aria-pressed={activeClip === index}
                className={activeClip === index ? styles.clipActive : undefined}
                key={clip.title}
                onClick={() => chooseClip(index)}
              >
                <Image alt="" fill sizes="80px" src={clip.image} style={{ objectFit: "cover" }} />
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
          <div className={styles.waveform} aria-hidden>
            {Array.from({ length: 34 }, (_, index) => (
              <span key={index} style={{ height: `${24 + ((index * 17) % 62)}%` }} />
            ))}
          </div>
          <div className={styles.toolRow}>
            {[
              ["裁剪", Scissors],
              ["替换", Upload],
              ["扩展", Sparkles],
              ["配音", AudioLines],
            ].map(([label, Icon]) => (
              <button key={label as string} onClick={() => setToast(`${label}「${active.title}」镜头`) }>
                <Icon aria-hidden size="1em" /> {label as string}
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.suggestionCard} ${applied ? styles.suggestionApplied : ""}`}>
          <span><Bot aria-hidden size="1em" /></span>
          <div>
            <small>AI 剪辑建议</small>
            <strong>{applied ? "节奏优化已应用" : "第 3 镜头可提前 0.8 秒"}</strong>
            <p>{applied ? "成片缩短 1.8 秒，音乐卡点已同步。" : "让人物动作更快进入高潮。"}</p>
          </div>
          <button
            onClick={() => {
              setApplied((value) => !value)
              setToast(applied ? "已撤销 AI 建议" : "已应用 AI 节奏建议")
            }}
          >
            {applied ? "撤销" : "应用"}
          </button>
        </section>

        <section>
          <div className={styles.sectionTitle}>
            <strong>更多可以这样剪</strong>
            <button onClick={() => setToast("已展示全部剪辑模板")}>查看全部</button>
          </div>
          <div className={styles.templateRail}>
            {CLIPS.slice(1).map((clip, index) => (
              <button key={clip.title} onClick={() => chooseClip(index + 1)}>
                <Image alt="" fill sizes="110px" src={clip.image} style={{ objectFit: "cover" }} />
                <span className={styles.cardShade} />
                <strong>{clip.tag}</strong>
                <small>6 个镜头 · {clip.duration}</small>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.timelineDock}>
        <button onClick={() => runAI("已根据素材生成第一版时间线") }>
          <WandSparkles aria-hidden size="1em" /> 让 AI 先剪一版
        </button>
        <button aria-label="从素材开始" onClick={() => setToast("选择多个视频素材 · 原型演示")}>
          <Plus aria-hidden size="1em" />
        </button>
      </div>
    </>
  )

  const renderStudio = () => (
    <>
      <header className={styles.topBar}>
        <strong className={styles.brand}>Riff</strong>
        <span className={styles.credit}><Sparkles aria-hidden size="1em" /> 120 积分</span>
        <button aria-label="个人中心" onClick={() => setToast("个人中心 · 原型演示")}>
          <CircleUserRound aria-hidden size="1em" />
        </button>
      </header>

      <div className={styles.studioContent}>
        <div className={styles.studioIntro}>
          <small>GENERATIVE STUDIO</small>
          <h2>今天想做什么视频？</h2>
        </div>

        <section className={styles.studioPrompt} aria-label="视频生成指令">
          <textarea
            aria-label="描述画面、剪辑方式或效果"
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="描述画面、剪辑方式或想要的效果…"
            ref={promptRef}
            value={prompt}
          />
          <div className={styles.promptTools}>
            <span>
              <button aria-label="添加视频" onClick={() => setToast("选择视频 · 原型演示")}><Film aria-hidden size="1em" /></button>
              <button aria-label="添加图片" onClick={() => setToast("选择图片 · 原型演示")}><ImagePlus aria-hidden size="1em" /></button>
              <button aria-label="语音输入" onClick={() => setToast("语音输入 · 原型演示")}><Mic aria-hidden size="1em" /></button>
            </span>
            <button
              aria-label="生成视频预览"
              className={styles.studioGenerate}
              disabled={!prompt.trim() || processing}
              onClick={() => runAI("生成预览已完成 · 可继续编辑")}
            >
              <ArrowUp aria-hidden size="1em" />
            </button>
          </div>
        </section>

        <div className={styles.quickRail} aria-label="快捷生成指令">
          {STUDIO_PROMPTS.map((item) => (
            <button key={item} onClick={() => applyQuickPrompt(item)}>{item}</button>
          ))}
        </div>

        <div className={styles.analysisBar}>
          <span><Bot aria-hidden size="1em" /> AI 已理解</span>
          <button onClick={() => setToast("编辑人物设定")}>人物</button>
          <button onClick={() => setToast("编辑场景设定")}>场景</button>
          <button onClick={() => setToast("编辑镜头设定")}>镜头</button>
          <button onClick={() => setToast("编辑音乐设定")}>音乐</button>
        </div>

        <div className={styles.sectionTitle}>
          <strong>今天大家在做</strong>
          <button onClick={() => setToast("已展示全部灵感")}>查看全部 <ChevronRight aria-hidden size="1em" /></button>
        </div>

        <div className={styles.studioGrid} aria-label="生成视频灵感">
          {CLIPS.map((clip, index) => (
            <button aria-pressed={activeClip === index} key={clip.title} onClick={() => chooseClip(index)}>
              <Image alt="" fill sizes="150px" src={clip.image} style={{ objectFit: "cover" }} />
              <span className={styles.cardShade} />
              <span className={styles.studioCardTag}>{clip.tag}</span>
              <span className={styles.studioCardText}>
                <strong>{clip.title}</strong>
                <small><Play aria-hidden fill="currentColor" size="1em" /> {clip.duration}　做同款</small>
              </span>
              {activeClip === index && <span className={styles.selectedCheck}><Check aria-hidden size="1em" /></span>}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.studioDock}>
        <button onClick={() => promptRef.current?.focus()}>
          <Sparkles aria-hidden size="1em" /> 描述一个视频，立即开始创作
        </button>
      </div>
    </>
  )

  return (
    <div
      className={`${styles.root} ${styles[concept]}`}
      data-slide-interactive
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
    >
      <StatusBar />
      {concept === "director" && renderDirector()}
      {concept === "timeline" && renderTimeline()}
      {concept === "studio" && renderStudio()}

      {processing && (
        <div className={styles.processing} role="status">
          <span aria-hidden /> 正在理解人物、动作与镜头…
        </div>
      )}
      {toast && <div className={styles.toast} role="status">{toast}</div>}
    </div>
  )
}
