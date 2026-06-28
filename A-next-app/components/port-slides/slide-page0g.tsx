"use client";

const G = "/images/page0g";

// ─── Data ─────────────────────────────────────────────────────────────────────

type OutputCard = {
  title: string;
  desc: string;
  icon: string;
  previewStyle: "cover" | "tall" | "wide";
  preview: string;
  previewCss?: React.CSSProperties;
  /** quiz card only: extra overlay on top of preview */
  overlay?: { src: string; css: React.CSSProperties };
};

const CARDS: OutputCard[] = [
  {
    title: "PPT",
    desc: "增加首尾页/支持输入演讲稿/提升信息丰富度",
    icon: `${G}/ppt-icon.svg`,
    previewStyle: "cover",
    preview: `${G}/ppt-preview.png`,
  },
  {
    title: "视频",
    desc: "应用 HappyHorse 生成视频，让讲解画面动起来",
    icon: `${G}/video-icon.png`,
    previewStyle: "cover",
    preview: `${G}/video-preview.png`,
  },
  {
    title: "信息图",
    desc: "支持极简/卡通/科技更多风格和尺寸选择",
    icon: `${G}/infographic-icon.svg`,
    previewStyle: "tall",
    preview: `${G}/infographic-preview.png`,
    previewCss: { height: "124.64%", left: "-0.12%", top: "-0.14%", width: "100%" },
  },
  {
    title: "报告",
    desc: "支持深度研报/文献综述/影子审稿/学习指南",
    icon: `${G}/report-icon.svg`,
    previewStyle: "tall",
    preview: `${G}/report-preview.png`,
    previewCss: { height: "264.38%", left: "0", top: "0.12%", width: "100%" },
  },
  {
    title: "思维脑图",
    desc: "优化输出信息密度，更具信息概括性",
    icon: `${G}/mindmap-icon.svg`,
    previewStyle: "tall",
    preview: `${G}/mindmap-preview.png`,
    previewCss: { height: "164.35%", left: "-15.92%", top: "-32.17%", width: "131.84%" },
  },
  {
    title: "测验",
    desc: "支持自动出题 / 检验理解程度 / 巩固学习效果",
    icon: `${G}/quiz-icon.svg`,
    previewStyle: "cover",
    preview: `${G}/ppt-preview.png`,
    overlay: {
      src: `${G}/quiz-preview.png`,
      css: { height: "284.17%", left: "0", top: "-0.03%", width: "100%" },
    },
  },
];

// ─── Card component ────────────────────────────────────────────────────────────

function OutputCardView({ card }: { card: OutputCard }) {
  return (
    <div
      style={{
        background: "rgba(10,10,10,0.5)",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "17px 13px",
        overflow: "hidden",
        position: "relative",
        flex: 1,
        minWidth: 0,
        minHeight: 0,
      }}
    >
      {/* Icon + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{ width: 24, height: 24, borderRadius: 3, overflow: "hidden", flexShrink: 0, position: "relative" }}>
          <img
            src={card.icon}
            alt=""
            draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#fff",
            lineHeight: "33px",
            whiteSpace: "nowrap",
          }}
        >
          {card.title}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: "rgba(255,255,255,0.45)",
          lineHeight: "24px",
          margin: 0,
          flexShrink: 0,
        }}
      >
        {card.desc}
      </p>

      {/* Preview image area */}
      <div style={{ flex: "1 0 0", minHeight: 1, position: "relative", overflow: "hidden" }}>
        {card.previewStyle === "cover" && !card.overlay && (
          <img
            src={card.preview}
            alt=""
            draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
          />
        )}
        {card.previewStyle !== "cover" && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img
              src={card.preview}
              alt=""
              draggable={false}
              style={{ position: "absolute", maxWidth: "none", pointerEvents: "none", ...card.previewCss }}
            />
          </div>
        )}
        {/* Quiz card: cover base + overlay */}
        {card.previewStyle === "cover" && card.overlay && (
          <>
            <img
              src={card.preview}
              alt=""
              draggable={false}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
            />
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <img
                src={card.overlay.src}
                alt=""
                draggable={false}
                style={{ position: "absolute", maxWidth: "none", pointerEvents: "none", ...card.overlay.css }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SlidePage0g() {
  const GRID_TOP = 233;
  const GRID_LEFT = 24;
  const GRID_W = 1392;
  const GRID_H = 692;

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
          top: 84,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              fontSize: 13,
              color: "rgba(200,8,8,0.85)",
              letterSpacing: 2,
            }}
          >
            03
          </span>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 3 }}>
            LLM WIKI 核心操作动线
          </span>
        </div>
        <p
          style={{
            fontWeight: 600,
            fontSize: 44,
            color: "#fff",
            lineHeight: "51.92px",
            letterSpacing: 0.5,
            margin: 0,
          }}
        >
          4.多模态输出
        </p>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            lineHeight: "25.2px",
            margin: 0,
            textAlign: "center",
            width: 778,
            whiteSpace: "normal",
          }}
        >
          原始资料流入编译引擎，编译生成彼此关联的 Wiki 节点。点击任意节点，查看它的上位与关联关系。
        </p>
      </div>

      {/* ── 3×2 Card Grid ── */}
      <div
        style={{
          position: "absolute",
          top: GRID_TOP,
          left: GRID_LEFT,
          width: GRID_W,
          height: GRID_H,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 12,
          zIndex: 10,
        }}
      >
        {CARDS.map((card) => (
          <OutputCardView key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}
