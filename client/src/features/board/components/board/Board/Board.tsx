import styles from "./Board.module.scss";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { cls } from "@/shared/utils/formatters";
import type { BoardSchema } from "@/shared/types/board.types";

import BoardIcon from "@/assets/icon-board.svg?react";

interface BoardProps {
  board: BoardSchema;
}

export const Board = ({ board: { _id, name } }: BoardProps) => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);

  const handleSelectBoard = () => setOpenBoard({ id: _id, name });

  const boardCardClasses = cls(
    styles.board,
    openBoardId === _id && styles["board--active"],
  );

  return (
    <div className={boardCardClasses} onClick={handleSelectBoard}>
      <BoardIcon />
      <span>{name}</span>
    </div>
  );
};
