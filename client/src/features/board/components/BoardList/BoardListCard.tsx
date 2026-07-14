import styles from "./BoardList.module.scss";
import { useEffect } from "react";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useBoards } from "../../hooks/useBoards";
import BoardIcon from "@/assets/icon-board.svg?react";
import type { BoardSchema } from "@/shared/types/board.types";

interface BoardListCardProps {
  board: BoardSchema;
}

export const BoardListCard = ({ board }: BoardListCardProps) => {
  const { data: boards } = useBoards();
  const openBoardId = useOpenBoardStore((s) => s.openBoardId);
  const setOpenBoardId = useOpenBoardStore((s) => s.setOpenBoardId);

  useEffect(() => {
    if (!boards?.data) return;
    if (boards.data.some((board) => openBoardId === board._id)) return;
    setOpenBoardId(boards.data[0]._id);
  }, [boards, openBoardId, setOpenBoardId]);

  const handleSelectBoard = (boardId: string) => setOpenBoardId(boardId);

  const boardCardClasses = [
    styles.boardList__card,
    openBoardId === board._id ? styles["boardList__card--active"] : "",
  ].join(" ");

  return (
    <div
      key={board._id}
      className={boardCardClasses}
      onClick={() => handleSelectBoard(board._id)}
    >
      <BoardIcon />
      <span>{board.name}</span>
    </div>
  );
};
