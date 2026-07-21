import styles from "./ConfirmDialog.module.scss";

type ConfirmDialogButtonProps =
  | { variant: "cancel"; onCancel: () => void; children: React.ReactNode }
  | { variant: "confirm"; onConfirm: () => void; children: React.ReactNode }
  | { variant: "delete"; onDelete: () => void; children: React.ReactNode };

export const ConfirmDialogButton = (props: ConfirmDialogButtonProps) => {
  const buttonClasses = [
    styles.confirmDialog__button,
    styles[`confirmDialog__button--${props.variant}`],
  ].join(" ");

  const handleOnClick =
    props.variant === "cancel"
      ? props.onCancel
      : props.variant === "confirm"
        ? props.onConfirm
        : props.onDelete;

  return (
    <button className={buttonClasses} onClick={handleOnClick}>
      {props.children}
    </button>
  );
};
