const DEFAULT_PATH = "documents/portfolio.pdf";

/**
 * 只允许预览 public/ 下 documents/ 目录内的文件，防止路径穿越。
 */
export function normalizeDocumentPath(raw: string | null): string {
  const trimmed = (raw ?? "").trim();
  const path = trimmed === "" ? DEFAULT_PATH : trimmed.replace(/^\/+/, "");
  if (path.includes("..")) {
    return DEFAULT_PATH;
  }
  if (!path.startsWith("documents/")) {
    return DEFAULT_PATH;
  }
  const base = path.split("/").pop() ?? "";
  if (!base.toLowerCase().endsWith(".pdf")) {
    return DEFAULT_PATH;
  }
  return path;
}
