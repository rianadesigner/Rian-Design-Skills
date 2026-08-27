"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useCallback, useState, type CSSProperties } from "react"
import { Blocks, Clipboard, GitBranch, Upload } from "lucide-react"
import {
  AppleSpotlight,
  type SpotlightShortcut,
} from "@/components/ui/apple-spotlight"
import { getRelatedNodeIds, KNOWLEDGE_NODES } from "./knowledge-graph-data"

const KnowledgeGraphSphere = dynamic(() => import("./knowledge-graph-sphere"), {
  ssr: false,
})

const DISPLAY_FONT = "'标小智无界黑', 'LogoSC Unbounded Sans', sans-serif"
const BODY_FONT = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif"
const NAV_ASSET_BASE = "/images/page08/navigation"
const LIGHT_SPOTLIGHT_TOKENS = {
  "--background": "oklch(1 0 0)",
  "--foreground": "#111111",
  "--primary": "#111111",
  "--primary-foreground": "oklch(1 0 0)",
  "--muted-foreground": "oklch(0.5 0 0)",
  "--border": "oklch(0.9 0 0)",
  "--ring": "oklch(0.55 0 0)",
} as CSSProperties

const SOURCE_SHORTCUTS: SpotlightShortcut[] = [
  {
    label: "上传本地文件",
    link: "#local-file",
    icon: <Upload aria-hidden="true" />,
  },
  {
    label: "粘贴网页或长文本",
    link: "#web-content",
    icon: <Clipboard aria-hidden="true" />,
  },
  {
    label: "连接第三方应用",
    link: "#third-party-app",
    icon: <Blocks aria-hidden="true" />,
  },
  {
    label: "导入 Git 仓库",
    link: "#git-repository",
    icon: <GitBranch aria-hidden="true" />,
  },
]

const COMPILE_STEPS = [
  { index: "01", label: "解析切分", meta: "SOURCE" },
  { index: "02", label: "实体抽取", meta: "ENTITY" },
  { index: "03", label: "关系归并", meta: "RELATION" },
  { index: "04", label: "去重互链", meta: "COMPILE" },
]

const FOLDER_OPTIONS = [
  {
    id: "gaokao",
    label: "高考升学 Wiki",
    summary: "政策 · 院校 · 学科 · 分数线 · 志愿路径",
    files: 24,
    updated: "03.15",
  },
  {
    id: "schools",
    label: "目标院校资料",
    summary: "院校画像 · 招生简章 · 专业组 · 城市信息",
    files: 18,
    updated: "03.12",
  },
  {
    id: "strategy",
    label: "志愿填报案例",
    summary: "位次分析 · 冲稳保组合 · 录取结果 · 复盘",
    files: 31,
    updated: "03.09",
  },
  {
    id: "majors",
    label: "专业选择指南",
    summary: "学科实力 · 培养路径 · 就业方向 · 选科要求",
    files: 16,
    updated: "03.06",
  },
]

function RelationTag({
  children,
  accent = false,
}: {
  children: string
  accent?: boolean
}) {
  return (
    <span
      style={{
        padding: "6px 9px",
        border: accent ? "1px solid rgba(92,92,255,0.22)" : "1px solid #e7e9ec",
        borderRadius: 999,
        color: accent ? "#4e4ee8" : "#5b626d",
        background: accent ? "#f2f2ff" : "#f7f8f9",
        fontSize: 9,
        fontWeight: 500,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  )
}

function WikiSidebar() {
  const iconButtonStyle = {
    width: 34,
    height: 34,
    border: 0,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    cursor: "pointer",
  } as CSSProperties

  return (
    <nav
      aria-label="知识库导航"
      className="absolute flex flex-col items-center"
      onPointerDown={(event) => event.stopPropagation()}
      style={{
        left: 12,
        top: 12,
        bottom: 12,
        zIndex: 40,
        width: 52,
        padding: "12px 9px",
        boxSizing: "border-box",
        borderRadius: 16,
        background: "#ffffff",
      }}
    >
      <button
        type="button"
        aria-label="智能知识库"
        style={{ ...iconButtonStyle, borderRadius: 16 }}
      >
        <Image
          src={`${NAV_ASSET_BASE}/logo.png`}
          alt=""
          width={24}
          height={24}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      </button>

      <div className="mt-3 flex flex-col items-center" style={{ gap: 12 }}>
        <button
          type="button"
          aria-label="当前文件夹"
          aria-current="page"
          style={{
            ...iconButtonStyle,
            background: "#f2f3ff",
          }}
        >
          <Image
            src={`${NAV_ASSET_BASE}/folder-active.svg`}
            alt=""
            width={20}
            height={20}
            unoptimized
          />
        </button>
        {["院校资料", "政策资料"].map((label) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            style={iconButtonStyle}
          >
            <Image
              src={`${NAV_ASSET_BASE}/folder.svg`}
              alt=""
              width={20}
              height={20}
              unoptimized
              style={{ objectFit: "contain" }}
            />
          </button>
        ))}
        <button
          type="button"
          aria-label="新建文件夹"
          style={{
            ...iconButtonStyle,
            borderRadius: 14,
          }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              background: "#f0f0f0",
            }}
          >
            <Image
              src={`${NAV_ASSET_BASE}/plus.svg`}
              alt=""
              width={14}
              height={14}
              unoptimized
            />
          </span>
        </button>
      </div>

      <div className="mt-auto flex flex-col items-center" style={{ gap: 9 }}>
        <button
          type="button"
          aria-label="智能助手"
          style={{ ...iconButtonStyle, height: 31, borderRadius: 14 }}
        >
          <Image
            src={`${NAV_ASSET_BASE}/assistant.png`}
            alt=""
            width={24}
            height={24}
            unoptimized
            style={{ objectFit: "contain" }}
          />
        </button>
        <button
          type="button"
          aria-label="通知"
          className="relative"
          style={{ ...iconButtonStyle, height: 31, borderRadius: 14 }}
        >
          <Image
            src={`${NAV_ASSET_BASE}/bell.svg`}
            alt=""
            width={20}
            height={20}
            unoptimized
            style={{ objectFit: "contain" }}
          />
          <span
            aria-hidden
            className="absolute flex items-center justify-center"
            style={{
              right: 1,
              top: 1,
              width: 12,
              height: 12,
              borderRadius: "50%",
              color: "#ffffff",
              background: "#e52b3f",
              fontSize: 7,
              fontWeight: 700,
            }}
          >
            5
          </span>
        </button>
        <button
          type="button"
          aria-label="设置"
          style={{ ...iconButtonStyle, height: 31, borderRadius: 14 }}
        >
          <Image
            src={`${NAV_ASSET_BASE}/settings.svg`}
            alt=""
            width={20}
            height={20}
            unoptimized
            style={{ objectFit: "contain" }}
          />
        </button>
      </div>
    </nav>
  )
}

export default function SlidePage0e({
  embedded = false,
}: { embedded?: boolean } = {}) {
  const [selectedId, setSelectedId] = useState("framework")
  const [researchQuery, setResearchQuery] = useState("")
  const [folderOpen, setFolderOpen] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState(FOLDER_OPTIONS[0].id)
  const selected =
    KNOWLEDGE_NODES.find((node) => node.id === selectedId) ?? KNOWLEDGE_NODES[0]
  const selectedRelations = Array.from(
    getRelatedNodeIds(selected.id),
    (relatedId) => KNOWLEDGE_NODES.find((node) => node.id === relatedId)?.label
  ).filter((label): label is string => Boolean(label))
  const selectedFolder =
    FOLDER_OPTIONS.find((folder) => folder.id === selectedFolderId) ??
    FOLDER_OPTIONS[0]

  const handleNodeSelect = useCallback((nodeId: string) => {
    const node = KNOWLEDGE_NODES.find((item) => item.id === nodeId)
    setSelectedId(nodeId)
    if (node) {
      setResearchQuery(
        `关于「${node.label}」，我应该重点关注哪些信息，它会如何影响我的升学决策？`
      )
    }
  }, [])

  const handleNodeOpen = useCallback((nodeId: string) => {
    window.sessionStorage.setItem("wiki:selected-node", nodeId)
    window.location.assign("/09")
  }, [])

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: embedded ? "#ffffff" : "#070707",
        color: "#ffffff",
        fontFamily: BODY_FONT,
      }}
    >
      {!embedded && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 0% 55%, rgba(181,0,0,0.2), transparent 26%), radial-gradient(ellipse at 100% 52%, rgba(181,0,0,0.18), transparent 24%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          <header
            className="absolute z-20"
            style={{ left: 54, right: 54, top: 38 }}
          >
            <div className="flex items-center gap-3">
              <span
                style={{
                  color: "#f23a46",
                  fontFamily: "Impact, 'Arial Black', sans-serif",
                  fontSize: 11,
                  letterSpacing: 1.8,
                }}
              >
                05
              </span>
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.38)",
                  fontSize: 10,
                  letterSpacing: 2.4,
                }}
              >
                LLM WIKI · PRODUCT METHOD
              </span>
            </div>
            <div className="mt-2.5 flex items-end justify-between">
              <h1
                style={{
                  margin: 0,
                  fontFamily: DISPLAY_FONT,
                  fontSize: 40,
                  fontWeight: 400,
                  letterSpacing: 0.5,
                  lineHeight: 1.18,
                  color: "#ffffff",
                }}
              >
                2. Wiki图谱编译
              </h1>
              <p
                style={{
                  margin: "0 0 3px",
                  color: "rgba(255,255,255,0.48)",
                  fontSize: 12,
                  lineHeight: 1.7,
                  textAlign: "right",
                }}
              >
                从散落资料到可检索、可互链、可溯源的 Wiki 节点，
                <br />
                图谱是编译后的知识界面，而不是一张静态结果图。
              </p>
            </div>
          </header>
        </>
      )}

      <main
        className="absolute z-20 overflow-hidden"
        style={{
          left: embedded ? 0 : 54,
          right: embedded ? 0 : 54,
          top: embedded ? 0 : 137,
          height: embedded ? 900 : 674,
          borderRadius: embedded ? 0 : 18,
          background: "#ffffff",
          border: embedded ? 0 : "1px solid rgba(255,255,255,0.18)",
          boxShadow: embedded ? "none" : "0 30px 90px rgba(0,0,0,0.5)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #ffffff 0%, #ffffff 70%, #fbfbfc 100%)",
          }}
        />
        <section
          className="absolute overflow-hidden"
          style={{
            left: 0,
            right: embedded ? 378 : 350,
            top: 0,
            height: embedded ? 900 : 674,
            background: "#f8f8f8",
          }}
        >
          <style>{`
            .wiki-graph-flat button {
              font-size: 10px !important;
              padding: 3px 7px 3px 5px !important;
            }
          `}</style>
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: embedded ? 71 : 66,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundImage: "url('/images/page0-landing/bg-grid.svg')",
              backgroundPosition: "center 8%",
              backgroundRepeat: "no-repeat",
              backgroundSize: embedded ? "1180px auto" : "1010px auto",
              opacity: 0.55,
            }}
          />
          <div
            className="wiki-graph-flat absolute overflow-hidden"
            style={{
              left: embedded ? 71 : 66,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            onPointerDown={(event) => event.stopPropagation()}
            onWheel={(event) => event.stopPropagation()}
          >
            <KnowledgeGraphSphere
              selectedId={selectedId}
              onSelect={handleNodeSelect}
              onOpen={handleNodeOpen}
              detailLevel="rich"
              lineIntensity={1}
              ambientIntensity={1}
            />
          </div>
          <WikiSidebar />
          <div
            className="pointer-events-none absolute flex items-center"
            style={{
              left: embedded ? 89 : 82,
              right: embedded ? 18 : 17,
              top: embedded ? 21 : 16,
              zIndex: 30,
              height: 34,
            }}
          >
            <div className="pointer-events-auto relative" style={{ zIndex: 2 }}>
              <button
                type="button"
                aria-expanded={folderOpen}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setFolderOpen((open) => !open)}
                className="flex items-center gap-2"
                style={{
                  padding: "8px 11px",
                  borderRadius: 8,
                  color: "#25282d",
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(229,232,236,0.92)",
                  boxShadow: "0 5px 16px rgba(24,29,37,0.06)",
                  backdropFilter: "blur(8px)",
                  fontSize: 9.5,
                  fontWeight: 650,
                  cursor: "pointer",
                }}
              >
                {selectedFolder.label}
                <span
                  aria-hidden
                  style={{
                    color: "#9298a1",
                    fontSize: 9,
                    transform: folderOpen ? "rotate(180deg)" : "none",
                    transition: "transform 160ms ease",
                  }}
                >
                  ⌄
                </span>
              </button>

              {folderOpen && (
                <div
                  onPointerDown={(event) => event.stopPropagation()}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 40,
                    width: 310,
                    padding: 7,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.98)",
                    border: "1px solid #e5e8ec",
                    boxShadow: "0 18px 42px rgba(25,30,38,0.16)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  {FOLDER_OPTIONS.map((folder) => {
                    const active = folder.id === selectedFolder.id
                    return (
                      <button
                        key={folder.id}
                        type="button"
                        onClick={() => {
                          setSelectedFolderId(folder.id)
                          setFolderOpen(false)
                        }}
                        className="block w-full text-left"
                        style={{
                          padding: "9px 10px",
                          borderRadius: 8,
                          color: "#2b2e33",
                          background: active ? "#f2f2ff" : "transparent",
                          border: 0,
                          cursor: "pointer",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 10, fontWeight: 650 }}>
                            {folder.label}
                          </span>
                          {active && (
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "#5c5cff",
                                boxShadow: "0 0 0 3px rgba(92,92,255,0.12)",
                              }}
                            />
                          )}
                        </div>
                        <div
                          style={{
                            marginTop: 4,
                            color: "#9298a1",
                            fontSize: 8,
                            lineHeight: 1.45,
                          }}
                        >
                          {folder.summary}
                        </div>
                        <div
                          className="mt-1.5 flex items-center gap-2"
                          style={{
                            color: active ? "#5c5cff" : "#a0a5ad",
                            fontSize: 7.5,
                            fontWeight: 550,
                          }}
                        >
                          <span>{folder.files} 个文件</span>
                          <span
                            style={{
                              width: 2,
                              height: 2,
                              borderRadius: "50%",
                              background: "currentColor",
                              opacity: 0.55,
                            }}
                          />
                          <span>{folder.updated} 更新</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div
            data-testid="graph-spotlight"
            className="pointer-events-auto absolute"
            onPointerDown={(event) => event.stopPropagation()}
            style={{
              left: embedded ? 216 : 200,
              bottom: embedded ? 22 : 16,
              zIndex: 41,
              width: embedded ? 659 : 610,
              ...LIGHT_SPOTLIGHT_TOKENS,
            }}
          >
            <AppleSpotlight
              shortcuts={SOURCE_SHORTCUTS}
              placeholder="输入你的研究内容"
              viewTabs={[
                { label: "资料", value: "materials" },
                { label: "图谱", value: "graph" },
              ]}
              defaultView="graph"
              value={researchQuery}
              onValueChange={setResearchQuery}
            />
          </div>
        </section>

        <aside
          className="absolute overflow-hidden"
          style={{
            right: 0,
            top: 0,
            width: embedded ? 378 : 350,
            height: embedded ? 900 : 674,
            padding: embedded ? "23px 23px 20px" : "21px 21px 18px",
            background: "linear-gradient(180deg, #ffffff 0%, #fcfcfd 100%)",
            borderLeft: "1px solid #e7e9ed",
            boxSizing: "border-box",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: -1,
              top: 0,
              width: 2,
              height: 112,
              background:
                "linear-gradient(180deg, rgba(217,35,57,0.75), rgba(217,35,57,0))",
            }}
          />
          <div className="flex items-center justify-between">
            <div>
              <span
                style={{
                  color: "#d92339",
                  fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                }}
              >
                WIKI COMPILER
              </span>
              <h2
                style={{
                  margin: "4px 0 0",
                  color: "#181a1d",
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: -0.3,
                }}
              >
                Wiki 节点编译器
              </h2>
            </div>
            <span
              style={{
                padding: "6px 9px",
                borderRadius: 999,
                color: "#7a818b",
                background: "#f6f7f8",
                border: "1px solid #e6e8eb",
                fontSize: 8,
                fontWeight: 600,
              }}
            >
              {KNOWLEDGE_NODES.length} NODES
            </span>
          </div>

          <p
            style={{
              margin: "7px 0 0",
              color: "#858b94",
              fontSize: 9.5,
              lineHeight: 1.5,
            }}
          >
            将异构资料整理为可追溯、可调用的知识节点
          </p>

          <div style={{ marginTop: 14 }}>
            <div className="flex items-center gap-2">
              <span style={{ color: "#d92339", fontSize: 9, fontWeight: 700 }}>
                01 · 原始资料
              </span>
              <span style={{ height: 1, flex: 1, background: "#eceef1" }} />
              <span style={{ color: "#a0a5ad", fontSize: 8 }}>INPUT</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["政策文件", "院校资料", "分数数据", "备考指南"].map((item) => (
                <RelationTag key={item}>{item}</RelationTag>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="mb-2 flex items-center justify-between">
              <span style={{ color: "#35393f", fontSize: 9, fontWeight: 700 }}>
                02 · 编译流程
              </span>
              <span style={{ color: "#a0a5ad", fontSize: 8 }}>4 STEPS</span>
            </div>
            <div
              style={{
                padding: "7px 10px",
                borderRadius: 10,
                background: "#fafafa",
                border: "1px solid #eceef1",
              }}
            >
              {COMPILE_STEPS.map((step, index) => (
                <div key={step.index}>
                  <div
                    className="flex items-center gap-2.5"
                    style={{ minHeight: 27 }}
                  >
                    <span
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 20,
                        height: 20,
                        color: index === 3 ? "#fff" : "#c72a3b",
                        background: index === 3 ? "#d92339" : "#ffecef",
                        fontSize: 8,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {step.index}
                    </span>
                    <span
                      style={{
                        color: "#34383e",
                        fontSize: 11,
                        fontWeight: index === 3 ? 650 : 500,
                        flex: 1,
                      }}
                    >
                      {step.label}
                    </span>
                    <span
                      style={{
                        color: "#a4a9b1",
                        fontSize: 7,
                        letterSpacing: 0.8,
                      }}
                    >
                      {step.meta}
                    </span>
                  </div>
                  {index < COMPILE_STEPS.length - 1 && (
                    <div
                      style={{
                        marginLeft: 9.5,
                        width: 1,
                        height: 6,
                        background: "#f1bfc6",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid #eceef1",
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ color: "#35393f", fontSize: 9, fontWeight: 700 }}>
                03 · 当前节点
              </span>
              <span style={{ color: "#5c5cff", fontSize: 8, fontWeight: 600 }}>
                WIKI NODE
              </span>
            </div>
            <h2
              style={{
                margin: "7px 0 0",
                color: "#17191c",
                fontFamily: DISPLAY_FONT,
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              {selected.label}
            </h2>
            <p
              style={{
                margin: "6px 0 0",
                color: "#737a84",
                fontSize: 10.5,
                lineHeight: 1.6,
              }}
            >
              {selected.description}
            </p>
          </div>

          <div style={{ marginTop: 11 }}>
            <div style={{ color: "#969ca5", fontSize: 8, letterSpacing: 0.8 }}>
              关联标签 · {selectedRelations.length}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selectedRelations.map((relation) => (
                <RelationTag key={relation} accent>
                  {relation}
                </RelationTag>
              ))}
            </div>
          </div>

          <div
            className="absolute"
            style={{
              left: 21,
              right: 21,
              bottom: 18,
              padding: "10px 11px",
              borderRadius: 9,
              border: "1px solid #f2d8dc",
              background: "linear-gradient(100deg, #fff4f5, #fffafa)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                style={{
                  color: "#c62437",
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                }}
              >
                04 · 编译输出
              </span>
              <span style={{ color: "#b8a0a4", fontSize: 7 }}>OUTPUT</span>
            </div>
            <p
              style={{
                margin: "5px 0 0",
                color: "#4e535b",
                fontSize: 9.5,
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              可检索　可互链　可溯源　可继续调用
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}
