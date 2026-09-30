import styles from "./BoardDialog.module.scss";
import { useScrollToBottom } from "../../../hooks/useScrollToBottom";
import { BoardDialogButton } from "./BoardDialogButton";
import { BoardDialogInput } from "./BoardDialogInput";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import CrossIcon from "@/assets/icon-cross.svg?react";
import { Button } from "@/shared/components";

export const BoardDialogColumns = () => {
  const board = useCurrentBoardStore((s) => s.board);
  const { addColumn, removeColumn, setColumnName } =
    useCurrentBoardStore.getState();
  const columnsLength = board?.columns.length ?? 0;
  const { containerRef, enableScroll } = useScrollToBottom(columnsLength);

  if (!board) return null;

  return (
    <div className={styles.boardDialog__columns}>
      <span className={styles.boardDialog__columnsTitle}>Board Columns</span>
      <div ref={containerRef} className={styles.boardDialog__columnsList}>
        {board.columns.map(({ id, column }) => (
          <label
            key={id}
            htmlFor="columns"
            className={styles.boardDialog__column}
          >
            <BoardDialogInput
              id="columns"
              className={styles.boardDialog__columnInput}
              placeholder="e.g. Todos, Doing, etc."
              handleValue={[
                column.name,
                (e) => setColumnName(e.target.value, id),
              ]}
            />
            <BoardDialogButton
              variant="removeColumn"
              onClick={() => removeColumn(id)}
            >
              <CrossIcon />
            </BoardDialogButton>
          </label>
        ))}
      </div>
      <Button variant="secondary" onClick={() => (enableScroll(), addColumn())}>
        + Add New Column
      </Button>
    </div>
  );
};
