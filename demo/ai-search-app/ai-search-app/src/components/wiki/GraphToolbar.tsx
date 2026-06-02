import { Link } from "react-router-dom";

import type { WikiGroup } from "../../graph/buildKnowledgeGraph";

import "./GraphToolbar.css";

export interface GraphToolbarProps {
  group: WikiGroup;
  onGroupChange: (g: WikiGroup) => void;
  viewGrid: boolean;
  onToggleView: () => void;
}

export function GraphToolbar({
  group,
  onGroupChange,
  viewGrid,
  onToggleView,
}: GraphToolbarProps) {
  return (
    <div className="graph-toolbar">
      <div className="graph-toolbar__filters">
        <button
          type="button"
          className={`graph-fpill ${group === "all" ? "graph-fpill--on" : ""}`}
          onClick={() => onGroupChange("all")}
        >
          全部知识
        </button>
        <button
          type="button"
          className={`graph-fpill ${group === "a" ? "graph-fpill--on" : ""}`}
          onClick={() => onGroupChange("a")}
        >
          类型A
        </button>
        <button
          type="button"
          className={`graph-fpill ${group === "b" ? "graph-fpill--on" : ""}`}
          onClick={() => onGroupChange("b")}
        >
          类型B
        </button>
        <button
          type="button"
          className={`graph-fpill ${group === "c" ? "graph-fpill--on" : ""}`}
          onClick={() => onGroupChange("c")}
        >
          类型C
        </button>
      </div>
      <div className="graph-toolbar__actions">
        <div className="graph-toolbar__seg" role="group" aria-label="视图">
          <button
            type="button"
            className={`graph-iconbtn ${viewGrid ? "graph-iconbtn--on" : ""}`}
            onClick={onToggleView}
            aria-pressed={viewGrid}
            title="图谱 / 列表切换"
          >
            <span className="graph-glyph-grid" />
          </button>
          <button type="button" className="graph-iconbtn" aria-hidden title="分窗（示意）">
            <span className="graph-glyph-win" />
          </button>
        </div>
        <Link to="/search" className="graph-iconbtn graph-iconbtn--solo" title="语义搜索" aria-label="打开语义搜索">
          <span className="graph-glyph-search" />
        </Link>
      </div>
    </div>
  );
}
