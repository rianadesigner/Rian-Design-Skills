export const PAGE0D_ASSET_BASE = "/images/page0d";

export const PAGE0D_IMAGES = [
  `${PAGE0D_ASSET_BASE}/daxue.png`,
  `${PAGE0D_ASSET_BASE}/jiaoyubu.png`,
  `${PAGE0D_ASSET_BASE}/985.png`,
  `${PAGE0D_ASSET_BASE}/211.png`,
  `${PAGE0D_ASSET_BASE}/zhiyuan.png`,
  `${PAGE0D_ASSET_BASE}/happy-horse.png`,
  `${PAGE0D_ASSET_BASE}/beikao-1.png`,
  `${PAGE0D_ASSET_BASE}/xuke.png`,
  `${PAGE0D_ASSET_BASE}/notion.png`,
  `${PAGE0D_ASSET_BASE}/feishu.png`,
  `${PAGE0D_ASSET_BASE}/province.png`,
  `${PAGE0D_ASSET_BASE}/province-total.png`,
  `${PAGE0D_ASSET_BASE}/knowledge-base-full.png`,
] as const;

export function preloadPage0dImages() {
  PAGE0D_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}
