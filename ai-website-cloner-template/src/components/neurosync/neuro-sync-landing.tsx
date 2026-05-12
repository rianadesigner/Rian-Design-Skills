import type { ReactNode } from "react";
import { TunnelCanvas } from "@/components/neurosync/tunnel-canvas";
import { cn } from "@/lib/utils";

function ArrowButtonBox({ children }: { children: ReactNode }) {
  return (
    <span className="ml-2.5 flex h-[26px] w-[26px] items-center justify-center border-l border-black/18 text-xs">
      {children}
    </span>
  );
}

export function NeuroSyncLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      <TunnelCanvas />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex h-[58px] shrink-0 items-center justify-between px-5 md:px-[52px]">
          <a href="#" className="text-[15px] font-medium tracking-tight text-white">
            NeuroSync
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 md:block"
            aria-label="Primary"
          >
            <ul className="flex gap-9">
              {(["Features", "Integrations", "Enterprise", "Pricing"] as const).map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-[13px] font-light text-white/55 transition-colors hover:text-white/90"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#"
            className="inline-flex items-center bg-white px-[18px] py-2 text-[12px] font-medium tracking-wide text-black transition-colors hover:bg-[#e8e8e8]"
          >
            Get Started
            <ArrowButtonBox>↗</ArrowButtonBox>
          </a>
        </header>

        <main className="relative flex flex-1 flex-col px-5 pb-10 md:px-[52px] md:pb-[52px]">
          <div className="mt-auto flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            {/* Left column */}
            <div className="max-w-[390px] shrink-0">
              <h1
                className={cn(
                  "mb-5 text-[clamp(2.25rem,4.8vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-white",
                )}
              >
                Think Faster.
                <br />
                Master Your Mind.
              </h1>

              <div className="w-full max-w-[360px] border border-white/[0.08] md:w-[360px]">
                <FeatureRow
                  active
                  icon={null}
                  title="Cognitive Load Tracking"
                  description="Real-time mental bandwidth metrics."
                />
                <FeatureRow
                  icon={<GridIcon />}
                  title="Neural Pathway Mapping"
                  description="Visualizing thought patterns and flow states."
                />
                <FeatureRow
                  icon={<TargetIcon />}
                  title="Adaptive Focus Protocols"
                  description="AI-driven routines for peak concentration."
                />
              </div>
            </div>

            {/* Right column */}
            <div className="flex max-w-[300px] flex-col items-start gap-6 md:shrink-0">
              <p className="text-[13px] font-light leading-[1.75] text-white/55">
                NeuroSync monitors your cognitive state in real-time, translating raw brainwave data into a clear
                picture of exactly when you peak and how to sustain it.
              </p>
              <a
                href="#"
                className="inline-flex items-center bg-white px-5 py-2.5 text-[12px] font-medium tracking-wide text-black transition-colors hover:bg-[#e8e8e8]"
              >
                Request Access
                <ArrowButtonBox>↗</ArrowButtonBox>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function FeatureRow({
  active,
  icon,
  title,
  description,
}: {
  active?: boolean;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-start gap-3 border-b border-white/[0.06] px-[18px] py-3.5 backdrop-blur-[12px] transition-colors last:border-b-0",
        active ? "bg-white/[0.09]" : "bg-black/45 hover:bg-white/[0.06]",
      )}
    >
      {icon ? <span className="mt-0.5 shrink-0 text-white/40">{icon}</span> : <span className="w-[18px] shrink-0" />}
      <div>
        <div className="text-[13px] font-medium leading-snug text-white/[0.95]">{title}</div>
        <div className="mt-0.5 text-[12px] font-light leading-normal text-white/38">{description}</div>
      </div>
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="10.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="1.5" y="10.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 13.5h6M13.5 10.5v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="9" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}
