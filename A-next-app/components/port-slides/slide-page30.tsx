const P30 = "/images/page30"

const timelineMoments = [
  { time: "00:00", label: "镜头建立", active: false },
  { time: "00:03", label: "人物入画", active: true },
  { time: "00:05", label: "动作峰值", active: true },
  { time: "00:10", label: "片段结束", active: true },
  { time: "00:14", label: "情绪停顿", active: false },
  { time: "00:18", label: "转场输出", active: false },
]

const semanticSteps = [
  {
    index: "01",
    english: "STRUCTURE",
    title: "理解内容结构",
    description: "把素材拆成镜头、人物、动作与场景，而不只是连续帧。",
  },
  {
    index: "02",
    english: "LOCATE",
    title: "定位语义事件",
    description: "用户选择“人物抬手”而不是记住 00:05 的时间坐标。",
  },
  {
    index: "03",
    english: "REWRITE",
    title: "只重写目标片段",
    description: "局部生成保持前后动作、人物身份与视觉风格连续。",
  },
]

function PhoneScreen({
  src,
  alt,
  style,
  priority = false,
}: {
  src: string
  alt: string
  style: React.CSSProperties
  priority?: boolean
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        aspectRatio: "750 / 1624",
        border: "5px solid #131313",
        outline: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "28px",
        background: "#0d0d0d",
        boxShadow: "0 26px 58px rgba(0,0,0,0.68), 0 0 36px rgba(177,0,8,0.13)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default function SlidePage30() {
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
            width: "22%",
            background:
              "linear-gradient(90deg, rgba(153,5,11,0.26), rgba(81,3,7,0.08) 52%, transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "18%",
            background:
              "linear-gradient(270deg, rgba(153,5,11,0.21), rgba(81,3,7,0.06) 52%, transparent)",
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
            04 / SEMANTIC TIMELINE
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
              语义时间轴
            </span>
          </h1>
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: "40%",
            color: "rgba(255,255,255,0.62)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(9px, calc(0.95 * var(--u)), 14px)",
            lineHeight: 1.65,
            textAlign: "right",
          }}
        >
          时间轴不再只记录秒数，而是理解素材中的人物、动作与事件，
          <br />
          让用户以内容语言定位和重写视频片段。
        </p>
      </header>

      <section
        className="absolute z-10"
        style={{
          left: "4.17%",
          top: "19.3%",
          width: "91.66%",
          height: "72.4%",
        }}
      >
        <div
          className="absolute"
          style={{ left: 0, top: 0, width: "63%", height: "80%" }}
        >
          <div
            className="absolute"
            style={{
              inset: "8% 2% 3% 2%",
              border: "1px solid rgba(207,37,44,0.24)",
              background:
                "linear-gradient(130deg, rgba(118,8,13,0.13), rgba(9,9,9,0.05) 46%, rgba(118,8,13,0.08))",
              transform: "rotate(-1.2deg)",
            }}
          />
          <PhoneScreen
            src={`${P30}/material-analysis.webp`}
            alt="Sketch 素材导入分析页面"
            style={{ left: "0.8%", top: "13%", width: "18.5%", zIndex: 2 }}
          />
          <PhoneScreen
            src={`${P30}/clip-select.webp`}
            alt="Sketch 片段选取页面"
            priority
            style={{ left: "20.5%", top: "0%", width: "22.5%", zIndex: 4 }}
          />
          <PhoneScreen
            src={`${P30}/progress.webp`}
            alt="Sketch 视频进度调整页面"
            style={{ left: "44.5%", top: "10%", width: "19.5%", zIndex: 3 }}
          />

          <div
            className="absolute"
            style={{
              left: "0.8%",
              top: "3%",
              width: "18%",
              zIndex: 6,
            }}
          >
            <div
              style={{
                color: "#df343c",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "clamp(7px, calc(0.66 * var(--u)), 10px)",
              }}
            >
              SOURCE ANALYSIS
            </div>
            <div
              style={{
                marginTop: "5px",
                color: "rgba(255,255,255,0.52)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "clamp(8px, calc(0.76 * var(--u)), 11px)",
              }}
            >
              导入后先理解素材
            </div>
          </div>

          <div
            className="absolute"
            style={{
              right: "1.8%",
              top: "24%",
              width: "30%",
              padding: "16px 0",
              borderTop: "1px solid rgba(215,44,51,0.54)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.28)",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "clamp(7px, calc(0.68 * var(--u)), 10px)",
              }}
            >
              EVENT WINDOW
            </div>
            <div
              style={{
                marginTop: "7px",
                color: "#d73a42",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "clamp(28px, calc(3.6 * var(--u)), 52px)",
                lineHeight: 1,
              }}
            >
              7s
            </div>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                marginTop: "14px",
              }}
            >
              {[
                ["07", "人物"],
                ["01", "主动作"],
                ["03", "镜头"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  style={{
                    borderLeft:
                      index === 0
                        ? undefined
                        : "1px solid rgba(255,255,255,0.1)",
                    paddingLeft: index === 0 ? 0 : "10px",
                  }}
                >
                  <div
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                      fontSize: "clamp(8px, calc(0.86 * var(--u)), 12px)",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      marginTop: "4px",
                      color: "rgba(255,255,255,0.32)",
                      fontFamily: "'PingFang SC', sans-serif",
                      fontSize: "clamp(7px, calc(0.66 * var(--u)), 10px)",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute"
          style={{
            left: "66%",
            top: "1%",
            width: "34%",
            height: "78%",
            borderLeft: "1px solid rgba(255,255,255,0.11)",
            paddingLeft: "28px",
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
            CORE INSIGHT / TIME BECOMES MEANING
          </div>
          <div
            style={{
              marginTop: "8px",
              color: "#fff",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(18px, calc(1.9 * var(--u)), 27px)",
              fontWeight: 400,
              lineHeight: 1.52,
              letterSpacing: "1px",
            }}
          >
            用户选择的不是七秒，
            <br />
            而是七秒里发生的事。
          </div>
          <div
            style={{
              marginTop: "18px",
              padding: "14px 0",
              borderTop: "1px solid rgba(215,44,51,0.42)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                color: "#d63a42",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "clamp(17px, calc(2.28 * var(--u)), 33px)",
              }}
            >
              00:03 — 00:10
            </span>
            <span
              style={{
                marginLeft: "14px",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "clamp(8px, calc(0.78 * var(--u)), 11px)",
              }}
            >
              已识别动作片段
            </span>
          </div>

          <div style={{ marginTop: "8px" }}>
            {semanticSteps.map((step) => (
              <div
                key={step.index}
                className="grid"
                style={{
                  gridTemplateColumns: "34px 88px 1fr",
                  gap: "8px",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{
                    color: "#dc343c",
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: "clamp(7px, calc(0.7 * var(--u)), 10px)",
                  }}
                >
                  {step.index}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: "clamp(6px, calc(0.6 * var(--u)), 9px)",
                  }}
                >
                  {step.english}
                </span>
                <div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.84)",
                      fontFamily: "'PingFang SC', sans-serif",
                      fontSize: "clamp(9px, calc(0.9 * var(--u)), 13px)",
                      fontWeight: 600,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      marginTop: "3px",
                      color: "rgba(255,255,255,0.36)",
                      fontFamily: "'PingFang SC', sans-serif",
                      fontSize: "clamp(7px, calc(0.66 * var(--u)), 10px)",
                      lineHeight: 1.55,
                    }}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute"
          style={{
            left: 0,
            bottom: "1%",
            width: "100%",
            height: "16%",
            borderTop: "1px solid rgba(255,255,255,0.11)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="absolute"
            style={{
              left: "1.8%",
              right: "1.8%",
              top: "50%",
              height: 1,
              background: "rgba(255,255,255,0.18)",
            }}
          />
          <div
            className="absolute"
            style={{
              left: "19.8%",
              width: "40%",
              top: "calc(50% - 2px)",
              height: 4,
              background: "#cc2f37",
              boxShadow: "0 0 18px rgba(204,47,55,0.48)",
            }}
          />
          <div
            className="absolute inset-0 flex justify-between"
            style={{ padding: "0 1.8%" }}
          >
            {timelineMoments.map((moment) => (
              <div
                key={moment.time}
                className="relative"
                style={{ width: "15%" }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    left: 0,
                    top: "calc(50% - 5px)",
                    width: "10px",
                    height: "10px",
                    border: moment.active
                      ? "2px solid #e14950"
                      : "1px solid rgba(255,255,255,0.35)",
                    background: moment.active ? "#8c1117" : "#0a0a0a",
                  }}
                />
                <div
                  style={{
                    marginTop: "10px",
                    color: moment.active ? "#e44a52" : "rgba(255,255,255,0.32)",
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: "clamp(7px, calc(0.68 * var(--u)), 10px)",
                  }}
                >
                  {moment.time}
                </div>
                <div
                  style={{
                    marginTop: "32px",
                    color: moment.active
                      ? "rgba(255,255,255,0.78)"
                      : "rgba(255,255,255,0.36)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "clamp(8px, calc(0.75 * var(--u)), 11px)",
                  }}
                >
                  {moment.label}
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
          ANALYZE → LOCATE → REWRITE → CONTINUE
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
