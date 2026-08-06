import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Database,
  FileText,
  History,
  MessagesSquare,
  Pause,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ChatGPT 记忆链路｜产品 Wiki",
  description:
    "一页看懂 ChatGPT 如何组合当前对话、已保存记忆、聊天历史与临时聊天。",
};

const sources = [
  {
    icon: FileText,
    eyebrow: "显式规则",
    title: "自定义指令",
    copy: "你长期设定的身份、语气与回答偏好。临时聊天仍会遵循已启用的自定义指令。",
    tone: "lilac",
  },
  {
    icon: Brain,
    eyebrow: "相对持久",
    title: "已保存记忆",
    copy: "你要求记住，或系统判断未来可能有用的信息；会被更新、合并，也可单独删除。",
    tone: "mint",
  },
  {
    icon: History,
    eyebrow: "动态提取",
    title: "聊天历史",
    copy: "从过往对话中找出与当前问题相关的信息；不是逐字回放，也不会保留每个细节。",
    tone: "peach",
  },
  {
    icon: Database,
    eyebrow: "按可用范围",
    title: "文件与已连接应用",
    copy: "在支持的套餐与地区，相关文件或已连接应用信息也可能参与个性化。",
    tone: "sky",
  },
] as const;

const controlRows = [
  {
    label: "参考已保存记忆",
    state: "开启",
    detail: "允许读取已保存记忆，并可能在聊天中形成或更新记忆。",
  },
  {
    label: "参考聊天历史",
    state: "开启",
    detail: "按相关性从过去聊天中提取信息；关闭后，已提取的信息会进入删除流程。",
  },
  {
    label: "临时聊天",
    state: "关闭",
    detail: "打开时不访问、不创建个性化记忆，也不会出现在聊天历史中。",
  },
] as const;

export default function ChatGPTMemoryPage() {
  return (
    <main className={styles.page}>
      <div className={styles.noise} aria-hidden="true" />

      <nav className={styles.nav} aria-label="页面导航">
        <Link href="/" className={styles.brand} aria-label="返回首页">
          <span className={styles.brandMark}>M</span>
          <span>
            <strong>MEMORY WIKI</strong>
            <small>CHATGPT · 01</small>
          </span>
        </Link>
        <div className={styles.navMeta}>
          <span className={styles.verified}>
            <Check size={14} strokeWidth={2.4} />
            官方资料核对
          </span>
          <span>更新于 2026.08</span>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <span>PRODUCT WIKI</span>
            <span className={styles.kickerLine} />
            <span>5 MIN READ</span>
          </p>
          <h1>
            ChatGPT 的记忆，
            <span>不是一个数据库。</span>
          </h1>
          <p className={styles.lede}>
            更准确地说，它是一组可控的信息来源：每次回答前，ChatGPT
            会按当前问题选择相关内容，与本轮对话一起组成上下文。
          </p>
          <div className={styles.heroTags} aria-label="核心特征">
            <span>按相关性调用</span>
            <span>跨对话个性化</span>
            <span>用户可控制</span>
          </div>
        </div>

        <aside className={styles.heroNote} aria-label="一句话结论">
          <span className={styles.noteNumber}>01</span>
          <Sparkles size={22} aria-hidden="true" />
          <p>记忆不是把所有旧对话塞进提示词，而是在需要时带入有帮助的信息。</p>
          <div className={styles.noteFooter}>
            <span>CONTEXT, NOT REPLAY</span>
            <ArrowDown size={17} aria-hidden="true" />
          </div>
        </aside>
      </header>

      <section className={styles.section} aria-labelledby="flow-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionIndex}>01 / CORE FLOW</p>
            <h2 id="flow-title">一次回答里的记忆链路</h2>
          </div>
          <p>
            这是面向用户的产品行为图，并非 OpenAI 内部技术架构披露。
          </p>
        </div>

        <div className={styles.flowShell}>
          <div className={styles.flowTop}>
            <article className={`${styles.flowNode} ${styles.inputNode}`}>
              <span className={styles.nodeIndex}>A</span>
              <CircleUserRound size={27} aria-hidden="true" />
              <div>
                <small>INPUT</small>
                <h3>你发来一条消息</h3>
                <p>“帮我推荐今晚的晚餐。”</p>
              </div>
            </article>

            <ArrowRight className={styles.desktopArrow} aria-hidden="true" />
            <ArrowDown className={styles.mobileArrow} aria-hidden="true" />

            <article className={`${styles.flowNode} ${styles.routerNode}`}>
              <span className={styles.nodeIndex}>B</span>
              <Search size={27} aria-hidden="true" />
              <div>
                <small>RELEVANCE</small>
                <h3>判断是否需要个性化</h3>
                <p>只有可能改善回答时，才寻找相关的过去信息。</p>
              </div>
            </article>

            <ArrowRight className={styles.desktopArrow} aria-hidden="true" />
            <ArrowDown className={styles.mobileArrow} aria-hidden="true" />

            <article className={`${styles.flowNode} ${styles.outputNode}`}>
              <span className={styles.nodeIndex}>D</span>
              <MessagesSquare size={27} aria-hidden="true" />
              <div>
                <small>RESPONSE</small>
                <h3>生成更贴合你的回答</h3>
                <p>“你吃素，也偏爱泰餐——今晚可以试试绿咖喱豆腐。”</p>
              </div>
            </article>
          </div>

          <div className={styles.memoryLayer}>
            <div className={styles.layerIntro}>
              <span className={styles.nodeIndex}>C</span>
              <div>
                <small>MEMORY SOURCES</small>
                <h3>检索相关信息源</h3>
              </div>
              <p>来源是否可用，取决于你的开关、套餐、地区与已连接内容。</p>
            </div>

            <div className={styles.sourceGrid}>
              {sources.map(({ icon: Icon, eyebrow, title, copy, tone }) => (
                <article
                  className={`${styles.sourceCard} ${styles[tone]}`}
                  key={title}
                >
                  <div className={styles.sourceIcon}>
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <small>{eyebrow}</small>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </article>
              ))}
            </div>

            <div className={styles.contextBand}>
              <div>
                <span className={styles.contextDot} />
                <strong>本轮上下文</strong>
              </div>
              <p>
                当前对话 + 相关的个性化信息
                <span>→</span>
                一起交给模型生成回答
              </p>
            </div>
          </div>

          <div className={styles.updateLoop}>
            <div className={styles.loopLine} aria-hidden="true" />
            <div className={styles.loopLabel}>
              <Clock3 size={17} aria-hidden="true" />
              <span>
                对话继续后，记忆可能被<strong>新增、更新、合并或降权</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="controls-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionIndex}>02 / CONTROL GATES</p>
            <h2 id="controls-title">三个开关，改变三条路径</h2>
          </div>
          <p>示意状态用于解释关系，不代表你账号的实际设置。</p>
        </div>

        <div className={styles.controlLayout}>
          <div className={styles.settingsCard}>
            <div className={styles.settingsHeader}>
              <div>
                <Settings2 size={22} aria-hidden="true" />
                <strong>设置 · 个性化</strong>
              </div>
              <span>示意</span>
            </div>

            {controlRows.map((row, index) => (
              <div className={styles.settingRow} key={row.label}>
                <div className={styles.settingNumber}>0{index + 1}</div>
                <div className={styles.settingCopy}>
                  <strong>{row.label}</strong>
                  <p>{row.detail}</p>
                </div>
                <span
                  className={`${styles.switch} ${
                    row.state === "开启" ? styles.switchOn : ""
                  }`}
                  aria-label={`${row.label}：${row.state}`}
                >
                  <i />
                </span>
              </div>
            ))}
          </div>

          <div className={styles.branchCards}>
            <article className={styles.branchCard}>
              <div className={styles.branchIcon}>
                <Brain size={23} aria-hidden="true" />
              </div>
              <div>
                <span className={styles.branchLabel}>普通聊天</span>
                <h3>可读取，也可能形成记忆</h3>
                <p>在相关开关开启时，过去信息可能进入本轮上下文。</p>
              </div>
              <ChevronRight size={20} aria-hidden="true" />
            </article>

            <article className={`${styles.branchCard} ${styles.temporaryCard}`}>
              <div className={styles.branchIcon}>
                <Pause size={23} aria-hidden="true" />
              </div>
              <div>
                <span className={styles.branchLabel}>临时聊天</span>
                <h3>绕开个性化记忆</h3>
                <p>不访问、不创建记忆，不出现在历史中；仍可遵循自定义指令。</p>
              </div>
              <ChevronRight size={20} aria-hidden="true" />
            </article>

            <div className={styles.dependencyNote}>
              <span>依赖关系</span>
              <p>
                关闭“参考已保存记忆”时，“参考聊天历史”也会关闭；但关闭开关本身不等于删除已保存内容。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="delete-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionIndex}>03 / DELETION</p>
            <h2 id="delete-title">“忘记”为什么需要两步</h2>
          </div>
          <p>聊天记录与已保存记忆是两个独立的存放位置。</p>
        </div>

        <div className={styles.deleteGrid}>
          <article className={styles.deleteCard}>
            <div className={styles.deleteTop}>
              <Trash2 size={22} aria-hidden="true" />
              <span>只删除聊天</span>
            </div>
            <h3>原始对话消失</h3>
            <p>不一定会同步删除已经从这段对话形成的“已保存记忆”。</p>
            <div className={styles.resultBad}>记忆仍可能被使用</div>
          </article>

          <div className={styles.plus} aria-hidden="true">+</div>

          <article className={styles.deleteCard}>
            <div className={styles.deleteTop}>
              <Brain size={22} aria-hidden="true" />
              <span>只删除记忆</span>
            </div>
            <h3>未来不再引用</h3>
            <p>过去聊天里的原文或回答不会因此从聊天历史中自动消失。</p>
            <div className={styles.resultBad}>历史仍保留原文</div>
          </article>

          <div className={styles.equals} aria-hidden="true">=</div>

          <article className={`${styles.deleteCard} ${styles.fullDeleteCard}`}>
            <div className={styles.deleteTop}>
              <ShieldCheck size={22} aria-hidden="true" />
              <span>完整移除</span>
            </div>
            <h3>删除每一个来源</h3>
            <p>删除已保存记忆，同时删除涉及它的聊天、文件，并断开含该信息的应用。</p>
            <div className={styles.resultGood}>
              <Check size={15} aria-hidden="true" />
              完整控制路径
            </div>
          </article>
        </div>

        <div className={styles.retentionNote}>
          <Clock3 size={18} aria-hidden="true" />
          <p>
            官方说明：已删除记忆的日志可能因安全与调试保留最长 30
            天；关闭“参考聊天历史”后，相关记忆信息也会在最长 30 天内从系统删除。
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="training-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionIndex}>04 / COMMON CONFUSION</p>
            <h2 id="training-title">记忆 ≠ 模型训练</h2>
          </div>
          <p>一个影响“怎么回答你”，另一个影响“内容是否用于改进模型”。</p>
        </div>

        <div className={styles.comparison}>
          <article>
            <span className={styles.comparisonNumber}>01</span>
            <Brain size={26} aria-hidden="true" />
            <h3>个性化记忆</h3>
            <p>决定未来回答是否能参考与你有关的信息。</p>
            <div className={styles.pathLabel}>设置 → 个性化</div>
          </article>
          <div className={styles.notEqual}>≠</div>
          <article>
            <span className={styles.comparisonNumber}>02</span>
            <BookOpen size={26} aria-hidden="true" />
            <h3>改进模型</h3>
            <p>决定你的内容是否可用于帮助改进 OpenAI 的模型。</p>
            <div className={styles.pathLabel}>设置 → 数据控制</div>
          </article>
        </div>
      </section>

      <section className={styles.takeaway} aria-labelledby="takeaway-title">
        <div className={styles.takeawayTitle}>
          <span>TL;DR</span>
          <h2 id="takeaway-title">把 ChatGPT 记忆理解成一套“可控的上下文选择器”。</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            当前问题先决定是否需要过去信息。
          </li>
          <li>
            <span>02</span>
            相关内容从已启用的信息源中被带入本轮。
          </li>
          <li>
            <span>03</span>
            关闭、删除、临时聊天分别控制不同的链路。
          </li>
        </ol>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>资料来源</strong>
          <p>功能会随套餐、地区和产品更新而变化，请以账号内设置与官方说明为准。</p>
        </div>
        <div className={styles.footerLinks}>
          <a
            href="https://help.openai.com/en/articles/8590148-memory-faq"
            target="_blank"
            rel="noreferrer"
          >
            Memory FAQ <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a
            href="https://help.openai.com/en/articles/8914046-temporary-chat-faq"
            target="_blank"
            rel="noreferrer"
          >
            Temporary Chat FAQ <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a
            href="https://help.openai.com/en/articles/7730893-about-your-chatgpt-memory"
            target="_blank"
            rel="noreferrer"
          >
            Data Controls FAQ <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
