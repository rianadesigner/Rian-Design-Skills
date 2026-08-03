const P7 = "/images/page7";

const tags = ["AI搜/高级研究", "个人知识库", "知识社区", "任务&会员体系"];

export default function SlidePage7() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* ── 深色底 + 红光晕 ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: 0, left: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        <div className="absolute" style={{ top: 0, right: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
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
        <h1 style={{ margin: 0, lineHeight: "52px", whiteSpace: "nowrap" }}>
          <span
            style={{
              color: "#ef3b46",
              fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              letterSpacing: "1.08px",
            }}
          >
            移动端
          </span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              letterSpacing: "1.08px",
            }}
          >
            （日常使用场景）
          </span>
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.38)",
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
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: "66.67px",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.72)",
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

      {/* ── 左侧：视觉风格 / IP 设计 / 趣味 Icon ─────────────── */}
      <div
        className="absolute z-10 flex flex-col"
        style={{
          left: "8.33%",
          top: "48.7%",
          width: "38.89%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "clamp(10px, calc(1.25 * var(--u)), 18px)",
          boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.4)",
          padding: "clamp(12px, calc(1.39 * var(--u)), 20px)",
          gap: "clamp(16px, calc(2.08 * var(--u)), 30px)",
        }}
      >
        <div className="flex flex-col" style={{ gap: "clamp(8px, calc(0.83 * var(--u)), 12px)" }}>
          <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.7 }}>
            · 视觉风格
          </span>
          <span style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(10px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
            以年轻化、富有互动性的视觉表达，创造即时且直观的愉悦感。
          </span>
        </div>

        <div className="flex flex-col" style={{ gap: "clamp(4px, calc(0.56 * var(--u)), 8px)" }}>
          <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.7 }}>
            · IP设计（主题衍生应用不同场景）
          </span>
          <img loading="lazy" decoding="async" src={`${P7}/ip-themes.webp`} alt="" style={{ width: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <img loading="lazy" decoding="async" src={`${P7}/ip-scenes.webp`} alt="" style={{ width: "100%", objectFit: "cover", objectPosition: "center top", filter: "invert(1)" }} />
        </div>

        <div className="flex flex-col" style={{ gap: "clamp(4px, calc(0.56 * var(--u)), 8px)" }}>
          <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.7 }}>
            · 趣味icon设计（打磨设计细节）
          </span>
          <img loading="lazy" decoding="async" src={`${P7}/icons-strip.png`} alt="" style={{ width: "100%", objectFit: "contain", filter: "invert(1)" }} />
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
          src={`${P7}/phone-screenshot.webp`}
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
        background: "rgba(20,20,20,0.85)",
        border: "1px dashed rgba(255,255,255,0.2)",
        borderRadius: "6px",
        boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <span
        style={{
          color: "rgba(255,255,255,0.8)",
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
        <div style={{ position: "absolute", width: "8px", height: "8px", background: "rgba(20,20,20,0.85)", borderTop: "1px dashed rgba(255,255,255,0.2)", borderRight: "1px dashed rgba(255,255,255,0.2)", transform: "rotate(45deg)", right: "-5px", top: "calc(50% - 4px)" }} />
      )}
      {arrowDirection === "left" && (
        <div style={{ position: "absolute", width: "8px", height: "8px", background: "rgba(20,20,20,0.85)", borderBottom: "1px dashed rgba(255,255,255,0.2)", borderLeft: "1px dashed rgba(255,255,255,0.2)", transform: "rotate(45deg)", left: "-5px", top: "calc(50% - 4px)" }} />
      )}
      {arrowDirection === "bottom" && (
        <div style={{ position: "absolute", width: "8px", height: "8px", background: "rgba(20,20,20,0.85)", borderBottom: "1px dashed rgba(255,255,255,0.2)", borderRight: "1px dashed rgba(255,255,255,0.2)", transform: "rotate(45deg)", left: "calc(50% - 4px)", bottom: "-5px" }} />
      )}
      {arrowDirection === "top" && (
        <div style={{ position: "absolute", width: "8px", height: "8px", background: "rgba(20,20,20,0.85)", borderTop: "1px dashed rgba(255,255,255,0.2)", borderLeft: "1px dashed rgba(255,255,255,0.2)", transform: "rotate(45deg)", left: "calc(50% - 4px)", top: "-5px" }} />
      )}
    </div>
  );
}
