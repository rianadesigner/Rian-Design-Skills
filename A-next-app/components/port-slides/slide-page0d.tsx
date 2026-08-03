"use client";

import { useEffect } from "react";
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SlidePage0d() {
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
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 184,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          whiteSpace: "nowrap",
          zIndex: 10,
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
      </div>

      {/* ── Row 1: 01 · 本地上传物料 (6 cards, Figma: top=298) ── */}
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 298,
          display: "flex",
          flexDirection: "column",
          gap: 7.969,
          zIndex: 10,
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
      </div>

      {/* ── Rows 2-4 side by side (Figma: top=546) ───────── */}

      {/* 02 · 网页/长文本 (Figma: left=95) */}
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 546,
          display: "flex",
          flexDirection: "column",
          gap: 7.969,
          zIndex: 10,
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
      </div>

      {/* 03 · 第三方应用 (Figma: left=516, node 1209:7416) */}
      <div
        style={{
          position: "absolute",
          left: 516,
          top: 546,
          display: "flex",
          flexDirection: "column",
          gap: 7.969,
          zIndex: 10,
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
      </div>

      {/* 04 · Git仓库 (Figma: left=936) */}
      <div
        style={{
          position: "absolute",
          left: 936,
          top: 546,
          display: "flex",
          flexDirection: "column",
          gap: 7.969,
          zIndex: 10,
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
      </div>
    </div>
  );
}
