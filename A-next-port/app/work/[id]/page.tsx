import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PdfPreview } from "@/components/pdf-preview";
import { portfolioEntries } from "@/lib/portfolio-entries";

type Props = {
  params: Promise<{ id: string }>;
};

/** 静态导出须预先枚举动态段；新增作品时同步维护 `portfolioEntries` */
export function generateStaticParams() {
  return portfolioEntries.map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const entry = portfolioEntries.find((e) => e.id === id);
  return {
    title: entry ? `${entry.title} · PDF 预览` : "作品预览",
    description: entry?.subtitle ?? undefined,
  };
}

export default async function WorkPdfPage({ params }: Props) {
  const { id } = await params;
  const entry = portfolioEntries.find((e) => e.id === id);
  if (!entry) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-zinc-400">
          正在准备预览…
        </div>
      }
    >
      <PdfPreview forcedFile={entry.file} />
    </Suspense>
  );
}
