const P4 = "/images/page4";

const topCards = [
  {
    num: "01",
    title: "Plan Agent(规划员)",
    desc: "识别用户意图、角色判断、转化为可执行的步骤列表",
    tags: ["复杂任务拆解", "允许用户修正"],
    img: `${P4}/card-plan.png`,
  },
  {
    num: "02",
    title: "React Agent(主管)",
    desc: "每一个子任务agent会选择对应的子agent来执行",
    tags: ["结构化表达", "可视化呈现"],
    img: `${P4}/card-react.png`,
  },
  {
    num: "03",
    title: "Search/Draw Agent(员工)",
    desc: "执行RAG 检索、Python 代码执行、浏览器自动化",
    tags: ["聚焦执行结果", "关注动作完成"],
    img: `${P4}/card-search.png`,
  },
  {
    num: "04",
    title: "User Agent(专员)",
    desc: "中途输入, 判断整个流程下一步应该重新plan或继续执行",
    tags: ["让用户掌控一切", "提出潜在异常情况"],
    img: `${P4}/card-user.png`,
  },
];

export default function SlidePage4() {
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
        <img src={`${P4}/bg-outer.png`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img src={`${P4}/logo.svg`} alt="" className="absolute left-0 top-0 h-full object-contain" style={{ width: "5.97%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[0.7vw]">
          <img src={`${P4}/avatar.png`} alt="" className="h-full aspect-square object-cover" />
          <p style={{ color: "#8C8C8C", fontSize: "clamp(12px, 1.67vw, 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            专业研究场景2:&nbsp;&nbsp;高级研究模式 / 04
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

      {/* ── 标题：高级研究 多Agent ─────────────────────────────────── */}
      <span className="absolute z-10" style={{ left: "4.17%", top: "9.26%" }}>
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
          高级研究
        </span>
        <span
          style={{
            color: "#1F1F1F",
            fontSize: "clamp(20px, 2.5vw, 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
          }}
        >
          多Agent
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
        如何实现多agent协作, 像人类专家一样自动完成研究级报告
      </p>

      {/* ── 顶部 4 张 Agent 卡片 ──────────────────────────────────── */}
      {topCards.map((card, i) => (
        <AgentCard
          key={card.num}
          {...card}
          style={{
            left: `${4.17 + i * 23.13}%`,
            top: "16.67%",
          }}
        />
      ))}

      {/* ── 底部宽卡片：Formatting Agent ─────────────────────────── */}
      <div
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "51.11%",
          width: "91.67%",
          height: "45.19%",
          background: "#FFFFFF",
          border: "1px solid #F0F2FA",
          borderRadius: "0.83vw",
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {/* 编号 05 */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: "1.82%",
            top: "4.92%",
            width: "clamp(18px, 1.67vw, 24px)",
            height: "clamp(18px, 1.67vw, 24px)",
            background: "#D1FB39",
            borderRadius: "66.67px",
            padding: "4px",
          }}
        >
          <p style={{ color: "#1F1F1F", fontSize: "clamp(8px, 0.83vw, 12px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
            05
          </p>
        </div>

        {/* 文字信息 */}
        <div className="absolute flex flex-col" style={{ left: "4.24%", top: "5.74%", width: "29.55%", gap: "6px" }}>
          <span style={{ color: "#434343", fontSize: "clamp(9px, 0.83vw, 12px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.5 }}>
            Formatting Agent(美工)
          </span>
          <span style={{ color: "#8C8C8C", fontSize: "clamp(9px, 0.83vw, 12px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
            输入多种格式的文档研究报告, 并支持用户在研究过程中脑图查看研究框架
          </span>
          <div className="flex items-start gap-[6px]">
            <Tag label="增加注释减少幻觉" />
            <Tag label="保留过程信息增强信任" />
          </div>
        </div>

        {/* Pill 标签 (左侧截图上方) */}
        <div
          className="absolute z-10 flex items-center"
          style={{
            left: "1.82%",
            top: "29.51%",
            padding: "0.56vw 0.83vw",
            background: "#FFFFFF",
            border: "1px solid #F0F3FF",
            borderRadius: "3.33vw",
            boxShadow: "0px 2px 4px 0px rgba(25,33,61,0.08)",
          }}
        >
          <span style={{ color: "#434343", fontSize: "clamp(10px, 0.97vw, 14px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1, whiteSpace: "nowrap" }}>
            脑图辅助用户进行研究类报告产出
          </span>
        </div>

        {/* 左侧截图 */}
        <img
          src={`${P4}/card-formatting-left.png`}
          alt=""
          className="absolute"
          style={{
            left: "1.82%",
            top: "29.51%",
            width: "31.97%",
            height: "63.93%",
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: "0.63vw",
            boxShadow: "0px 2px 4px 1px rgba(77,145,225,0.1)",
          }}
        />

        {/* 右侧截图 */}
        <img
          src={`${P4}/card-formatting-right.png`}
          alt=""
          className="absolute"
          style={{
            left: "36.06%",
            top: "5.74%",
            width: "63.94%",
            height: "94.26%",
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: "0.63vw",
            boxShadow: "0px 2px 4px 1px rgba(77,145,225,0.1)",
          }}
        />
      </div>
    </div>
  );
}

function AgentCard({
  num,
  title,
  desc,
  tags,
  img,
  style,
}: {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  img: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute z-10"
      style={{
        ...style,
        width: "22.29%",
        height: "33.33%",
        background: "#FFFFFF",
        border: "1px solid #F0F2FA",
        borderRadius: "0.83vw",
        boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      {/* flex 布局：文字 + 4px gap + 图片 */}
      <div className="flex flex-col" style={{ padding: "12px", height: "100%", gap: "4px" }}>
        {/* 文字区 + 编号 */}
        <div className="relative shrink-0">
          <div
            className="absolute right-0 top-0 flex items-center justify-center"
            style={{
              width: "clamp(18px, 1.67vw, 24px)",
              height: "clamp(18px, 1.67vw, 24px)",
              background: "#D1FB39",
              borderRadius: "66.67px",
              padding: "4px",
            }}
          >
            <p style={{ color: "#1F1F1F", fontSize: "clamp(8px, 0.83vw, 12px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
              {num}
            </p>
          </div>
          <div className="flex flex-col" style={{ gap: "6px", paddingRight: "30px" }}>
            <span style={{ color: "#434343", fontSize: "clamp(9px, 0.83vw, 12px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.5 }}>
              {title}
            </span>
            <p style={{ color: "#8C8C8C", fontSize: "clamp(9px, 0.83vw, 12px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {desc}
            </p>
            <div className="flex items-start gap-[6px]">
              {tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        </div>
        {/* 截图 */}
        <img
          src={img}
          alt=""
          className="min-h-0 flex-1"
          style={{
            width: "100%",
            objectFit: "cover",
            borderRadius: "0.63vw",
            boxShadow: "0px 2px 4px 1px rgba(77,145,225,0.1)",
          }}
        />
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: "3px 9px",
        background: "#F0F2FA",
        borderRadius: "20px",
      }}
    >
      <p style={{ color: "#434343", fontSize: "clamp(7px, 0.69vw, 10px)", fontFamily: "'PingFang SC', sans-serif", textAlign: "center", fontWeight: 500, lineHeight: "14px", margin: 0, whiteSpace: "nowrap" }}>
        {label}
      </p>
    </div>
  );
}
