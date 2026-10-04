import styles from "./EditingColumns.module.scss";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { useScrollToBottom } from "@/features/board/hooks/useScrollToBottom";
import { Button, Map } from "@/shared/components";
import { ColumnField } from "../ColumnField/ColumnField";
import type { BoardColumn } from "@/features/board/stores/currentBoardStore";

interface EditingColumnsProps {
  columns: BoardColumn[];
}

export const EditingColumns = ({ columns }: EditingColumnsProps) => {
  const { containerRef, enableScroll } = useScrollToBottom(columns.length);
  const { addColumn } = useCurrentBoardStore.getState();
  const onAddColumn = () => (enableScroll(), addColumn());

  return (
    <div className={styles.editingColumns}>
      <span className={styles.editingColumns__title}>Board Columns</span>
      <div ref={containerRef} className={styles.editingColumns__list}>
        <Map
          data={columns}
          render={(c) => <ColumnField key={c.id} column={c} />}
        />
      </div>
      <Button variant="secondary" onClick={onAddColumn}>
        + Add New Column
      </Button>
    </div>
  );
};
