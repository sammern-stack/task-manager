import styles from "./FormField.module.scss";
import type { InputChangeEvent } from "@/shared/types/react.types";
import type { Error } from "@/features/board";
import { cls } from "@/shared/utils/formatters";

interface BoardDialogFieldProps {
  id: string;
  label: string;
  error: Error | null;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  helperText: string;
  handleValue: [string, (e: InputChangeEvent) => void];
}

export const FormField = ({
  id,
  label,
  error,
  type = "text",
  placeholder,
  helperText,
  handleValue,
}: BoardDialogFieldProps) => {
  const value = handleValue[0];
  const onValueChange = handleValue[1];

  return (
    <label htmlFor={id} className={styles.formField}>
      <span className={styles.formField__label}>{label}</span>
      {error && (
        <span className={styles.formField__error}>{error.message}</span>
      )}
      <input
        type={type}
        id={id}
        name={id}
        className={cls(
          styles.formField__input,
          error && styles["formField__input--error"],
        )}
        placeholder={placeholder}
        value={value}
        onChange={onValueChange}
      />
      <span className={styles.formField__helper}>{helperText}</span>
    </label>
  );
};
