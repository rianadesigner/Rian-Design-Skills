import "../App.css";

import { Button, ButtonPlainText } from "@iflow.cn/iflow-design";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link, useLocation } from "react-router-dom";

import {
  corpusContext,
  keywordSearch,
  loadCorpus,
  type SearchHit,
} from "../corpus";

const corpus = loadCorpus();

const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL ?? "https://api.openai.com/v1";
const apiKey = import.meta.env.VITE_OPENAI_API_KEY ?? "";
const model = import.meta.env.VITE_OPENAI_MODEL ?? "gpt-4o-mini";

function hl(text: string, q: string): ReactNode {
  const t = q.trim();
  if (!t) return text;
  const terms = [...new Set(t.toLowerCase().split(/\s+/u).filter(Boolean))];
  if (terms.length === 0) return text;

  let out: ReactNode[] = [text];
  for (const term of terms) {
    const next: ReactNode[] = [];
    for (const node of out) {
      if (typeof node !== "string") {
        next.push(node);
        continue;
      }
      const re = new RegExp(`(${escapeRe(term)})`, "giu");
      const parts = node.split(re);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i] ?? "";
        if (p.toLowerCase() === term.toLowerCase()) {
          next.push(
            <mark key={`${term}-${i}-${p}`} className="ai-search-hit">
              {p}
            </mark>
          );
        } else if (p) next.push(p);
      }
    }
    out = next;
  }
  return <>{out}</>;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

export default function SearchHomePage() {
  const location = useLocation();
  const [qSearch, setQSearch] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [searched, setSearched] = useState(false);
  const [qAi, setQAi] = useState("");
  const [answer, setAnswer] = useState("");
  const [aiErr, setAiErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const st = location.state as { prefillAi?: string } | null;
    if (st?.prefillAi) {
      setQAi(st.prefillAi);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  const fileCount = useMemo(() => Object.keys(corpus).length, []);

  const onSearch = useCallback(() => {
    setSearched(true);
    setHits(keywordSearch(corpus, qSearch));
  }, [qSearch]);

  const askAi = useCallback(async () => {
    const q = qAi.trim();
    setAiErr("");
    setAnswer("");
    if (!q) {
      setAiErr("请输入问题");
      return;
    }
    if (!apiKey) {
      setAiErr("未配置 API Key：在 ai-search-app 目录新建 .env，写入 VITE_OPENAI_API_KEY=…（可选用 VITE_OPENAI_BASE_URL / VITE_OPENAI_MODEL）。");
      return;
    }

    const relevant = keywordSearch(corpus, q);
    const fullHits =
      relevant.length > 0 ? relevant : hits.length > 0 ? hits : [];

    const context = corpusContext(fullHits, corpus);

    setBusy(true);
    try {
      const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.25,
          messages: [
            {
              role: "system",
              content:
                "你是企业内部设计规范助手，只用下方「节选」作答；不要使用节选外的臆测。若节选不足请明确写出「文档中未提及」并简述缺什么。\n\n" +
                context,
            },
            { role: "user", content: q },
          ],
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(`${res.status} ${res.statusText}${t ? ` — ${t.slice(0, 400)}` : ""}`);
      }
      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text =
        data.choices?.[0]?.message?.content?.trim() ?? "（接口无正文）";
      setAnswer(text);
    } catch (e) {
      setAiErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, [qAi, hits]);

  return (
    <div className="ai-page">
      <header className="ai-header">
        <div className="ai-header-inner">
          <div>
            <p className="ai-kicker">iFlow · design-specs</p>
            <h1 className="ai-title">设计规范语义搜索</h1>
            <p className="ai-sub">
              已索引 <strong>{fileCount}</strong> 个 Markdown 文件；关键字即时筛选，AI 在节选上下文中作答。
            </p>
          </div>
          <nav className="ai-navpill" aria-label="快捷">
            <Link to="/" className="ai-pill ai-pill--link">
              知识图谱
            </Link>
            <span className="ai-pill ai-pill--on">语义搜索</span>
            <Link to="/nebula" className="ai-pill ai-pill--link">
              星云
            </Link>
          </nav>
        </div>
      </header>

      <main className="ai-main">
        <section className="ai-panel" aria-labelledby="search-heading">
          <div className="ai-panel-head">
            <h2 id="search-heading">关键词检索</h2>
            <p className="ai-hint">
              多词用空格，需同时命中；结果展示匹配片段。
            </p>
          </div>
          <div className="ai-row">
            <label className="ai-label" htmlFor="search-q">
              查询词
            </label>
            <input
              id="search-q"
              className="ai-input"
              placeholder="例如：colorPrimary 按钮 radius"
              value={qSearch}
              onChange={(e) => setQSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
            />
            <Button type="button" btnType="primary" size="middle" onClick={onSearch}>
              搜索
            </Button>
          </div>
          <ul className="ai-hitlist">
            {!searched && hits.length === 0 && (
              <li className="ai-muted">输入关键词后点击「搜索」，或直接在下方用 AI 提问。</li>
            )}
            {searched && hits.length === 0 && (
              <li className="ai-muted">暂无结果，换词试试：「Button」「YAML」「spacing」。</li>
            )}
            {hits.map((h) => (
              <li key={h.path} className="ai-hit">
                <p className="ai-hit-path">{h.path}</p>
                <ul className="ai-hit-snips">
                  {h.snippets.map((s, i) => (
                    <li key={i}>{hl(s, qSearch)}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="ai-panel ai-panel--accent" aria-labelledby="ai-heading">
          <div className="ai-panel-head">
            <h2 id="ai-heading">AI 问答（OpenAI 兼容）</h2>
            <p className="ai-hint">
              自动组合：优先用「与你的问题匹配的文档」，否则沿用左侧检索结果摘要。
            </p>
          </div>
          <textarea
            className="ai-textarea"
            rows={4}
            placeholder="例如：主按钮 Hover 底色在设计里对应哪个变量？"
            value={qAi}
            onChange={(e) => setQAi(e.target.value)}
          />
          <div className="ai-actions">
            <Button
              btnType="primary"
              size="middle"
              onClick={() => void askAi()}
              loading={busy}
              disabled={busy}
              type="button"
            >
              生成回答
            </Button>
            <ButtonPlainText type="button" btnType="default" disabled={busy} onClick={() => { setAnswer(""); setAiErr(""); }}>
              清空
            </ButtonPlainText>
          </div>
          {aiErr && <p className="ai-error" role="alert">{aiErr}</p>}
          {answer && (
            <article className="ai-answer" aria-live="polite">
              <h3 className="ai-answer-label">模型输出</h3>
              <pre className="ai-answer-pre">{answer}</pre>
            </article>
          )}
        </section>
      </main>

      <footer className="ai-foot">
        <span>样式与组件：<code>@iflow.cn/iflow-design</code></span>
        <ButtonPlainText
          btnType="primary"
          type="button"
          onClick={() => window.open("https://www.npmjs.com/package/@iflow.cn/iflow-design", "_blank")}
        >
          npm 包页 →
        </ButtonPlainText>
      </footer>
    </div>
  );
}
