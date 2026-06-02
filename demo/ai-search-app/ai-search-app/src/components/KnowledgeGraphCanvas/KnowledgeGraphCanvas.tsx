import { useCallback, useEffect, useRef } from "react";

import type { WikiGraphLink, WikiGraphNode, WikiGroup } from "../../graph/buildKnowledgeGraph";
import { filterGraphByGroup } from "../../graph/buildKnowledgeGraph";

import "./KnowledgeGraphCanvas.css";

/** Obsidian 关系图风格近似色 */
const BG = "#f9f9f9";
const EDGE = "#d1d1d1";
const EDGE_DIM = "rgba(209, 209, 209, 0.22)";
const NODE = "#4a4a4a";
const NODE_DIM = "rgba(74, 74, 74, 0.28)";
const NODE_HOVER = "#2f2f2f";
const NODE_SELECTED = "#1a1a1a";
const LABEL = "#1a1a1a";
const LABEL_DIM = "rgba(26, 26, 26, 0.28)";

const LINK_IDEAL = 88;
const REPULSE = 4200;
const CENTER_PULL = 0.012;
const DAMPING = 0.88;

interface SimNode extends WikiGraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export interface KnowledgeGraphCanvasProps {
  nodes: WikiGraphNode[];
  links: WikiGraphLink[];
  group: WikiGroup;
  /** 选中节点变化（点空白为 null） */
  onNodeSelect?: (node: WikiGraphNode | null) => void;
}

function degreeOf(id: string, links: WikiGraphLink[]): number {
  let d = 0;
  for (const l of links) {
    if (l.source === id || l.target === id) d += 1;
  }
  return d;
}

/** 与某节点直接相连的节点 id（含自身），用于 Obsidian 式 1-hop 高亮 */
function focusNeighborhood(
  focusId: string | null,
  links: WikiGraphLink[]
): Set<string> | null {
  if (!focusId) return null;
  const set = new Set<string>([focusId]);
  for (const l of links) {
    if (l.source === focusId) set.add(l.target);
    if (l.target === focusId) set.add(l.source);
  }
  return set;
}

function linkTouchesFocus(l: WikiGraphLink, focusId: string | null): boolean {
  if (!focusId) return false;
  return l.source === focusId || l.target === focusId;
}

export function KnowledgeGraphCanvas({
  nodes: allNodes,
  links: allLinks,
  group,
  onNodeSelect,
}: KnowledgeGraphCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<SimNode[]>([]);
  const linksRef = useRef<WikiGraphLink[]>([]);
  const nodesByIdRef = useRef<Map<string, WikiGraphNode>>(new Map());
  const rafRef = useRef(0);

  const viewRef = useRef({
    ox: 0,
    oy: 0,
    scale: 1,
    panning: false,
    grabX: 0,
    grabY: 0,
    draggingNodeId: null as string | null,
    pointerWorldX: 0,
    pointerWorldY: 0,
    hoveredId: null as string | null,
    selectedId: null as string | null,
  });

  const { nodes: filteredNodes, links: filteredLinks } = filterGraphByGroup(
    allNodes,
    allLinks,
    group
  );

  const initSim = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    const cx = w / 2;
    const cy = h / 2;

    const nCount = filteredNodes.length;
    nodesByIdRef.current = new Map(filteredNodes.map((n) => [n.id, n]));

    if (nCount === 0) {
      simRef.current = [];
      linksRef.current = [];
      return;
    }

    const nodes: SimNode[] = filteredNodes.map((node, i) => {
      const ang = (i / nCount) * Math.PI * 2;
      const rad = Math.min(w, h) * 0.28;
      const deg = degreeOf(node.id, filteredLinks);
      const r = 3 + Math.min(14, Math.sqrt(deg + 0.5) * 2.4);
      return {
        ...node,
        x: cx + Math.cos(ang) * rad * (0.4 + Math.random() * 0.6),
        y: cy + Math.sin(ang) * rad * (0.4 + Math.random() * 0.6),
        vx: 0,
        vy: 0,
        r,
      };
    });
    simRef.current = nodes;
    linksRef.current = filteredLinks;
  }, [filteredNodes, filteredLinks]);

  useEffect(() => {
    initSim();
    viewRef.current.ox = 0;
    viewRef.current.oy = 0;
    viewRef.current.scale = 1;
    viewRef.current.hoveredId = null;
    viewRef.current.selectedId = null;
    viewRef.current.draggingNodeId = null;
  }, [initSim, group, filteredNodes, filteredLinks]);

  const screenToWorld = (clientX: number, clientY: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return { x: 0, y: 0 };
    const rect = wrap.getBoundingClientRect();
    const v = viewRef.current;
    const x = (clientX - rect.left - v.ox) / v.scale;
    const y = (clientY - rect.top - v.oy) / v.scale;
    return { x, y };
  };

  const pickNodeAt = (wx: number, wy: number): SimNode | null => {
    const nodes = simRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i]!;
      const d = Math.hypot(n.x - wx, n.y - wy);
      const hit = n.r + 10;
      if (d <= hit) return n;
    }
    return null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initSim();
    };

    const step = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const cx = w / 2;
      const cy = h / 2;

      const nodes = simRef.current;
      const links = linksRef.current;
      const v = viewRef.current;
      const dragId = v.draggingNodeId;

      if (nodes.length === 0) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#9ca3af";
        ctx.font = '13px "PingFang SC", system-ui, sans-serif';
        ctx.textAlign = "center";
        ctx.fillText("暂无节点（可切换「全部知识」或检查语料）", w / 2, h / 2);
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const activeFocus = v.hoveredId ?? v.selectedId;
      const hood = focusNeighborhood(activeFocus, links);
      const focusActive = hood !== null;

      const nCnt = nodes.length;
      const repulse = REPULSE * (nCnt > 90 ? 1.25 : nCnt > 45 ? 1.1 : 1);
      const linkIdealScale = nCnt > 90 ? 1.06 : 1;

      for (let k = 0; k < 2; k++) {
        for (const l of links) {
          const a = nodes.find((n) => n.id === l.source);
          const b = nodes.find((n) => n.id === l.target);
          if (!a || !b) continue;
          if (a.id === dragId || b.id === dragId) continue;
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.01;
          const ideal =
            LINK_IDEAL *
            linkIdealScale *
            (0.85 + 0.25 / (l.weight + 0.2));
          const f = ((dist - ideal) / dist) * 0.18 * Math.min(1.2, l.weight + 0.3);
          const fx = dx * f;
          const fy = dy * f;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i]!;
            const b = nodes[j]!;
            if (a.id === dragId || b.id === dragId) continue;
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            const d2 = dx * dx + dy * dy + 4;
            const rep = repulse / d2;
            const d = Math.sqrt(d2);
            dx /= d;
            dy /= d;
            a.vx -= dx * rep;
            a.vy -= dy * rep;
            b.vx += dx * rep;
            b.vy += dy * rep;
          }
        }

        for (const n of nodes) {
          if (n.id === dragId) {
            n.vx = 0;
            n.vy = 0;
            n.x = v.pointerWorldX;
            n.y = v.pointerWorldY;
            continue;
          }
          n.vx += (cx - n.x) * CENTER_PULL;
          n.vy += (cy - n.y) * CENTER_PULL;
          n.x += n.vx;
          n.y += n.vy;
          n.vx *= DAMPING;
          n.vy *= DAMPING;
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      const { ox, oy, scale } = v;
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(scale, scale);

      const invScale = 1 / scale;

      for (const l of links) {
        const a = nodes.find((n) => n.id === l.source);
        const b = nodes.find((n) => n.id === l.target);
        if (!a || !b) continue;

        const highlight =
          !focusActive ||
          (activeFocus && linkTouchesFocus(l, activeFocus));
        ctx.strokeStyle = highlight ? EDGE : EDGE_DIM;
        ctx.lineWidth = highlight ? invScale : invScale * 0.85;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const n of nodes) {
        const inHood = !hood || hood.has(n.id);
        const isHover = v.hoveredId === n.id;
        const isSel = v.selectedId === n.id;

        let fill = NODE;
        if (!inHood && focusActive) fill = NODE_DIM;
        else if (isSel) fill = NODE_SELECTED;
        else if (isHover) fill = NODE_HOVER;

        const r = isSel ? n.r + 1.5 : isHover ? n.r + 0.8 : n.r;

        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const dense = nodes.length > 85;
      const labelPx = (dense ? 9.5 : 11) * invScale;
      const labelPad = (dense ? 10 : 12) * invScale;
      const labelMax = dense ? 8 : 14;
      ctx.font = `${labelPx}px "PingFang SC", "Inter", system-ui, sans-serif`;
      ctx.textAlign = "center";
      for (const n of nodes) {
        const inHood = !hood || hood.has(n.id);
        ctx.fillStyle = focusActive && !inHood ? LABEL_DIM : LABEL;
        const raw =
          n.label.length > labelMax
            ? `${n.label.slice(0, Math.max(2, labelMax - 1))}…`
            : n.label;
        ctx.fillText(raw, n.x, n.y + n.r + labelPad);
      }

      ctx.restore();

      rafRef.current = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initSim, filteredLinks.length, filteredNodes.length, group]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const v = viewRef.current;
      const delta = -e.deltaY * 0.001;
      const next = Math.min(2.2, Math.max(0.35, v.scale * Math.exp(delta)));
      v.scale = next;
    };

    const onPointerMove = (e: PointerEvent) => {
      const v = viewRef.current;
      const { x, y } = screenToWorld(e.clientX, e.clientY);
      v.pointerWorldX = x;
      v.pointerWorldY = y;

      if (v.draggingNodeId) {
        return;
      }
      if (v.panning) {
        v.ox = e.clientX - v.grabX;
        v.oy = e.clientY - v.grabY;
      }

      const hit = pickNodeAt(x, y);
      const nextHover = hit?.id ?? null;
      if (nextHover !== v.hoveredId) {
        v.hoveredId = nextHover;
        wrap.style.cursor = nextHover ? "pointer" : v.panning ? "grabbing" : "grab";
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const v = viewRef.current;
      const { x, y } = screenToWorld(e.clientX, e.clientY);
      v.pointerWorldX = x;
      v.pointerWorldY = y;

      const hit = pickNodeAt(x, y);
      if (hit) {
        v.draggingNodeId = hit.id;
        v.selectedId = hit.id;
        const node = nodesByIdRef.current.get(hit.id) ?? hit;
        onNodeSelect?.(node);
        wrap.style.cursor = "grabbing";
        try {
          wrap.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        return;
      }

      v.selectedId = null;
      onNodeSelect?.(null);
      v.panning = true;
      v.grabX = e.clientX - v.ox;
      v.grabY = e.clientY - v.oy;
      wrap.style.cursor = "grabbing";
      try {
        wrap.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const v = viewRef.current;
      v.panning = false;
      v.draggingNodeId = null;
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const { x, y } = screenToWorld(e.clientX, e.clientY);
      const hit = pickNodeAt(x, y);
      wrap.style.cursor = hit ? "pointer" : "grab";
    };

    const onPointerLeave = (e: PointerEvent) => {
      const v = viewRef.current;
      if (!v.panning && !v.draggingNodeId) {
        v.hoveredId = null;
        wrap.style.cursor = "grab";
      }
    };

    wrap.addEventListener("wheel", onWheel, { passive: false });
    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerup", onPointerUp);
    wrap.addEventListener("pointercancel", onPointerUp);
    wrap.addEventListener("pointerleave", onPointerLeave);

    return () => {
      wrap.removeEventListener("wheel", onWheel);
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerup", onPointerUp);
      wrap.removeEventListener("pointercancel", onPointerUp);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [onNodeSelect]);

  return (
    <div ref={wrapRef} className="kg-canvas-wrap">
      <canvas ref={canvasRef} className="kg-canvas" role="img" aria-label="知识关系图谱" />
      <div className="kg-hint" aria-hidden>
        共 {filteredNodes.length} 篇 · {filteredLinks.length} 条引用链 · 滚轮缩放 ·
        拖空白平移 · 拖节点 · Hover / 点击高亮
      </div>
    </div>
  );
}
