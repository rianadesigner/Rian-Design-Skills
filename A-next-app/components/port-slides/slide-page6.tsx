const P6 = "/images/page6";

export default function SlidePage6() {
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

      {/* ── 标题：专业 学术阅读 ──────────────────────────────────── */}
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
          专业
        </span>
        <span
          style={{
            color: "#ef3b46",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
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
          color: "rgba(255,255,255,0.72)",
          fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)",
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
        src={`${P6}/screenshot-main.webp`}
        alt=""
        className="absolute z-0"
        style={{
          left: 0,
          top: "16.67%",
          width: "100%",
          bottom: 0,
          objectFit: "cover",
          objectPosition: "center top",
          border: "2px solid rgba(255,255,255,0.12)",
          borderTopLeftRadius: "calc(0.83 * var(--u))",
          borderTopRightRadius: "calc(0.83 * var(--u))",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.4)",
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
          background: "rgba(255,255,255,0.06)",
          borderRadius: "calc(0.83 * var(--u))",
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        {/* 左侧截图 */}
        <img
          src={`${P6}/card-left.jpg`}
          alt=""
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: "49.55%",
            height: "97%",
            objectFit: "cover",
            objectPosition: "center top",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
        {/* 右侧截图 */}
        <img
          src={`${P6}/card-right.jpg`}
          alt=""
          className="absolute"
          style={{
            left: "50.45%",
            top: 0,
            width: "49.55%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            border: "1px solid rgba(255,255,255,0.12)",
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
          fontSize: "clamp(9px, calc(0.83 * var(--u)), 12px)",
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
            background: "rgba(20,20,20,0.85)",
            borderTop: "1px dashed rgba(255,255,255,0.2)",
            borderRight: "1px dashed rgba(255,255,255,0.2)",
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
            background: "rgba(20,20,20,0.85)",
            borderBottom: "1px dashed rgba(255,255,255,0.2)",
            borderLeft: "1px dashed rgba(255,255,255,0.2)",
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
            background: "rgba(20,20,20,0.85)",
            borderBottom: "1px dashed rgba(255,255,255,0.2)",
            borderRight: "1px dashed rgba(255,255,255,0.2)",
            transform: "rotate(45deg)",
            left: "calc(50% - 4px)",
            bottom: "-5px",
          }}
        />
      )}
    </div>
  );
}
