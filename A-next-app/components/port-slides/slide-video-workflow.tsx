import { Check, CircleDashed } from "lucide-react"
import type { ReactNode } from "react"
import {
  SectionLabel,
  VIDEO_FONT,
  VIDEO_RED,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const workflowSteps = [
  [
    "01",
    "素材与意图统一输入",
    "商品图、人物素材、风格要求与任务目标进入同一创作上下文。",
  ],
  [
    "02",
    "多分支并行生成",
    "一组商品素材可并行扩展多个人物、场景、构图与视频方案。",
  ],
  [
    "03",
    "节点式编排与回流",
    "图片生成、视频生成与模板合成按需连接，结果可继续进入下一节点。",
  ],
  [
    "04",
    "模板沉淀与规模复用",
    "验证有效的链路被保存为模板，支持同类任务快速复刻与批量生产。",
  ],
]

const workflowNodes = [
  "商品素材输入",
  "图片生成",
  "视频生成",
  "模板合成",
  "分支复用",
  "人工可调度",
]

function StatusPill({
  children,
  active = false,
}: {
  children: ReactNode
  active?: boolean
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        minHeight: 25,
        padding: "0 10px",
        border: active
          ? "1px solid rgba(239,63,70,.46)"
          : "1px solid rgba(255,255,255,.12)",
        borderRadius: 999,
        background: active
          ? "rgba(142,13,20,.24)"
          : "rgba(255,255,255,.035)",
        color: active
          ? "rgba(255,255,255,.84)"
          : "rgba(255,255,255,.48)",
        fontSize: 10,
        whiteSpace: "nowrap",
      }}
    >
      {active ? (
        <Check size={12} color={VIDEO_RED} />
      ) : (
        <CircleDashed size={12} />
      )}
      {children}
    </span>
  )
}

function WorkflowCanvasPreview() {
  return (
    <figure
      className="relative h-full overflow-hidden"
      style={{
        margin: 0,
        border: "1px solid rgba(255,255,255,.18)",
        borderRadius: 7,
        background: "#1d1d20",
        boxShadow: "0 28px 80px rgba(0,0,0,.54)",
      }}
    >
      <img
        src="/images/video/ifs-workflow-canvas.jpeg"
        alt="绘剪模板工作流画布：商品素材经过多分支图片生成、视频生成与模板合成后形成可复用链路"
        draggable={false}
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between"
        style={{
          padding: "12px 14px 26px",
          background:
            "linear-gradient(180deg, rgba(7,7,8,.92) 0%, rgba(7,7,8,.56) 55%, transparent 100%)",
        }}
      >
        <strong
          style={{
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: 10,
            letterSpacing: ".7px",
          }}
        >
          IFS WORKFLOW CANVAS
        </strong>
        <span style={{ color: "rgba(255,255,255,.52)", fontSize: 9 }}>
          REAL PRODUCTION WORKFLOW
        </span>
      </div>
      <figcaption
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          padding: "38px 16px 14px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(7,7,8,.88) 58%, rgba(7,7,8,.97) 100%)",
          color: "rgba(255,255,255,.72)",
          fontSize: 10,
          lineHeight: 1.55,
        }}
      >
        从一组商品素材出发，串联人物与场景扩展、视频生成、成片合成和模板沉淀。
      </figcaption>
    </figure>
  )
}

export default function SlideVideoWorkflow() {
  return (
    <VideoThinkingFrame>
      <VideoThinkingHeader
        index="08"
        eyebrow="WORKFLOW-DRIVEN CREATION"
        title="AI 视频编辑的下一站"
        accent="从单次生成到可复用创作工作流"
      />

      <main
        className="absolute z-10 grid"
        style={{
          left: "4.2%",
          top: "21.5%",
          width: "91.6%",
          height: "66.5%",
          gridTemplateColumns: "29% 71%",
          borderTop: "1px solid rgba(255,255,255,.14)",
          borderBottom: "1px solid rgba(255,255,255,.14)",
        }}
      >
        <section style={{ padding: "24px 28px 18px 0" }}>
          <SectionLabel>WORKFLOW INSIGHT</SectionLabel>
          <h2
            style={{
              margin: "12px 0 3px",
              fontFamily: VIDEO_FONT,
              fontSize: 24,
              fontWeight: 400,
              letterSpacing: "1px",
            }}
          >
            把一次创作沉淀成生产链路
          </h2>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,.46)",
              fontSize: 12,
              lineHeight: 1.65,
            }}
          >
            画布让复杂任务可拆解、可连接、可复用，也让每个生成结果都有明确去向。
          </p>

          <div style={{ marginTop: 17 }}>
            {workflowSteps.map(([index, title, body]) => (
              <div
                key={index}
                style={{
                  padding: "11px 0",
                  borderTop: "1px solid rgba(255,255,255,.09)",
                }}
              >
                <div className="flex items-baseline" style={{ gap: 10 }}>
                  <span
                    style={{
                      color: VIDEO_RED,
                      fontFamily: "'LogoSC Unbounded Sans', sans-serif",
                      fontSize: 10,
                    }}
                  >
                    {index}
                  </span>
                  <strong
                    style={{
                      color: "rgba(255,255,255,.82)",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {title}
                  </strong>
                </div>
                <p
                  style={{
                    margin: "4px 0 0 29px",
                    color: "rgba(255,255,255,.38)",
                    fontSize: 10,
                    lineHeight: 1.55,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 13 }}>
            <SectionLabel>WORKFLOW / CAPABILITIES</SectionLabel>
            <div className="flex flex-wrap" style={{ gap: 6, marginTop: 9 }}>
              {workflowNodes.map((node) => (
                <StatusPill key={node} active>
                  {node}
                </StatusPill>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            padding: "24px 0 18px 24px",
            borderLeft: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ height: 34 }}
          >
            <SectionLabel>IFS CANVAS / REAL WORKFLOW</SectionLabel>
            <div
              className="flex items-center"
              style={{ gap: 18, color: "rgba(255,255,255,.45)", fontSize: 9 }}
            >
              <span>素材输入</span>
              <span>多分支生产</span>
              <span>成片合成</span>
              <span>模板沉淀</span>
            </div>
          </div>
          <div style={{ height: "calc(100% - 34px)" }}>
            <WorkflowCanvasPreview />
          </div>
        </section>
      </main>

      <footer
        className="absolute z-20 flex items-center justify-between"
        style={{ left: "4.2%", right: "4.2%", bottom: "3.2%" }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
          <span style={{ width: 28, height: 2, background: VIDEO_RED }} />
          <strong
            style={{
              fontFamily: VIDEO_FONT,
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: ".8px",
            }}
          >
            真正的效率，不只来自生成速度
          </strong>
          <span style={{ color: "rgba(255,255,255,.4)", fontSize: 12 }}>
            更来自可复用、可扩展、可持续优化的生产系统。
          </span>
        </div>
        <span
          style={{
            color: "rgba(255,255,255,.28)",
            fontFamily: "'LogoSC Unbounded Sans', sans-serif",
            fontSize: 9,
          }}
        >
          IFS · WORKFLOW-DRIVEN CREATION
        </span>
      </footer>
    </VideoThinkingFrame>
  )
}
