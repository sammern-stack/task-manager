import styles from "./BoardDialog.module.scss";

interface BoardDialogTitleProps {
  children: React.ReactNode;
}

export const BoardDialogTitle = ({ children }: BoardDialogTitleProps) => {
  return <h2 className={styles.boardDialog__title}>{children}</h2>;
};
