import type { ReactNode } from "react";

export type PlanTier = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

type GlassPricingCardProps = {
  tier: PlanTier;
};

/** Gradient-border shell + inset glass surface（对齐 DESIGN.md §Elevation） */
export function GlassPricingCard({ tier }: GlassPricingCardProps) {
  const inner: ReactNode = (
    <div
      className={
        tier.highlighted
          ? "rounded-[11px] border border-[#4B4BA0]/35 bg-black/55 p-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(143,71,174,0.22)] backdrop-blur-[12px] md:p-[48px]"
          : "rounded-[11px] border border-white/[0.06] bg-black/50 p-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-[12px] md:p-[48px]"
      }
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-lg font-normal tracking-tight text-white md:text-xl">
            {tier.name}
          </h3>
          {tier.highlighted ? (
            <span className="rounded-[12px] bg-[#8F47AE]/25 px-2 py-1 text-[11px] font-normal uppercase tracking-wider text-[#e9d4f4]">
              Popular
            </span>
          ) : null}
        </div>
        <p className="max-w-prose text-sm font-light leading-5 text-[#D4D4D8]">
          {tier.blurb}
        </p>
        <div className="flex flex-wrap items-baseline gap-2 border-t border-white/[0.06] pt-4 md:pt-6">
          <span className="text-[clamp(2rem,4vw,3rem)] font-light leading-none tracking-[-0.025em] text-white">
            {tier.price}
          </span>
          <span className="text-sm font-light text-[#D4D4D8]">{tier.cadence}</span>
        </div>
        <ul className="flex flex-col gap-3 pt-2 md:gap-4 md:pt-4">
          {tier.features.map((f) => (
            <li
              key={f}
              className="flex gap-3 text-sm font-light leading-5 text-[#D4D4D8]"
            >
              <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#4B4BA0]" />
              {f}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={
            tier.highlighted
              ? "mt-2 inline-flex w-full items-center justify-center bg-white px-2 py-[6px] text-sm font-normal leading-5 text-black transition-colors duration-200 ease-out hover:bg-[#f4f4f5] md:mt-4"
              : "mt-2 inline-flex w-full items-center justify-center border border-white/[0.12] bg-transparent px-2 py-[6px] text-sm font-normal leading-5 text-white transition-colors duration-200 ease-out hover:border-[#4B4BA0]/60 hover:text-white md:mt-4"
          }
        >
          {tier.cta}
        </button>
      </div>
    </div>
  );

  return (
    <article className="rounded-[12px] bg-[linear-gradient(rgba(255,255,255,0.04),rgba(255,255,255,0.01)),linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.02))] p-5">
      {inner}
    </article>
  );
}
