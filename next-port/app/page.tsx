import { Suspense } from "react";
import { PdfPreview } from "@/components/pdf-preview";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-zinc-400">
          正在准备预览…
        </div>
      }
    >
      <PdfPreview />
    </Suspense>
  );
}
