/**
 * 生成 ≥100 篇模拟「文献」Markdown：demo/literature/lit-001 … lit-120
 * 边主要由 [[wikilink]] 构成（簇内环、簇间桥、斜向弱连接）。
 *
 * 运行（在 design.npm/ai-search-app 下）：npm run generate:literature
 * 或直接：node ../demo/scripts/generate-literature-corpus.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** demo/literature（本脚本位于 demo/scripts） */
const OUT_DIR = path.join(__dirname, "..", "literature");

const N = 120;
const CLUSTER = 20;

const TOPICS = [
  "机器学习理论",
  "深度学习应用",
  "计算机视觉",
  "自然语言处理",
  "人机交互与可及性",
  "信息检索与知识工程",
];

function pad(n) {
  return String(n).padStart(3, "0");
}

function intraClusterNext(k) {
  const base = Math.floor((k - 1) / CLUSTER) * CLUSTER + 1;
  const pos = k - base + 1;
  if (pos < CLUSTER) return k + 1;
  return base;
}

function bridge(k) {
  if (k + CLUSTER <= N) return k + CLUSTER;
  const col = ((k - 1) % CLUSTER) + 1;
  return col;
}

function diagonal(k) {
  const t = k + 7;
  return t > N ? t - N : t;
}

for (let k = 1; k <= N; k++) {
  const slug = `lit-${pad(k)}`;
  const topicIdx = Math.floor((k - 1) / CLUSTER);
  const topic = TOPICS[topicIdx] ?? "交叉学科";

  const targets = new Set([
    `lit-${pad(intraClusterNext(k))}`,
    `lit-${pad(k === 1 ? N : k - 1)}`,
    `lit-${pad(k === N ? 1 : k + 1)}`,
    `lit-${pad(bridge(k))}`,
    `lit-${pad(diagonal(k))}`,
  ]);
  targets.delete(slug);

  const linkLine = [...targets].map((t) => `[[${t}]]`).join(" ");

  const title = `${topic} · 文献 ${k}：相关方法与实践综述`;

  const body = `---
name: "${title}"
---

# ${title}

> 模拟文献节点，用于知识库关系图谱结构演示（Obsidian 风格双向链）。

## 摘要

本条目属于主题域「**${topic}**」，与同簇及跨域文献通过显式链接形成网状结构，便于在图谱中观察聚类与桥接。

## 关联文献

核心引用：${linkLine}

## 关键词

${topic}；知识图谱；文献计量；可复现性。

`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), body, "utf8");
}

console.log(`OK: wrote ${N} files under ${OUT_DIR}`);
