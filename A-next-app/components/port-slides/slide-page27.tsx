const P27 = "/images/page27";

function PhoneFrame({
  src,
  label,
  style,
}: {
  src: string;
  label: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        aspectRatio: "750 / 1624",
        border: "6px solid #131313",
        outline: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "38px",
        background: "#111111",
        boxShadow:
          "0 30px 64px rgba(0,0,0,0.68), 0 0 42px rgba(176,0,0,0.12)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={label}
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function Note({
  eyebrow,
  title,
  children,
  style,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  style: React.CSSProperties;
  align?: "left" | "right";
}) {
  return (
    <div className="absolute z-20" style={{ textAlign: align, ...style }}>
      <div
        style={{
          color: "#d5333a",
          fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
          fontSize: "clamp(8px, calc(0.78 * var(--u)), 12px)",
          fontWeight: 400,
          letterSpacing: "0.8px",
        }}
      >
        {eyebrow}
      </div>
      <h3
        style={{
          margin: "8px 0 0",
          color: "#ffffff",
          fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
          fontSize: "clamp(19px, calc(2.05 * var(--u)), 30px)",
          fontWeight: 400,
          lineHeight: 1.38,
          letterSpacing: "1.2px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "10px 0 0",
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: "clamp(10px, calc(1.05 * var(--u)), 15px)",
          lineHeight: 1.65,
        }}
      >
        {children}
      </p>
    </div>
  );
}

export default function SlidePage27() {
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
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
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
          className="absolute"
          style={{
            left: "4.17%",
            top: "16.7%",
            width: "91.66%",
            height: 1,
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "31%",
            top: "18%",
            width: "38%",
            height: "67%",
            background:
              "radial-gradient(ellipse at 50% 46%, rgba(164,12,17,0.18) 0%, rgba(80,5,8,0.07) 44%, transparent 76%)",
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
            01 / DESIGN OUTPUT
          </div>
          <h1
            style={{
              margin: "7px 0 0",
              color: "#ffffff",
              fontFamily: "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
              fontSize: "clamp(28px, calc(3.33 * var(--u)), 48px)",
              fontWeight: 400,
              lineHeight: 1.46,
              letterSpacing: "2.88px",
              whiteSpace: "nowrap",
              width: "max-content",
            }}
          >
            AI视频
            <span style={{ color: "#d2353c", marginLeft: "10px" }}>Delta</span>
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
          让复杂的视频编辑能力隐入自然语言与沉浸式画布，
          <br />
          从灵感、理解、编辑到生成，保持同一条创作心流。
        </p>
      </header>

      <Note
        eyebrow="01 / MULTI-VIDEO NAVIGATION"
        title="海量视频轮播"
        style={{ left: "4.17%", top: "30.5%", width: "22%" }}
      >
        快速滚动浏览多个视频并定位目标；选中后放大显示该视频，在循环播放中对比不同风格切换。
      </Note>
      <Note
        eyebrow="02 / CONVERSATION FIRST"
        title="对话即编辑"
        style={{ left: "4.17%", top: "59%", width: "19%" }}
      >
        用自然语言承接换背景、改服装、重新生成等复杂意图，并提供可直接使用的快捷建议。
      </Note>
      <Note
        eyebrow="03 / OBJECT AWARE"
        title="识别并调用"
        align="right"
        style={{ right: "4.17%", top: "30.5%", width: "20%" }}
      >
        <span style={{ whiteSpace: "nowrap" }}>自动识别人像与画面对象，支持角色调用、</span>
        <br />
        <span style={{ whiteSpace: "nowrap" }}>动作克隆和局部编辑，减少手动选择成本。</span>
      </Note>
      <Note
        eyebrow="04 / VISIBLE FEEDBACK"
        title="结果始终可见"
        align="right"
        style={{ right: "4.17%", top: "59%", width: "20%" }}
      >
        <span style={{ whiteSpace: "nowrap" }}>生成状态、版本结果与导出动作靠近</span>
        <br />
        <span style={{ whiteSpace: "nowrap" }}>创作上下文，让用户始终知道系统正在做什么。</span>
      </Note>

      <div
        className="absolute z-10"
        style={{
          left: "23.8%",
          top: "19.3%",
          width: "52.5%",
          height: "71.5%",
        }}
      >
        <div
          className="absolute"
          style={{
            left: "1%",
            top: "19%",
            width: "16%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(211,44,51,0.08), rgba(211,44,51,0.58))",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "1%",
            top: "19%",
            width: "16%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(211,44,51,0.58), rgba(211,44,51,0.08))",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{ left: "16.5%", top: "calc(19% - 3px)", width: 7, height: 7, background: "#d32c33" }}
        />
        <div
          className="absolute rounded-full"
          style={{ right: "16.5%", top: "calc(19% - 3px)", width: 7, height: 7, background: "#d32c33" }}
        />

        <PhoneFrame
          src={`${P27}/delta-home.webp`}
          label="Delta AI 视频创作首页"
          style={{ left: "17%", top: "1%", height: "97%", transform: "rotate(-1deg)", zIndex: 2 }}
        />
        <PhoneFrame
          src={`${P27}/delta-material-v2.png`}
          label="Delta AI 视频素材编辑界面"
          style={{ right: "17%", top: "8%", height: "90%", transform: "rotate(1deg)", zIndex: 3 }}
        />

        <div
          className="absolute z-10"
          style={{
            right: "8%",
            bottom: "4%",
            transform: "rotate(90deg)",
            transformOrigin: "right bottom",
            color: "rgba(255,255,255,0.32)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: "clamp(7px, calc(0.72 * var(--u)), 10px)",
          }}
        >
          EDIT / 对话式编辑
        </div>
      </div>

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
          MULTI-VIDEO NAVIGATION × CONVERSATION FIRST
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
  );
}
