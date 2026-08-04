import type { CSSProperties } from "react"

const removalCards = [
  { label: "涂抹", src: "/images/page27/remove-brush-card.png" },
  { label: "路人", src: "/images/page27/remove-person-card.png" },
  { label: "水印", src: "/images/page27/remove-watermark-card.png" },
  { label: "文字", src: "/images/page27/remove-text-card.png" },
  { label: "眼镜", src: "/images/page27/remove-glasses-card.png" },
]

export function RemovalCardStrip({
  top = "73.7%",
  activeIndex = 1,
  animated = true,
  style,
}: {
  top?: string
  activeIndex?: number
  animated?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={style}
      aria-hidden="true"
    >
      <style>{`
        @keyframes removal-card-fade-in {
          from { opacity: 0; transform: translateY(6px) scale(.94); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-removal-card] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {removalCards.map((card, index) => (
        <div
          key={card.label}
          data-removal-card={card.label}
          className="absolute overflow-hidden"
          style={{
            left: `${3 + index * 19.2}%`,
            top,
            width: "18%",
            aspectRatio: "1 / 1",
            borderRadius: "12px",
            border:
              index === activeIndex
                ? "2px solid rgba(225,55,68,0.94)"
                : "1px solid rgba(255,255,255,0.2)",
            boxShadow:
              index === activeIndex
                ? "0 0 0 2px rgba(8,8,8,0.72), 0 8px 18px rgba(0,0,0,0.5), 0 0 15px rgba(225,55,68,0.2)"
                : "0 6px 14px rgba(0,0,0,0.44)",
            opacity: animated ? 0 : 1,
            animation: animated
              ? `removal-card-fade-in 520ms cubic-bezier(.2,.75,.25,1) ${
                  120 + index * 90
                }ms forwards`
              : "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.src}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
