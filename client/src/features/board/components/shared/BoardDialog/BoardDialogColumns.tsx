import styles from "./BoardDialog.module.scss";
import { useBoardDialog } from "../../../hooks/useBoardDialog";
import CrossIcon from "@/assets/icon-cross.svg?react";
import { BoardDialogButton } from "./BoardDialogButton";
import { BoardDialogInput } from "./BoardDialogInput";

interface BoardDialogColumnsProps {
  formVariant: "create" | "update";
  id: string;
}

export const BoardDialogColumns = ({
  formVariant,
  id,
}: BoardDialogColumnsProps) => {
  const {
    boardColumns,
    columnsContainerRef,
    handleColumnChange,
    handleAddColumn,
    handleRemoveColumn,
  } = useBoardDialog(formVariant);

  return (
    <div className={styles.boardDialog__columns}>
      <span className={styles.boardDialog__columnsTitle}>Board Columns</span>
      <div
        ref={columnsContainerRef}
        className={styles.boardDialog__columnsList}
      >
        {boardColumns.map((column) => (
          <label
            key={column.id}
            htmlFor={id}
            className={styles.boardDialog__column}
          >
            <BoardDialogInput
              id={id}
              className={styles.boardDialog__columnInput}
              placeholder="e.g. Todos, Doing, etc."
              handleValue={[
                column.name,
                (e) => handleColumnChange(e, column.id),
              ]}
            />
            <BoardDialogButton
              variant="removeColumn"
              onClick={() => handleRemoveColumn(column.id)}
            >
              <CrossIcon />
            </BoardDialogButton>
          </label>
        ))}
      </div>
      <BoardDialogButton variant="createColumn" onClick={handleAddColumn}>
        + Add New Column
      </BoardDialogButton>
    </div>
  );
};
