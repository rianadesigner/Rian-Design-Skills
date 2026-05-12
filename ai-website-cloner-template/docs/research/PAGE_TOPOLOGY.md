# NeuroSync | Master Your Mind — Page Topology

**Source:** https://neuform.ai/template/neurosync-master-your-mind-1?pageId=828cfd1e-6190-41fe-b4e9-aa05dc774548  
**Captured:** Embedded Neuform template preview (design tokens: Inter 60px/600 heading, #4B4BA0 / #8F47AE accents).

## Sections (top → bottom)

| Order | Name            | Role                                      | Layer      |
| ----- | --------------- | ----------------------------------------- | ---------- |
| 1     | BackgroundField | Full-bleed light-streak tunnel (WebGL)    | z-0 fixed  |
| 2     | SiteHeader      | Logo, nav links, Get Started CTA          | z-10 fixed |
| 3     | HeroCluster     | Headline + feature stack + copy column      | z-10 flow  |

## Layout

- Single viewport hero (`min-h-screen`, `overflow-hidden`).
- **Header:** horizontal flex — logo left, links centered (absolute), CTA right.
- **Hero:** anchored to bottom (`flex` + `items-end` / absolute bottom) — left column: title + glass feature list; right column: body copy + Request Access.

## Dependencies

- Header overlays tunnel background.
- Hero content uses semi-transparent glass panels (`backdrop-blur`) over tunnel.

## Interaction model

| Section        | Model   | Notes                                        |
| -------------- | ------- | -------------------------------------------- |
| BackgroundField| static + pointer-parallax | Subtle camera drift from mouse position |
| SiteHeader     | static  | Links hover only                             |
| Feature rows   | static  | First row styled as active/highlight         |
| CTAs           | static  | `<Link>` / `<a>` placeholders                |
