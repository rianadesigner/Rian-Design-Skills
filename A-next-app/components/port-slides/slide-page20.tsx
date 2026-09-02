import Image from "next/image"

const DESIGN_SYSTEM_OVERVIEW = "/images/page20/design-system-overview.jpg"

export default function SlidePage20() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070707]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[18%] bg-[radial-gradient(ellipse_at_left,rgba(200,8,8,0.26),rgba(180,0,0,0.10)_45%,transparent_75%)]" />
        <div className="absolute inset-y-0 right-0 w-[18%] bg-[radial-gradient(ellipse_at_right,rgba(200,8,8,0.26),rgba(180,0,0,0.10)_45%,transparent_75%)]" />
      </div>

      <h2
        className="absolute left-[4.17%] top-[9.26%] z-10 m-0 text-[clamp(20px,calc(2.5*var(--u)),36px)] leading-[52px]"
        style={{
          fontFamily:
            "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif",
          letterSpacing: "1.08px",
        }}
      >
        <span className="text-white">如何设计</span>
        <span className="bg-gradient-to-br from-[#5c5cff] to-[#ae5cff] bg-clip-text text-transparent">
          设计规范
        </span>
      </h2>

      <p className="absolute right-[4.17%] top-[11.11%] z-10 m-0 max-w-[50%] text-right font-['PingFang_SC',sans-serif] text-[clamp(11px,calc(1.11*var(--u)),16px)] font-medium leading-[1.7] text-white/70">
        为星链平台打造一套未来开源 AI 大模型设计系统 LanguageGUI
      </p>

      <div className="absolute bottom-[3.33%] left-[4.17%] right-[4.17%] top-[16.67%]">
        <Image
          src={DESIGN_SYSTEM_OVERVIEW}
          alt="星链平台设计系统总览，包含词元、颜色、字体、尺寸、间距、高度、投影、描边与圆角规范"
          fill
          sizes="92vw"
          draggable={false}
          className="select-none object-contain object-center"
        />
      </div>
    </div>
  )
}
