"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { computeSlideFitScale, initialSlideFitScale } from "./slide-fit";

/**
 * Robustly track the fit-scale for a stage element.
 *
 * Why the previous useRef approach was flaky:
 *   - useLayoutEffect([enabled]) only re-ran when `enabled` changed.
 *     If the DOM element changed identity (React Strict Mode double-invoke,
 *     conditional rendering, etc.) the ResizeObserver silently got lost.
 *   - A single RAF retry wasn't enough if CSS transitions or font loading
 *     caused the container to reach its final size after the first frame.
 *
 * This version:
 *   1. Uses a *callback ref* so `setStage()` is called every time the element
 *      mounts or unmounts — guaranteeing the state (and therefore the effect)
 *      is always in sync with the live DOM node.
 *   2. `useLayoutEffect([stage, enabled])` runs synchronously after every
 *      render where the element identity or `enabled` flag changes —
 *      no flicker, no missed measurements.
 *   3. Observes the stage element AND its two closest ancestors so any ancestor
 *      resize also triggers a re-measurement.
 *   4. Three RAF retries + two setTimeout retries cover CSS transitions, dvh
 *      recalculations, and font-display swaps.
 */
export function useSlideFitScale(enabled = true) {
  // Track the DOM element as proper state so the layout-effect re-runs
  // whenever the element identity changes.
  const [stage, setStage] = useState<HTMLDivElement | null>(null);
  const [fitScale, setFitScale] = useState(initialSlideFitScale);
  const lastScaleRef = useRef<number | null>(null);

  // Callback ref: React calls this with the node when the div mounts,
  // and with null when it unmounts. Using useCallback keeps its identity stable.
  const stageRef = useCallback((node: HTMLDivElement | null) => {
    setStage(node);
  }, []);

  useLayoutEffect(() => {
    if (!enabled) {
      stage?.style.setProperty("--slide-fit-scale", "1");
      lastScaleRef.current = 1;
      setFitScale(1);
      return;
    }
    if (!stage) return;

    const applyScale = (scale: number) => {
      if (lastScaleRef.current === scale) return;
      lastScaleRef.current = scale;

      // This is the critical path: write the current scale directly to the
      // stage DOM node so resize never waits for a React render.
      stage.style.setProperty("--slide-fit-scale", String(scale));

      // Keep React state as a debugging/secondary signal only.
      setFitScale(scale);
    };

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      let w = rect.width;
      let h = rect.height;
      if (!w || !h) {
        // Element hasn't laid out yet — fall back to visual viewport / window.
        // visualViewport accounts for the on-screen keyboard on mobile.
        const vp = window.visualViewport;
        w = vp ? vp.width : window.innerWidth;
        h = vp ? vp.height : window.innerHeight;
      }
      applyScale(computeSlideFitScale(w, h));
    };

    // — Synchronous measurement (layout is committed at this point) —
    measure();

    // — RAF retries: cover CSS transitions / dvh settling / font-swap —
    const raf1 = requestAnimationFrame(measure);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(measure));
    const raf3 = requestAnimationFrame(() =>
      requestAnimationFrame(() => requestAnimationFrame(measure)),
    );

    // — Timeout retries: belt-and-braces for stubborn layout / HMR cases —
    const t1 = setTimeout(measure, 80);
    const t2 = setTimeout(measure, 400);
    const t3 = setTimeout(measure, 900);
    const t4 = setTimeout(measure, 1800);

    // — ResizeObserver: observe the stage and up to 2 ancestor containers,
    //   plus document.documentElement / body so Cursor IDE panel resize is caught
    //   even when the standard window.resize event is not fired.
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    if (stage.parentElement) ro.observe(stage.parentElement);
    if (stage.parentElement?.parentElement)
      ro.observe(stage.parentElement.parentElement);
    // Observe document root — catches any viewport/container resize that bypasses
    // window.resize (e.g. Cursor IDE split-pane resize, iframe viewport changes).
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    // — Window / visual-viewport resize events —
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("orientationchange", measure, { passive: true });
    window.addEventListener("focus", measure, { passive: true });
    window.addEventListener("pageshow", measure, { passive: true });
    document.addEventListener("visibilitychange", measure, { passive: true });
    window.visualViewport?.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("scroll", measure);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cancelAnimationFrame(raf3);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("focus", measure);
      window.removeEventListener("pageshow", measure);
      document.removeEventListener("visibilitychange", measure);
      window.visualViewport?.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("scroll", measure);
      stage.style.removeProperty("--slide-fit-scale");
      lastScaleRef.current = null;
    };
  }, [stage, enabled]); // re-runs whenever the element OR enabled changes

  // stageRef is a callback ref (node => void) — works identically to a
  // RefObject in JSX: <div ref={stageRef} />
  return { fitScale, stageRef };
}
