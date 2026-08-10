"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { Blocks, Clipboard, GitBranch, Upload } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  AppleSpotlight,
  type SpotlightShortcut,
} from "@/components/ui/apple-spotlight";
import {
  PAGE0D_ASSET_BASE,
  preloadPage0dImages,
} from "./slide-page0d-assets";

const P = PAGE0D_ASSET_BASE;
const IMG_DAXUE = `${P}/daxue.png`;
const IMG_JIAOYUBU = `${P}/jiaoyubu.png`;
const IMG_985 = `${P}/985.png`;
const IMG_211 = `${P}/211.png`;
const IMG_ZHIYUAN = `${P}/zhiyuan.png`;
const IMG_HAPPY_HORSE = `${P}/happy-horse.png`;
const IMG_BEIKAO_1 = `${P}/beikao-1.png`;
const IMG_XUKE = `${P}/xuke.png`;
const IMG_PROVINCE = `${P}/province.png`;
const IMG_PROVINCE_TOTAL = `${P}/province-total.png`;
const IMG_NOTION = `${P}/notion.png`;
const IMG_FEISHU = `${P}/feishu.png`;
const IMG_FULL_PAGE = `${P}/knowledge-base-full.png`;
const MAPPING_EASE = [0.22, 1, 0.36, 1] as const;
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
];
const LIGHT_SPOTLIGHT_TOKENS = {
  "--background": "oklch(1 0 0)",
  "--foreground": "#111111",
  "--primary": "#111111",
  "--primary-foreground": "oklch(1 0 0)",
  "--muted-foreground": "oklch(0.5 0 0)",
  "--border": "oklch(0.9 0 0)",
  "--ring": "oklch(0.55 0 0)",
} as CSSProperties;

export function KnowledgeBaseSpotlight() {
  return (
    <div style={{ width: "100%", ...LIGHT_SPOTLIGHT_TOKENS }}>
      <AppleSpotlight
        shortcuts={SOURCE_SHORTCUTS}
        placeholder="输入你的研究内容"
        viewTabs={[
          { label: "资料", value: "materials" },
          { label: "图谱", value: "graph" },
        ]}
        defaultView="materials"
      />
    </div>
  );
}

const PREVIEW_SCREENSHOT_CARDS = [
  { left: 78, top: 72.75 },
  { left: 244.5, top: 72.75 },
  { left: 411.75, top: 72.75 },
  { left: 578.25, top: 72.75 },
  { left: 745.5, top: 72.75 },
  { left: 912.75, top: 72.75 },
  { left: 78, top: 228 },
  { left: 244.5, top: 228 },
  { left: 411.75, top: 228 },
] as const;

// ─── Section header ───────────────────────────────────────────────────────────
function SectionLabel({
  num,
  title,
  count,
}: {
  num: string;
  title: string;
  count: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6.375, width: "100%" }}>
      <span
        style={{
          fontFamily: "Impact, 'Arial Black', sans-serif",
          fontSize: 16,
          color: "rgba(200,8,8,0.85)",
          lineHeight: "normal",
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <div
        style={{
          width: 16,
          height: 0.8,
          background: "rgba(255,255,255,0.2)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'PingFang SC', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          color: "rgba(255,255,255,0.55)",
          lineHeight: "22px",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {title}
      </span>
      <div
        style={{
          flex: "1 0 1px",
          height: 0.8,
          background:
            "linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
          minWidth: 1,
        }}
      />
      <span
        style={{
          fontFamily: "'PingFang SC', sans-serif",
          fontSize: 12,
          color: "rgba(255,255,255,0.75)",
          lineHeight: "20px",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {count}
      </span>
    </div>
  );
}

// ─── File card ────────────────────────────────────────────────────────────────
function FileCard({
  title,
  desc,
  gradient,
  imgSrc,
}: {
  title: string;
  desc: string;
  gradient: string;
  imgSrc: string;
}) {
  return (
    <div
      style={{
        width: 198.5,
        height: 184,
        borderRadius: 12,
        border: "0.5px solid rgba(0,0,0,0.08)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Gradient background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          background: gradient,
          pointerEvents: "none",
        }}
      />
      {/* Content layer */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        {/* Icon image */}
        <div style={{ position: "absolute", left: 3.5, top: 3.5, width: 48, height: 48 }}>
          <img
            alt=""
            src={imgSrc}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
        </div>
        {/* Title + description */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingTop: 12,
            paddingBottom: 20,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <p
            style={{
              fontFamily: "'PingFang SC', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "#111",
              lineHeight: "22px",
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontFamily: "'PingFang SC', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              color: "#666",
              lineHeight: "20px",
              margin: 0,
              height: 40,
              overflow: "hidden",
            }}
          >
            {desc}
          </p>
        </div>
      </div>
      {/* Inner shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          pointerEvents: "none",
          boxShadow:
            "inset 1.5px 1.5px 3px 0px rgba(0,0,0,0.05), inset -1.5px -1.5px 3px 0px rgba(255,255,255,0.5)",
        }}
      />
    </div>
  );
}

function PreviewSupplementCard({
  left,
  title,
  desc,
  gradient,
  imgSrc,
}: {
  left: number;
  title: string;
  desc: string;
  gradient: string;
  imgSrc: string;
}) {
  return (
    <div
      data-preview-supplement={title}
      style={{
        position: "absolute",
        left,
        top: 228,
        zIndex: 2,
        transform: "scale(0.75)",
        transformOrigin: "left top",
      }}
    >
      <FileCard
        title={title}
        desc={desc}
        gradient={gradient}
        imgSrc={imgSrc}
      />
    </div>
  );
}

function PreviewHoverCard({
  left,
  top,
  reducedMotion,
  children,
}: {
  left: number;
  top: number;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, { stiffness: 300, damping: 18 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 300, damping: 18 });

  const handleMove = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      const bounds = cardRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      setGlowPosition({ x: x * 100, y: y * 100 });

      if (!reducedMotion) {
        rotateXTarget.set(-(y - 0.5) * 12);
        rotateYTarget.set((x - 0.5) * 12);
      }
    },
    [reducedMotion, rotateXTarget, rotateYTarget]
  );

  const handleLeave = useCallback(() => {
    setIsHovered(false);
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  }, [rotateXTarget, rotateYTarget]);

  return (
    <div
      ref={cardRef}
      aria-hidden="true"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: "absolute",
        left,
        top,
        zIndex: 5,
        width: 149,
        height: 138,
        perspective: 900,
        cursor: "pointer",
      }}
    >
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.08 }}
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: 11,
          background: "#f8f8f8",
        }}
      />
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered && !reducedMotion ? 1.045 : 1,
          y: isHovered && !reducedMotion ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: 9,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0 16px 30px rgba(15,23,42,0.2), 0 3px 8px rgba(15,23,42,0.1)"
            : "none",
        }}
      >
        {children}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.24) 22%, transparent 52%)`,
            mixBlendMode: "screen",
          }}
        />
        {isHovered && !reducedMotion && (
          <motion.div
            initial={{ x: "-135%" }}
            animate={{ x: "135%" }}
            transition={{ duration: 0.72, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "-20%",
              bottom: "-20%",
              left: "-45%",
              width: "42%",
              pointerEvents: "none",
              transform: "skewX(-16deg)",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.62), transparent)",
              mixBlendMode: "screen",
            }}
          />
        )}
        <motion.div
          initial={false}
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 0 1.2px rgba(255,255,255,0.82), inset 0 1px 0 rgba(255,255,255,0.95)"
              : "inset 0 0 0 0 rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 9,
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </div>
  );
}

function PreviewScreenshotHoverCard({
  left,
  top,
  reducedMotion,
}: {
  left: number;
  top: number;
  reducedMotion: boolean;
}) {
  return (
    <PreviewHoverCard left={left} top={top} reducedMotion={reducedMotion}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${IMG_FULL_PAGE})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "1080px 645px",
          backgroundPosition: `${-left}px ${-top}px`,
        }}
      />
    </PreviewHoverCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SlidePage0d() {
  const [isPreviewingFullPage, setIsPreviewingFullPage] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const motionDuration = prefersReducedMotion ? 0 : 0.72;
  const fadeDuration = prefersReducedMotion ? 0 : 0.24;

  useEffect(() => {
    preloadPage0dImages();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#070707",
        overflow: "hidden",
        fontFamily: "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      }}
      data-testid="knowledge-base-slide"
      role="group"
      tabIndex={0}
      aria-label="知识库资料上传流程，悬停或聚焦可查看完整知识库界面"
      onMouseEnter={() => setIsPreviewingFullPage(true)}
      onMouseLeave={() => setIsPreviewingFullPage(false)}
      onFocus={() => setIsPreviewingFullPage(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPreviewingFullPage(false);
        }
      }}
    >
      {/* Left red glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 83.33% 0 0",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -111.8 -26.833 0 0 500)'><stop stop-color='rgba(200,8,8,0.26)' offset='0'/><stop stop-color='rgba(180,0,0,0.1)' offset='0.45'/><stop stop-color='rgba(0,0,0,0)' offset='0.75'/></radialGradient></defs></svg>")`,
        }}
      />
      {/* Right red glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 0 0 83.33%",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 1000' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0 -111.8 -26.833 0 240 500)'><stop stop-color='rgba(200,8,8,0.26)' offset='0'/><stop stop-color='rgba(180,0,0,0.1)' offset='0.45'/><stop stop-color='rgba(0,0,0,0)' offset='0.75'/></radialGradient></defs></svg>")`,
        }}
      />


      {/* ── Header (Figma: top=184, centered) ────────────── */}
      <motion.div
        initial={false}
        animate={{
          top: isPreviewingFullPage ? 28 : 184,
          scale: isPreviewingFullPage ? 0.88 : 1,
        }}
        transition={{ duration: motionDuration, ease: MAPPING_EASE }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 184,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          whiteSpace: "nowrap",
          zIndex: 30,
          transformOrigin: "center top",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              fontSize: 13,
              color: "rgba(200,8,8,0.85)",
              letterSpacing: 2,
            }}
          >
            04
          </span>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "'PingFang SC', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: 3,
            }}
          >
            LLM WIKI 核心操作动线
          </span>
        </div>
        {/* Main title */}
        <p
          style={{
            fontFamily: "'标小智无界黑', sans-serif",
            fontWeight: 400,
            fontSize: 40,
            color: "#ffffff",
            lineHeight: "47.25px",
            letterSpacing: "1.5px",
            margin: 0,
          }}
        >
          1. 原始资料上传
        </p>
      </motion.div>

      {/* ── Row 1: 01 · 本地上传物料 (6 cards, Figma: top=298) ── */}
      <motion.div
        initial={false}
        animate={
          isPreviewingFullPage
            ? { x: 163, y: -75, scale: 0.75, opacity: 0 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={{
          x: { duration: motionDuration, ease: MAPPING_EASE },
          y: { duration: motionDuration, ease: MAPPING_EASE },
          scale: { duration: motionDuration, ease: MAPPING_EASE },
          opacity: {
            duration: fadeDuration,
            delay: isPreviewingFullPage && !prefersReducedMotion ? 0.42 : 0,
          },
        }}
        style={{
          position: "absolute",
          left: 95,
          top: 298,
          display: "flex",
          flexDirection: "column",
          gap: 7.969,
          zIndex: 22,
          transformOrigin: "left top",
        }}
      >
        <SectionLabel num="01" title="本地上传物料" count="6 个类型" />
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <FileCard
            title="双一流大学介绍"
            desc="本文档系统介绍中国各高校的基本概况、学科建设、师资力量及校园风貌。"
            gradient="linear-gradient(137.09deg, rgb(255, 248, 244) 0%, rgb(255, 190, 179) 100%)"
            imgSrc={IMG_DAXUE}
          />
          <FileCard
            title="教育部公告"
            desc="教育部发布的最新高考政策改革方案及各地实施细则通知。"
            gradient="linear-gradient(137.17deg, rgb(255, 248, 244) 0%, rgb(255, 168, 121) 100%)"
            imgSrc={IMG_JIAOYUBU}
          />
          <FileCard
            title="985工程高校"
            desc="985工程是中国政府在1998年启动的高水平大学建设工程，旨在培育世界一流大学。"
            gradient="linear-gradient(137.17deg, rgb(247, 250, 255) 0%, rgb(183, 208, 255) 100%)"
            imgSrc={IMG_985}
          />
          <FileCard
            title="211工程高校"
            desc="211工程是中国政府于1995年实施的重点支持高等院校建设的项目。"
            gradient="linear-gradient(137.17deg, rgb(255, 255, 255) 0%, rgb(173, 244, 223) 100%)"
            imgSrc={IMG_211}
          />
          <FileCard
            title="志愿报考指南"
            desc="详细记录了2000-2025年各省份学生志愿报告指南及技巧。"
            gradient="linear-gradient(137.17deg, rgb(255, 255, 255) 0%, rgb(183, 246, 195) 100%)"
            imgSrc={IMG_ZHIYUAN}
          />
          {/* Happy Horse promotional card — full-bleed image */}
          <div
            style={{
              width: 198,
              height: 184,
              borderRadius: 12,
              position: "relative",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 12,
                background:
                  "linear-gradient(139.09deg, rgb(255, 255, 255) 1.63%, rgb(255, 231, 143) 98.37%)",
              }}
            />
            <img
              alt="Happy Horse 1.1 重磅升级！火热内测中"
              src={IMG_HAPPY_HORSE}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Rows 2-4 side by side (Figma: top=546) ───────── */}

      {/* 02 · 网页/长文本 (Figma: left=95) */}
      <motion.div
        initial={false}
        animate={
          isPreviewingFullPage
            ? { x: 163, y: -167, scale: 0.75, opacity: 0 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={{
          x: { duration: motionDuration, ease: MAPPING_EASE },
          y: { duration: motionDuration, ease: MAPPING_EASE },
          scale: { duration: motionDuration, ease: MAPPING_EASE },
          opacity: {
            duration: fadeDuration,
            delay: isPreviewingFullPage && !prefersReducedMotion ? 0.42 : 0,
          },
        }}
        style={{
          position: "absolute",
          left: 95,
          top: 546,
          display: "flex",
          flexDirection: "column",
          gap: 7.969,
          zIndex: 22,
          transformOrigin: "left top",
        }}
      >
        <SectionLabel num="02" title="网页/长文本" count="2 个类型" />
        <div style={{ display: "flex", gap: 12 }}>
          <FileCard
            title="备考攻略演示"
            desc="高考备考全流程攻略，包含时间规划、复习策略和心态调节建议。"
            gradient="linear-gradient(137.17deg, rgb(255, 253, 247) 0%, rgb(255, 209, 137) 100%)"
            imgSrc={IMG_BEIKAO_1}
          />
          <FileCard
            title="学科评估笔记"
            desc="个人整理的各高校学科评估结果对比笔记，含A+学科分析。"
            gradient="linear-gradient(137.17deg, rgb(255, 249, 255) 0%, rgb(207, 182, 255) 100%)"
            imgSrc={IMG_XUKE}
          />
        </div>
      </motion.div>

      {/* 03 · 第三方应用 (Figma: left=516, node 1209:7416) */}
      <motion.div
        initial={false}
        animate={
          isPreviewingFullPage
            ? { x: 76, y: -167, scale: 0.75, opacity: 0 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={{
          x: { duration: motionDuration, ease: MAPPING_EASE },
          y: { duration: motionDuration, ease: MAPPING_EASE },
          scale: { duration: motionDuration, ease: MAPPING_EASE },
          opacity: {
            duration: fadeDuration,
            delay: isPreviewingFullPage && !prefersReducedMotion ? 0.42 : 0,
          },
        }}
        style={{
          position: "absolute",
          left: 516,
          top: 546,
          display: "flex",
          flexDirection: "column",
          gap: 7.969,
          zIndex: 22,
          transformOrigin: "left top",
        }}
      >
        <SectionLabel num="03" title="第三方应用" count="2 个类型" />
        <div style={{ display: "flex", gap: 12 }}>
          <FileCard
            title="高校招生简章"
            desc="从 Notion 同步整理的各高校 2025 年招生简章，含专业目录与录取要求。"
            gradient="linear-gradient(137.17deg, rgb(249, 249, 249) 0%, rgb(161, 175, 248) 100%)"
            imgSrc={IMG_NOTION}
          />
          <FileCard
            title="选科搭配策略"
            desc="飞书文档整理的新高考 3+1+2 选科组合分析与各高校专业匹配推荐。"
            gradient="linear-gradient(137.17deg, rgb(255, 255, 255) 0%, rgb(135, 185, 243) 100%)"
            imgSrc={IMG_FEISHU}
          />
        </div>
      </motion.div>

      {/* 04 · Git仓库 (Figma: left=936) */}
      <motion.div
        initial={false}
        animate={
          isPreviewingFullPage
            ? { x: -11, y: -167, scale: 0.75, opacity: 0 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={{
          x: { duration: motionDuration, ease: MAPPING_EASE },
          y: { duration: motionDuration, ease: MAPPING_EASE },
          scale: { duration: motionDuration, ease: MAPPING_EASE },
          opacity: {
            duration: fadeDuration,
            delay: isPreviewingFullPage && !prefersReducedMotion ? 0.42 : 0,
          },
        }}
        style={{
          position: "absolute",
          left: 936,
          top: 546,
          display: "flex",
          flexDirection: "column",
          gap: 7.969,
          zIndex: 22,
          transformOrigin: "left top",
        }}
      >
        <SectionLabel num="04" title="Git仓库" count="2 个类型" />
        <div style={{ display: "flex", gap: 12 }}>
          <FileCard
            title="省份分数线"
            desc="2025年全国各省高考录取分数线汇总，含一本二本分数线对比。"
            gradient="linear-gradient(137.17deg, rgb(255, 255, 255) 0%, rgb(198, 198, 198) 100%)"
            imgSrc={IMG_PROVINCE}
          />
          <FileCard
            title="各省录取分数线汇总"
            desc="2020-2025年全国31省市一本/二本录取分数线，按年份和批次分类整理。"
            gradient="linear-gradient(137.17deg, rgb(255, 255, 255) 0%, rgb(255, 231, 143) 100%)"
            imgSrc={IMG_PROVINCE_TOTAL}
          />
        </div>
      </motion.div>

      {/* The full product screen grows out of the mapped card area while the
          presentation title remains visible above it. */}
      <AnimatePresence initial={false}>
        {isPreviewingFullPage && (
          <motion.div
            key="knowledge-base-full-preview"
            role="region"
            aria-label="完整知识库界面"
            data-testid="knowledge-base-full-preview"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 104,
                    scale: 0.82,
                    clipPath: "inset(8% 4% 44% 4% round 16px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 14px)",
            }}
            exit={{
              opacity: 0,
              y: 54,
              scale: 0.9,
              clipPath: "inset(8% 4% 38% 4% round 16px)",
            }}
            transition={{ duration: motionDuration, ease: MAPPING_EASE }}
            style={{
              position: "absolute",
              left: 180,
              top: 174,
              width: 1080,
              height: 645,
              zIndex: 14,
              overflow: "hidden",
              borderRadius: 14,
              background: "#f8f8f8",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow:
                "0 28px 80px rgba(0,0,0,0.52), 0 0 0 1px rgba(255,255,255,0.06)",
              pointerEvents: "auto",
              transformOrigin: "center top",
            }}
          >
            <img
              src={IMG_FULL_PAGE}
              alt=""
              draggable={false}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                userSelect: "none",
              }}
            />

            {/* The Figma screen has three open slots in row two. Mirror every
                item from the source-material overview into those slots. */}
            <PreviewSupplementCard
              left={579}
              title="高校招生简章"
              desc="从 Notion 同步整理的各高校 2025 年招生简章，含专业目录与录取要求。"
              gradient="linear-gradient(137.17deg, rgb(249, 249, 249) 0%, rgb(161, 175, 248) 100%)"
              imgSrc={IMG_NOTION}
            />
            <PreviewSupplementCard
              left={746}
              title="选科搭配策略"
              desc="飞书文档整理的新高考 3+1+2 选科组合分析与各高校专业匹配推荐。"
              gradient="linear-gradient(137.17deg, rgb(255, 255, 255) 0%, rgb(135, 185, 243) 100%)"
              imgSrc={IMG_FEISHU}
            />
            <div
              data-preview-supplement="Happy Horse"
              style={{
                position: "absolute",
                left: 912,
                top: 228,
                zIndex: 2,
                width: 198,
                height: 184,
                overflow: "hidden",
                borderRadius: 12,
                transform: "scale(0.75)",
                transformOrigin: "left top",
              }}
            >
              <img
                src={IMG_HAPPY_HORSE}
                alt="Happy Horse 1.1 重磅升级"
                draggable={false}
                loading="eager"
                decoding="async"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  userSelect: "none",
                }}
              />
            </div>

            {/* Restore the library card interactions on top of the Figma
                capture: lift, 3D response, pointer glow and a passing sheen. */}
            {PREVIEW_SCREENSHOT_CARDS.map(({ left, top }) => (
              <PreviewScreenshotHoverCard
                key={`${left}-${top}`}
                left={left}
                top={top}
                reducedMotion={Boolean(prefersReducedMotion)}
              />
            ))}
            <PreviewHoverCard
              left={579}
              top={228}
              reducedMotion={Boolean(prefersReducedMotion)}
            >
              <div
                style={{
                  width: 198.5,
                  height: 184,
                  transform: "scale(0.75)",
                  transformOrigin: "left top",
                }}
              >
                <FileCard
                  title="高校招生简章"
                  desc="从 Notion 同步整理的各高校 2025 年招生简章，含专业目录与录取要求。"
                  gradient="linear-gradient(137.17deg, rgb(249, 249, 249) 0%, rgb(161, 175, 248) 100%)"
                  imgSrc={IMG_NOTION}
                />
              </div>
            </PreviewHoverCard>
            <PreviewHoverCard
              left={746}
              top={228}
              reducedMotion={Boolean(prefersReducedMotion)}
            >
              <div
                style={{
                  width: 198.5,
                  height: 184,
                  transform: "scale(0.75)",
                  transformOrigin: "left top",
                }}
              >
                <FileCard
                  title="选科搭配策略"
                  desc="飞书文档整理的新高考 3+1+2 选科组合分析与各高校专业匹配推荐。"
                  gradient="linear-gradient(137.17deg, rgb(255, 255, 255) 0%, rgb(135, 185, 243) 100%)"
                  imgSrc={IMG_FEISHU}
                />
              </div>
            </PreviewHoverCard>
            <PreviewHoverCard
              left={912}
              top={228}
              reducedMotion={Boolean(prefersReducedMotion)}
            >
              <img
                src={IMG_HAPPY_HORSE}
                alt=""
                draggable={false}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </PreviewHoverCard>

            {/* Merge search and import shortcuts into a single Spotlight-style
                control, replacing the two static rows captured in the image. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 255,
                top: 542,
                zIndex: 3,
                width: 630,
                height: 100,
                background: "#f8f8f8",
                pointerEvents: "none",
              }}
            />
            <div
              data-testid="source-spotlight"
              style={{
                position: "absolute",
                left: 270,
                top: 573,
                zIndex: 4,
                width: 600,
                pointerEvents: "auto",
              }}
            >
              <KnowledgeBaseSpotlight />
            </div>

            {/* Hide the static Figma view switcher; its state now lives inside
                the Spotlight input so search context and view stay together. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: 0,
                top: 588,
                zIndex: 3,
                width: 122,
                height: 56,
                background: "#f8f8f8",
                pointerEvents: "none",
              }}
            />

            {!prefersReducedMotion && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.96, 1, 1, 1] }}
                  transition={{
                    duration: 1.05,
                    times: [0, 0.18, 0.72, 1],
                    ease: MAPPING_EASE,
                  }}
                  style={{
                    position: "absolute",
                    left: 78,
                    top: 72,
                    width: 984,
                    height: 294,
                    border: "1.5px solid rgba(239,59,70,0.9)",
                    borderRadius: 10,
                    boxShadow:
                      "0 0 0 4px rgba(239,59,70,0.08), 0 0 26px rgba(239,59,70,0.16)",
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
                  transition={{
                    duration: 1.05,
                    times: [0, 0.18, 0.72, 1],
                    ease: MAPPING_EASE,
                  }}
                  style={{
                    position: "absolute",
                    left: 94,
                    top: 84,
                    padding: "6px 10px",
                    borderRadius: 999,
                    color: "white",
                    background: "rgba(17,17,17,0.82)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  资料类型 01–04 → 知识库资料区
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
