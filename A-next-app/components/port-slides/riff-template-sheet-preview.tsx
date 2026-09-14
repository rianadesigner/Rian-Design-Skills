const TEMPLATE_WATERFALL = "/images/video/slide37-template-remix/02-template-waterfall.webp"

/** Shared collapsed template sheet for the 600 x 1299 Riff home screenshots. */
export default function RiffTemplateSheetPreview({ src }: { src: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 600 1299"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Raise the sheet toward the creation button, retaining its original surface and 42-pixel header. */}
      <svg x="0" y="1120" width="600" height="42" viewBox="0 1155 600 42" preserveAspectRatio="none" overflow="hidden">
        <image href={src} width="600" height="1299" />
      </svg>
      <svg x="175" y="1134" width="255" height="28" viewBox="175 1158 255 13" preserveAspectRatio="none" overflow="hidden">
        <image href={src} width="600" height="1299" />
      </svg>
      <svg x="0" y="1162" width="600" height="137" viewBox="0 1200 600 18" preserveAspectRatio="none" overflow="hidden">
        <image href={src} width="600" height="1299" />
      </svg>
      <rect x="267" y="1138.5" width="66" height="5" rx="2.5" fill="#b3b1b0" />
      {/* Preview the same first-row cards as the expanded waterfall, at the existing column width. */}
      <svg x="20" y="1162" width="274" height="137" viewBox="24 255 342 171" preserveAspectRatio="xMidYMin slice" overflow="hidden">
        <image href={TEMPLATE_WATERFALL} width="750" height="1624" />
      </svg>
      <svg x="306" y="1162" width="274" height="137" viewBox="384 255 342 171" preserveAspectRatio="xMidYMin slice" overflow="hidden">
        <image href={TEMPLATE_WATERFALL} width="750" height="1624" />
      </svg>
    </svg>
  )
}
