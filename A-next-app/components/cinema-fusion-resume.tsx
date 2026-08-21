"use client"

import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Circle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

import {
  PROFILE_BIO_LINES,
  bottomTags,
  eduEntries,
  highlightCards,
  skillDockItems,
  topTags,
  workEntries,
} from "@/components/resume-planner"
import type { CareerEntry } from "@/components/resume-planner"

import styles from "./cinema-fusion-resume.module.css"

const scenes = [
  { eyebrow: "2022—2026", nav: "Profile", title: "Rian" },
  { eyebrow: "AI CORE PROJECTS", nav: "Highlights", title: "Highlights" },
  { eyebrow: "WORK EXPERIENCE", nav: "Career", title: "Career" },
  { eyebrow: "EDUCATION / SKILLS", nav: "Education", title: "Education / Skills" },
] as const

function PageHeader({ label, page }: { label: string; page: string }) {
  return (
    <div className={styles.pageHeader}>
      <span>{label}</span><i /><b>{page}</b>
    </div>
  )
}

function TagGroup({ labels }: { labels: readonly string[] }) {
  return <div className={styles.tagGroup}>{labels.map((label) => <span key={label}>{label}</span>)}</div>
}

function Timeline({ entries, compact = false }: { entries: CareerEntry[]; compact?: boolean }) {
  return (
    <div className={`${styles.timeline} ${compact ? styles.compactTimeline : ""}`}>
      {entries.map((item, index) => (
        <article key={`${item.period}-${item.title}`}>
          <i />
          <div>
            <span>{item.period}</span>
            <h3>{item.title}</h3>
            {item.body.type === "text"
              ? <p>{item.body.text}</p>
              : item.body.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <b>{String(index + 1).padStart(2, "0")}</b>
        </article>
      ))}
    </div>
  )
}

function ProfilePage() {
  return (
    <div className={`${styles.resumePage} ${styles.profilePage}`}>
      <PageHeader label="2022—2026" page="1/4" />
      <div className={styles.profileGrid}>
        <div className={styles.identity}>
          <div className={styles.avatarFrame}><Image src="/rian-portfolio.png" alt="Rian" fill priority sizes="110px" draggable={false} /></div>
          <h1>Rian</h1>
          <p>AI EXPERIENCE DESIGNER</p>
        </div>

        <div className={styles.profileCopy}>
          <h2>AI 体验设计师 & 用户产品岗，<br />聚焦AI产品落地及广告创意投放</h2>
          <div className={styles.bioLines}>
            {PROFILE_BIO_LINES.map((line) => <p key={line}>{line}</p>)}
          </div>
          <dl className={styles.contactGrid}>
            <div><dt>电话</dt><dd>18578323924</dd></div>
            <div><dt>邮箱</dt><dd>rianadesigner@gmail.com</dd></div>
            <div><dt>工作地</dt><dd>杭州/上海 (优先)</dd></div>
            <div><dt>微信</dt><dd>rianadesigner</dd></div>
          </dl>
        </div>
      </div>
      <div className={styles.profileTags}><TagGroup labels={topTags} /><TagGroup labels={bottomTags} /></div>
    </div>
  )
}

function HighlightsPage() {
  return (
    <div className={`${styles.resumePage} ${styles.highlightsPage}`}>
      <PageHeader label="Highlights" page="2/4" />
      <div className={styles.titleRow}><h2>Highlights</h2><p>AI 核心工作项目</p></div>
      <div className={styles.highlightGrid}>
        {highlightCards.map((card) => (
          <article key={card.title}>
            <div className={styles.cardTitle}><h3>{card.title}</h3><span>{card.period}</span></div>
            <p>{card.description}</p>
            <div className={styles.projectStill}>
              <Image src={card.image} alt={`${card.title} 项目预览`} fill sizes="25vw" draggable={false} />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function CareerPage() {
  return (
    <div className={`${styles.resumePage} ${styles.careerPage}`}>
      <PageHeader label="Career" page="3/4" />
      <div className={styles.titleRow}><h2>Career</h2><p>从学习到实习到正式工作的设计生涯</p></div>
      <Timeline entries={workEntries} />
    </div>
  )
}

function EducationPage() {
  return (
    <div className={`${styles.resumePage} ${styles.educationPage}`}>
      <PageHeader label="Education/Skills" page="4/4" />
      <div className={styles.educationGrid}>
        <section>
          <div className={styles.titleRow}><h2>Education</h2><p>双学位硕士/设计/机械</p></div>
          <Timeline entries={eduEntries} compact />
        </section>
        <section className={styles.skillsSide}>
          <div className={styles.titleRow}><h2>Skills</h2><p>Vibe Coding/Design</p></div>
          <div className={styles.skillGrid}>
            {skillDockItems.map((skill, index) => (
              <div key={skill.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Image src={skill.src} alt="" width={20} height={20} draggable={false} />
                <p>{skill.label}</p>
              </div>
            ))}
          </div>
          <div className={styles.portfolioBlock}>
            <div className={styles.titleRow}><h2>作品集</h2><p>AI原生产品设计</p></div>
            <Link href="/port"><span>PORTFOLIO HUNT</span><b>Rian&apos;s 2026 Portfolio</b><ArrowUpRight /></Link>
          </div>
        </section>
      </div>
    </div>
  )
}

function SceneContent({ scene }: { scene: number }) {
  if (scene === 0) return <ProfilePage />
  if (scene === 1) return <HighlightsPage />
  if (scene === 2) return <CareerPage />
  return <EducationPage />
}

export function CinemaFusionResume() {
  const [scene, setScene] = useState(0)
  const touchStart = useRef(0)
  const wheelLocked = useRef(false)

  const move = useCallback((direction: number) => {
    setScene((current) => Math.max(0, Math.min(scenes.length - 1, current + direction)))
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") move(1)
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") move(-1)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [move])

  return (
    <main
      className={styles.fusion}
      onWheel={(event) => {
        if (wheelLocked.current || Math.abs(event.deltaY) < 22) return
        wheelLocked.current = true
        move(event.deltaY > 0 ? 1 : -1)
        window.setTimeout(() => { wheelLocked.current = false }, 760)
      }}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
      onTouchEnd={(event) => {
        const delta = event.changedTouches[0].clientX - touchStart.current
        if (Math.abs(delta) > 44) move(delta < 0 ? 1 : -1)
      }}
    >
      <div className={styles.theater} aria-hidden>
        <div className={styles.ceiling}><i /><i /><i /><i /><i /></div>
        <div className={`${styles.wall} ${styles.wallLeft}`}><i /><i /><i /></div>
        <div className={`${styles.wall} ${styles.wallRight}`}><i /><i /><i /></div>
        <div className={`${styles.redBeam} ${styles.redBeamLeft}`} />
        <div className={`${styles.redBeam} ${styles.redBeamRight}`} />
        <div className={styles.projectorCone} />
      </div>

      <section className={styles.screenShell} aria-label={`第 ${scene + 1} 页：${scenes[scene].title}`}>
        <div className={styles.screen}>
          <div className={styles.screenGrain} aria-hidden />
          <div className={styles.screenCorners} aria-hidden><i /><i /><i /><i /></div>
          <div className={styles.screenRedColumns} aria-hidden><i /><i /></div>

          <header className={styles.screenHeader}>
            <button type="button" className={styles.logo} onClick={() => setScene(0)} aria-label="返回个人简介"><span>R</span><i /></button>
            <nav aria-label="简历章节">
              {scenes.map((item, index) => (
                <button type="button" key={item.nav} onClick={() => setScene(index)} className={scene === index ? styles.activeNav : ""}>{item.nav}</button>
              ))}
            </nav>
            <button type="button" className={styles.contactButton} onClick={() => setScene(0)}><Circle size={8} fill="currentColor" /> Resume</button>
          </header>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={scene}
              className={styles.scene}
              initial={{ opacity: 0, x: 24, filter: "blur(7px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
            >
              <SceneContent scene={scene} />
            </motion.div>
          </AnimatePresence>

          <footer className={styles.screenFooter}>
            <div><span>CN</span><span>EN</span></div>
            <div className={styles.frameMeter}>3 · 2 · 1 · <b>0</b> · 1 · 2 · 3<i /></div>
            <div>{String(scene + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</div>
          </footer>

          <button type="button" className={`${styles.arrowButton} ${styles.prev}`} onClick={() => move(-1)} disabled={scene === 0} aria-label="上一页"><ArrowLeft /></button>
          <button type="button" className={`${styles.arrowButton} ${styles.next}`} onClick={() => move(1)} disabled={scene === scenes.length - 1} aria-label="下一页"><ArrowRight /></button>
        </div>
      </section>

      <div className={styles.auditorium} aria-hidden>
        <div className={styles.seatRow}>{Array.from({ length: 11 }, (_, index) => <i key={index} />)}</div>
        <div className={styles.seatRow}>{Array.from({ length: 13 }, (_, index) => <i key={index} />)}</div>
      </div>
      <div className={styles.sceneLabel}><span>{scenes[scene].eyebrow}</span><b>{scenes[scene].title}</b></div>
    </main>
  )
}
