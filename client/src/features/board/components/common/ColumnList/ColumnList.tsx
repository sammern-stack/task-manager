import styles from "./ColumnList.module.scss";
import { useEffect, useState } from "react";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { useGetColumnsByBoardId } from "../../../hooks/useBoards";

import { ColumnListNewColumnCard } from "./ColumnListNewColumnCard";
import { Column } from "../Column/Column";
import { EmptyState } from "../EmptyState/EmptyState";
import type { ColumnProperties } from "@/shared/types/column.types";
import { CreateColumn } from "../CreateColumn/CreateColumn";

export const ColumnList = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns = [] } = useGetColumnsByBoardId(openBoardId ?? "");
  const [newColumn, setNewColumn] = useState<ColumnProperties | null>(null);

  useEffect(() => {
    return () => setNewColumn(null);
  }, [openBoardId]);

  const handleAddNewColumn = () => setNewColumn({ name: "" });

  if (columns.length === 0) {
    if (newColumn)
      return (
        <ColumnListNewColumnCard
          newColumn={newColumn}
          setNewColumn={setNewColumn}
        />
      );

    return <EmptyState onCreate={handleAddNewColumn} />;
  }

  return (
    <div className={styles.columnList}>
      {columns.map((column) => (
        <Column key={column?._id} column={column} />
      ))}
      <CreateColumn />
    </div>
  );
};
