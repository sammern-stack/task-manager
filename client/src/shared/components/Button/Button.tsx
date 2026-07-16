import styles from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primaryLarge" | "primarySmall" | "secondary" | "destructive";
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  className,
  onClick = () => {},
  children,
  variant = "primaryLarge",
  type = "button",
}: ButtonProps) => {
  const buttonClassNames = [
    styles.button,
    className ?? "",
    styles[`button--${variant}`],
  ].join(" ");

  return (
    <button type={type} className={buttonClassNames} onClick={onClick}>
      {children}
    </button>
  );
};
