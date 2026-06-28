"use client";

import { useEffect, useRef } from "react";

/* ── 思维导图内容（Markdown） ── */
const MARKDOWN = `# AI搜·思维导图
## 深度搜索
### 多轮推理
- 问题拆解与规划
- 推理纠偏机制
- Deep Research 能力
### 结果呈现
- 思维导图结构化输出
- 支持多格式下载
## AI 创作
### AI 播客
- GPT 脚本编排
- 火山音色合成
- 工程链路优化
### AI PPT
- 自动化大纲生成
- 模板智能选择
- 一键导出
## 图片格式化
### 图文规范
- 设计模板标准化
- 版式规则落地
### 文本美化
- 工程侧渲染优化
- 排版智能调整
## 搜索能力
### 联网检索
- 实时来源引用
- 宫格场景引导
### 模式选择
- 首页格式选择
- 深度 / 快速 切换`;

/* 分支配色（深色主题） */
const COLORS = ["#8888FF", "#B06CFF", "#5CC8FF", "#5CFFA0", "#FFB95C", "#FF6E9B"];

export default function MarkmapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    let destroyed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mm: any = null;

    const fitToContainer = () => {
      if (destroyed || !mm) return;
      const { width, height } = container.getBoundingClientRect();
      if (width < 16 || height < 16) return;
      void mm.fit(mm.options.maxInitialScale);
    };

    (async () => {
      const { Transformer } = await import("markmap-lib");
      const { Markmap } = await import("markmap-view");
      if (destroyed || !svg) return;

      const transformer = new Transformer();
      const { root } = transformer.transform(MARKDOWN);

      mm = Markmap.create(svg, {
        duration: 0,
        autoFit: true,
        fitRatio: 0.88,
        maxInitialScale: 1.8,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        color: (node: any) => COLORS[(node.depth ?? 0) % COLORS.length],
        maxWidth: 200,
        paddingX: 12,
      });
      await mm.setData(root);
      requestAnimationFrame(() => {
        requestAnimationFrame(fitToContainer);
      });
    })();

    const ro = new ResizeObserver(() => fitToContainer());
    ro.observe(container);

    return () => {
      destroyed = true;
      ro.disconnect();
      mm?.destroy?.();
    };
  }, []);

  return (
    /* markmap-dark 激活暗色 CSS 变量 */
    <div
      ref={containerRef}
      className="markmap-dark"
      style={{ width: "100%", height: "100%", position: "relative", minHeight: 0 }}
    >
      <style>{`
        .markmap-dark .markmap {
          --markmap-text-color: rgba(255,255,255,0.85);
          --markmap-circle-open-bg: #1e1e2e;
          --markmap-code-bg: #2a2a3e;
          --markmap-code-color: #ddd;
          font: 300 13px/18px "Inter", sans-serif;
        }
      `}</style>
      <svg
        ref={svgRef}
        className="markmap"
        style={{ width: "100%", height: "100%", display: "block", background: "transparent" }}
      />
    </div>
  );
}
