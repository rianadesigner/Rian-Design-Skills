/**
 * 从 design-specs 语料构建 Obsidian 风格关系图：节点 = 文档，边 = 相互引用 / 共享词。
 */

export type WikiGroup = "all" | "a" | "b" | "c";

export interface WikiGraphNode {
  id: string;
  label: string;
  group: WikiGroup;
}

export interface WikiGraphLink {
  source: string;
  target: string;
  weight: number;
}

function basename(path: string): string {
  const s = path.split("/").pop() ?? path;
  return s.replace(/\.md$/i, "");
}

/** 从 frontmatter `name:` 或首个 `# 标题` 取展示名 */
export function extractTitle(markdown: string, fallback: string): string {
  const fm = markdown.match(/^---\r?\n[\s\S]*?\r?\n---/);
  if (fm) {
    const nameLine = fm[0].match(/^name:\s*["']?([^"'\n]+)["']?/m);
    if (nameLine?.[1]) return nameLine[1].trim();
  }
  const h1 = markdown.match(/^#\s+(.+)$/m);
  if (h1?.[1]) return h1[1].trim().slice(0, 32);

  return basename(fallback).replace(/-/g, " ").slice(0, 24);
}

function classifyGroup(path: string): WikiGroup {
  const p = path.toLowerCase();
  const lit = path.match(/literature\/lit-(\d+)\.md$/i);
  if (lit) {
    const num = parseInt(lit[1] ?? "0", 10);
    if (num <= 40) return "a";
    if (num <= 80) return "b";
    return "c";
  }
  if (
    p.includes("button") ||
    p.includes("component") ||
    p.includes("组件")
  ) {
    return "a";
  }
  if (
    p.includes("element") ||
    p.includes("token") ||
    p.includes("词元") ||
    p.includes("颜色")
  ) {
    return "b";
  }
  return "c";
}

/** [[wikilink]] */
function extractWikiLinks(text: string): string[] {
  const out = new Set<string>();
  const re = /\[\[([^\]]+)\]\]/gu;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const raw = m[1]?.trim();
    if (raw) out.add(raw);
  }
  return [...out];
}

export function buildKnowledgeGraph(
  corpus: Record<string, string>
): { nodes: WikiGraphNode[]; links: WikiGraphLink[] } {
  const paths = Object.keys(corpus);
  const slugToPath = new Map<string, string>();
  for (const path of paths) {
    slugToPath.set(basename(path).toLowerCase(), path);
  }

  const nodes: WikiGraphNode[] = paths.map((p) => ({
    id: p,
    label: extractTitle(corpus[p] ?? "", p),
    group: classifyGroup(p),
  }));

  const linkKey = (a: string, b: string) =>
    a < b ? `${a}|${b}` : `${b}|${a}`;

  const seen = new Set<string>();
  const links: WikiGraphLink[] = [];

  const addEdge = (a: string, b: string, w: number) => {
    if (a === b) return;
    const k = linkKey(a, b);
    if (seen.has(k)) return;
    seen.add(k);
    links.push({ source: a, target: b, weight: w });
  };

  /** 大图谱下关闭「正文提及文件名」与「共享标题词」弱边，避免糊成一团，仅保留 [[wikilink]] 主结构 */
  const largeCorpus = paths.length >= 50;

  for (const path of paths) {
    const text = corpus[path] ?? "";

    for (const targetTitle of extractWikiLinks(text)) {
      const tp =
        slugToPath.get(targetTitle.toLowerCase()) ||
        [...slugToPath.entries()].find(
          ([slug]) =>
            slug.includes(targetTitle.toLowerCase()) ||
            targetTitle.toLowerCase().includes(slug)
        )?.[1];
      if (tp) addEdge(path, tp, 1.2);
    }

    if (!largeCorpus) {
      const slug = basename(path);
      for (const other of paths) {
        if (other === path) continue;
        const oslug = basename(other);
        const loose = new RegExp(
          `(?:^|[^\\w])${escapeRe(oslug)}(?:$|[^\\w])`,
          "i"
        );
        if (loose.test(text) && oslug.length > 2) {
          addEdge(path, other, 0.6);
        }
      }
    }
  }

  if (!largeCorpus) {
    /** 共享标题关键词（弱边） */
    const wordsByPath = new Map<string, Set<string>>();
    for (const path of paths) {
      const title = extractTitle(corpus[path] ?? "", path);
      const words = new Set(
        title
          .split(/[\s/|·，。]+/u)
          .map((w) => w.trim())
          .filter((w) => w.length >= 2)
      );
      wordsByPath.set(path, words);
    }
    for (let i = 0; i < paths.length; i++) {
      for (let j = i + 1; j < paths.length; j++) {
        const a = paths[i]!;
        const b = paths[j]!;
        let shared = 0;
        for (const w of wordsByPath.get(a) ?? []) {
          if (wordsByPath.get(b)?.has(w)) shared++;
        }
        if (shared >= 2) addEdge(a, b, 0.15 * shared);
      }
    }
  }

  return { nodes, links };
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

export function filterGraphByGroup(
  nodes: WikiGraphNode[],
  links: WikiGraphLink[],
  group: WikiGroup
): { nodes: WikiGraphNode[]; links: WikiGraphLink[] } {
  if (group === "all") return { nodes, links };
  const keep = new Set(
    nodes.filter((n) => n.group === group).map((n) => n.id)
  );
  if (keep.size === 0) return { nodes, links };
  const fnodes = nodes.filter((n) => keep.has(n.id));
  const flinks = links.filter(
    (l) => keep.has(l.source) && keep.has(l.target)
  );
  return { nodes: fnodes, links: flinks };
}
