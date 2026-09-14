const page = await figma.getNodeByIdAsync('0:1');
await figma.setCurrentPageAsync(page);
await Promise.all(['Regular','Medium','Bold'].map(style => figma.loadFontAsync({family:'Noto Sans SC',style})));
await figma.loadFontAsync({family:'SF Pro Text',style:'Regular'});
const createdNodeIds = [];
const mutatedNodeIds = [];
const colors = Object.fromEntries(await Promise.all(Object.entries(TOKENS.colors).map(async ([name,id]) => [name, await figma.variables.getVariableByIdAsync(id)])));
function record(n) { createdNodeIds.push(n.id); return n; }
function paint(name) { return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:1,g:1,b:1}},'color',colors[name]); }
function al(parent,name,dir,w,h,bg) {
  const n=record(figma.createAutoLayout(dir));
  n.name=name; n.fills=bg?[paint(bg)]:[]; n.itemSpacing=0;
  n.resize(w,h===null?1:h);
  n.layoutSizingHorizontal='FIXED';
  n.layoutSizingVertical=h===null?'HUG':'FIXED';
  if(parent)parent.appendChild(n);
  return n;
}
function textNode(parent,value,size=30,color='ink',weight='Regular',width) {
  const n=record(figma.createText());n.name=value;n.fontName={family:'Noto Sans SC',style:weight};
  n.fontSize=size;n.lineHeight={unit:'PERCENT',value:150};n.characters=value;n.fills=[paint(color)];
  n.textAutoResize=width?'HEIGHT':'WIDTH_AND_HEIGHT';if(width)n.resize(width,Math.max(size*1.5,n.height));
  parent.appendChild(n);return n;
}
function svg(parent,name,size=30,color='ink') {
  const n=record(figma.createNodeFromSvg(ASSETS[name].svg)); n.name='图标 / '+name;
  n.resize(size,size);parent.appendChild(n);
  for(const child of n.findAll(()=>true)) {
    createdNodeIds.push(child.id);
    if(name!=='pdf') {
      if(Array.isArray(child.fills)) child.fills=child.fills.map(p=>p.type==='SOLID'?paint(color):p);
      if(Array.isArray(child.strokes)) child.strokes=child.strokes.map(p=>p.type==='SOLID'?paint(color):p);
    }
  }
  return n;
}
function rounded(parent,name,w,h,bg,r=22,dir='HORIZONTAL') {
  const n=al(parent,name,dir,w,h,bg);n.cornerRadius=r;n.primaryAxisAlignItems='CENTER';n.counterAxisAlignItems='CENTER';return n;
}
function iconButton(parent,name,icon,w=64,bg='white',color='ink') {
  const n=rounded(parent,name,w,w,bg,w/2);svg(n,icon,w*.48,color);return n;
}
function label(parent,s) { return textNode(parent,s,23,'muted'); }
function gap(parent,h) { return al(parent,'留白','VERTICAL',1,h); }
function group(parent,name) { const n=al(parent,name,'VERTICAL',690,null);n.itemSpacing=15;return n; }
function selectRow(parent,labels) {
  const row=al(parent,'选择条件','HORIZONTAL',690,68);row.itemSpacing=14;
  const w=(690-(labels.length-1)*14)/labels.length;
  for(const str of labels) {
    const f=rounded(row,str,w,68,'control',22);f.primaryAxisAlignItems='SPACE_BETWEEN';f.paddingLeft=20;f.paddingRight=16;
    textNode(f,str,23.5,'muted');svg(f,'ChevronDown',20,'muted');
  }
  return row;
}
function chips(parent,labelValue,options,selected) {
  const g=group(parent,labelValue);label(g,labelValue);
  const chunks=options.length>5?[options.slice(0,5),options.slice(5)]:[options];
  for(const chunk of chunks) {
    const row=al(g,'选项','HORIZONTAL',690,64);row.itemSpacing=12;
    for(const s of chunk) {
      const width=Math.max(80,s.length*25+44);
      const n=rounded(row,s,width,64,s===selected?'purpleLight':'control',22);
      textNode(n,s,25,s===selected?'purple':'muted',s===selected?'Medium':'Regular');
    }
  }
  return g;
}
function recommendation(parent,s) {
  const row=rounded(parent,s,690,75,'control',22);row.primaryAxisAlignItems='MIN';row.paddingLeft=22;row.paddingRight=22;row.itemSpacing=18;
  svg(row,'Search',27,'muted');const t=textNode(row,s,25,'muted');t.layoutGrow=1;svg(row,'ChevronRight',25,'muted');return row;
}
