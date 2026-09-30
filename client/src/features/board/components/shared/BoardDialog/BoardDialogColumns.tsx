import styles from "./BoardDialog.module.scss";
import { useScrollToBottom } from "../../../hooks/useScrollToBottom";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { ColumnField } from "../ColumnField/ColumnField";
import { Button } from "@/shared/components";

export const BoardDialogColumns = () => {
  const board = useCurrentBoardStore((s) => s.board);
  const { addColumn } = useCurrentBoardStore.getState();
  const columnsLength = board?.columns.length ?? 0;
  const { containerRef, enableScroll } = useScrollToBottom(columnsLength);

  if (!board) return null;

  return (
    <div className={styles.boardDialog__columns}>
      <span className={styles.boardDialog__columnsTitle}>Board Columns</span>
      <div ref={containerRef} className={styles.boardDialog__columnsList}>
        {board.columns.map((column) => (
          <ColumnField key={column.id} column={column} />
        ))}
      </div>
      <Button variant="secondary" onClick={() => (enableScroll(), addColumn())}>
        + Add New Column
      </Button>
    </div>
  );
};
