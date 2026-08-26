"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { DarkPillTag } from "./dark-pill-tag";

const P21 = "/images/page21";

const steps = [
  { num: "01", label: "默认页面", img: "step1.webp" },
  { num: "02", label: "用户意图识别", img: "step2.webp" },
  { num: "03", label: "大纲规划生成", img: "step3.webp" },
  { num: "04", label: "工作流搭建", img: "step4.webp" },
  { num: "05", label: "工作流运行", img: "step5.webp" },
  { num: "06", label: "完成运行后输出", img: "step6.webp" },
];

function WorkflowPreview() {
  const [zoom, setZoom] = useState(1);
  const [locked, setLocked] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  const fitCanvas = () => {
    setZoom(1);
    setResetToken((value) => value + 1);
  };

  return (
    <div
      className="absolute z-10 overflow-hidden"
      style={{
        left: "50%",
        top: "16.67%",
        width: "50%",
        height: "46.57%",
        background: "#eef2f7",
        border: "2px solid rgba(255,255,255,0.12)",
        borderRadius: "18px",
        boxShadow: "0px 3.83px 7.66px rgba(0,0,0,0.4)",
      }}
    >
      <motion.div
        key={resetToken}
        drag={locked ? false : true}
        dragConstraints={{ left: -180, right: 180, top: -110, bottom: 110 }}
        dragElastic={0.04}
        dragMomentum={false}
        animate={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="absolute inset-0"
        style={{
          cursor: locked ? "default" : "grab",
          touchAction: "none",
          transformOrigin: "center",
        }}
        whileDrag={locked ? undefined : { cursor: "grabbing" }}
      >
        <img
          src={`${P21}/top-right.webp`}
          alt="生成后的工作流画布"
          className="h-full w-full select-none object-cover"
          style={{ objectPosition: "center top", pointerEvents: "none" }}
          draggable={false}
        />
      </motion.div>

      <div
        className="absolute right-[12px] top-[12px] z-30 flex items-center"
        style={{
          height: 32,
          padding: 3,
          gap: 2,
          border: "1px solid rgba(18,32,58,.14)",
          borderRadius: 999,
          background: "rgba(255,255,255,.9)",
          boxShadow: "0 8px 22px rgba(30,48,78,.13), inset 0 1px 0 rgba(255,255,255,.9)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={fitCanvas}
          className="h-[24px] rounded-full border-0 bg-transparent px-[9px] text-[10px] font-medium text-[#536174] hover:bg-[#edf3ff]"
        >
          适配
        </button>
        <span className="h-[14px] w-px bg-[#dce2eb]" />
        <button
          type="button"
          aria-label="缩小工作流"
          onClick={() => setZoom((value) => Math.max(0.8, Number((value - 0.1).toFixed(1))))}
          className="flex size-[24px] items-center justify-center rounded-full border-0 bg-transparent text-[16px] leading-none text-[#536174] hover:bg-[#edf3ff]"
        >
          −
        </button>
        <button
          type="button"
          onClick={fitCanvas}
          aria-label="恢复为百分之百"
          className="h-[24px] min-w-[42px] rounded-full border-0 bg-transparent px-[5px] text-[10px] font-semibold text-[#27364d] hover:bg-[#edf3ff]"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          aria-label="放大工作流"
          onClick={() => setZoom((value) => Math.min(1.4, Number((value + 0.1).toFixed(1))))}
          className="flex size-[24px] items-center justify-center rounded-full border-0 bg-transparent text-[16px] leading-none text-[#536174] hover:bg-[#edf3ff]"
        >
          +
        </button>
        <span className="h-[14px] w-px bg-[#dce2eb]" />
        <button
          type="button"
          aria-pressed={locked}
          onClick={() => setLocked((value) => !value)}
          className="h-[24px] rounded-full border-0 px-[9px] text-[10px] font-semibold"
          style={{
            color: locked ? "#fff" : "#536174",
            background: locked ? "#3f7ee8" : "transparent",
          }}
        >
          {locked ? "已锁" : "锁定"}
        </button>
      </div>

      <div
        className="pointer-events-none absolute bottom-[82px] left-[12px] z-30 flex items-center gap-[6px] rounded-full px-[10px] py-[6px]"
        style={{
          color: "rgba(36,52,77,.72)",
          background: "rgba(255,255,255,.84)",
          border: "1px solid rgba(35,55,84,.1)",
          boxShadow: "0 6px 18px rgba(30,48,78,.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          fontSize: 9,
          fontWeight: 600,
        }}
      >
        <span className="size-[5px] rounded-full bg-[#36c879] shadow-[0_0_8px_rgba(54,200,121,.8)]" />
        {locked ? "画布已锁定" : "拖动画布查看节点"}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[82px] right-[12px] z-30 h-[48px] w-[92px] overflow-hidden rounded-[7px]"
        style={{
          background: "rgba(255,255,255,.86)",
          border: "1px solid rgba(35,55,84,.12)",
          boxShadow: "0 6px 18px rgba(30,48,78,.1)",
        }}
      >
        <svg className="absolute inset-0 size-full" viewBox="0 0 92 48" fill="none">
          <path d="M11 26C22 26 22 17 33 17S44 29 55 29 66 20 81 20" stroke="#7a8fe7" strokeWidth="1.5" />
          <rect x="7" y="21" width="15" height="10" rx="2" fill="#dce8ff" stroke="#7da1ec" />
          <rect x="29" y="12" width="16" height="10" rx="2" fill="#e4defe" stroke="#8b7be8" />
          <rect x="52" y="24" width="16" height="10" rx="2" fill="#e1f5ea" stroke="#69c693" />
          <rect x="74" y="15" width="12" height="10" rx="2" fill="#e4edff" stroke="#7da1ec" />
        </svg>
        <span
          className="absolute rounded-[3px] border border-[#3f7ee8] bg-[#3f7ee8]/5"
          style={{
            left: `${14 + (zoom - 1) * 16}%`,
            top: `${13 + (zoom - 1) * 12}%`,
            width: `${72 / zoom}%`,
            height: `${72 / zoom}%`,
            transition: "all 240ms ease",
          }}
        />
      </div>
    </div>
  );
}

export default function SlidePage21() {
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
          Prompt To{" "}
        </span>
        <span
          style={{
            display: "inline-block",
            position: "relative",
            color: "#ef3b46",
            fontSize: "clamp(20px, calc(2.5 * var(--u)), 36px)",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            lineHeight: "52px",
            letterSpacing: "1.08px",
          }}
        >
          Workflow
          <svg
            style={{
              display: "none",
              position: "absolute",
              left: 0,
              bottom: "-1px",
              width: "100%",
              height: "13px",
              opacity: 0.5,
            }}
            viewBox="0 0 152 13"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="p21WorkflowWave" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5C5CFF" />
                <stop offset="100%" stopColor="#AE5CFF" />
              </linearGradient>
            </defs>
            <path
              d="M2 9.5C31 5 54 4.5 76 7C101 9.8 124 5.2 150 5.6"
              stroke="url(#p21WorkflowWave)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
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
          color: "rgba(255,255,255,0.72)",
          fontSize: "clamp(11px, calc(1.11 * var(--u)), 16px)",
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
        src={`${P21}/top-left.webp`}
        alt=""
        className="absolute z-10"
        style={{
          left: 0,
          top: "16.67%",
          width: "50%",
          height: "46.57%",
          objectFit: "cover",
          objectPosition: "center top",
          border: "2px solid rgba(255,255,255,0.12)",
          borderRadius: "18px",
          boxShadow: "0px 3.83px 7.66px rgba(0,0,0,0.4)",
        }}
      />
      <WorkflowPreview />

      {/* ── Floating emoji badges ────────────────────────────────── */}
      <div
        className="absolute z-20"
        style={{ left: "18.68%", top: "14.72%" }}
      >
        <DarkPillTag index="01">前：设计器空空如也</DarkPillTag>
      </div>
      <div
        className="absolute z-20"
        style={{ left: "67.71%", top: "14.81%" }}
      >
        <DarkPillTag index="03">后：生成结果/工作流保存</DarkPillTag>
      </div>
      <div
        className="absolute z-20"
        style={{ left: "42.99%", top: "50%" }}
      >
        <DarkPillTag index="02">中：自动搭建/执行/运行</DarkPillTag>
      </div>

      {/* ── Bottom glass panel with steps ────────────────────────── */}
      <div
        className="absolute z-10 grid"
        style={{
          left: "4.17%",
          top: "55.2%",
          width: "91.66%",
          height: "38.6%",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: "clamp(8px, calc(0.9 * var(--u)), 13px)",
          padding: "clamp(12px, calc(1.25 * var(--u)), 18px)",
          background:
            "linear-gradient(180deg, rgba(55,22,24,0.94) 0%, rgba(17,14,15,0.97) 46%, rgba(8,8,8,0.98) 100%)",
          border: "1px solid rgba(239,59,70,0.3)",
          borderRadius: "16px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "0 18px 42px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {steps.map((step) => (
          <article
            key={step.num}
            className="grid min-h-0 min-w-0"
            style={{ gridTemplateRows: "auto minmax(0, 1fr)", rowGap: "10px" }}
          >
            <div className="min-w-0">
              <DarkPillTag index={step.num}>{step.label}</DarkPillTag>
            </div>
            <div
              className="relative min-h-0 overflow-hidden"
              style={{
                borderRadius: "9px",
                background: "#eef2f7",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 10px 24px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={`${P21}/${step.img}`}
                alt={`${step.num} ${step.label}`}
                className="h-full w-full object-cover"
                style={{ objectPosition: "left top" }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
