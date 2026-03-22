import { PlannerSchedule } from './PlannerSchedule'

export function PlannerLeftPage() {
  return (
    <div className="page left">
      <header className="date-header">
        <div className="meta-top">
          <span>Week 12</span>
          <div className="meta-line" />
          <span>Spring Equinox</span>
        </div>
        <h1 className="day-title">Thursday</h1>
        <div className="date-subtitle">March 21st, 2024</div>
      </header>

      <PlannerSchedule />
    </div>
  )
}

