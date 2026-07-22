import styles from "./BoardDialog.module.scss";

interface BoardDialogButtonProps {
  variant: "createColumn" | "removeColumn" | "submitBoard";
  onClick: () => void;
  children: React.ReactNode;
}

export const BoardDialogButton = ({
  variant,
  onClick,
  children,
}: BoardDialogButtonProps) => {
  const buttonClasses = [
    styles.boardDialog__button,
    styles[`boardDialog__button--${variant}`],
  ].join(" ");

  return (
    <button
      type={variant === "submitBoard" ? "submit" : "button"}
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
