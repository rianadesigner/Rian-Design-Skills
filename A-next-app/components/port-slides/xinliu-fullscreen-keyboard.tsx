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
}: {
  academic?: boolean
}) {
  return (
    <div
      className={styles.keyboard}
      aria-hidden="true"
      data-fullscreen-keyboard="true"
      data-academic={academic || undefined}
    >
      <div className={styles.candidates}>
        {CANDIDATES.map((candidate) => (
          <span key={candidate}>{candidate}</span>
        ))}
        <span className={styles.candidateArrow}>
          {academic ? <AcademicKeyIcon name="down" /> : <ChevronDown />}
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
            {academic ? <AcademicKeyIcon name="up" /> : <ArrowBigUp />}
          </span>
          {"zxcvbnm".split("").map((letter) => (
            <span key={letter} className={styles.key}>
              {letter}
            </span>
          ))}
          <span className={`${styles.key} ${styles.utility}`}>
            {academic ? <AcademicKeyIcon name="delete" /> : <Delete />}
          </span>
        </div>
        <div className={`${styles.row} ${styles.actionRow}`}>
          <span className={`${styles.key} ${styles.utility} ${styles.numbers}`}>
            123
          </span>
          <span className={styles.key}>
            {academic ? <AcademicKeyIcon name="smile" /> : <Smile />}
          </span>
          <span className={`${styles.key} ${styles.space}`}>空格</span>
          <span className={`${styles.key} ${styles.utility}`}>
            {academic ? <AcademicKeyIcon name="return" /> : <CornerDownLeft />}
          </span>
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
