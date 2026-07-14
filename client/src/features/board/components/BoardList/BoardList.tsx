import styles from "./BoardList.module.scss";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useBoards } from "../../hooks/useBoards";
import BoardIcon from "@/assets/icon-board.svg?react";
import { useEffect } from "react";

export const BoardList = () => {
  const { data: boards } = useBoards();
  const openBoardId = useOpenBoardStore((s) => s.openBoardId);
  const setOpenBoardId = useOpenBoardStore((s) => s.setOpenBoardId);

  const metaLength = boards?.meta?.["length"];
  const boardCount = typeof metaLength === "number" && metaLength;

  useEffect(() => {
    if (!boards?.data) return;
    if (boards.data.some((board) => openBoardId === board._id)) return;
    setOpenBoardId(boards.data[0]._id);
  }, [boards, openBoardId, setOpenBoardId]);

  const handleSelectBoard = (boardId: string) => setOpenBoardId(boardId);

  return (
    <div className={styles.boardList}>
      <h2 className={styles.boardList__title}>
        All boards{" "}
        <span className={styles.boardList__count}>({boardCount})</span>
      </h2>
      {boards?.data.map((board) => (
        <div
          key={board._id}
          className={`${styles.boardList__card} ${openBoardId === board._id ? styles["boardList__card--active"] : ""}`}
          onClick={() => handleSelectBoard(board._id)}
        >
          <BoardIcon />
          <span>{board.name}</span>
        </div>
      ))}
    </div>
  );
};
