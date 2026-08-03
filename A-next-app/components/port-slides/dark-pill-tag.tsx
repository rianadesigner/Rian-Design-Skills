import type { ReactNode } from "react";

export function DarkPillTag({ index, children }: { index: string; children: ReactNode }) {
  return (
    <span
      className="inline-flex w-fit items-center whitespace-nowrap"
      style={{
        gap: "clamp(4px, calc(0.42 * var(--u)), 6px)",
        padding: "clamp(3px, calc(0.35 * var(--u)), 5px) clamp(9px, calc(0.9 * var(--u)), 13px)",
        color: "rgba(255,255,255,0.82)",
        background: "rgba(45,45,45,0.96)",
        border: "1px solid rgba(255,255,255,0.34)",
        borderRadius: "999px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.24)",
        fontSize: "clamp(10px, calc(0.9 * var(--u)), 13px)",
        fontFamily: "'PingFang SC', sans-serif",
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: 0,
      }}
    >
      <strong
        style={{
          color: "rgba(255,255,255,0.62)",
          fontFamily: "'LogoSC Unbounded Sans', 'PingFang SC', sans-serif",
          fontSize: "1.08em",
          fontWeight: 800,
        }}
      >
        {index}
      </strong>
      <span>{children}</span>
    </span>
  );
}
