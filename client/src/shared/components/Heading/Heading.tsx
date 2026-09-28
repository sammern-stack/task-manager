import styles from "./Heading.module.scss";
import { cls } from "@/shared/utils/formatters";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type Size = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = PropsWithChildren & {
  size: Size;
  className?: string;
} & ComponentPropsWithoutRef<Size>;

export const Heading = ({
  size: Size,
  className,
  children,
  ...props
}: HeadingProps) => {
  const headingClasses = cls(
    className,
    styles.heading,
    styles[`heading--${Size}`],
  );

  return (
    <Size className={headingClasses} {...props}>
      {children}
    </Size>
  );
};
