import { RemovalCardStrip } from "./removal-card-strip"

const P31 = "/images/page30"

const controlFlow = [
  {
    src: "clip-select.webp",
    step: "01",
    english: "RANGE / 定位范围",
    title: "选定修改片段",
  },
  {
    src: "paint-remove.webp",
    step: "02",
    english: "OBJECT / 锁定对象",
    title: "圈选对象并修改",
  },
  {
    src: "compare.webp",
    step: "03",
    english: "VERIFY / 验证结果",
    title: "前后对比并确认",
  },
]

const futureHypotheses = [
  ["01", "意图可表达", "自然语言、参考、草图与轨迹共同约束结果。"],
  ["02", "修改可定位", "对象、动作、镜头与时间段都能独立编辑。"],
  ["03", "过程可回退", "差异即时可见，任意版本都能比较与撤销。"],
  ["04", "资产可继续", "历史分支保留素材与意图，可继续创作和交付。"],
]

export default function SlidePage31() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "#070707",
        color: "#fff",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        fontSynthesis: "none",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.58,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.034) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.034) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "19%",
            background:
              "linear-gradient(90deg, rgba(157,5,12,0.23), rgba(81,3,7,0.06) 55%, transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "23%",
            background:
              "linear-gradient(270deg, rgba(157,5,12,0.25), rgba(81,3,7,0.07) 55%, transparent)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "4.17%",
            top: "16.7%",
            width: "91.66%",
            height: 1,
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </div>

      <header
        className="absolute z-20 flex items-end justify-between"
        style={{ left: "4.17%", top: "8.1%", width: "91.66%" }}
      >
        <div>
          <div
            style={{
              color: "#c9272f",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(8px, calc(0.78 * var(--u)), 12px)",
              fontWeight: 400,
              letterSpacing: "0.8px",
            }}
          >
            07 / HIGH-CONTROL CREATION SYSTEM
          </div>
          <h1
            style={{
              margin: "7px 0 0",
              color: "#fff",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(28px, calc(3.33 * var(--u)), 48px)",
              fontWeight: 400,
              lineHeight: 1.46,
              letterSpacing: "2.88px",
              whiteSpace: "nowrap",
            }}
          >
            AI 视频编辑
            <span style={{ color: "#d2353c", marginLeft: "10px" }}>
              高可控创作系统
            </span>
          </h1>
        </div>
        <div style={{ maxWidth: "48%", textAlign: "right" }}>
          <div
            style={{
              color: "#d43a42",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(7px, calc(0.7 * var(--u)), 10px)",
              letterSpacing: "0.8px",
            }}
          >
            RESEARCH INSIGHT / 最后的 20%
          </div>
          <p
            style={{
              margin: "7px 0 0",
              color: "rgba(255,255,255,0.62)",
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: "clamp(9px, calc(0.9 * var(--u)), 13px)",
              lineHeight: 1.65,
              whiteSpace: "nowrap",
            }}
          >
            生成解决前 80%，编辑决定最后 20%：创作者真正需要的是质量、掌控与预期一致。
          </p>
        </div>
      </header>

      <section
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "19.5%",
          width: "91.66%",
          height: "71.8%",
        }}
      >
        <div
          className="absolute"
          style={{
            left: 0,
            top: "1%",
            width: "73%",
            height: "94%",
            paddingRight: "24px",
            borderRight: "1px solid rgba(255,255,255,0.11)",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(7px, calc(0.7 * var(--u)), 10px)",
              letterSpacing: "0.8px",
            }}
          >
            CONTROL LOOP / LOCATE · EDIT · VERIFY
          </div>
          <div
            style={{
              marginTop: "8px",
              color: "#fff",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(17px, calc(1.78 * var(--u)), 25px)",
              fontWeight: 400,
              letterSpacing: "1px",
            }}
          >
            从定位到对比，修改过程始终可见
          </div>

          <div
            className="absolute grid"
            style={{
              left: 0,
              right: "24px",
              top: "13.5%",
              bottom: 0,
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "16px",
            }}
          >
            {controlFlow.map((stage, index) => (
              <article
                key={stage.step}
                className="relative flex min-w-0 flex-col items-center"
                style={{
                  padding: "12px 12px 0",
                  borderTop: "1px solid rgba(217,49,57,0.45)",
                  borderLeft: index > 0 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                  background:
                    index === 1
                      ? "linear-gradient(180deg, rgba(132,9,15,0.17), rgba(132,9,15,0.01) 52%)"
                      : "linear-gradient(180deg, rgba(255,255,255,0.025), transparent 52%)",
                }}
              >
                <div className="flex w-full items-start justify-between gap-[8px]">
                  <div>
                    <div
                      style={{
                        color: "#db353d",
                        fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                        fontSize: "clamp(7px, calc(0.66 * var(--u)), 10px)",
                      }}
                    >
                      {stage.step}
                    </div>
                    <h3
                      style={{
                        margin: "5px 0 0",
                        color: "rgba(255,255,255,0.82)",
                        fontFamily: "'PingFang SC', sans-serif",
                        fontSize: "clamp(10px, calc(1.02 * var(--u)), 15px)",
                        fontWeight: 650,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {stage.title}
                    </h3>
                  </div>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.28)",
                      fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                      fontSize: "clamp(5px, calc(0.5 * var(--u)), 8px)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stage.english}
                  </span>
                </div>

                <div
                  className="relative mt-[10px] overflow-hidden"
                  style={{
                    width: "178px",
                    aspectRatio: "375 / 812",
                    border: "4px solid #131313",
                    outline:
                      index === 2
                        ? "1px solid rgba(222,53,60,0.75)"
                        : "1px solid rgba(255,255,255,0.18)",
                    borderRadius: "24px",
                    background: "#0d0d0d",
                    boxShadow:
                      index === 2
                        ? "0 0 34px rgba(190,20,27,0.2)"
                        : "0 18px 38px rgba(0,0,0,0.55)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${P31}/${stage.src}`}
                    alt={`${stage.title}的 Sketch 界面`}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="block h-full w-full object-cover"
                  />
                  {index === 1 ? (
                    <RemovalCardStrip top="75.7%" activeIndex={0} />
                  ) : null}
                </div>

                {index < controlFlow.length - 1 && (
                  <span
                    className="absolute"
                    style={{
                      right: "-14px",
                      top: "49%",
                      color: "rgba(222,53,60,0.72)",
                      fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                      fontSize: "16px",
                      zIndex: 2,
                    }}
                  >
                    →
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>

        <div
          className="absolute"
          style={{ left: "76.3%", top: "1%", width: "23.7%", height: "94%" }}
        >
          <div
            style={{
              color: "#d63840",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(28px, calc(3.1 * var(--u)), 46px)",
              lineHeight: 1,
            }}
          >
            CONTROL
          </div>
          <div
            style={{
              marginTop: "8px",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(7px, calc(0.68 * var(--u)), 10px)",
            }}
          >
            FUTURE CORE / 四个控制维度
          </div>
          <div
            style={{
              marginTop: "20px",
              color: "#fff",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(16px, calc(1.62 * var(--u)), 23px)",
              fontWeight: 400,
              lineHeight: 1.55,
              letterSpacing: "1px",
            }}
          >
            让每次修改都
            <br />
            可定位、可预期、可回退。
          </div>

          <div style={{ marginTop: "18px" }}>
            {futureHypotheses.map(([index, title, description]) => (
              <div
                key={index}
                className="grid"
                style={{
                  gridTemplateColumns: "30px 1fr",
                  gap: "10px",
                  padding: "10px 0",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  style={{
                    color: "#da343c",
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: "clamp(7px, calc(0.66 * var(--u)), 10px)",
                  }}
                >
                  {index}
                </span>
                <div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "'PingFang SC', sans-serif",
                      fontSize: "clamp(9px, calc(0.88 * var(--u)), 13px)",
                      fontWeight: 600,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      marginTop: "4px",
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "'PingFang SC', sans-serif",
                      fontSize: "clamp(7px, calc(0.66 * var(--u)), 10px)",
                      lineHeight: 1.55,
                    }}
                  >
                    {description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer
        className="absolute z-30 flex items-center justify-between"
        style={{ left: "4.17%", right: "4.17%", bottom: "2.4%" }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.26)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "clamp(7px, calc(0.7 * var(--u)), 10px)",
          }}
        >
          HIGH-CONTROL AI EDITING → INTENT · LOCALITY · REVERSIBILITY · CONTINUITY
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.26)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "clamp(7px, calc(0.7 * var(--u)), 10px)",
          }}
        >
          © RIAN · PRODUCT DESIGN
        </span>
      </footer>
    </div>
  )
}
