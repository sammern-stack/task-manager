import styles from "./FormField.module.scss";
import type { InputChangeEvent } from "@/shared/types/react.types";
import type { Error } from "@/features/board";
import { cls } from "@/shared/utils/formatters";

interface BoardDialogFieldProps {
  label: string;
  error: Error | null;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  helperText: string;
  value: string;
  onChange: (e: InputChangeEvent) => void;
}

export const FormField = (props: BoardDialogFieldProps) => {
  const { type = "text", label, error, helperText, ...restProps } = props;

  const inputClassNames = cls(
    styles.field__input,
    error && styles["field__input--error"],
  );

  return (
    <label className={styles.field}>
      <span className={styles.field__label}>{label}</span>
      {error && <span className={styles.field__error}>{error.message}</span>}
      <input type={type} className={inputClassNames} {...restProps} />
      <span className={styles.field__helper}>{helperText}</span>
    </label>
  );
};
