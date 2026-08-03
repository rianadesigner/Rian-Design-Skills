const CORNER_MARKS = [
  {
    top: 18,
    left: 18,
    borderTop: "1px solid rgba(255,255,255,0.28)",
    borderLeft: "1px solid rgba(255,255,255,0.28)",
  },
  {
    top: 18,
    right: 18,
    borderTop: "1px solid rgba(255,255,255,0.28)",
    borderRight: "1px solid rgba(255,255,255,0.28)",
  },
  {
    bottom: 18,
    left: 18,
    borderBottom: "1px solid rgba(255,255,255,0.28)",
    borderLeft: "1px solid rgba(255,255,255,0.28)",
  },
  {
    bottom: 18,
    right: 18,
    borderBottom: "1px solid rgba(255,255,255,0.28)",
    borderRight: "1px solid rgba(255,255,255,0.28)",
  },
] as const

export function SlideCornerMarks() {
  return (
    <>
      {CORNER_MARKS.map((style, index) => (
        <div
          key={index}
          aria-hidden
          style={{
            position: "absolute",
            width: 23,
            height: 23,
            zIndex: 20,
            pointerEvents: "none",
            ...style,
          }}
        />
      ))}
    </>
  )
}
