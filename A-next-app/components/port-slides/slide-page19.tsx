const P19 = "/images/page19";

export default function SlidePage19() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* ── 深色底 + 红光晕 ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: 0, left: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        <div className="absolute" style={{ top: 0, right: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        {/* 网格线装饰 */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="absolute inset-0 h-full w-full" viewBox="0 0 1443 1081.5" preserveAspectRatio="none">
          <path d="M62,1081.5L61,1081.5L61,61.5L62,61.5L62,1081.5ZM461,61.5L462,61.5L462,1081.5L461,1081.5L461,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
          <path d="M522,1081.5L521,1081.5L521,61.5L522,61.5L522,1081.5ZM921,61.5L922,61.5L922,1081.5L921,1081.5L921,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
          <path d="M982,1081.5L981,1081.5L981,61.5L982,61.5L982,1081.5ZM1381,61.5L1382,61.5L1382,1081.5L1381,1081.5L1381,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
        </svg>
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
          如何接入
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
          MCP
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
          maxWidth: "50%",
        }}
      >
        在工作流/智能体快速引入MCP，快速引入到业务系统中进行工具调用
      </p>

      {/* ── Card A (top-left): 更灵活、高效和可扩展的接口方式 ───── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: "4.17%",
          top: "16.67%",
          width: "35.83%",
          height: "36.67%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="absolute left-0 top-0 w-full flex flex-col"
          style={{
            height: "22.47%",
            padding: "clamp(12px, calc(1.39 * var(--u)), 20px) clamp(16px, calc(2.08 * var(--u)), 30px) clamp(10px, calc(1.11 * var(--u)), 16px)",
            gap: "clamp(4px, calc(0.56 * var(--u)), 8px)",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
            更灵活、高效和可扩展的接口方式
          </span>
          <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
            支持类型覆盖主流渠道：STDIO/SSE/Streamable HTTP
          </span>
        </div>
        <img
          src={`${P19}/cardA-screenshot.webp`}
          alt=""
          className="absolute"
          style={{
            left: "5.81%",
            top: "22.47%",
            width: "88.37%",
            height: "77.53%",
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: "9px",
          }}
        />
      </div>

      {/* ── Card B (top-right): 包包展示视频流程画布 ─────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: "41.67%",
          top: "16.67%",
          width: "54.17%",
          height: "36.67%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${P19}/bag-video-flow.jpg`}
          alt=""
          className="absolute"
          style={{
            left: "30.26%",
            top: 0,
            width: "69.74%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 16%",
          }}
        />
        <div
          className="absolute flex flex-col"
          style={{
            left: "3.85%",
            top: "5.05%",
            width: "28%",
            gap: "clamp(6px, calc(0.83 * var(--u)), 12px)",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
            包包展示视频流程画布
          </span>
          <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
            将模特、包袋、场景与参考视频统一输入，按模板分支批量生成图片和视频结果。
          </span>
        </div>
      </div>

      {/* ── Card C (bottom-left): 加速开发流程、降低学习门槛 ───── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: "4.17%",
          top: "55.56%",
          width: "45%",
          height: "38.89%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="absolute left-0 top-0 w-full flex flex-col"
          style={{
            height: "21.19%",
            padding: "clamp(12px, calc(1.39 * var(--u)), 20px) clamp(16px, calc(2.08 * var(--u)), 30px) clamp(10px, calc(1.11 * var(--u)), 16px)",
            gap: "clamp(4px, calc(0.56 * var(--u)), 8px)",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
            加速开发流程、降低学习门槛
          </span>
          <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
            储备官方示例库：支持用户直接调用并提高系统稳定性
          </span>
        </div>
        <img
          src={`${P19}/cardC-screenshot.webp`}
          alt=""
          className="absolute"
          style={{
            left: "4.63%",
            top: "21.19%",
            width: "90.74%",
            height: "78.81%",
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: "9px",
          }}
        />
      </div>

      {/* ── Card D (bottom-right): 跨团队协作和资源共享 ─────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: "50.83%",
          top: "55.56%",
          width: "45%",
          height: "38.89%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="absolute left-0 top-0 w-full flex flex-col"
          style={{
            height: "21.19%",
            padding: "clamp(12px, calc(1.39 * var(--u)), 20px) clamp(16px, calc(2.08 * var(--u)), 30px) clamp(10px, calc(1.11 * var(--u)), 16px)",
            gap: "clamp(4px, calc(0.56 * var(--u)), 8px)",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.3 }}>
            跨团队协作和资源共享
          </span>
          <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
            目前服务内部跨业务团队利用现有服务，降低开发成本、缩短响应时间
          </span>
        </div>
        <img
          src={`${P19}/cardD-grid.webp`}
          alt=""
          className="absolute"
          style={{
            left: "4.63%",
            top: "25%",
            width: "90.74%",
            height: "72.38%",
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: "9px",
          }}
        />
      </div>
    </div>
  );
}
