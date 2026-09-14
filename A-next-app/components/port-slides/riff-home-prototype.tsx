"use client"

import Image from "next/image"
import {
  Check,
  ChevronRight,
  LoaderCircle,
  Pause,
  Play,
  Search,
  Upload,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"
import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styles from "./riff-home-prototype.module.css"

type Feed = "for-you" | "new"
type Category = "推荐" | "换装" | "运镜" | "风格化"
type Variant = "original" | "result"
type CreateMode = "remix" | "blank" | null

type Material = {
  id: string
  title: string
  description: string
  category: Exclude<Category, "推荐">
  duration: number
  image: string
}

const MATERIALS: Material[] = [
  {
    id: "desert-look",
    title: "沙漠变装",
    description: "换一个新的发型，背景变成沙漠",
    category: "换装",
    duration: 18,
    image: "/images/page27/riff-interactive/red-suit.png",
  },
  {
    id: "snow-hike",
    title: "雪山漫游",
    description: "跟随脚步推进镜头，保留雪山纵深",
    category: "运镜",
    duration: 15,
    image: "/images/page27/riff-interactive/snow.png",
  },
  {
    id: "city-look",
    title: "城市变装",
    description: "把夜景和服装统一成冷调电影质感",
    category: "换装",
    duration: 12,
    image: "/images/page27/riff-interactive/city.png",
  },
  {
    id: "coast-film",
    title: "海边电影感",
    description: "暖色日落、手持镜头和自然群像",
    category: "风格化",
    duration: 14,
    image: "/images/page27/riff-interactive/beach.png",
  },
]

const CATEGORIES: Category[] = ["推荐", "换装", "运镜", "风格化"]

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds))
  return `00:${String(safeSeconds).padStart(2, "0")}`
}

export default function RiffHomePrototype() {
  const [feed, setFeed] = useState<Feed>("for-you")
  const [category, setCategory] = useState<Category>("推荐")
  const [activeId, setActiveId] = useState(MATERIALS[0].id)
  const [variant, setVariant] = useState<Variant>("result")
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(8)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [createMode, setCreateMode] = useState<CreateMode>(null)
  const [selectedFile, setSelectedFile] = useState("")
  const [creating, setCreating] = useState(false)
  const [toast, setToast] = useState("")
  const [announcement, setAnnouncement] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  const createTimerRef = useRef<number | null>(null)

  const active = MATERIALS.find((item) => item.id === activeId) ?? MATERIALS[0]

  const orderedMaterials = useMemo(() => {
    const source = feed === "new" ? [...MATERIALS].reverse() : MATERIALS
    if (category === "推荐") return source
    return source.filter((item) => item.category === category)
  }, [category, feed])

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return MATERIALS
    return MATERIALS.filter((item) =>
      `${item.title}${item.description}${item.category}`
        .toLowerCase()
        .includes(normalized)
    )
  }, [query])

  useEffect(() => {
    if (!isPlaying) return
    const timer = window.setInterval(() => {
      setCurrentTime((time) => {
        if (time + 0.25 >= active.duration) {
          setIsPlaying(false)
          setAnnouncement(`${active.title}播放结束`)
          return active.duration
        }
        return time + 0.25
      })
    }, 250)
    return () => window.clearInterval(timer)
  }, [active.duration, active.title, isPlaying])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(""), 4200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(
    () => () => {
      if (createTimerRef.current) window.clearTimeout(createTimerRef.current)
    },
    []
  )

  const selectMaterial = (material: Material) => {
    setActiveId(material.id)
    setCurrentTime(0)
    setVariant("result")
    setIsPlaying(true)
    setAnnouncement(`已切换至${material.title}，开始静音播放`)
  }

  const togglePlayback = () => {
    if (currentTime >= active.duration) setCurrentTime(0)
    setIsPlaying((playing) => !playing)
  }

  const openSearch = () => {
    setIsPlaying(false)
    setSearchOpen(true)
  }

  const openCreate = (mode: Exclude<CreateMode, null>) => {
    setIsPlaying(false)
    setCreateMode(mode)
    setSelectedFile("")
    setCreating(false)
    setAnnouncement(mode === "remix" ? `已选择${active.title}同款效果` : "从素材开始")
  }

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file.name)
    setAnnouncement(`已选择素材${file.name}`)
  }

  const startCreating = () => {
    if (!selectedFile || creating) return
    setCreating(true)
    setAnnouncement("正在创建项目")
    createTimerRef.current = window.setTimeout(() => {
      setCreating(false)
      setCreateMode(null)
      setToast("项目已创建 · 原型演示")
      setAnnouncement("项目已创建")
    }, 1100)
  }

  return (
    <div
      className={styles.root}
      data-slide-interactive
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        event.stopPropagation()
        if (event.key !== "Escape") return
        if (searchOpen) setSearchOpen(false)
        else if (createMode) setCreateMode(null)
      }}
      onPointerCancel={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
      onTouchEnd={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
      onWheel={(event) => event.stopPropagation()}
    >
      <div className={styles.statusBar} aria-hidden="true">
        <strong>9:41</strong>
        <div className={styles.statusIcons}>
          <span className={styles.signal}>▮▮▮</span>
          <span>⌁</span>
          <span className={styles.battery} />
        </div>
      </div>

      <header className={styles.header}>
        <span className={styles.logo} aria-label="Riff">
          Riff
        </span>
        <div className={styles.feedTabs} aria-label="内容排序" role="tablist">
          <button
            aria-selected={feed === "for-you"}
            className={feed === "for-you" ? styles.tabActive : undefined}
            onClick={() => setFeed("for-you")}
            role="tab"
          >
            为你
          </button>
          <button
            aria-selected={feed === "new"}
            className={feed === "new" ? styles.tabActive : undefined}
            onClick={() => setFeed("new")}
            role="tab"
          >
            新作
          </button>
        </div>
        <div className={styles.headerActions}>
          <button aria-label="搜索灵感" onClick={openSearch} title="搜索灵感">
            <Search aria-hidden size="1em" />
          </button>
          <button
            className={styles.avatar}
            aria-label="个人中心"
            onClick={() => {
              setToast("个人中心 · 原型演示")
              setAnnouncement("已打开个人中心入口")
            }}
            title="个人中心"
          >
            R
          </button>
        </div>
      </header>

      <div className={styles.main}>
        <section className={styles.hero} aria-label={`当前视频：${active.title}`}>
          <Image
            alt=""
            className={`${styles.heroImage} ${variant === "original" ? styles.originalImage : ""}`}
            fill
            priority
            sizes="(max-width: 640px) 92vw, 380px"
            src={active.image}
          />
          <div className={styles.heroShade} />
          <button
            aria-label={isPlaying ? `暂停${active.title}` : `播放${active.title}`}
            className={styles.playSurface}
            onClick={togglePlayback}
          />

          <div className={styles.heroContent}>
            <div className={styles.heroHeading}>
              <div>
                <h2>{active.title}</h2>
                <p>{active.description}</p>
              </div>
              <button className={styles.remixButton} onClick={() => openCreate("remix")}>
                做同款
              </button>
            </div>

            <div className={styles.variantRow} aria-label="原片与成片" role="group">
              <button
                aria-pressed={variant === "original"}
                className={variant === "original" ? styles.variantActive : undefined}
                onClick={() => {
                  setVariant("original")
                  setAnnouncement("已切换至原片")
                }}
              >
                原片
              </button>
              <span className={styles.editSeam} aria-hidden="true">✂</span>
              <button
                aria-pressed={variant === "result"}
                className={variant === "result" ? styles.variantActive : undefined}
                onClick={() => {
                  setVariant("result")
                  setAnnouncement("已切换至成片")
                }}
              >
                成片
              </button>
            </div>

            <div className={styles.playerControls}>
              <button
                aria-label={isPlaying ? "暂停" : "播放"}
                onClick={togglePlayback}
                title={isPlaying ? "暂停" : "播放"}
              >
                {isPlaying ? <Pause aria-hidden size="1em" fill="currentColor" /> : <Play aria-hidden size="1em" fill="currentColor" />}
              </button>
              <span className={styles.time}>
                {formatTime(currentTime)} / {formatTime(active.duration)}
              </span>
              <input
                aria-label={`${active.title}播放进度`}
                max={active.duration}
                min={0}
                onChange={(event) => setCurrentTime(Number(event.target.value))}
                step={0.25}
                type="range"
                value={Math.min(currentTime, active.duration)}
              />
              <button
                aria-label={muted ? "开启声音" : "静音"}
                onClick={() => setMuted((value) => !value)}
                title={muted ? "开启声音" : "静音"}
              >
                {muted ? <VolumeX aria-hidden size="1em" /> : <Volume2 aria-hidden size="1em" />}
              </button>
            </div>
          </div>
        </section>

        <section className={styles.discovery} aria-labelledby="riff-discovery-title">
          <div className={styles.sectionHeading}>
            <h2 id="riff-discovery-title">更多灵感</h2>
            <button onClick={openSearch}>
              查看全部 <ChevronRight aria-hidden size="1em" />
            </button>
          </div>
          <div className={styles.categories} aria-label="灵感分类" role="tablist">
            {CATEGORIES.map((item) => (
              <button
                aria-selected={category === item}
                className={category === item ? styles.categoryActive : undefined}
                key={item}
                onClick={() => setCategory(item)}
                role="tab"
              >
                {item}
              </button>
            ))}
          </div>
          <div className={styles.filmstrip} aria-label={`${category}素材`}>
            {orderedMaterials.map((material) => (
              <button
                aria-label={`播放${material.title}，${material.duration}秒`}
                aria-pressed={active.id === material.id}
                className={`${styles.materialCard} ${active.id === material.id ? styles.materialActive : ""}`}
                key={material.id}
                onClick={() => selectMaterial(material)}
              >
                <Image
                  alt=""
                  fill
                  sizes="120px"
                  src={material.image}
                  style={{ objectFit: "cover" }}
                />
                <span className={styles.cardShade} />
                <span className={styles.cardMeta}>
                  <span>
                    <Play aria-hidden size="0.9em" fill="currentColor" />
                    {formatTime(material.duration)}
                  </span>
                  <strong>{material.title}</strong>
                </span>
                {active.id === material.id && (
                  <span className={styles.nowPlaying}>
                    <span aria-hidden /> 正在播放
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.createDock}>
        <button onClick={() => openCreate("blank")}>
          <span aria-hidden>＋</span> 从素材开始
        </button>
      </div>

      {searchOpen && (
        <section aria-label="搜索灵感" aria-modal="true" className={styles.searchPanel} role="dialog">
          <div className={styles.panelHeader}>
            <strong>搜索灵感</strong>
            <button aria-label="关闭搜索" onClick={() => setSearchOpen(false)}>
              <X aria-hidden size="1em" />
            </button>
          </div>
          <label className={styles.searchField}>
            <Search aria-hidden size="1em" />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索换装、运镜、风格…"
              ref={searchRef}
              type="search"
              value={query}
            />
          </label>
          <div className={styles.searchResults}>
            {searchResults.length ? (
              searchResults.map((material) => (
                <button
                  key={material.id}
                  onClick={() => {
                    selectMaterial(material)
                    setSearchOpen(false)
                  }}
                >
                  <span className={styles.searchThumb}>
                    <Image alt="" fill sizes="72px" src={material.image} style={{ objectFit: "cover" }} />
                  </span>
                  <span>
                    <strong>{material.title}</strong>
                    <small>{material.description}</small>
                  </span>
                  <ChevronRight aria-hidden size="1em" />
                </button>
              ))
            ) : (
              <p className={styles.emptyState}>没有匹配的灵感，试试“换装”或“运镜”。</p>
            )}
          </div>
        </section>
      )}

      {createMode && (
        <div className={styles.sheetBackdrop} onClick={() => setCreateMode(null)}>
          <section
            aria-labelledby="riff-create-title"
            aria-modal="true"
            className={styles.createSheet}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className={styles.sheetHandle} aria-hidden />
            <div className={styles.panelHeader}>
              <div>
                <small>{createMode === "remix" ? "REMIX" : "NEW PROJECT"}</small>
                <strong id="riff-create-title">
                  {createMode === "remix" ? `制作「${active.title}」同款` : "从素材开始"}
                </strong>
              </div>
              <button aria-label="关闭创作面板" onClick={() => setCreateMode(null)}>
                <X aria-hidden size="1em" />
              </button>
            </div>

            {createMode === "remix" && (
              <div className={styles.inheritCard}>
                <span className={styles.inheritThumb}>
                  <Image alt="" fill sizes="80px" src={active.image} style={{ objectFit: "cover" }} />
                </span>
                <span>
                  <small>将继承</small>
                  <strong>{active.title} · 风格与节奏</strong>
                </span>
                <Check aria-hidden size="1em" />
              </div>
            )}

            <label className={styles.uploadButton}>
              <Upload aria-hidden size="1em" />
              <span>{selectedFile || "选择照片或视频"}</span>
              <input accept="image/*,video/*" onChange={handleFile} type="file" />
            </label>
            {!selectedFile && (
              <button className={styles.sampleButton} onClick={() => setSelectedFile("Riff 示例素材.mp4")}>
                使用示例素材体验
              </button>
            )}
            <button
              className={styles.primaryCreateButton}
              disabled={!selectedFile || creating}
              onClick={startCreating}
            >
              {creating ? (
                <>
                  <LoaderCircle aria-hidden className={styles.spinner} size="1em" /> 正在创建项目…
                </>
              ) : (
                "开始制作"
              )}
            </button>
          </section>
        </div>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
      <p aria-live="polite" className={styles.srOnly}>
        {announcement}
      </p>
    </div>
  )
}
