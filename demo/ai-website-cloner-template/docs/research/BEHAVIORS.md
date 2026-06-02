# Behaviors — NeuroSync Template Clone

## Scroll

- Page is intentionally **non-scroll** on desktop hero (single screen). No scroll-driven triggers observed for this clone scope.

## Hover

- Nav links: color shifts lighter on hover (`transition-colors`).
- Feature rows: background slightly brighter on hover; row 1 remains visually “selected”.
- Primary buttons: background `#fff` → slightly darker `#e8e8e8`.

## Pointer / WebGL

- Tunnel renderer applies **smooth lerped** mouse-derived camera offset (low amplitude).

## Responsive

- Below `md`: stack hero columns vertically; nav hides center links (optional — implemented: hide links on small screens).

## Out of scope (per clone defaults)

- Authentication, Neuform chrome, analytics, template marketplace UI.
