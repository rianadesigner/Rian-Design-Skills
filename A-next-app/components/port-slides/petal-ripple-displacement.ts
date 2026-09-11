"use client"

import { useEffect, useRef, type RefObject } from "react"

const MAP_SIZE = 192
const VIEW_SIZE = 750
const FILTER_SCALE = 60
const MAX_DISPLACEMENT = 16
const WAVE_DURATION = 2200
const WAVE_DELAYS = [0, 260, 520] as const
const TOTAL_DURATION = WAVE_DURATION + WAVE_DELAYS[2]
const FRAME_INTERVAL = 1000 / 30
const WAVE_WIDTH = 0.18
const PROFILE_NORMALIZATION = 8 / (3 * Math.sqrt(3))
const WAVE_STOPS = [
  [0, 0.055, 0],
  [0.12, 0.29, 0.85],
  [0.36, 0.7, 0.7],
  [0.65, 1.08, 0.36],
  [1, 1.5, 0],
] as const

type RipplePlayback = {
  start: () => void
  pause: () => void
}

type PetalRippleDisplacementOptions = {
  imageRef: RefObject<SVGFEImageElement | null>
  rippleX: number
  rippleY: number
  labelX: number
  labelY: number
  rotation: number
  running: boolean
}

function smoothstep(start: number, end: number, value: number) {
  const progress = Math.max(0, Math.min(1, (value - start) / (end - start)))
  return progress * progress * (3 - 2 * progress)
}

function getWave(elapsed: number, index: number) {
  const progress = (elapsed - WAVE_DELAYS[index]) / WAVE_DURATION
  if (progress <= 0 || progress >= 1) return null

  for (let stop = 1; stop < WAVE_STOPS.length; stop += 1) {
    const previous = WAVE_STOPS[stop - 1]
    const next = WAVE_STOPS[stop]
    if (progress > next[0]) continue

    const between = (progress - previous[0]) / (next[0] - previous[0])
    return {
      radius: previous[1] + (next[1] - previous[1]) * between,
      strength:
        ((previous[2] + (next[2] - previous[2]) * between) / 0.85) *
        (1 - index * 0.2),
    }
  }

  return null
}

/** Move the sampled glass and its edge with the same outward travelling waves. */
export function usePetalRippleDisplacement({
  imageRef,
  rippleX,
  rippleY,
  labelX,
  labelY,
  rotation,
  running,
}: PetalRippleDisplacementOptions) {
  const playbackRef = useRef<RipplePlayback | null>(null)

  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = MAP_SIZE
    canvas.height = MAP_SIZE
    const context = canvas.getContext("2d")
    if (!context) return

    const pixels = context.createImageData(MAP_SIZE, MAP_SIZE)
    const pixelCount = MAP_SIZE * MAP_SIZE
    const radii = new Float32Array(pixelCount)
    const directionsX = new Float32Array(pixelCount)
    const directionsY = new Float32Array(pixelCount)
    const radians = (rotation * Math.PI) / 180
    const cosine = Math.cos(radians)
    const sine = Math.sin(radians)

    for (let index = 0; index < pixelCount; index += 1) {
      const x = (((index % MAP_SIZE) + 0.5) / MAP_SIZE) * VIEW_SIZE
      const y = ((Math.floor(index / MAP_SIZE) + 0.5) / MAP_SIZE) * VIEW_SIZE
      const dx = x - rippleX
      const dy = y - rippleY
      const localX = cosine * dx + sine * dy
      const localY = -sine * dx + cosine * dy
      const radius = Math.hypot(localX / 150, localY / 176)
      radii[index] = radius

      // The normal follows the ellipse, then rotates back into screen space.
      const normalX = localX / (150 * 150)
      const normalY = localY / (176 * 176)
      const normalLength = Math.hypot(normalX, normalY)
      const labelRadius = Math.hypot((x - labelX) / 74, (y - labelY) / 68)
      const weight =
        smoothstep(1, 1.3, labelRadius) * smoothstep(0, 0.18, radius)

      if (normalLength > 0) {
        directionsX[index] =
          ((cosine * normalX - sine * normalY) / normalLength) * weight
        directionsY[index] =
          ((sine * normalX + cosine * normalY) / normalLength) * weight
      }

      const offset = index * 4
      pixels.data[offset] = 128
      pixels.data[offset + 1] = 128
      pixels.data[offset + 2] = 128
      pixels.data[offset + 3] = 255
    }

    context.putImageData(pixels, 0, 0)
    const neutralMap = canvas.toDataURL("image/png")
    imageRef.current?.setAttribute("href", neutralMap)

    let elapsed = 0
    let lastTick: number | null = null
    let lastRendered = Number.NEGATIVE_INFINITY
    let frame: number | null = null
    let finished = false
    let disposed = false

    const render = () => {
      const waves = WAVE_DELAYS.map((_, index) => getWave(elapsed, index))

      for (let index = 0; index < pixelCount; index += 1) {
        let displacement = 0
        for (const wave of waves) {
          if (!wave) continue
          const distance = (radii[index] - wave.radius) / WAVE_WIDTH
          if (Math.abs(distance) >= 1) continue

          // Opposite sides of a soft crest bend in opposite directions.
          const envelope = Math.cos((distance * Math.PI) / 2) ** 2
          displacement +=
            Math.sin(distance * Math.PI) *
            envelope *
            PROFILE_NORMALIZATION *
            wave.strength
        }

        displacement =
          Math.max(-1, Math.min(1, displacement)) * MAX_DISPLACEMENT
        const encoding = (displacement / FILTER_SCALE) * 255
        const offset = index * 4
        pixels.data[offset] = 128 + encoding * directionsX[index]
        pixels.data[offset + 1] = 128 + encoding * directionsY[index]
      }

      context.putImageData(pixels, 0, 0)
      imageRef.current?.setAttribute("href", canvas.toDataURL("image/png"))
    }

    const tick = (timestamp: number) => {
      frame = null
      if (disposed || lastTick === null) return

      elapsed += Math.max(0, timestamp - lastTick)
      lastTick = timestamp
      if (elapsed >= TOTAL_DURATION) {
        finished = true
        lastTick = null
        imageRef.current?.setAttribute("href", neutralMap)
        return
      }

      if (elapsed - lastRendered >= FRAME_INTERVAL) {
        render()
        lastRendered = elapsed
      }
      frame = requestAnimationFrame(tick)
    }

    const playback: RipplePlayback = {
      start: () => {
        if (disposed || finished || frame !== null) return
        lastTick = performance.now()
        frame = requestAnimationFrame(tick)
      },
      pause: () => {
        if (frame !== null) cancelAnimationFrame(frame)
        frame = null
        if (lastTick !== null) {
          elapsed += Math.max(0, performance.now() - lastTick)
          lastTick = null
        }
      },
    }

    playbackRef.current = playback
    return () => {
      disposed = true
      playback.pause()
      if (playbackRef.current === playback) playbackRef.current = null
    }
  }, [imageRef, rippleX, rippleY, labelX, labelY, rotation])

  useEffect(() => {
    const playback = playbackRef.current
    if (running) playback?.start()
    else playback?.pause()
    return () => playback?.pause()
  }, [imageRef, rippleX, rippleY, labelX, labelY, rotation, running])
}
