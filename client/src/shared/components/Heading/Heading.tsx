import styles from "./Heading.module.scss";

type Size = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Variant = "default" | "withCount";

interface HeadingProps {
  size: Size;
  className?: string;
  variant?: Variant;
  count?: number;
  children: React.ReactNode;
}

export const Heading = ({
  size,
  className,
  variant = "default",
  count,
  children,
}: HeadingProps) => {
  const Heading = size;

  const headingClasses = [
    styles.heading,
    styles[`heading--${size}`],
    className,
  ].join(" ");

  return (
    <Heading className={headingClasses}>
      {children} {variant === "withCount" && <span>({count})</span>}
    </Heading>
  );
};
