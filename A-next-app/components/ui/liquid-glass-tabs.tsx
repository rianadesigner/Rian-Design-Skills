"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface LiquidGlassTab {
  label: string
  value: string
}

export interface LiquidGlassTabsProps {
  items: LiquidGlassTab[]
  defaultValue?: string
  className?: string
  variant?: "floating" | "embedded"
  onValueChange?: (value: string) => void
}

export function LiquidGlassTabs({
  items,
  defaultValue,
  className,
  variant = "floating",
  onValueChange,
}: LiquidGlassTabsProps) {
  const [activeValue, setActiveValue] = React.useState(
    defaultValue ?? items[0]?.value
  )
  const layoutId = React.useId()

  return (
    <div
      role="tablist"
      aria-label="知识库视图"
      className={cn(
        "relative flex items-center rounded-full",
        variant === "floating"
          ? "overflow-hidden border border-white/95 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(255,255,255,0.54)_50%,rgba(255,255,255,0.30)_100%)] p-1 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(255,255,255,0.5),0_2px_4px_rgba(15,23,42,0.05),0_12px_26px_rgba(15,23,42,0.12)] ring-1 ring-black/5 backdrop-blur-[24px] backdrop-saturate-150"
          : "p-0",
        className
      )}
    >
      {variant === "floating" && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_24%_0%,rgba(255,255,255,0.95),rgba(255,255,255,0.18)_44%,transparent_72%)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-px right-5 left-5 h-px bg-gradient-to-r from-transparent via-white to-transparent"
          />
        </>
      )}
      {items.map((item) => {
        const isActive = item.value === activeValue

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              setActiveValue(item.value)
              onValueChange?.(item.value)
            }}
            className={cn(
              "relative flex h-8 min-w-12 items-center justify-center rounded-full px-3 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`liquid-glass-tab-${layoutId}`}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className={cn(
                  "absolute inset-0 rounded-full border border-white bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(255,255,255,0.58))] shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_0_rgba(255,255,255,0.42)] ring-1 ring-black/5",
                  variant === "floating"
                    ? "shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_0_rgba(255,255,255,0.42),0_5px_12px_rgba(15,23,42,0.13)]"
                    : "shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_0_rgba(255,255,255,0.42),0_3px_8px_rgba(15,23,42,0.1)]"
                )}
              />
            )}
            <span className="relative">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
