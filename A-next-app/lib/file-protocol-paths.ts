/**
 * 在 `file://` 协议下打开静态导出 HTML 时，`/documents/...` 会指向磁盘根路径。
 * 根据当前页面相对于导出目录 `out/` 的深度，生成指向 `public/` 资源的相对 URL。
 *
 * 使用路径分段查找目录名为 `out` 的段（避免在类似 `next-port/out` 里误用子串匹配）。
 */
export function fileSiteRelativePublicHref(absoluteWithinSitePath: string): string {
  const target = absoluteWithinSitePath.replace(/^\/+/, "");

  if (typeof window === "undefined") {
    return `/${target}`;
  }

  let pathname = window.location.pathname.replace(/\\/g, "/");

  if (/\.html?$/i.test(pathname)) {
    pathname = pathname.replace(/\/[^/]+$/, "") || "/";
  }

  const segments = pathname.split("/").filter(Boolean);
  const outSegmentIdx = segments.lastIndexOf("out");

  if (outSegmentIdx === -1) {
    return `./${target}`;
  }

  const depthUnderOut = segments.length - 1 - outSegmentIdx;
  const prefix = depthUnderOut <= 0 ? "./" : "../".repeat(depthUnderOut);
  return `${prefix}${target}`;
}
