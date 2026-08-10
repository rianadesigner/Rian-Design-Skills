"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, MousePointer2 } from "lucide-react"

const sketchFlow = [
  {
    index: "01",
    title: "打开动作克隆",
    caption: "选择或上传参考动作",
    image: "/images/video/slide36-sketch/motion-clone-01-entry.webp",
    alt: "Sketch 动作克隆入口界面，底部面板显示上传动作和动作素材",
    action: "进入「动作克隆」，从动作列表单选一段素材；也可以点击「上传动作」进入参考动作上传流程。",
    response: "动作面板保留在原视频上方；如果前序输入框已经有内容，原提示词继续保留。",
  },
  {
    index: "02",
    title: "选中参考动作",
    caption: "拖动动作到视频中",
    image: "/images/video/slide36-sketch/motion-clone-02-selected-motion.webp",
    alt: "Sketch 动作克隆已选动作界面，动作卡片浮起并提示拖动到视频中",
    action: "点击动作卡片完成选择；选中的动作卡片浮起，并出现「拖动到视频中」的首次引导。",
    response: "用户开始拖动后引导自动消失；如果没有操作，引导在 3 秒后收起，避免持续遮挡素材。",
  },
  {
    index: "03",
    title: "绑定指定对象",
    caption: "把动作拖到目标人物",
    image: "/images/video/slide36-sketch/motion-clone-03-selected-object.webp",
    alt: "Sketch 已选对象界面，参考动作被拖到目标人物，人物轮廓被识别高亮",
    action: "将动作卡片拖到画面中的目标人物；多人场景里，动作与落点人物直接建立对应关系。",
    response: "拖动时动作面板隐藏，系统识别人像轮廓并高亮目标；输入框自动写入角色与动作组合。",
  },
  {
    index: "04",
    title: "生成克隆效果",
    caption: "查看最终生成效果",
    image: "/images/video/slide36-sketch/motion-clone-04-clone-result.webp",
    alt: "动作克隆生成效果，多位人物在雪地峡谷中完成统一动作",
    action: "确认参考动作、目标人物与动作方向后，点击生成，系统开始合成克隆效果。",
    response: "生成结果保留目标人物的身份与原场景关系，并呈现统一的动作效果。",
  },
] as const

export default function SlideVideoContextSystem() {
  const [activeStep, setActiveStep] = useState(0)
  const active = sketchFlow[activeStep]

  const selectStep = (index: number) => {
    setActiveStep(index)
  }

  const goPrevious = () => {
    setActiveStep((current) => Math.max(0, current - 1))
  }

  const goNext = () => {
    setActiveStep((current) => Math.min(sketchFlow.length - 1, current + 1))
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#050505] text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 18% 12%, rgba(178,255,43,.055), transparent 25%), linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)",
        backgroundSize: "auto, 72px 72px, 72px 72px",
      }}
    >
      <div className="sr-only" aria-live="polite">
        当前展示第 {active.index} 步：{active.title}
      </div>

      <header className="absolute left-[62px] right-[62px] top-[64px] flex items-end justify-between border-b border-white/10 pb-[16px]">
        <div>
          <div className="mb-[7px] font-mono text-[10px] font-bold tracking-[1.4px] text-[#b8ff35]">
            05 / ACTION CLONING
          </div>
          <h1
            className="m-0 whitespace-nowrap text-[42px] leading-[1.22] tracking-[0]"
            style={{
              fontFamily: "'Alimama ShuHeiTi', 'PingFang SC', sans-serif",
              fontWeight: 700,
            }}
          >
            海量玩法库
            <span className="ml-[12px] text-[#b8ff35]">
              支持风格、运镜、合拍、动作克隆
            </span>
          </h1>
        </div>
      </header>

      <main
        className="absolute left-[62px] right-[62px] top-[184px] flex items-start justify-between"
        aria-label="动作克隆 Sketch 交互流程"
      >
        {sketchFlow.map((item, index) => {
          const selected = activeStep === index
          const completed = index < activeStep

          return (
            <div key={item.index} className="relative flex w-[270px] items-start justify-between">
              <button
                type="button"
                aria-pressed={selected}
                aria-label={`第 ${item.index} 步：${item.title}。${item.caption}`}
                onClick={() => selectStep(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") goPrevious()
                  if (event.key === "ArrowRight") goNext()
                }}
                className="group w-[236px] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b8ff35]"
              >
                <div
                  className="relative h-[511px] w-[236px] overflow-hidden border bg-black transition-[border-color,transform,box-shadow,opacity] duration-300"
                  style={{
                    borderColor: selected ? "rgba(184,255,53,.82)" : "rgba(255,255,255,.12)",
                    boxShadow: selected ? "0 0 0 1px rgba(184,255,53,.15), 0 24px 54px rgba(0,0,0,.46)" : "0 18px 42px rgba(0,0,0,.34)",
                    transform: selected ? "translateY(-7px)" : "translateY(0)",
                    opacity: selected ? 1 : 0.7,
                  }}
                >
                  {/* These are direct 1× exports from the four Sketch artboards. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    draggable={false}
                    className="block h-full w-full select-none"
                  />

                  <div
                    className="absolute left-[10px] top-[10px] grid h-[34px] min-w-[34px] place-items-center border px-[8px] font-mono text-[11px] font-bold backdrop-blur-md"
                    style={{
                      borderColor: selected || completed ? "rgba(184,255,53,.68)" : "rgba(255,255,255,.28)",
                      background: selected || completed ? "rgba(117,166,22,.74)" : "rgba(0,0,0,.58)",
                      color: "white",
                    }}
                  >
                    {completed ? <Check size={14} /> : item.index}
                  </div>
                </div>

                <div className="mt-[13px] border-t pt-[11px]" style={{ borderColor: selected ? "rgba(184,255,53,.7)" : "rgba(255,255,255,.1)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold text-white/88">{item.title}</span>
                    {selected ? <MousePointer2 size={14} className="text-[#b8ff35]" /> : null}
                  </div>
                  <p className="m-0 mt-[6px] text-[12px] leading-[1.45] text-white/42">{item.caption}</p>
                </div>
              </button>

              {index < sketchFlow.length - 1 ? (
                <ArrowRight
                  size={18}
                  className="absolute -right-[18px] top-[248px] text-white/22"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          )
        })}
      </main>

      <section
        className="absolute bottom-[27px] left-[62px] right-[62px] grid min-h-[104px] items-center border-y border-white/10 bg-black/30 px-[20px]"
        style={{ gridTemplateColumns: "250px minmax(0, 1fr) 136px" }}
        aria-label="当前步骤说明"
      >
        <div className="flex items-center gap-[14px]">
          <span className="grid h-[44px] w-[44px] place-items-center border border-[#b8ff35]/60 bg-[#6e9d14]/25 font-mono text-[13px] text-[#c4ff59]">
            {active.index}
          </span>
          <div>
            <div className="text-[10px] font-bold tracking-[1.4px] text-white/30">CURRENT INTERACTION</div>
            <div className="mt-[6px] text-[17px] font-semibold text-white/86">{active.title}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[28px] border-x border-white/10 px-[28px]">
          <div className="grid grid-cols-[58px_1fr] gap-[12px]">
            <span className="text-[11px] text-white/30">用户操作</span>
            <p className="m-0 text-[12px] leading-[1.6] text-white/62">{active.action}</p>
          </div>
          <div className="grid grid-cols-[58px_1fr] gap-[12px]">
            <span className="text-[11px] text-white/30">界面反馈</span>
            <p className="m-0 text-[12px] leading-[1.6] text-white/62">{active.response}</p>
          </div>
        </div>

        <div className="flex justify-end gap-[10px]">
          <button
            type="button"
            aria-label="上一步"
            disabled={activeStep === 0}
            onClick={goPrevious}
            className="grid h-[48px] w-[48px] cursor-pointer place-items-center border border-white/14 bg-white/[.025] text-white/66 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8ff35] disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            aria-label="下一步"
            disabled={activeStep === sketchFlow.length - 1}
            onClick={goNext}
            className="grid h-[48px] w-[48px] cursor-pointer place-items-center border border-[#b8ff35]/60 bg-[#7cad1a]/28 text-[#c4ff59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8ff35] disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  )
}
