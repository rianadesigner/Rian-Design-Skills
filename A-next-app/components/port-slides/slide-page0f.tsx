"use client";

import { useState } from "react";
import {
  FileOutput,
  Files,
  MessageSquareText,
  SlidersHorizontal,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const FONT = "'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif";
const FONT_TITLE =
  "'LogoSC Unbounded Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif";
const FONT_EN = "Impact, 'Arial Black', sans-serif";

type InteractionStep = {
  label: string;
  mode: "首页" | "窗口" | "配置" | "过程" | "交付";
  title: string;
  actor: string;
  trigger: string;
  response: string;
  handoff: string;
  principle: string;
  Icon: LucideIcon;
  view: "agent" | "editor";
};

const STEPS: InteractionStep[] = [
  {
    label: "用户输入&上传",
    mode: "首页",
    title: "首页：用户输入 & 上传",
    actor: "首次 / 轻量用户",
    trigger: "上传文件、粘贴网页或接入应用，也可以直接输入任务目标。",
    response: "中间区域承接资料导入；右侧输入框与快捷创作将意图转换为任务。",
    handoff: "上传后保留来源范围；输入目标或选择快捷产物即可启动 Agent。",
    principle: "首页同时服务“先给资料”和“先说目标”两种自然起点。",
    Icon: MessageSquareText,
    view: "agent",
  },
  {
    label: "多文件窗口预览",
    mode: "窗口",
    title: "多文件窗口预览",
    actor: "多资料浏览 / 对比用户",
    trigger: "从来源列表连续打开 PDF、Word、网页等多个资料。",
    response: "每个文件进入独立窗口标签，支持切换、缩放、下载和阅读位置保持。",
    handoff: "当前窗口和选区可直接交给 Agent，其他文件继续保留在任务空间。",
    principle: "让资料保持可见、可切换、可调用，不被对话历史淹没。",
    Icon: Files,
    view: "editor",
  },
  {
    label: "生成配置",
    mode: "配置",
    title: "生成配置：引入用户记忆",
    actor: "内容创作 / 复用用户",
    trigger: "选择产物风格、页数与比例，并描述本次内容目标。",
    response: "生成前汇总本次参数，并引入用户背景与偏好记忆调整创作方向。",
    handoff: "用户可保存、关闭或停用记忆；确认配置后进入 PPT 生成。",
    principle: "让长期偏好参与创作，但始终保持可见、可控和可撤销。",
    Icon: SlidersHorizontal,
    view: "agent",
  },
  {
    label: "思考过程",
    mode: "过程",
    title: "思考过程：任务进度图形化",
    actor: "复杂任务 / 深度研究用户",
    trigger: "用户确认生成后，Agent 进入任务规划、检索、分析与内容生成。",
    response: "中央状态图展示当前生成阶段，右侧时间线同步呈现步骤、耗时与证据。",
    handoff: "所有阶段完成后自动生成产物窗口；异常可回溯到对应阶段继续处理。",
    principle: "展示可验证的执行状态与来源，不暴露冗长的内部推理文本。",
    Icon: Workflow,
    view: "agent",
  },
  {
    label: "多格式交付",
    mode: "交付",
    title: "多格式交付：PPT 可交互预览",
    actor: "协作 / 交付用户",
    trigger: "生成任务完成后，用户打开 PPT、报告或其他结构化产物。",
    response: "PPT 在内容窗口中支持直接编辑、下载文件，以及按需调整画布大小。",
    handoff: "操作后的版本与结果卡保持关联，可继续编辑或切换其他交付格式。",
    principle: "让 PPT 成为可操作、可调整、可继续交付的工作成果。",
    Icon: FileOutput,
    view: "editor",
  },
];

const SHARED_CONTEXT = [
  "项目上下文",
  "来源范围",
  "引用关系",
  "任务历史",
  "版本记录",
  "权限协作",
];

const DEMO_HEIGHT = 560;
const DEMO_LABEL_HEIGHT = 30;
const DEMO_CONTENT_HEIGHT = DEMO_HEIGHT - DEMO_LABEL_HEIGHT;
const FIGMA_HOME_IMAGE = "/images/page0/figma-home-input-v2.png";
const FIGMA_MULTI_FILE_WINDOW_IMAGE =
  "/images/page0/figma-multi-file-window-v2.png";
const FIGMA_GENERATION_CONFIG_IMAGE =
  "/images/page0/figma-generation-config.png";
const FIGMA_THINKING_PROCESS_IMAGE =
  "/images/page0/figma-thinking-process.webp";
const FIGMA_MULTI_FORMAT_DELIVERY_IMAGE =
  "/images/page0/figma-multi-format-delivery.webp";
const FIGMA_SOURCE_WIDTH = 1440;
const FIGMA_SOURCE_HEIGHT = 968;
const FIGMA_SOURCE_SCALE = DEMO_CONTENT_HEIGHT / FIGMA_SOURCE_HEIGHT;
const SCALED_SOURCE_WIDTH = FIGMA_SOURCE_WIDTH * FIGMA_SOURCE_SCALE;
const SCALED_SOURCE_HEIGHT = FIGMA_SOURCE_HEIGHT * FIGMA_SOURCE_SCALE;
const DEMO_WIDTH = Math.ceil(SCALED_SOURCE_WIDTH);

function FlowStep({
  step,
  index,
  active,
  onSelect,
}: {
  step: InteractionStep;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = step.Icon;

  return (
    <button
      type="button"
      aria-pressed={active}
      title={step.title}
      onClick={onSelect}
      style={{
        position: "relative",
        width: "100%",
        height: 48,
        padding: "0 10px",
        gridColumn: index === STEPS.length - 1 ? "1 / -1" : undefined,
        border: active
          ? "1px solid rgba(224,38,38,0.9)"
          : "1px solid rgba(255,255,255,0.12)",
        borderRadius: 6,
        background: active
          ? "linear-gradient(180deg, rgba(132,10,10,0.34), rgba(33,6,6,0.58))"
          : "rgba(255,255,255,0.025)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        textAlign: "left",
        transition:
          "border-color 180ms ease-out, background 180ms ease-out, transform 180ms ease-out",
        transform: active ? "translateX(2px)" : "translateX(0)",
        boxShadow: active ? "0 10px 32px rgba(120,0,0,0.22)" : "none",
        fontFamily: FONT,
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          color: active ? "#ff5252" : "rgba(255,255,255,0.46)",
          background: active
            ? "rgba(224,38,38,0.12)"
            : "rgba(255,255,255,0.04)",
        }}
      >
        <Icon size={14} strokeWidth={1.8} />
      </span>
      <span style={{ minWidth: 0 }}>
        <span
          style={{
            display: "block",
            color: active ? "#ff5252" : "rgba(255,255,255,0.38)",
            fontFamily: FONT_EN,
            fontSize: 9,
            lineHeight: "10px",
          }}
        >
          0{index + 1} · {step.mode}
        </span>
        <span
          style={{
            display: "block",
            marginTop: 2,
            fontSize: 11,
            lineHeight: "15px",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {step.label}
        </span>
      </span>
    </button>
  );
}

function AgentOverlay({ phase }: { phase: number }) {
  if (phase === 0) {
    return (
      <>
        <Callout
          left={42}
          top={392}
          width={182}
          compact
          index="01"
          title="上传文件"
          body="文件、网页、仓库与第三方应用统一加入来源。"
        />
        <Callout
          left={600}
          top={112}
          width={166}
          compact
          index="02"
          title="快捷创作"
          body="基于已有来源快速生成报告、PPT 与思维导图。"
        />
        <Callout
          left={600}
          top={420}
          width={166}
          compact
          index="03"
          title="用户输入"
          body="输入研究目标与约束，一句话启动 Agent 任务。"
        />
      </>
    );
  }

  if (phase === 2) {
    return (
      <>
        <Callout
          left={190}
          top={104}
          width={174}
          compact
          index="01"
          title="生成参数"
          body="统一确认风格、内容、页数与画面比例。"
        />
        <Callout
          left={610}
          top={306}
          width={166}
          compact
          index="02"
          title="引入用户记忆"
          body="基于背景与偏好调整创作方向，并支持随时关闭。"
        />
      </>
    );
  }

  return null;
}

function FileViewOverlay() {
  return (
    <Callout
      left={42}
      top={400}
      index="02"
      title="多文件窗口实时预览"
      body="标签切换保留阅读位置、缩放和选区，跨资料对比不中断。"
    />
  );
}

function ThinkingOverlay() {
  return (
    <>
      <Callout
        left={270}
        top={452}
        width={184}
        compact
        index="01"
        title="中央生成状态"
        body="当前阶段与完成清单同步展示，任务进度持续可感知。"
      />
      <Callout
        left={610}
        top={466}
        width={162}
        compact
        index="02"
        title="右侧执行时间线"
        body="规划、检索、分析与生成按阶段反馈耗时和证据。"
      />
    </>
  );
}

function DeliveryOverlay() {
  return (
    <>
      <Callout
        left={214}
        top={406}
        width={190}
        compact
        index="01"
        title="PPT 交互操作"
        body="支持直接编辑、下载文件，并按需调整预览画布大小。"
      />
      <Callout
        left={610}
        top={206}
        width={162}
        compact
        index="02"
        title="结果卡持续关联"
        body="生成结果、来源范围与当前预览窗口始终保持关联。"
      />
    </>
  );
}

function Callout({
  left,
  top,
  width = 218,
  compact = false,
  index,
  title,
  body,
}: {
  left: number;
  top: number;
  width?: number;
  compact?: boolean;
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        padding: compact ? "10px 12px" : "14px 16px",
        borderLeft: "2px solid #e52626",
        background: "rgba(7,7,7,0.88)",
        color: "#fff",
        boxShadow: "0 16px 44px rgba(0,0,0,0.34)",
      }}
    >
      <div
        style={{
          color: "#ff5252",
          fontFamily: FONT_EN,
          fontSize: compact ? 9 : 10,
        }}
      >
        {index}
      </div>
      <strong
        style={{
          display: "block",
          marginTop: compact ? 4 : 6,
          fontSize: compact ? 10 : 11,
          lineHeight: compact ? "15px" : "17px",
        }}
      >
        {title}
      </strong>
      <span
        style={{
          display: "block",
          marginTop: compact ? 3 : 5,
          color: "rgba(255,255,255,0.5)",
          fontSize: compact ? 8 : 9,
          lineHeight: compact ? "13px" : "15px",
        }}
      >
        {body}
      </span>
    </div>
  );
}

function DemoViewport({
  step,
  activeIndex,
}: {
  step: InteractionStep;
  activeIndex: number;
}) {
  const sourceImageLeft = (DEMO_WIDTH - SCALED_SOURCE_WIDTH) / 2;
  const sourceImageTop = DEMO_LABEL_HEIGHT;
  const sourceImage =
    activeIndex === 0
      ? FIGMA_HOME_IMAGE
      : activeIndex === 1
        ? FIGMA_MULTI_FILE_WINDOW_IMAGE
        : activeIndex === 2
          ? FIGMA_GENERATION_CONFIG_IMAGE
          : activeIndex === 3
            ? FIGMA_THINKING_PROCESS_IMAGE
            : FIGMA_MULTI_FORMAT_DELIVERY_IMAGE;
  const sourceAlt =
    activeIndex === 0
      ? "知识库首页用户输入与上传界面"
      : activeIndex === 1
        ? "知识库多文件窗口预览界面"
        : activeIndex === 2
          ? "知识库生成配置与用户记忆界面"
          : activeIndex === 3
            ? "知识库图形化思考过程界面"
            : "知识库多格式交付与 PPT 交互预览界面";
  const workspaceLabel =
    activeIndex === 0
      ? "首页输入与上传 · FIGMA SOURCE"
      : activeIndex === 1
        ? "多文件窗口 · FIGMA SOURCE"
        : activeIndex === 2
          ? "生成配置 · FIGMA SOURCE"
          : activeIndex === 3
            ? "思考过程 · FIGMA SOURCE"
            : "多格式交付 · FIGMA SOURCE";

  return (
    <div
      className="demo-viewport"
      style={{
        position: "relative",
        width: DEMO_WIDTH,
        height: DEMO_HEIGHT,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 8,
        background:
          "radial-gradient(circle at 50% 35%, rgba(120,9,9,0.18), transparent 48%), #0b0b0b",
        boxShadow: "0 30px 80px rgba(0,0,0,0.44)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: DEMO_LABEL_HEIGHT,
          padding: "0 14px",
          boxSizing: "border-box",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(7,7,7,0.96)",
          color: "rgba(255,255,255,0.44)",
          fontSize: 9,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#e52626",
            boxShadow: "0 0 14px rgba(229,38,38,0.8)",
          }}
        />
        {workspaceLabel}
      </div>

      <div
        key={`${sourceImage}-${activeIndex}`}
        className="interaction-image-enter"
        style={{
          position: "absolute",
          left: sourceImageLeft,
          top: sourceImageTop,
          width: SCALED_SOURCE_WIDTH,
          height: SCALED_SOURCE_HEIGHT,
          pointerEvents: "none",
        }}
      >
        <img
          src={sourceImage}
          alt={sourceAlt}
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>

      <div
        key={`overlay-${activeIndex}`}
        className="interaction-overlay-enter"
        style={{ position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none" }}
      >
        {activeIndex === 1 ? (
          <FileViewOverlay />
        ) : activeIndex === 3 ? (
          <ThinkingOverlay />
        ) : activeIndex === 4 ? (
          <DeliveryOverlay />
        ) : step.view === "agent" ? (
          <AgentOverlay phase={activeIndex} />
        ) : (
          <DeliveryOverlay />
        )}
      </div>
    </div>
  );
}

function InteractionSpec({
  step,
  activeIndex,
}: {
  step: InteractionStep;
  activeIndex: number;
}) {
  return (
    <aside
      key={activeIndex}
      className="interaction-spec-enter"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "16px 16px 14px",
        boxSizing: "border-box",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        background:
          "linear-gradient(180deg, rgba(97,8,8,0.16), rgba(255,255,255,0.018) 42%, rgba(255,255,255,0.01))",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div>
          <div
            style={{
              color: "#ff4f4f",
              fontFamily: FONT_EN,
              fontSize: 10,
            }}
          >
            INTERACTION 0{activeIndex + 1}
          </div>
          <h2
            style={{
              margin: "7px 0 0",
              fontFamily: FONT_TITLE,
              fontSize: 18,
              lineHeight: "25px",
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            {step.title}
          </h2>
        </div>
        <span
          style={{
            padding: "4px 7px",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 999,
            color: "rgba(255,255,255,0.62)",
            fontSize: 8,
            whiteSpace: "nowrap",
          }}
        >
          {step.actor}
        </span>
      </div>

      <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
        <SpecRow index="A" label="触发条件" value={step.trigger} />
        <SpecRow index="B" label="系统响应" value={step.response} />
        <SpecRow index="C" label="交接条件" value={step.handoff} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 14,
          padding: "10px 12px",
          borderLeft: "2px solid #e52626",
          background:
            "linear-gradient(90deg, rgba(119,8,8,0.24), rgba(119,8,8,0.02))",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: FONT_EN,
            fontSize: 8,
          }}
        >
          DESIGN PRINCIPLE
        </div>
        <p
          style={{
            margin: "4px 0 0",
            color: "rgba(255,255,255,0.78)",
            fontSize: 10,
            lineHeight: "16px",
          }}
        >
          {step.principle}
        </p>
      </div>
    </aside>
  );
}

function SpecRow({
  index,
  label,
  value,
}: {
  index: string;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "18px 58px 1fr",
        alignItems: "start",
        gap: 6,
      }}
    >
      <span
        style={{
          color: "#ff4f4f",
          fontFamily: FONT_EN,
          fontSize: 9,
          lineHeight: "16px",
        }}
      >
        {index}
      </span>
      <strong
        style={{
          color: "rgba(255,255,255,0.86)",
          fontSize: 10,
          lineHeight: "16px",
        }}
      >
        {label}
      </strong>
      <span
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 9,
          lineHeight: "15px",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function SlidePage0f() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = STEPS[activeIndex];

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
        @keyframes interactionOverlayIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes interactionImageIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .interaction-image-enter {
          animation: interactionImageIn 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .interaction-overlay-enter,
        .interaction-spec-enter {
          animation: interactionOverlayIn 280ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .demo-viewport .interaction-overlay-enter {
          transition: opacity 160ms ease-out, visibility 160ms ease-out;
        }
        @media (any-hover: hover) and (any-pointer: fine) {
          .demo-viewport:hover .interaction-overlay-enter {
            opacity: 0 !important;
            visibility: hidden;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .interaction-image-enter,
          .interaction-overlay-enter,
          .interaction-spec-enter {
            animation: none;
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
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: 1336,
          margin: "0 auto",
          paddingTop: 54,
          boxSizing: "border-box",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontFamily: FONT_EN,
                fontSize: 13,
                color: "#e52626",
                lineHeight: 1,
              }}
            >
              06
            </span>
            <div
              style={{
                width: 28,
                height: 1,
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.48)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              LLM WIKI 产品形态决策
            </span>
          </div>
          <h1
            style={{
              margin: "12px 0 0",
              fontFamily: "'标小智无界黑', sans-serif",
              fontWeight: 400,
              fontSize: 40,
              lineHeight: "52px",
              letterSpacing: "1.5px",
              whiteSpace: "nowrap",
            }}
          >
            3.多用户交互形态
          </h1>
        </div>
        <div style={{ width: 570, paddingBottom: 4 }}>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.58)",
              fontSize: 12,
              lineHeight: "20px",
              textAlign: "right",
            }}
          >
            用 Agent 降低复杂任务的启动门槛，用编辑器承接高精度创作；
            <br />
            两种形态共享同一任务上下文，让提问、执行、编辑与交付连续流转。
          </p>
        </div>
      </header>

      <main
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: `${DEMO_WIDTH}px minmax(0, 1fr)`,
          alignItems: "stretch",
          gap: 24,
          width: 1336,
          margin: "24px auto 0",
        }}
      >
        <DemoViewport step={activeStep} activeIndex={activeIndex} />
        <div
          style={{
            display: "grid",
            gridTemplateRows: "160px 1fr",
            gap: 12,
            minWidth: 0,
            height: DEMO_HEIGHT,
          }}
        >
          <nav
            aria-label="交互流程"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {STEPS.map((step, index) => (
              <FlowStep
                key={step.label}
                step={step}
                index={index}
                active={index === activeIndex}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </nav>
          <InteractionSpec step={activeStep} activeIndex={activeIndex} />
        </div>
      </main>

      <footer
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "180px 1fr 240px",
          alignItems: "center",
          gap: 18,
          width: 1336,
          height: 46,
          margin: "12px auto 0",
          borderTop: "1px solid rgba(255,255,255,0.11)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div>
          <span
            style={{
              color: "#e52626",
              fontFamily: FONT_EN,
              fontSize: 10,
            }}
          >
            SHARED CONTEXT
          </span>
          <span
            style={{
              marginLeft: 8,
              color: "rgba(255,255,255,0.42)",
              fontSize: 10,
            }}
          >
            共享状态层
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {SHARED_CONTEXT.map((item) => (
            <span
              key={item}
              style={{
                padding: "4px 9px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                color: "rgba(255,255,255,0.56)",
                fontSize: 9,
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.45)",
            fontSize: 9,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#e52626",
              boxShadow: "0 0 12px rgba(229,38,38,0.7)",
            }}
          />
          taskId + sourceScope + artifactId
        </div>
      </footer>
    </div>
  );
}
