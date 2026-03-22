import { useMemo, useState } from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May'] as const
type Month = (typeof MONTHS)[number]

export function PlannerTabs() {
  const defaultMonth = 'Mar' satisfies Month
  const [activeMonth, setActiveMonth] = useState<Month>(defaultMonth)

  const items = useMemo(() => MONTHS, [])

  return (
    <div className="planner-tabs">
      {items.map((m) => (
        <div
          key={m}
          className={`tab ${m === activeMonth ? 'active' : ''}`}
          onClick={() => setActiveMonth(m)}
        >
          {m}
        </div>
      ))}
    </div>
  )
}

