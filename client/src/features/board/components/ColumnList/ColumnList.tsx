import styles from "./ColumnList.module.scss";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useGetColumnsByBoardId } from "../../hooks/useBoards";
import { Heading } from "@/shared/components";

export const ColumnList = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns } = useGetColumnsByBoardId(openBoardId ?? "");

  if (columns?.data.length === 0) return <div>Empty board</div>;

  return (
    <div className={styles.columnList}>
      {columns?.data.map((column) => (
        <div key={column._id} className={styles.columnList__column}>
          <Heading size="h2" className={styles.columnList__columnName}>
            {column.name}
          </Heading>
          <div className={styles.columnList__columnTasks}></div>
        </div>
      ))}
      <div className={styles.columnList__column}>
        <div className={styles.columnList__columnAdd}>+ New Column</div>
      </div>
    </div>
  );
};
