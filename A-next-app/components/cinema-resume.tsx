"use client"

import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight, Clapperboard, Maximize2, Pause, Play, Volume2 } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import styles from "./cinema-resume.module.css"

const projects = [
  { title: "IFlow LLM Wiki", period: "2026", summary: "长期记忆与可演化知识空间", image: "/resume/highlights/knowledge-base.png" },
  { title: "iFlow APP Builder", period: "2025–26", summary: "AI 原生应用与 Design Skill", image: "/resume/highlights/app-builder.png" },
  { title: "iFlow Agentic AI", period: "2025", summary: "多 Agent 能力编排与产品化", image: "/resume/highlights/agentic-ai.png" },
  { title: "iFlow CLI", period: "2025", summary: "UNIX 美学下的编程助手", image: "/resume/highlights/cli.png" },
  { title: "iFlow AI 搜索", period: "2024–25", summary: "多终端多模态搜索体验", image: "/resume/highlights/ai-search.png" },
  { title: "AI 应用开发", period: "2024–25", summary: "智能体工作流与敏捷构建", image: "/resume/highlights/ai-app-dev.png" },
]

const careers = [
  { period: "2025 — NOW", title: "AI 产品与体验设计", note: "知识系统、Agent、Design Skill", accent: true },
  { period: "2024 — 2025", title: "AI 搜索与应用", note: "多模态搜索、工作流、Vibe Design" },
  { period: "2023 — 2024", title: "商家创意平台", note: "AI 创意生产与广告投放" },
  { period: "2022 — 2023", title: "广告系统设计", note: "商业化产品与复杂系统体验" },
]

const skills = ["AI Product", "Agent Design", "LLM Wiki", "Vibe Coding", "Design Skill", "AI Video", "Workflow", "Figma"]

type Scene = {
  kicker: string
  title: string
  subtitle: string
}

const scenes: readonly Scene[] = [
  { kicker: "OPENING CREDITS", title: "Rian", subtitle: "AI 体验设计师 · 用户产品岗" },
  { kicker: "FEATURE PRESENTATION", title: "Highlights", subtitle: "AI 核心工作项目" },
  { kicker: "ACT III · THE JOURNEY", title: "Career", subtitle: "从复杂系统到 AI 原生体验" },
  { kicker: "END CREDITS", title: "Education / Skills", subtitle: "设计、工程与智能产品的交叉能力" },
]

function SceneContent({ scene }: { scene: number }) {
  if (scene === 0) {
    return (
      <div className={styles.profileScene}>
        <div className={styles.avatarHalo}>
          <img src="/rian-portfolio.png" alt="Rian" draggable={false} />
        </div>
        <p className={styles.overline}>A FILM BY RIAN · 2022—2026</p>
        <h1>RIAN</h1>
        <p className={styles.role}>AI 体验设计师 <i /> 用户产品岗</p>
        <p className={styles.synopsis}>
          聚焦 AI 产品落地、知识系统与广告创意投放。将复杂能力组织成清晰、可信、可持续演化的产品体验。
        </p>
        <div className={styles.contactLine}>
          <span>Hangzhou / Shanghai</span><b>·</b><span>rianadesigner@gmail.com</span><b>·</b><span>rianadesigner</span>
        </div>
      </div>
    )
  }

  if (scene === 1) {
    return (
      <div className={styles.projectScene}>
        <header className={styles.screenHeader}>
          <div><span>FEATURE PRESENTATION</span><h2>Highlights</h2></div>
          <p>AI 核心工作项目</p>
        </header>
        <div className={styles.posterRail}>
          {projects.map((project, index) => (
            <article className={styles.posterCard} key={project.title} style={{ "--poster-index": index } as React.CSSProperties}>
              <img src={project.image} alt="" draggable={false} />
              <div className={styles.posterShade} />
              <span>{project.period}</span>
              <div><h3>{project.title}</h3><p>{project.summary}</p></div>
            </article>
          ))}
        </div>
      </div>
    )
  }

  if (scene === 2) {
    return (
      <div className={styles.careerScene}>
        <header className={styles.screenHeader}>
          <div><span>ACT III · THE JOURNEY</span><h2>Career</h2></div>
          <p>从复杂系统到 AI 原生体验</p>
        </header>
        <div className={styles.careerTimeline}>
          <div className={styles.timelineBeam} />
          {careers.map((entry, index) => (
            <article key={entry.period} className={entry.accent ? styles.activeCareer : ""}>
              <span className={styles.timelineIndex}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.timelineDot} />
              <p>{entry.period}</p>
              <h3>{entry.title}</h3>
              <small>{entry.note}</small>
            </article>
          ))}
        </div>
        <p className={styles.careerQuote}>“把复杂技术，剪辑成用户能理解并愿意使用的体验。”</p>
      </div>
    )
  }

  return (
    <div className={styles.skillsScene}>
      <div className={styles.educationBlock}>
        <span>EDUCATION · DOUBLE MASTER&apos;S DEGREE</span>
        <h2>Design meets<br /><em>Engineering.</em></h2>
        <p>同济大学 × 米兰理工大学</p>
        <small>产品设计 / 机械工程 · 四年跨学科训练</small>
      </div>
      <div className={styles.skillsBlock}>
        <span>TOOLKIT / 2026</span>
        <div className={styles.skillGrid}>
          {skills.map((skill, index) => <div key={skill}><b>{String(index + 1).padStart(2, "0")}</b><p>{skill}</p></div>)}
        </div>
      </div>
      <footer className={styles.endCredit}>CONCEIVED · DESIGNED · DIRECTED BY RIAN</footer>
    </div>
  )
}

function Seat({ row, seat }: { row: number; seat: number }) {
  return (
    <div
      className={styles.seat}
      style={{ "--seat-x": seat, "--seat-row": row } as React.CSSProperties}
      aria-hidden
    >
      <i /><b /><span />
    </div>
  )
}

export function CinemaResume() {
  const [scene, setScene] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)
  const touchStart = useRef(0)
  const wheelLock = useRef(false)

  const changeScene = useCallback((next: number) => {
    const normalized = Math.max(0, Math.min(scenes.length - 1, next))
    setScene((current) => {
      if (normalized === current) return current
      setTransitionKey((key) => key + 1)
      return normalized
    })
  }, [])

  const move = useCallback((direction: number) => {
    setScene((current) => {
      const next = Math.max(0, Math.min(scenes.length - 1, current + direction))
      if (next !== current) setTransitionKey((key) => key + 1)
      return next
    })
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") move(1)
      if (event.key === "ArrowLeft") move(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [move])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setScene((current) => {
        const next = (current + 1) % scenes.length
        setTransitionKey((key) => key + 1)
        return next
      })
    }, 6500)
    return () => window.clearInterval(timer)
  }, [playing])

  const onWheel = (event: React.WheelEvent) => {
    if (wheelLock.current || Math.abs(event.deltaY) < 24) return
    wheelLock.current = true
    move(event.deltaY > 0 ? 1 : -1)
    window.setTimeout(() => { wheelLock.current = false }, 850)
  }

  const meta = scenes[scene]

  return (
    <main
      className={styles.cinema}
      onWheel={onWheel}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
      onTouchEnd={(event) => {
        const delta = event.changedTouches[0].clientX - touchStart.current
        if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1)
      }}
    >
      <div className={styles.theaterShell}>
        <div className={styles.ceiling} aria-hidden><i /><i /><i /><i /><i /></div>
        <div className={`${styles.sideWall} ${styles.wallLeft}`} aria-hidden><i /><i /><i /></div>
        <div className={`${styles.sideWall} ${styles.wallRight}`} aria-hidden><i /><i /><i /></div>
        <div className={styles.backWall} aria-hidden />
        <div className={styles.projectorBeam} aria-hidden />
        <div className={styles.dust} aria-hidden>{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ "--dust": i } as React.CSSProperties} />)}</div>

        <section className={styles.stage} aria-label={`第 ${scene + 1} 幕：${meta.title}`}>
          <div className={styles.prosceniumTop}><i /></div>
          <div className={`${styles.curtain} ${styles.curtainLeft}`}><i /></div>
          <div className={`${styles.curtain} ${styles.curtainRight}`}><i /></div>
          <div className={styles.screenHousing}>
            <div className={styles.screenBezel}>
              <div className={styles.screen}>
                <div className={styles.screenTexture} aria-hidden />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${scene}-${transitionKey}`}
                    className={styles.sceneContent}
                    initial={{ opacity: 0, scale: 1.035, filter: "blur(9px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.985, filter: "blur(7px)" }}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <SceneContent scene={scene} />
                  </motion.div>
                </AnimatePresence>
                <div key={transitionKey} className={styles.frameFlash} aria-hidden />
                <div className={styles.filmGrain} aria-hidden />
                <div className={styles.vignette} aria-hidden />
              </div>
            </div>
          </div>
          <div className={styles.stageLip}><span /><span /><span /><span /><span /></div>
        </section>

        <div className={styles.aisle} aria-hidden><i /><i /><i /><i /><i /></div>
        <div className={styles.seating} aria-hidden>
          {[0, 1, 2].map((row) => (
            <div className={styles.seatRow} key={row}>
              {Array.from({ length: row === 0 ? 7 : row === 1 ? 9 : 11 }, (_, seat) => <Seat key={seat} row={row} seat={seat} />)}
            </div>
          ))}
        </div>

        <header className={styles.cinemaHeader}>
          <div className={styles.brand}><Clapperboard size={15} /><span>RIAN CINEMA</span></div>
          <div className={styles.nowShowing}><i /> NOW SHOWING · <b>{meta.title.toUpperCase()}</b></div>
        </header>

        <nav className={styles.sceneNav} aria-label="影片章节">
          {scenes.map((item, index) => (
            <button type="button" key={item.title} onClick={() => changeScene(index)} className={scene === index ? styles.activeScene : ""}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><small>{item.kicker}</small><b>{item.title}</b></div>
            </button>
          ))}
        </nav>

        <div className={styles.playerBar}>
          <button type="button" onClick={() => move(-1)} disabled={scene === 0} aria-label="上一幕"><ChevronLeft /></button>
          <button type="button" className={styles.playButton} onClick={() => setPlaying((value) => !value)} aria-label={playing ? "暂停" : "自动播放"}>
            {playing ? <Pause /> : <Play />}
          </button>
          <button type="button" onClick={() => move(1)} disabled={scene === scenes.length - 1} aria-label="下一幕"><ChevronRight /></button>
          <div className={styles.progressTrack}>
            <i style={{ width: `${((scene + 1) / scenes.length) * 100}%` }} />
          </div>
          <span className={styles.timecode}>00:0{scene + 1} / 00:04</span>
          <Volume2 className={styles.volumeIcon} />
          <Maximize2 className={styles.maxIcon} />
        </div>

        <div className={styles.sceneCaption}>
          <small>{meta.kicker}</small>
          <b>{meta.title}</b>
          <span>{meta.subtitle}</span>
        </div>
      </div>
    </main>
  )
}
