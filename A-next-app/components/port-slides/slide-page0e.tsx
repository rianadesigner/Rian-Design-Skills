"use client";

import { useState, useRef, useEffect } from "react";

// ─── Graph coordinate system (639 × 530) ─────────────────────────────────────
const GPOS: Record<string, { x: number; y: number }> = {
  src_school: { x: 66,  y: 72  },
  src_policy: { x: 66,  y: 172 },
  src_score:  { x: 66,  y: 278 },
  src_prep:   { x: 66,  y: 382 },
  engine:     { x: 217, y: 228 },
  w_frame:    { x: 355, y: 44  },
  w_school:   { x: 355, y: 132 },
  w_policy2:  { x: 355, y: 228 },
  w_prep:     { x: 355, y: 328 },
  w_subject:  { x: 355, y: 428 },
  w_tier:     { x: 515, y: 84  },
  w_score:    { x: 515, y: 220 },
  w_strategy: { x: 515, y: 360 },
  w_match:    { x: 515, y: 468 },
};

function edgePath(x1: number, y1: number, x2: number, y2: number, curve: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return `M${x1},${y1} Q${mx + nx * curve},${my + ny * curve} ${x2},${y2}`;
}

// Curve values per edge (maps 1:1 to GEDGES array order)
const EDGE_CURVES = [
  8, 0, 0, -8,          // flow: src_* → engine
  -22, -12, 0, -28, 14, // compile: engine → wiki nodes
  18, 0, 0,             // relation: w_frame → w_policy2/w_tier/w_school
  0, -22, -16,          // relation: w_policy2 → w_prep/w_strategy/w_score
  0, 14,                // relation: w_school → w_prep/w_tier
  0, 14, 18,            // relation: w_prep → w_subject/w_strategy; w_subject → w_strategy
  0,                    // w_tier → w_score
  0, 14,                // w_strategy → w_match; w_score → w_match
];

// ─── Node data ────────────────────────────────────────────────────────────────
type NodeType = "source" | "engine" | "wiki";

interface GNode {
  id: string;
  label: string;
  type: NodeType;
  desc: string;
  /** Click area center in %, relative to graph SVG area (639.273 × 325.664) */
  clickTop: string;
  clickLeft: string;
}

const GNODES: GNode[] = [
  {
    id: "src_school", label: "高校信息资料", type: "source",
    desc: "双一流、985、211高校综合介绍，含基本概况、学科建设、师资力量及校园风貌。",
    clickTop: "17%", clickLeft: "9%",
  },
  {
    id: "src_policy", label: "政策法规文件", type: "source",
    desc: "教育部历年高考政策改革方案及各地实施细则通知。",
    clickTop: "36%", clickLeft: "9%",
  },
  {
    id: "src_score", label: "分数数据统计", type: "source",
    desc: "2020–2025年全国31省市一本/二本录取分数线，按年份和批次分类整理。",
    clickTop: "56%", clickLeft: "9%",
  },
  {
    id: "src_prep", label: "备考学习资料", type: "source",
    desc: "高考备考全流程攻略、学科评估笔记、志愿填报指南汇编。",
    clickTop: "75%", clickLeft: "9%",
  },
  {
    id: "engine", label: "Wiki 编译引擎", type: "engine",
    desc: "解析、切分、抽取实体与关系，归并去重，将原始资料编译为结构化、可互链 Wiki 节点。",
    clickTop: "46%", clickLeft: "33%",
  },
  {
    id: "w_frame", label: "升学决策框架", type: "wiki",
    desc: "综合政策、院校、分数多维信息构建的高考升学决策总框架节点。",
    clickTop: "13%", clickLeft: "52%",
  },
  {
    id: "w_school", label: "院校画像", type: "wiki",
    desc: "各高校综合画像，含院校层级、学科实力、历年录取等结构化信息。",
    clickTop: "34%", clickLeft: "52%",
  },
  {
    id: "w_policy2", label: "政策依据", type: "wiki",
    desc: "高考政策规则体系，包含招生政策、加分政策与专项计划说明。",
    clickTop: "54%", clickLeft: "53%",
  },
  {
    id: "w_prep", label: "备考行动路径", type: "wiki",
    desc: "基于政策与学科实力生成的个性化备考路径与时间规划建议。",
    clickTop: "73%", clickLeft: "49%",
  },
  {
    id: "w_subject", label: "学科专业实力", type: "wiki",
    desc: "各高校学科评估结果对比，含A+学科分析与专业优势排名。",
    clickTop: "90%", clickLeft: "50%",
  },
  {
    id: "w_tier", label: "高校层级体系", type: "wiki",
    desc: "双一流、985、211、普通本科的层级划分与历年录取门槛对比。",
    clickTop: "22%", clickLeft: "73%",
  },
  {
    id: "w_score", label: "分数线体系", type: "wiki",
    desc: "历年各省各批次录取分数线，支持趋势分析与横向院校对比。",
    clickTop: "50%", clickLeft: "79%",
  },
  {
    id: "w_strategy", label: "志愿填报策略", type: "wiki",
    desc: "综合政策、分数线与学科偏好生成的个性化志愿填报方案。",
    clickTop: "74%", clickLeft: "73%",
  },
  {
    id: "w_match", label: "录取匹配关系", type: "wiki",
    desc: "分数线与院校层级共同约束下的录取概率预测与匹配模型。",
    clickTop: "60%", clickLeft: "86%",
  },
];

const GEDGES: { a: string; b: string; kind: string; rel?: string }[] = [
  { a: "src_school", b: "engine",    kind: "flow" },
  { a: "src_policy", b: "engine",    kind: "flow" },
  { a: "src_score",  b: "engine",    kind: "flow" },
  { a: "src_prep",   b: "engine",    kind: "flow" },
  { a: "engine",     b: "w_frame",   kind: "compile" },
  { a: "engine",     b: "w_school",  kind: "compile" },
  { a: "engine",     b: "w_policy2", kind: "compile" },
  { a: "engine",     b: "w_tier",    kind: "compile" },
  { a: "engine",     b: "w_subject", kind: "compile" },
  { a: "w_frame",    b: "w_policy2", kind: "relation", rel: "政策约束" },
  { a: "w_frame",    b: "w_tier",    kind: "relation", rel: "层级定位" },
  { a: "w_frame",    b: "w_school",  kind: "relation", rel: "院校信息" },
  { a: "w_policy2",  b: "w_prep",    kind: "relation", rel: "考纲指导" },
  { a: "w_policy2",  b: "w_strategy",kind: "relation", rel: "规则约束" },
  { a: "w_policy2",  b: "w_score",   kind: "relation", rel: "分数依据" },
  { a: "w_school",   b: "w_prep",    kind: "relation" },
  { a: "w_school",   b: "w_tier",    kind: "relation" },
  { a: "w_prep",     b: "w_subject", kind: "relation" },
  { a: "w_prep",     b: "w_strategy",kind: "relation" },
  { a: "w_subject",  b: "w_strategy",kind: "relation", rel: "专业选择" },
  { a: "w_tier",     b: "w_score",   kind: "relation" },
  { a: "w_strategy", b: "w_match",   kind: "relation", rel: "匹配判断" },
  { a: "w_score",    b: "w_match",   kind: "relation" },
];

const NODE_STYLE: Record<NodeType, { dot: string }> = {
  source: { dot: "rgba(255,255,255,0.5)" },
  engine: { dot: "rgb(200,8,8)" },
  wiki:   { dot: "rgba(255,255,255,0.8)" },
};

const TYPE_LABEL: Record<NodeType, string> = {
  source: "原始资料",
  engine: "编译引擎",
  wiki:   "Wiki 节点",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Right-panel: single node row — clickable */
function NodeRow({
  label, tag, dot, onClick, active,
}: {
  label: string; tag: string; dot: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        background: active ? "rgba(200,8,8,0.06)" : "rgba(255,255,255,0.03)",
        border: active ? "1px solid rgba(200,8,8,0.4)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        flexShrink: 0,
        width: "100%",
        cursor: onClick ? "pointer" : "default",
        textAlign: "left",
        padding: 0,
        transition: "background 0.15s, border-color 0.15s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 17px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: 6, background: dot, flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "'PingFang SC', sans-serif",
              fontWeight: 500,
              fontSize: 13,
              color: "rgba(255,255,255,0.85)",
              lineHeight: "19.5px",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        </div>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 4,
            height: 22.5,
            minWidth: 66,
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 6,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'PingFang SC', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              lineHeight: "16.5px",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        </div>
      </div>
    </button>
  );
}

const GRAPH_W = 639;
const GRAPH_H = 530;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SlidePage0e() {
  const [selected, setSelected] = useState("engine");

  const leftPanelRef  = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stopIfBtn = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) e.stopPropagation();
    };
    const l = leftPanelRef.current;
    const r = rightPanelRef.current;
    l?.addEventListener("pointerdown", stopIfBtn);
    r?.addEventListener("pointerdown", stopIfBtn);
    return () => {
      l?.removeEventListener("pointerdown", stopIfBtn);
      r?.removeEventListener("pointerdown", stopIfBtn);
    };
  }, []);

  const FRAME_BOTTOM = 900 - 24;

  const GAP = 20;
  const L_W = 668;
  const R_W = 546;
  // 两面板总宽 1234px，居中于 1440px 画布
  const APP_LEFT = Math.round((1440 - L_W - GAP - R_W) / 2); // 103
  const APP_TOP = 272;
  const L_H = FRAME_BOTTOM - APP_TOP; // 604
  const graphScale = L_W / GRAPH_W;

  const selNode = GNODES.find((n) => n.id === selected) ?? GNODES[4];
  const neighbors = GEDGES
    .filter((e) => e.a === selected || e.b === selected)
    .map((e) => {
      const otherId = e.a === selected ? e.b : e.a;
      const other = GNODES.find((n) => n.id === otherId);
      if (!other) return null;
      const rel =
        e.kind === "flow" ? "数据流入" :
        e.kind === "compile" ? "编译生成" :
        (e.rel ?? "关联");
      return { node: other, rel };
    })
    .filter(Boolean) as { node: GNode; rel: string }[];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#070707",
        overflow: "hidden",
        fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      {/* ── Left red glow ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 83.33% 0 0",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -111.8 -26.833 0 0 500)'><stop stop-color='rgba(200,8,8,0.26)' offset='0'/><stop stop-color='rgba(180,0,0,0.1)' offset='0.45'/><stop stop-color='rgba(0,0,0,0)' offset='0.75'/></radialGradient></defs></svg>")`,
        }}
      />
      {/* ── Right red glow ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 0 0 83.33%",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -111.8 -26.833 0 240 500)'><stop stop-color='rgba(200,8,8,0.26)' offset='0'/><stop stop-color='rgba(180,0,0,0.1)' offset='0.45'/><stop stop-color='rgba(0,0,0,0)' offset='0.75'/></radialGradient></defs></svg>")`,
        }}
      />

      {/* ── Four corner marks ── */}
      {(
        [
          { top: 24, left: 24 },
          { top: 24, right: 24, transform: "scaleX(-1)" },
          { bottom: 24, left: 24, transform: "scaleY(-1)" },
          { bottom: 24, right: 24, transform: "scale(-1,-1)" },
        ] as React.CSSProperties[]
      ).map((s, i) => (
        <div key={i} aria-hidden style={{ position: "absolute", ...s, width: 18, height: 18, zIndex: 6 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 18, height: 1, background: "rgba(255,255,255,0.22)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 18, background: "rgba(255,255,255,0.22)" }} />
        </div>
      ))}

      {/* ── Header ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 128,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: 13, color: "rgba(200,8,8,0.85)", letterSpacing: 2 }}>
            03
          </span>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 3 }}>
            LLM WIKI 核心操作动线
          </span>
        </div>
        <p style={{ fontWeight: 600, fontSize: 44, color: "#fff", lineHeight: "51.92px", letterSpacing: 0.5, margin: 0 }}>
          2. Wiki图谱编译
        </p>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            lineHeight: "25.2px",
            margin: 0,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          原始资料流入编译引擎，编译生成彼此关联的 Wiki 节点。点击任意节点，查看它的上位与关联关系。
        </p>
      </div>

      {/* ── Left panel ── */}
      <div
        ref={leftPanelRef}
        style={{
          position: "absolute",
          left: APP_LEFT,
          top: APP_TOP,
          width: L_W,
          height: L_H,
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Dot backdrop */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px)",
            backgroundSize: "26px 26px",
            pointerEvents: "none",
          }}
        />

        {/* Inner red glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 288 288' xmlns='http://www.w3.org/2000/svg'><defs><radialGradient id='g'><stop stop-color='rgba(200,8,8,0.18)' offset='0'/><stop stop-color='rgba(0,0,0,0)' offset='0.7'/></radialGradient></defs><circle cx='144' cy='144' r='144' fill='url(%23g)'/></svg>")`,
            pointerEvents: "none",
          }}
        />

        {/* ── Graph view ── */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: (L_H - GRAPH_H * graphScale) / 2,
            width: L_W,
            height: GRAPH_H * graphScale,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: GRAPH_W,
              height: GRAPH_H,
              transform: `scale(${graphScale})`,
              transformOrigin: "top left",
            }}
          >
            {/* Column header labels */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 14,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "space-around",
                paddingLeft: 20,
                paddingRight: 20,
                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.42)", letterSpacing: 1.5, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>原始资料</span>
              <span style={{ fontSize: 8, color: "rgba(200,8,8,0.8)", letterSpacing: 1.5, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>编译</span>
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.65)", letterSpacing: 1.5, fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>Wiki 知识图谱</span>
            </div>

            {/* Column divider lines */}
            {[158, 430].map((x) => (
              <div
                key={x}
                aria-hidden
                style={{
                  position: "absolute",
                  top: 36,
                  left: x,
                  width: 1,
                  height: 474,
                  background: "rgba(255,255,255,0.05)",
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* SVG Edges */}
            <svg
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              width={GRAPH_W}
              height={GRAPH_H}
              viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`}
              fill="none"
            >
              {GEDGES.map((edge, i) => {
                const a = GPOS[edge.a];
                const b = GPOS[edge.b];
                if (!a || !b) return null;
                const isActive = selected === edge.a || selected === edge.b;
                const isFlowOrCompile = edge.kind !== "relation";
                return (
                  <path
                    key={i}
                    d={edgePath(a.x, a.y, b.x, b.y, EDGE_CURVES[i] ?? 0)}
                    stroke={
                      isActive
                        ? isFlowOrCompile
                          ? "rgba(200,8,8,0.75)"
                          : "rgba(200,8,8,0.45)"
                        : isFlowOrCompile
                        ? "rgba(200,8,8,0.18)"
                        : "rgba(255,255,255,0.09)"
                    }
                    strokeWidth="1"
                    strokeDasharray="5 3"
                    fill="none"
                    style={{ transition: "stroke 0.2s" }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {GNODES.map((node) => {
              const pos = GPOS[node.id];
              if (!pos) return null;
              const isSelected = node.id === selected;
              const isEngine = node.type === "engine";
              const isSource = node.type === "source";
              return (
                <button
                  key={node.id}
                  onClick={() => setSelected(node.id)}
                  onPointerDown={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    transform: "translate(-50%, -50%)",
                    background: isSelected
                      ? isEngine
                        ? "rgba(200,8,8,0.22)"
                        : "rgba(200,8,8,0.1)"
                      : isEngine
                      ? "rgba(200,8,8,0.07)"
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      isSelected
                        ? "rgba(200,8,8,0.6)"
                        : isEngine
                        ? "rgba(200,8,8,0.28)"
                        : "rgba(255,255,255,0.12)"
                    }`,
                    borderRadius: 5,
                    padding: isEngine ? "5px 12px" : "3.5px 9px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                    transition: "background 0.15s, border-color 0.15s",
                    zIndex: 20,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      width: isEngine ? 6 : 5,
                      height: isEngine ? 6 : 5,
                      borderRadius: "50%",
                      background: NODE_STYLE[node.type].dot,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: isEngine ? 9 : 7.5,
                      fontWeight: 700,
                      color: isSource ? "rgba(216,216,218,0.9)" : "#fff",
                      fontFamily: "Inter, 'PingFang SC', sans-serif",
                      lineHeight: 1.3,
                    }}
                  >
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div
        ref={rightPanelRef}
        style={{
          position: "absolute",
          left: APP_LEFT + L_W + GAP,
          top: APP_TOP,
          width: R_W,
          height: L_H,
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          zIndex: 10,
          padding: 25,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* Node type eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  background: NODE_STYLE[selNode.type].dot,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: 1,
                  lineHeight: "18px",
                }}
              >
                {TYPE_LABEL[selNode.type]}
              </span>
            </div>

            {/* Node title */}
            <div style={{ paddingTop: 8, flexShrink: 0 }}>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  color: "#fff",
                  lineHeight: "33px",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {selNode.label}
              </p>
            </div>

            {/* Node description */}
            <div style={{ paddingTop: 10, flexShrink: 0 }}>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: "24.5px",
                  margin: 0,
                  width: "100%",
                }}
              >
                {selNode.desc}
              </p>
            </div>

            {/* Connected nodes label */}
            <div style={{ paddingTop: 28, flexShrink: 0 }}>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: 1,
                  lineHeight: "18px",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                关联节点（{neighbors.length}）
              </p>
            </div>

            {/* Connected nodes list */}
            <div style={{ paddingTop: 12, flex: "1 1 0", minHeight: 0, overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  maxHeight: "100%",
                  overflowY: "auto",
                }}
              >
                {neighbors.map(({ node, rel }) => (
                  <NodeRow
                    key={node.id}
                    label={node.label}
                    tag={rel}
                    dot={NODE_STYLE[node.type].dot}
                    onClick={() => setSelected(node.id)}
                    active={node.id === selected}
                  />
                ))}
              </div>
            </div>

            {/* Legend */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: 20,
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
                {(["source", "engine", "wiki"] as NodeType[]).map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 6, background: NODE_STYLE[t].dot }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: "18px" }}>
                      {TYPE_LABEL[t]}
                    </span>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 16, height: 2, borderTop: "2px dashed #c80808" }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: "18px", whiteSpace: "nowrap" }}>
                    数据流 / 编译
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 16, height: 1, borderTop: "1px solid rgba(255,255,255,0.4)" }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: "18px" }}>
                    节点关联
                  </span>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}
