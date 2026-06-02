export type PortfolioEntry = {
  id: string;
  title: string;
  subtitle?: string;
  /** 相对于 `public/`；须落在 `documents/` 下并以 `.pdf` 结尾（与预览安全校验一致） */
  file: string;
};

/**
 * 在此维护作品与 PDF 的对应关系：把 PDF 放进 `public/documents/`，在此处追加一项即可。
 */
export const portfolioEntries: PortfolioEntry[] = [
  {
    id: "portfolio-main",
    title: "作品集",
    subtitle: "完整 PDF（默认预览）",
    file: "documents/portfolio.pdf",
  },
];

/** 每个条目对应独立路径 `/work/:id`（利于收藏与分享）；首页仍可用 `/?file=` */
export function previewHref(entry: Pick<PortfolioEntry, "id">): string {
  return `/work/${encodeURIComponent(entry.id)}`;
}
