"use client"

import { useEffect, useRef } from "react"
import {
  clock,
  effect,
  frame,
  frameLoop,
  init,
  surface,
  type FrameLoopHandle,
  type Gpu,
  type Surface,
} from "vgpu"
import graphAuraShader from "./vgpu-graph-aura.wgsl"

type VgpuGraphAuraProps = {
  intensity?: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export default function VgpuGraphAura({
  intensity = 1,
}: VgpuGraphAuraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resolvedIntensity = clamp(intensity, 0, 1.2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !("gpu" in navigator)) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches
    const isIPad =
      navigator.maxTouchPoints > 1 &&
      /Macintosh|iPad/i.test(navigator.userAgent)
    const constrainedDevice = coarsePointer || isIPad

    let disposed = false
    let gpu: Gpu | undefined
    let canvasSurface: Surface | undefined
    let loop: FrameLoopHandle | undefined
    let stopResize: (() => void) | undefined
    let staticFrameRequest = 0
    let inViewport = true
    let documentVisible = !document.hidden
    let renderFrame: ((currentFrame: ReturnType<typeof frame>) => void) | undefined

    const stopLoop = () => {
      loop?.stop()
      loop = undefined
    }

    const requestStaticFrame = () => {
      if (!gpu || !renderFrame || disposed || !documentVisible || !inViewport)
        return
      cancelAnimationFrame(staticFrameRequest)
      staticFrameRequest = requestAnimationFrame(() => {
        if (!gpu || !renderFrame || disposed) return
        frame(gpu, renderFrame)
      })
    }

    const syncLoop = () => {
      if (!gpu || !renderFrame || disposed) return
      const shouldAnimate = !reducedMotion && documentVisible && inViewport
      if (shouldAnimate && !loop) {
        loop = frameLoop(gpu, renderFrame, {
          fps: constrainedDevice ? 30 : 45,
        })
      } else if (!shouldAnimate) {
        stopLoop()
        if (reducedMotion && documentVisible && inViewport) requestStaticFrame()
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting
        syncLoop()
      },
      { rootMargin: "120px", threshold: 0.01 }
    )
    intersectionObserver.observe(canvas)

    const onVisibilityChange = () => {
      documentVisible = !document.hidden
      syncLoop()
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    void (async () => {
      try {
        gpu = await init({
          powerPreference: constrainedDevice ? "low-power" : "high-performance",
          label: "llm-wiki-knowledge-graph",
        })
        if (disposed) {
          gpu.dispose()
          return
        }

        canvasSurface = surface(gpu, canvas, {
          dpr: constrainedDevice ? [1, 1.15] : [1, 1.5],
          alphaMode: "premultiplied",
          clearColor: [0, 0, 0, 0],
          label: "knowledge-graph-aura-surface",
        })
        const aura = effect(gpu, graphAuraShader, {
          label: "knowledge-graph-aura",
          blend: "premultiplied",
          set: {
            params: {
              resolution: canvasSurface.size,
              time: 0,
              intensity: resolvedIntensity,
            },
          },
        })
        const animationClock = clock(gpu)

        renderFrame = (currentFrame) => {
          if (!canvasSurface || disposed) return
          aura.set({
            params: {
              resolution: canvasSurface.size,
              time: reducedMotion ? 0 : animationClock.time,
              intensity: resolvedIntensity,
            },
          })
          currentFrame.pass(
            { target: canvasSurface, clear: [0, 0, 0, 0] },
            aura
          )
        }

        stopResize = canvasSurface.onResize(() => {
          if (reducedMotion) requestStaticFrame()
        })
        await aura.compile(canvasSurface)
        if (disposed) return

        canvas.dataset.renderer = "vgpu"
        canvas.style.opacity = "1"
        frame(gpu, renderFrame)
        syncLoop()

        void gpu.gpu.lost.then(() => {
          if (disposed) return
          stopLoop()
          canvas.style.opacity = "0"
          canvas.dataset.renderer = "three-fallback"
        })
      } catch {
        if (disposed) return
        canvas.style.opacity = "0"
        canvas.dataset.renderer = "three-fallback"
        stopLoop()
        canvasSurface?.dispose()
        gpu?.dispose()
      }
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(staticFrameRequest)
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      stopResize?.()
      stopLoop()
      canvasSurface?.dispose()
      gpu?.dispose()
    }
  }, [resolvedIntensity])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        zIndex: 0,
        background:
          "radial-gradient(circle at 50% 50%, rgba(111,104,234,0.07) 0, rgba(94,157,237,0.035) 25%, transparent 52%), radial-gradient(ellipse 31% 7% at 50% 81%, rgba(36,36,43,0.08), transparent 72%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        style={{
          opacity: 0,
          transition: "opacity 420ms ease",
        }}
      />
    </div>
  )
}
