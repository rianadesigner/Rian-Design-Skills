"use client";

import type { CSSProperties, ReactNode } from "react";

const P0 = "/images/page0";
const PANEL_WIDTH = 800;
const FIGMA_WIDTH = 1440;
const FIGMA_HEIGHT = 968;
const FIGMA_SCALE = PANEL_WIDTH / FIGMA_WIDTH;
const PANEL_HEIGHT = FIGMA_HEIGHT * FIGMA_SCALE;
const FONT = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";

const sourceCards = [
  { title: "文件上传", description: "PDF/Word/PPT...", image: `${P0}/agent-3d-upload.webp`, imageStyle: { height: "117.31%", left: 0, top: "-9.13%", width: "100.83%" } },
  { title: "网页/长文本", description: "网页抓取/文本粘贴", image: `${P0}/agent-3d-webpage.webp`, imageStyle: { height: "99.55%", left: "6.81%", top: "0.45%", width: "85.56%" } },
  { title: "第三方应用", description: "Notion/钉钉/飞书", image: `${P0}/agent-3d-app.webp`, imageStyle: { height: "100%", left: 0, top: 0, width: "100%" } },
  { title: "Git仓库", description: "同步GitHub管理", image: `${P0}/agent-3d-git-rendered.webp`, imageStyle: { height: 104, left: 0, top: 0, width: 120 } },
];

const actions = [
  { label: "Happyhorse视频", icon: `${P0}/agent-chip-happyhorse.png`, bg: "#f5f7ff", color: "#111", width: 137 },
  { label: "报告", icon: `${P0}/agent-chip-report.svg`, bg: "#f0fbff", color: "#3b84a8", width: 68 },
  { label: "演示文稿", icon: `${P0}/agent-chip-ppt.svg`, bg: "#edfbfa", color: "#158b8c", width: 92 },
  { label: "思维导图", icon: `${P0}/agent-chip-mindmap.svg`, bg: "#fff1f0", color: "#cf131e", width: 92 },
  { label: "播客", icon: `${P0}/agent-chip-podcast.svg`, bg: "#fffbf0", color: "#d99921", width: 68 },
  { label: "信息图", icon: `${P0}/agent-chip-infograph.svg`, bg: "#f2f3ff", color: "#3e45d6", width: 80 },
  { label: "测验", icon: `${P0}/agent-chip-quiz.svg`, bg: "#f7f7e9", color: "#849107", width: 68 },
];

const sidebarSections = [
  {
    title: "原始资料",
    groups: [
      { title: "文件上传", items: [
        ["双一流大学介绍.pdf", `${P0}/agent-ficon-pdf.webp`],
        ["985工程高校.docx", `${P0}/agent-ficon-docx.webp`],
        ["211工程高校.md", `${P0}/agent-ficon-md.webp`],
        ["31省市2025年高考分数线汇总.ppt", `${P0}/agent-ficon-ppt.webp`],
        ["清华大学AI开源项目.html", `${P0}/agent-ficon-docx.webp`],
      ] },
      { title: "网页/长文本" },
      { title: "第三方应用" },
    ],
  },
  {
    title: "知识Wiki",
    groups: [
      { title: "升学规划", items: [["升学决策框架", ""], ["志愿填报策略", ""], ["录取匹配关系", ""]] },
      { title: "院校研究", items: [["高校层级体系", ""], ["学科专业实力", ""]] },
      { title: "政策与分数", items: [["分数线体系", ""]] },
    ],
  },
  { title: "图谱配置", groups: [{ title: "TheSchema" }] },
] as const;

function PanelShell({ kind, left, children }: { kind: "editor" | "agent"; left: number; children: ReactNode }) {
  return (
    <div
      data-panel-kind={kind}
      style={{
        position: "absolute",
        left,
        top: 0,
        width: PANEL_WIDTH,
        height: PANEL_HEIGHT,
        overflow: "hidden",
        borderRadius: 16,
        background: "#f8f8f8",
        boxShadow: "0 4px 32px rgba(0,0,0,0.45)",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: FIGMA_WIDTH,
          height: FIGMA_HEIGHT,
          transform: `scale(${FIGMA_SCALE})`,
          transformOrigin: "top left",
          background: "#f8f8f8",
          color: "#111",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TopBar({ active }: { active: "agent" | "editor" }) {
  return (
    <header style={{ position: "absolute", inset: "0 0 auto", height: 68, background: "#f8f8f8" }}>
      <div style={{ position: "absolute", left: 24, top: 0, height: 68, display: "flex", alignItems: "center", gap: 16 }}>
        <img src={`${P0}/agent-icon-home.svg`} alt="" style={{ width: 16, height: 16 }} />
        <div style={{ width: 1, height: 16, background: "#d8d8dc" }} />
        <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>项目空间名称</span>
        <img src={`${P0}/agent-icon-arrow-down.svg`} alt="" style={{ width: 12, height: 12 }} />
      </div>

      <div style={{ position: "absolute", left: "50%", top: 16, transform: "translateX(-50%)", display: "flex", height: 36, borderRadius: 8, overflow: "hidden", boxShadow: "0 0 0 1px #f2f3f5" }}>
        <ModeTab label="Agent" icon={`${P0}/agent-icon-tab-agent.svg`} active={active === "agent"} />
        <ModeTab label="编辑器" icon={`${P0}/agent-icon-tab-editor.svg`} active={active === "editor"} />
      </div>

      <button aria-label="刷新" style={{ position: "absolute", right: 24, top: 16, width: 36, height: 36, border: 0, borderRadius: 10, background: "#fff", display: "grid", placeItems: "center" }}>
        <span style={{ fontSize: 18, lineHeight: 1, transform: "rotate(25deg)" }}>↻</span>
      </button>
    </header>
  );
}

function ModeTab({ label, icon, active }: { label: string; icon: string; active: boolean }) {
  return (
    <button
      type="button"
      style={{
        padding: "0 16px",
        border: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        background: active ? "#111" : "#fff",
        color: active ? "#fff" : "#111",
        fontSize: 10,
        fontWeight: 600,
      }}
    >
      <img src={icon} alt="" style={{ width: 12, height: 12, filter: active ? "brightness(0) invert(1)" : "none" }} />
      {label}
    </button>
  );
}

function SourceCards() {
  return (
    <div style={{ display: "flex", gap: 8, width: 504, height: 160 }}>
      {sourceCards.map((card) => (
        <article key={card.title} style={{ position: "relative", width: 120, height: 160, flexShrink: 0, overflow: "hidden", borderRadius: 12, background: "#fff", boxShadow: "0 1px 5px rgba(0,0,0,.08)" }}>
          <h3 style={{ position: "absolute", left: 0, right: 0, top: 12, margin: 0, textAlign: "center", fontSize: 14, lineHeight: "22px", fontWeight: 600 }}>{card.title}</h3>
          <p style={{ position: "absolute", left: 0, right: 0, top: 36, margin: 0, textAlign: "center", color: "#999", fontSize: 10, lineHeight: "18px", whiteSpace: "nowrap" }}>{card.description}</p>
          <div style={{ position: "absolute", left: -1, top: 56, width: 121, height: 104, overflow: "hidden" }}>
            <img src={card.image} alt="" draggable={false} style={{ position: "absolute", objectPosition: "center bottom", ...card.imageStyle }} />
          </div>
        </article>
      ))}
    </div>
  );
}

function ActionChip({ action }: { action: (typeof actions)[number] }) {
  return (
    <div style={{ width: action.width, height: 36, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, background: action.bg, color: action.color, fontSize: 12, lineHeight: "20px", fontWeight: 600, whiteSpace: "nowrap", boxSizing: "border-box" }}>
      <img src={action.icon} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
      {action.label}
    </div>
  );
}

function ActionRow({ wrap = false }: { wrap?: boolean }) {
  if (wrap) {
    return (
      <div style={{ position: "relative", width: 232, height: 124 }}>
        <div style={{ position: "absolute", left: 9.5, top: 0, display: "flex", gap: 8 }}><ActionChip action={actions[0]} /><ActionChip action={actions[1]} /></div>
        <div style={{ position: "absolute", left: 20, top: 44, display: "flex", gap: 8 }}><ActionChip action={actions[2]} /><ActionChip action={actions[3]} /></div>
        <div style={{ position: "absolute", left: 0, top: 88, display: "flex", gap: 8 }}><ActionChip action={actions[4]} /><ActionChip action={actions[5]} /><ActionChip action={actions[6]} /></div>
      </div>
    );
  }

  return <div style={{ display: "flex", justifyContent: "center", gap: 8, width: 666 }}>{actions.map((action) => <ActionChip key={action.label} action={action} />)}</div>;
}

function PromptBox({ sourceText, compact = false }: { sourceText: string; compact?: boolean }) {
  return (
    <div style={{ height: 108, border: "1px solid #f2f3f5", borderRadius: 16, background: "#fff", padding: "12px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
      <span style={{ fontSize: 16, lineHeight: "24px", color: "#999" }}>请输入研究问题。</span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button aria-label="添加" style={roundButtonStyle}>＋</button>
          <button type="button" style={{ height: 32, border: "1px solid #f0f0f0", borderRadius: 16, background: "#fff", padding: "0 12px", fontSize: 12 }}>标准模式⌄</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, color: "#777" }}>{sourceText}</span>
          <button aria-label="发送" style={{ ...roundButtonStyle, background: "#f1f1f2", border: 0 }}>
            <img src={`${P0}/agent-icon-send.svg`} alt="" style={{ width: 18, height: 18 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

const roundButtonStyle: CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "1px solid #e7e7ea",
  background: "#fff",
  display: "grid",
  placeItems: "center",
  fontSize: 20,
  lineHeight: 1,
};

function AgentCanvas() {
  return (
    <main style={{ position: "absolute", left: 16, top: 68, width: 1408, height: 884, overflow: "hidden", borderRadius: 24, background: "#fff" }}>
      <button aria-label="展开侧栏" style={{ position: "absolute", left: 12, top: 12, width: 40, height: 40, padding: 12, border: "1px solid #f2f3f5", borderRadius: 16, background: "#fff", boxShadow: "0 2px 2px rgba(192,192,204,.2)", display: "grid", placeItems: "center", boxSizing: "border-box" }}>
        <img src={`${P0}/agent-icon-sidebar.svg`} alt="" style={{ width: 14.35, height: 14.35, transform: "rotate(90deg)" }} />
      </button>

      <img aria-hidden src={`${P0}/agent-stage-glow.svg`} alt="" style={{ position: "absolute", left: 351, top: 49, width: 720, height: 500, pointerEvents: "none" }} />

      <section style={{ position: "absolute", left: 585, top: 180, width: 252, height: 113, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar size={44} />
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 16, lineHeight: "18px", fontWeight: 500 }}>HI，我是心流 2.0 👋</h2>
          <p style={{ margin: "8px 0 0", color: "#333", fontSize: 12, lineHeight: "20px" }}>添加来源即可开始使用，支持生成海量类型结果</p>
        </div>
      </section>

      <div style={{ position: "absolute", left: 475, top: 317 }}><SourceCards /></div>

      <div style={{ position: "absolute", left: 415, top: 712, width: 666 }}><ActionRow /></div>
      <div style={{ position: "absolute", left: 415, top: 760, width: 666 }}><PromptBox sourceText="无可选来源" /></div>
    </main>
  );
}

function Avatar({ size }: { size: number }) {
  const imageSize = size === 44 ? 62 : size * 1.409;

  return (
    <div style={{ position: "relative", width: size, height: size, overflow: "hidden", borderRadius: "50%", background: "#6969fd" }}>
      <img src={`${P0}/agent-avatar.png`} alt="" draggable={false} style={{ position: "absolute", left: "50%", top: "50%", width: imageSize, height: imageSize, objectFit: "cover", transform: "translate(-50%, -50%)" }} />
    </div>
  );
}

function EditorSidebar() {
  return (
    <aside style={{ position: "absolute", left: 16, top: 68, width: 296, height: 884, borderRadius: 24, background: "#fff", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 16, top: 20, width: 264, height: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong style={{ fontSize: 14 }}>来源</strong>
        <img src={`${P0}/agent-icon-sidebar-close.svg`} alt="" style={{ width: 14.35, height: 14.35, transform: "rotate(-90deg)" }} />
      </div>
      <button type="button" style={{ position: "absolute", left: 16, top: 56, width: 264, height: 48, border: "1px solid #f2f3f5", borderRadius: 14, background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, color: "#4a4a5a", fontWeight: 600 }}>
        <img src={`${P0}/agent-icon-add-source.svg`} alt="" style={{ width: 16, height: 16 }} /> 添加来源
      </button>
      <div style={{ position: "absolute", left: 16, top: 116, width: 264, height: 752, overflow: "hidden" }}>
        {sidebarSections.map((section) => (
          <div key={section.title}>
            <TreeLine text={section.title} level={0} bold />
            {section.groups.map((group) => (
              <div key={group.title}>
                <TreeLine text={group.title} level={1} bold={Boolean("items" in group && group.items)} />
                {"items" in group && group.items?.map(([name, icon]) => <TreeLine key={name} text={name} icon={icon} level={2} />)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

function TreeLine({ text, level, bold = false, icon }: { text: string; level: number; bold?: boolean; icon?: string }) {
  return (
    <div style={{ height: level === 0 ? 38 : 36, paddingLeft: 8 + level * 20, paddingRight: 8, display: "flex", alignItems: "center", gap: 4, fontSize: level === 0 ? 14 : 12, lineHeight: level === 0 ? "22px" : "20px", fontWeight: bold ? 600 : 400, color: level === 0 ? "#111" : level === 1 ? "#333" : "#666", whiteSpace: "nowrap", boxSizing: "border-box" }}>
      {level < 2 && <span style={{ width: 10, color: "#555", fontSize: 10 }}>⌄</span>}
      {icon && <img src={icon} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />}
      <span>{text}</span>
    </div>
  );
}

function EditorWorkspace() {
  return (
    <section style={{ position: "absolute", left: 324, top: 68, width: 745, height: 884, overflow: "hidden", borderRadius: 24, background: "#fff" }}>
      <div style={{ height: 54, borderBottom: "1px solid #ededf0", display: "flex", alignItems: "stretch" }}>
        <EditorTab label="985工程高校" icon width={144} active={false} />
        <EditorTab label="新建标签页" width={129} active />
        <button aria-label="新建标签" style={{ width: 48, border: 0, background: "#fff", fontSize: 22, color: "#999" }}>＋</button>
      </div>
      <div style={{ position: "absolute", left: 281, top: 330, width: 195, textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: 18, lineHeight: "24px", fontWeight: 600 }}>上传文件</h2>
        <p style={{ margin: "5px -80px 0", fontSize: 13, lineHeight: "20px", color: "#666", whiteSpace: "nowrap" }}>添加文件、路径、仓库，或和 <span style={{ color: "#4a45cc" }}>AI聊天</span></p>
      </div>
      <div style={{ position: "absolute", left: 121, top: 394 }}><SourceCards /></div>
    </section>
  );
}

function EditorTab({ label, active, width, icon = false }: { label: string; active: boolean; width: number; icon?: boolean }) {
  return (
    <div style={{ width, height: 54, padding: "0 24px", display: "flex", alignItems: "center", gap: 6, background: active ? "#f5f7ff" : "#fff", borderRadius: active ? "20px 20px 0 0" : 0, fontSize: 14, color: active ? "#111" : "#666", boxSizing: "border-box", whiteSpace: "nowrap" }}>
      {icon && <img src={`${P0}/agent-ficon-docx.webp`} alt="" style={{ width: 16, height: 16 }} />}{label}{active && <span style={{ marginLeft: "auto", color: "#aaa" }}>×</span>}
    </div>
  );
}

function EditorAssistant() {
  return (
    <aside style={{ position: "absolute", left: 1081, top: 68, width: 343, height: 884, overflow: "hidden", borderRadius: 24, background: "#fff" }}>
      <button aria-label="收起侧栏" style={{ position: "absolute", right: 16, top: 20, width: 24, height: 24, border: 0, padding: 0, background: "transparent" }}>
        <img src={`${P0}/agent-icon-sidebar-close.svg`} alt="" style={{ width: 21.53, height: 21.5, transform: "rotate(-90deg)" }} />
      </button>
      <section style={{ position: "absolute", left: 34, top: 180, width: 275, height: 113, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar size={44} />
        <h2 style={{ margin: "16px 0 0", fontSize: 16, lineHeight: "18px", fontWeight: 500 }}>HI，我是心流 2.0 👋</h2>
        <p style={{ margin: "8px 0 0", fontSize: 12, lineHeight: "20px", color: "#333", whiteSpace: "nowrap" }}>支持总结报告、PPT、思维导图等多种结构化成果！</p>
      </section>
      <div style={{ position: "absolute", left: 63, top: 318, width: 232 }}><ActionRow wrap /></div>
      <div style={{ position: "absolute", left: 16, top: 760, width: 311 }}><PromptBox compact sourceText="已选20个来源" /></div>
    </aside>
  );
}

export function FigmaAgentPanel({ left }: { left: number }) {
  return (
    <PanelShell kind="agent" left={left}>
      <TopBar active="agent" />
      <AgentCanvas />
    </PanelShell>
  );
}

export function FigmaEditorPanel({ left }: { left: number }) {
  return (
    <PanelShell kind="editor" left={left}>
      <TopBar active="editor" />
      <EditorSidebar />
      <EditorWorkspace />
      <EditorAssistant />
    </PanelShell>
  );
}

export const FIGMA_PANEL_DISPLAY_HEIGHT = PANEL_HEIGHT;
