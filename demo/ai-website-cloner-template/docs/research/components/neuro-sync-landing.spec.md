# NeuroSyncLanding Specification

## Overview

- **Target file:** `src/components/neurosync/neuro-sync-landing.tsx`
- **Screenshot:** Neuform embedded preview — `docs/design-references/neuform.ai/` (browser capture)
- **Interaction model:** static + pointer-parallax (WebGL only)

## DOM Structure

- `TunnelCanvas` (fixed full viewport)
- `header` — logo, nav ul, Get Started button
- `main` — bottom-aligned grid: left (h1 + feature list), right (p + Request Access)

## Design tokens (from Neuform panel)

- **Font:** Inter; display ~60–72px / 600 / tight tracking -0.05em; body 14px / 400 / 20px line-height
- **Colors:** primary `#4B4BA0`, tertiary `#8F47AE`, text `#FFFFFF`, muted `#D4D4D8`, surface/black bg
- **Chrome:** white buttons, black text, `rounded-none`, arrow-in-box affordance

## Text content (verbatim)

- Nav: Features, Integrations, Enterprise, Pricing
- Logo: NeuroSync
- Headline: Think Faster. / Master Your Mind.
- Feature 1: Cognitive Load Tracking — Real-time mental bandwidth metrics.
- Feature 2: Neural Pathway Mapping — Visualizing thought patterns and flow states.
- Feature 3: Adaptive Focus Protocols — AI-driven routines for peak concentration.
- Body: NeuroSync monitors your cognitive state in real-time, translating raw brainwave data into a clear picture of exactly when you peak and how to sustain it.
- CTAs: Get Started, Request Access

## Assets

- Background: procedural WebGL line segments (no raster asset).

## Responsive

- **Desktop:** two-column bottom hero + full nav
- **Mobile:** stacked columns; condensed nav
