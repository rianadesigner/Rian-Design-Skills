const P24 = "/images/page24";

const bands = [
  {
    num: "01",
    label: "AI剧本可行性分析",
    desc: "充分调研铺垫：海量市面AI竞品、模型横向测试(GPT/通义/文心/内部)、Prompt逆向工程",
    images: ["band2-1.webp", "band2-2.webp", "band2-3.webp"],
    badgeTop: "33.33%",
    imgTop: "36.67%",
    fit: "cover" as const,
  },
  {
    num: "02",
    label: "自研优化LLM模型",
    desc: "调试优化：长文案风格研究、LLM多模型对比、直通车/黑盒外投短文案测试",
    images: ["band3-1.webp", "band3-2.webp", "band3-3.webp"],
    badgeTop: "56.20%",
    imgTop: "59.26%",
    fit: "cover" as const,
  },
  {
    num: "03",
    label: "万相贯通文生视频立项",
    desc: "项目KO充分论证：画面填充率及匹配度测试、热门音色调试与克隆、产品功能模块梳理推进",
    images: ["band4-1.webp", "band4-2.webp", "band4-1.webp"],
    badgeTop: "78.98%",
    imgTop: "82.04%",
    fit: "contain" as const,
  },
];

const imgLefts = ["25.28%", "52.78%", "80.28%"];

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

export default function SlidePage24() {
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
        <img loading="lazy" decoding="async" src={`${P24}/bg-outer.webp`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* ── Right Dark Area ──────────────────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{ left: "23.61%", top: 0, width: "76.39%", height: "100%", background: "#161616" }}
      />

      {/* ── Top Band: Research + Categories ──────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{ left: "25.63%", top: "0.93%", width: "36.94%", height: "31.30%" }}
      >
        <img loading="lazy" decoding="async" src={`${P24}/research.jpg`} alt="" className="h-full w-full object-contain" />
        <div
          className="absolute"
          style={{
            left: "34.25%",
            top: "1.44%",
            width: "26.00%",
            height: "8.65%",
            border: "1px dotted #F5714D",
            borderRadius: "clamp(6px, calc(0.83 * var(--u)), 12px)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "76.15%",
            top: "85.10%",
            width: "23.86%",
            height: "8.65%",
            border: "1px dotted #F5714D",
            borderRadius: "clamp(6px, calc(0.83 * var(--u)), 12px)",
          }}
        />
      </div>

      {/* Category: 解说类 */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ left: "69.17%", top: "9.26%", width: "12.50%", gap: "clamp(4px, calc(0.69 * var(--u)), 10px)" }}
      >
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div className="flex items-center justify-center flex-shrink-0" style={{ width: "clamp(14px, calc(1.39 * var(--u)), 20px)", height: "clamp(14px, calc(1.39 * var(--u)), 20px)", background: "#D1FB39", borderRadius: "10px" }}>
            <span style={{ color: "#111111", fontSize: "clamp(7px, calc(0.69 * var(--u)), 10px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", lineHeight: 1 }}>
              ⬅️
            </span>
          </div>
          <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
            解说类-内容化视频
          </span>
        </div>
        <span style={{ color: "#FFFFFF", fontSize: "clamp(7px, calc(0.69 * var(--u)), 10px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.6 }}>
          商品讲解 | 知识普及<br />功能测评 | 场景展示
        </span>
        <div className="flex" style={{ paddingTop: "clamp(4px, calc(0.69 * var(--u)), 10px)" }}>
          <img loading="lazy" decoding="async" src={`${P24}/phone1.webp`} alt="" style={{ width: "50%", height: "auto", objectFit: "cover" }} />
          <img loading="lazy" decoding="async" src={`${P24}/phone2.webp`} alt="" style={{ width: "50%", height: "auto", objectFit: "cover" }} />
        </div>
      </div>

      {/* Category: 剧情类 */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ left: "83.33%", top: "9.26%", width: "12.50%", gap: "clamp(4px, calc(0.69 * var(--u)), 10px)" }}
      >
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div className="flex items-center justify-center flex-shrink-0" style={{ width: "clamp(14px, calc(1.39 * var(--u)), 20px)", height: "clamp(14px, calc(1.39 * var(--u)), 20px)", background: "#D1FB39", borderRadius: "10px" }}>
            <span style={{ color: "#111111", fontSize: "clamp(7px, calc(0.69 * var(--u)), 10px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", lineHeight: 1 }}>
              ➡️
            </span>
          </div>
          <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
            剧情类-内容化视频
          </span>
        </div>
        <span style={{ color: "#FFFFFF", fontSize: "clamp(7px, calc(0.69 * var(--u)), 10px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.6 }}>
          搭配组合 | 探店分享<br />攻略经验 | 生活记录
        </span>
        <div className="flex" style={{ paddingTop: "clamp(4px, calc(0.69 * var(--u)), 10px)" }}>
          <img loading="lazy" decoding="async" src={`${P24}/phone3.webp`} alt="" style={{ width: "50%", height: "auto", objectFit: "cover" }} />
          <img loading="lazy" decoding="async" src={`${P24}/phone4.webp`} alt="" style={{ width: "50%", height: "auto", objectFit: "cover" }} />
        </div>
      </div>

      {/* ── Bands 2–4: Badge + 3 Screenshots ────────────────────── */}
      {bands.map((band) => (
        <div key={band.num}>
          <div className="absolute z-10 flex items-center" style={{ left: "25.28%", top: band.badgeTop, gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: "clamp(14px, calc(1.39 * var(--u)), 20px)", height: "clamp(14px, calc(1.39 * var(--u)), 20px)", background: "#D1FB39", borderRadius: "10px" }}>
              <p style={{ color: "#111111", fontSize: "clamp(7px, calc(0.69 * var(--u)), 10px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
                {band.num}
              </p>
            </div>
            <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
              {band.label}
            </span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.4, whiteSpace: "nowrap" }}>
              {band.desc}
            </span>
          </div>
          {band.images.map((img, i) => (
            <img
              key={`${band.num}-${i}`}
              src={`${P24}/${img}`}
              alt=""
              className="absolute z-10"
              style={{
                left: imgLefts[i],
                top: band.imgTop,
                width: "26.39%",
                height: "auto",
                objectPosition: "center top",
              }}
            />
          ))}
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
            border: "2px solid #222222",
            borderRadius: "8px",
            boxShadow: "2px 2px 0px 0px rgba(80,87,246,0.12)",
          }}
        >
          <span style={{ color: "#111111", fontSize: "clamp(10px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, whiteSpace: "nowrap" }}>
            内容化创意-铺路文生视频
          </span>
        </div>

        {/* User 1 */}
        <div className="flex items-start" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P24}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={userText}>
              🐸 市面上涌现很多文生/图生视频工具<br />我们该怎么办?
            </span>
          </div>
        </div>

        {/* Bot 1: 目标 pill */}
        <div className="flex items-center" style={{ alignSelf: "flex-end", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div className="flex items-center" style={{ ...botBubble, padding: "clamp(4px, calc(0.52 * var(--u)), 7.5px) clamp(5px, calc(0.63 * var(--u)), 9px)", gap: "clamp(2px, calc(0.21 * var(--u)), 3px)" }}>
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: "clamp(24px, calc(2.5 * var(--u)), 36px)", height: "clamp(12px, calc(1.25 * var(--u)), 18px)", background: "#FFFFFF", borderRadius: "clamp(12px, calc(1.56 * var(--u)), 22.5px)" }}>
              <span style={{ color: "#4554E5", fontSize: "clamp(7px, calc(0.78 * var(--u)), 11px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1 }}>目标</span>
            </div>
            <span style={{ ...botText, lineHeight: 1.75, whiteSpace: "nowrap" as const }}>先打爆剧情类内容化创意</span>
          </div>
          <img loading="lazy" decoding="async" src={`${P24}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 2 */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P24}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={{ ...userText, whiteSpace: "nowrap" as const }}>🫡 什么是内容化创意？</span>
          </div>
        </div>

        {/* Bot 2: Content definition */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <p style={{ ...botText, margin: 0 }}>
              区别于传统展示类视频创意，这种创意不是在推销产品或服务，而是为潜在客户和客户提供真正相关且有用的内容，以帮助他们解决问题。
            </p>
          </div>
          <img loading="lazy" decoding="async" src={`${P24}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 3 */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P24}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={{ ...userText, whiteSpace: "nowrap" as const }}>阐述你的研究策略?</span>
          </div>
        </div>

        {/* Bot 3: Strategy list */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <span style={{ ...botText, lineHeight: 1.75, display: "block" }}>我的策略如下：</span>
            <span style={botText}>
              1.市面AI剧本生成能力调研<br />
              2.LLM模型生成剧本文案能力<br />
              3.探索可落地工具模式及创新<br />
              4.论证工程链路推进项目KO
            </span>
          </div>
          <img loading="lazy" decoding="async" src={`${P24}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* User 4 */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P24}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={userBubble}>
            <span style={{ ...userText, whiteSpace: "nowrap" as const }}>项目的最终目标是?</span>
          </div>
        </div>

        {/* Bot 4: Goal */}
        <div className="flex items-start" style={{ alignSelf: "flex-end", maxWidth: "88%", gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <div style={botBubble}>
            <p style={{ ...botText, lineHeight: 1.75, margin: 0 }}>
              通过内容化创意调研, 论证AI剧本生成、热门音色、风格化文案、画面填充等效果, 为文生视频项目生产链路进行基础能力建设
            </p>
          </div>
          <img loading="lazy" decoding="async" src={`${P24}/bot-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
        </div>

        {/* Final dark */}
        <div className="flex items-center" style={{ gap: "clamp(3px, calc(0.42 * var(--u)), 6px)" }}>
          <img loading="lazy" decoding="async" src={`${P24}/user-avatar.png`} alt="" style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ padding: "clamp(3px, calc(0.42 * var(--u)), 6px) clamp(6px, calc(0.83 * var(--u)), 12px)", background: "#222222", borderRadius: "clamp(6px, calc(0.83 * var(--u)), 12px)", overflow: "hidden" }}>
            <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, calc(0.83 * var(--u)), 12px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.75, whiteSpace: "nowrap" }}>
              ✅ 来看看你的研究成果吧！
            </span>
          </div>
        </div>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-20" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img loading="lazy" decoding="async" src={`${P24}/logo.png`} alt="" className="absolute top-0 h-full object-contain" style={{ left: "-2.5%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7 * var(--u))]">
          <p style={{ color: "#FFFFFF", fontSize: "16px", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            混剪-淘系内容化裂变桶 / 24
          </p>
        </div>
        <div className="absolute" style={{ left: "6.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid #999999", padding: "calc(0.3 * var(--u)) calc(0.8 * var(--u))", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, calc(1.1 * var(--u)), 16px)", lineHeight: 1.4, margin: 0 }}>
              2022 / 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
