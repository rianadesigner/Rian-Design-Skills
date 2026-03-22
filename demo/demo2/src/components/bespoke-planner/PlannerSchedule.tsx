import type { CSSProperties } from 'react'

type EventStyle = CSSProperties

export function PlannerSchedule() {
  const events: Record<string, { style: EventStyle; time: string; title: string; variant?: 'lunch' }> =
    {
      '09:00': {
        style: { top: 0, height: 70 },
        time: '09:00 - 10:30',
        title: 'Botanical Sourcing & Vendor Calls',
      },
      '12:00': {
        style: {
          top: -10,
          height: 40,
          background: 'transparent',
          borderLeft: '3px solid var(--ink-light)',
        },
        time: '11:50 - 12:30',
        title: 'Lunch Break',
      },
      '14:00': {
        style: { top: 20, height: 90 },
        time: '14:30 - 16:00',
        title: 'Review Q2 Floral Arrangements Design Mockups',
      },
    }

  const timeBlocks = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ] as const

  return (
    <div className="schedule-container">
      <div className="current-time-indicator" />

      {timeBlocks.map((t) => {
        const ev = events[t]
        return (
          <div key={t} className="time-block">
            <div className="time-label">{t}</div>
            <div className="time-line" />
            {ev ? (
              <div className="event" style={ev.style}>
                <span className="event-time">{ev.time}</span>
                {ev.title}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

