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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_65%_at_78%_35%,rgba(48,78,105,0.35)_0%,rgba(15,27,42,0.34)_32%,transparent_58%),linear-gradient(90deg,rgba(0,0,0,0.18)_0%,transparent_34%,rgba(0,0,0,0.2)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[18%] top-[11%] z-[1] h-[52vh] w-[58vw] rotate-[-10deg] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(74,111,137,0.34)_0%,rgba(25,43,61,0.28)_33%,rgba(3,3,5,0)_68%)] blur-2xl"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex h-[96px] shrink-0 items-center justify-between px-9 md:px-[36px]">
          <a href="#" className="text-[15px] font-medium tracking-tight text-white">
            SynapseXR
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 md:block"
            aria-label="Primary"
          >
            <ul className="flex gap-[34px]">
              {(["Capabilities", "Ecosystem", "Corporate", "Plans"] as const).map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-[12px] font-light text-white/50 transition-colors hover:text-white/90"
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
            Start Free
            <ArrowButtonBox>↗</ArrowButtonBox>
          </a>
        </header>

        <main className="relative flex flex-1 flex-col px-9 pb-6 md:px-[36px] md:pb-[28px]">
          <div className="mt-auto flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            {/* Left column */}
            <div className="max-w-[470px] shrink-0">
              <h1 className="mb-[84px] text-[clamp(2.85rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.055em] text-white">
                <span className="block font-light text-white/86">Unlock Potential.</span>
                <span className="block font-semibold text-white">Expand Your Mind.</span>
              </h1>

              <div className="w-full max-w-[384px] overflow-hidden border border-white/[0.08] md:w-[384px]">
                <FeatureRow
                  active
                  icon={null}
                  title="Mental Bandwidth Analysis"
                  description="Live assessment of cognitive reserves."
                />
                <FeatureRow
                  icon={<WaveIcon />}
                  title="Synaptic Flow Mapping"
                  description="Visualizing mental state and focus alignment."
                />
                <FeatureRow
                  icon={<PinIcon />}
                  title="Dynamic Concentration Cycles"
                  description="Intelligent routines calibrated for peak clarity."
                />
              </div>
            </div>

            {/* Right column */}
            <div className="mb-3 flex max-w-[390px] flex-col items-start gap-5 md:w-[390px] md:shrink-0">
              <p className="text-[13px] font-light leading-[1.72] text-white/58">
                SynapseXR evaluates your mental frequencies continuously,
                converting complex neural signals into actionable insights for
                sustained peak performance.
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
        "flex min-h-[64px] cursor-pointer items-center gap-3 border-b border-white/[0.06] px-[26px] py-3.5 backdrop-blur-[18px] transition-colors last:border-b-0",
        active ? "bg-white/[0.16]" : "bg-white/[0.075] hover:bg-white/[0.11]",
      )}
    >
      {icon ? <span className="mt-0.5 shrink-0 text-white/40">{icon}</span> : <span className="w-[18px] shrink-0" />}
      <div>
        <div className="text-[12px] font-medium leading-snug text-white/[0.95]">{title}</div>
        <div className="mt-1 text-[11px] font-light leading-normal text-white/38">{description}</div>
      </div>
    </div>
  );
}

function WaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="1.6" y="2.1" width="14.8" height="13.8" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4.4 10.7c1.2 0 1.1-3.6 2.4-3.6 1.5 0 1.3 5.1 2.8 5.1 1.4 0 1.1-3.4 2.3-3.4.8 0 1 .9 1.7.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 15.6s5-4.3 5-8.2a5 5 0 0 0-10 0c0 3.9 5 8.2 5 8.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path d="M9 8.9a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
