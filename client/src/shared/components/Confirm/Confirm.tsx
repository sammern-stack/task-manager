import styles from "./Confirm.module.scss";
import { useDialogStore } from "@/shared/stores";
import { Button } from "../Button/Button";

interface ConfirmProps {
  title: string;
  description: string;
  onConfirm: () => void;
}

export const Confirm = (props: ConfirmProps) => {
  const { title, description, onConfirm } = props;
  const closeDialog = useDialogStore((s) => s.closeDialog);

  return (
    <div className={styles.confirm}>
      <h2 className={styles.confirm__title}>{title}</h2>
      <p className={styles.confirm__description}>{description}</p>
      <div className={styles.confirm__actions}>
        <Button variant="destructive" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={() => closeDialog()}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
