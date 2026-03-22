import { useMemo, useState } from 'react'

type Task = {
  id: string
  text: string
  tag?: string
  due?: string
  completed: boolean
}

export function PlannerPriorities() {
  const initialTasks = useMemo<Task[]>(
    () => [
      {
        id: 't1',
        text: "Finalize color palette for the 'Flower Friendly' landing page campaign.",
        tag: 'Design',
        completed: true,
      },
      {
        id: 't2',
        text: 'Update inventory counts for Peonies and Ranunculus arrivals.',
        tag: 'Operations',
        due: 'Due 2:00 PM',
        completed: false,
      },
      {
        id: 't3',
        text: 'Draft copy for the bespoke wedding bouquet brochure.',
        completed: false,
      },
    ],
    [],
  )

  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  return (
    <>
      <h2 className="section-title">Priorities</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div
              className="task-checkbox"
              onClick={() => {
                setTasks((prev) =>
                  prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)),
                )
              }}
            />
            <div className="task-content">
              <div className="task-text">{task.text}</div>
              {task.tag ? (
                <div className="task-meta">
                  <span className="tag">{task.tag}</span>
                  {task.due ? <span>{task.due}</span> : null}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

