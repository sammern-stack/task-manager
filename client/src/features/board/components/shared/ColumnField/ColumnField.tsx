import styles from "./ColumnField.module.scss";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import type { BoardColumn } from "@/features/board/stores/currentBoardStore";

import CrossIcon from "@/assets/icon-cross.svg?react";

interface ColumnFieldProps {
  column: BoardColumn;
}

export const ColumnField = ({ column: { id, column } }: ColumnFieldProps) => {
  const { removeColumn, setColumnName } = useCurrentBoardStore.getState();
  return (
    <label htmlFor="columns" className={styles.column}>
      <input
        id="columns"
        name="columns"
        autoComplete="off"
        placeholder="e.g. Todos, Doing, etc."
        value={column.name}
        onChange={(e) => setColumnName(id, e.target.value)}
      />
      <button type="button" onClick={() => removeColumn(id)}>
        <CrossIcon />
      </button>
    </label>
  );
};
