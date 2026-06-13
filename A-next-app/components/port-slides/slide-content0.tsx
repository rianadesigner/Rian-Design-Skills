"use client";
import { motion } from "motion/react";

/* ── 项目数据 ─────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "kb",
    name: "LLM 知识库",
    nameEn: "Knowledge Base",
    tag: "AI · 知识管理",
    desc: "基于 Karpathy 知识编译模式，覆盖摄入 / 检索 / Agent 全链路的企业级 RAG 系统。",
    cover: "/images/page0/agent-3d-upload.png",
    logo: "/images/page0/agent-glow.svg",
    logoFallback: null,
    slides: "01 – 02",
    accent: "#6366f1",
    accentBg: "rgba(99,102,241,0.08)",
    pages: "page 0a · 0",
  },
  {
    id: "ai-product",
    name: "AI 研究平台",
    nameEn: "AI Research Tool",
    tag: "产品设计 · LLM",
    desc: "意图识别、学术搜索、个人知识库、文件管理一体化的 AI 研究助手产品。",
    cover: "/images/page1/bg-outer.png",
    logo: "/images/page1/logo.png",
    logoFallback: null,
    slides: "03 – 15",
    accent: "#2563eb",
    accentBg: "rgba(37,99,235,0.07)",
    pages: "page 1 – 14",
  },
  {
    id: "wanxiang",
    name: "万相星链",
    nameEn: "Wanxiang Xingchain",
    tag: "AI 平台 · 内容生产",
    desc: "无代码搭建多应用、批量全链路支持、API 接入业务的内容创作与发布平台。",
    cover: "/images/page15/bg-outer.png",
    logo: "/images/page15/logo.png",
    logoFallback: null,
    slides: "16 – 24",
    accent: "#7c3aed",
    accentBg: "rgba(124,58,237,0.07)",
    pages: "page 15 – 22",
  },
  {
    id: "llm-design",
    name: "LLM 优化 & 设计",
    nameEn: "LLM Optimization",
    tag: "算法 · 视觉设计",
    desc: "自研 LLM 模型调优实验，以及支持自由构图与元素库编辑的视觉创作工具。",
    cover: "/images/page24/bg-outer.png",
    logo: "/images/page24/logo.png",
    logoFallback: null,
    slides: "25 – 27",
    accent: "#0891b2",
    accentBg: "rgba(8,145,178,0.07)",
    pages: "page 24 – 26",
  },
];

/* ── ProjectCard ─────────────────────────────────────────────── */
function ProjectCard({
  project,
  delay,
  style,
}: {
  project: (typeof PROJECTS)[0];
  delay: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid rgba(0,0,0,0.07)`,
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {/* Cover image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${project.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
        }}
      />

      {/* Tinted overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${project.accentBg} 0%, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Top row: logo + tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: project.accentBg,
              border: `1px solid ${project.accent}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={project.logo}
              alt={project.name}
              style={{ width: 26, height: 26, objectFit: "contain" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.12em",
              color: project.accent,
              background: project.accentBg,
              border: `1px solid ${project.accent}33`,
              borderRadius: 100,
              padding: "3px 10px",
              fontFamily: "'PingFang SC', sans-serif",
              fontWeight: 500,
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Title */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#111",
              margin: "0 0 4px 0",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontFamily: "'PingFang SC', -apple-system, sans-serif",
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: 11,
              color: "#999",
              margin: "0 0 14px 0",
              letterSpacing: "0.04em",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {project.nameEn}
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#555",
              lineHeight: 1.65,
              margin: 0,
              fontFamily: "'PingFang SC', sans-serif",
            }}
          >
            {project.desc}
          </p>
        </div>

        {/* Bottom: slides info */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 14,
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#bbb",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            {project.pages}
          </span>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: project.accent,
              display: "inline-block",
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Slide ───────────────────────────────────────────────── */
export default function SlideContent0() {
  /* 卡片布局 — 设计画布 1440×900 */
  const PAD = 40;           // canvas padding
  const GAP = 16;           // gap between cards
  const TOP = 130;          // below header
  const CARD_H_A = 330;     // row 1 height
  const CARD_H_B = 340;     // row 2 height
  const TOTAL_W = 1440 - PAD * 2;  // 1360
  const COL_A = (TOTAL_W - GAP) * 0.52;   // ~700px
  const COL_B = (TOTAL_W - GAP) * 0.48;   // ~660px

  const layouts: React.CSSProperties[] = [
    { left: PAD, top: TOP, width: COL_A, height: CARD_H_A },                      // 知识库 (top-left)
    { left: PAD + COL_A + GAP, top: TOP, width: COL_B, height: CARD_H_A },        // AI研究 (top-right)
    { left: PAD, top: TOP + CARD_H_A + GAP, width: COL_A, height: CARD_H_B },     // 万相星链 (bottom-left)
    { left: PAD + COL_A + GAP, top: TOP + CARD_H_A + GAP, width: COL_B, height: CARD_H_B }, // LLM设计 (bottom-right)
  ];

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#F8F8FA" }}
    >
      {/* Dot grid */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }}
        aria-hidden
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#aaa" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Chapter badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: "absolute",
          top: 14,
          right: 20,
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "rgba(0,0,0,0.22)",
          fontFamily: "'PingFang SC', sans-serif",
          pointerEvents: "none",
        }}
      >
        content 0
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 36,
          left: PAD,
          display: "flex",
          alignItems: "baseline",
          gap: 16,
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#111",
            margin: 0,
            letterSpacing: "-0.03em",
            fontFamily: "'PingFang SC', -apple-system, sans-serif",
          }}
        >
          项目全览
        </h1>
        <span
          style={{
            fontSize: 14,
            color: "#aaa",
            letterSpacing: "0.06em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Portfolio Overview
        </span>
      </motion.div>

      {/* Slide count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: "absolute",
          top: 50,
          right: PAD,
          fontSize: 12,
          color: "#bbb",
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "0.04em",
        }}
      >
        {PROJECTS.length} 个核心项目
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 100,
          left: PAD,
          right: PAD,
          height: 1,
          background: "rgba(0,0,0,0.08)",
          transformOrigin: "left center",
        }}
      />

      {/* Project cards */}
      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          delay={0.2 + i * 0.08}
          style={layouts[i]}
        />
      ))}
    </div>
  );
}
