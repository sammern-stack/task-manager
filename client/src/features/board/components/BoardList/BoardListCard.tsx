import styles from "./BoardList.module.scss";
import { useEffect } from "react";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useDialogStore } from "@/shared/stores/dialogStore";
import { useBoards } from "../../hooks/useBoards";
import BoardIcon from "@/assets/icon-board.svg?react";
import type { BoardSchema } from "@/shared/types/board.types";

type BoardListCardProps =
  | { variant: "board"; board: BoardSchema }
  | { variant: "createBtn" };

export const BoardListCard = (props: BoardListCardProps) => {
  const { data: boards } = useBoards();
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const setOpenBoardId = useOpenBoardStore((s) => s.setOpenBoardId);
  const setOpenBoardName = useOpenBoardStore((s) => s.setOpenBoardName);
  const openDialog = useDialogStore((s) => s.openDialog);

  useEffect(() => {
    if (!boards?.data) return;
    if (boards.data.some((board) => openBoardId === board._id)) return;
    setOpenBoardId(boards.data[0]._id);
  }, [boards, openBoardId, setOpenBoardId]);

  const handleSelectBoard = () => {
    if (props.variant === "board") {
      setOpenBoardId(props.board._id);
      setOpenBoardName(props.board.name);
      return;
    }
    // Logic to create new board
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
