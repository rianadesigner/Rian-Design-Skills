"use client";

import { useState } from "react";

const CATEGORIES = [
  "全部", "总结汇报", "教育培训", "医学医疗",
  "营销推广", "商业计划", "高校专区", "企业介绍",
  "竞政宣传", "品牌介绍", "分析报告",
];

const SIDEBAR = ["热门推荐", "历史模板"];

/* 模板数据 - 用渐变色块模拟封面 */
const TEMPLATES = [
  { id: 1, title: "大学本科毕业答辩", sub: "通用模板", cat: "教育培训", grad: "linear-gradient(135deg,#4F9CF9 0%,#2563EB 100%)", accent: "#93C5FD" },
  { id: 2, title: "企业年度总结汇报", sub: "商务风格", cat: "总结汇报", grad: "linear-gradient(135deg,#F59E0B 0%,#D97706 100%)", accent: "#FCD34D" },
  { id: 3, title: "新员工培训方案", sub: "扁平风格", cat: "教育培训", grad: "linear-gradient(135deg,#10B981 0%,#059669 100%)", accent: "#6EE7B7" },
  { id: 4, title: "执行报告精要版", sub: "简约商务", cat: "总结汇报", grad: "linear-gradient(135deg,#6366F1 0%,#4F46E5 100%)", accent: "#A5B4FC" },
  { id: 5, title: "市场营销推广策略", sub: "活力色系", cat: "营销推广", grad: "linear-gradient(135deg,#EC4899 0%,#BE185D 100%)", accent: "#F9A8D4" },
  { id: 6, title: "医疗健康白皮书", sub: "专业医学", cat: "医学医疗", grad: "linear-gradient(135deg,#14B8A6 0%,#0F766E 100%)", accent: "#5EEAD4" },
  { id: 7, title: "高校招生宣传册", sub: "校园风格", cat: "高校专区", grad: "linear-gradient(135deg,#8B5CF6 0%,#6D28D9 100%)", accent: "#C4B5FD" },
  { id: 8, title: "企业战略发布会", sub: "深色商务", cat: "企业介绍", grad: "linear-gradient(135deg,#1E293B 0%,#0F172A 100%)", accent: "#94A3B8" },
  { id: 9, title: "品牌视觉升级方案", sub: "创意设计", cat: "品牌介绍", grad: "linear-gradient(135deg,#F97316 0%,#C2410C 100%)", accent: "#FED7AA" },
  { id: 10, title: "数据分析季度报告", sub: "数据风格", cat: "分析报告", grad: "linear-gradient(135deg,#0EA5E9 0%,#0369A1 100%)", accent: "#BAE6FD" },
  { id: 11, title: "政府工作报告", sub: "庄重正式", cat: "竞政宣传", grad: "linear-gradient(135deg,#DC2626 0%,#991B1B 100%)", accent: "#FCA5A5" },
  { id: 12, title: "商业计划书 BP", sub: "融资版", cat: "商业计划", grad: "linear-gradient(135deg,#7C3AED 0%,#5B21B6 100%)", accent: "#DDD6FE" },
];

export default function PPTGenerator() {
  const [activeSide, setActiveSide] = useState(0);
  const [activeCat, setActiveCat] = useState("全部");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const visible = TEMPLATES.filter(t =>
    (activeCat === "全部" || t.cat === activeCat) &&
    (query === "" || t.title.includes(query) || t.sub.includes(query))
  );

  const handleGenerate = () => {
    if (!selected || generating || done) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setDone(true); }, 2200);
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      background: "#F7F5F0",
      borderRadius: 12,
      overflow: "hidden",
      fontFamily: "'PingFang SC','Helvetica Neue',sans-serif",
    }}>
      {/* ── 顶部标题栏 */}
      <div style={{
        padding: "10px 14px 8px",
        background: "#F7F5F0",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8, flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
          选择模板创建 PPT
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {/* 搜索框 */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "#EDEBE6", borderRadius: 6, padding: "4px 8px",
            border: "1px solid rgba(0,0,0,0.08)",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5" cy="5" r="3.5" stroke="#888" strokeWidth="1.2"/>
              <path d="M7.8 7.8 L10 10" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="输入搜索关键词"
              style={{
                border: "none", background: "transparent",
                fontSize: 11, color: "#333", outline: "none", width: 90,
              }}
            />
          </div>
          {/* 生成按钮 */}
          <button
            onClick={handleGenerate}
            disabled={!selected || generating}
            style={{
              padding: "5px 12px", borderRadius: 6,
              background: done ? "#22C55E" : selected ? "#3B6BFF" : "#A0A0A0",
              color: "#fff", border: "none", cursor: selected && !generating ? "pointer" : "default",
              fontSize: 11, fontWeight: 600,
              transition: "background 0.2s",
              display: "flex", alignItems: "center", gap: 4,
            }}
          >
            {generating ? (
              <>
                <Spinner />
                生成中...
              </>
            ) : done ? "✓ 已生成" : "生成 PPT"}
          </button>
        </div>
      </div>

      {/* ── 分类 Tabs */}
      <div style={{
        display: "flex", gap: 0, overflowX: "auto", flexShrink: 0,
        padding: "0 14px",
        background: "#F7F5F0",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        scrollbarWidth: "none",
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            style={{
              padding: "6px 10px",
              border: "none", background: "transparent",
              fontSize: 11, fontWeight: activeCat === cat ? 600 : 400,
              color: activeCat === cat ? "#3B6BFF" : "#555",
              cursor: "pointer", whiteSpace: "nowrap",
              borderBottom: activeCat === cat ? "2px solid #3B6BFF" : "2px solid transparent",
              transition: "all 0.15s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── 主体：侧栏 + 网格 */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* 侧栏 */}
        <div style={{
          width: 64, flexShrink: 0,
          background: "#EFECE5",
          borderRight: "1px solid rgba(0,0,0,0.06)",
          display: "flex", flexDirection: "column",
          paddingTop: 8,
        }}>
          {SIDEBAR.map((label, i) => (
            <button
              key={i}
              onClick={() => setActiveSide(i)}
              style={{
                padding: "8px 6px",
                fontSize: 10.5, fontWeight: activeSide === i ? 600 : 400,
                color: activeSide === i ? "#3B6BFF" : "#555",
                background: activeSide === i ? "rgba(59,107,255,0.08)" : "transparent",
                border: "none", cursor: "pointer", textAlign: "center",
                borderLeft: activeSide === i ? "2px solid #3B6BFF" : "2px solid transparent",
                transition: "all 0.15s", lineHeight: 1.3,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 模板网格 */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "10px 12px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gridAutoRows: "70px",
          gap: 8,
          alignContent: "start",
          scrollbarWidth: "thin",
        }}>
          {visible.map(tpl => (
            <div
              key={tpl.id}
              onClick={() => setSelected(tpl.id)}
              style={{
                borderRadius: 8,
                background: tpl.grad,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                border: selected === tpl.id ? "2px solid #3B6BFF" : "2px solid transparent",
                boxShadow: selected === tpl.id
                  ? "0 0 0 3px rgba(59,107,255,0.2)"
                  : "0 2px 6px rgba(0,0,0,0.12)",
                transition: "all 0.15s",
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end", padding: 6,
              }}
            >
              {/* 装饰线 */}
              <div style={{ position:"absolute", top:8, left:8, right:8, height:2, background: tpl.accent, opacity:0.6, borderRadius:1 }} />
              <div style={{ position:"absolute", top:14, left:8, right:16, height:1, background: tpl.accent, opacity:0.3, borderRadius:1 }} />
              <div style={{ position:"absolute", top:19, left:8, right:20, height:1, background: tpl.accent, opacity:0.2, borderRadius:1 }} />
              {/* 标题 */}
              <p style={{
                fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.95)",
                margin: 0, lineHeight: 1.3,
                textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                overflow: "hidden", display: "-webkit-box",
                WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              }}>{tpl.title}</p>
              {/* 选中勾 */}
              {selected === tpl.id && (
                <div style={{
                  position:"absolute", top:5, right:5,
                  width:14, height:14, borderRadius:"50%",
                  background:"#3B6BFF", display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4L3 5.5L6.5 2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>
                </div>
              )}
            </div>
          ))}
          {visible.length === 0 && (
            <div style={{ gridColumn:"1/-1", textAlign:"center", color:"#888", fontSize:12, padding:20 }}>
              暂无匹配模板
            </div>
          )}
        </div>
      </div>

      {/* ── 底部提示 */}
      {selected && !done && (
        <div style={{
          padding: "6px 14px", background: "#EEF2FF",
          borderTop: "1px solid rgba(59,107,255,0.15)",
          fontSize: 10.5, color: "#3B6BFF", flexShrink: 0,
        }}>
          已选：{TEMPLATES.find(t => t.id === selected)?.title} · 点击右上角「生成 PPT」
        </div>
      )}
      {done && (
        <div style={{
          padding: "6px 14px", background: "#F0FDF4",
          borderTop: "1px solid rgba(34,197,94,0.2)",
          fontSize: 10.5, color: "#16A34A", flexShrink: 0,
        }}>
          ✓ PPT 已生成完成，可下载或继续编辑
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" style={{ animation: "spin 0.8s linear infinite" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="5.5" cy="5.5" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
      <path d="M5.5 1.5 A4 4 0 0 1 9.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
