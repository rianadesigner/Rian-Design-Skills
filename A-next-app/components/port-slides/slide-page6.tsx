const P6 = "/images/page6";

export default function SlidePage6() {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── 白色底层 + 装饰背景 ─────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute" style={{ left: "-1%", top: "3.4%" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-[116vh] w-[112vw] opacity-50" viewBox="0 0 1620 1259">
              <rect x="0" y="0" width="1620" height="1259" fill="#DEE1E6" />
              <ellipse cx="816" cy="857.5" rx="1020.5" ry="1020.5" fill="#2A5BFE" />
              <ellipse cx="816" cy="-769.5" rx="2085.5" ry="2085.5" fill="#F600A7" filter="blur(300px)" />
              <ellipse cx="816" cy="-973.5" rx="2085.5" ry="2085.5" fill="#EF5D43" filter="blur(160px)" />
              <ellipse cx="816" cy="-973.5" rx="2085.5" ry="2085.5" fill="#FFB624" filter="blur(160px)" />
              <ellipse cx="803.5" cy="-1243.5" rx="2085.5" ry="2085.5" fill="#FEFB86" filter="blur(160px)" />
              <ellipse cx="803.5" cy="-1243.5" rx="2085.5" ry="2085.5" fill="#FFFFFF" filter="blur(160px)" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-full w-full" viewBox="0 0 1443 1081.5" preserveAspectRatio="none">
            <path d="M62,1081.5L61,1081.5L61,61.5L62,61.5L62,1081.5ZM461,61.5L462,61.5L462,1081.5L461,1081.5L461,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <path d="M522,1081.5L521,1081.5L521,61.5L522,61.5L522,1081.5ZM921,61.5L922,61.5L922,1081.5L921,1081.5L921,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <path d="M982,1081.5L981,1081.5L981,61.5L982,61.5L982,1081.5ZM1381,61.5L1382,61.5L1382,1081.5L1381,1081.5L1381,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <rect x="0.75" y="0.75" width="1441.5" height="61.5" rx="0" fillOpacity="0" strokeOpacity="0.5" stroke="#FFFFFF" fill="none" strokeWidth="1.5" />
          </svg>
        </div>
        <img src={`${P6}/bg-outer.png`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img src={`${P6}/logo.svg`} alt="" className="absolute left-0 top-0 h-full object-contain" style={{ width: "5.97%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[0.7vw]">
          <img src={`${P6}/avatar.png`} alt="" className="h-full aspect-square object-cover" />
          <p style={{ color: "#8C8C8C", fontSize: "clamp(12px, 1.67vw, 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            专业研究场景3:&nbsp;&nbsp;学术阅读 / 06
          </p>
        </div>
        <div className="absolute" style={{ left: "7.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid #8C8C8C", padding: "0.3vw 0.8vw", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, 1.1vw, 16px)", lineHeight: 1.4, margin: 0 }}>
              2024 / 2025
            </p>
          </div>
        </div>
      </div>

      {/* ── 标题：专业 学术阅读 ──────────────────────────────────── */}
      <span className="absolute z-10" style={{ left: "4.17%", top: "9.26%" }}>
        <span
          style={{
            color: "#1F1F1F",
            fontSize: "clamp(20px, 2.5vw, 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          专业
        </span>
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #5C5CFF 0%, #AE5CFF 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(20px, 2.5vw, 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          学术阅读
        </span>
      </span>

      {/* ── 副标题 (右侧对齐) ────────────────────────────────────── */}
      <p
        className="absolute z-10"
        style={{
          right: "4.17%",
          top: "11.11%",
          color: "#434343",
          fontSize: "clamp(11px, 1.11vw, 16px)",
          fontFamily: "'PingFang SC', sans-serif",
          fontWeight: 500,
          textAlign: "right",
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        严谨的学术阅读能力：支持从问答到知识图谱的完整链路
      </p>

      {/* ── 全屏截图 (学术搜索) ──────────────────────────────────── */}
      <img
        src={`${P6}/screenshot-main.png`}
        alt=""
        className="absolute z-0"
        style={{
          left: 0,
          top: "16.67%",
          width: "100%",
          bottom: 0,
          objectFit: "cover",
          objectPosition: "center top",
          border: "2px solid #F0F3FF",
          borderTopLeftRadius: "0.83vw",
          borderTopRightRadius: "0.83vw",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
        }}
      />

      {/* ── 外部 Tooltip 气泡 ────────────────────────────────────── */}
      <TooltipBalloon label="文件管理" style={{ left: "3.61%", top: "33%" }} arrowDirection="left" />
      <TooltipBalloon label="快捷AI辅助" style={{ left: "14.17%", top: "58.06%" }} arrowDirection="right" />
      <TooltipBalloon label="学术小助手" style={{ left: "75.49%", top: "20.83%" }} arrowDirection="bottom" />

      {/* ── 底部白色卡片 ─────────────────────────────────────────── */}
      <div
        className="absolute z-10"
        style={{
          left: "3.33%",
          top: "64.07%",
          width: "93.33%",
          bottom: 0,
          background: "#FFFFFF",
          borderRadius: "0.83vw",
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {/* 左侧截图 */}
        <img
          src={`${P6}/card-left.png`}
          alt=""
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: "49.55%",
            height: "97%",
            objectFit: "cover",
            objectPosition: "center top",
            border: "1px solid #F0F3FF",
          }}
        />
        {/* 右侧截图 */}
        <img
          src={`${P6}/card-right.png`}
          alt=""
          className="absolute"
          style={{
            left: "50.45%",
            top: 0,
            width: "49.55%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            border: "1px solid #F0F3FF",
          }}
        />

        {/* 卡片内 Tooltip */}
        <TooltipBalloon label="海量公开学术库" style={{ left: "24.32%", top: "3.79%" }} arrowDirection="left" />
        <TooltipBalloon label="搜索到精读" style={{ left: "24.32%", top: "40.73%" }} arrowDirection="bottom" />
        <TooltipBalloon label="排序/筛选/相关性推荐" style={{ left: "61.39%", top: "12.56%" }} arrowDirection="left" />
      </div>
    </div>
  );
}

function TooltipBalloon({
  label,
  style,
  arrowDirection,
}: {
  label: string;
  style: React.CSSProperties;
  arrowDirection: "right" | "bottom" | "left";
}) {
  return (
    <div
      className="absolute z-20"
      style={{
        ...style,
        padding: "6px 12px",
        background: "#FFFFFF",
        border: "1px dashed #E4E6ED",
        borderRadius: "6px",
        boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
      }}
    >
      <span
        style={{
          color: "#434343",
          fontSize: "clamp(9px, 0.83vw, 12px)",
          fontFamily: "'Alimama ShuHeiTi', sans-serif",
          fontWeight: 700,
          lineHeight: 1.5,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {arrowDirection === "right" && (
        <div
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "#FFFFFF",
            borderTop: "1px dashed #E4E6ED",
            borderRight: "1px dashed #E4E6ED",
            transform: "rotate(45deg)",
            right: "-5px",
            top: "calc(50% - 4px)",
          }}
        />
      )}
      {arrowDirection === "left" && (
        <div
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "#FFFFFF",
            borderBottom: "1px dashed #E4E6ED",
            borderLeft: "1px dashed #E4E6ED",
            transform: "rotate(45deg)",
            left: "-5px",
            top: "calc(50% - 4px)",
          }}
        />
      )}
      {arrowDirection === "bottom" && (
        <div
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "#FFFFFF",
            borderBottom: "1px dashed #E4E6ED",
            borderRight: "1px dashed #E4E6ED",
            transform: "rotate(45deg)",
            left: "calc(50% - 4px)",
            bottom: "-5px",
          }}
        />
      )}
    </div>
  );
}
