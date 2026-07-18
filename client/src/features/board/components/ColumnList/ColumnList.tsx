import styles from "./ColumnList.module.scss";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useGetColumnsByBoardId } from "../../hooks/useBoards";

export const ColumnList = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns } = useGetColumnsByBoardId(openBoardId ?? "");

  if (columns?.data.length === 0) return <div>Empty board</div>;

  return (
    <div className={styles.columnList}>
      {columns?.data.map((column) => (
        <div key={column._id} className={styles.columnList__column}>
          {column.name}
        </div>
      ))}
      <div className={styles.columnList__column}>Test</div>
      <div className={styles.columnList__column}>Test</div>
      <div className={styles.columnList__column}>Test</div>
      <div className={styles.columnList__column}>Test</div>
      <div className={styles.columnList__column}>Test</div>
    </div>
  );
};
