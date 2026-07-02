const P25 = "/images/page25";

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

const topCards = [
  { num: "01", label: "自由构图, 支持快速组合及元素库编辑", img: "card1.webp", left: "24.72%", badgeTop: "7.41%", imgTop: "10.09%" },
  { num: "02", label: "灵感推荐：简化用户配置操作并做快捷创意采纳", img: "card2.webp", left: "62.78%", badgeTop: "7.41%", imgTop: "10.09%" },
  { num: "03", label: "智能文案: 基于商品档案的多商品文案生成", img: "card3.webp", left: "24.72%", badgeTop: "calc(43.24% - 1px - 1%)", imgTop: "calc(45.93% - 1px - 2%)" },
  { num: "04", label: "共创aigc创作界面, 让创意生成更自由", img: "card4.webp", left: "62.78%", badgeTop: "calc(43.24% - 1px - 1%)", imgTop: "calc(45.93% - 1px - 2%)" },
];

const bottomCards = [
  { num: "05", label: "浮层承载二级交互, 支持预览效果", img: "card5.webp", left: "24.72%" },
  { num: "06", label: "提升结果的可点击/可拓展/可适配性", img: "card6.webp", left: "49.86%" },
  { num: "07", label: "快捷操作: 帮助用户对比效果及快速操作", img: "card7.webp", left: "75.14%" },
];

const cardBorder = {
  border: "2px solid #FFFFFF",
  borderRadius: "6px",
  boxShadow: "0px 0px 6px rgba(0,0,0,0.06)",
} as const;

export default function SlidePage25() {
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
        <img loading="lazy" decoding="async" src={`${P25}/bg-outer.png`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* ── Right White Area ─────────────────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{ left: "23.61%", top: 0, width: "76.39%", height: "100%", background: "#FFFFFF" }}
      />

      {/* ── Top Cards (2x2 grid) ─────────────────────────────────── */}
      {topCards.map((card) => (
        <div key={card.num}>
          <div className="absolute z-10 flex items-center" style={{ left: card.left, top: card.badgeTop, gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
            <div className="flex items-center justify-center flex-shrink-0" style={badgeStyle.circle}>
              <p style={badgeStyle.num}>{card.num}</p>
            </div>
            <span style={badgeStyle.label}>{card.label}</span>
          </div>
          <img
            src={`${P25}/${card.img}`}
            alt=""
            className="absolute z-10"
            style={{
              left: card.left,
              top: card.imgTop,
              width: "36.11%",
              height: "30.37%",
              objectFit: "cover",
              ...cardBorder,
            }}
          />
        </div>
      ))}

      {/* ── Bottom Cards (3 across) ──────────────────────────────── */}
      {bottomCards.map((card) => (
        <div key={card.num}>
          <div className="absolute z-10 flex items-center" style={{ left: card.left, top: "75.93%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
            <div className="flex items-center justify-center flex-shrink-0" style={badgeStyle.circle}>
              <p style={badgeStyle.num}>{card.num}</p>
            </div>
            <span style={badgeStyle.label}>{card.label}</span>
          </div>
          <img
            src={`${P25}/${card.img}`}
            alt=""
            className="absolute z-10"
            style={{
              left: card.left,
              top: "79.07%",
              width: "23.75%",
              height: "19.44%",
              objectFit: "cover",
              ...cardBorder,
            }}
          />
        </div>
      ))}

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
            border: "1px solid #222222",
            borderRadius: "8px",
            boxShadow: "0px 0px 6px rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ color: "#111111", fontSize: "clamp(10px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, whiteSpace: "nowrap" }}>
            万相营造-体验驱动AI工具创新
          </span>
        </div>

        {/* User 1 */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P25}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={userText}>万相营造是什么?</span>
          </div>
        </div>

        {/* Bot 1: Platform description */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <p style={{ ...botText, margin: 0 }}>
              万相营造是阿里妈妈旗下，面向淘天生态(广告/内容/消费者)的AI创意工具平台。围绕广告创意生产的核心链路，涵盖了商品图、服饰图、视频和文案等创意类型的智能生成。
            </p>
          </div>
          <img loading="lazy" decoding="async" src={`${P25}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 2 */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P25}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={userText}>平台核心功能有哪些？</span>
          </div>
        </div>

        {/* Bot 2: Feature list */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <span style={{ ...botText, lineHeight: 1.75, display: "block" }}>核心功能包括：</span>
            <span style={botText}>
              1.服饰图-模特换装生成<br />
              2.商品图-场景化图片生成<br />
              3.平铺图-商品平铺构图<br />
              4.AI即刻成片-视频生成
            </span>
          </div>
          <img loading="lazy" decoding="async" src={`${P25}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 3 */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P25}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={userText}>设计应该发挥什么角色？</span>
          </div>
        </div>

        {/* Bot 3: Role */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <p style={{ ...botText, lineHeight: 1.75, margin: 0 }}>
              CUI/GUI交互设计<br />
              工具迁移升级<br />
              体验驱动产品创新
            </p>
          </div>
          <img loading="lazy" decoding="async" src={`${P25}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* Final dark */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P25}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ padding: "clamp(3px, calc(0.42 * var(--u)), 6px) clamp(6px, calc(0.83 * var(--u)), 12px)", background: "#222222", borderRadius: "clamp(6px, calc(0.83 * var(--u)), 12px)", overflow: "hidden" }}>
            <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.75, whiteSpace: "nowrap" }}>
              ✅ 来看看你的设计成果吧！
            </span>
          </div>
        </div>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-20" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img loading="lazy" decoding="async" src={`${P25}/logo.png`} alt="" className="absolute top-0 h-full object-contain" style={{ left: "-2.5%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7 * var(--u))]">
          <p style={{ color: "#8C8C8C", fontSize: "clamp(12px, calc(1.67 * var(--u)), 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            用AI创造-让效果说话 / 25
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
