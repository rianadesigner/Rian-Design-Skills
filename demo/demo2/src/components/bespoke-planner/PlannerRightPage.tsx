import { PlannerNotes } from './PlannerNotes'
import { PlannerPriorities } from './PlannerPriorities'

export function PlannerRightPage() {
  return (
    <div className="page right">
      <div className="corner-deco">
        <div className="corner-dot" />
        <div className="corner-dot" style={{ opacity: 0.5 }} />
      </div>

      <PlannerPriorities />
      <PlannerNotes />

      <div className="page-curl-target" />
      <div className="page-curl" />
    </div>
  )
}

