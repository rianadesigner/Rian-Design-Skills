"use client";

import type { ReactNode } from "react";
import { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from "./slide-design";
import { useSlideFitScale } from "./use-slide-fit-scale";

type SlideFitShellProps = {
  children: ReactNode;
  /** When false, children fill the stage directly (mobile portrait path). */
  fit?: boolean;
  className?: string;
  stageClassName?: string;
  captureRoot?: boolean;
};

/**
 * Centers a 1440×900 design canvas inside the available stage and scales it
 * uniformly so the full canvas stays visible as the container resizes.
 */
export function SlideFitShell({
  children,
  fit = true,
  className,
  stageClassName,
  captureRoot,
}: SlideFitShellProps) {
  const { stageRef, fitScale } = useSlideFitScale(fit);

  return (
    <div
      ref={stageRef}
      className={stageClassName ?? "slide-fit-stage"}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        containerType: "size",
        background: className?.includes("bg-") ? undefined : "#000",
        ["--slide-design-w" as string]: `${SLIDE_DESIGN_WIDTH}px`,
        ["--slide-design-h" as string]: `${SLIDE_DESIGN_HEIGHT}px`,
      }}
    >
      {fit ? (
        <div
          className="slide-fit-box"
          style={{
            position: "relative",
            width: SLIDE_DESIGN_WIDTH,
            height: SLIDE_DESIGN_HEIGHT,
            flexShrink: 0,
            overflow: "hidden",
            transform: `scale(${fitScale})`,
            transformOrigin: "center center",
          }}
        >
          <div
            className={className ?? "slide-canvas"}
            {...(captureRoot ? { "data-figma-capture-root": true } : {})}
            style={{
              position: "relative",
              width: SLIDE_DESIGN_WIDTH,
              height: SLIDE_DESIGN_HEIGHT,
              overflow: "hidden",
              // design unit for slides using var(--u)
              ["--u" as string]: `calc(${SLIDE_DESIGN_WIDTH}px / 100)`,
            }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className={className ?? "slide-canvas"} style={{ position: "relative", width: "100%", height: "100%" }}>
          {children}
        </div>
      )}
    </div>
  );
}
