"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import dynamic from "next/dynamic";

const P0 = "/images/page0";
const PL = "/images/page0-landing";
const KNOWLEDGE_WORKSPACE_BG = "#f8f8f8";
const KnowledgeGraphSphere = dynamic(
  () => import("./knowledge-graph-sphere"),
  { ssr: false, loading: () => null }
);

/* ═══════════════════════════════════════════════════════════════
   Shared Icon Components (inline SVG from Figma exports)
   ═══════════════════════════════════════════════════════════════ */

function IconArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M5.99976 8.3998C5.64976 8.3998 5.29976 8.2648 5.03476 7.9998L1.77477 4.73982C1.62977 4.59482 1.62977 4.35482 1.77477 4.20982C1.91977 4.06482 2.15977 4.06482 2.30477 4.20982L5.56476 7.4698C5.80476 7.7098 6.19476 7.7098 6.43476 7.4698L9.69476 4.20982C9.83976 4.06482 10.0798 4.06482 10.2248 4.20982C10.3698 4.35482 10.3698 4.59482 10.2248 4.73982L6.96476 7.9998C6.69976 8.2648 6.34976 8.3998 5.99976 8.3998Z" fill="#111"/></svg>
  );
}

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.66634 13.9999C11.1641 13.9999 13.9997 11.1644 13.9997 7.66659C13.9997 4.16878 11.1641 1.33325 7.66634 1.33325C4.16853 1.33325 1.33301 4.16878 1.33301 7.66659C1.33301 11.1644 4.16853 13.9999 7.66634 13.9999Z" stroke="#111" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.6663 14.6666L13.333 13.3333" stroke="#111" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

function IconSearchSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.33333 12.6664C10.2789 12.6664 12.6667 10.2786 12.6667 7.33309C12.6667 4.38757 10.2789 1.99976 7.33333 1.99976C4.38781 1.99976 2 4.38757 2 7.33309C2 10.2786 4.38781 12.6664 7.33333 12.6664Z" stroke="#111" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.0005 14.0001L11.1338 11.1334" stroke="#111" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

function IconUpload() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.9587 7.72477C12.1918 7.72487 12.3959 7.92915 12.3962 8.16227V10.8752C12.3962 11.721 11.6667 12.3918 10.7917 12.3918H3.20866C2.33366 12.3918 1.60418 11.721 1.60417 10.8752V8.16227C1.60439 7.92915 1.80853 7.72487 2.04167 7.72477C2.27487 7.72477 2.47895 7.9291 2.47917 8.16227V10.8752C2.47918 11.2252 2.80033 11.5168 3.20866 11.5168H10.7917C11.2 11.5168 11.5211 11.2252 11.5212 10.8752V8.16227C11.5214 7.9291 11.7255 7.72477 11.9587 7.72477ZM6.67936 1.62907C6.85426 1.45432 7.14578 1.45446 7.29167 1.62907L10.5876 4.92497C10.7626 5.09997 10.7626 5.36325 10.5876 5.53825C10.5292 5.65437 10.4129 5.68368 10.2965 5.68376C10.1799 5.68376 10.0628 5.65407 9.97526 5.56657L7.43717 3.00309V8.10465C7.43694 8.33782 7.23288 8.54215 6.99967 8.54215C6.76668 8.54187 6.56338 8.33766 6.56315 8.10465V2.99919L3.99577 5.56657C3.82077 5.74157 3.55846 5.74157 3.38346 5.56657C3.20872 5.39157 3.20855 5.12918 3.38346 4.95426L6.67936 1.62907Z" fill="#111"/></svg>
  );
}

function IconClipboard() {
  return (
    <svg width="14" height="14" viewBox="-1 -0.5 13 14" fill="none"><path d="M3.35413 6.38689H7.43746" stroke="#111" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.35413 8.71892H5.90913" stroke="#111" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.08079 0.437669H4.52079C3.93746 0.437669 3.35413 0.437669 3.35413 1.60434C3.35413 2.771 3.93746 2.771 4.52079 2.771H6.85413C8.02079 2.771 8.02079 2.18767 8.02079 1.60434C8.02079 0.437669 7.43746 0.437669 6.85413 0.437669" stroke="#111" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round"/><path d="M0.4375 5.10178C0.4375 2.44178 1.41167 1.71845 3.35417 1.61345" stroke="#111" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.02083 1.61345C9.96333 1.71845 10.9375 2.43595 10.9375 5.10178V8.60177C10.9375 10.9351 10.3542 12.1018 7.4375 12.1018H3.9375C1.02083 12.1018 0.4375 10.9351 0.4375 8.60177V7.3826" stroke="#111" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

function IconApp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.81445 1.06863C6.93719 0.997317 7.08917 0.997368 7.21191 1.06863L12.0654 3.86942C12.1882 3.94077 12.2646 4.07145 12.2646 4.21414V9.81766C12.2646 9.96028 12.1881 10.0911 12.0654 10.1624L7.21191 12.9651C7.15074 12.9998 7.08142 13.0178 7.01367 13.0179C6.94575 13.0179 6.87579 12.9999 6.81445 12.9651L1.96094 10.1624C1.83823 10.0911 1.7618 9.96027 1.76172 9.81766V4.21414C1.76172 4.07147 1.83822 3.94078 1.96094 3.86942L6.81445 1.06863ZM2.55859 4.44461V9.58817L7.01367 12.1604L11.4688 9.58817V4.44461L7.01367 1.87332L2.55859 4.44461Z" fill="#111"/><path d="M3.69306 5.24283C3.58355 5.43365 3.64826 5.67755 3.83909 5.78707L6.61005 7.38659V10.5508C6.61005 10.7715 6.78759 10.949 7.00827 10.949C7.22895 10.949 7.40649 10.7715 7.40649 10.5508V7.39157L10.1874 5.78541C10.3782 5.6759 10.4429 5.43198 10.3334 5.24118C10.2239 5.05037 9.98 4.98565 9.7892 5.09515L7.01326 6.69798L4.23732 5.09515C4.0465 4.98563 3.80425 5.05201 3.69306 5.24283Z" fill="#111"/></svg>
  );
}

function IconGit() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.5332 1.15C8.94419 1.15033 11.0303 2.82841 11.5479 5.1832L11.6602 5.23105L11.8281 5.31016L11.9961 5.40098L12.1113 5.47031L12.335 5.61875L12.3838 5.65293C12.6047 5.81676 12.8085 6.00284 12.9922 6.20762L13.1582 6.40586L13.25 6.52695L13.3711 6.70371L13.4893 6.90098L13.6074 7.12656L13.6865 7.30137L13.7529 7.46836L13.8223 7.67344L13.8994 7.96055L13.9365 8.1373L13.9688 8.35703L13.9912 8.59141L14 8.84922L13.998 8.97812L13.9863 9.1832L13.958 9.43027L13.9258 9.6168L13.8975 9.74961C13.8553 9.93395 13.7991 10.1148 13.7295 10.2906L13.6553 10.4684L13.5635 10.6607L13.4414 10.8824L13.3027 11.0973L13.1377 11.3189L12.9697 11.5172C12.2635 12.2961 11.2759 12.7614 10.2256 12.8111L10.0332 12.816H3.26758L3.08789 12.8111C1.68884 12.7344 0.494228 11.7744 0.119141 10.4244C-0.255893 9.07429 0.272519 7.63558 1.43164 6.84824C1.09521 3.8083 3.47477 1.15005 6.5332 1.15ZM6.5332 2.08359C4.21401 2.08383 2.33415 3.9636 2.33398 6.28281L2.34082 6.51621L2.35938 6.74473L2.4209 7.30332L1.95703 7.61875C1.31666 8.0526 0.932866 8.77593 0.933594 9.54941C0.933594 10.7384 1.82618 11.7267 2.96387 11.8648L3.11328 11.8785L3.26758 11.8824H10.0107L10.1807 11.8795C11.2342 11.8305 12.1862 11.2354 12.6924 10.3102L12.7393 10.2213L12.8252 10.0377C12.8681 9.93668 12.9049 9.83322 12.9365 9.72812L12.9785 9.57676L13.0156 9.40879L13.043 9.23203L13.0615 9.0416L13.0645 8.94883C13.068 8.84115 13.0665 8.73304 13.0586 8.62559L13.04 8.44687L13.0195 8.31406C12.9626 7.99531 12.8546 7.68752 12.7002 7.40293L12.6123 7.25156L12.5098 7.09824L12.4619 7.03281C12.3313 6.85813 12.1823 6.69727 12.0176 6.5543L11.9043 6.46152L11.7773 6.36777L11.6377 6.275L11.4814 6.1832C10.3605 5.5753 8.97863 5.73295 8.02344 6.57773C8.02344 6.57773 7.60194 6.84164 7.35156 6.50547C7.10561 6.17446 7.44883 5.84219 7.46094 5.83066C8.29822 5.11611 9.40058 4.77841 10.5029 4.91074C9.91787 3.21853 8.32373 2.08364 6.5332 2.08359Z" fill="#111"/></svg>
  );
}

function IconViewGrid() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.25 1.75H2.33333C2.01117 1.75 1.75 2.01117 1.75 2.33333V5.25C1.75 5.57217 2.01117 5.83333 2.33333 5.83333H5.25C5.57217 5.83333 5.83333 5.57217 5.83333 5.25V2.33333C5.83333 2.01117 5.57217 1.75 5.25 1.75Z" stroke="#111" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.6667 1.75H8.75C8.42783 1.75 8.16667 2.01117 8.16667 2.33333V5.25C8.16667 5.57217 8.42783 5.83333 8.75 5.83333H11.6667C11.9888 5.83333 12.25 5.57217 12.25 5.25V2.33333C12.25 2.01117 11.9888 1.75 11.6667 1.75Z" stroke="#111" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.6667 8.16667H8.75C8.42783 8.16667 8.16667 8.42783 8.16667 8.75V11.6667C8.16667 11.9888 8.42783 12.25 8.75 12.25H11.6667C11.9888 12.25 12.25 11.9888 12.25 11.6667V8.75C12.25 8.42783 11.9888 8.16667 11.6667 8.16667Z" stroke="#111" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.25 8.16667H2.33333C2.01117 8.16667 1.75 8.42783 1.75 8.75V11.6667C1.75 11.9888 2.01117 12.25 2.33333 12.25H5.25C5.57217 12.25 5.83333 11.9888 5.83333 11.6667V8.75C5.83333 8.42783 5.57217 8.16667 5.25 8.16667Z" stroke="#111" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

function IconGraph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="2.5" r="1.8" stroke="#111" strokeWidth="1.1"/>
      <circle cx="2.8" cy="11" r="1.8" stroke="#111" strokeWidth="1.1"/>
      <circle cx="11.2" cy="11" r="1.8" stroke="#111" strokeWidth="1.1"/>
      <path d="M5.8 4L3.8 9.2M8.2 4L10.2 9.2" stroke="#111" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="24" height="24" viewBox="-4 -4 24 24" fill="none">
      <path d="M15.6538 7.51182C16.1152 7.57837 16.1152 8.42149 15.6538 8.48804C10.6462 9.21064 9.21064 10.6462 8.48804 15.6538C8.42149 16.1152 7.57837 16.1152 7.51182 15.6538C6.78922 10.6462 5.35367 9.21064 0.346117 8.48804C-0.115372 8.42149 -0.115372 7.57837 0.346117 7.51182C5.35367 6.78922 6.78922 5.35367 7.51182 0.346117C7.57837 -0.115372 8.42149 -0.115372 8.48804 0.346117C9.21064 5.35367 10.6462 6.78922 15.6538 7.51182Z" fill="url(#sparkle_grad)" fillOpacity="0.5"/>
      <defs>
        <linearGradient id="sparkle_grad" x1="-5.21" y1="9.48" x2="9.61" y2="22.26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5C5CFF"/><stop offset="1" stopColor="#AE5CFF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Knowledge Card (Library View)
   ═══════════════════════════════════════════════════════════════ */

type ViewType = "library" | "landing" | "graph" | "agent";

type CardData = { title: string; desc: string; img: string; gradient: string };

const cards: CardData[] = [
  { title: "双一流大学介绍", desc: "本文档系统介绍中国各高校的基本概况、学科建设、师资力量及校园风貌。", img: "card-img-1.webp", gradient: "linear-gradient(137deg, #fff8f4 0%, #ffbeb3 100%)" },
  { title: "985工程高校", desc: "985工程是中国政府在1998年启动的高水平大学建设工程，旨在培育世界一流大学，提升国家的综合实力及国际竞争力。", img: "card-img-2.webp", gradient: "linear-gradient(137deg, #f7faff 0%, #b7d0ff 100%)" },
  { title: "211工程高校", desc: "211工程是中国政府于1995年实施的重点支持高等院校建设的项目，旨在提高大约100所高校的教学质量和研究水平。", img: "card-img-3.webp", gradient: "linear-gradient(137deg, #ffffff 0%, #adf4df 100%)" },
  { title: "备考攻略演示", desc: "高考备考全流程攻略，包含时间规划、复习策略和心态调节建议。", img: "card-img-4.webp", gradient: "linear-gradient(137deg, #fffdf7 0%, #ffd189 100%)" },
  { title: "教育部公告", desc: "教育部发布的最新高考政策改革方案及各地实施细则通知。", img: "card-img-5.webp", gradient: "linear-gradient(137deg, #fff8f4 0%, #ffa879 100%)" },
  { title: "省份分数线", desc: "2025年全国各省高考录取分数线汇总，含一本二本分数线对比。", img: "card-img-6.webp", gradient: "linear-gradient(137deg, #ffffff 0%, #c6c6c6 100%)" },
  { title: "学科评估笔记", desc: "个人整理的各高校学科评估结果对比笔记，含A+学科分析。", img: "card-img-7.webp", gradient: "linear-gradient(137deg, #fff9ff 0%, #cfb6ff 100%)" },
  { title: "志愿报考指南", desc: "详细记录了2000-2025年各省份学生志愿报告指南及技巧", img: "card-img-8.webp", gradient: "linear-gradient(137deg, #ffffff 0%, #b7f6c3 100%)" },
  { title: "各省录取分数线汇总", desc: "2020-2025年全国31省市一本/二本录取分数线，按年份和批次分类整理", img: "card-img-9.webp", gradient: "linear-gradient(137deg, #ffffff 0%, #ffe78f 100%)" },
];

function KnowledgeCard({ title, desc, img, gradient, onClick }: CardData & { onClick?: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 300, damping: 14 });
  const rotateY = useSpring(ry, { stiffness: 300, damping: 14 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(-ny * 26);
    ry.set(nx * 26);
  }, [rx, ry]);

  const onEnter = useCallback(() => setHovered(true), []);

  const onLeave = useCallback(() => {
    setHovered(false);
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return (
    <div style={{ perspective: 1200 }} className={onClick ? "cursor-pointer" : ""} onClick={onClick}>
      <motion.div
        ref={cardRef}
        style={{ height: 184, transformStyle: "preserve-3d", rotateX, rotateY }}
        animate={{ scale: hovered ? 1.06 : 1, y: hovered ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <motion.div
          className="relative h-full overflow-hidden rounded-xl"
          style={{
            boxShadow: "3px 3px 6px 0px rgba(0,0,0,0.08), -2.25px -2.25px 4.5px 0px rgba(255,255,255,0.6)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ background: gradient }} />
          <img  src={`${P0}/${img}`} alt="" className="absolute left-[3.5px] top-[3.5px] size-[48px] object-cover" draggable={false} />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 overflow-hidden px-4 pb-5 pt-3">
            <p className="truncate text-[14px] font-semibold leading-[22px] text-[#111]">{title}</p>
            <p className="line-clamp-2 text-[12px] font-light leading-[20px] text-[#666]">{desc}</p>
          </div>
          {hovered && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.25) 55%, transparent 65%)",
                backgroundSize: "250% 100%",
                animation: "card-shine 0.7s ease-in-out forwards",
                zIndex: 30,
              }}
            />
          )}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-xl"
            animate={{
              boxShadow: hovered
                ? "inset 0 0 0 1.5px rgba(255,255,255,0.35), inset 0 1px 0 rgba(255,255,255,0.6)"
                : "inset 1.5px 1.5px 3px 0px rgba(0,0,0,0.05), inset -1.5px -1.5px 3px 0px rgba(255,255,255,0.5)",
            }}
            transition={{ duration: 0.35 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Feature Card (Landing View) — with decoration layer
   ═══════════════════════════════════════════════════════════════ */

type FeatureCardData = {
  title: string; desc: string; screenshot: string; gradient: string;
  rotation: number; left: string; top: string; zIndex: number;
  decoSrc: string; decoStyle: React.CSSProperties;
  overlay?: string;
  hasColorDodge?: boolean;
};

const featureCards: FeatureCardData[] = [
  {
    title: "海量的学术资料", desc: "3000w+公开论文与自有知识库数据",
    screenshot: "v2-card-academic.png", decoSrc: "deco-academic.svg",
    gradient: "linear-gradient(152deg, #f9b552 0%, #ffd777 50%, #f9b552 100%)",
    overlay: "linear-gradient(170deg, rgba(249,181,82,0.96) 0%, rgba(255,215,119,0.5) 24.7%, rgba(249,181,82,0) 49.4%)",
    rotation: -10, left: "12%", top: "632px", zIndex: 1,
    decoStyle: { position: "absolute", top: "2%", right: "3.47%", bottom: "57.15%", left: "30.63%" },
  },
  {
    title: "多格式文件上传", desc: "文档/图片/视频/表格/git仓库等格式导入",
    screenshot: "v2-card-upload.png", decoSrc: "deco-upload.svg",
    gradient: "linear-gradient(152deg, #408c33 0%, #66b226 50%, #26664d 100%)",
    overlay: "linear-gradient(170deg, rgba(64,140,51,0.95) 0%, rgba(102,178,38,0.5) 22%, rgba(38,102,77,0) 44%)",
    rotation: -5, left: "31%", top: "582px", zIndex: 2,
    decoStyle: { position: "absolute", top: "-19%", right: "-36%", bottom: "67%", left: "57.6%", transform: "rotate(-15.47deg)" },
  },
  {
    title: "Wiki图谱知识编译", desc: "基于LLM Wiki架构构建结构化知识",
    screenshot: "v2-card-wiki.png", decoSrc: "deco-wiki-shape.svg",
    gradient: "linear-gradient(152deg, #2699e5 0%, #33e5d9 47%, #2699e5 100%)",
    overlay: "linear-gradient(179deg, rgba(38,153,229,0.96) 0%, rgba(51,229,217,0.5) 18.2%, rgba(38,153,229,0) 38.6%)",
    rotation: 0, left: "50%", top: "562px", zIndex: 3,
    decoStyle: { position: "absolute", left: 196.5, top: 1.5, width: 160, height: 149 },
  },
  {
    title: "第三方应用集成", desc: "已支持网盘、飞书、钉钉、语雀文档",
    screenshot: "v2-card-apps.png", decoSrc: "deco-apps.svg",
    gradient: "linear-gradient(152deg, #8c59bf 0%, #b273d9 50%, #59338c 100%)",
    overlay: "linear-gradient(165deg, rgba(140,89,191,0.7) 0%, rgba(178,115,217,0.26) 25%, rgba(89,51,140,0) 48%)",
    rotation: 5, left: "69%", top: "582px", zIndex: 2,
    decoStyle: { position: "absolute", left: 189.5, top: -0.5, width: 156, height: 186 },
  },
  {
    title: "多模态结果输出", desc: "视频、图像、报告、脑图等结果生成",
    screenshot: "v2-card-multimodal.png", decoSrc: "deco-multimodal.svg",
    gradient: "linear-gradient(90deg, #0f1117 0%, #0f1117 100%)",
    rotation: 10, left: "88%", top: "632px", zIndex: 1,
    decoStyle: { position: "absolute", top: "-8.25%", right: "-21.56%", bottom: "59%", left: "55.63%" },
    hasColorDodge: true,
  },
];

function FeatureCard({ title, desc, screenshot, gradient, decoSrc, decoStyle, overlay, hasColorDodge, isHovered }: FeatureCardData & { isHovered?: boolean }) {
  return (
    <div
      className="relative h-[400px] w-[320px] overflow-hidden rounded-[18px] border border-white/90"
      style={{
        boxShadow: "3px 3px 6px 0px rgba(0,0,0,0.08), -2.25px -2.25px 4.5px 0px rgba(255,255,255,0.6)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[18px]" style={{ background: gradient }} />
      <img
        src={`${PL}/${screenshot}`}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 size-full object-cover"
        style={{
          transform: isHovered ? "translateY(-4px) scale(1.025)" : "translateY(0) scale(1)",
          transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      />
      {overlay && <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: overlay }} />}
      {hasColorDodge && (
        <div className="pointer-events-none absolute inset-0 z-[1] rounded-[18px]" style={{ mixBlendMode: "color-dodge", background: "linear-gradient(152deg, rgba(89,51,140,0.32) 0%, rgba(178,115,217,0.2) 50%, rgba(89,51,140,0.12) 100%)" }} />
      )}
      <div style={decoStyle} className="pointer-events-none z-[2]">
        <img  src={`${PL}/${decoSrc}`} alt="" className="absolute inset-0 block size-full" style={{ maxWidth: "none" }} draggable={false} />
      </div>
      <p className="absolute left-[23.5px] top-[23.5px] z-[3] whitespace-nowrap text-[22px] font-bold leading-[24px] text-white" style={{ fontFamily: "'Alimama ShuZhiTi VF', 'PingFang SC', sans-serif" }}>{title}</p>
      <p className="absolute left-[23.5px] top-[65.5px] z-[3] w-[272px] text-[12px] leading-[20px] text-[rgba(255,255,255,0.78)]">{desc}</p>
      <div className="pointer-events-none absolute inset-0 z-[4] rounded-[18px]" style={{ boxShadow: "inset 1.5px 1.5px 3px 0px rgba(0,0,0,0.05), inset -1.5px -1.5px 3px 0px rgba(255,255,255,0.5)" }} />
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[18px]"
          style={{
            background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.25) 55%, transparent 65%)",
            backgroundSize: "250% 100%",
            animation: "card-shine 0.7s ease-in-out forwards",
            zIndex: 30,
          }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Navigation Sidebar
   ═══════════════════════════════════════════════════════════════ */

function NavBtn({ src, alt, size, onClick, children }: { src?: string; alt?: string; size?: string; onClick?: () => void; children?: React.ReactNode }) {
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  if (children) {
    return (
      <div
        className={`${size ?? "size-[40px]"} flex cursor-pointer items-center justify-center`}
        onClick={(e) => { stop(e); onClick?.(); }}
        onPointerDown={stop}
      >
        {children}
      </div>
    );
  }
  return (
    <img
      src={src} alt={alt ?? ""} className={`${size ?? "size-[40px]"} cursor-pointer`}
      draggable={false}
      onClick={(e) => { stop(e); onClick?.(); }}
      onPointerDown={stop}
    />
  );
}

function Navigation({ view, onSwitch }: { view: ViewType; onSwitch: (v: ViewType) => void }) {
  const isLanding = view === "landing";
  return (
    <div
      className={`absolute left-4 top-4 z-50 flex flex-col items-center justify-between rounded-2xl px-3 py-4 ${isLanding ? "landing-nav-glass" : ""}`}
      style={{
        width: 64,
        height: "calc(100% - 32px)",
        background: isLanding ? "rgba(255, 255, 255, 0.10)" : "#fff",
        backdropFilter: isLanding ? "blur(24px) saturate(1.8) brightness(1.05)" : undefined,
        WebkitBackdropFilter: isLanding ? "blur(24px) saturate(1.8) brightness(1.05)" : undefined,
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {isLanding ? (
        <>
          <div className="flex w-full flex-col items-center gap-4" style={{ height: 320 }}>
            {/* Avatar */}
            <div className="relative h-[40px] w-full shrink-0 overflow-hidden rounded-2xl">
              <img  src={`${PL}/nav-avatar-landing.png`} alt="" className="absolute left-[8px] top-[6px] size-[24px] object-cover" draggable={false} />
            </div>
            {/* Folder 1 → library */}
            <NavBtn onClick={() => onSwitch("library")}>
              <div className="flex size-[40px] items-center justify-center rounded-lg p-2">
                <img  src={`${PL}/nav-folder-icon.svg`} alt="" className="size-[20px] object-contain" draggable={false} />
              </div>
            </NavBtn>
            {/* Folder 2 → library */}
            <NavBtn onClick={() => onSwitch("library")}>
              <div className="flex size-[40px] items-center justify-center rounded-lg p-2">
                <img  src={`${PL}/nav-folder-icon.svg`} alt="" className="size-[20px] object-contain" draggable={false} />
              </div>
            </NavBtn>
            {/* Folder 3 → library */}
            <NavBtn onClick={() => onSwitch("library")}>
              <div className="flex size-[40px] items-center justify-center rounded-lg p-2">
                <img  src={`${PL}/nav-folder-icon.svg`} alt="" className="size-[20px] object-contain" draggable={false} />
              </div>
            </NavBtn>
            {/* Plus */}
            <NavBtn>
              <div className="flex h-[40px] w-full items-center justify-center rounded-[14px] px-[11px]">
                <div className="flex size-[24px] items-center justify-center rounded-xl bg-[#f0f0f0]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2.33V11.67M2.33 7H11.67" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
            </NavBtn>
          </div>
          <div className="flex w-full flex-col items-center gap-3">
            <NavBtn src={`${P0}/nav-btn-user.png`} size="h-[36px] w-[40px]" />
            <div className="relative flex h-[36px] w-[40px] cursor-pointer items-center justify-center">
              <NavBtn src={`${P0}/nav-btn-bell.png`} size="h-[36px] w-[40px]" />
              <div className="absolute -right-[2px] -top-[2px] flex size-[12px] items-center justify-center rounded-full bg-[#ff2d46]">
                <span className="text-[8px] font-medium leading-none text-white">5</span>
              </div>
            </div>
            <NavBtn src={`${P0}/nav-btn-settings.png`} size="h-[36px] w-[40px]" />
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full flex-col items-center gap-4">
            <NavBtn src={`${P0}/nav-btn-avatar.png`} onClick={() => onSwitch("landing")} />
            {/* Folder1 → landing view */}
            <NavBtn src={`${P0}/nav-btn-folder1.png`} onClick={() => onSwitch("landing")} />
            {/* KB active → stays library */}
            <NavBtn src={`${P0}/nav-btn-kb-active.png`} onClick={() => onSwitch("library")} />
            <NavBtn src={`${P0}/nav-btn-folder2.png`} />
            <NavBtn src={`${P0}/nav-btn-folder3.png`} />
            <NavBtn src={`${P0}/nav-btn-plus.png`} />
          </div>
          <div className="flex w-full flex-col items-center gap-3">
            <NavBtn src={`${P0}/nav-btn-user.png`} size="h-[36px] w-[40px]" />
            <NavBtn src={`${P0}/nav-btn-bell.png`} size="h-[36px] w-[40px]" />
            <NavBtn src={`${P0}/nav-btn-settings.png`} size="h-[36px] w-[40px]" />
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Library View
   ═══════════════════════════════════════════════════════════════ */

function LibraryView({ onSwitchView }: { onSwitchView: (v: "library" | "graph" | "agent") => void }) {
  return (
    <div className="absolute left-[80px] right-0 top-0 bottom-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-[36px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-[#f2f3f5] bg-white px-4 py-2">
            <span className="text-[12px] font-semibold leading-[20px] text-[#111]">高考专辑</span>
            <IconArrowDown />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[12px] leading-[20px] text-[#999]">{"985/211 院校信息、地区分布、分数线    "}</span>
            <span className="rounded bg-[#f2f3ff] px-2 py-0.5 text-[10px] font-medium text-[#5c5cff]">24个文件</span>
            <span className="rounded bg-[#f2f3ff] px-2 py-0.5 text-[10px] font-medium text-[#5c5cff]">03.15 更新</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center rounded-full border border-[#f2f3f5] bg-white p-[10px]">
            <IconSearch />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-6 gap-6 px-6 pt-[36px]" style={{ gridTemplateRows: "repeat(2, 184px)" }}>
        {cards.map((card) => <KnowledgeCard key={card.title} {...card} onClick={() => onSwitchView("agent")} />)}
      </div>

      {/* Bottom Area */}
      <div className="absolute bottom-[16px] left-0 right-0 flex flex-col items-center gap-3">
        {/* Action Chips */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
            <IconUpload /><span className="text-[12px] font-semibold leading-[20px] text-[#111]">文件上传</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
            <IconClipboard /><span className="text-[12px] font-medium leading-[20px] text-[#111]">链接/长文本</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
            <IconApp /><span className="text-[12px] font-medium leading-[20px] text-[#111]">第三方应用</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
            <IconGit /><span className="text-[12px] font-medium leading-[20px] text-[#111]">Git仓库</span>
          </div>
        </div>
        {/* Search Bar (centered) */}
        <div className="flex w-[644px] items-center justify-between rounded-full bg-white px-4 py-3" style={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)" }}>
          <span className="text-[14px] leading-[22px] text-[rgba(17,17,17,0.5)]">请输入你的研究内容</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold leading-[18px] text-[#666]">无可选来源</span>
            <div className="flex size-8 items-center justify-center rounded-full bg-[#f0f0f0]">
              <IconSearchSmall />
            </div>
          </div>
        </div>
        {/* View Toggle (right-0) */}
        <div className="absolute bottom-0 right-0 flex items-center rounded-l-full bg-[#f0f0f0] px-1 py-1">
          <div className="flex items-center gap-1 rounded-full bg-white px-4 py-2 shadow-[0px_1px_3px_rgba(0,0,0,0.08)]">
            <IconViewGrid /><span className="text-[14px] leading-[22px] text-[#111]">资料</span>
          </div>
          <div className="flex cursor-pointer items-center px-4 py-2" onClick={() => onSwitchView("graph")}>
            <span className="text-[14px] leading-[22px] text-[#111]">图谱</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Landing View
   ═══════════════════════════════════════════════════════════════ */

const landingFeatures = [
  {
    number: "01",
    title: "海量的学术资料",
    description: "3000w+公开论文与自有知识数据",
    tint: "#fff1d3",
    orb: "#ff781f",
  },
  {
    number: "02",
    title: "多格式文件上传",
    description: "文档 / 图片 / 视频 / 表格 / Git 仓库",
    tint: "#e1f4e5",
    orb: "#25ae63",
  },
  {
    number: "03",
    title: "Wiki图谱知识编译",
    description: "基于 LLM Wiki 架构构建结构化知识",
    tint: "#e1f1ff",
    orb: "#238ee8",
  },
  {
    number: "04",
    title: "第三方应用集成",
    description: "已支持钉钉、飞书、语雀文档",
    tint: "#eee4ff",
    orb: "#8247f5",
  },
  {
    number: "05",
    title: "多模态结果输出",
    description: "视频、图像、报告、脑图等结果生成",
    tint: "#e5e9ff",
    orb: "#273fc1",
  },
] as const;

function LandingFeatureCard({
  feature,
  onClick,
}: {
  feature: (typeof landingFeatures)[number];
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
      className="group relative h-[170px] w-[244px] overflow-hidden rounded-[18px] border border-[#e5e6ec] bg-white text-left outline-none focus-visible:ring-2 focus-visible:ring-[#7d79ff] focus-visible:ring-offset-2"
      style={{ boxShadow: "0 10px 30px rgba(35, 36, 52, 0.075)" }}
    >
      <span
        aria-hidden
        className="absolute left-[18px] top-[18px] size-[56px] overflow-hidden rounded-[15px]"
        style={{ background: feature.tint }}
      >
        <span
          className="absolute left-[10px] top-[9px] size-7 rounded-full opacity-30 transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{ background: feature.orb }}
        />
        <span
          className="absolute left-[22px] top-[18px] size-[25px] rounded-full opacity-55 transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ background: feature.orb }}
        />
        <span
          className="absolute left-[13px] top-[27px] size-6 rounded-full transition-transform duration-300 group-hover:-translate-y-1"
          style={{
            background: feature.orb,
            boxShadow: "0 5px 12px color-mix(in srgb, var(--orb-shadow, #202030) 18%, transparent)",
          }}
        />
      </span>

      <span className="absolute left-[88px] top-[18px] text-[12px] font-medium tracking-[1.1px] text-[#9496a5]">
        {feature.number}
      </span>
      <span className="absolute left-[88px] top-[42px] text-[16px] font-bold leading-6 text-[#141419]">
        {feature.title}
      </span>
      <span className="absolute left-[18px] top-[104px] w-[208px] text-[13px] leading-[21px] text-[#757781]">
        {feature.description}
      </span>
    </motion.button>
  );
}

function LandingView({ onNavigate, tall = false }: { onNavigate?: () => void; tall?: boolean }) {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden rounded-[34px]"
      style={{ backgroundColor: KNOWLEDGE_WORKSPACE_BG }}
    >
      <style>{`
        .landing-knowledge-sphere button {
          font-size: 10px !important;
          padding: 3px 7px 3px 5px !important;
          color: #5f6671 !important;
          border-color: rgba(174, 180, 192, 0.72) !important;
          background: rgba(255, 255, 255, 0.88) !important;
          box-shadow: 0 5px 16px rgba(44, 45, 68, 0.065) !important;
        }
      `}</style>

      <img
        src={`${PL}/bg-grid.svg`}
        alt=""
        className="pointer-events-none absolute left-0 top-0 z-0 w-[1344px] opacity-55"
        style={{ height: tall ? 860 : 770 }}
        draggable={false}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 h-[680px]"
        style={{
          background:
            "radial-gradient(ellipse 34% 34% at 50% 45%, rgba(152,145,255,0.09), transparent 70%), radial-gradient(ellipse 22% 28% at 29% 43%, rgba(112,210,255,0.065), transparent 72%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[560px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(190,196,211,0.28) 0%, rgba(216,220,231,0.16) 36%, rgba(239,240,245,0.06) 72%, transparent 100%)",
        }}
      />

      <div
        className="landing-knowledge-sphere absolute left-[120px] right-[120px] z-[1] opacity-[0.82]"
        style={{
          top: tall ? -82 : -104,
          height: tall ? 760 : 716,
          maskImage:
            "radial-gradient(ellipse 63% 58% at 50% 50%, black 34%, rgba(0,0,0,.78) 64%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 63% 58% at 50% 50%, black 34%, rgba(0,0,0,.78) 64%, transparent 100%)",
        }}
      >
        <KnowledgeGraphSphere
          selectedId=""
          interactionMode="scroll"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 z-[2] h-[440px] w-[720px] -translate-x-1/2"
        style={{
          top: tall ? 104 : 92,
          background:
            "radial-gradient(ellipse at center, rgba(248,248,248,.99) 0%, rgba(248,248,248,.95) 34%, rgba(248,248,248,.7) 55%, transparent 76%)",
        }}
      />

      <main
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{ transform: tall ? "translateY(-40px)" : undefined }}
      >
        <h1
          className="absolute left-1/2 w-[640px] -translate-x-1/2 bg-clip-text text-center text-[60px] font-bold leading-[72px] tracking-[1.8px] text-transparent"
          style={{
            top: tall ? 236 : 222,
            fontFamily: "'Alimama ShuZhiTi VF', 'PingFang SC', sans-serif",
            backgroundImage: "linear-gradient(173deg, #171a25 0%, #353d75 71%)",
          }}
        >
          你的专属AI知识库
        </h1>
        <p
          className="absolute left-1/2 w-[520px] -translate-x-1/2 text-center text-[16px] leading-6 text-[#5f616c]"
          style={{ top: tall ? 338 : 322 }}
        >
          上传文件、编译结构化知识、连接第三方应用，
          <br />
          并生成视频、报告与脑图。
        </p>

        <motion.button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate?.();
          }}
          whileHover={{
            backgroundColor: "#111111",
            color: "#ffffff",
            boxShadow:
              "0 10px 24px rgba(17,17,17,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.24, ease: [0.22, 0.7, 0.25, 1] }}
          className="knowledge-cta pointer-events-auto absolute left-1/2 flex h-[66px] w-[310px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-0 text-[17px] font-medium tracking-[0.1px] text-[#262833] outline-none focus-visible:ring-2 focus-visible:ring-[#7d79ff] focus-visible:ring-offset-2"
          style={{
            top: tall ? 422 : 410,
            backgroundColor: "#ffffff",
            boxShadow:
              "0 2px 8px rgba(35,38,55,0.04), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(215,217,225,0.35)",
          }}
        >
          <span
            aria-hidden
            className="knowledge-cta-shine pointer-events-none absolute -bottom-3 -top-3 left-0 w-[24%]"
            style={{
              transform: "translateX(-190%) skewX(-18deg)",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 22%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.2) 78%, transparent 100%)",
              filter: "blur(0.5px)",
            }}
          />
          <span className="relative z-10">创建您的首个知识库</span>
        </motion.button>
      </main>
    </div>
  );
}

function LandingViewLegacy({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[34px]">
      {/* Grid background */}
      <img  src={`${PL}/bg-grid.svg`} alt="" className="absolute left-0 top-0 h-[770px] w-[1344px] pointer-events-none" draggable={false} />

      {/* Side glow right */}
      <div className="absolute left-[calc(75%+60px)] top-[264px] h-[148px] w-[174px] pointer-events-none">
        <img  src={`${PL}/side-glow-right.svg`} alt="" className="absolute block" style={{ inset: "-50% -42.53%", maxWidth: "none", width: "185%", height: "200%" }} draggable={false} />
      </div>

      {/* Glow pink left */}
      <div className="absolute left-[calc(16.67%+11.36px)] top-[130px] h-[88px] w-[112px] pointer-events-none">
        <img  src={`${PL}/glow-pink.svg`} alt="" className="absolute block" style={{ inset: "-136.36% -107.14%", maxWidth: "none", width: "314%", height: "373%" }} draggable={false} />
      </div>

      {/* Subtitle */}
      <div className="absolute left-[calc(50%-40px)] top-[378px] -translate-x-1/2 whitespace-nowrap text-center text-[16px] leading-[24px] text-[#737380]">
        <p className="mb-0">上传文件、编译结构化知识、连接第三方应用，</p>
        <p>并生成视频、报告与脑图。</p>
      </div>

      {/* Video card large (left, -15°) */}
      <div className="absolute left-[7.72%] top-[32.8%] flex h-[192.52px] w-[266.76px] items-center justify-center">
        <div className="-rotate-[15deg]">
          <div className="relative h-[135px] w-[240px] overflow-hidden rounded-2xl" style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.06)" }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              <img  src={`${PL}/video-bg-large.webp`} alt="" className="absolute" style={{ height: "153.68%", left: "-26.5%", top: "-20.24%", width: "161.35%", maxWidth: "none" }} draggable={false} />
            </div>
            <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0.02) 55%, rgba(0,0,0,0))" }} />
            <div className="absolute left-[16.38px] top-[12.02px] flex items-center overflow-clip rounded bg-[rgba(0,0,0,0.06)] px-1 py-0.5">
              <span className="whitespace-nowrap text-[9px] font-medium text-[#999]">03:02</span>
            </div>
            <div className="absolute left-[96px] top-[44px] size-[48px]">
              <img  src={`${PL}/play-btn.svg`} alt="" className="absolute inset-0 block size-full" style={{ maxWidth: "none" }} draggable={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Video label (left, -15°) */}
      <div className="absolute left-[10.29%] top-[45.84%] flex h-[106.55px] w-[243.73px] items-center justify-center">
        <div className="-rotate-[15deg]">
          <div className="flex w-[240px] items-center justify-center px-5 py-3" style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", background: "rgba(255,255,255,0.01)" }}>
            <span className="whitespace-nowrap text-[14px] font-semibold leading-[22px] text-[#111]">Happy-Notes Skill</span>
          </div>
        </div>
      </div>

      {/* Article card (top-left, -10°) */}
      <div className="absolute left-[6.25%] top-[4.8%] flex h-[152.91px] w-[217.8px] items-center justify-center">
        <div className="-rotate-10">
          <div className="relative flex w-[200px] flex-col items-start justify-between overflow-clip rounded-[13.19px] bg-white px-4 py-3" style={{ height: 120 }}>
            <div className="flex w-full items-start gap-1.5">
              <img  src={`${PL}/article-avatar.png`} alt="" className="size-[24px] shrink-0 rounded-sm object-cover" draggable={false} />
              <div className="flex-1">
                <p className="text-[14px] leading-[22px] text-[#222]">
                  <span>首个Al知识学习平台接入&quot;</span>
                  <span>HappyHorse&quot;</span>
                </p>
              </div>
            </div>
            <p className="w-full text-right text-[10px] font-semibold leading-[18px] text-[#af52de]">
              — 心流 AI，您的专属私人知识库
            </p>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit]" style={{ boxShadow: "inset 1.413px 1.413px 2.826px 0px rgba(0,0,0,0.05), inset -1.413px -1.413px 2.826px 0px rgba(255,255,255,0.5)" }} />
          </div>
        </div>
      </div>

      {/* CTA glow */}
      <div className="absolute left-[calc(16.67%+9.33px)] top-[462px] h-[73px] w-[84px] pointer-events-none">
        <div className="absolute" style={{ inset: "-60.27% -52.38%" }}>
          <img  src={`${PL}/cta-glow.svg`} alt="" className="block size-full" style={{ maxWidth: "none" }} draggable={false} />
        </div>
      </div>

      {/* Premium ring/star decoration (standalone) */}
      <div className="absolute left-[calc(50%-48px)] top-[273px] flex h-[66px] w-[64px] items-center justify-center pointer-events-none">
        <div className="rotate-[15deg]">
          <img  src={`${PL}/premium-ring.svg`} alt="" className="block h-[55px] w-[52px]" style={{ maxWidth: "none" }} draggable={false} />
        </div>
      </div>

      {/* Hero title */}
      <p
        className="absolute left-[calc(50%-40px)] top-[282px] -translate-x-1/2 w-[560px] text-center text-[60px] tracking-[1.8px]"
        style={{
          fontFamily: "'Alimama ShuZhiTi VF', 'PingFang SC', sans-serif",
          fontWeight: 700,
          background: "linear-gradient(173deg, #171a25 0%, #353d75 71%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: "normal",
        }}
      >
        你的专属AI知识库
      </p>

      {/* CTA dashes (flipped) */}
      <div className="absolute left-[calc(50%-40px)] top-[497px] flex h-[46px] w-[812px] items-center justify-center pointer-events-none" style={{ transform: "translateX(-50%) scaleY(-1)" }}>
        <div className="relative h-[46px] w-[812px]">
          <div className="absolute" style={{ inset: "8.7% 0 0 66.69%" }}>
            <img  src={`${PL}/cta-dash-right.svg`} alt="" className="absolute block" style={{ inset: "-4.17% -0.74% -8.93% -0.74%", maxWidth: "none", width: "101.48%", height: "113.1%" }} draggable={false} />
          </div>
          <div className="absolute flex items-center justify-center" style={{ inset: "8.7% 66.56% 0 0" }}>
            <div className="size-full" style={{ transform: "scaleX(-1)" }}>
              <img  src={`${PL}/cta-dash-left.svg`} alt="" className="absolute block" style={{ inset: "-4.17% -0.74% -8.93% -0.74%", maxWidth: "none", width: "101.48%", height: "113.1%" }} draggable={false} />
            </div>
          </div>
          <div className="absolute rounded-[23px] bg-[#e0e0e0]" style={{ inset: "0 85.1% 82.61% 13.92%", boxShadow: "0px 2px 2px 0px rgba(189,189,189,0.14)" }} />
          <div className="absolute rounded-[23px] bg-[#e0e0e0]" style={{ inset: "0 13.42% 82.61% 85.1%", boxShadow: "0px 2px 2px 0px rgba(189,189,189,0.14)" }} />
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate?.(); }}
        className="absolute left-[calc(50%-48px)] top-[468px] flex -translate-x-1/2 items-center gap-2.5 rounded-full border-2 border-white px-[42px] py-[18px]"
        style={{
          background: "linear-gradient(129deg, rgba(255,255,255,0.05) 7%, rgba(255,255,255,0) 98%)",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          backdropFilter: "blur(12px) saturate(1.4)",
          WebkitBackdropFilter: "blur(12px) saturate(1.4)",
        }}
      >
        <IconSparkle />
        <span className="text-[18px] leading-[26px] text-[#111]">创建你的第一个知识库</span>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Graph View (Knowledge Graph / 知识图谱)
   ═══════════════════════════════════════════════════════════════ */

const graphNodes = [
  { label: "升学决策框架", x: 605, y: 99 },
  { label: "院校画像", x: 245, y: 177 },
  { label: "高校层级体系", x: 965, y: 156 },
  { label: "政策依据", x: 605, y: 377 },
  { label: "备考行动路径", x: 125, y: 437 },
  { label: "分数线体系", x: 1103, y: 398 },
  { label: "学科专业实力", x: 265, y: 657 },
  { label: "志愿填报策略", x: 645, y: 639 },
  { label: "录取匹配关系", x: 1005, y: 617 },
];

const graphEdges = [
  { from: 0, to: 1, curve: 30 },
  { from: 0, to: 2, curve: -30 },
  { from: 0, to: 3, curve: 0 },
  { from: 1, to: 3, curve: 40 },
  { from: 1, to: 4, curve: 25 },
  { from: 2, to: 3, curve: -40 },
  { from: 2, to: 5, curve: -25 },
  { from: 3, to: 4, curve: -30 },
  { from: 3, to: 5, curve: 30 },
  { from: 3, to: 7, curve: 0 },
  { from: 4, to: 6, curve: 25 },
  { from: 5, to: 8, curve: -25 },
  { from: 6, to: 7, curve: 25 },
  { from: 7, to: 8, curve: 25 },
];

const graphLabels = [
  { text: "院校信息", from: 0, to: 1 },
  { text: "层级定位", from: 0, to: 2 },
  { text: "政策约束", from: 0, to: 3 },
  { text: "分数依据", from: 2, to: 5 },
  { text: "考纲指导", from: 3, to: 4 },
  { text: "专业选择", from: 4, to: 6 },
  { text: "规则约束", from: 3, to: 7 },
  { text: "匹配判断", from: 7, to: 8 },
];

function seededUnit(index: number, salt: number) {
  const x = Math.sin((index + 1) * 999 + salt * 37) * 10000;
  return x - Math.floor(x);
}

const graphDrift = graphNodes.map((_, index) => ({
  px: seededUnit(index, 1) * Math.PI * 2,
  py: seededUnit(index, 2) * Math.PI * 2,
  fx: 0.3 + seededUnit(index, 3) * 0.4,
  fy: 0.25 + seededUnit(index, 4) * 0.35,
  ax: 6 + seededUnit(index, 5) * 10,
  ay: 5 + seededUnit(index, 6) * 8,
}));

const GW = 1311;
const GH = 800;

function edgePath(x1: number, y1: number, x2: number, y2: number, curve: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return `M${x1},${y1} Q${mx + nx * curve},${my + ny * curve} ${x2},${y2}`;
}

function GraphView({ onSwitchView }: { onSwitchView: (v: "library" | "graph" | "agent") => void }) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [positions, setPositions] = useState(() => graphNodes.map(n => ({ x: n.x, y: n.y })));
  const [cam, setCam] = useState({ x: 0, y: 0, scale: 1 });
  const switchRef = useRef(onSwitchView);

  const posRef = useRef(positions);
  const camRef = useRef(cam);

  useEffect(() => {
    switchRef.current = onSwitchView;
  }, [onSwitchView]);

  useEffect(() => {
    posRef.current = positions;
  }, [positions]);

  useEffect(() => {
    camRef.current = cam;
  }, [cam]);

  const dragRef = useRef<{
    type: "node" | "pan";
    idx?: number;
    sx: number; sy: number;
    spx?: number; spy?: number;
    scx: number; scy: number;
    moved: boolean;
  } | null>(null);

  const graphAreaRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);
  const anchorsRef = useRef(graphNodes.map(n => ({ x: n.x, y: n.y })));
  const driftRef = useRef(graphDrift);

  useEffect(() => {
    const tick = (now: number) => {
      if (!dragRef.current) {
        const t = now * 0.001;
        const a = anchorsRef.current;
        const d = driftRef.current;
        const next = a.map((anchor, i) => ({
          x: anchor.x + Math.sin(t * d[i].fx + d[i].px) * d[i].ax,
          y: anchor.y + Math.sin(t * d[i].fy + d[i].py) * d[i].ay,
        }));
        posRef.current = next;
        setPositions(next);
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.sx;
      const dy = e.clientY - d.sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true;
      if (d.type === "pan") {
        setCam(prev => ({ ...prev, x: d.scx + dx, y: d.scy + dy }));
      } else if (d.type === "node" && d.idx != null) {
        const scale = camRef.current.scale;
        const next = [...posRef.current];
        next[d.idx] = { x: d.spx! + dx / scale, y: d.spy! + dy / scale };
        posRef.current = next;
        setPositions(next);
      }
    };
    const onUp = () => {
      const d = dragRef.current;
      if (!d) return;
      if (!d.moved) {
        if (d.type === "node" && d.idx != null) {
          switchRef.current("agent");
        }
      } else if (d.type === "node" && d.idx != null) {
        anchorsRef.current[d.idx] = { ...posRef.current[d.idx] };
      }
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useEffect(() => {
    const el = graphAreaRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      const factor = e.deltaY > 0 ? 0.93 : 1.07;
      setCam(prev => {
        const ns = Math.max(0.3, Math.min(3, prev.scale * factor));
        const r = ns / prev.scale;
        return { scale: ns, x: mx - (mx - prev.x) * r, y: my - (my - prev.y) * r };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onBgDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-gnode]")) return;
    dragRef.current = {
      type: "pan", sx: e.clientX, sy: e.clientY,
      scx: cam.x, scy: cam.y, moved: false,
    };
  };

  const onNodeDown = (e: React.PointerEvent, idx: number) => {
    e.stopPropagation();
    dragRef.current = {
      type: "node", idx,
      sx: e.clientX, sy: e.clientY,
      spx: positions[idx].x, spy: positions[idx].y,
      scx: cam.x, scy: cam.y, moved: false,
    };
  };

  const connectedNodes = new Set<number>();
  const connectedEdgeKeys = new Set<string>();
  if (hoveredNode !== null) {
    connectedNodes.add(hoveredNode);
    for (const e of graphEdges) {
      if (e.from === hoveredNode || e.to === hoveredNode) {
        connectedNodes.add(e.from);
        connectedNodes.add(e.to);
        connectedEdgeKeys.add(`${e.from}-${e.to}`);
      }
    }
  }
  const hasHighlight = hoveredNode !== null;

  return (
    <div className="absolute left-[80px] right-0 top-0 bottom-0 overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-[36px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-[#f2f3f5] bg-white px-4 py-2">
            <span className="text-[12px] font-semibold leading-[20px] text-[#111]">高考升学 Wiki</span>
            <IconArrowDown />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[12px] leading-[20px] text-[#999]">政策 · 院校 · 学科 · 分数线 · 志愿路径</span>
            <span className="rounded bg-[#f2f3ff] px-2 py-0.5 text-[10px] font-medium text-[#5c5cff]">9个节点</span>
            <span className="rounded bg-[#f2f3ff] px-2 py-0.5 text-[10px] font-medium text-[#5c5cff]">03.15 更新</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center rounded-full border border-[#f2f3f5] bg-white p-[10px]">
            <IconSearch />
          </button>
        </div>
      </div>

      {/* Graph Area — pan / zoom / rotate canvas */}
      <div
        ref={graphAreaRef}
        className="absolute left-6 right-6 top-[90px] bottom-[130px] overflow-hidden"
        style={{ cursor: "grab" }}
        onPointerDown={onBgDown}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: GW,
            height: GH,
            transform: `translate(-50%, -50%) translate(${cam.x}px, ${cam.y}px) scale(${cam.scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* SVG Edges */}
          <svg className="absolute inset-0" width={GW} height={GH} viewBox={`0 0 ${GW} ${GH}`} fill="none">
            {graphEdges.map((e, i) => {
              const a = positions[e.from];
              const b = positions[e.to];
              const edgeKey = `${e.from}-${e.to}`;
              const isConnected = connectedEdgeKeys.has(edgeKey);
              return (
                <path
                  key={i}
                  d={edgePath(a.x, a.y, b.x, b.y, e.curve)}
                  stroke={hasHighlight && isConnected ? "#7b8cff" : "#d0d0d0"}
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  fill="none"
                  style={{
                    opacity: hasHighlight && !isConnected ? 0.15 : 1,
                    transition: "opacity 0.3s, stroke 0.3s",
                  }}
                />
              );
            })}
          </svg>

          {/* Relation Labels */}
          {graphLabels.map((lbl) => {
            const a = positions[lbl.from];
            const b = positions[lbl.to];
            const labelConnected = connectedEdgeKeys.has(`${lbl.from}-${lbl.to}`) || connectedEdgeKeys.has(`${lbl.to}-${lbl.from}`);
            return (
              <div
                key={lbl.text}
                className="absolute z-10"
                style={{
                  left: (a.x + b.x) / 2,
                  top: (a.y + b.y) / 2,
                  transform: "translate(-50%, -50%)",
                  opacity: hasHighlight && !labelConnected ? 0.15 : 1,
                  transition: "opacity 0.3s",
                }}
              >
                <span className="inline-block whitespace-nowrap rounded-[4px] border border-[#f2f3f5] bg-white px-2 py-0.5 text-[10px] text-[#475770]">
                  {lbl.text}
                </span>
              </div>
            );
          })}

          {/* Graph Nodes */}
          {graphNodes.map((node, idx) => {
            const pos = positions[idx];
            const isHovered = hoveredNode === idx;
            const isConnected = connectedNodes.has(idx);
            return (
              <div
                key={node.label}
                data-gnode=""
                className="absolute z-20"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: "translate(-50%, -50%)",
                  opacity: hasHighlight && !isConnected ? 0.25 : 1,
                  transition: "opacity 0.3s",
                  cursor: "pointer",
                }}
                onPointerDown={(e) => onNodeDown(e, idx)}
                onMouseEnter={() => { if (!dragRef.current) setHoveredNode(idx); }}
                onMouseLeave={() => { if (!dragRef.current) setHoveredNode(null); }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="mb-[-5px] z-10 h-[10px] w-[10px] rounded-full"
                    style={{
                      background: isHovered
                        ? "linear-gradient(135deg, #5057f6, #7b8cff)"
                        : "linear-gradient(135deg, #f59e0b, #f97316)",
                      transition: "background 0.3s",
                    }}
                  />
                  <div
                    className="rounded-[4px] px-4 py-3"
                    style={{
                      background: isHovered
                        ? "linear-gradient(161deg, #f7faff 0%, #bcd4ff 100%)"
                        : "linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)",
                      boxShadow: isHovered
                        ? "0 2px 8px rgba(92,92,255,0.18), inset 1px 1px 2px rgba(180,198,255,0.4), inset -1px -1px 2px rgba(180,198,255,0.2)"
                        : "0 2px 8px rgba(0,0,0,0.08)",
                      border: isHovered ? "0.5px solid rgba(180,198,255,0.3)" : "0.5px solid transparent",
                      transition: "background 0.3s, box-shadow 0.3s, border 0.3s",
                    }}
                  >
                    <span
                      className="whitespace-nowrap text-[13px] font-bold"
                      style={{
                        color: isHovered ? "#5057f6" : "#111",
                        transition: "color 0.3s",
                      }}
                    >
                      {node.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Area */}
      <div className="absolute bottom-[16px] left-0 right-0 flex flex-col items-center gap-3">
        {/* Action Chips */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
            <IconUpload /><span className="text-[12px] font-semibold leading-[20px] text-[#111]">本地文件</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
            <IconClipboard /><span className="text-[12px] font-medium leading-[20px] text-[#111]">网页/长文本</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
            <IconApp /><span className="text-[12px] font-medium leading-[20px] text-[#111]">第三方应用</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.25)]">
            <IconGit /><span className="text-[12px] font-medium leading-[20px] text-[#111]">Git仓库</span>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex w-[644px] items-center justify-between rounded-full bg-white px-4 py-3" style={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.06)" }}>
          <span className="text-[14px] leading-[22px] text-[rgba(17,17,17,0.5)]">请输入你的研究内容</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold leading-[18px] text-[#666]">无可选来源</span>
            <div className="flex size-8 items-center justify-center rounded-full bg-[#f0f0f0]">
              <IconSearchSmall />
            </div>
          </div>
        </div>
        {/* View Toggle */}
        <div className="absolute bottom-0 right-0 flex items-center rounded-l-full bg-[#f0f0f0] px-1 py-1">
          <div className="flex cursor-pointer items-center px-4 py-2" onClick={() => onSwitchView("library")}>
            <span className="text-[14px] leading-[22px] text-[#111]">资料</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-4 py-2 shadow-[0px_1px_3px_rgba(0,0,0,0.08)]">
            <IconGraph /><span className="text-[14px] leading-[22px] text-[#111]">图谱</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Agent View (destination page when clicking a graph node)
   ═══════════════════════════════════════════════════════════════ */

const agentChips = [
  { label: "Happyhorse视频", bg: "#f5f7ff", color: "#111", icon: `${P0}/agent-chip-happyhorse.png`, iconType: "img" as const },
  { label: "报告", bg: "#f0fbff", color: "#3b84a8", icon: `${P0}/agent-chip-report.svg`, iconType: "svg" as const },
  { label: "演示文稿", bg: "#edfbfa", color: "#158b8c", icon: `${P0}/agent-chip-ppt.svg`, iconType: "svg" as const },
  { label: "思维导图", bg: "#fff1f0", color: "#cf131e", icon: `${P0}/agent-chip-mindmap.svg`, iconType: "svg" as const },
  { label: "播客", bg: "#fff6e0", color: "#d99921", icon: `${P0}/agent-chip-podcast.svg`, iconType: "svg" as const },
  { label: "信息图", bg: "#f2f3ff", color: "#3e45d6", icon: `${P0}/agent-chip-infograph.svg`, iconType: "svg" as const },
  { label: "测验", bg: "#f7f7e9", color: "#849107", icon: `${P0}/agent-chip-quiz.svg`, iconType: "svg" as const },
];

const agentSources = [
  { title: "文件上传", desc: "PDF/Word/PPT...", img: `${P0}/agent-3d-upload.webp`, imgStyle: { height: "117.31%", left: "0", top: "-9.13%", width: "100.83%" } },
  { title: "网页/长文本", desc: "网页抓取/文本粘贴", img: `${P0}/agent-3d-webpage.webp`, imgStyle: { height: "99.55%", left: "6.81%", top: "0.45%", width: "85.56%" } },
  { title: "第三方应用", desc: "Notion/钉钉/飞书", img: `${P0}/agent-3d-app.webp`, imgStyle: { height: "120.87%", left: "0.3%", top: "-5.17%", width: "103.89%" } },
  { title: "Git仓库", desc: "同步GitHub管理", img: `${P0}/agent-3d-git.png`, imgStyle: { inset: "0", width: "100%", height: "100%", objectFit: "cover" as const, objectPosition: "bottom" } },
];

const sidebarTree = [
  {
    section: "原始资料",
    groups: [
      {
        label: "文件上传",
        expanded: true,
        items: [
          { name: "双一流大学介绍.pdf", icon: `${P0}/agent-ficon-pdf.webp` },
          { name: "985工程高校.docx", icon: `${P0}/agent-ficon-docx.webp` },
          { name: "211工程高校.md", icon: `${P0}/agent-ficon-md.webp` },
          { name: "省份分数线.xlsx", icon: `${P0}/agent-ficon-xlsx.webp` },
          { name: "21省市2025年高考分数线汇总.ppt", icon: `${P0}/agent-ficon-ppt.webp` },
        ],
      },
      { label: "网页/长文本" },
      { label: "第三方应用", hasArrow: true },
    ],
  },
  {
    section: "知识Wiki",
    groups: [
      {
        label: "升学规划",
        expanded: true,
        items: [
          { name: "升学决策框架" },
          { name: "志愿填报策略" },
          { name: "录取匹配关系" },
        ],
      },
      {
        label: "院校研究",
        expanded: true,
        items: [
          { name: "高校层级体系" },
          { name: "学科专业实力" },
        ],
      },
      {
        label: "政策与分数",
        expanded: true,
        items: [{ name: "分数线体系" }],
      },
    ],
  },
  {
    section: "图谱配置",
    groups: [{ label: "TheSchema" }],
  },
];

function AgentView({ onBack, onHome }: { onBack: () => void; onHome: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>("test");
  const [chatSubmitted, setChatSubmitted] = useState(true);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f8f8f8]">
      {/* ── Top navigation bar ── */}
      <div className="relative flex w-full items-center justify-between px-6" style={{ height: 68, paddingTop: 16, paddingBottom: 16 }}>
        {/* Left: home + project name */}
        <div className="flex w-[204px] shrink-0 cursor-pointer items-center gap-4" onClick={onHome}>
          <svg width="16" height="16" viewBox="0 0 14.3333 14.3151" fill="none" className="shrink-0">
            <path d="M5.18 1.048L1.587 3.848C0.987 4.315 0.5 5.308 0.5 6.062V11.002C0.5 12.548 1.76 13.815 3.307 13.815H11.027C12.573 13.815 13.833 12.548 13.833 11.008V6.155C13.833 5.348 13.293 4.315 12.633 3.855L8.513 0.968C7.58 0.315 6.08 0.348 5.18 1.048Z" stroke="#666" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.167 11.148V9.148" stroke="#666" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex h-4 items-center justify-center" style={{ width: 0 }}>
            <div className="h-0 w-4 rotate-90 border-t border-[#e0e0e0]" />
          </div>
          <div className="flex items-center gap-1">
            <span className="whitespace-nowrap text-[14px] font-semibold leading-[22px] text-[#111]">项目空间名称</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M5.99976 8.3998C5.64976 8.3998 5.29976 8.2648 5.03476 7.9998L1.77477 4.73982C1.62977 4.59482 1.62977 4.35482 1.77477 4.20982C1.91977 4.06482 2.15977 4.06482 2.30477 4.20982L5.56476 7.4698C5.80476 7.7098 6.19476 7.7098 6.43476 7.4698L9.69476 4.20982C9.83976 4.06482 10.0798 4.06482 10.2248 4.20982C10.3698 4.35482 10.3698 4.59482 10.2248 4.73982L6.96476 7.9998C6.69976 8.2648 6.34976 8.3998 5.99976 8.3998Z" fill="#111"/></svg>
          </div>
        </div>
        {/* Center: Agent / 编辑器 tab switcher */}
        <div className="flex shrink-0 items-center overflow-hidden rounded-lg border border-[#f2f3f5]" style={{ padding: 1 }}>
          <div className="flex items-center gap-1 bg-[#111] px-4 py-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 4V2H4" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 4H3C2.448 4 2 4.448 2 5V9C2 9.552 2.448 10 3 10H9C9.552 10 10 9.552 10 9V5C10 4.448 9.552 4 9 4Z" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 7H2" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 7H11" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 6.5V7.5" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 6.5V7.5" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="whitespace-nowrap text-[10px] font-semibold leading-[18px] text-white">Agent</span>
          </div>
          <div className="flex items-center gap-1 bg-white px-4 py-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10H10.5" stroke="#111" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.188 1.811C8.387 1.612 8.657 1.5 8.938 1.5C9.22 1.5 9.49 1.612 9.689 1.811C9.888 2.01 10 2.28 10 2.562C10 2.843 9.888 3.113 9.689 3.312L3.684 9.318C3.565 9.436 3.418 9.523 3.256 9.571L1.82 9.99C1.777 10.002 1.732 10.003 1.688 9.992C1.645 9.981 1.605 9.958 1.574 9.926C1.542 9.895 1.519 9.855 1.508 9.812C1.497 9.768 1.498 9.723 1.51 9.68L1.93 8.244C1.977 8.082 2.064 7.935 2.182 7.817L8.188 1.811Z" stroke="#111" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="whitespace-nowrap text-[10px] font-semibold leading-[18px] text-[#111]">编辑器</span>
          </div>
        </div>
        {/* Right: menu + export */}
        <div className="flex w-[204px] shrink-0 items-center justify-end gap-2">
          <svg width="16" height="16" viewBox="0 0 8.413 1.747" fill="none" className="shrink-0">
            <circle cx="0.873" cy="0.873" r="0.873" fill="#111"/>
            <circle cx="4.207" cy="0.873" r="0.873" fill="#111"/>
            <circle cx="7.54" cy="0.873" r="0.873" fill="#111"/>
          </svg>
          <div className="flex size-9 items-center justify-center rounded-[10px] bg-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2C8.276 2 8.5 2.224 8.5 2.5C8.5 2.776 8.276 3 8 3C4.964 3 2.5 5.464 2.5 8.5C2.5 11.536 4.964 14 8 14C11.036 14 13.5 11.536 13.5 8.5C13.5 8.224 13.724 8 14 8C14.276 8 14.5 8.224 14.5 8.5C14.5 12.088 11.588 15 8 15C4.412 15 1.5 12.088 1.5 8.5C1.5 4.912 4.412 2 8 2ZM14 2C14.276 2 14.5 2.224 14.5 2.5V5.397C14.5 5.673 14.276 5.897 14 5.897C13.724 5.897 13.5 5.673 13.5 5.397V3.707L11.089 6.118C10.894 6.313 10.577 6.313 10.382 6.118C10.187 5.923 10.187 5.606 10.382 5.411L12.793 3H11.103C10.826 3 10.603 2.776 10.603 2.5C10.603 2.224 10.826 2 11.103 2H14Z" fill="#111"/>
            </svg>
          </div>
        </div>
      </div>

      {selectedFile ? (
        <>
          {/* ══ Left: Document viewer panel ══ */}
          <div className="absolute overflow-hidden rounded-3xl bg-white" style={{ left: 16, top: 68, width: 698, bottom: 16 }}>
            {/* Title bar */}
            <div className="absolute left-4 top-5 flex w-[666px] items-center justify-between">
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M2 4.5H14" stroke="#111" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M2 8H14" stroke="#111" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M2 11.5H14" stroke="#111" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-[14px] font-semibold leading-[22px] text-[#111]">清华团队悄悄发了个超级有趣的 AI 开源项目</span>
              </div>
              <button className="flex size-6 items-center justify-center" onClick={() => { setSelectedFile(null); setChatSubmitted(false); }}>
                <svg width="16" height="16" viewBox="0 0 14.353 14.333" fill="none" className="-scale-y-100 rotate-90">
                  <path d="M9.167 14.333H5.167C1.547 14.333 0 12.787 0 9.167V5.167C0 1.547 1.547 0 5.167 0H9.167C12.787 0 14.333 1.547 14.333 5.167V9.167C14.333 12.787 12.793 14.333 9.167 14.333ZM5.167 1C2.093 1 1 2.093 1 5.167V9.167C1 12.24 2.093 13.333 5.167 13.333H9.167C12.24 13.333 13.333 12.24 13.333 9.167V5.167C13.333 2.093 12.24 1 9.167 1H5.167Z" fill="#333"/>
                  <path d="M13.853 5.333H0.52C0.247 5.333 0.02 5.107 0.02 4.833C0.02 4.56 0.247 4.333 0.52 4.333H13.853C14.127 4.333 14.353 4.56 14.353 4.833C14.353 5.107 14.127 5.333 13.853 5.333Z" fill="#333"/>
                  <path d="M8.893 10C8.767 10 8.64 9.954 8.54 9.854L7.187 8.5L5.833 9.854C5.64 10.047 5.32 10.047 5.127 9.854C4.933 9.661 4.933 9.341 5.127 9.147L6.833 7.441C7.027 7.247 7.347 7.247 7.54 7.441L9.247 9.147C9.44 9.341 9.44 9.661 9.247 9.854C9.147 9.954 9.02 10 8.893 10Z" fill="#333"/>
                </svg>
              </button>
            </div>
            {/* Guide badge */}
            <img  src={`${P0}/agent-guide-badge.png`} alt="" className="absolute" style={{ left: 18, top: 52, width: 80, height: 30 }} draggable={false} />
            {/* Orange info banner */}
            <div className="absolute left-4 top-[68px] rounded border-b border-[#ffe8cc] bg-[#fff8f0] p-3">
              <p className="text-[10px] leading-[18px] text-[#885500]" style={{ width: 642 }}>
                深圳公务员考试资料提供广州、深圳等广东省内多个城市的国考及地方公务员考试相关信息，涵盖行测、申论、面试技巧与真题，以及综合指导，是备考广东省公职人员录用考试的重要资源。
              </p>
            </div>
            {/* Scrollable article content */}
            <div className="absolute left-4 top-[142px] flex w-[666px] flex-col gap-2.5 overflow-y-auto" style={{ height: 738 }}>
              <div className="text-[12px] leading-[20px] text-black">
                <p>我第一次强烈感觉到，教育的范式彻底要变了。保守估计十年之内肯定会变，激进一点的话五年。</p>
                <p>虽然现在很多人已经开始用 AI 工具辅导孩子学习，好多老师也会用 AI 批作业。</p>
                <p>但这些提升，本质上还是在旧有的教育体系里提升效率，它没有改变教育的范式。</p>
                <p>一个老师在台上讲课，下面坐着几十号学生在那听课，这种教育方式真的好吗？所有的学生无差别的按照一个节奏理解知识？这种方式好吗？肯定不好。</p>
                <p>为什么会这么讲？得从我最近半个月的一次体验说起。</p>
                <p>#01</p>
                <p>清华团队的尝试</p>
                <p>我在追《太平年》这部剧，五代十国那段历史太乱了，钱镠是谁，李克用是谁，后周和宋朝什么关系，我完全搞不清楚。</p>
                <p>昨天我发现清华团队做的一个 AI 教学系统，叫 OpenMAIC。这个系统和我们熟悉的慕课完全不一样。</p>
              </div>
              <img  src={`${P0}/agent-article-img.webp`} alt="OpenMAIC" className="w-full rounded" draggable={false} />
              <p className="text-center text-[10px] font-semibold leading-[18px] text-[#333]">图例：OpenMAIC</p>
              <div className="text-[12px] leading-[20px] text-black">
                <p>慕课是什么？录好的视频，我自己看，看不懂也没人理我。但 OpenMAIC 不是这样。</p>
                <p>它是一个完全由 AI 驱动的课堂，有 AI 老师讲课，有 AI 助教答疑，甚至还有 AI 同学跟我一起讨论。全是 AI，没有人类教师。</p>
                <p>我登录系统，输入我的问题：帮我讲讲五代十国的历史背景。AI 老师开始讲了。讲得挺清楚的，先从唐朝灭亡说起，然后讲藩镇割据，再讲五个朝代怎么更替。</p>
                <p>我录了个屏，大家看看：</p>
                <p>真的是太不可思议了。AI 的课件和讲解都是实时生成的，不是提前录好的那种。</p>
                <p>而且 AI 还会配合课程内容，做 HTML5 动画、随堂测验，甚至根据我的问题临时画图、板书。</p>
                <p>这种授课方式，我觉得没有学生会不喜欢。</p>
                <p>我拿我家孩子最近的情况举个例子。</p>
                <p>去年有段时间学竖式除法，孩子回来说，搞不懂，不知道为什么要这么算。我说听不懂你就举手问老师啊。他说不行，怕同学觉得自己笨。</p>
                <p>我鼓励他，要勇敢。但孩子确实不敢。我想了一下，如果是我的话，我可能也不敢。</p>
                <p>那下课去问老师呢？孩子倒是去过，但下课时间就那么几分钟，老师也没有精力给他单独再讲一遍。所以最后怎么办？就是我们家长回来自己教呗。</p>
                <p>这事让我想起我自己小时候。我小学是在村里上的，回忆了一下，当时应该有不少伙伴，也是在某个知识点上卡住了。卡住之后就跟不上老师进度了。</p>
                <p>不好意思问老师，然后家长也不懂，然后就这么糊弄着，越来越跟不上，慢慢就开始厌学了。</p>
              </div>
            </div>
          </div>

          {/* ══ Right: Agent chat panel ══ */}
          <div className="absolute overflow-hidden rounded-3xl bg-white" style={{ left: 726, right: 16, top: 68, bottom: 16 }}>
            {chatSubmitted ? (
              <>
                {/* Title bar */}
                <div className="absolute left-0 top-0 flex w-full items-center border-b border-[#f2f3f5] pt-2">
                  <div className="flex items-center px-6 py-3">
                    <span className="whitespace-nowrap text-[14px] font-semibold leading-[22px] text-[#111]">运行时动态替换对象属性与方法</span>
                  </div>
                </div>

                {/* User message bubble */}
                <div className="absolute flex items-center justify-center bg-[#f8f8f8] px-4 py-2" style={{ left: 390, top: 78, width: 292, borderRadius: '8px 0 8px 8px' }}>
                  <span className="whitespace-nowrap text-[14px] leading-[22px] text-[#111]">Python 中的 Monkey Patching 是什么？</span>
                </div>

                {/* Meta row: copy, edit, timestamp */}
                <div className="absolute flex items-center justify-end gap-2.5 pr-2" style={{ left: 390, top: 128, width: 292 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 cursor-pointer">
                    <rect x="5" y="1" width="7.5" height="7.5" rx="1.5" stroke="#999" strokeWidth="0.8"/>
                    <path d="M9 5.5H3.5C2.67 5.5 2 6.17 2 7V11C2 11.83 2.67 12.5 3.5 12.5H7.5C8.33 12.5 9 11.83 9 11" stroke="#999" strokeWidth="0.8"/>
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 cursor-pointer">
                    <path d="M8.5 2L11.5 2V5" stroke="#999" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.5 2L7 6.5" stroke="#999" strokeWidth="0.8" strokeLinecap="round"/>
                    <path d="M10 7.5V11C10 11.55 9.55 12 9 12H3C2.45 12 2 11.55 2 11V5C2 4.45 2.45 4 3 4H6.5" stroke="#999" strokeWidth="0.8" strokeLinecap="round"/>
                  </svg>
                  <span className="whitespace-nowrap text-[12px] leading-[20px] text-[#111]">11:11</span>
                </div>

                {/* AI response */}
                <div className="absolute flex w-[666px] flex-col items-start gap-3" style={{ left: 16, top: 172 }}>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <div className="relative size-[14px] overflow-hidden rounded-full">
                        <div className="absolute inset-0 rounded-full bg-[rgba(240,242,245,0.5)]" />
                        <img  src={`${P0}/agent-avatar.png`} alt="" className="pointer-events-none absolute size-[20px] object-cover" style={{ bottom: -3, left: -3 }} draggable={false} />
                      </div>
                      <span className="whitespace-nowrap text-[14px] font-semibold leading-[22px] text-[#1f1f1f]">心流</span>
                    </div>
                    <span className="whitespace-nowrap text-[10px] leading-[18px] text-[#666]">内容由 AI 深度解析生成</span>
                  </div>
                  <p className="w-[657px] text-[14px] leading-[22px] text-[#111]">
                    Monkey Patching 的一个常见用途是在测试过程中对函数进行存根处理，以便进行单元测试。另一个用途是在不改变原始源代码的情况下，对第三方产品的行为进行修改或扩展。Monkey Patching 还可以用于应用补丁，而不是在磁盘上的{" "}<span className="relative -top-1 inline-flex size-[10px] items-center justify-center rounded-full bg-[#e2e2e2] text-[8px] leading-[8px] text-[#111]">1</span>{" "}源代码上应用补丁。
                  </p>
                  <p className="text-[14px] font-semibold leading-[22px] text-[#666]">示例代码</p>
                  <ul className="list-disc pl-[21px] text-[14px] leading-[22px] text-[#111]">
                    <li>即时生效：无需重启程序或重新编译，修改会立即影响后续代码执行。</li>
                    <li>属性动态替换：本质是通过替换对象的属性（如类方法、模块函数）实现功能覆盖。</li>
                    <li>高风险高灵活：适合快速修复或测试，但可能破坏代码的可维护性。</li>
                  </ul>
                  {/* Action bar */}
                  <div className="flex w-[616px] items-center gap-5 px-2">
                    <span className="text-[12px] font-semibold leading-[20px] text-[#ffe834]">✦ 创作</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 cursor-pointer"><path d="M13.5 8A5.5 5.5 0 1 1 8 2.5C10.1 2.5 11.9 3.7 12.8 5.4" stroke="#999" strokeLinecap="round"/><path d="M14 2.5V5.5H11" stroke="#999" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 cursor-pointer"><path d="M6 9L10 5M10 5H7M10 5V8" stroke="#999" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 8V12C14 13.1 13.1 14 12 14H4C2.9 14 2 13.1 2 12V4C2 2.9 2.9 2 4 2H8" stroke="#999" strokeLinecap="round"/></svg>
                    <div className="h-3 w-px bg-[#e0e0e0]" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 cursor-pointer"><path d="M4.5 7V13.5M2 8C2 7.45 2.45 7 3 7H4.5L6.5 2.5C7.33 2.5 8 3.17 8 4V6H12.5C13.33 6 14 6.83 13.83 7.67L12.83 12.67C12.72 13.22 12.22 13.5 11.67 13.5H4.5" stroke="#999" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 cursor-pointer"><path d="M11.5 9V2.5M14 8C14 8.55 13.55 9 13 9H11.5L9.5 13.5C8.67 13.5 8 12.83 8 12V10H3.5C2.67 10 2 9.17 2.17 8.33L3.17 3.33C3.28 2.78 3.78 2.5 4.33 2.5H11.5" stroke="#999" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

              </>
            ) : (
              <>
                {/* Greeting */}
                <div className="absolute flex flex-col items-center gap-4" style={{ left: "50%", top: 219, transform: "translateX(-50%)" }}>
                  <div className="relative size-[44px] shrink-0 overflow-hidden rounded-full bg-[#6969fd]">
                    <img  src={`${P0}/agent-avatar.png`} alt="" className="pointer-events-none absolute size-[62px] object-cover" style={{ bottom: -10, left: -10 }} draggable={false} />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="whitespace-nowrap text-[#111]" style={{ fontSize: 0, lineHeight: 0, fontWeight: 600 }}>
                      <span style={{ fontFamily: "'Alimama ShuZhiTi VF', 'PingFang SC', sans-serif", fontSize: 16, lineHeight: "18px", fontWeight: 500 }}>HI，我是心流</span>
                      <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, lineHeight: "18px", fontWeight: 400 }}>2.0 </span>
                      <span style={{ fontSize: 13, lineHeight: "18px" }}>👋</span>
                    </p>
                  </div>
                </div>

                {/* Suggestion chips */}
                <div className="absolute flex flex-wrap items-start justify-center gap-2 px-8" style={{ left: 0, right: 0, top: 328 }}>
                  {["如何利用思维导图来梳理我上传的内容？", "生成的学习指南包含哪些具体的练习形式？"].map((q) => (
                    <div key={q} className="rounded-lg bg-[#f8f8f8] px-3 py-2">
                      <span className="text-[12px] leading-[20px] text-[#434343]">{q}</span>
                    </div>
                  ))}
                  <div className="rounded-lg bg-[#f8f8f8] px-3 py-2">
                    <span className="text-[12px] leading-[20px] text-[#434343]">生成的学习指南包含哪些具体的练习形式？</span>
                  </div>
                </div>
              </>
            )}

            {/* Bottom: chips + input */}
            <div className="absolute flex w-[666px] flex-col items-start gap-3 overflow-hidden" style={{ left: 16, bottom: 16 }}>
              <div className="flex items-center gap-2 overflow-hidden">
                {agentChips.map((c) => (
                  <div key={c.label} className="flex shrink-0 items-center gap-1 overflow-hidden rounded-xl px-3 py-2" style={{ background: c.bg }}>
                    <div className="relative size-4 shrink-0 overflow-hidden rounded-sm">
                      {c.iconType === "img" ? (
                        <img  src={c.icon} alt="" className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover" draggable={false} />
                      ) : (
                        <img  src={c.icon} alt="" className="pointer-events-none absolute inset-0 size-full" draggable={false} />
                      )}
                    </div>
                    <span className="whitespace-nowrap text-[12px] font-semibold leading-[20px]" style={{ color: c.color }}>{c.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex h-[108px] w-full flex-col gap-7 overflow-hidden rounded-2xl border border-[#f2f3f5] bg-white px-4 py-3">
                <div className="flex w-full items-center gap-1 overflow-hidden">
                  {!chatSubmitted && (
                    <div className="flex shrink-0 items-center gap-1 rounded-lg bg-[#f5f7ff] px-2 py-1">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="shrink-0">
                        <path d="M2.25 14.5H13.75C14.44 14.5 15 13.94 15 13.25V5.25C15 4.56 14.44 4 13.75 4H8.5L6.75 1.5H2.25C1.56 1.5 1 2.06 1 2.75V13.25C1 13.94 1.56 14.5 2.25 14.5Z" stroke="#5c5cff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="whitespace-nowrap text-[12px] font-semibold leading-[20px] text-[#111]">清华团...</span>
                    </div>
                  )}
                  <p className="min-w-0 flex-1 text-[16px] leading-[24px] text-[#999]">请输入研究问题。</p>
                </div>
                <div className="flex w-full items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#f0f0f0]">
                      <svg width="12" height="12" viewBox="0 0 10.75 10.75" fill="none">
                        <path d="M0.375 5.375H10.375" stroke="#111" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.375 10.375V0.375" stroke="#111" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 overflow-hidden rounded-2xl border border-[#f0f0f0] py-1.5 pl-3 pr-2">
                      <span className="whitespace-nowrap text-[12px] leading-[20px] text-[#111]">标准模式</span>
                      <svg width="10" height="10" viewBox="0 0 48 48" fill="none" className="shrink-0">
                        <path d="M37.7 18.3L25.7 30.3C24.7 31.3 23.1 31.3 22.1 30.3L10.1 18.3" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 overflow-hidden rounded-2xl border border-[#f0f0f0] py-1.5 pl-3 pr-2">
                      <span className="whitespace-nowrap text-[12px] leading-[20px] text-[#111]">创作</span>
                      <svg width="10" height="10" viewBox="0 0 48 48" fill="none" className="shrink-0">
                        <path d="M37.7 18.3L25.7 30.3C24.7 31.3 23.1 31.3 22.1 30.3L10.1 18.3" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="whitespace-nowrap text-[10px] font-semibold leading-[18px] text-[#666]">已选20个来源</span>
                    <div className="relative size-8 shrink-0 cursor-pointer overflow-hidden" onClick={() => setChatSubmitted(true)}>
                      <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#f0f0f0]" />
                      <svg width="16" height="16" viewBox="0 0 14.373 14.371" fill="none" className="absolute" style={{ left: "28.13%", top: "28.13%" }}>
                        <path d="M14.022 0.35C13.703 0.031 13.238 -0.079 12.812 0.058L0.83 3.909C0.375 4.056 0.059 4.442 0.007 4.917C-0.045 5.392 0.181 5.837 0.593 6.077L4.836 8.552L8.501 4.886C8.773 4.614 9.213 4.614 9.485 4.886C9.757 5.157 9.757 5.598 9.485 5.87L5.819 9.536L8.294 13.779C8.512 14.151 8.896 14.371 9.32 14.371C9.365 14.371 9.41 14.368 9.456 14.364C9.93 14.312 10.317 13.996 10.462 13.542L14.315 1.561C14.452 1.132 14.34 0.668 14.022 0.35Z" fill="#111"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ── Sidebar panel ── */}
          {sidebarOpen && (
            <div
              className="absolute flex flex-col overflow-hidden rounded-3xl bg-white"
              style={{ left: 16, top: 68, width: 296, bottom: 16 }}
            >
              <div className="flex shrink-0 items-center justify-between px-4 pt-5 pb-2">
                <span className="text-[16px] font-semibold leading-[24px] text-[#111]">来源</span>
                <button className="flex size-7 items-center justify-center rounded-lg hover:bg-[#f5f5f5]" onClick={() => setSidebarOpen(false)}>
                  <svg width="14" height="14" viewBox="0 0 14.353 14.333" fill="none">
                    <path d="M9.167 14.333H5.167C1.547 14.333 0 12.787 0 9.167V5.167C0 1.547 1.547 0 5.167 0H9.167C12.787 0 14.333 1.547 14.333 5.167V9.167C14.333 12.787 12.793 14.333 9.167 14.333ZM5.167 1C2.093 1 1 2.093 1 5.167V9.167C1 12.24 2.093 13.333 5.167 13.333H9.167C12.24 13.333 13.333 12.24 13.333 9.167V5.167C13.333 2.093 12.24 1 9.167 1H5.167Z" fill="#333"/>
                    <path d="M13.853 5.333H0.52C0.247 5.333 0.02 5.107 0.02 4.833C0.02 4.56 0.247 4.333 0.52 4.333H13.853C14.127 4.333 14.353 4.56 14.353 4.833C14.353 5.107 14.127 5.333 13.853 5.333Z" fill="#333"/>
                    <path d="M8.893 10C8.767 10 8.64 9.954 8.54 9.854L7.187 8.5L5.833 9.854C5.64 10.047 5.32 10.047 5.127 9.854C4.933 9.661 4.933 9.341 5.127 9.147L6.833 7.441C7.027 7.247 7.347 7.247 7.54 7.441L9.247 9.147C9.44 9.341 9.44 9.661 9.247 9.854C9.147 9.954 9.02 10 8.893 10Z" fill="#333"/>
                  </svg>
                </button>
              </div>
              <div className="mx-4 mb-3 flex shrink-0 items-center gap-2 rounded-xl bg-[#f5f5f5] px-3 py-2.5">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#111]">
                  <svg width="9" height="9" viewBox="0 0 9.33333 9.33333" fill="none">
                    <path d="M1.944 4.667H7.389" stroke="white" strokeWidth="0.778" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.667 1.944V7.389" stroke="white" strokeWidth="0.778" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[12px] font-semibold leading-[20px] text-[#666]">添加来源</span>
              </div>
              <div className="flex-1 overflow-y-auto px-2 pb-4">
                {sidebarTree.map((sec) => (
                  <div key={sec.section} className="mb-1">
                    <div className="flex items-center gap-1 px-2 py-1.5">
                      <div className="h-[1px] w-2 bg-[#999]" />
                      <span className="text-[11px] font-semibold leading-[18px] text-[#999]">{sec.section}</span>
                    </div>
                    {sec.groups.map((g) => (
                      <div key={g.label}>
                        <div className="flex items-center gap-1 rounded-lg py-1.5 pl-6 pr-2 hover:bg-[#f8f8f8]">
                          {"expanded" in g && g.expanded ? (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0"><path d="M6.5 3L4 5.5L1.5 3" stroke="#999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          ) : "hasArrow" in g && g.hasArrow ? (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0"><path d="M3 1.5L5.5 4L3 6.5" stroke="#999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          ) : (
                            <div className="w-2 shrink-0" />
                          )}
                          <span className="text-[12px] leading-[20px] text-[#333]">{g.label}</span>
                        </div>
                        {"expanded" in g && g.expanded && g.items && g.items.map((item) => (
                          <div key={item.name} className="flex cursor-pointer items-center gap-1.5 rounded-lg py-1 pl-10 pr-2 hover:bg-[#f8f8f8]" onClick={() => setSelectedFile(item.name)}>
                            {"icon" in item && item.icon ? (
                              <img  src={item.icon} alt="" className="size-4 shrink-0 object-contain" draggable={false} />
                            ) : (
                              <div className="size-1 shrink-0 rounded-full bg-[#ccc]" />
                            )}
                            <span className="truncate text-[11px] leading-[18px] text-[#666]">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── White main container ── */}
          <div
            className="absolute overflow-hidden rounded-3xl bg-white"
            style={{ left: sidebarOpen ? 324 : 16, right: 16, top: 68, bottom: 16, transition: "left 0.3s ease" }}
          >
            {!sidebarOpen && (
              <button
                className="absolute left-3 top-3 z-10 flex flex-col items-center gap-6 rounded-2xl border border-[#f2f3f5] bg-white p-3"
                style={{ filter: "drop-shadow(0px 2px 2px rgba(192,192,204,0.2))" }}
                onClick={() => setSidebarOpen(true)}
              >
                <svg width="16" height="16" viewBox="0 0 14.353 14.333" fill="none">
                  <path d="M9.167 14.333H5.167C1.547 14.333 0 12.787 0 9.167V5.167C0 1.547 1.547 0 5.167 0H9.167C12.787 0 14.333 1.547 14.333 5.167V9.167C14.333 12.787 12.793 14.333 9.167 14.333ZM5.167 1C2.093 1 1 2.093 1 5.167V9.167C1 12.24 2.093 13.333 5.167 13.333H9.167C12.24 13.333 13.333 12.24 13.333 9.167V5.167C13.333 2.093 12.24 1 9.167 1H5.167Z" fill="#333"/>
                  <path d="M13.853 5.333H0.52C0.247 5.333 0.02 5.107 0.02 4.833C0.02 4.56 0.247 4.333 0.52 4.333H13.853C14.127 4.333 14.353 4.56 14.353 4.833C14.353 5.107 14.127 5.333 13.853 5.333Z" fill="#333"/>
                  <path d="M8.893 10C8.767 10 8.64 9.954 8.54 9.854L7.187 8.5L5.833 9.854C5.64 10.047 5.32 10.047 5.127 9.854C4.933 9.661 4.933 9.341 5.127 9.147L6.833 7.441C7.027 7.247 7.347 7.247 7.54 7.441L9.247 9.147C9.44 9.341 9.44 9.661 9.247 9.854C9.147 9.954 9.02 10 8.893 10Z" fill="#333"/>
                </svg>
              </button>
            )}
            <div className="pointer-events-none absolute" style={{ width: 500, height: 280, left: "50%", top: 159, transform: "translateX(-50%)" }}>
              <img  src={`${P0}/agent-glow.svg`} alt="" className="absolute" style={{ inset: "-39.29% -22%", width: "144%", height: "178.58%", maxWidth: "none" }} draggable={false} />
            </div>
            <div className="absolute flex flex-col items-center gap-4" style={{ left: "50%", top: 180, transform: "translateX(-50%)" }}>
              <div className="relative size-[44px] shrink-0 overflow-hidden rounded-full bg-[#6969fd]">
                <img  src={`${P0}/agent-avatar.png`} alt="" className="pointer-events-none absolute size-[62px] object-cover" style={{ bottom: -10, left: -10 }} draggable={false} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="whitespace-nowrap text-[#111]" style={{ fontSize: 0, lineHeight: 0, fontWeight: 600 }}>
                  <span style={{ fontFamily: "'Alimama ShuZhiTi VF', 'PingFang SC', sans-serif", fontSize: 16, lineHeight: "18px", fontWeight: 500 }}>HI，我是心流</span>
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, lineHeight: "18px", fontWeight: 400 }}>2.0 </span>
                  <span style={{ fontSize: 13, lineHeight: "18px" }}>👋</span>
                </p>
                <p className="text-center text-[12px] font-light leading-[20px] text-[#333]">添加来源即可开始使用，支持生成海量类型结果</p>
              </div>
            </div>
            <div className="absolute flex items-center gap-2" style={{ left: "50%", top: 317, transform: "translateX(-50%)" }}>
              {agentSources.map((s) => (
                <div key={s.title} className="relative h-[160px] w-[120px] shrink-0 overflow-hidden rounded-xl bg-white" style={{ boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.08)" }}>
                  <p className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap text-center text-[14px] font-semibold leading-[22px] text-[#111]">{s.title}</p>
                  <p className="absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap text-center text-[10px] leading-[18px] text-[#999]">{s.desc}</p>
                  <div className="pointer-events-none absolute" style={{ left: -1, top: 56, width: 121, height: 104 }}>
                    <div className="absolute inset-0 overflow-hidden">
                      <img  src={s.img} alt="" className="pointer-events-none absolute max-w-none" style={s.imgStyle} draggable={false} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute flex w-[666px] flex-col items-start gap-3 overflow-hidden" style={{ left: "50%", bottom: 16, transform: "translateX(-50%)" }}>
              <div className="flex items-center gap-2 overflow-hidden">
                {agentChips.map((c) => (
                  <div key={c.label} className="flex shrink-0 items-center gap-1 overflow-hidden rounded-xl px-3 py-2" style={{ background: c.bg }}>
                    <div className="relative size-4 shrink-0 overflow-hidden rounded-sm">
                      {c.iconType === "img" ? (
                        <img  src={c.icon} alt="" className="pointer-events-none absolute inset-0 size-full rounded-sm object-cover" draggable={false} />
                      ) : (
                        <img  src={c.icon} alt="" className="pointer-events-none absolute inset-0 size-full" draggable={false} />
                      )}
                    </div>
                    <span className="whitespace-nowrap text-[12px] font-semibold leading-[20px]" style={{ color: c.color }}>{c.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex h-[108px] w-full flex-col gap-7 overflow-hidden rounded-2xl border border-[#f2f3f5] bg-white px-4 py-3">
                <div className="flex w-full items-center gap-1 overflow-hidden">
                  <p className="min-w-0 flex-1 text-[16px] leading-[24px] text-[#999]">请输入研究问题。</p>
                </div>
                <div className="flex w-full items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#f0f0f0]">
                      <svg width="12" height="12" viewBox="0 0 10.75 10.75" fill="none">
                        <path d="M0.375 5.375H10.375" stroke="#111" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.375 10.375V0.375" stroke="#111" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 overflow-hidden rounded-2xl border border-[#f0f0f0] py-1.5 pl-3 pr-2">
                      <span className="whitespace-nowrap text-[12px] leading-[20px] text-[#111]">标准模式</span>
                      <svg width="10" height="10" viewBox="0 0 48 48" fill="none" className="shrink-0"><path d="M37.7 18.3L25.7 30.3C24.7 31.3 23.1 31.3 22.1 30.3L10.1 18.3" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 overflow-hidden rounded-2xl border border-[#f0f0f0] py-1.5 pl-3 pr-2">
                      <span className="whitespace-nowrap text-[12px] leading-[20px] text-[#111]">创作</span>
                      <svg width="10" height="10" viewBox="0 0 48 48" fill="none" className="shrink-0"><path d="M37.7 18.3L25.7 30.3C24.7 31.3 23.1 31.3 22.1 30.3L10.1 18.3" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="whitespace-nowrap text-[10px] font-semibold leading-[18px] text-[#666]">{sidebarOpen ? "已选20个来源" : "无可选来源"}</span>
                    <div className="relative size-8 shrink-0 overflow-hidden">
                      <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#f0f0f0]" />
                      <svg width="16" height="16" viewBox="0 0 14.373 14.371" fill="none" className="absolute" style={{ left: "28.13%", top: "28.13%" }}>
                        <path d="M14.022 0.35C13.703 0.031 13.238 -0.079 12.812 0.058L0.83 3.909C0.375 4.056 0.059 4.442 0.007 4.917C-0.045 5.392 0.181 5.837 0.593 6.077L4.836 8.552L8.501 4.886C8.773 4.614 9.213 4.614 9.485 4.886C9.757 5.157 9.757 5.598 9.485 5.87L5.819 9.536L8.294 13.779C8.512 14.151 8.896 14.371 9.32 14.371C9.365 14.371 9.41 14.368 9.456 14.364C9.93 14.312 10.317 13.996 10.462 13.542L14.315 1.561C14.452 1.132 14.34 0.668 14.022 0.35Z" fill="#111"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════ */

export default function SlidePage0({ initialView = "landing", canvasHeight = 900 }: { initialView?: ViewType; canvasHeight?: 900 | 1000 } = {}) {
  const [view, setView] = useState<ViewType>(initialView);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const isTallLanding = canvasHeight === 1000;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundColor: KNOWLEDGE_WORKSPACE_BG,
        fontFamily: "'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        @keyframes card-shine{0%{background-position:200% 0}100%{background-position:-100% 0}}
        @keyframes knowledge-cta-sweep{
          0%{transform:translateX(-190%) skewX(-18deg);opacity:0}
          18%{opacity:.85}
          78%{opacity:.72}
          100%{transform:translateX(430%) skewX(-18deg);opacity:0}
        }
        .knowledge-cta:hover .knowledge-cta-shine{animation:knowledge-cta-sweep .82s cubic-bezier(.22,.7,.25,1) forwards}
        @media (hover: none) and (pointer: coarse) {
          .landing-nav-glass {
            background: rgba(255,255,255,.62) !important;
            -webkit-backdrop-filter: blur(10px) saturate(1.12) !important;
            backdrop-filter: blur(10px) saturate(1.12) !important;
          }
        }
      `}</style>
      {view !== "agent" && <Navigation view={view} onSwitch={setView} />}
      {view === "agent" ? <AgentView onBack={() => setView("graph")} onHome={() => setView("library")} /> : view === "graph" ? <GraphView onSwitchView={(v) => setView(v)} /> : view === "library" ? <LibraryView onSwitchView={(v) => setView(v)} /> : (
        <div
          className="absolute left-[80px] right-0 top-0 bottom-0"
          style={{ backgroundColor: KNOWLEDGE_WORKSPACE_BG }}
        >
          <div className="relative h-full w-full">
            <LandingView onNavigate={() => setView("library")} tall={isTallLanding} />
          {/* Feature cards — fan spread on hover, lives inside the same landing container */}
          <div className="absolute inset-0 pointer-events-none">
            {featureCards.map((card, i) => {
              const isHov = hoveredCard === i;
              const anyHov = hoveredCard !== null;
              const restingLift = isTallLanding ? 28 : 0;

              const diff = hoveredCard !== null ? i - hoveredCard : 0;
              const dx = anyHov && !isHov ? diff * 52 : 0;
              // Resting cards sit higher on the 1000px board. Compensate by the
              // same amount during hover so every animated end position is unchanged.
              const dy = isHov ? -178 + restingLift : anyHov ? -105 + restingLift : 0;
              const rot = isHov ? 0 : card.rotation;
              const sc = isHov ? 1.1 : anyHov ? 0.96 : 1;

              return (
                <div
                  key={card.title}
                  className="absolute pointer-events-auto"
                  style={{
                    left: card.left,
                    top: isTallLanding ? `${Number.parseFloat(card.top) + 76 - restingLift}px` : card.top,
                    zIndex: isHov ? 50 : card.zIndex,
                    transform: `translateX(calc(-50% + ${dx}px)) translateY(${dy}px)`,
                    transition: "transform 0.5s cubic-bezier(0.34, 1.45, 0.64, 1)",
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{
                    transform: `rotate(${rot}deg) scale(${sc})`,
                    transition: "transform 0.5s cubic-bezier(0.34, 1.45, 0.64, 1)",
                  }}>
                    <FeatureCard {...card} isHovered={isHov} />
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
