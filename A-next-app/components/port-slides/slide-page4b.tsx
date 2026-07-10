"use client";

import type { ReactNode } from "react";

// ── 配色 ──────────────────────────────────────────────────────────────────
const COLORS = {
  purple: { bg: "rgba(142,81,255,0.10)", border: "rgba(166,132,255,0.40)", iconBg: "rgba(142,81,255,0.20)", text: "#C4B4FF", strong: "#DDD6FF" },
  blue:   { bg: "rgba(0,166,244,0.10)",  border: "rgba(0,188,255,0.40)",  iconBg: "rgba(0,166,244,0.20)",  text: "#74D4FF", strong: "#B8E6FE" },
  green:  { bg: "rgba(0,188,125,0.10)",  border: "rgba(0,212,146,0.40)", iconBg: "rgba(0,188,125,0.20)",  text: "#5EE9B5", strong: "#A4F4CF" },
  orange: { bg: "rgba(255,105,0,0.10)",  border: "rgba(255,137,4,0.40)", iconBg: "rgba(255,105,0,0.20)",  text: "#FFB86A", strong: "#FFD6A7" },
  yellow: { bg: "rgba(254,154,0,0.10)",  border: "rgba(255,185,0,0.40)", iconBg: "rgba(254,154,0,0.20)",  text: "#FFD230", strong: "#FEE685" },
  teal:   { bg: "rgba(0,187,167,0.10)",  border: "rgba(0,213,190,0.40)", iconBg: "rgba(0,187,167,0.20)",  text: "#46ECD5", strong: "#96F7E4" },
  pink:   { bg: "rgba(255,32,86,0.10)",  border: "rgba(255,99,126,0.40)", iconBg: "rgba(255,32,86,0.20)", text: "#FFA1AD", strong: "#FFC2CB" },
} as const;

type ColorKey = keyof typeof COLORS;

type IconName =
  | "collect" | "understand" | "synthesize" | "evolve" | "publish" | "query"
  | "human" | "llm" | "system"
  | "lock" | "link" | "verified" | "layers";

const CORE_PROBLEMS = ["笔记越记越乱", "知识点缺连接", "信息过时矛盾", "引用断裂孤儿页", "维护成本飙升", "无人回看复用"];

const FLOW_STEPS: Array<{ num: string; en: string; cn: string; desc: string; color: ColorKey; icon: IconName }> = [
  { num: "01", en: "Collect", cn: "收集", desc: "投入源文档", color: "orange", icon: "collect" },
  { num: "02", en: "Understand", cn: "理解", desc: "读取分析·讨论", color: "purple", icon: "understand" },
  { num: "03", en: "Synthesize", cn: "综合", desc: "生成摘要/实体页", color: "green", icon: "synthesize" },
  { num: "04", en: "Evolve", cn: "演化", desc: "交叉引用·Lint", color: "yellow", icon: "evolve" },
  { num: "05", en: "Publish", cn: "发布", desc: "更新 Wiki/index", color: "teal", icon: "publish" },
  { num: "06", en: "Query", cn: "查询", desc: "检索·答案归档", color: "blue", icon: "query" },
];

const ROLES: Array<{ name: string; desc: string; color: ColorKey; icon: IconName }> = [
  { name: "人类 Human", desc: "策划来源 · 提出问题 · 引导方向", color: "purple", icon: "human" },
  { name: "LLM", desc: "总结 · 交叉引用 · 维护一致性", color: "blue", icon: "llm" },
  { name: "系统 System", desc: "版本控制 · 存储 · 自动检查", color: "green", icon: "system" },
];

const SCENARIOS: Array<{ name: string; desc: string; color: ColorKey }> = [
  { name: "个人成长", desc: "日记/健康", color: "purple" },
  { name: "读书伴侣", desc: "人物/主题", color: "blue" },
  { name: "竞品分析", desc: "尽调/对比", color: "pink" },
  { name: "深度研究", desc: "论文/报告", color: "green" },
  { name: "团队知识库", desc: "会议/文档", color: "orange" },
  { name: "兴趣深潜", desc: "知识积累", color: "teal" },
];

const PRINCIPLES: Array<{ name: string; desc: string; color: ColorKey; icon: IconName }> = [
  { name: "源只读", desc: "原始数据不可变", color: "orange", icon: "lock" },
  { name: "强连接", desc: "页面交叉引用", color: "green", icon: "link" },
  { name: "可验证", desc: "引用可溯源", color: "blue", icon: "verified" },
  { name: "分层治理", desc: "Schema 演化", color: "purple", icon: "layers" },
];

// ── 线性图标集 ────────────────────────────────────────────────────────────
function Icon({ name, color, size = 14 }: { name: IconName; color: string; size?: number }) {
  const common = { fill: "none", stroke: color, strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, ReactNode> = {
    collect: (
      <>
        <path d="M7 1.6 V8.6 M4.2 5.8 L7 8.6 L9.8 5.8" {...common} />
        <path d="M2 9 V11.4 A0.9 0.9 0 0 0 2.9 12.3 H11.1 A0.9 0.9 0 0 0 12 11.4 V9" {...common} />
      </>
    ),
    understand: (
      <>
        <path d="M1 7 C3 3.2 11 3.2 13 7 C11 10.8 3 10.8 1 7 Z" {...common} />
        <circle cx="7" cy="7" r="2" {...common} />
      </>
    ),
    synthesize: (
      <>
        <path d="M7 1.4 L12.6 4.5 L7 7.6 L1.4 4.5 Z" {...common} />
        <path d="M1.4 8 L7 11.1 L12.6 8" {...common} />
      </>
    ),
    evolve: (
      <>
        <path d="M2.6 5.6 A5 5 0 0 1 12 6" {...common} />
        <path d="M9.6 3.6 L12 6 L9.3 7.1" {...common} />
        <path d="M11.4 8.4 A5 5 0 0 1 2 8" {...common} />
        <path d="M4.4 10.4 L2 8 L4.7 6.9" {...common} />
      </>
    ),
    publish: (
      <>
        <path d="M7 10.5 V2.2 M4.2 5.4 L7 2.2 L9.8 5.4" {...common} />
        <path d="M2 12.4 H12" {...common} />
      </>
    ),
    query: (
      <>
        <circle cx="6" cy="6" r="4" {...common} />
        <path d="M9.4 9.4 L13 13" {...common} />
      </>
    ),
    human: (
      <>
        <circle cx="7" cy="4.4" r="2.3" {...common} />
        <path d="M2 12.6 C2 9.2 4.4 7.7 7 7.7 C9.6 7.7 12 9.2 12 12.6" {...common} />
      </>
    ),
    llm: (
      <>
        <path d="M2.4 3 H11.6 A1.4 1.4 0 0 1 13 4.4 V8 A1.4 1.4 0 0 1 11.6 9.4 H6.6 L4 12 V9.4 H2.4 A1.4 1.4 0 0 1 1 8 V4.4 A1.4 1.4 0 0 1 2.4 3 Z" {...common} />
        <circle cx="5" cy="6.2" r="0.85" fill={color} stroke="none" />
        <circle cx="9" cy="6.2" r="0.85" fill={color} stroke="none" />
      </>
    ),
    system: (
      <>
        <rect x="2" y="1.8" width="10" height="2.8" rx="0.9" {...common} />
        <rect x="2" y="5.6" width="10" height="2.8" rx="0.9" {...common} />
        <rect x="2" y="9.4" width="10" height="2.8" rx="0.9" {...common} />
        <circle cx="9.8" cy="3.2" r="0.5" fill={color} stroke="none" />
      </>
    ),
    lock: (
      <>
        <rect x="3" y="6.4" width="8" height="6.2" rx="1.4" {...common} />
        <path d="M4.6 6.4 V4.6 A2.4 2.4 0 0 1 9.4 4.6 V6.4" {...common} />
        <circle cx="7" cy="9.5" r="0.9" fill={color} stroke="none" />
      </>
    ),
    link: (
      <>
        <path d="M6.2 8.6 L4.5 10.3 A2.3 2.3 0 0 1 1.2 7 L2.9 5.3" {...common} />
        <path d="M7.8 5.4 L9.5 3.7 A2.3 2.3 0 0 1 12.8 7 L11.1 8.7" {...common} />
        <path d="M5.4 8.6 L8.6 5.4" {...common} />
      </>
    ),
    verified: (
      <>
        <path d="M7 1.4 L12.6 3.5 V7.4 C12.6 10.3 10.1 11.8 7 12.4 C3.9 11.8 1.4 10.3 1.4 7.4 V3.5 Z" {...common} />
        <path d="M4.6 7 L6.3 8.7 L9.4 5" {...common} />
      </>
    ),
    layers: (
      <>
        <path d="M7 1.4 L12.8 4.6 L7 7.8 L1.2 4.6 Z" {...common} />
        <path d="M1.2 7.6 L7 10.8 L12.8 7.6" {...common} />
        <path d="M1.2 10.2 L7 13.4 L12.8 10.2" {...common} />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
      {paths[name]}
    </svg>
  );
}

function CheckPill({ label }: { label: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 10px", background: "rgba(255,255,255,0.05)",
      borderRadius: 10, outline: "0.6px solid rgba(255,255,255,0.06)",
      outlineOffset: -0.6,
    }}>
      <svg width={12} height={12} viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
        <path d="M2 6.2 L4.6 9 L10 2.4" stroke="#5EE9B5" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.65)", letterSpacing: 0.03, whiteSpace: "nowrap" }}>
        {label}
      </span>
    </div>
  );
}

function SectionEyebrow({ num, title, en, color }: { num: string; title: string; en: string; color: ColorKey }) {
  const c = COLORS[color];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
      <span style={{
        padding: "2px 8px", background: c.iconBg, borderRadius: 8,
        fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700,
        color: c.strong, letterSpacing: 1, lineHeight: "18px", flexShrink: 0,
      }}>{num}</span>
      <span style={{
        fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 16,
        color: c.text, whiteSpace: "nowrap", flexShrink: 0,
      }}>{title}</span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
        {en}
      </span>
    </div>
  );
}

function RoleRow({ name, desc, color, icon }: { name: string; desc: string; color: ColorKey; icon: IconName }) {
  const c = COLORS[color];
  return (
    <div style={{
      padding: "8px 12px", background: c.bg, borderRadius: 14,
      outline: `0.6px solid ${c.border}`, outlineOffset: -0.6,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: c.iconBg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} color={c.text} size={13} />
        </div>
        <span style={{ fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 13, color: c.text }}>{name}</span>
      </div>
      <p style={{ margin: 0, paddingTop: 4, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: 0.06 }}>
        {desc}
      </p>
    </div>
  );
}

function TagCard({ name, desc, color, tall, icon }: { name: string; desc: string; color: ColorKey; tall?: boolean; icon?: IconName }) {
  const c = COLORS[color];
  return (
    <div style={{
      flex: 1, minWidth: 0, padding: "8px 12px", background: c.bg, borderRadius: 14,
      outline: `0.6px solid ${c.border}`, outlineOffset: -0.6,
      display: "flex", flexDirection: "column", justifyContent: tall ? "flex-start" : "center",
      height: tall ? 72 : undefined,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {icon && (
          <div style={{ width: 18, height: 18, borderRadius: 6, background: c.iconBg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={icon} color={c.text} size={11} />
          </div>
        )}
        <span style={{ fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 13, color: c.text }}>{name}</span>
      </div>
      <p style={{ margin: 0, paddingTop: 4, fontFamily: "'PingFang SC', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: 0.06 }}>
        {desc}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, alignSelf: "center", opacity: 0.35 }}>
      <path d="M2 1 L8 7 L2 13" stroke="#fff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SlidePage4b() {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      background: "#070707", overflow: "hidden",
      fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
    }}>
      {/* ── Left red glow ── */}
      <div aria-hidden style={{
        position: "absolute", inset: "0 83.33% 0 0",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -111.8 -26.833 0 0 500)'><stop stop-color='rgba(200,8,8,0.26)' offset='0'/><stop stop-color='rgba(180,0,0,0.1)' offset='0.45'/><stop stop-color='rgba(0,0,0,0)' offset='0.75'/></radialGradient></defs></svg>\")",
        pointerEvents: "none", zIndex: 2,
      }} />
      {/* ── Right red glow ── */}
      <div aria-hidden style={{
        position: "absolute", inset: "0 0 0 83.33%",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -111.8 -26.833 0 240 500)'><stop stop-color='rgba(200,8,8,0.26)' offset='0'/><stop stop-color='rgba(180,0,0,0.1)' offset='0.45'/><stop stop-color='rgba(0,0,0,0)' offset='0.75'/></radialGradient></defs></svg>\")",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* ── Film grain ── */}
      <svg aria-hidden style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.12, mixBlendMode: "overlay" as const, zIndex: 1,
      }}>
        <filter id="pg4b-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pg4b-grain)" />
      </svg>

      {/* ── Four corner marks ── */}
      <div aria-hidden style={{ position: "absolute", left: 24, top: 24, width: 36, height: 36, borderTop: "0.95px solid rgba(255,255,255,0.22)", borderLeft: "0.95px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", right: 24, top: 24, width: 36, height: 36, borderTop: "0.95px solid rgba(255,255,255,0.22)", borderRight: "0.95px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", left: 24, bottom: 24, width: 36, height: 36, borderBottom: "0.95px solid rgba(255,255,255,0.22)", borderLeft: "0.95px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />
      <div aria-hidden style={{ position: "absolute", right: 24, bottom: 24, width: 36, height: 36, borderBottom: "0.95px solid rgba(255,255,255,0.22)", borderRight: "0.95px solid rgba(255,255,255,0.22)", pointerEvents: "none", zIndex: 20 }} />

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)", top: 40,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        whiteSpace: "nowrap", zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: 13, color: "rgba(200,8,8,0.85)", letterSpacing: 2 }}>03</span>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
          <span style={{ fontFamily: "'PingFang SC', sans-serif", fontWeight: 400, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 3 }}>
            LLM WIKI 项目大图
          </span>
        </div>
        <p style={{ margin: 0, fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 36, color: "#fff", letterSpacing: 1 }}>
          LLM WIKI 方法论
        </p>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, paddingTop: 2 }}>
          <svg width={14} height={14} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
            <path d="M8 1 L14.5 5 L14.5 11 L8 15 L1.5 11 L1.5 5 Z" stroke="#FFD230" strokeWidth={1.2} strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: "Inter, 'PingFang SC', sans-serif", fontSize: 11.5, lineHeight: "17px" }}>
            <span style={{ color: "#FFD230", fontWeight: 600 }}>核心洞察 　</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>
              维护知识库的瓶颈不是阅读，而是记账。LLM 不厌烦、不遗忘、一次可触及 15 个文件，维护成本趋近于零。
            </span>
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute", left: 64, right: 64, top: 168, bottom: 36,
        display: "flex", flexDirection: "column", gap: 18, zIndex: 10,
      }}>
        {/* ── 01 它是什么，解决什么 ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionEyebrow num="01" title="它是什么，解决什么" en="Why" color="purple" />
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{
              flex: "0 0 42%", padding: 14, background: "rgba(255,255,255,0.01)", borderRadius: 16,
              outline: "0.6px solid rgba(255,255,255,0.06)", outlineOffset: -0.6,
            }}>
              <p style={{ margin: 0, fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 13, color: "#C4B4FF" }}>核心概念</p>
              <p style={{ margin: 0, paddingTop: 6, fontFamily: "'PingFang SC', sans-serif", fontSize: 12, lineHeight: "18.6px" }}>
                <span style={{ color: "#fff", fontWeight: 700 }}>LLM Wiki 不是让 AI 替人写笔记，而是让知识在使用中持续被整理、连接、验证和更新。</span>
                <br />
                <span style={{ color: "rgba(255,255,255,0.6)" }}>以原始资料为事实基础，以 Markdown 为知识载体，以 LLM 承担增量整理，以人类负责判断和治理，构建可持续演化的知识系统。</span>
              </p>
            </div>
            <div style={{
              flex: 1, minWidth: 0, padding: 14, background: "rgba(255,255,255,0.01)", borderRadius: 16,
              outline: "0.6px solid rgba(255,255,255,0.06)", outlineOffset: -0.6,
            }}>
              <p style={{ margin: 0, fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 13, color: "#74D4FF" }}>解决的核心问题</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, paddingTop: 10 }}>
                {CORE_PROBLEMS.map((p) => <CheckPill key={p} label={p} />)}
              </div>
            </div>
          </div>
        </div>

        {/* ── 02 它如何运作 · 知识演化闭环 ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionEyebrow num="02" title="它如何运作 · 知识演化闭环" en="How" color="green" />
          <div style={{
            padding: 14, background: "rgba(255,255,255,0.01)", borderRadius: 16,
            outline: "0.6px solid rgba(255,255,255,0.06)", outlineOffset: -0.6,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "stretch", gap: 6 }}>
              {FLOW_STEPS.map((step, i) => {
                const c = COLORS[step.color];
                return (
                  <div key={step.num} style={{ display: "flex", alignItems: "stretch", flex: 1, minWidth: 0, gap: 6 }}>
                    <div style={{
                      flex: 1, minWidth: 0, padding: 10, background: c.bg, borderRadius: 12,
                      outline: `0.6px solid ${c.border}`, outlineOffset: -0.6,
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    }}>
                      <div style={{ width: 30, height: 30, borderRadius: 9, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={step.icon} color={c.text} size={16} />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: 0, fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 12, color: c.text, whiteSpace: "nowrap" }}>
                          {step.num} · {step.en} {step.cn}
                        </p>
                        <p style={{ margin: 0, paddingTop: 2, fontSize: 10.5, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{step.desc}</p>
                      </div>
                    </div>
                    {i < FLOW_STEPS.length - 1 && <FlowArrow />}
                  </div>
                );
              })}
            </div>
            <div style={{
              padding: "6px 12px", background: "rgba(0,187,167,0.06)", borderRadius: 10,
              outline: "0.6px solid rgba(0,213,190,0.30)", outlineOffset: -0.6,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1.2px solid #46ECD5", flexShrink: 0 }} />
              <span style={{ fontFamily: "'PingFang SC', sans-serif", fontSize: 11.5, color: "rgba(150,247,228,0.8)", letterSpacing: 0.03 }}>
                新知识沉淀回库，持续循环 —— 一个源文档可能触及 10-15 个 Wiki 页面，每次查询都可能成为新页面
              </span>
            </div>
          </div>
        </div>

        {/* ── 03 谁来做、用在哪、遵循什么 ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minHeight: 0 }}>
          <SectionEyebrow num="03" title="谁来做、用在哪、遵循什么" en="Who · Where · Principles" color="blue" />
          <div style={{ display: "flex", gap: 12, flex: 1, minHeight: 0 }}>
            <div style={{
              flex: 1, minWidth: 0, padding: 14, background: "rgba(255,255,255,0.05)", borderRadius: 16,
              outline: "0.6px solid rgba(255,255,255,0.06)", outlineOffset: -0.6,
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <p style={{ margin: 0, fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 13, color: "#C4B4FF" }}>人机协作分工</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "center" }}>
                {ROLES.map((r) => <RoleRow key={r.name} {...r} />)}
              </div>
            </div>
            <div style={{
              flex: 1, minWidth: 0, padding: 14, background: "rgba(255,255,255,0.05)", borderRadius: 16,
              outline: "0.6px solid rgba(255,255,255,0.06)", outlineOffset: -0.6,
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <p style={{ margin: 0, fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 13, color: "#5EE9B5" }}>真实应用场景</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flex: 1, alignContent: "center" }}>
                {SCENARIOS.map((s) => <TagCard key={s.name} {...s} tall />)}
              </div>
            </div>
            <div style={{
              flex: 1, minWidth: 0, padding: 14, background: "rgba(255,255,255,0.05)", borderRadius: 16,
              outline: "0.6px solid rgba(255,255,255,0.06)", outlineOffset: -0.6,
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <p style={{ margin: 0, fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, fontSize: 13, color: "#46ECD5" }}>设计原则</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, flex: 1, alignContent: "center" }}>
                {PRINCIPLES.map((p) => <TagCard key={p.name} name={p.name} desc={p.desc} color={p.color} icon={p.icon} tall />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
