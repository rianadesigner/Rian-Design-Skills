"use client"

import {
  ArrowDown,
  ArrowUpRight,
  Circle,
  Play,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import styles from "./director-resume.module.css"

const navItems = [
  { id: "intro", label: "Intro" },
  { id: "thesis", label: "Thesis" },
  { id: "work", label: "Selected work" },
  { id: "profile", label: "Profile" },
  { id: "contact", label: "Contact" },
] as const

const heroFrames = [
  { src: "/resume/highlights/knowledge-base.png", label: "LLM Wiki", year: "2026" },
  { src: "/resume/highlights/agentic-ai.png", label: "Agentic AI", year: "2025" },
  { src: "/resume/highlights/app-builder.png", label: "App Builder", year: "2025" },
  { src: "/resume/highlights/ai-search.png", label: "AI Search", year: "2024" },
]

const selectedWorks = [
  {
    number: "01",
    title: "LLM Wiki",
    type: "Knowledge infrastructure",
    summary: "把碎片资料编译成可以持续生长、被 Agent 调用的长期知识空间。",
    image: "/resume/highlights/knowledge-base.png",
    accent: true,
  },
  {
    number: "02",
    title: "Agentic AI",
    type: "Multi-agent product system",
    summary: "将多 Agent 编排、上下文与任务执行组织成可理解的产品体验。",
    image: "/resume/highlights/agentic-ai.png",
  },
  {
    number: "03",
    title: "App Builder",
    type: "AI native creation",
    summary: "用 Design Skill 连接设计判断与工程实现，提高 AI 生成产品的质量。",
    image: "/resume/highlights/app-builder.png",
  },
  {
    number: "04",
    title: "AI Search",
    type: "Multimodal retrieval",
    summary: "覆盖多终端、多模态与复杂任务的搜索产品设计。",
    image: "/resume/highlights/ai-search.png",
  },
]

const capabilities = [
  {
    number: "01",
    title: "Product systems",
    body: "把模型、工作流和复杂业务约束，组织成清晰的产品架构。",
  },
  {
    number: "02",
    title: "Knowledge & Agent",
    body: "设计上下文、长期记忆、知识编译与 Agent 执行之间的闭环。",
  },
  {
    number: "03",
    title: "Creative technology",
    body: "用原型、动效与代码验证新交互，让前沿能力更快成为真实体验。",
  },
]

export function DirectorResume() {
  const [activeSection, setActiveSection] = useState("intro")
  const [progress, setProgress] = useState(0)
  const scrollRoot = useRef<HTMLElement | null>(null)
  const sections = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const root = scrollRoot.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { root, threshold: [0.3, 0.5, 0.7] },
    )

    sections.current.forEach((section) => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const target = sections.current.find((section) => section?.id === id)
    target?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main
      className={styles.director}
      ref={scrollRoot}
      onScroll={(event) => {
        const node = event.currentTarget
        const range = Math.max(1, node.scrollHeight - node.clientHeight)
        setProgress(node.scrollTop / range)
      }}
    >
      <div className={styles.grain} aria-hidden />
      <div className={styles.frame} aria-hidden><i /><i /><i /><i /></div>

      <header className={styles.masthead}>
        <button className={styles.monogram} type="button" onClick={() => scrollTo("intro")} aria-label="返回首页">
          <span>R</span><i />
        </button>
        <nav aria-label="首页章节">
          {navItems.slice(0, -1).map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={activeSection === item.id ? styles.activeNav : ""}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className={styles.contactNav} type="button" onClick={() => scrollTo("contact")}>
          <i /> Get in touch
        </button>
      </header>

      <aside className={styles.languageRail} aria-hidden>
        <span>CN</span><span>EN</span>
      </aside>
      <aside className={styles.sectionRail} aria-label="当前章节">
        <span>{String(navItems.findIndex((item) => item.id === activeSection) + 1).padStart(2, "0")}</span>
        <i><b style={{ height: `${Math.max(3, progress * 100)}%` }} /></i>
        <span>{String(navItems.length).padStart(2, "0")}</span>
      </aside>

      <section
        id="intro"
        ref={(node) => { sections.current[0] = node }}
        className={`${styles.section} ${styles.hero}`}
      >
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroMeta}>
          <span>AI PRODUCT & EXPERIENCE DESIGN</span>
          <span>HANGZHOU / SHANGHAI</span>
        </div>
        <h1>
          <span>RIAN</span>
          <span>DESIGNS <em>AI</em></span>
          <span>INTO PRODUCTS</span>
        </h1>

        <div className={styles.heroReel}>
          {heroFrames.map((frame, index) => (
            <figure key={frame.label}>
              <Image
                src={frame.src}
                alt={`${frame.label} 项目界面`}
                fill
                priority={index < 2}
                sizes="(max-width: 640px) 50vw, 24vw"
                draggable={false}
              />
              <figcaption><span>{frame.label}</span><b>{frame.year}</b></figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.heroFooter}>
          <p>将复杂 AI 能力，设计成用户可以理解、信任，并长期使用的产品。</p>
          <button type="button" onClick={() => scrollTo("thesis")}>
            Scroll to explore <ArrowDown size={15} />
          </button>
        </div>
      </section>

      <section
        id="thesis"
        ref={(node) => { sections.current[1] = node }}
        className={`${styles.section} ${styles.thesis}`}
      >
        <p className={styles.kicker}>WHY I DESIGN · THE PRODUCT THESIS</p>
        <h2>MAKE AI<br /><span>REMEMBER.</span><br />REASON. ACT.</h2>
        <div className={styles.thesisGrid}>
          <figure className={styles.thesisVisual}>
            <Image
              src="/resume/highlights/knowledge-base.png"
              alt="LLM Wiki 知识空间界面"
              fill
              sizes="(max-width: 640px) 100vw, 62vw"
              draggable={false}
            />
            <div className={styles.playMark}><Play size={16} fill="currentColor" /><span>THE LLM WIKI STORY</span></div>
          </figure>
          <div className={styles.thesisPoints}>
            <article><span>01</span><p>外部资料进入，编译为可复用的长期记忆。</p></article>
            <article><span>02</span><p>Agent 在知识空间中搜索、推理并执行任务。</p></article>
            <article><span>03</span><p>结果与错误持续沉淀，让知识和系统共同进化。</p></article>
          </div>
        </div>
        <p className={styles.thesisStatement}>
          真正的产品壁垒，不是一次回答，<br />而是中间那层<span>持续生长的知识空间。</span>
        </p>
      </section>

      <section
        id="work"
        ref={(node) => { sections.current[2] = node }}
        className={`${styles.section} ${styles.work}`}
      >
        <div className={styles.sectionHeading}>
          <div><p className={styles.kicker}>SELECTED PRODUCTIONS · 2023—2026</p><h2>Selected<br />work</h2></div>
          <p>从知识基础设施到多 Agent 产品、AI 创作与多模态搜索，一组围绕“让 AI 真正可用”展开的实践。</p>
        </div>
        <div className={styles.workGrid}>
          {selectedWorks.map((project) => (
            <article key={project.title} className={project.accent ? styles.featuredWork : ""}>
              <div className={styles.workImage}>
                <Image
                  src={project.image}
                  alt={`${project.title} 项目预览`}
                  fill
                  sizes={project.accent ? "90vw" : "(max-width: 640px) 100vw, 48vw"}
                  draggable={false}
                />
                <div className={styles.workOverlay}><ArrowUpRight size={24} /></div>
              </div>
              <div className={styles.workCopy}>
                <span>{project.number}</span>
                <div><small>{project.type}</small><h3>{project.title}</h3><p>{project.summary}</p></div>
                <ArrowUpRight className={styles.workArrow} size={20} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="profile"
        ref={(node) => { sections.current[3] = node }}
        className={`${styles.section} ${styles.profile}`}
      >
        <p className={styles.kicker}>DIRECTOR&apos;S STATEMENT · PRODUCT METHOD</p>
        <h2>
          I TURN <span>COMPLEX AI</span><br />
          INTO CLEAR PRODUCT<br />
          <span>EXPERIENCES.</span>
        </h2>
        <div className={styles.profileBottom}>
          <div className={styles.profileBio}>
            <Image src="/rian-portfolio.png" alt="Rian" width={86} height={86} draggable={false} />
            <div>
              <b>Rian · AI 体验设计师 / 用户产品岗</b>
              <p>同济大学 × 米兰理工大学双学位硕士。阿里四年，三年 AI 产品项目经验；兼具产品思维、全链路设计与 Vibe Coding 能力。</p>
            </div>
          </div>
          <div className={styles.capabilityList}>
            {capabilities.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p><ArrowUpRight size={17} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={(node) => { sections.current[4] = node }}
        className={`${styles.section} ${styles.contact}`}
      >
        <div className={styles.contactTop}>
          <p className={styles.kicker}>CONTACT · NEXT PRODUCTION</p>
          <Circle size={14} fill="currentColor" />
        </div>
        <h2>LET&apos;S BUILD<br /><span>WHAT&apos;S NEXT.</span></h2>
        <div className={styles.contactDetails}>
          <a href="mailto:rianadesigner@gmail.com">rianadesigner@gmail.com <ArrowUpRight size={18} /></a>
          <span>WECHAT · rianadesigner</span>
          <span>HANGZHOU / SHANGHAI</span>
        </div>
        <footer>
          <span>RIAN DESIGN · ©2026</span>
          <span>AI PRODUCT / AGENT / LLM WIKI / CREATIVE TECHNOLOGY</span>
        </footer>
      </section>
    </main>
  )
}
