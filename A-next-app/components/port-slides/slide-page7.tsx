const P7 = "/images/page7";

const tags = ["AI搜/高级研究", "个人知识库", "知识社区", "任务&会员体系"];

export default function SlidePage7() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── 白色底层 + 装饰背景 ─────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute" style={{ left: "-1%", top: "3.4%" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-[116vh] w-[calc(112 * var(--u))] opacity-50" viewBox="0 0 1620 1259">
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
        <img src={`${P7}/bg-outer.png`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img src={`${P7}/logo.svg`} alt="" className="absolute left-0 top-0 h-full object-contain" style={{ width: "5.97%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7 * var(--u))]">
          <img src={`${P7}/avatar.png`} alt="" className="h-full aspect-square object-cover" />
          <p style={{ color: "#8C8C8C", fontSize: "clamp(12px, calc(1.67 * var(--u)), 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            移动端：&nbsp;&nbsp;面向碎片化日常消费场景 / 07
          </p>
        </div>
        <div className="absolute" style={{ left: "7.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid #8C8C8C", padding: "calc(0.3 * var(--u)) calc(0.8 * var(--u))", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, calc(1.1 * var(--u)), 16px)", lineHeight: 1.4, margin: 0 }}>
              2024 / 2025
            </p>
          </div>
        </div>
      </div>

      {/* ── 左侧：黄色 App Icon ──────────────────────────────────── */}
      <div
        className="absolute z-10"
        style={{
          left: "8.33%",
          top: "14.81%",
          width: "clamp(36px, calc(4.17 * var(--u)), 60px)",
          height: "clamp(36px, calc(4.17 * var(--u)), 60px)",
          background: "linear-gradient(135deg, #7B8CFF 0%, #A78BFA 100%)",
          borderRadius: "clamp(10px, calc(1.25 * var(--u)), 18px)",
          boxShadow: "0px 18px 16.8px 0px rgba(123,140,255,0.25)",
        }}
      >
        <img src={`${P7}/app-icon.svg`} alt="" className="absolute inset-[10%] w-[80%] h-[80%] object-contain" />
      </div>

      {/* ── 左侧：文字内容 ──────────────────────────────────────── */}
      <div
        className="absolute z-10 flex flex-col"
        style={{
          left: "8.33%",
          top: "23.15%",
          width: "38.89%",
          gap: "clamp(8px, calc(0.83 * var(--u)), 12px)",
        }}
      >
        <p
          style={{
            color: "#1F1F1F",
            fontSize: "clamp(16px, calc(1.94 * var(--u)), 28px)",
            fontFamily: "'PingFang SC', sans-serif",
            fontWeight: 600,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          移动端（日常使用场景）
        </p>
        <p
          style={{
            color: "#8C8C8C",
            fontSize: "clamp(12px, calc(1.39 * var(--u)), 20px)",
            fontFamily: "'PingFang SC', sans-serif",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          面向碎片化用户使用场景
          <br />
          强调轻量化工具接入、即时信息记录、AI兴趣社区等高频场景。
        </p>
        <div className="flex flex-wrap gap-[6px]">
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 12px",
                background: "#FBFBFB",
                borderRadius: "66.67px",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  color: "#1F1F1F",
                  fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)",
                  fontFamily: "'PingFang SC', sans-serif",
                  fontWeight: 600,
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 左侧：玻璃卡片 (视觉风格/IP设计/趣味icon) ────────── */}
      <div
        className="absolute z-10 flex flex-col"
        style={{
          left: "8.33%",
          top: "48.7%",
          width: "38.89%",
          background: "rgba(255,255,255,0.2)",
          border: "1px solid #FFFFFF",
          borderRadius: "clamp(10px, calc(1.25 * var(--u)), 18px)",
          boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.06)",
          padding: "clamp(12px, calc(1.39 * var(--u)), 20px)",
          gap: "clamp(16px, calc(2.08 * var(--u)), 30px)",
        }}
      >
        {/* 视觉风格 */}
        <div className="flex flex-col" style={{ gap: "clamp(8px, calc(0.83 * var(--u)), 12px)" }}>
          <span style={{ color: "#000000", fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.7 }}>
            · 视觉风格
          </span>
          <span style={{ color: "#434343", fontSize: "clamp(10px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
            以年轻化、富有互动性的视觉表达，创造即时且直观的愉悦感。
          </span>
        </div>
        {/* IP设计 */}
        <div className="flex flex-col" style={{ gap: "clamp(4px, calc(0.56 * var(--u)), 8px)" }}>
          <span style={{ color: "#000000", fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.7 }}>
            · IP设计（主题衍生应用不同场景）
          </span>
          <img src={`${P7}/ip-themes.png`} alt="" style={{ width: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <img src={`${P7}/ip-scenes.png`} alt="" style={{ width: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
        {/* 趣味icon */}
        <div className="flex flex-col" style={{ gap: "clamp(4px, calc(0.56 * var(--u)), 8px)" }}>
          <span style={{ color: "#000000", fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.7 }}>
            · 趣味icon设计（打磨设计细节）
          </span>
          <img src={`${P7}/icons-strip.png`} alt="" style={{ width: "100%", objectFit: "contain" }} />
        </div>
      </div>

      {/* ── 右侧：手机 Mockup ────────────────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          right: "8.33%",
          top: "10%",
          maxWidth: "440px",
          width: "calc(30 * var(--u))",
          bottom: 0,
        }}
      >
        <img
          src={`${P7}/phone-screenshot.png`}
          alt=""
          className="w-full"
          style={{ objectPosition: "center top" }}
        />
      </div>

      {/* ── Tooltip 气泡 ─────────────────────────────────────────── */}
      <TooltipBalloon label="积分展示" style={{ right: "4%", top: "17%" }} arrowDirection="left" />
      <TooltipBalloon label="互动提升亲密度" style={{ right: "4%", top: "23%" }} arrowDirection="left" />
      <TooltipBalloon label="魔法工具箱" style={{ right: "28%", top: "38%" }} arrowDirection="top" />
      <TooltipBalloon label="用户首次提问" style={{ left: "60%", top: "68%" }} arrowDirection="right" />
      <TooltipBalloon label="趣味icon" style={{ right: "7%", top: "88%" }} arrowDirection="left" />
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
  arrowDirection: "right" | "bottom" | "left" | "top";
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
          color: "#1F1F1F",
          fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)",
          fontFamily: "'Alimama ShuHeiTi', sans-serif",
          fontWeight: 700,
          lineHeight: 1.5,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {arrowDirection === "right" && (
        <div style={{ position: "absolute", width: "8px", height: "8px", background: "#FFFFFF", borderTop: "1px dashed #E4E6ED", borderRight: "1px dashed #E4E6ED", transform: "rotate(45deg)", right: "-5px", top: "calc(50% - 4px)" }} />
      )}
      {arrowDirection === "left" && (
        <div style={{ position: "absolute", width: "8px", height: "8px", background: "#FFFFFF", borderBottom: "1px dashed #E4E6ED", borderLeft: "1px dashed #E4E6ED", transform: "rotate(45deg)", left: "-5px", top: "calc(50% - 4px)" }} />
      )}
      {arrowDirection === "bottom" && (
        <div style={{ position: "absolute", width: "8px", height: "8px", background: "#FFFFFF", borderBottom: "1px dashed #E4E6ED", borderRight: "1px dashed #E4E6ED", transform: "rotate(45deg)", left: "calc(50% - 4px)", bottom: "-5px" }} />
      )}
      {arrowDirection === "top" && (
        <div style={{ position: "absolute", width: "8px", height: "8px", background: "#FFFFFF", borderTop: "1px dashed #E4E6ED", borderLeft: "1px dashed #E4E6ED", transform: "rotate(45deg)", left: "calc(50% - 4px)", top: "-5px" }} />
      )}
    </div>
  );
}
