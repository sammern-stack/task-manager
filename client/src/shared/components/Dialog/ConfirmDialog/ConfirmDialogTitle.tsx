import styles from "./ConfirmDialog.module.scss";

interface ConfirmDialogTitleProps {
  children: React.ReactNode;
}

export const ConfirmDialogTitle = ({ children }: ConfirmDialogTitleProps) => {
  return <h2 className={styles.confirmDialog__title}>{children}</h2>;
};
