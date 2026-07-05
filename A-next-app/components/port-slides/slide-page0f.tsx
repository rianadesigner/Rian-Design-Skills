"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from "./slide-design";

const P0 = "/images/page0";
const FONT = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
const FONT_EN = "Impact, 'Arial Black', sans-serif";

const FIGMA_H = 1000;
const sy = SLIDE_DESIGN_HEIGHT / FIGMA_H;
const y = (v: number) => Math.round(v * sy);

const EDITOR_PANEL = { left: 64, top: 348, width: 800, height: 538 };
const AGENT_PANEL  = { left: 876, top: 348, width: 800, height: 538 };

const TRACK_WIDTH  = AGENT_PANEL.left + AGENT_PANEL.width;
const PAN_MIN      = SLIDE_DESIGN_WIDTH - TRACK_WIDTH;
const PAN_MAX      = 0;
const SNAP_POINTS  = [PAN_MIN, PAN_MAX] as const;

const CORNER_MARKS = [
  { top: 24, left: 24 },
  { top: 24, right: 24, transform: "scaleX(-1)" },
  { bottom: 24, left: 24, transform: "scaleY(-1)" },
  { bottom: 24, right: 24, transform: "scale(-1,-1)" },
] as const;

/* ── static data ── */

const SIDEBAR_TREE = [
  {
    section: "原始资料",
    groups: [
      {
        label: "文件上传",
        expanded: true,
        items: [
          { name: "双一流大学介绍.pdf",            icon: `${P0}/agent-ficon-pdf.webp` },
          { name: "985工程高检.docx",              icon: `${P0}/agent-ficon-docx.webp` },
          { name: "211工程高校.md",                icon: `${P0}/agent-ficon-md.webp` },
          { name: "31省市2025年高考分数线汇总.pdf", icon: `${P0}/agent-ficon-pdf.webp` },
          { name: "清华大学AI开源项目.html",        icon: null },
        ],
      },
      { label: "网页/长文本", arrow: "right" },
      { label: "第三方应用", arrow: "right" },
    ],
  },
  {
    section: "知识Wiki",
    groups: [
      {
        label: "升学规划",
        expanded: true,
        items: [
          { name: "升学决策框架", icon: null },
          { name: "志愿填报策略", icon: null },
          { name: "录取区配关系", icon: null },
        ],
      },
      {
        label: "院校研究",
        expanded: true,
        items: [
          { name: "高校综合体系", icon: null },
          { name: "学科专业实力", icon: null },
        ],
      },
      {
        label: "成绩与分数",
        expanded: true,
        items: [{ name: "分数线体系", icon: null }],
      },
      { label: "面谈配置", arrow: "right" },
    ],
  },
];

const CHIPS = [
  { label: "Happyhorse视频", bg: "#f5f7ff", color: "#111",     icon: `${P0}/agent-chip-happyhorse.png`, cover: true },
  { label: "报告",           bg: "#f0fbff", color: "#3b84a8",  icon: `${P0}/agent-chip-report.svg`,    cover: false },
  { label: "演示文稿",       bg: "#edfbfa", color: "#158b8c",  icon: `${P0}/agent-chip-ppt.svg`,       cover: false },
  { label: "思维导图",       bg: "#fff1f0", color: "#cf131e",  icon: `${P0}/agent-chip-mindmap.svg`,   cover: false },
  { label: "播客",           bg: "#fff6e0", color: "#d99921",  icon: `${P0}/agent-chip-podcast.svg`,   cover: false },
  { label: "信息图",         bg: "#f2f3ff", color: "#3e45d6",  icon: `${P0}/agent-chip-infograph.svg`, cover: false },
  { label: "测验",           bg: "#f7f7e9", color: "#849107",  icon: `${P0}/agent-chip-quiz.svg`,      cover: false },
];

const SOURCES = [
  { title: "文件上传",   desc: "PDF/Word/PPT...",   img: `${P0}/agent-3d-upload.webp`,  imgStyle: { height: "117.31%", left: "0",    top: "-9.13%",  width: "100.83%" } },
  { title: "网页/长文本", desc: "网页抓取/文本粘贴", img: `${P0}/agent-3d-webpage.webp`, imgStyle: { height: "99.55%",  left: "6.81%", top: "0.45%",   width: "85.56%"  } },
  { title: "第三方应用", desc: "Notion/钉钉/飞书",  img: `${P0}/agent-3d-app.webp`,    imgStyle: { height: "120.87%", left: "0.3%",  top: "-5.17%",  width: "103.89%" } },
  { title: "Git仓库",    desc: "同步GitHub管理",    img: `${P0}/agent-3d-git.png`,    imgStyle: { inset: "0", width: "100%", height: "100%", objectFit: "cover" as const, objectPosition: "bottom" } },
];

/* ── shared sub-components ── */

function ArrowDown({ color = "#999" }) {
  return (
    <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
      <path d="M1.5 3L4 5.5L6.5 3" stroke={color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRight({ color = "#999" }) {
  return (
    <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
      <path d="M3 1.5L5.5 4L3 6.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PanelSidebar() {
  return (
    <div
      style={{
        width: 176, flexShrink: 0, height: "100%",
        borderRight: "1px solid #f0f0f0",
        display: "flex", flexDirection: "column",
        overflow: "hidden", background: "#fff",
      }}
    >
      {/* header */}
      <div style={{ padding: "8px 10px 5px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#111" }}>来源</span>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#bbb" strokeWidth="1" />
          <path d="M8 7.5V11" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="5.5" r="0.8" fill="#bbb" />
        </svg>
      </div>
      {/* add-source button */}
      <div
        style={{
          margin: "0 8px 6px",
          display: "flex", alignItems: "center", gap: 6,
          background: "#f5f5f5", borderRadius: 9, padding: "4px 10px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 16, height: 16, borderRadius: "50%", background: "#111",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4H6.5M4 1.5V6.5" stroke="#fff" strokeWidth="0.7" strokeLinecap="round" />
          </svg>
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#666", whiteSpace: "nowrap" }}>添加来源</span>
      </div>
      {/* tree */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 4px 8px" }}>
        {SIDEBAR_TREE.map((sec) => (
          <div key={sec.section}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 6px 3px" }}>
              <div style={{ height: 1, width: 8, background: "#bbb" }} />
              <span style={{ fontSize: 9, fontWeight: 600, color: "#999", letterSpacing: "0.04em" }}>{sec.section}</span>
            </div>
            {sec.groups.map((g) => (
              <div key={g.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 6px 3px 14px" }}>
                  {(g as { expanded?: boolean }).expanded ? (
                    <ArrowDown />
                  ) : (g as { arrow?: string }).arrow === "right" ? (
                    <ArrowRight />
                  ) : (
                    <div style={{ width: 6 }} />
                  )}
                  <span style={{ fontSize: 10, color: "#333", lineHeight: "16px" }}>{g.label}</span>
                </div>
                {(g as { expanded?: boolean; items?: { name: string; icon: string | null }[] }).expanded &&
                  (g as { items?: { name: string; icon: string | null }[] }).items?.map((item) => (
                    <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 6px 2px 28px" }}>
                      {item.icon ? (
                        <img loading="lazy" decoding="async" src={item.icon} alt="" style={{ width: 11, height: 11, objectFit: "contain", flexShrink: 0 }} draggable={false} />
                      ) : (
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#d0d0d0", flexShrink: 0 }} />
                      )}
                      <span style={{ fontSize: 9.5, color: "#666", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "16px" }}>
                        {item.name}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelTopBar({ activeTab }: { activeTab: "agent" | "editor" }) {
  return (
    <div
      style={{
        height: 38, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 14px",
        borderBottom: "1px solid #f0f0f0",
        background: "#fff",
      }}
    >
      {/* left: project name */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {/* 4-square logo */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="0" y="0" width="6" height="6" rx="1.5" fill="#111" />
          <rect x="8" y="0" width="6" height="6" rx="1.5" fill="#111" />
          <rect x="0" y="8" width="6" height="6" rx="1.5" fill="#111" />
          <rect x="8" y="8" width="6" height="6" rx="1.5" fill="#d0d0d0" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 500, color: "#111", whiteSpace: "nowrap" }}>项目空间名称</span>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M2 3L4 5L6 3" stroke="#999" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* center: mode tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 1, background: "#f4f4f4", borderRadius: 9, padding: "2px 2px" }}>
        {/* Agent tab */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 4, padding: "3px 12px", borderRadius: 7,
            background: activeTab === "agent" ? "#111" : "#fff",
            boxShadow: activeTab === "agent" ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4.5" stroke={activeTab === "agent" ? "#fff" : "#888"} strokeWidth="0.8" />
            <circle cx="5" cy="5" r="2" fill={activeTab === "agent" ? "#fff" : "#888"} />
          </svg>
          <span style={{ fontSize: 10, color: activeTab === "agent" ? "#fff" : "#666", fontWeight: 500, whiteSpace: "nowrap" }}>
            Agent
          </span>
        </div>
        {/* Editor tab */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 4, padding: "3px 12px", borderRadius: 7,
            background: activeTab === "editor" ? "#111" : "#fff",
            boxShadow: activeTab === "editor" ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M9.5 1.5L10.5 2.5L5 8L3 8.5L3.5 6.5L9.5 1.5Z" stroke={activeTab === "editor" ? "#fff" : "#5b4dff"} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 10, color: activeTab === "editor" ? "#fff" : "#5b4dff", fontWeight: 600, whiteSpace: "nowrap" }}>
            编辑器
          </span>
        </div>
      </div>

      {/* right: refresh icon */}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5C10.1 2.5 11.9 3.7 12.8 5.4" stroke="#bbb" strokeWidth="1" strokeLinecap="round" />
        <path d="M14 2.5V5.5H11" stroke="#bbb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ChipRow({ small = false }: { small?: boolean }) {
  const pad = small ? "3px 6px" : "4px 8px";
  const iconSize = small ? 12 : 14;
  const fontSize = small ? 9 : 10;
  const gap = small ? 3 : 4;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: small ? 4 : 6, overflow: "hidden" }}>
      {CHIPS.map((c) => (
        <div
          key={c.label}
          style={{ display: "flex", alignItems: "center", gap, borderRadius: 8, padding: pad, background: c.bg, flexShrink: 0 }}
        >
          <div style={{ position: "relative", width: iconSize, height: iconSize, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
            <img
              src={c.icon} alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: c.cover ? "cover" : "contain" }}
              draggable={false}
            />
          </div>
          <span style={{ fontSize, fontWeight: 600, color: c.color, whiteSpace: "nowrap" }}>{c.label}</span>
        </div>
      ))}
    </div>
  );
}

function InputBar({ small = false, sourceLabel = "已满20个来源" }: { small?: boolean; sourceLabel?: string }) {
  const h = small ? 68 : 88;
  const px = small ? 8 : 12;
  const py = small ? 6 : 8;
  const btnSize = small ? 22 : 28;
  return (
    <div
      style={{
        border: "1px solid #f0f0f0", borderRadius: small ? 11 : 14,
        padding: `${py}px ${px}px`,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        height: h,
      }}
    >
      <p style={{ fontSize: small ? 10 : 12, color: "#c0c0c0", lineHeight: "18px" }}>请输入研究问题。</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: small ? 4 : 6 }}>
          <div
            style={{
              width: btnSize, height: btnSize, border: "1px solid #f0f0f0", borderRadius: btnSize / 2,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width={small ? 8 : 10} height={small ? 8 : 10} viewBox="0 0 10 10" fill="none">
              <path d="M1 5H9M5 1V9" stroke="#111" strokeWidth="0.7" strokeLinecap="round" />
            </svg>
          </div>
          <div
            style={{
              border: "1px solid #f0f0f0", borderRadius: btnSize / 2,
              padding: small ? "2px 7px" : "3px 10px",
              display: "flex", alignItems: "center", gap: 3,
            }}
          >
            <span style={{ fontSize: small ? 9 : 10, color: "#111", whiteSpace: "nowrap" }}>标准模式</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 3L4 5L6 3" stroke="#111" strokeWidth="0.7" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: small ? 4 : 6 }}>
          <span style={{ fontSize: small ? 8 : 9, color: "#666", fontWeight: 600, whiteSpace: "nowrap" }}>{sourceLabel}</span>
          <div
            style={{
              width: btnSize, height: btnSize, borderRadius: btnSize / 2, background: "#f0f0f0",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width={small ? 10 : 12} height={small ? 10 : 12} viewBox="0 0 14.373 14.371" fill="none">
              <path d="M14.022 0.35C13.703 0.031 13.238-0.079 12.812 0.058L0.83 3.909C0.375 4.056 0.059 4.442 0.007 4.917C-0.045 5.392 0.181 5.837 0.593 6.077L4.836 8.552L8.501 4.886C8.773 4.614 9.213 4.614 9.485 4.886C9.757 5.157 9.757 5.598 9.485 5.87L5.819 9.536L8.294 13.779C8.512 14.151 8.896 14.371 9.32 14.371C9.365 14.371 9.41 14.368 9.456 14.364C9.93 14.312 10.317 13.996 10.462 13.542L14.315 1.561C14.452 1.132 14.34 0.668 14.022 0.35Z" fill="#111" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Editor panel (left, "编辑器默认") ── */
function EditorCenterContent() {
  const tabStyle = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 4,
    padding: "4px 10px", borderRadius: "5px 5px 0 0",
    borderBottom: active ? "2px solid #5b4dff" : "2px solid transparent",
    background: active ? "#fafafa" : "transparent",
    cursor: "default",
  });

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", borderRight: "1px solid #f0f0f0", overflow: "hidden" }}>
      {/* Tab bar */}
      <div
        style={{
          height: 32, flexShrink: 0,
          display: "flex", alignItems: "flex-end",
          borderBottom: "1px solid #f0f0f0",
          background: "#fff", padding: "0 6px",
        }}
      >
        <div style={tabStyle(false)}>
          {/* doc icon */}
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="1" width="10" height="14" rx="2" stroke="#888" strokeWidth="0.9"/>
            <path d="M6 6h4M6 9.5h4" stroke="#888" strokeWidth="0.9" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 9.5, color: "#666", whiteSpace: "nowrap" }}>985工程高校</span>
          <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
            <path d="M2 2L6 6M6 2L2 6" stroke="#bbb" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
        <div style={tabStyle(true)}>
          <span style={{ fontSize: 9.5, color: "#5b4dff", whiteSpace: "nowrap" }}>新建标签页</span>
          <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
            <path d="M2 2L6 6M6 2L2 6" stroke="#bbb" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, marginBottom: 2 }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4 1.5V6.5M1.5 4H6.5" stroke="#bbb" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Upload area */}
      <div
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 12, padding: "16px 12px", background: "#fafafa",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 3 }}>上传文件</p>
          <p style={{ fontSize: 10, color: "#666", lineHeight: "16px" }}>
            添加文件，路径，仓库，或和{" "}
            <span style={{ color: "#2927a8" }}>AI聊天</span>
          </p>
        </div>
        {/* 4 cards in a single horizontal row */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {SOURCES.map((s) => (
            <div
              key={s.title}
              style={{
                position: "relative", width: 68, height: 90,
                borderRadius: 8, background: "#fff",
                boxShadow: "0 0.5px 2px rgba(0,0,0,0.08)",
                overflow: "hidden", flexShrink: 0,
              }}
            >
              <p style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", fontSize: 8.5, fontWeight: 600, color: "#111", whiteSpace: "nowrap" }}>
                {s.title}
              </p>
              <p style={{ position: "absolute", top: 19, left: "50%", transform: "translateX(-50%)", fontSize: 7, color: "#999", whiteSpace: "nowrap" }}>
                {s.desc}
              </p>
              <div style={{ position: "absolute", left: -1, top: 33, width: 69, height: 58, overflow: "hidden", pointerEvents: "none" }}>
                <img loading="lazy" decoding="async" src={s.img} alt="" style={{ position: "absolute", maxWidth: "none", ...s.imgStyle }} draggable={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorRightAI() {
  return (
    <div
      style={{
        width: 213, flexShrink: 0, height: "100%",
        display: "flex", flexDirection: "column",
        background: "#fff", overflow: "hidden",
      }}
    >
      {/* Glow + greeting */}
      <div
        style={{
          flex: 1, position: "relative",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 10, overflow: "hidden", padding: "0 10px",
        }}
      >
        {/* glow bg */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <img
            src={`${P0}/agent-glow.svg`} alt=""
            style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%, -50%)", width: "200%", maxWidth: "none" }}
            draggable={false}
          />
        </div>
        {/* avatar */}
        <div style={{ position: "relative", width: 32, height: 32, borderRadius: "50%", background: "#6969fd", overflow: "hidden", flexShrink: 0, zIndex: 1 }}>
          <img loading="lazy" decoding="async" src={`${P0}/agent-avatar.png`} alt="" style={{ position: "absolute", width: 46, height: 46, objectFit: "cover", bottom: -7, left: -7, pointerEvents: "none" }} draggable={false} />
        </div>
        {/* greeting text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, zIndex: 1 }}>
          <p style={{ fontSize: 0, lineHeight: 0, whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 500, color: "#111" }}>HI，我是心流</span>
            <span style={{ fontSize: 15, lineHeight: "16px", fontWeight: 400, color: "#111", fontFamily: "'Caveat', cursive" }}>2.0 </span>
            <span style={{ fontSize: 12, lineHeight: "16px" }}>🦩</span>
          </p>
          <p style={{ fontSize: 9, color: "#333", lineHeight: "14px", textAlign: "center" }}>
            支持全格式报告、PPT、思维导图等多样化生成！
          </p>
        </div>
        {/* chips – wrap in narrow column */}
        <div style={{ zIndex: 1, width: "100%" }}>
          <ChipRow small />
        </div>
      </div>
      {/* input */}
      <div style={{ padding: "0 8px 8px", flexShrink: 0 }}>
        <InputBar small sourceLabel="已满20个来源" />
      </div>
    </div>
  );
}

function EditorPanel() {
  const h = y(EDITOR_PANEL.height);
  return (
    <div
      style={{
        position: "absolute", left: EDITOR_PANEL.left, top: 0,
        width: EDITOR_PANEL.width, height: h,
        borderRadius: 16, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        fontFamily: FONT, background: "#fff",
      }}
    >
      <PanelTopBar activeTab="editor" />
      <div style={{ display: "flex", height: `calc(100% - 38px)` }}>
        <PanelSidebar />
        <EditorCenterContent />
        <EditorRightAI />
      </div>
    </div>
  );
}

/* ── Agent panel (right, "Agent 模式") ── */
function AgentMainArea() {
  const sources3 = SOURCES.slice(0, 3);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", position: "relative", background: "#fff" }}>
      {/* glow bg */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <img
          src={`${P0}/agent-glow.svg`} alt=""
          style={{ position: "absolute", left: "50%", top: "38%", transform: "translate(-50%, -50%)", width: "120%", maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* scrollable content */}
      <div
        style={{
          flex: 1, position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 16, overflow: "hidden", padding: "16px 16px 0",
        }}
      >
        {/* avatar + greeting */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", background: "#6969fd", overflow: "hidden" }}>
            <img loading="lazy" decoding="async" src={`${P0}/agent-avatar.png`} alt="" style={{ position: "absolute", width: 62, height: 62, objectFit: "cover", bottom: -10, left: -10, pointerEvents: "none" }} draggable={false} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <p style={{ fontSize: 0, lineHeight: 0, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 14, lineHeight: "18px", fontWeight: 500, color: "#111" }}>Hi，我是心流</span>
              <span style={{ fontSize: 18, lineHeight: "18px", fontWeight: 400, color: "#111", fontFamily: "'Caveat', cursive" }}>2.0 </span>
              <span style={{ fontSize: 13, lineHeight: "18px" }}>🦩</span>
            </p>
            <p style={{ fontSize: 11, color: "#333", lineHeight: "18px", textAlign: "center" }}>
              添加来源即可开始使用，支持生成海量类型结果
            </p>
          </div>
        </div>

        {/* 3 source cards */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {sources3.map((s) => (
            <div
              key={s.title}
              style={{
                position: "relative", width: 120, height: 155,
                borderRadius: 12, background: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                overflow: "hidden", flexShrink: 0,
              }}
            >
              <p style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", fontSize: 12, fontWeight: 600, color: "#111", whiteSpace: "nowrap" }}>
                {s.title}
              </p>
              <p style={{ position: "absolute", top: 27, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: "#999", whiteSpace: "nowrap" }}>
                {s.desc}
              </p>
              <div style={{ position: "absolute", left: -1, top: 52, width: 121, height: 104, overflow: "hidden", pointerEvents: "none" }}>
                <img loading="lazy" decoding="async" src={s.img} alt="" style={{ position: "absolute", maxWidth: "none", ...s.imgStyle }} draggable={false} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* chips + input */}
      <div style={{ padding: "10px 14px 12px", flexShrink: 0, zIndex: 1, position: "relative" }}>
        <div style={{ marginBottom: 8 }}>
          <ChipRow />
        </div>
        <InputBar sourceLabel="无可选来源" />
      </div>
    </div>
  );
}

function AgentPanel() {
  const h = y(AGENT_PANEL.height);
  return (
    <div
      style={{
        position: "absolute", left: AGENT_PANEL.left, top: 0,
        width: AGENT_PANEL.width, height: h,
        borderRadius: 16, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        fontFamily: FONT, background: "#fff",
      }}
    >
      <PanelTopBar activeTab="agent" />
      <div style={{ display: "flex", height: `calc(100% - 38px)` }}>
        <PanelSidebar />
        <AgentMainArea />
      </div>
    </div>
  );
}

/* ── Drag / pan strip ── */
function clampPan(v: number) {
  return Math.max(PAN_MIN, Math.min(PAN_MAX, v));
}
function nearestSnap(v: number) {
  return SNAP_POINTS.reduce((best, p) => (Math.abs(p - v) < Math.abs(best - v) ? p : best));
}

function PanelPanStrip() {
  const [offset, setOffset]       = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInertia, setIsInertia]   = useState(false);
  const offsetRef   = useRef(0);
  const inertiaRaf  = useRef<number | null>(null);
  const dragRef     = useRef({ pointerId: -1, startX: 0, startY: 0, startOffset: 0, panning: false, lastX: 0, lastT: 0, velocity: 0 });

  const applyOffset = useCallback((v: number) => {
    const next = clampPan(v);
    offsetRef.current = next;
    setOffset(next);
  }, []);

  const cancelInertia = useCallback(() => {
    if (inertiaRaf.current !== null) { cancelAnimationFrame(inertiaRaf.current); inertiaRaf.current = null; }
    setIsInertia(false);
  }, []);

  const startInertia = useCallback((initVel: number) => {
    cancelInertia();
    setIsInertia(true);
    let v = initVel;
    const tick = () => {
      if (Math.abs(v) < 0.35) { applyOffset(nearestSnap(offsetRef.current)); inertiaRaf.current = null; setIsInertia(false); return; }
      applyOffset(offsetRef.current + v);
      v *= 0.92;
      inertiaRaf.current = requestAnimationFrame(tick);
    };
    inertiaRaf.current = requestAnimationFrame(tick);
  }, [applyOffset, cancelInertia]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const t = e.target as HTMLElement;
    if (t.closest("button,a,input,textarea,select,[role='button']")) return;
    cancelInertia();
    setIsDragging(true);
    dragRef.current = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, startOffset: offsetRef.current, panning: false, lastX: e.clientX, lastT: performance.now(), velocity: 0 };
    e.stopPropagation();
  }, [cancelInertia]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (d.pointerId === -1 || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.panning) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dx) <= Math.abs(dy)) return;
      d.panning = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    e.preventDefault();
    e.stopPropagation();
    const now = performance.now();
    const dt  = now - d.lastT;
    if (dt > 0) d.velocity = ((e.clientX - d.lastX) / dt) * 16;
    d.lastX = e.clientX;
    d.lastT = now;
    applyOffset(d.startOffset + dx);
  }, [applyOffset]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (d.pointerId === -1 || e.pointerId !== d.pointerId) return;
    setIsDragging(false);
    if (d.panning) {
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ok */ }
      e.stopPropagation();
      if (Math.abs(d.velocity) > 0.8) startInertia(d.velocity);
      else applyOffset(nearestSnap(offsetRef.current));
    }
    dragRef.current.pointerId = -1;
    dragRef.current.panning   = false;
  }, [applyOffset, startInertia]);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    cancelInertia();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    applyOffset(offsetRef.current - delta * 0.85);
  }, [applyOffset, cancelInertia]);

  useEffect(() => () => cancelInertia(), [cancelInertia]);

  const panelTop    = y(EDITOR_PANEL.top);
  const panelHeight = y(EDITOR_PANEL.height);

  return (
    <div
      style={{
        position: "absolute", left: 0, top: panelTop,
        width: SLIDE_DESIGN_WIDTH, height: panelHeight,
        overflow: "hidden", zIndex: 10,
        touchAction: "pan-y",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <div
        style={{
          position: "relative",
          width: TRACK_WIDTH, height: panelHeight,
          transform: `translateX(${offset}px)`,
          transition: isDragging || isInertia ? "none" : "transform 0.28s cubic-bezier(0.25,0.1,0.25,1)",
          willChange: "transform",
        }}
      >
        {/* Editor panel screenshot — 1600×1076 high-res */}
        <img
          src="/images/page0f/editor-panel.webp"
          alt="编辑器面板"
          draggable={false}
          style={{
            position: "absolute",
            left: EDITOR_PANEL.left,
            top: 0,
            width: EDITOR_PANEL.width,
            height: panelHeight,
            objectFit: "cover",
            objectPosition: "top left",
            borderRadius: 16,
            boxShadow: "0 4px 32px rgba(0,0,0,0.45)",
            pointerEvents: "none",
          }}
        />
        {/* Agent panel screenshot — 1128×1076 high-res */}
        <img
          src="/images/page0f/agent-panel.webp"
          alt="Agent面板"
          draggable={false}
          style={{
            position: "absolute",
            left: AGENT_PANEL.left,
            top: 0,
            width: AGENT_PANEL.width,
            height: panelHeight,
            objectFit: "cover",
            objectPosition: "top left",
            borderRadius: 16,
            boxShadow: "0 4px 32px rgba(0,0,0,0.45)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)",
          pointerEvents: "none", whiteSpace: "nowrap",
        }}
      >
        <span>←</span>
        <span>左右滑动查看</span>
        <span>→</span>
      </div>
    </div>
  );
}

/* ── Main slide export ── */
export default function SlidePage0f() {
  return (
    <div
      style={{
        position: "relative", width: "100%", height: "100%",
        background: "#070707", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Left glow */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)", pointerEvents: "none" }} />
      {/* Right glow */}
      <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)", pointerEvents: "none" }} />

      {/* Corner marks */}
      {CORNER_MARKS.map((mark, i) => (
        <div key={i} aria-hidden style={{ position: "absolute", ...mark, width: 18, height: 18, zIndex: 6 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 18, height: 1, background: "rgba(255,255,255,0.22)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 18, background: "rgba(255,255,255,0.22)" }} />
        </div>
      ))}

      {/* Header */}
      <div
        style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center",
          width: "100%", paddingTop: y(128),
          boxSizing: "border-box", pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: y(12), width: 777, maxWidth: "92%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: FONT_EN, fontSize: 13, color: "rgba(200,8,8,0.85)", letterSpacing: 2, lineHeight: 1 }}>03</span>
            <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: 3, fontWeight: 600, whiteSpace: "nowrap" }}>
              LLM WIKI 核心操作动线
            </span>
          </div>
          <h1 style={{ margin: 0, fontWeight: 600, fontSize: 44, color: "#fff", lineHeight: `${y(52)}px`, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
            3. 多产品形态交互
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: `${y(26)}px`, textAlign: "center", maxWidth: 625 }}>
            通过编辑器和智能体的多种产品可交互形态，让知识真正流动起来。
          </p>
        </div>
      </div>

      <PanelPanStrip />
    </div>
  );
}
