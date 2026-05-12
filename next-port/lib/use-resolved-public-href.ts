import { useLayoutEffect, useState } from "react";
import { fileSiteRelativePublicHref } from "@/lib/file-protocol-paths";

/**
 * `/documents/foo.pdf` 在 `npm run dev` / 网站根路径托管下是正常的；
 * 若用「双击打开」导出目录里的 `.html`（`file://`），以 `/` 开头的链接会落到磁盘根目录，
 * 且子目录页面不能使用 `./documents/`，必须按相对于 `out/` 的深度拼 `../`。
 */
export function useResolvedPublicHref(absoluteWithinSitePath: string): string {
  const [href, setHref] = useState(absoluteWithinSitePath);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.protocol !== "file:") {
      setHref(absoluteWithinSitePath);
      return;
    }
    setHref(fileSiteRelativePublicHref(absoluteWithinSitePath));
  }, [absoluteWithinSitePath]);

  return href;
}
