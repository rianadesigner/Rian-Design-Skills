"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Search } from "lucide-react"

import {
  LiquidGlassTabs,
  type LiquidGlassTab,
} from "@/components/ui/liquid-glass-tabs"
import { cn } from "@/lib/utils"

export interface SpotlightShortcut {
  label: string
  icon: React.ReactNode
  link: string
}

export interface AppleSpotlightProps {
  shortcuts: SpotlightShortcut[]
  placeholder?: string
  className?: string
  surfaceStyle?: React.CSSProperties
  isOpen?: boolean
  viewTabs?: LiquidGlassTab[]
  defaultView?: string
  value?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
}

function SendArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <rect width="32" height="32" rx="16" fill="currentColor" />
      <path
        d="M21.8354 10.1644C21.5164 9.84547 21.0519 9.73513 20.6254 9.87236L8.64327 13.7239C8.18801 13.8704 7.87277 14.2561 7.82085 14.7318C7.76892 15.2065 7.99423 15.6516 8.40683 15.8917L12.6497 18.3664L16.3149 14.7003C16.5865 14.4286 17.027 14.4286 17.2986 14.7003C17.5703 14.9719 17.5703 15.4123 17.2986 15.684L13.6325 19.3501L16.1072 23.593C16.3251 23.9657 16.7099 24.1854 17.1336 24.1854C17.1781 24.1854 17.2235 24.1827 17.269 24.178C17.7437 24.1261 18.1303 23.8109 18.2759 23.3565L22.1284 11.3753C22.2656 10.946 22.1534 10.4825 21.8354 10.1644Z"
        fill="white"
      />
    </svg>
  )
}

export function AppleSpotlight({
  shortcuts,
  placeholder = "Search",
  className,
  surfaceStyle,
  isOpen = true,
  viewTabs = [],
  defaultView,
  value: controlledValue,
  onValueChange,
  onSubmit,
}: AppleSpotlightProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [hoveredShortcut, setHoveredShortcut] = React.useState<number | null>(
    null
  )
  const [selectedShortcut, setSelectedShortcut] = React.useState<number | null>(
    null
  )
  const [internalValue, setInternalValue] = React.useState("")
  const value = controlledValue ?? internalValue
  const hasValue = value.trim().length > 0
  const activePlaceholder =
    hoveredShortcut === null ? placeholder : shortcuts[hoveredShortcut].label

  const handleSubmit = () => {
    if (hasValue) {
      onSubmit?.(value.trim())
    }
  }

  const handleValueChange = (nextValue: string) => {
    if (controlledValue === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scaleX: 1.04, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 6, scaleX: 1.03, filter: "blur(8px)" }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setHoveredShortcut(null)
          }}
          className={cn(
            "relative flex w-full items-center justify-end gap-2",
            className
          )}
        >
          <div className="flex w-full items-center justify-end gap-2.5">
            <motion.div
              layout
              style={surfaceStyle}
              transition={{
                layout: { type: "spring", stiffness: 430, damping: 34 },
              }}
              className="relative flex h-12 min-w-0 flex-1 items-center gap-3 overflow-hidden rounded-full border border-white/95 bg-[linear-gradient(135deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.58)_48%,rgba(255,255,255,0.34)_100%)] px-2 text-foreground shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(255,255,255,0.5),0_2px_4px_rgba(15,23,42,0.05),0_14px_30px_rgba(15,23,42,0.12)] ring-1 ring-black/5 backdrop-blur-[24px] backdrop-saturate-150"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_24%_0%,rgba(255,255,255,0.95),rgba(255,255,255,0.18)_42%,transparent_70%)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-px right-8 left-8 h-px bg-gradient-to-r from-transparent via-white to-transparent"
              />
              <span className="relative flex size-8 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-5 [&_svg]:stroke-[1.7]">
                <Search aria-hidden="true" />
              </span>
              <span className="relative min-w-0 flex-1">
                {!value && (
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={activePlaceholder}
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="pointer-events-none absolute inset-y-0 left-0 flex max-w-full items-center truncate text-sm text-muted-foreground"
                    >
                      {activePlaceholder}
                    </motion.span>
                  </AnimatePresence>
                )}
                <input
                  value={value}
                  onChange={(event) => handleValueChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit()
                    }
                  }}
                  aria-label={placeholder}
                  className="h-12 w-full bg-transparent text-sm outline-none"
                />
              </span>
              {viewTabs.length > 0 && (
                <>
                  <span
                    aria-hidden="true"
                    className="relative h-6 w-px shrink-0 bg-border/65"
                  />
                  <AnimatePresence mode="wait" initial={false}>
                    {hasValue ? (
                      <motion.button
                        key="send-arrow"
                        type="button"
                        onClick={handleSubmit}
                        aria-label="提交研究内容"
                        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.72, rotate: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 480,
                          damping: 30,
                        }}
                        className="relative flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <SendArrowIcon className="size-8" />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="view-tabs"
                        initial={{ opacity: 0, scale: 0.92, x: 8 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.92, x: 8 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="relative shrink-0"
                      >
                        <LiquidGlassTabs
                          items={viewTabs}
                          defaultValue={defaultView}
                          variant="embedded"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>

            <AnimatePresence mode="popLayout" initial={false}>
              {isHovered && !value && shortcuts.length > 0 && (
                <motion.div
                  layout
                  key="shortcut-glass-group"
                  initial={{ opacity: 0, scale: 0.84, x: -46 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.84, x: -34 }}
                  transition={{ type: "spring", stiffness: 390, damping: 30 }}
                  className="relative flex shrink-0 items-center gap-1 rounded-full border border-white/95 bg-[linear-gradient(135deg,rgba(255,255,255,0.84)_0%,rgba(255,255,255,0.54)_50%,rgba(255,255,255,0.30)_100%)] p-1 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(255,255,255,0.5),0_2px_4px_rgba(15,23,42,0.05),0_14px_30px_rgba(15,23,42,0.13)] ring-1 ring-black/5 backdrop-blur-[24px] backdrop-saturate-150"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_25%_0%,rgba(255,255,255,0.95),rgba(255,255,255,0.16)_45%,transparent_72%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-px right-5 left-5 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                  />
                  {shortcuts.map((shortcut, index) => {
                    const isSelected = selectedShortcut === index

                    return (
                      <motion.div
                        layout
                        key={shortcut.label}
                        initial={{
                          opacity: 0,
                          scale: 0.72,
                          x: -18 * (index + 1),
                        }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.76, x: -12 }}
                        transition={{
                          type: "spring",
                          stiffness: 430,
                          damping: 30,
                          delay: index * 0.035,
                        }}
                        onMouseEnter={() => setHoveredShortcut(index)}
                        className="relative shrink-0 rounded-full"
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="spotlight-active-shortcut"
                            transition={{
                              type: "spring",
                              stiffness: 430,
                              damping: 30,
                            }}
                            className="absolute inset-0 rounded-full border border-white bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(255,255,255,0.58))] shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_0_rgba(255,255,255,0.42),0_5px_12px_rgba(15,23,42,0.13)] ring-1 ring-black/5"
                          />
                        )}
                        <Link
                          href={shortcut.link}
                          aria-label={shortcut.label}
                          aria-current={isSelected ? "page" : undefined}
                          onClick={() => setSelectedShortcut(index)}
                          className={cn(
                            "relative flex size-10 items-center justify-center rounded-full transition-[color,opacity] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-5 [&_svg]:stroke-[1.7]",
                            isSelected
                              ? "text-foreground opacity-100"
                              : "text-muted-foreground opacity-55 hover:opacity-100"
                          )}
                        >
                          {shortcut.icon}
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
