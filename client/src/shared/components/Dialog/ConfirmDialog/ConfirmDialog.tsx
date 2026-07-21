import styles from "./ConfirmDialog.module.scss";

interface ConfirmDialogProps {
  variant: "delete" | "warning";
  children: React.ReactNode;
}

export const ConfirmDialog = ({ variant, children }: ConfirmDialogProps) => {
  const dialogClasses = [
    styles.confirmDialog,
    styles[`confirmDialog--${variant}`],
  ].join(" ");

  return <div className={dialogClasses}>{children}</div>;
};
