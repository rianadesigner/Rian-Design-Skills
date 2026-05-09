"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import type { MotionValue } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Ballet } from "next/font/google"

import { cn } from "@/lib/utils"

const ballet = Ballet({ subsets: ["latin"], weight: "400" })

const AVATAR_FROM_DEMO2 = "/rian-portfolio.png"
const AVATAR_FALLBACK   = "/avatar.svg"
const iconAiWorkflow    = "/icons/ai-workflow.png"
const iconFigma         = "/icons/figma.png"
const iconAiSearch      = "/icons/ai-search.png"
const iconAiAgent       = "/icons/ai-agent.png"
const iconAiCoding      = "/icons/ai-coding.png"
const iconAiDesign      = "/icons/ai-design.png"
const iconAiVideo       = "/icons/ai-video.png"

// 翻页动画总时长（含落定回弹）
const FLIP_S      = 1.05
// 落地过冲度数：纸张因惯性略微越过目标角度
const OVERSHOOT   = 6
// 卷角峰值高度（px），约 0.26s / ~55° 时达到峰值，过 90° 前收回
const CURL_MAX_PX = 92
// 仅悬停时卷边强度（相对 pageCurl 0–1，略低于翻页峰值以区分）
const HOVER_CURL = 0.82

type SkillDockItem = { label: string; src: string }

const skillDockItems: SkillDockItem[] = [
  { label: "Figma",       src: iconFigma },
  { label: "AI Search",   src: iconAiSearch },
  { label: "AI Workflow", src: iconAiWorkflow },
  { label: "AI Agent",    src: iconAiAgent  },
  { label: "AI Coding",   src: iconAiCoding },
  { label: "AI Design",   src: iconAiDesign },
  { label: "AI Video",    src: iconAiVideo  },
]

/** Highlights 卡片：与 Figma 65:478 顺序与文案一致；截图为导出资源 */
type HighlightCardData = {
  title: string
  description: string
  period: string
  image: string
  /** 外卡片圆角 */
  outerRadius: string
  /** 截图框圆角 */
  frameRadius: string
  /** 截图区底部白底（与设计一致：部分为纯白） */
  frameTint: "mist" | "white"
  /** 截图在框内的 object-* 与位移微调 */
  imgClassName: string
}

const highlightCards: readonly HighlightCardData[] = [
  {
    title:       "iFlow 知识库",
    description: "项目/本地/云端知识库的全面打造",
    period:      "2026",
    image:       "/resume/highlights/knowledge-base.png",
    outerRadius: "rounded-[8px]",
    frameRadius: "rounded-lg",
    frameTint:   "mist",
    imgClassName: "absolute left-0 top-[-22%] h-[96%] w-full max-w-none min-w-full object-cover",
  },
  {
    title:       "iFlow APP Builder",
    description: "设计并优化Design Skill提升视觉质量",
    period:      "2025-2026",
    image:       "/resume/highlights/app-builder.png",
    outerRadius: "rounded-[8px]",
    frameRadius: "rounded",
    frameTint:   "white",
    imgClassName: "absolute left-0 top-[2%] h-[70%] w-full max-w-none object-cover object-top",
  },
  {
    title:       "iFlow Agentic AI",
    description: "多 Agent 能力编排与产品化落地",
    period:      "2025",
    image:       "/resume/highlights/agentic-ai.png",
    outerRadius: "rounded-[8px]",
    frameRadius: "rounded",
    frameTint:   "mist",
    imgClassName: "absolute left-0 top-[0.2%] h-[89%] w-full max-w-none object-cover",
  },
  {
    title:       "iFlow CLI",
    description: "UNIX美学范式下的开源编程AI助手",
    period:      "2025",
    image:       "/resume/highlights/cli.png",
    outerRadius: "rounded-[4px]",
    frameRadius: "rounded",
    frameTint:   "mist",
    imgClassName: "absolute left-0 top-[-8%] h-[144%] w-full max-w-none object-cover object-top",
  },
  {
    title:       "iFlow AI搜索",
    description: "赋能覆盖多终端的多模态独家产品设计",
    period:      "2024–2025",
    image:       "/resume/highlights/ai-search.png",
    outerRadius: "rounded-[8px]",
    frameRadius: "rounded",
    frameTint:   "mist",
    imgClassName: "absolute left-0 top-[0.3%] h-[89%] w-full max-w-none object-cover",
  },
  {
    title:       "AI应用开发",
    description: "搭建工作流/智能体敏捷实现业务构想",
    period:      "2024–2025",
    image:       "/resume/highlights/ai-app-dev.png",
    outerRadius: "rounded-[8px]",
    frameRadius: "rounded",
    frameTint:   "mist",
    imgClassName: "absolute left-0 top-0 h-[90%] w-full max-w-none object-cover",
  },
  {
    title:       "商家创意平台",
    description: "面向商家创意生产的 AI 工具平台",
    period:      "2023–2024",
    image:       "/resume/highlights/merchant-creative.png",
    outerRadius: "rounded-[8px]",
    frameRadius: "rounded",
    frameTint:   "mist",
    imgClassName: "absolute left-0 top-[0.35%] h-[80%] w-full max-w-none object-cover",
  },
  {
    title:       "广告外投",
    description: "覆盖多平台投放链路的广告系统设计",
    period:      "2022–2023",
    image:       "/resume/highlights/ads-platform.png",
    outerRadius: "rounded-[8px]",
    frameRadius: "rounded",
    frameTint:   "mist",
    imgClassName: "absolute left-0 top-0 h-[81%] w-full max-w-none object-cover",
  },
] as const

const topTags    = ["Multi-Agent 规划&执行", "AIGC 图视频创意生成", "项目/本地/云端知识库搭建"] as const
const bottomTags = ["Vibe Coding", "APP & Web Builder", "Design Skills", "Cursor Vibe Design"] as const

type CareerBody  = { type: "text"; text: string } | { type: "paragraphs"; paragraphs: string[] }
type CareerEntry = { period: string; title: string; body: CareerBody }

const careerEntries: CareerEntry[] = [
  {
    period: "2024.04 - now",
    title:  "淘天集团 · 高级体验设计师",
    body: {
      type: "text",
      text: "0-1打造iFlow全产品线，统筹 5 条核心产品线与体验链路，覆盖通用/学术/coding/Builder 4 个关键场景，核心指标包括DAU 10w+, 次留60%+。核心贡献包括：多 Agent 能力编排、iFlow CLI（UNIX 美学范式）、本地/云端/项目知识库一体化建设、设计并持续优化 Design Skill、显著提升 APP Builder 视觉质量与整体Vibe Design对个人及团队管理提效。",
    },
  },
  {
    period: "2022.01 - 2024.03",
    title:  "淘天集团 · 体验设计师",
    body: {
      type: "paragraphs",
      paragraphs: [
        "主导AI应用开发平台从0到1的系统设计，打造可视化工作流编辑器与智能体编排引擎, 显著降低内部用户使用门槛, 成为淘天内部重要AI能力输出平台, 已服务N+个业务团队, AI应用研发周期平均缩短 X%。",
        "聚焦中小商家广告创意生产痛点, 以\"降低创意门槛, 提升广告渗透率\"为核心目标, 推动万相实验室、创意中心等创意工具的产品规划与体验升级,推动大模型能力在图文/视频创作场景的深度应用。",
      ],
    },
  },
  {
    period: "2021.07 — 2021.12",
    title:  "淘天集团 · 体验设计（实习）",
    body: { type: "text", text: "0-1推动品牌广告创意平台上线, 并快速迭代支持BP创意洞察、妈妈club、运营工作台等业务" },
  },
  {
    period: "2021.07 — 2021.12",
    title:  "字节跳动 · 商业化 · 交互设计（实习）",
    body: { type: "text", text: "重点支持抖音火山版\"集碎片抽手机\"营销设计, TikTok广告创意样式升级, Rubeex互动广告样式平台搭建、 AI视频自动化叉乘、抖音激励广告体验优化等创新项目, 并完成答辩及转正" },
  },
  {
    period: "2019.09 — 2021.12",
    title:  "米兰理工大学 · 设计学院 (QS前100) · 双硕士",
    body: { type: "text", text: "产品整合设计硕士(Integrated Product Design)(Double Degree)" },
  },
  {
    period: "2018.09 — 2021.05",
    title:  "同济大学 · 上海国际设计创新学院 · 硕士",
    body: { type: "text", text: "工业设计工程硕士(专业第一申请意大利双学位项目)" },
  },
  {
    period: "2014.09 — 2018.06",
    title:  "东北大学 · 机械设计及自动化学院 · 学士",
    body: { type: "text", text: "工业设计工程学士(保研同济)" },
  },
]

const workEntries = careerEntries.slice(0, 4)
const eduEntries  = careerEntries.slice(4)

const bodyFont = "font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif]"

// 页面渐变背景
const GRAD_L = "linear-gradient(90deg,  #fdfbf9 0%, #fdfbf9 85%, #f4f1ed 95%, #ebe7e1 100%)"
const GRAD_R = "linear-gradient(270deg, #fdfbf9 0%, #fdfbf9 85%, #f4f1ed 95%, #ebe7e1 100%)"

// ─────────────────────────────────────────────────────────────────────────────

export function ResumePlanner() {
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const [scale, setScale]         = useState(1)
  const [avatarSrc, setAvatarSrc] = useState(AVATAR_FROM_DEMO2)
  const [isFlipped,   setIsFlipped]   = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // MotionValue 驱动 3D 翻页：角度 0 → -180
  const rotateY    = useMotionValue<number>(0)
  // 折叠阴影：峰值在翻页中点（书脊弯折暗部）
  const foldShadow = useMotionValue<number>(0)
  // 翻转亮边：光线打到纸张翻转的前缘
  const edgeGlow   = useMotionValue<number>(0)
  // 卷角归一化强度 0–1，配合 curlSize 驱动右下角/左下角折角
  const pageCurl   = useMotionValue<number>(0)
  // 1 = 正面翻开卷右下角，-1 = 背面翻回卷左下角
  const curlDir    = useMotionValue<number>(1)
  const curlSize   = useTransform(pageCurl, [0, 1], [0, CURL_MAX_PX])
  const brCurlSize = useTransform([curlSize, curlDir], ([s, d]) => (d === 1 ? s : 0)) as MotionValue<number>
  const blCurlSize = useTransform([curlSize, curlDir], ([s, d]) => (d === -1 ? s : 0)) as MotionValue<number>
  /** 切掉被卷起的页角，避免出现「直角底层 + 卷边」双层一角 */
  const clipPathFront = useTransform(brCurlSize, (s) =>
    s < 1
      ? "none"
      : `polygon(0% 0%, 100% 0%, 100% calc(100% - ${s}px), calc(100% - ${s}px) 100%, 0% 100%)`,
  ) as MotionValue<string>
  const clipPathBack = useTransform(blCurlSize, (s) =>
    s < 1
      ? "none"
      : `polygon(0% 0%, 100% 0%, 100% 100%, ${s}px 100%, 0% calc(100% - ${s}px))`,
  ) as MotionValue<string>

  useEffect(() => {
    const update = () => {
      const w = wrapperRef.current?.clientWidth ?? 1000
      setScale(Math.min(1, w / 1000))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  /**
   * 翻页物理曲线（4 帧关键帧）：
   *   0 → -90°  (38%)  easeIn  — 边缘被快速掀起，纸张抛出
   *   -90° → ±过冲  (49%)  easeOut — 重力落下，略微越过目标
   *   ±过冲 → 目标  (13%)  easeInOut — 回弹至静止，柔软落定
   * pageCurl + curlSize：翻起前期右下角/左下角短暂卷起，过 90° 前收回，与 foldShadow / edgeGlow 衔接。
   */
  const doFlip = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const forward   = !isFlipped
    const cur       = rotateY.get()
    const target    = forward ? -180 : 0
    const over      = forward ? target - OVERSHOOT : target + OVERSHOOT

    curlDir.set(forward ? 1 : -1)
    pageCurl.set(0)
    // 卷角：0 → 峰值 → 0 → 0；峰值约在 25% 时间（~55°），52% 时已落回便于交接主翻转
    animate(pageCurl, [0, 1, 0, 0], {
      duration: FLIP_S,
      times:    [0, 0.25, 0.52, 1],
      ease:     ["easeOut", "easeIn", "easeInOut"],
    })

    // 折叠暗部：书脊弯折处，峰值在中点后略早（纸张正展开时最弯）
    animate(foldShadow, [0, 1, 0.5, 0], {
      duration: FLIP_S,
      times:    [0, 0.38, 0.87, 1],
      ease:     "easeInOut",
    })

    // 翻转前缘亮边：纸张边缘被光打亮，峰值在翻到90°附近
    animate(edgeGlow, [0, 0.8, 0], {
      duration: FLIP_S,
      times:    [0, 0.42, 1],
      ease:     "easeInOut",
    })

    // 主旋转 4 帧：抛出 → 越过 → 回弹静止
    animate(rotateY, [cur, -90, over, target], {
      duration: FLIP_S,
      times:    [0, 0.38, 0.87, 1.0],
      ease:     ["easeIn", "easeOut", "easeInOut"] as const,
    }).then(() => {
      setIsFlipped((v) => !v)
      setIsAnimating(false)
    })
  }

  /** 悬停：不抬页，仅用页脚卷边提示可交互（正面右下 / 背面左下） */
  const handleHoverStart = () => {
    if (isAnimating) return
    curlDir.set(isFlipped ? -1 : 1)
    animate(pageCurl, HOVER_CURL, { duration: 0.32, ease: "easeOut" })
  }
  const handleHoverEnd = () => {
    if (isAnimating) return
    animate(pageCurl, 0, { duration: 0.26, ease: "easeOut" })
  }

  return (
    <main className="min-h-screen overflow-x-auto bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.94),_rgba(240,237,232,0.92)_50%,_rgba(227,222,216,0.96))] px-6 py-10 text-[#171717] sm:px-10">
      <div ref={wrapperRef} className="mx-auto w-full max-w-[1000px]">
        <div className="relative" style={{ height: `${700 * scale}px` }}>
          <div
            className="absolute left-0 top-0 h-[700px] w-[1000px] origin-top-left"
            style={{ transform: `scale(${scale})` }}
          >
              {/* ── 透视舞台 ──────────────────────────────────────────────── */}
            <div
              className="absolute inset-0"
              style={{ perspective: "1400px", perspectiveOrigin: "50% 48%" }}
            >
              {/* 左页底色 */}
              <div
                className="absolute inset-y-0 left-0 w-[500px] rounded-l-[12px]"
                style={{ background: GRAD_L }}
              />

              {/* 右页底色（Education 页常驻在此，被 flip 遮住） */}
              <motion.div
                className="absolute inset-y-0 right-0 w-[500px] rounded-br-[12px] rounded-tr-[12px]"
                style={{ background: GRAD_R, clipPath: clipPathFront }}
              />

              {/* ── Layer 0：Profile 页（左半，永远在底部） ──────────────── */}
              <div className="absolute inset-y-0 left-0 w-[500px] overflow-hidden">
                {/* 页眉 */}
                <div className="absolute left-[56px] top-[32px] flex w-[388px] items-center gap-3 text-[#ba6d73]">
                  <span className={cn(bodyFont, "text-[12px] leading-5")}>Guo Ruixuan</span>
                  <div className="h-px min-w-px flex-1 bg-[rgba(241,186,186,0.3)]" />
                  <span className={cn(bodyFont, "text-[10px] leading-[18px]")}>2022-2026</span>
                </div>

                {/* 主体内容 */}
                <div className="absolute left-[56px] top-[110px] flex w-[388px] flex-col items-center gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      alt="Rian avatar"
                      src={avatarSrc}
                      onError={() => setAvatarSrc(AVATAR_FALLBACK)}
                      className="h-[76px] w-[76px] rounded-full object-cover object-[center_12%]"
                    />
                    <div className={cn(ballet.className, "text-[24px] leading-[32.56px] tracking-[0.02em] text-[#171717]")}>
                      Rian
                    </div>
                  </div>

                  <h1 className={cn(bodyFont, "w-full text-center text-[14px] font-semibold leading-[22px] text-[#5a5652]")}>
                    AI 体验设计师 & 用户产品岗，聚焦AI产品落地及广告创意投放
                  </h1>

                  <div className={cn(bodyFont, "w-full text-justify text-[12px] leading-[22px] tracking-[-0.04em] text-[#5a5652]")}>
                    <p>同济&米兰理工大学双学位硕士，阿里工作四年多，0-1 负责多款AI原生产品</p>
                    <p>视野前瞻，经验驱动：负责应用搭建/智能体/AI搜/知识库/Vibe Design 落地</p>
                    <p>独当一面，长期支持：支持阿里妈妈创意中心/万相营造商家AI创意平台设计</p>
                    <p>拓展视野，熟悉业务：围绕广告大外投推动需求/平台/供给侧多端平台基建</p>
                  </div>

                  <div className={cn(bodyFont, "w-full space-y-3 text-[12px] leading-5")}>
                    <div className="flex w-full items-center">
                      <div className="flex flex-1 items-center">
                        <span className="w-12 text-[#a39e99]">电话</span>
                        <span className="whitespace-nowrap text-[#ba6d73]">18578323924</span>
                      </div>
                      <div className="flex flex-1 items-center gap-1.5">
                        <span className="w-[30px] text-[#a39e99]">邮箱</span>
                        <span className="whitespace-nowrap text-[#ba6d73]">rianadesigner@gmail.com</span>
                      </div>
                    </div>
                    <div className="flex w-full items-center">
                      <div className="flex flex-1 items-center">
                        <span className="w-12 text-[#a39e99]">工作地</span>
                        <span className="whitespace-nowrap text-[#ba6d73]">杭州/上海</span>
                      </div>
                      <div className="flex flex-1 items-center gap-1.5">
                        <span className="w-[30px] text-[#a39e99]">微信</span>
                        <span className="whitespace-nowrap text-[#ba6d73]">rianadesigner</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 底部标签（两行；标签内文字单行不换行） */}
                <div className="absolute left-[56px] top-[602px] flex w-[388px] min-w-0 flex-col gap-3">
                  <TagRow labels={topTags} />
                  <TagRow labels={bottomTags} />
                </div>
              </div>

              {/* ── Layer 0：Education+Skills 页（右半，永远在底部） ──────── */}
              <motion.div
                className="absolute inset-y-0 right-0 w-[500px] overflow-hidden"
                style={{ clipPath: clipPathFront }}
              >
                {/* 水印 */}
                <div className="pointer-events-none absolute left-[113px] top-[333px] flex size-[433px] items-center justify-center text-[#ba6d73]/40 opacity-[0.14]">
                  <div className="-rotate-6 size-[400px]">
                    <PlannerBotanicalWatermark />
                  </div>
                </div>
                {/* 右上装饰点 */}
                <div className="absolute right-[24px] top-[24px] flex h-1 w-3 gap-1">
                  <div className="h-1 w-1 rounded-[2px] bg-[#f1baba]" />
                  <div className="h-1 w-1 flex-1 rounded-[2px] bg-[#f1baba]/50" />
                </div>

                {/* 内容 */}
                <div className="absolute left-[56px] top-[28px] flex items-center gap-[6px]">
                  <span className={cn(bodyFont, "text-[12px] font-medium leading-5 text-[#ba6d73]")}>Career · Education</span>
                  <div className="h-px w-4 bg-[rgba(241,186,186,0.4)]" />
                  <span className={cn(bodyFont, "text-[10px] leading-[18px] text-[#ba6d73]/45")}>4 / 4</span>
                </div>

                <div className="absolute left-[56px] right-[56px] top-[60px]">
                  {/* Education 时间轴 */}
                  <div className="mb-[10px] flex items-baseline gap-x-2">
                    <h2 className={cn(bodyFont, "text-[18px] font-semibold leading-[26px] text-[#171717]")}>Education</h2>
                    <p className={cn(bodyFont, "text-[10px] leading-[18px] text-[#a39e99]")}>双学位 · 工程 · 设计</p>
                  </div>
                  <CareerList entries={eduEntries} />

                  {/* Skill Dock — 对齐 Figma 65:256 */}
                  <div className="mt-6 flex h-[44px] w-full items-stretch overflow-hidden rounded-[12px] border border-[rgba(23,23,23,0.08)] bg-[rgba(255,255,255,0.45)]">
                    {skillDockItems.map((item, i) => (
                      <div key={item.label} className="relative flex flex-1 flex-col items-center justify-center">
                        {/* 各 item 左侧分隔线 */}
                        {i > 0 && (
                          <div className="absolute inset-y-[6px] left-0 w-px bg-[rgba(23,23,23,0.06)]" />
                        )}
                        {/* 磨砂背景 + 白色细边，对齐 Figma Overlay+Border */}
                        <div className="absolute inset-[0.5px] rounded-[4.5px] border border-[rgba(255,255,255,0.12)] backdrop-blur-[3.7px]" />
                        {/* 图标 */}
                        <div className="relative z-[1] mb-[3px] flex h-[12px] w-[12px] items-center justify-center">
                          <img alt="" src={item.src} className="h-[12px] w-[12px] object-contain" draggable={false} />
                        </div>
                        {/* 标签：对齐 Figma PingFang SC 约 5px */}
                        <span
                          className="relative z-[1] text-center leading-[8px] text-[#171717]"
                          style={{ fontSize: "5.1px", fontFamily: "'PingFang SC', 'SF Pro Text', -apple-system, sans-serif" }}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── Layer 2：3D 翻页（motion.div 绑定 MotionValue） ────── */}
              {/*
               * 正面 (Highlights) = spread 0 右页；背面 (Career Work) = spread 1 左页
               * rotateY MotionValue 由 animate() 驱动，实现两段式物理缓动：
               *   前 40% 时间：0→-90°  easeIn（快速抬起）
               *   后 60% 时间：-90→-180° easeOut（缓缓落下）
               * foldShadow 同步模拟纸张在折叠点的弯曲阴影。
               */}
              <motion.div
                style={{
                  position:       "absolute" as const,
                  left:           500,
                  top:            0,
                  width:          500,
                  height:         700,
                  originX:        0,
                  originY:        0.5,
                  rotateY,
                  transformStyle: "preserve-3d" as const,
                  zIndex:         2,
                  cursor:         isAnimating ? "default" : "pointer",
                }}
                onClick={doFlip}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              >
                {/* ── 正面：Highlights（右页样式）；内层 clip 掉被折起的角，卷角叠在外层之上 ── */}
                <motion.div
                  className="absolute right-0 bottom-0 h-full w-full overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    borderRadius:       "0 12px 12px 0",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      background:   GRAD_R,
                      borderRadius: "0 12px 12px 0",
                      clipPath:     clipPathFront,
                    }}
                  >
                    {/* 水印 */}
                    <div className="pointer-events-none absolute left-[113px] top-[333px] flex size-[433px] items-center justify-center text-[#ba6d73]/40 opacity-[0.14]">
                      <div className="-rotate-6 size-[400px]">
                        <PlannerBotanicalWatermark />
                      </div>
                    </div>
                    {/* 书脊阴影 */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-6" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.05) 0%, transparent 100%)" }} />
                    {/* 右上装饰点 */}
                    <div className="absolute right-[24px] top-[24px] flex h-1 w-3 gap-1">
                      <div className="h-1 w-1 rounded-[2px] bg-[#f1baba]" />
                      <div className="h-1 w-1 flex-1 rounded-[2px] bg-[#f1baba]/50" />
                    </div>

                    {/* 页眉 — 对齐 Figma 65:478（标题 + 副标题） */}
                    <div className="absolute left-[56px] top-[32px] flex flex-wrap items-baseline gap-x-3">
                      <h2 className={cn(bodyFont, "text-[18px] font-semibold leading-[26px] text-[#171717]")}>Highlights</h2>
                      <p className={cn(bodyFont, "text-[10px] leading-[18px] text-[#a39e99]")}>AI 核心工作项目</p>
                    </div>

                    {/* 项目网格：2×4 + 每卡底部截图框 */}
                    <div className="absolute left-[56px] top-[70px] w-[388px]">
                      <div className="grid w-[388px] grid-cols-2 gap-2">
                        {highlightCards.map((card) => (
                          <article
                            key={card.title}
                            className={cn(
                              bodyFont,
                              "relative h-[144px] w-[190px] shrink-0 overflow-hidden border border-[rgba(23,23,23,0.08)]",
                              card.outerRadius,
                            )}
                            style={{ background: "linear-gradient(168.52deg, rgba(255,255,255,0.9) 7.735%, rgba(244,241,237,0.5) 92.265%)" }}
                          >
                            <h3 className="absolute left-[9px] top-[7px] pr-12 text-[12px] font-semibold leading-5 text-[#171717]">
                              {card.title}
                            </h3>
                            <p className="absolute left-[9px] top-[35px] w-[170px] text-[10px] leading-[18px] text-[#5a5652]">
                              {card.description}
                            </p>
                            <span className="absolute right-[9px] top-[7px] text-right text-[10px] font-semibold leading-[18px] text-[#ba6d73]">
                              {card.period}
                            </span>
                            <div
                              className={cn(
                                "absolute left-[9px] top-[57px] h-[120px] w-[170px] overflow-hidden border-[0.5px] border-[#f2f3f5]",
                                card.frameRadius,
                              )}
                            >
                              <div
                                aria-hidden
                                className={cn(
                                  "pointer-events-none absolute inset-0",
                                  card.frameRadius,
                                  card.frameTint === "white" ? "bg-white" : "bg-[rgba(255,255,255,0.5)]",
                                )}
                              />
                              <div className={cn("absolute inset-0 overflow-hidden", card.frameRadius)}>
                                <img
                                  alt=""
                                  src={card.image}
                                  width={340}
                                  height={240}
                                  draggable={false}
                                  className={cn(card.imgClassName)}
                                />
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>

                    {/* 折痕暗部：书脊弯折处，渐隐向外 */}
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        opacity:    foldShadow,
                        background: "linear-gradient(to right, rgba(0,0,0,0.19) 0%, rgba(0,0,0,0.08) 14%, rgba(0,0,0,0.02) 28%, transparent 52%)",
                        zIndex:     10,
                      }}
                    />

                    {/* 翻转前缘亮边（正面右缘受光，与背面左缘对称） */}
                    <motion.div
                      className="pointer-events-none absolute inset-y-0 right-0"
                      style={{
                        width:      10,
                        opacity:    edgeGlow,
                        background: "linear-gradient(to left, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 60%, transparent 100%)",
                        zIndex:     11,
                      }}
                    />
                  </motion.div>

                  {/* 正面右下角卷角（不参与内层 clip，否则会被裁掉） */}
                  <PageCurlStack corner="br" size={brCurlSize} />
                </motion.div>

                {/* ── 背面：Career Work（左页样式） ───────────────────── */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform:          "rotateY(180deg)",
                    borderRadius:       "4px 0 0 4px",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      background:   GRAD_L,
                      borderRadius: "4px 0 0 4px",
                      clipPath:     clipPathBack,
                    }}
                  >
                    {/* 脊柱阴影（右侧为书脊） */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-6" style={{ background: "linear-gradient(270deg, rgba(0,0,0,0.05) 0%, transparent 100%)" }} />

                    {/* 页眉 */}
                    <div className="absolute left-[56px] top-[28px] flex items-center gap-[6px]">
                      <span className={cn(bodyFont, "text-[12px] font-medium leading-5 text-[#ba6d73]")}>Career · Work</span>
                      <div className="h-px w-4 bg-[rgba(241,186,186,0.4)]" />
                      <span className={cn(bodyFont, "text-[10px] leading-[18px] text-[#ba6d73]/45")}>3 / 4</span>
                    </div>

                    {/* 内容 */}
                    <div className="absolute left-[56px] right-[56px] top-[60px]">
                      <div className="mb-4 flex items-baseline gap-x-2">
                        <h2 className={cn(bodyFont, "text-[18px] font-semibold leading-[26px] text-[#171717]")}>Career</h2>
                        <p className={cn(bodyFont, "text-[10px] leading-[18px] text-[#a39e99]")}>从学习到实习到正式工作的设计生涯</p>
                      </div>
                      <CareerList entries={workEntries} />
                    </div>

                    {/* 折痕暗部（背面，从右侧书脊向左渐隐） */}
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        opacity:    foldShadow,
                        background: "linear-gradient(to left, rgba(0,0,0,0.19) 0%, rgba(0,0,0,0.08) 14%, rgba(0,0,0,0.02) 28%, transparent 52%)",
                        zIndex:     10,
                      }}
                    />
                    {/* 翻转前缘亮边（背面落到左侧时，左边缘被光照到） */}
                    <motion.div
                      className="pointer-events-none absolute inset-y-0 left-0"
                      style={{
                        width:      10,
                        opacity:    edgeGlow,
                        background: "linear-gradient(to right, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 60%, transparent 100%)",
                        zIndex:     11,
                      }}
                    />
                  </motion.div>

                  <PageCurlStack corner="bl" size={blCurlSize} />
                </motion.div>
              </motion.div>

              {/* ── 装订环（最上层） ─────────────────────────────────────── */}
              <div className="pointer-events-none absolute left-[485px] top-0 z-[3] h-[700px] w-[30px]">
                {["108px", "200px", "292px", "384px", "476px", "568px"].map((top) => (
                  <SpineRing key={top} top={top} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

/** 单角卷页：窄接触阴影 + 纸背弧面 + 纸张厚度 + 折棱高光 */
function PageCurlStack({
  corner,
  size,
}: {
  corner: "br" | "bl"
  size: MotionValue<number>
}) {
  const isBR = corner === "br"
  const idPrefix = isBR ? "page-curl-br" : "page-curl-bl"
  const curlPath = isBR
    ? "M100 100 L0 100 C22 84 67 39 100 0 Z"
    : "M0 100 L100 100 C78 84 33 39 0 0 Z"
  const foldPath = isBR
    ? "M0 100 C22 84 67 39 100 0"
    : "M100 100 C78 84 33 39 0 0"
  const rimPath = isBR ? "M100 100 L100 0" : "M0 100 L0 0"

  return (
    <motion.div
      className="pointer-events-none absolute z-[12] overflow-visible"
      style={{
        ...(isBR ? { right: 0, bottom: 0 } : { left: 0, bottom: 0 }),
        width:  size,
        height: size,
      }}
    >
      <svg
        aria-hidden
        className="absolute inset-0 overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${idPrefix}-paper`} x1={isBR ? "100" : "0"} y1="100" x2={isBR ? "18" : "82"} y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="28%" stopColor="#f8f5f0" />
            <stop offset="56%" stopColor="#dcd5cd" />
            <stop offset="82%" stopColor="#b7ada2" />
            <stop offset="100%" stopColor="#8d8378" />
          </linearGradient>
          <radialGradient id={`${idPrefix}-lift`} cx={isBR ? "95%" : "5%"} cy="94%" r="92%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.34)" />
            <stop offset="72%" stopColor="rgba(96,86,74,0.22)" />
            <stop offset="100%" stopColor="rgba(64,57,49,0.08)" />
          </radialGradient>
          <filter id={`${idPrefix}-soft-blur`} x="-16%" y="-16%" width="132%" height="132%">
            <feGaussianBlur stdDeviation="1.15" />
          </filter>
        </defs>

        {/* 折线下方的窄接触阴影，只跟着弧线走，不铺满右下角。 */}
        <path
          d={foldPath}
          fill="none"
          stroke="rgba(70,62,52,0.28)"
          strokeWidth="5"
          strokeLinecap="round"
          filter={`url(#${idPrefix}-soft-blur)`}
        />

        {/* 卷起的纸背：曲线边界 + 明暗渐变，避免“浅色平三角”。 */}
        <path d={curlPath} fill={`url(#${idPrefix}-paper)`} />
        <path d={curlPath} fill={`url(#${idPrefix}-lift)`} />

        {/* 折棱高光与纸张厚度，参考真实纸角会有一条亮边和一条灰边。 */}
        <path d={foldPath} fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="2.4" strokeLinecap="round" />
        <path d={foldPath} fill="none" stroke="rgba(119,109,97,0.28)" strokeWidth="0.85" strokeLinecap="round" />
        <path d={rimPath} fill="none" stroke="rgba(255,255,255,0.58)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

// ── 通用：时间轴列表 ──────────────────────────────────────────────────────────
function CareerList({ entries }: { entries: CareerEntry[] }) {
  return (
    <div className="pl-1">
      {entries.map((item, index) => {
        const isLast = index === entries.length - 1
        return (
          <div key={index} className="relative pb-2">
            {!isLast && (
              <div
                className="absolute bottom-0 left-1 top-[14px] w-px"
                style={{ background: "linear-gradient(180deg, rgba(241,186,186,0.3) 0%, rgba(23,23,23,0.08) 100%)" }}
              />
            )}
            <div className="absolute left-0 top-1 h-[9px] w-[9px] rounded-[4.5px] bg-[#ba6d73]" />
            <div className="pl-[19px]">
              <p className={cn(bodyFont, "text-[10px] font-semibold leading-[18px] text-[#ba6d73]")}>{item.period}</p>
              <p className={cn(bodyFont, "mt-0.5 text-[12px] font-semibold leading-5 text-[#171717]")}>{item.title}</p>
              <div className={cn(bodyFont, "mt-1 space-y-1.5 text-[10px] leading-[18px] text-[#5a5652]")}>
                {item.body.type === "text" ? (
                  <p>{item.body.text}</p>
                ) : (
                  item.body.paragraphs.map((p, i) => <p key={i}>{p}</p>)
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TagRow({ labels }: { labels: readonly string[] }) {
  return (
    <div className="flex min-w-0 w-full max-w-full flex-nowrap items-center justify-between gap-2 overflow-x-auto [scrollbar-width:thin]">
      {labels.map((label) => (
        <div
          key={label}
          className={cn(
            bodyFont,
            "shrink-0 whitespace-nowrap rounded-[999px] border border-[rgba(23,23,23,0.08)] bg-[rgba(253,251,249,0.8)] px-[7px] py-1 text-[10px] leading-[18px] text-[#5a5652]",
          )}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

function PlannerBotanicalWatermark() {
  return (
    <svg className="h-full w-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="currentColor" d="M100,20 C110,50 150,60 180,50 C160,80 150,120 170,150 C140,140 100,150 80,180 C90,150 50,140 20,150 C40,120 30,80 10,50 C40,60 80,50 100,20 Z" />
      <path fill="none" d="M100,100 L100,180" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="50" r="10" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function SpineRing({ top }: { top: string }) {
  return (
    <div className="absolute left-0 h-6 w-[30px]" style={{ top }}>
      <div className="absolute left-[-18px] top-[5px] h-[14px] w-[14px] rounded-[7px] bg-[#eae6e1] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]" />
      <div className="absolute left-[34px] top-[5px] h-[14px] w-[14px] rounded-[7px] bg-[#eae6e1] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]" />
      <div
        className="absolute left-[-9px] top-[8px] h-2 w-12 rounded-[4px] shadow-[0_3px_4px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)]"
        style={{ background: "linear-gradient(90deg, rgb(213,209,204) 0%, rgb(252,251,250) 30%, rgb(184,179,174) 80%, rgb(158,154,149) 100%)" }}
      />
    </div>
  )
}
