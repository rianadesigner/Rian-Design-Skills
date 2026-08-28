const creationFlow = [
  {
    src: "/images/page28/video-character-library.webp",
    step: "01",
    stage: "CAST",
    title: "视频角色库",
    description: "通过 @ 快速唤起已保存角色，让人物素材随时复用。",
    alt: "视频角色选择界面，主画面为穿红色西装的女性，底部展示可通过 @ 唤起的角色列表和已选角色",
  },
  {
    src: "/images/page28/style-filter.webp",
    step: "02",
    stage: "STYLE",
    title: "风格滤镜",
    description: "一键套用不同影调，让同一素材快速切换视觉氛围。",
    alt: "风格滤镜界面，主画面为海边徒步合照，底部展示电影胶片、暖调和北欧冷调等滤镜",
  },
  {
    src: "/images/page28/co-create.webp",
    step: "03",
    stage: "COLLAB",
    title: "多人合拍",
    description: "从角色库选择搭档，让多个角色加入同一画面。",
    alt: "多人合拍界面，主画面为海边徒步合照，底部展示可加入合拍的角色列表和已选角色",
  },
  {
    src: "/images/page28/subject-removal.webp",
    step: "04",
    stage: "CLEANUP",
    title: "主体消除",
    description: "识别并移除主体或路人，快速清理画面干扰。",
    alt: "主体消除界面，画面中的多人被轮廓标记，底部提供主体、路人、配饰、水印和文字等消除选项",
  },
]

function FlowPhone({
  src,
  label,
  style,
}: {
  src: string
  label: string
  style: React.CSSProperties
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        aspectRatio: "750 / 1624",
        border: "5px solid #131313",
        outline: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "28px",
        background: "#111111",
        boxShadow: "0 28px 58px rgba(0,0,0,0.62), 0 0 34px rgba(176,0,0,0.11)",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        draggable={false}
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default function SlidePage28() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "#070707",
        color: "#ffffff",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        fontSynthesis: "none",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            inset: 0,
            opacity: 0.6,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            width: "19%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 0% 52%, rgba(200,8,8,0.27) 0%, rgba(180,0,0,0.1) 43%, transparent 76%)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: 0,
            right: 0,
            width: "19%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 100% 52%, rgba(200,8,8,0.27) 0%, rgba(180,0,0,0.1) 43%, transparent 76%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "21.5%",
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.84) 0%, rgba(8,8,8,0.98) 100%)",
            borderTop: "1px solid rgba(208,35,42,0.32)",
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
            02 / CREATIVE TOOLKIT
          </div>
          <h1
            className="ai-video-project-title"
            style={{
              margin: "7px 0 0",
              color: "#ffffff",
              lineHeight: 1.46,
              letterSpacing: "2.88px",
              whiteSpace: "nowrap",
              width: "max-content",
            }}
          >
            AI 视频编辑
            <span style={{ color: "#d2353c", marginLeft: "10px" }}>
              更多玩法
            </span>
          </h1>
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: "48%",
            color: "rgba(255,255,255,0.62)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: "clamp(9px, calc(0.9 * var(--u)), 13px)",
            lineHeight: 1.4,
            textAlign: "right",
            whiteSpace: "nowrap",
          }}
        >
          调用角色、套用风格、加入合拍、消除主体，把复杂编辑能力变成直观、可组合的创作玩法。
        </p>
      </header>

      <div
        className="absolute z-10"
        style={{ left: "6.8%", top: "19.3%", width: "86.4%", height: "58.2%" }}
      >
        <div
          className="absolute"
          style={{
            left: "10%",
            right: "10%",
            top: "4.5%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(186,20,27,0.16), rgba(214,45,52,0.72), rgba(186,20,27,0.16))",
          }}
        />

        {creationFlow.map((page, index) => (
          <div
            key={page.src}
            className="absolute h-full"
            style={{ left: `${index * 26.6667}%`, width: "20%" }}
          >
            <div
              className="absolute z-20 flex items-center justify-center rounded-full"
              style={{
                left: "calc(50% - 13px)",
                top: "calc(4.5% - 13px)",
                width: "26px",
                height: "26px",
                border: "1px solid rgba(221,50,57,0.88)",
                background: "#0b0b0b",
                boxShadow: "0 0 18px rgba(194,24,31,0.22)",
                color: "#e44249",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "9px",
                fontWeight: 400,
              }}
            >
              {page.step}
            </div>
            <div
              className="absolute z-20"
              style={{
                left: 0,
                top: "10.5%",
                width: "100%",
                textAlign: "center",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                fontSize: "clamp(7px, calc(0.72 * var(--u)), 10px)",
                fontWeight: 400,
                letterSpacing: "0.6px",
              }}
            >
              {page.stage}
            </div>
            <FlowPhone
              src={page.src}
              label={page.alt}
              style={{ left: "8%", top: "14%", width: "84%" }}
            />
          </div>
        ))}
      </div>

      <section
        className="absolute z-20"
        style={{ left: "6.8%", top: "81.2%", width: "86.4%" }}
      >
        {creationFlow.map((page, index) => (
          <div
            key={page.title}
            className="absolute"
            style={{ left: `${index * 26.6667}%`, width: "20%" }}
          >
            <div className="flex items-center" style={{ gap: "9px" }}>
              <span
                style={{
                  color: "#dc333a",
                  fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                  fontSize: "clamp(8px, calc(0.82 * var(--u)), 12px)",
                  fontWeight: 400,
                }}
              >
                {page.step}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.34)",
                  fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                  fontSize: "clamp(7px, calc(0.72 * var(--u)), 10px)",
                  fontWeight: 400,
                  letterSpacing: "0.6px",
                }}
              >
                {page.stage}
              </span>
            </div>
            <h2
              style={{
                margin: "8px 0 0",
                color: "#ffffff",
                fontFamily:
                  "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
                fontSize: "clamp(14px, calc(1.45 * var(--u)), 21px)",
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: "0.8px",
              }}
            >
              {page.title}
            </h2>
            <p
              style={{
                margin: "7px 0 0",
                color: "rgba(255,255,255,0.44)",
                fontFamily: "'PingFang SC', sans-serif",
                fontSize: "clamp(8px, calc(0.8 * var(--u)), 12px)",
                lineHeight: 1.5,
              }}
            >
              {page.description}
            </p>
          </div>
        ))}
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
          CAST · STYLE · COLLAB · CLEANUP
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
