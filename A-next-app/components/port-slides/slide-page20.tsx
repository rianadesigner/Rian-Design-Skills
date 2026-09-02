import Image from "next/image"

const DESIGN_SYSTEM_OVERVIEW = "/images/page20/design-system-overview.jpg"

export default function SlidePage20() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#080a11]">
      <Image
        src={DESIGN_SYSTEM_OVERVIEW}
        alt="星链平台设计系统总览，包含词元、颜色、字体、尺寸、间距、高度、投影、描边与圆角规范"
        fill
        sizes="100vw"
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-contain object-center"
      />
    </div>
  )
}
