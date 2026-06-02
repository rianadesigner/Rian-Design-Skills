#!/usr/bin/env node
/**
 * sync-tokens.mjs
 *
 * 读取 *.DESIGN-enriched.md 的 YAML frontmatter，
 * 自动生成（单包 @iflow.cn/iflow-design）：
 *   packages/iflow-design/css/iflow.component-tokens.css  — 组件级语义 CSS 变量
 *   packages/iflow-design/tokens.json                      — 机器可读 token 清单
 *
 * 使用方式：
 *   node scripts/sync-tokens.mjs
 *   （或 npm run sync 在根目录执行）
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = resolve(__dir, '..')

// ─────────────────────────────────────────────────────────────────
// 1. 读取并解析 MD frontmatter
// ─────────────────────────────────────────────────────────────────

function readFrontmatter(relPath) {
  const content = readFileSync(resolve(root, relPath), 'utf-8')
  // 取 --- ... --- 之间的内容
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) { console.warn(`⚠ 未找到 frontmatter: ${relPath}`); return {} }
  return yaml.load(match[1]) ?? {}
}

const elementSpec = readFrontmatter('design-specs/element-DESIGN-enriched.md')
const buttonSpec  = readFrontmatter('design-specs/button-component-DESIGN-enriched.md')

// 合并：button spec 优先（更具体），element 作为补充
const spec = {
  colors:     { ...elementSpec.colors,     ...buttonSpec.colors     },
  typography: { ...elementSpec.typography, ...buttonSpec.typography },
  rounded:    { ...elementSpec.rounded,    ...buttonSpec.rounded    },
  spacing:    { ...elementSpec.spacing,    ...buttonSpec.spacing    },
  motion:     buttonSpec.motion ?? {},
  components: buttonSpec.components ?? {},
}

// ─────────────────────────────────────────────────────────────────
// 2. 工具函数
// ─────────────────────────────────────────────────────────────────

/** camelCase / 任意字符串 → kebab-case */
function toKebab(str) {
  return String(str)
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
}

/**
 * 解析 "{colors.colorPrimary}" 风格的引用，返回实际值。
 * 若无法解析则原样返回。
 */
function resolveRef(value) {
  if (typeof value !== 'string') return value
  return value.replace(/\{([^}]+)\}/g, (_, path) => {
    const parts = path.split('.')
    let v = spec
    for (const p of parts) v = v?.[p]
    if (v === undefined || v === null) return `/* unresolved: ${path} */`
    if (typeof v === 'object') return JSON.stringify(v)
    return v
  })
}

// ─────────────────────────────────────────────────────────────────
// 3. 将 spec 转成扁平 token map
//    key = CSS 变量名（不含 --iflow- 前缀）
//    value = 解析后的值
// ─────────────────────────────────────────────────────────────────

const tokens = {}          // { varName: { value, comment } }
const BUTTON_SECTION_PREFIX = 'iflow'

function addToken(varName, value, comment = '') {
  tokens[varName] = { value: resolveRef(value), comment }
}

// §A 颜色 token（来自 button 规范，与 Figma 组件库对齐）
for (const [key, val] of Object.entries(spec.colors ?? {})) {
  addToken(`${BUTTON_SECTION_PREFIX}-spec-${toKebab(key)}`, val, `colors.${key}`)
}

// §B 字体 token
for (const [key, val] of Object.entries(spec.typography ?? {})) {
  if (typeof val === 'object') {
    for (const [prop, pval] of Object.entries(val)) {
      addToken(
        `${BUTTON_SECTION_PREFIX}-typo-${toKebab(key)}-${toKebab(prop)}`,
        pval,
        `typography.${key}.${prop}`
      )
    }
  } else {
    addToken(`${BUTTON_SECTION_PREFIX}-typo-${toKebab(key)}`, val, `typography.${key}`)
  }
}

// §C 圆角
for (const [key, val] of Object.entries(spec.rounded ?? {})) {
  addToken(`${BUTTON_SECTION_PREFIX}-spec-radius-${toKebab(key)}`, val, `rounded.${key}`)
}

// §D 间距 / 尺寸
for (const [key, val] of Object.entries(spec.spacing ?? {})) {
  addToken(`${BUTTON_SECTION_PREFIX}-spec-${toKebab(key)}`, val, `spacing.${key}`)
}

// §E 组件语义 token（展开 button-primary / button-default / button-text / … 所有属性）
for (const [comp, props] of Object.entries(spec.components ?? {})) {
  if (typeof props !== 'object') continue
  for (const [prop, val] of Object.entries(props)) {
    // 跳过嵌套对象（如 typographyMd 引用整个 typography 对象时）
    const resolved = resolveRef(val)
    if (typeof resolved === 'object') continue
    addToken(
      `${BUTTON_SECTION_PREFIX}-${toKebab(comp)}-${toKebab(prop)}`,
      resolved,
      `components.${comp}.${prop}`
    )
  }
}

// ─────────────────────────────────────────────────────────────────
// 4. 生成 CSS 文件
// ─────────────────────────────────────────────────────────────────

const cssOutDir = resolve(root, 'packages/iflow-design/css')
mkdirSync(cssOutDir, { recursive: true })

const sections = {
  'spec-color':       '§A 颜色规范（来自 button-component-DESIGN-enriched.md）',
  'spec-radius':      '§B 圆角规范',
  'spec-button':      '§C 按钮尺寸/间距',
  'typo-':            '§D 字体规范',
  'button-primary':   '§E Button Primary — 组件语义 token',
  'button-default':   '§F Button Default',
  'button-text':      '§G Button Text（纯文本按钮）',
  'button-link':      '§H Button Link',
  'button-danger':    '§I Button Danger',
}

/** 按 key 前缀分组 */
function groupTokens() {
  const groups = {}
  for (const [key, meta] of Object.entries(tokens)) {
    let group = '_other'
    for (const prefix of Object.keys(sections)) {
      if (key.startsWith(`iflow-${prefix}`)) { group = prefix; break }
    }
    if (!groups[group]) groups[group] = []
    groups[group].push({ key, ...meta })
  }
  return groups
}

const groups = groupTokens()
const cssLines = [
  '/**',
  ' * iflow.component-tokens.css',
  ' * ⚠️  自动生成 — 请勿手动编辑',
  ' * 来源：button-component-DESIGN-enriched.md + element-DESIGN-enriched.md',
  ` * 生成时间：${new Date().toISOString()}`,
  ' *',
  ' * 这些变量是从设计稿 YAML frontmatter 中提取的组件级语义 token，',
  ' * 可配合 iflow.tokens.css 中的基础 token 一起使用。',
  ' */',
  '',
  ':root {',
]

for (const [prefix, title] of Object.entries(sections)) {
  const items = groups[prefix] ?? []
  if (!items.length) continue

  cssLines.push('')
  cssLines.push(`  /* ${'─'.repeat(52)}`)
  cssLines.push(`     ${title}`)
  cssLines.push(`  ${'─'.repeat(52)} */`)

  // 计算对齐宽度
  const maxLen = Math.max(...items.map(i => `--${i.key}`.length))
  for (const item of items) {
    const varPart = `  --${item.key}:`.padEnd(maxLen + 4)
    const val = typeof item.value === 'boolean' ? String(item.value) : item.value
    const comment = item.comment ? `  /* ${item.comment} */` : ''
    cssLines.push(`${varPart}${val};${comment}`)
  }
}

// 其余 token（未分类）
const others = groups['_other'] ?? []
if (others.length) {
  cssLines.push('')
  cssLines.push('  /* ─── 其他 token ─── */')
  for (const item of others) {
    cssLines.push(`  --${item.key}: ${item.value};  /* ${item.comment} */`)
  }
}

cssLines.push('}', '')
writeFileSync(resolve(cssOutDir, 'iflow.component-tokens.css'), cssLines.join('\n'), 'utf-8')
console.log('✅ 生成 packages/iflow-design/css/iflow.component-tokens.css')

// ─────────────────────────────────────────────────────────────────
// 5. 生成 tokens.json（机器可读，方便 JS/TS 消费）
// ─────────────────────────────────────────────────────────────────

const tokensJson = {
  _meta: {
    generated: new Date().toISOString(),
    sources: ['button-component-DESIGN-enriched.md', 'element-DESIGN-enriched.md'],
    description: '心流设计系统组件级语义 token（由 sync-tokens.mjs 自动生成）',
  },
  tokens: Object.fromEntries(
    Object.entries(tokens).map(([key, { value, comment }]) => [
      `--${key}`,
      { value: typeof value === 'boolean' ? String(value) : value, source: comment },
    ])
  ),
}

const jsonOut = resolve(root, 'packages/iflow-design/tokens.json')
writeFileSync(jsonOut, JSON.stringify(tokensJson, null, 2), 'utf-8')
console.log('✅ 生成 packages/iflow-design/tokens.json')

// ─────────────────────────────────────────────────────────────────
// 6. 统计输出
// ─────────────────────────────────────────────────────────────────
const total = Object.keys(tokens).length
console.log(`\n📊 共生成 ${total} 个 CSS 变量`)
console.log('   颜色 spec:  ', Object.keys(tokens).filter(k => k.includes('-spec-color')).length)
console.log('   组件 token:', Object.keys(tokens).filter(k => k.includes('-button-')).length)
console.log('   字体 token:', Object.keys(tokens).filter(k => k.includes('-typo-')).length)
