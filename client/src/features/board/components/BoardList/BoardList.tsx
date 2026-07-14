import styles from "./BoardList.module.scss";
import { useBoards } from "../../hooks/useBoards";
import BoardIcon from "@/assets/icon-board.svg?react";

export const BoardList = () => {
  const { data } = useBoards();

  const metaLength = data?.meta?.["length"];
  const boardCount = typeof metaLength === "number" && metaLength;

  return (
    <div className={styles.boardList}>
      <h2 className={styles.boardList__title}>
        All boards{" "}
        <span className={styles.boardList__count}>({boardCount})</span>
      </h2>
      {data?.data.map((board) => (
        <div key={board._id} className={styles.boardList__card}>
          <BoardIcon />
          <span>{board.name}</span>
        </div>
      ))}
    </div>
  );
};
