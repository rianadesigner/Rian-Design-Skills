import { PlannerLeftPage } from './PlannerLeftPage'
import { PlannerRightPage } from './PlannerRightPage'
import { PlannerSpine } from './PlannerSpine'
import { PlannerTabs } from './PlannerTabs'

export function BespokeDigitalPlanner() {
  return (
    <div className="desk-surface">
      <PlannerTabs />

      <div className="planner-book">
        <PlannerLeftPage />
        <PlannerSpine />
        <PlannerRightPage />
      </div>
    </div>
  )
}

