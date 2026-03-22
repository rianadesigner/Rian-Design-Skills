export function PlannerNotes() {
  return (
    <>
      <h2 className="section-title">Journal &amp; Notes</h2>
      <div className="notes-area">
        <svg className="watermark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M50 100 C 40 80, 20 60, 20 40 C 20 20, 40 10, 50 10 C 60 10, 80 20, 80 40 C 80 60, 60 80, 50 100 Z"
          />
          <path
            fill="currentColor"
            d="M50 90 C 45 70, 30 50, 30 35 C 30 20, 45 15, 50 15 C 55 15, 70 20, 70 35 C 70 50, 55 70, 50 90 Z"
            opacity="0.5"
          />
          <circle cx="50" cy="30" r="5" fill="currentColor" />
        </svg>

        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="ruled-line" />
        ))}

        <div className="handwriting">
          Remember to ask Sarah about the new ceramic vases...
          <br />
          The matte finish works beautifully with the soft pinks.
        </div>
      </div>
    </>
  )
}

