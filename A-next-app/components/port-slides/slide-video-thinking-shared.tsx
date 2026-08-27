import type { CSSProperties, ReactNode } from "react"

export const VIDEO_RED = "#ef3f46"
export const VIDEO_DIM = "rgba(255,255,255,0.48)"
export const VIDEO_FONT =
  "'标小智无界黑', 'LogoSC Unbounded Sans', 'PingFang SC', sans-serif"

export function CornerMarks() {
  const marks: Array<CSSProperties> = [
    { left: 18, top: 18, borderLeft: "1px solid rgba(255,255,255,.25)", borderTop: "1px solid rgba(255,255,255,.25)" },
    { right: 18, top: 18, borderRight: "1px solid rgba(255,255,255,.25)", borderTop: "1px solid rgba(255,255,255,.25)" },
    { left: 18, bottom: 18, borderLeft: "1px solid rgba(255,255,255,.25)", borderBottom: "1px solid rgba(255,255,255,.25)" },
    { right: 18, bottom: 18, borderRight: "1px solid rgba(255,255,255,.25)", borderBottom: "1px solid rgba(255,255,255,.25)" },
  ]

  return (
    <>
      {marks.map((style, index) => (
        <span
          key={index}
          className="pointer-events-none absolute z-30"
          style={{ width: 20, height: 20, ...style }}
        />
      ))}
    </>
  )
}

export function VideoThinkingFrame({ children }: { children: ReactNode }) {
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
            opacity: 0.48,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.026) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.026) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "23%",
            background:
              "linear-gradient(90deg, rgba(154,6,12,.25), rgba(91,4,8,.07) 54%, transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "23%",
            background:
              "linear-gradient(270deg, rgba(154,6,12,.24), rgba(91,4,8,.06) 54%, transparent)",
          }}
        />
      </div>
      <CornerMarks />
      {children}
    </div>
  )
}

export function VideoThinkingHeader({
  index,
  eyebrow,
  title,
  accent,
  description,
  descriptionSingleLine = false,
}: {
  index: string
  eyebrow: string
  title: string
  accent: string
  description?: string
  descriptionSingleLine?: boolean
}) {
  return (
    <header
      className="absolute z-20 flex items-end justify-between"
      style={{ left: "4.2%", top: "7.1%", width: "91.6%" }}
    >
      <div>
        <div
          style={{
            color: VIDEO_RED,
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: 11,
            letterSpacing: "1px",
          }}
        >
          {index} / {eyebrow}
        </div>
        <h1
          className="ai-video-project-title"
          style={{
            margin: "8px 0 0",
            color: "#fff",
            lineHeight: 1.22,
            letterSpacing: "1.5px",
            whiteSpace: "nowrap",
          }}
        >
          {title}
          <span style={{ color: VIDEO_RED, marginLeft: 10 }}>{accent}</span>
        </h1>
      </div>
      {description ? (
        <p
          style={{
            width: "42%",
            margin: 0,
            color: "rgba(255,255,255,.62)",
            fontFamily: "'PingFang SC', sans-serif",
            fontSize: descriptionSingleLine ? 11 : 13,
            lineHeight: descriptionSingleLine ? 1.4 : 1.75,
            textAlign: "right",
            whiteSpace: descriptionSingleLine ? "nowrap" : undefined,
          }}
        >
          {description}
        </p>
      ) : null}
    </header>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        color: VIDEO_RED,
        fontFamily: "'LogoSC Unbounded Sans', sans-serif",
        fontSize: 10,
        letterSpacing: ".7px",
      }}
    >
      {children}
    </div>
  )
}

export function ScreenCrop({
  src,
  alt,
  style,
  objectPosition = "center top",
}: {
  src: string
  alt: string
  style?: CSSProperties
  objectPosition?: string
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,.18)",
        borderRadius: 8,
        background: "#111",
        boxShadow: "0 22px 56px rgba(0,0,0,.48)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover"
        style={{ objectPosition }}
      />
    </div>
  )
}
