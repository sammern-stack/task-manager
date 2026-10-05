import type { PropsWithChildren } from "react";
import styles from "./FormDialog.module.scss";
import type { FormSubmitEvent } from "@/shared/types/react.types";
import { Button } from "../../Button/Button";

interface FormDialogProps extends PropsWithChildren {
  title: string;
  onSubmit: () => void;
  submitLabel: string;
}

export const FormDialog = (props: FormDialogProps) => {
  const { title, onSubmit, submitLabel, children } = props;

  const handleSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.formDialog}>
      <h2 className={styles.formDialog__title}>{title}</h2>
      <form className={styles.formDialog__form} onSubmit={handleSubmit}>
        {children}
        <Button type="submit" variant="primarySmall">
          {submitLabel}
        </Button>
      </form>
    </div>
  );
};
