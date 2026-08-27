import { ArrowRight, Sparkles, WandSparkles } from "lucide-react"
import {
  VIDEO_RED,
  VideoThinkingFrame,
  VideoThinkingHeader,
} from "./slide-video-thinking-shared"

const screens = [
  {
    index: "01",
    phase: "DISCOVER",
    title: "瀑布流模板入口",
    body: "海量官方模板持续可发现",
    image: "/images/video/slide37-template-remix/02-template-waterfall.webp",
    alt: "Sketch 模板瀑布流入口，多张官方模板卡片连续展示",
  },
  {
    index: "02",
    phase: "EVALUATE",
    title: "模板详情",
    body: "效果、作者与创作入口集中呈现",
    image: "/images/video/slide37-template-remix/03-template-detail.webp",
    alt: "Sketch 模板详情页，展示模板视频、创作信息、二次创作与做同款入口",
  },
  {
    index: "03",
    phase: "INSPECT",
    title: "创作详情",
    body: "查看原作者的分步创作流程",
    image: "/images/video/slide37-template-remix/04-creation-detail.webp",
    alt: "Sketch 创作详情页，展示原作者的分步创作流程与每一步说明",
  },
  {
    index: "04",
    phase: "REMIX",
    title: "二次创作",
    body: "沿用模板结果继续输入修改",
    image: "/images/video/slide37-template-remix/05-remix-editor.webp",
    alt: "Sketch 二创编辑页，保留模板视频并支持继续输入修改",
  },
  {
    index: "05",
    phase: "REMAKE",
    title: "做同款",
    body: "复用模板生成自己的版本",
    image: "/images/video/slide37-template-remix/06-make-same.webp",
    alt: "Sketch 做同款生成页，以故事化方式展示模板生成过程",
  },
] as const

export default function SlideVideoTemplateRemix() {
  return (
    <VideoThinkingFrame>
      <VideoThinkingHeader
        index="06"
        eyebrow="OFFICIAL TEMPLATE ECOSYSTEM"
        title="海量官方模板"
        accent="把兴趣带进二创"
        description="模板不仅展示完成效果，也公开创作过程；用户理解原作者如何完成作品后，可直接进入二次创作或做同款。"
        descriptionSingleLine
      />

      <main
        className="absolute z-10"
        style={{
          left: "4.2%",
          top: "21.3%",
          width: "91.6%",
          height: "67.8%",
          borderTop: "1px solid rgba(255,255,255,.13)",
          borderBottom: "1px solid rgba(255,255,255,.13)",
          background:
            "radial-gradient(circle at 17% 45%, rgba(15,76,133,.16), transparent 28%), radial-gradient(circle at 82% 52%, rgba(145,12,18,.18), transparent 31%)",
        }}
      >
        <div className="absolute left-[26px] right-[26px] top-[22px] flex items-start justify-between">
          {screens.map((screen, index) => (
            <article key={screen.index} className="relative w-[200px] shrink-0">
              <div className="mb-[8px] flex h-[22px] items-center justify-between">
                <span className="font-mono text-[9px] font-bold tracking-[1.1px] text-[#ef5057]">
                  {screen.phase}
                </span>
                <span className="font-mono text-[10px] text-white/30">{screen.index}</span>
              </div>

              <div
                className="relative w-full overflow-hidden bg-black"
                style={{
                  aspectRatio: "750 / 1624",
                  border: "1px solid rgba(255,255,255,.18)",
                  borderRadius: 22,
                  boxShadow: "0 22px 48px rgba(0,0,0,.56)",
                }}
              >
                {/* Direct 1× export from the supplied Sketch artboard. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screen.image}
                  alt={screen.alt}
                  draggable={false}
                  loading="eager"
                  decoding="async"
                  className="block h-full w-full select-none"
                />
              </div>

              <div className="mt-[11px] border-t border-white/10 pt-[9px]">
                <h2 className="m-0 text-[14px] font-semibold text-white/88">{screen.title}</h2>
                <p className="m-0 mt-[5px] text-[10px] leading-[1.45] text-white/38">{screen.body}</p>
              </div>

              {index < screens.length - 1 ? (
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="absolute -right-[41px] top-[246px] text-white/20"
                />
              ) : null}
            </article>
          ))}
        </div>

        <div
          className="absolute bottom-[15px] left-[26px] right-[26px] flex h-[38px] items-center justify-between border-t border-white/10 pt-[12px]"
        >
          <div className="flex items-center gap-[8px] text-[10px] font-bold tracking-[1px] text-white/30">
            <Sparkles size={13} color={VIDEO_RED} />
            INTEREST TO CREATION
          </div>

          <div className="flex items-center gap-[12px] text-[11px] text-white/52">
            <span>浏览模板</span>
            <ArrowRight size={12} className="text-white/20" />
            <span>查看详情</span>
            <ArrowRight size={12} className="text-white/20" />
            <span>了解创作过程</span>
            <ArrowRight size={12} className="text-white/20" />
            <span className="text-[#ef5a61]">二次创作 / 做同款</span>
          </div>

          <div className="flex items-center gap-[7px] text-[10px] text-white/34">
            <WandSparkles size={13} color={VIDEO_RED} />
            不从空白开始
          </div>
        </div>
      </main>
    </VideoThinkingFrame>
  )
}
