const P21 = "/images/page21";

const steps = [
  { num: "01", label: "默认页面", img: "step1.png" },
  { num: "02", label: "用户意图识别", img: "step2.png" },
  { num: "03", label: "大纲规划生成", img: "step3.png" },
  { num: "04", label: "工作流搭建", img: "step4.png" },
  { num: "05", label: "工作流运行", img: "step5.png" },
  { num: "06", label: "完成运行后输出", img: "step6.png" },
];

export default function SlidePage21() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
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
        <img src={`${P21}/bg-outer.png`} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img src={`${P21}/title.svg`} alt="万相星链" className="absolute left-0 top-0 h-full object-contain" />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[0.7vw]">
          <img src={`${P21}/avatar.png`} alt="" className="h-full aspect-square object-cover" />
          <p style={{ color: "#8C8C8C", fontSize: "clamp(12px, 1.67vw, 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            P2F搭建助手 / 21
          </p>
        </div>
        <div className="absolute" style={{ left: "9.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid #8C8C8C", padding: "0.3vw 0.8vw", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, 1.1vw, 16px)", lineHeight: 1.4, margin: 0 }}>
              2022 / 2024
            </p>
          </div>
        </div>
      </div>

      {/* ── Title ────────────────────────────────────────────────── */}
      <span className="absolute z-10" style={{ left: "4.17%", top: "9.26%" }}>
        <span
          style={{
            color: "#1F1F1F",
            fontSize: "clamp(20px, 2.5vw, 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          Prompt To{" "}
        </span>
        <span
          style={{
            backgroundImage: "linear-gradient(135deg, #5C5CFF 0%, #AE5CFF 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(20px, 2.5vw, 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          Workflow
        </span>
      </span>

      {/* ── Decorative wavy line ─────────────────────────────────── */}
      <svg
        className="absolute z-10"
        style={{ left: "21.74%", top: "13.06%", width: "clamp(80px, 9.03vw, 130px)", height: "13px", opacity: 0.5 }}
        viewBox="0 0 152 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient x1="0.0735" y1="0.129" x2="1.003" y2="0.132" id="p21wv">
            <stop offset="0%" stopColor="#5C5CFF" />
            <stop offset="100%" stopColor="#AE5CFF" />
          </linearGradient>
        </defs>
        <path d="M67.220451,12.986349Q113.09277,7.5991349,149.95132,8.4963117L149.95134,8.4959111Q149.97566,8.4965034,150,8.4965034Q150.09824,8.4965034,150.196,8.4868746Q150.29376,8.477246300000001,150.39009,8.458081199999999Q150.48645,8.438917199999999,150.58044,8.4104013Q150.67444,8.3818855,150.7652,8.3442926Q150.85596,8.3067002,150.9426,8.2603927Q151.02924,8.2140856,151.1109,8.159509199999999Q151.1926,8.1049337,151.26852,8.0426149Q151.34447,7.9802961,151.41393,7.9108338Q151.4834,7.8413725,151.54572,7.7654362Q151.60803,7.6895003,151.6626,7.607821Q151.71716,7.5261431,151.76349,7.439508Q151.80978,7.3528733,151.84738,7.2621164Q151.88499,7.1713605,151.91351,7.0773563Q151.94203,6.9833527,151.96118,6.8870058Q151.98035,6.7906599,151.98999,6.6928988Q151.9996,6.5951376,151.9996,6.4969034Q151.99959,6.4001927,151.99025,6.3039336Q151.98093,6.207674,151.96234,6.1127653Q151.94376,6.0178561,151.91611,5.9251828Q151.88847,5.83251,151.85202,5.7429380000000005Q151.81555,5.6533656,151.7706,5.5677304Q151.72565,5.4820952,151.67267,5.4011967Q151.61966,5.3202982,151.55911,5.2448914Q151.49857,5.1694846000000005,151.43103,5.1002735999999995Q151.36346,5.0310621,151.28955,4.9686927999999995Q151.21564,4.906323,151.13605,4.8513772Q151.05646,4.796431500000001,150.97194,4.7494226Q150.88742,4.7024136,150.79878,4.6637807Q150.71011,4.6251473,150.61813,4.5952500999999994Q150.52615,4.5653532000000006,150.43173,4.5444715Q150.3373,4.5235896,150.2413,4.5119185Q150.14529,4.500247,150.04863,4.497895L150.04865,4.4974959000000005Q115.65866,3.6604067000000002,73.542511,8.2452998Q76.467125,6.1883349,76.396248,3.7974395000000003Q76.33403,1.69870716,74.156258,0.6908292Q72.621521,-0.019450200000000084,70.09156,0.004706000000000099Q50.876682,0.1881716,1.70265764,7.5810919L1.70271716,7.5814877Q1.61481601,7.5947027,1.52843422,7.6156659Q1.44205242,7.6366286,1.35787141,7.6651735Q1.2736904,7.6937184,1.19237423,7.72962Q1.11105812,7.765522,1.0332483099999998,7.8084974Q0.9554385000000001,7.8514729,0.8817489000000001,7.9011827Q0.8080592,7.9508924,0.7390711000000001,8.0069451Q0.670083,8.0629978,0.6063406,8.1249504Q0.5425982,8.186903000000001,0.48460459999999994,8.2542677Q0.4266106999999999,8.3216324,0.3748229999999999,8.393876599999999Q0.3230352000000001,8.4661217,0.2778620999999999,8.542676400000001Q0.23268909999999998,8.6192312,0.1944870999999999,8.6994925Q0.156285,8.7797537,0.1253552,8.863087700000001Q0.09442539999999999,8.9464221,0.07101209999999991,9.0321722Q0.04759880000000005,9.1179223,0.03188659999999999,9.2054114Q0.016174300000000086,9.2929006,0.008287099999999992,9.3814387Q0.0003998000000000612,9.469976899999999,0.00039989999999989756,9.5588655Q0.00039989999999989756,9.6570997,0.010028600000000054,9.7548609Q0.019657100000000094,9.852622,0.03882180000000002,9.9489679Q0.057986300000000046,10.0453148,0.08650209999999992,10.1393185Q0.1150179,10.2333221,0.15261049999999998,10.3240786Q0.1902029999999999,10.414835,0.23651029999999995,10.5014706Q0.2828174000000001,10.5881052,0.33739340000000007,10.6697836Q0.3919691999999999,10.7514629,0.4542881999999999,10.8273983Q0.5166073,10.9033346,0.5860692999999999,10.9727955Q0.6555313,11.0422573,0.7314672,11.1045771Q0.8074030999999999,11.1668959,0.8890818,11.2214718Q0.9707603,11.2760477,1.0573951,11.3223543Q1.1440298,11.3686619,1.2347862699999999,11.4062538Q1.3255426300000002,11.4438477,1.41954672,11.4723625Q1.51355088,11.5008793,1.6098974,11.5200434Q1.70624387,11.5392094,1.80400491,11.5488377Q1.901765943,11.558466,2,11.558466Q2.14947201,11.558466,2.2972829,11.5362434L2.29734236,11.5366392Q51.194672,4.1853178,70.129753,4.0045234999999995Q71.405319,3.9923444,72.121872,4.1931777Q72.072655,4.2476315,72.016205,4.30528Q71.22773,5.1105044,69.646561,5.9137699999999995Q65.591633,7.9737582,65.03178,10.5799513Q64.962162,10.904048,65.000828,11.2332764Q65.023804,11.428915,65.084507,11.6163111Q65.14520999999999,11.8037071,65.24130199999999,11.9756613Q65.337395,12.147615,65.465191,12.297517Q65.592983,12.44742,65.747562,12.56951Q65.90214900000001,12.691603,66.077583,12.78119Q66.253014,12.870777,66.442551,12.924417Q66.632095,12.97806,66.828461,12.993692Q67.024818,13.009326,67.220451,12.986349Z" fillRule="evenodd" fill="url(#p21wv)" fillOpacity="1" />
      </svg>

      {/* ── Subtitle ─────────────────────────────────────────────── */}
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
          maxWidth: "45%",
        }}
      >
        打造基于自然语言快速搭建工作流的搭建助手
      </p>

      {/* ── Top screenshots (before / after) ─────────────────────── */}
      <img
        src={`${P21}/top-left.png`}
        alt=""
        className="absolute z-10"
        style={{
          left: 0,
          top: "16.67%",
          width: "50%",
          height: "46.57%",
          objectFit: "cover",
          objectPosition: "center top",
          border: "2px solid #F0F3FF",
          borderRadius: "18px",
          boxShadow: "0px 3.83px 7.66px rgba(25,33,61,0.08)",
        }}
      />
      <img
        src={`${P21}/top-right.png`}
        alt=""
        className="absolute z-10"
        style={{
          left: "50%",
          top: "16.67%",
          width: "50%",
          height: "46.57%",
          objectFit: "cover",
          objectPosition: "center top",
          border: "2px solid #F0F3FF",
          borderRadius: "18px",
          boxShadow: "0px 3.83px 7.66px rgba(25,33,61,0.08)",
        }}
      />

      {/* ── Floating emoji badges ────────────────────────────────── */}
      <div
        className="absolute z-20 flex items-center"
        style={{ left: "18.68%", top: "14.72%", gap: "clamp(4px, 0.56vw, 8px)", padding: "clamp(4px, 0.56vw, 8px)", background: "#FFFFFF", borderRadius: "60px", boxShadow: "0px 0px 6px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center justify-center" style={{ width: "clamp(16px, 1.74vw, 25px)", height: "clamp(16px, 1.74vw, 25px)", background: "#D1FB39", borderRadius: "66.67px" }}>
          <span style={{ fontSize: "clamp(10px, 0.97vw, 14px)", lineHeight: 1 }}>👀</span>
        </div>
        <span style={{ color: "#434343", fontSize: "clamp(10px, 1.02vw, 14.66px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
          前：设计器空空如也
        </span>
      </div>
      <div
        className="absolute z-20 flex items-center"
        style={{ left: "67.71%", top: "14.81%", gap: "clamp(4px, 0.56vw, 8px)", padding: "clamp(4px, 0.56vw, 8px)", background: "#FFFFFF", borderRadius: "60px", boxShadow: "0px 0px 6px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center justify-center" style={{ width: "clamp(16px, 1.67vw, 24px)", height: "clamp(16px, 1.67vw, 24px)", background: "#D1FB39", borderRadius: "66.67px" }}>
          <span style={{ fontSize: "clamp(10px, 0.97vw, 14px)", lineHeight: 1 }}>😄</span>
        </div>
        <span style={{ color: "#434343", fontSize: "clamp(10px, 0.97vw, 14px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
          后：生成结果/工作流保存
        </span>
      </div>
      <div
        className="absolute z-20 flex items-center"
        style={{ left: "42.99%", top: "50%", gap: "clamp(4px, 0.56vw, 8px)", padding: "clamp(4px, 0.56vw, 8px)", background: "#FFFFFF", borderRadius: "60px", boxShadow: "0px 0px 6px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center justify-center" style={{ width: "clamp(16px, 1.67vw, 24px)", height: "clamp(16px, 1.67vw, 24px)", background: "#D1FB39", borderRadius: "66.67px" }}>
          <span style={{ fontSize: "clamp(10px, 0.97vw, 14px)", lineHeight: 1 }}>🧐</span>
        </div>
        <span style={{ color: "#434343", fontSize: "clamp(10px, 0.97vw, 14px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
          中：自动搭建/执行/运行
        </span>
      </div>

      {/* ── Bottom glass panel with steps ────────────────────────── */}
      <div
        className="absolute z-10 flex flex-col"
        style={{
          left: 0,
          top: "51.94%",
          width: "100%",
          height: "56.02%",
          padding: "clamp(16px, 2.08vw, 30px)",
          gap: "clamp(8px, 0.83vw, 12px)",
          background: "rgba(255,255,255,0.2)",
          border: "1px solid #FFFFFF",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.12)",
        }}
      >
        {/* Step labels row */}
        <div className="flex items-start" style={{ gap: "clamp(8px, 0.83vw, 12px)" }}>
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-center"
              style={{ width: "16.67%", gap: "clamp(4px, 0.42vw, 6px)" }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "clamp(16px, 1.67vw, 24px)", height: "clamp(16px, 1.67vw, 24px)", background: "#D1FB39", borderRadius: "66.67px" }}
              >
                <p style={{ color: "#1F1F1F", fontSize: "clamp(8px, 0.83vw, 12px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "center", lineHeight: 1, margin: 0 }}>
                  {step.num}
                </p>
              </div>
              <span style={{ color: "#434343", fontSize: "clamp(10px, 0.97vw, 14px)", fontFamily: "'Alimama ShuHeiTi', sans-serif", fontWeight: 700, lineHeight: 1.7, whiteSpace: "nowrap" }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        {/* Step images row */}
        <div className="flex flex-1 min-h-0" style={{ gap: "clamp(8px, 0.83vw, 12px)" }}>
          {steps.map((step) => (
            <img
              key={step.img}
              src={`${P21}/${step.img}`}
              alt=""
              className="h-full object-cover"
              style={{ width: "16.67%", flexShrink: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
