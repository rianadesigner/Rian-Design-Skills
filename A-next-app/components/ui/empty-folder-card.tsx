"use client";

import { motion } from "motion/react";

interface DocumentTag {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  textColor: string;
  rotate: number;
}

const tags: DocumentTag[] = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M4 2h5.172a1 1 0 0 1 .707.293l2.828 2.828A1 1 0 0 1 13 5.828V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M4 2h5.172a1 1 0 0 1 .707.293l2.828 2.828A1 1 0 0 1 13 5.828V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M6 8h4M6 10.5h2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: "研究报告",
    bgColor: "#fffbf0",
    textColor: "#d99921",
    rotate: 15,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 6h6M5 8.5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="11" cy="9" r="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    label: "演示文稿",
    bgColor: "#eefffe",
    textColor: "#158b8c",
    rotate: -15,
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M6 6.5a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-1z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M5.5 12h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: "Happyhorse视频",
    bgColor: "#2c2c2c",
    textColor: "#ffffff",
    rotate: 0,
  },
];

export default function EmptyFolderCard() {
  return (
    <div className="relative h-[156px] w-[210px] rounded-3xl bg-[#f8f8f8] shadow-[0px_4px_4px_rgba(0,0,0,0.08)]">
      {/* Floating document tags */}
      {/* 研究报告 - left side, rotated 15deg */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0, type: "spring", stiffness: 200, damping: 20 }}
        className="absolute -top-px left-0 z-10 flex h-[60px] w-[106px] items-center justify-center"
      >
        <div className="rotate-[15deg]">
          <div
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)]"
            style={{ backgroundColor: tags[0].bgColor }}
          >
            <span style={{ color: tags[0].textColor }}>{tags[0].icon}</span>
            <span className="whitespace-nowrap text-xs font-semibold" style={{ color: tags[0].textColor }}>
              {tags[0].label}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 演示文稿 - right side, rotated -15deg */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
        className="absolute -top-px left-[105px] z-10 flex h-[60px] w-[106px] items-center justify-center"
      >
        <div className="-rotate-[15deg]">
          <div
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)]"
            style={{ backgroundColor: tags[1].bgColor }}
          >
            <span style={{ color: tags[1].textColor }}>{tags[1].icon}</span>
            <span className="whitespace-nowrap text-xs font-semibold" style={{ color: tags[1].textColor }}>
              {tags[1].label}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Happyhorse视频 - top center, no rotation */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
        className="absolute -top-[19px] left-[32px] z-20"
      >
        <div
          className="flex items-center gap-1 rounded-lg px-4 py-1.5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)]"
          style={{ backgroundColor: tags[2].bgColor }}
        >
          <span style={{ color: tags[2].textColor }}>{tags[2].icon}</span>
          <span className="whitespace-nowrap text-xs font-semibold" style={{ color: tags[2].textColor }}>
            {tags[2].label}
          </span>
        </div>
      </motion.div>

      {/* Folder illustration */}
      <div className="absolute left-0 top-[23px] h-[121px] w-[210px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 210 121"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Folder body */}
          <rect x="8" y="16" width="194" height="97" rx="12" fill="white" />
          {/* Folder tab */}
          <path
            d="M20 16C14.4772 16 10 20.4772 10 26V16H52C52 16 52 16 52 16C54 16 55.5 14 57 12C58.5 10 60 8 62 8H20C14.4772 8 10 12.4772 10 18V26C10 20.4772 14.4772 16 20 16Z"
            fill="white"
          />
          {/* Combined folder outline */}
          <path
            d="M10 26V106C10 112.627 15.3726 118 22 118H188C194.627 118 200 112.627 200 106V28C200 21.3726 194.627 16 188 16H57C55 16 53.5 14.5 52 12.5C50.5 10.5 49 8 46 8H22C15.3726 8 10 13.3726 10 20V26Z"
            stroke="#ebebeb"
            strokeWidth="1.5"
            fill="white"
          />
        </svg>
      </div>

      {/* Card content */}
      <div className="absolute bottom-3 left-6">
        <p className="text-base font-semibold text-[#111]">官方推荐</p>
        <p className="mt-1 text-xs text-[#999]">2026-03-15 · 24个来源</p>
      </div>
    </div>
  );
}
