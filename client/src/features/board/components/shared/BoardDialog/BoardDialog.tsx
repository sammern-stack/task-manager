import styles from "./BoardDialog.module.scss";

interface BoardDialogProps {
  children: React.ReactNode;
}

export const BoardDialog = ({ children }: BoardDialogProps) => {
  return <div className={styles.boardDialog}>{children}</div>;
};
