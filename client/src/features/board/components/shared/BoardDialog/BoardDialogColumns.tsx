import styles from "./BoardDialog.module.scss";
import { useBoardDialog } from "../../../hooks/useBoardDialog";
import { useScrollToBottom } from "../../../hooks/useScrollToBottom";
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
    handleColumnChange,
    handleAddColumn,
    handleRemoveColumn,
  } = useBoardDialog(formVariant);
  const { containerRef, enableScroll } = useScrollToBottom(boardColumns.length);

  const handleAddingColumn = () => {
    enableScroll();
    handleAddColumn();
  };

  return (
    <div className={styles.boardDialog__columns}>
      <span className={styles.boardDialog__columnsTitle}>Board Columns</span>
      <div ref={containerRef} className={styles.boardDialog__columnsList}>
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
      <BoardDialogButton variant="createColumn" onClick={handleAddingColumn}>
        + Add New Column
      </BoardDialogButton>
    </div>
  );
};
