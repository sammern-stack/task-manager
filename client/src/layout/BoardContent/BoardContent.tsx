import styles from "./BoardContent.module.scss";
import { ColumnList } from "@/features/board";

export const BoardContent = () => {
  return (
    <div className={styles.boardContent}>
      <ColumnList />
    </div>
  );
};
