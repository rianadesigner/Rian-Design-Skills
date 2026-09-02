const P15 = "/images/page15";

export default function SlidePage15() {
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
          如何搭建
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
          智能体
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
        打破AI开发壁垒，从感知到决策一站式构建单智能体助手
      </p>

      {/* ── Cards Grid ───────────────────────────────────────────── */}
      <div
        className="absolute z-10 grid grid-cols-2"
        style={{
          left: "4.17%",
          top: "16.67%",
          width: "91.67%",
          gap: "clamp(12px, calc(1.67 * var(--u)), 24px) clamp(12px, calc(1.67 * var(--u)), 24px)",
        }}
      >
        {/* Card 1 */}
        <div
          className="relative overflow-hidden"
          style={{
            height: "clamp(200px, 39.17vh, 423px)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
          }}
        >
          <div className="absolute" style={{ left: "4.63%", top: "4.73%" }}>
            <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
              1. Agent主/子模式创建
            </span>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, margin: 0, marginTop: "6px" }}>
              单智能体/多智能体分别进行执行及调度
            </p>
          </div>
          <img
            src={`${P15}/card1-screenshot.webp`}
            alt=""
            className="absolute"
            style={{
              left: "4.01%",
              top: "22.93%",
              width: "93.52%",
              height: "77.07%",
              objectFit: "cover",
              borderRadius: "9px",
            }}
          />
        </div>

        {/* Card 2 */}
        <div
          className="relative overflow-hidden"
          style={{
            height: "clamp(200px, 39.17vh, 423px)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
          }}
        >
          <div className="absolute" style={{ left: "4.63%", top: "4.73%" }}>
            <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
              2.系统化提示词工程能力
            </span>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, margin: 0, marginTop: "6px" }}>
              撰写prompt规则说明&支持推荐示例
            </p>
          </div>
          <img
            src={`${P15}/card2-screenshot.webp`}
            alt=""
            className="absolute"
            style={{
              left: "4.01%",
              top: "17.97%",
              width: "93.52%",
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "9px",
            }}
          />
        </div>

        {/* Card 3 */}
        <div
          className="relative overflow-hidden"
          style={{
            height: "clamp(220px, 42.13vh, 455px)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
          }}
        >
          <div className="absolute" style={{ left: "4.63%", top: "4.4%" }}>
            <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
              3.如何调用外部工具能力
            </span>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, margin: 0, marginTop: "6px" }}>
              支持节点/工作流/知识库/MCP等能力接入
            </p>
          </div>
          <img
            src={`${P15}/card3-screenshot.webp`}
            alt=""
            className="absolute"
            style={{
              left: "4.63%",
              top: "19.12%",
              width: "90.74%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "9px",
            }}
          />
        </div>

        {/* Card 4 */}
        <div
          className="relative overflow-hidden"
          style={{
            height: "clamp(220px, 42.13vh, 455px)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
          }}
        >
          <div className="absolute" style={{ left: "4.63%", top: "4.73%" }}>
            <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
              4.CUI结果逻辑
            </span>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, margin: 0, marginTop: "6px" }}>
              支持运行, 展示执行结果
            </p>
          </div>
          <img
            src={`${P15}/card4-screenshot.webp`}
            alt=""
            className="absolute"
            style={{
              left: "4.01%",
              top: "18.63%",
              width: "93.52%",
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "9px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
