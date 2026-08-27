"use client"

import type { CSSProperties, ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type BentoCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  accent?: string
  ariaLabel?: string
}

export function BentoCard({
  children,
  className,
  style,
  accent = "#ff624f",
  ariaLabel,
}: BentoCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      initial="idle"
      whileHover="active"
      variants={
        reduceMotion
          ? { idle: {}, active: {} }
          : {
              idle: { y: 0, scale: 1 },
              active: {
                y: -4,
                scale: 1.004,
                transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
              },
            }
      }
      aria-label={ariaLabel}
      className={cn("group relative overflow-hidden", className)}
      style={style}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40"
        variants={
          reduceMotion
            ? { idle: { opacity: 0 }, active: { opacity: 0 } }
            : {
                idle: { opacity: 0, x: "-28%" },
                active: {
                  opacity: 1,
                  x: "28%",
                  transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
                },
              }
        }
        style={{
          background: `linear-gradient(112deg, transparent 30%, ${accent}12 48%, rgba(255,255,255,0.07) 52%, transparent 70%)`,
          mixBlendMode: "screen",
        }}
      />
    </motion.section>
  )
}

export default BentoCard
