import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./WikiRightPanel.css";

export function WikiRightPanel() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");

  const submit = useCallback(() => {
    const q = draft.trim();
    if (!q) return;
    navigate("/search", { state: { prefillAi: q } });
  }, [draft, navigate]);

  return (
    <aside className="wiki-right">
      <div className="wiki-right__shell">
        <div className="wiki-right__avatar" aria-hidden />
        <p className="wiki-right__hello">欢迎～阿莫</p>
        <p className="wiki-right__sub">今天我能帮你做点什么？</p>

        <div className="wiki-right__cards">
          <div className="wiki-card">
            <p className="wiki-card__t">安装知识库 Skill</p>
            <p className="wiki-card__d">一键本地使用</p>
            <div className="wiki-card__illu wiki-card__illu--a" />
          </div>
          <div className="wiki-card">
            <p className="wiki-card__t">设置今日简报</p>
            <p className="wiki-card__d">重要信息实时查看</p>
            <div className="wiki-card__illu wiki-card__illu--b" />
          </div>
          <div className="wiki-card">
            <p className="wiki-card__t">整理知识库</p>
            <p className="wiki-card__d">收纳整理文件</p>
            <div className="wiki-card__illu wiki-card__illu--c" />
          </div>
        </div>

        <div className="wiki-right__tags">
          <span className="wiki-tag">我的创作</span>
          <span className="wiki-tag">功能</span>
          <span className="wiki-tag">功能</span>
          <span className="wiki-tag">功能</span>
        </div>

        <div className="wiki-right__composer">
          <textarea
            className="wiki-right__textarea"
            rows={3}
            placeholder="基于您的全部知识库提问"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />
          <div className="wiki-right__row">
            <button type="button" className="wiki-right__pill">
              指定知识库
              <span className="wiki-right__chev" aria-hidden />
            </button>
            <button type="button" className="wiki-send" onClick={submit} aria-label="提交问题并前往搜索页">
              ↑
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
