import { useEffect, useState } from "react";

/**
 * `/documents/foo.pdf` 在 `npm run dev` / 正经网站根路径托管下是正常的；
 * 若用「双击打开」`out/index.html`（`file://` 协议），以 `/` 开头的链接会落到磁盘根目录导致打不开。
 * 挂载后若为 file 协议则改为相对路径 `./documents/foo.pdf`。
 */
export function useResolvedPublicHref(absoluteWithinSitePath: string): string {
  const [href, setHref] = useState(absoluteWithinSitePath);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.location.protocol !== "file:" ||
      !absoluteWithinSitePath.startsWith("/")
    ) {
      return;
    }
    setHref(`.${absoluteWithinSitePath}`);
  }, [absoluteWithinSitePath]);

  return href;
}
