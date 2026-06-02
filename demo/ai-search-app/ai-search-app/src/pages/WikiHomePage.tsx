import { useCallback, useMemo, useState } from "react";

import { KnowledgeGraphCanvas } from "../components/KnowledgeGraphCanvas/KnowledgeGraphCanvas";
import { GraphToolbar } from "../components/wiki/GraphToolbar";
import { WikiLeftNav } from "../components/wiki/WikiLeftNav";
import { WikiRightPanel } from "../components/wiki/WikiRightPanel";
import { buildKnowledgeGraph } from "../graph/buildKnowledgeGraph";
import type { WikiGraphNode, WikiGroup } from "../graph/buildKnowledgeGraph";
import { loadCorpus } from "../corpus";

import "./wiki-shell.css";

const corpus = loadCorpus();

export default function WikiHomePage() {
  const [group, setGroup] = useState<WikiGroup>("all");
  const [viewGrid, setViewGrid] = useState(false);
  const [graphSelection, setGraphSelection] = useState<string | null>(null);

  const { nodes, links } = useMemo(
    () => buildKnowledgeGraph(corpus),
    []
  );

  const listPaths = useMemo(() => Object.keys(corpus).sort(), []);

  const onGraphNodeSelect = useCallback((n: WikiGraphNode | null) => {
    setGraphSelection(n ? n.label : null);
  }, []);

  return (
    <div className="wiki-shell">
      <WikiLeftNav />

      <div className="wiki-shell__main">
        <GraphToolbar
          group={group}
          onGroupChange={setGroup}
          viewGrid={viewGrid}
          onToggleView={() => setViewGrid((v) => !v)}
        />

        <div className="wiki-graph-stage">
          {graphSelection && !viewGrid ? (
            <div className="wiki-graph-selection" role="status" aria-live="polite">
              当前节点：{graphSelection}
            </div>
          ) : null}
          <div className="wiki-graph-stage__body">
            {viewGrid ? (
              <ul className="wiki-list" aria-label="知识库文件列表">
                {listPaths.map((p) => (
                  <li key={p} className="wiki-list__item">
                    <span className="wiki-list__path">{p}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <KnowledgeGraphCanvas
                nodes={nodes}
                links={links}
                group={group}
                onNodeSelect={onGraphNodeSelect}
              />
            )}
          </div>
        </div>
      </div>

      <WikiRightPanel />
    </div>
  );
}
