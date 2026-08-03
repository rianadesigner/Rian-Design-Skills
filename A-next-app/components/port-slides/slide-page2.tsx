"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const MarkmapView = lazy(() => import("./MarkmapView"));
const PodcastPlayer = lazy(() => import("./PodcastPlayer"));
const PPTViewer = lazy(() => import("./PPTViewer"));

const P2 = "/images/page2";
const AUTO_INTERVAL = 3000;

const ALL_CARDS = [
  {
    num: "基础",
    title: "基础框架",
    desc: "基于通用AI搜索链路的基础框架搭建&新能力透传",
    img: `${P2}/screenshot-main.webp`,
    tags: ["首页支持模式&格式选择", "首页宫格场景引导"],
    audience: "搜索 / 全量用户",
    interactionTitle: "基础框架：从提问到可信答案",
    detailRows: [
      ["A", "触发条件", "输入研究问题，并按任务需要选择搜索模式与输出格式。"],
      ["B", "系统响应", "检索公开资料与已有上下文，在回答中同步组织关键证据。"],
      ["C", "交付结果", "输出带引用来源的结构化答案，支持继续追问与深入研究。"],
    ],
    principle: "答案与来源同时可见，让用户既获得结论，也理解结论从哪里来。",
    markmap: false, podcast: false, ppt: false, imgFit: true,
  },
  {
    num: "00",
    title: "深度搜索_多轮",
    desc: "通过多轮推理深化问题认知并进行规划纠偏, 打造完整deep research能力",
    img: `${P2}/screenshot-deep-search.jpg`,
    tags: ["思考过程展示", "二次编辑", "详情展示"],
    audience: "研究 / 复杂任务",
    interactionTitle: "深度搜索：多轮规划与纠偏",
    detailRows: [
      ["A", "触发条件", "面对复杂问题，用户开启深度搜索并补充目标与约束。"],
      ["B", "系统响应", "自动拆解子问题，多轮检索、交叉验证并动态修正计划。"],
      ["C", "交付结果", "沉淀完整研究结论与证据链，支持回看过程和二次编辑。"],
    ],
    principle: "把长任务拆成可理解、可检查的步骤，降低等待中的不确定感。",
    markmap: false, podcast: false, ppt: false, imgFit: true,
  },
  {
    num: "01",
    title: "思维导图",
    desc: "梳理回答的结果框架, 支持多格式下载",
    img: "",
    tags: [],
    audience: "整理 / 结构化表达",
    interactionTitle: "思维导图：把答案变成结构",
    detailRows: [
      ["A", "触发条件", "在搜索结果中切换思维导图，或直接输入需要梳理的主题。"],
      ["B", "系统响应", "提取主题层级、核心观点与关联关系，生成可缩放导图。"],
      ["C", "交付结果", "支持节点浏览、继续扩写及多格式下载，便于复用与分享。"],
    ],
    principle: "不重复答案，而是重新组织信息，让复杂内容可以被快速扫描。",
    markmap: true, podcast: false, ppt: false, imgFit: false,
  },
  {
    num: "02",
    title: "AI.播客",
    desc: "gpt编排脚本, 火山音色, 待调优工程链路",
    img: "",
    tags: [],
    audience: "收听 / 碎片场景",
    interactionTitle: "AI 播客：从文本到可听内容",
    detailRows: [
      ["A", "触发条件", "选择回答或资料生成播客，并设定音色、时长与表达风格。"],
      ["B", "系统响应", "重组口语化脚本、分配角色并合成自然连续的语音内容。"],
      ["C", "交付结果", "生成可试听、续播和下载的音频，保留原文与来源关联。"],
    ],
    principle: "为内容增加新的消费方式，而不是把书面文本机械地朗读出来。",
    markmap: false, podcast: true, ppt: false, imgFit: false,
  },
  {
    num: "03",
    title: "AI.PPT",
    desc: "自动化大纲生成及模板选择, 支持生成导出",
    img: `${P2}/card-ppt-ui.webp`,
    tags: [],
    audience: "演示 / 内容交付",
    interactionTitle: "AI PPT：从大纲到可交付演示",
    detailRows: [
      ["A", "触发条件", "选择研究结果，补充受众、页数、比例与演示目标。"],
      ["B", "系统响应", "生成叙事大纲，匹配模板并逐页组织图文信息层级。"],
      ["C", "交付结果", "支持预览、修改与导出，让结果直接进入汇报场景。"],
    ],
    principle: "先建立叙事逻辑，再生成页面，避免演示文稿只是内容的简单堆叠。",
    markmap: false, podcast: false, ppt: true, imgFit: false,
  },
  {
    num: "04",
    title: "图片Formatting",
    desc: "图文模板规范设计及工程侧文本美化",
    img: `${P2}/card-formatting-long.png`,
    img2: `${P2}/card-formatting-right.png`,
    tags: [],
    audience: "发布 / 图文表达",
    interactionTitle: "图片排版：一键适配发布场景",
    detailRows: [
      ["A", "触发条件", "选择文本内容和目标渠道，指定画布比例与视觉模板。"],
      ["B", "系统响应", "自动拆分信息、匹配图文层级，并进行版式与样式优化。"],
      ["C", "交付结果", "生成适合不同渠道的成套图片，可继续调整并批量导出。"],
    ],
    principle: "把信息结构转换成视觉结构，确保换一种媒介仍然清楚易读。",
    markmap: false, podcast: false, ppt: false, imgFit: true,
  },
];

export default function SlidePage2() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = ALL_CARDS[activeIdx];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imgScrollRef = useRef<HTMLDivElement>(null);
  const userSelected = useRef(false);

  /* ── 自动轮播：用户手动点击后永久停止 ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userSelected.current) return;
      setActiveIdx((i) => (i + 1) % ALL_CARDS.length);
    }, AUTO_INTERVAL);
    return () => clearTimeout(timer);
  }, [activeIdx]);

  useEffect(() => {
    const container = tabScrollRef.current;
    const tab = tabRefs.current[activeIdx];
    if (container && tab) {
      const left = tab.offsetLeft - (container.clientWidth - tab.offsetWidth) / 2;
      container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
    imgScrollRef.current?.scrollTo({ top: 0 });
  }, [activeIdx]);

  const selectTab = (i: number) => {
    userSelected.current = true;
    setActiveIdx(i);
  };

  useEffect(() => {
    const stopIfInteractive = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) e.stopPropagation();
    };
    const panel = panelRef.current;
    panel?.addEventListener("pointerdown", stopIfInteractive);
    return () => panel?.removeEventListener("pointerdown", stopIfInteractive);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#070707" }}>
      <style>{`
        .p2-tab { transition: background 0.18s ease, border-color 0.18s ease; }
        .p2-tab:hover { background: rgba(255,255,255,0.09) !important; }
        .p2-tab-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .p2-tab-scroll::-webkit-scrollbar { display: none; }
        .p2-screenshot {
          display: block;
          width: 100%;
          max-width: 100%;
          height: auto;
          max-height: none;
          flex-shrink: 0;
          transition: opacity 0.25s ease;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: high-quality;
        }
        .p2-img-scroll {
          min-height: 0;
          -webkit-overflow-scrolling: touch;
        }
        .p2-img-scroll--fit {
          overflow: hidden;
          background: #ffffff;
          align-self: stretch;
          height: 100%;
        }
        .p2-img-scroll--fit .p2-img-shot-wrap {
          width: 100%;
          height: 100%;
          background: #ffffff;
        }
        .p2-img-scroll--fit .p2-screenshot {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: top center;
        }
        .p2-img-scroll--fit .p2-img-shot-wrap--duo {
          display: flex;
          flex-direction: row;
          gap: 0;
          padding: 0;
          background: #ffffff;
          box-sizing: border-box;
        }
        .p2-img-scroll--fit .p2-img-shot-wrap--duo .p2-screenshot {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          border-radius: 0;
        }
        .p2-dot-btn { transition: width 0.22s ease, background 0.22s ease; }
        .p2-img-scroll--markmap {
          overflow: hidden;
          align-self: stretch;
          height: 100%;
          min-height: 0;
        }
        .p2-img-scroll--ppt {
          overflow: hidden;
          align-self: stretch;
          height: 100%;
          min-height: 0;
        }
        .p2-img-scroll--podcast {
          overflow: hidden;
          align-self: stretch;
          height: 100%;
          min-height: 0;
        }
        .p2-img-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── 背景光晕 ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: 0, left: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        <div className="absolute" style={{ top: 0, right: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
      </div>

      {/* ── 标题行 ───────────────────────────────────────────────── */}
      <div className="absolute z-10 flex items-baseline gap-[calc(0.83*var(--u))]" style={{ left:"4.17%", top:"9.26%" }}>
        <span>
          <span style={{ color:"#ef3b46", fontSize:"clamp(20px,calc(2.5*var(--u)),36px)", fontFamily:"'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif", lineHeight:"52px", letterSpacing:"1.08px" }}>AI搜</span>
          <span style={{ color:"#FFFFFF", fontSize:"clamp(20px,calc(2.5*var(--u)),36px)", fontFamily:"'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif", lineHeight:"52px", letterSpacing:"1.08px" }}>模式</span>
        </span>
      </div>
      <p className="absolute z-10" style={{ right:"4.17%", top:"11.11%", color:"rgba(255,255,255,0.45)", fontSize:"clamp(11px,calc(1.11*var(--u)),16px)", fontFamily:"'PingFang SC', sans-serif", fontWeight:500, textAlign:"right", lineHeight:1.7, margin:0, whiteSpace:"nowrap" }}>
        基于通用AI搜索链路的基础框架搭建&新能力透传
      </p>

      {/* ══════════════════════════════════════════════════════════════
          ── 全部 6 张 Tab + 单卡片展示区 ────────────────────────────
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={panelRef}
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "17.78%",
          width: "91.67%",
          bottom: "3.33%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* ── Tab 标签行（横向滚动） ─────────────────────────────── */}
        <div
          ref={tabScrollRef}
          className="p2-tab-scroll"
          style={{
            display: "flex",
            gap: 8,
            flexShrink: 0,
            flexWrap: "nowrap",
            overflowX: "auto",
            overflowY: "hidden",
            paddingBottom: 2,
          }}
        >
          {ALL_CARDS.map((card, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={card.num}
                ref={(el) => { tabRefs.current[i] = el; }}
                className="p2-tab"
                onClick={() => selectTab(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "calc(0.42*var(--u))",
                  padding: "calc(0.44*var(--u)) calc(0.83*var(--u))",
                  background: isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "calc(3.33*var(--u))",
                  cursor: "pointer",
                  outline: "none",
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "clamp(16px,calc(1.39*var(--u)),20px)",
                    height: "clamp(16px,calc(1.39*var(--u)),20px)",
                    background: isActive ? "#ef3b46" : "rgba(255,255,255,0.12)",
                    borderRadius: "50%",
                    flexShrink: 0,
                    transition: "background 0.18s ease",
                  }}
                >
                  <span style={{ color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.5)", fontSize:"clamp(6px,calc(0.63*var(--u)),9px)", fontFamily:"'LogoSC Unbounded Sans', sans-serif", lineHeight:1 }}>
                    {card.num}
                  </span>
                </div>
                <span style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.38)", fontSize:"clamp(10px,calc(0.97*var(--u)),14px)", fontFamily:"'Alimama ShuHeiTi', sans-serif", fontWeight:700, lineHeight:1, whiteSpace:"nowrap", transition:"color 0.18s ease" }}>
                  {card.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── 当前卡片展示区 ──────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "calc(0.83*var(--u))",
            boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          {/* 左：截图 / 思维导图 */}
          <div
            ref={imgScrollRef}
            className={`p2-img-scroll${
              active.markmap
                ? " p2-img-scroll--markmap"
                : active.podcast
                  ? " p2-img-scroll--podcast"
                  : active.ppt
                    ? " p2-img-scroll--ppt"
                    : active.imgFit
                      ? " p2-img-scroll--fit"
                      : ""
            }`}
            style={{
              flex: "0 0 64%",
              position: "relative",
              minHeight: 0,
              alignSelf: "stretch",
              overflow: active.markmap || active.podcast || active.ppt ? "hidden" : undefined,
              borderRight: "1px solid rgba(255,255,255,0.06)",
              scrollbarWidth: "none",
            }}
          >
            {active.markmap ? (
              <Suspense fallback={<div style={{ width:"100%", height:"100%", background:"rgba(255,255,255,0.03)" }} />}>
                <MarkmapView />
              </Suspense>
            ) : active.podcast ? (
              <Suspense fallback={<div style={{ width:"100%", height:"100%", background:"rgba(255,255,255,0.03)" }} />}>
                <PodcastPlayer />
              </Suspense>
            ) : active.ppt ? (
              <Suspense fallback={<div style={{ width:"100%", height:"100%", background:"rgba(255,255,255,0.03)" }} />}>
                <PPTViewer />
              </Suspense>
            ) : active.img2 ? (
              <div className="p2-img-shot-wrap p2-img-shot-wrap--duo">
                <img
                  key={active.img}
                  src={active.img}
                  alt=""
                  className="p2-screenshot"
                />
                <img
                  key={active.img2}
                  src={active.img2}
                  alt=""
                  className="p2-screenshot"
                />
              </div>
            ) : (
              <div className="p2-img-shot-wrap">
                <img
                  key={active.img}
                  src={active.img}
                  alt=""
                  className="p2-screenshot"
                />
              </div>
            )}
          </div>

          {/* 右：交互逻辑说明 */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              padding: "clamp(14px,calc(1.67*var(--u)),24px)",
              background: "linear-gradient(180deg, rgba(62,8,8,0.22) 0%, rgba(8,8,8,0.12) 58%, rgba(8,8,8,0.5) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span style={{ color: "#ff4747", fontSize: "clamp(8px,calc(0.76*var(--u)),11px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontWeight: 700, lineHeight: 1.2 }}>
                INTERACTION {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <span style={{ padding: "calc(0.28*var(--u)) calc(0.69*var(--u))", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, color: "rgba(255,255,255,0.42)", fontSize: "clamp(8px,calc(0.76*var(--u)),11px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                {active.audience}
              </span>
            </div>

            <h2 style={{ color: "#FFFFFF", fontSize: "clamp(17px,calc(1.67*var(--u)),24px)", fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", fontWeight: 700, lineHeight: 1.35, letterSpacing: 0, margin: "calc(0.83*var(--u)) 0 0" }}>
              {active.interactionTitle}
            </h2>

            <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "calc(1.11*var(--u)) 0 calc(0.42*var(--u))" }} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {active.detailRows.map(([letter, label, content]) => (
                <div
                  key={letter}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "clamp(14px,calc(1.25*var(--u)),18px) clamp(52px,calc(5*var(--u)),72px) minmax(0,1fr)",
                    alignItems: "start",
                    columnGap: "calc(0.56*var(--u))",
                    padding: "calc(0.76*var(--u)) 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ color: "#ff4747", fontSize: "clamp(8px,calc(0.76*var(--u)),11px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontWeight: 700, lineHeight: 1.65 }}>
                    {letter}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(10px,calc(0.97*var(--u)),14px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, lineHeight: 1.65 }}>
                    {label}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.66)", fontSize: "clamp(10px,calc(0.9*var(--u)),13px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.65 }}>
                    {content}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "auto", padding: "calc(0.83*var(--u)) calc(0.97*var(--u))", borderLeft: "2px solid #e92f2f", background: "linear-gradient(90deg, rgba(125,17,17,0.28), rgba(125,17,17,0.04))" }}>
              <span style={{ display: "block", color: "rgba(255,255,255,0.35)", fontSize: "clamp(7px,calc(0.69*var(--u)),10px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontWeight: 700, lineHeight: 1.2, marginBottom: "calc(0.35*var(--u))" }}>
                DESIGN PRINCIPLE
              </span>
              <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "clamp(9px,calc(0.9*var(--u)),13px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.55, margin: 0 }}>
                {active.principle}
              </p>
            </div>

            {/* 分页指示点 */}
            <div style={{ display:"flex", gap:6, paddingTop:"calc(0.76*var(--u))" }}>
              {ALL_CARDS.map((_, i) => (
                <button
                  key={i}
                  className="p2-dot-btn"
                  onClick={() => selectTab(i)}
                  style={{
                    width: i === activeIdx ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === activeIdx ? "#ef3b46" : "rgba(255,255,255,0.18)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
