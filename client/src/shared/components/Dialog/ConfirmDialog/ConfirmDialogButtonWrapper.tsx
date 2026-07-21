import styles from "./ConfirmDialog.module.scss";

interface ConfirmDialogButtonWrapperProps {
  children: React.ReactNode;
}

export const ConfirmDialogButtonWrapper = ({
  children,
}: ConfirmDialogButtonWrapperProps) => {
  return <div className={styles.confirmDialog__buttonWrapper}>{children}</div>;
};
