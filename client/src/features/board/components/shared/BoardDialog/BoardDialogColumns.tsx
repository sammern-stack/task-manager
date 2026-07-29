import styles from "./BoardDialog.module.scss";
import { useScrollToBottom } from "../../../hooks/useScrollToBottom";
import { BoardDialogButton } from "./BoardDialogButton";
import { BoardDialogInput } from "./BoardDialogInput";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import CrossIcon from "@/assets/icon-cross.svg?react";

export const BoardDialogColumns = ({ id }: { id: string }) => {
  const board = useCurrentBoardStore((s) => s.board);
  const { addColumn, removeColumn, setColumnName } =
    useCurrentBoardStore.getState();
  const columnsLength = board?.columns.length ?? 0;
  const { containerRef, enableScroll } = useScrollToBottom(columnsLength);

  if (!board) return null;

  const handleAddingColumn = () => {
    enableScroll();
    addColumn();
  };

  return (
    <div className={styles.boardDialog__columns}>
      <span className={styles.boardDialog__columnsTitle}>Board Columns</span>
      <div ref={containerRef} className={styles.boardDialog__columnsList}>
        {board.columns.map((column) => (
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
                column.column.name,
                (e) => setColumnName(column.id, e.target.value),
              ]}
            />
            <BoardDialogButton
              variant="removeColumn"
              onClick={() => removeColumn(column.id)}
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
