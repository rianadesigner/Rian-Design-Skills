"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FONT = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
const FONT_EN = "Impact, 'Arial Black', sans-serif";

type CarouselSlide = {
  mode: "首页" | "窗口" | "配置" | "过程" | "交付";
  label: string;
  sourceLabel: string;
  image: string;
  alt: string;
  objectPosition: string;
};

const SLIDES: CarouselSlide[] = [
  {
    mode: "首页",
    label: "用户输入与上传",
    sourceLabel: "首页输入与上传 · FIGMA SOURCE",
    image: "/images/page0/figma-home-input-v2.png",
    alt: "知识库首页用户输入与上传界面",
    objectPosition: "center 48%",
  },
  {
    mode: "窗口",
    label: "多文件窗口预览",
    sourceLabel: "多文件窗口 · FIGMA SOURCE",
    image: "/images/page0/figma-multi-file-window-v2.png",
    alt: "知识库多文件窗口预览界面",
    objectPosition: "center 46%",
  },
  {
    mode: "配置",
    label: "生成配置",
    sourceLabel: "生成配置 · FIGMA SOURCE",
    image: "/images/page0/figma-generation-config.png",
    alt: "知识库生成配置与用户记忆界面",
    objectPosition: "center 48%",
  },
  {
    mode: "过程",
    label: "思考过程",
    sourceLabel: "思考过程 · FIGMA SOURCE",
    image: "/images/page0/figma-thinking-process.webp",
    alt: "知识库图形化思考过程界面",
    objectPosition: "center 48%",
  },
  {
    mode: "交付",
    label: "多格式交付",
    sourceLabel: "多格式交付 · FIGMA SOURCE",
    image: "/images/page0/figma-multi-format-delivery.webp",
    alt: "知识库多格式交付与 PPT 交互预览界面",
    objectPosition: "center 46%",
  },
];

export default function SlidePage0f() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = SLIDES[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % SLIDES.length);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#070707",
        color: "#fff",
        fontFamily: FONT,
      }}
    >
      <style>{`
        @keyframes interactionCarouselIn {
          from { opacity: 0.45; }
          to { opacity: 1; }
        }

        .interaction-carousel-image {
          animation: interactionCarouselIn 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .interaction-carousel-button {
          transition: background 160ms ease-out, border-color 160ms ease-out, transform 160ms ease-out;
        }

        .interaction-carousel-button:hover {
          background: rgba(15,15,15,0.92) !important;
          border-color: rgba(255,255,255,0.38) !important;
          transform: translateY(-50%) scale(1.05);
        }

        @media (prefers-reduced-motion: reduce) {
          .interaction-carousel-image,
          .interaction-carousel-button {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 0% 52%, rgba(181,0,0,0.2), transparent 30%), radial-gradient(ellipse at 100% 44%, rgba(181,0,0,0.18), transparent 28%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.22,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 24%, #000 88%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          width: 1336,
          margin: "0 auto",
          paddingTop: 38,
          boxSizing: "border-box",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: FONT_EN,
              fontSize: 13,
              color: "rgba(200,8,8,0.85)",
              letterSpacing: 2,
            }}
          >
            06
          </span>
          <div
            style={{
              width: 28,
              height: 1,
              flexShrink: 0,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: 3,
            }}
          >
            LLM WIKI 产品形态决策
          </span>
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: "'标小智无界黑', sans-serif",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: "51.92px",
            letterSpacing: "1.5px",
            color: "#ffffff",
          }}
        >
          3.多用户交互形态
        </h1>
        <p
          style={{
            width: 960,
            margin: 0,
            color: "rgba(255,255,255,0.5)",
            fontSize: 14,
            lineHeight: "25.2px",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          用 Agent 降低复杂任务的启动门槛，用编辑器承接高精度创作；两种形态共享同一任务上下文，让提问、执行、编辑与交付连续流转。
        </p>
      </header>

      <main
        aria-label="多用户交互形态截图轮播"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPrevious();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            showNext();
          }
        }}
        style={{
          position: "relative",
          zIndex: 10,
          width: 1080,
          height: 726,
          margin: "18px auto 0",
          overflow: "visible",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 8,
          background: "#0b0b0b",
          boxShadow: "0 30px 80px rgba(0,0,0,0.48)",
          outline: "none",
        }}
      >
        <img
          key={activeSlide.image}
          src={activeSlide.image}
          alt={activeSlide.alt}
          role="button"
          tabIndex={0}
          aria-label={`查看下一张：${SLIDES[(activeIndex + 1) % SLIDES.length].label}`}
          onClick={showNext}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              showNext();
            }
          }}
          draggable={false}
          className="interaction-carousel-image"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: activeSlide.objectPosition,
            borderRadius: 7,
            userSelect: "none",
            cursor: "pointer",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
            minHeight: 32,
            padding: "0 12px",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 999,
            background: "rgba(7,7,7,0.78)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 28px rgba(0,0,0,0.2)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#e52626",
              boxShadow: "0 0 14px rgba(229,38,38,0.8)",
            }}
          />
          <span
            style={{
              color: "#ff5252",
              fontFamily: FONT_EN,
              fontSize: 10,
            }}
          >
            0{activeIndex + 1} · {activeSlide.mode}
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {activeSlide.sourceLabel}
          </span>
        </div>

        <button
          type="button"
          aria-label={`上一张：${SLIDES[(activeIndex - 1 + SLIDES.length) % SLIDES.length].label}`}
          onClick={showPrevious}
          className="interaction-carousel-button"
          style={{
            position: "absolute",
            left: -74,
            top: "50%",
            transform: "translateY(-50%)",
            width: 50,
            height: 50,
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.24)",
            borderRadius: "50%",
            color: "#fff",
            background: "rgba(7,7,7,0.72)",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
          }}
        >
          <ChevronLeft size={26} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          aria-label={`下一张：${SLIDES[(activeIndex + 1) % SLIDES.length].label}`}
          onClick={showNext}
          className="interaction-carousel-button"
          style={{
            position: "absolute",
            right: -74,
            top: "50%",
            transform: "translateY(-50%)",
            width: 50,
            height: 50,
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.24)",
            borderRadius: "50%",
            color: "#fff",
            background: "rgba(7,7,7,0.72)",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
          }}
        >
          <ChevronRight size={26} strokeWidth={1.8} />
        </button>

      </main>
    </div>
  );
}
