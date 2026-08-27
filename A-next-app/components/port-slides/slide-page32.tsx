export default function SlidePage32() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "#030303",
        color: "#fff",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        fontSynthesis: "none",
      }}
    >
      <img
        src="/images/page30/all-sketch-pages.webp"
        alt="视频 Sketch 文件中的 85 个真实页面总览"
        loading="eager"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <img
        src="/images/page30/material-analysis.webp"
        alt="导入素材智能分析页面"
        loading="eager"
        decoding="async"
        draggable={false}
        className="pointer-events-none absolute object-cover"
        style={{
          left: "3.42%",
          top: "34.75%",
          width: "4.08%",
          height: "14.05%",
          objectPosition: "center center",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 0 14px rgba(0,0,0,0.9)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "42%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.82) 38%, rgba(0,0,0,0.34) 76%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "35%",
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.66) 46%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0"
        style={{
          width: "19%",
          background:
            "linear-gradient(90deg, rgba(148,3,9,0.29), rgba(90,2,6,0.1) 54%, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0"
        style={{
          width: "19%",
          background:
            "linear-gradient(270deg, rgba(148,3,9,0.29), rgba(90,2,6,0.1) 54%, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 120px rgba(0,0,0,0.62)",
        }}
      />


      <header
        className="absolute z-20"
        style={{ left: "4.17%", top: "8.2%", width: "72%" }}
      >
        <div
          style={{
            color: "#d33a42",
            fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
            fontSize: "clamp(8px, calc(0.8 * var(--u)), 12px)",
            fontWeight: 400,
            letterSpacing: "0.8px",
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          06 / COMPLETE PRODUCT SYSTEM
        </div>
        <h1
          className="ai-video-project-title"
          style={{
            margin: "8px 0 0",
            color: "#fff",
            lineHeight: 1.36,
            letterSpacing: "2.8px",
            textShadow: "0 4px 18px rgba(0,0,0,0.96)",
            whiteSpace: "nowrap",
          }}
        >
          从灵感到成片
          <span style={{ color: "#d43b43", marginLeft: "12px" }}>
            全链路系统
          </span>
        </h1>
        <p
          style={{
            margin: "10px 0 0",
            maxWidth: "74%",
            color: "rgba(255,255,255,0.67)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(10px, calc(1.02 * var(--u)), 15px)",
            lineHeight: 1.65,
            textShadow: "0 2px 10px rgba(0,0,0,0.96)",
          }}
        >
          覆盖发现灵感、导入分析、片段编辑、对象调用、生成等待、版本比较、
          导出分享与个人资产沉淀的完整移动端创作体验。
        </p>
      </header>

      <div
        className="absolute z-20 text-right"
        style={{ right: "4.17%", top: "8.1%" }}
      >
        <div
          style={{
            color: "#fff",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "clamp(46px, calc(7.6 * var(--u)), 108px)",
            lineHeight: 0.9,
            textShadow: "0 5px 24px rgba(0,0,0,0.96)",
          }}
        >
          85
        </div>
        <div
          style={{
            marginTop: "8px",
            color: "#db3a42",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "clamp(8px, calc(0.84 * var(--u)), 12px)",
            letterSpacing: "1px",
            textShadow: "0 2px 8px rgba(0,0,0,0.96)",
          }}
        >
          REAL SKETCH ARTBOARDS
        </div>
      </div>

      <div
        className="absolute z-20"
        style={{
          left: "4.17%",
          right: "4.17%",
          bottom: "7.5%",
          borderTop: "1px solid rgba(255,255,255,0.22)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(6, 1fr)",
            minHeight: "72px",
          }}
        >
          {[
            ["01", "DISCOVER", "发现灵感"],
            ["02", "IMPORT", "导入分析"],
            ["03", "EDIT", "多模态编辑"],
            ["04", "GENERATE", "生成与等待"],
            ["05", "COMPARE", "对比与选择"],
            ["06", "DELIVER", "导出与沉淀"],
          ].map(([index, english, title], itemIndex) => (
            <div
              key={english}
              className="flex items-center"
              style={{
                gap: "10px",
                padding: "0 18px",
                borderLeft:
                  itemIndex === 0
                    ? undefined
                    : "1px solid rgba(255,255,255,0.13)",
              }}
            >
              <span
                style={{
                  color: "#dc3c44",
                  fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                  fontSize: "clamp(7px, calc(0.72 * var(--u)), 10px)",
                }}
              >
                {index}
              </span>
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                    fontSize: "clamp(6px, calc(0.6 * var(--u)), 9px)",
                  }}
                >
                  {english}
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    color: "rgba(255,255,255,0.86)",
                    fontFamily: "'PingFang SC', sans-serif",
                    fontSize: "clamp(9px, calc(0.9 * var(--u)), 13px)",
                    fontWeight: 600,
                  }}
                >
                  {title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer
        className="absolute z-30 flex items-center justify-between"
        style={{ left: "4.17%", right: "4.17%", bottom: "2.4%" }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.48)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "clamp(7px, calc(0.7 * var(--u)), 10px)",
            textShadow: "0 2px 8px rgba(0,0,0,0.96)",
          }}
        >
          85 STATES · 6 FLOWS · 1 CREATION SYSTEM
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.48)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "clamp(7px, calc(0.7 * var(--u)), 10px)",
            textShadow: "0 2px 8px rgba(0,0,0,0.96)",
          }}
        >
          © RIAN · PRODUCT DESIGN
        </span>
      </footer>
    </div>
  )
}
