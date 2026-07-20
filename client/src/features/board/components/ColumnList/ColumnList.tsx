import styles from "./ColumnList.module.scss";
import { useEffect, useState } from "react";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useGetColumnsByBoardId } from "../../hooks/useBoards";
import { Button, Heading } from "@/shared/components";

import { ColumnListCard } from "./ColumnListCard";
import { ColumnListNewColumnCard } from "./ColumnListNewColumnCard";

export type NewColumn = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
};

const DEFAULT_NEW_COLUMN: NewColumn = {
  id: crypto.randomUUID(),
  name: "",
};

export const ColumnList = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns } = useGetColumnsByBoardId(openBoardId ?? "");
  const [newColumn, setNewColumn] = useState<NewColumn | null>(null);

  useEffect(() => {
    return () => setNewColumn(null);
  }, [openBoardId]);

  const handleAddNewColumn = () => setNewColumn(DEFAULT_NEW_COLUMN);

  if (columns?.data.length === 0) {
    if (newColumn)
      return (
        <ColumnListNewColumnCard
          newColumn={newColumn}
          setNewColumn={setNewColumn}
        />
      );

    return (
      <div className={styles.columnList__emptyState}>
        <p>This board is empty. Create a new column to get started.</p>
        <Button variant="primarySmall" onClick={handleAddNewColumn}>
          + Create New Column
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.columnList}>
      {columns?.data.map((column) => (
        <ColumnListCard key={column._id} column={column} />
      ))}
      {newColumn && (
        <ColumnListNewColumnCard
          newColumn={newColumn}
          setNewColumn={setNewColumn}
        />
      )}
      <div className={styles.columnList__column} onClick={handleAddNewColumn}>
        <Heading size="h1" className={styles.columnList__columnAdd}>
          + New Column
        </Heading>
      </div>
    </div>
  );
};
