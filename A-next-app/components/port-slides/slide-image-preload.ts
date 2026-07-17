const imageDecodeCache = new Map<string, Promise<void>>();

const SLIDE_IMAGE_ASSETS: Record<string, string[]> = {
  content0: [
    "/images/page0/content0-card-kb.webp",
    "/images/page0/content0-card-wanxiang.webp",
    "/images/page0/content0-card-xingliu.webp",
    "/images/page0/content0-card-xinliu.webp",
  ],
  page0b: ["/images/page0b/ai1-bg.webp"],
  page0f: [
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
    "/images/page21/top-left.webp",
    "/images/page21/top-right.webp",
    "/images/page21/step1.webp",
  ],
  page22: [
    "/images/page22/card3-left.webp",
    "/images/page22/card3-right.webp",
    "/images/page22/dark-card-bg.webp",
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
};

function decodeImage(src: string) {
  const cached = imageDecodeCache.get(src);
  if (cached) return cached;

  const task = new Promise<void>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;

    const finish = () => resolve();
    if (typeof image.decode === "function") {
      image.decode().then(finish, finish);
    } else if (image.complete) {
      finish();
    } else {
      image.onload = finish;
      image.onerror = finish;
    }
  });

  imageDecodeCache.set(src, task);
  return task;
}

export async function predecodeSlideImages(slideId: string) {
  const assets = SLIDE_IMAGE_ASSETS[slideId];
  if (!assets?.length) return;
  await Promise.all(assets.map(decodeImage));
}
