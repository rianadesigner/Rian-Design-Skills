const P26 = "/images/page26";

const phones = [
  { img: "phone1.png", left: "47.22%", w: "16.22%" },
  { img: "phone2.png", left: "64.27%", w: "15.90%" },
  { img: "phone3.png", left: "81.01%", w: "16.22%" },
];

const captions = [
  { num: "01.", text: "理解人群及货品, 发现行业优质创意", left: "47.15%" },
  { num: "02.", text: "生产匹配创意, 创意精准投放", left: "64.03%" },
  { num: "03.", text: "追踪优化效果, 提升营销效率", left: "80.90%" },
];

const captionStyle = {
  box: {
    width: "16.46%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "clamp(4px, 0.56vw, 8px) clamp(8px, 0.83vw, 12px)",
    border: "2px solid #222222",
    overflow: "hidden" as const,
  } as const,
  num: {
    color: "#FFFFFF",
    fontSize: "clamp(8px, 0.76vw, 11px)",
    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
    lineHeight: 1.7,
  } as const,
  text: {
    color: "#FFFFFF",
    fontSize: "clamp(8px, 0.76vw, 11px)",
    fontFamily: "'PingFang SC', sans-serif",
    lineHeight: 1.7,
    whiteSpace: "nowrap" as const,
  } as const,
};

export default function SlidePage26() {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* ── Top Section (#222222) ────────────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: 0,
          top: 0,
          width: "100%",
          height: "50%",
          background: "#222222",
          borderRight: "1px solid rgba(255,128,0,0.24)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {/* Badge 01 */}
        <div
          className="absolute flex items-center"
          style={{ left: "2.78%", top: "19.5%", gap: "clamp(3px, 0.42vw, 6px)" }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: "clamp(14px, 1.39vw, 20px)", height: "clamp(14px, 1.39vw, 20px)", background: "#D1FB39", borderRadius: "10px" }}
          >
            <p style={{ color: "#111111", fontSize: "clamp(7px, 0.69vw, 10px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
              01
            </p>
          </div>
          <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, 0.83vw, 12px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
            创意洞察: 分析商家经营链路应用
          </span>
        </div>

        {/* Left screenshot */}
        <img
          src={`${P26}/top-left.png`}
          alt=""
          className="absolute"
          style={{ left: "2.78%", top: "23.70%", width: "41.67%", height: "72.25%", objectFit: "cover" }}
        />

        {/* 3 phone screenshots */}
        {phones.map((p) => (
          <img
            key={p.img}
            src={`${P26}/${p.img}`}
            alt=""
            className="absolute"
            style={{ left: p.left, top: "18.33%", width: p.w, height: "72.22%", objectFit: "cover", borderRadius: "6px" }}
          />
        ))}

        {/* 3 caption boxes below phones */}
        {captions.map((c) => (
          <div
            key={c.num}
            className="absolute"
            style={{ left: c.left, top: "90.93%", ...captionStyle.box }}
          >
            <span>
              <span style={captionStyle.num}>{c.num}</span>
              <span style={captionStyle.text}>{c.text}</span>
            </span>
          </div>
        ))}
      </div>

      {/* ── Bottom Section (#000000) ─────────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{ left: 0, top: "50%", width: "100%", height: "50%", background: "#000000" }}
      >
        {/* Badge 02 */}
        <div
          className="absolute flex items-center"
          style={{ left: "2.78%", top: "16.67%", gap: "clamp(3px, 0.42vw, 6px)" }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: "clamp(14px, 1.39vw, 20px)", height: "clamp(14px, 1.39vw, 20px)", background: "#D1FB39", borderRadius: "10px" }}
          >
            <p style={{ color: "#111111", fontSize: "clamp(7px, 0.69vw, 10px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
              02
            </p>
          </div>
          <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, 0.83vw, 12px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
            站外流量护城河, 保障系统稳定性
          </span>
        </div>

        {/* Left screenshot */}
        <img
          src={`${P26}/bottom-left.png`}
          alt=""
          className="absolute"
          style={{ left: "2.78%", top: "20.56%", width: "41.67%", height: "70.96%", objectFit: "cover" }}
        />

        {/* Badge for right-top area */}
        <div
          className="absolute flex items-center"
          style={{ left: "47.15%", top: "2%", gap: "clamp(3px, 0.42vw, 6px)" }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: "clamp(14px, 1.39vw, 20px)", height: "clamp(14px, 1.39vw, 20px)", background: "#D1FB39", borderRadius: "10px" }}
          >
            <p style={{ color: "#111111", fontSize: "clamp(7px, 0.69vw, 10px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
              01
            </p>
          </div>
          <span style={{ color: "#FFFFFF", fontSize: "clamp(8px, 0.83vw, 12px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
            创意洞察: 分析商家经营链路应用
          </span>
        </div>

        {/* Right top image (negative top, clipped) */}
        <img
          src={`${P26}/right-top.png`}
          alt=""
          className="absolute"
          style={{
            left: "47.15%",
            top: "-16.30%",
            width: "50.14%",
            height: "64.44%",
            objectFit: "cover",
            border: "1px solid #FFFFFF",
            borderRadius: "6px",
          }}
        />

        {/* Caption: ONEBP平台_组件视角 */}
        <div
          className="absolute flex flex-col justify-start"
          style={{
            left: "47.08%",
            top: "48.52%",
            width: "50.28%",
            padding: "8px",
            background: "#000000",
            borderBottom: "1px solid rgba(255,255,255,0.5)",
            gap: "clamp(4px, 0.42vw, 6px)",
            overflow: "hidden",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(9px, 0.83vw, 12px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
            ONEBP平台_组件视角
          </span>
          <p style={{ color: "#FFFFFF", fontSize: "clamp(8px, 0.76vw, 11px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, margin: 0 }}>
            重构：活动-项目-商机的三层树状管理结构对应PE和业务线运营，进行功能和数据权限设计；不区分模版配置做权限隔离；
          </p>
        </div>

        {/* Caption: ONEBP平台_客户视角 */}
        <div
          className="absolute flex flex-col justify-start"
          style={{
            left: "47.08%",
            top: "61.5%",
            width: "50.28%",
            padding: "8px",
            background: "#000000",
            gap: "clamp(4px, 0.42vw, 6px)",
            overflow: "hidden",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(9px, 0.83vw, 12px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
            ONEBP平台_客户视角
          </span>
          <p style={{ color: "#FFFFFF", fontSize: "clamp(8px, 0.76vw, 11px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7, margin: 0 }}>
            针对项目管理所需的项目/模版/资源包递进式分布，可在查看项目时对模版和资源包分组情况进行便捷查询；优化全局操作；
          </p>
        </div>

        {/* Right bottom image (overflows, clipped) */}
        <img
          src={`${P26}/right-bottom.png`}
          alt=""
          className="absolute"
          style={{
            left: "47.15%",
            top: "74.44%",
            width: "50.14%",
            height: "103.89%",
            objectFit: "cover",
            objectPosition: "center top",
            border: "1px solid #FFFFFF",
            borderRadius: "6px",
          }}
        />
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-20" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img src={`${P26}/logo.png`} alt="" className="absolute top-0 h-full object-contain" style={{ left: "-2.5%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[0.7vw]">
          <img src={`${P26}/avatar.png`} alt="" className="h-full aspect-square object-cover" />
          <p style={{ color: "#FFFFFF", fontSize: "clamp(12px, 1.67vw, 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            创意洞察&大外投 / 26
          </p>
        </div>
        <div className="absolute" style={{ left: "6.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid #FFFFFF", padding: "0.3vw 0.8vw", transform: "rotate(-1deg)" }}>
            <p style={{ color: "#FFFFFF", fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, 1.1vw, 16px)", lineHeight: 1.4, margin: 0 }}>
              2021 / 2022
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
