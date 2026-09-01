const imageDecodeCache = new Map<string, Promise<void>>()
const ADJACENT_PRELOAD_LIMIT = 2

type NavigatorWithPerformanceHints = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string }
  deviceMemory?: number
}

export type SlidePreloadPolicy = {
  assetLimit: number
  decodeAssets: boolean
  allowJumpPrefetch: boolean
}

/**
 * Keep background work from competing with the visible slide on mobile,
 * low-memory devices and data-saving/slow connections.
 */
export function getSlidePreloadPolicy(): SlidePreloadPolicy {
  if (typeof window === "undefined") {
    return {
      assetLimit: ADJACENT_PRELOAD_LIMIT,
      decodeAssets: false,
      allowJumpPrefetch: false,
    }
  }

  const nav = navigator as NavigatorWithPerformanceHints
  const slowConnection =
    nav.connection?.saveData ||
    /(^|-)2g$/.test(nav.connection?.effectiveType ?? "")
  const lowMemory =
    typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches
  const constrainedDevice = lowMemory || coarsePointer

  if (slowConnection) {
    return { assetLimit: 0, decodeAssets: false, allowJumpPrefetch: false }
  }

  return {
    assetLimit: constrainedDevice ? 1 : ADJACENT_PRELOAD_LIMIT,
    decodeAssets: !constrainedDevice,
    allowJumpPrefetch: !constrainedDevice,
  }
}

const SLIDE_IMAGE_ASSETS: Record<string, string[]> = {
  content0: [
    "/images/page0/content0-card-kb.webp",
    "/images/page0/content0-card-wanxiang.webp",
    "/images/page0/content0-card-xingliu.webp",
    "/images/page0/content0-card-xinliu.webp",
  ],
  page0b: ["/images/page0b/ai1-bg.webp"],
  page0f: [
    "/images/page0/figma-home-input-v2.png",
    "/images/page0/figma-multi-file-window-v2.png",
    "/images/page0/figma-generation-config.png",
    "/images/page0/figma-thinking-process.webp",
    "/images/page0/figma-multi-format-delivery.webp",
    "/images/page0/agent-stage-glow.svg",
    "/images/page0/agent-avatar.png",
    "/images/page0/agent-3d-upload.webp",
    "/images/page0/agent-3d-app.webp",
    "/images/page0/agent-3d-webpage.webp",
    "/images/page0/agent-3d-git-rendered.webp",
  ],
  page0g: [
    "/images/page0g/ppt-preview.webp",
    "/images/page0g/infographic-preview.webp",
    "/images/page0g/mindmap-preview.webp",
    "/images/page0g/report-preview.webp",
  ],
  page1: ["/images/page1/screenshot.webp"],
  page2: [
    "/images/page2/screenshot-main.webp",
    "/images/page2/screenshot-deep-search.jpg",
    "/images/page2/card-ppt-ui.webp",
  ],
  page3: [
    "/images/page3/screenshot-main.webp",
    "/images/page3/card-1.webp",
    "/images/page3/card-3.webp",
  ],
  page4: [
    "/images/page4/card-formatting-right.webp",
    "/images/page4/card-formatting-left.webp",
    "/images/page4/card-plan.webp",
  ],
  page5: ["/images/page5/bottom-card.webp"],
  page6: [
    "/images/page6/screenshot-main.webp",
    "/images/page6/card-left.jpg",
    "/images/page6/card-right.jpg",
  ],
  page7: [
    "/images/page7/phone-screenshot.webp",
    "/images/page7/ip-scenes.webp",
    "/images/page7/ip-themes.webp",
  ],
  page8: [
    "/images/page8/top-1.webp",
    "/images/page8/top-2.webp",
    "/images/page8/top-3.webp",
    "/images/page8/top-4.webp",
    "/images/page8/bottom-1.webp",
    "/images/page8/bottom-2.webp",
    "/images/page8/bottom-3.webp",
    "/images/page8/bottom-4.webp",
  ],
  page9: [
    "/images/page9/phone-mockup.webp",
    "/images/page9/card-05.webp",
    "/images/page9/card-04.webp",
  ],
  page10: [
    "/images/page10/phone-mockup.webp",
    "/images/page10/card-01.webp",
    "/images/page10/card-02.webp",
  ],
  page11: [
    "/images/page11/terminal.webp",
    "/images/page11/banner.webp",
    "/images/page11/card-compose.webp",
  ],
  page12: [
    "/images/page12/card-b-left.webp",
    "/images/page12/card-b-right.webp",
    "/images/page12/card-cd-left.webp",
  ],
  page13: [
    "/images/page13/panel-4.webp",
    "/images/page13/panel-5.webp",
    "/images/page13/panel-7.webp",
  ],
  page14: [
    "/images/page14/card1-screenshot.webp",
    "/images/page14/card2-screenshot.webp",
    "/images/page14/card3-screenshot.webp",
  ],
  page15: [
    "/images/page15/card1-screenshot.webp",
    "/images/page15/card2-screenshot.webp",
    "/images/page15/card3-screenshot.webp",
  ],
  page16: [
    "/images/page16/card1-screenshot.webp",
    "/images/page16/card2-screenshot.webp",
    "/images/page16/card3-screenshot.webp",
  ],
  page17: [
    "/images/page17/panel-bg.webp",
    "/images/page17/card1-bg.webp",
    "/images/page17/card2-bg.webp",
  ],
  page18: [
    "/images/page18/section1.webp",
    "/images/page18/section2.webp",
    "/images/page18/section3.webp",
  ],
  page19: [
    "/images/page19/cardA-screenshot.webp",
    "/images/page19/cardB-screenshot.webp",
    "/images/page19/cardC-screenshot.webp",
  ],
  page20: [
    "/images/page20/right-top.webp",
    "/images/page20/right-bottom.webp",
    "/images/page20/left-panel.jpg",
  ],
  page21: [
    "/images/page21/free-canvas-01.webp",
    "/images/page21/free-canvas-02.webp",
    "/images/page21/free-canvas-03.webp",
    "/images/page21/free-canvas-04.webp",
    "/images/page21/free-canvas-05.webp",
    "/images/page21/free-canvas-06.webp",
    "/images/page21/free-canvas-07.webp",
  ],
  page22: [
    "/images/page22/card3-left.webp",
    "/images/page22/card3-right.webp",
    "/images/page22/dark-card-bg.webp",
  ],
  "if-studio": ["/images/if-studio/home-full-2026.webp"],
  "if-studio-skills": [
    "/images/if-studio/skills-plaza-2026-1440.webp",
    "/images/if-studio/skill-detail-open-platform-2026-1440.webp",
  ],
  "storyboard-video-skill": [
    "/images/storyboard-video-skill/workflow-full-105500.webp",
    "/images/if-studio/skill-config-2026.webp",
  ],
  "if-studio-insights": [
    "/images/if-studio/generated-covers/workflow-cover-v5.webp",
    "/images/if-studio/generated-covers/canvas-cover-v5.webp",
    "/images/if-studio/generated-covers/skills-cover-v5.webp",
    "/images/if-studio/generated-covers/assets-cover-v6.webp",
  ],
  "if-studio-capabilities": [
    "/images/if-studio/capabilities/brand.webp",
    "/images/if-studio/capabilities/illustration.webp",
    "/images/if-studio/capabilities/video.webp",
    "/images/if-studio/capabilities/creative.webp",
    "/images/if-studio/capabilities/social.webp",
    "/images/if-studio/capabilities/commerce.webp",
    "/images/if-studio/capabilities/fashion.webp",
    "/images/if-studio/capabilities/space.webp",
  ],
  page23: [
    "/images/page23/05.webp",
    "/images/page23/06.webp",
    "/images/page23/col3-img2.webp",
  ],
  page24: [
    "/images/page24/research.jpg",
    "/images/page24/phone1.webp",
    "/images/page24/phone2.webp",
  ],
  page25: [
    "/images/page25/card1.webp",
    "/images/page25/card2.webp",
    "/images/page25/bg-outer.webp",
  ],
  page26: [
    "/images/page26/right-bottom.webp",
    "/images/page26/right-top.webp",
    "/images/page26/phone1.webp",
  ],
  "other-creative-projects": [
    "/images/page23/05.webp",
    "/images/page23/06.webp",
    "/images/page23/07.webp",
    "/images/page24/research.jpg",
    "/images/page24/phone1.webp",
    "/images/page24/phone2.webp",
    "/images/page25/card1.webp",
    "/images/page25/card2.webp",
    "/images/page25/card3.webp",
    "/images/page26/right-bottom.webp",
    "/images/page26/right-top.webp",
    "/images/page26/phone1.webp",
  ],
  "other-agent-projects": [
    "/images/other-agent-projects/01-agent-home.png",
    "/images/other-agent-projects/02-intent-config.png",
    "/images/other-agent-projects/03-plan-confirm.png",
    "/images/other-agent-projects/04-execution-progress.png",
    "/images/other-agent-projects/05-result-preview.png",
  ],
  "other-search-projects": [
    "/images/other-search-projects/ui-v3/01-entry-default.png",
    "/images/other-search-projects/ui-v3/02-entry-active.png",
    "/images/other-search-projects/ui-v3/03-query-suggestions.png",
    "/images/other-search-projects/ui-v3/04-result-entry.webp",
    "/images/other-search-projects/ui-v3/05-result-full.png",
    "/images/other-search-projects/ui-v3/06-result-visual.webp",
    "/images/other-search-projects/ui-v3/07-social-proof.png",
    "/images/other-search-projects/ui-v3/08-commerce-action.webp",
    "/images/other-search-projects/ui-v3/09-map-zoom.webp",
    "/images/other-search-projects/ui-v3/10-recommend-entry.png",
  ],
  page27: [
    "/images/page27/riff-home-logged-out.webp",
    "/images/page27/riff-material-v2.webp",
  ],
  "video-user-journey": [],
  "video-recommendation-upload": [
    "/images/page34/riff-home-logged-in.webp",
    "/images/page34/upload-picker-check-centered.webp",
    "/images/page34/multi-material-editor.webp",
  ],
  "video-concurrent-tasks": [
    "/images/page35/completed.webp",
    "/images/page35/generating.webp",
    "/images/page35/queued.webp",
    "/images/page35/task-history.jpg",
  ],
  "video-context-system": [
    "/images/page34/riff-home-logged-in.webp",
    "/images/page27/video-editor.webp",
    "/images/page27/result.webp",
  ],
  "video-template-remix": [
    "/images/video/slide37-template-remix/02-template-waterfall.webp",
    "/images/video/slide37-template-remix/03-template-detail.webp",
    "/images/video/slide37-template-remix/04-creation-detail.webp",
    "/images/video/slide37-template-remix/05-remix-editor.webp",
    "/images/video/slide37-template-remix/06-make-same.webp",
  ],
  "video-entry-experience": [
    "/images/page27/riff-home-logged-out.webp",
    "/images/page34/riff-home-logged-in.webp",
    "/images/page27/remix.webp",
  ],
  "video-async-loop": [
    "/images/page30/progress.webp",
    "/images/page27/result.webp",
  ],
  "video-future": ["/images/video/ifs-workflow-canvas.webp"],
  page28: [
    "/images/page28/video-character-library.webp",
    "/images/page28/style-filter.webp",
    "/images/page28/co-create.webp",
    "/images/page28/subject-removal.webp",
  ],
  page29: [
    "/images/page39/sketch-home.webp",
    "/images/page39/sketch-material.webp",
  ],
  page30: [
    "/images/page30/material-analysis.webp",
    "/images/page30/clip-select.webp",
    "/images/page30/progress.webp",
  ],
  page31: [
    "/images/page30/compare.webp",
    "/images/page30/object-selected.webp",
    "/images/page30/action-selected.webp",
    "/images/page30/paint-remove.webp",
    "/images/page30/style-filter.webp",
    "/images/page27/remove-brush-card.png",
    "/images/page27/remove-person-card.png",
    "/images/page27/remove-watermark-card.png",
    "/images/page27/remove-text-card.png",
    "/images/page27/remove-glasses-card.png",
  ],
  page32: [
    "/images/page30/all-sketch-pages.webp",
    "/images/page30/material-analysis.webp",
  ],
}

function decodeImage(src: string, shouldDecode: boolean) {
  const cacheKey = `${shouldDecode ? "decode" : "fetch"}:${src}`
  const cached = imageDecodeCache.get(cacheKey)
  if (cached) return cached

  const task = new Promise<void>((resolve) => {
    const image = new Image()
    image.decoding = "async"
    image.fetchPriority = "low"

    const finish = () => resolve()
    const handleLoad = () => {
      if (shouldDecode && typeof image.decode === "function") {
        image.decode().then(finish, finish)
        return
      }
      finish()
    }
    image.onload = handleLoad
    image.onerror = finish
    image.src = src

    if (image.complete) handleLoad()
  })

  imageDecodeCache.set(cacheKey, task)
  return task
}

export async function predecodeSlideImages(slideId: string) {
  const assets = SLIDE_IMAGE_ASSETS[slideId]
  if (!assets?.length) return

  const policy = getSlidePreloadPolicy()
  if (policy.assetLimit === 0) return

  // /06 contains tall screenshots that each expand to roughly 11-20 MiB when
  // decoded. Warm only its first responsive asset and leave decoding to the
  // visible <img>, so Chrome does not upload both textures in the background.
  const isLongImageSlide = slideId === "if-studio-skills"
  const assetLimit = isLongImageSlide ? 1 : policy.assetLimit
  const shouldDecode = isLongImageSlide ? false : policy.decodeAssets

  // Decode one image at a time. Concurrent bitmap decoding can block slide
  // transitions even when the network requests themselves are low priority.
  for (const src of assets.slice(0, assetLimit)) {
    await decodeImage(src, shouldDecode)
  }
}
