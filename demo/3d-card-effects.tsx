import { useRef, useCallback, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

// ─── Config ───────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 1,
    title: "Figma 组件库搭建指南",
    tag: "设计系统",
    bg: "#fdeef4",
    accent: "#ee99a0",
  },
  {
    id: 2,
    title: "React 并发特性深度解析",
    tag: "前端开发",
    bg: "#eef0fd",
    accent: "#7c87ee",
  },
  {
    id: 3,
    title: "以用户为中心的产品设计",
    tag: "产品思维",
    bg: "#edfdf4",
    accent: "#5ec98a",
  },
  {
    id: 4,
    title: "大模型应用开发实战",
    tag: "AI 工具",
    bg: "#fdf8ee",
    accent: "#e8b85a",
  },
];

// ─── 3D Card ──────────────────────────────────────────────────────────────────
function Card3D({
  title,
  tag,
  bg,
  accent,
}: {
  title: string;
  tag: string;
  bg: string;
  accent: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 3D 倾斜：spring 物理弹簧
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 260, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 260, damping: 18 });

  // 鼠标移动 → 倾斜 + 光泽追踪
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 ~ 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      // 3D tilt
      rx.set(-ny * 22);
      ry.set(nx * 22);

      // 光泽追踪：radial-gradient 跟随鼠标
      if (shineRef.current) {
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        shineRef.current.style.background =
          `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.55) 0%, transparent 58%)`;
      }
    },
    [rx, ry]
  );

  const onEnter = useCallback(() => {
    setHovered(true);
    if (shineRef.current) shineRef.current.style.opacity = "1";
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    rx.set(0);
    ry.set(0);
    if (shineRef.current) shineRef.current.style.opacity = "0";
  }, [rx, ry]);

  return (
    <div style={{ perspective: 1200 }}>
      {/* 倾斜容器 */}
      <motion.div
        ref={cardRef}
        style={{
          width: 280,
          height: 240,
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          cursor: "pointer",
        }}
        // 悬浮抬起
        animate={{
          scale: hovered ? 1.07 : 1,
          y: hovered ? -12 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* 卡片表面 */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 32,
            backgroundColor: bg,
            overflow: "hidden",
          }}
          animate={{
            boxShadow: hovered
              ? `0 36px 80px -10px ${accent}55, 0 0 0 1.5px ${accent}40`
              : `0 2px 20px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)`,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* 光泽追踪层 */}
          <div
            ref={shineRef}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 32,
              mixBlendMode: "overlay",
              opacity: 0,
              transition: "opacity 0.25s ease",
              pointerEvents: "none",
            }}
          />

          {/* 内边框高光 */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 32,
              pointerEvents: "none",
            }}
            animate={{
              boxShadow: hovered
                ? `inset 0 0 0 1.5px ${accent}60, inset 0 1px 0 rgba(255,255,255,0.6)`
                : `inset 0 0 0 0px transparent`,
            }}
            transition={{ duration: 0.35 }}
          />

          {/* 内容 */}
          <div style={{ position: "relative", padding: 28, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <motion.span
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 500,
                color: accent,
                padding: "4px 10px",
                borderRadius: 20,
                alignSelf: "flex-start",
              }}
              animate={{
                backgroundColor: hovered ? accent + "20" : "transparent",
              }}
            >
              {tag}
            </motion.span>

            <motion.p
              style={{ fontSize: 18, lineHeight: 1.6, color: "#1f1f1f", fontWeight: 500 }}
              animate={{ y: hovered ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              {title}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        background: "#0d0d12",
      }}
    >
      <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 300, letterSpacing: 2 }}>
        3D Card Effects
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
        {CARDS.map((c) => (
          <Card3D key={c.id} {...c} />
        ))}
      </div>

      <p style={{ color: "#444", fontSize: 12, letterSpacing: 4 }}>
        HOVER TO INTERACT
      </p>
    </div>
  );
}
