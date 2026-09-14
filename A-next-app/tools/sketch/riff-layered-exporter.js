const async = require('sketch/async')
const {
  Document,
  Artboard,
  Group,
  ShapePath,
  Text,
  Image,
  Rectangle,
  Style,
} = require('sketch/dom')

const OUTPUT = '/Users/rian/Rian-Design-Skills/A-next-app/exports/Riff-首页-可编辑分层.sketch'
const REFERENCE = '/var/folders/cg/8rkh5p9x3s79dn08_8j2bk5h0000gp/T/codex-clipboard-1d536306-8e79-4be2-9660-b4495c1cb19d.png'
const ASSET_ROOT = '/Users/rian/Rian-Design-Skills/A-next-app/public/images/page27/riff-interactive'

const ASSETS = {
  red: `${ASSET_ROOT}/red-suit.png`,
  city: `${ASSET_ROOT}/city.png`,
  snow: `${ASSET_ROOT}/snow.png`,
  beach: `${ASSET_ROOT}/beach.png`,
}

const IMAGE_SIZES = {
  [ASSETS.red]: { width: 770, height: 520 },
  [ASSETS.city]: { width: 420, height: 760 },
  [ASSETS.snow]: { width: 420, height: 760 },
  [ASSETS.beach]: { width: 520, height: 690 },
}

const C = {
  black: '#000000ff',
  surface: '#171717ff',
  surface2: '#1d1d1dff',
  white: '#ffffffff',
  white82: '#ffffffd1',
  white62: '#ffffff9e',
  white42: '#ffffff6b',
  line: '#ffffff1f',
  red: '#ff4b52ff',
  redDark: '#e83840ff',
}

function round(layer, radius) {
  try {
    layer.style.corners.radii = [radius, radius, radius, radius]
  } catch (_) {
    try {
      layer.points.forEach((point) => { point.cornerRadius = radius })
    } catch (_) {}
  }
  return layer
}

function rect(parent, name, x, y, width, height, fill, options = {}) {
  const layer = new ShapePath({
    parent,
    name,
    shapeType: options.oval ? ShapePath.ShapeType.Oval : ShapePath.ShapeType.Rectangle,
    frame: new Rectangle(x, y, width, height),
  })
  layer.style.fills = fill
    ? [{ color: fill, fillType: Style.FillType.Color }]
    : []
  layer.style.borders = options.border
    ? [{
        color: options.border,
        thickness: options.thickness || 1,
        position: Style.BorderPosition.Center,
      }]
    : []
  if (options.radius) round(layer, options.radius)
  if (options.shadows) layer.style.shadows = options.shadows
  if (options.opacity != null) layer.style.opacity = options.opacity
  return layer
}

function gradientRect(parent, name, x, y, width, height, stops, options = {}) {
  const layer = new ShapePath({
    parent,
    name,
    shapeType: ShapePath.ShapeType.Rectangle,
    frame: new Rectangle(x, y, width, height),
  })
  layer.style.fills = [{
    fillType: Style.FillType.Gradient,
    gradient: {
      gradientType: Style.GradientType.Linear,
      from: options.from || { x: 0.5, y: 0 },
      to: options.to || { x: 0.5, y: 1 },
      stops,
    },
  }]
  if (options.radius) round(layer, options.radius)
  return layer
}

function txt(parent, name, value, x, y, width, height, size, options = {}) {
  const layer = new Text({
    parent,
    name,
    text: value,
    frame: new Rectangle(x, y, width, height),
    fixedWidth: true,
  })
  layer.style.fontFamily = options.fontFamily || 'PingFang SC'
  layer.style.fontSize = size
  layer.style.fontWeight = options.weight == null ? 6 : options.weight
  layer.style.textColor = options.color || C.white
  layer.style.alignment = options.align || Text.Alignment.left
  layer.style.verticalAlignment = Text.VerticalAlignment.top
  layer.style.lineHeight = options.lineHeight || Math.round(size * 1.28)
  if (options.kerning != null) layer.style.kerning = options.kerning
  return layer
}

function group(parent, name, x, y, width, height) {
  return new Group({ parent, name, frame: new Rectangle(x, y, width, height) })
}

function svgPath(parent, name, d, x, y, width, height, options = {}) {
  const layer = ShapePath.fromSVGPath(d)
  layer.parent = parent
  layer.name = name
  layer.frame = new Rectangle(x, y, width, height)
  layer.style.fills = options.fill
    ? [{ color: options.fill, fillType: Style.FillType.Color }]
    : []
  layer.style.borders = options.border
    ? [{ color: options.border, thickness: options.thickness || 2 }]
    : []
  return layer
}

function addImageCover(parent, name, path, frame, options = {}) {
  const source = IMAGE_SIZES[path]
  const positionX = options.positionX == null ? 0.5 : options.positionX
  const positionY = options.positionY == null ? 0.5 : options.positionY
  const scale = Math.max(frame.width / source.width, frame.height / source.height)
  const imageWidth = source.width * scale
  const imageHeight = source.height * scale
  const imageX = (frame.width - imageWidth) * positionX
  const imageY = (frame.height - imageHeight) * positionY

  const wrapper = group(parent, name, frame.x, frame.y, frame.width, frame.height)
  const mask = rect(wrapper, 'Mask · Editable Radius', 0, 0, frame.width, frame.height, C.white, {
    radius: options.radius || 0,
  })
  mask.sketchObject.setHasClippingMask(true)
  new Image({
    parent: wrapper,
    name: 'Bitmap · Replaceable',
    image: path,
    frame: new Rectangle(imageX, imageY, imageWidth, imageHeight),
  })
  if (options.dim) rect(wrapper, 'Dim Overlay', 0, 0, frame.width, frame.height, options.dim)
  return wrapper
}

function addBorder(parent, name, x, y, width, height, radius, color, thickness = 1) {
  return rect(parent, name, x, y, width, height, null, {
    border: color,
    thickness,
    radius,
  })
}

function addPlay(parent, name, x, y, size, color = C.white) {
  return svgPath(parent, name, 'M0 0 L18 10 L0 20 Z', x, y, size * 0.9, size, { fill: color })
}

function addSearchIcon(parent, x, y) {
  const g = group(parent, 'Search · Vector', x, y, 43, 43)
  rect(g, 'Lens', 2, 2, 30, 30, null, { oval: true, border: C.white82, thickness: 3 })
  const handle = rect(g, 'Handle', 29, 29, 17, 3, C.white82, { radius: 2 })
  handle.transform.rotation = 45
  return g
}

function addProfileIcon(parent, x, y) {
  const g = group(parent, 'Profile · Vector', x, y, 45, 45)
  rect(g, 'Outer Circle', 1, 1, 42, 42, null, { oval: true, border: C.white82, thickness: 2.5 })
  rect(g, 'Head', 15, 9, 14, 14, null, { oval: true, border: C.white82, thickness: 2 })
  svgPath(g, 'Shoulders', 'M1 16 C4 5 20 5 23 16', 10, 22, 25, 15, { border: C.white82, thickness: 2 })
  return g
}

function addStatusBar(artboard) {
  const status = group(artboard, '01_Status Bar', 0, 0, 853, 75)
  txt(status, 'Time · 9:41', '9:41', 54, 24, 85, 34, 27, { weight: 7 })

  const icons = group(status, 'Status Icons', 682, 25, 126, 31)
  const bars = [9, 13, 18, 23]
  bars.forEach((height, index) => {
    rect(icons, `Signal Bar ${index + 1}`, index * 8, 25 - height, 5, height, C.white, { radius: 2 })
  })
  svgPath(icons, 'Wi-Fi Outer', 'M0 12 Q12 0 24 12', 37, 1, 27, 14, { border: C.white, thickness: 3 })
  svgPath(icons, 'Wi-Fi Inner', 'M0 8 Q7 1 14 8', 43, 9, 15, 9, { border: C.white, thickness: 3 })
  rect(icons, 'Wi-Fi Dot', 49, 21, 5, 5, C.white, { oval: true })
  rect(icons, 'Battery Outline', 78, 2, 40, 21, null, { border: C.white, thickness: 2.5, radius: 6 })
  rect(icons, 'Battery Fill', 82, 6, 31, 13, C.white, { radius: 3 })
  rect(icons, 'Battery Cap', 119, 8, 3, 9, C.white82, { radius: 2 })
}

function addHeader(artboard) {
  const header = group(artboard, '02_Header', 0, 75, 853, 105)
  txt(header, 'Logo · Riff', 'Riff', 45, 12, 150, 62, 48, {
    fontFamily: 'Helvetica Neue',
    weight: 10,
    kerning: -1,
  })

  const tabs = group(header, 'Feed Tabs', 318, 8, 222, 74)
  txt(tabs, 'Tab · 为你 · Active', '为你', 9, 7, 82, 48, 30, { weight: 7, align: Text.Alignment.center })
  rect(tabs, 'Active Indicator', 31, 62, 31, 5, C.red, { radius: 3 })
  txt(tabs, 'Tab · 新作', '新作', 132, 7, 82, 48, 30, { color: C.white62, weight: 6, align: Text.Alignment.center })

  const actions = group(header, 'Header Actions', 681, 15, 133, 55)
  addSearchIcon(actions, 0, 3)
  addProfileIcon(actions, 84, 0)
}

function addHero(artboard) {
  const hero = group(artboard, '03_Hero Carousel', 0, 180, 853, 858)

  addImageCover(hero, 'Previous Card · 红色节拍', ASSETS.red, {
    x: -470, y: 31, width: 560, height: 764,
  }, { radius: 28, positionX: 0.49, positionY: 0.5, dim: '#00000035' })
  addBorder(hero, 'Previous Card Border', -470, 31, 560, 764, 28, C.line)

  addImageCover(hero, 'Next Card · 雪线漫游', ASSETS.snow, {
    x: 762, y: 31, width: 560, height: 764,
  }, { radius: 28, positionX: 0.5, positionY: 0.48, dim: '#00000020' })
  addBorder(hero, 'Next Card Border', 762, 31, 560, 764, 28, C.line)

  const current = group(hero, 'Current Card · 午夜变装', 112, 0, 629, 858)
  const mask = rect(current, 'Card Mask · Editable Radius', 0, 0, 629, 858, C.white, { radius: 29 })
  mask.sketchObject.setHasClippingMask(true)

  const source = IMAGE_SIZES[ASSETS.city]
  const scale = Math.max(629 / source.width, 858 / source.height)
  const imageHeight = source.height * scale
  new Image({
    parent: current,
    name: 'Bitmap · City · Replaceable',
    image: ASSETS.city,
    frame: new Rectangle(0, (858 - imageHeight) * 0.4, 629, imageHeight),
  })
  gradientRect(current, 'Bottom Readability Gradient', 0, 420, 629, 438, [
    { position: 0, color: '#00000000' },
    { position: 0.33, color: '#00000024' },
    { position: 1, color: '#000000f5' },
  ])
  txt(current, 'Title · 午夜变装', '午夜变装', 29, 622, 340, 70, 46, { weight: 9, lineHeight: 58 })
  addPlay(current, 'Play · Vector', 31, 711, 27)
  txt(current, 'Time · 00:08 / 00:12', '00:08 / 00:12', 71, 704, 250, 42, 25, { weight: 5, lineHeight: 34 })
  txt(current, 'Metadata', '6 个镜头 · 3 次转场 · 人物卡点', 29, 760, 500, 42, 24, { weight: 5, lineHeight: 34 })
  rect(current, 'Progress · Track', 29, 820, 569, 7, '#ffffff3b', { radius: 4 })
  rect(current, 'Progress · Played', 29, 820, 333, 7, C.red, { radius: 4 })
  addBorder(current, 'Card Border', 0, 0, 629, 858, 29, C.line, 1.5)
}

function addMaterialSwitcher(artboard) {
  const switcher = group(artboard, '04_Material Switcher', 31, 1040, 790, 202)
  rect(switcher, 'Tray', 0, 0, 790, 202, '#151515ff', { radius: 24, border: '#ffffff12' })
  const cards = [
    { name: 'Thumb · 红色西装', path: ASSETS.red, x: 16, width: 178, px: 0.5, py: 0.5 },
    { name: 'Thumb · 城市夜景 · Active', path: ASSETS.city, x: 204, width: 188, px: 0.5, py: 0.4, active: true },
    { name: 'Thumb · 雪山', path: ASSETS.snow, x: 400, width: 184, px: 0.5, py: 0.45 },
    { name: 'Thumb · 海边', path: ASSETS.beach, x: 592, width: 183, px: 0.5, py: 0.5 },
  ]
  cards.forEach((card) => {
    addImageCover(switcher, card.name, card.path, { x: card.x, y: 12, width: card.width, height: 179 }, {
      radius: 12,
      positionX: card.px,
      positionY: card.py,
    })
    addBorder(switcher, `${card.name} · Border`, card.x, 12, card.width, 179, 12, card.active ? C.red : '#ffffff18', card.active ? 3 : 1)
  })
}

function addActions(artboard) {
  const actions = group(artboard, '05_Actions', 47, 1257, 755, 66)
  rect(actions, 'Button · Secondary · Background', 0, 0, 354, 66, '#1c1c1cff', { radius: 11, border: '#ffffff0f' })
  txt(actions, 'Button · Secondary · Label', '查看做法', 0, 15, 354, 38, 25, { weight: 6, align: Text.Alignment.center })

  const primary = rect(actions, 'Button · Primary · Background', 365, 0, 390, 66, C.red, {
    radius: 11,
    shadows: [{ color: '#ff4b5238', blur: 20, x: 0, y: 6, spread: 0, enabled: true }],
  })
  primary.style.fills = [{
    fillType: Style.FillType.Gradient,
    gradient: {
      gradientType: Style.GradientType.Linear,
      from: { x: 0, y: 0.5 },
      to: { x: 1, y: 0.5 },
      stops: [
        { position: 0, color: '#ff4b52ff' },
        { position: 1, color: '#f83e47ff' },
      ],
    },
  }]
  txt(actions, 'Button · Primary · Label', '做同款', 365, 15, 390, 38, 25, { weight: 7, align: Text.Alignment.center })
}

function addContinueCard(parent, options) {
  const card = group(parent, options.name, options.x, 48, 242, 298)
  const mask = rect(card, 'Mask · Editable Radius', 0, 0, 242, 298, C.white, { radius: 10 })
  mask.sketchObject.setHasClippingMask(true)

  const source = IMAGE_SIZES[options.path]
  const scale = Math.max(242 / source.width, 298 / source.height)
  const imageWidth = source.width * scale
  const imageHeight = source.height * scale
  new Image({
    parent: card,
    name: 'Bitmap · Replaceable',
    image: options.path,
    frame: new Rectangle((242 - imageWidth) * (options.px || 0.5), (298 - imageHeight) * (options.py || 0.5), imageWidth, imageHeight),
  })
  gradientRect(card, 'Bottom Gradient', 0, 154, 242, 144, [
    { position: 0, color: '#00000000' },
    { position: 1, color: '#000000e8' },
  ])
  addPlay(card, 'Play · Vector', 108, 134, 31)
  txt(card, 'Title', options.title, 16, 258, 160, 34, 23, { weight: 6, lineHeight: 29 })
  ;[0, 1, 2].forEach((index) => rect(card, `More Dot ${index + 1}`, 207 + index * 8, 272, 4, 4, C.white82, { oval: true }))
  addBorder(card, 'Card Border', 0, 0, 242, 298, 10, '#ffffff2b')
}

function addContinue(artboard) {
  const section = group(artboard, '06_Continue', 47, 1359, 758, 346)
  txt(section, 'Section Title · 继续看', '继续看', 0, 0, 160, 42, 27, { weight: 7, lineHeight: 36 })
  addContinueCard(section, { name: 'Video Card · 红色节拍', title: '红色节拍', path: ASSETS.red, x: 0, px: 0.48, py: 0.5 })
  addContinueCard(section, { name: 'Video Card · 雪线漫游', title: '雪线漫游', path: ASSETS.snow, x: 259, px: 0.5, py: 0.44 })
  addContinueCard(section, { name: 'Video Card · 海边一天', title: '海边一天', path: ASSETS.beach, x: 517, px: 0.5, py: 0.5 })
}

function addHomeIcon(parent, x, y) {
  const g = group(parent, 'Home · Vector', x, y, 38, 38)
  svgPath(g, 'House', 'M2 17 L19 3 L36 17 L36 36 L24 36 L24 24 L14 24 L14 36 L2 36 Z', 0, 0, 38, 38, { fill: C.white })
  return g
}

function addProjectIcon(parent, x, y) {
  const g = group(parent, 'Projects · Vector', x, y, 40, 40)
  rect(g, 'Screen', 2, 3, 36, 30, null, { border: C.white62, thickness: 2, radius: 4 })
  addPlay(g, 'Play', 14, 11, 12, C.white62)
  rect(g, 'Stand', 12, 37, 16, 2, C.white62, { radius: 1 })
  return g
}

function addBottomNav(artboard) {
  const nav = group(artboard, '07_Bottom Navigation', 0, 1731, 853, 113)
  gradientRect(nav, 'Bar Background', 0, 0, 853, 113, [
    { position: 0, color: '#1c1c1cff' },
    { position: 1, color: '#0f0f0fff' },
  ])
  rect(nav, 'Top Divider', 0, 0, 853, 1, '#ffffff16')

  addHomeIcon(nav, 111, 14)
  txt(nav, 'Home Label · Active', '首页', 89, 54, 82, 31, 21, { weight: 7, align: Text.Alignment.center })

  rect(nav, 'Create Video · Button', 294, 12, 263, 61, C.red, { radius: 20 })
  txt(nav, 'Create Video · Plus', '＋', 341, 23, 48, 34, 34, { weight: 4, align: Text.Alignment.center, lineHeight: 38 })
  txt(nav, 'Create Video · Label', '做视频', 397, 24, 104, 34, 25, { weight: 7, align: Text.Alignment.center })

  addProjectIcon(nav, 700, 16)
  txt(nav, 'Projects Label', '项目', 676, 54, 88, 31, 21, { color: C.white62, weight: 5, align: Text.Alignment.center })
  rect(nav, 'Home Indicator', 289, 91, 276, 9, C.white, { radius: 5 })
}

function addReference(artboard) {
  const reference = new Image({
    parent: artboard,
    name: '00_Reference Screenshot · Hidden',
    image: REFERENCE,
    frame: new Rectangle(0, 0, 853, 1844),
  })
  reference.hidden = true
  reference.locked = true
}

function makeDocument() {
  const document = new Document()
  const page = document.pages[0]
  page.name = 'Riff · Layered UI'

  const artboard = new Artboard({
    parent: page,
    name: 'Riff / Home / Default · 853×1844',
    frame: new Rectangle(0, 0, 853, 1844),
  })

  rect(artboard, '00_Background · #000000', 0, 0, 853, 1844, C.black)
  addStatusBar(artboard)
  addHeader(artboard)
  addHero(artboard)
  addMaterialSwitcher(artboard)
  addActions(artboard)
  addContinue(artboard)
  addBottomNav(artboard)
  addReference(artboard)

  document.selectedPage = page
  return document
}

function onRun() {
  const document = makeDocument()
  const fiber = async.createFiber()
  document.save(OUTPUT, { saveMode: Document.SaveMode.SaveAs }, (error) => {
    if (error) console.error(`SKETCH_EXPORT_ERROR:${error}`)
    else console.log(`SKETCH_EXPORT_OK:${OUTPUT}`)
    fiber.cleanup()
  })
}

module.exports = { onRun }
