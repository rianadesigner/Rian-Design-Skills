"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useResolvedPublicHref } from "@/lib/use-resolved-public-href";
import { normalizeDocumentPath } from "@/lib/pdf-path";

function prefersEmbedInPage(params: URLSearchParams): boolean {
  const raw = params.get("embedded")?.trim().toLowerCase();
  if (raw === "0" || raw === "false" || raw === "off" || raw === "no") {
    return false;
  }
  return true;
}

function buildPreviewHref(
  pathname: string,
  params: URLSearchParams,
  patch: Record<string, string | null>,
): string {
  const next = new URLSearchParams(params.toString());
  for (const [k, v] of Object.entries(patch)) {
    if (v === null) {
      next.delete(k);
    } else {
      next.set(k, v);
    }
  }
  const qs = next.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

type PdfPreviewProps = {
  /** 若传入（例如 `/work/[id]`），优先于查询参数 `?file=` */
  forcedFile?: string;
};

export function PdfPreview({ forcedFile }: PdfPreviewProps = {}) {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  /** 首页用 `/`，作品详情用 `/work/:id`，避免切换嵌入模式时跳离当前条目页 */
  const previewBasePath = pathname.startsWith("/work/") ? pathname : "/";
  const pdfPath = useMemo(() => {
    const trimmed = forcedFile?.trim();
    if (trimmed) {
      return normalizeDocumentPath(trimmed);
    }
    return normalizeDocumentPath(searchParams.get("file"));
  }, [forcedFile, searchParams]);
  const rawPathHref = useMemo(() => `/${pdfPath}`, [pdfPath]);
  const rawUrl = useResolvedPublicHref(rawPathHref);
  /** `#toolbar=` 等对大多数内置 PDF viewer 生效；路径需与 rawUrl（含 file 协议修正）同源。 */
  const pdfViewerUrl = useMemo(() => `${rawUrl}#toolbar=1`, [rawUrl]);

  const embedInPage = useMemo(() => prefersEmbedInPage(searchParams), [searchParams]);

  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!embedInPage) {
      setIframeSrc(null);
      return undefined;
    }
    let cancelled = false;

    const apply = () => {
      if (!cancelled) setIframeSrc(pdfViewerUrl);
    };

    let disposeLoad: (() => void) | undefined;

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(apply, { timeout: 1200 });
      disposeLoad = () => window.cancelIdleCallback(idleId);
    } else {
      const tid = window.setTimeout(apply, 120);
      disposeLoad = () => window.clearTimeout(tid);
    }

    return () => {
      cancelled = true;
      disposeLoad?.();
      setIframeSrc(null);
    };
  }, [embedInPage, pdfViewerUrl]);

  const hrefBrowserOnly = useMemo(
    () => buildPreviewHref(previewBasePath, searchParams, { embedded: "0" }),
    [previewBasePath, searchParams],
  );
  const hrefEmbed = useMemo(
    () => buildPreviewHref(previewBasePath, searchParams, { embedded: null }),
    [previewBasePath, searchParams],
  );

  if (!embedInPage) {
    return (
      <div className="flex min-h-screen flex-col bg-zinc-950">
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-medium text-white">浏览器预览</h1>
            <p className="mt-0.5 truncate text-xs text-zinc-400">
              public/{pdfPath}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/works"
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-zinc-800"
            >
              作品列表
            </Link>
            <Link
              href={hrefEmbed}
              className="rounded-lg border border-emerald-800/70 bg-emerald-950/50 px-3 py-1.5 text-xs text-emerald-100 transition hover:bg-emerald-900/50"
            >
              改用页内嵌入
            </Link>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-md flex-col items-center gap-6 px-6 py-16 text-center">
          <p className="text-sm leading-relaxed text-zinc-300">
            已跳过页内 <code className="text-zinc-400">iframe</code>。
            <span className="block pt-2 text-zinc-500">
              大体积 PDF 在系统阅读器（新标签页全屏）里通常滚动与缩放会更顺滑；若打不开，优先检查是否双击了{" "}
              <code className="text-zinc-400">out/*.html</code>（改用 <code className="text-zinc-400">npm run dev</code>
              / 静态托管）。
            </span>
          </p>
          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-500"
          >
            在新标签打开 PDF
          </a>
          <a
            href={rawUrl}
            download
            className="text-xs text-zinc-500 underline-offset-4 hover:text-zinc-400 hover:underline"
          >
            仅下载文件
          </a>
          <p className="text-[11px] leading-relaxed text-zinc-600">
            书签可保存：<code className="text-zinc-500">{hrefBrowserOnly}</code>
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-medium text-white">PDF 预览</h1>
          <p className="mt-0.5 text-xs text-zinc-400">
            当前：<code className="rounded bg-zinc-800 px-1 py-0.5 text-[11px]">public/{pdfPath}</code>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/works"
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-zinc-800"
          >
            作品列表
          </Link>
          <Link
            href={hrefBrowserOnly}
            className="rounded-lg border border-emerald-700/70 bg-emerald-950/40 px-3 py-1.5 text-xs font-medium text-emerald-100 transition hover:bg-emerald-900/35"
          >
            仅用浏览器预览
          </Link>
          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-zinc-800"
          >
            新标签打开
          </a>
          <a
            href={rawUrl}
            download
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-500"
          >
            下载
          </a>
        </div>
      </header>

      <div className="shrink-0 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
        <p className="text-[11px] leading-relaxed text-amber-200/85">
          若滚动/缩放卡顿：请点<strong className="font-medium">「仅用浏览器预览」</strong>或
          <strong className="font-medium">「新标签打开」</strong>——使用系统自带的 PDF 阅读器通常更流畅。
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
          将 PDF 放进 <code className="text-zinc-400">next-port/public/documents/</code>；切换文件：
          <code className="text-zinc-400">?file=documents/文件名.pdf</code>
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
          若你是<strong className="text-zinc-400">双击打开「out/*.html」</strong>预览：绝对路径会变成磁盘根路径导致打不开，
          <span className="text-emerald-200/85">本站已尝试自动改用相对路径</span>；
          <strong className="text-zinc-400">更推荐</strong>运行 <code className="text-zinc-400">npm run dev</code> 或把整个{" "}
          <code className="text-zinc-400">out/</code> 托管到任一静态站点（同源 URL）。
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-rose-300/85">
          PDF 极大（上百 MB）时浏览器可能几分钟无响应或直接失败，属正常现象；请先压缩分页导出或离线用 Acrobat /
          Preview 打开。
        </p>
      </div>

      <div className="relative min-h-0 flex-1 bg-zinc-900">
        {iframeSrc ? (
          <iframe
            title="PDF preview"
            src={iframeSrc}
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0 bg-zinc-900"
          />
        ) : (
          <div className="flex min-h-[50dvh] items-center justify-center py-16 text-xs text-zinc-500 lg:min-h-0 lg:flex-1">
            正在准备内嵌预览…
          </div>
        )}
      </div>
    </div>
  );
}
