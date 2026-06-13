"use client";

import { motion } from "motion/react";

/* ─────────────────────────────────────────────
   Layout constants  (1440 × 900 design canvas)
───────────────────────────────────────────── */
const CW = 370;    // card width
const CGAP = 50;   // gap between the 3 columns
const COL = CW + CGAP; // 420
// 3 columns → total = 3×370 + 2×50 = 1210 → side margin = (1440-1210)/2 = 115
const SIDE_PAD = (1440 - 3 * CW - 2 * CGAP) / 2; // 115
const cx = (i: number) => SIDE_PAD + i * COL;
// cx(0)=115  cx(1)=535  cx(2)=955

// Participant cards: 2 cards centered
const PW = 370;
const PGAP = 60;
const PX0 = (1440 - 2 * PW - PGAP) / 2; // 320
const px = (i: number) => PX0 + i * (PW + PGAP);
// px(0)=320  px(1)=750

// Y positions
const ARCH_Y = 228;
const ARCH_H = 130;
const OP_Y   = 412;
const OP_H   = 196;
const PART_Y = 665;
const PART_H = 138;

// SVG connection-line end-points
const OP_BOT_Y   = OP_Y + OP_H;   // 608
const PART_TOP_Y = PART_Y;         // 665
const OP_CX   = [cx(0) + CW / 2, cx(1) + CW / 2, cx(2) + CW / 2]; // 300 720 1140
const PART_CX = [px(0) + PW / 2,  px(1) + PW / 2];                  // 505 935

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const ARCH_DATA = [
  {
    emoji: "📁", title: "原始资料", subtitle: "不可变·只读",
    border: "rgba(96,165,250,0.70)", glow: "rgba(59,130,246,0.14)", bg: "rgba(59,130,246,0.07)",
  },
  {
    emoji: "📒", title: "知识库", subtitle: "LLM 管理的 Markdown",
    border: "rgba(74,222,128,0.70)", glow: "rgba(34,197,94,0.14)",  bg: "rgba(34,197,94,0.07)",
  },
  {
    emoji: "⚙️", title: "模式规范", subtitle: "CLAUDE.md / AGENTS.md",
    border: "rgba(192,132,252,0.70)", glow: "rgba(168,85,247,0.14)", bg: "rgba(168,85,247,0.07)",
  },
] as const;

const OP_DATA = [
  {
    emoji: "🫙", title: "摄入", subtitle: "源文件→知识库更新",
    border: "rgba(244,114,182,0.70)", glow: "rgba(236,72,153,0.14)", bg: "rgba(236,72,153,0.07)",
    tags: ["读取源文件", "写入摘要", "更新索引", "交叉链接"],
  },
  {
    emoji: "🔎", title: "查询", subtitle: "问题→综合回答",
    border: "rgba(248,113,113,0.70)", glow: "rgba(239,68,68,0.14)",  bg: "rgba(239,68,68,0.07)",
    tags: ["搜索索引", "综合信息", "归档回知识库"],
  },
  {
    emoji: "🔧", title: "检查", subtitle: "健康检查·一致性",
    border: "rgba(251,146,60,0.70)",  glow: "rgba(249,115,22,0.14)", bg: "rgba(249,115,22,0.07)",
    tags: ["发现问题", "修复补丁", "建议来源"],
  },
] as const;

const PART_DATA = [
  {
    emoji: "🧑", title: "人类", subtitle: "策划·提问·思考",
    border: "rgba(96,165,250,0.70)", glow: "rgba(59,130,246,0.14)", bg: "rgba(59,130,246,0.07)",
  },
  {
    emoji: "🤖", title: "LLM 代理", subtitle: "总结·交叉引用·维护",
    border: "rgba(74,222,128,0.70)", glow: "rgba(34,197,94,0.14)", bg: "rgba(34,197,94,0.07)",
  },
] as const;

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
const FONT = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";

type CardBase = {
  emoji: string; title: string; subtitle: string;
  border: string; glow: string; bg: string;
};

function BaseCard({
  emoji, title, subtitle, border, glow, bg, delay, tags,
}: CardBase & { delay: number; tags?: readonly string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 14,
        border: `1.5px solid ${border}`,
        background: bg,
        boxShadow: `0 0 36px ${glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: tags ? "flex-start" : "center",
        padding: tags ? "20px 14px 14px" : undefined,
        gap: 5,
        fontFamily: FONT,
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{emoji}</span>
      <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
        {title}
      </p>
      <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
        {subtitle}
      </p>
      {tags && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.45)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 5,
                padding: "3px 9px",
                fontFamily: FONT,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SectionLabel({ y, text, delay }: { y: number; text: string; delay: number }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        position: "absolute",
        top: y,
        left: 0,
        right: 0,
        margin: 0,
        textAlign: "center",
        fontSize: 11,
        letterSpacing: "0.35em",
        color: "rgba(255,255,255,0.28)",
        fontFamily: FONT,
      }}
    >
      {text}
    </motion.p>
  );
}

/* ─────────────────────────────────────────────
   Main slide
───────────────────────────────────────────── */
export default function SlidePage0a() {
  return (
    <div
      style={{
        position: "relative",
        width: 1440,
        height: 900,
        background: "linear-gradient(175deg, #060c1a 0%, #07101e 60%, #080f1c 100%)",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* ── Dot grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          pointerEvents: "none",
        }}
      />

      {/* ── Ambient glow blobs ── */}
      <div
        style={{
          position: "absolute", top: -300, left: "10%",
          width: 700, height: 700, borderRadius: "50%",
          background: "rgba(59,130,246,0.04)", filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", top: -300, right: "10%",
          width: 700, height: 700, borderRadius: "50%",
          background: "rgba(168,85,247,0.04)", filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Chapter badge ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          position: "absolute", top: 26, right: 36,
          fontSize: 11, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.28)", fontFamily: FONT,
        }}
      >
        知识库 01
      </motion.div>

      {/* ── Title ── */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 58, left: 0, right: 0,
          margin: 0, textAlign: "center",
          fontSize: 60, fontWeight: 700,
          color: "rgba(255,255,255,0.92)",
          letterSpacing: "0.04em", fontFamily: FONT,
        }}
      >
        LLM 知识库
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.4 }}
        style={{
          position: "absolute", top: 130, left: 0, right: 0,
          margin: 0, textAlign: "center",
          fontSize: 11, letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.28)",
          textTransform: "uppercase", fontFamily: FONT,
        }}
      >
        Karpathy 知识编译模式
      </motion.p>

      {/* ════════════════ 架构 ════════════════ */}
      <SectionLabel y={200} text="架 构" delay={0.25} />

      {ARCH_DATA.map((card, i) => (
        <div
          key={card.title}
          style={{ position: "absolute", left: cx(i), top: ARCH_Y, width: CW, height: ARCH_H }}
        >
          <BaseCard {...card} delay={0.32 + i * 0.08} />
        </div>
      ))}

      {/* Arrow labels between arch cards */}
      {[
        { x: cx(1) - CGAP / 2, text: "— 读取 →" },
        { x: cx(2) - CGAP / 2, text: "← 指导 —" },
      ].map(({ x, text }) => (
        <motion.span
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.4 }}
          style={{
            position: "absolute",
            left: x,
            top: ARCH_Y + ARCH_H / 2,
            transform: "translate(-50%, -50%)",
            fontSize: 10, letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.24)", fontFamily: FONT,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </motion.span>
      ))}

      {/* ════════════════ 操作 ════════════════ */}
      <SectionLabel y={388} text="操 作" delay={0.45} />

      {OP_DATA.map((card, i) => (
        <div
          key={card.title}
          style={{ position: "absolute", left: cx(i), top: OP_Y, width: CW, height: OP_H }}
        >
          <BaseCard {...card} delay={0.52 + i * 0.08} tags={card.tags} />
        </div>
      ))}

      {/* ════════════════ 参与者 ════════════════ */}
      <SectionLabel y={645} text="参 与 者" delay={0.72} />

      {PART_DATA.map((card, i) => (
        <div
          key={card.title}
          style={{ position: "absolute", left: px(i), top: PART_Y, width: PW, height: PART_H }}
        >
          <BaseCard {...card} delay={0.78 + i * 0.08} />
        </div>
      ))}

      {/* ════════════════ 连接线 SVG ════════════════ */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        width={1440}
        height={900}
      >
        {/* 摄入 → 人类 */}
        <line
          x1={OP_CX[0]} y1={OP_BOT_Y}
          x2={PART_CX[0]} y2={PART_TOP_Y}
          stroke="rgba(255,255,255,0.11)" strokeWidth={1} strokeDasharray="5 5"
        />
        {/* 查询 → 人类 */}
        <line
          x1={OP_CX[1]} y1={OP_BOT_Y}
          x2={PART_CX[0]} y2={PART_TOP_Y}
          stroke="rgba(255,255,255,0.11)" strokeWidth={1} strokeDasharray="5 5"
        />
        {/* 查询 → LLM代理 */}
        <line
          x1={OP_CX[1]} y1={OP_BOT_Y}
          x2={PART_CX[1]} y2={PART_TOP_Y}
          stroke="rgba(255,255,255,0.11)" strokeWidth={1} strokeDasharray="5 5"
        />
        {/* 检查 → LLM代理 */}
        <line
          x1={OP_CX[2]} y1={OP_BOT_Y}
          x2={PART_CX[1]} y2={PART_TOP_Y}
          stroke="rgba(255,255,255,0.11)" strokeWidth={1} strokeDasharray="5 5"
        />
      </motion.svg>
    </div>
  );
}
