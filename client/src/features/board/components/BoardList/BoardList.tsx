import styles from "./BoardList.module.scss";
import { BoardListCard } from "./BoardListCard";
import { useBoards } from "../../hooks/useBoards";

export const BoardList = () => {
  const { data: boards } = useBoards();

  const boardsList = boards?.data;
  const metaLength = boards?.meta?.["length"];
  const boardCount = typeof metaLength === "number" && metaLength;

  return (
    <div className={styles.boardList}>
      <h2 className={styles.boardList__title}>
        All boards{" "}
        <span className={styles.boardList__count}>({boardCount})</span>
      </h2>
      {boardsList?.map((board) => (
        <BoardListCard board={board} />
      ))}
    </div>
  );
};
