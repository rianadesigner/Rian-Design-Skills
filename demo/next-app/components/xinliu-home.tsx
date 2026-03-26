import type { LucideIcon } from "lucide-react"
import {
  Bell,
  BookOpen,
  ChevronRight,
  FileText,
  LayoutGrid,
  Search,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const creations = [
  { title: "简报/摘要", subtitle: "所属知识库名称" },
  {
    title: "这是一个创作名称这是一个名称...",
    subtitle: "所属知识库名称",
  },
  { title: "简报/摘要", subtitle: "所属知识库名称" },
  { title: "简报/摘要", subtitle: "所属知识库名称" },
  { title: "简报/摘要", subtitle: "所属知识库名称" },
]

export function XinliuHome() {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-[1440px] flex-col">
        <header className="flex h-[68px] shrink-0 items-center justify-end border-b border-border/60 px-6 sm:px-[100px]">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-8 rounded-full px-4 text-[13px] font-normal"
          >
            返回旧版
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-6 px-6 py-6 lg:flex-row lg:gap-4 lg:px-[100px] lg:pb-10 lg:pt-8">
          <div className="min-w-0 flex-1 space-y-6 lg:max-w-[984px]">
            <section
              className={cn(
                "rounded-2xl border border-border/60 bg-card p-5 shadow-sm",
                "sm:p-6",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 space-y-1">
                  <h1 className="text-[28px] font-semibold leading-tight tracking-tight sm:text-[32px]">
                    早上好～
                  </h1>
                  <p className="text-sm text-muted-foreground sm:text-[15px]">
                    欢迎来到心流 2.0，让知识随心流动！
                  </p>
                </div>
              </div>
            </section>

            <nav
              aria-label="内容分类"
              className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/30 p-2 sm:flex-row sm:items-center sm:justify-between sm:pr-2"
            >
              <div className="flex flex-wrap gap-2">
                <TabPill active icon={LayoutGrid} label="全部" />
                <TabPill icon={BookOpen} label="我的知识库" />
                <TabPill icon={Sparkles} label="官方精选" />
              </div>
              <Button
                type="button"
                variant="secondary"
                className="h-12 w-full shrink-0 rounded-xl sm:h-12 sm:w-[148px]"
              >
                <Search className="size-5 opacity-70" aria-hidden />
                搜索
              </Button>
            </nav>

            <p className="px-1 text-sm text-muted-foreground">
              主内容区域（设计稿中多为画布/列表，可按产品接入真实数据与路由）。
            </p>
          </div>

          <aside className="w-full shrink-0 lg:w-[340px]">
            <div className="rounded-2xl border border-border/60 bg-card shadow-sm">
              <div className="flex items-center justify-end gap-2 border-b border-border/50 px-5 py-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-lg"
                    aria-label="通知"
                  >
                    <Bell className="size-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-lg"
                    aria-label="更多"
                  >
                    <ChevronRight className="size-5 rotate-90" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center px-5 pb-6 pt-5">
                <div className="mb-3 size-20 overflow-hidden rounded-2xl bg-muted ring-1 ring-border" />
                <p className="text-center text-[15px] font-medium">
                  Karena阿莫
                </p>
              </div>

              <div className="border-t border-border/50 px-5 pb-6">
                <div className="flex items-center justify-between py-4">
                  <h2 className="text-base font-semibold">我的创作</h2>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    全部&gt;
                  </button>
                </div>
                <ul className="space-y-3">
                  {creations.map((item, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-xl border border-transparent bg-muted/40 p-3 text-left transition-colors hover:border-border hover:bg-muted/60"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background ring-1 ring-border">
                          <FileText className="size-5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {item.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function TabPill({
  label,
  icon: Icon,
  active,
}: {
  label: string
  icon: LucideIcon
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-12 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm ring-1 ring-border"
          : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-lg",
          active ? "bg-muted" : "bg-transparent",
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      {label}
    </button>
  )
}
