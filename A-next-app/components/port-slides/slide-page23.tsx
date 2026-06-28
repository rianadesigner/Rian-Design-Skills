const P23 = "/images/page23";

const col2Items = [
  { num: "01", label: "快捷发布链路, 一键审核发布", badgeTop: "1.5%", imgTop: "4.5%", img: "01.png" },
  { num: "02", label: "清晰结果表达, 统一排序逻辑", badgeTop: "22%", imgTop: "25%", img: "02.png" },
  { num: "03", label: "明确工具配置,传达产品心智", badgeTop: "42.5%", imgTop: "45.5%", img: "03.png" },
  { num: "04", label: "统一的工具接入流程, 根据平台做定制化", badgeTop: "63%", imgTop: "66%", img: "04.png" },
];

const col3Items = [
  { num: "05", label: "生态下单规则优化/定制模版精选规则", badgeTop: "1.5%", imgTop: "4.5%", img: "05.png" },
  { num: "06", label: "灰盒推荐&widget&黑盒实验内投测验", badgeTop: "34%", imgTop: "37%", img: "06.png", img2: "06-2.png" },
];

const col4Items = [
  { num: "07", label: "商家舆情多轮调研优化产品方向", badgeTop: "1.5%", imgTop: "4.5%", img: "07.png" },
  { num: "08", label: "平台升级&探索", badgeTop: "34%", imgTop: "37%", img: "08.png" },
  { num: "09", label: "AI智能解说等能力接入", badgeTop: "67%", imgTop: "70%", img: "09.png" },
];

const badgeStyle = {
  circle: {
    width: "clamp(14px, calc(1.39 * var(--u)), 20px)",
    height: "clamp(14px, calc(1.39 * var(--u)), 20px)",
    background: "#D1FB39",
    borderRadius: "10px",
  } as const,
  num: {
    color: "#111111",
    fontSize: "clamp(7px, calc(0.69 * var(--u)), 10px)",
    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
    textAlign: "center" as const,
    lineHeight: 1,
    margin: 0,
  },
  label: {
    color: "#222222",
    fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)",
    fontFamily: "'Alimama ShuHeiTi', sans-serif",
    fontWeight: 700,
    lineHeight: 1.7,
    whiteSpace: "nowrap" as const,
  },
};

const imgBorder = {
  border: "2px solid #FFFFFF",
  borderRadius: "6px",
} as const;

const avatarSize = "clamp(16px, calc(2.08 * var(--u)), 30px)";

const userBubble = {
  padding: "clamp(3px, calc(0.42 * var(--u)), 6px) clamp(6px, calc(0.83 * var(--u)), 12px)",
  background: "#FFFFFF",
  border: "1px solid #222222",
  borderRadius: "clamp(6px, calc(0.83 * var(--u)), 12px)",
  overflow: "hidden" as const,
} as const;

const userText = {
  color: "#222222",
  fontSize: "clamp(9px, calc(0.97 * var(--u)), 14px)",
  fontFamily: "'PingFang SC', sans-serif",
  lineHeight: 1.5,
  whiteSpace: "nowrap" as const,
} as const;

const botBubble = {
  padding: "clamp(5px, calc(0.63 * var(--u)), 9px)",
  background: "#507AFC",
  borderRadius: "clamp(6px, calc(0.83 * var(--u)), 12px)",
  overflow: "hidden" as const,
} as const;

const botText = {
  color: "#FFFFFF",
  fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)",
  fontFamily: "'PingFang SC', sans-serif",
  fontWeight: 500,
  lineHeight: 2,
} as const;

const botTitle = {
  ...botText,
  lineHeight: 1.75,
  display: "block" as const,
} as const;

export default function SlidePage23() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── Background ──────────────────────────────────────────── */}
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
        <img src={`${P23}/bg-outer.png`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* ── Left Panel: Chat Conversation ────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden flex flex-col"
        style={{
          left: 0,
          top: 0,
          width: "23.61%",
          height: "100%",
          padding: "5% 2% 2% 2%",
          gap: "clamp(8px, calc(1.11 * var(--u)), 16px)",
          borderRight: "1px solid rgba(61,94,255,0.12)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* Title card */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "100%",
            height: "4.81%",
            background: "#FFFFFF",
            border: "2px solid #222222",
            borderRadius: "8px",
            boxShadow: "2px 2px 0px 0px rgba(80,87,246,0.12)",
          }}
        >
          <span style={{ color: "#111111", fontSize: "clamp(10px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, whiteSpace: "nowrap" }}>
            一键成片, 10s智能视频创意神器
          </span>
        </div>

        {/* User 1: 😎今年工具我们定个什么O？ */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img src={`${P23}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={userText}>😎 今年工具我们定个什么O？</span>
          </div>
        </div>

        {/* Bot 1: 目标 pill */}
        <div className="flex items-center" style={{ alignSelf: "flex-end", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div className="flex items-center" style={{ ...botBubble, padding: 0, height: "clamp(24px, calc(2.5 * var(--u)), 36px)", gap: 0 }}>
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: "clamp(24px, calc(2.5 * var(--u)), 36px)", height: "clamp(12px, calc(1.25 * var(--u)), 18px)", background: "#FFFFFF", borderRadius: "clamp(12px, calc(1.56 * var(--u)), 22.5px)", marginLeft: "clamp(5px, calc(0.63 * var(--u)), 9px)" }}>
              <span style={{ color: "#4554E5", fontSize: "clamp(7px, calc(0.78 * var(--u)), 11px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1 }}>目标</span>
            </div>
            <span style={{ ...botText, lineHeight: 1.75, paddingLeft: "clamp(3px, calc(0.28 * var(--u)), 4px)", paddingRight: "clamp(5px, calc(0.63 * var(--u)), 9px)", whiteSpace: "nowrap" as const }}>
              视频精品率&覆盖广告消耗提升
            </span>
          </div>
          <img src={`${P23}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 2: 🫡请告诉我该怎么做KR！ */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img src={`${P23}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={userText}>🫡 请告诉我该怎么做KR！</span>
          </div>
        </div>

        {/* Bot 2: KR list */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <span style={botTitle}>重点聚焦以下KR：</span>
            <span style={botText}>
              1.强化视频的站内应用规模；<br />
              2.提升卖点视频质量及效果；<br />
              3.优化工具能力及用户舆情；
            </span>
          </div>
          <img src={`${P23}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 3: 🤔KR该如何完成？ */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img src={`${P23}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={userText}>🤔 KR该如何完成？</span>
          </div>
        </div>

        {/* Bot 3: Plan */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <span style={botTitle}>我的规划如下：</span>
            <p style={{ ...botText, margin: 0 }}>
              1.重点进行视频工具主站场景建设, 持续推荐创意中心工具规模；<br />
              2.卖点视频模版专项升级完成站内消耗提升, 明确精品视频准入门槛；<br />
              3.系统调研支持白盒能力基建, 并通过AI能力接入深化产品能力;
            </p>
          </div>
          <img src={`${P23}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 4: 阐述你的设计策略? */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img src={`${P23}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={userText}>阐述你的设计策略?</span>
          </div>
        </div>

        {/* Bot 4: Strategy */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <span style={botTitle}>我的策略如下：</span>
            <p style={{ ...botText, margin: 0 }}>
              1.定义工具接入SOP, 实现产品快速复用, 支持研发提效;<br />
              2.模板下单规则&精选规则双重过滤, 黑灰实现快速进行模板迭代;<br />
              3.强调商家访谈, 解决用户跳失与产品能力快速迭代;
            </p>
          </div>
          <img src={`${P23}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 5 (dark): ✅已完成OKR */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img src={`${P23}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ padding: "clamp(3px, calc(0.42 * var(--u)), 6px) clamp(6px, calc(0.83 * var(--u)), 12px)", background: "#222222", borderRadius: "clamp(6px, calc(0.83 * var(--u)), 12px)", overflow: "hidden" }}>
            <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.75, whiteSpace: "nowrap" }}>
              ✅ 已完成OKR，查看你的成果吧！
            </span>
          </div>
        </div>
      </div>

      {/* ── Column 2: Tool Screenshots ───────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden flex flex-col"
        style={{ left: "23.61%", top: 0, width: "26.39%", height: "100%", background: "#FFFFFF", padding: "3% 1% 1%", gap: "12px" }}
      >
        {col2Items.map((item, i) => (
          <div key={item.num} className="flex flex-col" style={{ gap: "4px", flex: i === 0 ? "0 0 auto" : "1 1 0", minHeight: 0 }}>
            <div className="flex items-center flex-shrink-0" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
              <div className="flex items-center justify-center flex-shrink-0" style={badgeStyle.circle}>
                <p style={badgeStyle.num}>{item.num}</p>
              </div>
              <span style={badgeStyle.label}>{item.label}</span>
            </div>
            <img src={`${P23}/${item.img}`} alt="" style={{ width: "100%", height: i === 0 ? "auto" : "100%", objectFit: i === 0 ? "contain" : "cover", objectPosition: "left top", flex: i === 0 ? undefined : "1 1 0", minHeight: i === 0 ? undefined : 0, ...imgBorder }} />
          </div>
        ))}
      </div>

      {/* ── Column 3: Recommendations ────────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden flex flex-col"
        style={{ left: "50%", top: 0, width: "26.39%", height: "100%", background: "#FFFFFF", padding: "3% 1% 1%", gap: "12px" }}
      >
        {col3Items.map((item, i) => (
          <div key={item.num} className="flex flex-col" style={{ gap: "4px", flex: i === 0 ? "0 0 auto" : "1 1 0", minHeight: 0 }}>
            <div className="flex items-center flex-shrink-0" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
              <div className="flex items-center justify-center flex-shrink-0" style={badgeStyle.circle}>
                <p style={badgeStyle.num}>{item.num}</p>
              </div>
              <span style={badgeStyle.label}>{item.label}</span>
            </div>
            <img src={`${P23}/${item.img}`} alt="" style={{ width: "100%", height: i === 0 ? "auto" : "100%", objectFit: i === 0 ? "contain" : "cover", objectPosition: "left top", flex: i === 0 ? undefined : "1 1 0", minHeight: i === 0 ? undefined : 0, ...imgBorder }} />
            {item.img2 && <img src={`${P23}/${item.img2}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top", flex: "1 1 0", minHeight: 0, ...imgBorder }} />}
          </div>
        ))}
      </div>

      {/* ── Column 4: Platform ───────────────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden flex flex-col"
        style={{ left: "76.39%", top: 0, width: "23.61%", height: "100%", background: "#FFFFFF", padding: "3% 1% 1%", gap: "12px" }}
      >
        {col4Items.map((item, i) => (
          <div key={item.num} className="flex flex-col" style={{ gap: "4px", flex: i === 0 ? "0 0 auto" : "1 1 0", minHeight: 0 }}>
            <div className="flex items-center flex-shrink-0" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
              <div className="flex items-center justify-center flex-shrink-0" style={badgeStyle.circle}>
                <p style={badgeStyle.num}>{item.num}</p>
              </div>
              <span style={badgeStyle.label}>{item.label}</span>
            </div>
            <img src={`${P23}/${item.img}`} alt="" style={{ width: "100%", height: i === 0 ? "auto" : "100%", objectFit: i === 0 ? "contain" : "cover", objectPosition: "left top", flex: i === 0 ? undefined : "1 1 0", minHeight: i === 0 ? undefined : 0, ...imgBorder }} />
          </div>
        ))}
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-20" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img src={`${P23}/logo.png`} alt="" className="absolute top-0 h-full object-contain" style={{ left: "-2.5%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7 * var(--u))]">
          <p style={{ color: "#8C8C8C", fontSize: "clamp(12px, calc(1.67 * var(--u)), 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            绘剪-淘系短视频播种机 / 23
          </p>
        </div>
        <div className="absolute" style={{ left: "6.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid #8C8C8C", padding: "calc(0.3 * var(--u)) calc(0.8 * var(--u))", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, calc(1.1 * var(--u)), 16px)", lineHeight: 1.4, margin: 0 }}>
              2022 / 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
