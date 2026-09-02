const P17 = "/images/page17";

const steps = [
  {
    bg: "card1-bg.webp",
    title: "步骤1: 批量输入",
    desc: "预定义结构化数据集作为工作流输入源\n支持上传文件或ODPS表导入或输入JSON",
  },
  {
    bg: "card2-bg.webp",
    title: "步骤2: 调用工作流",
    desc: "自动化调度大规模AI工作流执行 通过AI模型完成数据清洗/分析/转换",
  },
  {
    bg: "card3-bg.webp",
    title: "步骤3: 生成运行结果",
    desc: "下游工作流（跨流程衔接）\n异构业务系统（如观人镜、iTag等平台）",
  },
];

export default function SlidePage17() {
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
          如何快速
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
          跑批次
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
        用批量功能，借助自定义的工作流，批量生产数据，数据可快速流转到质检平台，进行人工质检。
      </p>

      {/* ── Step Cards (3-col) ────────────────────────────────────── */}
      <div
        className="absolute z-10 grid grid-cols-3"
        style={{
          left: "4.17%",
          top: "15.74%",
          width: "91.67%",
          gap: "clamp(12px, calc(1.67 * var(--u)), 24px)",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{
              height: "clamp(140px, 24.07vh, 260px)",
              border: "1px solid rgba(220,216,255,0.12)",
              borderRadius: "12px",
            }}
          >
            <img
              src={`${P17}/${step.bg}`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute left-0 bottom-0 w-full flex flex-col gap-[clamp(4px,calc(0.56 * var(--u)),8px)]"
              style={{
                padding: "clamp(10px, calc(1.11 * var(--u)), 16px) clamp(16px, calc(2.08 * var(--u)), 30px)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ color: "#FFFFFF", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5 }}>
                {step.title}
              </span>
              <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                {step.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Large background panel ───────────────────────────────── */}
      <div
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "42.04%",
          width: "91.67%",
          height: "84.91%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <img
          src={`${P17}/panel-bg.webp`}
          alt=""
          className="w-full object-cover"
          style={{ objectPosition: "center top" }}
        />
      </div>
    </div>
  );
}
