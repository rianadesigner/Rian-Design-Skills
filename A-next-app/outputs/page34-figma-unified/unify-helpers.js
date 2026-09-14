await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('0:1'));
const screen = await figma.getNodeByIdAsync(SCREEN_ID);
const reference = await figma.getNodeByIdAsync('53:970');
const allText = [...screen.findAllWithCriteria({types:['TEXT']}), ...reference.findAllWithCriteria({types:['TEXT']})];
const fontMap = new Map();
for (const node of allText) for (const segment of node.getStyledTextSegments(['fontName'])) fontMap.set(JSON.stringify(segment.fontName), segment.fontName);
await Promise.all([...fontMap.values()].map(font => figma.loadFontAsync(font)));
const mutatedNodeIds = new Set();
const createdNodeIds = [];
const touch = node => { mutatedNodeIds.add(node.id); return node; };
const byName = (node, name) => node.children.find(child => child.name === name);
const clone = value => JSON.parse(JSON.stringify(value));
const content = byName(screen, '能力内容区');
const intro = byName(content, '能力说明');
const config = byName(content, '功能配置');
const refContent = byName(reference, '能力内容区');
const refIntro = byName(refContent, '能力说明');
const refIcon = byName(refIntro, '能力图标');
const refCopy = byName(refIntro, '能力介绍');
const controlStyle = await figma.getNodeByIdAsync('54:948');
function size(node,w,h) { touch(node).resize(w,h); node.layoutSizingHorizontal='FIXED'; node.layoutSizingVertical='FIXED'; }
function vertical(node,w,gap) { touch(node).layoutMode='VERTICAL'; node.resize(w,node.height); node.layoutSizingHorizontal='FIXED'; node.layoutSizingVertical='HUG'; node.itemSpacing=gap; node.primaryAxisAlignItems='MIN'; node.counterAxisAlignItems='MIN'; }
function horizontal(node,w,h,gap=18) { touch(node).layoutMode='HORIZONTAL'; size(node,w,h); node.itemSpacing=gap; node.primaryAxisAlignItems='MIN'; node.counterAxisAlignItems='CENTER'; }
function newColumn(parent,name,w,gap) { const n=figma.createAutoLayout('VERTICAL'); createdNodeIds.push(n.id); n.name=name; parent.appendChild(n); n.fills=[]; n.clipsContent=false; vertical(n,w,gap); return n; }
function control(node,w,h) { size(node,w,h); node.cornerRadius=controlStyle.cornerRadius; const p=node.fills.find(p=>p.type==='SOLID' && p.visible!==false); if(p && Math.abs(p.color.r-p.color.g)<0.025 && Math.abs(p.color.g-p.color.b)<0.025) node.fills=clone(controlStyle.fills); }
function inlineGroup(group, row, height, labelWidth=92) { const label=group.children.find(n=>n.type==='TEXT'); horizontal(group,690,height,18); label.layoutSizingHorizontal='FIXED'; label.resize(labelWidth,label.height); touch(label); size(row,690-labelWidth-18,height); }
function fitSelectRow(row,w,h) { horizontal(row,w,h,12); const width=(w-12*(row.children.length-1))/row.children.length; for(const item of row.children) { control(item,width,h); item.paddingLeft=16; item.paddingRight=12; } }
function fitChipRow(row,w,h,compact=false) { horizontal(row,w,h,10); for(const item of row.children) { const t=item.children.find(n=>n.type==='TEXT'); control(item,compact?t.width+28:item.width,h); } }
function updateIntro() {
  touch(intro).layoutMode=refIntro.layoutMode;
  size(intro,refIntro.width,refIntro.height);
  intro.itemSpacing=refIntro.itemSpacing;
  intro.primaryAxisAlignItems=refIntro.primaryAxisAlignItems;
  intro.counterAxisAlignItems=refIntro.counterAxisAlignItems;
  const icon=byName(intro,'能力图标');
  size(icon,refIcon.width,refIcon.height); icon.cornerRadius=refIcon.cornerRadius; icon.fills=clone(refIcon.fills);
  const copy=byName(intro,'能力介绍');
  size(copy,refCopy.width,refCopy.height); copy.itemSpacing=refCopy.itemSpacing; copy.counterAxisAlignItems=refCopy.counterAxisAlignItems;
  for(let i=0;i<copy.children.length;i++) {
    const n=touch(copy.children[i]), r=refCopy.children[i];
    n.fontName=clone(r.fontName); n.fontSize=r.fontSize; n.lineHeight=clone(r.lineHeight); n.letterSpacing=clone(r.letterSpacing); n.fills=clone(r.fills); n.textAlignHorizontal=r.textAlignHorizontal;
    n.textAutoResize='HEIGHT'; n.resize(r.width,n.height);
  }
  vertical(config,690,18);
}
updateIntro();
