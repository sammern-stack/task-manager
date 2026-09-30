import styles from "./Button.module.scss";
import { cls } from "@/shared/utils/formatters";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  variant?: "primaryLarge" | "primarySmall" | "secondary" | "destructive";
} & ComponentPropsWithoutRef<"button">;

export const Button = ({ variant = "primaryLarge", ...props }: ButtonProps) => {
  const buttonType = props.type ?? "button";

  const buttonClassNames = cls(
    props.className,
    styles.button,
    styles[`button--${variant}`],
  );

  return (
    <button type={buttonType} className={buttonClassNames} {...props}>
      {props.children}
    </button>
  );
};
