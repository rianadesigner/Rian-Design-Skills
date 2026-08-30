"use client";

const PROBLEMS = [
  "笔记越记越乱",
  "知识点缺连接",
  "信息过时矛盾",
  "引用断裂孤儿页",
  "维护成本飙升",
  "无人回看复用",
];

const FLOW = [
  { num: "01", en: "COLLECT", title: "收集", desc: "投入源文档" },
  { num: "02", en: "UNDERSTAND", title: "理解", desc: "读取分析 · 讨论" },
  { num: "03", en: "SYNTHESIZE", title: "综合", desc: "生成摘要 · 实体页" },
  { num: "04", en: "EVOLVE", title: "演化", desc: "交叉引用 · Lint" },
  { num: "05", en: "PUBLISH", title: "发布", desc: "更新 Wiki · Index" },
  { num: "06", en: "QUERY", title: "查询", desc: "检索 · 答案归档" },
];

const ROLES = [
  { label: "HUMAN", title: "人类", desc: "策划来源 · 提出问题 · 引导方向" },
  { label: "LLM", title: "模型", desc: "总结 · 交叉引用 · 维护一致性" },
  { label: "SYSTEM", title: "系统", desc: "版本控制 · 存储 · 自动检查" },
];

const SCENARIOS = ["个人成长", "读书伴侣", "竞品分析", "深度研究", "团队知识库", "兴趣深潜"];

const PRINCIPLES = [
  { title: "源只读", desc: "原始数据不可变" },
  { title: "强连接", desc: "页面交叉引用" },
  { title: "可验证", desc: "引用可溯源" },
  { title: "分层治理", desc: "Schema 持续演化" },
];

const border = "rgba(255,255,255,0.12)";
const red = "rgba(200,8,8,0.88)";
const muted = "rgba(255,255,255,0.46)";

function SectionLabel({ num, title, en }: { num: string; title: string; en: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 26 }}>
      <span style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: 14, letterSpacing: 1.8, color: red }}>{num}</span>
      <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.22)" }} />
      <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{title}</span>
      <span style={{ marginLeft: "auto", fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: 2.2, color: "rgba(255,255,255,0.26)" }}>{en}</span>
    </div>
  );
}

export default function SlidePage4b() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#070707", fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 20% 66% at 0% 50%, rgba(200,8,8,0.25), transparent 78%), radial-gradient(ellipse 20% 66% at 100% 50%, rgba(200,8,8,0.25), transparent 78%)" }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, opacity: 0.1, mixBlendMode: "overlay", pointerEvents: "none",
        backgroundImage: "url('/images/film-grain.png')", backgroundRepeat: "repeat", backgroundSize: "128px 128px",
      }} />
      <header style={{ position: "absolute", left: 48, right: 48, top: 38, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "start", zIndex: 10 }}>
        <div style={{ paddingTop: 34 }}>
          <span style={{ display: "block", fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: 11, letterSpacing: 2.4, color: red }}>LLM WIKI / 08</span>
          <span style={{ display: "block", marginTop: 6, fontSize: 10, letterSpacing: 2.4, color: "rgba(255,255,255,0.3)" }}>METHOD &amp; SYSTEM</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: 13, letterSpacing: 2, color: red }}>08</span>
            <span aria-hidden style={{ width: 28, height: 1, background: "rgba(255,255,255,0.22)" }} />
            <span style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.46)" }}>LLM WIKI 思维框架</span>
          </div>
          <p style={{ margin: 0, fontFamily: "'标小智无界黑', sans-serif", fontSize: 40, lineHeight: "51.92px", fontWeight: 400, letterSpacing: "1.5px", color: "#fff" }}>LLM WIKI 方法论</p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: "25.2px", color: "rgba(255,255,255,0.5)" }}>让知识在使用中被持续整理、连接、验证与更新</p>
        </div>

        <div style={{ justifySelf: "end", width: 260, paddingTop: 34, textAlign: "right" }}>
          <span style={{ display: "block", fontSize: 9, letterSpacing: 2.2, color: red }}>CORE INSIGHT</span>
          <p style={{ margin: "7px 0 0", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,0.48)" }}>维护知识库的瓶颈不是阅读，而是持续、准确地维护知识关系。</p>
        </div>
      </header>

      <main style={{ position: "absolute", left: 48, right: 48, top: 164, bottom: 42, display: "grid", gridTemplateRows: "178px 224px 1fr", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, zIndex: 10 }}>
        <section style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", borderBottom: `1px solid ${border}` }}>
          <div style={{ padding: "18px 28px 18px 0", borderRight: `1px solid ${border}` }}>
            <SectionLabel num="01" title="它是什么，解决什么" en="WHY" />
            <p style={{ margin: "18px 0 0", maxWidth: 500, fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.56)" }}>
              <strong style={{ color: "rgba(255,255,255,0.94)", fontWeight: 600 }}>LLM Wiki 不是让 AI 替人写笔记。</strong>
              它以原始资料为事实基础、Markdown 为知识载体，让模型承担增量整理，让人类负责判断与治理。
            </p>
          </div>

          <div style={{ padding: "18px 0 18px 28px" }}>
            <SectionLabel num="" title="解决的核心问题" en="PAIN POINTS" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: 17, borderTop: `1px solid ${border}`, borderLeft: `1px solid ${border}` }}>
              {PROBLEMS.map((problem, index) => (
                <div key={problem} style={{ height: 43, display: "flex", alignItems: "center", gap: 10, padding: "0 12px", borderRight: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontFamily: "Impact, sans-serif", fontSize: 9, letterSpacing: 1, color: red }}>{String(index + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.62)" }}>{problem}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "18px 0", borderBottom: `1px solid ${border}` }}>
          <SectionLabel num="02" title="知识演化闭环" en="HOW IT WORKS" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", marginTop: 16, borderTop: `1px solid ${border}`, borderLeft: `1px solid ${border}` }}>
            {FLOW.map((step) => (
              <div key={step.num} style={{ position: "relative", height: 120, padding: "16px 16px 14px", borderRight: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
                <span style={{ position: "absolute", right: 12, top: 9, fontFamily: "Impact, sans-serif", fontSize: 27, letterSpacing: 1, color: "rgba(200,8,8,0.32)" }}>{step.num}</span>
                <span style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: 1.8, color: "rgba(255,255,255,0.28)" }}>{step.en}</span>
                <p style={{ margin: "24px 0 0", fontSize: 17, fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>{step.title}</p>
                <p style={{ margin: "7px 0 0", fontSize: 10.5, color: muted }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
            <span style={{ width: 6, height: 6, background: red, transform: "rotate(45deg)" }} />
            <span style={{ fontSize: 10.5, color: muted }}>新知识沉淀回库，持续循环。一个源文档可触及 10–15 个 Wiki 页面，每次查询也可能成为新的知识节点。</span>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1.08fr 0.95fr 0.97fr" }}>
          <div style={{ padding: "18px 24px 0 0", borderRight: `1px solid ${border}` }}>
            <SectionLabel num="03" title="人机协作分工" en="WHO" />
            <div style={{ marginTop: 15 }}>
              {ROLES.map((role) => (
                <div key={role.label} style={{ display: "grid", gridTemplateColumns: "70px 54px 1fr", alignItems: "center", minHeight: 38, borderTop: `1px solid ${border}` }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: 1.5, color: red }}>{role.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.84)" }}>{role.title}</span>
                  <span style={{ fontSize: 10.5, color: muted }}>{role.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "18px 24px", borderRight: `1px solid ${border}` }}>
            <SectionLabel num="" title="真实应用场景" en="WHERE" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", marginTop: 15, borderTop: `1px solid ${border}`, borderLeft: `1px solid ${border}` }}>
              {SCENARIOS.map((item, index) => (
                <div key={item} style={{ height: 39, display: "flex", alignItems: "center", gap: 9, padding: "0 11px", borderRight: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontFamily: "Impact, sans-serif", fontSize: 8, color: "rgba(200,8,8,0.64)" }}>{String(index + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.64)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "18px 0 0 24px" }}>
            <SectionLabel num="" title="设计原则" en="PRINCIPLES" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", marginTop: 15, borderTop: `1px solid ${border}`, borderLeft: `1px solid ${border}` }}>
              {PRINCIPLES.map((item) => (
                <div key={item.title} style={{ height: 59, padding: "10px 12px", borderRight: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
                  <span style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.82)" }}>{item.title}</span>
                  <span style={{ display: "block", marginTop: 5, fontSize: 9.5, color: muted }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
