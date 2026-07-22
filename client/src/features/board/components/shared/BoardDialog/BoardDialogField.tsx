import styles from "./BoardDialog.module.scss";
import type { InputChangeEvent } from "@/shared/types/react.types";
import { BoardDialogInput } from "./BoardDialogInput";

interface BoardDialogFieldProps {
  id: string;
  label: string;
  error: string | null;
  placeholder: string;
  helperText: string;
  handleValue: [string, (e: InputChangeEvent) => void];
}

export const BoardDialogField = ({
  id,
  label,
  error,
  placeholder,
  helperText,
  handleValue,
}: BoardDialogFieldProps) => {
  return (
    <label htmlFor={id} className={styles.boardDialog__field}>
      <span className={styles.boardDialog__fieldText}>{label}</span>
      {error && <span className={styles.boardDialog__fieldError}>{error}</span>}
      <BoardDialogInput
        id={id}
        placeholder={placeholder}
        handleValue={handleValue}
        className={[
          styles.boardDialog__fieldInput,
          error ? styles["boardDialog__fieldInput--error"] : "",
        ].join(" ")}
      />
      <span className={styles.boardDialog__fieldHelperText}>{helperText}</span>
    </label>
  );
};
