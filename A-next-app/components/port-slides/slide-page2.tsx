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
    markmap: false, podcast: false, ppt: false, imgFit: true,
  },
  {
    num: "00",
    title: "深度搜索_多轮",
    desc: "通过多轮推理深化问题认知并进行规划纠偏, 打造完整deep research能力",
    img: `${P2}/screenshot-deep-search.png`,
    tags: ["思考过程展示", "二次编辑", "详情展示"],
    markmap: false, podcast: false, ppt: false, imgFit: true,
  },
  {
    num: "01",
    title: "思维导图",
    desc: "梳理回答的结果框架, 支持多格式下载",
    img: "",
    tags: [],
    markmap: true, podcast: false, ppt: false, imgFit: false,
  },
  {
    num: "02",
    title: "AI.播客",
    desc: "gpt编排脚本, 火山音色, 待调优工程链路",
    img: "",
    tags: [],
    markmap: false, podcast: true, ppt: false, imgFit: false,
  },
  {
    num: "03",
    title: "AI.PPT",
    desc: "自动化大纲生成及模板选择, 支持生成导出",
    img: `${P2}/card-ppt-ui.png`,
    tags: [],
    markmap: false, podcast: false, ppt: true, imgFit: false,
  },
  {
    num: "04",
    title: "图片Formatting",
    desc: "图文模板规范设计及工程侧文本美化",
    img: `${P2}/card-formatting-long.png`,
    img2: `${P2}/card-formatting-right.png`,
    tags: [],
    markmap: false, podcast: false, ppt: false, imgFit: true,
  },
];

export default function SlidePage2() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = ALL_CARDS[activeIdx];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
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
    tabRefs.current[activeIdx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="absolute inset-0 h-full w-full" viewBox="0 0 1443 1081.5" preserveAspectRatio="none">
          <path d="M62,1081.5L61,1081.5L61,61.5L62,61.5L62,1081.5ZM461,61.5L462,61.5L462,1081.5L461,1081.5L461,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04"/>
          <path d="M522,1081.5L521,1081.5L521,61.5L522,61.5L522,1081.5ZM921,61.5L922,61.5L922,1081.5L921,1081.5L921,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04"/>
          <path d="M982,1081.5L981,1081.5L981,61.5L982,61.5L982,1081.5ZM1381,61.5L1382,61.5L1382,1081.5L1381,1081.5L1381,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04"/>
          <rect x="0.75" y="0.75" width="1441.5" height="61.5" rx="0" fillOpacity="0" strokeOpacity="0.08" stroke="#FFFFFF" fill="none" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left:"4.17%", top:"1.48%", width:"91.67%", height:"3.33%" }}>
        <img loading="lazy" decoding="async" src={"/images/logo-new.webp"} alt="" className="absolute left-0 top-0 h-full object-contain" style={{ width:"5.97%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7*var(--u))]">
          <p style={{ color:"rgba(255,255,255,0.38)", fontSize:"clamp(12px,calc(1.67*var(--u)),24px)", fontFamily:"'LogoSC Unbounded Sans', sans-serif", textAlign:"right", lineHeight:1.4, margin:0, whiteSpace:"nowrap" }}>
            专业研究场景1: AI搜 / 02
          </p>
        </div>
        <div className="absolute" style={{ left:"7.5%", top:"-2.6%" }}>
          <div style={{ border:"1px solid rgba(255,255,255,0.22)", padding:"calc(0.3*var(--u)) calc(0.8*var(--u))", transform:"rotate(-1deg)" }}>
            <p style={{ fontFamily:"'LogoSC Unbounded Sans', sans-serif", fontSize:"clamp(10px,calc(1.1*var(--u)),16px)", lineHeight:1.4, margin:0, color:"rgba(255,255,255,0.55)" }}>
              2024 / 2025
            </p>
          </div>
        </div>
      </div>

      {/* ── 标题行 ───────────────────────────────────────────────── */}
      <div className="absolute z-10 flex items-baseline gap-[calc(0.83*var(--u))]" style={{ left:"4.17%", top:"9.26%" }}>
        <span>
          <span style={{ backgroundImage:"linear-gradient(90deg,#5C5CFF 0%,#AE5CFF 100%)", backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontSize:"clamp(20px,calc(2.5*var(--u)),36px)", fontFamily:"'LogoSC Unbounded Sans', sans-serif", lineHeight:"52px", letterSpacing:"1.08px" }}>AI搜</span>
          <span style={{ color:"#FFFFFF", fontSize:"clamp(20px,calc(2.5*var(--u)),36px)", fontFamily:"'LogoSC Unbounded Sans', sans-serif", lineHeight:"52px", letterSpacing:"1.08px" }}>模式</span>
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
                    background: isActive ? "#D1FB39" : "rgba(255,255,255,0.12)",
                    borderRadius: "50%",
                    flexShrink: 0,
                    transition: "background 0.18s ease",
                  }}
                >
                  <span style={{ color: isActive ? "#1F1F1F" : "rgba(255,255,255,0.5)", fontSize:"clamp(6px,calc(0.63*var(--u)),9px)", fontFamily:"'LogoSC Unbounded Sans', sans-serif", lineHeight:1 }}>
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

          {/* 右：信息面板 */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"clamp(16px,calc(2.22*var(--u)),32px) clamp(16px,calc(2.22*var(--u)),32px)", gap:"calc(0.83*var(--u))" }}>

            {/* 编号 + 标题 */}
            <div style={{ display:"flex", alignItems:"center", gap:"calc(0.56*var(--u))" }}>
              <div style={{ width:"clamp(20px,calc(2*var(--u)),28px)", height:"clamp(20px,calc(2*var(--u)),28px)", background:"#D1FB39", borderRadius:"66.67px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ color:"#1F1F1F", fontSize:"clamp(7px,calc(0.8*var(--u)),11px)", fontFamily:"'LogoSC Unbounded Sans', sans-serif", lineHeight:1 }}>
                  {active.num}
                </span>
              </div>
              <span style={{ color:"rgba(255,255,255,0.92)", fontSize:"clamp(13px,calc(1.39*var(--u)),20px)", fontFamily:"'Alimama ShuHeiTi', sans-serif", fontWeight:700, lineHeight:1.3 }}>
                {active.title}
              </span>
            </div>

            {/* 描述 */}
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"clamp(10px,calc(1.04*var(--u)),15px)", fontFamily:"'PingFang SC', sans-serif", lineHeight:1.7, margin:0 }}>
              {active.desc}
            </p>

            {/* Tags（仅当有标签时显示）*/}
            {active.tags.length > 0 && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:"calc(0.42*var(--u))", marginTop:"calc(0.28*var(--u))" }}>
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding:"calc(0.28*var(--u)) calc(0.69*var(--u))",
                      background:"rgba(31,31,31,1)",
                      border:"1px solid rgba(255,255,255,0.18)",
                      borderRadius:"calc(2.78*var(--u))",
                      color:"rgba(255,255,255,0.65)",
                      fontSize:"clamp(9px,calc(0.9*var(--u)),13px)",
                      fontFamily:"'Alimama ShuHeiTi', sans-serif",
                      fontWeight:700,
                      lineHeight:1,
                      whiteSpace:"nowrap",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 分页指示点 */}
            <div style={{ display:"flex", gap:6, marginTop:"auto", paddingTop:8 }}>
              {ALL_CARDS.map((_, i) => (
                <button
                  key={i}
                  className="p2-dot-btn"
                  onClick={() => selectTab(i)}
                  style={{
                    width: i === activeIdx ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === activeIdx ? "#D1FB39" : "rgba(255,255,255,0.18)",
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
