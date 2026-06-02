import React from "react";
import "./Button.css";

export type ButtonType = "primary" | "default";
export type ButtonSize = "large" | "middle" | "small";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮类型/层级，默认 "default" */
  btnType?: ButtonType;
  /** 按钮尺寸（large=36px / middle=32px / small=24px），默认 "large" */
  size?: ButtonSize;
  /** 是否显示左侧图标占位 */
  startIcon?: React.ReactNode;
  /** 是否显示右侧图标占位 */
  endIcon?: React.ReactNode;
  /** 加载中状态 */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      btnType = "default",
      size = "large",
      startIcon,
      endIcon,
      loading = false,
      disabled,
      children,
      className = "",
      ...rest
    },
    ref
  ) => {
    const cls = [
      "iflow-btn",
      `iflow-btn--${btnType}`,
      `iflow-btn--${size}`,
      loading ? "iflow-btn--loading" : "",
      disabled ? "iflow-btn--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={cls}
        disabled={disabled || loading}
        {...rest}
      >
        {startIcon && <span className="iflow-btn__icon">{startIcon}</span>}
        {children && <span className="iflow-btn__text">{children}</span>}
        {endIcon && <span className="iflow-btn__icon">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

/* ──────────────────────────────────────
   纯文本按钮 ButtonPlainText
   对齐 button.ai：无背景、无描边、高度 20px
─────────────────────────────────────── */
export interface ButtonPlainTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "default" | "primary";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const ButtonPlainText = React.forwardRef<HTMLButtonElement, ButtonPlainTextProps>(
  (
    {
      btnType = "default",
      startIcon,
      endIcon,
      disabled,
      children,
      className = "",
      ...rest
    },
    ref
  ) => {
    const cls = [
      "iflow-btn-plain",
      `iflow-btn-plain--${btnType}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={cls} disabled={disabled} {...rest}>
        {startIcon && <span className="iflow-btn__icon">{startIcon}</span>}
        {children && <span className="iflow-btn__text">{children}</span>}
        {endIcon && <span className="iflow-btn__icon">{endIcon}</span>}
      </button>
    );
  }
);

ButtonPlainText.displayName = "ButtonPlainText";
