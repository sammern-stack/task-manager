import styles from "./ConfirmDialog.module.scss";

interface ConfirmDialogDescriptionProps {
  children: React.ReactNode;
}

export const ConfirmDialogDescription = ({
  children,
}: ConfirmDialogDescriptionProps) => {
  return <p className={styles.confirmDialog__description}>{children}</p>;
};
