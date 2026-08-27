const P1 = "/images/page1";

export default function SlidePage1() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* ── 左侧红光晕（与全局幻灯片风格统一）──────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            top: 0, left: 0, width: "18%", height: "100%",
            background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)",
          }}
        />
        {/* 右侧红光晕 */}
        <div
          className="absolute"
          style={{
            top: 0, right: 0, width: "18%", height: "100%",
            background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* ── 截图展示区 (玻璃卡片) ────────────────────────────────── */}
      <div
        className="absolute z-0 overflow-hidden"
        style={{
          left: "5.56%",
          top: "46%",
          width: "88.89%",
          height: "78.1%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "calc(1.67 * var(--u))",
          boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="absolute"
          style={{
            left: "1.52%",
            top: "2.37%",
            width: "96.97%",
            height: "92.65%",
            backgroundImage: `url(${P1}/screenshot.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            borderRadius: "calc(1.25 * var(--u))",
          }}
        />
      </div>

      <div>
      {/* ── 标题：「星辰千寻模型应用」 ───────────────────────────── */}
      <span className="absolute z-10" style={{ left: "35.2%", top: "14.7%" }}>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(20px, calc(2.78 * var(--u)), 40px)", fontFamily: "'Alimama ShuZhiTi VF', sans-serif", fontWeight: 700, lineHeight: 1.7, letterSpacing: "calc(0.19 * var(--u))" }}>
          「
        </span>
        <span
          style={{
            color: "#ef3b46",
            fontSize: "clamp(20px, calc(2.78 * var(--u)), 40px)",
            fontFamily: "'Alimama ShuZhiTi VF', sans-serif",
            fontWeight: 700,
            lineHeight: 1.7,
            letterSpacing: "calc(0.19 * var(--u))",
          }}
        >
          星辰千寻
        </span>
        <span style={{ color: "#FFFFFF", fontSize: "clamp(20px, calc(2.78 * var(--u)), 40px)", fontFamily: "'Alimama ShuZhiTi VF', sans-serif", fontWeight: 700, lineHeight: 1.7, letterSpacing: "calc(0.19 * var(--u))" }}>
          心流AI
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(20px, calc(2.78 * var(--u)), 40px)", fontFamily: "'Alimama ShuZhiTi VF', sans-serif", fontWeight: 700, lineHeight: 1.7, letterSpacing: "calc(0.19 * var(--u))" }}>
          」
        </span>
      </span>

      {/* ── 数据指标 (DAU / 次留) ────────────────────────────────── */}
      <div className="absolute z-10 flex items-center" style={{ left: "44.1%", top: "10%", gap: "calc(0.75 * var(--u))" }}>
        {/* DAU */}
        <div className="flex items-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "clamp(16px, calc(1.8 * var(--u)), 26px)", height: "auto" }} viewBox="0 0 26 26">
            <path d="M8.64,19.82Q13.29,19.57,17.65,19.25Q22,18.93,26,18.4Q25.41,20.28,25.1,22.33Q24.79,24.38,24.79,26L0.17,26Q0,23.28,0.96,21.2Q1.93,19.11,3.7,17.49Q5.48,15.86,7.65,14.55Q8.47,14.06,9.64,13.51Q10.81,12.96,12.07,12.4Q13.33,11.83,14.41,11.23Q15.5,10.63,16.17,10.01Q16.84,9.4,16.84,8.76Q16.84,7.6,15.89,6.85Q14.95,6.11,12.74,6.15Q10.99,6.15,9.94,6.91Q8.88,7.67,8.52,8.87Q8.16,10.07,8.44,11.45Q6.03,11.13,4.06,10.95Q2.1,10.77,0,10.67Q0,7.74,1.5,5.32Q3,2.9,6.04,1.45Q9.09,0,13.71,0Q16.98,0,19.28,0.71Q21.59,1.41,23.06,2.56Q24.52,3.71,25.19,5.03Q25.86,6.36,25.86,7.63Q25.86,9.79,24.92,11.32Q23.97,12.86,22.18,14.06Q20.39,15.26,17.77,16.53Q17.25,16.78,16.2,17.08Q15.15,17.38,13.83,17.77Q12.5,18.16,11.14,18.65Q9.78,19.15,8.64,19.82Z" fill="rgba(255,255,255,0.75)" />
          </svg>
          <div className="ml-[calc(0.2 * var(--u))] flex flex-col items-start">
            <div className="flex items-center justify-center" style={{ background: "#ef3b46", borderRadius: "calc(0.83 * var(--u))", padding: "calc(0.12 * var(--u)) calc(0.38 * var(--u))" }}>
              <p style={{ color: "#FFFFFF", fontSize: "clamp(6px, calc(0.56 * var(--u)), 8px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", margin: 0 }}>DAU</p>
            </div>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(6px, calc(0.69 * var(--u)), 10px)", fontFamily: "'PingFang HK', sans-serif", marginTop: "calc(0.1 * var(--u))" }}>w+</span>
          </div>
        </div>
        {/* 分隔线 */}
        <div style={{ width: "1px", height: "calc(1.8 * var(--u))", background: "rgba(255,255,255,0.2)", borderRadius: 1, margin: "0 calc(0.5 * var(--u))" }} />
        {/* 次留 */}
        <div className="flex items-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "clamp(36px, calc(4.1 * var(--u)), 59px)", height: "auto" }} viewBox="0 0 59 26">
            <path d="M19.14,12.83Q21.51,12.41,23.13,12.7Q24.74,13,25.7,13.75Q26.67,14.5,27.08,15.47Q27.49,16.45,27.49,17.39Q27.49,19.52,26.44,21.14Q25.39,22.76,23.54,23.84Q21.68,24.92,19.24,25.46Q16.8,26,14.05,26Q11.1,26,8.33,25.32Q5.57,24.64,3.4,22.97Q1.24,21.29,0,18.33Q2.03,17.77,4.28,17.22Q6.53,16.66,8.18,15.79Q8.87,17.53,10.17,18.28Q11.48,19.03,13.71,19.03Q15.98,19.03,17.56,18.49Q19.14,17.95,19.14,16.8Q19.14,15.89,17.77,15.61Q16.39,15.34,13.13,15.34L10.51,15.34L10.51,9.24L12.1,9.24Q12.99,9.24,14,9.2Q15.02,9.17,15.93,9.06Q16.84,8.96,17.42,8.71Q18.01,8.47,18.01,8.02Q18.01,7.21,17.18,6.64Q16.36,6.06,14.4,6.06Q11.89,6.06,10.43,7.11Q8.97,8.16,8.18,10Q6.39,9.27,4.43,8.73Q2.47,8.19,0.34,7.88Q1.92,4.25,5.27,2.13Q8.62,0,14.23,0Q17.8,0,20.57,0.92Q23.33,1.85,24.93,3.47Q26.53,5.09,26.53,7.14Q26.53,8.23,26.01,9.18Q25.5,10.14,23.92,11.03Q22.34,11.92,19.14,12.83ZM44.64,26Q39.55,26,36.37,24.36Q33.19,22.72,31.72,19.8Q30.24,16.87,30.24,12.97Q30.24,9.1,31.72,6.17Q33.19,3.24,36.37,1.62Q39.55,0,44.64,0Q49.72,0,52.88,1.62Q56.04,3.24,57.52,6.17Q59,9.1,59,12.97Q59,16.87,57.52,19.8Q56.04,22.72,52.88,24.36Q49.72,26,44.64,26ZM44.67,19.9Q46.97,19.9,48.28,18.91Q49.58,17.91,50.15,16.31Q50.72,14.71,50.72,12.97Q50.72,11.22,50.15,9.64Q49.58,8.05,48.28,7.06Q46.97,6.06,44.67,6.06Q42.33,6.06,40.98,7.06Q39.62,8.05,39.05,9.64Q38.49,11.22,38.49,12.97Q38.49,14.71,39.05,16.29Q39.62,17.88,40.98,18.89Q42.33,19.9,44.67,19.9Z" fill="rgba(255,255,255,0.75)" />
          </svg>
          <div className="ml-[calc(0.2 * var(--u))] flex flex-col items-start">
            <div className="flex items-center justify-center" style={{ background: "#ef3b46", borderRadius: "calc(0.83 * var(--u))", padding: "calc(0.12 * var(--u)) calc(0.38 * var(--u))" }}>
              <p style={{ color: "#FFFFFF", fontSize: "clamp(6px, calc(0.56 * var(--u)), 8px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", margin: 0 }}>次留</p>
            </div>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(6px, calc(0.69 * var(--u)), 10px)", fontFamily: "'PingFang HK', sans-serif", marginTop: "calc(0.1 * var(--u))" }}>%+</span>
          </div>
        </div>
      </div>

      {/* ── 蓝色装饰线 (标题下方水平) ─────────────────────────── */}
      <img
        src={`${P1}/blue-line.png`}
        alt=""
        className="absolute z-10"
        style={{ left: "31.88%", top: "21%", width: "36.25%", height: "auto" }}
      />

      {/* ── 三列内容区 ───────────────────────────────────────────── */}
      <div className="absolute z-10 flex items-start gap-[4.17%]" style={{ left: "17.92%", top: "26.1%", width: "64.86%", padding: "calc(1.39 * var(--u))" }}>
        {[
          { num: "01", title: "用户定位", lines: ["面向学生、科研人员与内容创作者", "围绕搜索的知识生产创作AI助手"] },
          { num: "02", title: "产品愿景", lines: ["脚踏实地认认真真解好真问题", "让知识创作者被看见/奖励/托举"] },
          { num: "03", title: "设计策略", lines: ["模型能力打磨用户交互体验链路", "多终端场景精准洞察用户诉求"] },
        ].map(({ num, title, lines }) => (
          <div key={num} className="flex flex-1 flex-col gap-[1vh]">
            <div className="flex items-center gap-[calc(0.56 * var(--u))]">
              <div className="flex items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", width: "calc(2.08 * var(--u))", height: "calc(2.08 * var(--u))", minWidth: 20, minHeight: 20 }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(8px, calc(0.93 * var(--u)), 13.33px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", margin: 0 }}>{num}</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(14px, calc(1.53 * var(--u)), 22px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 600, lineHeight: 1.7, margin: 0 }}>{title}</p>
            </div>
            <span style={{ color: "rgba(255,255,255,0.48)", fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
              {lines[0]}<br />{lines[1]}
            </span>
          </div>
        ))}
      </div>

      {/* ── 底部右侧标签 ─────────────────────────────────────────── */}
      <div className="absolute z-10 flex items-center gap-[calc(0.28 * var(--u))]" style={{ right: "4.17%", bottom: "4%", padding: "calc(0.83 * var(--u))", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "calc(3.33 * var(--u))", boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.3)" }}>
        <div className="flex items-center justify-center overflow-hidden" style={{ width: "calc(1.67 * var(--u))", height: "calc(1.67 * var(--u))", minWidth: 16, minHeight: 16, background: "#ef3b46", borderRadius: "50%" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "calc(0.8 * var(--u))", height: "calc(0.8 * var(--u))", minWidth: 8, minHeight: 8 }} viewBox="0 0 11.4613037109375 11.4666748046875">
            <path d="M8.26,9.78L3.21,9.78C2.78,9.78,2.48,9.77,2.22,9.73C0.37,9.53,0,8.42,0,6.58L0,3.21C0,1.37,0.36,0.26,2.23,0.05C2.49,0.02,2.79,0,3.21,0L8.26,0C8.67,0,8.98,0.02,9.24,0.05C11.1,0.26,11.46,1.37,11.46,3.21L11.46,6.58C11.46,8.42,11.1,9.53,9.23,9.73C8.98,9.77,8.68,9.78,8.26,9.78ZM3.2,0.8C2.82,0.8,2.55,0.82,2.33,0.85C1.17,0.98,0.79,1.33,0.79,3.21L0.79,6.58C0.79,8.45,1.17,8.82,2.31,8.94C2.55,8.97,2.82,8.99,3.21,8.99L8.26,8.99C8.64,8.99,8.91,8.97,9.13,8.94C10.28,8.81,10.66,8.45,10.66,6.58L10.66,3.21C10.66,1.33,10.28,0.97,9.14,0.85C8.9,0.82,8.63,0.8,8.25,0.8L3.2,0.8Z" fill="#FFFFFF" />
            <path d="M8.53,4.17L6.57,4.17C6.35,4.17,6.17,3.99,6.17,3.77C6.17,3.55,6.35,3.37,6.57,3.37L8.53,3.37C8.75,3.37,8.93,3.55,8.93,3.77C8.93,3.99,8.76,4.17,8.53,4.17Z" fill="#FFFFFF" />
            <path d="M4.66,4.3C4.37,4.3,4.13,4.06,4.13,3.77C4.13,3.48,4.36,3.24,4.66,3.24C4.95,3.24,5.19,3.48,5.19,3.77C5.19,4.06,4.96,4.3,4.66,4.3Z" fill="#FFFFFF" />
            <path d="M2.98,4.3C2.69,4.3,2.45,4.06,2.45,3.77C2.45,3.48,2.68,3.24,2.98,3.24L2.99,3.24C3.28,3.24,3.52,3.48,3.52,3.77C3.52,4.06,3.27,4.3,2.98,4.3Z" fill="#FFFFFF" />
            <path d="M8.53,7.26L2.93,7.26C2.71,7.26,2.52,7.08,2.52,6.86C2.52,6.64,2.7,6.46,2.92,6.46L8.53,6.46C8.75,6.46,8.93,6.64,8.93,6.86C8.93,7.08,8.76,7.26,8.53,7.26Z" fill="#FFFFFF" />
            <path d="M8.39,11.47L3.06,11.47C2.84,11.47,2.66,11.29,2.66,11.07C2.66,10.85,2.84,10.67,3.06,10.67L8.39,10.67C8.61,10.67,8.79,10.85,8.79,11.07C8.79,11.29,8.61,11.47,8.39,11.47Z" fill="#FFFFFF" />
          </svg>
        </div>
        <span style={{ color: "#111111", fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.5, whiteSpace: "nowrap" }}>
          Web(专业研究场景)
        </span>
      </div>

      {/* ── 副标题文字 ───────────────────────────────────────────── */}
      <span className="absolute z-10" style={{ left: "19%", top: "23.2%", color: "rgba(255,255,255,0.38)", fontSize: "clamp(12px, calc(1.25 * var(--u)), 18px)", fontFamily: "'PingFang SC', sans-serif", lineHeight: 1.7 }}>
        心流目前形成了以 PC端+App端＋浏览器插件+API开放 核心的多终端矩阵，覆盖从轻量浏览到专业研究的全场景
      </span>
      </div>
    </div>
  );
}
