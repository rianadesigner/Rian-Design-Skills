/**
 * 生成 ≥100 篇模拟「文献」Markdown：design-specs/literature/lit-001 … lit-120
 * 边主要由 [[wikilink]] 构成（簇内环、簇间桥、斜向弱连接）。
 *
 * 运行：node scripts/generate-literature-corpus.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "..", "design-specs", "literature");

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

/** 同簇内「下一个」编号（1…120），在簇尾回到簇首 */
function intraClusterNext(k) {
  const base = Math.floor((k - 1) / CLUSTER) * CLUSTER + 1;
  const pos = k - base + 1;
  if (pos < CLUSTER) return k + 1;
  return base;
}

/** 栅格下行桥：k 与 k+20，底部簇回到顶部对齐列 */
function bridge(k) {
  if (k + CLUSTER <= N) return k + CLUSTER;
  const col = ((k - 1) % CLUSTER) + 1;
  return col;
}

/** 斜向弱引用 */
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
