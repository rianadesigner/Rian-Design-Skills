"use client";

import { useEffect, useRef, useState } from "react";
import { toCanvas } from "html-to-image";
import { SLIDE_DESIGN_HEIGHT, SLIDE_DESIGN_WIDTH } from "./slide-design";
import SlidePage0 from "./slide-page0";
import { KnowledgeBaseSpotlight } from "./slide-page0d";
import SlidePage0e from "./slide-page0e";

const DESIGN_W = SLIDE_DESIGN_WIDTH;
const DESIGN_H = SLIDE_DESIGN_HEIGHT;
const GAP = 8;
const SPEED = 56;
const HEADER_H = 200;
const FOOTER_H = 68;
const EDGE_MIN = 56;
const EDGE_MAX = 96;
const EDGE_RATIO = 0.055;
const CAROUSEL_DOWN = 72;
const SIDE_REVEAL_RATIO = 0.20;
const KNOWLEDGE_BASE_SCREEN = "/images/page0d/knowledge-base-full.png";

type PanelDef = {
  view: "landing" | "library" | "graph" | "agent";
  ratio: number;
  title: string;
  desc: string;
  gradient: [string, string, string];
  accent: string;
  deco: "academic" | "upload" | "wiki" | "apps" | "multimodal";
  dark?: boolean;
};

const PANELS: PanelDef[] = [
  {
    view: "landing",
    ratio: DESIGN_W / DESIGN_H,
    title: "海量的学术资料",
    desc: "3000w+公开论文与自有知识库数据",
    gradient: ["#f9b552", "#ffd777", "#f9b552"],
    accent: "#f9b552",
    deco: "academic",
  },
  {
    view: "library",
    ratio: DESIGN_W / DESIGN_H,
    title: "多格式文件上传",
    desc: "文档/图片/视频/表格/git仓库等格式导入",
    gradient: ["#408c33", "#66b226", "#26664d"],
    accent: "#66b226",
    deco: "upload",
  },
  {
    view: "graph",
    ratio: DESIGN_W / DESIGN_H,
    title: "Wiki图谱知识编译",
    desc: "基于LLM Wiki架构构建结构化知识",
    gradient: ["#2699e5", "#33e5d9", "#2699e5"],
    accent: "#2699e5",
    deco: "wiki",
  },
  {
    view: "agent",
    ratio: DESIGN_W / DESIGN_H,
    title: "第三方应用集成",
    desc: "已支持网盘、飞书、钉钉、语雀文档",
    gradient: ["#8c59bf", "#b273d9", "#59338c"],
    accent: "#b273d9",
    deco: "apps",
  },
];

function CarouselPanelContent({ view }: { view: PanelDef["view"] }) {
  if (view === "library") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: DESIGN_W,
          height: DESIGN_H,
          overflow: "hidden",
          background: "#f8f8f8",
        }}
      >
        <img
          src={KNOWLEDGE_BASE_SCREEN}
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
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 340,
            top: 756,
            zIndex: 2,
            width: 840,
            height: 144,
            background: "#f8f8f8",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 0,
            top: 820,
            zIndex: 2,
            width: 164,
            height: 80,
            background: "#f8f8f8",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 360,
            top: 799,
            zIndex: 3,
            width: 800,
            pointerEvents: "auto",
          }}
        >
          <KnowledgeBaseSpotlight />
        </div>
      </div>
    );
  }

  if (view === "graph") {
    return <SlidePage0e embedded />;
  }

  return <SlidePage0 initialView={view} />;
}

type RuntimePanel = {
  x: number;
  y: number;
  w: number;
  h: number;
  texture: WebGLTexture;
  index: number;
};

type RuntimeState = {
  width: number;
  height: number;
  dpr: number;
  x: number;
  trackWidth: number;
  top: number;
  bodyHeight: number;
  panels: RuntimePanel[];
  lastTime: number;
  raf: number;
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawDotField(ctx: CanvasRenderingContext2D, w: number, h: number, accent: string) {
  const gradient = ctx.createRadialGradient(w * 0.72, h * 0.42, 40, w * 0.72, h * 0.42, w * 0.75);
  gradient.addColorStop(0, "rgba(255,255,255,0.92)");
  gradient.addColorStop(0.38, "rgba(255,255,255,0.45)");
  gradient.addColorStop(1, "rgba(8,12,18,0.05)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = accent;
  for (let i = 0; i < 560; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.58) * w * 0.52;
    const x = w * 0.68 + Math.cos(a) * r;
    const y = h * 0.46 + Math.sin(a) * r * 0.58;
    const size = 1.2 + Math.random() * 3.2;
    ctx.globalAlpha = 0.08 + Math.random() * 0.34;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function shadowRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
  fill: string | CanvasGradient, shadowColor = "rgba(15,23,42,0.10)", blur = 24, oy = 6,
) {
  ctx.save();
  ctx.shadowColor  = shadowColor;
  ctx.shadowBlur   = blur;
  ctx.shadowOffsetY = oy;
  ctx.fillStyle = fill;
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.restore();
}

function tag(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, bg: string, fg = "#111827") {
  ctx.font = "600 22px Arial, sans-serif";
  const tw = ctx.measureText(text).width;
  const pw = tw + 32, ph = 44;
  ctx.fillStyle = bg;
  roundRect(ctx, x, y, pw, ph, ph / 2);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.fillText(text, x + 16, y + 29);
}

// Panel background colors matched to each SlidePage0 view background
const PANEL_BG: Record<string, string> = {
  landing: "#f8f8f8",
  library: "#f7fbf4",
  graph:   "#f5fdff",
  agent:   "#fbf7ff",
};

function createPanelCanvas(panel: PanelDef): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = DESIGN_W;
  canvas.height = DESIGN_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  // Match each view's actual background — no white flash, no fake gradients
  ctx.fillStyle = PANEL_BG[panel.view] ?? "#f8f8f8";
  ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
  return canvas;
}


function drawFrameDecoration(ctx: CanvasRenderingContext2D, panel: PanelDef, w: number, h: number) {
  ctx.save();
  ctx.globalAlpha = panel.dark ? 0.16 : 0.22;
  ctx.fillStyle = "#fff";
  if (panel.deco === "wiki") {
    ctx.translate(w * 0.63, 12);
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(i * 35, i % 2 ? 52 : 24, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    const startX = panel.deco === "upload" ? w * 0.58 : w * 0.52;
    const startY = panel.deco === "multimodal" ? -12 : 8;
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 11; x++) {
        ctx.beginPath();
        ctx.arc(startX + x * 24, startY + y * 24, 5.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.restore();

  const glow = ctx.createRadialGradient(w * 0.72, h * 0.22, 10, w * 0.72, h * 0.22, w * 0.42);
  glow.addColorStop(0, "rgba(255,255,255,0.22)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h * 0.5);
}

function drawInnerFrame(ctx: CanvasRenderingContext2D, panel: PanelDef, x: number, y: number, w: number, h: number) {
  const bg = panel.dark ? "#11131a" : "rgba(255,255,255,0.92)";
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);

  if (panel.deco === "academic") {
    drawAcademicFrame(ctx, x, y, w, h);
  } else if (panel.deco === "upload") {
    drawUploadFrame(ctx, x, y, w, h);
  } else if (panel.deco === "wiki") {
    drawWikiFrame(ctx, x, y, w, h);
  } else if (panel.deco === "apps") {
    drawAppsFrame(ctx, x, y, w, h);
  } else {
    drawMultimodalFrame(ctx, x, y, w, h);
  }
}

function drawAcademicFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = "#f9fafb";
  ctx.fillRect(x, y, w, h);
  for (let i = 0; i < 4; i++) {
    const cy = y + 78 + i * 142;
    shadowRect(ctx, x + 54, cy, w - 108, 98, 18, "#fff", "rgba(15,23,42,0.08)", 18, 4);
    ctx.fillStyle = ["#dbeafe", "#dcfce7", "#fef3c7", "#fee2e2"][i];
    roundRect(ctx, x + 82, cy + 22, 56, 56, 14);
    ctx.fill();
    ctx.fillStyle = "#111827";
    ctx.font = "700 24px Arial, sans-serif";
    ctx.fillText(["论文数据库", "团队知识库", "引用溯源", "自动摘要"][i], x + 162, cy + 24);
    ctx.fillStyle = "rgba(17,24,39,0.45)";
    ctx.font = "400 18px Arial, sans-serif";
    ctx.fillText(["30M+ 文献索引", "跨项目归档", "来源可信", "结构化生成"][i], x + 162, cy + 60);
  }
}

function drawUploadFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = "#f7fbf4";
  ctx.fillRect(x, y, w, h);
  const items = ["PDF", "DOC", "PNG", "CSV", "Git", "URL"];
  items.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = x + 72 + col * 332;
    const cy = y + 76 + row * 156;
    shadowRect(ctx, cx, cy, 270, 112, 18, "rgba(255,255,255,0.86)", "rgba(22,101,52,0.10)", 18, 3);
    ctx.fillStyle = "#66b226";
    ctx.font = "800 26px Arial, sans-serif";
    ctx.fillText(item, cx + 24, cy + 35);
    ctx.fillStyle = "rgba(15,23,42,0.42)";
    ctx.font = "400 18px Arial, sans-serif";
    ctx.fillText("拖拽入库", cx + 24, cy + 72);
  });
  ctx.strokeStyle = "rgba(102,178,38,0.32)";
  ctx.setLineDash([12, 12]);
  ctx.lineWidth = 4;
  roundRect(ctx, x + 72, y + h - 170, w - 144, 116, 20);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawWikiFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = "#f5fdff";
  ctx.fillRect(x, y, w, h);
  const nodes = [
    [0.50, 0.22, "Wiki", "#2699e5"],
    [0.26, 0.38, "资料", "#33e5d9"],
    [0.74, 0.40, "节点", "#60a5fa"],
    [0.36, 0.62, "溯源", "#22c55e"],
    [0.64, 0.66, "输出", "#a855f7"],
  ] as const;
  ctx.strokeStyle = "rgba(38,153,229,0.22)";
  ctx.lineWidth = 3;
  nodes.slice(1).forEach(([nx, ny]) => {
    ctx.beginPath();
    ctx.moveTo(x + w * nodes[0][0], y + h * nodes[0][1]);
    ctx.lineTo(x + w * nx, y + h * ny);
    ctx.stroke();
  });
  nodes.forEach(([nx, ny, label, color]) => {
    const cx = x + w * nx;
    const cy = y + h * ny;
    shadowRect(ctx, cx - 70, cy - 34, 140, 68, 34, "#fff", "rgba(38,153,229,0.14)", 18, 3);
    ctx.fillStyle = color;
    ctx.font = "700 22px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, cx, cy + 8);
    ctx.textAlign = "left";
  });
}

function drawAppsFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = "#fbf7ff";
  ctx.fillRect(x, y, w, h);
  const apps = ["飞书", "钉钉", "语雀", "网盘", "Notion", "Slack"];
  apps.forEach((app, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = x + 74 + col * 332;
    const cy = y + 76 + row * 150;
    shadowRect(ctx, cx, cy, 270, 106, 22, "#fff", "rgba(89,51,140,0.12)", 18, 3);
    ctx.fillStyle = ["#8c59bf", "#b273d9", "#59338c"][i % 3];
    ctx.beginPath();
    ctx.arc(cx + 48, cy + 53, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1f1630";
    ctx.font = "700 24px Arial, sans-serif";
    ctx.fillText(app, cx + 88, cy + 47);
    ctx.fillStyle = "rgba(31,22,48,0.42)";
    ctx.font = "400 17px Arial, sans-serif";
    ctx.fillText("同步连接", cx + 88, cy + 76);
  });
}

function drawMultimodalFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = "#11131a";
  ctx.fillRect(x, y, w, h);
  const items = [
    ["报告", "#f97316"],
    ["视频", "#ec4899"],
    ["脑图", "#22c55e"],
    ["PPT", "#60a5fa"],
  ];
  items.forEach(([label, color], i) => {
    const cy = y + 82 + i * 128;
    shadowRect(ctx, x + 64, cy, w - 128, 88, 18, "rgba(255,255,255,0.08)", "rgba(0,0,0,0.20)", 20, 4);
    ctx.fillStyle = color;
    roundRect(ctx, x + 86, cy + 20, 10, 48, 5);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "700 25px Arial, sans-serif";
    ctx.fillText(label, x + 124, cy + 34);
    ctx.fillStyle = "rgba(255,255,255,0.42)";
    ctx.font = "400 17px Arial, sans-serif";
    ctx.fillText("由知识库自动生成", x + 124, cy + 64);
  });
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compile failed");
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create WebGL program");
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Program link failed");
  }
  return program;
}

function buildGrid(x: number, y: number, w: number, h: number, cols = 120, rows = 48) {
  const vertices: number[] = [];
  const indices: number[] = [];
  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const u = col / cols;
      const v = row / rows;
      vertices.push(x + u * w, y + v * h, u, v);
    }
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const a = row * (cols + 1) + col;
      const b = a + 1;
      const c = a + cols + 1;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  };
}

function getEdgeWidth(width: number, scaleX: number) {
  return Math.min(EDGE_MAX * scaleX, Math.max(EDGE_MIN * scaleX, width * EDGE_RATIO));
}

/* ── V22 Vertex Shader — strong geometric edge curl ────────────────────────
   Calibrated to 1440×900 design canvas (same as the reference preview.html).
   Starts from V22 reference values, then increases vertical participation.
   ─────────────────────────────────────────────────────────────────────────── */
const vertexShader = `
  attribute vec2 a_pos;
  attribute vec2 a_uv;
  uniform vec2 u_res;
  uniform float u_edge;
  uniform float u_top;
  uniform float u_bh;
  varying vec2 v_uv;
  varying float v_edge;
  varying float v_side;
  varying float v_ycurl;

  void main() {
    vec2 p = a_pos;
    float leftEdge  = 1.0 - smoothstep(0.0, u_edge, p.x);
    float rightEdge = smoothstep(u_res.x - u_edge, u_res.x, p.x);
    float e    = max(leftEdge, rightEdge);
    float side = rightEdge - leftEdge;

    /* Curl starts almost immediately (0.015) — matches V22 reference */
    float curl = smoothstep(0.015, 1.0, e);
    curl = pow(curl, 1.06);
    float bend = curl * curl;

    float yNorm        = clamp((p.y - u_top) / u_bh, 0.0, 1.0);
    /* Continuous gradient: full deformation at the top, easing to none at the
       bottom so the lower part of each card stays visually normal. */
    float topMask      = pow(1.0 - yNorm, 1.5);
    float topInfluence = pow(1.0 - yNorm, 1.16);
    float centerPull   = sin(yNorm * 3.14159265);
    float fold         = bend * topMask;
    float topCurl      = bend * topInfluence;
    float midPull      = fold * centerPull;

    /* Horizontal inward compression — media "wraps" around the edge (softened) */
    p.x += side * (34.0 * fold + 104.0 * fold * fold + centerPull * 38.0 * fold);

    /* Vertical curl — kept low so the fold does not climb up the canvas */
    p.y -= (36.0 * fold + 116.0 * topCurl + 16.0 * midPull);

    /* Vertical stretch around gallery top — perspective foreshortening (low) */
    float yScale = 1.0 + 0.14 * fold + 0.05 * topCurl;
    p.y = u_top + (p.y - u_top) * yScale;

    vec2 clip = (p / u_res) * 2.0 - 1.0;
    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    v_uv  = a_uv;
    v_edge = curl * topMask;
    v_side = side;
    v_ycurl = clamp(topCurl + midPull * 0.55, 0.0, 1.0);
  }
`;

/* ── V22 Fragment Shader — strong CA, warm fold tint ───────────────────────
   Stronger chromatic aberration, UV warp, vertical fold shading, and a
   warm purple tint on the fold face to match V22 reference aesthetics.
   ─────────────────────────────────────────────────────────────────────────── */
const fragmentShader = `
  precision mediump float;
  uniform sampler2D u_tex;
  varying vec2 v_uv;
  varying float v_edge;
  varying float v_side;
  varying float v_ycurl;

  void main() {
    float e = smoothstep(0.05, 1.0, v_edge);
    float ycurl = smoothstep(0.0, 1.0, v_ycurl);
    vec2 uv = v_uv;

    /* UV warp — content distorts as it wraps around the edge (softened) */
    uv.x += v_side * (0.030 * e + 0.062 * e * e);
    uv.y += sin(uv.y * 3.14159265) * (0.038 * e + 0.016 * ycurl);

    /* Chromatic aberration — prism split on the fold face (reduced fringe) */
    float rgb = pow(max(e, ycurl * 0.82), 1.62);
    vec2 off  = vec2(0.013 * rgb * sign(v_side + 0.0001), 0.0);
    vec4 r = texture2D(u_tex, uv + off);
    vec4 g = texture2D(u_tex, uv);
    vec4 b = texture2D(u_tex, uv - off);
    vec4 col = vec4(r.r, g.g, b.b, g.a);

    /* Edge and vertical fold darkening */
    col.rgb *= mix(1.0, 0.56, e * 0.68);
    col.rgb *= mix(1.0, 0.76, ycurl * 0.34);

    /* Warm purple-shifted specular on the fold face (softened) */
    col.rgb = mix(col.rgb, col.rgb * vec3(1.16, 1.06, 1.28), rgb * 0.50);

    gl_FragColor = col;
  }
`;

const LOOP_PANELS = [...PANELS, ...PANELS];

function shouldUseStableFallback() {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const slowConnection = nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType ?? "");
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  /* Safari (especially iOS/iPadOS) intentionally caps hardwareConcurrency at a
     low fixed value (~2-4) for anti-fingerprinting, so it is NOT a reliable
     performance signal there — even M-series iPad Pros report 4. Only treat
     core count as a signal on non-Safari engines, and use a stricter <=2 bar. */
  const isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(navigator.userAgent);
  const lowCoreCount =
    !isSafari &&
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency <= 2;
  return Boolean(reducedMotion || slowConnection || lowMemory || lowCoreCount);
}

function StableCarouselFallback() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 330,
        bottom: 44,
        zIndex: 10,
        overflowX: "auto",
        overflowY: "hidden",
        scrollbarWidth: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "stretch",
          width: "max-content",
          height: "100%",
          padding: "0 72px",
        }}
      >
        {PANELS.map((panel) => {
          const cardW = 880;
          const scale = cardW / DESIGN_W;
          return (
            <div
              key={panel.view}
              style={{
                position: "relative",
                width: cardW,
                height: "100%",
                flex: "0 0 auto",
                overflow: "hidden",
                borderRadius: 28,
                background: PANEL_BG[panel.view] ?? "#f8f8f8",
                boxShadow: "0 22px 70px rgba(0,0,0,0.28)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: DESIGN_W,
                  height: DESIGN_H,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <CarouselPanelContent view={panel.view} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function EdgeCurlCanvasCarousel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const domWrapRef = useRef<HTMLDivElement>(null);
  // Only mount center panel immediately; mount remaining panels after 800ms
  const [allPanelsMounted, setAllPanelsMounted] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setAllPanelsMounted(true), 800);
    return () => window.clearTimeout(timer);
  }, []);
  const domTrackRef = useRef<HTMLDivElement>(null);
  const domCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const domScalerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const runtimeRef = useRef<RuntimeState | null>(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, lastX: 0, velocityX: 0, momentumX: 0, lastTime: 0 });
  const didCenterInitialPanelRef = useRef(false);
  const [useStableFallback, setUseStableFallback] = useState(false);

  useEffect(() => {
    if (shouldUseStableFallback()) {
      setUseStableFallback(true);
    }
  }, []);

  useEffect(() => {
    if (useStableFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });
    if (!gl) {
      setUseStableFallback(true);
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    const locations = {
      position: gl.getAttribLocation(program, "a_pos"),
      uv: gl.getAttribLocation(program, "a_uv"),
      resolution: gl.getUniformLocation(program, "u_res"),
      edge: gl.getUniformLocation(program, "u_edge"),
      top: gl.getUniformLocation(program, "u_top"),
      bodyHeight: gl.getUniformLocation(program, "u_bh"),
      texture: gl.getUniformLocation(program, "u_tex"),
    };
    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    let disposed = false;

    const textures = PANELS.map((panel) => {
      const texture = gl.createTexture();
      if (!texture) throw new Error("Unable to create texture");
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, createPanelCanvas(panel));
      return texture;
    });

    // Wait for all <img> elements in a DOM node to finish loading
    const waitForImages = (root: HTMLElement): Promise<void> => {
      const imgs = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
      const pending = imgs.filter((img) => !img.complete);
      if (pending.length === 0) return Promise.resolve();
      return Promise.all(
        pending.map(
          (img) =>
            new Promise<void>((resolve) => {
              img.onload = img.onerror = () => resolve();
            }),
        ),
      ).then(() => undefined);
    };

    // Capture real SlidePage0 frames into WebGL textures in parallel (no artificial delay)
    const updateTexturesFromSlideFrames = async () => {
      await document.fonts?.ready;
      if (disposed) return;
      // Ensure all images inside every frame have loaded before html-to-image captures them
      await Promise.all(
        frameRefs.current.map((frame) => (frame ? waitForImages(frame) : Promise.resolve())),
      );
      if (disposed) return;
      /* WebKit (Safari/iPadOS) has a long-standing bug where the first
         SVG-foreignObject rasterisation returns before images/fonts inside it
         are decoded, producing a blank or partial capture. The standard
         workaround is to capture multiple times and keep the last result. */
      const isWebKit =
        typeof navigator !== "undefined" &&
        /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(navigator.userAgent);
      const capturePasses = isWebKit ? 3 : 1;
      await Promise.all(
        frameRefs.current.map(async (frame, index) => {
          if (!frame || !textures[index]) return;
          try {
            let sourceCanvas: HTMLCanvasElement | null = null;
            for (let pass = 0; pass < capturePasses; pass++) {
              sourceCanvas = await toCanvas(frame, {
                width: DESIGN_W,
                height: DESIGN_H,
                pixelRatio: 1,
                cacheBust: false,
                backgroundColor: PANEL_BG[PANELS[index].view] ?? "#f8f8f8",
              });
              if (disposed) return;
            }
            if (!sourceCanvas) return;
            gl.bindTexture(gl.TEXTURE_2D, textures[index]);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
          } catch {
            // Silently ignore capture failures — initial bg color stays
          }
        }),
      );
    };

    const state: RuntimeState = {
      width: 0,
      height: 0,
      dpr: 1,
      x: 0,
      trackWidth: 0,
      top: 0,
      bodyHeight: 0,
      panels: [],
      lastTime: performance.now(),
      raf: 0,
    };
    runtimeRef.current = state;

    const layout = () => {
      /* The carousel canvas always occupies the fixed 1440×900 design box
         (its parent is the slide-canvas; any viewport adaptation is handled by
         the ancestor CSS `transform: scale(--slide-fit-scale)`). So the logical
         render size is ALWAYS the design size. We must never feed it the
         transform-scaled getBoundingClientRect width — doing so pollutes the
         design-space geometry and breaks layout on resize. */
      const width = Math.max(1, canvas.clientWidth || DESIGN_W);
      const height = Math.max(1, canvas.clientHeight || DESIGN_H);
      /* Cap the backing store independently from CSS scale. This avoids multi-
         megapixel redraws on Retina iPads and 4K displays. */
      const touchPrimary = window.matchMedia("(pointer: coarse)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, touchPrimary ? 1.25 : 1.5);
      state.width = width;
      state.height = height;
      state.dpr = dpr;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);

      const scaleY = height / DESIGN_H;

      /* ── Panel geometry — mirrors the official sizing system ─────────────
         bh = min(70% of height, height − header)
         card height = bh
         card width = height × aspect-ratio
         top = height − bh − footer
      ───────────────────────────────────────────────────────────────────── */
      const revealW = width * SIDE_REVEAL_RATIO;
      const maxPanelW = Math.max(width - revealW * 2, width * 0.56);
      const bh = Math.min(height * 0.70, height - HEADER_H * scaleY, maxPanelW / PANELS[0].ratio);
      const top = height - bh - FOOTER_H * scaleY + CAROUSEL_DOWN * scaleY;
      state.top = Math.max(80 * scaleY, top);
      state.bodyHeight = bh;

      const scaleX = width / DESIGN_W;
      const gap = GAP * scaleX;
      let x = 8 * scaleX;
      state.panels = [];

      /* Duplicate panels for seamless infinite loop */
      [...PANELS, ...PANELS].forEach((panel, index) => {
        const h = bh;
        const w = h * panel.ratio;
        state.panels.push({
          x,
          y: state.top,
          w,
          h,
          texture: textures[index % textures.length],
          index: index % PANELS.length,
        });
        x += w + gap;
      });
      state.trackWidth = x;

      if (!didCenterInitialPanelRef.current && state.panels[1] && width >= DESIGN_W * 0.5) {
        const centerPanel = state.panels[1];
        state.x = width / 2 - (centerPanel.x + centerPanel.w / 2);
        didCenterInitialPanelRef.current = true;
      }

      /* ── Live DOM overlay — real SlidePage0 frames in the flat centre ──────
         Mirrors the exact WebGL panel geometry. The left/right edge windows
         stay transparent (CSS mask) so the WebGL curl shows through there,
         while the crisp, real frame fills the undeformed centre band. ─────── */
      const edge = getEdgeWidth(width, scaleX);
      const wrap = domWrapRef.current;
      if (wrap) {
        wrap.style.top = `${state.top}px`;
        wrap.style.height = `${bh}px`;
        /* DOM stays fully transparent across the strong-curl band [0, ~edge],
           so that zone shows ONLY the (single-layer) deformed WebGL. The fade
           to opaque happens further in, where the card is already near-flat —
           this removes the double-text ghosting at the fold. */
        const mask =
          `linear-gradient(to right,` +
          ` rgba(0,0,0,0) 0,` +
          ` rgba(0,0,0,0) ${edge * 0.35}px,` +
          ` #000 ${edge * 0.85}px,` +
          ` #000 calc(100% - ${edge * 0.85}px),` +
          ` rgba(0,0,0,0) calc(100% - ${edge * 0.35}px),` +
          ` rgba(0,0,0,0) 100%)`;
        wrap.style.webkitMaskImage = mask;
        wrap.style.maskImage = mask;
      }

      const scale = bh / DESIGN_H;
      state.panels.forEach((panel, i) => {
        const card = domCardRefs.current[i];
        if (card) {
          card.style.left = `${panel.x}px`;
          card.style.width = `${panel.w}px`;
          card.style.height = `${panel.h}px`;
        }
        const scaler = domScalerRefs.current[i];
        if (scaler) scaler.style.transform = `scale(${scale})`;
      });
    };

    const drawPanel = (panel: RuntimePanel) => {
      const sx = panel.x + state.x;
      const edge = getEdgeWidth(state.width, state.width / DESIGN_W);
      /* Cull panels that are beyond the visible + curl-overscan window */
      if (sx + panel.w < -edge * 2.5 || sx > state.width + edge * 2.5) return;

      const grid = buildGrid(sx, panel.y, panel.w, panel.h);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, grid.vertices, gl.STREAM_DRAW);
      gl.enableVertexAttribArray(locations.position);
      gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(locations.uv);
      gl.vertexAttribPointer(locations.uv, 2, gl.FLOAT, false, 16, 8);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, grid.indices, gl.STREAM_DRAW);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, panel.texture);
      gl.uniform1i(locations.texture, 0);
      gl.drawElements(gl.TRIANGLES, grid.indices.length, gl.UNSIGNED_SHORT, 0);
    };

    let pageVisible = !document.hidden;
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      state.lastTime = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibilityChange, { passive: true });

    const render = (now: number) => {
      if (!pageVisible) {
        state.raf = requestAnimationFrame(render);
        return;
      }
      const delta = Math.min(64, now - state.lastTime) / 1000;
      state.lastTime = now;
      const drag = dragRef.current;
      if (!drag.active) {
        /* Post-drag momentum — decelerates until velocity is negligible */
        if (Math.abs(drag.momentumX) > 0.3) {
          state.x += drag.momentumX;
          drag.momentumX *= 0.90;
        } else {
          drag.momentumX = 0;
          /* Auto-scroll only when not hovered / no active drag */
          if (!pausedRef.current) state.x -= SPEED * (state.width / DESIGN_W) * delta;
        }
      }
      /* (while drag.active, state.x is updated directly by pointer handlers) */
      const loopWidth = state.trackWidth / 2;
      if (loopWidth > 0 && Math.abs(state.x) > loopWidth) state.x += loopWidth;

      /* Must be (0,0,0,0): with premultipliedAlpha the RGB components may not
         exceed alpha. (1,1,1,0) is an illegal premultiplied colour — Chrome
         forgives it, but Safari/WebKit composites it as opaque WHITE, painting
         the whole slide background white on iPad. */
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(locations.resolution, state.width, state.height);
      gl.uniform1f(locations.edge, getEdgeWidth(state.width, state.width / DESIGN_W));
      gl.uniform1f(locations.top, state.top);
      gl.uniform1f(locations.bodyHeight, state.bodyHeight);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      state.panels.forEach(drawPanel);

      /* Keep the live DOM overlay perfectly aligned with the WebGL scroll. */
      const track = domTrackRef.current;
      if (track) track.style.transform = `translateX(${state.x}px)`;

      state.raf = requestAnimationFrame(render);
    };

    layout();
    /* Re-measure across the next few frames + a couple timeouts so the initial
       0-clientWidth / pre-fit-settle transient self-corrects without needing a
       manual resize (covers font-swap, dvh settling, fit-scale RAF retries). */
    const retryRafs = [
      requestAnimationFrame(layout),
      requestAnimationFrame(() => requestAnimationFrame(layout)),
    ];
    const retryTimers = [
      window.setTimeout(layout, 120),
      window.setTimeout(layout, 500),
    ];
    state.raf = requestAnimationFrame(render);
    void updateTexturesFromSlideFrames();
    const observer = new ResizeObserver(layout);
    observer.observe(canvas);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    /* The canvas's own layout box never changes (design space), so also watch
       the document root to catch ancestor fit-scale / preview-pane resizes. */
    observer.observe(document.documentElement);
    window.addEventListener("resize", layout, { passive: true });
    window.visualViewport?.addEventListener("resize", layout);

    return () => {
      disposed = true;
      cancelAnimationFrame(state.raf);
      retryRafs.forEach((id) => cancelAnimationFrame(id));
      retryTimers.forEach((id) => clearTimeout(id));
      observer.disconnect();
      window.removeEventListener("resize", layout);
      window.visualViewport?.removeEventListener("resize", layout);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      textures.forEach((texture) => gl.deleteTexture(texture));
      gl.deleteProgram(program);
      if (vertexBuffer) gl.deleteBuffer(vertexBuffer);
      if (indexBuffer) gl.deleteBuffer(indexBuffer);
    };
  }, [useStableFallback]);

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
      {useStableFallback && <StableCarouselFallback />}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: useStableFallback ? "none" : "block",
        }}
      />

      {/* ── Live DOM overlay: real SlidePage0 frames in the flat centre ──────
          Positioned/scrolled to match the WebGL panels; edges masked out so
          the WebGL curl remains the only thing visible on the two sides. ──── */}
      <div
        ref={domWrapRef}
        onPointerEnter={() => { pausedRef.current = true; }}
        onPointerLeave={() => { if (!dragRef.current.active) pausedRef.current = false; }}
        onPointerDown={(e) => {
          const drag = dragRef.current;
          drag.active = true;
          drag.lastX = e.clientX;
          drag.velocityX = 0;
          drag.momentumX = 0;
          drag.lastTime = performance.now();
          pausedRef.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          (e.currentTarget as HTMLElement).style.cursor = "grabbing";
        }}
        onPointerMove={(e) => {
          const drag = dragRef.current;
          if (!drag.active || !runtimeRef.current || !canvasRef.current) return;
          const rect = canvasRef.current.getBoundingClientRect();
          const designWidth = runtimeRef.current.width || DESIGN_W;
          const cssScale = rect.width > 0 ? rect.width / designWidth : 1;
          const dxDesign = (e.clientX - drag.lastX) / cssScale;
          const now = performance.now();
          const dt = now - drag.lastTime;
          if (dt > 0) drag.velocityX = dxDesign / dt;
          drag.lastTime = now;
          drag.lastX = e.clientX;
          runtimeRef.current.x += dxDesign;
        }}
        onPointerUp={(e) => {
          const drag = dragRef.current;
          drag.active = false;
          drag.momentumX = drag.velocityX * 16; // velocity (px/ms) → momentum (px/frame @60fps)
          pausedRef.current = false;
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
          (e.currentTarget as HTMLElement).style.cursor = "grab";
        }}
        onPointerCancel={(e) => {
          dragRef.current.active = false;
          dragRef.current.momentumX = 0;
          pausedRef.current = false;
          (e.currentTarget as HTMLElement).style.cursor = "grab";
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: useStableFallback ? "none" : "auto",
          zIndex: 2,
          cursor: "grab",
          /* Without this, iPad Safari treats the touch as a page pan and fires
             pointercancel — the carousel would be un-draggable on touch. */
          touchAction: "none",
          display: useStableFallback ? "none" : undefined,
        }}
      >
        <div ref={domTrackRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          {LOOP_PANELS.map((panel, index) => (
            <div
              key={`${panel.view}-${index}`}
              ref={(node) => {
                domCardRefs.current[index] = node;
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                overflow: "hidden",
              }}
            >
              <div
                ref={(node) => {
                  domScalerRefs.current[index] = node;
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: DESIGN_W,
                  height: DESIGN_H,
                  transformOrigin: "top left",
                }}
              >
                <div
                  ref={
                    index < PANELS.length
                      ? (node) => { frameRefs.current[index] = node; }
                      : undefined
                  }
                  style={{ position: "absolute", inset: 0, width: DESIGN_W, height: DESIGN_H }}
                >
                  {/* Center panel (index 0) mounts immediately; others wait 800ms */}
                  {(index === 0 || allPanelsMounted) && (
                    <CarouselPanelContent view={panel.view} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
