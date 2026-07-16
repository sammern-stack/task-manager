import styles from "./BoardHeader.module.scss";
import { useOpenBoardStore } from "@/features/board";

export const BoardHeader = () => {
  const openBoardName = useOpenBoardStore((s) => s.openBoard.name);

  return (
    <div className={styles.boardHeader}>
      <h1 className={styles.boardHeader__title}>{openBoardName}</h1>
    </div>
  );
};
