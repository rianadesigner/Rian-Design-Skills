const P2 = "/images/page2";

export default function SlidePage2() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── 白色底层 + 装饰背景 ─────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute"
            style={{ left: "-1%", top: "3.4%" }}
          >
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
        {/* 网格线装饰 */}
        <div className="absolute inset-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-full w-full" viewBox="0 0 1443 1081.5" preserveAspectRatio="none">
            <path d="M62,1081.5L61,1081.5L61,61.5L62,61.5L62,1081.5ZM461,61.5L462,61.5L462,1081.5L461,1081.5L461,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <path d="M522,1081.5L521,1081.5L521,61.5L522,61.5L522,1081.5ZM921,61.5L922,61.5L922,1081.5L921,1081.5L921,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <path d="M982,1081.5L981,1081.5L981,61.5L982,61.5L982,1081.5ZM1381,61.5L1382,61.5L1382,1081.5L1381,1081.5L1381,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.5" />
            <rect x="0.75" y="0.75" width="1441.5" height="61.5" rx="0" fillOpacity="0" strokeOpacity="0.5" stroke="#FFFFFF" fill="none" strokeWidth="1.5" />
          </svg>
        </div>
        {/* 作品背景图 */}
        <img
          src={`${P2}/bg-outer.png`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        {/* Logo */}
        <img
          src={`${P2}/logo.svg`}
          alt=""
          className="absolute left-0 top-0 h-full object-contain"
          style={{ width: "5.97%" }}
        />
        {/* 右侧信息 */}
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7 * var(--u))]">
          <img
            src={`${P2}/avatar.png`}
            alt=""
            className="h-full aspect-square object-cover"
          />
          <p style={{ color: "#8C8C8C", fontSize: "clamp(12px, calc(1.67 * var(--u)), 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            专业研究场景1: AI搜 / 02
          </p>
        </div>
        {/* 年份标签 */}
        <div className="absolute" style={{ left: "7.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid #8C8C8C", padding: "calc(0.3 * var(--u)) calc(0.8 * var(--u))", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, calc(1.1 * var(--u)), 16px)", lineHeight: 1.4, margin: 0 }}>
              2024 / 2025
            </p>
          </div>
        </div>
      </div>

      {/* ── 标题：AI搜模式 ───────────────────────────────────────── */}
      <span className="absolute z-10" style={{ left: "4.17%", top: "9.26%" }}>
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #5C5CFF 0%, #AE5CFF 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          AI搜
        </span>
        <span
          style={{
            color: "#1F1F1F",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          模式
        </span>
      </span>

      {/* ── 副标题 (右侧) ────────────────────────────────────────── */}
      <p
        className="absolute z-10"
        style={{
          right: "4.17%",
          top: "11.11%",
          color: "#434343",
          fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)",
          fontFamily: "'PingFang SC', sans-serif",
          fontWeight: 500,
          textAlign: "right",
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        基于通用AI搜索链路的基础框架搭建&新能力透传
      </p>

      {/* ── 左侧主截图区 (搜索界面) ──────────────────────────────── */}
      <div
        className="absolute z-0"
        style={{
          left: "4.17%",
          top: "16.67%",
          width: "55%",
          height: "48.89%",
          borderRadius: "calc(0.83 * var(--u))",
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        <img
          src={`${P2}/screenshot-main.png`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ borderRadius: "calc(0.83 * var(--u))" }}
        />
      </div>

      {/* ── 右侧卡片：深度搜索_多轮 ──────────────────────────────── */}
      <div
        className="absolute z-10"
        style={{
          left: "59.72%",
          top: "16.67%",
          width: "36.11%",
          height: "48.89%",
          background: "#FFFFFF",
          border: "1px solid #F0F2FA",
          borderRadius: "calc(0.83 * var(--u))",
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {/* 卡片内容 (flex 布局，文字与图片间距 4px) */}
        <div className="flex flex-col" style={{ padding: "16px 20px", height: "100%", gap: "4px" }}>
          <div className="flex items-start gap-[calc(0.42 * var(--u))] shrink-0">
            <div
              className="flex shrink-0 items-center justify-center"
              style={{
                width: "clamp(18px, calc(1.67 * var(--u)), 24px)",
                height: "clamp(18px, calc(1.67 * var(--u)), 24px)",
                background: "#D1FB39",
                borderRadius: "66.67px",
                padding: "4px",
              }}
            >
              <p style={{ color: "#1F1F1F", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
                00
              </p>
            </div>
            <div className="flex flex-col gap-[calc(0.42 * var(--u))]">
              <p style={{ color: "#1F1F1F", fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.3, margin: 0 }}>
                深度搜索_多轮
              </p>
              <p style={{ color: "#8C8C8C", fontSize: "clamp(9px, calc(0.83 * var(--u)), 12px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1, margin: 0 }}>
                通过多轮推理深化问题认知并进行规划纠偏, 打造完整deep research能力
              </p>
            </div>
          </div>
          <img
            src={`${P2}/screenshot-deep-search.png`}
            alt=""
            className="min-h-0 flex-1"
            style={{
              width: "100%",
              objectFit: "cover",
              borderRadius: "calc(0.63 * var(--u))",
              boxShadow: "0px -2px 4px 1px rgba(77,145,225,0.1)",
            }}
          />
        </div>
      </div>

      {/* ── Tooltip 气泡 ──────────────────────────────────────────── */}
      <TooltipBalloon label="思考过程展示" style={{ left: "3.82%", top: "22.41%" }} arrowDirection="right" />
      <TooltipBalloon label="二次编辑" style={{ left: "38.61%", top: "22.69%" }} arrowDirection="right" />
      <TooltipBalloon label="详情展示" style={{ left: "44.79%", top: "16.85%" }} arrowDirection="bottom" />

      {/* ── 底部四卡片 ───────────────────────────────────────────── */}
      <BottomCard
        style={{ left: "4.17%", top: "66.67%" }}
        num="01"
        title="思维导图"
        desc="梳理回答的结果框架, 支持多格式下载"
        img={`${P2}/card-mindmap.png`}
      />
      <BottomCard
        style={{ left: "27.29%", top: "66.67%" }}
        num="02"
        title="AI.播客"
        desc="gpt编排脚本, 火山音色, 待调优工程链路"
        img={`${P2}/card-podcast.png`}
      />
      <BottomCard
        style={{ left: "50.42%", top: "66.67%" }}
        num="03"
        title="AI.PPT"
        desc="自动化大纲生成及模板选择, 支持生成导出"
        img={`${P2}/card-ppt.png`}
      />
      <BottomCard
        style={{ left: "73.54%", top: "66.67%" }}
        num="04"
        title="图片Formatting"
        desc="图文模板规范设计及工程侧文本美化"
        img={`${P2}/card-formatting.png`}
      />
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
  arrowDirection: "right" | "bottom";
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
            background: "#FFFFFF",
            borderTop: "1px dashed #E4E6ED",
            borderRight: "1px dashed #E4E6ED",
            transform: "rotate(45deg)",
            right: "-5px",
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

function BottomCard({
  style,
  num,
  title,
  desc,
  img,
}: {
  style: React.CSSProperties;
  num: string;
  title: string;
  desc: string;
  img: string;
}) {
  return (
    <div
      className="absolute z-10"
      style={{
        ...style,
        width: "22.29%",
        height: "27.78%",
        background: "#FFFFFF",
        border: "1px solid #F0F2FA",
        borderRadius: "calc(0.83 * var(--u))",
        boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      {/* 卡片内容 (flex 布局，文字与图片间距 4px) */}
      <div className="flex flex-col" style={{ padding: "16px 24px", height: "100%", gap: "4px" }}>
        <div className="flex items-start gap-[calc(0.42 * var(--u))] shrink-0">
          <div
            className="flex shrink-0 items-center justify-center"
            style={{
              width: "clamp(18px, calc(1.67 * var(--u)), 24px)",
              height: "clamp(18px, calc(1.67 * var(--u)), 24px)",
              background: "#D1FB39",
              borderRadius: "66.67px",
              padding: "4px",
            }}
          >
            <p style={{ color: "#1F1F1F", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
              {num}
            </p>
          </div>
          <div className="flex flex-col gap-[calc(0.42 * var(--u))]">
            <span style={{ color: "#434343", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.5 }}>
              {title}
            </span>
            <p style={{ color: "#8C8C8C", fontSize: "clamp(9px, calc(0.83 * var(--u)), 12px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1, margin: 0 }}>
              {desc}
            </p>
          </div>
        </div>
        <img
          src={img}
          alt=""
          className="min-h-0 flex-1"
          style={{
            width: "100%",
            objectFit: "cover",
            borderTopLeftRadius: "calc(0.63 * var(--u))",
            borderTopRightRadius: "calc(0.63 * var(--u))",
            boxShadow: "0px -2px 4px 0px rgba(77,145,225,0.1)",
          }}
        />
      </div>
    </div>
  );
}
