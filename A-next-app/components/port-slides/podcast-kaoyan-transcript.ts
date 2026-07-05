export type TranscriptSegment = {
  start: number;
  end: number;
  speaker: string;
  text: string;
};

/** 与 podcast-kaoyan.mp3（约 6:41）对齐的演示文稿 */
export const KAOYAN_TRANSCRIPT: TranscriptSegment[] = [
  {
    start: 0,
    end: 22,
    speaker: "主播",
    text: "欢迎收听本期播客。今天我们来系统聊聊考研全年复习规划，帮你在有限时间里把精力花在刀刃上。",
  },
  {
    start: 22,
    end: 45,
    speaker: "主播",
    text: "首先明确一点：考研不是「学越多越好」，而是「在正确阶段做正确的事」。全年可以粗略分为基础、强化、冲刺三个阶段。",
  },
  {
    start: 45,
    end: 70,
    speaker: "主播",
    text: "基础阶段建议从大三下学期或暑假开始。数学和专业课要优先建立知识框架，英语以单词和长难句为主，政治可以先不急着背。",
  },
  {
    start: 70,
    end: 95,
    speaker: "嘉宾",
    text: "数学方面，建议选定一位主讲老师后跟完一整轮，不要频繁换资料。每章学完必须做配套习题，错题要标注原因而不是只抄答案。",
  },
  {
    start: 95,
    end: 120,
    speaker: "嘉宾",
    text: "英语单词推荐用 App 碎片化记忆，但真题阅读一定要留到有一定词汇量之后。早期可以精读外刊或考研同源材料练语感。",
  },
  {
    start: 120,
    end: 145,
    speaker: "主播",
    text: "政治通常从暑假后期启动即可。先听一遍课建立考点地图，再进入刷题。不要过早背诵，否则后期容易遗忘。",
  },
  {
    start: 145,
    end: 170,
    speaker: "主播",
    text: "强化阶段是暑假到十月前后。这个阶段的核心任务是：真题驱动、查漏补缺、提高解题速度。",
  },
  {
    start: 170,
    end: 195,
    speaker: "嘉宾",
    text: "专业课如果是自命题，一定要尽早拿到历年真题。分析出题风格比盲目刷参考书更重要，必要时可以联系学长学姐获取复习笔记。",
  },
  {
    start: 195,
    end: 220,
    speaker: "嘉宾",
    text: "暑假建议制定「周计划」而不是空泛的月计划。每周固定完成哪些章节、哪些真题套卷，完成率比完美计划更有价值。",
  },
  {
    start: 220,
    end: 245,
    speaker: "主播",
    text: "进入九月后，建议开始整套限时模拟。数学和英语每周至少各做一套，严格按考试时间，训练时间分配和心态。",
  },
  {
    start: 245,
    end: 270,
    speaker: "主播",
    text: "十月至十一月是冲刺期。政治进入背诵高峰，英语作文模板要动手写而不是只背，数学侧重错题回顾和公式默写。",
  },
  {
    start: 270,
    end: 295,
    speaker: "嘉宾",
    text: "冲刺期最容易犯的错误是「贪多求快」。每天新增内容应减少，把 70% 时间用在回顾旧知识和错题上，效果往往更好。",
  },
  {
    start: 295,
    end: 320,
    speaker: "嘉宾",
    text: "作息方面，尽量与考试时段对齐。例如上午做数学、下午做英语，让大脑在对应时间段保持最佳状态。",
  },
  {
    start: 320,
    end: 345,
    speaker: "主播",
    text: "心理调节同样重要。如果连续三天效率低下，不要硬扛，可以安排半天运动或社交，避免长期焦虑导致崩盘。",
  },
  {
    start: 345,
    end: 370,
    speaker: "主播",
    text: "考前两周建议降低新题比例，以回顾笔记、公式、作文句型为主。保证睡眠，考前一天以熟悉考场路线和证件准备为重。",
  },
  {
    start: 370,
    end: 395,
    speaker: "嘉宾",
    text: "最后送一句话：考研是马拉松不是短跑。稳定输出比偶尔的高强度更可靠。祝各位一战成硕，我们下期再见。",
  },
  {
    start: 395,
    end: 401,
    speaker: "主播",
    text: "感谢收听《考研全年复习规划播客》，欢迎点赞、下载与分享。",
  },
];

export function findTranscriptIndex(segments: TranscriptSegment[], time: number) {
  for (let i = segments.length - 1; i >= 0; i--) {
    if (time >= segments[i].start) return i;
  }
  return 0;
}
