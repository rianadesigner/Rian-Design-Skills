import type { Metadata } from "next";
import Link from "next/link";
import { portfolioEntries, previewHref } from "@/lib/portfolio-entries";

export const metadata: Metadata = {
  title: "作品列表",
  description: "选择 PDF 在浏览器内预览",
};

export default function WorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3 backdrop-blur">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-medium text-white">作品列表</h1>
          <p className="mt-0.5 text-xs text-zinc-400">点击项目在下方预览区打开 PDF</p>
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 transition hover:bg-zinc-800"
          >
            默认预览
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        {portfolioEntries.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">
            还没有条目，请在{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-300">lib/portfolio-entries.ts</code>{" "}
            里添加 PDF。
          </p>
        ) : (
          <ul className="space-y-3">
            {portfolioEntries.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={previewHref(entry)}
                  className="block rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-emerald-800/70 hover:bg-zinc-900"
                >
                  <h2 className="text-base font-medium text-white">{entry.title}</h2>
                  {entry.subtitle ? (
                    <p className="mt-1 text-sm text-zinc-400">{entry.subtitle}</p>
                  ) : null}
                  <p className="mt-2 font-mono text-[11px] text-zinc-500">public/{entry.file}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-center text-[11px] leading-relaxed text-zinc-600">
          新增 PDF：放入 <code className="text-zinc-500">public/documents/</code>，再在{" "}
          <code className="text-zinc-500">portfolio-entries.ts</code> 中追加一项。
        </p>
      </main>
    </div>
  );
}
