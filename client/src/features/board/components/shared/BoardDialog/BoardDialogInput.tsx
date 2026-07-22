import styles from "./BoardDialog.module.scss";
import type { InputChangeEvent } from "@/shared/types/react.types";

interface BoardDialogInputProps {
  type?: React.HTMLInputTypeAttribute;
  id: string;
  className: string;
  placeholder: string;
  handleValue: [string, (e: InputChangeEvent) => void];
}

export const BoardDialogInput = ({
  type = "text",
  id,
  className,
  placeholder,
  handleValue,
}: BoardDialogInputProps) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      className={[styles.boardDialog__input, className].join(" ")}
      autoComplete="off"
      placeholder={placeholder}
      value={handleValue[0]}
      onChange={handleValue[1]}
    />
  );
};
