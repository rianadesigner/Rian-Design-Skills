export type KnowledgeNode = {
  id: string
  label: string
  description: string
}

export const KNOWLEDGE_NODES = [
  {
    id: "framework",
    label: "升学决策框架",
    description: "汇总政策、院校、学科与分数数据，形成升学决策的总索引。",
  },
  {
    id: "school",
    label: "院校画像",
    description: "将院校属性、优势学科与招生信息归并为可检索的学校节点。",
  },
  {
    id: "tier",
    label: "高校层级体系",
    description: "统一双一流、985、211 与普通本科的层级定位和比较口径。",
  },
  {
    id: "policy",
    label: "政策依据",
    description: "从政策文件中抽取招生规则、地区限制与专项计划等约束。",
  },
  {
    id: "score",
    label: "分数线体系",
    description: "把历年省份、批次与院校分数线整理为统一的趋势数据。",
  },
  {
    id: "preparation",
    label: "备考行动路径",
    description: "根据政策、目标院校和学科基础，编排阶段性的备考行动。",
  },
  {
    id: "subject",
    label: "学科专业实力",
    description: "融合学科评估和专业建设信息，支持专业方向的横向比较。",
  },
  {
    id: "strategy",
    label: "志愿填报策略",
    description: "综合分数、层级和专业偏好，生成可解释的志愿填报策略。",
  },
  {
    id: "match",
    label: "录取匹配关系",
    description: "把用户分数与目标院校门槛关联，形成可追溯的匹配判断。",
  },
  {
    id: "regional-policy",
    label: "省份招生政策",
    description: "汇总各省市招生口径、批次规则与专项计划差异。",
  },
  {
    id: "major-path",
    label: "专业发展方向",
    description: "连接专业能力、培养路径与未来就业方向，辅助长期选择。",
  },
  {
    id: "admission-trend",
    label: "历年录取趋势",
    description: "按年份、地区与院校观察录取位次和门槛变化。",
  },
  {
    id: "subject-choice",
    label: "选科要求",
    description: "整理不同专业组的选科限制与科目组合要求。",
  },
  {
    id: "region-preference",
    label: "院校地域偏好",
    description: "将城市、区域机会与个人生活偏好纳入院校选择。",
  },
  {
    id: "quota",
    label: "招生计划",
    description: "追踪院校专业组的年度招生人数与计划变化。",
  },
  {
    id: "admission-policy",
    label: "招生政策",
    description: "沉淀考试、报名、投档与录取环节的政策口径。",
  },
  {
    id: "region-rules",
    label: "地区规则",
    description: "记录不同省份在批次、科目和投档方式上的差异。",
  },
  {
    id: "special-plan",
    label: "专项计划",
    description: "整理强基、国家专项与地方专项等特殊招生路径。",
  },
  {
    id: "school-tier",
    label: "院校层级",
    description: "按办学层级、资源与社会认知形成院校定位。",
  },
  {
    id: "double-first-class",
    label: "双一流名单",
    description: "跟踪双一流建设高校与建设学科的最新名单。",
  },
  {
    id: "subject-evaluation",
    label: "学科评估",
    description: "汇总学科评估、重点学科与专业认证信息。",
  },
  {
    id: "major-catalog",
    label: "专业目录",
    description: "统一专业名称、专业代码与学科门类的映射关系。",
  },
  {
    id: "course-base",
    label: "课程基础",
    description: "识别目标专业对高中科目与能力基础的要求。",
  },
  {
    id: "mock-score",
    label: "模考成绩",
    description: "将多次模考成绩转化为稳定度与位次区间。",
  },
  {
    id: "rank-conversion",
    label: "位次换算",
    description: "在不同年份和科目组合间进行分数位次换算。",
  },
  {
    id: "score-control",
    label: "批次控制线",
    description: "记录省控线、特殊类型线与批次边界变化。",
  },
  {
    id: "school-cutoff",
    label: "院校投档线",
    description: "追踪院校在不同省份与年份的最低投档门槛。",
  },
  {
    id: "major-cutoff",
    label: "专业录取线",
    description: "细化到专业组与具体专业的录取分数和位次。",
  },
  {
    id: "plan-change",
    label: "计划变化",
    description: "识别年度招生计划增减对录取概率的影响。",
  },
  {
    id: "city-opportunity",
    label: "城市机会",
    description: "衡量城市产业、实习、就业与生活资源。",
  },
  {
    id: "tuition-cost",
    label: "学费成本",
    description: "汇总学费、住宿费与异地学习成本。",
  },
  {
    id: "employment",
    label: "就业方向",
    description: "连接专业培养结果、行业岗位与职业发展空间。",
  },
  {
    id: "cultivation-path",
    label: "培养路径",
    description: "呈现课程体系、实践模块与人才培养特色。",
  },
  {
    id: "advanced-study",
    label: "升学路径",
    description: "梳理保研、考研、留学与直博等继续深造路径。",
  },
  {
    id: "rush-safe",
    label: "冲稳保组合",
    description: "依据录取概率构建冲刺、稳妥与保底梯度。",
  },
  {
    id: "risk-check",
    label: "风险校验",
    description: "检查退档、体检、单科与专业调剂等潜在风险。",
  },
  {
    id: "admission-probability",
    label: "录取概率",
    description: "综合位次、计划和历史波动估算录取区间。",
  },
  {
    id: "preference-order",
    label: "志愿顺序",
    description: "结合偏好与风险安排院校和专业组的填报顺序。",
  },
  {
    id: "review",
    label: "方案复盘",
    description: "保留方案版本、依据与调整记录，支持持续复盘。",
  },
  {
    id: "data-source",
    label: "数据来源",
    description: "标记政策、院校官网与公开数据的来源和可信度。",
  },
  {
    id: "update-time",
    label: "更新时间",
    description: "记录知识节点的更新时间与有效期。",
  },
  {
    id: "career-interest",
    label: "职业兴趣",
    description: "把个人兴趣、能力倾向与专业职业方向建立关联。",
  },
] satisfies readonly KnowledgeNode[]

export type KnowledgeNodeSource = {
  kind: "demo"
  fileName: string
  section: string
}

const KNOWLEDGE_SOURCE_GROUPS = [
  {
    fileName: "志愿报考指南",
    section: "升学决策与志愿策略",
    nodeIds: [
      "framework",
      "strategy",
      "match",
      "region-preference",
      "rush-safe",
      "risk-check",
      "admission-probability",
      "preference-order",
      "review",
      "career-interest",
    ],
  },
  {
    fileName: "双一流大学介绍.pdf",
    section: "院校画像与层级",
    nodeIds: [
      "school",
      "tier",
      "subject",
      "school-tier",
      "double-first-class",
      "city-opportunity",
      "tuition-cost",
    ],
  },
  {
    fileName: "教育部公告",
    section: "政策改革与地区实施细则",
    nodeIds: [
      "policy",
      "regional-policy",
      "admission-policy",
      "region-rules",
      "special-plan",
    ],
  },
  {
    fileName: "各省录取分数线汇总",
    section: "历年分数与录取趋势",
    nodeIds: [
      "score",
      "admission-trend",
      "mock-score",
      "rank-conversion",
      "score-control",
      "school-cutoff",
      "major-cutoff",
      "plan-change",
      "update-time",
    ],
  },
  {
    fileName: "高校招生简章 · Notion",
    section: "招生专业与录取要求",
    nodeIds: ["quota", "major-catalog", "cultivation-path"],
  },
  {
    fileName: "选科搭配策略 · 飞书文档",
    section: "选科组合与专业匹配",
    nodeIds: ["preparation", "subject-choice", "course-base"],
  },
  {
    fileName: "学科评估笔记",
    section: "学科与专业发展",
    nodeIds: [
      "major-path",
      "subject-evaluation",
      "employment",
      "advanced-study",
    ],
  },
  {
    fileName: "知识库编译索引（系统生成）",
    section: "来源追踪与版本信息",
    nodeIds: ["data-source"],
  },
] satisfies readonly {
  fileName: string
  section: string
  nodeIds: readonly string[]
}[]

const KNOWLEDGE_SOURCE_BY_NODE_ID = new Map<string, KnowledgeNodeSource>()

KNOWLEDGE_SOURCE_GROUPS.forEach(({ fileName, section, nodeIds }) => {
  nodeIds.forEach((nodeId) => {
    KNOWLEDGE_SOURCE_BY_NODE_ID.set(nodeId, {
      kind: "demo",
      fileName,
      section,
    })
  })
})

export function getKnowledgeNodeSource(nodeId: string): KnowledgeNodeSource {
  return (
    KNOWLEDGE_SOURCE_BY_NODE_ID.get(nodeId) ?? {
      kind: "demo",
      fileName: "知识库编译索引（系统生成）",
      section: "未分类编译节点",
    }
  )
}

export function getKnowledgeNodeDemoExcerpt(node: KnowledgeNode) {
  const source = getKnowledgeNodeSource(node.id)

  return [
    "以下内容用于演示 Wiki 节点完成溯源后的阅读形态，并非源文件中的逐字原文。",
    `围绕「${node.label}」，当前节点的整理结论是：${node.description}`,
    `在「${source.section}」这一整理主题下，阅读材料时需要先确认信息出现的章节、表格或段落，并同步核对政策适用范围、数据年份、地区差异、院校口径与更新时间，避免脱离上下文，只凭一个数字或一句结论作出判断。`,
    "如果资料来自政策公告、招生简章、院校介绍或分数统计，还应继续检查发布机构、发布日期、专业与批次条件，以及是否存在补充通知或后续修订；涉及趋势判断时，则需要同时观察连续年份的位次变化、招生计划变化和样本口径，区分稳定规律、短期波动与异常值。",
    `编译为「${node.label}」节点后，这段资料会与相邻概念建立连接，用来说明该信息为什么重要、会影响哪些升学选择，以及与其他节点之间是支持、补充还是约束关系。用户查看关联节点时，应能沿着这些连接返回上下游证据，而不是只看到脱离来源的标签。`,
    "当前演示数据尚未保存真实页码、段落编号和逐字摘录，因此不能作为正式引用。接入知识库后，此处应替换为可返回原文件的真实片段，并显示文件名、章节标题、页码或段落锚点、版本时间及引用范围，确保每个结论都能够被定位、核对上下文并追溯来源。",
  ].join("")
}

export const KNOWLEDGE_EDGES = [
  ["framework", "school"],
  ["framework", "tier"],
  ["framework", "policy"],
  ["framework", "score"],
  ["framework", "preparation"],
  ["framework", "subject"],
  ["framework", "strategy"],
  ["framework", "match"],
  ["school", "school-tier"],
  ["school", "double-first-class"],
  ["school", "city-opportunity"],
  ["school", "tuition-cost"],
  ["tier", "school-tier"],
  ["tier", "double-first-class"],
  ["tier", "subject-evaluation"],
  ["tier", "score"],
  ["policy", "regional-policy"],
  ["policy", "admission-policy"],
  ["policy", "region-rules"],
  ["policy", "special-plan"],
  ["policy", "subject-choice"],
  ["regional-policy", "admission-policy"],
  ["regional-policy", "region-rules"],
  ["regional-policy", "special-plan"],
  ["subject-choice", "course-base"],
  ["subject-choice", "major-catalog"],
  ["score", "mock-score"],
  ["score", "rank-conversion"],
  ["score", "score-control"],
  ["score", "school-cutoff"],
  ["score", "major-cutoff"],
  ["score", "admission-trend"],
  ["admission-trend", "school-cutoff"],
  ["admission-trend", "major-cutoff"],
  ["preparation", "course-base"],
  ["preparation", "mock-score"],
  ["preparation", "subject-choice"],
  ["subject", "subject-evaluation"],
  ["subject", "major-catalog"],
  ["subject", "major-path"],
  ["major-path", "employment"],
  ["major-path", "cultivation-path"],
  ["major-path", "advanced-study"],
  ["major-path", "career-interest"],
  ["major-catalog", "career-interest"],
  ["strategy", "rush-safe"],
  ["strategy", "risk-check"],
  ["strategy", "preference-order"],
  ["strategy", "review"],
  ["strategy", "region-preference"],
  ["match", "admission-probability"],
  ["match", "rank-conversion"],
  ["match", "school-cutoff"],
  ["match", "major-cutoff"],
  ["match", "quota"],
  ["quota", "plan-change"],
  ["quota", "admission-probability"],
  ["quota", "major-cutoff"],
  ["rush-safe", "admission-probability"],
  ["rush-safe", "risk-check"],
  ["preference-order", "region-preference"],
  ["preference-order", "career-interest"],
  ["region-preference", "city-opportunity"],
  ["data-source", "update-time"],
  ["data-source", "policy"],
  ["data-source", "school"],
  ["update-time", "admission-trend"],
  ["update-time", "plan-change"],
  ["review", "update-time"],
] as const

export const MIN_SELECTED_RELATED_NODES = 20

const KNOWLEDGE_ADJACENCY = new Map(
  KNOWLEDGE_NODES.map((node) => [node.id, [] as string[]])
)

KNOWLEDGE_EDGES.forEach(([from, to]) => {
  KNOWLEDGE_ADJACENCY.get(from)?.push(to)
  KNOWLEDGE_ADJACENCY.get(to)?.push(from)
})

export function getRelatedNodeIds(selectedId: string) {
  return new Set(KNOWLEDGE_ADJACENCY.get(selectedId) ?? [])
}

export function getExpandedRelatedNodeIds(
  selectedId: string,
  minimumCount = MIN_SELECTED_RELATED_NODES
) {
  if (!KNOWLEDGE_ADJACENCY.has(selectedId)) return []

  const targetCount = Math.min(
    Math.max(0, minimumCount),
    KNOWLEDGE_NODES.length - 1
  )
  const visited = new Set([selectedId])
  const queue = [selectedId]
  const relatedIds: string[] = []

  while (queue.length && relatedIds.length < targetCount) {
    const currentId = queue.shift()!
    const neighbors = KNOWLEDGE_ADJACENCY.get(currentId) ?? []

    for (const neighborId of neighbors) {
      if (visited.has(neighborId)) continue
      visited.add(neighborId)
      queue.push(neighborId)
      relatedIds.push(neighborId)
      if (relatedIds.length >= targetCount) break
    }
  }

  if (relatedIds.length < targetCount) {
    for (const node of KNOWLEDGE_NODES) {
      if (visited.has(node.id)) continue
      visited.add(node.id)
      relatedIds.push(node.id)
      if (relatedIds.length >= targetCount) break
    }
  }

  return relatedIds
}
