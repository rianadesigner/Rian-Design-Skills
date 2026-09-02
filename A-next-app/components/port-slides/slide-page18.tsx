import { DarkPillTag } from "./dark-pill-tag";

const P18 = "/images/page18";

const sections = [
  {
    num: "01",
    label: "搭建单数据集",
    img: "section1.webp",
    badgeTop: "14.81%",
    imgTop: "16.67%",
    imgHeight: "24%",
    imgFit: "cover" as const,
    radius: "12px 12px 12px 0",
  },
  {
    num: "02",
    label: "搭建多数据集",
    img: "section2.webp",
    badgeTop: "42%",
    imgTop: "43.89%",
    imgHeight: "26%",
    imgFit: "cover" as const,
    radius: "12px 12px 12px 0",
  },
  {
    num: "03",
    label: "数据集运行消费",
    img: "section3.webp",
    badgeTop: "71.5%",
    imgTop: "73.33%",
    imgHeight: "24%",
    imgFit: "cover" as const,
    radius: "12px",
  },
];

export default function SlidePage18() {
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
          建数据集
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
        更好的与mixo，rap3形成联动，打通从批量数据生产到数据使用的&ldquo;最后一公里&rdquo;
      </p>

      {/* ── Sections with badges + screenshots ───────────────────── */}
      {sections.map((sec) => (
        <div key={sec.num}>
          {/* Badge pill */}
          <div className="absolute z-20" style={{ left: "4.17%", top: sec.badgeTop }}>
            <DarkPillTag index={sec.num}>{sec.label}</DarkPillTag>
          </div>
          {/* Screenshot */}
          <img
            src={`${P18}/${sec.img}`}
            alt=""
            className="absolute z-10"
            style={{
              left: "4.17%",
              top: sec.imgTop,
              width: "91.67%",
              height: sec.imgHeight,
              objectFit: sec.imgFit,
              objectPosition: "center top",
              borderRadius: sec.radius,
            }}
          />
        </div>
      ))}
    </div>
  );
}
