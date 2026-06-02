"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassPricingCard, type PlanTier } from "./glass-pricing-card";

const DotMatrixField = dynamic(
  () => import("./dot-matrix-field").then((m) => m.DotMatrixField),
  { ssr: false },
);

gsap.registerPlugin(ScrollTrigger);

const PLANS: PlanTier[] = [
  {
    name: "Neural Lite",
    price: "$19",
    cadence: "/ month · per seat",
    blurb:
      "Essential XR overlays and guided focus sessions for solo explorers mapping their first neural corridors.",
    features: [
      "Single spatial workspace",
      "Weekly insight digest",
      "Community shader presets",
      "Email support within 48h",
    ],
    cta: "Start Lite",
  },
  {
    name: "Synapse Pro",
    price: "$49",
    cadence: "/ month · per seat",
    blurb:
      "Compare modalities side-by-side, sync labs across devices, and ship conversion-ready XR decks faster.",
    highlighted: true,
    features: [
      "Unlimited experiments & branches",
      "Real-time co-presence (up to 6)",
      "GSAP-grade timeline exports",
      "Priority routing & SLA chat",
    ],
    cta: "Expand with Pro",
  },
  {
    name: "Collective Enterprise",
    price: "Custom",
    cadence: "annual contracts",
    blurb:
      "Dedicated mesh for institutions stretching cognition infrastructure across campuses and clinics.",
    features: [
      "Private inference lane",
      "On-prem or VPC deployment",
      "Custom compliance attestations",
      "Solutions architect pod",
    ],
    cta: "Talk to us",
  },
];

export function SynapseLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        y: 56,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.08,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 48,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-row]").forEach((el) => {
        gsap.from(el.children, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 36,
          opacity: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: "power2.out",
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-dvh overflow-x-hidden bg-[#060607] text-white"
    >
      <DotMatrixField className="pointer-events-none fixed inset-0 z-0 opacity-[0.72] mix-blend-screen" />

      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />

      <div className="relative z-10">
        <header className="flex items-center justify-between gap-4 px-6 py-6 md:px-12 md:py-12 md:pb-8">
          <p className="text-sm font-normal tracking-tight text-[#D4D4D8]">
            SynapseXR
          </p>
          <nav className="flex flex-wrap items-center gap-6 text-sm font-light">
            <a href="#pricing" className="text-[#D4D4D8] transition-colors duration-150 hover:text-white">
              Pricing
            </a>
            <span className="hidden text-white/20 md:inline">/</span>
            <Link
              href="/"
              className="text-[#D4D4D8] transition-colors duration-150 hover:text-white"
            >
              Portfolio home
            </Link>
          </nav>
        </header>

        <section className="grid gap-12 px-6 pb-16 pt-4 md:gap-16 md:px-12 md:pb-24 md:pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
          <div className="flex max-w-4xl flex-col gap-8">
            <p
              data-hero-line
              className="text-sm font-light uppercase tracking-[0.22em] text-[#8F47AE]"
            >
              Expand Your Mind
            </p>
            <h1
              data-hero-line
              className="text-[clamp(2.75rem,8vw,4.5rem)] font-light leading-[1] tracking-[-0.025em] text-white"
            >
              Cognition infrastructure for immersive XR labs.
            </h1>
            <p
              data-hero-line
              className="max-w-xl text-sm font-light leading-5 text-[#D4D4D8] md:text-base md:leading-6"
            >
              SynapseXR pairs glass-native interfaces with telemetry-aware storytelling—built for teams who need plan clarity before they plug into heavier pipelines.
            </p>
            <div data-hero-line className="flex flex-wrap gap-3 md:gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center bg-white px-4 py-[10px] text-sm font-normal text-black transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#f4f4f5]"
              >
                Compare plans
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center px-2 py-[10px] text-sm font-light text-[#D4D4D8] underline-offset-4 transition-colors duration-150 hover:text-white"
              >
                Watch spatial demo
              </button>
            </div>
          </div>

          <aside
            data-hero-line
            className="rounded-[12px] border border-white/[0.08] bg-black/40 p-5 backdrop-blur-[12px] md:p-6"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 2px 3px -1px, rgba(25, 28, 33, 0.02) 0px 1px 0px 0px, rgba(25, 28, 33, 0.08) 0px 0px 0px 1px",
            }}
          >
            <p className="text-[11px] font-normal uppercase tracking-[0.18em] text-[#4B4BA0]">
              Live mesh
            </p>
            <p className="mt-4 text-3xl font-light tabular-nums text-white">
              99.2<span className="text-lg text-[#D4D4D8]">%</span>
            </p>
            <p className="mt-1 text-sm font-light text-[#D4D4D8]">
              Signal fidelity across concurrent XR seats this week.
            </p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-[#4B4BA0]/60 via-[#8F47AE]/40 to-transparent" />
            <p className="mt-4 text-xs font-light leading-relaxed text-[#a1a1aa]">
              Retro-futurist visuals stay inset behind UI chrome—pointer drift nudges the particle field without stealing focus from conversion flows.
            </p>
          </aside>
        </section>

        <section
          id="pricing"
          className="scroll-mt-10 px-6 pb-24 pt-8 md:px-12 md:pb-32 md:pt-12"
        >
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="max-w-2xl">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-light tracking-[-0.025em] text-white">
                Pricing built for decisive studios.
              </h2>
              <p className="mt-4 text-sm font-light leading-6 text-[#D4D4D8] md:text-base">
                Full-bleed grid, glass surfaces, and sharp CTAs mirror the detected tokens—choose the lane that matches your XR rehearsal cadence.
              </p>
            </div>

            <div
              data-reveal-row
              className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8"
            >
              {PLANS.map((tier) => (
                <GlassPricingCard key={tier.name} tier={tier} />
              ))}
            </div>

            <p
              data-reveal
              className="mt-12 text-center text-xs font-light leading-relaxed text-zinc-500 md:mt-16"
            >
              Need SOC2 paperwork or bespoke shaders?{" "}
              <span className="text-[#D4D4D8] underline-offset-4 hover:text-white hover:underline">
                synapse@systems.placeholder
              </span>
            </p>
          </div>
        </section>

        <footer className="border-t border-white/[0.06] px-6 py-10 md:px-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs font-light text-zinc-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} SynapseXR · Expand Your Mind</p>
            <p className="text-[11px]">
              Colors · Primary #4B4BA0 · Tertiary #8F47AE · Surface glass blur 12px
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
