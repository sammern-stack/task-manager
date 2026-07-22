import styles from "./BoardDialog.module.scss";
import type { FormSubmitEvent } from "@/shared/types/react.types";

type FormOnSubmit = (e: FormSubmitEvent) => void;

type BoardFormProps =
  | { variant: "create"; onCreate?: FormOnSubmit; children: React.ReactNode }
  | { variant: "update"; onUpdate?: FormOnSubmit; children: React.ReactNode };

export const BoardDialogForm = (props: BoardFormProps) => {
  const handleOnSubmit =
    props.variant === "create" ? props.onCreate : props.onUpdate;

  return (
    <form className={styles.boardDialog__form} onSubmit={handleOnSubmit}>
      {props.children}
    </form>
  );
};
