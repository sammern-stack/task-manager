import styles from "./BoardList.module.scss";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { useDialogStore } from "@/shared/stores/dialogStore";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import BoardIcon from "@/assets/icon-board.svg?react";
import type { BoardSchema } from "@/shared/types/board.types";

type BoardListCardProps =
  | { variant: "board"; board: BoardSchema }
  | { variant: "createBtn" };

export const BoardListCard = (props: BoardListCardProps) => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const openDialog = useDialogStore((s) => s.openDialog);
  const startCreateBoard = useCurrentBoardStore((s) => s.startCreateBoard);

  const handleSelectBoard = () => {
    if (props.variant === "board") {
      return setOpenBoard({ id: props.board._id, name: props.board.name });
    }
    // Logic to create new board
    startCreateBoard();
    openDialog("createBoard");
  };

  const cardLabel =
    props.variant === "board" ? props.board.name : "+ Create New Board";

  const boardCardClasses = [
    styles.boardList__card,
    props.variant === "createBtn" ? styles["boardList__card--createBtn"] : "",
    props.variant === "board" && openBoardId === props.board._id
      ? styles["boardList__card--active"]
      : "",
  ].join(" ");

  return (
    <div
      key={props.variant === "board" ? props.board._id : "createBtn"}
      className={boardCardClasses}
      onClick={handleSelectBoard}
    >
      <BoardIcon />
      <span>{cardLabel}</span>
    </div>
  );
};
