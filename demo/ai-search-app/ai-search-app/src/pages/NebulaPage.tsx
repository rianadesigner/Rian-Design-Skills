import { useEffect } from "react";
import { Link } from "react-router-dom";

import { CosmicNebulaVisualization } from "../components/CosmicNebulaVisualization/CosmicNebulaVisualization";

import "./NebulaPage.css";

export default function NebulaPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Cosmic Nebula Visualization";
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyBg = document.body.style.backgroundColor;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "#030613";

    return () => {
      document.title = prev;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.backgroundColor = prevBodyBg;
    };
  }, []);

  return (
    <div className="nebula-page">
      <nav className="nebula-page__nav" aria-label="主导航">
        <Link to="/">← 返回知识库首页</Link>
      </nav>
      <CosmicNebulaVisualization title="信号与系统" />
    </div>
  );
}
