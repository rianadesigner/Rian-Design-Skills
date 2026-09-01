"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Check, ChevronDown, ScanText, Search, X } from "lucide-react"

import {
  LiquidGlassTabs,
  type LiquidGlassTab,
} from "@/components/ui/liquid-glass-tabs"
import { cn } from "@/lib/utils"

export interface SpotlightShortcut {
  label: string
  icon: React.ReactNode
  link: string
  action?: "file-upload" | "paste-content" | "connect-app" | "git-import"
  inputPlaceholder?: string
  sourceOptions?: SpotlightSourceOption[]
}

export interface SpotlightSourceOption {
  value: string
  label: string
  compactLabel?: string
  icon: React.ReactNode
}

export interface AppleSpotlightProps {
  shortcuts: SpotlightShortcut[]
  placeholder?: string
  className?: string
  surfaceStyle?: React.CSSProperties
  isOpen?: boolean
  viewTabs?: LiquidGlassTab[]
  defaultView?: string
  onViewTabChange?: (value: string) => void
  fileAccept?: string
  value?: string
  onValueChange?: (value: string) => void
  onFileChange?: (file?: File) => void
  onSubmit?: (value: string, file?: File) => void
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
  onViewTabChange,
  fileAccept,
  value: controlledValue,
  onValueChange,
  onFileChange,
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
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [selectedSource, setSelectedSource] = React.useState<string | null>(
    null
  )
  const [isSourceAuthorized, setIsSourceAuthorized] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const value = controlledValue ?? internalValue
  const hasValue = value.trim().length > 0
  const activeShortcut =
    selectedShortcut === null ? null : shortcuts[selectedShortcut]
  const hasActiveMode = selectedShortcut !== null
  const isFileUploadMode = activeShortcut?.action === "file-upload"
  const sourceOptions = activeShortcut?.sourceOptions ?? []
  const isConnectionSourceMode =
    activeShortcut?.action === "connect-app" && sourceOptions.length > 0
  const selectedSourceOption =
    sourceOptions.find((option) => option.value === selectedSource) ?? null
  const hasSubmission = hasValue || Boolean(selectedFile)
  const activePlaceholder =
    hoveredShortcut !== null
      ? (shortcuts[hoveredShortcut].inputPlaceholder ??
        shortcuts[hoveredShortcut].label)
      : (activeShortcut?.inputPlaceholder ??
        activeShortcut?.label ??
        placeholder)

  const handleSubmit = () => {
    if (hasSubmission) {
      onSubmit?.(value.trim(), selectedFile ?? undefined)
    }
  }

  const handleValueChange = (nextValue: string) => {
    if (controlledValue === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    onFileChange?.(undefined)
  }

  const exitActiveMode = () => {
    clearSelectedFile()
    handleValueChange("")
    setSelectedSource(null)
    setIsSourceAuthorized(false)
    setSelectedShortcut(null)
  }

  const handleShortcutSelect = (index: number) => {
    if (selectedShortcut === index) {
      exitActiveMode()
      return
    }

    handleValueChange("")
    setSelectedSource(null)
    setIsSourceAuthorized(false)
    setSelectedShortcut(index)
    if (shortcuts[index].action !== "file-upload") clearSelectedFile()
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
              style={{
                ...surfaceStyle,
                ...(isFileUploadMode
                  ? {
                      background: "#171717",
                      borderColor: "rgba(0, 0, 0, 0.9)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 26px rgba(15,23,42,0.18)",
                      backdropFilter: "none",
                    }
                  : {}),
              }}
              transition={{
                layout: { type: "spring", stiffness: 430, damping: 34 },
              }}
              className={cn(
                "relative flex min-w-0 flex-1 items-center gap-3 overflow-hidden border",
                isFileUploadMode
                  ? "h-12 rounded-full border-black px-2.5 text-white"
                  : "h-12 rounded-full border-white/95 bg-[linear-gradient(135deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.58)_48%,rgba(255,255,255,0.34)_100%)] px-2 text-foreground shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(255,255,255,0.5),0_2px_4px_rgba(15,23,42,0.05),0_14px_30px_rgba(15,23,42,0.12)] ring-1 ring-black/5 backdrop-blur-[24px] backdrop-saturate-150"
              )}
            >
              {!isFileUploadMode && (
                <>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_24%_0%,rgba(255,255,255,0.95),rgba(255,255,255,0.18)_42%,transparent_70%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-px right-8 left-8 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                  />
                </>
              )}

              {isFileUploadMode ? (
                <>
                  <button
                    type="button"
                    aria-label={activeShortcut.label}
                    onClick={() => fileInputRef.current?.click()}
                    className="relative flex h-full min-w-0 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-full text-center outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center text-white">
                      <span className="[&_svg]:size-5 [&_svg]:stroke-[1.8]">
                        {activeShortcut.icon}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-[14px] leading-[17px] font-semibold tracking-[-0.01em] text-white"
                      )}
                    >
                      上传本地文件
                    </span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={fileAccept}
                    className="hidden"
                    tabIndex={-1}
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (!file) return
                      setSelectedFile(file)
                      onFileChange?.(file)
                    }}
                  />
                  <motion.button
                    type="button"
                    aria-label="返回普通输入"
                    title="返回普通输入"
                    onClick={exitActiveMode}
                    initial={{ opacity: 0, scale: 0.72 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.72 }}
                    className="relative flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/55 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 [&_svg]:size-3.5"
                  >
                    <X aria-hidden="true" />
                  </motion.button>
                </>
              ) : isConnectionSourceMode ? (
                <>
                  <span className="relative flex size-8 shrink-0 items-center justify-center text-muted-foreground [&_img]:size-5 [&_img]:object-contain [&_svg]:size-5 [&_svg]:stroke-[1.7]">
                    {selectedSourceOption?.icon ?? activeShortcut.icon}
                  </span>
                  {selectedSourceOption ? (
                    <>
                      <button
                        type="button"
                        aria-label="更换来源"
                        onClick={() => {
                          setSelectedSource(null)
                          setIsSourceAuthorized(false)
                        }}
                        className="relative flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1 text-left transition-colors outline-none hover:bg-black/[0.035] focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="truncate text-sm font-semibold text-foreground">
                          {selectedSourceOption.label}
                        </span>
                        <span
                          className={cn(
                            "flex shrink-0 items-center gap-1 text-[10px] font-medium",
                            isSourceAuthorized
                              ? "text-[#3d9b61]"
                              : "text-muted-foreground"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "size-1.5 rounded-full",
                              isSourceAuthorized
                                ? "bg-[#55bd7b]"
                                : "bg-black/25"
                            )}
                          />
                          {isSourceAuthorized ? "已授权" : "未授权"}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className="size-3.5 shrink-0 stroke-[1.7] text-muted-foreground"
                        />
                      </button>
                      <span
                        aria-hidden="true"
                        className="relative h-6 w-px shrink-0 bg-border/65"
                      />
                      <button
                        type="button"
                        aria-label={
                          isSourceAuthorized
                            ? `${selectedSourceOption.label}已关联`
                            : `关联${selectedSourceOption.label}账号`
                        }
                        onClick={() => setIsSourceAuthorized(true)}
                        className={cn(
                          "relative flex h-8 shrink-0 items-center gap-1 rounded-xl px-3 text-[11px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isSourceAuthorized
                            ? "cursor-default bg-[#f1faf4] text-[#3d9b61]"
                            : "cursor-pointer bg-black/[0.055] text-foreground hover:bg-black/[0.085]"
                        )}
                      >
                        {isSourceAuthorized && (
                          <Check
                            aria-hidden="true"
                            className="size-3.5 stroke-[2.4]"
                          />
                        )}
                        {isSourceAuthorized ? "已关联" : "关联账号"}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="relative min-w-0 flex-1 overflow-hidden">
                        <div
                          role="group"
                          aria-label="第三方来源"
                          tabIndex={0}
                          onWheel={(event) => {
                            event.stopPropagation()
                            if (
                              Math.abs(event.deltaY) > Math.abs(event.deltaX)
                            ) {
                              event.preventDefault()
                              event.currentTarget.scrollLeft += event.deltaY
                            }
                          }}
                          onKeyDown={(event) => {
                            event.stopPropagation()
                            if (event.key === "ArrowRight") {
                              event.preventDefault()
                              event.currentTarget.scrollBy({
                                left: 96,
                                behavior: "smooth",
                              })
                            }
                            if (event.key === "ArrowLeft") {
                              event.preventDefault()
                              event.currentTarget.scrollBy({
                                left: -96,
                                behavior: "smooth",
                              })
                            }
                          }}
                          onPointerDown={(event) => event.stopPropagation()}
                          onTouchMove={(event) => event.stopPropagation()}
                          className="flex min-w-0 touch-pan-x items-center gap-1.5 overflow-x-auto overscroll-x-contain scroll-smooth pr-4 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-scrollbar]:hidden"
                        >
                          {sourceOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              aria-label={`选择${option.label}`}
                              title={option.label}
                              onClick={() => {
                                setSelectedSource(option.value)
                                setIsSourceAuthorized(false)
                              }}
                              className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-black/[0.045] bg-white/55 px-2.5 text-[10px] font-medium whitespace-nowrap text-foreground/75 transition-[background-color,color,box-shadow] outline-none hover:bg-white hover:text-foreground hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring [&_img]:size-4 [&_img]:shrink-0 [&_img]:object-contain [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:stroke-[1.9]"
                            >
                              {option.icon}
                              <span>{option.label}</span>
                            </button>
                          ))}
                        </div>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 right-0 w-5 bg-gradient-to-r from-transparent to-white/85"
                        />
                      </div>
                    </>
                  )}
                  <motion.button
                    type="button"
                    aria-label="返回普通输入"
                    title="返回普通输入"
                    onClick={exitActiveMode}
                    initial={{ opacity: 0, scale: 0.72 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.72 }}
                    className="relative flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground/65 transition-colors outline-none hover:bg-black/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5"
                  >
                    <X aria-hidden="true" />
                  </motion.button>
                </>
              ) : (
                <>
                  <span className="relative flex size-8 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-5 [&_svg]:stroke-[1.7]">
                    {activeShortcut?.icon ?? <Search aria-hidden="true" />}
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
                      onInput={(event) => {
                        handleValueChange(event.currentTarget.value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") handleSubmit()
                      }}
                      aria-label={activePlaceholder}
                      className={cn(
                        "h-12 w-full bg-transparent text-sm outline-none",
                        activeShortcut &&
                          hasValue &&
                          "font-medium text-foreground"
                      )}
                    />
                  </span>
                  {activeShortcut && (
                    <motion.button
                      type="button"
                      aria-label="返回普通输入"
                      title="返回普通输入"
                      onClick={exitActiveMode}
                      initial={{ opacity: 0, scale: 0.72 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.72 }}
                      className="relative flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground/65 transition-colors outline-none hover:bg-black/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5"
                    >
                      <X aria-hidden="true" />
                    </motion.button>
                  )}
                  {viewTabs.length > 0 &&
                    (!activeShortcut || hasSubmission) && (
                      <>
                        <span
                          aria-hidden="true"
                          className="relative h-6 w-px shrink-0 bg-border/65"
                        />
                        <AnimatePresence mode="wait" initial={false}>
                          {hasSubmission ? (
                            <motion.div
                              key="submit-actions"
                              initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              exit={{ opacity: 0, scale: 0.72, rotate: 10 }}
                              transition={{
                                type: "spring",
                                stiffness: 480,
                                damping: 30,
                              }}
                              className="relative flex shrink-0 items-center gap-1.5"
                            >
                              <button
                                type="button"
                                onClick={handleSubmit}
                                aria-label={
                                  activeShortcut ? "解析内容" : "提交研究内容"
                                }
                                className="relative flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {activeShortcut ? (
                                  <span className="flex size-8 items-center justify-center rounded-full bg-[#111] text-white shadow-[0_4px_10px_rgba(15,23,42,.18)]">
                                    <ScanText
                                      aria-hidden="true"
                                      className="size-[17px] stroke-[1.9]"
                                    />
                                  </span>
                                ) : (
                                  <SendArrowIcon className="size-8" />
                                )}
                              </button>
                            </motion.div>
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
                                onValueChange={onViewTabChange}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                </>
              )}
            </motion.div>

            <AnimatePresence mode="popLayout" initial={false}>
              {(isHovered || hasActiveMode) &&
                (!hasSubmission || hasActiveMode) &&
                shortcuts.length > 0 && (
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
                          onMouseLeave={() => setHoveredShortcut(null)}
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
                          {shortcut.action ? (
                            <button
                              type="button"
                              aria-label={shortcut.label}
                              aria-pressed={isSelected}
                              onClick={() => handleShortcutSelect(index)}
                              className={cn(
                                "relative flex size-10 items-center justify-center rounded-full transition-[color,opacity] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-5 [&_svg]:stroke-[1.7]",
                                isSelected
                                  ? "text-foreground opacity-100"
                                  : "text-muted-foreground opacity-55 hover:opacity-100"
                              )}
                            >
                              {shortcut.icon}
                            </button>
                          ) : (
                            <Link
                              href={shortcut.link}
                              aria-label={shortcut.label}
                              aria-current={isSelected ? "page" : undefined}
                              onClick={() => handleShortcutSelect(index)}
                              className={cn(
                                "relative flex size-10 items-center justify-center rounded-full transition-[color,opacity] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-5 [&_svg]:stroke-[1.7]",
                                isSelected
                                  ? "text-foreground opacity-100"
                                  : "text-muted-foreground opacity-55 hover:opacity-100"
                              )}
                            >
                              {shortcut.icon}
                            </Link>
                          )}
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
