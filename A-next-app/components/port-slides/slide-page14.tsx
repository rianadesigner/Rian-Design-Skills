const P14 = "/images/page14";

const cards = [
  {
    title: "1.匹配业务的创建能力",
    desc: "长耗时数据流转和数据编排",
    screenshot: "card1-screenshot.webp",
    detail: "card1-icons.webp",
    detailStyle: { width: "70.62%", height: "auto", objectFit: "cover" as const, borderRadius: "6px" },
  },
  {
    title: "2.如何引入外部能力",
    desc: "支持查看并拖入相关星/MCP",
    screenshot: "card2-screenshot.webp",
    screenshotFit: "contain" as const,
    detail: "card2-detail.webp",
    detailStyle: { width: "63.47%", height: "auto", objectFit: "contain" as const },
  },
  {
    title: "3.快捷搭建工作流框架",
    desc: "节点流转/运行状态显示说明",
    screenshot: "card3-screenshot.webp",
    detail: "card3-detail.webp",
    detailStyle: { width: "64.61%", height: "auto", objectFit: "contain" as const },
  },
  {
    title: "4.多种执行态展示",
    desc: "实时流程及单卡片状态",
    screenshot: "card4-screenshot.webp",
    detail: "card4-detail.webp",
    detailStyle: { width: "70.45%", height: "auto", objectFit: "contain" as const },
  },
];

export default function SlidePage14() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* ── 深色底 + 红光晕 ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: 0, left: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        <div className="absolute" style={{ top: 0, right: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
      </div>



      {/* ── Title ────────────────────────────────────────────────── */}
      <span className="absolute z-10" style={{ left: "4.17%", top: "9.26%" }}>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          如何创建
        </span>
        <span
          style={{
            backgroundImage: "linear-gradient(135deg, #5C5CFF 0%, #AE5CFF 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          工作流
        </span>
      </span>

      {/* ── Subtitle ─────────────────────────────────────────────── */}
      <p
        className="absolute z-10"
        style={{
          right: "4.17%",
          top: "11.11%",
          color: "rgba(255,255,255,0.72)",
          fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)",
          fontFamily: "'PingFang SC', sans-serif",
          fontWeight: 500,
          textAlign: "right",
          lineHeight: 1.7,
          margin: 0,
          maxWidth: "45%",
        }}
      >
        可视化的工作流编排工具: 允许用户通过拖拽节点和连线，来快速构建复杂的业务流程
      </p>

      {/* ── Cards Grid ───────────────────────────────────────────── */}
      <div
        className="absolute z-10 grid grid-cols-2"
        style={{
          left: "4.17%",
          top: "16.67%",
          width: "91.67%",
          bottom: "3.33%",
          gridTemplateRows: "1fr 1fr",
          gap: "clamp(12px, calc(1.67 * var(--u)), 24px) clamp(12px, calc(1.67 * var(--u)), 24px)",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden"
            style={{
              padding: "clamp(8px, calc(1.11 * var(--u)), 16px)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
              gap: "clamp(8px, calc(1.11 * var(--u)), 16px)",
            }}
          >
            {/* Screenshot */}
            <div
              className="w-full overflow-hidden"
              style={{
                flex: "1 1 0",
                minHeight: 0,
                borderRadius: "9px",
                background: "#FAFBFC",
              }}
            >
              <img
                src={`${P14}/${card.screenshot}`}
                alt=""
                className="w-full h-full"
                style={{ objectFit: card.screenshotFit || "cover", objectPosition: "center" }}
              />
            </div>
            {/* Info row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col" style={{ gap: "clamp(4px, calc(0.56 * var(--u)), 8px)" }}>
                <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
                  {card.title}
                </span>
                <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.3 }}>
                  {card.desc}
                </span>
              </div>
              <img
                src={`${P14}/${card.detail}`}
                alt=""
                style={card.detailStyle}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
