import styles from "./FormField.module.scss";
import type { Error } from "@/features/board";
import { cls } from "@/shared/utils/formatters";

interface BoardDialogFieldProps {
  as?: "input" | "textarea";
  label: string;
  error?: Error | null;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  helperText?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const FormField = (props: BoardDialogFieldProps) => {
  const {
    type = "text",
    label,
    error,
    helperText,
    as = "input",
    ...restProps
  } = props;
  const isTextarea = as === "textarea";

  const inputClassNames = cls(
    styles.field__input,
    error && styles["field__input--error"],
  );

  const textareaClassNames = cls(
    styles.field__textarea,
    error && styles["field__textarea--error"],
  );

  return (
    <label className={styles.field}>
      <span className={styles.field__label}>{label}</span>
      {error && <span className={styles.field__error}>{error.message}</span>}
      {isTextarea ? (
        <textarea {...restProps} className={textareaClassNames} />
      ) : (
        <input {...restProps} type={type} className={inputClassNames} />
      )}
      {helperText && <span className={styles.field__helper}>{helperText}</span>}
    </label>
  );
};
