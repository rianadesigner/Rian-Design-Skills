"use client"

import { useState, type ReactNode } from "react"
import {
  ArrowBigUp,
  ChevronDown,
  CornerDownLeft,
  Delete,
  Globe,
  Mic,
  Smile,
} from "lucide-react"

import styles from "./xinliu-fullscreen-keyboard.module.css"

const CANDIDATES = ["我", "好", "是", "不", "那", "这"]

export function FullscreenKeyboard({
  academic = false,
  onKeyPress,
}: {
  academic?: boolean
  onKeyPress?: (key: string) => void
}) {
  const [shifted, setShifted] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const firstRow = numbers ? "1234567890" : "qwertyuiop"
  const middleRow = numbers ? "-/:;()¥&@" : "asdfghjkl"
  const lowerRow = numbers ? ".,?!'\"、" : "zxcvbnm"

  function key(
    value: string,
    content: ReactNode,
    className = styles.key,
    label?: string,
    action?: () => void,
  ) {
    if (!onKeyPress) {
      return <span key={value} className={className}>{content}</span>
    }

    return (
      <button
        key={value}
        type="button"
        className={className}
        tabIndex={-1}
        aria-label={label}
        aria-pressed={value === "Shift" ? shifted : undefined}
        onPointerDown={(event) => event.preventDefault()}
        onClick={action ?? (() => onKeyPress(value))}
      >
        {content}
      </button>
    )
  }

  function letterKey(letter: string) {
    const value = shifted && !numbers ? letter.toUpperCase() : letter
    return key(value, value)
  }

  return (
    <div
      className={styles.keyboard}
      aria-hidden={onKeyPress ? undefined : true}
      aria-label={onKeyPress ? "屏幕键盘" : undefined}
      role={onKeyPress ? "group" : undefined}
      data-fullscreen-keyboard="true"
      data-academic={academic || undefined}
      data-interactive={onKeyPress ? "true" : undefined}
    >
      <div className={styles.candidates}>
        {CANDIDATES.map((candidate) => (
          key(candidate, candidate, styles.candidateKey)
        ))}
        <span className={styles.candidateArrow}>
          {academic ? <AcademicKeyIcon name="down" /> : <ChevronDown />}
        </span>
      </div>

      <div className={styles.rows}>
        <div className={styles.row}>
          {firstRow.split("").map(letterKey)}
        </div>
        <div className={`${styles.row} ${styles.middleRow}`}>
          {middleRow.split("").map(letterKey)}
        </div>
        <div className={`${styles.row} ${styles.lowerRow}`}>
          {key(
            "Shift",
            academic ? <AcademicKeyIcon name="up" /> : <ArrowBigUp />,
            `${styles.key} ${styles.utility}`,
            shifted ? "切换小写" : "切换大写",
            () => { setNumbers(false); setShifted((value) => !value) },
          )}
          {lowerRow.split("").map(letterKey)}
          {key(
            "Backspace",
            academic ? <AcademicKeyIcon name="delete" /> : <Delete />,
            `${styles.key} ${styles.utility}`,
            "删除",
          )}
        </div>
        <div className={`${styles.row} ${styles.actionRow}`}>
          {key(
            "Numbers",
            numbers ? "ABC" : "123",
            `${styles.key} ${styles.utility} ${styles.numbers}`,
            numbers ? "切换字母" : "切换数字",
            () => setNumbers((value) => !value),
          )}
          {key(
            "🙂",
            academic ? <AcademicKeyIcon name="smile" /> : <Smile />,
            styles.key,
            "插入表情",
          )}
          {key(" ", "空格", `${styles.key} ${styles.space}`, "空格")}
          {key(
            "Enter",
            academic ? <AcademicKeyIcon name="return" /> : <CornerDownLeft />,
            `${styles.key} ${styles.utility}`,
            "换行",
          )}
        </div>
      </div>

      <div className={styles.footer}>
        {academic ? (
          <>
            <AcademicKeyIcon name="globe" />
            <AcademicKeyIcon name="mic" />
          </>
        ) : (
          <>
            <Globe />
            <Mic />
          </>
        )}
      </div>
      <div className={styles.homeIndicator} />
    </div>
  )
}

function AcademicKeyIcon({ name }: { name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/images/page7/academic-overlay/keyboard-${name}.svg`} alt="" />
  )
}
