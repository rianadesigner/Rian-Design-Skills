import { Link, NavLink } from "react-router-dom";

import "./WikiLeftNav.css";

export function WikiLeftNav() {
  return (
    <nav className="wiki-left" aria-label="主导航">
      <div className="wiki-left__rail">
        <Link to="/" className="wiki-left__logo" title="首页" aria-label="知识库首页">
          <span className="wiki-left__logo-dot" />
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `wiki-left__icon${isActive ? " wiki-left__icon--active" : " wiki-left__icon--muted"}`
          }
          end
          title="首页"
        >
          <span className="wiki-left__glyph wiki-left__glyph--home" />
        </NavLink>
        <span className="wiki-left__icon wiki-left__icon--muted" title="知识库（示意）" aria-hidden>
          <span className="wiki-left__glyph wiki-left__glyph--box" />
        </span>
        <div className="wiki-left__spacer" />
        <span className="wiki-left__icon wiki-left__icon--muted" title="通知（示意）">
          <span className="wiki-left__glyph wiki-left__glyph--bell" />
          <span className="wiki-left__badge">5</span>
        </span>
        <span className="wiki-left__icon wiki-left__icon--muted" title="设置（示意）">
          <span className="wiki-left__glyph wiki-left__glyph--gear" />
        </span>
        <span className="wiki-left__icon wiki-left__icon--muted" title="助手（示意）">
          <span className="wiki-left__glyph wiki-left__glyph--spark" />
        </span>
      </div>
    </nav>
  );
}
