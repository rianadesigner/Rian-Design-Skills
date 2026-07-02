const P11 = "/images/page11";

export default function SlidePage11() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* ── 深色底 + 红光晕 ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: 0, left: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 0% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        <div className="absolute" style={{ top: 0, right: 0, width: "18%", height: "100%", background: "radial-gradient(ellipse at 100% 50%, rgba(200,8,8,0.26) 0%, rgba(180,0,0,0.10) 45%, transparent 75%)" }} />
        {/* 网格线装饰 */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="absolute inset-0 h-full w-full" viewBox="0 0 1443 1081.5" preserveAspectRatio="none">
          <path d="M62,1081.5L61,1081.5L61,61.5L62,61.5L62,1081.5ZM461,61.5L462,61.5L462,1081.5L461,1081.5L461,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
          <path d="M522,1081.5L521,1081.5L521,61.5L522,61.5L522,1081.5ZM921,61.5L922,61.5L922,1081.5L921,1081.5L921,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
          <path d="M982,1081.5L981,1081.5L981,61.5L982,61.5L982,1081.5ZM1381,61.5L1382,61.5L1382,1081.5L1381,1081.5L1381,61.5Z" fillRule="evenodd" fill="#FFFFFF" fillOpacity="0.04" />
          <rect x="0.75" y="0.75" width="1441.5" height="61.5" rx="0" fillOpacity="0" strokeOpacity="0.08" stroke="#FFFFFF" fill="none" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute z-10" style={{ left: "4.17%", top: "1.48%", width: "91.67%", height: "3.33%" }}>
        <img loading="lazy" decoding="async" src={"/images/logo-new.webp"} alt="" className="absolute left-0 top-0 h-full object-contain" style={{ width: "5.97%" }} />
        <div className="absolute right-0 top-0 flex h-full items-center gap-[calc(0.7 * var(--u))]">
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(12px, calc(1.67 * var(--u)), 24px)", fontFamily: "'LogoSC Unbounded Sans', sans-serif", textAlign: "right", lineHeight: 1.4, margin: 0, whiteSpace: "nowrap" }}>
            终端CLI：&nbsp;&nbsp;面向技术开发者的免费开源终端AI助手 / 11
          </p>
        </div>
        <div className="absolute" style={{ left: "7.5%", top: "-2.6%" }}>
          <div style={{ border: "1px solid rgba(255,255,255,0.22)", padding: "calc(0.3 * var(--u)) calc(0.8 * var(--u))", transform: "rotate(-1deg)" }}>
            <p style={{ fontFamily: "'LogoSC Unbounded Sans', sans-serif", fontSize: "clamp(10px, calc(1.1 * var(--u)), 16px)", lineHeight: 1.4, margin: 0, color: "rgba(255,255,255,0.55)" }}>
              2024 / 2025
            </p>
          </div>
        </div>
      </div>

      {/* ── Title ────────────────────────────────────────────────── */}
      <span className="absolute z-10" style={{ left: "4.17%", top: "9.26%" }}>
        <span
          style={{
            backgroundImage: "linear-gradient(135deg, #5C5CFF 0%, #AE5CFF 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          Terminal CLI
        </span>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          终端AI助手
        </span>
      </span>

      {/* ── Decorative wavy line ─────────────────────────────────── */}
      <svg
        className="absolute z-10"
        style={{ left: "4.17%", top: "13.33%", width: "clamp(80px, calc(9.03 * var(--u)), 130px)", height: "13px", opacity: 0.5 }}
        viewBox="0 0 152 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient x1="0.0735" y1="0.129" x2="1.003" y2="0.132" id="p11wv">
            <stop offset="0%" stopColor="#5C5CFF" />
            <stop offset="100%" stopColor="#AE5CFF" />
          </linearGradient>
        </defs>
        <path d="M67.220451,12.986349Q113.09277,7.5991349,149.95132,8.4963117L149.95134,8.4959111Q149.97566,8.4965034,150,8.4965034Q150.09824,8.4965034,150.196,8.4868746Q150.29376,8.477246300000001,150.39009,8.458081199999999Q150.48645,8.438917199999999,150.58044,8.4104013Q150.67444,8.3818855,150.7652,8.3442926Q150.85596,8.3067002,150.9426,8.2603927Q151.02924,8.2140856,151.1109,8.159509199999999Q151.1926,8.1049337,151.26852,8.0426149Q151.34447,7.9802961,151.41393,7.9108338Q151.4834,7.8413725,151.54572,7.7654362Q151.60803,7.6895003,151.6626,7.607821Q151.71716,7.5261431,151.76349,7.439508Q151.80978,7.3528733,151.84738,7.2621164Q151.88499,7.1713605,151.91351,7.0773563Q151.94203,6.9833527,151.96118,6.8870058Q151.98035,6.7906599,151.98999,6.6928988Q151.9996,6.5951376,151.9996,6.4969034Q151.99959,6.4001927,151.99025,6.3039336Q151.98093,6.207674,151.96234,6.1127653Q151.94376,6.0178561,151.91611,5.9251828Q151.88847,5.83251,151.85202,5.7429380000000005Q151.81555,5.6533656,151.7706,5.5677304Q151.72565,5.4820952,151.67267,5.4011967Q151.61966,5.3202982,151.55911,5.2448914Q151.49857,5.1694846000000005,151.43103,5.1002735999999995Q151.36346,5.0310621,151.28955,4.9686927999999995Q151.21564,4.906323,151.13605,4.8513772Q151.05646,4.796431500000001,150.97194,4.7494226Q150.88742,4.7024136,150.79878,4.6637807Q150.71011,4.6251473,150.61813,4.5952500999999994Q150.52615,4.5653532000000006,150.43173,4.5444715Q150.3373,4.5235896,150.2413,4.5119185Q150.14529,4.500247,150.04863,4.497895L150.04865,4.4974959000000005Q115.65866,3.6604067000000002,73.542511,8.2452998Q76.467125,6.1883349,76.396248,3.7974395000000003Q76.33403,1.69870716,74.156258,0.6908292Q72.621521,-0.019450200000000084,70.09156,0.004706000000000099Q50.876682,0.1881716,1.70265764,7.5810919L1.70271716,7.5814877Q1.61481601,7.5947027,1.52843422,7.6156659Q1.44205242,7.6366286,1.35787141,7.6651735Q1.2736904,7.6937184,1.19237423,7.72962Q1.11105812,7.765522,1.0332483099999998,7.8084974Q0.9554385000000001,7.8514729,0.8817489000000001,7.9011827Q0.8080592,7.9508924,0.7390711000000001,8.0069451Q0.670083,8.0629978,0.6063406,8.1249504Q0.5425982,8.186903000000001,0.48460459999999994,8.2542677Q0.4266106999999999,8.3216324,0.3748229999999999,8.393876599999999Q0.3230352000000001,8.4661217,0.2778620999999999,8.542676400000001Q0.23268909999999998,8.6192312,0.1944870999999999,8.6994925Q0.156285,8.7797537,0.1253552,8.863087700000001Q0.09442539999999999,8.9464221,0.07101209999999991,9.0321722Q0.04759880000000005,9.1179223,0.03188659999999999,9.2054114Q0.016174300000000086,9.2929006,0.008287099999999992,9.3814387Q0.0003998000000000612,9.469976899999999,0.00039989999999989756,9.5588655Q0.00039989999999989756,9.6570997,0.010028600000000054,9.7548609Q0.019657100000000094,9.852622,0.03882180000000002,9.9489679Q0.057986300000000046,10.0453148,0.08650209999999992,10.1393185Q0.1150179,10.2333221,0.15261049999999998,10.3240786Q0.1902029999999999,10.414835,0.23651029999999995,10.5014706Q0.2828174000000001,10.5881052,0.33739340000000007,10.6697836Q0.3919691999999999,10.7514629,0.4542881999999999,10.8273983Q0.5166073,10.9033346,0.5860692999999999,10.9727955Q0.6555313,11.0422573,0.7314672,11.1045771Q0.8074030999999999,11.1668959,0.8890818,11.2214718Q0.9707603,11.2760477,1.0573951,11.3223543Q1.1440298,11.3686619,1.2347862699999999,11.4062538Q1.3255426300000002,11.4438477,1.41954672,11.4723625Q1.51355088,11.5008793,1.6098974,11.5200434Q1.70624387,11.5392094,1.80400491,11.5488377Q1.901765943,11.558466,2,11.558466Q2.14947201,11.558466,2.2972829,11.5362434L2.29734236,11.5366392Q51.194672,4.1853178,70.129753,4.0045234999999995Q71.405319,3.9923444,72.121872,4.1931777Q72.072655,4.2476315,72.016205,4.30528Q71.22773,5.1105044,69.646561,5.9137699999999995Q65.591633,7.9737582,65.03178,10.5799513Q64.962162,10.904048,65.000828,11.2332764Q65.023804,11.428915,65.084507,11.6163111Q65.14520999999999,11.8037071,65.24130199999999,11.9756613Q65.337395,12.147615,65.465191,12.297517Q65.592983,12.44742,65.747562,12.56951Q65.90214900000001,12.691603,66.077583,12.78119Q66.253014,12.870777,66.442551,12.924417Q66.632095,12.97806,66.828461,12.993692Q67.024818,13.009326,67.220451,12.986349Z" fillRule="evenodd" fill="url(#p11wv)" fillOpacity="1" />
      </svg>

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
          whiteSpace: "nowrap",
        }}
      >
        一个命令行工具？ 不！ 它是运行在终端里面的 AI 编程伙伴
      </p>

      {/* ── Main dark panel ──────────────────────────────────────── */}
      <div
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "16.67%",
          width: "91.67%",
          height: "83.33%",
          background: "#131313",
          border: "1px solid rgba(255,255,255,0.1)",
          borderTopLeftRadius: "18px",
          borderTopRightRadius: "18px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        {/* ── Left: Terminal screenshot ───────────────────────────── */}
        <div
          className="absolute"
          style={{
            left: "3.03%",
            top: "4.44%",
            width: "36.36%",
            height: "95.56%",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={`${P11}/terminal.png`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* ── Top banner: UNIX 美学 ──────────────────────────────── */}
        <div
          className="absolute"
          style={{
            left: "40.3%",
            top: "4.44%",
            width: "56.67%",
            height: "13%",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={`${P11}/banner.png`}
            alt=""
            className="absolute"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", height: "60%", objectFit: "contain" }}
          />
        </div>

        {/* ── Card: 一切皆文件 ────────────────────────────────────── */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: "40.3%",
            top: "18.78%",
            width: "27.88%",
            height: "49.67%",
            padding: "20px 12px 12px",
            gap: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(14px, calc(1.53 * var(--u)), 22px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5 }}>
            一切皆文件
          </span>
          <p style={{ color: "#BFBFBF", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5, textAlign: "center", margin: 0 }}>
            访问所有资源的超级入口
          </p>
          <img
            src={`${P11}/card-files.png`}
            alt=""
            className="flex-1 w-full object-contain"
            style={{ borderRadius: "9px", minHeight: 0 }}
          />
        </div>

        {/* ── Card: 可集成 ────────────────────────────────────────── */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: "40.3%",
            top: "69.78%",
            width: "27.88%",
            height: "63.33%",
            padding: "20px 12px 12px",
            gap: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(14px, calc(1.53 * var(--u)), 22px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5 }}>
            可集成
          </span>
          <p style={{ color: "#BFBFBF", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5, margin: 0, width: "100%" }}>
            无缝集成到你熟悉的开发环境中，提升开发效率
          </p>
          <img
            src={`${P11}/card-integrate.png`}
            alt=""
            className="w-full"
            style={{ borderRadius: "9px", objectFit: "cover", height: "clamp(80px, calc(10.56 * var(--u)), 152px)" }}
          />
        </div>

        {/* ── Card: 可组合 ────────────────────────────────────────── */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: "69.09%",
            top: "18.78%",
            width: "27.88%",
            height: "42.89%",
            padding: "20px 12px 12px",
            gap: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(14px, calc(1.53 * var(--u)), 22px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5 }}>
            可组合
          </span>
          <p style={{ color: "#BFBFBF", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5, textAlign: "center", margin: 0 }}>
            不同应用支持创建小巧、专一、可组合的工具
          </p>
          <img
            src={`${P11}/card-compose.png`}
            alt=""
            className="flex-1 w-full"
            style={{ borderRadius: "9px", objectFit: "cover", minHeight: 0 }}
          />
        </div>

        {/* ── Card: 不止于代码 ────────────────────────────────────── */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: "69.09%",
            top: "63%",
            width: "27.88%",
            height: "41.89%",
            padding: "20px 12px 12px",
            gap: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: "clamp(14px, calc(1.53 * var(--u)), 22px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5 }}>
            不止于代码
          </span>
          <p style={{ color: "#BFBFBF", fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)", fontFamily: "'PingFang SC', sans-serif", fontWeight: 500, lineHeight: 1.5, textAlign: "center", margin: 0 }}>
            iFlow开放平台拓展海量生态能力
          </p>
          <img
            src={`${P11}/card-beyond.png`}
            alt=""
            className="flex-1 w-full"
            style={{ borderRadius: "9px", objectFit: "cover", objectPosition: "center top", minHeight: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
