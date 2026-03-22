export function PlannerSpine() {
  // 原始 HTML 用脚本写入 6 组 ring/hole，这里用循环生成以保持一致。
  return (
    <div className="spine" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="ring-group">
          <div className="hole left" />
          <div className="ring" />
          <div className="hole right" />
        </div>
      ))}
    </div>
  )
}

