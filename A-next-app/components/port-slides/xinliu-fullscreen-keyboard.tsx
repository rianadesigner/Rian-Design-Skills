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

export function FullscreenKeyboard() {
  return (
    <div
      className={styles.keyboard}
      aria-hidden="true"
      data-fullscreen-keyboard="true"
    >
      <div className={styles.candidates}>
        {CANDIDATES.map((candidate) => (
          <span key={candidate}>{candidate}</span>
        ))}
        <span className={styles.candidateArrow}>
          <ChevronDown />
        </span>
      </div>

      <div className={styles.rows}>
        <div className={styles.row}>
          {"qwertyuiop".split("").map((letter) => (
            <span key={letter} className={styles.key}>
              {letter}
            </span>
          ))}
        </div>
        <div className={`${styles.row} ${styles.middleRow}`}>
          {"asdfghjkl".split("").map((letter) => (
            <span key={letter} className={styles.key}>
              {letter}
            </span>
          ))}
        </div>
        <div className={`${styles.row} ${styles.lowerRow}`}>
          <span className={`${styles.key} ${styles.utility}`}>
            <ArrowBigUp />
          </span>
          {"zxcvbnm".split("").map((letter) => (
            <span key={letter} className={styles.key}>
              {letter}
            </span>
          ))}
          <span className={`${styles.key} ${styles.utility}`}>
            <Delete />
          </span>
        </div>
        <div className={`${styles.row} ${styles.actionRow}`}>
          <span className={`${styles.key} ${styles.utility} ${styles.numbers}`}>
            123
          </span>
          <span className={styles.key}>
            <Smile />
          </span>
          <span className={`${styles.key} ${styles.space}`}>空格</span>
          <span className={`${styles.key} ${styles.utility}`}>
            <CornerDownLeft />
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <Globe />
        <Mic />
      </div>
      <div className={styles.homeIndicator} />
    </div>
  )
}
