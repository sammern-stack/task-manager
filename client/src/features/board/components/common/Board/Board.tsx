import styles from "./Board.module.scss";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { useDialogStore } from "@/shared/stores/dialogStore";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";

import { cls } from "@/shared/utils/formatters";
import type { BoardSchema } from "@/shared/types/board.types";

import BoardIcon from "@/assets/icon-board.svg?react";

interface BoardProps {
  variant?: "board" | "createBtn";
  board?: BoardSchema;
}

export const Board = ({ variant, board }: BoardProps) => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const openDialog = useDialogStore((s) => s.openDialog);
  const startCreateBoard = useCurrentBoardStore((s) => s.startCreateBoard);

  const isBoard = variant === "board";
  const isCreateBtn = variant === "createBtn";
  const isActive = isBoard && openBoardId === board?._id;

  const handleCreateBoard = () => {
    if (!board) return;
    setOpenBoard({ id: board._id, name: board.name });
  };

  const handleSelectBoard = () => {
    startCreateBoard();
    openDialog("createBoard");
  };

  const handleClick = isBoard ? handleCreateBoard : handleSelectBoard;

  const boardCardClasses = cls(
    styles.board,
    isCreateBtn && styles["board--createBtn"],
    isActive && styles["board--active"],
  );

  return (
    <div className={boardCardClasses} onClick={handleClick}>
      <BoardIcon />
      <span>{isBoard ? board?.name : "+ Create New Board"}</span>
    </div>
  );
};
