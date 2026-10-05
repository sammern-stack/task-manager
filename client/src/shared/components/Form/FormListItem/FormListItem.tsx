import styles from "./FormListItem.module.scss";
import type { InputChangeEvent } from "@/shared/types/react.types";

import CrossIcon from "@/assets/icon-cross.svg?react";

interface FormListItemProps {
  placeholder: string;
  value: string;
  onChange: (e: InputChangeEvent) => void;
  onRemove: () => void;
}

export const FormListItem = ({ onRemove, ...props }: FormListItemProps) => {
  return (
    <label className={styles.listItem}>
      <input {...props} />
      <button type="button" onClick={onRemove}>
        <CrossIcon />
      </button>
    </label>
  );
};
