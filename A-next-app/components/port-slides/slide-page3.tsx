const P3 = "/images/page3";

export default function SlidePage3() {
  return (
    <div
      className="relative min-h-full w-full overflow-y-auto"
      style={{ background: "#070707" }}
    >
      {/* ── 深色底 + 红光晕（fixed，始终铺满视口） ───────────────── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute" style={{ top: 0, left: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        <div className="absolute" style={{ top: 0, right: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
      </div>

      {/* ── 标题：高级研究模式 ─────────────────────────────────────── */}
      <span className="absolute z-10" style={{ left: "4.17%", top: "9.26%" }}>
        <span
          style={{
            color: "#ef3b46",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          高级研究
        </span>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          模式
        </span>
      </span>

      {/* ── 副标题 (右侧对齐) ────────────────────────────────────── */}
      <p
        className="absolute z-10"
        style={{
          right: "4.17%",
          top: "11.11%",
          color: "rgba(255,255,255,0.45)",
          fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)",
          fontFamily: "'PingFang SC', sans-serif",
          fontWeight: 500,
          textAlign: "right",
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        模拟人类专家式调研的AI研究范式（执行过程&沙箱监控）
      </p>

      {/* ── 顶部编号标签 (pill) ───────────────────────────────────── */}
      <PillLabel num="01" label="首页支持模式&格式选择" style={{ left: "4.17%", top: "15.28%" }} />
      <PillLabel num="02" label="脑图多窗口支持展示研究框架" style={{ left: "35%", top: "15.28%" }} />
      <PillLabel num="03" label="适配移动端的可视化信息表达" style={{ left: "65.83%", top: "15.28%" }} />

      {/* ── 顶部三张截图卡片 ─────────────────────────────────────── */}
      <img
        src={`${P3}/card-1.webp`}
        alt=""
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "16.67%",
          width: "30%",
          height: "25%",
          objectFit: "cover",
          objectPosition: "center top",
          borderRadius: "calc(0.83 * var(--u))",
          boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.5)",
        }}
      />
      <img
        src={`${P3}/card-2.png`}
        alt=""
        className="absolute z-10"
        style={{
          left: "35%",
          top: "16.67%",
          width: "30%",
          height: "25%",
          objectFit: "cover",
          objectPosition: "center top",
          borderRadius: "calc(0.83 * var(--u))",
          boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.5)",
        }}
      />
      {/* 第三张：移动端多视图 */}
      <img
        src={`${P3}/card-3.webp`}
        alt=""
        className="absolute z-10"
        style={{
          left: "65.83%",
          top: "16.67%",
          width: "30%",
          height: "25%",
          objectFit: "cover",
          objectPosition: "center top",
          borderRadius: "calc(0.83 * var(--u))",
          boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.4)",
        }}
      />

      {/* ── 底部大玻璃卡片 ───────────────────────────────────────── */}
      <div
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "43%",
          right: "4.17%",
          height: "808px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "calc(0.83 * var(--u))",
          boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.5)",
          overflow: "hidden",
          padding: "4px",
        }}
      >
        <img
          src={`${P3}/screenshot-main.webp`}
          alt=""
          style={{
            width: "100%",
            height: "800px",
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: "calc(0.63 * var(--u))",
          }}
        />
        {/* Tooltip: 多窗口展示过程文件 */}
        <TooltipBalloon label="多窗口展示过程文件" style={{ left: "69.92%", top: "0.56%" }} arrowDirection="bottom" />
        {/* Tooltip: 清晰的refer来源 */}
        <TooltipBalloon label="清晰的refer来源" style={{ left: "71.59%", top: "72.63%" }} arrowDirection="left" />
        {/* Tooltip: 支持多格式报告生成 */}
        <TooltipBalloon label="支持多格式报告生成" style={{ left: "25%", top: "82%" }} arrowDirection="bottom" />
      </div>

    </div>
  );
}

function PillLabel({
  num,
  label,
  style,
}: {
  num: string;
  label: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute z-20 flex items-center"
      style={{
        ...style,
        gap: "calc(0.28 * var(--u))",
        padding: "calc(0.56 * var(--u)) calc(0.83 * var(--u))",
        background: "rgba(31,31,31,1)",
        border: "1px solid rgba(255,255,255,0.28)",
        borderRadius: "calc(3.33 * var(--u))",
        boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.3)",
      }}
    >
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
        {num}
      </p>
      <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1, whiteSpace: "nowrap" }}>
        {label}
      </span>
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
