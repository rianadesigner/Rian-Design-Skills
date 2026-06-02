import React from "react";
import type { ButtonSize } from "../Button/Button";
import "./ButtonGroup.css";

/* ──────────────────────────────────────
   ButtonGroup — 实体按钮组
─────────────────────────────────────── */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ButtonSize;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  size = "large",
  children,
  className = "",
  ...rest
}) => (
  <div
    className={["iflow-btn-group", `iflow-btn-group--${size}`, className]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

ButtonGroup.displayName = "ButtonGroup";

/* ──────────────────────────────────────
   ButtonPlainTextGroup — 纯文本按钮组
   子元素交替为 ButtonPlainText + Divider
─────────────────────────────────────── */
export interface ButtonPlainTextGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ButtonPlainTextGroup: React.FC<ButtonPlainTextGroupProps> = ({
  children,
  className = "",
  ...rest
}) => {
  const items = React.Children.toArray(children);
  const withDividers = items.reduce<React.ReactNode[]>((acc, child, i) => {
    if (i > 0) {
      acc.push(<span key={`divider-${i}`} className="iflow-btn-divider" aria-hidden="true" />);
    }
    acc.push(child);
    return acc;
  }, []);

  return (
    <div
      className={["iflow-btn-plain-group", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {withDividers}
    </div>
  );
};

ButtonPlainTextGroup.displayName = "ButtonPlainTextGroup";

/* ──────────────────────────────────────
   ButtonMixed — 混合排布（左纯文本 + 右实体）
─────────────────────────────────────── */
export interface ButtonMixedProps extends React.HTMLAttributes<HTMLElement> {
  /** 左侧纯文本按钮组内容 */
  plainGroup?: React.ReactNode;
  /** 右侧实体按钮组内容 */
  btnGroup?: React.ReactNode;
}

export const ButtonMixed: React.FC<ButtonMixedProps> = ({
  plainGroup,
  btnGroup,
  className = "",
  ...rest
}) => (
  <section
    className={["iflow-btn-mixed", className].filter(Boolean).join(" ")}
    {...rest}
  >
    {plainGroup && (
      <div className="iflow-btn-plain-group">{plainGroup}</div>
    )}
    {plainGroup && btnGroup && (
      <span className="iflow-btn-divider" aria-hidden="true" />
    )}
    {btnGroup && (
      <div className="iflow-btn-group iflow-btn-group--large">{btnGroup}</div>
    )}
  </section>
);

ButtonMixed.displayName = "ButtonMixed";
