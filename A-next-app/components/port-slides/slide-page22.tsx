const P22 = "/images/page22";

export default function SlidePage22() {
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



      {/* ── Title (entirely gradient) ────────────────────────────── */}
      <span
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "9.26%",
          color: "#ef3b46",
          fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
          fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
          lineHeight: "52px",
          letterSpacing: "1.08px",
        }}
      >
        对内应用
      </span>

      {/* ── Decorative wavy line ─────────────────────────────────── */}
      <svg
        className="absolute z-10"
        style={{ display: "none" }}
        viewBox="0 0 152 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient x1="0.0735" y1="0.129" x2="1.003" y2="0.132" id="p22wv">
            <stop offset="0%" stopColor="#5C5CFF" />
            <stop offset="100%" stopColor="#AE5CFF" />
          </linearGradient>
        </defs>
        <path d="M67.220451,12.986349Q113.09277,7.5991349,149.95132,8.4963117L149.95134,8.4959111Q149.97566,8.4965034,150,8.4965034Q150.09824,8.4965034,150.196,8.4868746Q150.29376,8.477246300000001,150.39009,8.458081199999999Q150.48645,8.438917199999999,150.58044,8.4104013Q150.67444,8.3818855,150.7652,8.3442926Q150.85596,8.3067002,150.9426,8.2603927Q151.02924,8.2140856,151.1109,8.159509199999999Q151.1926,8.1049337,151.26852,8.0426149Q151.34447,7.9802961,151.41393,7.9108338Q151.4834,7.8413725,151.54572,7.7654362Q151.60803,7.6895003,151.6626,7.607821Q151.71716,7.5261431,151.76349,7.439508Q151.80978,7.3528733,151.84738,7.2621164Q151.88499,7.1713605,151.91351,7.0773563Q151.94203,6.9833527,151.96118,6.8870058Q151.98035,6.7906599,151.98999,6.6928988Q151.9996,6.5951376,151.9996,6.4969034Q151.99959,6.4001927,151.99025,6.3039336Q151.98093,6.207674,151.96234,6.1127653Q151.94376,6.0178561,151.91611,5.9251828Q151.88847,5.83251,151.85202,5.7429380000000005Q151.81555,5.6533656,151.7706,5.5677304Q151.72565,5.4820952,151.67267,5.4011967Q151.61966,5.3202982,151.55911,5.2448914Q151.49857,5.1694846000000005,151.43103,5.1002735999999995Q151.36346,5.0310621,151.28955,4.9686927999999995Q151.21564,4.906323,151.13605,4.8513772Q151.05646,4.796431500000001,150.97194,4.7494226Q150.88742,4.7024136,150.79878,4.6637807Q150.71011,4.6251473,150.61813,4.5952500999999994Q150.52615,4.5653532000000006,150.43173,4.5444715Q150.3373,4.5235896,150.2413,4.5119185Q150.14529,4.500247,150.04863,4.497895L150.04865,4.4974959000000005Q115.65866,3.6604067000000002,73.542511,8.2452998Q76.467125,6.1883349,76.396248,3.7974395000000003Q76.33403,1.69870716,74.156258,0.6908292Q72.621521,-0.019450200000000084,70.09156,0.004706000000000099Q50.876682,0.1881716,1.70265764,7.5810919L1.70271716,7.5814877Q1.61481601,7.5947027,1.52843422,7.6156659Q1.44205242,7.6366286,1.35787141,7.6651735Q1.2736904,7.6937184,1.19237423,7.72962Q1.11105812,7.765522,1.0332483099999998,7.8084974Q0.9554385000000001,7.8514729,0.8817489000000001,7.9011827Q0.8080592,7.9508924,0.7390711000000001,8.0069451Q0.670083,8.0629978,0.6063406,8.1249504Q0.5425982,8.186903000000001,0.48460459999999994,8.2542677Q0.4266106999999999,8.3216324,0.3748229999999999,8.393876599999999Q0.3230352000000001,8.4661217,0.2778620999999999,8.542676400000001Q0.23268909999999998,8.6192312,0.1944870999999999,8.6994925Q0.156285,8.7797537,0.1253552,8.863087700000001Q0.09442539999999999,8.9464221,0.07101209999999991,9.0321722Q0.04759880000000005,9.1179223,0.03188659999999999,9.2054114Q0.016174300000000086,9.2929006,0.008287099999999992,9.3814387Q0.0003998000000000612,9.469976899999999,0.00039989999999989756,9.5588655Q0.00039989999999989756,9.6570997,0.010028600000000054,9.7548609Q0.019657100000000094,9.852622,0.03882180000000002,9.9489679Q0.057986300000000046,10.0453148,0.08650209999999992,10.1393185Q0.1150179,10.2333221,0.15261049999999998,10.3240786Q0.1902029999999999,10.414835,0.23651029999999995,10.5014706Q0.2828174000000001,10.5881052,0.33739340000000007,10.6697836Q0.3919691999999999,10.7514629,0.4542881999999999,10.8273983Q0.5166073,10.9033346,0.5860692999999999,10.9727955Q0.6555313,11.0422573,0.7314672,11.1045771Q0.8074030999999999,11.1668959,0.8890818,11.2214718Q0.9707603,11.2760477,1.0573951,11.3223543Q1.1440298,11.3686619,1.2347862699999999,11.4062538Q1.3255426300000002,11.4438477,1.41954672,11.4723625Q1.51355088,11.5008793,1.6098974,11.5200434Q1.70624387,11.5392094,1.80400491,11.5488377Q1.901765943,11.558466,2,11.558466Q2.14947201,11.558466,2.2972829,11.5362434L2.29734236,11.5366392Q51.194672,4.1853178,70.129753,4.0045234999999995Q71.405319,3.9923444,72.121872,4.1931777Q72.072655,4.2476315,72.016205,4.30528Q71.22773,5.1105044,69.646561,5.9137699999999995Q65.591633,7.9737582,65.03178,10.5799513Q64.962162,10.904048,65.000828,11.2332764Q65.023804,11.428915,65.084507,11.6163111Q65.14520999999999,11.8037071,65.24130199999999,11.9756613Q65.337395,12.147615,65.465191,12.297517Q65.592983,12.44742,65.747562,12.56951Q65.90214900000001,12.691603,66.077583,12.78119Q66.253014,12.870777,66.442551,12.924417Q66.632095,12.97806,66.828461,12.993692Q67.024818,13.009326,67.220451,12.986349Z" fillRule="evenodd" fill="url(#p22wv)" fillOpacity="1" />
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
          maxWidth: "50%",
        }}
      >
        作为skill底座打造淘天创意AGENT_MIO
      </p>

      {/* ── Card 1 (dark, top-left) ──────────────────────────────── */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: "4.17%",
          top: "16.67%",
          width: "31.74%",
          height: "27.5%",
          background: "#222222",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
        }}
      >
        <img
          src={`${P22}/dark-card-bg.webp`}
          alt=""
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: "100%",
            height: "64.31%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        <p
          className="absolute"
          style={{
            left: "6.56%",
            top: "69%",
            color: "#FFFFFF",
            fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)",
            fontFamily: "'PingFang SC', sans-serif",
            fontWeight: 500,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          2024/2025阿里淘天技术节
        </p>
        <p
          className="absolute"
          style={{
            left: "6.56%",
            top: "84%",
            color: "rgba(255,255,255,0.6)",
            fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)",
            fontFamily: "'PingFang SC', sans-serif",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          作为开发平台支持用户产品设计和demo展示
        </p>
      </div>

      {/* ── Card 2 (dark, top-right) ─────────────────────────────── */}
      <div
        className="absolute z-10 flex flex-col overflow-hidden"
        style={{
          left: "37.29%",
          top: "16.67%",
          width: "58.54%",
          height: "27.5%",
          background: "#222222",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            padding: "clamp(10px, calc(1.11 * var(--u)), 16px) clamp(12px, calc(1.39 * var(--u)), 20px) clamp(6px, calc(0.56 * var(--u)), 8px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)",
              fontFamily: "'PingFang SC', sans-serif",
              fontWeight: 500,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            1.自由画布探索
          </p>
          <p
            style={{
              margin: "clamp(2px, calc(0.28 * var(--u)), 4px) 0 0",
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)",
              fontFamily: "'PingFang SC', sans-serif",
              lineHeight: 1.6,
            }}
          >
            降低使用难度实现面向产运小二的NoCode搭建
          </p>
        </div>
        <div
          className="flex flex-1 min-h-0"
          style={{
            gap: "clamp(6px, calc(0.56 * var(--u)), 8px)",
            padding: "clamp(6px, calc(0.56 * var(--u)), 8px) clamp(10px, calc(1.11 * var(--u)), 16px) clamp(10px, calc(1.11 * var(--u)), 16px)",
          }}
        >
          <div
            className="relative flex-1 min-w-0 overflow-hidden"
            style={{
              background: "#141414",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={`${P22}/card2-left.webp`}
              alt=""
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <div
            className="relative flex-1 min-w-0 overflow-hidden"
            style={{
              background: "#141414",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={`${P22}/card2-right.webp`}
              alt=""
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>

      {/* ── Card 3 (dark bottom — agent showcase) ───────────────── */}
      <div
        className="absolute z-10 flex flex-col overflow-hidden"
        style={{
          left: "4.17%",
          top: "46.02%",
          width: "91.67%",
          height: "48.43%",
          background: "#222222",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            flexShrink: 0,
            padding: "clamp(12px, calc(1.39 * var(--u)), 20px) clamp(16px, calc(2.08 * var(--u)), 30px) clamp(8px, calc(0.83 * var(--u)), 12px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(12px, calc(1.11 * var(--u)), 16px)",
              fontFamily: "'PingFang SC', sans-serif",
              fontWeight: 500,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            妙应Mio创意智能体
          </p>
          <p
            style={{
              margin: "clamp(2px, calc(0.28 * var(--u)), 4px) 0 0",
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(10px, calc(0.97 * var(--u)), 14px)",
              fontFamily: "'PingFang SC', sans-serif",
              lineHeight: 1.6,
            }}
          >
            Agent执行逻辑：理解与规划 -&gt; 分析与洞察 -&gt; 策略确认 -&gt; 创意制作
          </p>
        </div>

        {/* Screenshots — dark-framed, letterboxed */}
        <div
          className="flex flex-1 min-h-0"
          style={{
            gap: "clamp(8px, calc(0.83 * var(--u)), 12px)",
            padding: "clamp(8px, calc(0.83 * var(--u)), 12px) clamp(12px, calc(1.39 * var(--u)), 20px) clamp(12px, calc(1.39 * var(--u)), 20px)",
          }}
        >
          <div
            className="relative flex-1 min-w-0 overflow-hidden"
            style={{
              background: "#141414",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={`${P22}/card3-left.webp`}
              alt=""
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <div
            className="relative flex-1 min-w-0 overflow-hidden"
            style={{
              background: "#141414",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={`${P22}/card3-right.webp`}
              alt=""
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
