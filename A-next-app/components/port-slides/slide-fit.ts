import { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from "./slide-design";

/** Read the fit-stage layout box only — avoids window/document/CDP size drift. */
export function measureFitStage(stage: HTMLElement | null): { width: number; height: number } {
  if (!stage) {
    if (typeof window === "undefined") {
      return { width: SLIDE_DESIGN_WIDTH, height: SLIDE_DESIGN_HEIGHT };
    }
    return {
      width: Math.max(window.innerWidth, 1),
      height: Math.max(window.innerHeight, 1),
    };
  }

  const rect = stage.getBoundingClientRect();
  return {
    width: Math.max(rect.width, 1),
    height: Math.max(rect.height, 1),
  };
}

/** @deprecated Use measureFitStage(stageRef.current) instead. */
export function measureSlideHost(root: HTMLElement | null): { width: number; height: number } {
  return measureFitStage(root);
}

export function computeSlideFitScale(
  width: number,
  height: number,
  designWidth = SLIDE_DESIGN_WIDTH,
  designHeight = SLIDE_DESIGN_HEIGHT,
): number {
  if (width <= 0 || height <= 0) return 1;
  // contain 模式：取较小缩放比，确保幻灯片全部内容可见（不裁剪任何内容）
  return Math.min(width / designWidth, height / designHeight);
}

export function initialSlideFitScale(): number {
  if (typeof window === "undefined") return 1;
  return computeSlideFitScale(window.innerWidth, window.innerHeight);
}
