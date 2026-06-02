/**
 * 语料在 monorepo 的 design.npm/design-specs（从 src/ 需上溯两级再进 design.npm）。
 */
export function loadCorpus(): Record<string, string> {
  const mods = import.meta.glob<string>("../../design.npm/design-specs/**/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });
  const out: Record<string, string> = {};
  for (const [p, raw] of Object.entries(mods)) {
    const name = p.replace(/^\.\.\/\.\.\/design\.npm\/design-specs\//, "");
    out[name] = raw as unknown as string;
  }
  return out;
}

export type SearchHit = {
  path: string;
  snippets: string[];
  score: number;
};

export function keywordSearch(corpus: Record<string, string>, q: string): SearchHit[] {
  const trimmed = q.trim();
  if (!trimmed) return [];

  const terms = trimmed
    .toLowerCase()
    .split(/\s+/u)
    .filter(Boolean);

  const hits: SearchHit[] = [];

  for (const [path, text] of Object.entries(corpus)) {
    const lower = text.toLowerCase();
    if (!terms.every((t) => lower.includes(t))) continue;

    const snippets: string[] = [];
    const lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length && snippets.length < 5; i++) {
      const line = lines[i] ?? "";
      const ll = line.toLowerCase();
      if (terms.some((t) => ll.includes(t))) {
        snippets.push(line.trim().slice(0, 280));
      }
    }

    hits.push({
      path,
      snippets: snippets.slice(0, 4),
      score: snippets.length + path.length * 0.001,
    });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, 40);
}

export function corpusContext(hits: SearchHit[], corpus: Record<string, string>, maxChars = 12000): string {
  const parts: string[] = [];
  let n = 0;
  for (const h of hits) {
    const body = corpus[h.path];
    if (!body) continue;
    const chunk = `## 文件：${h.path}\n\n${body.slice(0, 4000)}\n`;
    if (n + chunk.length > maxChars) break;
    parts.push(chunk);
    n += chunk.length;
  }
  if (parts.length === 0) {
    const first = Object.keys(corpus).slice(0, 5);
    for (const path of first) {
      parts.push(`## 文件：${path}\n\n${corpus[path]!.slice(0, 2500)}\n`);
    }
  }
  return parts.join("\n---\n");
}
